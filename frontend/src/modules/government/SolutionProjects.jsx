import React from 'react';
import { Briefcase, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export default function SolutionProjects() {
  const { dispatch } = useSimulation();
  
  const projects = [
    { id: 'PROJ-992', title: 'IoT Smart Water Grid Pilot', stage: 'PILOT', partner: 'IIT ISM Dhanbad', progress: 85, status: 'ON_TRACK' },
    { id: 'PROJ-841', title: 'Automated Pothole Mapping', stage: 'DEPLOYMENT', partner: 'BIT Mesra', progress: 40, status: 'AT_RISK' },
    { id: 'PROJ-722', title: 'Solar Microgrid Integration', stage: 'PROTOTYPE', partner: 'Tata Steel', progress: 15, status: 'ON_TRACK' }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Solution Projects</h1>
          <p className="text-sm text-slate-500 font-medium">Manage the lifecycle of ongoing collaborations, pilots, and deployments.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-4">
            {projects.map(p => (
              <div key={p.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded border border-blue-100 mb-2 inline-block">
                      {p.id}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                    <div className="text-sm text-slate-500 font-medium mt-1">Lead Partner: {p.partner}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black uppercase tracking-widest bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                      Stage: {p.stage}
                    </span>
                  </div>
                </div>

                <div className="mb-2 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-600">Project Completion</span>
                  <span className={p.status === 'AT_RISK' ? 'text-amber-600' : 'text-green-600'}>{p.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                  <div className={`h-full rounded-full ${p.status === 'AT_RISK' ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${p.progress}%` }}></div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => dispatch({ type: 'ADD_TOAST', payload: { title: 'Milestones', message: `Loading milestones for ${p.id}...`, type: 'info' } })}
                    className="px-4 py-1.5 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 transition-colors"
                  >
                    View Milestones
                  </button>
                  <button 
                    onClick={() => dispatch({ type: 'ADD_TOAST', payload: { title: 'Impact Metrics', message: `Generating impact report for ${p.id}...`, type: 'info' } })}
                    className="px-4 py-1.5 border border-slate-200 text-slate-700 rounded text-xs font-bold hover:bg-slate-50 transition-colors"
                  >
                    View Impact Metrics
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
