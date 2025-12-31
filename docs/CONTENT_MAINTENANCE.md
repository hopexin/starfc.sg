# STAR FC 网站内容维护指南

本文档说明如何更新网站内容。所有更改都在 `index.html` 文件中完成。

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

1. **准备图片**
   - 格式：`jpg` 或 `webp`（推荐 webp，体积更小）
   - 尺寸：建议 400×500px（4:5 比例）
   - 命名：使用拼音或英文，如 `liu-ziang.jpg`

2. **放置文件**
   - 将图片放入 `assets/img/players/` 目录

3. **更新 index.html**
   - 找到 `<!-- CONTENT UPDATE ZONE -->` 区域
   - 在 `<script id="players-data">` 中添加或修改球员数据：

```json
{
  "id": "liu-ziang",
  "name": "刘子昂",
  "number": 10,
  "position": "前锋",
  "photo": "assets/img/players/liu-ziang.jpg",
  "stats": { "goals": 15, "assists": 8 }
}
```

4. **在页面中引用**
   - 在球员展示区域的 HTML 中，使用相同的图片路径

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

1. 找到 `<script id="fixtures-data">`
2. 修改对应的赛事信息：

```json
{
  "upcoming": [
    {
      "id": "match-001",
      "date": "2024-02-01",
      "time": "19:00",
      "opponent": "对手球队",
      "venue": "比赛场地",
      "competition": "联赛名称"
    }
  ],
  "results": [
    {
      "id": "result-001",
      "date": "2024-01-20",
      "opponent": "对手球队",
      "score": "3-1",
      "result": "win"
    }
  ]
}
```

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
