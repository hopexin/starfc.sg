# STAR FC 每周更新清单（Fixtures + 球员照片）

适用范围：静态单页站点，仅维护 `index.html` 与 `assets/img/players/`。  
目标：每周更新赛程/战绩和球员照片时，降低改坏页面风险。

---

## 1. 每周更新赛程与战绩（Fixtures/Results）

1. 打开 `index.html`，定位 `#fixtures` 区域。
2. 在注释标记区间内编辑卡片：
   - `FIXTURES_2025_START` 到 `FIXTURES_2025_END`
   - `FIXTURES_2026_START` 到 `FIXTURES_2026_END`
3. 新增比赛时，复制同年现有卡片并替换关键字段：
   - `date`（日期）
   - `league`（赛事）
   - `opponent`（对手）
   - `score`（比分）
   - `location`（球场/地点）
4. 同步更新该年份统计区（比赛/胜/平/负/进球/失球）。

注意：
- 建议按日期从新到旧排列。
- 胜/平/负视觉状态依赖卡片颜色：绿/灰/红（边框与比分颜色）。
- 不要改动 `switchYear()`、`data-year`、`data-year-panel`。

---

## 2. 球员照片命名规范（players-data -> assets）

页面读取规则：
- 代码会按 `players-data` 的 `id` 拼接图片路径：
  - `assets/img/players/<id>.jpg`
- 示例：
  - `{"id":"xu-zhihe", ...}` -> `assets/img/players/xu-zhihe.jpg`

规范要求：
- 统一小写英文 + 连字符（kebab-case）。
- 与 `players-data` 的 `id` 完全一致（包括连字符）。
- 当前前端逻辑固定读取 `.jpg`，请优先使用 `.jpg`。

---

## 3. 缺图检查（每周建议执行）

命令：

```bash
bash scripts/validate-assets.sh
```

输出说明：
- `missing` 列出 `players-data` 中缺失的球员图片（按 `<id>.jpg` 检查）。
- `extra` 列出目录里存在但不在 `players-data` 的 `.jpg` 文件。

---

## 4. 回归验收清单（发布前必查）

- [ ] 锚点导航：顶部菜单跳转 `#home/#fixtures/#media/#team/#about/#history/#join/#contact` 正常
- [ ] 移动端菜单：可打开/关闭，遮罩点击与 `Esc` 关闭正常
- [ ] 赛程切换：2025/2026 按钮可切换，显示对应 `data-year-panel`
- [ ] 横向滚动：桌面箭头可滚动，左右边界隐藏逻辑正常
- [ ] Team 渲染：`#team` 区块能正常渲染分组球员卡
- [ ] 图片 fallback：缺失球员图时显示占位，不出现破图布局错乱

---

## 5. 最小回滚

若本周更新后发现问题，优先回滚本轮改动文件：
- `index.html`（fixtures 卡片与统计）
- `assets/img/players/*`（本周新增或替换的图片）

建议在每次周更前先提交一次基线版本，异常时可直接回退到上一个提交。
