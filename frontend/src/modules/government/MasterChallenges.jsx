import React from 'react';
import { motion } from 'framer-motion';
import { FileStack, ChevronRight, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function MasterChallenges({ onSelectChallenge }) {
  const { dispatch } = useSimulation();

  const handleCreateChallenge = (clusterId) => {
    dispatch({ type: 'START_WORKFLOW', payload: { action: 'CREATE_MASTER_CHALLENGE', clusterId } });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">MASTER CHALLENGES</h2>
          <p className="text-slate-500 font-medium mt-1">Similar citizen reports automatically merged into actionable challenges</p>
        </div>
      </div>

      {/* PENDING CLUSTERS AWAITING CREATION */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-inner">
        <h3 className="font-extrabold text-blue-900 text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          AI Detected Duplicate Clusters
        </h3>
        <div className="bg-white border border-blue-100 rounded-xl p-4 flex justify-between items-center shadow-sm">
          <div>
            <div className="font-black text-slate-900">Cluster: Illegal Dumping at Market</div>
            <div className="text-xs font-bold text-slate-500 mt-1">18 verified citizen reports identified with 89% similarity.</div>
          </div>
          <button 
            onClick={() => handleCreateChallenge('CLUSTER-902')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md transition-colors"
          >
            Review & Create Master Challenge
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <th className="p-5 w-40">Challenge ID</th>
              <th className="p-5">Problem Cluster</th>
              <th className="p-5 w-48">AI Priority</th>
              <th className="p-5 w-40">Source Reports</th>
              <th className="p-5 w-48 text-right">Action</th>
            </tr>
          </thead>
          <motion.tbody 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="text-sm"
          >
            <motion.tr 
              variants={rowVariants}
              whileHover={{ scale: 1.005, backgroundColor: 'rgba(248, 250, 252, 1)' }}
              className="border-b border-slate-100 group transition-colors cursor-pointer"
              onClick={() => onSelectChallenge('MC-1024')}
            >
              <td className="p-5">
                <span className="font-black text-slate-500 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs">MC-1024</span>
              </td>
              <td className="p-5">
                <div className="font-black text-slate-900 text-base mb-1 group-hover:text-blue-600 transition-colors">Safe Drinking Water — Ward 12</div>
                <div className="text-xs text-slate-500 font-medium">Water contamination, dirty pipelines, foul smell</div>
              </td>
              <td className="p-5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-red-50 text-red-700 rounded-lg font-black text-xs border border-red-200 shadow-sm">
                  <AlertCircle size={12}/> 94/100 (CRITICAL)
                </div>
              </td>
              <td className="p-5">
                <div className="flex items-center gap-2 font-bold text-slate-700">
                  <FileStack size={14} className="text-slate-400" /> 47 linked
                </div>
              </td>
              <td className="p-5 text-right">
                <button 
                  onClick={(e) => { e.stopPropagation(); onSelectChallenge('MC-1024'); }} 
                  className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-900 hover:text-white transition-all shadow-sm flex items-center gap-1 ml-auto"
                >
                  Digital Twin <ChevronRight size={14} />
                </button>
              </td>
            </motion.tr>

            <motion.tr 
              variants={rowVariants}
              whileHover={{ scale: 1.005, backgroundColor: 'rgba(248, 250, 252, 1)' }}
              className="border-b border-slate-100 group transition-colors cursor-pointer"
              onClick={() => onSelectChallenge('MC-1025')}
            >
              <td className="p-5">
                <span className="font-black text-slate-500 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs">MC-1025</span>
              </td>
              <td className="p-5">
                <div className="font-black text-slate-900 text-base mb-1 group-hover:text-blue-600 transition-colors">Pothole Repair — Main Road</div>
                <div className="text-xs text-slate-500 font-medium">Deep potholes, traffic blockage, vehicle damage reports</div>
              </td>
              <td className="p-5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-orange-50 text-orange-700 rounded-lg font-black text-xs border border-orange-200 shadow-sm">
                  <Clock size={12}/> 72/100 (HIGH)
                </div>
              </td>
              <td className="p-5">
                <div className="flex items-center gap-2 font-bold text-slate-700">
                  <FileStack size={14} className="text-slate-400" /> 22 linked
                </div>
              </td>
              <td className="p-5 text-right">
                <button 
                  onClick={(e) => { e.stopPropagation(); onSelectChallenge('MC-1025'); }} 
                  className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-900 hover:text-white transition-all shadow-sm flex items-center gap-1 ml-auto"
                >
                  Digital Twin <ChevronRight size={14} />
                </button>
              </td>
            </motion.tr>
          </motion.tbody>
        </table>
      </div>
    </motion.div>
  );
}
