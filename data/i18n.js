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
    zh: 'STAR FC 成立于 2002 年，是新加坡活跃的 11 人制草根华人足球俱乐部：赛程与战绩、比赛集锦、球队阵容与球队故事。',
    en: 'Founded in 2002, STAR FC is a grassroots 11-a-side football club in Singapore. Fixtures and results, match highlights, squad and club stories.'
  },
  'a11y.crestAlt': { zh: 'STAR FC 官方队徽', en: 'STAR FC official crest' },
  'a11y.langSwitcher': { zh: '语言切换', en: 'Language switcher' },
  'a11y.menuOpen': { zh: '打开菜单', en: 'Open menu' },
  'common.swipeHint': { zh: '左右滑动查看更多', en: 'Swipe to view more' },
  'common.scrollLeft': { zh: '向左滚动', en: 'Scroll left' },
  'common.scrollRight': { zh: '向右滚动', en: 'Scroll right' },

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
  'hero.badge': { zh: '成立于 2002 · 新加坡 11 人制草根球队', en: 'Founded in 2002 · Singapore 11-a-side grassroots football club' },
  'hero.subtitle': { zh: '新加坡 STAR 足球俱乐部', en: 'Singapore STAR Football Club' },
  'hero.tagline1': { zh: '从 2002 到今天，', en: 'Since 2002, ' },
  'hero.tagline2': { zh: '继续上场。', en: 'still on the pitch.' },
  'hero.ctaFixtures': { zh: '查看赛程战绩', en: 'View Fixtures & Results' },
  'hero.ctaStory': { zh: '了解 STAR FC 的故事', en: 'Explore Our Story' },
  'hero.ctaJoin': { zh: '我要加入球队', en: 'Join the Team' },

  // ---- Hero 最新战绩条 / 跑马灯 ----
  'hero.latestLabel': { zh: '最新战绩', en: 'Latest Result' },
  'hero.formLabel': { zh: '近 5 场', en: 'Last 5' },
  'ticker.grassroots': { zh: '新加坡 11 人制草根球队', en: 'Singapore 11-a-side grassroots club' },
  'ticker.runnerUp': { zh: '2025 UAFL 联赛亚军', en: '2025 UAFL Runners-up' },
  'ticker.players': { zh: '200+ 历史球员', en: '200+ players all-time' },
  'ticker.motto': { zh: '从 2002 到今天，继续上场', en: 'Since 2002, still on the pitch' },

  // ---- 赛程战绩 ----
  'fixtures.title': { zh: '赛程与战绩', en: 'Fixtures & Results' },
  'fixtures.scorersTitle': { zh: '射手榜', en: 'Top Scorers' },
  'fixtures.scorersSub': { zh: '由比赛数据自动统计', en: 'Computed from match data' },
  'fixtures.scorersGoals': { zh: '{n} 球', en: '{n}' },
  'fixtures.seasonSummary': { zh: '赛季总结', en: 'Season Summary' },
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
  'about.p1a': { zh: ' 的雏形始于 ', en: ' began around ' },
  'about.p1b': { zh: '2001 年', en: '2001' },
  'about.p1c': { zh: '，最初由 AIT 留学生队与浙江足球队等群体在新加坡的社区球场相聚踢球。', en: ', when groups including the AIT student team and Zhejiang football community gathered on local pitches in Singapore. ' },
  'about.p1d': { zh: '2002 年 9 月', en: 'September 2002' },
  'about.p1e': { zh: '，各分支正式整合并更名为 ', en: ', the different groups formally came together and adopted the name ' },
  'about.p1f': { zh: '，由终身名誉队长 ', en: ', led by lifetime honorary captain ' },
  'about.p1g': { zh: 'Lemon（9 号）', en: 'Lemon (No. 9)' },
  'about.p1h': { zh: ' 牵头组建。', en: '.' },
  'about.p2': { zh: '二十余年来，STAR FC 作为一支草根 11 人制球队，在新加坡持续活跃，参与本地联赛与友谊赛，累计吸纳超过 200 名球员。球队保留了队徽、队规与纪念球衣等传统，一代带一代，从未散场。', en: 'For more than two decades, STAR FC has stayed active in Singapore as a grassroots 11-a-side team, playing local leagues and friendlies while welcoming more than 200 players. The club keeps its crest, rules, commemorative shirts and traditions alive, passed from one generation to the next.' },
  'about.stat1Label': { zh: '年历史', en: 'Years of history' },
  'about.stat2Value': { zh: '亚军', en: 'Runner-up' },
  'about.stat2Label': { zh: '2025 UAFL 联赛', en: '2025 UAFL League' },
  'about.stat3Label': { zh: '历史球员', en: 'Players all-time' },
  'about.stat4Label': { zh: '活跃成员', en: 'Active members' },
  'about.valuesTitle': { zh: '团结、分享、乐趣、成长', en: 'Unity, Sharing, Fun, Growth' },
  'about.v1.title': { zh: '团结 Unity', en: 'Unity' },
  'about.v1.body': { zh: '我们把团队放在第一位：场上服从安排、彼此补位；场下尊重与沟通。一代带一代的传承，让球队在二十余年里持续延续。', en: 'We put the team first: disciplined shape on the pitch, cover for one another, and respect off it. That one-generation-to-the-next culture has kept STAR FC moving for more than 20 years.' },
  'about.v2.title': { zh: '分享 Share', en: 'Sharing' },
  'about.v2.body': { zh: '技术与经验不藏私：从配合跑位到比赛复盘，愿意讲、也愿意听。我们相信“让队友更容易发挥”，比个人表现更重要。', en: 'We share technique and experience openly, from movement patterns to match reviews. Helping teammates play better matters more than individual highlights.' },
  'about.v3.title': { zh: '乐趣 Fun', en: 'Fun' },
  'about.v3.body': { zh: '周末回到绿茵场，是忙碌生活里最放松的两小时。赢球一起开心，失利也不抱怨、不内耗，下一场再来。', en: 'Weekend football is the two-hour reset in a busy life. We enjoy wins together, handle losses without drama, and come back for the next match.' },
  'about.v4.title': { zh: '成长 Growth', en: 'Growth' },
  'about.v4.body': { zh: '我们欢迎不同水平，但重视态度与责任：准时、投入、认真对待训练和比赛。可以慢，但要愿意学、敢于改、愿意为队友付出。', en: 'We welcome different levels, but we value attitude and responsibility: be on time, stay engaged, and take training and matches seriously. Progress can be slow, but the willingness to learn and contribute matters.' },

  // ---- 队史大事记 ----
  'history.title': { zh: 'STAR FC 大事记', en: 'STAR FC Timeline' },
  'history.desc': { zh: '从 2001 到今天，我们走过了这些年份', en: 'From 2001 to today, these are the years that shaped us' },
  'history.i1.title': { zh: '雏形形成', en: 'The Early Shape' },
  'history.i1.body': { zh: 'AIT 留学生队、浙江足球队等群体在新加坡社区球场自发踢球，STAR FC 的雏形在这一年形成。', en: 'The AIT student team, Zhejiang football group and other communities began playing together on Singapore community pitches. STAR FC started to take shape.' },
  'history.i2.title': { zh: '整合更名为 STAR', en: 'United as STAR' },
  'history.i2.body': { zh: '各分支球队正式整合，由终身名誉队长 Lemon（9 号）牵头，更名为「STAR 足球俱乐部」。', en: 'The different groups formally united under lifetime honorary captain Lemon (No. 9) and became STAR Football Club.' },
  'history.i3.title': { zh: '队规第一版发布', en: 'First Club Rules' },
  'history.i3.body': { zh: '2005 年 8 月 8 日，球队正式发布第一版队规，明确管理规范与行为准则，奠定球队文化基础。', en: 'On 8 August 2005, the club published its first rules, setting clear standards for management, behavior and team culture.' },
  'history.i4.title': { zh: '启用现版队徽', en: 'Current Crest Introduced' },
  'history.i4.body': { zh: '球队对队徽进行改进，启用现在这版带巨龙的盾牌式队徽：红色代表热血与激情，两颗星代表"STAR"的含义，居中的巨龙象征"龙的传人"。', en: 'The club refined its crest into the current shield with a dragon: red stands for passion, the two stars represent STAR, and the central dragon honors Chinese heritage.' },
  'history.i5.title': { zh: '一年多不败纪录', en: 'Long Unbeaten Run' },
  'history.i5.body': { zh: '2008 年至 2010 年间，球队创下一年多不败的历史纪录，成为 STAR FC 早期的巅峰时期。', en: 'Between 2008 and 2010, STAR FC recorded an unbeaten run lasting more than a year, one of the early peaks in club history.' },
  'history.i6.title': { zh: 'UAFL 联赛亚军', en: 'UAFL League Runner-up' },
  'history.i6.body': { zh: '球队在 UAFL 业余联赛中取得联赛第二名的佳绩，主力阵容以老带新，新一代球员逐渐成长为中坚力量。', en: 'The team finished second in the UAFL amateur league, with senior players guiding a new generation into core roles.' },
  'history.i7.year': { zh: '现在', en: 'Now' },
  'history.i7.title': { zh: '继续记录与传承', en: 'Recording and Carrying On' },
  'history.i7.body': { zh: '依托 Veo3 等录像设备，STAR FC 正在更系统地记录比赛与训练。对很多队员来说，这里早已是一群人长期相聚的地方。', en: 'With tools such as the Veo3 camera, STAR FC is recording matches and training more systematically. For many players, this has become a place they keep returning to.' },

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
  'contact.venues': { zh: '常用球场', en: 'Common Venues' },

  // ---- 页脚 ----
  'footer.tagline': { zh: '新加坡 STAR 足球俱乐部。从 2002 到今天，继续上场。', en: 'Singapore STAR Football Club. Since 2002, still on the pitch.' },
  'footer.quickLinks': { zh: '快速链接', en: 'Quick Links' },
  'footer.follow': { zh: '关注我们', en: 'Follow Us' },
  'footer.joinTeam': { zh: '加入球队', en: 'Join the Team' },
  'footer.copyright': { zh: '© 2002-2026 STAR FC. All rights reserved. | 新加坡 STAR 足球俱乐部', en: '© 2002-2026 STAR FC. All rights reserved. | Singapore STAR Football Club' }
};
