import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Loader2, Download, Share2, TrendingUp, Map, CopySlash, Zap, ChevronRight } from 'lucide-react';

export default function IntelligenceReport() {
  const [generating, setGenerating] = useState(false);
  const [reportReady, setReportReady] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setReportReady(true);
    }, 2500); // slightly longer for the animation effect
  };

  return (
    <div className="space-y-6 h-full">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">AI GOVERNANCE INTELLIGENCE REPORT</h2>
          <p className="text-slate-500 font-medium mt-1">Generate automated monthly/district action reports</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!reportReady ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 max-w-xl mx-auto mt-12 relative overflow-hidden"
          >
            {generating && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center"
              >
                <Loader2 size={40} className="text-blue-600 animate-spin mb-4" />
                <h3 className="text-lg font-black text-slate-900">Synthesizing Data...</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">Analyzing 1,248 problems & 12 districts</p>
                <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden mt-4">
                  <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="bg-blue-600 w-1/2 h-full rounded-full"></motion.div>
                </div>
              </motion.div>
            )}

            <h3 className="font-extrabold text-xl text-slate-900 mb-8 text-center flex items-center justify-center gap-2">
              <FileText size={24} className="text-blue-600" /> Generate New Report
            </h3>
            
            <div className="space-y-5 relative z-0">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Target District</label>
                <div className="relative">
                  <select className="w-full p-4 border-2 border-slate-200 rounded-xl font-bold text-slate-800 bg-slate-50 appearance-none outline-none focus:border-blue-500 transition-colors cursor-pointer shadow-inner">
                    <option>Ranchi</option>
                    <option>Dhanbad</option>
                    <option>Jamshedpur</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Time Period</label>
                <div className="relative">
                  <select className="w-full p-4 border-2 border-slate-200 rounded-xl font-bold text-slate-800 bg-slate-50 appearance-none outline-none focus:border-blue-500 transition-colors cursor-pointer shadow-inner">
                    <option>August 2026</option>
                    <option>July 2026</option>
                  </select>
                </div>
              </div>
              
              <button 
                onClick={handleGenerate}
                disabled={generating}
                className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-xl mt-6 transition-all shadow-md hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
              >
                <Zap size={18} /> GENERATE AI REPORT
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="report"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] max-w-4xl mx-auto overflow-hidden"
          >
            <div className="bg-slate-900 text-white p-8 relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-10 translate-x-1/4 -translate-y-1/4"><FileText size={200} /></div>
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h3 className="text-3xl font-black mb-2 tracking-tight">District Governance Intelligence</h3>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                    <Map size={14}/> Ranchi <span className="text-slate-600">•</span> August 2026
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-xl text-sm font-black transition-colors flex items-center gap-2">
                    <Download size={16}/> PDF
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl text-sm font-black shadow-md transition-colors flex items-center gap-2">
                    <Share2 size={16}/> Share
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-8 space-y-10">
              <div className="grid grid-cols-4 gap-5">
                <div className="border border-slate-200 bg-slate-50 p-5 rounded-2xl text-center shadow-inner"><div className="text-3xl font-black text-slate-900">428</div><div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Total Problems</div></div>
                <div className="border border-green-200 bg-green-50 p-5 rounded-2xl text-center shadow-inner"><div className="text-3xl font-black text-green-700">291</div><div className="text-[10px] font-bold text-green-600 uppercase tracking-widest mt-1">Resolved</div></div>
                <div className="border border-orange-200 bg-orange-50 p-5 rounded-2xl text-center shadow-inner"><div className="text-3xl font-black text-orange-700">97</div><div className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mt-1">Pending</div></div>
                <div className="border border-red-200 bg-red-50 p-5 rounded-2xl text-center shadow-inner"><div className="text-3xl font-black text-red-700">40</div><div className="text-[10px] font-bold text-red-600 uppercase tracking-widest mt-1">Critical</div></div>
              </div>
              
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <h4 className="font-black text-sm text-slate-900 uppercase tracking-widest mb-5 flex items-center gap-2">
                    <span className="bg-purple-100 text-purple-600 p-1.5 rounded-lg"><Zap size={16}/></span> AI Findings
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex gap-3 items-start bg-red-50/50 p-3 rounded-xl border border-red-100/50">
                      <TrendingUp size={18} className="text-red-500 mt-0.5 shrink-0" />
                      <span className="font-bold text-slate-700 text-sm">Water-related problems increased 32% compared to last month.</span>
                    </li>
                    <li className="flex gap-3 items-start bg-orange-50/50 p-3 rounded-xl border border-orange-100/50">
                      <Map size={18} className="text-orange-500 mt-0.5 shrink-0" />
                      <span className="font-bold text-slate-700 text-sm">Three geographic hotspots identified in urban sectors.</span>
                    </li>
                    <li className="flex gap-3 items-start bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                      <CopySlash size={18} className="text-blue-500 mt-0.5 shrink-0" />
                      <span className="font-bold text-slate-700 text-sm">17 duplicate problem clusters detected and merged into 3 Master Challenges.</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-black text-sm text-slate-900 uppercase tracking-widest mb-5 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg"><CheckCircle size={16}/></span> Recommended Actions
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl border-2 border-red-100 shadow-sm group hover:border-red-300 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-[10px] font-black text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded">Priority 1</div>
                        <ChevronRight size={16} className="text-slate-400 group-hover:text-red-500 transition-colors" />
                      </div>
                      <div className="font-black text-slate-800">Investigate Ward 12 water issue</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border-2 border-orange-100 shadow-sm group hover:border-orange-300 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-[10px] font-black text-orange-600 uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded">Priority 2</div>
                        <ChevronRight size={16} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
                      </div>
                      <div className="font-black text-slate-800">Assign university research partners for sanitation challenge</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
