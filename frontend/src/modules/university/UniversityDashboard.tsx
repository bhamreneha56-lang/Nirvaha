
import React, { useState, useEffect } from 'react'; import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardPage from './DashboardPage';
import ChallengesPage from './ChallengesPage';
import TeamBuilderPage from './TeamBuilderPage';
import NewProposalPage from './NewProposalPage';

export default function UniversityPortalLayout() { const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('challenges')) setActiveTab('challenges');
    else if (path.includes('team-builder')) setActiveTab('team-builder');
    else if (path.includes('proposals')) setActiveTab('new-proposal');
    else setActiveTab('dashboard');
  }, [location.pathname]);

  let content = <DashboardPage />;
  if (activeTab === 'challenges') content = <ChallengesPage />;
  if (activeTab === 'team-builder') content = <TeamBuilderPage />;
  if (activeTab === 'new-proposal') content = <NewProposalPage />;
  
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        {content}
      </main>
    </div>
  );
}
