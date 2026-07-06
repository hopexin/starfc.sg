// =====================================================================
// STAR FC 球员名册（唯一维护入口）
// =====================================================================
// 命名规范：
// - id：小写英文 + 连字符（kebab-case），球员照片路径按 id 拼接：
//   assets/img/players/<id>/profile.jpg
// - name：官方英文名（全站主显示：球员卡、进球名单都用它）
// - nameZh：官方中文名（可选，确认写法后填写）
// - nickZh / nickEn：昵称（可选；播报、录入时可用；页面显示仍以官方名为准）
// - shortName：显示覆盖（特例，如 Victor——填了它页面就显示它）
// - position：GK / CB / FULL BACK / DM / CM / WINGER / STRIKER
// - number：球衣号
//
// 新增球员：加一行对象即可；如果他出现在比赛进球名单里，
// data/fixtures.js 的 scorers 用 { id: '<id>' } 引用。
// =====================================================================
window.STARFC = window.STARFC || {};
window.STARFC.players = [
  { "id": "li-qinyang", "name": "Li Qinyang", "nameZh": "李沁洋", "nickEn": "Leo", "position": "GK", "number": 0 },
  { "id": "ding-guanhuai", "name": "Ding Guanhuai", "nameZh": "丁冠淮", "position": "GK", "number": 1 },
  { "id": "huang-pengxin", "name": "Huang Pengxin", "nameZh": "黄鹏新", "nickZh": "小新", "position": "FULL BACK", "number": 2 },
  { "id": "ouyang-mingyu", "name": "Ouyang Mingyu", "nameZh": "欧阳铭禹", "position": "CB", "number": 4 },
  { "id": "wu-wei", "name": "Wu Wei", "nameZh": "吴蔚", "nickEn": "ww", "position": "CB", "number": 5 },
  { "id": "zhang-liang", "name": "Zhang Liang", "nameZh": "张亮", "nickZh": "亮哥", "position": "FULL BACK", "number": 6 },
  { "id": "liu-zeyu", "name": "Liu Zeyu", "nameZh": "刘泽宇", "nickZh": "刘教", "position": "DM", "number": 7 },
  { "id": "xu-zhihe", "name": "Xu Zhihe", "nameZh": "许志和", "nickZh": "小许", "position": "CM", "number": 8 },
  { "id": "huang-jaron-zijie", "name": "Huang Jaron Zijie", "nameZh": "黄梓杰", "nickZh": "小杰", "nickEn": "Jaron", "position": "STRIKER", "number": 9 },
  { "id": "neo-kai-feng", "name": "Neo Kai Feng", "nameZh": "梁凯峰", "nickZh": "凯峰", "position": "WINGER", "number": 10 },
  { "id": "wu-ding", "name": "Wu Ding", "nameZh": "吴鼎", "position": "WINGER", "number": 11 },
  { "id": "heng-teh-hup", "name": "Heng Teh Hup", "nickZh": "阿信", "position": "DM", "number": 12 },
  { "id": "sean-lim-minghui", "name": "Sean Lim Minghui", "position": "CM", "number": 13 },
  { "id": "sa-baiyi", "name": "Sa Baiyi", "nameZh": "萨百一", "position": "WINGER", "number": 14 },
  { "id": "sun-yumin", "name": "Sun Yumin", "nameZh": "孙毓敏", "nickZh": "老孙", "position": "CB", "number": 15 },
  { "id": "feng-xin", "name": "Feng Xin", "nameZh": "冯鑫", "nickZh": "吊队", "position": "WINGER", "number": 16 },
  { "id": "wu-jinglong", "name": "Wu Jinglong", "nameZh": "吴景隆", "nickZh": "景队", "position": "CB", "number": 17 },
  { "id": "jiang-chaoxiong", "name": "Jiang Chaoxiong", "nameZh": "江朝雄", "nickZh": "雄爷", "position": "STRIKER", "number": 18 },
  { "id": "zhang-xin", "name": "Zhang Xin", "nameZh": "张鑫", "nickZh": "张总", "position": "STRIKER", "number": 19 },
  { "id": "cui-zongyu", "name": "Cui Zongyu", "nameZh": "崔纵宇", "nickZh": "崔崔", "position": "WINGER", "number": 20 },
  { "id": "li-qilin", "name": "Li Qilin", "nameZh": "李祺琳", "position": "FULL BACK", "number": 22 },
  { "id": "zhou-xin", "name": "Zhou Xin", "nameZh": "周欣", "nickZh": "周房东", "position": "FULL BACK", "number": 24 },
  { "id": "liu-meihua", "name": "Liu Meihua", "nameZh": "刘美华", "nickZh": "美队", "position": "CM", "number": 25 },
  { "id": "gong-yiou", "name": "Gong Yiou", "nameZh": "龚义欧", "nickZh": "拉队", "position": "GK", "number": 26 },
  { "id": "joel-loh-ziyang", "name": "Joel Loh Ziyang", "nickEn": "Joel", "position": "WINGER", "number": 27 },
  { "id": "wu-di", "name": "Wu Di", "nameZh": "吴迪", "position": "FULL BACK", "number": 28 },
  { "id": "victor-chukwuebuka-ebele", "name": "Victor Chukwuebuka Ebele", "shortName": "Victor", "position": "CM", "number": 29 },
  { "id": "hu-jianghai", "name": "Hu Jianghai", "nameZh": "胡江海", "position": "FULL BACK", "number": 33 },
  { "id": "toyama-yuchiro", "name": "Toyama Yuchiro", "nickEn": "Tommy", "position": "WINGER", "number": 38 },
  { "id": "zhao-ruilin", "name": "Zhao Ruilin", "nameZh": "赵瑞林", "position": "WINGER", "number": 45 },
  { "id": "sun-gan", "name": "Sun Gan", "nameZh": "孙干", "nickZh": "干哥", "position": "CB", "number": 46 },
  { "id": "zhang-wei", "name": "Zhang Wei", "nameZh": "张伟", "nickZh": "伟哥", "position": "FULL BACK", "number": 49 },
  { "id": "sun-haoyang", "name": "Sun Haoyang", "nameZh": "孙浩洋", "position": "FULL BACK", "number": 51 },
  { "id": "zhao-yu", "name": "Zhao Yu", "nameZh": "赵宇", "position": "WINGER", "number": 56 },
  { "id": "lan-yihang", "name": "Lan Yihang", "nameZh": "蓝一航", "position": "WINGER", "number": 63 },
  { "id": "zhang-shenqi", "name": "Zhang Shenqi", "nameZh": "张深琪", "position": "FULL BACK", "number": 66 },
  { "id": "li-jiahao", "name": "Li Jiahao", "nameZh": "李嘉浩", "nickZh": "嘉浩", "position": "WINGER", "number": 68 },
  { "id": "jing-yilin", "name": "Jing Yilin", "nameZh": "景益霖", "nickZh": "景少", "nickEn": "JYL", "position": "DM", "number": 81 },
  { "id": "you-wei", "name": "You Wei", "nameZh": "游伟", "position": "WINGER", "number": 88 },
  { "id": "wang-xiangan", "name": "Wang Xiangan", "nameZh": "王祥安", "nickEn": "Fred", "position": "DM", "number": 92 }
];

// 队长 / 副队长（球队成员板块的 C / VC 徽章与排序依据）
window.STARFC.team = {
  captainId: "liu-meihua",
  viceCaptainIds: ["zhang-xin", "feng-xin"]
};

// 别名对照表：比赛截图/群聊里常见的绰号、简称、中文名 → 球员 id。
// 录入 data/fixtures.js 时遇到这些写法，一律换成对应 id 引用。
// 新增昵称时：名册对象里补 nickZh/nickEn + 此表加一行映射，两处都要。
window.STARFC.aliases = {
  "Leo": "li-qinyang",
  "李沁洋": "li-qinyang",
  "丁冠淮": "ding-guanhuai",
  "黄鹏新": "huang-pengxin",
  "小新": "huang-pengxin",
  "欧阳铭禹": "ouyang-mingyu",
  "吴蔚": "wu-wei",
  "ww": "wu-wei",
  "张亮": "zhang-liang",
  "亮哥": "zhang-liang",
  "刘泽宇": "liu-zeyu",
  "刘教": "liu-zeyu",
  "许志和": "xu-zhihe",
  "小许": "xu-zhihe",
  "黄梓杰": "huang-jaron-zijie",
  "小杰": "huang-jaron-zijie",
  "Jaron": "huang-jaron-zijie",
  "雄": "jiang-chaoxiong",
  "梁凯峰": "neo-kai-feng",
  "凯峰": "neo-kai-feng",
  "吴鼎": "wu-ding",
  "阿信": "heng-teh-hup",
  "孙毓敏": "sun-yumin",
  "吴景隆": "wu-jinglong",
  "景队": "wu-jinglong",
  "江朝雄": "jiang-chaoxiong",
  "雄爷": "jiang-chaoxiong",
  "张总": "zhang-xin",
  "崔纵宇": "cui-zongyu",
  "崔崔": "cui-zongyu",
  "周欣": "zhou-xin",
  "周房东": "zhou-xin",
  "龚义欧": "gong-yiou",
  "拉队": "gong-yiou",
  "吴迪": "wu-di",
  "胡江海": "hu-jianghai",
  "Tommy": "toyama-yuchiro",
  "赵瑞林": "zhao-ruilin",
  "干哥": "sun-gan",
  "孙干": "sun-gan",
  "老孙": "sun-yumin",
  "张伟": "zhang-wei",
  "伟哥": "zhang-wei",
  "孙浩洋": "sun-haoyang",
  "张深琪": "zhang-shenqi",
  "李嘉浩": "li-jiahao",
  "嘉浩": "li-jiahao",
  "景益霖": "jing-yilin",
  "景少": "jing-yilin",
  "JYL": "jing-yilin",
  "游伟": "you-wei",
  "王祥安": "wang-xiangan",
  "Fred": "wang-xiangan",
  "fred": "wang-xiangan",
  "Jaron小杰": "huang-jaron-zijie",
  "Joel": "joel-loh-ziyang",
  "Victor": "victor-chukwuebuka-ebele",
  "张鑫": "zhang-xin",
  "冯鑫": "feng-xin",
  "刘美华": "liu-meihua",
  "美队": "liu-meihua",
  "吊队": "feng-xin",
  "蓝一航": "lan-yihang",
  "萨百一": "sa-baiyi",
  "李祺琳": "li-qilin",
  "赵宇": "zhao-yu"
};
