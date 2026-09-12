import React, { useState } from 'react';
import { Routes, Route, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { SimulationProvider, useSimulation } from '../../context/SimulationContext';

// Government Portal Components
import GovernmentNavbar from './Navbar';
import CommandCenter from './CommandCenter';
import Problems from './Problems';
import Departments from './Departments';
import Officers from './Officers';
import GISDashboard from './GISDashboard';
import KnowledgeGraph from './KnowledgeGraph';
import MasterChallenges from './MasterChallenges';
import UniversitiesCSR from './UniversitiesCSR';
import AIIntelligence from './AIIntelligence';
import ImpactDashboard from './ImpactDashboard';
import GovernanceReports from './GovernanceReports';
import Settings from './Settings';
import Notifications from './Notifications';

// Overlay Components (always rendered, controlled by state)
import WorkflowModal from './WorkflowModal';
import CaseDrawer from './CaseDrawer';
import Toaster from './Toaster';

import {
  LayoutDashboard,
  AlertTriangle,
  Building2,
  UserCheck,
  Map,
  Network,
  Trophy,
  GraduationCap,
  Cpu,
  BarChart3,
  FileText,
  Settings2,
  Bell,
  ChevronRight,
  Radio,
  Activity
} from 'lucide-react';

const navSections = [
  {
    label: 'OVERVIEW',
    items: [
      { id: 'command', label: 'Command Center', icon: LayoutDashboard, path: '/government/command' }
    ]
  },
  {
    label: 'OPERATIONS',
    items: [
      { id: 'problems', label: 'Problems & Cases', icon: AlertTriangle, path: '/government/problems' },
      { id: 'departments', label: 'Departments', icon: Building2, path: '/government/departments' },
      { id: 'officers', label: 'Field Officers', icon: UserCheck, path: '/government/officers' }
    ]
  },
  {
    label: 'INTELLIGENCE',
    items: [
      { id: 'gis', label: 'GIS Intelligence', icon: Map, path: '/government/gis' },
      { id: 'knowledge', label: 'Knowledge Graph', icon: Network, path: '/government/knowledge' },
      { id: 'ai', label: 'AI Analytics', icon: Cpu, path: '/government/ai' }
    ]
  },
  {
    label: 'COLLABORATION',
    items: [
      { id: 'challenges', label: 'Master Challenges', icon: Trophy, path: '/government/challenges' },
      { id: 'universities', label: 'Universities & CSR', icon: GraduationCap, path: '/government/universities' },
      { id: 'impact', label: 'Impact Dashboard', icon: BarChart3, path: '/government/impact' },
      { id: 'reports', label: 'Gov. Reports', icon: FileText, path: '/government/reports' }
    ]
  },
  {
    label: 'SYSTEM',
    items: [
      { id: 'notifications', label: 'Notifications', icon: Bell, path: '/government/notifications' },
      { id: 'settings', label: 'Settings', icon: Settings2, path: '/government/settings' }
    ]
  }
];


function GovSidebar({ sidebarOpen }) {
  const { state } = useSimulation();
  const unreadCount = (state.notifications || []).filter(n => n.unread).length;

  return (
    <aside
      className={`${sidebarOpen ? 'w-60' : 'w-0 overflow-hidden'} transition-all duration-300 bg-white border-r border-slate-200 flex flex-col shrink-0 shadow-sm`}
      style={{ minHeight: 'calc(100vh - 96px)' }}
    >
      <div className="flex-1 overflow-y-auto py-4 px-3">
        {navSections.map(section => (
          <div key={section.label} className="mb-5">
            <div className="text-[9px] font-mono font-black text-slate-400 tracking-widest uppercase px-3 mb-2">
              {section.label}
            </div>
            <div className="space-y-0.5">
              {section.items.map(item => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-semibold transition-all group relative ${
                      isActive
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon
                        size={15}
                        className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'}
                      />
                      <span>{item.label}</span>
                      {item.id === 'notifications' && unreadCount > 0 && (
                        <span className={`ml-auto text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                          isActive ? 'bg-white text-amber-700' : 'bg-red-500 text-white'
                        }`}>
                          {unreadCount}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom: Live stream indicator */}
      <div className="p-3 border-t border-slate-100">
        <div className="flex items-center gap-2 px-2 py-1.5 bg-slate-50 rounded-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <span className="text-[10px] font-mono font-bold text-slate-500">Live Stream</span>
          <Activity size={10} className="ml-auto text-emerald-500 animate-pulse" />
        </div>
      </div>
    </aside>
  );
}

function GovPortalInner() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { state } = useSimulation();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navbar */}
      <GovernmentNavbar onToggleSidebar={() => setSidebarOpen(prev => !prev)} />

      {/* Body: Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <GovSidebar sidebarOpen={sidebarOpen} />

        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route index element={<Navigate to="/government/command" replace />} />
            <Route path="command" element={<CommandCenter />} />
            <Route path="problems" element={<Problems />} />
            <Route path="departments" element={<Departments />} />
            <Route path="officers" element={<Officers />} />
            <Route path="gis" element={<GISDashboard />} />
            <Route path="knowledge" element={<KnowledgeGraph />} />
            <Route path="ai" element={<AIIntelligence />} />
            <Route path="challenges" element={<MasterChallenges />} />
            <Route path="universities" element={<UniversitiesCSR />} />
            <Route path="impact" element={<ImpactDashboard />} />
            <Route path="reports" element={<GovernanceReports />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/government/command" replace />} />
          </Routes>
        </main>

      </div>

      {/* Global Overlays */}
      <WorkflowModal />
      <CaseDrawer />
      <Toaster />
    </div>
  );
}

export default function GovDashboard() {
  return (
    <SimulationProvider>
      <GovPortalInner />
    </SimulationProvider>
  );
}
