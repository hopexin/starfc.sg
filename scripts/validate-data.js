#!/usr/bin/env node
/* =====================================================================
 * STAR FC 数据校验（每周更新 data/ 后运行：node scripts/validate-data.js）
 * ---------------------------------------------------------------------
 * 校验 data/i18n.js、data/players.js、data/fixtures.js、data/media.js：
 * - 文件能否正常加载、必需字段是否齐全、格式是否正确
 * - 进球名单里的 id 是否都在球员名册中
 * - 进球数合计是否超过该场总进球（漏记只提示，不报错）
 * 有 ERROR 时退出码为 1（不要提交）；只有 WARN 可以提交。
 * ===================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const errors = [];
const warnings = [];

function err(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

// ---- 加载数据文件（模拟浏览器的 window 全局） ----
global.window = {};
for (const rel of ['data/i18n.js', 'data/players.js', 'data/fixtures.js', 'data/media.js', 'data/blog.js']) {
  const file = path.join(ROOT, rel);
  try {
    // eslint-disable-next-line no-eval
    eval(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    err(`${rel} 加载失败：${e.message}`);
  }
}
const S = global.window.STARFC || {};

// ---- players ----
const POSITIONS = ['GK', 'CB', 'FULL BACK', 'DM', 'CM', 'WINGER', 'STRIKER'];
const playersById = {};
if (!Array.isArray(S.players) || S.players.length === 0) {
  err('data/players.js：window.STARFC.players 缺失或为空');
} else {
  const numbers = {};
  S.players.forEach((p, i) => {
    const label = `players[${i}]（${p && p.id}）`;
    if (!p.id || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id)) err(`${label}：id 必须是小写 kebab-case`);
    if (playersById[p.id]) err(`${label}：id 重复`);
    playersById[p.id] = p;
    if (!p.name) err(`${label}：缺少 name（规范英文名）`);
    if (POSITIONS.indexOf(p.position) === -1) err(`${label}：position "${p.position}" 不在 ${POSITIONS.join('/')} 中`);
    if (typeof p.number !== 'number') err(`${label}：number 必须是数字`);
    else if (numbers[p.number]) warn(`${label}：球衣号 ${p.number} 与 ${numbers[p.number]} 重复`);
    else numbers[p.number] = p.id;
  });
  const team = S.team || {};
  if (!playersById[team.captainId]) err(`data/players.js：captainId "${team.captainId}" 不在名册中`);
  (team.viceCaptainIds || []).forEach(id => {
    if (!playersById[id]) err(`data/players.js：viceCaptainIds "${id}" 不在名册中`);
  });
}

// ---- fixtures ----
function validDate(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s || '')) return false;
  const d = new Date(s + 'T00:00:00Z');
  return !isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

if (!S.fixtures || typeof S.fixtures !== 'object') {
  err('data/fixtures.js：window.STARFC.fixtures 缺失');
} else {
  Object.keys(S.fixtures).forEach(year => {
    const list = S.fixtures[year];
    if (!Array.isArray(list)) { err(`fixtures[${year}] 不是数组`); return; }
    const seen = {};
    list.forEach((m, i) => {
      const label = `fixtures[${year}][${i}]（${m && m.date} vs ${m && m.opponent}）`;
      if (!validDate(m.date)) err(`${label}：date 必须是有效的 YYYY-MM-DD`);
      else if (!m.date.startsWith(String(year))) warn(`${label}：日期年份与所在赛季数组（${year}）不一致`);
      if (!m.comp) err(`${label}：缺少 comp（友谊赛 / UAFL / UAFL 第X轮 / 杯赛）`);
      if (!m.opponent) err(`${label}：缺少 opponent`);
      if (!m.venue) warn(`${label}:缺少 venue`);
      const key = m.date + '|' + m.opponent;
      if (seen[key]) warn(`${label}：与另一条记录日期+对手完全相同，请确认不是重复录入`);
      seen[key] = true;
      if (m.score !== null && m.score !== undefined) {
        const ok = Array.isArray(m.score) && m.score.length === 2 &&
          m.score.every(n => Number.isInteger(n) && n >= 0);
        if (!ok) { err(`${label}：score 必须是 [我方进球, 对方进球] 两个非负整数，或未开赛填 null`); return; }
        if (m.scorers === undefined) { warn(`${label}：缺少 scorers 字段（无进球写 []，没记录写 null）`); }
        if (Array.isArray(m.scorers)) {
          let sum = 0;
          m.scorers.forEach((s2, j) => {
            const sl = `${label} scorers[${j}]`;
            const hasId = !!s2.id, hasName = !!(s2.name || s2.nameEn || s2.nameZh);
            if (!hasId && !hasName) err(`${sl}：必须有 id 或 name/nameZh+nameEn`);
            if (hasId && !playersById[s2.id]) err(`${sl}：id "${s2.id}" 不在 data/players.js 名册中（绰号请查名册 aliases）`);
            if (s2.n !== undefined && (!Number.isInteger(s2.n) || s2.n < 1)) err(`${sl}：n 必须是 >=1 的整数（1 球可省略 n）`);
            sum += s2.n || 1;
          });
          if (sum > m.score[0]) err(`${label}：进球名单合计 ${sum} 超过我方总进球 ${m.score[0]}`);
          else if (sum < m.score[0] && m.scorers.length > 0) warn(`${label}：进球名单合计 ${sum} 少于我方总进球 ${m.score[0]}（可能漏记，可接受）`);
        }
      }
    });
  });
}

// ---- media ----
if (!S.media || !Array.isArray(S.media.videos)) {
  err('data/media.js：window.STARFC.media.videos 缺失');
} else {
  S.media.videos.forEach((v, i) => {
    const label = `media.videos[${i}]（${v && v.date}）`;
    if (!validDate(v.date)) err(`${label}：date 必须是有效的 YYYY-MM-DD`);
    if (!v.opponent) err(`${label}：缺少 opponent`);
    if (!/^https?:\/\//.test(v.url || '')) err(`${label}：url 必须是 http(s) 链接`);
    if (v.cover && !fs.existsSync(path.join(ROOT, v.cover))) warn(`${label}：cover 文件不存在：${v.cover}`);
  });
}

// ---- blog ----
if (!S.blog || !Array.isArray(S.blog.posts)) {
  err('data/blog.js：window.STARFC.blog.posts 缺失');
} else {
  const seenSlugs = {};
  S.blog.posts.forEach((p, i) => {
    const label = `blog.posts[${i}]（${p && p.slug}）`;
    if (!p.slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) err(`${label}：slug 必须是小写 kebab-case`);
    if (seenSlugs[p.slug]) err(`${label}：slug 重复`);
    seenSlugs[p.slug] = true;
    if (!validDate(p.date)) err(`${label}：date 必须是有效的 YYYY-MM-DD`);
    if (!p.titleZh) err(`${label}：缺少 titleZh`);
    if (!p.excerptZh) warn(`${label}：建议补 excerptZh（首页卡片摘要）`);
    if (!p.tagZh) warn(`${label}：建议补 tagZh（卡片分类标签）`);
    if (p.type === 'post') {
      const file = path.join(ROOT, 'blog', p.slug + '.html');
      if (!fs.existsSync(file)) err(`${label}：找不到文章文件 blog/${p.slug}.html`);
      else {
        const htmlSrc = fs.readFileSync(file, 'utf8');
        ['【标题】', '【描述】', '【日期】', '【SLUG】', '【标签】'].forEach(ph => {
          if (htmlSrc.includes(ph)) err(`${label}：blog/${p.slug}.html 还留着模板占位符 ${ph}`);
        });
        if (!htmlSrc.includes('rel="canonical"')) warn(`${label}：文章缺 canonical`);
        if (!htmlSrc.includes('og:title')) warn(`${label}：文章缺 Open Graph`);
      }
    } else if (p.type === 'external') {
      if (!/^https?:\/\//.test(p.url || '')) err(`${label}：external 条目的 url 必须是 http(s) 链接`);
    } else {
      err(`${label}：type 必须是 "post" 或 "external"`);
    }
  });
}

// ---- i18n ----
if (!S.i18n || typeof S.i18n !== 'object') {
  err('data/i18n.js：window.STARFC.i18n 缺失');
} else {
  Object.keys(S.i18n).forEach(key => {
    const e = S.i18n[key];
    if (!e || typeof e.zh !== 'string' || typeof e.en !== 'string') {
      err(`i18n["${key}"]：zh 和 en 必须成对存在`);
    }
  });
}

// ---- 汇总 ----
console.log('=== STAR FC 数据校验 ===');
warnings.forEach(w => console.log('WARN   ' + w));
errors.forEach(e => console.log('ERROR  ' + e));
console.log(`\nsummary: errors=${errors.length} warnings=${warnings.length}` +
  (errors.length ? '\n有 ERROR：请修正后再提交。' : '\n数据可以提交。'));
process.exit(errors.length ? 1 : 0);
