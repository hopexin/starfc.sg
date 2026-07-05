# STAR FC 官网现代化重构 — 验收报告

日期：2026-07-05。对照基准：[BASELINE.md](BASELINE.md)（重构前完整清单，与线上 www.starfc.sg 逐字节一致的版本）。

**结论：9 大板块、全部功能、全部数据完整保留；技术栈仍为纯静态 HTML + CSS + 原生 JS、零构建、单页锚点导航；未执行任何 push，等你本地验收后自行上线。**

---

## 一、逐板块验收（对照 BASELINE.md 第 3 节）

| 板块 | 状态 | 说明 |
| --- | --- | --- |
| 导航 + 移动菜单 | ✅ 保留 + 改进 | 9 个锚点、语言切换、汉堡菜单、Esc 关闭全部保留；新增 aria-expanded/aria-label，滚动后白底毛玻璃 |
| 主页 Hero | ✅ 保留 + 改进 | 队徽、徽章行、主副标题、口号、3 个 CTA 全保留；改为白底大字版式，巨龙队徽缩小弱化 |
| 赛程战绩 | ✅ 保留 + 改进 | **2025 全部 50 场、2026 全部 20 场逐场核对无缺**；两套统计（50/38/4/8/234/112 与 20/12/2/6/88/43）改为**由比赛数据自动计算，数值与原硬编码完全一致**（脚本核验）；年份切换保留；横滑改为响应式网格：手机竖向堆叠、桌面 3 列，默认显示 6/9 张 + "显示全部 N 场比赛"展开按钮 |
| 媒体中心 | ✅ 保留 + 改进 | 8 条 YouTube 链接逐一核对保留（顺序不变）；新增封面图支持（`cover` 字段，当前为占位） |
| 球队成员 | ✅ 保留 | 40 名球员、前锋/中场/后卫/门将四组、C/VC 徽章、Victor 显示名、"共 N 人"、照片缺失优雅降级——全部保留 |
| 名人堂 | ✅ 保留 | 3 张占位卡原文案保留 |
| 关于我们 | ✅ 保留 | 两段队史、4 个数据块（23+/亚军/200+/30+）、4 张价值观卡全保留 |
| 队史大事记 | ✅ 保留 | 7 个时间轴节点全保留（2001→现在） |
| 球队档案与故事 | ✅ 保留 | 3 条小红书外链、日期、摘要全保留 |
| 加入我们 | ✅ 保留 | 表单 5 个字段与选项全保留；**提交行为不变**：`mailto:account@starfc.sg?subject=STAR FC Trial Enquiry` |
| 联系我们 | ✅ 保留 | 邮箱/小红书/YouTube 三个联系方式 + 7 个常用球场全保留 |
| 页脚 | ✅ 保留 | 队徽、简介、5 个快速链接、2 个社媒图标、版权行全保留 |
| 中英双语 | ✅ 保留 + 改进 | 默认中文、localStorage 记忆、`<html lang>` 切换、title/placeholder/aria/alt 同步翻译全保留；机制从"中文字符串匹配替换"升级为**键值词典**（更稳，不怕文案微调破坏翻译） |

### 有意的内容级变化（唯一一处，属任务要求的数据治理）

进球者姓名**统一为球员名册的规范英文名**（任务书要求"统一一套命名规范"）：
- 2026 赛季原来的中文绰号（小许、雄、干哥、Jaron小杰、老孙…）现统一显示为 Xu Zhihe、Jiang Chaoxiong、Sun Gan、Huang Jaron Zijie、Lao Sun…（与英文界面原有显示一致，中英两种界面现在完全同名）。
- 计数记法统一为 `×N`（原来 2025 用 `(N)`、2026 用 `x N` 两种混写）。
- 绰号→球员的对应关系没有丢：完整保存在 `data/players.js` 的 `aliases` 表（录数据时用）。
- 无法核实身份的名字（fred、Bart、Shon Honda、老孙/Lao Sun、Guest、OG、"⚽ -" 等）**原样保留，未做任何编造**。

---

## 二、结构变化（做了什么）

### 新增的数据文件（以后每周只碰这里）

| 文件 | 内容 |
| --- | --- |
| `data/fixtures.js` | 全部 70 场比赛（日期/赛事/对手/比分/进球/场地）。**统计自动计算** |
| `data/players.js` | 40 人名册（规范英文名 + 已确认中文名 + 位置 + 号码）、队长/副队长、绰号别名表 |
| `data/media.js` | 8 条比赛集锦（日期/对手/链接/可选封面） |
| `data/i18n.js` | 全站中英文案词典（约 150 键，`{ zh, en }` 成对） |

### 代码组织

- `assets/js/main.js`：原先散在 index.html 里的 3 大段内联脚本合并为一个渲染/交互模块。
- `assets/css/main.css`：移除 Tailwind CDN（运行时 JIT，产线不推荐），改为自建样式表，顶部集中定义颜色/间距/字号/圆角/阴影 **CSS 设计变量**，全站引用，无魔法数字。
- `index.html`：从 3391 行瘦身到约 640 行，只剩语义化骨架（header/nav/main/section/footer + h1-h4 层级）+ 静态低频内容。
- 删除：旧 `assets/js/data.js`（并入 players.js）、页底 4 个从不渲染的占位 JSON 数据岛、全部横滑 JS/CSS。
- `scripts/validate-data.js`（新增）：数据校验闸门；`validate-assets.sh`、`validate-media-covers.py` 已适配新数据源。
- 文档全部更新：`docs/WEEKLY_UPDATE_CHECKLIST.md`、`MATCH_SCREENSHOT_UPDATE_WORKFLOW.md`、`CONTENT_MAINTENANCE.md`、`CONTENT_ASSET_WORKFLOW.md`、`DESIGN.md`。

### 视觉（阶段 3，按反馈迭代为深色）

高级深色运动风（延续球队"新加坡夜场球场"气质）：近黑碳色底 + 泛光灯径向光 + 极淡球场网格纹理；白色发丝线分层的卡片表面（带顶部内光）；品牌红唯一强调色（CTA/节点带克制红色泛光）+ 四级深色灰阶文字；Barlow Condensed 负责比分/数字/英文大字，Noto Sans SC 正文；赛程卡为主角（大号着色比分 + tint 结果徽章）；clamp() 流体字号 + Grid 布局，移动优先；克制的 hover 动效；支持 prefers-reduced-motion；队徽保留、巨龙弱化（仅 Hero 轻微光晕）。首版曾做成纯白亮色，经反馈改回深色高级方向；分享卡（og-cover.png）同步为深色版。

### SEO 与分享（阶段 4）

- **社交分享卡**（最高优先级）：完整 Open Graph + Twitter Card，专门生成的 1200×630 分享图 `assets/img/og/og-cover.png`（队徽 + 队名 + 口号，与新视觉一致）——分享到小红书/WhatsApp 会出漂亮卡片。
- meta description、canonical、theme-color；JSON-LD `SportsTeam`（名称/成立时间/所在地/logo/邮箱/社媒）。
- 性能：队徽 698KB→49KB（256px 版全站使用）、名人堂占位图 192KB→22KB；首屏外图片 lazy；全部脚本 defer；移除阻塞渲染的第三方 JS。整页负载约 **1.2MB → ~190KB**。
- 双语 SEO：默认中文内联在 HTML（可索引），`<html lang>` 随切换正确变化；同一 URL 切换语言，未拆 URL、未动架构。

### 本地 commit 检查点（未 push）

```
1820278 Phase 4: SEO, social share cards, structured data, performance
e73f429 Phase 3: visual modernization with own design-token CSS
4242821 Phase 2: separate data from presentation, structured i18n   ← 含 .DS_Store 移除
4cbd344 (origin/main) ← 线上当前版本
```

---

## 三、以后每周怎么维护（给你和自动化 agent）

**加一场比赛只改一个文件**：打开 `data/fixtures.js`，在 `2026:` 数组最前面插入：

```js
{ date: '2026-05-17', comp: '友谊赛', opponent: 'Some FC', score: [3, 1],
  scorers: [{ id: 'zhang-xin', n: 2 }, { name: 'Shon Honda' }],
  venue: 'SCC Dempsey · 15:00' },
```

- 胜/平/负徽章、比分颜色、赛季统计**全部自动更新**，永远不用手改统计数字。
- 球员用 `data/players.js` 里的 `id`；截图上的绰号查同文件底部 `aliases` 表；客串球员直接 `{ name: '...' }`；未开赛填 `score: null`。
- 加集锦视频：`data/media.js` 最前面插 `{ "date": "...", "opponent": "...", "url": "https://youtu.be/...", "cover": null }`。
- 提交前运行 `node scripts/validate-data.js`（有 ERROR 会退出码 1，不要提交）。
- 完整流程：`docs/WEEKLY_UPDATE_CHECKLIST.md`。

## 四、请你人工验收

本地预览已启动：**http://127.0.0.1:8899/** （请手动打开）

建议检查：桌面宽度整页滚一遍 → 手机宽度（或手机连同一 Wi-Fi 访问）→ 中英文切换 → 2025/2026 年份切换与"显示全部"→ 试训按钮唤起邮件。

确认无误后由你本人执行 `git push` 上线（共 4 个本地 commit，含本报告）。

## 五、已知事项（如实说明）

- 球员照片：40 人目前均无 `profile.jpg`（线上现状即如此），显示"头像待补充"占位；照片就位后自动显示。
- 数据里保留的历史存疑项（未编造）：两个占位对手名（Opponent A/B）、两场"⚽ -"（进球者未记录）、2025-11-15 进球名单合计 3 球但比分 4 球（原始数据即漏记 1 球，校验脚本会提示 WARN）。
- `starfc-website.jsx`（91KB 旧 React 原型，页面从未引用）仍在仓库根目录，未动；建议后续单独决定是否归档删除。
- 分享卡缓存：上线后如果小红书/WhatsApp 里旧分享预览没更新，属平台缓存，新分享会立即用新卡片。
