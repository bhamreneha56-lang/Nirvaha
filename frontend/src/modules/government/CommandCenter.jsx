import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  AlertCircle, 
  Clock, 
  Sparkles, 
  Map, 
  Droplet, 
  Activity, 
  MapPin, 
  Zap, 
  ChevronDown, 
  CheckCircle2, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldAlert, 
  Users, 
  Network, 
  TrendingUp, 
  AlertTriangle, 
  ChevronRight, 
  FileStack,
  Radio,
  Cpu,
  RefreshCw,
  Compass,
  Sliders,
  Crosshair,
  ExternalLink,
  Flame,
  Award,
  BookOpen,
  Filter,
  CheckSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSimulation } from '../../context/SimulationContext';
import { indianStates } from '../../utils/indianStates';
import GISMap, { JHARKHAND_DISTRICTS } from './GISMap';

// 3D Perspective Card Tilt Container
function TiltCard({ children, className = '', depth = 16 }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -5;
    const rotY = ((x - centerX) / centerX) * 5;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', damping: 20, stiffness: 220 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`transition-shadow ${className}`}
    >
      <div style={{ transform: `translateZ(${depth}px)` }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function CommandCenter() {
  const { state, dispatch } = useSimulation();
  const { stats, officers, problems, challenges, auditLogs, globalFilters } = state;

  // Live synchronised mission clock
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const istString = currentTime.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const utcString = currentTime.toLocaleTimeString('en-GB', {
    timeZone: 'UTC',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // Table filters & pagination state
  const [tableFilter, setTableFilter] = useState('ALL'); // ALL, CRITICAL, PENDING, AT_RISK
  const [tableSearch, setTableSearch] = useState('');
  const [selectedAuditType, setSelectedAuditType] = useState('ALL');

  // Filter problems for compact government table
  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      const matchSearch = 
        p.id.toLowerCase().includes(tableSearch.toLowerCase()) ||
        p.title.toLowerCase().includes(tableSearch.toLowerCase()) ||
        p.district.toLowerCase().includes(tableSearch.toLowerCase());

      if (!matchSearch) return false;
      if (tableFilter === 'CRITICAL') return p.severity === 'Critical';
      if (tableFilter === 'PENDING') return p.status === 'VERIFICATION_PENDING' || p.status === 'NEW';
      if (tableFilter === 'AT_RISK') return p.priorityScore > 80;
      return true;
    });
  }, [problems, tableSearch, tableFilter]);

  // Filtered audit logs
  const filteredAuditLogs = useMemo(() => {
    if (selectedAuditType === 'ALL') return auditLogs;
    return auditLogs.filter((log) => log.type === selectedAuditType);
  }, [auditLogs, selectedAuditType]);

  // Quick Action Handlers (Zero dead buttons!)
  const handleTriggerDBSCAN = () => {
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        title: '⚡ DBSCAN Clustering Triggered',
        message: 'Spatial clustering algorithm executed across 12,482 points. 3 critical root-cause clusters verified.',
        type: 'info'
      }
    });
  };

  const handleScanEarlyWarnings = () => {
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        title: '🛡️ Predictive Sentinel Scan Complete',
        message: 'Scanned hydrological & terrain telemetry. Monsoon flood warning generated for Subarnarekha Basin.',
        type: 'warning'
      }
    });
  };

  const handleLaunchMasterChallenge = () => {
    dispatch({
      type: 'START_WORKFLOW',
      payload: {
        action: 'CREATE_MASTER_CHALLENGE',
        clusterId: 'CLUSTER-902',
        title: 'High-Pothole Monsoonal Bitumen Erosion Prevention',
        location: 'Dhanbad Mining Corridor'
      }
    });
  };

  const handleSimulateEmergency = () => {
    dispatch({
      type: 'SIMULATE_NEW_REPORT',
      payload: {
        title: 'Arsenic Contamination in Tube-wells',
        severity: 'Critical',
        priorityScore: 97,
        category: 'Water & Sanitation',
        location: 'Ward 4, Ranchi'
      }
    });
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        title: '🚨 Critical Ingestion Alert',
        message: 'New Critical Problem NIR-2026-00482 injected. AI priority assigned 97/100.',
        type: 'error'
      }
    });
  };

  const handleAuditOutcomes = () => {
    setTableFilter('PENDING');
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        title: 'Audit Filter Applied',
        message: 'Displaying cases awaiting citizen validation or physical inspection.',
        type: 'info'
      }
    });
  };

  return (
    <div className="space-y-6 pb-20 font-sans select-none">
      
      {/* 1. MISSION CRITICAL TELEMETRY TICKER TOP BAR */}
      <div className="bg-white text-slate-900 rounded-2xl border border-slate-200 p-4 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 tactical-grid-light opacity-40 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left: Operations Center Identity */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-[10px] bg-white flex flex-col items-center justify-center border border-amber-400">
                <span className="font-serif font-black text-amber-600 text-xl leading-none">नि</span>
                <span className="text-[7px] font-mono text-amber-800 font-bold tracking-widest mt-0.5">OPS</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl lg:text-2xl font-black tracking-tight text-slate-900 uppercase font-sans">
                  NIRVAHA Central Governance Command Center
                </h1>
                <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[9px] font-mono font-black tracking-widest animate-pulse flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span> LIVE
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium flex items-center gap-2 mt-0.5">
                <span className="text-amber-700 font-bold">STATE LEVEL OPERATIONS</span>
                <span>•</span>
                <span>Govt of Jharkhand Problem Intelligence</span>
                <span>•</span>
                <span className="font-mono text-emerald-700 font-bold">ALL SYSTEMS OPERATIONAL</span>
              </div>
            </div>
          </div>

          {/* Right: Real-time Telemetry Status Badges & Clocks */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Clocks */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 flex items-center gap-3 shadow-sm">
              <div className="text-left font-mono">
                <div className="text-[8px] text-slate-400 font-bold tracking-widest uppercase">IST TIME</div>
                <div className="text-xs font-black text-amber-700">{istString}</div>
              </div>
              <div className="w-px h-6 bg-slate-200"></div>
              <div className="text-left font-mono">
                <div className="text-[8px] text-slate-400 font-bold tracking-widest uppercase">UTC TIME</div>
                <div className="text-xs font-black text-slate-700">{utcString}</div>
              </div>
            </div>

            {/* Status Pills */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-[10px] font-mono font-bold shadow-sm">
              <div className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>24 DISTRICTS MONITORED</span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1 text-blue-700">
                <Radio size={12} className="animate-spin text-blue-600" style={{ animationDuration: '8s' }} />
                <span>GIS RADAR ACTIVE</span>
              </div>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={handleSimulateEmergency}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-xs shadow-md flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Zap size={14} className="animate-bounce" />
              <span>Simulate Event</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. HIGH-DENSITY 3D KPI RIBBON (5 USPs + Operations) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        
        {/* Card 1: Grievance Velocity & Active Cases */}
        <TiltCard className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
              <Layers size={12} className="text-slate-500" />
              GRIEVANCE VELOCITY
            </span>
            <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-red-50 text-red-600 flex items-center font-mono">
              <ArrowUpRight size={11} /> 14.2/h
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 font-sans tracking-tight mt-1">
            {stats.totalProblems.toLocaleString()}
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
            <span>Critical: <strong className="text-red-600 font-mono">{stats.critical}</strong></span>
            <span>Pending: <strong className="text-orange-600 font-mono">{stats.pending}</strong></span>
          </div>
        </TiltCard>

        {/* Card 2: Systemic Root Cause Clusters (USP 1) */}
        <TiltCard className="bg-white rounded-xl border border-rose-200 p-3.5 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-mono font-black text-rose-600 uppercase tracking-widest flex items-center gap-1">
              <Network size={12} className="text-rose-600" />
              ROOT CAUSE CLUSTERS
            </span>
            <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-rose-50 text-rose-700 font-mono">
              DBSCAN
            </span>
          </div>
          <div className="text-2xl font-black text-rose-600 font-sans tracking-tight mt-1">
            {stats.pipeline.clusters} Clusters
          </div>
          <div className="mt-2 pt-2 border-t border-rose-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
            <span>Water / Roads Hotspots</span>
            <span className="text-rose-600 font-bold font-mono">68% Converted</span>
          </div>
        </TiltCard>

        {/* Card 3: Predictive Early Warning Alerts (USP 2) */}
        <TiltCard className="bg-white rounded-xl border border-indigo-200 p-3.5 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-mono font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1">
              <Sparkles size={12} className="text-indigo-600" />
              EARLY WARNINGS
            </span>
            <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono">
              AI FORECAST
            </span>
          </div>
          <div className="text-2xl font-black text-indigo-600 font-sans tracking-tight mt-1">
            {stats.aiPredicted} Emerging
          </div>
          <div className="mt-2 pt-2 border-t border-indigo-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
            <span>Flood & Gas Risks</span>
            <span className="text-indigo-600 font-bold font-mono">48h Horizon</span>
          </div>
        </TiltCard>

        {/* Card 4: Outcome Verification Rate (USP 3) */}
        <TiltCard className="bg-white rounded-xl border border-emerald-200 p-3.5 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-mono font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1">
              <Award size={12} className="text-emerald-600" />
              OUTCOME VERIFIED
            </span>
            <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono">
              CITIZEN
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-600 font-sans tracking-tight mt-1">
            {stats.verificationRate}%
          </div>
          <div className="mt-2 pt-2 border-t border-emerald-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
            <span>Zero Unverified Close</span>
            <span className="text-emerald-700 font-bold font-mono">SLA {stats.slaCompliance}%</span>
          </div>
        </TiltCard>

        {/* Card 5: Controlled Master Challenges (USP 4) */}
        <TiltCard className="bg-white rounded-xl border border-purple-200 p-3.5 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-mono font-black text-purple-600 uppercase tracking-widest flex items-center gap-1">
              <FileStack size={12} className="text-purple-600" />
              MASTER CHALLENGES
            </span>
            <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-purple-50 text-purple-700 font-mono">
              CSR / UNI
            </span>
          </div>
          <div className="text-2xl font-black text-purple-600 font-sans tracking-tight mt-1">
            ₹12.4 Cr
          </div>
          <div className="mt-2 pt-2 border-t border-purple-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
            <span>{challenges.length} Active Challenges</span>
            <span className="text-purple-600 font-bold font-mono">18 Partners</span>
          </div>
        </TiltCard>

        {/* Card 6: Knowledge Records Reused (USP 5) */}
        <TiltCard className="bg-white rounded-xl border border-teal-200 p-3.5 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-mono font-black text-teal-600 uppercase tracking-widest flex items-center gap-1">
              <BookOpen size={12} className="text-teal-600" />
              KNOWLEDGE REUSE
            </span>
            <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-teal-50 text-teal-700 font-mono">
              TWINS
            </span>
          </div>
          <div className="text-2xl font-black text-teal-600 font-sans tracking-tight mt-1">
            127 Matches
          </div>
          <div className="mt-2 pt-2 border-t border-teal-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
            <span>6 Direct Adaptations</span>
            <span className="text-teal-700 font-bold font-mono">-41% Turnaround</span>
          </div>
        </TiltCard>
      </div>

      {/* 3. CENTER ROW: INTERACTIVE GIS MINI-COMMAND DECK & AI ACTION MATRIX */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Left 7 Columns: Interactive GIS Radar Map with direct link to Full GIS */}
        <div className="col-span-12 xl:col-span-7 bg-white rounded-2xl border border-slate-200 p-3 shadow-md flex flex-col">
          <div className="flex items-center justify-between mb-2.5 px-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Map size={14} className="text-blue-600" />
                <span>Geographical Problem Intelligence (Live Radar)</span>
              </h2>
            </div>

            <Link
              to="/government/gis"
              className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >

              <span>Launch Full GIS Deck</span>
              <ExternalLink size={12} />
            </Link>
          </div>

          {/* GIS Map Canvas with 3D Radar Overlays */}
          <div className="flex-1 min-h-[420px] rounded-xl overflow-hidden border border-slate-200 relative">
            <GISMap height="100%" showExpandedControls={true} />
          </div>
        </div>

        {/* Right 5 Columns: AI Decision Support & Rapid Command Dispatch */}
        <div className="col-span-12 xl:col-span-5 flex flex-col gap-4">
          
          {/* Quick Action Command Panel */}
          <div className="bg-white text-slate-900 rounded-2xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <div className="text-xs font-mono font-black text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                <Crosshair size={14} className="text-amber-600" />
                <span>RAPID OPERATIONAL COMMANDS</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={handleTriggerDBSCAN}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left p-2.5 rounded-xl transition-all transform hover:-translate-y-0.5 shadow-sm group"
              >
                <div className="text-[10px] font-mono text-amber-600 font-bold flex items-center gap-1 mb-1">
                  <Zap size={11} /> TRIGGER DBSCAN
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Cluster Grievances</div>
                <div className="text-[9px] text-slate-500 mt-0.5">Detect recurring root causes</div>
              </button>

              <button
                onClick={handleScanEarlyWarnings}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left p-2.5 rounded-xl transition-all transform hover:-translate-y-0.5 shadow-sm group"
              >
                <div className="text-[10px] font-mono text-indigo-600 font-bold flex items-center gap-1 mb-1">
                  <Sparkles size={11} /> SCAN WARNINGS
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">Predictive Threat Scan</div>
                <div className="text-[9px] text-slate-500 mt-0.5">Hydrological & structural AI</div>
              </button>

              <button
                onClick={handleLaunchMasterChallenge}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left p-2.5 rounded-xl transition-all transform hover:-translate-y-0.5 shadow-sm group"
              >
                <div className="text-[10px] font-mono text-purple-600 font-bold flex items-center gap-1 mb-1">
                  <FileStack size={11} /> MASTER CHALLENGE
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors">Launch Proposal Call</div>
                <div className="text-[9px] text-slate-500 mt-0.5">Match CSR & Universities</div>
              </button>

              <button
                onClick={handleAuditOutcomes}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left p-2.5 rounded-xl transition-all transform hover:-translate-y-0.5 shadow-sm group"
              >
                <div className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-1 mb-1">
                  <CheckCircle2 size={11} /> AUDIT OUTCOMES
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Review Pending Cases</div>
                <div className="text-[9px] text-slate-500 mt-0.5">Strict citizen validation</div>
              </button>
            </div>
          </div>

          {/* AI Priority Action Cards */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle size={14} className="text-amber-500" />
                <span>AI Decision Support Queue</span>
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-50 text-red-600">
                HUMAN-IN-THE-LOOP
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto max-h-[280px] pr-1">
              {/* Action Item 1 */}
              <div className="border border-red-200 bg-red-50/40 rounded-xl p-3 relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[9px] font-mono font-black text-red-600 uppercase tracking-wider">
                      CRITICAL CLUSTER DETECTED
                    </span>
                    <div className="font-extrabold text-xs text-slate-900 mt-0.5">
                      Water Contamination Surge (47 Reports)
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Ward 12, Ranchi • SLA Breach Risk: 81%</div>
                  </div>
                  <span className="font-mono font-black text-red-600 text-sm">94/100</span>
                </div>

                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    onClick={() => dispatch({ type: 'OPEN_CASE_DRAWER', payload: 'NIR-2026-00482' })}
                    className="flex-1 bg-slate-900 hover:bg-black text-white text-[10px] font-bold py-1.5 rounded-lg shadow-sm transition-colors"
                  >
                    Inspect Evidence
                  </button>
                  <button
                    onClick={() => dispatch({
                      type: 'START_WORKFLOW',
                      payload: { action: 'ASSIGN_OFFICER', id: 'NIR-2026-00482', title: 'Water contamination cluster' }
                    })}
                    className="bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Assign Officer
                  </button>
                </div>
              </div>

              {/* Action Item 2 */}
              <div className="border border-indigo-200 bg-indigo-50/40 rounded-xl p-3 relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[9px] font-mono font-black text-indigo-600 uppercase tracking-wider">
                      PREDICTIVE FLOOD RISK
                    </span>
                    <div className="font-extrabold text-xs text-slate-900 mt-0.5">
                      Subarnarekha Drainage Blockage Forecast
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Ranchi East Corridor • Inundation Prob: 84%</div>
                  </div>
                  <span className="font-mono font-black text-indigo-600 text-sm">78/100</span>
                </div>

                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    onClick={() => dispatch({
                      type: 'ADD_TOAST',
                      payload: {
                        title: 'Preventive Crew Deployed',
                        message: 'SDRF desiltation units routed to Subarnarekha sluice gates.',
                        type: 'warning'
                      }
                    })}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold py-1.5 rounded-lg transition-colors"
                  >
                    Deploy Preventive Desiltation Team
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. BOTTOM SECTION: COMPACT HIGH-DENSITY OPERATIONS DATA TABLE + REAL-TIME AUDIT STREAM */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Left 8 Columns: Compact Government-Grade Issues & Grievances Table */}
        <div className="col-span-12 xl:col-span-8 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <CheckSquare size={15} className="text-blue-600" />
                <span>Systemic Issues & Critical Grievances Registry</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                High-density administrative ledger with zero dead buttons.
              </p>
            </div>

            {/* Filter Chips & Search */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter Case / District..."
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1 text-xs font-medium text-slate-800 outline-none focus:border-blue-500 w-44"
                />
              </div>

              <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-[10px] font-bold">
                {['ALL', 'CRITICAL', 'PENDING', 'AT_RISK'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setTableFilter(f)}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      tableFilter === f ? 'bg-white text-slate-900 shadow-sm font-black' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Compact Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-mono text-[10px] uppercase tracking-wider bg-slate-50/70">
                  <th className="py-2.5 px-3">Case ID</th>
                  <th className="py-2.5 px-3">Title & Category</th>
                  <th className="py-2.5 px-3">District</th>
                  <th className="py-2.5 px-3">Priority</th>
                  <th className="py-2.5 px-3">Lifecycle Status</th>
                  <th className="py-2.5 px-3 text-right">Rapid Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredProblems.map((p) => {
                  const isCrit = p.severity === 'Critical';
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                        <button
                          onClick={() => dispatch({ type: 'OPEN_CASE_DRAWER', payload: p.id })}
                          className="hover:underline text-blue-700 font-black text-left"
                        >
                          {p.id}
                        </button>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-extrabold text-slate-900 leading-tight">{p.title}</div>
                        <div className="text-[10px] text-slate-400">{p.category}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-semibold text-slate-700">{p.district}</span>
                        <div className="text-[9px] text-slate-400">{p.location || 'Central Ward'}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded font-mono font-black text-[10px] ${
                          p.priorityScore > 85 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {p.priorityScore}/100
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.status === 'VERIFICATION_PENDING' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          p.status === 'ASSIGNED' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          p.status === 'CLOSED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => dispatch({ type: 'OPEN_CASE_DRAWER', payload: p.id })}
                            className="bg-slate-900 hover:bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded transition-colors"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => dispatch({
                              type: 'START_WORKFLOW',
                              payload: { action: 'ASSIGN_OFFICER', id: p.id, title: p.title }
                            })}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold px-2 py-1 rounded transition-colors"
                            title="Assign to field officer"
                          >
                            Assign
                          </button>
                          <button
                            onClick={() => dispatch({
                              type: 'ESCALATE_CASE',
                              payload: { id: p.id, reason: 'Command Center Priority Intervention' }
                            })}
                            className="bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold px-2 py-1 rounded transition-colors"
                            title="Escalate SLA tier"
                          >
                            Escalate
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 4 Columns: Activity Ledger / Real-time Audit Stream */}
        <div className="col-span-12 xl:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Activity size={14} className="text-emerald-600" />
              <span>Immutable Audit Ledger</span>
            </h3>
            <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
              AUDIT LOG ACTIVE
            </span>
          </div>

          {/* Type Filter Chips */}
          <div className="flex items-center gap-1 mb-3">
            {['ALL', 'system', 'officer', 'citizen', 'warning'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedAuditType(t)}
                className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase transition-colors ${
                  selectedAuditType === t 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Audit Stream List */}
          <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[380px] pr-1">
            {filteredAuditLogs.map((log) => (
              <div 
                key={log.id} 
                className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-black text-slate-900 text-[11px]">{log.action}</span>
                  <span className="font-mono text-[9px] text-slate-400">{log.time}</span>
                </div>
                <div className="text-slate-600 text-[11px] leading-snug">{log.details}</div>
                <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono">
                  <span className={`px-1.5 py-0.2 rounded font-bold uppercase ${
                    log.type === 'warning' ? 'bg-red-100 text-red-700' :
                    log.type === 'officer' ? 'bg-blue-100 text-blue-700' :
                    log.type === 'citizen' ? 'bg-amber-100 text-amber-800' :
                    'bg-slate-200 text-slate-700'
                  }`}>
                    {log.type}
                  </span>
                  <span className="text-slate-400">HASH: #{log.id.slice(-4)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
