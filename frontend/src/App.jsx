import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import { AppContext, AppProvider } from './context/AppContext';
import { SimulationContext, SimulationProvider } from './context/SimulationContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import CitizenAuth from './modules/citizen/CitizenAuth';

// Dashboards
import CitizenDashboard from './modules/citizen/CitizenDashboard';
import GovDashboard from './modules/government/GovDashboard';
import UniversityDashboard from './modules/university/UniversityDashboard';
import IndustryDashboard from './modules/industry/IndustryDashboard';

// Auth gate wrapper for citizen portal
function CitizenPortalGate() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!user) return <CitizenAuth />;
  return <CitizenDashboard />;
}

function RoleRouter() {
  const { state, dispatch } = React.useContext(SimulationContext);
  const navigate = useNavigate();

  // Initialize from URL on mount
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/citizen') && state.role !== 'citizen') {
      dispatch({ type: 'SET_ROLE', role: 'citizen' });
    }
    else if (path.startsWith('/government') && state.role !== 'government') dispatch({ type: 'SET_ROLE', role: 'government' });
    else if (path.startsWith('/university') && state.role !== 'university') dispatch({ type: 'SET_ROLE', role: 'university' });
    else if (path.startsWith('/industry') && state.role !== 'industry') dispatch({ type: 'SET_ROLE', role: 'industry' });
  }, []);

  // If state.role changes in AppContext, navigate to the route
  useEffect(() => {
    const path = window.location.pathname;
    const isPublic = path === '/' || path.startsWith('/auth') || path.startsWith('/explore') || path.startsWith('/impact');
    
    if (state.role === 'citizen') {
        if (path === '/') {
            navigate('/citizen');
        } else if (!path.startsWith('/citizen')) {
            navigate('/citizen');
        }
    }
    else if (state.role === 'government' && !path.startsWith('/government')) navigate('/government');
    else if (state.role === 'university' && !path.startsWith('/university')) navigate('/university');
    else if (state.role === 'industry' && !path.startsWith('/industry')) navigate('/industry');
    else if (state.role === null && !isPublic) navigate('/');
  }, [state.role]);

  // If user navigates manually or hits back button, sync state
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const isPublic = path === '/' || path.startsWith('/auth') || path.startsWith('/explore') || path.startsWith('/impact');
      
      if (isPublic) dispatch({ type: 'SET_ROLE', role: null });
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
      <Route path="/citizen/*" element={<CitizenPortalGate />} />
      <Route path="/government/*" element={<GovDashboard />} />
      <Route path="/university/*" element={<UniversityDashboard />} />
      <Route path="/industry/*" element={<IndustryDashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SimulationProvider>
        <Router>
          <RoleRouter />
        </Router>
      </SimulationProvider>
    </AuthProvider>
  );
}


