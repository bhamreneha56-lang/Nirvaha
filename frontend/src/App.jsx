import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import { AppContext, AppProvider } from './context/AppContext';

// Dashboards
import CitizenDashboard from './modules/citizen/CitizenDashboard';
import GovDashboard from './modules/government/GovDashboard';
import UniversityDashboard from './modules/university/UniversityDashboard';
import IndustryDashboard from './modules/industry/IndustryDashboard';

function RoleRouter() {
  const { state, dispatch } = React.useContext(AppContext);
  const navigate = useNavigate();

  // Initialize from URL on mount
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/citizen') && state.role !== 'citizen') dispatch({ type: 'SET_ROLE', role: 'citizen' });
    else if (path.startsWith('/government') && state.role !== 'government') dispatch({ type: 'SET_ROLE', role: 'government' });
    else if (path.startsWith('/university') && state.role !== 'university') dispatch({ type: 'SET_ROLE', role: 'university' });
    else if (path.startsWith('/industry') && state.role !== 'industry') dispatch({ type: 'SET_ROLE', role: 'industry' });
  }, []);

  // If state.role changes in AppContext, navigate to the route
  useEffect(() => {
    const path = window.location.pathname;
    if (state.role === 'citizen' && !path.startsWith('/citizen')) navigate('/citizen');
    else if (state.role === 'government' && !path.startsWith('/government')) navigate('/government');
    else if (state.role === 'university' && !path.startsWith('/university')) navigate('/university');
    else if (state.role === 'industry' && !path.startsWith('/industry')) navigate('/industry');
    else if (state.role === null && path !== '/') navigate('/');
  }, [state.role]);

  // If user navigates manually or hits back button, sync state
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/') dispatch({ type: 'SET_ROLE', role: null });
      else if (path.startsWith('/citizen')) dispatch({ type: 'SET_ROLE', role: 'citizen' });
      else if (path.startsWith('/government')) dispatch({ type: 'SET_ROLE', role: 'government' });
      else if (path.startsWith('/university')) dispatch({ type: 'SET_ROLE', role: 'university' });
      else if (path.startsWith('/industry')) dispatch({ type: 'SET_ROLE', role: 'industry' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/citizen/*" element={<CitizenDashboard />} />
      <Route path="/government/*" element={<GovDashboard />} />
      <Route path="/university/*" element={<UniversityDashboard />} />
      <Route path="/industry/*" element={<IndustryDashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <RoleRouter />
      </Router>
    </AppProvider>
  );
}
