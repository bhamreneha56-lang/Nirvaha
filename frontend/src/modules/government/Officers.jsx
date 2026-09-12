import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { MapPin, Search, Filter, Download, Phone, Mail, Zap, FileText, X, CheckCircle2, AlertTriangle, RefreshCw, Award, Users, Target } from 'lucide-react';

const ALL_OFFICERS = [
  { id:'O-001', name:'Rajesh Kumar Singh', dept:'PHED Water', skill:'Water Supply & Borewell', district:'Ranchi', workload:72, cases:28, resolved:412, rating:4.6, status:'ACTIVE', phone:'+91 94311 20001', email:'o001@jharkhand.gov.in', exp:'8 yrs', rank:'Senior Officer' },
  { id:'O-002', name:'Priya Mehta', dept:'Health', skill:'Primary Health Centre', district:'Dhanbad', workload:45, cases:18, resolved:298, rating:4.8, status:'ACTIVE', phone:'+91 94311 20002', email:'o002@jharkhand.gov.in', exp:'5 yrs', rank:'Field Officer' },
  { id:'O-003', name:'Manoj Kumar Jha', dept:'Roads', skill:'Road Repair & Bridges', district:'Bokaro', workload:91, cases:44, resolved:189, rating:3.9, status:'OVERLOADED', phone:'+91 94311 20003', email:'o003@jharkhand.gov.in', exp:'12 yrs', rank:'Chief Officer' },
  { id:'O-004', name:'Sunita Oraon', dept:'Education', skill:'School Infrastructure', district:'Palamu', workload:38, cases:12, resolved:340, rating:4.7, status:'ACTIVE', phone:'+91 94311 20004', email:'o004@jharkhand.gov.in', exp:'6 yrs', rank:'Field Officer' },
  { id:'O-005', name:'Bikram Pandey', dept:'JBVNL Electricity', skill:'Grid & Transformer Repair', district:'East Singhbhum', workload:88, cases:35, resolved:221, rating:4.1, status:'OVERLOADED', phone:'+91 94311 20005', email:'o005@jharkhand.gov.in', exp:'9 yrs', rank:'Senior Officer' },
  { id:'O-006', name:'Kavita Devi', dept:'Waste', skill:'Urban Waste Management', district:'Hazaribagh', workload:55, cases:21, resolved:375, rating:4.4, status:'ACTIVE', phone:'+91 94311 20006', email:'o006@jharkhand.gov.in', exp:'7 yrs', rank:'Field Officer' },
  { id:'O-007', name:'Arjun Sahu', dept:'Agriculture', skill:'Crop Insurance & PM-KISAN', district:'Garhwa', workload:29, cases:9, resolved:418, rating:4.9, status:'ACTIVE', phone:'+91 94311 20007', email:'o007@jharkhand.gov.in', exp:'11 yrs', rank:'Senior Officer' },
  { id:'O-008', name:'Nita Kumari', dept:'Revenue', skill:'Land Mutation & Records', district:'Ranchi', workload:65, cases:24, resolved:267, rating:4.2, status:'ACTIVE', phone:'+91 94311 20008', email:'o008@jharkhand.gov.in', exp:'4 yrs', rank:'Field Officer' },
  { id:'O-009', name:'Ravi Shankar Prasad', dept:'PHED Water', skill:'Sewage & Drainage', district:'Dumka', workload:43, cases:16, resolved:301, rating:4.5, status:'ACTIVE', phone:'+91 94311 20009', email:'o009@jharkhand.gov.in', exp:'6 yrs', rank:'Field Officer' },
  { id:'O-010', name:'Deepak Yadav', dept:'Roads', skill:'Pothole & Street Light', district:'Giridih', workload:78, cases:31, resolved:198, rating:3.8, status:'OVERLOADED', phone:'+91 94311 20010', email:'o010@jharkhand.gov.in', exp:'3 yrs', rank:'Junior Officer' },
  { id:'O-011', name:'Lakshmi Murmu', dept:'Health', skill:'Ambulance & Medicine', district:'Deoghar', workload:22, cases:8, resolved:519, rating:4.9, status:'ACTIVE', phone:'+91 94311 20011', email:'o011@jharkhand.gov.in', exp:'14 yrs', rank:'Chief Officer' },
  { id:'O-012', name:'Santosh Mahato', dept:'JBVNL Electricity', skill:'New Connection & Billing', district:'West Singhbhum', workload:60, cases:22, resolved:244, rating:4.0, status:'ACTIVE', phone:'+91 94311 20012', email:'o012@jharkhand.gov.in', exp:'7 yrs', rank:'Field Officer' },
];

const DEPT_CLS = {
  'PHED Water':'bg-blue-100 text-blue-700 border-blue-200','Health':'bg-emerald-100 text-emerald-700 border-emerald-200','Roads':'bg-orange-100 text-orange-700 border-orange-200',
  'Education':'bg-purple-100 text-purple-700 border-purple-200','Waste':'bg-amber-100 text-amber-700 border-amber-200','JBVNL Electricity':'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Agriculture':'bg-lime-100 text-lime-700 border-lime-200','Revenue':'bg-red-100 text-red-700 border-red-200',
};
const STATUS_CLS = { ACTIVE:'bg-green-50 text-green-700 border-green-200', OVERLOADED:'bg-red-50 text-red-700 border-red-200' };

export default function Officers() {
  const { dispatch } = useSimulation();
  const [q, setQ] = useState('');
  const [deptF, setDeptF] = useState('All');
  const [statF, setStatF] = useState('All');
  const [sortBy, setSortBy] = useState('workload');
  const [sel, setSel] = useState(null);

  const depts = ['All', ...Array.from(new Set(ALL_OFFICERS.map(o=>o.dept)))];
  const filtered = ALL_OFFICERS.filter(o=>{
    const mQ = o.name.toLowerCase().includes(q.toLowerCase()) || o.id.toLowerCase().includes(q.toLowerCase()) || o.district.toLowerCase().includes(q.toLowerCase());
    const mD = deptF==='All' || o.dept===deptF;
    const mS = statF==='All' || o.status===statF;
    return mQ && mD && mS;
  }).sort((a,b)=>sortBy==='workload'?b.workload-a.workload:sortBy==='rating'?b.rating-a.rating:b.cases-a.cases);

  const totActive = ALL_OFFICERS.filter(o=>o.status==='ACTIVE').length;
  const overloaded = ALL_OFFICERS.filter(o=>o.status==='OVERLOADED').length;
  const avgWorkload = Math.round(ALL_OFFICERS.reduce((s,o)=>s+o.workload,0)/ALL_OFFICERS.length);
  const totResolved = ALL_OFFICERS.reduce((s,o)=>s+o.resolved,0);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-4">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-black text-slate-900 tracking-tight">Field Officers Command</h1><p className="text-sm text-slate-500">Manage deployment, workload, and performance of {ALL_OFFICERS.length} government officers.</p></div>
        <div className="flex items-center gap-3">
          <button onClick={()=>dispatch({type:'ADD_TOAST',payload:{title:'Smart Deployment Activated',message:'AI optimising officer routes across Jharkhand.',type:'success'}})} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm"><Zap size={14}/> Smart Deployment</button>
          <button onClick={()=>dispatch({type:'ADD_TOAST',payload:{title:'Report Exported',message:'Officer performance report generated.',type:'info'}})} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-black shadow-sm"><Download size={14}/> Export</button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 shrink-0">
        {[{l:'Active Officers',v:totActive,icon:<CheckCircle2 size={18} className="text-green-500"/>,sub:'Online & available'},{l:'Overloaded Officers',v:overloaded,icon:<AlertTriangle size={18} className="text-red-500"/>,sub:'Workload > 85%',red:true},{l:'Avg Workload',v:avgWorkload+'%',icon:<RefreshCw size={18} className="text-blue-500"/>,sub:'State average'},{l:'Total Resolved',v:totResolved.toLocaleString(),icon:<Award size={18} className="text-amber-500"/>,sub:'All-time cases resolved'}].map(k=>(
          <div key={k.l} className={`p-5 rounded-2xl border shadow-sm ${k.red?'bg-red-50/40 border-red-200':'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-3">{k.icon}<span className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-right leading-tight">{k.l}</span></div>
            <div className={`text-3xl font-black ${k.red?'text-red-600':'text-slate-900'}`}>{k.v}</div>
            <div className="text-[10px] text-slate-400 mt-1">{k.sub}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 min-h-0 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center gap-3 flex-wrap shrink-0">
          <div className="relative flex-1 min-w-[180px]"><Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search name, ID, district..." className="pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-white shadow-sm outline-none focus:border-blue-400 w-full"/></div>
          <select value={deptF} onChange={e=>setDeptF(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-700 bg-white shadow-sm outline-none">{depts.map(d=><option key={d}>{d}</option>)}</select>
          <select value={statF} onChange={e=>setStatF(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-700 bg-white shadow-sm outline-none">{['All','ACTIVE','OVERLOADED'].map(s=><option key={s}>{s}</option>)}</select>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-700 bg-white shadow-sm outline-none">
            <option value="workload">Sort: Workload</option><option value="rating">Sort: Rating</option><option value="cases">Sort: Cases</option>
          </select>
          <span className="text-[11px] font-bold text-slate-400 ml-auto">{filtered.length}/{ALL_OFFICERS.length}</span>
        </div>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left">
            <thead className="bg-white sticky top-0 z-10 shadow-sm"><tr>{['Officer','Department','District','Workload','Cases','Resolved','Rating','Status','Action'].map(h=><th key={h} className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(o=>(
                <tr key={o.id} onClick={()=>setSel(o)} className="hover:bg-slate-50 cursor-pointer transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-sm shrink-0">{o.name[0]}</div><div><div className="text-sm font-bold text-slate-900">{o.name}</div><div className="text-[10px] font-bold text-slate-400 uppercase">{o.id} - {o.rank}</div></div></div></td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 text-[10px] font-bold rounded border ${DEPT_CLS[o.dept]||'bg-slate-100 text-slate-700 border-slate-200'}`}>{o.dept}</span></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1 text-xs font-bold text-slate-700"><MapPin size={10} className="text-slate-400"/>{o.district}</div></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${o.workload>85?'bg-red-500':o.workload>60?'bg-orange-400':'bg-green-500'}`} style={{width:o.workload+'%'}}/></div><span className={`text-xs font-black ${o.workload>85?'text-red-600':'text-slate-700'}`}>{o.workload}%</span></div></td>
                  <td className="px-4 py-3 font-bold text-slate-800">{o.cases}</td>
                  <td className="px-4 py-3 font-bold text-green-700">{o.resolved.toLocaleString()}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1"><span className="text-amber-400 text-sm">&#9733;</span><span className="text-sm font-black text-slate-800">{o.rating}</span></div></td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 text-[10px] font-black uppercase rounded border ${STATUS_CLS[o.status]}`}>{o.status}</span></td>
                  <td className="px-4 py-3"><div className="flex gap-1"><button onClick={e=>{e.stopPropagation();setSel(o);}} className="px-2 py-1 text-[10px] font-bold rounded border border-slate-200 text-slate-700 bg-white hover:bg-slate-50">View</button><button onClick={e=>{e.stopPropagation();dispatch({type:'ADD_TOAST',payload:{title:'Officer Assigned',message:o.name+' dispatched to new case.',type:'success'}});}} className="px-2 py-1 text-[10px] font-bold rounded border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100">Assign</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {sel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm" onClick={()=>setSel(null)}>
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg mx-4 max-h-[90vh] overflow-auto" onClick={e=>e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50 relative">
              <button onClick={()=>setSel(null)} className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-full text-slate-400 text-lg font-bold"><X size={18}/></button>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-md">{sel.name[0]}</div>
                <div>
                  <div className="text-xl font-black text-slate-900">{sel.name}</div>
                  <div className="text-xs text-slate-500">{sel.id} - {sel.rank} - {sel.exp}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-0.5 text-[10px] font-black rounded border ${STATUS_CLS[sel.status]}`}>{sel.status}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${DEPT_CLS[sel.dept]||'bg-slate-100 text-slate-700 border-slate-200'}`}>{sel.dept}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Contact</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-600"><Phone size={11}/> {sel.phone}</div>
                  <div className="flex items-center gap-2 text-xs text-slate-600"><Mail size={11}/> {sel.email}</div>
                  <div className="flex items-center gap-2 text-xs text-slate-600"><MapPin size={11}/> {sel.district} District</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[{l:'Current Cases',v:sel.cases,c:'text-slate-900'},{l:'Total Resolved',v:sel.resolved.toLocaleString(),c:'text-green-600'},{l:'Rating',v:'&#9733; '+sel.rating,c:'text-amber-500'}].map(s=>(
                  <div key={s.l} className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-center"><div className={`text-xl font-black ${s.c}`} dangerouslySetInnerHTML={{__html:s.v}}/><div className="text-[9px] font-bold text-slate-400 uppercase mt-1">{s.l}</div></div>
                ))}
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-2"><span>Workload</span><span className={sel.workload>85?'text-red-600':'text-green-600'}>{sel.workload}%</span></div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${sel.workload>85?'bg-red-500':sel.workload>60?'bg-orange-400':'bg-green-500'}`} style={{width:sel.workload+'%'}}/></div>
                {sel.workload>85 && <p className="text-[10px] text-red-600 font-bold mt-1">Officer capacity exceeded - reassignment recommended.</p>}
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <div className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1">Expertise</div>
                <div className="text-sm font-bold text-slate-900">{sel.skill}</div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <button onClick={()=>dispatch({type:'ADD_TOAST',payload:{title:'Officer Assigned',message:sel.name+' assigned to selected case.',type:'success'}})} className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-blue-200 text-sm font-bold text-blue-700 bg-blue-50 hover:bg-blue-100"><Target size={14}/> Assign to Case</button>
                <button onClick={()=>dispatch({type:'ADD_TOAST',payload:{title:'Route Optimised',message:'Optimal route calculated for '+sel.name+'.',type:'info'}})} className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-green-200 text-sm font-bold text-green-700 bg-green-50 hover:bg-green-100"><MapPin size={14}/> View on Map</button>
                <button onClick={()=>dispatch({type:'ADD_TOAST',payload:{title:'Performance Report',message:'Generating report for '+sel.name+'...',type:'info'}})} className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 bg-slate-50 hover:bg-slate-100"><FileText size={14}/> Performance</button>
                <button onClick={()=>{setSel(null);dispatch({type:'ADD_TOAST',payload:{title:'Escalation Raised',message:'Workload concern for '+sel.name+' escalated.',type:'warning'}});}} className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-red-200 text-sm font-bold text-red-700 bg-red-50 hover:bg-red-100"><AlertTriangle size={14}/> Escalate</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}