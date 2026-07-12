# STAR FC 内容资产协作流程（2026-07 重构后版本）

目标：素材只需要丢进固定文件夹，由维护者/自动化 agent 整理、命名、检查并接入网站。

## 当前原则

1. 站点保持纯静态零构建；`index.html` 是页面骨架，**可变内容都在 `data/` 目录**。
2. 素材原件放在 inbox，处理后的发布文件放在 `assets/img/`。
3. 脚本默认不删除 inbox 原件，避免误删。
4. `.DS_Store` 等系统文件不要进入 commit。
5. 改完数据运行 `node scripts/validate-data.js`，无 ERROR 才提交。

## 文件夹分工

| 用途 | 素材投递位置 | 网站发布位置 | 处理方式 |
| --- | --- | --- | --- |
| 比赛截图 | `match-screenshots-inbox/` | `data/fixtures.js` 比赛对象 | 逐张读取 → 文字确认 → 写入数据（见 MATCH_SCREENSHOT_UPDATE_WORKFLOW.md） |
| 比赛集锦封面 | `media-cover-inbox/` | `assets/img/media/highlights/<match-id>/cover.jpg` + `data/media.js` 的 `cover` 字段 | 先匹配视频，再复制封面并填路径 |
| 球员照片 | `player-photo-inbox/` | `assets/img/players/<id>/profile.jpg` | 脚本按球员 id/英文名匹配 |
| 名人堂素材 | `hall-of-fame-inbox/` | `assets/img/hall/<id>/profile.jpg` + `index.html` 名人堂卡片 | 先整理人物资料，再人工确认 |

## 比赛集锦封面

视频卡**已支持封面图**：`data/media.js` 里对应视频的 `cover` 字段填路径即可，
`null` 时显示默认深色播放占位。统一路径：

```text
assets/img/media/highlights/<match-id>/cover.jpg
```

`<match-id>` 规则：`YYYY-MM-DD-opponent-slug`，示例：

```text
assets/img/media/highlights/2025-12-28-big-boy-fc/cover.jpg
```

封面原图先放 `media-cover-inbox/`（文件名尽量写日期和对手）。

检查缺哪些封面 / 初始化目录：

```bash
python3 scripts/validate-media-covers.py
python3 scripts/validate-media-covers.py --create-dirs
```

## 球员照片

Team 区块固定读取 `assets/img/players/<id>/profile.jpg`（id 见 `data/players.js`）。

两种方式：

1. 照片放进 `assets/img/players/<id>/`，运行 `bash scripts/normalize-player-photos.sh`。
2. 照片放进 `player-photo-inbox/`（文件名写 id 或英文姓名），运行 `bash scripts/import-player-photos.sh`。

默认不覆盖已有头像；替换用 `OVERWRITE=1 bash scripts/import-player-photos.sh`。
缺图清单：`bash scripts/validate-assets.sh`。

## 名人堂

仍是占位内容。每个人同时准备照片和文字：

```text
hall-of-fame-inbox/lemon/
  photo.jpg
  info.md   # 姓名 / 称号 / 年份 / 一句话简介 / 详细故事
```

确认后替换 `index.html` 中当前隐藏的 Hall of Fame 占位卡（新增文案在 `data/i18n.js` 配对英文）；
首位真实人物上线时再恢复区块与导航入口。

## 报名表

Join 区块保留表单字段，CTA 为 `mailto:account@starfc.sg`（重构中保持原行为不变）。
后续如接入真实 Google Form / Tally，把 CTA href 换成表单外链即可（同时更新 `data/i18n.js` 的按钮文案）。

## 建议优先级

1. 接入真实 Google Form / Tally 报名入口。
2. 补 8 个已有视频的封面（路径已接入，填 `cover` 即显示）。
3. 批量补当前阵容头像（40 人目前全部缺图）。
4. 整理第一批名人堂人物资料。
