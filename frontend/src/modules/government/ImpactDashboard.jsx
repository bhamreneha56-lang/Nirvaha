import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, Rocket, Map, IndianRupee, Clock, GraduationCap, Briefcase, Building, Recycle, Droplets } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function ImpactDashboard() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-3xl font-black text-black tracking-tight">SOCIAL IMPACT DASHBOARD</h2>
          <p className="text-black font-medium mt-1">Measuring the real-world value of deployed solutions</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white px-4 py-2 rounded-xl text-sm font-black text-black border border-blue-100 shadow-sm cursor-default">
          YTD 2026
        </motion.div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-[0_10px_30px_rgba(59,130,246,0.3)] relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-white opacity-20 group-hover:scale-110 transition-transform duration-500"><Users size={120} strokeWidth={1} /></div>
          <div className="text-[11px] font-black text-blue-200 uppercase tracking-widest mb-1 relative z-10 flex items-center gap-1"><Users size={12}/> Citizens Benefited</div>
          <div className="text-4xl font-black mt-1 relative z-10">48,250</div>
        </motion.div>
        
        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-[0_10px_30px_rgba(16,185,129,0.3)] relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-white opacity-20 group-hover:scale-110 transition-transform duration-500"><CheckCircle size={120} strokeWidth={1} /></div>
          <div className="text-[11px] font-black text-green-200 uppercase tracking-widest mb-1 relative z-10 flex items-center gap-1"><CheckCircle size={12}/> Problems Resolved</div>
          <div className="text-4xl font-black mt-1 relative z-10">326</div>
        </motion.div>
        
        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-[0_10px_30px_rgba(245,158,11,0.3)] relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-white opacity-20 group-hover:scale-110 transition-transform duration-500"><Rocket size={120} strokeWidth={1} /></div>
          <div className="text-[11px] font-black text-orange-200 uppercase tracking-widest mb-1 relative z-10 flex items-center gap-1"><Rocket size={12}/> Projects Deployed</div>
          <div className="text-4xl font-black mt-1 relative z-10">24</div>
        </motion.div>
        
        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-[0_10px_30px_rgba(168,85,247,0.3)] relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-white opacity-20 group-hover:scale-110 transition-transform duration-500"><Map size={120} strokeWidth={1} /></div>
          <div className="text-[11px] font-black text-black uppercase tracking-widest mb-1 relative z-10 flex items-center gap-1"><Map size={12}/> Districts Impacted</div>
          <div className="text-4xl font-black mt-1 relative z-10">12</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-6 pt-2">
        {/* Economic Impact */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="font-extrabold text-sm text-black uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="bg-green-100 text-green-600 p-2 rounded-xl"><IndianRupee size={16} /></span> ECONOMIC IMPACT
          </h3>
          <div className="space-y-6">
            <div className="group cursor-default">
              <div className="text-[11px] text-black font-bold uppercase tracking-widest mb-1 group-hover:text-green-500 transition-colors">Estimated Cost Saved</div>
              <div className="text-3xl font-black text-black">₹18.4 Lakh</div>
            </div>
            <div className="w-full h-px bg-white"></div>
            <div className="group cursor-default">
              <div className="text-[11px] text-black font-bold uppercase tracking-widest mb-1 group-hover:text-blue-500 transition-colors">Citizen Time Saved</div>
              <div className="text-3xl font-black text-black">12,400 <span className="text-lg text-black font-bold">Hrs</span></div>
            </div>
          </div>
        </motion.div>

        {/* Social Impact */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="font-extrabold text-sm text-black uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 p-2 rounded-xl"><Users size={16} /></span> ECOSYSTEM ENGAGEMENT
          </h3>
          <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.02 }} className="flex justify-between items-center border border-blue-100 p-4 rounded-xl bg-white cursor-pointer hover:bg-blue-50 transition-colors">
              <span className="font-bold text-black text-sm flex items-center gap-2"><GraduationCap size={16} className="text-blue-500"/> Students Engaged</span>
              <span className="font-black text-xl text-blue-600">340</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="flex justify-between items-center border border-blue-100 p-4 rounded-xl bg-white cursor-pointer hover:bg-blue-50 transition-colors">
              <span className="font-bold text-black text-sm flex items-center gap-2"><Building size={16} className="text-blue-500"/> Universities Involved</span>
              <span className="font-black text-xl text-blue-600">18</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="flex justify-between items-center border border-blue-100 p-4 rounded-xl bg-white cursor-pointer hover:bg-blue-50 transition-colors">
              <span className="font-bold text-black text-sm flex items-center gap-2"><Briefcase size={16} className="text-blue-500"/> Industry Partners</span>
              <span className="font-black text-xl text-blue-600">7</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Environmental Impact */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="font-extrabold text-sm text-black uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="bg-green-100 text-green-600 p-2 rounded-xl"><Recycle size={16} /></span> ENVIRONMENTAL IMPACT
          </h3>
          <div className="space-y-6">
            <div className="group cursor-default">
              <div className="text-[11px] text-black font-bold uppercase tracking-widest mb-1 group-hover:text-green-500 transition-colors">Waste Reduced</div>
              <div className="text-3xl font-black text-green-600">320 <span className="text-lg text-green-400 font-bold">Tons</span></div>
            </div>
            <div className="w-full h-px bg-white"></div>
            <div className="group cursor-default">
              <div className="text-[11px] text-black font-bold uppercase tracking-widest mb-1 group-hover:text-blue-500 transition-colors">Water Saved</div>
              <div className="text-3xl font-black text-blue-500">1.2M <span className="text-lg text-blue-300 font-bold">Litres</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
