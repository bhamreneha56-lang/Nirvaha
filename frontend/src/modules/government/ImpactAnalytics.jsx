import React from 'react';
import { BarChart3, Users, Leaf, IndianRupee } from 'lucide-react';

export default function ImpactAnalytics() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-black tracking-tight">Impact Analytics</h1>
          <p className="text-sm text-black font-medium">Quantify the real-world value of collaborative governance.</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
          <Users className="text-blue-500 mb-4" size={24} />
          <div className="text-3xl font-black text-black">42,500+</div>
          <div className="text-[10px] font-bold text-black uppercase tracking-widest mt-1">Citizens Benefited</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
          <BarChart3 className="text-green-500 mb-4" size={24} />
          <div className="text-3xl font-black text-black">142</div>
          <div className="text-[10px] font-bold text-black uppercase tracking-widest mt-1">Problems Solved</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
          <IndianRupee className="text-orange-500 mb-4" size={24} />
          <div className="text-3xl font-black text-black">₹8.4 Cr</div>
          <div className="text-[10px] font-bold text-black uppercase tracking-widest mt-1">CSR Funds Mobilized</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
          <Leaf className="text-green-500 mb-4" size={24} />
          <div className="text-3xl font-black text-black">12%</div>
          <div className="text-[10px] font-bold text-black uppercase tracking-widest mt-1">Emissions Reduced (Simulated)</div>
        </div>
      </div>

      <div className="bg-white flex-1 rounded-xl shadow-sm border border-blue-100 flex items-center justify-center">
        <p className="text-black font-bold text-sm">Interactive Impact Charts & ESG Reports Render Here</p>
      </div>
    </div>
  );
}
