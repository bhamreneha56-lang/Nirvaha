"use client";
import { university, faculty, domainPerformance, successSparkline, problems } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, ReferenceLine } from "recharts";
import { Star, Download, Edit, Award, TrendingUp, Users } from "lucide-react";
import SuccessRing from "@/components/university/SuccessRing";

const RatingBar = ({ label, score }: { label: string; score: number }) => (
  <div className="flex items-center gap-3">
    <span className="text-xs text-slate-500 w-36 flex-shrink-0">{label}</span>
    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full bg-indigo-500 rounded-full" style={{width:`${(score/5)*100}%`}}/>
    </div>
    <span className="text-xs font-bold text-slate-800 w-8 text-right">{score}</span>
  </div>
);

const sparkData = successSparkline.map((v,i)=>({q:`Q${i+1}`,v}));

const topProblems = problems.filter(p=>p.aiSuccessChance>=80).sort((a,b)=>b.aiSuccessChance-a.aiSuccessChance).slice(0,3);
const growthDomains = [
  { domain: "Healthcare Access", currentRate: 65, aiNote: "ECE + CS crossover — your IoT expertise applies" },
  { domain: "Mining Safety", currentRate: 55, aiNote: "Collaboration with IIT ISM could bridge expertise gap" },
];

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-900">University Profile</h1>
        <button className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold hover:bg-slate-50 transition-all">
          <Edit size={14}/> Edit Profile
        </button>
      </div>

      {/* Institution Identity */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-start gap-5 flex-wrap">
          <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg flex-shrink-0">BIT</div>
          <div className="flex-1">
            <h2 className="text-xl font-black text-slate-900">{university.name}</h2>
            <p className="text-sm text-slate-500 mt-0.5">{university.type} · Est. {university.established} · {university.district}, {university.state}</p>
            <div className="mt-3 grid grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { label: "Departments", items: university.departments },
                { label: "Labs", items: university.labs },
                { label: "Research Centres", items: university.researchCentres },
              ].map(sec => (
                <div key={sec.label}>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">{sec.label}</p>
                  <ul className="space-y-1">
                    {sec.items.slice(0,4).map(item => <li key={item} className="text-xs text-slate-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0"/>{item}</li>)}
                    {sec.items.length > 4 && <li className="text-xs text-slate-400">+{sec.items.length-4} more</li>}
                  </ul>
                </div>
              ))}
            </div>
            {/* Incubation */}
            <div className="mt-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Incubation Facilities</p>
              <div className="flex flex-wrap gap-2">
                {university.incubationFacilities.map(f => <span key={f} className="text-xs bg-violet-50 text-violet-700 border border-violet-200 rounded-lg px-2.5 py-1">{f}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Panel */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Performance & Rating</h3>
          {/* Stars */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl font-black text-slate-900">{university.rating}</span>
            <div>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} size={18} className={s<=4?"fill-amber-400 text-amber-400":"fill-slate-200 text-slate-200"}/>)}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Government + Industry + Community scoring</p>
            </div>
          </div>
          <div className="space-y-2.5">
            <RatingBar label="Timeliness" score={university.ratingBreakdown.timeliness}/>
            <RatingBar label="Solution Quality" score={university.ratingBreakdown.solutionQuality}/>
            <RatingBar label="Communication" score={university.ratingBreakdown.communication}/>
            <RatingBar label="Community Impact" score={university.ratingBreakdown.communityImpact}/>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-green-500"/> Success Trend</h3>
          <div className="flex items-end gap-4 mb-4">
            <div className="text-center">
              <p className="text-4xl font-black text-green-600">{university.problemsCompleted}</p>
              <p className="text-xs text-slate-500">Problems Completed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-indigo-600">{university.successRate}%</p>
              <p className="text-xs text-slate-500">Success Rate</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-400">State avg</p>
              <p className="text-2xl font-black text-slate-400">74%</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={sparkData}>
              <XAxis dataKey="q" tick={{fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis hide domain={[10,30]}/>
              <Tooltip contentStyle={{fontSize:11}}/>
              <ReferenceLine y={20} stroke="#e2e8f0" strokeDasharray="3 3"/>
              <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2.5} dot={{fill:"#22c55e",r:3}}/>
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-400 text-center mt-1">Projects completed per quarter (running total)</p>
        </div>
      </div>

      {/* AI Prediction Panel — Light Theme */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-100">
            <span className="text-white text-lg">🤖</span>
          </div>
          <div>
            <h3 className="text-slate-900 font-black text-lg">AI Prediction Panel — Tailored for BIT Mesra</h3>
            <p className="text-slate-500 text-xs">Based on your historical strengths, faculty profile, and open problem pool</p>
          </div>
        </div>
        {/* TODO: replace with GET /api/ai/university-predictions */}
        <div className="grid lg:grid-cols-2 gap-5 my-6">
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4">
            <p className="text-slate-700 text-xs font-bold uppercase tracking-wider mb-3.5">Problems You Are Most Likely to Win</p>
            <div className="space-y-4">
              {topProblems.map((p, i) => (
                <div key={p.id} className="flex items-center gap-3.5 bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-sm hover:border-indigo-200 transition-colors">
                  <span className="text-slate-400 font-black w-6 text-center">#{i+1}</span>
                  <SuccessRing score={p.aiSuccessChance} size={46} strokeWidth={5}/>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{p.title}</p>
                    <p className="text-xs text-slate-500">{p.domain} · <span className="text-emerald-600 font-semibold">{p.aiDomainSuccessRate}% your rate</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4">
            <p className="text-slate-700 text-xs font-bold uppercase tracking-wider mb-3.5">Domains to Grow Into</p>
            <div className="space-y-4">
              {growthDomains.map(d => (
                <div key={d.domain} className="bg-white border border-amber-200 rounded-xl p-3.5 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <SuccessRing score={d.currentRate} size={38} strokeWidth={4}/>
                    <p className="text-sm font-bold text-slate-800">{d.domain}</p>
                  </div>
                  <p className="text-xs text-slate-600">{d.aiNote}</p>
                </div>
              ))}
              <p className="text-xs text-slate-500 mt-2 bg-indigo-50/60 border border-indigo-100 rounded-xl p-3">
                💡 You have completed 4/5 Water-domain projects successfully — strongest area. E-Governance at 95% is your peak domain.
              </p>
            </div>
          </div>
        </div>

        {/* Domain chart */}
        <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4">
          <p className="text-xs text-slate-700 font-bold mb-3">Your Success Rate by Domain vs State Average</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={domainPerformance.slice(0,6)} layout="vertical" margin={{left:80}}>
              <XAxis type="number" domain={[0,100]} tick={{fill:"#64748b",fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis type="category" dataKey="domain" tick={{fill:"#334155",fontSize:10}} axisLine={false} tickLine={false} width={80}/>
              <Tooltip contentStyle={{background:"#ffffff",border:"1px solid #e2e8f0",fontSize:11,borderRadius:8,color:"#0f172a"}}/>
              <Bar dataKey="successRate" name="BIT Mesra" fill="#6366f1" radius={[0,4,4,0]}/>
              <Bar dataKey="stateAvg" name="State Avg" fill="#cbd5e1" radius={[0,4,4,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Faculty Mentorship Log */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><Users size={16} className="text-indigo-500"/> Faculty Mentorship Credits</h3>
          <button className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-slate-300 text-slate-600 font-semibold hover:bg-slate-50 transition-all">
            <Download size={12}/> Download PDF {/* TODO: real export */}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                {["Faculty","Department","Hours Mentored","Projects","Outcomes"].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 px-3 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {faculty.map((f, i) => (
                <tr key={f.id} className={`border-t border-slate-100 ${i%2===0?"bg-white":"bg-slate-50/50"}`}>
                  <td className="px-3 py-2.5 font-semibold text-slate-800">{f.name}</td>
                  <td className="px-3 py-2.5 text-slate-500 text-xs">{f.department}</td>
                  <td className="px-3 py-2.5">
                    <span className="font-bold text-indigo-600">{f.hoursMentored}h</span>
                  </td>
                  <td className="px-3 py-2.5 text-slate-600">{f.projects}</td>
                  <td className="px-3 py-2.5 text-xs text-slate-600">{f.outcomes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Award size={16} className="text-amber-500"/> Achievements & Badges</h3>
        <div className="flex flex-wrap gap-2">
          {university.badges.map(b => (
            <span key={b} className="flex items-center gap-1.5 text-sm bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 text-amber-800 rounded-full px-3 py-1.5 font-semibold">
              🏅 {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
