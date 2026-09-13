import React, { useState, useEffect } from 'react';
import { getProblemByPidLocally } from '../../../utils/mockStorage';

export default function ChallengeJourney({ pid: initialPid }) {
  const [pidInput, setPidInput] = useState(initialPid || '');
  const [activePid, setActivePid] = useState(initialPid || '');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialPid) {
      setPidInput(initialPid);
      setActivePid(initialPid);
    }
  }, [initialPid]);

  useEffect(() => {
    if (!activePid) return;
    setLoading(true);
    setError(null);
    fetch(`http://localhost:5000/api/problems/${activePid.trim()}`)
      .then(res => {
        if (!res.ok) throw new Error('Problem not found with this PID');
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.warn('Backend unavailable, resolving problem journey locally:', err);
        const local = getProblemByPidLocally(activePid.trim());
        if (local) {
          setData(local);
        } else {
          setError('Problem not found with this PID');
        }
        setLoading(false);
      });
  }, [activePid]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (pidInput.trim()) {
      setActivePid(pidInput.trim());
    }
  };

  const problem = data?.problem;
  const history = data?.history || [];

  // Full lifecycle steps according to PRD
  const lifecycleStages = [
    { key: 'submitted', label: 'Problem Submitted', desc: 'Citizen reported issue; assigned unique PID.' },
    { key: 'verified', label: 'Government & PRI Validation', desc: 'Authority reviewed, validated, and confirmed jurisdiction.' },
    { key: 'assigned', label: 'Assigned to Stakeholders', desc: 'Routed to University / Industry / CSR partner for solutioning.' },
    { key: 'in_progress', label: 'Solution Development', desc: 'Proposals drafted, prototypes built, and pilots scheduled.' },
    { key: 'deployed', label: 'Field Deployment', desc: 'Solution implemented on ground; monitored for efficacy.' },
    { key: 'closed', label: 'Impact Validated & Closed', desc: 'Community verified resolution; citizen karma awarded.' }
  ];

  const currentStatusIndex = problem ? lifecycleStages.findIndex(s => s.key === problem.status) : -1;
  const activeIndex = currentStatusIndex !== -1 ? currentStatusIndex : 0;

  return (
    <div className="bg-white rounded-3xl border border-blue-100 shadow-sm p-6 sm:p-8">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-blue-100 pb-6">
        <div>
          <h2 className="text-2xl font-black text-black">Track Problem Journey</h2>
          <p className="text-sm text-black mt-1">Real-time lifecycle tracking using your persistent PID</p>
        </div>
        
        <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-md w-full sm:w-auto">
          <input
            type="text"
            value={pidInput}
            onChange={(e) => setPidInput(e.target.value)}
            placeholder="Enter PID (e.g. NIR-PROB-2026-...)"
            className="flex-1 sm:w-64 border border-blue-100 rounded-xl px-3 py-2.5 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
          >
            Track
          </button>
        </form>
      </div>

      {loading && (
        <div className="py-16 text-center">
          <div className="inline-block w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-black font-medium">Tracking Problem details for <span className="font-mono font-bold text-black">{activePid}</span>...</p>
        </div>
      )}

      {error && (
        <div className="py-12 px-6 bg-orange-50 border border-orange-200 rounded-2xl text-center">
          <div className="text-3xl mb-2">⚠️</div>
          <h3 className="font-bold text-orange-900 text-lg mb-1">Could not find problem</h3>
          <p className="text-sm text-orange-600 mb-4">{error}. Please double-check your Problem ID.</p>
          <button
            onClick={() => { setPidInput(''); setActivePid(''); setError(null); }}
            className="text-xs font-bold text-orange-700 underline"
          >
            Clear and search again
          </button>
        </div>
      )}

      {!loading && !error && !problem && !activePid && (
        <div className="py-16 text-center border-2 border-dashed border-blue-100 rounded-2xl">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-bold text-black mb-1">Enter a Problem ID to begin tracking</h3>
          <p className="text-sm text-black max-w-md mx-auto">
            You can find your PID in your submission confirmation or under the <strong>My Submissions & History</strong> tab.
          </p>
        </div>
      )}

      {!loading && !error && problem && (
        <div>
          {/* Problem Banner */}
          <div className="bg-white rounded-2xl p-6 mb-8 border border-blue-100 flex flex-col md:flex-row justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs font-bold bg-blue-600 text-white px-2.5 py-1 rounded-md">
                  {problem.problemIdReadable}
                </span>
                <span className="text-xs text-black font-medium">
                  Submitted: {new Date(problem.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">{problem.title}</h3>
              <p className="text-sm text-black leading-relaxed max-w-3xl mb-4">{problem.description}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-black">
                <span className="bg-white border border-blue-100 px-3 py-1 rounded-full">📂 {problem.category}</span>
                {problem.subcategory && <span className="bg-white border border-blue-100 px-3 py-1 rounded-full">{problem.subcategory}</span>}
                <span className="bg-white border border-blue-100 px-3 py-1 rounded-full">📍 {problem.district || 'Jharkhand'}</span>
                <span className={`px-3 py-1 rounded-full uppercase font-bold ${problem.severity === 'Critical' ? 'bg-orange-100 text-orange-700' : 'bg-orange-100 text-orange-700'}`}>
                  {problem.severity || 'Moderate'}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center items-start md:items-end md:text-right shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-blue-100">
              <span className="text-xs text-black font-bold uppercase tracking-wider">Current Stage</span>
              <span className="text-lg font-black text-orange-600 uppercase mt-1">
                {problem.status?.replace('_', ' ')}
              </span>
              <span className="text-xs text-black mt-1">Single PID: {problem.problemIdReadable}</span>
            </div>
          </div>

          {/* Complete Lifecycle Stepper */}
          <h4 className="text-sm font-black uppercase tracking-wider text-black mb-6">Complete Problem Lifecycle</h4>
          <div className="relative border-l-2 border-blue-100 ml-4 space-y-8 pb-4">
            {lifecycleStages.map((stage, idx) => {
              const isCompleted = idx < activeIndex || (idx === activeIndex && problem.status === 'closed');
              const isCurrent = idx === activeIndex && problem.status !== 'closed';
              const histMatch = history.find(h => h.toStatus === stage.key);

              return (
                <div key={stage.key} className="relative pl-8">
                  {/* Dot */}
                  <div
                    className={`absolute -left-[11px] top-1.5 w-5 h-5 rounded-full border-4 border-white ${
                      isCompleted
                        ? 'bg-green-500'
                        : isCurrent
                        ? 'bg-orange-500 animate-pulse'
                        : 'bg-white'
                    }`}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <h4 className={`text-base font-bold ${isCompleted ? 'text-black' : isCurrent ? 'text-orange-600' : 'text-black'}`}>
                        {stage.label}
                      </h4>
                      <p className="text-xs text-black mt-0.5">{histMatch?.note || stage.desc}</p>
                    </div>

                    <div className="text-xs font-semibold text-black bg-white px-2.5 py-1 rounded whitespace-nowrap w-fit">
                      {histMatch ? new Date(histMatch.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : (isCurrent ? 'In Progress' : 'Pending')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
