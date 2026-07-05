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
      btn.classList.toggle('bg-amber-500', active);
      btn.classList.toggle('text-slate-900', active);
      btn.classList.toggle('shadow-sm', active);
      btn.classList.toggle('text-slate-400', !active);
      btn.classList.toggle('hover:text-white', !active);
      btn.classList.toggle('hover:bg-slate-700/50', !active);
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

  var RESULT_STYLE = {
    win:  { label: 'WIN',  badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', score: 'text-emerald-400' },
    draw: { label: 'DRAW', badge: 'bg-slate-600/20 text-slate-300 border-slate-500/30',       score: 'text-slate-300' },
    loss: { label: 'LOSS', badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',          score: 'text-rose-400' }
  };

  function matchResult(m) {
    if (!m.score) return null;
    if (m.score[0] > m.score[1]) return 'win';
    if (m.score[0] < m.score[1]) return 'loss';
    return 'draw';
  }

  function fixtureCard(m) {
    var res = matchResult(m);
    var style = res ? RESULT_STYLE[res] : null;
    var badge = style
      ? '<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ' + style.badge + '">' + style.label + '</span>'
      : '<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border bg-slate-600/20 text-slate-300 border-slate-500/30">' + esc(t('fixtures.upcoming')) + '</span>';
    var scoreHtml = style
      ? '<div class="mt-2"><span class="text-3xl font-bold font-mono ' + style.score + '">' + m.score[0] + ' - ' + m.score[1] + '</span></div>'
      : '';
    var scorers = style ? scorerLine(m.scorers) : '';
    var scorersHtml = scorers
      ? '<p class="text-gray-500 text-sm mt-2">' + esc(scorers) + '</p>'
      : '';
    return '' +
      '<div class="rounded-2xl bg-slate-800/70 border border-slate-700/50 hover:border-slate-600 p-5 shadow-lg">' +
        '<div class="flex items-center justify-between mb-4">' +
          '<div class="flex items-center gap-2">' +
            '<span class="text-gray-400 text-sm">📅 ' + esc(m.date) + '</span>' +
            '<span class="px-2 py-0.5 bg-slate-700/80 text-amber-400 text-xs font-medium rounded">' + esc(compLabel(m.comp)) + '</span>' +
          '</div>' +
          badge +
        '</div>' +
        '<div class="mb-4">' +
          '<p class="text-white font-semibold text-lg">' +
            '<span class="text-amber-400">STAR FC</span>' +
            '<span class="text-gray-500 mx-2">vs</span>' +
            '<span>' + esc(m.opponent) + '</span>' +
          '</p>' +
          scoreHtml +
          scorersHtml +
        '</div>' +
        '<p class="text-gray-500 text-sm">📍 ' + esc(m.venue) + '</p>' +
      '</div>';
  }

  function sortedFixtures(year) {
    var list = (S.fixtures && S.fixtures[year]) || [];
    return list.slice().sort(function (a, b) { return a.date < b.date ? 1 : (a.date > b.date ? -1 : 0); });
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

  function statTile(value, colorClass, labelKey) {
    return '' +
      '<div class="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">' +
        '<p class="text-3xl font-bold ' + colorClass + '">' + value + '</p>' +
        '<p class="text-gray-400 text-sm">' + esc(t(labelKey)) + '</p>' +
      '</div>';
  }

  function renderFixtures() {
    document.querySelectorAll('[data-fixtures-list]').forEach(function (el) {
      var year = el.getAttribute('data-fixtures-list');
      el.innerHTML = sortedFixtures(year).map(fixtureCard).join('');
    });
    document.querySelectorAll('[data-fixtures-stats]').forEach(function (el) {
      var st = computeStats(sortedFixtures(el.getAttribute('data-fixtures-stats')));
      el.innerHTML =
        statTile(st.played, 'text-amber-400', 'stats.played') +
        statTile(st.won, 'text-emerald-400', 'stats.won') +
        statTile(st.drawn, 'text-slate-300', 'stats.drawn') +
        statTile(st.lost, 'text-rose-400', 'stats.lost') +
        statTile(st.gf, 'text-amber-400', 'stats.goalsFor') +
        statTile(st.ga, 'text-slate-300', 'stats.goalsAgainst');
    });
  }

  /* ---------- 媒体中心 ---------- */
  var YT_ICON = '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>';

  function videoTitle(v) {
    return v.date + ' vs ' + v.opponent + ' ' + t('media.highlightsSuffix');
  }

  function videoCard(v) {
    var coverImg = v.cover
      ? '<img src="' + esc(v.cover) + '" alt="' + esc(videoTitle(v)) + '" class="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async">'
      : '';
    return '' +
      '<div class="group bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-600 transition-all">' +
        '<a href="' + esc(v.url) + '" target="_blank" rel="noopener noreferrer" class="block aspect-video bg-gradient-to-br from-red-900/30 to-slate-900 relative overflow-hidden">' +
          coverImg +
          '<div class="absolute inset-0 flex items-center justify-center">' +
            '<div class="w-16 h-16 bg-red-600/90 backdrop-blur rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-red-500 transition-all shadow-lg">' +
              '<svg class="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>' +
            '</div>' +
          '</div>' +
          '<div class="absolute top-3 left-3">' +
            '<span class="px-2 py-1 bg-slate-900/80 backdrop-blur text-amber-400 text-xs font-medium rounded">YouTube</span>' +
          '</div>' +
        '</a>' +
        '<div class="p-5">' +
          '<h3 class="text-white font-semibold group-hover:text-amber-400 transition-colors mb-2">' + esc(videoTitle(v)) + '</h3>' +
          '<p class="text-gray-400 text-sm mb-4">' + esc(t('media.videosTitle')) + '</p>' +
          '<div class="mt-4 pt-4 border-t border-slate-700/50">' +
            '<a href="' + esc(v.url) + '" target="_blank" rel="noopener noreferrer" class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-sm font-medium rounded-lg transition-colors w-full">' +
              YT_ICON + esc(t('media.watchYoutube')) +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function renderMedia() {
    var el = document.querySelector('[data-media-list]');
    if (!el) return;
    var videos = ((S.media && S.media.videos) || []).slice().sort(function (a, b) {
      return a.date < b.date ? 1 : (a.date > b.date ? -1 : 0);
    });
    el.innerHTML = videos.map(videoCard).join('');
  }

  /* ---------- 球队成员 ---------- */
  var groupConfig = [
    { key: 'FWD', titleKey: 'team.groupFwd', subZh: 'Forwards (FWD)', subEn: 'FWD', positions: ['WINGER', 'STRIKER'] },
    { key: 'MID', titleKey: 'team.groupMid', subZh: 'Midfielders (MID)', subEn: 'MID', positions: ['CM', 'DM'] },
    { key: 'DEF', titleKey: 'team.groupDef', subZh: 'Defenders (DEF)', subEn: 'DEF', positions: ['CB', 'FULL BACK'] },
    { key: 'GK', titleKey: 'team.groupGk', subZh: 'Goalkeepers (GK)', subEn: 'GK', positions: ['GK'] }
  ];

  function playerRank(p) {
    var team = S.team || {};
    if (p.id === team.captainId) return 0;
    if ((team.viceCaptainIds || []).indexOf(p.id) !== -1) return 1;
    return 2;
  }

  function renderTeam() {
    var lang = getLang();
    var players = S.players;
    var container = document.getElementById('team-groups');
    if (!players || !container) return;
    var team = S.team || {};
    container.innerHTML = '';
    groupConfig.forEach(function (group, gIdx) {
      var groupPlayers = players.filter(function (p) {
        return group.positions.indexOf(p.position) !== -1;
      }).sort(function (a, b) {
        var ra = playerRank(a), rb = playerRank(b);
        if (ra !== rb) return ra - rb;
        return a.number - b.number;
      });
      if (groupPlayers.length === 0) return;
      var isLast = gIdx === groupConfig.length - 1;
      var wrapper = document.createElement('div');
      wrapper.className = isLast ? '' : 'mb-10 md:mb-12';
      var header = document.createElement('div');
      header.className = 'flex items-center justify-between mb-4 md:mb-6';
      var groupSub = lang === 'en' ? group.subEn : group.subZh;
      header.innerHTML = '<div class="flex items-center gap-3"><h3 class="text-xl md:text-2xl font-bold text-white">' + esc(t(group.titleKey)) + '</h3><span class="text-gray-500 text-xs md:text-sm">' + esc(groupSub) + '</span></div><span class="text-gray-500 text-xs md:text-sm">' + esc(t('team.countN', { n: groupPlayers.length })) + '</span>';
      wrapper.appendChild(header);
      var hint = document.createElement('div');
      hint.className = 'swipe-hint';
      hint.textContent = t('common.swipeHint');
      wrapper.appendChild(hint);
      var hscrollWrapper = document.createElement('div');
      hscrollWrapper.className = 'hscroll-wrapper';
      var fadeLeft = document.createElement('div');
      fadeLeft.className = 'hscroll-fade-left';
      var fadeRight = document.createElement('div');
      fadeRight.className = 'hscroll-fade-right';
      var leftBtn = document.createElement('button');
      leftBtn.className = 'scroll-arrow scroll-left';
      leftBtn.setAttribute('aria-label', t('common.scrollLeft'));
      leftBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';
      var rightBtn = document.createElement('button');
      rightBtn.className = 'scroll-arrow scroll-right';
      rightBtn.setAttribute('aria-label', t('common.scrollRight'));
      rightBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
      var hscroll = document.createElement('div');
      hscroll.className = 'hscroll hscroll-player';
      groupPlayers.forEach(function (player) {
        var card = document.createElement('div');
        card.className = 'bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-600 transition-all duration-300 flex flex-col min-w-0';
        var photoWrap = document.createElement('div');
        photoWrap.className = 'w-full aspect-[3/4] bg-slate-700/60 flex items-center justify-center overflow-hidden relative';
        var placeholder = document.createElement('div');
        placeholder.className = 'absolute inset-0 flex items-center justify-center text-slate-400 text-sm';
        placeholder.textContent = t('team.photoSoon');
        photoWrap.appendChild(placeholder);
        var img = document.createElement('img');
        img.src = 'assets/img/players/' + player.id + '/profile.jpg';
        img.alt = playerDisplayName(player);
        img.className = 'absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.onload = function () { img.classList.remove('opacity-0'); placeholder.style.display = 'none'; };
        img.onerror = function () { img.style.display = 'none'; };
        photoWrap.appendChild(img);
        card.appendChild(photoWrap);
        var badge = '';
        if (player.id === team.captainId) {
          badge = '<span class="px-2 py-0.5 text-[11px] font-bold rounded-full bg-amber-500/25 text-amber-300 border border-amber-400/40">C</span>';
        } else if ((team.viceCaptainIds || []).indexOf(player.id) !== -1) {
          badge = '<span class="px-2 py-0.5 text-[11px] font-bold rounded-full bg-slate-600/45 text-slate-100 border border-slate-500/40">VC</span>';
        }
        var info = document.createElement('div');
        info.className = 'p-3 space-y-1 min-w-0';
        info.innerHTML = '<div class="flex items-center justify-between gap-2"><span class="text-xs text-slate-400">#' + player.number + '</span>' + badge + '</div><div class="font-semibold text-sm text-white line-clamp-2 break-words">' + esc(playerDisplayName(player)) + '</div><div class="text-xs text-slate-400 tracking-wide uppercase">' + esc(player.position) + '</div>';
        card.appendChild(info);
        hscroll.appendChild(card);
      });
      hscrollWrapper.appendChild(fadeLeft);
      hscrollWrapper.appendChild(fadeRight);
      hscrollWrapper.appendChild(leftBtn);
      hscrollWrapper.appendChild(hscroll);
      hscrollWrapper.appendChild(rightBtn);
      wrapper.appendChild(hscrollWrapper);
      container.appendChild(wrapper);
    });
  }

  /* ---------- 导航滚动效果 ---------- */
  window.addEventListener('scroll', function () {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('bg-slate-900/95', 'backdrop-blur-md', 'shadow-2xl');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('bg-slate-900/95', 'backdrop-blur-md', 'shadow-2xl');
      navbar.classList.add('bg-transparent');
    }
  });

  /* ---------- 移动端菜单 ---------- */
  function openMobileMenu() {
    var menu = document.getElementById('mobile-menu');
    var top = document.getElementById('hamburger-top');
    var mid = document.getElementById('hamburger-mid');
    var bot = document.getElementById('hamburger-bot');
    menu.classList.remove('hidden');
    requestAnimationFrame(function () { menu.classList.add('open'); });
    document.body.classList.add('overflow-hidden');
    top.classList.add('rotate-45', 'translate-y-1.5');
    mid.classList.add('opacity-0');
    bot.classList.add('-rotate-45', '-translate-y-1.5');
  }

  function closeMobileMenu() {
    var menu = document.getElementById('mobile-menu');
    var panel = menu.querySelector('.menu-panel');
    var top = document.getElementById('hamburger-top');
    var mid = document.getElementById('hamburger-mid');
    var bot = document.getElementById('hamburger-bot');
    if (!menu.classList.contains('open')) return;
    menu.classList.remove('open');
    document.body.classList.remove('overflow-hidden');
    top.classList.remove('rotate-45', 'translate-y-1.5');
    mid.classList.remove('opacity-0');
    bot.classList.remove('-rotate-45', '-translate-y-1.5');
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
    if (!menu.classList.contains('open')) openMobileMenu();
    else closeMobileMenu();
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var menu = document.getElementById('mobile-menu');
      if (menu && menu.classList.contains('open')) closeMobileMenu();
    }
  });

  /* ---------- 年份切换 ---------- */
  function switchYear(year) {
    document.querySelectorAll('.year-btn').forEach(function (btn) {
      if (parseInt(btn.dataset.year, 10) === year) {
        btn.classList.remove('bg-transparent', 'text-slate-400', 'hover:text-white', 'hover:bg-slate-700/50');
        btn.classList.add('bg-amber-500', 'text-slate-900', 'ring-2', 'ring-amber-400/40', 'shadow-lg', 'shadow-amber-500/20');
      } else {
        btn.classList.add('bg-transparent', 'text-slate-400', 'hover:text-white', 'hover:bg-slate-700/50');
        btn.classList.remove('bg-amber-500', 'text-slate-900', 'ring-2', 'ring-amber-400/40', 'shadow-lg', 'shadow-amber-500/20');
      }
    });
    document.querySelectorAll('[data-year-panel]').forEach(function (panel) {
      if (parseInt(panel.dataset.yearPanel, 10) === year) panel.classList.remove('hidden');
      else panel.classList.add('hidden');
    });
    resetFixturesScroll(year);
  }

  function resetFixturesScroll(year) {
    var panel = document.querySelector('[data-year-panel="' + year + '"]');
    if (!panel) return;
    var scroller = panel.querySelector('.hscroll.hscroll-fixtures');
    if (!scroller) return;
    scroller.scrollTo({ left: 0, behavior: 'auto' });
    requestAnimationFrame(function () {
      scroller.scrollTo({ left: 0, behavior: 'auto' });
    });
  }

  function getCurrentVisibleYear() {
    var visiblePanel = document.querySelector('[data-year-panel]:not(.hidden)');
    return visiblePanel ? parseInt(visiblePanel.dataset.yearPanel, 10) : 2026;
  }

  window.addEventListener('pageshow', function () {
    resetFixturesScroll(getCurrentVisibleYear());
  });

  /* ---------- 横滑箭头（桌面端） ---------- */
  function initScrollArrows() {
    document.querySelectorAll('.hscroll-wrapper').forEach(function (wrapper) {
      var hscroll = wrapper.querySelector('.hscroll');
      var leftBtn = wrapper.querySelector('.scroll-left');
      var rightBtn = wrapper.querySelector('.scroll-right');
      var fadeLeft = wrapper.querySelector('.hscroll-fade-left');
      var fadeRight = wrapper.querySelector('.hscroll-fade-right');
      if (!hscroll || !leftBtn || !rightBtn) return;
      function updateArrows() {
        var atStart = hscroll.scrollLeft <= 2;
        var atEnd = hscroll.scrollLeft + hscroll.clientWidth >= hscroll.scrollWidth - 2;
        leftBtn.classList.toggle('hidden', atStart);
        rightBtn.classList.toggle('hidden', atEnd);
        if (fadeLeft) fadeLeft.classList.toggle('hidden', atStart);
        if (fadeRight) fadeRight.classList.toggle('hidden', atEnd);
      }
      if (wrapper.__starfcArrowsInit) { updateArrows(); return; }
      wrapper.__starfcArrowsInit = true;
      leftBtn.addEventListener('click', function () {
        hscroll.scrollBy({ left: -hscroll.clientWidth, behavior: 'smooth' });
      });
      rightBtn.addEventListener('click', function () {
        hscroll.scrollBy({ left: hscroll.clientWidth, behavior: 'smooth' });
      });
      hscroll.addEventListener('scroll', updateArrows);
      updateArrows();
    });
  }

  /* ---------- 语言切换入口 ---------- */
  function setLanguage(lang) {
    lang = lang === 'en' ? 'en' : 'zh';
    localStorage.setItem(LANG_KEY, lang);
    applyI18n();
    renderFixtures();
    renderMedia();
    renderTeam();
    setTimeout(initScrollArrows, 100);
  }

  /* ---------- 对 HTML onclick 暴露的全局函数 ---------- */
  window.setLanguage = setLanguage;
  window.toggleMobileMenu = toggleMobileMenu;
  window.closeMobileMenu = closeMobileMenu;
  window.switchYear = switchYear;
  window.initStarFCScrollArrows = initScrollArrows;
  window.getStarFCLanguage = getLang;

  /* ---------- 初始化 ---------- */
  function init() {
    applyI18n();
    renderFixtures();
    renderMedia();
    renderTeam();
    resetFixturesScroll(2026);
    setTimeout(initScrollArrows, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
