// =====================================================================
// STAR FC 博客/档案索引（唯一维护入口）
// =====================================================================
// 首页"球队档案与故事"与 blog/index.html 都由本文件驱动（新→旧排序自动）。
// 两种条目：
// 1) 站内文章（type: "post"）——正文是 blog/<slug>.html 独立页面：
//    { "slug": "2026-07-xx-something", "type": "post", "date": "2026-07-06",
//      "titleZh": "标题", "titleEn": "Title",
//      "excerptZh": "一两句摘要", "excerptEn": "One-line excerpt",
//      "tagZh": "球队博客", "tagEn": "Blog", "cover": null },
//    发文完整流程见 AGENTS.md 任务 C（先复制 blog/_template.html）。
// 2) 外部链接（type: "external"）——跳转小红书等外站：
//    { "slug": "xhs-xxx", "type": "external", "url": "https://...", 其余字段同上 }
// 规则：slug 用小写 kebab-case 且全局唯一；date 用 YYYY-MM-DD；
//       titleEn/excerptEn 缺省时英文界面回退中文。
// =====================================================================
window.STARFC = window.STARFC || {};
window.STARFC.blog = {
  posts: [
    {
      "slug": "2025-season-review",
      "type": "post",
      "date": "2026-07-06",
      "titleZh": "2025 赛季回顾：50 场比赛，从未散场",
      "titleEn": "2025 Season Review: 50 Matches, The Game Went On",
      "excerptZh": "38 胜 4 平 8 负，234 粒进球，一座 UAFL 亚军——用数据把 2025 收进档案。",
      "excerptEn": "38 wins, 4 draws, 8 losses, 234 goals and a UAFL runners-up finish — the 2025 season, on the record.",
      "tagZh": "赛季档案",
      "tagEn": "Season Archive",
      "cover": null
    },
    {
      "slug": "xhs-goal-best-club",
      "type": "external",
      "date": "2023-08-30",
      "url": "http://xhslink.com/o/65x7g6P3zwi",
      "titleZh": "目标：新加坡最好的业余华人足球俱乐部",
      "titleEn": "Goal: Singapore's best amateur Chinese football club",
      "excerptZh": "一篇关于 STAR FC 目标与团队文化的记录。",
      "excerptEn": "A note on STAR FC goals and team culture.",
      "tagZh": "小红书",
      "tagEn": "Xiaohongshu",
      "cover": null
    },
    {
      "slug": "xhs-nie-shao",
      "type": "external",
      "date": "2023-05-27",
      "url": "http://xhslink.com/o/10oC9XUIZrS",
      "titleZh": "STAR 人物志 ②：聂少归渝",
      "titleEn": "STAR Profile II: Nie Shao returns to Chongqing",
      "excerptZh": "记录一位关键球员聂少与 STAR FC 的故事。",
      "excerptEn": "A story about key player Nie Shao and STAR FC.",
      "tagZh": "小红书",
      "tagEn": "Xiaohongshu",
      "cover": null
    },
    {
      "slug": "xhs-chronicle",
      "type": "external",
      "date": "2023-04-12",
      "url": "http://xhslink.com/o/5vMCLE0YP3v",
      "titleZh": "STAR FC 编年史",
      "titleEn": "STAR FC Chronicle",
      "excerptZh": "从 2002 到今天：我们的起点与沿途。",
      "excerptEn": "From 2002 to today: where we started and what we carried along.",
      "tagZh": "小红书",
      "tagEn": "Xiaohongshu",
      "cover": null
    }
  ]
};
