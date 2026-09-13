import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarLayout from '../shared/SidebarLayout';
import DashboardPage from './DashboardPage';
import ChallengesPage from './ChallengesPage';
import TeamBuilderPage from './TeamBuilderPage';
import NewProposalPage from './NewProposalPage';

export default function UniversityPortalLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('challenges')) setActiveTab('challenges');
    else if (path.includes('team-builder')) setActiveTab('team-builder');
    else if (path.includes('proposals')) setActiveTab('new-proposal');
    else setActiveTab('dashboard');
  }, [location.pathname]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'dashboard') navigate('/university/dashboard');
    if (tabId === 'challenges') navigate('/university/challenges');
    if (tabId === 'team-builder') navigate('/university/team-builder');
    if (tabId === 'new-proposal') navigate('/university/proposals/new');
  };

  const universityTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
    { id: 'challenges', label: 'Challenges', icon: '📄' },
    { id: 'team-builder', label: 'Team Builder', icon: '👥' },
    { id: 'new-proposal', label: 'New Proposal', icon: '📋' },
    { id: 'projects', label: 'Projects', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  let content = <DashboardPage />;
  if (activeTab === 'challenges') content = <ChallengesPage />;
  if (activeTab === 'team-builder') content = <TeamBuilderPage />;
  if (activeTab === 'new-proposal') content = <NewProposalPage />;
  
  return (
    <SidebarLayout 
      tabs={universityTabs}
      activeTab={activeTab}
      setActiveTab={handleTabChange}
      roleTitle="University Portal"
      userName="BIT Mesra"
    >
      {content}
    </SidebarLayout>
  );
}
