// =====================================================================
// STAR FC 球员名册（唯一维护入口）
// =====================================================================
// 命名规范：
// - id：小写英文 + 连字符（kebab-case），球员照片路径按 id 拼接：
//   assets/img/players/<id>/profile.jpg
// - name：规范英文名（全站统一显示用，赛程进球名单也用它）
// - nameZh：中文名（可选，仅在确认写法时填写，供数据参考/未来使用）
// - shortName：站内显示用短名（可选，如 Victor）
// - position：GK / CB / FULL BACK / DM / CM / WINGER / STRIKER
// - number：球衣号
//
// 新增球员：加一行对象即可；如果他出现在比赛进球名单里，
// data/fixtures.js 的 scorers 用 { id: '<id>' } 引用。
// =====================================================================
window.STARFC = window.STARFC || {};
window.STARFC.players = [
  { "id": "li-qinyang", "name": "Li Qinyang", "position": "GK", "number": 0 },
  { "id": "ding-guanhuai", "name": "Ding Guanhuai", "position": "GK", "number": 1 },
  { "id": "huang-pengxin", "name": "Huang Pengxin", "position": "FULL BACK", "number": 2 },
  { "id": "ouyang-mingyu", "name": "Ouyang Mingyu", "position": "CB", "number": 4 },
  { "id": "wu-wei", "name": "Wu Wei", "position": "CB", "number": 5 },
  { "id": "zhang-liang", "name": "Zhang Liang", "position": "FULL BACK", "number": 6 },
  { "id": "liu-zeyu", "name": "Liu Zeyu", "position": "DM", "number": 7 },
  { "id": "xu-zhihe", "name": "Xu Zhihe", "position": "CM", "number": 8 },
  { "id": "huang-jaron-zijie", "name": "Huang Jaron Zijie", "position": "STRIKER", "number": 9 },
  { "id": "neo-kai-feng", "name": "Neo Kai Feng", "position": "WINGER", "number": 10 },
  { "id": "wu-ding", "name": "Wu Ding", "position": "WINGER", "number": 11 },
  { "id": "heng-teh-hup", "name": "Heng Teh Hup", "position": "DM", "number": 12 },
  { "id": "sean-lim-minghui", "name": "Sean Lim Minghui", "position": "CM", "number": 13 },
  { "id": "sa-baiyi", "name": "Sa Baiyi", "nameZh": "萨百一", "position": "WINGER", "number": 14 },
  { "id": "sun-yumin", "name": "Sun Yumin", "position": "CB", "number": 15 },
  { "id": "feng-xin", "name": "Feng Xin", "nameZh": "冯鑫", "position": "WINGER", "number": 16 },
  { "id": "wu-jinglong", "name": "Wu Jinglong", "position": "CB", "number": 17 },
  { "id": "jiang-chaoxiong", "name": "Jiang Chaoxiong", "position": "STRIKER", "number": 18 },
  { "id": "zhang-xin", "name": "Zhang Xin", "nameZh": "张鑫", "position": "STRIKER", "number": 19 },
  { "id": "cui-zongyu", "name": "Cui Zongyu", "position": "WINGER", "number": 20 },
  { "id": "li-qilin", "name": "Li Qilin", "nameZh": "李祺琳", "position": "FULL BACK", "number": 22 },
  { "id": "zhou-xin", "name": "Zhou Xin", "position": "FULL BACK", "number": 24 },
  { "id": "liu-meihua", "name": "Liu Meihua", "nameZh": "刘美华", "position": "CM", "number": 25 },
  { "id": "gong-yiou", "name": "Gong Yiou", "position": "GK", "number": 26 },
  { "id": "joel-loh-ziyang", "name": "Joel Loh Ziyang", "position": "WINGER", "number": 27 },
  { "id": "wu-di", "name": "Wu Di", "position": "FULL BACK", "number": 28 },
  { "id": "victor-chukwuebuka-ebele", "name": "Victor Chukwuebuka Ebele", "shortName": "Victor", "position": "CM", "number": 29 },
  { "id": "hu-jianghai", "name": "Hu Jianghai", "position": "FULL BACK", "number": 33 },
  { "id": "toyama-yuchiro", "name": "Toyama Yuchiro", "position": "WINGER", "number": 38 },
  { "id": "zhao-ruilin", "name": "Zhao Ruilin", "position": "WINGER", "number": 45 },
  { "id": "sun-gan", "name": "Sun Gan", "position": "CB", "number": 46 },
  { "id": "zhang-wei", "name": "Zhang Wei", "position": "FULL BACK", "number": 49 },
  { "id": "sun-haoyang", "name": "Sun Haoyang", "position": "FULL BACK", "number": 51 },
  { "id": "zhao-yu", "name": "Zhao Yu", "nameZh": "赵宇", "position": "WINGER", "number": 56 },
  { "id": "lan-yihang", "name": "Lan Yihang", "nameZh": "蓝一航", "position": "WINGER", "number": 63 },
  { "id": "zhang-shenqi", "name": "Zhang Shenqi", "position": "FULL BACK", "number": 66 },
  { "id": "li-jiahao", "name": "Li Jiahao", "position": "WINGER", "number": 68 },
  { "id": "jing-yilin", "name": "Jing Yilin", "position": "DM", "number": 81 },
  { "id": "you-wei", "name": "You Wei", "position": "WINGER", "number": 88 },
  { "id": "wang-xiangan", "name": "Wang Xiangan", "position": "DM", "number": 92 }
];

// 队长 / 副队长（球队成员板块的 C / VC 徽章与排序依据）
window.STARFC.team = {
  captainId: "liu-meihua",
  viceCaptainIds: ["zhang-xin", "feng-xin"]
};

// 别名对照表：比赛截图/群聊里常见的绰号、简称、中文名 → 球员 id。
// 录入 data/fixtures.js 时遇到这些写法，一律换成对应 id 引用。
// （此表供维护者与自动化 agent 查询，也用于 scripts/validate-data.py 校验提示。）
window.STARFC.aliases = {
  "小许": "xu-zhihe",
  "雄": "jiang-chaoxiong",
  "干哥": "sun-gan",
  "老孙": null, // 身份未确认：出现在 2026 赛季进球名单，暂按编外记 Lao Sun，确认后填 id
  "Jaron小杰": "huang-jaron-zijie",
  "Joel": "joel-loh-ziyang",
  "Victor": "victor-chukwuebuka-ebele",
  "张鑫": "zhang-xin",
  "冯鑫": "feng-xin",
  "刘美华": "liu-meihua",
  "蓝一航": "lan-yihang",
  "萨百一": "sa-baiyi",
  "李祺琳": "li-qilin",
  "赵宇": "zhao-yu"
};
