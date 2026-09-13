import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useSimulation } from '../../context/SimulationContext';
import { 
  Shield, 
  Radio, 
  Clock, 
  Globe2, 
  Bell, 
  AlertTriangle, 
  ChevronRight, 
  Activity, 
  Cpu, 
  RefreshCw,
  LogOut,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export default function GovernmentNavbar() {
  const appContext = useContext(AppContext);
  const simulation = useSimulation();

  // Safely grab dispatchers
  const appDispatch = appContext?.dispatch;
  const simDispatch = simulation?.dispatch;
  const simState = simulation?.state;

  // Live clocks for IST and UTC synchronized
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const istString = time.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const utcString = time.toLocaleTimeString('en-GB', {
    timeZone: 'UTC',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });



  const handleQuickAction = () => {
    if (simDispatch) {
      simDispatch({
        type: 'ADD_TOAST',
        payload: {
          title: 'System Telemetry Synced',
          message: 'All 24 district sensor grids refreshed. No security breaches.',
          type: 'success'
        }
      });
    }
  };

  const handleEmergencyAlert = () => {
    if (simDispatch) {
      simDispatch({
        type: 'SIMULATE_NEW_REPORT',
        payload: {
          title: 'Emergency: Flash Flood Drainage Alert',
          severity: 'Critical',
          priorityScore: 98,
          location: 'Harmu River Basin, Ranchi'
        }
      });
      simDispatch({
        type: 'ADD_TOAST',
        payload: {
          title: '🚨 Emergency Event Simulated',
          message: 'Priority 98 Critical grievance injected into Command Center stream.',
          type: 'error'
        }
      });
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 shadow-sm select-none font-sans">

      {/* 2. MAIN OPERATIONS CENTER HEADER BAR (Crisp Light Theme + Saffron Emblem) */}
      <div className="bg-white text-black border-b border-blue-100 px-4 lg:px-8 py-3 flex items-center justify-between shadow-sm relative overflow-hidden">
        {/* Subtle decorative background grid */}
        <div className="absolute inset-0 tactical-grid-light opacity-30 pointer-events-none"></div>

        {/* Brand & Emblem */}
        <div className="flex items-center gap-4 relative z-10">
          {/* 3D Government Saffron Emblem Badge */}
          <div className="relative group cursor-pointer" onClick={handleQuickAction}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 p-[2px] shadow-sm transform transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-[10px] bg-white flex flex-col items-center justify-center relative overflow-hidden border border-orange-400">
                {/* Tiranga strip top & bottom */}
                <div className="absolute top-0 w-full h-[3px] bg-[#FF9933]"></div>
                <div className="absolute bottom-0 w-full h-[3px] bg-[#138808]"></div>
                <span className="font-serif font-black text-orange-600 text-lg leading-none tracking-tighter drop-shadow-sm">
                  नि
                </span>
                <span className="text-[7px] font-mono text-orange-800 font-bold tracking-widest mt-0.5">
                  GOV
                </span>
              </div>
            </div>
            {/* Subtle pulse glow */}
            <div className="absolute -inset-1 bg-orange-400/20 rounded-xl blur-sm -z-10 group-hover:bg-orange-400/40 transition-colors"></div>
          </div>

          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <h1 className="text-xl lg:text-2xl font-black tracking-tight text-black font-sans flex items-center gap-1.5">
                NIRVAHA
              </h1>
              <span className="px-2 py-0.5 rounded bg-orange-50 border border-orange-300 text-orange-800 font-mono text-[10px] font-extrabold tracking-wider">
                V4.2 PRO
              </span>
            </div>
            <div className="text-[10px] lg:text-[11px] font-bold tracking-wider text-black uppercase flex items-center gap-1.5">
              <span>Government of Jharkhand</span>
              <span className="text-orange-500">•</span>
              <span className="text-orange-700 font-semibold">Problem Intelligence & Operations Center</span>
            </div>
          </div>
        </div>

        {/* Center: Synchronized UTC / IST Mission Telemetry Clock */}
        <div className="hidden lg:flex items-center gap-4 bg-white border border-blue-100 rounded-xl px-4 py-2 shadow-sm relative z-10">
          <div className="flex items-center gap-2 border-r border-blue-100 pr-3">
            <Clock size={16} className="text-orange-600 animate-pulse" />
            <div className="text-left">
              <div className="text-[9px] font-mono text-black font-bold tracking-widest uppercase">IST TIME</div>
              <div className="text-sm font-mono font-black text-black tracking-wider">{istString}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 border-r border-blue-100 pr-3">
            <Globe2 size={16} className="text-blue-600" />
            <div className="text-left">
              <div className="text-[9px] font-mono text-black font-bold tracking-widest uppercase">UTC TIME</div>
              <div className="text-sm font-mono font-black text-black tracking-wider">{utcString}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Activity size={16} className="text-green-600" />
            <div className="text-left">
              <div className="text-[9px] font-mono text-black font-bold tracking-widest uppercase">RADAR GRID</div>
              <div className="text-xs font-mono font-extrabold text-green-700 tracking-wider flex items-center gap-1">
                <span>ONLINE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Actions & Official Profile */}
        <div className="flex items-center gap-3 relative z-10">
          {/* Quick Simulation / Emergency Button */}
          <button
            onClick={handleEmergencyAlert}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-bold text-xs shadow-md border border-orange-500/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            title="Simulate flash emergency scenario"
          >
            <AlertTriangle size={14} className="animate-bounce" />
            <span>Simulate Alert</span>
          </button>

          {/* Sync / Refresh telemetry */}
          <button
            onClick={handleQuickAction}
            className="p-2 rounded-lg bg-white hover:bg-white border border-blue-100 text-black hover:text-black transition-colors"
            title="Sync GIS Telemetry"
          >
            <RefreshCw size={16} />
          </button>

          {/* Officer Role Pill */}
          <div className="flex items-center gap-2.5 bg-white border border-blue-100 rounded-xl px-3 py-1.5 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-700 text-white font-black text-xs flex items-center justify-center shadow-inner border border-orange-400">
              JS
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-extrabold text-black flex items-center gap-1">
                <span>Secretary, IT</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              </div>
              <div className="text-[9px] font-mono text-orange-800 font-bold uppercase tracking-wider">
                State Operations Lead
              </div>
            </div>

            {appDispatch && (
              <button
                onClick={() => appDispatch({ type: 'SET_ROLE', role: null })}
                className="text-black hover:text-black text-xs p-1 ml-1 rounded hover:bg-white transition-colors"
                title="Switch Role"
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
