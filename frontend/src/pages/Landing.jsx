import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

export default function Landing() {
  const { dispatch } = useContext(AppContext);
  const [showPortals, setShowPortals] = useState(false);
  
  const roles = [
    { role:"citizen", t:"Citizen", d:"Report problems via voice, track status, earn Karma points.", icon:"👨‍👩‍👧‍👦" },
    { role:"university", t:"University", d:"Review challenges, form AI-matched teams, submit proposals.", icon:"🎓" },
    { role:"industry", t:"Industry & CSR", d:"Browse fundable projects, mentor teams, commit funding.", icon:"🏭" },
    { role:"government", t:"Government", d:"State-wide analytics, challenge verification, pipeline oversight.", icon:"🏛️" },
  ];

  return (
    <div className="h-screen max-h-screen flex flex-col relative overflow-hidden bg-white">
      {/* SVG Filter for Cloth Waving Effect */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <filter id="wave-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.002 0.004" numOctaves="1" result="noise">
            <animate attributeName="baseFrequency" values="0.002 0.004; 0.004 0.008; 0.002 0.004" dur="20s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* 3D Indian Flag Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all" 
        style={{ 
          backgroundImage: "url('/flag-bg.png')", 
          filter: "url(#wave-filter)"
        }}
      ></div>
      
      {/* Top Navigation Bar */}
      <nav className="relative z-50 w-full bg-white/40 backdrop-blur-md border-b border-white/50 px-8 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg shadow-sm grid place-items-center font-extrabold text-sm relative overflow-hidden border border-slate-200">
             <div className="absolute top-0 w-full h-1/3 bg-[#E37000]"></div>
             <div className="absolute top-1/3 w-full h-1/3 bg-white"></div>
             <div className="absolute bottom-0 w-full h-1/3 bg-[#0E6B06]"></div>
             <span className="relative z-10 text-slate-900 drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">N</span>
          </div>
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-emerald-800 to-orange-800 tracking-tight text-lg drop-shadow-[0_0_8px_rgba(255,255,255,1)]">NIRVAHA</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-800 drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]">
          <a href="#" className="text-orange-600">Home</a>
          <a href="#" className="hover:text-orange-500 transition">Features</a>
          <a href="#" className="hover:text-orange-500 transition">Modules</a>
          <a href="#" className="hover:text-orange-500 transition">Impact</a>
          <a href="#" className="hover:text-orange-500 transition">Partners</a>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-sm font-bold text-slate-800 hover:text-slate-900 drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]">EN / HI</button>
          <button onClick={() => setShowPortals(true)} className="px-5 py-1.5 bg-slate-900 hover:bg-black text-white rounded-lg text-sm font-bold shadow-md transition-all">
            Access Portals
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-4 w-full relative z-10 flex-1 flex flex-col justify-center">
        
        {!showPortals ? (
          /* SLIDE 1: Welcome Screen */
          <div className="text-center mt-0 animate-in fade-in zoom-in duration-500">
            <h1 
              className="text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-emerald-800 to-orange-800 mb-2 leading-none drop-shadow-[0_0_20px_rgba(255,255,255,1)]"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, letterSpacing: '0.04em' }}
            >
              NIRVAHA
            </h1>
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 font-extrabold mb-5 inline-block text-3xl md:text-5xl tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
              Turning Voices into Solutions
            </h2>
            
            <p className="text-slate-900 text-lg md:text-xl font-bold max-w-5xl mx-auto drop-shadow-[0_0_10px_rgba(255,255,255,1)] leading-relaxed mb-8 px-4">
              A civic-tech ecosystem uniting Jharkhand's citizens, universities, and industries. Report community issues, match with experts, and deploy sustainable solutions.
            </p>

            <button 
              onClick={() => setShowPortals(true)}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/40 backdrop-blur-md border border-white/60 text-slate-900 font-bold text-lg rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300"
            >
              <span>Tap to Explore</span>
              <svg className="w-5 h-5 text-orange-600 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ) : (
          /* SLIDE 2: Portals Screen */
          <div className="mt-2 animate-in fade-in slide-in-from-bottom-10 duration-500">
            <button 
              onClick={() => setShowPortals(false)}
              className="absolute top-0 left-4 md:left-0 flex items-center gap-2 text-slate-800 font-bold hover:text-orange-600 transition-colors z-20 drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <div className="text-center mb-6 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-[30px] border-orange-50 rounded-full opacity-50 blur-3xl"></div>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,1)]">Select Your Portal</h2>
              <p className="text-slate-800 font-medium mt-1 text-sm md:text-base relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,1)]">Experience the platform from 4 distinct stakeholder perspectives.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roles.map(r => (
                <button 
                  key={r.role} 
                  onClick={() => dispatch({ type:"SET_ROLE", role:r.role })}
                  className="group text-left bg-white/80 backdrop-blur-md rounded-2xl border border-white/60 p-6 hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-50 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                  
                  <div className="text-4xl mb-5 relative z-10">{r.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 relative z-10">{r.t}</h3>
                  <p className="text-sm text-gray-500 leading-snug relative z-10">{r.d}</p>
                  
                  <div className="mt-6 flex items-center text-amber-600 text-sm font-bold relative z-10">
                    Enter Portal <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Global Chatbot floating on Landing Page too */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 bg-amber-500 rounded-full shadow-2xl grid place-items-center text-white text-2xl hover:scale-110 transition-transform">
          💬
        </button>
      </div>
    </div>
  );
}
