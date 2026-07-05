# STAR FC 比赛截图到官网更新流程（2026-07 重构后版本）

目标：更新战绩时，先把截图整理成可确认的文字，再写入 **`data/fixtures.js`**（不再手改 HTML 卡片）。

## 适用范围

- 输入：`match-screenshots-inbox/` 里的比赛截图。
- 输出：`data/fixtures.js` 对应赛季数组里的**一个比赛对象**。统计自动计算，无需更新。
- 不处理：页面结构、`assets/js/main.js`、`assets/css/main.css`、`starfc-website.jsx`。

## 固定原则

1. 只基于实际能读到的截图和仓库内容下结论。
2. 截图信息先整理成文字表格给维护人确认，确认后再写入数据文件。
3. 不确定的对手名不能编造成正式名称（历史上用过 `Opponent A` 这类占位）。
4. 球员名一律解析成 `data/players.js` 的 `id`；绰号查名册底部 `aliases` 表；
   不在名册且身份不明的按原文用 `{ name: '...' }` 记录。
5. 提交前必须运行 `node scripts/validate-data.js`，有 ERROR 不提交。
6. 提交时不要带上 `.DS_Store` 等无关文件。

## 截图整理步骤

1. 列出 `match-screenshots-inbox/` 内所有图片。
2. 一张一张查看，提取以下字段：
   - 日期（YYYY-MM-DD）
   - 对手
   - 赛事类型：`UAFL` / `友谊赛` / `杯赛`
   - 地点和时间
   - 比分（我方在前）
   - 进球人员（含每人进球数；对方乌龙记 OG）
3. 整理成表格请维护人确认。
4. 确认后转换成比赛对象，插入 `data/fixtures.js` 对应赛季数组最前面：

```js
{ date: '2026-05-17', comp: 'UAFL', opponent: 'Sporting', score: [3, 1],
  scorers: [{ id: 'jiang-chaoxiong', n: 2 }, { id: 'joel-loh-ziyang' }],
  venue: 'SCC Dempsey · 17:00' },
```

5. 运行校验并本地预览（见 `docs/WEEKLY_UPDATE_CHECKLIST.md` 第 4 节）。
6. 处理完的截图从 inbox 移走或归档，避免重复录入。

## 常见对照

| 截图写法 | 数据写法 |
| --- | --- |
| 小许 x2 | `{ id: 'xu-zhihe', n: 2 }` |
| 雄 | `{ id: 'jiang-chaoxiong' }` |
| Joel | `{ id: 'joel-loh-ziyang' }` |
| Victor | `{ id: 'victor-chukwuebuka-ebele' }` |
| 田添 | `{ nameZh: '田添', nameEn: 'Tian Tian' }` |
| 乌龙球 | `{ name: 'OG' }` |
| 客串（不知姓名） | `{ name: 'Guest' }` |

完整别名表：`data/players.js` 底部 `window.STARFC.aliases`。发现新的稳定绰号时，同步补进 aliases 表。
