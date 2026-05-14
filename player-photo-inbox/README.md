# Player Photo Inbox

把球员头像原图放到这里，文件名写球员 id 或英文姓名即可。

推荐文件名：

- `zhang-xin.jpg`
- `Zhang Xin.png`
- `liu-meihua.jpeg`

处理规则：

- 脚本会匹配 `assets/js/data.js` 里的球员 `id` 和英文姓名
- 最终头像会生成到 `assets/img/players/<id>/profile.jpg`
- 如果同名球员已有 `profile.jpg`，默认跳过；需要覆盖时运行 `OVERWRITE=1 bash scripts/import-player-photos.sh`
- 原图不会自动删除
