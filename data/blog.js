// =====================================================================
// STAR FC 博客/档案索引（唯一维护入口）
// =====================================================================
// 首页"球队档案与故事"与 blog/index.html 都由本文件驱动（新→旧排序自动）。
// 【约定】博客只收站内文章（type: "post"），不再添加外链条目；
//        历史小红书内容由维护 agent 逐篇迁移为站内文章（小红书账号入口在页脚保留）。
// 条目格式（发文完整流程见 AGENTS.md 任务 C，先复制 blog/_template.html）：
//   { "slug": "2026-07-xx-something", "type": "post", "date": "2026-07-06",
//     "titleZh": "标题", "titleEn": "Title",
//     "excerptZh": "一两句摘要", "excerptEn": "One-line excerpt",
//     "tagZh": "赛季档案", "tagEn": "Season Archive", "cover": null },
// 规则：slug 小写 kebab-case 全局唯一；date 用 YYYY-MM-DD；
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
      "slug": "star-fc-chronicle",
      "type": "post",
      "date": "2023-04-12",
      "titleZh": "STAR FC 编年史：故事还在继续",
      "titleEn": "STAR FC Chronicle: The Story Goes On",
      "excerptZh": "STAR FC 创立于 2002 年，从浙江华人足球队到 STAR FC，二十多年间以团结、分享和乐趣为核心，一直延续到今天。",
      "excerptEn": "Founded in 2002, STAR FC grew from Zhejiang Chinese Football Team into a football community built on unity, sharing and joy.",
      "tagZh": "队史档案",
      "tagEn": "Club Archive",
      "cover": "assets/img/news/star-fc-chronicle/01-red-kit.jpg"
    }
  ]
};
