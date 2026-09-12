import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Map, 
  Layers, 
  Radio, 
  Crosshair, 
  AlertTriangle, 
  Compass, 
  ShieldCheck, 
  Send, 
  Maximize2, 
  Search, 
  Activity, 
  Sliders, 
  Navigation,
  FileSpreadsheet,
  Eye
} from 'lucide-react';
import GISMap, { JHARKHAND_DISTRICTS } from './GISMap';

import { useSimulation } from '../../context/SimulationContext';

export default function GISDashboard() {
  const { state, dispatch } = useSimulation();
  const { problems, stats } = state;

  const [selectedDistrict, setSelectedDistrict] = useState('Ranchi');
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [activeTab, setActiveTab] = useState('CLUSTERS'); // CLUSTERS, EARLY_WARNINGS, DISPATCH

  const handlePanToDistrict = (districtName) => {
    setSelectedDistrict(districtName);
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        title: `GIS Viewport Locked: ${districtName}`,
        message: `Spatial intelligence radar aligned to ${districtName}.`,
        type: 'info'
      }
    });
  };

  const handleBroadcastGeofence = () => {
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        title: 'Geofenced Advisory Broadcast',
        message: `Emergency SMS advisory sent to 14,200 citizens in ${selectedDistrict} flood buffer zone.`,
        type: 'warning'
      }
    });
  };

  const handleDeployDrone = () => {
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        title: 'Survey Drone Dispatched',
        message: `Autonomous inspection drone launched for ${selectedDistrict} critical cluster coordinates.`,
        type: 'success'
      }
    });
  };

  return (
    <div className="space-y-6 font-sans">
      {/* 1. GIS COMMAND DECK HERO STRIP */}
      <div className="bg-white text-slate-900 p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 tactical-grid-light opacity-30 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded bg-amber-50 border border-amber-200 text-amber-600">
                <Navigation size={18} />
              </span>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 uppercase font-sans">
                State GIS & Spatial Operations Deck
              </h1>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold animate-pulse">
                SAT-FEED ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Real-time multi-layer spatial analytics across all 24 Jharkhand administrative districts.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-left shadow-sm">
              <div className="text-[9px] font-mono text-slate-500 font-bold uppercase">Geotagged Cases</div>
              <div className="text-lg font-mono font-black text-amber-600">{problems.length} LIVE</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-left shadow-sm">
              <div className="text-[9px] font-mono text-slate-500 font-bold uppercase">DBSCAN Hotspots</div>
              <div className="text-lg font-mono font-black text-rose-600">3 IDENTIFIED</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-left shadow-sm">
              <div className="text-[9px] font-mono text-slate-500 font-bold uppercase">Surveillance Buffer</div>
              <div className="text-lg font-mono font-black text-emerald-600">100% COVERAGE</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE: SIDEBAR + FULL INTERACTIVE MAP + ANALYTICS */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Side: District Index & Spatial Filters */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          {/* District Quick-Launch Panel */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Compass size={14} className="text-blue-600" />
                <span>District Navigation</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400">24 Districts</span>
            </div>

            <div className="space-y-1 max-h-[320px] overflow-y-auto pr-1">
              {JHARKHAND_DISTRICTS.filter(d => d.name !== 'All Districts').map((dist) => (
                <button
                  key={dist.name}
                  onClick={() => handlePanToDistrict(dist.name)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                    selectedDistrict === dist.name
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                      : 'hover:bg-slate-50 text-slate-700 border border-transparent hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${selectedDistrict === dist.name ? 'bg-amber-500' : 'bg-slate-300'}`}></span>
                    <span>{dist.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{dist.lat.toFixed(1)}°N</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Action Operations Box */}
          <div className="bg-white text-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 space-y-2.5">
            <div className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1">
              <Crosshair size={12} className="text-amber-600" />
              <span>RAPID SPATIAL DISPATCH</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Direct telemetry intervention in selected corridor ({selectedDistrict}):
            </p>
            <button
              onClick={handleDeployDrone}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs py-2 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <Send size={13} />
              <span>Deploy Inspection Drone</span>
            </button>
            <button
              onClick={handleBroadcastGeofence}
              className="w-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <Radio size={13} className="text-amber-600" />
              <span>Geofenced Citizen Alert</span>
            </button>
          </div>
        </div>

        {/* Center & Right: Interactive GIS Map Deck */}
        <div className="col-span-12 lg:col-span-9 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xl h-[620px]">
            <GISMap 
              height="100%" 
              showExpandedControls={true}
              selectedDistrictProp={selectedDistrict}
              onDistrictSelect={(d) => setSelectedDistrict(d)}
            />
          </div>

          {/* Bottom Telemetry Feed Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-200">
                <AlertTriangle size={20} />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">CLUSTER ALERTS</div>
                <div className="text-sm font-extrabold text-slate-900">Ranchi Ward 12 (Water)</div>
                <div className="text-[10px] text-red-600 font-bold">47 Cases Clustered</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-200">
                <Activity size={20} />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">EARLY WARNING</div>
                <div className="text-sm font-extrabold text-slate-900">Subarnarekha Drainage</div>
                <div className="text-[10px] text-indigo-600 font-bold">84% Inundation Risk</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                <ShieldCheck size={20} />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">OUTCOME VALIDATION</div>
                <div className="text-sm font-extrabold text-slate-900">94.8% Citizen Verified</div>
                <div className="text-[10px] text-emerald-600 font-bold">0 Pending Tamper Cases</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
