# -*- coding: utf-8 -*-
content = '''import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import SidebarLayout from '../shared/SidebarLayout';
import { LayoutDashboard, Compass, Users, Briefcase, BarChart2, Building, Search, Bell, Target, TrendingUp, Award, Clock } from 'lucide-react';

export default function IndustryDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { state } = useSimulation();
  const { projects = [], problems = [] } = state;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'discover', label: 'Discover', icon: 'Search' },
    { id: 'collaborations', label: 'Collaborations', icon: 'Users' },
    { id: 'opportunities', label: 'Opportunities', icon: 'Briefcase' },
    { id: 'analytics', label: 'Impact & Analytics', icon: 'BarChart2' },
    { id: 'organisation', label: 'Organisation', icon: 'Building' },
  ];

  const renderContent = () => {
    return (
      <div className="flex flex-col gap-6 p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Industry & CSR Dashboard</h1>
            <p className="text-sm text-slate-500 font-medium">Real-time university project matching and CSR metrics</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search projects, CSR, tech..." className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-orange-500" />
            </div>
            <button className="relative p-2 text-slate-400 hover:text-slate-600">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1">
              <button className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-md">Official</button>
              <button className="px-3 py-1 text-slate-500 hover:text-slate-800 text-xs font-bold rounded-md">Admin</button>
            </div>
            <button className="px-3 py-1.5 border border-slate-200 bg-white text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50">EN / HI</button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 rounded-2xl p-8 text-white flex justify-between shadow-lg relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10 max-w-xl">
            <span className="inline-block px-3 py-1 bg-white/10 text-orange-400 font-bold text-[10px] tracking-wider uppercase rounded mb-4 backdrop-blur-sm border border-white/5">Corporate CSR Portal</span>
            <h2 className="text-3xl font-black mb-3 text-white">Good morning, Tata Steel Foundation</h2>
            <p className="text-indigo-200 text-sm mb-8 leading-relaxed">Discover high-impact university projects and build meaningful collaborations across Jharkhand.</p>
            
            <div className="flex gap-4">
              <button className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold text-sm hover:from-orange-600 hover:to-orange-700 transition shadow-lg shadow-orange-500/20">Explore Projects</button>
              <button className="px-6 py-2.5 bg-white/10 text-white border border-white/20 rounded-lg font-bold text-sm hover:bg-white/20 transition backdrop-blur-sm">Post a Challenge</button>
            </div>
          </div>
          
          <div className="relative z-10 flex items-center pr-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md text-center flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-2">Impact Scorecard</span>
              <div className="text-5xl font-black text-white mb-2 tracking-tight">94.8</div>
              <span className="text-xs text-indigo-200 font-medium">Top 5% CSR Contributor in Jharkhand</span>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div>
          <h3 className="font-bold text-slate-800 mb-4">Platform Impact KPIs</h3>
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-slate-500">Active Collaborations</span>
                <Users size={16} className="text-orange-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 mb-2">8</div>
              <div className="flex items-center gap-1 text-[10px] font-bold">
                <span className="text-green-500 bg-green-50 px-1.5 py-0.5 rounded">+2 this month</span>
                <span className="text-slate-400">Projects in progress</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-slate-500">Funding Committed</span>
                <span className="text-green-500 font-bold">$</span>
              </div>
              <div className="text-2xl font-black text-slate-900 mb-2">₹1.45 Cr</div>
              <div className="flex items-center gap-1 text-[10px] font-bold">
                <span className="text-green-500 bg-green-50 px-1.5 py-0.5 rounded">+18%</span>
                <span className="text-slate-400">Milestone escrow protected</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-slate-500">Projects Supported</span>
                <Building size={16} className="text-blue-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 mb-2">14</div>
              <div className="flex items-center gap-1 text-[10px] font-bold">
                <span className="text-green-500 bg-green-50 px-1.5 py-0.5 rounded">+4</span>
                <span className="text-slate-400">Across 5 universities</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-slate-500">Mentorship Hours</span>
                <Users size={16} className="text-purple-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 mb-2">240 Hrs</div>
              <div className="flex items-center gap-1 text-[10px] font-bold">
                <span className="text-green-500 bg-green-50 px-1.5 py-0.5 rounded">+35 hrs</span>
                <span className="text-slate-400">By senior engineers</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-slate-500">CSR Impact</span>
                <Award size={16} className="text-orange-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 mb-2">45,000+</div>
              <div className="flex items-center gap-1 text-[10px] font-bold">
                <span className="text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">High Impact</span>
                <span className="text-slate-400">Lives directly benefited</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommended Projects */}
        <div>
          <div className="mb-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              AI Recommended High-Impact Projects
            </h3>
            <p className="text-xs text-slate-500 font-medium">Matched using domain fit, CSR mandate alignment, funding capacity, and geographic target.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {projects.slice(0, 4).map((proj, idx) => {
               const prob = problems.find(p => p.id === proj.problemId) || {};
               return (
                <div key={proj.id || idx} className="bg-white p-6 border border-slate-200 rounded-xl hover:border-orange-400 cursor-pointer transition shadow-sm flex flex-col justify-between">
                   <div>
                     <div className="flex justify-between items-start mb-4">
                       <span className="px-2 py-1 bg-orange-50 text-orange-700 border border-orange-100 rounded-md font-bold text-[10px] tracking-wide uppercase">{prob.category || 'Domain'} - {proj.university || 'University'}</span>
                       <span className="text-xs font-black text-slate-600 bg-slate-50 px-2 py-1 rounded">Ask: INR {((proj.fundingRequired || 1500000)/100000).toFixed(1)}L</span>
                     </div>
                     <h3 className="font-black text-lg mb-2 text-slate-900">{proj.title}</h3>
                     <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">{prob.description ? prob.description.substring(0, 150) + '...' : 'University prototype ready for field testing.'}</p>
                   </div>
                   <div className="flex gap-3 mt-4">
                     <button className="flex-1 py-2.5 bg-slate-900 text-white rounded-lg font-bold text-xs hover:bg-black transition shadow-sm">Fund Project</button>
                     <button className="flex-1 py-2.5 border border-slate-200 bg-white text-slate-700 rounded-lg font-bold text-xs hover:bg-slate-50 transition shadow-sm">Offer Mentorship</button>
                   </div>
                </div>
               );
            })}
          </div>
        </div>
        
        {/* Padding at bottom */}
        <div className="h-10"></div>
      </div>
    );
  };

  return (
    <SidebarLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      roleTitle="Official"
      userName="Tata Steel Foundation"
      tabs={tabs}
    >
      {renderContent()}
    </SidebarLayout>
  );
}
'''

with open('frontend/src/modules/industry/IndustryDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Patched IndustryDashboard to match Pic 2')
