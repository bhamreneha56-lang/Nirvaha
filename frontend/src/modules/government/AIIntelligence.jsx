import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Sparkles, BrainCircuit, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export default function AIIntelligence() {
  const { dispatch } = useSimulation();

  const decisions = [
    { id: 'AID-901', problem: 'NIR-008421', type: 'Priority Scoring', recommendation: '94/100', confidence: 98, status: 'ACCEPTED' },
    { id: 'AID-902', problem: 'NIR-008112', type: 'Duplicate Detection', recommendation: 'Cluster with NIR-008101', confidence: 85, status: 'PENDING_HUMAN' },
    { id: 'AID-903', problem: 'NIR-008005', type: 'Auto-Routing', recommendation: 'PHED (Water)', confidence: 92, status: 'ACCEPTED' },
    { id: 'AID-904', problem: 'NIR-007955', type: 'Priority Scoring', recommendation: '82/100', confidence: 65, status: 'OVERRIDDEN' }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">AI Intelligence Engine</h1>
          <p className="text-sm text-slate-500 font-medium">Explainable AI logs, confidence scores, and human-in-the-loop decisions.</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* Main Log */}
        <div className="col-span-8 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <BrainCircuit size={16} /> Recent AI Decisions
            </h2>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white sticky top-0 z-10 shadow-sm border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">ID / Target</th>
                  <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Analysis Type</th>
                  <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Recommendation</th>
                  <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Confidence</th>
                  <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Human Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {decisions.map(d => (
                  <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-xs font-black text-slate-800">{d.id}</div>
                      <div className="text-[10px] font-bold text-slate-400 mt-0.5">{d.problem}</div>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-700">{d.type}</td>
                    <td className="px-6 py-4 text-sm font-bold text-blue-600">{d.recommendation}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full w-16 overflow-hidden">
                          <div className={`h-full ${d.confidence > 90 ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${d.confidence}%` }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-600">{d.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {d.status === 'ACCEPTED' && <span className="px-2 py-1 text-[9px] font-black uppercase rounded bg-green-50 text-green-600 border border-green-200 flex items-center gap-1 w-max"><CheckCircle2 size={10}/> Accepted</span>}
                      {d.status === 'PENDING_HUMAN' && <span className="px-2 py-1 text-[9px] font-black uppercase rounded bg-amber-50 text-amber-600 border border-amber-200 flex items-center gap-1 w-max"><AlertTriangle size={10}/> Review Req</span>}
                      {d.status === 'OVERRIDDEN' && <span className="px-2 py-1 text-[9px] font-black uppercase rounded bg-red-50 text-red-600 border border-red-200 flex items-center gap-1 w-max"><XCircle size={10}/> Overridden</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Explainability Panel */}
        <div className="col-span-4 bg-white rounded-xl shadow-sm border border-slate-200 text-slate-900 p-6 flex flex-col">
          <h3 className="text-xs font-extrabold uppercase tracking-widest mb-6 flex items-center gap-2">
            <Sparkles size={16} className="text-purple-600" /> Explainable AI (XAI)
          </h3>
          <div className="text-sm text-slate-500 mb-6">Select a decision log to view the neural weighting factors that produced the recommendation.</div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="text-[10px] uppercase font-black text-slate-400 mb-4">Inspection: AID-901</div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700">Severity Factor</span>
                  <span className="text-green-600">24/25</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded"><div className="h-full bg-green-500 w-[96%] rounded"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700">Population Density</span>
                  <span className="text-blue-600">28/30</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded"><div className="h-full bg-blue-500 w-[93%] rounded"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700">Historical Urgency</span>
                  <span className="text-amber-600">18/20</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded"><div className="h-full bg-amber-500 w-[90%] rounded"></div></div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 flex gap-2">
              <button 
                onClick={() => dispatch({ type: 'ADD_TOAST', payload: { title: 'AI Recommendation Accepted', message: 'The AI model\'s decision has been recorded.', type: 'success' } })}
                className="flex-1 bg-slate-900 text-white text-xs font-bold py-2 rounded hover:bg-black"
              >
                Accept AI
              </button>
              <button 
                onClick={() => dispatch({ type: 'ADD_TOAST', payload: { title: 'AI Overridden', message: 'Manual override engaged.', type: 'info' } })}
                className="flex-1 border border-slate-300 text-slate-700 text-xs font-bold py-2 rounded hover:bg-slate-100"
              >
                Override
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
