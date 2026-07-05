# STAR FC 官网 — 重构前基准清单 (BASELINE)

> 记录时间：2026-07-05。基准对象：本地 `index.html`（与线上 www.starfc.sg 完全一致，均为 239110 字节，commit `4cbd344`）。
> 本文件是后续每一阶段验收的对照标准：任何板块、功能、数据、双语行为都不得低于本清单描述的状态。

---

## 0. 技术形态（重构前）

- 纯静态单页：唯一发布物 `index.html`（3391 行，239KB），锚点导航。
- 样式：**Tailwind CDN**（`cdn.tailwindcss.com`，运行时 JIT 编译）+ 页内 `<style>` 自定义 CSS（横滑系统、移动菜单动画等）。
- 字体：Google Fonts `Noto Sans SC`（400–900）。
- JS：全部内联在 `index.html` 的多个 `<script>` 块中；唯一外部 JS 为 `assets/js/data.js`（球员名单，`window.STAR_FC_DATA.players`，40 人）。
- 数据：赛程/比分/进球全部**硬编码为 HTML 卡片**（`FIXTURES_2025_START/END`、`FIXTURES_2026_START/END` 注释区块）；赛季统计数字**手写死**在 HTML。
- 页面底部有 4 个 `<script type="application/json">` 数据岛（links-data / hall-data / media-data / fixtures-data），**全部是占位/示例数据，不驱动任何渲染**（文档已注明）。
- 部署：GitHub main → Vercel 零配置自动部署。
- 遗留文件：`starfc-website.jsx`（91KB React 原型，页面未引用，不参与部署逻辑）。

## 1. 全局导航与框架

| 项目 | 基准行为 |
|---|---|
| 固定顶栏 | 队徽 + "STAR FC / SINCE 2002"；透明背景，滚动 >50px 后变 `slate-900/95` 毛玻璃+阴影 |
| 桌面导航（≥lg） | 9 个锚点链接：主页 #home / 赛程战绩 #fixtures / 媒体中心 #media / 球队成员 #team / 名人堂 #hall / 关于我们 #about / 队史大事记 #history / 加入我们 #join / 联系我们 #contact |
| 语言切换器 | 顶栏胶囊按钮组"中文 / EN"，激活态琥珀色底；移动菜单内还有一组 |
| 移动菜单（<lg） | 汉堡按钮 → 右侧滑入面板（80vw，max 360px）+ 半透明遮罩；含全部 9 链接 + 语言切换；点链接/遮罩关闭；Esc 关闭；汉堡三横变 X 动画；打开时锁定 body 滚动；`prefers-reduced-motion` 时近乎无动画 |
| 平滑滚动 | `html { scroll-behavior: smooth }`，锚点跳转平滑 |

## 2. 中英文双语实现（重构前机制）

- 默认**中文**；`<html lang="zh-CN">`。
- 切换到 EN：`localStorage['starfc-language']` 持久化；刷新后保持。
- 实现方式：中文是 DOM 里的源文本；点 EN 时用 TreeWalker 遍历全部文本节点，用一张 **"中文原文 → 英文"字典**（约 130 条，内联在 index.html）替换；同时翻译 `placeholder / aria-label / alt / title` 属性；`document.title` 同步翻译；`<html lang>` 切为 `en`。
- 动态规则：`UAFL 第X轮` → `UAFL Round X`；`（比赛集锦）` → `(Highlights)`；进球行（以 ⚽ 开头）内的中文球员名按 `PLAYER_NAME_TRANSLATIONS`（15 条）逐个替换成英文名。
- 球队成员板块由 JS 渲染，切语言时整体重渲染（分组标题/人数/提示语双语）。
- **中文内容内联在 HTML 中，对搜索引擎可见**；英文靠 JS 运行时替换（不可索引，属已知现状）。

## 3. 板块逐项清单

### 3.1 主页 Hero（#home）
- 队徽大图（发光 drop-shadow）；徽章行"成立于 2002 · 新加坡 11 人制草根球队"+ 琥珀色脉冲圆点。
- 主标题 `STAR FC`（FC 为琥珀渐变字）；副标题"新加坡 STAR 足球俱乐部"；口号"从 2002 到今天，继续上场。"
- 3 个 CTA：**查看赛程战绩**（红色实心 → #fixtures）、**了解 STAR FC 的故事**（→ #history）、**我要加入球队**（琥珀描边 → #join）。
- 深色渐变 + 网格纹理 + 十字点缀背景，满屏高度。

### 3.2 赛程战绩（#fixtures）
- 标题区：eyebrow "Fixtures & Results" + "赛程与战绩"。
- **年份切换**：2025 / 2026 胶囊按钮，默认 **2026**；切换显示对应面板并把横滑复位到最左（最新一场）；bfcache 恢复时也复位。
- 每个年份面板 = 横滑卡片列表 + 赛季统计：
  - 横滑系统：移动端 1 卡/屏（640px+ 2 卡、1024px+ 固定 3 卡），scroll-snap；移动端有"左右滑动查看更多"提示；桌面端显示左右箭头按钮 + 两侧渐隐遮罩 + 细滚动条，箭头到头自动隐藏。
  - **比赛卡片**：📅 日期 + 赛事徽章（友谊赛 / UAFL 第X轮 / UAFL）+ 结果徽章（WIN 绿 / DRAW 灰 / LOSS 玫红）+ "STAR FC vs 对手" + 大号等宽比分（按胜平负着色）+ ⚽ 进球队员行 + 📍 地点·时间。
  - **2025 面板：50 张卡**（2025-12-28 → 2025-01-12，从新到旧）；统计：比赛 50 / 胜 38 / 平 4 / 负 8 / 进球 234 / 失球 112。
  - **2026 面板：20 张卡**（2026-05-10 → 2026-01-04）；统计：比赛 20 / 胜 12 / 平 2 / 负 6 / 进球 88 / 失球 43；下方注"2026 赛季进行中，赛程与战绩持续更新"。
  - ⚠️ 统计数字与卡片实际汇总**完全吻合**（已脚本核验）：自动计算后数值不会变化。
  - 每张卡的 WIN/DRAW/LOSS 徽章与比分方向**无一矛盾**（已核验，可安全由比分推导）。
- 数据质量现状（阶段 2 要修）：2025 进球者用英文全名 + `(N)` 计数；2026 混用中文名/绰号 + `x N` 计数（小许、雄、老孙、干哥、Jaron小杰、fred、Joel…）；两个对手名占位（"Opponent A" 2026-04-05、"Opponent B" 2026-03-15）；特殊记号：`Guest`（客串）、`OG`（乌龙/对方自摆）、一条 `-`。

### 3.3 媒体中心（#media）
- 标题 + 说明"持续记录比赛集锦与关键瞬间"。
- "视频 / 比赛集锦"子栏：**8 张 YouTube 卡片**（2025-12-28 Big Boy FC / 12-21 Unity FC / 12-14 Victoria School Alumni / 11-30 West Coast Rangers / 11-23 Warriors United / 11-15 SUTD / 11-09 Champon FC / 11-06 SCC II），每张：红色渐变封面占位 + 播放按钮 + "YouTube" 角标 + 标题（日期 vs 对手（比赛集锦））+ "在 YouTube 观看"按钮；整卡与按钮都是 `youtu.be` 外链（新标签，noopener）。
- 同一套横滑系统（箭头/渐隐/提示）。

### 3.4 球队成员（#team）
- 标题"当前阵容"+ "2026 赛季" + "按位置浏览 STAR FC 当前阵容"。
- **由 JS 从 `assets/js/data.js` 渲染**（40 名球员，40 张卡全部渲染，已实测）：按位置分 4 组——前锋（WINGER+STRIKER）/ 中场（CM+DM）/ 后卫（CB+FULL BACK）/ 门将（GK）；组内排序：队长 → 副队长 → 号码升序。
- 队长：`liu-meihua`（C 徽章，琥珀）；副队长：`zhang-xin`、`feng-xin`（VC 徽章，灰）。
- 名字覆盖：`victor-chukwuebuka-ebele` 显示为 "Victor"。
- 每张卡：3:4 头像位（读 `assets/img/players/<id>/profile.jpg`，**当前所有球员均无照片文件 → 全部显示"头像待补充"占位**，图片加载失败优雅降级）+ #号码 + 徽章 + 姓名 + 位置。
- 组标题右侧显示"共 N 人"；横滑窄卡（移动 2 卡 → 桌面 5-6 卡）。

### 3.5 名人堂（#hall）
- 标题 + 说明"记录 STAR FC 的关键人物、功勋队员与名誉成员。"
- **3 张占位卡**：名人堂/首批名单整理中/确认后正式发布；资料整理/功勋队员资料确认中/照片与故事待补充；持续更新/更多人物待补充/欢迎提供历史照片与资料。配图为 `star_logo.jpg` 40% 透明度。

### 3.6 关于我们（#about）
- 两段球队故事（2001 年雏形：AIT 留学生队+浙江足球队；2002 年 9 月整合更名，终身名誉队长 Lemon（9 号）牵头；20 余年、200+ 球员、队徽队规纪念球衣传统）。
- 4 个数据块：**23+ 年历史 / 亚军 2025 UAFL 联赛 / 200+ 历史球员 / 30+ 活跃成员**。
- 价值观 4 卡：🤝 团结 Unity / 💡 分享 Share / ⚽ 乐趣 Fun / 📈 成长 Growth，各配一段正文。

### 3.7 队史大事记（#history）
- 垂直时间轴（渐变竖线 + 圆形年份节点），7 个节点：
  1. 2001 雏形形成；2. 2002.09 整合更名为 STAR；3. 2005.08 队规第一版发布；4. 2008 启用现版队徽（巨龙盾徽说明）；5. 08–10 一年多不败纪录；6. 2025 UAFL 联赛亚军；7. 现在 · 继续记录与传承（Veo3 记录）。

### 3.8 球队档案与故事（#stories，导航未列入但存在）
- 标题"球队档案与故事"+ "二十多年，留下的不只是比分"。
- **3 张小红书文章卡**（外链 xhslink.com，新标签）：目标：新加坡最好的业余华人足球俱乐部（2023-08-30）/ STAR 人物志 ②：聂少归渝（2023-05-27）/ STAR FC 编年史（2023-04-12）；每张含"小红书"标签、摘要、日期、"查看原文 →"。
- 尾注"后续会继续补充比赛战报、活动与球队故事。"

### 3.9 加入我们（#join）
- 标题"我们一直在等 / 那个热爱足球的你"。
- "试训联系信息"卡：表单字段——姓名（text）、联系方式（text）、擅长位置（select：请选择/门将/后卫/中场/前锋）、踢球经验（select：请选择/业余爱好/校队/公司队/正式联赛经验）、自我介绍（textarea，可选）。
- **提交行为 = mailto 链接**：红色大按钮"发送邮件咨询试训" → `mailto:account@starfc.sg?subject=STAR%20FC%20Trial%20Enquiry`。⚠️ 表单字段不会被收集/带入邮件（现状即如此），无任何后端。此行为必须保持不变。

### 3.10 联系我们（#contact）
- 说明行"无论你是想加入球队、安排友谊赛，还是进行球队合作或活动沟通"。
- 3 个联系卡：邮箱 `account@starfc.sg`（mailto）/ 小红书"新加坡STAR足球俱乐部"（xhslink.com/m/8BgWbanhmVq）/ YouTube "Singapore Star FC"（youtube.com/@SingaporeStarFC）。
- "常用球场"列表 7 项：SCC Dempsey / SCC Padang / Safra Tampines / SIA Sports Club / Orchid Park Secondary School / Hua Yi Secondary School / Boon Lay Secondary School。

### 3.11 页脚
- 队徽 + STAR FC / SINCE 2002 + 一句话简介。
- 快速链接 5 项（关于我们/赛程战绩/媒体中心/加入球队/联系我们）。
- 关注我们：小红书 + YouTube 图标按钮。
- 版权行"© 2002-2026 STAR FC. All rights reserved. | 新加坡 STAR 足球俱乐部"。

## 4. 现状的 SEO / 元信息（重构前，供 Phase 4 对比）

- `<title>STAR FC | 新加坡 STAR 足球俱乐部</title>`；favicon + apple-touch-icon 用 `starfclogo2.png`（698KB，未压缩）。
- **无** meta description、无 Open Graph、无 Twitter Card、无 JSON-LD、无 canonical。
- 非语义结构：无 `<main>`、无 `<h1>` 以外的 landmark 体系（nav/footer 有）；图片基本有 alt。
- 性能：Tailwind CDN 阻塞渲染；星标 logo 698KB；star_logo.jpg 192KB。

## 5. 维护配套（重构前）

- `docs/`：CONTENT_MAINTENANCE / WEEKLY_UPDATE_CHECKLIST / MATCH_SCREENSHOT_UPDATE_WORKFLOW / CONTENT_ASSET_WORKFLOW / PLAYER_PHOTO_GUIDE / DESIGN（Tailwind token 约定）。每周流程 = 复制 HTML 卡片改 5 个字段 + 手动同步统计数字。
- `scripts/`：validate-assets.sh（球员缺图检查）、normalize-player-photos.sh、import-player-photos.sh、validate-media-covers.py。
- inbox 目录：match-screenshots-inbox / media-cover-inbox / player-photo-inbox / hall-of-fame-inbox（素材投递用，均只有 README）。

## 6. 验收核对表（每阶段结束逐项打勾）

- [ ] 9 个导航锚点全部可跳转，对应板块齐全
- [ ] 2025 面板 50 场、2026 面板 20 场，统计 = 50/38/4/8/234/112 与 20/12/2/6/88/43
- [ ] 年份切换 + 横滑（移动提示/桌面箭头）正常
- [ ] 媒体中心 8 条 YouTube 链接逐一保留
- [ ] 球队成员 40 人、4 组、C/VC 徽章、Victor 显示名、照片占位降级
- [ ] 名人堂 3 占位卡、关于（含 4 数据块+4 价值观）、大事记 7 节点、故事 3 外链
- [ ] 试训表单字段齐全，按钮仍为同一 mailto 地址与主题
- [ ] 联系方式 3 项 + 球场 7 项、页脚完整
- [ ] 中英切换：全部界面文案、进球人名、UAFL 轮次、attribute（placeholder 等）正确切换；localStorage 记忆；`<html lang>` 正确
- [ ] 无 console 报错；桌面 + 375px 手机宽度截图核对
