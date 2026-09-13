import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import {
  LayoutDashboard,
  ThumbsUp,
  FileText,
  ClipboardList,
  HeartHandshake,
  Users,
  Bell,
  Trophy,
  Settings,
  MessageCircle
} from 'lucide-react';

export default function SidebarLayout({ children, activeTab, setActiveTab, roleTitle, userName, tabs: customTabs }) {
  const { dispatch } = useContext(AppContext);
  const tabs = customTabs || [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'vote', label: 'Vote', icon: <ThumbsUp size={18} /> },
    { id: 'challenges', label: 'Challenges', icon: <FileText size={18} /> },
    { id: 'proposals', label: 'Proposals', icon: <ClipboardList size={18} /> },
    { id: 'volunteer', label: 'Volunteer', icon: <HeartHandshake size={18} /> },
    { id: 'community', label: 'Community', icon: <Users size={18} /> },
    { id: 'alerts', label: 'Local Alerts', icon: <Bell size={18} /> },
    { id: 'analytics', label: 'Impact & Karma', icon: <Trophy size={18} /> },
    { id: 'reports', label: 'Reports', icon: <FileText size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-200 relative overflow-hidden">
      
      {/* SVG Filter for Cloth Waving Effect */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <filter id="dashboard-wave-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves="1" result="noise">
            <animate attributeName="baseFrequency" values="0.006 0.012; 0.008 0.016; 0.006 0.012" dur="10s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* 3D Indian Flag Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all opacity-80" 
        style={{ 
          backgroundImage: "url('/flag-bg.png')", 
          filter: "url(#dashboard-wave-filter)"
        }}
      ></div>

      {/* Very soft white overlay to ensure dashboard readability without darkening the flag */}
      <div className="absolute inset-0 z-0 bg-white/40 pointer-events-none backdrop-blur-[2px]"></div>

      {/* Tiranga Top Border */}
      <div className="h-1.5 w-full flex shrink-0 z-30 relative">
        <div className="h-full flex-1 bg-[#E37000]"></div>
        <div className="h-full flex-1 bg-white"></div>
        <div className="h-full flex-1 bg-[#0E6B06]"></div>
      </div>

      {/* Top Header */}
      <header className="h-16 bg-white/70 backdrop-blur-md border-b border-white/50 flex items-center justify-between px-4 lg:px-8 z-20 sticky top-0 shrink-0 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
         <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
               <div className="w-9 h-9 rounded-xl shadow-sm grid place-items-center font-extrabold text-lg relative overflow-hidden border border-white/80 bg-white/90">
                 <div className="absolute top-0 w-full h-1/3 bg-[#E37000]"></div>
                 <div className="absolute top-1/3 w-full h-1/3 bg-white flex items-center justify-center">
                   <div className="w-2.5 h-2.5 rounded-full border border-[#000080]"></div>
                 </div>
                 <div className="absolute bottom-0 w-full h-1/3 bg-[#0E6B06]"></div>
                 <span className="relative z-10 text-slate-900 drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">N</span>
               </div>
               <div className="leading-tight">
                 <div className="font-extrabold text-slate-900 text-lg tracking-tight flex items-center gap-2 drop-shadow-[0_0_8px_rgba(255,255,255,1)]">
                   NIRVAHA 
                   <span className="px-2 py-0.5 rounded-md bg-white/80 backdrop-blur-sm border border-orange-200/50 text-orange-700 text-[10px] font-bold uppercase tracking-wider hidden sm:inline-block shadow-sm">
                     {roleTitle}
                   </span>
                 </div>
                 <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider hidden sm:block drop-shadow-[0_0_8px_rgba(255,255,255,1)]">Govt. of Jharkhand</div>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab && setActiveTab('report')}
              className="hidden md:flex bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-md shadow-orange-600/20 transition-all text-sm items-center gap-2 transform hover:-translate-y-0.5"
            >
              + Report Issue
            </button>
            
            <div className="flex bg-white/50 backdrop-blur-sm rounded-lg p-1 border border-white/60 hidden lg:flex shadow-sm">
              <button className="px-3 py-1 bg-white shadow-sm rounded-md text-xs font-bold text-slate-800">Official</button>
              <button className="px-3 py-1 rounded-md text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">Admin</button>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/60 shadow-sm transition-all hover:bg-white">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-bold grid place-items-center shrink-0 text-sm">
                {userName?.charAt(0) || 'U'}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-slate-900 truncate max-w-[120px]">{userName}</div>
              </div>
              <div className="h-5 w-px bg-slate-300 mx-1 hidden sm:block"></div>
              <button onClick={() => dispatch({ type: 'SET_ROLE', role: null })} className="text-[11px] text-orange-600 font-bold hover:text-orange-700 hover:underline hidden sm:block">
                Exit Role
              </button>
            </div>
         </div>
      </header>

      {/* Sub Navigation (Horizontal Tabs) */}
      <div className="bg-white/60 backdrop-blur-md border-b border-white/50 z-10 shrink-0 sticky top-16 shadow-[0_4px_30px_rgba(0,0,0,0.02)] relative">
        <div className="w-full overflow-x-auto no-scrollbar">
           <nav className="flex items-center px-4 lg:px-8 py-2 min-w-max">
              {tabs.map(t => (
                <button 
                  key={t.id} 
                  onClick={() => setActiveTab && setActiveTab(t.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap mr-2 ${activeTab === t.id ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-500/20 transform scale-[1.02]' : 'text-slate-700 hover:bg-white/80 hover:text-slate-900 hover:shadow-sm'}`}
                >
                  <span className={`text-base flex items-center justify-center ${activeTab === t.id ? 'text-white' : 'text-slate-600'}`}>{t.icon}</span>
                  {t.label}
                </button>
              ))}
           </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto relative z-10 p-4 lg:p-8 bg-transparent">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      
      {/* Global Chatbot Widget */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-full shadow-[0_8px_30px_rgba(245,158,11,0.4)] grid place-items-center text-white text-2xl hover:scale-110 hover:-translate-y-2 transition-all duration-300">
          <MessageCircle size={26} />
        </button>
      </div>
    </div>
  );
}
