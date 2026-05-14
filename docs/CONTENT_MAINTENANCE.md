# STAR FC 网站内容维护指南

本文档说明如何更新网站内容。当前站点是静态单页发布，但部分维护入口已经拆出：

- 比赛截图到战绩更新：优先看 `docs/MATCH_SCREENSHOT_UPDATE_WORKFLOW.md`
- 每周验收清单：优先看 `docs/WEEKLY_UPDATE_CHECKLIST.md`
- 球员照片：优先看 `docs/PLAYER_PHOTO_GUIDE.md`
- 球员名单数据：维护 `assets/js/data.js`

注意：`index.html` 里仍保留一些历史 JSON 块，但 Fixtures 当前主要由页面内卡片直接展示，不要把 `fixtures-data` 当作唯一渲染来源。

---

## 目录结构

```
assets/
  img/
    club/       # 俱乐部 logo（starfclogo2.png, star_logo.jpg）
    players/    # 球员照片
    hall/       # 名人堂照片
    news/       # 新闻配图
    fixtures/   # 赛程相关图片
  icons/        # SVG 图标
```

---

## 1. 添加/替换球员照片

### 步骤

1. 在 `docs/PLAYER_PHOTO_GUIDE.md` 找到球员对应的 `id`。
2. 把照片拖进 `assets/img/players/<id>/`。
3. 运行：

```bash
bash scripts/normalize-player-photos.sh
```

4. 网站会读取 `assets/img/players/<id>/profile.jpg`。
5. 如果是新增球员，再维护 `assets/js/data.js` 的 `window.STAR_FC_DATA.players`。

---

## 2. 更新社媒链接/报名表链接

### 步骤

1. 打开 `index.html`，找到 `<!-- CONTENT UPDATE ZONE -->` 区域
2. 找到 `<script id="links-data">`
3. 修改对应的链接值：

```json
{
  "social": {
    "xiaohongshu": "https://www.xiaohongshu.com/user/profile/xxx",
    "instagram": "https://instagram.com/starfc_sg",
    "youtube": "https://youtube.com/@starfc"
  },
  "forms": {
    "registration": "https://forms.gle/xxx",
    "feedback": "https://forms.gle/yyy"
  },
  "other": {
    "official_site": "https://starfc.sg"
  }
}
```

> **注意**：修改 `links-data` 后，需要同步更新页面中实际使用这些链接的 `<a href="">` 标签。

---

## 3. 更新名人堂

### 步骤

1. **准备照片**
   - 格式：`jpg` 或 `webp`
   - 尺寸：建议 400×500px（4:5 比例）
   - 放入 `assets/img/hall/` 目录

2. **更新数据**
   - 找到 `<script id="hall-data">`
   - 添加或修改条目：

```json
{
  "id": "player-name",
  "name": "球员姓名",
  "period": "2020-2024",
  "achievement": "最佳射手",
  "photo": "assets/img/hall/player-name.jpg"
}
```

---

## 4. 更新新闻/动态

### 步骤

1. **准备配图**
   - 格式：`jpg` 或 `webp`
   - 尺寸：建议 800×450px（16:9 比例）
   - 放入 `assets/img/news/` 目录

2. **更新数据**
   - 找到 `<script id="media-data">`
   - 在 `news` 数组中添加条目：

```json
{
  "id": "news-2024-01",
  "title": "新闻标题",
  "date": "2024-01-15",
  "summary": "新闻摘要...",
  "image": "assets/img/news/news-2024-01.jpg",
  "link": "https://..."
}
```

---

## 5. 更新赛程

### 步骤

1. 截图录入先看 `docs/MATCH_SCREENSHOT_UPDATE_WORKFLOW.md`。
2. 打开 `index.html`，找到对应年份注释区块：
   - `FIXTURES_2025_START` 到 `FIXTURES_2025_END`
   - `FIXTURES_2026_START` 到 `FIXTURES_2026_END`
3. 复制同结果类型的现有卡片，替换日期、赛事、对手、比分、进球、地点。
4. 同步更新该年份统计数字。
5. 不要只修改 `<script id="fixtures-data">`，它不是当前 Fixtures 视觉卡片的唯一来源。

---

## 图片规范

| 类型 | 推荐格式 | 推荐尺寸 | 比例 |
|------|----------|----------|------|
| 球员照片 | webp/jpg | 400×500px | 4:5 |
| 名人堂照片 | webp/jpg | 400×500px | 4:5 |
| 新闻配图 | webp/jpg | 800×450px | 16:9 |
| 俱乐部 Logo | png | 原尺寸 | - |
| 图标 | svg | - | - |

### 图片优化建议

- 使用 [Squoosh](https://squoosh.app/) 或 [TinyPNG](https://tinypng.com/) 压缩图片
- webp 格式比 jpg 小 25-35%，优先使用
- 确保图片清晰度足够，但文件大小控制在 200KB 以内

---

## 自检清单

更新内容后，请逐项检查：

- [ ] **文件位置正确**：图片放在了正确的 `assets/img/` 子目录
- [ ] **文件命名规范**：使用小写字母、数字、连字符，无空格或中文
- [ ] **JSON 格式正确**：使用 [JSONLint](https://jsonlint.com/) 验证语法
- [ ] **路径一致**：JSON 中的 `photo`/`image` 路径与实际文件路径一致
- [ ] **本地预览**：在浏览器中打开 `index.html` 检查显示效果
- [ ] **移动端测试**：使用浏览器开发者工具切换到移动端视图检查
- [ ] **链接可用**：点击所有更新的链接确认能正常打开

---

## 常见问题

### 图片不显示

1. 检查文件路径是否正确（区分大小写）
2. 确认文件已放入正确目录
3. 确认文件名与 JSON 中的路径完全一致

### JSON 语法错误

常见错误：
- 最后一项多了逗号 `,`
- 缺少引号 `""`
- 使用了中文引号 `""`

使用 [JSONLint](https://jsonlint.com/) 检查并修复。

### 更新后页面没变化

1. 清除浏览器缓存（Ctrl+Shift+R 或 Cmd+Shift+R）
2. 确认保存了 `index.html` 文件
3. 确认修改的是正确的文件

---

## 文件备份

建议每次大更新前备份 `index.html`：

```bash
cp index.html index.html.backup-$(date +%Y%m%d)
```

或使用 Git：

```bash
git add .
git commit -m "更新内容: 描述"
```
