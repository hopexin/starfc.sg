# STAR FC 官网 · 日常维护标准手册

> 本手册写给日常维护本仓库的 AI agent（CodeX 等）。照此手册操作即可完成全部例行维护；
> 手册没写的事，先问维护人（hopehpx@gmail.com），不要自行发挥。

## 0. 你在维护什么

- **www.starfc.sg**：新加坡 STAR 足球俱乐部官网。纯静态（HTML + CSS + 原生 JS），**零构建**。
- 部署链：`git push` 到 GitHub `main` → Vercel 自动上线（1–2 分钟）。**push 即发布，务必先过校验。**
- 架构：`index.html` 单页官网（锚点导航）+ `blog/` 独立文章页。**所有会变的内容都在 `data/` 目录**，
  页面由 `assets/js/main.js` 渲染；统计、射手榜、球员进球徽章、首页战绩条全部自动计算。

## 1. 金规（每次动手前默读一遍）

1. **只改数据层与内容层**：`data/*.js`、`blog/*.html`、`assets/img/**`、`docs/*`。
2. **禁区**（除非维护人明确要求）：`assets/js/main.js`、`assets/css/main.css`、`index.html` 结构、
   `scripts/*`、根目录配置文件。文案改动一律走 `data/i18n.js`，不要改 HTML 里的中文。
3. **零构建红线**：不引入任何框架、构建步骤、打包器、第三方运行时。
4. **一次一类改动**：一个 commit 只做一件事（一场比赛 / 一条视频 / 一篇文章）。
5. **提交闸门**：每次提交前必须通过 `node scripts/validate-data.js`（exit 0 且无 ERROR）。
6. **不编造**：对手名、球员名、比分、日期只用输入材料里确认的信息；认不出的球员名保持原文。
7. **中英成对**：`data/i18n.js` 的每个键必须同时有 zh 和 en。
8. **不要 force push**；出错就 `git revert`，不改历史。
9. `.DS_Store` 等系统文件不入库（.gitignore 已配）。
10. 完成后本地预览过一遍再 push（命令见 §8）。

## 2. 文件地图

| 路径 | 作用 | 你会动它吗 |
| --- | --- | --- |
| `data/fixtures.js` | 赛程战绩（唯一数据源，统计/射手榜自动算） | ✅ 每周 |
| `data/media.js` | 比赛集锦视频列表 | ✅ 每周 |
| `data/blog.js` | 博客/档案索引（首页故事区 + blog/index.html 都读它） | ✅ 发文时 |
| `blog/<slug>.html` | 独立文章页（SEO 主体） | ✅ 发文时 |
| `blog/_template.html` | 文章模板（复制用，站点不引用） | 只复制不修改 |
| `data/players.js` | 球员名册 + 队长 + 绰号别名表 | 偶尔 |
| `data/i18n.js` | 全站界面文案（中英成对） | 偶尔 |
| `assets/img/players/<id>/profile.jpg` | 球员照片 | 偶尔 |
| `sitemap.xml` | 由脚本生成，别手改 | 跑脚本 |
| `assets/js/main.js` / `assets/css/main.css` / `index.html` | 渲染与样式骨架 | 🚫 禁区 |
| `docs/` | 深度文档（截图录入细则、设计规范、照片流程） | 查阅 |

## 3. 任务 A：每周更新比赛（最常见）

1. 打开 `data/fixtures.js`，在对应赛季数组（如 `2026:`）**最前面**插入：

```js
{ date: '2026-07-12', comp: 'UAFL', opponent: 'Sporting', score: [3, 1],
  scorers: [{ id: 'jiang-chaoxiong', n: 2 }, { id: 'joel-loh-ziyang' }],
  venue: 'SCC Dempsey · 17:00' },
```

字段规则：
- `comp`：`'友谊赛'` / `'UAFL'` / `'UAFL 第X轮'` / `'杯赛'`（英文界面自动翻译）。
- `score`：`[我方, 对方]`；**未开赛填 `null`**（首页自动出"下一场"预告条；赛后改成比分即可）。
- `scorers`：在册球员用 `{ id: 'xxx', n: 2 }`（id 查 `data/players.js`；1 球省略 n）；
  截图上的绰号先查名册底部 `window.STARFC.aliases`（小许→xu-zhihe、雄→jiang-chaoxiong、Joel→joel-loh-ziyang…）；
  编外球员 `{ name: 'Shon Honda' }`；乌龙 `{ name: 'OG' }`；无进球 `[]`；没记录 `null`。
- `venue`：`'球场 · HH:MM'`，时间可省略。
2. **不要**手改任何统计数字/射手榜——全部自动。
3. 截图录入的判读细则见 `docs/MATCH_SCREENSHOT_UPDATE_WORKFLOW.md`。
4. 校验 → 预览 → 提交（§8）。commit 信息示例：`Add fixture: 2026-07-12 vs Sporting (3-1)`。

## 4. 任务 B：加一条比赛集锦

1. `data/media.js` 的 `videos` **最前面**插入：

```js
{ "date": "2026-07-12", "opponent": "Sporting", "url": "https://youtu.be/XXXX", "cover": null },
```

2. 标题自动生成「日期 vs 对手（比赛集锦）」；有封面就放
   `assets/img/media/highlights/<日期-对手slug>/cover.jpg` 并把 `cover` 填该路径。
3. 校验 → 预览 → 提交。

## 5. 任务 C：发一篇博客（形式与 SEO 的完整约定）

博客 = **独立静态 HTML 页**（利于 SEO）+ `data/blog.js` 索引（驱动首页故事区与 blog/index.html）。
【约定】博客**只收站内文章**，不加任何外链条目；历史小红书内容按维护人提供的素材
逐篇迁移为站内文章（页脚已保留小红书账号入口）。

**步骤（8 步，一步不能省）：**
1. 取 slug：小写 kebab-case、全局唯一、语义清楚（如 `2026-07-mid-season-notes`）。
2. `cp blog/_template.html blog/<slug>.html`。
3. 替换模板里 **5 个占位符**：【SLUG】【标题】【描述】【日期】【标签】（校验脚本会查漏）。
4. 用模板内注释的**组件库**写正文：段落 / `h2` 小标题 / 红点列表 / 数据速览条（stat-tile）/
   图片 figure（图放 `assets/img/news/`，必写 alt）/ YouTube 内嵌（post-embed）/ 引用块。
   语气基准：站点主标语「人来人往，从未散场」——内敛、具体、用数字和事迹说话，不喊口号。
5. 文章有专属封面时，把页内 `og:image`/`twitter:image` 换成封面绝对地址，并在索引条目填 `cover`。
6. 在 `data/blog.js` 的 `posts` **最前面**加索引条目（`type: "post"`，字段见该文件头部注释）。
7. `node scripts/validate-data.js` && `node scripts/update-sitemap.js`（sitemap 必须重新生成）。
8. 本地预览：首页故事区出现新卡片、文章页排版正常、`blog/index.html` 列表正常 → 提交。
   commit 信息示例：`Blog: 2026 年中随笔 (2026-07-mid-season-notes)`。

**SEO 底线（模板已内置，别删）**：每篇文章必须有独立 `<title>`、`meta description`、`canonical`、
Open Graph（含图）、`article:published_time`、`BlogPosting` JSON-LD、语义化 `<article>/<h1>`、图片 alt。

## 6. 任务 D：改界面文案 / 新增球员 / 球员照片

- 文案：只改 `data/i18n.js`，zh/en 成对；新增文案 = 加键 + 在 HTML 元素上用 `data-i18n="键"`（HTML 结构改动需维护人同意）。
- 新球员：`data/players.js` 加一行（id kebab-case；出现在进球名单的绰号同步补 `aliases`）。
- **姓名与昵称约定**：`name`=官方英文名（页面主显示）、`nameZh`=官方中文名、
  `nickZh`/`nickEn`=昵称（播报文案、进球战报可用；维护人会陆续提供，未确认的不要编）。
  新增昵称要做两处：名册对象补 `nickZh/nickEn` + `aliases` 表加"昵称→id"映射。
- 照片：放 `assets/img/players/<id>/profile.jpg`（工具见 `docs/PLAYER_PHOTO_GUIDE.md`；缺图检查 `bash scripts/validate-assets.sh`）。

## 6.5 任务 G：试训表单（现状与切换方案）

- 现状：**零后端 mailto 方案**——`assets/js/main.js` 的 `setupTrialMailto()` 在点击
  「发送邮件咨询试训」时，把表单五个字段拼进邮件正文发往 `account@starfc.sg`。
  没有服务器端点，**不存在被脚本刷屏的攻击面**；未启用 JS 时退化为普通 mailto。
- 若维护人要求换成谷歌表格：把 join 区 CTA 的 `href` 换成表单链接（`target="_blank"`），
  并在 commit 里注明；`setupTrialMailto()` 因选择器不再命中会自动失效，无需改 JS。
- 不要自行接入第三方表单服务（Formspree 等）——引入外部依赖与公开端点需维护人拍板。

## 6.6 SEO 责任清单（改内容时对照）

- 域名规范：`https://www.starfc.sg`（canonical 一律用它）。
- 首页：title / meta description / OG / Twitter Card / `SportsTeam` JSON-LD 都在 `index.html` head；
  分享卡图 `assets/img/og/og-cover.png`（1200×630，带主标语——改标语需同步重制，找维护人）。
- 文章页：每篇必须有独立 title、description、canonical、OG（含图）、
  `article:published_time`、`BlogPosting` JSON-LD——模板已内置，别删；图片必写 alt。
- 动了 `blog/` 就要跑 `node scripts/update-sitemap.js`（`sitemap.xml` 不要手改）；
  `robots.txt` 已指向 sitemap。
- 双语：默认中文内联可索引；同一 URL 切换语言，**不需要 hreflang**，不要拆多语言 URL。
- **收录与外链（一次性设置 + 长期维护）**：站点必须在 Google Search Console（域名资产，
  DNS TXT 验证需维护人操作）与 Bing Webmaster Tools 登记并提交 `sitemap.xml`；
  发新文章后可在 GSC 手动请求收录。同时维护外链三件套：YouTube 频道简介、
  小红书主页、X-League 球队页（找联赛管理员）都应放上 https://www.starfc.sg 链接。

## 6.7 全平台体验约定（改样式/动效前必读）

- 触屏（iOS/Android）：hover 位移已在 `@media (hover: none)` 统一关闭；
  Hero 视差只在精确指针设备启用；触控目标已按 ≥44px 调整——新增交互组件要遵守同样三条。
- 全站动效尊重 `prefers-reduced-motion`；新动效只允许 opacity/transform。
- 不要引入横向滚动布局（历史上已移除 hscroll 体系）；`overflow-x: clip` 在根上兜底。
- 新增可渐入内容：元素加 `data-reveal`（或容器加 `data-reveal-stagger`），其余自动。

## 7. 语气与品牌（写任何面向用户的文字前读这段）

- 主标语：**人来人往，从未散场。**（People come and go. The game goes on.）
- 副句：五湖四海，因球相聚。（碑刻式字距，Hero 仅此两句——**不要再往首屏加小标语**）
- 印章：以球会友。页脚保留：从 2002 到今天，继续上场。
- 华人式的内敛：不自夸（"最好/最强"禁用）、事实和数字代替形容词、克制的抒情只出现在收尾。
- 设计约束见 `docs/DESIGN.md`（颜色/字号/间距只用 CSS 变量，胜平负色只用于徽章与比分）。

## 8. 校验、预览、提交（每次收尾三连）

```bash
node scripts/validate-data.js     # 必须无 ERROR（WARN 可放行但要在 commit 信息里注明）
node scripts/update-sitemap.js    # 动过 blog/ 才需要
php -S 127.0.0.1:8899             # 或 python3 -m http.server 8899；浏览器过一遍改动区域
git add <本次相关文件> && git commit -m "..." && git push   # push 即上线
```

预览检查单：改动内容正确显示 → 切 EN 看一遍 → 手机宽度（375px）看一遍 → 浏览器 console 无报错。

## 9. 已知约定与坑

- 首页"下一场"预告条：由 `score: null` 且日期未过期的比赛自动触发，无需单独维护。
- 关于页数字（年数/在册/场次）自动计算，永远不要写死。
- 射手榜不计 `OG` 与 `Guest`；进球合计少于总比分只是 WARN（历史漏记，可放行）。
- 名人堂当前是占位卡，等元老资料（收齐一位可上一位，字段清单见 `docs/CONTENT_AUDIT.md`）。
- 语言偏好存 localStorage（`starfc-language`)；文章页目前只有中文，属预期。
- 首页故事区当前只有 1 篇站内文章，属预期（小红书旧文待逐篇迁移，见任务 C）。
- Hero 已刻意留白：只有队徽、STAR FC、两句话、三个按钮、战绩条——保持这个密度。
