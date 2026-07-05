// =====================================================================
// STAR FC 媒体中心数据（唯一维护入口）
// =====================================================================
// 每发布一条比赛集锦：在 videos 数组【最前面】插入一个对象：
//   { "date": "2026-01-11", "opponent": "Kings FC", "url": "https://youtu.be/xxxx", "cover": null },
// - 标题自动生成为「YYYY-MM-DD vs 对手（比赛集锦）」（英文界面自动切换为 (Highlights)）
// - cover 可填封面图路径（如 "assets/img/media/highlights/2026-01-11-kings-fc/cover.jpg"），
//   为 null 时显示默认的红色渐变占位封面。
// =====================================================================
window.STARFC = window.STARFC || {};
window.STARFC.media = {
  videos: [
    { "date": "2025-12-28", "opponent": "Big Boy FC", "url": "https://youtu.be/4OrldkJYwNo?si=XN6lyb_HHo1JaBpL", "cover": null },
    { "date": "2025-12-21", "opponent": "Unity FC", "url": "https://youtu.be/i9Ii38rCtIk?si=Zt3QeYKWytESdhlA", "cover": null },
    { "date": "2025-12-14", "opponent": "Victoria School Alumni", "url": "https://youtu.be/ZBf7P6gq858?si=ZnKMqzENFTlLtrAq", "cover": null },
    { "date": "2025-11-30", "opponent": "West Coast Rangers FC", "url": "https://youtu.be/CPhf7mba9mE?si=xj5wKbv3hb0xWFVH", "cover": null },
    { "date": "2025-11-23", "opponent": "Warriors United", "url": "https://youtu.be/foVmzE14wBw?si=ZxA34p30bFJR9YIX", "cover": null },
    { "date": "2025-11-15", "opponent": "SUTD School Team", "url": "https://youtu.be/ONPuUM_fM1A?si=VgDMMGY-epGSbMri", "cover": null },
    { "date": "2025-11-09", "opponent": "Champon FC", "url": "https://youtu.be/aKRfU1saIFM?si=zvl00Pq5irHpFPIZ", "cover": null },
    { "date": "2025-11-06", "opponent": "SCC II", "url": "https://youtu.be/AtRie2Ecwp0?si=Tm9GoTFAa0p2w4Wi", "cover": null }
  ]
};
