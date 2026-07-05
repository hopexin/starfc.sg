/* =====================================================================
 * STAR FC main.js — 站点行为与动态渲染（纯原生 JS，零构建）
 * ---------------------------------------------------------------------
 * 数据来源（唯一维护入口，每周更新只改 data/ 下的文件）：
 *   data/players.js  → window.STARFC.players / team / aliases
 *   data/fixtures.js → window.STARFC.fixtures（赛程战绩，统计自动计算）
 *   data/media.js    → window.STARFC.media（比赛集锦视频）
 *   data/i18n.js     → window.STARFC.i18n（中英文案词典）
 * 本文件只负责渲染与交互，正常维护不需要修改。
 * ===================================================================== */
(function () {
  'use strict';

  var LANG_KEY = 'starfc-language';
  var S = window.STARFC = window.STARFC || {};
  var I18N = S.i18n || {};

  /* ---------- 工具 ---------- */
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ---------- i18n ---------- */
  function getLang() { return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'zh'; }
  function t(key, vars) {
    var entry = I18N[key];
    var s = entry ? (entry[getLang()] || entry.zh) : key;
    if (vars) {
      Object.keys(vars).forEach(function (k) { s = s.replace('{' + k + '}', vars[k]); });
    }
    return s;
  }

  function updateLanguageButtons(lang) {
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      var active = btn.dataset.langBtn === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function applyI18n() {
    var lang = getLang();
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    document.title = t('meta.title');
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('meta.description'));
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var i = pair.indexOf(':');
        if (i < 0) return;
        el.setAttribute(pair.slice(0, i).trim(), t(pair.slice(i + 1).trim()));
      });
    });
    updateLanguageButtons(lang);
  }

  /* ---------- 球员 ---------- */
  var playersById = {};
  (S.players || []).forEach(function (p) { playersById[p.id] = p; });

  function playerDisplayName(p) { return p.shortName || p.name; }

  // 进球名单统一显示规范英文名（名册 name / shortName）；编外球员用其记录名。
  function scorerName(entry) {
    if (entry.id && playersById[entry.id]) return playerDisplayName(playersById[entry.id]);
    if (entry.nameEn) return entry.nameEn;
    if (entry.nameZh) return entry.nameZh;
    return entry.name || '?';
  }

  function scorerLine(scorers) {
    if (scorers === null || scorers === undefined) return '⚽ -';
    if (!scorers.length) return '';
    return '⚽ ' + scorers.map(function (e) {
      return scorerName(e) + (e.n > 1 ? ' ×' + e.n : '');
    }).join('; ');
  }

  /* ---------- 赛程战绩 ---------- */
  function compLabel(comp) {
    if (comp === '友谊赛') return t('comp.friendly');
    if (comp === '杯赛') return t('comp.cup');
    var m = /^UAFL 第(\d+)轮$/.exec(comp);
    if (m) return t('comp.uaflRound', { n: m[1] });
    return comp;
  }

  function matchResult(m) {
    if (!m.score) return null;
    if (m.score[0] > m.score[1]) return 'win';
    if (m.score[0] < m.score[1]) return 'loss';
    return 'draw';
  }

  var RESULT_LABEL = { win: 'WIN', draw: 'DRAW', loss: 'LOSS' };

  function fixtureCard(m) {
    var res = matchResult(m);
    var mod = res || 'upcoming';
    var badge = res
      ? '<span class="result-pill result-pill--' + res + '">' + RESULT_LABEL[res] + '</span>'
      : '<span class="result-pill result-pill--draw">' + esc(t('fixtures.upcoming')) + '</span>';
    var scoreHtml = res
      ? '<div class="match-card__score">' + m.score[0] + ' – ' + m.score[1] + '</div>'
      : '';
    var scorers = res ? scorerLine(m.scorers) : '';
    var scorersHtml = scorers
      ? '<p class="match-card__scorers">' + esc(scorers) + '</p>'
      : '';
    return '' +
      '<article class="match-card match-card--' + mod + '">' +
        '<div class="match-card__meta">' +
          '<div class="match-card__meta-left">' +
            '<time class="match-card__date" datetime="' + esc(m.date) + '">' + esc(m.date) + '</time>' +
            '<span class="chip">' + esc(compLabel(m.comp)) + '</span>' +
          '</div>' +
          badge +
        '</div>' +
        '<div class="match-card__teams">' +
          '<span translate="no">STAR FC</span><span class="match-card__vs">vs</span><span>' + esc(m.opponent) + '</span>' +
        '</div>' +
        scoreHtml +
        scorersHtml +
        '<p class="match-card__venue">' + esc(m.venue) + '</p>' +
      '</article>';
  }

  function sortedFixtures(year) {
    var list = (S.fixtures && S.fixtures[year]) || [];
    return list.slice().sort(function (a, b) { return a.date < b.date ? 1 : (a.date > b.date ? -1 : 0); });
  }

  // 全部已赛比赛（跨赛季，按日期从新到旧）
  function allPlayedMatches() {
    var years = Object.keys(S.fixtures || {});
    var all = [];
    years.forEach(function (y) { all = all.concat(sortedFixtures(y)); });
    return all.filter(matchResult).sort(function (a, b) {
      return a.date < b.date ? 1 : (a.date > b.date ? -1 : 0);
    });
  }

  function computeStats(list) {
    var st = { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0 };
    list.forEach(function (m) {
      var res = matchResult(m);
      if (!res) return; // 未开赛不计入统计
      st.played += 1;
      if (res === 'win') st.won += 1;
      else if (res === 'draw') st.drawn += 1;
      else st.lost += 1;
      st.gf += m.score[0];
      st.ga += m.score[1];
    });
    return st;
  }

  function statTile(value, mod, labelKey) {
    return '' +
      '<div class="stat-tile' + (mod ? ' stat-tile--' + mod : '') + '">' +
        '<p class="stat-tile__value">' + value + '</p>' +
        '<p class="stat-tile__label">' + esc(t(labelKey)) + '</p>' +
      '</div>';
  }

  // 折叠按钮文案与可见性（移动端默认显示 6 张，桌面 9 张，超出折叠）
  function updateFixturesToggles() {
    document.querySelectorAll('[data-fixtures-toggle]').forEach(function (btn) {
      var year = btn.getAttribute('data-fixtures-toggle');
      var grid = document.querySelector('[data-fixtures-list="' + year + '"]');
      if (!grid) return;
      var total = grid.children.length;
      btn.parentElement.classList.toggle('hidden', total <= 6);
      var collapsed = grid.classList.contains('is-collapsed');
      btn.textContent = collapsed ? t('fixtures.showAll', { n: total }) : t('fixtures.showLess');
    });
  }

  function renderFixtures() {
    document.querySelectorAll('[data-fixtures-list]').forEach(function (el) {
      var year = el.getAttribute('data-fixtures-list');
      el.innerHTML = sortedFixtures(year).map(fixtureCard).join('');
    });
    document.querySelectorAll('[data-fixtures-stats]').forEach(function (el) {
      var st = computeStats(sortedFixtures(el.getAttribute('data-fixtures-stats')));
      el.innerHTML =
        statTile(st.played, 'accent', 'stats.played') +
        statTile(st.won, 'win', 'stats.won') +
        statTile(st.drawn, '', 'stats.drawn') +
        statTile(st.lost, 'loss', 'stats.lost') +
        statTile(st.gf, 'accent', 'stats.goalsFor') +
        statTile(st.ga, '', 'stats.goalsAgainst');
    });
    updateFixturesToggles();
  }

  /* ---------- Hero 最新战绩条 + 近 5 场状态 ---------- */
  function renderHeroLatest() {
    var el = document.querySelector('[data-hero-latest]');
    if (!el) return;
    var played = allPlayedMatches();
    if (!played.length) { el.classList.add('hidden'); return; }
    var m = played[0];
    var res = matchResult(m);
    var style = { win: 'WIN', draw: 'DRAW', loss: 'LOSS' }[res];
    var last5 = played.slice(0, 5).reverse(); // 左旧右新
    var dots = last5.map(function (mm, i) {
      var r = matchResult(mm);
      var isLatest = i === last5.length - 1;
      return '<span class="form-dot form-dot--' + r + (isLatest ? ' form-dot--latest' : '') + '" title="' + esc(mm.date + ' vs ' + mm.opponent + ' ' + mm.score[0] + '-' + mm.score[1]) + '"></span>';
    }).join('');
    el.innerHTML =
      '<span class="hero-latest__label">' + esc(t('hero.latestLabel')) + '</span>' +
      '<span class="hero-latest__match">' +
        '<time class="hero-latest__date" datetime="' + esc(m.date) + '">' + esc(m.date) + '</time>' +
        '<span class="hero-latest__teams"><span translate="no">STAR FC</span>' +
          '<span class="hero-latest__score hero-latest__score--' + res + '">' + m.score[0] + ' – ' + m.score[1] + '</span>' +
          '<span>' + esc(m.opponent) + '</span>' +
        '</span>' +
        '<span class="result-pill result-pill--' + res + '">' + style + '</span>' +
      '</span>' +
      '<span class="hero-latest__form">' +
        '<span class="hero-latest__form-label">' + esc(t('hero.formLabel')) + '</span>' +
        '<span class="form-dots">' + dots + '</span>' +
      '</span>';
    el.classList.remove('hidden');
  }

  /* ---------- 下一场预告（数据中有 score: null 的未来比赛时显示） ---------- */
  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function nextMatch() {
    var today = todayStr();
    var next = null;
    Object.keys(S.fixtures || {}).forEach(function (y) {
      (S.fixtures[y] || []).forEach(function (m) {
        if (m.score) return;               // 已有比分的不算
        if (!m.date || m.date < today) return; // 过期的待录入比赛不预告
        if (!next || m.date < next.date) next = m;
      });
    });
    return next;
  }

  function renderHeroNext() {
    var el = document.querySelector('[data-hero-next]');
    if (!el) return;
    var m = nextMatch();
    if (!m) { el.classList.add('hidden'); el.innerHTML = ''; return; }
    var days = Math.round((new Date(m.date + 'T00:00:00') - new Date(todayStr() + 'T00:00:00')) / 86400000);
    var count = days === 0 ? t('hero.nextToday')
      : days === 1 ? t('hero.nextTomorrow')
      : t('hero.nextInDays', { n: days });
    el.innerHTML =
      '<span class="hero-next__label">' + esc(t('hero.nextLabel')) + '</span>' +
      '<span class="hero-next__meta">' +
        '<time class="hero-next__date" datetime="' + esc(m.date) + '">' + esc(m.date) + '</time>' +
        '<span class="hero-next__teams"><span translate="no">STAR FC</span><span class="hero-next__vs">vs</span><span>' + esc(m.opponent) + '</span></span>' +
        '<span class="hero-next__venue">' + esc(m.venue || '') + '</span>' +
      '</span>' +
      '<span class="hero-next__count">' + esc(count) + '</span>';
    el.classList.remove('hidden');
  }

  /* ---------- 品牌跑马灯 ---------- */
  function renderTicker() {
    var track = document.querySelector('[data-ticker]');
    if (!track) return;
    var items = ['STAR FC', 'SINCE 2002', t('ticker.motto'), t('ticker.seal'), t('ticker.sunday'), t('ticker.runnerUp')];
    var seq = items.map(function (s) {
      return '<span class="ticker__item">' + esc(s) + '</span><span class="ticker__star" aria-hidden="true">★</span>';
    }).join('');
    track.innerHTML = '<div class="ticker__seq">' + seq + '</div><div class="ticker__seq" aria-hidden="true">' + seq + '</div>';
  }

  /* ---------- 射手榜（按赛季自动统计） ---------- */
  function computeScorers(year) {
    var tally = {};
    sortedFixtures(year).forEach(function (m) {
      if (!matchResult(m) || !Array.isArray(m.scorers)) return;
      m.scorers.forEach(function (e) {
        var name = scorerName(e);
        if (name === 'OG' || name === 'Guest') return; // 乌龙/匿名客串不进射手榜
        var key = e.id ? 'id:' + e.id : 'name:' + name;
        if (!tally[key]) tally[key] = { name: name, goals: 0 };
        tally[key].goals += e.n || 1;
      });
    });
    return Object.keys(tally).map(function (k) { return tally[k]; })
      .sort(function (a, b) { return b.goals - a.goals || (a.name < b.name ? -1 : 1); });
  }

  function renderScorers() {
    document.querySelectorAll('[data-scorers]').forEach(function (el) {
      var list = computeScorers(el.getAttribute('data-scorers')).slice(0, 8);
      if (!list.length) { el.innerHTML = ''; return; }
      var max = list[0].goals;
      el.innerHTML = list.map(function (s, i) {
        var rank = i + 1;
        var pct = Math.max(8, Math.round(s.goals / max * 100));
        return '<li class="scorers-board__row' + (rank === 1 ? ' is-top' : '') + '" style="--i:' + i + '">' +
          '<span class="scorers-board__rank">' + (rank < 10 ? '0' + rank : rank) + '</span>' +
          '<span class="scorers-board__player">' +
            '<span class="scorers-board__name">' + esc(s.name) + '</span>' +
            '<span class="scorers-board__bar"><span class="scorers-board__bar-fill" style="width:' + pct + '%"></span></span>' +
          '</span>' +
          '<span class="scorers-board__goals">' + esc(t('fixtures.scorersGoals', { n: s.goals })) + '</span>' +
        '</li>';
      }).join('');
    });
  }

  // 当前赛季（fixtures 中最大的年份键），用于球员卡进球徽章
  function currentSeasonYear() {
    var years = Object.keys(S.fixtures || {});
    return years.sort().pop();
  }

  /* ---------- 关于页数字自动化（成立年数 / 在册人数 / 记录场次） ---------- */
  var FOUNDED = { year: 2002, month: 9 }; // 2002 年 9 月建队
  function autoStats() {
    document.querySelectorAll('[data-auto]').forEach(function (el) {
      var kind = el.getAttribute('data-auto');
      var value = null;
      if (kind === 'years') {
        var now = new Date();
        value = now.getFullYear() - FOUNDED.year - ((now.getMonth() + 1) < FOUNDED.month ? 1 : 0);
      } else if (kind === 'roster') {
        value = (S.players || []).length;
      } else if (kind === 'matches') {
        value = allPlayedMatches().length;
        el.removeAttribute('data-count-suffix'); // 记录在案取精确值
      }
      if (value === null) return;
      el.setAttribute('data-count', value);
      el.textContent = value + (el.getAttribute('data-count-suffix') || '');
    });
  }

  function initFixturesToggles() {
    document.querySelectorAll('[data-fixtures-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var year = btn.getAttribute('data-fixtures-toggle');
        var grid = document.querySelector('[data-fixtures-list="' + year + '"]');
        if (!grid) return;
        var collapsed = grid.classList.toggle('is-collapsed');
        updateFixturesToggles();
        if (collapsed) {
          var section = document.getElementById('fixtures');
          if (section) section.scrollIntoView({ block: 'start' });
        } else {
          revealCheck(); // 展开后新露出的卡片立即渐入
        }
      });
    });
  }

  /* ---------- 媒体中心 ---------- */
  var YT_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>';

  function videoTitle(v) {
    return v.date + ' vs ' + v.opponent + ' ' + t('media.highlightsSuffix');
  }

  function videoCard(v) {
    var coverImg = v.cover
      ? '<img src="' + esc(v.cover) + '" alt="' + esc(videoTitle(v)) + '" loading="lazy" decoding="async">'
      : '';
    return '' +
      '<article class="video-card">' +
        '<a href="' + esc(v.url) + '" target="_blank" rel="noopener noreferrer" class="video-card__thumb" aria-label="' + esc(videoTitle(v)) + '">' +
          coverImg +
          '<span class="video-card__play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>' +
          '<span class="video-card__tag">YouTube</span>' +
        '</a>' +
        '<div class="video-card__body">' +
          '<time class="video-card__date" datetime="' + esc(v.date) + '">' + esc(v.date) + '</time>' +
          '<h3 class="video-card__match"><span class="video-card__vs">vs</span> ' + esc(v.opponent) + '</h3>' +
          '<a href="' + esc(v.url) + '" target="_blank" rel="noopener noreferrer" class="video-card__cta">' +
            YT_ICON + '<span>' + esc(t('media.watchYoutube')) + '</span>' +
          '</a>' +
        '</div>' +
      '</article>';
  }

  // 媒体折叠按钮（仅手机端可见，CSS 控制；桌面端始终全量显示）
  function updateMediaToggle() {
    var btn = document.querySelector('[data-media-toggle]');
    var grid = document.querySelector('[data-media-list]');
    if (!btn || !grid) return;
    var total = grid.children.length;
    btn.parentElement.classList.toggle('hidden', total <= 4);
    var collapsed = grid.classList.contains('is-collapsed');
    btn.textContent = collapsed ? t('media.showAll', { n: total }) : t('media.showLess');
  }

  function initMediaToggle() {
    var btn = document.querySelector('[data-media-toggle]');
    var grid = document.querySelector('[data-media-list]');
    if (!btn || !grid) return;
    btn.addEventListener('click', function () {
      var collapsed = grid.classList.toggle('is-collapsed');
      updateMediaToggle();
      if (collapsed) {
        var section = document.getElementById('media');
        if (section) section.scrollIntoView({ block: 'start' });
      } else {
        revealCheck();
      }
    });
  }

  function renderMedia() {
    var el = document.querySelector('[data-media-list]');
    if (!el) return;
    var videos = ((S.media && S.media.videos) || []).slice().sort(function (a, b) {
      return a.date < b.date ? 1 : (a.date > b.date ? -1 : 0);
    });
    el.innerHTML = videos.map(videoCard).join('');
    updateMediaToggle();
  }

  /* ---------- 球队档案与故事（首页最新 6 篇，数据源 data/blog.js） ---------- */
  function storyCard(p) {
    var lang = getLang();
    var external = p.type === 'external';
    var href = external ? p.url : 'blog/' + p.slug + '.html';
    var title = (lang === 'en' && p.titleEn) ? p.titleEn : p.titleZh;
    var excerpt = (lang === 'en' && p.excerptEn) ? p.excerptEn : p.excerptZh;
    var tag = (lang === 'en' && p.tagEn) ? p.tagEn : p.tagZh;
    return '<a href="' + esc(href) + '"' + (external ? ' target="_blank" rel="noopener noreferrer"' : '') + ' class="story-card">' +
      '<span><span class="chip chip--red">' + esc(tag) + '</span></span>' +
      '<h3 class="story-card__title">' + esc(title) + '</h3>' +
      '<p class="story-card__desc">' + esc(excerpt) + '</p>' +
      '<div class="story-card__foot">' +
        '<span class="story-card__date">' + esc(p.date) + '</span>' +
        '<span class="story-card__more">' + esc(t(external ? 'stories.readMore' : 'stories.readPost')) + '</span>' +
      '</div>' +
    '</a>';
  }

  function renderStories() {
    var el = document.querySelector('[data-stories-list]');
    if (!el) return;
    var posts = ((S.blog && S.blog.posts) || []).slice().sort(function (a, b) {
      return a.date < b.date ? 1 : (a.date > b.date ? -1 : 0);
    });
    el.innerHTML = posts.slice(0, 6).map(storyCard).join('');
  }

  /* ---------- 球队成员 ---------- */
  var groupConfig = [
    { key: 'FWD', titleKey: 'team.groupFwd', sub: 'Forwards · FWD', positions: ['WINGER', 'STRIKER'] },
    { key: 'MID', titleKey: 'team.groupMid', sub: 'Midfielders · MID', positions: ['CM', 'DM'] },
    { key: 'DEF', titleKey: 'team.groupDef', sub: 'Defenders · DEF', positions: ['CB', 'FULL BACK'] },
    { key: 'GK', titleKey: 'team.groupGk', sub: 'Goalkeepers · GK', positions: ['GK'] }
  ];

  function playerRank(p) {
    var team = S.team || {};
    if (p.id === team.captainId) return 0;
    if ((team.viceCaptainIds || []).indexOf(p.id) !== -1) return 1;
    return 2;
  }

  // 当前赛季各球员进球数（球员卡徽章用）
  function seasonGoalsById() {
    var year = currentSeasonYear();
    var map = {};
    if (!year) return map;
    sortedFixtures(year).forEach(function (m) {
      if (!matchResult(m) || !Array.isArray(m.scorers)) return;
      m.scorers.forEach(function (e) {
        if (e.id) map[e.id] = (map[e.id] || 0) + (e.n || 1);
      });
    });
    return map;
  }

  function playerCard(player, goalsMap) {
    var team = S.team || {};
    var badge = '';
    if (player.id === team.captainId) {
      badge = '<span class="role-pill role-pill--captain">C</span>';
    } else if ((team.viceCaptainIds || []).indexOf(player.id) !== -1) {
      badge = '<span class="role-pill role-pill--vice">VC</span>';
    }
    var name = playerDisplayName(player);
    var card = document.createElement('article');
    card.className = 'player-card';
    var photo = document.createElement('div');
    photo.className = 'player-card__photo';
    var placeholder = document.createElement('div');
    placeholder.className = 'player-card__photo-placeholder';
    placeholder.textContent = t('team.photoSoon');
    photo.appendChild(placeholder);
    var img = document.createElement('img');
    img.src = 'assets/img/players/' + player.id + '/profile.jpg';
    img.alt = name;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.onload = function () { img.classList.add('is-loaded'); placeholder.style.display = 'none'; };
    img.onerror = function () { img.style.display = 'none'; };
    photo.appendChild(img);
    var goals = goalsMap[player.id];
    if (goals) {
      var goalChip = document.createElement('span');
      goalChip.className = 'player-card__goals';
      goalChip.textContent = '⚽ ' + goals;
      goalChip.title = t('fixtures.scorersGoals', { n: goals });
      photo.appendChild(goalChip);
    }
    card.appendChild(photo);
    var info = document.createElement('div');
    info.className = 'player-card__info';
    info.innerHTML =
      '<div class="player-card__meta"><span class="player-card__number">#' + player.number + '</span>' + badge + '</div>' +
      '<div class="player-card__name">' + esc(name) + '</div>' +
      '<div class="player-card__position">' + esc(player.position) + '</div>';
    card.appendChild(info);
    return card;
  }

  function renderTeam() {
    var players = S.players;
    var container = document.getElementById('team-groups');
    if (!players || !container) return;
    var goalsMap = seasonGoalsById();
    container.innerHTML = '';
    groupConfig.forEach(function (group) {
      var groupPlayers = players.filter(function (p) {
        return group.positions.indexOf(p.position) !== -1;
      }).sort(function (a, b) {
        var ra = playerRank(a), rb = playerRank(b);
        if (ra !== rb) return ra - rb;
        return a.number - b.number;
      });
      if (groupPlayers.length === 0) return;
      var wrapper = document.createElement('div');
      wrapper.className = 'team-group';
      var header = document.createElement('div');
      header.className = 'team-group__head';
      header.innerHTML =
        '<div><span class="team-group__title">' + esc(t(group.titleKey)) + '</span>' +
        '<span class="team-group__sub">' + esc(group.sub) + '</span></div>' +
        '<span class="team-group__count">' + esc(t('team.countN', { n: groupPlayers.length })) + '</span>';
      wrapper.appendChild(header);
      var grid = document.createElement('div');
      grid.className = 'team-grid';
      groupPlayers.forEach(function (player) { grid.appendChild(playerCard(player, goalsMap)); });
      wrapper.appendChild(grid);
      container.appendChild(wrapper);
    });
  }

  /* ---------- 导航滚动效果 ---------- */
  window.addEventListener('scroll', function () {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    navbar.classList.toggle('is-scrolled', window.scrollY > 24);
  }, { passive: true });

  /* ---------- 移动端菜单 ---------- */
  function openMobileMenu() {
    var menu = document.getElementById('mobile-menu');
    var btn = document.getElementById('mobile-menu-btn');
    menu.classList.remove('hidden');
    requestAnimationFrame(function () { menu.classList.add('is-open'); });
    document.body.classList.add('no-scroll');
    btn.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    var menu = document.getElementById('mobile-menu');
    var btn = document.getElementById('mobile-menu-btn');
    var panel = menu.querySelector('.mobile-menu__panel');
    if (!menu.classList.contains('is-open')) return;
    menu.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    btn.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    function onTransitionEnd(e) {
      if (e.propertyName === 'transform') {
        menu.classList.add('hidden');
        panel.removeEventListener('transitionend', onTransitionEnd);
      }
    }
    panel.addEventListener('transitionend', onTransitionEnd);
  }

  function toggleMobileMenu() {
    var menu = document.getElementById('mobile-menu');
    if (!menu.classList.contains('is-open')) openMobileMenu();
    else closeMobileMenu();
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var menu = document.getElementById('mobile-menu');
      if (menu && menu.classList.contains('is-open')) closeMobileMenu();
    }
  });

  /* ---------- 年份切换 ---------- */
  function switchYear(year) {
    document.querySelectorAll('.year-btn').forEach(function (btn) {
      btn.classList.toggle('is-active', parseInt(btn.dataset.year, 10) === year);
    });
    document.querySelectorAll('[data-year-panel]').forEach(function (panel) {
      panel.classList.toggle('hidden', parseInt(panel.dataset.yearPanel, 10) !== year);
    });
  }

  /* =====================================================================
   * 动效层（零依赖）：滚动渐入 / 数字滚动 / 射手榜条生长 / Hero 视差 / 球员卡倾斜
   * 参考：FC Porto Memorial（滚动叙事）、Audi F1（动态大字）、WC26 Album（卡片倾斜）
   * 统一规则：expo-out 缓动；prefers-reduced-motion 下全部关闭；语言切换不重播。
   * ===================================================================== */
  var MOTION_OFF = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE_POINTER = window.matchMedia && window.matchMedia('(pointer: fine)').matches;

  // 隐藏态只加在 JS "武装"过的元素（.reveal-armed）上：
  // JS 若未运行/中途出错，页面完全静态可见，天然安全。
  // 触发采用滚动驱动自检（不依赖 IntersectionObserver，任何环境行为一致）。
  function viewportH() {
    return window.innerHeight || document.documentElement.clientHeight || 800;
  }

  function inViewport(el, marginRatio) {
    var r = el.getBoundingClientRect();
    var vh = viewportH();
    var m = vh * (marginRatio || 0);
    return r.top < vh - m && r.bottom > 0 && r.width > 0;
  }

  function revealCheck() {
    document.querySelectorAll('.reveal-armed:not(.is-in)').forEach(function (el) {
      if (inViewport(el, 0.06)) el.classList.add('is-in');
    });
    document.querySelectorAll('[data-countup]:not([data-counted])').forEach(function (c) {
      if (inViewport(c, 0.1)) runCountup(c);
    });
  }
  window.__starfcMotionCheck = revealCheck; // 内部测试钩子

  var revealTick = false;
  function scheduleRevealCheck() {
    if (revealTick) return;
    revealTick = true;
    setTimeout(function () { revealTick = false; revealCheck(); }, 120);
  }

  // instant=true：语言切换等重渲染场景，视口内的元素直接就位，不重播动画
  function refreshReveals(instant) {
    if (MOTION_OFF) return; // 不武装 → 全部静态可见
    document.querySelectorAll('[data-reveal-stagger]').forEach(function (grid) {
      Array.prototype.forEach.call(grid.children, function (child, i) {
        if (!child.hasAttribute('data-reveal')) child.setAttribute('data-reveal', '');
        child.style.setProperty('--reveal-delay', (Math.min(i % 9, 5) * 70) + 'ms');
      });
    });
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      if (el.classList.contains('is-in')) return;
      if (instant && inViewport(el)) {
        el.classList.add('reveal-armed', 'is-in', 'instant');
        return;
      }
      el.classList.add('reveal-armed');
    });
    revealCheck();
  }

  /* ---- 数字滚动（进入视口时从 0 数到真实值，每个容器只播一次） ---- */
  function countUpEl(el, duration) {
    var suffix = el.getAttribute('data-count-suffix') || '';
    var target = parseInt(el.getAttribute('data-count') || el.textContent, 10);
    if (isNaN(target)) return;
    var start = null;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }

  function runCountup(container) {
    container.setAttribute('data-counted', '1');
    if (MOTION_OFF) return;
    container.querySelectorAll('.stat-tile__value').forEach(function (v, i) {
      if (v.getAttribute('data-count') || /^\d+$/.test(v.textContent.trim())) {
        setTimeout(function () { countUpEl(v, 900); }, i * 90);
      }
    });
  }

  /* ---- Hero 视差：内容缓移淡出 + 泛光灯光斑跟随滚动/鼠标 ----
     仅精确指针设备启用：触屏设备保持静态 Hero，保障各端滚动顺滑省电。 */
  function setupHeroParallax() {
    if (MOTION_OFF || !FINE_POINTER) return;
    var hero = document.querySelector('.hero');
    var inner = document.querySelector('.hero__inner');
    var glowA = document.querySelector('.hero__glow-a');
    var glowB = document.querySelector('.hero__glow-b');
    if (!hero || !inner) return;
    var sy = 0, mx = 0, my = 0, dirty = false;
    function apply() {
      dirty = false;
      var h = hero.offsetHeight || 1;
      if (sy <= h) {
        inner.style.transform = 'translate3d(0,' + (sy * 0.16).toFixed(1) + 'px,0)';
        inner.style.opacity = Math.max(0.25, 1 - (sy / h) * 0.85).toFixed(3);
        if (glowA) glowA.style.transform = 'translate3d(' + (mx * 26).toFixed(1) + 'px,' + (sy * 0.22 + my * 18).toFixed(1) + 'px,0)';
        if (glowB) glowB.style.transform = 'translate3d(' + (mx * -18).toFixed(1) + 'px,' + (sy * 0.1 + my * -12).toFixed(1) + 'px,0)';
      }
    }
    function schedule() { if (!dirty) { dirty = true; requestAnimationFrame(apply); } }
    window.addEventListener('scroll', function () { sy = window.scrollY; schedule(); }, { passive: true });
    if (FINE_POINTER) {
      hero.addEventListener('pointermove', function (e) {
        mx = e.clientX / window.innerWidth - 0.5;
        my = e.clientY / window.innerHeight - 0.5;
        schedule();
      }, { passive: true });
    }
  }

  /* ---- 球员卡 3D 倾斜 + 光泽（仅鼠标设备，事件委托，重渲染安全） ---- */
  function setupCardTilt() {
    if (MOTION_OFF || !FINE_POINTER) return;
    var container = document.getElementById('team-groups');
    if (!container) return;
    var MAX = 7; // 最大倾角（度）
    container.addEventListener('pointermove', function (e) {
      var card = e.target.closest ? e.target.closest('.player-card') : null;
      if (!card) return;
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width;
      var py = (e.clientY - r.top) / r.height;
      card.style.transform = 'perspective(650px) rotateX(' + ((0.5 - py) * MAX).toFixed(2) + 'deg) rotateY(' + ((px - 0.5) * MAX).toFixed(2) + 'deg) translateY(-2px)';
      card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
      card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      card.classList.add('is-tilting');
    });
    container.addEventListener('pointerout', function (e) {
      var card = e.target.closest ? e.target.closest('.player-card') : null;
      if (!card) return;
      if (e.relatedTarget && card.contains(e.relatedTarget)) return;
      card.style.transform = '';
      card.classList.remove('is-tilting');
    });
  }

  /* ---------- 试训表单 → 结构化邮件（零后端，无可攻击端点） ---------- */
  function setupTrialMailto() {
    var cta = document.querySelector('#join .join-card a[href^="mailto:"]');
    if (!cta) return;
    cta.addEventListener('click', function () {
      function val(id) {
        var el = document.getElementById(id);
        return el && el.value ? el.value.trim() : '';
      }
      var name = val('join-name');
      var lines = [];
      if (name) lines.push('姓名: ' + name);
      if (val('join-contact')) lines.push('联系方式: ' + val('join-contact'));
      var pos = val('join-position');
      if (pos && pos !== t('join.select')) lines.push('擅长位置: ' + pos);
      var exp = val('join-exp');
      if (exp && exp !== t('join.select')) lines.push('踢球经验: ' + exp);
      if (val('join-intro')) lines.push('自我介绍: ' + val('join-intro'));
      lines.push('', '—— 来自官网试训表单');
      var subject = 'STAR FC 试训申请' + (name ? ' - ' + name : '');
      cta.setAttribute('href', 'mailto:account@starfc.sg?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n')));
    });
  }

  /* ---------- 语言切换入口 ---------- */
  function setLanguage(lang) {
    lang = lang === 'en' ? 'en' : 'zh';
    localStorage.setItem(LANG_KEY, lang);
    applyI18n();
    renderFixtures();
    renderScorers();
    renderHeroLatest();
    renderHeroNext();
    renderTicker();
    renderMedia();
    renderStories();
    renderTeam();
    refreshReveals(true); // 重渲染后：视口内元素直接就位，不重播动画
  }

  /* ---------- 对 HTML onclick 暴露的全局函数 ---------- */
  window.setLanguage = setLanguage;
  window.toggleMobileMenu = toggleMobileMenu;
  window.closeMobileMenu = closeMobileMenu;
  window.switchYear = switchYear;
  window.getStarFCLanguage = getLang;

  /* ---------- 初始化 ---------- */
  function init() {
    applyI18n();
    autoStats();
    renderFixtures();
    renderScorers();
    renderHeroLatest();
    renderHeroNext();
    renderTicker();
    renderMedia();
    renderStories();
    renderTeam();
    initFixturesToggles();
    initMediaToggle();
    setupTrialMailto();
    refreshReveals(false);
    setupHeroParallax();
    setupCardTilt();
    window.addEventListener('scroll', scheduleRevealCheck, { passive: true });
    window.addEventListener('resize', scheduleRevealCheck, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
