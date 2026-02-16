# PLAYER PHOTO GUIDE

目标：你只需要把照片拖进对应球员文件夹，文件名可以随意，不用改成 id。

网站固定读取头像路径：`assets/img/players/<id>/profile.jpg`

## 操作步骤（小白版）

1. 在下方表格找到球员名字对应的 `id` 和文件夹路径。
2. 把照片拖进该文件夹（文件名随意，例如 `IMG_1234.jpg`）。
3. 在项目根目录运行：`bash scripts/normalize-player-photos.sh`
4. 刷新网页，查看 Team 区块头像是否更新。

## 球员文件夹对照表

| 姓名 | id | 照片文件夹 |
| --- | --- | --- |
| Li Qinyang | `li-qinyang` | `assets/img/players/li-qinyang/` |
| Ding Guanhuai | `ding-guanhuai` | `assets/img/players/ding-guanhuai/` |
| Huang Pengxin | `huang-pengxin` | `assets/img/players/huang-pengxin/` |
| Ouyang Mingyu | `ouyang-mingyu` | `assets/img/players/ouyang-mingyu/` |
| Wu Wei | `wu-wei` | `assets/img/players/wu-wei/` |
| Zhang Liang | `zhang-liang` | `assets/img/players/zhang-liang/` |
| Liu Zeyu | `liu-zeyu` | `assets/img/players/liu-zeyu/` |
| Xu Zhihe | `xu-zhihe` | `assets/img/players/xu-zhihe/` |
| Huang Jaron Zijie | `huang-jaron-zijie` | `assets/img/players/huang-jaron-zijie/` |
| Neo Kai Feng | `neo-kai-feng` | `assets/img/players/neo-kai-feng/` |
| Wu Ding | `wu-ding` | `assets/img/players/wu-ding/` |
| Heng Teh Hup | `heng-teh-hup` | `assets/img/players/heng-teh-hup/` |
| Sean Lim Minghui | `sean-lim-minghui` | `assets/img/players/sean-lim-minghui/` |
| Sa Baiyi | `sa-baiyi` | `assets/img/players/sa-baiyi/` |
| Sun Yumin | `sun-yumin` | `assets/img/players/sun-yumin/` |
| Feng Xin | `feng-xin` | `assets/img/players/feng-xin/` |
| Wu Jinglong | `wu-jinglong` | `assets/img/players/wu-jinglong/` |
| Jiang Chaoxiong | `jiang-chaoxiong` | `assets/img/players/jiang-chaoxiong/` |
| Zhang Xin | `zhang-xin` | `assets/img/players/zhang-xin/` |
| Cui Zongyu | `cui-zongyu` | `assets/img/players/cui-zongyu/` |
| Li Qilin | `li-qilin` | `assets/img/players/li-qilin/` |
| Zhou Xin | `zhou-xin` | `assets/img/players/zhou-xin/` |
| Liu Meihua | `liu-meihua` | `assets/img/players/liu-meihua/` |
| Gong Yiou | `gong-yiou` | `assets/img/players/gong-yiou/` |
| Joel Loh Ziyang | `joel-loh-ziyang` | `assets/img/players/joel-loh-ziyang/` |
| Wu Di | `wu-di` | `assets/img/players/wu-di/` |
| Victor Chukwuebuka Ebele | `victor-chukwuebuka-ebele` | `assets/img/players/victor-chukwuebuka-ebele/` |
| Hu Jianghai | `hu-jianghai` | `assets/img/players/hu-jianghai/` |
| Toyama Yuchiro | `toyama-yuchiro` | `assets/img/players/toyama-yuchiro/` |
| Zhao Ruilin | `zhao-ruilin` | `assets/img/players/zhao-ruilin/` |
| Sun Gan | `sun-gan` | `assets/img/players/sun-gan/` |
| Zhang Wei | `zhang-wei` | `assets/img/players/zhang-wei/` |
| Sun Haoyang | `sun-haoyang` | `assets/img/players/sun-haoyang/` |
| Zhao Yu | `zhao-yu` | `assets/img/players/zhao-yu/` |
| Lan Yihang | `lan-yihang` | `assets/img/players/lan-yihang/` |
| Zhang Shenqi | `zhang-shenqi` | `assets/img/players/zhang-shenqi/` |
| Li Jiahao | `li-jiahao` | `assets/img/players/li-jiahao/` |
| Jing Yilin | `jing-yilin` | `assets/img/players/jing-yilin/` |
| You Wei | `you-wei` | `assets/img/players/you-wei/` |
| Wang Xiangan | `wang-xiangan` | `assets/img/players/wang-xiangan/` |

## 备注

- 如果该球员目录里已经有 `profile.jpg`，脚本会 `Skipped`（不会改动）。
- 如果目录里没有任何 `jpg/jpeg/png`，脚本会显示 `Missing`。
- 页面没有头像时会继续显示占位图，不会报错。
