#!/usr/bin/env node
/* =====================================================================
 * 生成 sitemap.xml（发博客/加页面后运行：node scripts/update-sitemap.js）
 * 收录：首页 + blog/index.html + blog/*.html（模板 _template.html 除外）。
 * lastmod 取文件修改时间。
 * ===================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BASE = 'https://www.starfc.sg';

function lastmod(file) {
  return fs.statSync(file).mtime.toISOString().slice(0, 10);
}

const urls = [
  { loc: BASE + '/', file: path.join(ROOT, 'index.html'), priority: '1.0' },
  { loc: BASE + '/blog/index.html', file: path.join(ROOT, 'blog', 'index.html'), priority: '0.6' },
];

fs.readdirSync(path.join(ROOT, 'blog'))
  .filter(f => f.endsWith('.html') && f !== 'index.html' && !f.startsWith('_'))
  .sort()
  .forEach(f => {
    urls.push({ loc: `${BASE}/blog/${f}`, file: path.join(ROOT, 'blog', f), priority: '0.7' });
  });

const xml = ['<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(u =>
    `  <url><loc>${u.loc}</loc><lastmod>${lastmod(u.file)}</lastmod><priority>${u.priority}</priority></url>`),
  '</urlset>', ''].join('\n');

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml);
console.log(`sitemap.xml written: ${urls.length} urls`);
urls.forEach(u => console.log('  ' + u.loc));
