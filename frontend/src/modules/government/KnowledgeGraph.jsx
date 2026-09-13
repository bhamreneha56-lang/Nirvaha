import React from 'react';
import { motion } from 'framer-motion';
import { Droplet, MapPin, Building2, FileStack, GraduationCap } from 'lucide-react';

export default function KnowledgeGraph() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 h-full flex flex-col"
    >
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-3xl font-black text-black tracking-tight">GOVERNANCE KNOWLEDGE GRAPH</h2>
          <p className="text-black font-medium mt-1">Explore connections between problems, departments, experts, and solutions</p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-blue-100 shadow-sm p-8 flex items-center justify-center relative overflow-hidden min-h-[500px]">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle at center, #0f172a 2px, transparent 2px)', backgroundSize: '40px 40px'}}></div>

        {/* Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} x1="50%" y1="50%" x2="35%" y2="25%" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
          <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }} x1="50%" y1="50%" x2="65%" y2="25%" stroke="#f97316" strokeWidth="3" />
          <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }} x1="50%" y1="50%" x2="25%" y2="75%" stroke="#3b82f6" strokeWidth="3" />
          <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }} x1="25%" y1="75%" x2="75%" y2="75%" stroke="#22c55e" strokeWidth="3" strokeDasharray="6,6" />
          <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }} x1="50%" y1="50%" x2="75%" y2="75%" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4" />
        </svg>

        {/* Nodes */}
        
        {/* Central Node */}
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: "spring", bounce: 0.5 }}
          whileHover={{ scale: 1.1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        >
           <div className="w-36 h-36 bg-white border-4 border-orange-500 rounded-full flex flex-col items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.3)] cursor-pointer group">
              <div className="bg-orange-50 w-full h-full rounded-full absolute inset-0 -z-10 group-hover:bg-orange-100 transition-colors"></div>
              <Droplet size={32} className="text-orange-500 mb-2 fill-orange-100" />
              <span className="font-black text-[10px] text-orange-800 text-center leading-tight uppercase tracking-widest">Water<br/>Contamination</span>
           </div>
        </motion.div>
        
        {/* District Node */}
        <motion.div 
          initial={{ scale: 0, x: -50, y: -50 }} 
          animate={{ scale: 1, x: 0, y: 0 }} 
          transition={{ type: "spring", delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
          className="absolute top-[20%] left-[30%] z-20"
        >
           <div className="w-24 h-24 bg-white border-2 border-slate-400 rounded-full flex flex-col items-center justify-center shadow-lg cursor-pointer group">
              <div className="bg-white w-full h-full rounded-full absolute inset-0 -z-10 group-hover:bg-white transition-colors"></div>
              <MapPin size={20} className="text-black mb-1" />
              <span className="font-black text-[10px] text-black uppercase tracking-widest">Ranchi</span>
           </div>
        </motion.div>
        
        {/* Department Node */}
        <motion.div 
          initial={{ scale: 0, x: 50, y: -50 }} 
          animate={{ scale: 1, x: 0, y: 0 }} 
          transition={{ type: "spring", delay: 0.4 }}
          whileHover={{ scale: 1.1 }}
          className="absolute top-[20%] right-[30%] z-20"
        >
           <div className="w-24 h-24 bg-white border-2 border-orange-500 rounded-full flex flex-col items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)] cursor-pointer group">
              <div className="bg-orange-50 w-full h-full rounded-full absolute inset-0 -z-10 group-hover:bg-orange-100 transition-colors"></div>
              <Building2 size={20} className="text-orange-500 mb-1" />
              <span className="font-black text-[10px] text-orange-800 uppercase tracking-widest">PHED</span>
           </div>
        </motion.div>

        {/* Challenge Node */}
        <motion.div 
          initial={{ scale: 0, x: -50, y: 50 }} 
          animate={{ scale: 1, x: 0, y: 0 }} 
          transition={{ type: "spring", delay: 0.6 }}
          whileHover={{ scale: 1.1 }}
          className="absolute bottom-[25%] left-[20%] z-20"
        >
           <div className="w-28 h-28 bg-white border-2 border-blue-500 rounded-full flex flex-col items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)] cursor-pointer group">
              <div className="bg-blue-50 w-full h-full rounded-full absolute inset-0 -z-10 group-hover:bg-blue-100 transition-colors"></div>
              <FileStack size={24} className="text-blue-500 mb-2" />
              <span className="font-black text-[10px] text-blue-800 uppercase text-center tracking-widest">Challenge<br/>MC-1024</span>
           </div>
        </motion.div>

        {/* Solution/University Node */}
        <motion.div 
          initial={{ scale: 0, x: 50, y: 50 }} 
          animate={{ scale: 1, x: 0, y: 0 }} 
          transition={{ type: "spring", delay: 0.8 }}
          whileHover={{ scale: 1.1 }}
          className="absolute bottom-[25%] right-[20%] z-20"
        >
           <div className="w-28 h-28 bg-white border-2 border-green-500 rounded-full flex flex-col items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.2)] cursor-pointer group relative">
              <div className="bg-green-50 w-full h-full rounded-full absolute inset-0 -z-10 group-hover:bg-green-100 transition-colors"></div>
              {/* Pulse effect */}
              <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-green-400 rounded-full -z-20"></motion.div>
              
              <GraduationCap size={24} className="text-green-600 mb-2" />
              <span className="font-black text-[10px] text-green-800 uppercase text-center tracking-widest">University<br/>XYZ</span>
           </div>
        </motion.div>

        {/* Info Panel overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-blue-100 shadow-2xl z-30 max-w-xs"
        >
          <h4 className="font-black text-black mb-2 flex items-center gap-2"><GraduationCap size={16} className="text-green-600"/> Node: University XYZ</h4>
          <p className="text-xs text-black font-medium mb-4 leading-relaxed">Click on a node to explore related problems, experts, and past solutions within the state.</p>
          <div className="space-y-2 pt-3 border-t border-blue-100">
            <div className="text-[10px] text-black font-black uppercase tracking-widest mb-1">Connections Found</div>
            <div className="text-xs text-blue-700 font-bold bg-blue-50 px-2 py-1 rounded flex items-center gap-1.5"><FileStack size={12}/> Solved 3 similar challenges</div>
            <div className="text-xs text-green-700 font-bold bg-green-50 px-2 py-1 rounded flex items-center gap-1.5"><Building2 size={12}/> 2 active prototypes</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
