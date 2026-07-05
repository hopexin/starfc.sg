# 球队网站动效案例与可行性清单（2026-07 调研）

给 STAR FC 官网下一步"动效层"决策用。核心约束不变：零构建、纯静态、每周由 agent 维护数据、首屏要快。

## 一、值得看的案例

| 案例 | 链接 | 看什么 |
| --- | --- | --- |
| FC Porto Memorial（Significa 制作，Awwwards 当日最佳+开发奖） | awwwards.com 搜 "FC Porto Memorial" / significa.co | **最贴近我们**：足球俱乐部历史纪念站，滚动驱动的叙事动画、大事记的电影感呈现——可借鉴到"队史大事记" |
| Venezia FC 官网 | veneziafc.it | 时尚品牌式的球队官网（Bureau Borsche 设计，被 GQ 称为"最时髦俱乐部"）：**克制本身就是高级**，大图大字、极少动效——我们深色方向的对照标杆 |
| AS Roma 官网 | asroma.com | 职业俱乐部信息架构标杆（IMA "Best in Class"）：Match Center 优先、数据模块化——我们已借鉴其思路 |
| Audi F1 "Feel Every Second"（Awwwards HM） | awwwards.com 搜 "Audi F1" | 大字 kinetic typography、滚动驱动的速度感叙事——Hero 大字入场可借鉴 |
| "How F1 has evolved since 1950"（Awwwards HM） | awwwards.com 搜同名 | **数据滚动叙事**：把历史数据做成滚动可视化——我们 70 场比赛数据可以做轻量版（赛季曲线/进球分布） |
| WC26 Unofficial Player Album（Awwwards） | awwwards.com 搜 "WC26 Player Album" | 球员卡收藏册式交互（翻卡/倾斜/闪光）——贴我们的球员卡模块 |
| Awwwards Sports 合集 | awwwards.com/websites/sports/ | 总入口，2026 年获奖运动站长期更新 |
| Codrops / Lusion | tympanus.net/codrops、lusion.co | WebGL/着色器滚动效果的技术上限参考（重型，见下文 T3） |

## 二、技术菜单（按与本站约束的兼容性分级）

### T1 · 立即可做（纯 CSS + 原生 JS，零依赖，性能无损）
1. **滚动渐入**：IntersectionObserver，板块/卡片进入视口时淡入+上移，网格内错峰（stagger）。
2. **数字 count-up**：赛季统计、关于页数据块进入视口时从 0 滚到真实值——运动网站标配，配 Barlow Condensed 很出效果。
3. **Hero 大字入场**：STAR FC 逐字上滑/clip-path 揭示 + 战绩条延迟浮入。
4. **射手榜数据条生长**：进入视口时从 0 宽度长到实际比例。
5. **Hero 光斑视差**：泛光灯光斑随滚动/鼠标缓慢漂移（transform，60fps）。
6. **锚点滚动的渐进增强**（View Transitions API，不支持的浏览器自动降级）。
- 全部尊重 `prefers-reduced-motion`；不影响每周数据维护。

### T2 · 可做但建议克制（仍零依赖，多一些 JS）
7. 球员卡/比赛卡 **3D tilt**（鼠标跟随倾斜 + 高光，FIFA 卡手感）。
8. **磁性按钮**（主 CTA 轻微吸附鼠标）。

### T3 · 重型（需第三方库，与零构建/维护简单/首屏快冲突——不推荐，仅存档）
9. WebGL / three.js 粒子、着色器背景（Lusion 级）：+600KB，移动端耗电，agent 维护风险高。
10. GSAP ScrollTrigger 全页滚动叙事：技术上可用 CDN 免构建（~70KB），效果最强，但引入外部运行时依赖（与去 Tailwind CDN 的理由矛盾）。
11. Lottie 动画：需要动画源文件生产流程，团队没有产能。

## 三、建议与落地状态

**已实现（2026-07）**：T1 全套（滚动渐入 / 数字滚动 / Hero 逐词入场 / 射手榜条生长 / 光斑视差 / 大事记节点弹出）+ T2 的球员卡 3D 倾斜光泽。实现细节见 `docs/DESIGN.md` §5 动效层。T3 维持不做。
