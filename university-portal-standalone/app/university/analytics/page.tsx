"use client";
import { domainPerformance, quarterlyData, fundingData, disciplineCombo, university } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, PieChart, Pie, Cell, ReferenceLine, CartesianGrid } from "recharts";
import { Download, TrendingUp } from "lucide-react";

const COLORS = ["#6366f1","#22c55e","#f59e0b","#ef4444","#8b5cf6"];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Analytics</h1>
          <p className="text-sm text-slate-500 mt-0.5">BIT Mesra · Performance deep-dive</p>
        </div>
        <button className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold hover:bg-slate-50 transition-all">
          <Download size={14}/> Export Report {/* TODO: real PDF export */}
        </button>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Overall Success Rate", value: `${university.successRate}%`, sub: `+13% vs state avg`, color: "text-green-600", bg: "bg-green-50" },
          { label: "Problems Completed", value: university.problemsCompleted, sub: "Since 2022", color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Total Funding Received", value: "₹1.12 Cr", sub: "Across 6 active projects", color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Strongest Domain", value: "E-Governance", sub: "95% success rate", color: "text-violet-600", bg: "bg-violet-50" },
        ].map(k => (
          <div key={k.label} className={`${k.bg} rounded-xl p-4`}>
            <p className={`text-2xl font-black ${k.color}`}>{k.value}</p>
            <p className="text-xs font-bold text-slate-700 mt-1">{k.label}</p>
            <p className="text-xs text-slate-500">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Domain performance bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-indigo-500"/> Domain-Wise Success Rate vs State Average</h3>
        {/* TODO: replace with GET /api/analytics/domain-performance */}
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={domainPerformance} margin={{top:5,right:20,left:0,bottom:60}}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
            <XAxis dataKey="domain" tick={{fontSize:10,fill:"#64748b"}} angle={-40} textAnchor="end" interval={0}/>
            <YAxis domain={[0,100]} tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={{fontSize:12,borderRadius:8,border:"1px solid #e2e8f0"}} formatter={(v:any,n:any) => [`${v}%`, n==="successRate"?"BIT Mesra":"State Avg"]}/>
            <Legend wrapperStyle={{fontSize:12, paddingTop:50}} formatter={(v) => v==="successRate"?"BIT Mesra Success Rate":"State Average"}/>
            <Bar dataKey="successRate" name="successRate" fill="#6366f1" radius={[4,4,0,0]}/>
            <Bar dataKey="stateAvg" name="stateAvg" fill="#cbd5e1" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Timeline: Accepted vs Completed */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Projects Accepted vs Completed per Quarter</h3>
          {/* TODO: replace with GET /api/analytics/quarterly-performance */}
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={quarterlyData} margin={{top:5,right:10,left:0,bottom:5}}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
              <XAxis dataKey="quarter" tick={{fontSize:10,fill:"#64748b"}}/>
              <YAxis tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{fontSize:12,borderRadius:8}}/>
              <Legend wrapperStyle={{fontSize:11}}/>
              <Bar dataKey="accepted" name="Accepted" fill="#a5b4fc" radius={[3,3,0,0]}/>
              <Bar dataKey="completed" name="Completed" fill="#22c55e" radius={[3,3,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Team composition */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Team Composition & Success Rates</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="55%" height={200}>
              <PieChart>
                <Pie data={disciplineCombo} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({name})=>name}>
                  {disciplineCombo.map((_,i) => <Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                </Pie>
                <Tooltip formatter={(v:any,n:any,p:any) => [`${p.payload.successRate}% success`, p.name]}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {disciplineCombo.map((d,i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{background:COLORS[i%COLORS.length]}}/>
                  <span className="text-xs text-slate-600 flex-1">{d.name}</span>
                  <span className={`text-xs font-bold ${d.successRate>=80?"text-green-600":d.successRate>=60?"text-amber-600":"text-red-500"}`}>{d.successRate}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Funding trend */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Funding Received Over Time (₹)</h3>
        {/* TODO: replace with GET /api/analytics/funding-history */}
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={fundingData} margin={{top:5,right:20,left:0,bottom:5}}>
            <defs>
              <linearGradient id="fundGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
            <XAxis dataKey="quarter" tick={{fontSize:10,fill:"#64748b"}}/>
            <YAxis tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} tickFormatter={v=>`₹${(v/100000).toFixed(0)}L`}/>
            <Tooltip contentStyle={{fontSize:12,borderRadius:8}} formatter={(v:any) => [`₹${(v/100000).toFixed(1)}L`,"Funding"]}/>
            <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2.5} fill="url(#fundGrad)" dot={{fill:"#6366f1",r:4}}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
