import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Search, Filter, ArrowUpDown, MoreVertical, CheckSquare } from 'lucide-react';

export default function Problems() {
  const { state, dispatch } = useSimulation();
  const { problems, globalFilters } = state;

  const [activeTab, setActiveTab] = useState('ALL');

  // Filter problems based on global district/department and local tab
  const filteredProblems = problems.filter(p => {
    if (globalFilters.district !== 'All Districts' && p.district !== globalFilters.district) return false;
    if (activeTab !== 'ALL' && p.status !== activeTab) return false;
    return true;
  });

  const getStatusColor = (status) => {
    if (status.includes('PENDING')) return 'bg-orange-100 text-orange-700 border-orange-200';
    if (status === 'NEW') return 'bg-blue-100 text-blue-700 border-blue-200';
    if (status.includes('CLOSED')) return 'bg-white text-black border-blue-100';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  const getPriorityColor = (score) => {
    if (score >= 90) return 'text-orange-600';
    if (score >= 70) return 'text-orange-500';
    return 'text-green-600';
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-black tracking-tight">Problems & Cases</h1>
          <p className="text-sm text-black font-medium">Manage and route citizen reports across all jurisdictions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-blue-100 rounded-lg text-sm font-bold text-black bg-white shadow-sm hover:bg-white">
            <Filter size={16} /> Filters
          </button>
          <button 
            onClick={() => dispatch({ type: 'ADD_TOAST', payload: { title: 'Exporting...', message: 'The report will download shortly.', type: 'info' } })}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-600"
          >
            Export Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-blue-100 flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center overflow-x-auto border-b border-blue-100 px-2 no-scrollbar shrink-0">
          {['ALL', 'NEW', 'VERIFICATION_PENDING', 'ASSIGNED', 'IN_PROGRESS', 'ESCALATED', 'CLOSED'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-xs font-black tracking-widest uppercase whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? 'border-orange-500 text-orange-600' : 'border-transparent text-black hover:text-black'}`}
            >
              {tab.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-black">Problem ID</th>
                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-black">Details</th>
                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-black">Location</th>
                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-black">Priority</th>
                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-black">Status</th>
                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-black">Officer</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProblems.map(p => (
                <tr 
                  key={p.id} 
                  className="hover:bg-white cursor-pointer transition-colors"
                  onClick={() => dispatch({ type: 'OPEN_CASE_DRAWER', payload: p.id })}
                >
                  <td className="px-6 py-4">
                    <div className="text-xs font-black text-black">{p.id}</div>
                    <div className="text-[10px] font-bold text-black mt-0.5">{p.reportsCount} Linked Reports</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-black">{p.title}</div>
                    <div className="text-xs text-black font-medium mt-0.5">{p.category}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-black">{p.district}</div>
                    <div className="text-[10px] font-bold text-black uppercase mt-0.5">{p.location}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`text-lg font-black ${getPriorityColor(p.priorityScore)}`}>{p.priorityScore}<span className="text-[10px] text-black">/100</span></div>
                    <div className="text-[10px] font-bold text-black">AI Conf: {p.aiConfidence}%</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-widest rounded border ${getStatusColor(p.status)}`}>
                      {p.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {p.assignedOfficer ? (
                      <div className="text-xs font-bold text-black">{p.assignedOfficer}</div>
                    ) : (
                      <div className="text-[10px] font-bold text-orange-500 uppercase">Unassigned</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={(e) => { e.stopPropagation(); dispatch({ type: 'OPEN_CASE_DRAWER', payload: p.id }); }}
                      className="text-black hover:text-black"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProblems.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-3">
                      <CheckSquare size={20} className="text-black" />
                    </div>
                    <div className="text-sm font-bold text-black">No problems found</div>
                    <div className="text-xs text-black mt-1">Try adjusting your filters or search query.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
