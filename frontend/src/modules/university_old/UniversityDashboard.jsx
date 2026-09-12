import React, { useState, useContext } from 'react';
import SidebarLayout from '../shared/SidebarLayout';
import { AppContext } from '../../context/AppContext';

export default function UniversityDashboard() {
  const { state, dispatch } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [accepted, setAccepted] = useState([]);

  // Mock activity feed
  const activityFeed = [
    { id: 1, icon: "🔥", text: "Dr. Anjali Verma verified Phase 1 for 'Low-cost bio-toilet'", time: "2 hours ago" },
    { id: 2, icon: "📋", text: "New challenge matched your domain: IoT water ATM", time: "5 hours ago" },
    { id: 3, icon: "💬", text: "Industry partner TataTech responded to your proposal", time: "1 day ago" }
  ];

  // Render content based on sidebar tab
  const renderContent = () => {
    if (activeTab === 'challenges') {
      return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 min-h-[500px]">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.problems.map(p => (
              <div key={p.id} className="border border-slate-200 rounded-xl p-5 hover:border-indigo-300 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded">{p.category}</span>
                  <span className="text-xs font-bold text-slate-500">{p.reportedOn}</span>
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{p.title}</h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{p.description}</p>
                <button className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-bold w-full hover:bg-indigo-100 transition-colors">
                  View Full Details
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'projects') {
      return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 min-h-[500px]">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Active Projects</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-sm">
                  <th className="pb-3 font-semibold">Project Title</th>
                  <th className="pb-3 font-semibold">Industry Partner</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Funding</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {state.projects.map(pr => (
                  <tr key={pr.id} className="border-b border-slate-100">
                    <td className="py-4 font-bold text-slate-800">{pr.title}</td>
                    <td className="py-4 text-slate-600">{state.projects.find(x => x.id === pr.id)?.industryId || "Unknown"}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md font-bold text-xs">
                        {pr.status}
                      </span>
                    </td>
                    <td className="py-4 font-bold text-emerald-600">₹{pr.funding.ask.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // Default: Dashboard Overview
    return (
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Content Area */}
        <div className="flex-1 space-y-8">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 opacity-5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h1 className="text-3xl font-black text-slate-900 mb-2">University Dashboard</h1>
              <p className="text-slate-600 font-medium">Manage research projects, discover AI-matched challenges, and collaborate with industry.</p>
            </div>
            <div className="relative z-10 shrink-0">
              <button onClick={() => setActiveTab('challenges')} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2">
                Explore Challenges &rarr;
              </button>
            </div>
          </div>

          {/* AI Matched Challenges */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <h2 className="text-xl font-bold text-slate-900">AI Matched for Your Labs</h2>
              </div>
              <button onClick={() => setActiveTab('challenges')} className="text-sm font-bold text-indigo-600 hover:underline">View All</button>
            </div>
            
            <div className="space-y-4">
              {state.problems.slice(0, 3).map(p => (
                <div key={p.id} className="border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:border-indigo-300 transition-all bg-slate-50/50">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="text-xs font-bold px-2 py-1 bg-white border border-slate-200 text-slate-600 rounded-full">{p.category}</span>
                      <span className="text-xs font-bold px-2 py-1 bg-red-50 text-red-700 border border-red-100 rounded-full">High Priority</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg">{p.title}</h3>
                    
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">92% Match with your Civil Eng Dept</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 shrink-0">
                    {accepted.includes(p.id) ? (
                      <span className="text-sm text-emerald-700 bg-emerald-100 border border-emerald-200 rounded-lg px-4 py-2 font-bold text-center">
                        ✓ Accepted
                      </span>
                    ) : (
                      <>
                        <button className="text-sm font-bold bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                          View Details
                        </button>
                        <button onClick={() => setAccepted([...accepted, p.id])} className="text-sm font-bold bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                          Quick Accept
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
        
        {/* Right Sidebar */}
        <div className="w-full lg:w-80 shrink-0 space-y-6">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-center">
              <div className="text-indigo-500 mb-2 text-2xl">💼</div>
              <div className="text-2xl font-black text-slate-800">{state.projects.length}</div>
              <div className="text-xs font-bold text-slate-500 uppercase mt-1">Active Projects</div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-center">
              <div className="text-violet-500 mb-2 text-2xl">👥</div>
              <div className="text-2xl font-black text-slate-800">14</div>
              <div className="text-xs font-bold text-slate-500 uppercase mt-1">Team Members</div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-center">
              <div className="text-amber-500 mb-2 text-2xl">📅</div>
              <div className="text-2xl font-black text-slate-800">74%</div>
              <div className="text-xs font-bold text-slate-500 uppercase mt-1">Lab Capacity</div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-center">
              <div className="text-emerald-500 mb-2 text-2xl">📄</div>
              <div className="text-2xl font-black text-slate-800">3</div>
              <div className="text-xs font-bold text-slate-500 uppercase mt-1">Proposals</div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-slate-400">🔔</span> Recent Activity
            </h3>
            <div className="space-y-4">
              {activityFeed.map(a => (
                <div key={a.id} className="flex gap-3 border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                  <div className="text-lg shrink-0">{a.icon}</div>
                  <div>
                    <p className="text-sm text-slate-700">{a.text}</p>
                    <p className="text-xs text-slate-400 mt-1">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    );
  };

  return (
    <SidebarLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      roleTitle="University Innovation Portal" 
      userName="BIT Mesra Admin"
    >
      {renderContent()}
    </SidebarLayout>
  );
}
