import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Landmark, Building2, Users, Award, Globe, Phone, Mail, X, CheckCircle2, Star, Briefcase, FileText } from 'lucide-react';

const UNIVERSITIES = [
  { id:'U1', name:'IIT (ISM) Dhanbad', type:'IIT', city:'Dhanbad', domains:['Mining Engineering','Water Technology','AI/ML','Environmental Science'], readiness:95, deployments:12, faculty:48, activeProjects:4, rating:4.8, contact:'director@iitism.ac.in', phone:'+91 326 223 5001', established:1926, students:'6,800+', rank:'#8 NIRF Engineering' },
  { id:'U2', name:'BIT Mesra', type:'NIT', city:'Ranchi', domains:['Smart Cities','IoT','Computer Science','Electronics'], readiness:88, deployments:8, faculty:312, activeProjects:3, rating:4.5, contact:'admin@bitmesra.ac.in', phone:'+91 651 229 3000', established:1955, students:'9,200+', rank:'#42 NIRF Engineering' },
  { id:'U3', name:'NIT Jamshedpur', type:'NIT', city:'Jamshedpur', domains:['Civil Engineering','Infrastructure','Materials Science','Robotics'], readiness:91, deployments:10, faculty:198, activeProjects:5, rating:4.6, contact:'dir@nitjsr.ac.in', phone:'+91 657 237 1000', established:1960, students:'5,100+', rank:'#50 NIRF Engineering' },
  { id:'U4', name:'XLRI Jamshedpur', type:'Management', city:'Jamshedpur', domains:['Social Entrepreneurship','CSR Strategy','Public Policy','HR Management'], readiness:82, deployments:6, faculty:95, activeProjects:2, rating:4.7, contact:'admin@xlri.ac.in', phone:'+91 657 239 8000', established:1949, students:'1,200+', rank:'#5 NIRF Management' },
  { id:'U5', name:'Jharkhand University of Technology', type:'State University', city:'Ranchi', domains:['Rural Technology','AgriTech','Health Informatics','E-Governance'], readiness:76, deployments:5, faculty:280, activeProjects:3, rating:4.2, contact:'vc@jut.ac.in', phone:'+91 651 246 0000', established:2004, students:'12,000+', rank:'State University' },
  { id:'U6', name:'AIIMS Deoghar', type:'Medical', city:'Deoghar', domains:['Public Health','Telemedicine','Tribal Health','Medical Devices'], readiness:89, deployments:7, faculty:142, activeProjects:4, rating:4.7, contact:'dir@aiimsdeoghar.edu.in', phone:'+91 6432 234 000', established:2019, students:'800+', rank:'AIIMS Institute' },
  { id:'U7', name:'Ranchi University', type:'State University', city:'Ranchi', domains:['Social Work','Community Development','Tribal Studies','Education Policy'], readiness:71, deployments:4, faculty:524, activeProjects:2, rating:4.0, contact:'admin@ranchiuniversity.ac.in', phone:'+91 651 230 7000', established:1960, students:'98,000+', rank:'State University' },
  { id:'U8', name:'Central University of Jharkhand', type:'Central University', city:'Ranchi', domains:['Environmental Studies','Disaster Management','GIS & Remote Sensing','Climate Science'], readiness:84, deployments:6, faculty:187, activeProjects:3, rating:4.4, contact:'registrar@cuj.ac.in', phone:'+91 651 227 2066', established:2009, students:'3,800+', rank:'Central University' },
];

const CSR_PARTNERS = [
  { id:'C1', name:'Tata Steel Foundation', company:'Tata Steel Ltd.', theme:'Rural Livelihoods & Infrastructure', funding:'15.2 Cr', range:'1-5 Cr per project', projects:45, active:8, domains:['Infrastructure','Water','Education','Livelihood'], contact:'tsf@tatasteel.com', phone:'+91 657 248 0000', headquarters:'Jamshedpur', eligible:['Water Supply','Road','School Building','Skill Development'] },
  { id:'C2', name:'Adani Foundation', company:'Adani Enterprises Ltd.', theme:'Community Development & Energy', funding:'12.8 Cr', range:'0.5-3 Cr per project', projects:22, active:5, domains:['Energy Access','Education','Health','Women Empowerment'], contact:'foundation@adani.com', phone:'+91 79 2555 5000', headquarters:'Ahmedabad', eligible:['Solar Energy','School','Health Camp','Sanitation'] },
  { id:'C3', name:'SAIL CSR Foundation', company:'Steel Authority of India', theme:'Education & Health in Mining Regions', funding:'8.4 Cr', range:'0.5-2 Cr per project', projects:31, active:6, domains:['Education','Health','Sports','Environment'], contact:'csr@sail.in', phone:'+91 661 248 0000', headquarters:'Bokaro / Dhanbad', eligible:['School Infrastructure','Hospital','Sports Ground','Tree Plantation'] },
  { id:'C4', name:'NTPC Foundation', company:'NTPC Limited', theme:'Environment & Skill Development', funding:'6.2 Cr', range:'0.5-2.5 Cr per project', projects:18, active:4, domains:['Environment','Skill Dev','Rural Electrification','Women Empowerment'], contact:'foundation@ntpc.co.in', phone:'+91 11 2436 0000', headquarters:'Jharkhand Projects', eligible:['Solar','Skill Centre','Women SHG','Plantation'] },
  { id:'C5', name:'Vedanta Foundation', company:'Vedanta Resources', theme:'Education & Healthcare Innovation', funding:'9.7 Cr', range:'1-4 Cr per project', projects:27, active:5, domains:['Digital Literacy','Healthcare','Sports','Water Conservation'], contact:'foundation@vedanta.co.in', phone:'+91 22 6646 1000', headquarters:'Khunti / Ranchi', eligible:['School Tech','Health Camp','Water Harvesting','Sports Infrastructure'] },
  { id:'C6', name:'HCL Foundation', company:'HCL Technologies Ltd.', theme:'Technology for Social Good', funding:'4.5 Cr', range:'0.5-2 Cr per project', projects:14, active:3, domains:['Digital Literacy','E-Governance','Youth Development','Urban Development'], contact:'hclfoundation@hcl.com', phone:'+91 120 476 4000', headquarters:'Noida (Jharkhand Operations)', eligible:['Digital Skill','E-Governance Portal','Youth Tech','Smart City'] },
  { id:'C7', name:'Infosys Foundation', company:'Infosys Limited', theme:'Education & Rural Development', funding:'3.8 Cr', range:'0.5-1.5 Cr per project', projects:11, active:2, domains:['Education Technology','Library','Healthcare Access','Disaster Relief'], contact:'foundation@infosys.com', phone:'+91 80 2852 0261', headquarters:'Bengaluru (Jharkhand Programs)', eligible:['Digital Library','School Lab','Health Tech','Flood Relief'] },
  { id:'C8', name:'Indian Oil Foundation', company:'Indian Oil Corporation', theme:'Energy Access & Environment', funding:'5.1 Cr', range:'0.5-2 Cr per project', projects:20, active:4, domains:['LPG Access','Road Safety','Environment','Education'], contact:'foundation@iocl.co.in', phone:'+91 11 2337 3388', headquarters:'Ranchi (Eastern India)', eligible:['Clean Energy','Road Safety','Plantation','School'] },
];

export default function UniversitiesCSR() {
  const { dispatch } = useSimulation();
  const [tab, setTab] = useState('UNIVERSITIES');
  const [sel, setSel] = useState(null);
  const [q, setQ] = useState('');

  const uList = UNIVERSITIES.filter(u => u.name.toLowerCase().includes(q.toLowerCase()) || u.domains.some(d=>d.toLowerCase().includes(q.toLowerCase())));
  const cList = CSR_PARTNERS.filter(c => c.name.toLowerCase().includes(q.toLowerCase()) || c.theme.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Universities & CSR Partners</h1>
          <p className="text-sm text-slate-500 font-medium">Discover and collaborate with {UNIVERSITIES.length} academic institutions and {CSR_PARTNERS.length} CSR partners.</p>
        </div>
        <div className="flex items-center gap-3">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search partners..." className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white shadow-sm outline-none focus:border-blue-400 w-48"/>
          <button onClick={()=>dispatch({type:'ADD_TOAST',payload:{title:'Directory Exported',message:'Partner directory PDF exported.',type:'success'}})} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-black shadow-sm flex items-center gap-2">
            <FileText size={14}/> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 shrink-0">
        {[
          {l:'Total Partners',v:UNIVERSITIES.length+CSR_PARTNERS.length,icon:<Globe size={18} className="text-blue-500"/>,sub:'Universities & CSR combined'},
          {l:'Academic Institutions',v:UNIVERSITIES.length,icon:<Landmark size={18} className="text-indigo-500"/>,sub:'IITs, NITs, State Universities'},
          {l:'CSR Partners',v:CSR_PARTNERS.length,icon:<Building2 size={18} className="text-amber-500"/>,sub:'Corporate social responsibility'},
          {l:'Active Projects',v:UNIVERSITIES.reduce((s,u)=>s+u.activeProjects,0)+CSR_PARTNERS.reduce((s,c)=>s+c.active,0),icon:<Briefcase size={18} className="text-green-500"/>,sub:'Ongoing collaborations'},
        ].map(k=>(
          <div key={k.l} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">{k.icon}<span className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-right leading-tight">{k.l}</span></div>
            <div className="text-3xl font-black text-slate-900">{k.v}</div>
            <div className="text-[10px] text-slate-400 mt-1">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-slate-50 shrink-0 w-fit">
        {['UNIVERSITIES','CSR PARTNERS'].map(t=>(
          <button key={t} onClick={()=>setTab(t)} className={`px-6 py-2.5 text-xs font-black uppercase tracking-widest transition-colors ${tab===t?'bg-slate-900 text-white':'text-slate-600 hover:text-slate-900'}`}>{t}</button>
        ))}
      </div>

      <div className="flex-1 min-h-0 overflow-auto">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 pb-4">
          {tab === 'UNIVERSITIES' ? uList.map(u=>(
            <div key={u.id} onClick={()=>setSel({...u,_type:'UNIVERSITY'})} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 rounded-t-2xl"/>
              <div className="p-5 pt-6 relative">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-black text-sm shrink-0">{u.name[0]}</div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 leading-tight">{u.name}</div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded">{u.type}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">{u.domains.slice(0,3).map(d=><span key={d} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px] font-bold">{d}</span>)}</div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center bg-blue-50 rounded-lg p-2 border border-blue-100"><div className="text-sm font-black text-blue-700">{u.readiness}%</div><div className="text-[9px] font-bold text-blue-400 uppercase">Readiness</div></div>
                  <div className="text-center bg-slate-50 rounded-lg p-2 border border-slate-100"><div className="text-sm font-black text-slate-800">{u.deployments}</div><div className="text-[9px] font-bold text-slate-400 uppercase">Projects</div></div>
                  <div className="text-center bg-slate-50 rounded-lg p-2 border border-slate-100"><div className="text-sm font-black text-slate-800">{u.activeProjects}</div><div className="text-[9px] font-bold text-slate-400 uppercase">Active</div></div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs text-slate-500 font-medium">{u.city} | Est. {u.established}</div>
                  <div className="flex items-center gap-1"><Star size={11} className="text-amber-400 fill-amber-400"/><span className="text-xs font-black text-slate-700">{u.rating}</span></div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={e=>{e.stopPropagation();setSel({...u,_type:'UNIVERSITY'});}} className="flex-1 py-1.5 text-[11px] font-bold rounded border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100">View Profile</button>
                  <button onClick={e=>{e.stopPropagation();dispatch({type:'ADD_TOAST',payload:{title:'MoU Request Sent',message:'MoU request sent to '+u.name,type:'success'}});}} className="flex-1 py-1.5 text-[11px] font-bold rounded bg-slate-900 text-white hover:bg-black">Request MoU</button>
                </div>
              </div>
            </div>
          )) : cList.map(c=>(
            <div key={c.id} onClick={()=>setSel({...c,_type:'CSR'})} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
              <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500 rounded-t-2xl"/>
              <div className="p-5 pt-6 relative">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-black text-sm shrink-0">{c.name[0]}</div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 leading-tight">{c.name}</div>
                    <div className="text-[10px] text-slate-500">{c.company}</div>
                  </div>
                </div>
                <div className="text-[11px] font-bold text-slate-700 mb-3 leading-snug">{c.theme}</div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="text-center bg-amber-50 rounded-lg p-2 border border-amber-100"><div className="text-sm font-black text-amber-700">{c.funding}</div><div className="text-[9px] font-bold text-amber-400 uppercase">Total CSR</div></div>
                  <div className="text-center bg-slate-50 rounded-lg p-2 border border-slate-100"><div className="text-sm font-black text-slate-800">{c.projects}</div><div className="text-[9px] font-bold text-slate-400 uppercase">Projects</div></div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">{c.domains.slice(0,3).map(d=><span key={d} className="px-1.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded text-[9px] font-bold">{d}</span>)}</div>
                <div className="flex items-center gap-2">
                  <button onClick={e=>{e.stopPropagation();setSel({...c,_type:'CSR'});}} className="flex-1 py-1.5 text-[11px] font-bold rounded border border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100">View Profile</button>
                  <button onClick={e=>{e.stopPropagation();dispatch({type:'ADD_TOAST',payload:{title:'Partnership Request',message:'Partnership request sent to '+c.name,type:'success'}});}} className="flex-1 py-1.5 text-[11px] font-bold rounded bg-slate-900 text-white hover:bg-black">Partner Up</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {sel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm" onClick={()=>setSel(null)}>
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl mx-4 max-h-[90vh] overflow-auto" onClick={e=>e.stopPropagation()}>
            <div className={`p-6 border-b border-slate-100 relative ${sel._type==='UNIVERSITY'?'bg-blue-50':'bg-amber-50'}`}>
              <div className={`absolute top-0 left-0 right-0 h-1 ${sel._type==='UNIVERSITY'?'bg-blue-500':'bg-amber-500'}`}/>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black ${sel._type==='UNIVERSITY'?'bg-blue-100 text-blue-700 border-2 border-blue-300':'bg-amber-100 text-amber-700 border-2 border-amber-300'}`}>{sel.name[0]}</div>
                  <div>
                    <div className="text-xl font-black text-slate-900">{sel.name}</div>
                    <div className="text-xs text-slate-500">{sel._type==='UNIVERSITY' ? sel.type+' | '+sel.city : sel.company}</div>
                  </div>
                </div>
                <button onClick={()=>setSel(null)} className="p-2 hover:bg-white/60 rounded-full"><X size={18}/></button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Contact</div>
                <div className="space-y-1">
                  {sel._type==='UNIVERSITY' && <div className="text-xs text-slate-600">{sel.rank}</div>}
                  <div className="flex items-center gap-2 text-xs text-slate-600"><Mail size={11}/> {sel._type==='UNIVERSITY'?sel.contact:sel.contact}</div>
                  <div className="flex items-center gap-2 text-xs text-slate-600"><Phone size={11}/> {sel.phone}</div>
                  {sel._type==='UNIVERSITY' && <div className="text-xs text-slate-600">Est. {sel.established} | {sel.students} Students</div>}
                  {sel._type==='CSR' && <div className="text-xs text-slate-600">HQ: {sel.headquarters}</div>}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {sel._type==='UNIVERSITY'
                  ? [{l:'Readiness',v:sel.readiness+'%',c:'text-blue-700'},{l:'Past Projects',v:sel.deployments,c:'text-slate-900'},{l:'Active',v:sel.activeProjects,c:'text-green-600'},{l:'Faculty',v:sel.faculty,c:'text-slate-900'},{l:'Rating',v:'★ '+sel.rating,c:'text-amber-500'},{l:'City',v:sel.city,c:'text-slate-700'}]
                  : [{l:'CSR Fund',v:sel.funding,c:'text-amber-700'},{l:'Range',v:sel.range,c:'text-slate-900'},{l:'Total Projects',v:sel.projects,c:'text-slate-900'},{l:'Active',v:sel.active,c:'text-green-600'},{l:'Theme',v:sel.theme.split('&')[0],c:'text-slate-700'},{l:'HQ',v:sel.headquarters,c:'text-slate-700'}]
                  .map(s=><div key={s.l} className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-center"><div className={`text-base font-black ${s.c}`}>{s.v}</div><div className="text-[9px] font-bold text-slate-400 uppercase mt-1">{s.l}</div></div>)}
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{sel._type==='UNIVERSITY'?'Domain Expertise':'Focus Domains'}</div>
                <div className="flex flex-wrap gap-1.5">{(sel._type==='UNIVERSITY'?sel.domains:sel.domains).map(d=><span key={d} className={`px-2 py-1 rounded text-[10px] font-bold border ${sel._type==='UNIVERSITY'?'bg-blue-50 text-blue-700 border-blue-200':'bg-amber-50 text-amber-700 border-amber-200'}`}>{d}</span>)}</div>
              </div>
              {sel._type==='CSR' && (
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Eligible Activity Categories</div>
                  <div className="flex flex-wrap gap-1.5">{sel.eligible.map(d=><span key={d} className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-[10px] font-bold">{d}</span>)}</div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <button onClick={()=>dispatch({type:'ADD_TOAST',payload:{title:'MoU Request Sent',message:sel.name+' notified of partnership interest.',type:'success'}})} className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-bold border ${sel._type==='UNIVERSITY'?'border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100':'border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100'}`}>{sel._type==='UNIVERSITY'?'Request MoU':'Partner Up'}</button>
                <button onClick={()=>dispatch({type:'START_WORKFLOW',payload:{action:'INVITE_UNIVERSITY',partnerId:sel.id}})} className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-bold bg-slate-900 text-white hover:bg-black">Invite to Challenge</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}