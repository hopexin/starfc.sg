# STAR FC 比赛截图到官网更新流程

目标：以后更新战绩时，先把截图整理成可确认的文字，再改 `index.html`。这样少猜、少漏、少改坏页面。

## 适用范围

- 输入：`match-screenshots-inbox/` 里的比赛截图。
- 输出：`index.html` 中对应年份的 Fixtures 卡片和统计数字。
- 不处理：页面结构重构、JS 交互重写、`starfc-website.jsx`。

## 固定原则

1. 只基于实际能读到的截图和仓库内容下结论。
2. 截图信息先整理成文字表格给你确认，确认后再写进网站。
3. 不确定的对手名不能编造成正式名称。
4. `index.html` 仍是唯一发布页，Fixtures 更新只改对应年份注释区块和该年份统计。
5. 不改 Fixtures 的 DOM 结构、年份切换 JS、横向滚动 JS。
6. 提交时不要带上 `.DS_Store` 等无关文件。

## 截图整理步骤

1. 列出 `match-screenshots-inbox/` 内所有图片。
2. 一张一张查看，提取以下字段：
   - 日期
   - 对手
   - 赛事类型：`UAFL` / `友谊赛`
   - 地点和时间
   - 比分
   - 结果：`WIN` / `DRAW` / `LOSS`
   - 进球人员
   - 来源截图文件名
3. 先输出文字表格，不直接改网站。
4. 等你确认或纠正后，再进入 `index.html` 更新。
5. 你明确说可以删除后，才清空已处理截图。

## 对手名规范

- `FC` 一律大写。
- 常见缩写保持大写：`SCC`、`SAC`、`MYK`、`CPR`、`VFC`、`GAS`、`PSA`、`SUTD`、`UAFL`。
- 英文队名使用正式首字母大写：`Sporting`、`Westland`、`Woodlands FC`、`Play United FC`。
- 已确认的 STAR FC 命名惯例：
  - `中华队` -> `Chung Hwa`
  - `unity fc` / `Unity` -> `Unity FC`
  - `Vic school校友` / `Victoria校友队` -> `Victoria School Alumni`
  - `SCC二队` -> `SCC II`
  - `SUTD校队` -> `SUTD School Team`
  - `J-heat` -> `J-Heat`
  - `7 STAR` -> `7 Star`
- 不知道真实队名时，用中性名称：`Opponent A`、`Opponent B`。
- 不要用国籍或族群做临时队名，例如不要写 `Myanmar Team A`。

## Fixtures 写入规则

1. 找到年份区块：
   - `FIXTURES_2025_START` 到 `FIXTURES_2025_END`
   - `FIXTURES_2026_START` 到 `FIXTURES_2026_END`
2. 新比赛放在对应年份区块最上方，按日期从新到旧。
3. 复制同结果类型的现有卡片：
   - 胜：复制 `WIN` 卡
   - 平：复制 `DRAW` 卡
   - 负：复制 `LOSS` 卡
4. 只替换文本字段：日期、赛事、对手、比分、进球、地点。
5. 比分必须是单个 span，例如：

```html
<span class="text-3xl font-bold font-mono text-emerald-400">7 - 1</span>
```

6. 不要把比分拆成多个 span。
7. 如果没有进球人员，不要硬塞到地点或赛事字段里。

## 统计更新规则

更新完卡片后，按对应年份区块重新计算：

- 比赛：卡片数量
- 胜/平/负：按 `WIN` / `DRAW` / `LOSS` 或比分计算
- 进球：STAR FC 得分总和
- 失球：对手得分总和

统计数字必须和卡片内容一致。卡片内容是 source of truth。

## 回归验证清单

- [ ] 目标年份 Fixtures 面板能看到新增比赛。
- [ ] 新增比赛顺序是新到旧。
- [ ] 2025/2026 切换正常。
- [ ] 横向滚动箭头正常。
- [ ] WIN/DRAW/LOSS badge 和比分颜色与同类卡片一致。
- [ ] 比分是单个 `font-mono` span。
- [ ] 统计数字与卡片重新计算一致。
- [ ] 页面 JS 语法检查通过。
- [ ] 无关文件没有进入 commit。

## 发布后处理

- 提交信息建议：`Update 2026 fixtures from screenshots`。
- 推送到 `main` 后，Vercel 会自动部署。
- 处理完成且你允许后，删除 `match-screenshots-inbox/` 里的已处理截图。
