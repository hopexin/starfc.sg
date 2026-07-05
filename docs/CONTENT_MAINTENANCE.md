# STAR FC 网站内容维护指南（2026-07 重构后版本）

站点架构一句话：纯静态单页（HTML + CSS + 原生 JS，零构建），`index.html` 是页面骨架，
**所有会变的内容都在 `data/` 目录**，`assets/js/main.js` 负责把数据渲染成页面。
推上 GitHub main → Vercel 自动部署。

## 维护入口总览

| 要改什么 | 改哪个文件 | 说明 |
| --- | --- | --- |
| 加一场比赛 / 改比分 | `data/fixtures.js` | 统计自动计算，见 `WEEKLY_UPDATE_CHECKLIST.md` |
| 加一条比赛集锦视频 | `data/media.js` | 标题自动生成，支持可选封面图 |
| 球员名册 / 队长 / 绰号表 | `data/players.js` | id 决定照片路径 |
| 界面文案（中/英） | `data/i18n.js` | 每条 `{ zh, en }` 成对维护 |
| 球员照片 | `assets/img/players/<id>/profile.jpg` | 见 `PLAYER_PHOTO_GUIDE.md` |
| 名人堂卡片 | `index.html` 的 Hall of Fame 区块 | 目前是 3 张占位卡，人物确认后手工替换 |
| 故事/文章外链 | `index.html` 的 Stories 区块 + `data/i18n.js` 文案 | 低频改动 |
| 社媒/邮箱链接 | `index.html`（搜对应 href） | 出现多处，全局替换 |
| 视觉样式 | `assets/css/main.css` | 设计变量见 `DESIGN.md`，谨慎改 |

改完数据必跑：

```bash
node scripts/validate-data.js
```

---

## 目录结构

```
data/
  fixtures.js   # 赛程战绩（唯一数据源；统计自动算）
  media.js      # 比赛集锦视频列表
  players.js    # 球员名册 + 队长/副队长 + 绰号别名表
  i18n.js       # 全站中英文案词典
assets/
  css/main.css  # 全站样式（设计变量 + 组件）
  js/main.js    # 渲染与交互（正常维护不需要动）
  img/
    club/       # 队徽（starfclogo2-256.png 站内用；starfclogo2.png 为原始大图）
    players/    # 球员照片 <id>/profile.jpg
    hall/       # 名人堂照片
    media/      # 比赛集锦封面 highlights/<match-id>/cover.jpg
    og/         # 社交分享卡图（og-cover.png，1200×630）
  icons/        # SVG 图标
docs/           # 本目录：维护文档
scripts/        # 校验与照片处理脚本
*-inbox/        # 素材投递箱（原图丢这里，处理后进 assets）
```

---

## 1. 赛程与战绩

见 `docs/WEEKLY_UPDATE_CHECKLIST.md`（每周主流程）与
`docs/MATCH_SCREENSHOT_UPDATE_WORKFLOW.md`（截图录入细则）。

## 2. 比赛集锦视频

`data/media.js` 的 `videos` 数组最前面插一条：

```js
{ "date": "2026-05-17", "opponent": "Some FC", "url": "https://youtu.be/xxxx", "cover": null },
```

封面图（可选）：放到 `assets/img/media/highlights/<日期-对手slug>/cover.jpg`，
把 `cover` 改成该路径。缺封面清单：`python3 scripts/validate-media-covers.py`。

## 3. 球员名册与照片

- 名册：`data/players.js`。新增球员一行对象；`nameZh` 只在确认中文写法时填。
- 照片：拖进 `assets/img/players/<id>/`，运行 `bash scripts/normalize-player-photos.sh`；
  或统一丢 `player-photo-inbox/` 再运行 `bash scripts/import-player-photos.sh`。
- 缺图检查：`bash scripts/validate-assets.sh`。

## 4. 名人堂

1. 候选人的照片和文字资料放进 `hall-of-fame-inbox/`（每人一个文件夹：`photo.jpg` + `info.md`）。
2. 人物、称号、年份、故事经维护人确认后，替换 `index.html` Hall of Fame 区块的占位卡
   （复制一张现有卡片改文字；新增文案记得在 `data/i18n.js` 配对英文）。
3. 照片发布路径：`assets/img/hall/<id>/profile.jpg`。

## 5. 界面文案与双语

- 所有界面文案在 `data/i18n.js`，每条 `{ zh: '…', en: '…' }`。
- 改中文必须同步改英文；校验脚本会检查 zh/en 是否成对。
- HTML 里的静态文字通过 `data-i18n="键名"` 绑定；新增文案 = 词典加键 + HTML 元素加 `data-i18n`。
- 默认语言中文写在 HTML 里（对搜索引擎可见），英文由 JS 切换。

## 6. SEO / 分享卡

- 站点 meta、Open Graph、Twitter Card、JSON-LD 都在 `index.html` 的 `<head>`。
- 分享卡图：`assets/img/og/og-cover.png`（1200×630）。改版时保持同路径覆盖即可。

## 7. 发布

```bash
node scripts/validate-data.js   # 必须无 ERROR
git add <改动文件>
git commit -m "Update fixtures: 2026-05-17 vs Some FC"
git push                         # main 分支 → Vercel 自动上线
```

上线 1-2 分钟后打开 https://www.starfc.sg 复查（桌面 + 手机 + 中英切换）。
