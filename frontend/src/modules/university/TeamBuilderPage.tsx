
import { useState } from "react";
import { Link } from "react-router-dom";
import { faculty, students, problems } from "./mockData";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Search, X, Plus, AlertTriangle, Users, ChevronRight, CheckCircle2 } from "lucide-react";

const COLORS = ["#6366f1","#22c55e","#f59e0b","#ef4444","#8b5cf6","#06b6d4"];

export default function TeamBuilderPage() {
  const [selectedProblem, setSelectedProblem] = useState(problems[0].id);
  const [facSearch, setFacSearch] = useState("");
  const [stuSearch, setStuSearch] = useState("");
  const [teamFaculty, setTeamFaculty] = useState<string[]>([]);
  const [teamStudents, setTeamStudents] = useState<string[]>([]);
  const [mentor, setMentor] = useState("");
  const [saved, setSaved] = useState(false);

  const problem = problems.find(p => p.id === selectedProblem)!;
  const allTeamMembers = [...teamFaculty.map(id => faculty.find(f => f.id === id)!.department), ...teamStudents.map(id => students.find(s => s.id === id)!.discipline)];
  const disciplineMap: Record<string, number> = {};
  allTeamMembers.forEach(d => { disciplineMap[d] = (disciplineMap[d] || 0) + 1; });
  const pieData = Object.entries(disciplineMap).map(([name, value]) => ({ name, value }));
  const uniqueDepts = Object.keys(disciplineMap).length;
  const meetsMin = uniqueDepts >= 2 && (teamFaculty.length + teamStudents.length) >= 3;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-black">Team Builder</h1>
        <p className="text-sm text-black mt-0.5">Assemble your interdisciplinary team for a challenge</p>
      </div>

      {/* Problem selector */}
      <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm">
        <label className="text-sm font-bold text-black block mb-2">Selected Challenge</label>
        <select value={selectedProblem} onChange={e => setSelectedProblem(e.target.value)}
          className="w-full text-sm border border-blue-100 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
          {problems.map(p => <option key={p.id} value={p.id}>[{p.id}] {p.title}</option>)}
        </select>
        {problem && (
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs bg-blue-500 text-blue-600 border border-blue-400 rounded-full px-2.5 py-1">Recommended team: {problem.recommendedTeamSize}</span>
            {problem.requiredExpertise.map(e => <span key={e} className="text-xs bg-white text-black rounded-full px-2.5 py-1">{e}</span>)}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* FACULTY PICKER */}
        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm">
          <h3 className="font-bold text-black mb-3 text-sm flex items-center gap-2"><Users size={15} className="text-blue-600"/> Faculty</h3>
          <div className="relative mb-3">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black"/>
            <input value={facSearch} onChange={e => setFacSearch(e.target.value)} placeholder="Search faculty..." className="w-full pl-8 pr-3 py-2 text-xs border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"/>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {faculty.filter(f => !facSearch || f.name.toLowerCase().includes(facSearch.toLowerCase()) || f.department.toLowerCase().includes(facSearch.toLowerCase())).map(f => {
              const added = teamFaculty.includes(f.id);
              return (
                <div key={f.id} className={`p-2.5 rounded-lg border cursor-pointer transition-all ${added ? "border-green-300 bg-green-50" : "border-blue-100 hover:border-blue-400 hover:bg-blue-500/50"}`}
                  onClick={() => setTeamFaculty(prev => added ? prev.filter(x => x !== f.id) : [...prev, f.id])}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-blue-600 flex-shrink-0">
                      {f.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-black truncate">{f.name}</p>
                      <p className="text-xs text-black truncate">{f.department}</p>
                    </div>
                    {added ? <CheckCircle2 size={14} className="text-green-500 flex-shrink-0"/> : <Plus size={14} className="text-black flex-shrink-0"/>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STUDENT PICKER */}
        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm">
          <h3 className="font-bold text-black mb-3 text-sm flex items-center gap-2"><Users size={15} className="text-violet-500"/> Students</h3>
          <div className="relative mb-3">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black"/>
            <input value={stuSearch} onChange={e => setStuSearch(e.target.value)} placeholder="Search students..." className="w-full pl-8 pr-3 py-2 text-xs border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"/>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {students.filter(s => !stuSearch || s.name.toLowerCase().includes(stuSearch.toLowerCase()) || s.discipline.toLowerCase().includes(stuSearch.toLowerCase()) || s.skills.some(sk => sk.toLowerCase().includes(stuSearch.toLowerCase()))).map(s => {
              const added = teamStudents.includes(s.id);
              return (
                <div key={s.id} className={`p-2.5 rounded-lg border cursor-pointer transition-all ${added ? "border-violet-300 bg-violet-50" : "border-blue-100 hover:border-violet-300 hover:bg-violet-50/50"}`}
                  onClick={() => setTeamStudents(prev => added ? prev.filter(x => x !== s.id) : [...prev, s.id])}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-700 flex-shrink-0">
                      {s.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-black truncate">{s.name}</p>
                      <p className="text-xs text-black truncate">Year {s.year} · {s.discipline.split(" ")[0]}</p>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {s.skills.slice(0,2).map(sk => <span key={sk} className="text-xs bg-violet-50 text-violet-600 px-1.5 rounded">{sk}</span>)}
                      </div>
                    </div>
                    {added ? <CheckCircle2 size={14} className="text-violet-500 flex-shrink-0"/> : <Plus size={14} className="text-black flex-shrink-0"/>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TEAM ASSEMBLY PANEL */}
        <div className="space-y-4">
          {/* Team members list */}
          <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm">
            <h3 className="font-bold text-black mb-3 text-sm">Your Team ({teamFaculty.length + teamStudents.length} members)</h3>
            {teamFaculty.length + teamStudents.length === 0 ? (
              <p className="text-xs text-black text-center py-4">Add faculty and students from the left panels</p>
            ) : (
              <div className="space-y-1.5">
                {teamFaculty.map(id => { const f = faculty.find(x=>x.id===id)!; return (
                  <div key={id} className="flex items-center gap-2 p-1.5 bg-blue-500 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-blue-600">{f.name[0]}</div>
                    <span className="text-xs font-medium text-black flex-1 truncate">{f.name}</span>
                    <span className="text-xs text-blue-600">Faculty</span>
                    <button onClick={() => setTeamFaculty(p=>p.filter(x=>x!==id))}><X size={12} className="text-black hover:text-orange-500"/></button>
                  </div>
                );})}
                {teamStudents.map(id => { const s = students.find(x=>x.id===id)!; return (
                  <div key={id} className="flex items-center gap-2 p-1.5 bg-violet-50 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-violet-200 flex items-center justify-center text-xs font-bold text-violet-700">{s.name[0]}</div>
                    <span className="text-xs font-medium text-black flex-1 truncate">{s.name}</span>
                    <span className="text-xs text-violet-500">Student</span>
                    <button onClick={() => setTeamStudents(p=>p.filter(x=>x!==id))}><X size={12} className="text-black hover:text-orange-500"/></button>
                  </div>
                );})}
              </div>
            )}
          </div>

          {/* Discipline mix pie */}
          {pieData.length > 0 && (
            <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm">
              <h3 className="font-bold text-black mb-2 text-sm">Discipline Mix</h3>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" label={({ name, value }) => `${value}`}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]}/>)}
                  </Pie>
                  <Tooltip formatter={(v:any) => [`${v} member(s)`]}/>
                  <Legend iconSize={8} wrapperStyle={{fontSize:"11px"}}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Validation */}
          {(teamFaculty.length + teamStudents.length) > 0 && !meetsMin && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 flex items-start gap-2">
              <AlertTriangle size={16} className="text-orange-500 flex-shrink-0 mt-0.5"/>
              <p className="text-xs text-orange-700 font-medium">Team needs at least 2 disciplines and 3 members for a multidisciplinary submission</p>
            </div>
          )}
          {meetsMin && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-start gap-2">
              <CheckCircle2 size={16} className="text-green-500 flex-shrink-0 mt-0.5"/>
              <p className="text-xs text-green-700 font-medium">Team meets multidisciplinary requirements ✓</p>
            </div>
          )}

          {/* Mentor */}
          <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm">
            <label className="text-sm font-bold text-black block mb-2">Assign Faculty Mentor</label>
            <select value={mentor} onChange={e => setMentor(e.target.value)}
              className="w-full text-sm border border-blue-100 rounded-lg px-3 py-2 focus:outline-none bg-white">
              <option value="">Select mentor...</option>
              {faculty.map(f => <option key={f.id} value={f.id}>{f.name} — {f.department}</option>)}
            </select>
          </div>

          {/* Action */}
          <button onClick={() => setSaved(true)} disabled={!meetsMin}
            className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${meetsMin ? "bg-blue-500 text-white hover:bg-blue-500 shadow-lg shadow-indigo-300" : "bg-white text-black cursor-not-allowed"}`}>
            {saved ? <><CheckCircle2 size={16}/> Team Saved!</> : <>Save Team & Go to Proposal <ChevronRight size={16}/></>}
          </button>
          {saved && (
            <Link to="/university/proposals/new" className="block text-center text-sm text-blue-600 font-semibold hover:underline">Continue to Proposal Draft →</Link>
          )}
        </div>
      </div>
    </div>
  );
}
