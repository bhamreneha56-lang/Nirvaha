
import { useState } from "react";
import { Link } from "react-router-dom";
import { university, problems, activityFeed, projects, faculty, students, getSuccessBg, getPriorityColor } from "./mockData";
import SuccessRing from "./SuccessRing";
import { Zap, TrendingUp, Users, Clock, Bell, ChevronRight, Filter, ArrowUpDown, CheckCircle2, Eye, Briefcase, Calendar, FileText } from "lucide-react";

// TODO: replace with GET /api/university/ai-recommendations
const aiProblems = problems.filter(p => !["In Progress","Piloted","Deployed"].includes(p.status)).sort((a,b) => b.aiSuccessChance - a.aiSuccessChance).slice(0,5);

type SortKey = "successChance" | "deadline" | "domain";
const DOMAINS = Array.from(new Set(problems.map(p => p.domain)));

export default function DashboardPage() {
  const [sort, setSort] = useState<SortKey>("successChance");
  const [domainFilter, setDomainFilter] = useState("All");
  const [accepted, setAccepted] = useState<string[]>([]);

  const sorted = [...aiProblems]
    .filter(p => domainFilter === "All" || p.domain === domainFilter)
    .sort((a,b) => sort === "successChance" ? b.aiSuccessChance - a.aiSuccessChance : sort === "deadline" ? a.deadline.localeCompare(b.deadline) : a.domain.localeCompare(b.domain));

  const kanbanPreview = projects.slice(0,4);
  const teamCount = Array.from(new Set(projects.flatMap(p => p.team))).length;
  const pendingProposals = university.pendingProposals;

  return (
    <div className="space-y-6">
      {/* HEADER STRIP */}
      <div className="bg-white rounded-2xl border border-blue-100 p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center text-white font-black text-xl shadow-lg">BIT</div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-black text-black">{university.name}</h1>
                <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 border border-green-200 rounded-full px-2.5 py-0.5 font-semibold">
                  <Zap size={10} className="fill-green-500" /> Verified Institution
                </span>
              </div>
              <p className="text-sm text-black mt-0.5">{university.district}, {university.state} · {university.type} · Est. {university.established}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Active Projects", value: university.activeProjects, color: "text-blue-600", bg: "bg-blue-500" },
              { label: "Completed", value: university.problemsCompleted, color: "text-green-600", bg: "bg-green-50" },
              { label: "Success Rate", value: `${university.successRate}%`, color: "text-orange-600", bg: "bg-orange-50" },
              { label: "Rating", value: `⭐ ${university.rating}/5`, color: "text-blue-600", bg: "bg-blue-200" },
            ].map(s => (
              <div key={s.label} className={`${s.bg} rounded-xl px-4 py-2.5 text-center min-w-[90px]`}>
                <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-xs text-black font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI ANALYTICS PANEL — Light Theme */}
      <div className="bg-white rounded-2xl border border-blue-100/90 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-500 flex items-center justify-center shadow-md shadow-indigo-100">
              <Zap size={22} className="text-white fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-black">AI Recommendation Engine</h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-500 text-blue-600 border border-blue-400">
                  Smart Match
                </span>
              </div>
              <p className="text-xs text-black mt-0.5">Problems you are most likely to succeed at — ranked by AI predictive model</p>
            </div>
          </div>
          {/* Filters */}
          <div className="flex gap-2.5 flex-wrap">
            <select
              className="text-xs bg-white hover:bg-white border border-blue-100 text-black rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors"
              value={sort}
              onChange={e => setSort(e.target.value as SortKey)}
            >
              <option value="successChance">Sort: Success Chance</option>
              <option value="deadline">Sort: Deadline</option>
              <option value="domain">Sort: Domain</option>
            </select>
            <select
              className="text-xs bg-white hover:bg-white border border-blue-100 text-black rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors"
              value={domainFilter}
              onChange={e => setDomainFilter(e.target.value)}
            >
              <option value="All">All Domains</option>
              {DOMAINS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* Space between each problem increased with space-y-6 */}
        <div className="space-y-6">
          {sorted.map((p, idx) => (
            <div
              key={p.id}
              className={`bg-white/70 hover:bg-white border rounded-2xl p-5 transition-all duration-200 shadow-sm hover:shadow-md hover:border-blue-400 ${
                accepted.includes(p.id)
                  ? "border-green-300 bg-green-50/40"
                  : "border-blue-100/90"
              }`}
            >
              <div className="flex flex-wrap items-start gap-4">
                {/* Rank + ring */}
                <div className="flex items-center gap-3.5 flex-shrink-0 pt-0.5">
                  <span className="text-black font-black text-lg w-6 text-center">#{idx + 1}</span>
                  <SuccessRing score={p.aiSuccessChance} size={64} strokeWidth={6} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono font-semibold text-blue-600 bg-blue-500 border border-blue-400 px-2 py-0.5 rounded-md">
                      {p.id}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-white text-black font-medium border border-blue-100">
                      {p.domain}
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${getPriorityColor(p.priority)}`}>
                      {p.priority}
                    </span>
                  </div>

                  <Link to={`/university/challenges/${p.id}`} className="group">
                    <h3 className="text-black font-bold text-base mb-2.5 group-hover:text-blue-600 transition-colors leading-snug">
                      {p.title}
                    </h3>
                  </Link>

                  {/* AI Reasons */}
                  <ul className="space-y-1.5 mb-3.5">
                    {p.aiReasons.slice(0, 3).map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-black">
                        <CheckCircle2 size={13} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="leading-tight">{r}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Domain comparison chip */}
                  <div className="flex items-center gap-2.5 flex-wrap pt-1">
                    <span className="text-xs bg-green-50 border border-green-200 text-green-700 rounded-full px-2.5 py-1 font-semibold">
                      Your domain rate: {p.aiDomainSuccessRate}%
                    </span>
                    <span className="text-xs text-black font-medium">vs</span>
                    <span className="text-xs bg-white border border-blue-100 text-black rounded-full px-2.5 py-1 font-medium">
                      State avg: {p.stateAvgSuccessRate}%
                    </span>
                    <span className="text-xs text-black font-medium ml-1">
                      📅 Deadline: {p.deadline}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 flex-shrink-0 pt-1">
                  {accepted.includes(p.id) ? (
                    <span className="text-xs text-green-700 bg-green-100 border border-green-200 rounded-xl px-3.5 py-2 font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-green-600" /> Accepted
                    </span>
                  ) : (
                    <>
                      <Link
                        to={`/university/challenges/${p.id}`}
                        className="text-xs bg-white hover:bg-white text-black border border-slate-300 rounded-xl px-3.5 py-2 font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                      >
                        <Eye size={13} /> View Problem
                      </Link>
                      <button
                        onClick={() => setAccepted(a => [...a, p.id])}
                        className="text-xs bg-green-600 hover:bg-green-500 text-white rounded-xl px-3.5 py-2 font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-green-200 transition-all"
                      >
                        <CheckCircle2 size={13} /> Quick Accept
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SNAPSHOT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Projects */}
        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase size={16} className="text-blue-600"/>
            <h3 className="text-sm font-bold text-black">Active Projects</h3>
          </div>
          <div className="space-y-1.5">
            {kanbanPreview.map(pr => (
              <div key={pr.id} className="flex items-center gap-2">
                <span className={`text-xs px-1.5 py-0.5 rounded font-semibold ${pr.stage==="Deployed"?"bg-green-100 text-green-700":pr.stage==="Pilot"?"bg-orange-100 text-orange-700":pr.stage==="Testing"?"bg-orange-100 text-orange-700":"bg-violet-100 text-violet-700"}`}>{pr.stage}</span>
                <span className="text-xs text-black truncate flex-1">{pr.title}</span>
                {pr.atRisk && <span className="text-xs text-orange-600 font-semibold">⚠️</span>}
              </div>
            ))}
          </div>
          <Link to="/university/projects" className="text-xs text-blue-600 font-semibold flex items-center gap-1 mt-3 hover:underline">View all <ChevronRight size={12}/></Link>
        </div>

        {/* Team Workload */}
        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Users size={16} className="text-violet-500"/>
            <h3 className="text-sm font-bold text-black">Team Workload</h3>
          </div>
          <p className="text-3xl font-black text-violet-600">{teamCount}</p>
          <p className="text-xs text-black mt-1">Members committed</p>
          <div className="mt-2 h-2 bg-white rounded-full overflow-hidden">
            <div className="h-full bg-violet-400 rounded-full" style={{width:`${Math.min(100,(teamCount/30)*100)}%`}}/>
          </div>
          <p className="text-xs text-black mt-1">{teamCount}/30 capacity</p>
        </div>

        {/* Capacity Calendar */}
        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={16} className="text-orange-500"/>
            <h3 className="text-sm font-bold text-black">Q2 2026 Pipeline</h3>
          </div>
          <p className="text-3xl font-black text-orange-600">74%</p>
          <p className="text-xs text-black mt-1">Capacity filled</p>
          <div className="mt-2 h-2 bg-white rounded-full overflow-hidden">
            <div className="h-full bg-orange-400 rounded-full" style={{width:"74%"}}/>
          </div>
          <p className="text-xs text-black mt-1">6 of max 8 slots taken</p>
        </div>

        {/* Pending Proposals */}
        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={16} className="text-green-500"/>
            <h3 className="text-sm font-bold text-black">Pending Proposals</h3>
          </div>
          <p className="text-3xl font-black text-green-600">{pendingProposals}</p>
          <p className="text-xs text-black mt-1">Awaiting approval</p>
          <Link to="/university/proposals/new" className="text-xs text-green-600 font-semibold flex items-center gap-1 mt-3 hover:underline">New proposal <ChevronRight size={12}/></Link>
        </div>
      </div>

      {/* ACTIVITY FEED */}
      <div className="bg-white rounded-xl border border-blue-100 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Bell size={16} className="text-black"/>
          <h2 className="text-sm font-bold text-black">Recent Activity</h2>
        </div>
        <div className="space-y-3">
          {activityFeed.map(a => (
            <div key={a.id} className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0">
              <span className="text-lg flex-shrink-0">{a.icon}</span>
              <div className="flex-1">
                <p className="text-sm text-black">{a.text}</p>
                <p className="text-xs text-black mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
