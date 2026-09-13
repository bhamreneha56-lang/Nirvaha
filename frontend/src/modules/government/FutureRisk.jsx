import React from 'react';
import { AlertTriangle, TrendingUp, Map } from 'lucide-react';

export default function FutureRisk() {
  const risks = [
    { id: 'RISK-01', type: 'Urban Flooding', location: 'Ranchi, Lowland Wards', probability: 88, window: '2-3 Weeks', status: 'MONITORING' },
    { id: 'RISK-02', type: 'Dengue Outbreak', location: 'Dhanbad, Sector 4', probability: 72, window: '1 Month', status: 'ACTION_REQUIRED' }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-black tracking-tight">Future Risk Center</h1>
          <p className="text-sm text-black font-medium">Predictive models identifying potential crises before they happen.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {risks.map(r => (
          <div key={r.id} className="bg-white rounded-xl border border-blue-100 shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${r.status === 'ACTION_REQUIRED' ? 'bg-orange-100 text-orange-600' : 'bg-orange-100 text-orange-600'}`}>
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black">{r.type}</h3>
                  <div className="text-sm font-medium text-black">{r.location}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-black ${r.status === 'ACTION_REQUIRED' ? 'text-orange-600' : 'text-orange-600'}`}>{r.probability}%</div>
                <div className="text-[10px] font-bold text-black uppercase tracking-widest">Probability</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-blue-100 mb-6">
              <div className="text-xs font-bold text-black mb-2">Prediction Window: <span className="text-blue-600">{r.window}</span></div>
              <div className="text-xs text-black">Factors: Historical weather patterns, drainage blockages, population density.</div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex-1 bg-blue-600 text-white font-bold text-sm py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Create Preventive Action
              </button>
              <button className="flex-1 border border-blue-100 text-black font-bold text-sm py-2 rounded-lg hover:bg-white transition-colors">
                Dismiss Risk
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
