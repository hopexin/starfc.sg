# STAR FC Design System v1.0（2026-07 视觉重构后）

这份文档是 STAR FC 官网维护和小改版时的设计约束，目标是每次改页面都保持同一种视觉语言。

当前实现：**无框架、无 Tailwind**。全站样式在 `assets/css/main.css`，
所有颜色/间距/字号/圆角/阴影都定义为文件顶部的 **CSS 自定义属性（design tokens）**。
改样式时先看有没有现成 token，禁止在组件里写裸的魔法数字。

## 1. 设计方向

- 极简、干净的现代运动风：大留白、强字体层级、克制配色。
- **一个强主色红 + 大量中性灰**；金/琥珀不再作为系统色（只存在于队徽图案内）。
- 赛程卡是视觉主角：结果用大号 condensed 比分 + 轻量 W/D/L 徽章表达，不用整卡描边。
- 保留队徽，但"巨龙"元素弱化：队徽小尺寸出现，无发光特效。
- 移动优先：默认单列堆叠，向上逐级变网格；赛程默认折叠（手机 6 张 / 桌面 9 张）+ "显示全部"。

## 2. Tokens（唯一取值来源：main.css `:root`）

### 颜色

| Token | 值 | 用途 |
| --- | --- | --- |
| `--red-600` / `--red-700` | #dc2626 / #b91c1c | 品牌红：CTA、强调、active、eyebrow |
| `--red-50` / `--red-100` | 红色浅底 | 红色 tint 背景（chip、CTA hover） |
| `--ink` | #0f0f0f | 标题、核心信息 |
| `--gray-700` / `--gray-500` / `--gray-400` | 中性灰阶 | 正文 / 次要说明 / 元信息 |
| `--gray-50` | #f7f7f7 | 交替区块背景（`.section--alt`） |
| `--gray-200` | #e4e4e4 | 默认描边（`--border`） |
| `--gray-900` | #171717 | 页脚深底 |
| `--win` / `--draw` / `--loss` | 绿 / 灰 / 红 | 只用于结果徽章与比分文字 |

规则：胜平负色**只**用于 `.result-pill` 和 `.match-card__score`；红色是唯一品牌强调色。

### 字体

| Token | 值 | 用途 |
| --- | --- | --- |
| `--font-body` | Noto Sans SC + 系统栈 | 全站正文（中英混排） |
| `--font-display` | Barlow Condensed | 比分、统计数字、日期、Hero "STAR FC"、eyebrow |

### 字号（全部 clamp() 流体）

`--text-hero`（Hero 主标题）、`--text-h2`（区块标题）、`--text-h3`（子标题）、
`--text-score`（比分）、`--text-stat`（统计数字）、`--text-base/sm/xs`（正文/说明/元信息）。

### 间距 / 圆角 / 阴影

- 间距：`--sp-1`(4px) ~ `--sp-9`(96px)，8px 体系；区块上下 `--section-y`（clamp 4–7.5rem）。
- 圆角：`--radius-sm`(8) / `--radius-md`(12) / `--radius-lg`(16，卡片) / `--radius-full`（胶囊）。
- 阴影：`--shadow-xs/sm/md`，极克制；hover 用 `--shadow-md` + `translateY(-2~3px)`。

## 3. 组件速查（类名前缀）

| 组件 | 类 | 说明 |
| --- | --- | --- |
| 区块 | `.section` / `.section--alt` | 白与浅灰交替 |
| 区块标题组 | `.section-head` + `.eyebrow` + `.section-title` + `.section-desc` | eyebrow 是红色 condensed 大写 |
| 按钮 | `.btn--primary`（红实心）/ `.btn--secondary`（白描边）/ `.btn--ghost`（红文字） | |
| 分段控件 | `.segmented` + `.segmented__btn.is-active` | 语言切换、年份切换共用；active = 白底 chip |
| 比赛卡 | `.match-card--win/draw/loss/upcoming` | 结果决定比分颜色 |
| 结果徽章 | `.result-pill--win/draw/loss` | tint 底 + 描边 |
| 统计块 | `.stat-tile--accent/win/loss` | condensed 大数字 |
| 视频卡 | `.video-card` | 深色 16:9 缩略位 + 红色播放钮 |
| 球员卡 | `.player-card` + `.role-pill--captain/vice` | 3:4 照片位 |
| 时间轴 | `.timeline` / `.timeline__year` | 红描边圆形年份节点 |

## 4. 布局与响应式规则

- 容器：`.container`（72rem）/ `.container--narrow`（52rem，关于/大事记/表单）。
- 一律 CSS Grid 网格，移动端单列（球员卡 2 列）：
  - 赛程：1 → 2（≥40rem）→ 3 列（≥64rem）
  - 视频：1 → 2（≥30rem）→ 4 列（≥64rem）
  - 球员：2 → 3 → 4 → 6 列
- 不再使用横向滚动（hscroll 系统已在 2026-07 重构中移除）。
- 断点用 rem：30 / 40 / 48 / 52 / 64。

## 5. 可访问性与动效

- 焦点：全局 `:focus-visible` 红色描边，不许去掉。
- 动效只做 opacity/transform/box-shadow 的 0.15–0.3s 过渡；`prefers-reduced-motion` 已全局降级。
- 新增图片必须写 alt；界面文案走 `data/i18n.js`（中英成对）。

## 6. 改样式的流程

1. 找 token：颜色/间距/字号先用现有变量；确需新值，先在 `:root` 加 token 再引用。
2. 遵守组件前缀命名（BEM 风格：`block__elem--mod`）。
3. 改完在本地预览桌面（≥1280px）和手机（375px）两档，中英文各看一遍。
4. 不引入任何构建步骤、框架或第三方 CSS。
