import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimulation } from '../../context/SimulationContext';
import { Activity, User, ShieldAlert, Cpu, ChevronDown, ChevronUp, Bell } from 'lucide-react';

export default function LiveAuditLog() {
  const { state } = useSimulation();
  const [isOpen, setIsOpen] = useState(false);
  const logs = state.auditLogs.slice(0, 5); // Show last 5 logs

  const getIcon = (type) => {
    switch(type) {
      case 'citizen': return <User size={14} className="text-blue-500" />;
      case 'system': return <Cpu size={14} className="text-blue-600" />;
      case 'officer': return <Activity size={14} className="text-green-500" />;
      case 'warning': return <ShieldAlert size={14} className="text-orange-500" />;
      default: return <Activity size={14} className="text-black" />;
    }
  };

  if (logs.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[9000] flex flex-col items-start pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 bg-white/95 backdrop-blur-md rounded-2xl border border-blue-100 shadow-2xl overflow-hidden"
          >
            <div className="bg-white px-4 py-3 border-b border-blue-100 flex justify-between items-center">
              <span className="text-[10px] font-black text-black uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Event Stream
              </span>
              <button onClick={() => setIsOpen(false)} className="text-black hover:text-black">
                <ChevronDown size={14} />
              </button>
            </div>
            <div className="p-4 space-y-3 max-h-80 overflow-auto">
              <AnimatePresence>
                {logs.map((log, index) => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -20, height: 0 }}
                    animate={{ opacity: index === 0 ? 1 : 0.7, x: 0, height: 'auto' }}
                    className="flex gap-3 items-start"
                  >
                    <div className="mt-1 shrink-0 bg-white p-1.5 rounded-full border border-blue-100 shadow-sm">
                      {getIcon(log.type)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-black flex justify-between items-center">
                        {log.action}
                        <span className="text-[9px] text-black font-medium ml-2 shrink-0">{log.time}</span>
                      </div>
                      <div className="text-[11px] text-black mt-0.5 leading-tight">{log.details}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg border transition-all ${
          isOpen ? 'bg-blue-600 text-white border-slate-800' : 'bg-white text-black border-blue-100 hover:bg-white'
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-xs font-bold">Live Stream</span>
        {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>
    </div>
  );
}
