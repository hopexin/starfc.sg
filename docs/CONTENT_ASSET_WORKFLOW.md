# STAR FC 内容资产协作流程

目标：让你只需要把素材丢进固定文件夹，我负责整理、命名、检查并逐步接入网站。

## 当前原则

1. `index.html` 仍是唯一发布页。
2. 不做架构重构，不引入构建工具，不把全站改成数据驱动渲染。
3. 先建立素材流程，再逐步替换占位内容。
4. 素材原件放在 inbox，处理后的发布文件放在 `assets/img/`。
5. 脚本默认不删除 inbox 原件，避免误删。
6. `.DS_Store` 等系统文件不要进入 commit。

## 文件夹分工

| 用途 | 你放素材的位置 | 网站发布位置 | 处理方式 |
| --- | --- | --- | --- |
| 比赛截图 | `match-screenshots-inbox/` | `index.html` Fixtures 卡片 | 我逐张读取，先整理文字给你确认 |
| 比赛集锦封面 | `media-cover-inbox/` | `assets/img/media/highlights/<match-id>/cover.jpg` | 先匹配视频，再生成/复制封面 |
| 球员照片 | `player-photo-inbox/` | `assets/img/players/<id>/profile.jpg` | 脚本按球员 id/英文名匹配 |
| 名人堂素材 | `hall-of-fame-inbox/` | `assets/img/hall/<id>/profile.jpg` + `index.html` 卡片 | 先整理人物资料，再人工确认 |

## 比赛集锦封面

当前媒体中心视频卡还没有接入封面图。下一步接入时，建议统一读取：

```text
assets/img/media/highlights/<match-id>/cover.jpg
```

`<match-id>` 规则：

```text
YYYY-MM-DD-opponent-slug
```

示例：

```text
assets/img/media/highlights/2025-12-28-big-boy-fc/cover.jpg
assets/img/media/highlights/2025-12-21-unity-fc/cover.jpg
```

你可以把封面原图先放到 `media-cover-inbox/`，文件名尽量写日期和对手。也可以只给我比赛信息，我来生成统一风格封面。

检查现有视频缺哪些封面：

```bash
python3 scripts/validate-media-covers.py
```

初始化现有视频封面目录：

```bash
python3 scripts/validate-media-covers.py --create-dirs
```

## 球员照片

当前 Team 区块已经固定读取：

```text
assets/img/players/<id>/profile.jpg
```

你有两种方式：

1. 直接把照片放进 `assets/img/players/<id>/`，再运行 `bash scripts/normalize-player-photos.sh`。
2. 把照片放进 `player-photo-inbox/`，文件名写球员 id 或英文姓名，再运行 `bash scripts/import-player-photos.sh`。

示例文件名：

```text
zhang-xin.jpg
Zhang Xin.png
liu-meihua.jpeg
```

默认不覆盖已有头像。如果要替换头像：

```bash
OVERWRITE=1 bash scripts/import-player-photos.sh
```

## 名人堂

名人堂现在仍是占位内容。不要只丢照片就直接上线，建议每个人同时准备照片和文字。

推荐结构：

```text
hall-of-fame-inbox/lemon/
  photo.jpg
  info.md
```

`info.md` 建议写：

- 姓名
- 称号
- 年份
- 一句话简介
- 详细故事或贡献

确认后再把内容写进 `index.html` 的 Hall of Fame Section。

## 报名表

当前 Join 区块是静态表单，不能真实提交。下一步二选一：

1. 给我真实 Google Form / Tally 链接，我把按钮改成外链。
2. 如果暂时没有表单，把按钮降级为 `mailto:account@starfc.sg`，避免访客以为已经提交成功。

表单是比封面更高优先级的问题，因为它直接影响新球员联系球队。

## 建议优先级

1. 修 Join 表单真实提交入口。
2. 接入比赛集锦封面读取路径，并先补 8 个已有视频封面。
3. 批量补当前阵容头像。
4. 整理第一批名人堂人物资料。
