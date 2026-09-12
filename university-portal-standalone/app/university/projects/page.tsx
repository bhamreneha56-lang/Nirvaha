"use client";
import { useState } from "react";
import { projects, faculty, STAGE_ORDER, getStageColor } from "@/lib/mockData";
import type { Stage } from "@/lib/mockData";
import { AlertTriangle, Calendar, ChevronRight, X, MessageSquare, FileText, DollarSign } from "lucide-react";

export default function ProjectsPage() {
  const [board, setBoard] = useState(projects);
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  const moveStage = (id: string, dir: 1|-1) => {
    setBoard(prev => prev.map(p => {
      if (p.id !== id) return p;
      const idx = STAGE_ORDER.indexOf(p.stage as Stage);
      const next = STAGE_ORDER[Math.max(0, Math.min(STAGE_ORDER.length-1, idx+dir))];
      return { ...p, stage: next };
    }));
  };

  const getFacultyName = (id: string) => faculty.find(f => f.id === id)?.name.split(" ").pop() || "";

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Active Projects</h1>
        <p className="text-sm text-slate-500 mt-0.5">Kanban board — {board.length} projects across all stages</p>
      </div>

      {/* Kanban */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max pb-4">
          {STAGE_ORDER.map(stage => {
            const cols = board.filter(p => p.stage === stage);
            return (
              <div key={stage} className="w-64 flex-shrink-0">
                <div className={`flex items-center gap-2 mb-3 px-3 py-2 rounded-xl ${getStageColor(stage)}`}>
                  <span className="text-sm font-bold">{stage}</span>
                  <span className="ml-auto text-xs font-black bg-white/60 rounded-full w-5 h-5 flex items-center justify-center">{cols.length}</span>
                </div>
                <div className="space-y-3">
                  {cols.map(pr => (
                    <div key={pr.id} onClick={() => setSelected(pr)}
                      className={`bg-white rounded-xl border p-3.5 cursor-pointer shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 ${pr.atRisk ? "border-red-300" : "border-slate-200"}`}>
                      {pr.atRisk && (
                        <div className="flex items-center gap-1 text-xs text-red-600 font-bold mb-2 bg-red-50 rounded-lg px-2 py-1">
                          <AlertTriangle size={11}/> At Risk — Overdue
                        </div>
                      )}
                      <p className="text-sm font-bold text-slate-800 leading-tight mb-1.5">{pr.title}</p>
                      <p className="text-xs font-mono text-indigo-500 mb-2">{pr.problemId}</p>
                      {/* Team avatars */}
                      <div className="flex -space-x-1.5 mb-2.5">
                        {pr.team.slice(0,4).map((tid, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-xs font-bold text-indigo-700">
                            {getFacultyName(tid)?.[0] || "S"}
                          </div>
                        ))}
                        {pr.team.length > 4 && <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600">+{pr.team.length-4}</div>}
                      </div>
                      {pr.industryPartner && (
                        <p className="text-xs text-slate-500 mb-2">🏭 {pr.industryPartner}</p>
                      )}
                      <div className={`flex items-center gap-1 text-xs font-semibold ${pr.daysUntilMilestone < 0 ? "text-red-600" : pr.daysUntilMilestone <= 7 ? "text-amber-600" : "text-slate-500"}`}>
                        <Calendar size={11}/>
                        {pr.daysUntilMilestone < 0 ? `${Math.abs(pr.daysUntilMilestone)}d overdue` : `${pr.daysUntilMilestone}d to milestone`}
                      </div>
                      {/* Move controls */}
                      <div className="flex gap-1 mt-2.5" onClick={e => e.stopPropagation()}>
                        {STAGE_ORDER.indexOf(pr.stage as Stage) > 0 && (
                          <button onClick={() => moveStage(pr.id, -1)} className="flex-1 text-xs py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">← Back</button>
                        )}
                        {STAGE_ORDER.indexOf(pr.stage as Stage) < STAGE_ORDER.length-1 && (
                          <button onClick={() => moveStage(pr.id, 1)} className="flex-1 text-xs py-1 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all">Advance →</button>
                        )}
                      </div>
                    </div>
                  ))}
                  {cols.length === 0 && (
                    <div className="border-2 border-dashed border-slate-200 rounded-xl h-20 flex items-center justify-center text-xs text-slate-400">Empty</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end lg:items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className={`flex items-start justify-between p-5 border-b border-slate-100 ${selected.atRisk ? "bg-red-50" : ""}`}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${getStageColor(selected.stage)}`}>{selected.stage}</span>
                  {selected.atRisk && <span className="text-xs text-red-600 font-bold flex items-center gap-1"><AlertTriangle size={11}/> At Risk</span>}
                </div>
                <h2 className="text-lg font-black text-slate-900">{selected.title}</h2>
                <p className="text-xs font-mono text-indigo-500 mt-0.5">{selected.problemId}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-1.5 hover:bg-slate-100 rounded-lg"><X size={18}/></button>
            </div>

            <div className="p-5 space-y-5">
              {/* Milestone tracker */}
              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2"><Calendar size={14}/> Milestone Tracker</h3>
                <div className="space-y-2">
                  {STAGE_ORDER.map((s, i) => {
                    const done = STAGE_ORDER.indexOf(selected.stage as Stage) > i;
                    const current = s === selected.stage;
                    return (
                      <div key={s} className={`flex items-center gap-3 p-2.5 rounded-lg ${current ? "bg-indigo-50 border border-indigo-200" : done ? "bg-green-50" : "bg-slate-50"}`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${done ? "bg-green-500 text-white" : current ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"}`}>
                          {done ? "✓" : i+1}
                        </div>
                        <span className={`text-sm font-medium ${current ? "text-indigo-700 font-bold" : done ? "text-green-700" : "text-slate-500"}`}>{s}</span>
                        {current && <span className="ml-auto text-xs text-indigo-600 font-semibold">Current Stage</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Funding */}
              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><DollarSign size={14}/> Funding Status</h3>
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-500">₹{(selected.fundingReceived/100000).toFixed(1)}L received</span>
                    <span className="font-bold text-slate-800">₹{(selected.fundingTotal/100000).toFixed(1)}L total</span>
                  </div>
                  <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{width:`${(selected.fundingReceived/selected.fundingTotal)*100}%`}}/>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{Math.round((selected.fundingReceived/selected.fundingTotal)*100)}% disbursed</p>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><FileText size={14}/> Documents</h3>
                <div className="space-y-1.5">
                  {["Project Proposal.pdf","Team Formation Report.pdf","Progress Report Q1.pdf","Budget Utilization Statement.xlsx"].map(doc => (
                    <div key={doc} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <span className="text-base">📄</span>
                      <span className="text-sm text-slate-700 flex-1">{doc}</span>
                      <span className="text-xs text-indigo-600 font-semibold">Download</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Communication thread */}
              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><MessageSquare size={14}/> Thread</h3>
                <div className="space-y-2">
                  {[
                    { from: "Industry Partner (NTPC)", msg: "Great progress on hardware integration. Please share Q2 report.", time: "3 days ago" },
                    { from: "BIT Mesra Team", msg: "Report uploaded. Sensor calibration complete — moving to field test.", time: "2 days ago" },
                    { from: "Govt Nodal Officer", msg: "Approved field test permission for Subarnarekha basin sites.", time: "1 day ago" },
                  ].map((m,i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-xs font-bold text-slate-700">{m.from}</p>
                      <p className="text-sm text-slate-600 mt-0.5">{m.msg}</p>
                      <p className="text-xs text-slate-400 mt-1">{m.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industry partner */}
              {selected.industryPartner && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <p className="text-xs font-bold text-amber-700">Industry Partner</p>
                  <p className="text-sm font-semibold text-slate-800 mt-1">🏭 {selected.industryPartner}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
