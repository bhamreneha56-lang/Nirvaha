
import { useState } from "react";
import { Link } from "react-router-dom";
import { problems, getSuccessBg, getPriorityColor, PROBLEM_STATUSES } from "./mockData";
import SuccessRing from "./SuccessRing";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

const DOMAINS = ["All", ...Array.from(new Set(problems.map(p => p.domain)))];
const DISTRICTS = ["All", ...Array.from(new Set(problems.map(p => p.district)))];
const PRIORITIES = ["All", "Critical", "High", "Medium", "Low"];
const STATUSES = ["All", ...PROBLEM_STATUSES];

export default function ChallengesPage() {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("All");
  const [district, setDistrict] = useState("All");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [matchedOnly, setMatchedOnly] = useState(false);
  const [sort, setSort] = useState("successChance");

  const filtered = problems
    .filter(p => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.id.toLowerCase().includes(search.toLowerCase())) return false;
      if (domain !== "All" && p.domain !== domain) return false;
      if (district !== "All" && p.district !== district) return false;
      if (priority !== "All" && p.priority !== priority) return false;
      if (status !== "All" && p.status !== status) return false;
      if (matchedOnly && p.aiMatchScore < 70) return false;
      return true;
    })
    .sort((a,b) => sort === "successChance" ? b.aiSuccessChance - a.aiSuccessChance : sort === "recency" ? b.postedDate.localeCompare(a.postedDate) : sort === "priority" ? ["Critical","High","Medium","Low"].indexOf(a.priority) - ["Critical","High","Medium","Low"].indexOf(b.priority) : 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-black">Challenges</h1>
          <p className="text-sm text-black mt-0.5">Browse all civic problems — {filtered.length} showing</p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm space-y-3">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-black"/>
            <input type="text" placeholder="Search by Problem ID or keyword..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          </div>
          <select className="text-sm border border-blue-100 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="successChance">Sort: AI Success %</option>
            <option value="recency">Sort: Latest</option>
            <option value="priority">Sort: Priority</option>
          </select>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <SlidersHorizontal size={14} className="text-black"/>
          {[
            { label: "Domain", value: domain, set: setDomain, options: DOMAINS },
            { label: "District", value: district, set: setDistrict, options: DISTRICTS },
            { label: "Priority", value: priority, set: setPriority, options: PRIORITIES },
            { label: "Status", value: status, set: setStatus, options: STATUSES },
          ].map(f => (
            <select key={f.label} value={f.value} onChange={e => f.set(e.target.value)}
              className="text-xs border border-blue-100 rounded-lg px-2.5 py-1.5 focus:outline-none bg-white text-black">
              {f.options.map(o => <option key={o}>{o === "All" ? `All ${f.label}s` : o}</option>)}
            </select>
          ))}
          <label className="flex items-center gap-1.5 text-xs text-black cursor-pointer">
            <input type="checkbox" checked={matchedOnly} onChange={e => setMatchedOnly(e.target.checked)} className="rounded"/>
            Matched to me only (≥70%)
          </label>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white border-b border-blue-100">
                {["Problem ID","Title","Domain","District","Priority","Status","AI Match","Success %","Posted"].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-black px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id} className={`border-b border-blue-100 hover:bg-blue-500/50 cursor-pointer transition-colors ${i%2===0?"bg-white":"bg-white/30"}`}
                  onClick={() => navigate(`/university/challenges/${p.id}`)}>
                  <td className="px-4 py-3 font-mono text-xs text-blue-600 font-semibold whitespace-nowrap">{p.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-black max-w-xs truncate">{p.title}</p>
                    <p className="text-xs text-black">{p.district}</p>
                  </td>
                  <td className="px-4 py-3"><span className="text-xs bg-blue-500 text-blue-600 border border-blue-400 rounded-full px-2 py-0.5 whitespace-nowrap">{p.domain}</span></td>
                  <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{p.district}</td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full border font-semibold whitespace-nowrap ${getPriorityColor(p.priority)}`}>{p.priority}</span></td>
                  <td className="px-4 py-3"><span className="text-xs bg-white text-black rounded-full px-2 py-0.5 whitespace-nowrap">{p.status}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-16 bg-white rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${p.aiMatchScore>=70?"bg-green-500":p.aiMatchScore>=40?"bg-orange-500":"bg-orange-500"}`} style={{width:`${p.aiMatchScore}%`}}/>
                      </div>
                      <span className={`text-xs font-bold ${p.aiMatchScore>=70?"text-green-600":p.aiMatchScore>=40?"text-orange-600":"text-orange-600"}`}>{p.aiMatchScore}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <SuccessRing score={p.aiSuccessChance} size={36} strokeWidth={4}/>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{p.postedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-black">
              <p className="text-4xl mb-2">🔍</p>
              <p className="font-semibold">No problems match your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
