import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { AlertCircle, Clock, ShieldAlert, ChevronRight, CheckSquare } from 'lucide-react';

export default function SLAEscalations() {
  const { state, dispatch } = useSimulation();
  const { problems, globalFilters } = state;

  const filteredProblems = problems.filter(p => 
    globalFilters.district === 'All Districts' || p.district === globalFilters.district
  );

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">SLA & Escalation Control Room</h1>
          <p className="text-sm text-slate-500 font-medium">Monitor service level agreements, process escalations, and manage overdue cases.</p>
        </div>
      </div>

      {/* SLA Tiers */}
      <div className="grid grid-cols-4 gap-6 mb-6 shrink-0">
        <div className="bg-white p-5 rounded-2xl border border-green-200 shadow-sm">
          <div className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1 flex items-center justify-between">
            On Track <CheckSquare size={14}/>
          </div>
          <div className="text-3xl font-black text-slate-900">1,421</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm bg-amber-50/30">
          <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1 flex items-center justify-between">
            At Risk <Clock size={14}/>
          </div>
          <div className="text-3xl font-black text-amber-600">84</div>
        </div>
        <div className="bg-red-100 p-5 rounded-2xl border border-red-300 shadow-sm">
          <div className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1 flex items-center justify-between">
            Breached <AlertCircle size={14}/>
          </div>
          <div className="text-3xl font-black text-red-800">22</div>
        </div>
        <div className="bg-red-50 p-5 rounded-2xl border border-red-200 shadow-sm">
          <div className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1 flex items-center justify-between">
            Escalated <ShieldAlert size={14}/>
          </div>
          <div className="text-3xl font-black text-red-700">17</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest">Active Escalations & At-Risk Cases</h2>
        </div>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Problem ID</th>
                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Department</th>
                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">SLA Status</th>
                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Escalation Level</th>
                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProblems.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-slate-900">{p.id}</div>
                    <div className="text-[10px] font-medium text-slate-500 mt-0.5">{p.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-slate-800">{p.category}</div>
                    <div className="text-[10px] text-slate-500">{p.assignedOfficer || 'Unassigned'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-orange-600 mb-1">Risk: 81%</span>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-[81%]"></div>
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1 uppercase font-bold">18h remaining</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {p.escalationLevel > 0 ? (
                      <span className="px-2 py-1 text-[10px] font-black uppercase tracking-widest rounded border bg-red-50 text-red-700 border-red-200">L{p.escalationLevel} Escalation</span>
                    ) : (
                      <span className="text-xs font-bold text-slate-400">?"</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => dispatch({ type: 'OPEN_CASE_DRAWER', payload: p.id })}
                      className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-1.5 rounded-lg text-[10px] font-bold shadow-sm transition-colors"
                    >
                      Review Case
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
