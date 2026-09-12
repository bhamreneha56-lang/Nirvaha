import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export default function SidebarLayout({ children, activeTab, setActiveTab, roleTitle, userName, tabs: customTabs }) {
  const { dispatch } = useContext(AppContext);
  const tabs = customTabs || [
    { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
    { id: 'vote', label: 'Vote', icon: '👍' },
    { id: 'challenges', label: 'Challenges', icon: '📄' },
    { id: 'proposals', label: 'Proposals', icon: '📋' },
    { id: 'volunteer', label: 'Volunteer', icon: '🤝' },
    { id: 'community', label: 'Community', icon: '🗣️' },
    { id: 'alerts', label: 'Local Alerts', icon: '📣' },
    { id: 'analytics', label: 'Impact & Karma', icon: '🏆' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans selection:bg-orange-200 relative overflow-hidden">
      
      {/* 3D Faint Tiranga Mesh Background behind everything */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-300/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[50%] bg-green-400/15 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-blue-300/10 rounded-full blur-[80px] pointer-events-none z-0"></div>

      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-200 flex flex-col justify-between shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20 relative">
        <div>
          <div className="p-6 flex items-center gap-4">
            {/* Tiranga Logo */}
            <div className="w-10 h-10 rounded-xl shadow-md grid place-items-center font-extrabold text-xl relative overflow-hidden border border-slate-200">
               <div className="absolute top-0 w-full h-1/3 bg-[#E37000]"></div>
               <div className="absolute top-1/3 w-full h-1/3 bg-white flex items-center justify-center">
                 <div className="w-3 h-3 rounded-full border border-[#000080]"></div>
               </div>
               <div className="absolute bottom-0 w-full h-1/3 bg-[#0E6B06]"></div>
               <span className="relative z-10 text-slate-900 drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">N</span>
            </div>
            <div className="leading-tight">
              <div className="font-extrabold text-slate-900 text-lg tracking-tight">NIRVAHA</div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Govt. of Jharkhand</div>
            </div>
          </div>
          
          <nav className="px-4 space-y-1 mt-6">
            <div className="px-4 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Main Menu</div>
            {tabs.map(t => (
              <button 
                key={t.id} 
                onClick={() => setActiveTab && setActiveTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${activeTab === t.id ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 translate-x-1' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <span className={`text-lg ${activeTab === t.id ? 'text-white' : 'text-slate-400'}`}>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <button 
            onClick={() => setActiveTab && setActiveTab('report')}
            className="w-full bg-slate-900 hover:bg-black text-white py-3.5 rounded-xl font-bold shadow-lg shadow-slate-900/20 mb-6 transition-all hover:-translate-y-0.5"
          >
            + Report Issue
          </button>
          
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 font-bold grid place-items-center shrink-0">
              {userName.charAt(0)}
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="text-sm font-bold text-slate-900 truncate">{userName}</div>
              <div className="flex gap-2">
                <button onClick={() => window.localStorage.removeItem('nirvaha_token') || window.location.reload()} className="text-[11px] text-slate-500 hover:text-slate-900 font-bold hover:underline">
                  Logout
                </button>
                <span className="text-slate-300 text-[10px]">|</span>
                <button onClick={() => dispatch({ type: 'SET_ROLE', role: null })} className="text-[11px] text-orange-600 font-bold hover:underline">
                  Exit Role
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Subtle Tiranga Top Border */}
        <div className="h-1 w-full flex">
          <div className="h-full flex-1 bg-[#E37000]"></div>
          <div className="h-full flex-1 bg-white"></div>
          <div className="h-full flex-1 bg-[#0E6B06]"></div>
        </div>
        
        <header className="h-20 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 shrink-0 z-10 sticky top-0">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{roleTitle}</h1>
            <p className="text-sm text-slate-500 font-medium">Real-time overview and platform metrics</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex bg-slate-100 rounded-lg p-1 border border-slate-200">
              <button className="px-4 py-1.5 bg-white shadow-sm rounded-md text-sm font-bold text-slate-800">Official</button>
              <button className="px-4 py-1.5 rounded-md text-sm font-semibold text-slate-500 hover:text-slate-700">Admin</button>
            </div>
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 bg-white shadow-sm hover:bg-slate-50 transition">
              EN / HI
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-10 relative z-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
      
      {/* Global Chatbot Widget */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-16 h-16 bg-orange-500 rounded-full shadow-[0_8px_30px_rgba(245,158,11,0.4)] grid place-items-center text-white text-3xl hover:scale-110 hover:-translate-y-2 transition-all duration-300">
          💬
        </button>
      </div>
    </div>
  );
}
