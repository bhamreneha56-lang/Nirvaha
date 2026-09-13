import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, CheckCircle2, AlertTriangle, Zap, Activity, Clock, Scale, Share2 } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export default function ProblemDigitalTwin({ onClose }) {
  const { state, dispatch } = useSimulation();
  
  // For the prototype, we just grab the first problem in the global state queue
  const problem = state.problems[0] || {};
  
  const handleAssign = (officerId) => {
    dispatch({ type: 'START_WORKFLOW', payload: { action: 'ASSIGN_OFFICER', problemId: problem.id } });
  };

  const handleOverride = () => {
    dispatch({ type: 'START_WORKFLOW', payload: { action: 'OVERRIDE_AI', problemId: problem.id } });
  };

  const handleVerify = () => {
    dispatch({ type: 'START_WORKFLOW', payload: { action: 'VERIFY_EVIDENCE', problemId: problem.id } });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <button onClick={onClose} className="text-black hover:text-black text-xs uppercase tracking-widest font-black mb-3 flex items-center gap-1.5 transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Challenges
          </button>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-serif font-black text-black tracking-wide">PROBLEM DIGITAL TWIN</h2>
            <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-sm shadow-sm tracking-widest">{problem.id || 'NIR-2026-00482'}</span>
          </div>
          <p className="text-black font-bold mt-2 text-sm tracking-wide">{problem.title || 'Water contamination cluster'} • {problem.location || 'Ward 12'}</p>
        </div>
        <div className="flex gap-4 items-center">
          <button className="p-2 text-black hover:text-black hover:bg-white rounded-lg transition-colors"><Share2 size={20} /></button>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-b from-orange-50 to-white border border-orange-200 px-6 py-3 rounded-lg text-center shadow-[0_4px_12px_rgba(239,68,68,0.1)]">
            <div className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-0.5">Priority Index</div>
            <motion.div key={problem.priorityScore} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="text-3xl font-serif font-black text-orange-600 leading-none">{problem.priorityScore || 94}<span className="text-sm text-orange-400 font-bold">/100</span></motion.div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: EVIDENCE & TRUST */}
        <div className="space-y-6 flex flex-col">
          <motion.div whileHover={{ y: -2 }} className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 flex-1">
            <h3 className="font-extrabold text-sm text-black uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="bg-white text-black p-1.5 rounded-lg"><Activity size={16} /></span> Citizen Evidence
            </h3>
            
            <div className="flex gap-4 mb-5">
              <div className="w-24 h-24 bg-white rounded-xl bg-[url('https://images.unsplash.com/photo-1541888062876-0f81d1136bba?auto=format&fit=crop&q=80&w=150')] bg-cover shadow-inner border border-blue-100"></div>
              <div className="w-24 h-24 bg-white rounded-xl bg-[url('https://images.unsplash.com/photo-1615629472304-4061a7a0b36e?auto=format&fit=crop&q=80&w=150')] bg-cover relative shadow-inner border border-blue-100 cursor-pointer hover:opacity-90 transition-opacity">
                 <div className="absolute inset-0 bg-blue-600/50 flex items-center justify-center rounded-xl backdrop-blur-[1px]">
                    <span className="text-white font-black text-sm">+16 Media</span>
                 </div>
              </div>
            </div>
            
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between items-center"><span className="text-black font-medium">Verified Reports</span><span className="font-black text-black">{problem.reportsCount || 43}</span></div>
              <div className="flex justify-between items-center"><span className="text-black font-medium">GPS Authenticity</span><span className="font-bold text-green-600 flex items-center gap-1"><CheckCircle2 size={14}/> Verified</span></div>
            </div>
            
            <div className="pt-5 border-t border-blue-100">
              <h4 className="font-extrabold text-black text-xs uppercase tracking-widest mb-3 text-center text-black">AI Evidence Analysis</h4>
              <div className="space-y-2.5 text-xs mb-4">
                <div className="flex justify-between items-center"><span className="font-medium text-black">Location coherence</span><span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">98% Match</span></div>
                <div className="flex justify-between items-center"><span className="font-medium text-black">Visual severity</span><span className="font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">Critical</span></div>
              </div>
              
              {!problem.evidenceVerified ? (
                <button onClick={handleVerify} className="w-full bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white p-3 rounded-xl text-center text-xs font-black border border-blue-200 shadow-sm transition-colors active:scale-95 flex items-center justify-center gap-2">
                  <ShieldCheck size={16} /> VERIFY EVIDENCE (AI Conf: {problem.aiConfidence || 91}%)
                </button>
              ) : (
                <div className="bg-green-50 text-green-700 p-3 rounded-xl text-center text-xs font-black border border-green-200 shadow-sm flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} /> EVIDENCE OFFICIALLY VERIFIED
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* MIDDLE COLUMN: ROUTING & EXPLAINABILITY */}
        <div className="space-y-6 flex flex-col">
          <motion.div whileHover={{ y: -2 }} className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6">
            <h3 className="font-extrabold text-sm text-black uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg"><Zap size={16} /></span> "WHY AI?" EXPLAINABILITY
            </h3>
            
            <div className="space-y-3 mb-5">
               <div className="group flex justify-between items-center text-sm p-2 -mx-2 rounded-lg hover:bg-white transition-colors">
                 <span className="text-black font-medium flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Population scale</span>
                 <span className="font-black text-orange-600">+28 pts</span>
               </div>
               <div className="group flex justify-between items-center text-sm p-2 -mx-2 rounded-lg hover:bg-white transition-colors">
                 <span className="text-black font-medium flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Health severity</span>
                 <span className="font-black text-orange-600">+24 pts</span>
               </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-white hover:bg-white text-black text-xs font-bold py-2 rounded-lg transition-colors">Accept</button>
              <button onClick={handleOverride} className="flex-1 bg-white border border-orange-200 hover:bg-orange-50 text-orange-600 text-xs font-bold py-2 rounded-lg transition-colors shadow-sm">Override</button>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 flex-1">
            <h3 className="font-extrabold text-sm text-black uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="bg-blue-500 text-blue-600 p-1.5 rounded-lg"><Scale size={16} /></span> SMART WORKLOAD BALANCER
            </h3>
            
            <div className="space-y-3 mt-4">
              {state.officers.map(officer => (
                <motion.div key={officer.id} whileHover={{ scale: 1.02 }} className={`flex justify-between items-center p-4 border rounded-xl shadow-sm ${problem.assignedOfficer === officer.id ? 'border-blue-400 bg-blue-50' : 'border-blue-100 bg-white'}`}>
                  <div>
                    <div className="font-black text-black text-sm mb-1">Officer {officer.name}</div>
                    <div className="text-[10px] font-bold text-black uppercase tracking-widest flex items-center gap-1">Load: <div className="w-12 h-1.5 bg-white rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: officer.workload + "%" }} className={`h-full ${officer.workload > 80 ? 'bg-orange-500' : 'bg-green-500'}`}></motion.div></div> {officer.workload}%</div>
                  </div>
                  <div className="flex flex-col items-end">
                    {problem.assignedOfficer === officer.id ? (
                      <div className="text-blue-700 font-black text-xs px-3 py-1.5 rounded-lg bg-blue-100 flex items-center gap-1"><CheckCircle2 size={12}/> Assigned</div>
                    ) : officer.workload > 80 ? (
                       <div className="text-orange-600 font-black text-xs">Overloaded</div>
                    ) : (
                      <button onClick={() => handleAssign(officer.id)} className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors shadow-sm active:scale-95">Assign</button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: LIFECYCLE & ESCALATION */}
        <div className="space-y-6 flex flex-col">
          <motion.div whileHover={{ y: -2 }} className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6">
            <h3 className="font-extrabold text-sm text-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="bg-orange-100 text-orange-600 p-1.5 rounded-lg"><Clock size={16} /></span> ESCALATION ENGINE
            </h3>
            <div className="text-center p-5 bg-gradient-to-b from-slate-50 to-white border border-blue-100 rounded-xl shadow-sm">
              <div className="text-black font-bold text-[10px] uppercase tracking-widest mb-1">SLA Time Remaining</div>
              <div className="text-3xl font-black text-black mb-3">72 <span className="text-lg text-black">hrs</span></div>
              <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-blue-100 mb-2">
                 <motion.div initial={{ width: 0 }} animate={{ width: '25%' }} transition={{ duration: 1, ease: 'easeOut' }} className="bg-green-500 h-full rounded-full"></motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 flex-1">
            <h3 className="font-extrabold text-sm text-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="bg-white text-black p-1.5 rounded-lg"><Layers size={16} /></span> Lifecycle Tracker
            </h3>
            
            <div className="relative pl-6 space-y-6 before:absolute before:inset-y-2 before:left-[11px] before:w-0.5 before:bg-white">
              {(problem.timeline || []).map((step, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="relative z-10 flex items-center gap-4 group">
                   <div className="w-6 h-6 rounded-full bg-green-500 border-4 border-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform"><CheckCircle2 size={10} className="text-white"/></div>
                   <div>
                     <div className="font-black text-black text-sm">{step.state}</div>
                     <div className="text-[9px] font-bold text-black">{step.time}</div>
                   </div>
                </motion.div>
              ))}
              
              {/* Upcoming Step */}
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="relative z-10 flex items-center gap-4 group">
                 <div className="w-6 h-6 rounded-full bg-orange-400 border-4 border-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                   <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                 </div>
                 <div>
                   <div className="font-black text-black text-sm">Next Step</div>
                   <div className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mt-0.5">Pending Action</div>
                 </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
