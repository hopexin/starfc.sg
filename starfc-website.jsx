import React, { useState, useEffect } from 'react';

// ============ COMPONENTS ============

// Navigation Component
const Navigation = ({ currentPage, setCurrentPage, isScrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('zh');
  
  const navItems = [
    { id: 'home', label: '主页', labelEn: 'Home' },
    { id: 'fixtures', label: '赛程战绩', labelEn: 'Fixtures' },
    { id: 'media', label: '媒体中心', labelEn: 'Media' },
    { id: 'team', label: '球队成员', labelEn: 'Team' },
    { id: 'about', label: '关于我们', labelEn: 'About' },
    { id: 'history', label: '队史荣誉', labelEn: 'History' },
    { id: 'join', label: '加入我们', labelEn: 'Join' },
    { id: 'contact', label: '联系我们', labelEn: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-2xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <img
              src="./starfclogo2.png"
              alt="STAR FC 官方队徽"
              className="w-10 h-10 object-contain drop-shadow-md"
            />
            <div>
              <span className="text-white font-bold text-xl tracking-wide">STAR FC</span>
              <span className="block text-amber-400 text-xs tracking-widest">SINCE 2002</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                  currentPage === item.id 
                    ? 'text-amber-400 bg-amber-400/10' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {lang === 'zh' ? item.label : item.labelEn}
              </button>
            ))}
          </div>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
              className="text-xs font-medium text-gray-400 hover:text-amber-400 transition-colors px-3 py-1 border border-gray-700 rounded-full"
            >
              {lang === 'zh' ? 'EN' : '中文'}
            </button>
            <button 
              className="lg:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900/98 backdrop-blur-xl border-t border-gray-800 py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setCurrentPage(item.id); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                  currentPage === item.id ? 'text-amber-400 bg-amber-400/10' : 'text-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = ({ setCurrentPage }) => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-red-950 to-slate-900" />
    <div className="absolute inset-0 opacity-30" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    }} />
    
    {/* Decorative Elements */}
    <div className="absolute top-1/4 left-10 w-72 h-72 bg-red-600/20 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
    
    {/* Content */}
    <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
      {/* Hero Logo */}
      <div className="mb-8 flex justify-center">
        <img
          src="./starfclogo2.png"
          alt="STAR FC 官方队徽"
          className="w-28 h-28 sm:w-32 sm:h-32 object-contain drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]"
        />
      </div>

      <div className="mb-6 inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
        <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
        <span className="text-amber-400 text-xs md:text-sm font-medium tracking-wide">成立于 2002 · 新加坡华人业余足球队</span>
      </div>

      <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight">
        STAR <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">FC</span>
      </h1>
      <p className="text-xl sm:text-2xl text-gray-300 mb-4 font-light">新加坡华人足球俱乐部</p>
      <p className="text-xl md:text-2xl lg:text-3xl text-white font-medium mb-8 md:mb-12">
        在异乡，也要踢出我们的<span className="text-amber-400">主场</span>。
      </p>

      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
        <button
          onClick={() => setCurrentPage('fixtures')}
          className="group px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg shadow-red-900/50 hover:shadow-red-800/60 hover:-translate-y-1 text-sm md:text-base"
        >
          查看本周赛程
          <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </button>
        <button
          onClick={() => setCurrentPage('history')}
          className="px-6 md:px-8 py-3 md:py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300 text-sm md:text-base"
        >
          了解 STAR FC 的故事
        </button>
        <button
          onClick={() => setCurrentPage('join')}
          className="px-6 md:px-8 py-3 md:py-4 bg-amber-500/10 backdrop-blur-sm text-amber-400 font-semibold rounded-xl border border-amber-500/30 hover:bg-amber-500/20 transition-all duration-300 text-sm md:text-base"
        >
          我要加入球队
        </button>
      </div>
    </div>
    
    {/* Scroll Indicator */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
        <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
      </div>
    </div>
  </section>
);

// Match Card Component
const MatchCard = ({ match, isUpcoming }) => (
  <div className={`p-6 rounded-2xl border ${isUpcoming ? 'bg-gradient-to-br from-red-900/30 to-slate-900 border-red-800/50' : 'bg-slate-800/50 border-slate-700/50'}`}>
    <div className="flex items-center gap-2 mb-4">
      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${isUpcoming ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'}`}>
        {isUpcoming ? '即将开球' : '完场'}
      </span>
      <span className="text-gray-500 text-sm">{match.competition}</span>
    </div>
    
    <div className="flex items-center justify-between mb-4">
      <div className="text-center flex-1">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center mb-2 shadow-lg">
          <span className="text-white font-bold text-lg">★</span>
        </div>
        <p className="text-white font-semibold">STAR FC</p>
      </div>
      
      <div className="px-6 text-center">
        {isUpcoming ? (
          <div>
            <p className="text-3xl font-bold text-white">VS</p>
            <p className="text-amber-400 text-sm mt-1">{match.time}</p>
          </div>
        ) : (
          <div className="text-4xl font-black text-white">{match.score}</div>
        )}
      </div>
      
      <div className="text-center flex-1">
        <div className="w-16 h-16 mx-auto bg-slate-700 rounded-xl flex items-center justify-center mb-2">
          <span className="text-gray-400 font-bold text-lg">⚽</span>
        </div>
        <p className="text-white font-semibold">{match.opponent}</p>
      </div>
    </div>
    
    <div className="flex items-center justify-between text-sm text-gray-400 border-t border-gray-700/50 pt-4">
      <span>📍 {match.venue}</span>
      <span>📅 {match.date}</span>
    </div>
    
    {match.scorers && (
      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <p className="text-gray-400 text-sm mb-2">进球：</p>
        <div className="flex flex-wrap gap-2">
          {match.scorers.map((scorer, idx) => (
            <span key={idx} className="px-3 py-1 bg-green-900/30 text-green-400 text-xs rounded-full">
              {scorer}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

// Fixtures Section
const FixturesSection = () => {
  const upcomingMatch = {
    date: '2025-03-09（周日）',
    time: '15:00',
    competition: 'Singapore Weekend League Premier 第7轮',
    opponent: 'Lion City Rangers',
    venue: 'Queenstown Stadium',
  };

  const recentMatch = {
    date: '2025-03-02（周日）',
    competition: 'Singapore Weekend League Premier 第6轮',
    opponent: 'Harbour United',
    venue: 'Queenstown Stadium',
    score: '3 - 1',
    scorers: ["12' 刘子昂", "44' 江子瑜", "85' 张一鸣"],
  };

  return (
    <section id="fixtures" className="py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Fixtures & Results</span>
          <h2 className="text-4xl font-bold text-white mt-2">本周赛程 & 最新战报</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            每周日下午，我们在新加坡不同球场风雨无阻开球。这里是 STAR FC 最近的赛程和战况。
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <MatchCard match={upcomingMatch} isUpcoming={true} />
          <MatchCard match={recentMatch} isUpcoming={false} />
        </div>
      </div>
    </section>
  );
};

// Video Highlights Section
const VideoSection = () => {
  const videos = [
    {
      title: '3–1 Harbour United：雨中控场的艺术',
      desc: '一场在 Queenstown Stadium 的雨战，STAR FC 三次打穿对手防线，展示了中场控制与快速反击的结合。',
      platform: '小红书',
    },
    {
      title: '4–2 逆转 East Coast Warriors',
      desc: '半场 0–2 落后，下半场 STAR FC 连入四球，完成赛季最燃的一次逆转。',
      platform: '小红书',
    },
    {
      title: '冠军之夜：2024 决赛全记录',
      desc: '这不是一场普通比赛，而是 22 年坚持的一个小小回报。',
      platform: 'YouTube',
    },
  ];

  return (
    <section id="media" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Highlights</span>
          <h2 className="text-4xl font-bold text-white mt-2">精彩瞬间</h2>
          <p className="text-gray-400 mt-4">每一周，我们都会剪辑全场录像，留下 STAR FC 的精彩瞬间。</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {videos.map((video, idx) => (
            <div key={idx} className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-amber-500/50 transition-all duration-500">
              <div className="aspect-video bg-gradient-to-br from-red-900/50 to-slate-900 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.1%22/%3E%3C/svg%3E')] opacity-50" />
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500/30 transition-all duration-300 cursor-pointer">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-white font-semibold mb-2 group-hover:text-amber-400 transition-colors">{video.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{video.desc}</p>
                <button className="text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors">
                  在{video.platform}查看 →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Preview Section
const AboutPreview = ({ setCurrentPage }) => (
  <section id="about" className="py-24 bg-slate-950 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-900/10 to-transparent" />
    <div className="max-w-6xl mx-auto px-4 relative">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">About Us</span>
          <h2 className="text-4xl font-bold text-white mt-2 mb-6">我们是谁</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              STAR FC 成立于 2002 年，是新加坡历史最悠久的华人业余足球队之一。20 多年来，我们几乎风雨无阻地出现在每个周末的球场：女皇镇、金文泰、淡滨尼、义顺……
            </p>
            <p>
              我们的队员来自各行各业：工程师、程序员、设计师、厨师、留学生、创业者。白天在办公室或工地忙碌，周末换上红色球衣，只有一个身份：<span className="text-amber-400 font-semibold">STAR FC 球员</span>。
            </p>
            <p>
              我们不是什么职业俱乐部，也没有豪华的设施。但我们有两样东西：
            </p>
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="text-3xl mb-2">❤️</div>
              <p className="text-white font-medium">对足球近乎倔强的热爱</p>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="text-3xl mb-2">🤝</div>
              <p className="text-white font-medium">像家人一样的队友</p>
            </div>
          </div>
          
          <button 
            onClick={() => setCurrentPage('history')}
            className="mt-8 px-6 py-3 bg-transparent border-2 border-amber-500/50 text-amber-400 font-semibold rounded-xl hover:bg-amber-500/10 transition-all duration-300"
          >
            了解完整队史 →
          </button>
        </div>
        
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-red-800 to-red-950 rounded-3xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)`,
            }} />
            <div className="text-center z-10">
              <div className="text-8xl font-black text-white/10">★</div>
              <p className="text-amber-400 text-xl font-medium mt-4">2002 - 2025</p>
              <p className="text-white text-3xl font-bold">23 年</p>
              <p className="text-gray-400 mt-2">风雨同行</p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="absolute -bottom-6 -left-6 p-4 bg-slate-800 rounded-xl border border-slate-700 shadow-xl">
            <p className="text-amber-400 text-3xl font-bold">80+</p>
            <p className="text-gray-400 text-sm">历史球员</p>
          </div>
          <div className="absolute -top-6 -right-6 p-4 bg-slate-800 rounded-xl border border-slate-700 shadow-xl">
            <p className="text-amber-400 text-3xl font-bold">5×</p>
            <p className="text-gray-400 text-sm">联赛冠军</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Quick Links Section
const QuickLinks = ({ setCurrentPage }) => {
  const links = [
    {
      title: '加入球队',
      desc: '你是否也在周末，想念一场 11 人制的真刀真枪？来试训吧，我们对有态度、有基础的球员永远开放。',
      icon: '⚽',
      page: 'join',
      color: 'from-red-600 to-red-800',
    },
    {
      title: '赞助与合作',
      desc: '想把你的品牌印在新加坡华人圈最有历史的球队球衣上？STAR FC 提供灵活、务实的赞助方案。',
      icon: '🤝',
      page: 'sponsorship',
      color: 'from-amber-600 to-amber-800',
    },
    {
      title: '青训 & 社区',
      desc: '从 2021 年起，我们开始为华人家庭的孩子开设兴趣训练营，用足球连接更多人。',
      icon: '👶',
      page: 'community',
      color: 'from-emerald-600 to-emerald-800',
    },
  ];

  return (
    <section id="join" className="py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {links.map((link, idx) => (
            <div 
              key={idx}
              className="group p-8 bg-slate-800/30 rounded-2xl border border-slate-700/50 hover:border-amber-500/30 transition-all duration-500 cursor-pointer"
              onClick={() => setCurrentPage(link.page)}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${link.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {link.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">{link.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{link.desc}</p>
              <span className="text-amber-400 text-sm font-medium">了解更多 →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// News Section (Contact Preview)
const NewsSection = ({ setCurrentPage }) => {
  const news = [
    { date: '2025-03-02', title: 'STAR FC 3–1 完胜 Harbour United，稳居联赛榜首' },
    { date: '2025-02-15', title: '新赛季发布会：STAR FC 公布 2025 赛季队长团与新球衣' },
    { date: '2025-01-10', title: 'STAR FC 2024 年度总结：22 年后的我们，依然在路上' },
  ];

  return (
    <section id="contact" className="py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">News</span>
            <h2 className="text-4xl font-bold text-white mt-2">最新动态</h2>
          </div>
          <button 
            onClick={() => setCurrentPage('news')}
            className="text-amber-400 font-medium hover:text-amber-300 transition-colors"
          >
            查看全部 →
          </button>
        </div>
        
        <div className="space-y-4">
          {news.map((item, idx) => (
            <div 
              key={idx}
              className="group flex items-center gap-6 p-6 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-amber-500/30 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer"
            >
              <div className="text-center min-w-[80px]">
                <p className="text-amber-400 text-2xl font-bold">{item.date.split('-')[2]}</p>
                <p className="text-gray-500 text-sm">{item.date.split('-')[1]}月</p>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium group-hover:text-amber-400 transition-colors">{item.title}</h3>
              </div>
              <span className="text-gray-600 group-hover:text-amber-400 transition-colors">→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ PAGE COMPONENTS ============

// Home Page - Single page scrollable layout
// Section order: Hero → Fixtures → Media → Team → About → History → Join → Contact
const HomePage = ({ setCurrentPage }) => (
  <>
    {/* 1. Hero Section */}
    <HeroSection setCurrentPage={setCurrentPage} />

    {/* 2. Fixtures Section */}
    <FixturesSection />

    {/* 3. Media/Video Section */}
    <VideoSection />

    {/* 4. Team Preview Section */}
    <TeamPreviewSection setCurrentPage={setCurrentPage} />

    {/* 5. About Preview Section */}
    <AboutPreview setCurrentPage={setCurrentPage} />

    {/* 6. History Preview Section */}
    <HistoryPreviewSection setCurrentPage={setCurrentPage} />

    {/* 7. Join/Quick Links Section */}
    <QuickLinks setCurrentPage={setCurrentPage} />

    {/* 8. Contact/News Section */}
    <NewsSection setCurrentPage={setCurrentPage} />
  </>
);

// Team Preview Section for Homepage
const TeamPreviewSection = ({ setCurrentPage }) => {
  const featuredPlayers = [
    { number: 6, name: '陈伟强', position: '后腰/队长', desc: '球队战术核心，擅长调度与抢断', captain: true },
    { number: 10, name: '刘子昂', position: '前锋', desc: '球队头号射手，左右脚均能射门' },
    { number: 1, name: '王立国', position: '守门员', desc: '反应快，指挥欲强，被队友称为"后防大喇叭"' },
    { number: 8, name: '江子瑜', position: '中前卫', desc: '有远射能力，视野开阔' },
  ];

  return (
    <section id="team" className="py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Squad</span>
          <h2 className="text-4xl font-bold text-white mt-2">一线队阵容</h2>
          <p className="text-gray-400 mt-4">2025 赛季核心球员</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPlayers.map((player) => (
            <div key={player.number} className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-amber-500/50 transition-all duration-500">
              <div className="aspect-[3/4] bg-gradient-to-br from-red-900/50 to-slate-900 flex items-center justify-center relative">
                {player.captain && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-amber-500 text-slate-900 text-xs font-bold rounded">
                    队长
                  </div>
                )}
                <span className="text-8xl font-black text-white/10">#{player.number}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-amber-400 font-bold">#{player.number}</span>
                  <span className="text-xs px-2 py-0.5 bg-slate-700 text-gray-300 rounded">{player.position}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{player.name}</h3>
                <p className="text-gray-400 text-sm">{player.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setCurrentPage('team')}
            className="px-6 py-3 bg-transparent border-2 border-amber-500/50 text-amber-400 font-semibold rounded-xl hover:bg-amber-500/10 transition-all duration-300"
          >
            查看完整阵容 →
          </button>
        </div>
      </div>
    </section>
  );
};

// History Preview Section for Homepage
const HistoryPreviewSection = ({ setCurrentPage }) => (
  <section id="history" className="py-24 bg-slate-900">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">History & Honours</span>
        <h2 className="text-4xl font-bold text-white mt-2">队史荣誉</h2>
        <p className="text-gray-400 mt-4">从 2001 年走到今天，我们从未散场</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Timeline Preview */}
        <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
          <div className="text-4xl mb-4">📜</div>
          <h3 className="text-xl font-bold text-white mb-3">球队历史</h3>
          <p className="text-gray-400 text-sm mb-4">2001 年浙江华人足球队诞生，2002 年正式成立 STAR FC，二十多年风雨同行。</p>
          <span className="text-amber-400 text-sm">7 个重要时刻 →</span>
        </div>

        {/* Badge Story Preview */}
        <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
          <div className="text-4xl mb-4">🛡️</div>
          <h3 className="text-xl font-bold text-white mb-3">队徽故事</h3>
          <p className="text-gray-400 text-sm mb-4">红色、双星、巨龙、盾牌——每一个元素都有它的意义。</p>
          <span className="text-amber-400 text-sm">了解队徽含义 →</span>
        </div>

        {/* Honours Preview */}
        <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
          <div className="text-4xl mb-4">🏆</div>
          <h3 className="text-xl font-bold text-white mb-3">荣誉殿堂</h3>
          <p className="text-gray-400 text-sm mb-4">UAFL 联赛亚军、多次联赛优异成绩，每一座奖杯背后都是汗水。</p>
          <span className="text-amber-400 text-sm">查看全部荣誉 →</span>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => setCurrentPage('history')}
          className="px-6 py-3 bg-transparent border-2 border-amber-500/50 text-amber-400 font-semibold rounded-xl hover:bg-amber-500/10 transition-all duration-300"
        >
          探索完整队史 →
        </button>
      </div>
    </div>
  </section>
);

// About Page
const AboutPage = () => {
  const values = [
    { icon: '🤝', title: '团结 Unity', desc: '老队员之间几十场、上百场并肩作战的感情；一代带一代的"传帮带"文化，让这支球队走过二十多年从未散场。' },
    { icon: '💡', title: '分享 Share', desc: '从技术动作到战术配合，从训练心得到生活经验，STAR FC 的更衣室里从来不藏私。' },
    { icon: '⚽', title: '乐趣 Fun', desc: '每个人都有正职工作，有家庭、有压力。能在周末换上球衣踢 90 分钟，本身就是一种幸福。' },
    { icon: '📈', title: '成长 Growth', desc: '我们欢迎不同水平的球员，但不接受"得过且过"。你可以慢，但要愿意学、敢于改。' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">About Us</span>
          <h1 className="text-5xl font-bold text-white mt-4 mb-6">关于 STAR FC</h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed text-lg">
              <span className="text-white font-semibold">STAR FC</span> 创建于 <span className="text-amber-400 font-semibold">2002 年</span>，前身为「浙江华人足球队」，由终身名誉队长 <span className="text-amber-400 font-semibold">Lemon（9 号）</span> 发起。
            </p>
            <p className="text-gray-300 leading-relaxed text-lg mt-6">
              球队最早只是一群在新加坡打拼的华人，通过狮城华人论坛认识，约在一片烂泥地上踢球。后来与「狮城华人论坛队」合并，<span className="text-white font-semibold">STAR FC</span> 逐渐成为坡岛华人圈中历史最悠久的业余球队之一。
            </p>
            <p className="text-gray-300 leading-relaxed text-lg mt-6">
              STAR FC 是一支以华人为主的业余 11 人制球队，长期活跃在新加坡各大球场。
            </p>
            <p className="text-gray-300 leading-relaxed text-lg mt-6">
              经过二十多年的风雨，球队经历了无数次人员更替、工作压力、伤病和现实考验，但从来没有散。靠的是：
            </p>
            <ul className="text-gray-300 text-lg mt-4 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                老队员之间几十场、上百场并肩作战的感情；
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                一代带一代的"传帮带"文化；
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                大家对足球这件事，始终舍不得放下。
              </li>
            </ul>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              { value: '23+', label: '年历史' },
              { value: '亚军', label: '2025 UAFL 联赛' },
              { value: '200+', label: '历史球员' },
              { value: '30+', label: '活跃成员' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <p className="text-4xl font-bold text-amber-400">{stat.value}</p>
                <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Our Values</span>
            <h2 className="text-4xl font-bold text-white mt-2">团结、分享、乐趣、成长</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="p-8 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Who We Are</span>
            <h2 className="text-4xl font-bold text-white mt-2">我们是谁</h2>
          </div>

          <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
            <p>
              STAR FC 把来自不同省份、不同行业、不同年龄段的朋友聚在一起——有工程师、程序员，也有老师、创业者和学生。
            </p>
            <p>
              白天大家各忙各的，周末换上红色球衣，只有一个共同身份：
            </p>
            <blockquote className="border-l-4 border-red-600 pl-6 my-8 italic text-xl text-white font-medium">
              STAR FC 球员。
            </blockquote>
            <p>
              现在，我们给自己的目标很简单：
            </p>
            <div className="p-6 bg-gradient-to-r from-red-900/30 to-slate-900 rounded-xl border border-red-800/50 mt-6">
              <p className="text-2xl text-white font-bold text-center">
                做新加坡最好的业余华人足球俱乐部。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Club Stories Data
const clubStories = [
  {
    id: 'lemon-homecoming',
    tag: '记忆',
    title: '欢迎回家，Lemon 哥',
    summary: '球队创始人、终身名誉队长 Lemon 哥时隔多年回到新加坡，兄弟们用一场大胜和一件签名球衣欢迎他回家。',
    image: null,
    color: 'from-amber-600/20 to-slate-900',
    link: 'https://xhslink.com/example-story-lemon'
  },
  {
    id: '2025-final',
    tag: '冠军之夜',
    title: '2025 UAFL 联赛亚军',
    summary: '经过一整个赛季的拼搏，STAR FC 在 UAFL 联赛中取得亚军——这是球队二十多年来最好的联赛成绩之一。',
    image: null,
    color: 'from-red-600/20 to-slate-900',
    link: 'https://xhslink.com/example-story-2025'
  },
  {
    id: '0-3-to-4-3',
    tag: '经典战役',
    title: '0–3 落后到 4–3 逆转',
    summary: '半场被打花，更衣室里没人说话。下半场开场 5 分钟追回一球，然后一发不可收拾——这是很多老队员心中 STAR FC 最燃的一战。',
    image: null,
    color: 'from-green-600/20 to-slate-900',
    link: 'https://xhslink.com/example-story-comeback'
  },
  {
    id: '20th-anniversary-legends-vs-now',
    tag: '20 周年',
    title: '二十周年：老炮 vs 新锐',
    summary: '2022 年，球队成立 20 周年。我们组织了一场"元老队 vs 现役队"的内部对抗赛，场边站满了曾经穿过红色球衣的人。',
    image: null,
    color: 'from-purple-600/20 to-slate-900',
    link: 'https://xhslink.com/example-story-20th'
  }
];

// History Page - 精简版（移除 Badge Story 和 Honours）
const HistoryPage = () => {
  const timeline = [
    { year: '2001', title: '球队前身诞生', desc: '浙江华人足球队在新加坡自发成立，以在坡打拼的浙江华人为主，大家通过狮城华人论坛相约踢球。' },
    { year: '2002', title: 'STAR 华人足球俱乐部成立', desc: '由 9 号前锋 Lemon 哥发起组队，在原有浙江华人足球队基础上扩展，吸引来自全国各地、不同背景的华人球员，正式使用「STAR 华人足球俱乐部」的名字。' },
    { year: '200X', title: '与狮城华人论坛队合并', desc: '球队与另一支华人球队「狮城华人论坛队」合并，阵容进一步壮大，STAR FC 逐渐成为坡岛华人圈知名的业余 11 人制球队之一。' },
    { year: '2008', title: '启用现版队徽', desc: '球队对队徽进行改动，启用现在这版带巨龙的盾牌式队徽：红色代表热血与激情，两颗星代表"STAR"的含义，居中的巨龙象征"龙的传人"。' },
    { year: '2010–2020', title: '稳定征战各类业余联赛', desc: 'STAR FC 长期征战新加坡各类周末 11 人制业余联赛，与来自不同国家、不同背景的球队对抗，在华人圈内积累了稳定口碑。' },
    { year: '2025', title: 'UAFL 联赛亚军 & 新一代崛起', desc: '球队在 UAFL 业余联赛中取得联赛第二名的佳绩。主力阵容以老带新，年轻一代多来自清华、武大、川大、重大、厦大、中财、上财等重点高校校队。' },
    { year: '现在', title: '把球队当成一个"家"继续走下去', desc: '依托 Dempsey Hill 天然草球场和 Veo3 等录像设备，STAR FC 正在更系统地记录比赛与训练，对很多队员来说，这里早已不只是球队，而是一个"家"。' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">History</span>
          <h1 className="text-5xl font-bold text-white mt-4">STAR FC 大事记</h1>
          <p className="text-gray-400 mt-4">从 2001 到今天，我们走过了这些年份</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
            {/* Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500 via-red-600 to-slate-700" />

            {/* Items */}
            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative pl-20">
                  <div className="absolute left-0 w-16 h-16 bg-slate-800 border-2 border-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-amber-400 font-bold text-xs text-center leading-tight">{item.year}</span>
                  </div>
                  <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Club Stories Section - 文章/公告栏 */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Stories</span>
            <h2 className="text-4xl font-bold text-white mt-2">最新故事与动态</h2>
            <p className="text-gray-400 mt-4">二十多年，我们积累了太多值得记住的瞬间</p>
          </div>

          {/* Horizontal Scrollable Stories */}
          <div className="relative">
            <div
              className="overflow-x-auto flex gap-6 pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#475569 #1e293b' }}
            >
              {clubStories.map((story) => (
                <a
                  key={story.id}
                  href={story.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-[280px] md:w-[320px] flex-shrink-0 snap-start p-6 bg-gradient-to-br ${story.color} rounded-2xl border border-slate-700/50 hover:border-amber-500/30 transition-all cursor-pointer group block`}
                >
                  {/* Tag - 文章类型 */}
                  <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-semibold rounded-full mb-4">
                    {story.tag}
                  </span>
                  {/* Title - 文章标题 */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {story.title}
                  </h3>
                  {/* Summary - 文章摘要 */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {story.summary}
                  </p>
                  {/* Read More Link */}
                  <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <span className="text-amber-400 text-sm font-medium group-hover:text-amber-300 transition-colors">
                      查看完整版 →
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Scroll Hint */}
            <div className="flex justify-center mt-6 gap-2">
              <span className="text-gray-500 text-sm">← 左右滑动查看更多 →</span>
            </div>
          </div>

          {/* Future Updates Note */}
          <p className="text-center text-gray-600 text-sm mt-8">
            未来会在这里持续更新比赛战报、活动与球队故事。
          </p>
        </div>
      </section>

      {/* Full Story: Lemon Homecoming */}
      <section id="story-lemon-full" className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4">
          <a href="#" className="text-amber-400 text-sm hover:text-amber-300 mb-6 inline-block">← 返回故事列表</a>
          <span className="block text-amber-400 text-sm font-semibold tracking-widest uppercase mt-4">记忆</span>
          <h2 className="text-4xl font-bold text-white mt-2 mb-8">欢迎回家，Lemon 哥</h2>

          <div className="prose prose-lg prose-invert max-w-none space-y-6">
            <p className="text-gray-300 leading-relaxed text-lg">
              2024 年的一个周末，球队微信群突然炸了——Lemon 哥要回来了。
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              对很多新队员来说，Lemon 哥只是一个名字：球队创始人，终身名誉队长，9 号球衣永久封存。但对老队员来说，他是 STAR FC 的起点，是二十多年前在新加坡把大家召集到一起踢球的那个人。
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              那天的比赛，队员们踢出了赛季最好的状态。最后时刻，一记漂亮的配合，球进了。所有人冲向边线——不是为了庆祝进球，而是为了让站在场边的 Lemon 哥看到：二十多年过去了，这支球队还在，还在赢球。
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              赛后，队长拿出一件印满签名的球衣："Lemon 哥，欢迎回家。"
            </p>
            <blockquote className="border-l-4 border-amber-500 pl-6 my-8 italic text-xl text-white font-medium">
              "这里永远是你的主场。"
            </blockquote>
            <p className="text-gray-300 leading-relaxed text-lg">
              Lemon 哥说不出话，只是拍了拍队长的肩膀。那一刻，没有人说话，但所有人都知道——STAR FC 的意义，从来不只是赢球。
            </p>
          </div>
        </div>
      </section>

      {/* Full Story: 2025 UAFL 亚军之夜 */}
      <section id="story-2025-final-full" className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4">
          <a href="#" className="text-amber-400 text-sm hover:text-amber-300 mb-6 inline-block">← 返回故事列表</a>
          <span className="block text-amber-400 text-sm font-semibold tracking-widest uppercase mt-4">亚军之夜</span>
          <h2 className="text-4xl font-bold text-white mt-2 mb-8">2025 UAFL 联赛亚军之夜</h2>

          <div className="prose prose-lg prose-invert max-w-none space-y-6">
            <p className="text-gray-300 leading-relaxed text-lg">
              2025 年 5 月 3 日，UAFL 联赛决赛。这是 STAR FC 成立二十多年来，第一次站在业余联赛的决赛赛场上。
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              整个赛季，球队打了 14 场比赛，9 胜 2 平 3 负，一路从小组赛杀进决赛。对手是联赛最强的 Clementi Tigers，一支技术流打法的老牌劲旅。
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              上半场，对方先进两球。中场休息时，更衣室里没人说话。队长站起来："我们等了二十多年才到这里，还有 45 分钟，拼到底。"
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              下半场第 58 分钟，刘子昂接到角球头球破门，1-2。全场沸腾。
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              接下来的 30 分钟，STAR FC 全力进攻，制造了三次绝佳机会，但都被对方门将神勇扑出。终场哨响，1-2，亚军。
            </p>
            <blockquote className="border-l-4 border-red-600 pl-6 my-8 italic text-xl text-white font-medium">
              "我们输了比赛，但没有输掉尊严。"
            </blockquote>
            <p className="text-gray-300 leading-relaxed text-lg">
              颁奖仪式上，当队长举起亚军奖杯时，场边爆发出比冠军还响的欢呼声——那是几十个队员、家属、朋友，在为这支球队二十多年的坚持喝彩。
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              这一夜，STAR FC 没有拿到冠军，但每个人都知道：这只是开始。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

// Team Page
const TeamPage = () => {
  // 球员数据 - 每个位置 10 人
  const players = [
    // 前锋 FWD (10人)
    { number: 10, name: '刘子昂', position: '前锋', joined: 2017, positionGroup: 'FWD', captain: false },
    { number: 7, name: '张一鸣', position: '右边锋', joined: 2022, positionGroup: 'FWD' },
    { number: 9, name: '周逸凡', position: '中锋', joined: 2023, positionGroup: 'FWD' },
    { number: 11, name: '林致远', position: '左边锋', joined: 2024, positionGroup: 'FWD' },
    { number: 19, name: '陆嘉豪', position: '影锋', joined: 2023, positionGroup: 'FWD' },
    { number: 20, name: '冯子铭', position: '前锋', joined: 2024, positionGroup: 'FWD' },
    { number: 21, name: '韩志远', position: '右边锋', joined: 2024, positionGroup: 'FWD' },
    { number: 27, name: '曾嘉伟', position: '中锋', joined: 2025, positionGroup: 'FWD' },
    { number: 29, name: '罗天成', position: '左边锋', joined: 2025, positionGroup: 'FWD' },
    { number: 30, name: '方俊杰', position: '前锋', joined: 2025, positionGroup: 'FWD' },

    // 中场 MID (10人)
    { number: 6, name: '陈伟强', position: '后腰/队长', joined: 2015, positionGroup: 'MID', captain: true },
    { number: 8, name: '江子瑜', position: '中前卫', joined: 2019, positionGroup: 'MID' },
    { number: 14, name: '孙志豪', position: '后腰', joined: 2023, positionGroup: 'MID' },
    { number: 16, name: '马思聪', position: '前腰', joined: 2022, positionGroup: 'MID' },
    { number: 17, name: '杨子轩', position: '中前卫', joined: 2021, positionGroup: 'MID' },
    { number: 18, name: '谢晓东', position: '边前卫', joined: 2024, positionGroup: 'MID' },
    { number: 24, name: '吕文博', position: '后腰', joined: 2024, positionGroup: 'MID' },
    { number: 25, name: '沈浩宇', position: '前腰', joined: 2025, positionGroup: 'MID' },
    { number: 26, name: '高志鹏', position: '边前卫', joined: 2025, positionGroup: 'MID' },
    { number: 28, name: '梁俊豪', position: '中前卫', joined: 2025, positionGroup: 'MID' },

    // 后卫 DEF (10人)
    { number: 3, name: '严博文', position: '中后卫', joined: 2009, positionGroup: 'DEF' },
    { number: 4, name: '赵明远', position: '中后卫', joined: 2020, positionGroup: 'DEF' },
    { number: 2, name: '李浩然', position: '右后卫', joined: 2021, positionGroup: 'DEF' },
    { number: 5, name: '吴天宇', position: '左后卫', joined: 2022, positionGroup: 'DEF' },
    { number: 15, name: '钱宏达', position: '中后卫', joined: 2018, positionGroup: 'DEF' },
    { number: 23, name: '郑凯文', position: '右后卫', joined: 2024, positionGroup: 'DEF' },
    { number: 31, name: '许明辉', position: '左后卫', joined: 2024, positionGroup: 'DEF' },
    { number: 32, name: '范志强', position: '中后卫', joined: 2025, positionGroup: 'DEF' },
    { number: 33, name: '田宇航', position: '右后卫', joined: 2025, positionGroup: 'DEF' },
    { number: 34, name: '贺子豪', position: '中后卫', joined: 2025, positionGroup: 'DEF' },

    // 门将 GK (10人)
    { number: 1, name: '王立国', position: '守门员', joined: 2010, positionGroup: 'GK' },
    { number: 22, name: '黄俊杰', position: '守门员', joined: 2023, positionGroup: 'GK' },
    { number: 35, name: '朱伟明', position: '守门员', joined: 2024, positionGroup: 'GK' },
    { number: 36, name: '董志文', position: '守门员', joined: 2024, positionGroup: 'GK' },
    { number: 37, name: '蒋子龙', position: '守门员', joined: 2025, positionGroup: 'GK' },
    { number: 38, name: '邓海洋', position: '守门员', joined: 2025, positionGroup: 'GK' },
    { number: 39, name: '唐嘉铭', position: '守门员', joined: 2025, positionGroup: 'GK' },
    { number: 40, name: '傅俊达', position: '守门员', joined: 2025, positionGroup: 'GK' },
    { number: 41, name: '雷志伟', position: '守门员', joined: 2025, positionGroup: 'GK' },
    { number: 42, name: '龚明轩', position: '守门员', joined: 2025, positionGroup: 'GK' },
  ];

  const positionGroups = [
    { key: 'FWD', label: '前锋', labelEn: 'Forwards' },
    { key: 'MID', label: '中场', labelEn: 'Midfielders' },
    { key: 'DEF', label: '后卫', labelEn: 'Defenders' },
    { key: 'GK', label: '门将', labelEn: 'Goalkeepers' },
  ];

  const getPlayersByPosition = (positionKey) => players.filter(p => p.positionGroup === positionKey);

  return (
    <div className="min-h-screen bg-slate-900 pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Current Squad</span>
          <h1 className="text-5xl font-bold text-white mt-4">当前阵容</h1>
          <p className="text-gray-400 mt-4">2025-2026 赛季注册球员</p>
        </div>
      </section>

      {/* Players by Position Groups */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          {positionGroups.map((group) => {
            const groupPlayers = getPlayersByPosition(group.key);
            if (groupPlayers.length === 0) return null;

            return (
              <div key={group.key}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-white">{group.label}</h3>
                    <span className="text-gray-500 text-sm">{group.labelEn}</span>
                  </div>
                  <span className="text-gray-500 text-sm">共 {groupPlayers.length} 人</span>
                </div>

                {/* Horizontal Scrollable Vertical Player Cards */}
                <div
                  className="overflow-x-auto flex gap-4 pb-4 snap-x snap-mandatory"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: '#475569 #1e293b' }}
                >
                  {groupPlayers.map((player) => (
                    <div
                      key={player.number}
                      className="min-w-[180px] md:min-w-[200px] lg:min-w-[220px] flex-shrink-0 snap-start bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-700/60 hover:border-amber-500/50 transition-all duration-300 flex flex-col"
                    >
                      {/* Vertical Photo Placeholder (3:4 ratio) */}
                      <div className="w-full aspect-[3/4] bg-slate-700/60 flex items-center justify-center relative">
                        <span className="text-slate-500 text-xs">球员照片</span>
                        <span className="absolute bottom-2 right-2 text-4xl font-black text-white/10">#{player.number}</span>
                        {player.captain && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 bg-amber-500 text-slate-900 text-xs font-bold rounded">C</span>
                        )}
                      </div>
                      {/* Player Info */}
                      <div className="p-4 space-y-1">
                        <div className="font-semibold text-lg text-white">#{player.number} {player.name}</div>
                        <div className="text-sm text-slate-400">{player.position} · {player.joined} 加入</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

// Fixtures Page
const FixturesPage = () => {
  const [activeYear, setActiveYear] = useState(2026);

  // 全部比赛数据（带年份字段）
  const matches = [
    // ===== 2025 年比赛 =====
    // UAFL 联赛（2025 赛季 - 亚军赛季）
    { id: '2025-02-15-uafl-r1', year: 2025, date: '2025-02-15', competition: 'UAFL 联赛 第1轮', home: 'STAR FC', away: 'Clementi Tigers', venue: 'Dempsey Hill', status: 'finished', score: '3-1', scorers: ['刘子昂 x2', '张一鸣'], highlightUrl: 'https://www.youtube.com/watch?v=AAAAAAAA' },
    { id: '2025-02-22-uafl-r2', year: 2025, date: '2025-02-22', competition: 'UAFL 联赛 第2轮', home: 'East Coast Warriors', away: 'STAR FC', venue: 'East Coast Park', status: 'finished', score: '2-4', scorers: ['周逸凡 x2', '刘子昂', '江子瑜'], highlightUrl: 'https://www.youtube.com/watch?v=BBBBBBBB' },
    { id: '2025-03-01-uafl-r3', year: 2025, date: '2025-03-01', competition: 'UAFL 联赛 第3轮', home: 'STAR FC', away: 'Harbour United', venue: 'Dempsey Hill', status: 'finished', score: '3-1', scorers: ['刘子昂', '张一鸣', '马思聪'], highlightUrl: 'https://www.youtube.com/watch?v=CCCCCCCC' },
    { id: '2025-03-08-uafl-r4', year: 2025, date: '2025-03-08', competition: 'UAFL 联赛 第4轮', home: 'Lion City Rangers', away: 'STAR FC', venue: 'Queenstown Stadium', status: 'finished', score: '1-2', scorers: ['刘子昂', '林致远'], highlightUrl: null },
    { id: '2025-03-15-uafl-r5', year: 2025, date: '2025-03-15', competition: 'UAFL 联赛 第5轮', home: 'STAR FC', away: 'Bukit Timah FC', venue: 'Dempsey Hill', status: 'finished', score: '2-0', scorers: ['周逸凡', '张一鸣'], highlightUrl: 'https://www.youtube.com/watch?v=DDDDDDDD' },
    { id: '2025-03-22-uafl-r6', year: 2025, date: '2025-03-22', competition: 'UAFL 联赛 第6轮', home: 'Jurong United', away: 'STAR FC', venue: 'Jurong West Stadium', status: 'finished', score: '2-2', scorers: ['刘子昂', '江子瑜'], highlightUrl: null },
    { id: '2025-03-29-uafl-r7', year: 2025, date: '2025-03-29', competition: 'UAFL 联赛 第7轮', home: 'STAR FC', away: 'Pasir Ris FC', venue: 'Dempsey Hill', status: 'finished', score: '4-1', scorers: ['刘子昂 x2', '林致远', '陆嘉豪'], highlightUrl: 'https://www.youtube.com/watch?v=EEEEEEEE' },
    { id: '2025-04-05-uafl-r8', year: 2025, date: '2025-04-05', competition: 'UAFL 联赛 第8轮', home: 'Woodlands FC', away: 'STAR FC', venue: 'Woodlands Stadium', status: 'finished', score: '0-2', scorers: ['周逸凡', '刘子昂'], highlightUrl: null },
    { id: '2025-04-12-uafl-r9', year: 2025, date: '2025-04-12', competition: 'UAFL 联赛 第9轮', home: 'STAR FC', away: 'Tampines Rovers Res', venue: 'Dempsey Hill', status: 'finished', score: '3-0', scorers: ['刘子昂', '张一鸣', '马思聪'], highlightUrl: 'https://www.youtube.com/watch?v=FFFFFFFF' },
    { id: '2025-04-19-uafl-r10', year: 2025, date: '2025-04-19', competition: 'UAFL 联赛 第10轮', home: 'Sengkang FC', away: 'STAR FC', venue: 'Sengkang Stadium', status: 'finished', score: '1-1', scorers: ['刘子昂'], highlightUrl: null },
    { id: '2025-05-03-uafl-final', year: 2025, date: '2025-05-03', competition: 'UAFL 联赛 决赛', home: 'STAR FC', away: 'Harbour United', venue: 'Jalan Besar Stadium', status: 'finished', score: '1-2', scorers: ['刘子昂'], highlightUrl: 'https://www.youtube.com/watch?v=GGGGGGGG' },
    // 友谊赛
    { id: '2025-01-15-lemon-return', year: 2025, date: '2025-01-15', competition: '纪念赛', home: 'STAR FC 现役', away: 'STAR FC 元老', venue: 'Dempsey Hill', status: 'finished', score: '5-4', scorers: ['刘子昂 x2', '张一鸣', '周逸凡', '林致远'], highlightUrl: 'https://www.youtube.com/watch?v=LLLLLLLL' },
    { id: '2025-12-15-friendly', year: 2025, date: '2025-12-15', competition: '友谊赛', home: 'STAR FC', away: 'Tampines Rovers Res', venue: 'Dempsey Hill', status: 'finished', score: '4-2', scorers: ['刘子昂 x2', '周逸凡', '林致远'], highlightUrl: 'https://www.youtube.com/watch?v=XXXXXXXX' },
    { id: '2025-12-22-xmas', year: 2025, date: '2025-12-22', competition: '圣诞友谊赛', home: 'Singapore Legends', away: 'STAR FC', venue: 'Queenstown Stadium', status: 'finished', score: '1-3', scorers: ['刘子昂', '江子瑜', '张一鸣'], highlightUrl: 'https://www.youtube.com/watch?v=ZZZZZZZZ' },

    // ===== 2026 年比赛 =====
    { id: '2026-01-12-friendly', year: 2026, date: '2026-01-12', competition: '友谊赛', home: 'STAR FC', away: 'Singapore Legends', venue: 'Dempsey Hill', status: 'upcoming', time: '15:00' },
    { id: '2026-02-08-uafl-r1', year: 2026, date: '2026-02-08', competition: 'UAFL 联赛 第1轮', home: 'STAR FC', away: 'Harbour United', venue: 'Dempsey Hill', status: 'upcoming', time: '15:00' },
    { id: '2026-02-15-uafl-r2', year: 2026, date: '2026-02-15', competition: 'UAFL 联赛 第2轮', home: 'East Coast Warriors', away: 'STAR FC', venue: 'East Coast Park', status: 'upcoming', time: '16:00' },
    { id: '2026-02-22-uafl-r3', year: 2026, date: '2026-02-22', competition: 'UAFL 联赛 第3轮', home: 'STAR FC', away: 'Clementi Tigers', venue: 'Dempsey Hill', status: 'upcoming', time: '15:00' },
    { id: '2026-03-01-uafl-r4', year: 2026, date: '2026-03-01', competition: 'UAFL 联赛 第4轮', home: 'Lion City Rangers', away: 'STAR FC', venue: 'Queenstown Stadium', status: 'upcoming', time: '15:30' },
    { id: '2026-03-08-uafl-r5', year: 2026, date: '2026-03-08', competition: 'UAFL 联赛 第5轮', home: 'STAR FC', away: 'Bukit Timah FC', venue: 'Dempsey Hill', status: 'upcoming', time: '15:00' },
    { id: '2026-03-15-cup-qf', year: 2026, date: '2026-03-15', competition: 'UAFL 杯赛 1/4决赛', home: 'STAR FC', away: '待定', venue: 'Dempsey Hill', status: 'upcoming', time: '15:00' },
    { id: '2026-03-22-uafl-r6', year: 2026, date: '2026-03-22', competition: 'UAFL 联赛 第6轮', home: 'Jurong United', away: 'STAR FC', venue: 'Jurong West Stadium', status: 'upcoming', time: '16:00' },
  ];

  // 按年份的统计数据
  const seasonStats = {
    2025: { played: 14, won: 9, drawn: 2, lost: 3, goalsFor: 35, goalsAgainst: 17 },
    2026: { played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0 }
  };

  // 筛选当前年份比赛并排序（降序：最新在左）
  const matchesForYear = matches
    .filter(m => m.year === activeYear)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const stats = seasonStats[activeYear];

  return (
    <div className="min-h-screen bg-slate-900 pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Fixtures & Results</span>
          <h1 className="text-5xl font-bold text-white mt-4">赛程与战绩</h1>
          <p className="text-gray-400 mt-4">{activeYear} 年 · STAR FC 全年赛程与战绩</p>
        </div>
      </section>

      {/* Year Toggle + Matches + Stats */}
      <section className="py-12 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4">
          {/* Year Toggle Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            {[2025, 2026].map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-6 py-2 font-semibold rounded-lg transition-all ${
                  activeYear === year
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-800 text-gray-400 border border-slate-600 hover:border-slate-500'
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Horizontal Scrollable Match Cards */}
          <div className="relative mb-12">
            <div
              className="overflow-x-auto flex gap-4 pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#475569 #1e293b' }}
            >
              {matchesForYear.map((match) => (
                <div
                  key={match.id}
                  className={`min-w-[320px] md:min-w-[360px] lg:min-w-[380px] flex-shrink-0 snap-start rounded-2xl bg-slate-800/70 p-5 shadow-lg ${
                    match.status === 'finished' ? 'border border-green-600/30' : 'border border-slate-700/70'
                  }`}
                >
                  {/* Top Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">📅 {match.date}</span>
                      <span className="px-2 py-0.5 bg-slate-700/80 text-amber-400 text-xs font-medium rounded">
                        {match.competition}
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      match.status === 'upcoming' ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {match.status === 'upcoming' ? '即将开球' : '完场'}
                    </span>
                  </div>

                  {/* Teams and Score */}
                  <div className="mb-4">
                    <p className="text-white font-semibold text-lg">
                      <span className={match.home === 'STAR FC' || match.home === 'STAR FC 现役' ? 'text-amber-400' : ''}>{match.home}</span>
                      <span className="text-gray-500 mx-2">vs</span>
                      <span className={match.away === 'STAR FC' || match.away === 'STAR FC 元老' ? 'text-amber-400' : ''}>{match.away}</span>
                    </p>
                    <div className="mt-2">
                      {match.status === 'finished' && match.score ? (
                        <span className="text-3xl font-black text-green-400">{match.score}</span>
                      ) : (
                        <span className="text-xl text-gray-400">{match.time} 开球</span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm mb-3">📍 {match.venue}</p>

                  {match.status === 'finished' && match.scorers && match.scorers.length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {match.scorers.map((scorer, i) => (
                          <span key={i} className="px-2 py-0.5 bg-green-900/30 text-green-400 text-xs rounded">⚽ {scorer}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {match.highlightUrl && (
                    <div className="pt-3 border-t border-slate-700/50">
                      <a href={match.highlightUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-sm font-medium rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        集锦
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <span className="text-gray-500 text-sm">← 左右滑动查看 {activeYear} 年全部比赛 →</span>
            </div>
          </div>

          {/* Season Stats Summary */}
          <div className="pt-8 border-t border-slate-700/50">
            <h3 className="text-xl font-bold text-white text-center mb-6">{activeYear} 年度总结</h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[
                { label: '比赛', value: stats.played },
                { label: '胜', value: stats.won },
                { label: '平', value: stats.drawn },
                { label: '负', value: stats.lost },
                { label: '进球', value: stats.goalsFor },
                { label: '失球', value: stats.goalsAgainst },
              ].map((stat, idx) => (
                <div key={idx} className="text-center p-4 bg-slate-800/50 rounded-xl">
                  <p className="text-3xl font-bold text-amber-400">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Media Page
const MediaPage = () => {
  // 视频集锦数据
  const highlightVideos = [
    { id: 'harbour-3-1', title: '3–1 完胜 Harbour United：雨战中的控场', description: '在细雨中的 Dempsey Hill，STAR FC 以 3–1 击败 Harbour United。', date: '2025-03-02', competition: 'UAFL 第6轮', youtubeId: 'XXXXXXXX' },
    { id: 'eastcoast-4-2', title: '4–2 逆转 East Coast Warriors', description: '半场 0–2 落后，下半场连入四球完成逆转。', date: '2025-02-23', competition: 'UAFL 第5轮', youtubeId: 'YYYYYYYY' },
    { id: '2025-final', title: '2025 UAFL 决赛：遗憾的亚军之夜', description: '虽然 1-2 惜败，但这是球队历史上最接近冠军的一次。', date: '2025-05-03', competition: 'UAFL 决赛', youtubeId: 'GGGGGGGG' },
    { id: 'lemon-return', title: 'Lemon 哥回归纪念赛集锦', description: '球队创始人 Lemon 哥回到新加坡的纪念赛。', date: '2025-01-15', competition: '纪念赛', youtubeId: 'LLLLLLLL' },
  ];

  // 照片图集数据
  const photos = [
    { id: 'photo-1', title: '2025 UAFL 决赛 · 比赛照片', subtitle: '18 张照片 · Queenstown Stadium', date: '2025-05-03', link: 'https://xhslink.com/example-photo-album-1' },
    { id: 'photo-2', title: '2025 赛季全家福', subtitle: '12 张照片 · Dempsey Hill', date: '2025-02-01', link: 'https://xhslink.com/example-photo-album-2' },
    { id: 'photo-3', title: 'Lemon 哥回归 · 合影集', subtitle: '15 张照片 · 创始人与新老队员', date: '2024-12-15', link: 'https://xhslink.com/example-photo-album-3' },
    { id: 'photo-4', title: '2025-03-02 vs Harbour United', subtitle: '20 张照片 · 3-1 大胜', date: '2025-03-02', link: 'https://xhslink.com/example-photo-album-4' },
  ];

  // 表情包合集数据
  const memes = [
    { id: 'meme-1', title: '训练场表情包 vol.1', subtitle: '10 张 · 队友不要打我', link: 'https://xhslink.com/example-meme-pack-1' },
    { id: 'meme-2', title: '比赛名场面 vol.1', subtitle: '8 张 · 经典时刻', link: 'https://xhslink.com/example-meme-pack-2' },
    { id: 'meme-3', title: '门将专属表情包', subtitle: '6 张 · 稳如老狗', link: 'https://xhslink.com/example-meme-pack-3' },
    { id: 'meme-4', title: '庆祝动作合集', subtitle: '12 张 · 进球就是要浪', link: 'https://xhslink.com/example-meme-pack-4' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Media Center</span>
          <h1 className="text-5xl font-bold text-white mt-4">媒体中心</h1>
          <p className="text-gray-400 mt-4">每一场比赛后的高光时刻、赛场内外的照片，以及 STAR FC 的趣味表情包，都会陆续收录在这里。</p>
        </div>
      </section>

      {/* 视频集锦区 */}
      <section className="py-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6">🎬 视频集锦</h2>
          <div className="overflow-x-auto flex gap-4 pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'thin', scrollbarColor: '#475569 #1e293b' }}>
            {highlightVideos.map((video) => (
              <div key={video.id} className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-amber-500/50 transition-all flex-shrink-0 w-[300px] md:w-[340px] snap-start">
                <a href={`https://www.youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noopener noreferrer" className="block aspect-video bg-gradient-to-br from-red-900/30 to-slate-900 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-all">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-red-600/80 text-white text-xs font-medium rounded">视频</span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-slate-900/80 text-amber-400 text-xs rounded">{video.competition}</span>
                  </div>
                </a>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm group-hover:text-amber-400 transition-colors mb-1">{video.title}</h3>
                  <p className="text-gray-400 text-xs line-clamp-2">{video.description}</p>
                  <p className="text-gray-500 text-xs mt-2">📅 {video.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 照片区 */}
      <section className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6">📷 比赛照片</h2>
          <div className="overflow-x-auto flex gap-4 pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'thin', scrollbarColor: '#475569 #1e293b' }}>
            {photos.map((photo) => (
              <a key={photo.id} href={photo.link} target="_blank" rel="noopener noreferrer" className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-amber-500/50 transition-all flex-shrink-0 w-[280px] md:w-[320px] snap-start block">
                <div className="aspect-[4/3] bg-gradient-to-br from-amber-900/30 to-slate-900 flex items-center justify-center relative">
                  <span className="text-4xl">📸</span>
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-blue-600/80 text-white text-xs font-medium rounded">照片</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm group-hover:text-amber-400 transition-colors mb-1">{photo.title}</h3>
                  <p className="text-gray-400 text-xs">{photo.subtitle}</p>
                  <p className="text-gray-500 text-xs mt-2">📅 {photo.date}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 表情包区 */}
      <section className="py-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6">😂 表情包</h2>
          <div className="overflow-x-auto flex gap-4 pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'thin', scrollbarColor: '#475569 #1e293b' }}>
            {memes.map((meme) => (
              <a key={meme.id} href={meme.link} target="_blank" rel="noopener noreferrer" className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-amber-500/50 transition-all flex-shrink-0 w-[200px] md:w-[240px] snap-start block">
                <div className="aspect-square bg-gradient-to-br from-green-900/30 to-slate-900 flex items-center justify-center relative">
                  <span className="text-4xl">😂</span>
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-green-600/80 text-white text-xs font-medium rounded">表情包</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm group-hover:text-amber-400 transition-colors mb-1">{meme.title}</h3>
                  <p className="text-gray-400 text-xs">{meme.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Join Page
const JoinPage = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', position: '', experience: '' });

  return (
    <div className="min-h-screen bg-slate-900 pt-24">
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Join Us</span>
          <h1 className="text-5xl font-bold text-white mt-4">我们一直在等</h1>
          <p className="text-2xl text-gray-300 mt-4">那个会准时来训练的你</p>
        </div>
      </section>

      <section className="py-16 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4">
          {/* Form */}
          <div className="p-8 bg-slate-800/30 rounded-2xl border border-slate-700/50">
            <h2 className="text-2xl font-bold text-white mb-6">试训报名表</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">姓名</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="你的姓名"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">联系方式</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="手机号 / 邮箱"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">擅长位置</label>
                <select className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-500 focus:outline-none transition-colors">
                  <option>请选择</option>
                  <option>门将</option>
                  <option>后卫</option>
                  <option>中场</option>
                  <option>前锋</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">踢球经验</label>
                <select className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-500 focus:outline-none transition-colors">
                  <option>请选择</option>
                  <option>业余爱好</option>
                  <option>校队/公司队</option>
                  <option>正式联赛经验</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-2">自我介绍（可选）</label>
                <textarea 
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-500 focus:outline-none transition-colors h-32 resize-none"
                  placeholder="简单介绍一下自己..."
                />
              </div>
            </div>
            <button className="mt-6 w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-500 hover:to-red-600 transition-all">
              提交报名
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Contact Page
const ContactPage = () => (
  <div className="min-h-screen bg-slate-900 pt-24">
    <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Contact</span>
        <h1 className="text-2xl md:text-5xl font-bold text-white mt-4">联系我们</h1>
        <p className="text-gray-400 text-sm md:text-base mt-4">无论你是想加入球队、安排友谊赛，还是希望进行品牌合作</p>
      </div>
    </section>

    <section className="py-12 md:py-16 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <a href="mailto:account@starfc.sg" className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-amber-500/50 hover:bg-slate-800/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">邮箱</p>
                <p className="text-white font-medium">account@starfc.sg</p>
              </div>
            </a>
            <a href="https://xhslink.com/m/8BgWbanhmVq" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-amber-500/50 hover:bg-slate-800/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2zm4 8h-2v-4h2v4zm0-6h-2V9h2v2z"/></svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">小红书</p>
                <p className="text-white font-medium">新加坡STAR足球俱乐部</p>
              </div>
            </a>
            <div className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 via-red-500 to-yellow-400 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Instagram</p>
                <p className="text-white font-medium">正在搭建中，敬请期待</p>
              </div>
            </div>
            <a href="https://www.youtube.com/@SingaporeStarFC" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-amber-500/50 hover:bg-slate-800/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">YouTube</p>
                <p className="text-white font-medium">Singapore Star FC</p>
              </div>
            </a>
          </div>

          <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
            <h3 className="text-lg font-bold text-white mb-4">常用球场</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                Dempsey Hill 天然草球场（主场）
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                Queenstown Stadium
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                Clementi / West Coast 社区球场
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// Footer Component
const Footer = () => (
  <footer className="bg-slate-950 border-t border-slate-800">
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="./starfclogo2.png"
              alt="STAR FC 官方队徽"
              className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-md"
            />
            <div>
              <span className="text-white font-bold text-lg md:text-xl">STAR FC</span>
              <span className="block text-amber-400 text-xs tracking-widest">SINCE 2002</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-md">
            新加坡华人足球俱乐部。在异乡，也要踢出我们的主场。
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">快速链接</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-amber-400 cursor-pointer transition-colors">关于我们</li>
            <li className="hover:text-amber-400 cursor-pointer transition-colors">赛程战绩</li>
            <li className="hover:text-amber-400 cursor-pointer transition-colors">媒体中心</li>
            <li className="hover:text-amber-400 cursor-pointer transition-colors">加入球队</li>
            <li className="hover:text-amber-400 cursor-pointer transition-colors">联系我们</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">关注我们</h4>
          <div className="flex gap-3">
            <a href="https://xhslink.com/m/8BgWbanhmVq" target="_blank" rel="noopener noreferrer" title="小红书" className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-500 hover:scale-110 transition-all">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2zm4 8h-2v-4h2v4zm0-6h-2V9h2v2z"/></svg>
            </a>
            <a href="https://instagram.com/starfc.sg" target="_blank" rel="noopener noreferrer" title="Instagram" className="w-10 h-10 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-400 rounded-lg flex items-center justify-center hover:scale-110 transition-all">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://www.youtube.com/@SingaporeStarFC" target="_blank" rel="noopener noreferrer" title="YouTube" className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-500 hover:scale-110 transition-all">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-800 text-center text-gray-500 text-sm">
        © 2025 STAR FC. All rights reserved. | 新加坡华人足球俱乐部
      </div>
    </div>
  </footer>
);

// ============ MAIN APP ============

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} />;
      case 'about': return <AboutPage />;
      case 'history': return <HistoryPage />;
      case 'team': return <TeamPage />;
      case 'fixtures': return <FixturesPage />;
      case 'media': return <MediaPage />;
      case 'join': return <JoinPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} isScrolled={isScrolled} />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}
