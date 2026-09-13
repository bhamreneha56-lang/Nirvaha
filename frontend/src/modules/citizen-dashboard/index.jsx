import React, { useEffect, useState } from 'react';
import { fetchApi } from '../../shared/api-client';
import { theme } from '../../shared/theme';

import CitizenSubmission from '../citizen-submission';

export default function CitizenDashboard({ user, onLogout }) {
  const [problems, setProblems] = useState([]);
  const [karma, setKarma] = useState(0);
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'submit'

  useEffect(() => {
    const loadData = async () => {
      try {
        const problemData = await fetchApi('/problems/mine');
        setProblems(problemData);
        
        const karmaData = await fetchApi('/karma/mine');
        setKarma(karmaData.total);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      }
    };
    if (view === 'dashboard') loadData();
  }, [view]);

  if (view === 'submit') {
    return <CitizenSubmission onBack={() => setView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="p-4 flex justify-between items-center bg-white shadow" style={{ borderTop: `4px solid ${theme.colors.primary}` }}>
        <h1 className="text-xl font-bold" style={{ color: theme.colors.textNavy }}>NIRVAHA Citizen Portal</h1>
        <div className="flex items-center gap-4">
          <span className="font-medium">Karma: {karma} ⭐</span>
          <button onClick={onLogout} className="text-sm text-black underline">Logout</button>
        </div>
      </header>

      <main className="p-4 max-w-4xl mx-auto mt-6">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-semibold mb-1">Welcome, {user.name || user.phone}</h2>
            <p className="text-black">Track your submissions and community impact.</p>
          </div>
          <button
            className="text-white font-bold py-2 px-6 rounded-full shadow hover:opacity-90 transition-opacity"
            style={{ backgroundColor: theme.colors.accent }}
            onClick={() => setView('submit')}
          >
            + Report Problem
          </button>
        </div>

        <section className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">My Problems</h3>
          {problems.length === 0 ? (
            <p className="text-black py-4 text-center">No problems reported yet.</p>
          ) : (
            <div className="space-y-4">
              {problems.map(p => (
                <div key={p._id} className="border p-4 rounded flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-lg">{p.title}</h4>
                    <p className="text-sm text-black">{p.problemIdReadable} • {p.category}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize
                    ${p.status === 'deployed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                  `}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
