import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, GraduationCap, Briefcase, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export default function Marketplace() {
  const { dispatch } = useSimulation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-end mb-2">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">SOLUTION MARKETPLACE</h2>
          <p className="text-slate-500 font-medium mt-1">Discover Universities, Startups, and CSR Funding for your challenges</p>
        </div>
      </div>

      <motion.div whileHover={{ y: -2 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6 relative z-20">
        <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-widest mb-4">Select a Challenge to Match</h3>
        <div className="relative">
          <select className="w-full p-4 border-2 border-slate-200 rounded-xl font-bold text-slate-800 bg-slate-50 appearance-none cursor-pointer outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner">
            <option>MC-1024: Low-cost rural water quality monitoring (Ward 12)</option>
            <option>MC-1025: AI-based crop disease detection</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <ChevronDown size={20} strokeWidth={3} />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-6 relative z-10">
        {/* UNIVERSITY MATCHING */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col"
        >
          <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg"><GraduationCap size={16} /></span> AI UNIVERSITY MATCHING
          </h3>
          
          <div className="space-y-5 flex-1">
            <motion.div whileHover={{ scale: 1.02 }} className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white p-5 rounded-2xl relative overflow-hidden shadow-sm group">
              <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-black px-3 py-1.5 rounded-bl-xl uppercase tracking-widest shadow-sm">Best Match</div>
              <h4 className="font-black text-slate-900 text-xl mb-1 flex items-center gap-2">University XYZ <CheckCircle2 size={16} className="text-green-500" /></h4>
              <p className="text-xs text-slate-600 font-medium mb-5">Expertise: IoT + Water Quality</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-xs font-bold">
                  <span className="w-24 text-slate-500">AI Expertise</span>
                  <div className="flex-1 bg-green-100 h-2 rounded-full overflow-hidden shadow-inner">
                    <motion.div initial={{ width: 0 }} animate={{ width: '96%' }} transition={{ delay: 0.5, duration: 1 }} className="bg-green-500 h-full"></motion.div>
                  </div>
                  <span className="text-green-700 w-8 text-right">96%</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold">
                  <span className="w-24 text-slate-500">Research Lab</span>
                  <div className="flex-1 bg-green-100 h-2 rounded-full overflow-hidden shadow-inner">
                    <motion.div initial={{ width: 0 }} animate={{ width: '94%' }} transition={{ delay: 0.6, duration: 1 }} className="bg-green-500 h-full"></motion.div>
                  </div>
                  <span className="text-green-700 w-8 text-right">94%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-green-200/60">
                <div className="text-2xl font-black text-green-700 drop-shadow-sm flex items-center gap-1"><Zap size={20} className="fill-green-600 text-green-600"/> 94% MATCH</div>
                <button onClick={() => dispatch({ type: 'START_WORKFLOW', payload: { action: 'INVITE_UNIVERSITY', challengeId: 'MC-1024' } })} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-1">Invite <ChevronRight size={14}/></button>
              </div>
            </motion.div>
            
            <div className="border border-slate-200 p-5 rounded-2xl opacity-70 hover:opacity-100 transition-opacity bg-slate-50/50">
              <h4 className="font-bold text-slate-900 text-lg">National Institute of Tech</h4>
              <p className="text-xs text-slate-500 font-medium mb-4">Expertise: Hardware & Sensors</p>
              <div className="flex items-center gap-3 text-xs font-bold">
                <span className="w-24 text-slate-500">Match Score</span>
                <div className="flex-1 bg-slate-200 h-1.5 rounded-full overflow-hidden shadow-inner"><div className="bg-slate-400 h-full w-[78%]"></div></div>
                <span className="text-slate-700 w-8 text-right">78%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CSR FUNDING MATCHER */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col"
        >
          <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="bg-amber-100 text-amber-600 p-1.5 rounded-lg"><Briefcase size={16} /></span> CSR FUNDING MATCHER
          </h3>
          
          <div className="space-y-5 flex-1">
            <motion.div whileHover={{ scale: 1.02 }} className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5 rounded-2xl relative overflow-hidden shadow-sm group">
              <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-black px-3 py-1.5 rounded-bl-xl uppercase tracking-widest shadow-sm">High Alignment</div>
              <h4 className="font-black text-slate-900 text-xl mb-1 flex items-center gap-2">AquaTech Pvt Ltd <CheckCircle2 size={16} className="text-amber-500" /></h4>
              <p className="text-xs text-slate-600 font-medium mb-5">CSR Focus: Water & Rural Development</p>
              
              <div className="flex justify-between items-center bg-white p-4 border border-amber-100 rounded-xl mb-5 shadow-sm">
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Potential Funding</div>
                  <div className="text-2xl font-black text-amber-600">₹25 Lakh</div>
                </div>
                <div className="text-right border-l border-slate-100 pl-6">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Compatibility</div>
                  <div className="text-2xl font-black text-green-600">91%</div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4 border-t border-amber-200/60 mt-auto">
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-1">Request Funds <ChevronRight size={14}/></button>
              </div>
            </motion.div>
            
            <div className="border border-slate-200 p-5 rounded-2xl opacity-70 hover:opacity-100 transition-opacity bg-slate-50/50">
              <h4 className="font-bold text-slate-900 text-lg">TechCorp India</h4>
              <p className="text-xs text-slate-500 font-medium mb-4">CSR Focus: Education & Technology</p>
              <div className="flex justify-between items-center bg-white p-3 border border-slate-200 rounded-lg shadow-sm">
                <span className="text-xs font-black text-slate-600">Match: 61%</span>
                <span className="text-xs font-black text-slate-600">Potential: ₹10 Lakh</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
