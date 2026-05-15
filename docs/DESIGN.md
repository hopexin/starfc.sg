# STAR FC Design System v0.1

这份文档不是 mockup，而是 STAR FC 官网后续维护和改版时的设计约束。目标是让每次改页面都能保持同一种视觉语言，不因为 vibe coding 或临时手改变得风格漂移。

当前站点是静态单页官网，唯一发布物仍是 `index.html`。设计系统必须服务这个现实：少依赖、少抽象、易维护、能直接映射到 Tailwind class。

## 1. 设计目标

- 第一优先级：让访客快速看到赛程、战绩、球队成员、比赛集锦。
- 第二优先级：体现 STAR FC 是一支有历史的草根球队，不要做成商业票务/商城型大俱乐部网站。
- 第三优先级：每周维护时不容易改坏页面。

## 2. 参考来源

这些不是要照搬，而是确认我们采用 scale/token 思路是合理的。

- Tailwind CSS color scale: Tailwind 默认颜色使用 `50-950` 的阶梯色板，适合我们这种直接写 class 的静态站。
- IBM / Carbon type scale: 成熟设计系统会定义字号和行高的固定等级，不让页面随手出现无规律字号。
- Carbon spacing scale: 用 2/4/8 的倍数管理间距，适合组件密度可控的页面。
- Atlassian spacing: 以 8px 为核心单位建立间距 scale，减少临时数值。
- USWDS design tokens: 把颜色、字体、间距等离散选择称为 design tokens，本质是限制可选项，减少漂移。

## 3. 品牌气质

STAR FC 的视觉关键词：

- Grassroots but serious: 草根，但不是随便。
- Match-first: 比赛信息永远比装饰重要。
- Archive-minded: 这是 20 多年球队历史的记录，不只是一个宣传页。
- Singapore night pitch: 深色底、灯光感、队徽红金，但不要全站红黑压迫。

避免：

- 过度霓虹、电竞、未来感。
- 大面积商业俱乐部模板感。
- 每个区块都像卡片漂浮在背景上。
- 只靠红绿边框表达胜负。

## 4. Color Scale

当前站点已经大量使用 Tailwind `slate / amber / red / emerald / rose`。后续继续沿用，不新建复杂色板。

### Core

| 用途 | Tailwind | 说明 |
| --- | --- | --- |
| Page background | `bg-slate-950`, `bg-slate-900` | 页面主背景，区块交替使用 |
| Card background | `bg-slate-800/60`, `bg-slate-800/70` | 所有信息卡默认背景 |
| Border default | `border-slate-700/50` | 默认中性边框 |
| Border hover | `hover:border-slate-600` | 卡片 hover 反馈 |
| Primary accent | `text-amber-400`, `bg-amber-500` | 队徽金、年份 active、标题 eyebrow |
| Club red | `bg-red-600`, `text-red-400` | CTA、视频播放、品牌力量点 |
| Text primary | `text-white` | 标题/核心信息 |
| Text secondary | `text-gray-300`, `text-gray-400` | 正文/说明 |
| Text muted | `text-gray-500`, `text-slate-500` | 元信息/地点/日期 |

### Match State

胜平负只用于 Badge 和比分，不用于整张卡边框。

| 状态 | Badge | Score |
| --- | --- | --- |
| WIN | `bg-emerald-500/10 text-emerald-400 border-emerald-500/20` | `text-emerald-400` |
| DRAW | `bg-slate-600/20 text-slate-300 border-slate-500/30` | `text-slate-300` |
| LOSS | `bg-rose-500/10 text-rose-400 border-rose-500/20` | `text-rose-400` |

## 5. Typography Scale

当前字体：`Noto Sans SC`。继续使用，保证中文和英文混排稳定。

### Roles

| Role | Class | 用途 |
| --- | --- | --- |
| Hero title | `text-5xl sm:text-7xl lg:text-8xl font-black` | 仅首页 `STAR FC` |
| Section title | `text-2xl md:text-4xl font-bold` | 每个主区块标题 |
| Subsection title | `text-xl md:text-2xl font-bold` | 视频、位置分组等二级标题 |
| Card title | `text-lg font-semibold` 或 `text-white font-semibold` | 赛程卡、视频卡 |
| Body | `text-sm md:text-base` | 说明文字 |
| Meta | `text-xs`, `text-sm text-gray-400/500` | 日期、地点、标签 |
| Score | `text-3xl font-bold font-mono` | 比分，必须等宽 |
| Stat number | `text-3xl font-bold` | 年度统计数字 |

规则：

- 比分必须用 `font-mono`，并且完整比分放在一个 span，例如 `5 - 5`。
- 中文正文不要使用过轻字重，最低 `font-normal`，关键信息用 `font-semibold`。
- 不使用负字距。Tailwind `tracking-tight` 只允许用于 Hero 主标题。

## 6. Spacing Scale

使用 Tailwind 默认间距，优先选择 4px 基础的常见档位。

| Token | Tailwind | 用途 |
| --- | --- | --- |
| XS | `gap-1`, `p-1`, `mt-1` | pill 内部、小图标间距 |
| SM | `gap-2`, `p-2`, `mt-2` | 日期/标签、卡片小信息 |
| MD | `gap-3`, `p-3`, `mt-4` | 卡片内容组 |
| LG | `gap-4`, `p-4`, `p-5`, `mb-6` | 普通卡片、分组标题 |
| XL | `gap-6`, `px-6`, `mb-8` | CTA、区块内大间距 |
| Section | `py-16 md:py-20` | 主区块上下间距 |
| Container | `max-w-7xl mx-auto px-4` | 大区块内容宽度 |

规则：

- 主区块统一 `py-16 md:py-20`。
- 卡片内容优先 `p-5`，小卡片可用 `p-3` 或 `p-4`。
- 横滑卡片 gap 继续用 `16px`，不要临时改成 12/20/24。

## 7. Radius, Shadow, Border

| Element | Class | 说明 |
| --- | --- | --- |
| Card | `rounded-2xl` | 当前站点既有语言，继续沿用 |
| Small badge | `rounded` 或 `rounded-full` | 状态、league 标签 |
| Button | `rounded-xl` 或 `rounded-full` | CTA 用 `rounded-xl`，segmented 用 `rounded-full` |
| Card shadow | `shadow-lg` | 少量使用，不叠复杂阴影 |
| Header shadow | `shadow-2xl` | navbar 滚动后使用 |
| Default border | `border border-slate-700/50` | 卡片统一中性边框 |

规则：

- 不再用整卡红/绿边框表达胜负。
- Hover 可以改变 border，不改变布局尺寸。
- 不在卡片里再嵌套大卡片。

## 8. Component Rules

### Fixtures Card

结构保持：

- Top row: date + league on left, result Badge on right.
- Body: `STAR FC vs opponent`, score, scorers.
- Footer: location.

固定规则：

- Card: `rounded-2xl bg-slate-800/70 border border-slate-700/50 hover:border-slate-600 p-5 shadow-lg`
- Result Badge: `WIN / DRAW / LOSS`
- Score: one span, `text-3xl font-bold font-mono`
- Date/location/scorers: muted text,不要抢比分和对手名。

### Year Toggle

- 容器：`inline-flex bg-slate-800/80 p-1 rounded-full border border-slate-700`
- Active: `bg-amber-500 text-slate-900 ring-2 ring-amber-400/40 shadow-lg`
- Inactive: `text-slate-400 hover:text-white hover:bg-slate-700/50`

### Team Card

- 头像路径固定：`assets/img/players/<id>/profile.jpg`
- 无头像时显示占位，不报错。
- 球员名、号码、位置优先清晰，不加复杂动画。

### Media Card

- 当前语义是 `比赛集锦 / Highlights`。
- 链接结构不变，视频卡只负责把用户带到 YouTube。
- 视频模块保留横滑，Photos/Memes 暂不恢复，除非有真实内容。

## 9. Motion

允许：

- `transition-all duration-200/300`
- CTA hover: `hover:-translate-y-1`
- 视频播放按钮 hover scale
- 横滑箭头 hover border/background

避免：

- 大面积无限动画。
- 每张卡都漂浮。
- 影响阅读和移动端性能的复杂动效。

尊重 `prefers-reduced-motion`，现有移动菜单已处理 reduced motion，后续新增动画也应同步考虑。

## 10. Layout Rules

- 保持单页结构，不拆多页面。
- 每个 section 是全宽 band，不把整个 section 放进大卡片。
- 横滑模块继续遵守：移动端 1 卡，小平板 2 卡，桌面 3/4 卡；球员卡桌面 5/6 卡。
- 最重要内容优先放在首屏和 Fixtures。

## 11. Maintenance Rules

每次改页面前先检查：

- 新 class 是否能映射到本文件已有风格。
- 新颜色是否属于本设计文档色板。
- 新间距是否属于 spacing scale。
- Fixtures 是否仍能横滑、切年份。
- Team 图片 fallback 是否正常。

任何新增组件都要先写清：

- 用途
- class 模板
- 哪些字段可维护
- 如何回滚

## 12. 当前状态与后续方向

已经统一：

- 2025/2026 Fixtures 使用同一套中性卡片边框、WIN/DRAW/LOSS Badge 和单 span 等宽比分。
- Hero 已去掉无限漂浮的红/amber 模糊圆形装饰，改为更克制的深色球场网格感背景。
- 已接入中文/英文语言切换：中文为默认语言，英文通过轻量 JS 字典切换，不引入框架或构建流程。
- 内容维护注释已说明 players 数据来自 `assets/js/data.js`，下方 JSON 为预留数据块，不驱动页面渲染。

后续可继续做：

- 如果有真实比赛图或球场图，可替换 Hero 背景，让首页更像球队而不是模板站。
- 报名表当前保留静态信息字段，CTA 已降级为邮件联系；后续有真实表单时再接入 Google Form / Tally。
- 名人堂目前仍是占位内容，等有真实名单和照片后再恢复正式卡片内容。
