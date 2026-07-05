// =====================================================================
// STAR FC 界面文案词典（中 / 英）
// =====================================================================
// 结构：每条 { zh: '中文', en: 'English' }。
// - HTML 里的静态文案通过 data-i18n="键名" 绑定；语言切换时由
//   assets/js/main.js 读取本词典替换文本（属性用 data-i18n-attr）。
// - JS 动态渲染（赛程 / 阵容 / 媒体）直接调用 STARFC 的 t('键名')。
// 新增界面文案：加一条键值 + 在 HTML/JS 里引用键名；zh 和 en 必须成对。
// =====================================================================
window.STARFC = window.STARFC || {};
window.STARFC.i18n = {
  // ---- 全站 / meta ----
  'meta.title': { zh: 'STAR FC | 新加坡 STAR 足球俱乐部', en: 'STAR FC | Singapore STAR Football Club' },
  'meta.description': {
    zh: 'STAR FC，2002 年成立的新加坡华人业余足球俱乐部。人来人往，从未散场：每周比赛与集锦、阵容与射手榜、球队故事。',
    en: 'STAR FC, a Chinese community football club in Singapore since 2002. People come and go — the game goes on: weekly fixtures, highlights, squad and stories.'
  },
  'a11y.crestAlt': { zh: 'STAR FC 官方队徽', en: 'STAR FC official crest' },
  'a11y.langSwitcher': { zh: '语言切换', en: 'Language switcher' },
  'a11y.menuOpen': { zh: '打开菜单', en: 'Open menu' },

  // ---- 导航 ----
  'nav.home': { zh: '主页', en: 'Home' },
  'nav.fixtures': { zh: '赛程战绩', en: 'Fixtures' },
  'nav.media': { zh: '媒体中心', en: 'Media' },
  'nav.team': { zh: '球队成员', en: 'Squad' },
  'nav.hall': { zh: '名人堂', en: 'Hall of Fame' },
  'nav.about': { zh: '关于我们', en: 'About' },
  'nav.history': { zh: '队史大事记', en: 'History' },
  'nav.join': { zh: '加入我们', en: 'Join Us' },
  'nav.contact': { zh: '联系我们', en: 'Contact' },

  // ---- 主页 Hero ----
  'hero.badge': { zh: '自 2002 · 每周日开球', en: 'Since 2002 · We play every Sunday' },
  'hero.subtitle': { zh: '五湖四海，因球相聚。', en: 'From far and wide, brought together by football.' },
  'hero.tagline1': { zh: '人来人往，', en: 'People come and go. ' },
  'hero.tagline2': { zh: '从未散场。', en: 'The game goes on.' },
  'hero.ctaFixtures': { zh: '查看赛程战绩', en: 'View Fixtures & Results' },
  'hero.ctaStory': { zh: '了解 STAR FC 的故事', en: 'Explore Our Story' },
  'hero.ctaJoin': { zh: '我要加入球队', en: 'Join the Team' },

  // ---- Hero 最新战绩条 / 跑马灯 ----
  'hero.latestLabel': { zh: '最新战绩', en: 'Latest Result' },
  'hero.formLabel': { zh: '近 5 场', en: 'Last 5' },
  'hero.nextLabel': { zh: '下一场', en: 'Next Match' },
  'hero.nextInDays': { zh: '{n} 天后', en: 'In {n} days' },
  'hero.nextToday': { zh: '今天开球', en: 'Kick-off today' },
  'hero.nextTomorrow': { zh: '明天开球', en: 'Kick-off tomorrow' },
  'ticker.sunday': { zh: '每周日开球', en: 'Kick-off every Sunday' },
  'ticker.runnerUp': { zh: '2025 UAFL 联赛亚军', en: '2025 UAFL Runners-up' },
  'ticker.seal': { zh: '以球会友', en: 'Friendship through football' },
  'ticker.motto': { zh: '人来人往 · 从未散场', en: 'People come and go — the game goes on' },

  // ---- 赛程战绩 ----
  'fixtures.title': { zh: '赛程与战绩', en: 'Fixtures & Results' },
  'fixtures.scorersTitle': { zh: '射手榜', en: 'Top Scorers' },
  'fixtures.scorersSub': { zh: '由比赛数据自动统计', en: 'Computed from match data' },
  'fixtures.scorersGoals': { zh: '{n} 球', en: '{n}' },
  'fixtures.note2026': { zh: '2026 赛季进行中，赛程与战绩持续更新', en: 'The 2026 season is in progress. Fixtures and results are updated regularly.' },
  'fixtures.upcoming': { zh: '即将开球', en: 'Upcoming' },
  'fixtures.showAll': { zh: '显示全部 {n} 场比赛', en: 'Show all {n} matches' },
  'fixtures.showLess': { zh: '收起', en: 'Show less' },
  'comp.friendly': { zh: '友谊赛', en: 'Friendly' },
  'comp.cup': { zh: '杯赛', en: 'Cup' },
  'comp.uaflRound': { zh: 'UAFL 第{n}轮', en: 'UAFL Round {n}' },
  'stats.played': { zh: '比赛', en: 'Matches' },
  'stats.won': { zh: '胜', en: 'Wins' },
  'stats.drawn': { zh: '平', en: 'Draws' },
  'stats.lost': { zh: '负', en: 'Losses' },
  'stats.goalsFor': { zh: '进球', en: 'Goals For' },
  'stats.goalsAgainst': { zh: '失球', en: 'Goals Against' },

  // ---- 媒体中心 ----
  'media.title': { zh: '媒体中心', en: 'Media Center' },
  'media.desc': { zh: '持续记录比赛集锦与关键瞬间', en: 'Recording match highlights and key moments as they happen.' },
  'media.videoTag': { zh: '视频', en: 'Video' },
  'media.videosTitle': { zh: '比赛集锦', en: 'Match Highlights' },
  'media.watchYoutube': { zh: '在 YouTube 观看', en: 'Watch on YouTube' },
  'media.highlightsSuffix': { zh: '（比赛集锦）', en: '(Highlights)' },

  // ---- 球队成员 ----
  'team.title': { zh: '当前阵容', en: 'Current Squad' },
  'team.season': { zh: '2026 赛季', en: '2026 Season' },
  'team.desc': { zh: '按位置浏览 STAR FC 当前阵容', en: 'Browse the current STAR FC squad by position' },
  'team.photoSoon': { zh: '头像待补充', en: 'Photo coming soon' },
  'team.groupFwd': { zh: '前锋', en: 'Forwards' },
  'team.groupMid': { zh: '中场', en: 'Midfielders' },
  'team.groupDef': { zh: '后卫', en: 'Defenders' },
  'team.groupGk': { zh: '门将', en: 'Goalkeepers' },
  'team.countN': { zh: '共 {n} 人', en: '{n} players' },

  // ---- 名人堂 ----
  'hall.title': { zh: '名人堂', en: 'Hall of Fame' },
  'hall.desc': { zh: '记录 STAR FC 的关键人物、功勋队员与名誉成员。', en: 'Honoring the key figures, contributors and honorary members of STAR FC.' },
  'hall.card1.tag': { zh: '名人堂', en: 'Hall of Fame' },
  'hall.card1.title': { zh: '首批名单整理中', en: 'First list in progress' },
  'hall.card1.sub': { zh: '确认后正式发布', en: 'To be published after confirmation' },
  'hall.card2.tag': { zh: '资料整理', en: 'Profile Review' },
  'hall.card2.title': { zh: '功勋队员资料确认中', en: 'Contributor profiles under review' },
  'hall.card2.sub': { zh: '照片与故事待补充', en: 'Photos and stories to be added' },
  'hall.card3.tag': { zh: '持续更新', en: 'Ongoing' },
  'hall.card3.title': { zh: '更多人物待补充', en: 'More names to be added' },
  'hall.card3.sub': { zh: '欢迎提供历史照片与资料', en: 'Historical photos and notes are welcome' },

  // ---- 关于我们 ----
  'about.title': { zh: '关于 STAR FC', en: 'About STAR FC' },
  'about.p1': { zh: '2000 年前后，一批从中国来到新加坡的人留了下来。2002 年 9 月，AIT 留学生队、浙江足球队等几支队伍整合为 STAR FC，由终身名誉队长 Lemon（9 号）牵头——这支球队，是留下来的人守着的。', en: 'Around 2000, a group who came from China to Singapore chose to stay. In September 2002 the AIT student team, the Zhejiang side and other groups merged into STAR FC, led by lifetime honorary captain Lemon (No. 9) — a club kept alive by the ones who stayed.' },
  'about.p2': { zh: '二十多年过去，一代代新人加入，元老们还在场上。今天的 STAR FC：四十人的现役名册，每个周日的正式比赛，每周更新的集锦，中英双语的社区。2025 年，我们拿到 UAFL 联赛亚军——下一场，照常开球。', en: 'More than twenty years on, new generations keep arriving and the founding members are still playing. STAR FC today: a forty-man roster, a proper match every Sunday, highlights published weekly, a bilingual community. In 2025 we finished UAFL runners-up — and the next kick-off is business as usual.' },
  'about.p3': { zh: '往远处看一眼：华人在新加坡踢球，已经踢了一百多年。我们只是其中普通的一章，想把这一章写得久一点。', en: 'Zoom out a little: Chinese communities have been playing football in Singapore for well over a century. We are one ordinary chapter of that story — we just intend to make it a long one.' },
  'about.stat1Label': { zh: '年，还在踢', en: 'Years running' },
  'about.stat2Label': { zh: '历史球员', en: 'Players all-time' },
  'about.stat3Label': { zh: '在册球员', en: 'On the roster' },
  'about.stat4Label': { zh: '场比赛记录在案', en: 'Matches on record' },
  'join.codeTitle': { zh: '球队之约', en: 'How We Play' },
  'join.codeDesc': { zh: '来试训之前，先看看我们在意什么。', en: 'Before you come down for a trial, here is what we care about.' },
  'about.v1.title': { zh: '团结', en: 'Unity' },
  'about.v1.body': { zh: '我们把团队放在第一位：场上服从安排、彼此补位；场下尊重与沟通。一代带一代的传承，让球队在二十余年里持续延续。', en: 'We put the team first: disciplined shape on the pitch, cover for one another, and respect off it. That one-generation-to-the-next culture has kept STAR FC moving for more than 20 years.' },
  'about.v2.title': { zh: '分享', en: 'Sharing' },
  'about.v2.body': { zh: '技术与经验不藏私：从配合跑位到比赛复盘，愿意讲、也愿意听。我们相信“让队友更容易发挥”，比个人表现更重要。', en: 'We share technique and experience openly, from movement patterns to match reviews. Helping teammates play better matters more than individual highlights.' },
  'about.v3.title': { zh: '乐趣', en: 'Fun' },
  'about.v3.body': { zh: '周末回到绿茵场，是忙碌生活里最放松的两小时。赢球一起开心，失利也不抱怨、不内耗，下一场再来。', en: 'Weekend football is the two-hour reset in a busy life. We enjoy wins together, handle losses without drama, and come back for the next match.' },
  'about.v4.title': { zh: '成长', en: 'Growth' },
  'about.v4.body': { zh: '我们欢迎不同水平，但重视态度与责任：准时、投入、认真对待训练和比赛。可以慢，但要愿意学、敢于改、愿意为队友付出。', en: 'We welcome different levels, but we value attitude and responsibility: be on time, stay engaged, and take training and matches seriously. Progress can be slow, but the willingness to learn and contribute matters.' },

  // ---- 队史大事记 ----
  'history.title': { zh: 'STAR FC 大事记', en: 'STAR FC Timeline' },
  'history.desc': { zh: '从 2001 到今天，我们走过了这些年份', en: 'From 2001 to today, these are the years that shaped us' },
  'history.i1.title': { zh: '起点', en: 'Where It Began' },
  'history.i1.body': { zh: 'AIT 留学生队、浙江足球队等几拨人在社区球场相聚踢球；2002 年 9 月正式整合为「STAR 足球俱乐部」，由终身名誉队长 Lemon（9 号）牵头。', en: 'The AIT student team, the Zhejiang side and other groups met on community pitches; in September 2002 they merged into STAR Football Club, led by lifetime honorary captain Lemon (No. 9).' },
  'history.i3.title': { zh: '队规第一版发布', en: 'First Club Rules' },
  'history.i3.body': { zh: '2005 年 8 月 8 日，球队正式发布第一版队规，明确管理规范与行为准则，奠定球队文化基础。', en: 'On 8 August 2005, the club published its first rules, setting clear standards for management, behavior and team culture.' },
  'history.i4.title': { zh: '启用现版队徽', en: 'Current Crest Introduced' },
  'history.i4.body': { zh: '球队对队徽进行改进，启用现在这版带巨龙的盾牌式队徽：红色代表热血与激情，两颗星代表"STAR"的含义，居中的巨龙象征"龙的传人"。', en: 'The club refined its crest into the current shield with a dragon: red stands for passion, the two stars represent STAR, and the central dragon honors Chinese heritage.' },
  'history.i5.title': { zh: '一年多不败纪录', en: 'Long Unbeaten Run' },
  'history.i5.body': { zh: '2008 年至 2010 年间，球队创下一年多不败的历史纪录，成为 STAR FC 早期的巅峰时期。', en: 'Between 2008 and 2010, STAR FC recorded an unbeaten run lasting more than a year, one of the early peaks in club history.' },
  'history.i6.title': { zh: 'UAFL 联赛亚军', en: 'UAFL League Runner-up' },
  'history.i6.body': { zh: '球队在 UAFL 业余联赛中取得联赛第二名的佳绩，主力阵容以老带新，新一代球员逐渐成长为中坚力量。', en: 'The team finished second in the UAFL amateur league, with senior players guiding a new generation into core roles.' },
  'history.i7.year': { zh: '现在', en: 'Now' },
  'history.i7.title': { zh: '照常开球', en: 'Kick-off As Usual' },
  'history.i7.body': { zh: '四十人的名册，每周日的比赛，每周更新的集锦。人来人往，从未散场——下一代的故事，正在写。', en: 'A forty-man roster, a match every Sunday, highlights every week. People come and go, the game goes on — and the next generation is already writing its chapter.' },

  // ---- 球队档案与故事 ----
  'stories.title': { zh: '球队档案与故事', en: 'Club Archive & Stories' },
  'stories.desc': { zh: '二十多年，留下的不只是比分', en: 'After more than two decades, the record is more than scores' },
  'stories.tag': { zh: '小红书', en: 'Xiaohongshu' },
  'stories.s1.title': { zh: '目标：新加坡最好的业余华人足球俱乐部', en: "Goal: Singapore's best amateur Chinese football club" },
  'stories.s1.desc': { zh: '一篇关于 STAR FC 目标与团队文化的记录。', en: 'A note on STAR FC goals and team culture.' },
  'stories.s2.title': { zh: 'STAR 人物志 ②：聂少归渝', en: 'STAR Profile ②: Nie Shao returns to Chongqing' },
  'stories.s2.desc': { zh: '记录一位关键球员聂少与 STAR FC 的故事。', en: 'A story about key player Nie Shao and STAR FC.' },
  'stories.s3.title': { zh: 'STAR FC 编年史', en: 'STAR FC Chronicle' },
  'stories.s3.desc': { zh: '从 2002 到今天：我们的起点与沿途。', en: 'From 2002 to today: where we started and what we have carried along.' },
  'stories.readMore': { zh: '查看原文 →', en: 'Read original →' },
  'stories.note': { zh: '后续会继续补充比赛战报、活动与球队故事。', en: 'Match reports, events and club stories will continue to be added here.' },

  // ---- 加入我们 ----
  'join.title': { zh: '我们一直在等', en: 'We Are Always Looking' },
  'join.subtitle': { zh: '那个热爱足球的你', en: 'For players who love the game' },
  'join.factLine': { zh: '正式 11 人制比赛 · 每周日 · 新加坡各球场', en: 'Proper 11-a-side football · Every Sunday · Across Singapore' },
  'join.formTitle': { zh: '试训联系信息', en: 'Trial Contact Info' },
  'join.name': { zh: '姓名', en: 'Name' },
  'join.namePh': { zh: '你的姓名', en: 'Your name' },
  'join.contact': { zh: '联系方式', en: 'Contact' },
  'join.contactPh': { zh: '手机号 / 邮箱', en: 'Phone / email' },
  'join.position': { zh: '擅长位置', en: 'Preferred position' },
  'join.select': { zh: '请选择', en: 'Please select' },
  'join.exp': { zh: '踢球经验', en: 'Football experience' },
  'join.exp1': { zh: '业余爱好', en: 'Recreational' },
  'join.exp2': { zh: '校队/公司队', en: 'School / company team' },
  'join.exp3': { zh: '正式联赛经验', en: 'League experience' },
  'join.intro': { zh: '自我介绍（可选）', en: 'Introduction (optional)' },
  'join.introPh': { zh: '简单介绍一下自己...', en: 'Tell us briefly about yourself...' },
  'join.cta': { zh: '发送邮件咨询试训', en: 'Email Us About a Trial' },

  // ---- 联系我们 ----
  'contact.title': { zh: '联系我们', en: 'Contact' },
  'contact.desc': { zh: '无论你是想加入球队、安排友谊赛，还是进行球队合作或活动沟通', en: 'Whether you want to join the team, arrange a friendly, or discuss club activities and collaborations' },
  'contact.email': { zh: '邮箱', en: 'Email' },
  'contact.xhs': { zh: '小红书', en: 'Xiaohongshu' },
  'contact.xhsName': { zh: '新加坡STAR足球俱乐部', en: 'Singapore STAR Football Club' },
  'contact.biz': { zh: '商务与合作', en: 'Partnerships' },
  'contact.bizDesc': { zh: '球衣广告 · 集锦内容合作 · 社区活动', en: 'Kit sponsorship · Content partnerships · Community events' },
  'contact.venues': { zh: '常用球场', en: 'Common Venues' },

  // ---- 页脚 ----
  'footer.seal': { zh: '以球会友', en: 'Friendship through football' },
  'footer.tagline': { zh: '新加坡 STAR 足球俱乐部。从 2002 到今天，继续上场。', en: 'Singapore STAR Football Club. Since 2002, still on the pitch.' },
  'footer.quickLinks': { zh: '快速链接', en: 'Quick Links' },
  'footer.follow': { zh: '关注我们', en: 'Follow Us' },
  'footer.joinTeam': { zh: '加入球队', en: 'Join the Team' },
  'footer.copyright': { zh: '© 2002-2026 STAR FC. All rights reserved. | 新加坡 STAR 足球俱乐部', en: '© 2002-2026 STAR FC. All rights reserved. | Singapore STAR Football Club' }
};
