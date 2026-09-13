import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { SimulationProvider, useSimulation } from '../../context/SimulationContext';
import SidebarLayout from '../shared/SidebarLayout';

// Government Portal Components
import CommandCenter from './CommandCenter';
import Problems from './Problems';
import Departments from './Departments';
import Officers from './Officers';
import GISDashboard from './GISDashboard';
import KnowledgeGraph from './KnowledgeGraph';
import UniversitiesCSR from './UniversitiesCSR';
import GovernanceReports from './GovernanceReports';

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
  GraduationCap,
  FileText
} from 'lucide-react';

const govTabs = [
  { id: 'command', label: 'Command Center', icon: <LayoutDashboard size={18} /> },
  { id: 'problems', label: 'Problems & Cases', icon: <AlertTriangle size={18} /> },
  { id: 'departments', label: 'Departments', icon: <Building2 size={18} /> },
  { id: 'officers', label: 'Field Officers', icon: <UserCheck size={18} /> },
  { id: 'gis', label: 'GIS Intelligence', icon: <Map size={18} /> },
  { id: 'knowledge', label: 'Knowledge Graph', icon: <Network size={18} /> },
  { id: 'universities', label: 'Universities & CSR', icon: <GraduationCap size={18} /> },
  { id: 'reports', label: 'Reports', icon: <FileText size={18} /> }
];

function GovPortalInner() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('command');
  
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('problems')) setActiveTab('problems');
    else if (path.includes('departments')) setActiveTab('departments');
    else if (path.includes('officers')) setActiveTab('officers');
    else if (path.includes('gis')) setActiveTab('gis');
    else if (path.includes('knowledge')) setActiveTab('knowledge');
    else if (path.includes('universities')) setActiveTab('universities');
    else if (path.includes('reports')) setActiveTab('reports');
    else setActiveTab('command');
  }, [location.pathname]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigate(`/government/${tabId}`);
  };

  return (
    <div className="relative h-screen w-full">
      <SidebarLayout 
        tabs={govTabs}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        roleTitle="State Operations Lead"
        userName="Secretary, IT"
      >
        <Routes>
          <Route index element={<Navigate to="/government/command" replace />} />
          <Route path="command" element={<CommandCenter />} />
          <Route path="problems" element={<Problems />} />
          <Route path="departments" element={<Departments />} />
          <Route path="officers" element={<Officers />} />
          <Route path="gis" element={<GISDashboard />} />
          <Route path="knowledge" element={<KnowledgeGraph />} />
          <Route path="universities" element={<UniversitiesCSR />} />
          <Route path="reports" element={<GovernanceReports />} />
          <Route path="*" element={<Navigate to="/government/command" replace />} />
        </Routes>
      </SidebarLayout>
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
