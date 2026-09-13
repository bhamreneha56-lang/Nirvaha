import React from 'react';
import { Search, Store, Filter } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export default function SolutionMarketplace() {
  const { dispatch } = useSimulation();

  const solutions = [
    { id: 'SOL-01', title: 'Smart Water IoT Meters', provider: 'IIT Roorkee', domain: 'Water', readyness: 'Deployed', cost: '₹12k/unit' },
    { id: 'SOL-02', title: 'AI Traffic Optimization', provider: 'TCS Analytics', domain: 'Transport', readyness: 'Ready', cost: '₹15L/zone' },
    { id: 'SOL-03', title: 'Drone Survey Suite', provider: 'Garuda Tech', domain: 'Infrastructure', readyness: 'Pilot', cost: '₹5L/mo' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-black tracking-tight">Solution Marketplace</h1>
          <p className="text-sm text-black font-medium">Discover off-the-shelf academic and industrial solutions for governance problems.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
            <input type="text" placeholder="Search technologies..." className="pl-9 pr-4 py-2 border border-blue-100 rounded-lg text-sm outline-none focus:border-blue-500 w-64" />
          </div>
          <button 
            onClick={() => dispatch({ type: 'ADD_TOAST', payload: { title: 'Filters', message: 'Filter panel opened.', type: 'info' } })}
            className="flex items-center gap-2 px-4 py-2 border border-blue-100 rounded-lg text-sm font-bold text-black bg-white shadow-sm hover:bg-white"
          >
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {solutions.map(s => (
          <div key={s.id} className="bg-white rounded-xl border border-blue-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-black mb-4">
              <Store size={24} />
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-black mb-1">{s.domain}</div>
            <h3 className="text-lg font-bold text-black mb-2">{s.title}</h3>
            <div className="text-sm font-medium text-black mb-4">Provider: {s.provider}</div>
            
            <div className="flex items-center justify-between pt-4 border-t border-blue-100">
              <div>
                <div className="text-[10px] uppercase font-bold text-black">Est. Cost</div>
                <div className="text-sm font-black text-black">{s.cost}</div>
              </div>
              <button 
                onClick={() => dispatch({ type: 'ADD_TOAST', payload: { title: 'Demo Requested', message: `Request sent to ${s.provider}.`, type: 'success' } })}
                className="bg-blue-600 text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-blue-700"
              >
                Request Demo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
