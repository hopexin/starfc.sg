# STAR FC 每周更新清单（2026-07 重构后版本）

适用范围：静态单页站点。**每周内容更新只改 `data/` 目录下的数据文件，不改 `index.html`、CSS、JS。**

架构一句话：`index.html` 是唯一页面骨架；比赛、视频、球员、双语文案分别存在
`data/fixtures.js`、`data/media.js`、`data/players.js`、`data/i18n.js`；
`assets/js/main.js` 负责渲染；**赛季统计（比赛/胜/平/负/进球/失球）由代码自动计算，永远不要手工改统计数字。**

---

## 1. 每周更新赛程与战绩

详细的截图录入流程见 `docs/MATCH_SCREENSHOT_UPDATE_WORKFLOW.md`。

1. 打开 `data/fixtures.js`。
2. 在对应赛季数组（如 `2026:`）的**最前面**插入一个比赛对象：

```js
{ date: '2026-05-17', comp: '友谊赛', opponent: 'Some FC', score: [3, 1],
  scorers: [{ id: 'zhang-xin', n: 2 }, { name: 'Shon Honda' }],
  venue: 'SCC Dempsey · 15:00' },
```

字段约定：
- `date`：`YYYY-MM-DD`。
- `comp`：`'友谊赛'` / `'UAFL'` / `'UAFL 第X轮'` / `'杯赛'`（英文界面自动翻译）。
- `score`：`[我方进球, 对方进球]`；**未开赛的预告比赛填 `null`**——会显示"即将开球"卡片、
  首页 Hero 自动出现"下一场"预告条（含倒计时），不计入统计与射手榜；赛后把 `null` 改成比分即可。
- `scorers` 进球名单（按人，不按时间）：
  - 在册球员：`{ id: 'xu-zhihe', n: 2 }`——id 查 `data/players.js`；进 1 球可省略 `n`。
  - 截图上是绰号（小许、雄、Joel…）：先查 `data/players.js` 底部的 `aliases` 表换成 id。
  - 编外/客串球员：`{ name: 'Shon Honda' }`；有中英两个名字用 `{ nameZh: '田添', nameEn: 'Tian Tian' }`。
  - 对方乌龙球：`{ name: 'OG' }`；无进球写 `[]`；进球了但没记录写 `null`。
- `venue`：`'球场名 · HH:MM'`，时间可省略。
3. 胜/平/负徽章、比分颜色、赛季统计全部自动生成，**不需要做任何同步**。

## 2. 更新比赛集锦视频

1. 打开 `data/media.js`。
2. 在 `videos` 数组**最前面**插入：

```js
{ "date": "2026-05-17", "opponent": "Some FC", "url": "https://youtu.be/xxxx", "cover": null },
```

- 标题自动生成为「日期 vs 对手（比赛集锦）」，英文界面自动切换。
- 有封面图时把图放到 `assets/img/media/highlights/<日期-对手slug>/cover.jpg`，并把 `cover` 填成该路径；没有就保持 `null`（显示默认深色播放占位）。

## 3. 球员名册与照片

- 新增球员：在 `data/players.js` 加一行（id 用小写 kebab-case）。
- 球员照片：放到 `assets/img/players/<id>/profile.jpg`（工具脚本见 `docs/PLAYER_PHOTO_GUIDE.md`）。
- 队长/副队长变更：改 `data/players.js` 里的 `window.STARFC.team`。

## 4. 提交前检查（必做）

```bash
node scripts/validate-data.js     # 数据校验：有 ERROR 不要提交
bash scripts/validate-assets.sh   # 球员缺图检查（可选）
```

本地预览：

```bash
php -S 127.0.0.1:8899   # 或 python3 -m http.server 8899
```

浏览器打开 http://127.0.0.1:8899/ 核对：
- [ ] 新比赛卡片出现在对应赛季最前面，比分/结果徽章正确
- [ ] 该赛季统计数字已自动 +1 场并更新进失球
- [ ] 切换 EN，新卡片的赛事名/球员名显示正常
- [ ] 无浏览器 console 报错

## 5. 提交

- 不要把 `.DS_Store` 等系统文件加进 commit（已在 .gitignore）。
- push 到 main 后 Vercel 自动部署，等 1-2 分钟后打开 https://www.starfc.sg 复查线上。

## 6. 红线

- 不改 `assets/js/main.js`、`assets/css/main.css`、`index.html` 的结构（文案改动走 `data/i18n.js`）。
- 不手写统计数字；不确定的对手名/球员名保持原样记录，不要编造。
