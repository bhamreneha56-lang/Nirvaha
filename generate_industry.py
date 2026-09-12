# -*- coding: utf-8 -*-
content = '''import React, { useState } from 'react';
import SidebarLayout from '../shared/SidebarLayout';
import { LayoutDashboard, Compass, Users, Briefcase, BarChart2, Building, Search, Bell, Target, TrendingUp, Award, Clock, CheckCircle2, ChevronRight, Activity, Zap, FileText } from 'lucide-react';

export default function IndustryDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [collabTab, setCollabTab] = useState('active');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'discover', label: 'Discover', icon: <Compass size={20} /> },
    { id: 'collaborations', label: 'Collaborations', icon: <Users size={20} /> },
    { id: 'opportunities', label: 'Opportunities', icon: <Briefcase size={20} /> },
    { id: 'analytics', label: 'Impact & Analytics', icon: <BarChart2 size={20} /> },
    { id: 'organisation', label: 'Organisation', icon: <Building size={20} /> },
  ];

  const renderDashboard = () => (
    <div className="flex flex-col gap-6 p-4">
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

      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 rounded-2xl p-8 text-white flex justify-between shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10 max-w-xl">
          <span className="inline-block px-3 py-1 bg-white/10 text-orange-400 font-bold text-[10px] tracking-wider uppercase rounded mb-4 backdrop-blur-sm border border-white/5">Corporate CSR Portal</span>
          <h2 className="text-3xl font-black mb-3 text-white">Good morning, Tata Steel Foundation</h2>
          <p className="text-indigo-200 text-sm mb-8 leading-relaxed">Discover high-impact university projects and build meaningful collaborations across Jharkhand.</p>
          <div className="flex gap-4">
            <button onClick={() => setActiveTab('discover')} className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold text-sm hover:from-orange-600 hover:to-orange-700 transition shadow-lg shadow-orange-500/20">Explore Projects</button>
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

      <div>
        <h3 className="font-bold text-slate-800 mb-4">Platform Impact KPIs</h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-slate-500">Active Collaborations</span><Users size={16} className="text-orange-500" /></div>
            <div className="text-2xl font-black text-slate-900 mb-2">8</div>
            <div className="flex items-center gap-1 text-[10px] font-bold"><span className="text-green-500 bg-green-50 px-1.5 py-0.5 rounded">+2 this month</span><span className="text-slate-400">Projects in progress</span></div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-slate-500">Funding Committed</span><span className="text-green-500 font-bold">$</span></div>
            <div className="text-2xl font-black text-slate-900 mb-2">?1.45 Cr</div>
            <div className="flex items-center gap-1 text-[10px] font-bold"><span className="text-green-500 bg-green-50 px-1.5 py-0.5 rounded">+18%</span><span className="text-slate-400">Milestone escrow protected</span></div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-slate-500">Projects Supported</span><Building size={16} className="text-blue-500" /></div>
            <div className="text-2xl font-black text-slate-900 mb-2">14</div>
            <div className="flex items-center gap-1 text-[10px] font-bold"><span className="text-green-500 bg-green-50 px-1.5 py-0.5 rounded">+4</span><span className="text-slate-400">Across 5 universities</span></div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-slate-500">Mentorship Hours</span><Users size={16} className="text-purple-500" /></div>
            <div className="text-2xl font-black text-slate-900 mb-2">240 Hrs</div>
            <div className="flex items-center gap-1 text-[10px] font-bold"><span className="text-green-500 bg-green-50 px-1.5 py-0.5 rounded">+35 hrs</span><span className="text-slate-400">By senior engineers</span></div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-slate-500">CSR Impact</span><Award size={16} className="text-orange-500" /></div>
            <div className="text-2xl font-black text-slate-900 mb-2">45,000+</div>
            <div className="flex items-center gap-1 text-[10px] font-bold"><span className="text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">High Impact</span><span className="text-slate-400">Lives directly benefited</span></div>
          </div>
        </div>
      </div>
    </div>
  );
'''

with open('generate_industry.py', 'w', encoding='utf-8') as f:
    f.write(content)
