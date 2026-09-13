import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Database, AlertTriangle, Users, TrendingUp, Filter, Download, ChevronRight, X, Phone, Mail, Zap, FileText, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const DEPTS = [
  { id:'PHED', name:'PHED - Water & Sanitation', head:'Rakesh Gupta, IAS', phone:'+91 94311 10001', email:'phed@jharkhand.gov.in', active:1284, closed:8912, critical:84, sla:88, officers:42, rating:4.1, budget:'142 Cr', budgetPct:68, districts:['Ranchi','Dhanbad','East Singhbhum'], cats:['Water Supply','Sewage','Drainage','Borewell'], trend:'up', trendPct:3.2, color:'blue', av:'W' },
  { id:'ROADS', name:'Roads & Infrastructure', head:'Sunil Tiwari, IAS', phone:'+91 94311 10002', email:'roads@jharkhand.gov.in', active:1017, closed:7481, critical:112, sla:81, officers:38, rating:3.8, budget:'210 Cr', budgetPct:82, districts:['Bokaro','Hazaribagh','Giridih'], cats:['Road Repair','Pothole','Bridge','Street Light'], trend:'down', trendPct:1.4, color:'orange', av:'R' },
  { id:'HEALTH', name:'Health & Family Welfare', head:'Dr. Priya Sinha, IAS', phone:'+91 94311 10003', email:'health@jharkhand.gov.in', active:812, closed:6124, critical:45, sla:95, officers:65, rating:4.5, budget:'185 Cr', budgetPct:55, districts:['Ranchi','Deoghar','Dumka'], cats:['Hospital','PHC','Ambulance','Medicine'], trend:'up', trendPct:6.1, color:'green', av:'H' },
  { id:'EDU', name:'Education Department', head:'Arjun Mahto, IAS', phone:'+91 94311 10004', email:'edu@jharkhand.gov.in', active:628, closed:4210, critical:12, sla:90, officers:28, rating:4.3, budget:'96 Cr', budgetPct:44, districts:['Palamu','Lohardaga','Gumla'], cats:['School Building','Teacher','Scholarship','Mid-Day Meal'], trend:'up', trendPct:2.8, color:'purple', av:'E' },
  { id:'WASTE', name:'Urban Dev & Waste Mgmt', head:'Kavita Das, IPS', phone:'+91 94311 10005', email:'udd@jharkhand.gov.in', active:741, closed:5037, critical:67, sla:87, officers:34, rating:4.0, budget:'78 Cr', budgetPct:61, districts:['Dhanbad','Bokaro','Giridih'], cats:['Garbage','Public Toilet','Drainage','Sanitation'], trend:'down', trendPct:0.9, color:'orange', av:'U' },
  { id:'JBVNL', name:'JBVNL - Electricity', head:'Vikas Ranjan, IAS', phone:'+91 94311 10006', email:'jbvnl@jharkhand.gov.in', active:942, closed:6851, critical:104, sla:82, officers:51, rating:3.9, budget:'160 Cr', budgetPct:74, districts:['East Singhbhum','West Singhbhum','Bokaro'], cats:['Power Outage','Transformer','New Connection','Billing'], trend:'up', trendPct:1.7, color:'yellow', av:'J' },
  { id:'AGRI', name:'Agriculture & Farmers', head:'Ram Prasad Singh, IAS', phone:'+91 94311 10007', email:'agri@jharkhand.gov.in', active:412, closed:2895, critical:22, sla:92, officers:31, rating:4.2, budget:'118 Cr', budgetPct:39, districts:['Palamu','Garhwa','Chatra'], cats:['Crop Insurance','Irrigation','PM-KISAN','Seeds'], trend:'up', trendPct:4.0, color:'lime', av:'A' },
  { id:'REV', name:'Revenue & Land Records', head:'Nisha Kumari, IAS', phone:'+91 94311 10008', email:'revenue@jharkhand.gov.in', active:589, closed:3712, critical:38, sla:79, officers:44, rating:3.7, budget:'52 Cr', budgetPct:57, districts:['Ranchi','Hazaribagh','Ramgarh'], cats:['Land Dispute','Mutation','Jamabandi','Encroachment'], trend:'down', trendPct:2.1, color:'orange', av:'L' },
];

const CM = {
  blue:'bg-blue-50 border-blue-200 text-blue-700',orange:'bg-orange-50 border-orange-200 text-orange-700',
  green:'bg-green-50 border-green-200 text-green-700',purple:'bg-blue-200 border-blue-300 text-blue-600',
  orange:'bg-orange-50 border-orange-200 text-orange-700',yellow:'bg-yellow-50 border-yellow-200 text-yellow-700',
  lime:'bg-lime-50 border-lime-200 text-lime-700',orange:'bg-orange-50 border-orange-200 text-orange-700',
};
const DOT = { blue:'bg-blue-500',orange:'bg-orange-500',green:'bg-green-500',purple:'bg-blue-200',orange:'bg-orange-500',yellow:'bg-yellow-500',lime:'bg-lime-500',orange:'bg-orange-500' };

export default function Departments() {
  const { dispatch } = useSimulation();
  const [view, setView] = useState('grid');
  const [sel, setSel] = useState(null);
  const [q, setQ] = useState('');
  const list = DEPTS.filter(d => d.name.toLowerCase().includes(q.toLowerCase()) || d.id.toLowerCase().includes(q.toLowerCase()));
  const totActive = DEPTS.reduce((s,d)=>s+d.active,0);
  const totCritical = DEPTS.reduce((s,d)=>s+d.critical,0);
  const avgSLA = Math.round(DEPTS.reduce((s,d)=>s+d.sla,0)/DEPTS.length);
  const totOfficers = DEPTS.reduce((s,d)=>s+d.officers,0);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-4">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-black text-black tracking-tight">Department Control Room</h1><p className="text-sm text-black">Monitor performance, SLA compliance, and capacity across 8 agencies.</p></div>
        <div className="flex items-center gap-3">
          <div className="relative"><Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." className="pl-8 pr-3 py-2 border border-blue-100 rounded-lg text-sm bg-white shadow-sm outline-none focus:border-blue-400 w-44"/></div>
          <div className="flex border border-blue-100 rounded-lg overflow-hidden">
            <button onClick={()=>setView('grid')} className={`px-3 py-2 text-xs font-bold ${view==='grid'?'bg-blue-600 text-white':'bg-white text-black'}`}>Cards</button>
            <button onClick={()=>setView('table')} className={`px-3 py-2 text-xs font-bold ${view==='table'?'bg-blue-600 text-white':'bg-white text-black'}`}>Table</button>
          </div>
          <button onClick={()=>dispatch({type:'ADD_TOAST',payload:{title:'Report Exported',message:'Department performance PDF generated.',type:'success'}})} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-600 shadow-sm"><Download size={14}/> Export</button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 shrink-0">
        {[{l:'Total Active Cases',v:totActive.toLocaleString(),icon:<Database size={18} className="text-blue-500"/>,sub:'All departments'},{l:'Critical Escalations',v:totCritical,icon:<AlertTriangle size={18} className="text-orange-500"/>,sub:'Need action',orange:true},{l:'Avg SLA Compliance',v:avgSLA+'%',icon:<TrendingUp size={18} className="text-green-500"/>,sub:'State average'},{l:'Field Officers',v:totOfficers,icon:<Users size={18} className="text-blue-600"/>,sub:'Deployed state-wide'}].map(k=>(
          <div key={k.l} className={`p-5 rounded-2xl border shadow-sm ${k.orange?'bg-orange-50/40 border-orange-200':'bg-white border-blue-100'}`}>
            <div className="flex items-center justify-between mb-3">{k.icon}<span className="text-[10px] font-black text-black uppercase tracking-widest text-right">{k.l}</span></div>
            <div className={`text-3xl font-black ${k.orange?'text-orange-600':'text-black'}`}>{k.v}</div>
            <div className="text-[10px] text-black mt-1">{k.sub}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        {view==='grid' ? (
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 pb-4">
            {list.map(d=>(
              <div key={d.id} onClick={()=>setSel(d)} className="bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-1 ${DOT[d.color]}`}/>
                <div className="p-5 pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-sm font-black shrink-0 ${CM[d.color]}`}>{d.av}</div>
                    <div><div className="text-sm font-bold text-black leading-tight">{d.name}</div><div className="text-[10px] text-black mt-0.5">{d.head}</div></div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center bg-white rounded-lg p-2 border border-blue-100"><div className="text-sm font-black text-black">{d.active.toLocaleString()}</div><div className="text-[9px] font-bold text-black uppercase">Active</div></div>
                    <div className="text-center bg-orange-50 rounded-lg p-2 border border-orange-100"><div className="text-sm font-black text-orange-600">{d.critical}</div><div className="text-[9px] font-bold text-orange-400 uppercase">Critical</div></div>
                    <div className="text-center bg-white rounded-lg p-2 border border-blue-100"><div className="text-sm font-black text-black">{d.officers}</div><div className="text-[9px] font-bold text-black uppercase">Officers</div></div>
                  </div>
                  <div className="mb-2"><div className="flex justify-between mb-1"><span className="text-[10px] font-bold text-black">SLA</span><span className={`text-[10px] font-black ${d.sla<85?'text-orange-600':'text-green-600'}`}>{d.sla}%</span></div><div className="h-1.5 bg-white rounded-full overflow-hidden"><div className={`h-full rounded-full ${d.sla<85?'bg-orange-400':'bg-green-500'}`} style={{width:d.sla+'%'}}/></div></div>
                  <div className="mb-3"><div className="flex justify-between mb-1"><span className="text-[10px] font-bold text-black">Budget ({d.budget})</span><span className="text-[10px] font-black text-black">{d.budgetPct}%</span></div><div className="h-1.5 bg-white rounded-full overflow-hidden"><div className={`h-full rounded-full ${d.budgetPct>80?'bg-orange-400':'bg-blue-400'}`} style={{width:d.budgetPct+'%'}}/></div></div>
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-1 text-[11px] font-bold ${d.trend==='up'?'text-green-600':'text-orange-500'}`}>{d.trend==='up'?<ArrowUpRight size={12}/>:<ArrowDownRight size={12}/>}{d.trendPct}%</div>
                    <div className="text-xs font-bold text-black">&#9733; {d.rating}</div>
                  </div>
                  <button onClick={e=>{e.stopPropagation();setSel(d);}} className={`mt-3 w-full py-1.5 rounded-lg text-[11px] font-bold border flex items-center justify-center gap-1 ${CM[d.color]}`}>View Details <ChevronRight size={12}/></button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white border-b border-blue-100"><tr>{['Dept','Head','Active','Critical','SLA','Budget','Officers','Rating',''].map(h=><th key={h} className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-black">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-slate-100">
                {list.map(d=>(
                  <tr key={d.id} onClick={()=>setSel(d)} className="hover:bg-white cursor-pointer">
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><div className={`w-7 h-7 rounded-lg border text-xs font-black flex items-center justify-center ${CM[d.color]}`}>{d.av}</div><span className="text-sm font-bold text-black">{d.name}</span></div></td>
                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{d.head}</td>
                    <td className="px-4 py-3 font-bold text-black">{d.active.toLocaleString()}</td>
                    <td className="px-4 py-3 font-black text-orange-600">{d.critical}</td>
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-14 h-2 bg-white rounded-full overflow-hidden"><div className={`h-full ${d.sla<85?'bg-orange-400':'bg-green-500'} rounded-full`} style={{width:d.sla+'%'}}/></div><span className="text-xs font-bold">{d.sla}%</span></div></td>
                    <td className="px-4 py-3 text-xs font-bold text-black">{d.budget}</td>
                    <td className="px-4 py-3 font-bold text-black">{d.officers}</td>
                    <td className="px-4 py-3 text-xs font-bold text-orange-600">&#9733; {d.rating}</td>
                    <td className="px-4 py-3"><button onClick={e=>{e.stopPropagation();setSel(d);}} className="px-2 py-1 text-[10px] font-bold rounded border border-blue-100 bg-white hover:bg-white">Details</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {sel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-600/40 backdrop-blur-sm" onClick={()=>setSel(null)}>
          <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 w-full max-w-2xl mx-4 max-h-[90vh] overflow-auto" onClick={e=>e.stopPropagation()}>
            <div className={`p-6 border-b border-blue-100 relative overflow-hidden ${CM[sel.color]} bg-opacity-20`}>
              <div className={`absolute top-0 left-0 right-0 h-1 ${DOT[sel.color]}`}/>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-2xl font-black ${CM[sel.color]}`}>{sel.av}</div>
                  <div><div className="text-xl font-black text-black">{sel.name}</div><div className="text-xs text-black">{sel.id} - Jharkhand Government</div></div>
                </div>
                <button onClick={()=>setSel(null)} className="p-2 hover:bg-white/50 rounded-full text-black"><X size={20}/></button>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <div className="bg-white rounded-xl p-4 border border-blue-100">
                <div className="text-[10px] font-black uppercase tracking-widest text-black mb-3">Department Head</div>
                <div className="font-bold text-black mb-2">{sel.head}</div>
                <div className="flex gap-6">
                  <div className="flex items-center gap-1 text-xs text-black"><Phone size={11}/> {sel.phone}</div>
                  <div className="flex items-center gap-1 text-xs text-black"><Mail size={11}/> {sel.email}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[{l:'Active Cases',v:sel.active.toLocaleString(),c:'text-black'},{l:'Resolved',v:sel.closed.toLocaleString(),c:'text-green-600'},{l:'Critical',v:sel.critical,c:'text-orange-600'},{l:'Officers',v:sel.officers,c:'text-blue-600'},{l:'SLA',v:sel.sla+'%',c:sel.sla<85?'text-orange-600':'text-green-600'},{l:'Rating',v:sel.rating+'/5',c:'text-orange-500'}].map(s=>(
                  <div key={s.l} className="bg-white rounded-xl p-4 border border-blue-100 text-center"><div className={`text-xl font-black ${s.c}`}>{s.v}</div><div className="text-[10px] font-bold text-black uppercase mt-1">{s.l}</div></div>
                ))}
              </div>
              <div><div className="flex justify-between text-xs font-bold text-black mb-2"><span>Budget ({sel.budget})</span><span className={sel.budgetPct>80?'text-orange-600':'text-blue-600'}>{sel.budgetPct}% used</span></div><div className="h-3 bg-white rounded-full overflow-hidden"><div className={`h-full rounded-full ${sel.budgetPct>80?'bg-orange-400':'bg-blue-500'}`} style={{width:sel.budgetPct+'%'}}/></div></div>
              <div className="grid grid-cols-2 gap-4">
                <div><div className="text-[10px] font-black uppercase tracking-widest text-black mb-2">Districts</div><div className="flex flex-wrap gap-1.5">{sel.districts.map(x=><span key={x} className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[10px] font-bold">{x}</span>)}</div></div>
                <div><div className="text-[10px] font-black uppercase tracking-widest text-black mb-2">Categories</div><div className="flex flex-wrap gap-1.5">{sel.cats.map(x=><span key={x} className="px-2 py-1 bg-white text-black border border-blue-100 rounded text-[10px] font-bold">{x}</span>)}</div></div>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-blue-100">
                <button onClick={()=>dispatch({type:'ADD_TOAST',payload:{title:'Report Exported',message:sel.name+' report generated.',type:'success'}})} className="flex items-center justify-center gap-1.5 py-2 rounded-lg border border-blue-100 text-xs font-bold text-black bg-white hover:bg-white"><FileText size={13}/> Export</button>
                <button onClick={()=>dispatch({type:'ADD_TOAST',payload:{title:'Smart Deploy',message:'Officers optimised for '+sel.name,type:'info'}})} className="flex items-center justify-center gap-1.5 py-2 rounded-lg border border-blue-200 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100"><Zap size={13}/> Smart Deploy</button>
                <button onClick={()=>{setSel(null);dispatch({type:'ADD_TOAST',payload:{title:'Escalated',message:'Critical cases in '+sel.name+' escalated.',type:'warning'}});}} className="flex items-center justify-center gap-1.5 py-2 rounded-lg border border-orange-200 text-xs font-bold text-orange-700 bg-orange-50 hover:bg-orange-100"><AlertTriangle size={13}/> Escalate</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}