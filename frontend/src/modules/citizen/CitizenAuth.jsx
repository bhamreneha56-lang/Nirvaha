import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const CITIZEN_TYPES = [
  { id: 'individual', label: 'Individual Citizen', icon: '👤', desc: 'Private citizen reporting local issues' },
  { id: 'ngo', label: 'Community Group / NGO', icon: '🏘️', desc: 'Community organizations and NGOs' },
  { id: 'pri', label: 'Panchayati Raj (PRI)', icon: '🏛️', desc: 'Gram Panchayat / Block / District Panchayat' },
  { id: 'ulb', label: 'Urban Local Body (ULB)', icon: '🏙️', desc: 'Municipal Council / Nagar Panchayat' },
  { id: 'govt_agency', label: 'Government Department', icon: '🏢', desc: 'State / Central Govt departments' },
];

const JHARKHAND_DISTRICTS = [
  'Bokaro','Chatra','Deoghar','Dhanbad','Dumka','East Singhbhum','Garhwa','Giridih',
  'Godda','Gumla','Hazaribagh','Jamtara','Khunti','Koderma','Latehar','Lohardaga',
  'Pakur','Palamu','Ramgarh','Ranchi','Sahebganj','Seraikela-Kharsawan','Simdega','West Singhbhum'
];

export default function CitizenAuth({ onAuthenticated }) {
  const { login, register, loginAnonymous } = useAuth();
  const [mode, setMode] = useState('landing'); // 'landing' | 'login' | 'register' | 'loading'
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // register is 2-step

  // Login form
  const [loginForm, setLoginForm] = useState({ email: 'neha@nirvaha.in', password: 'password123' });

  // Register form
  const [regForm, setRegForm] = useState({
    name: 'Neha Dilip Bhamare',
    email: 'neha@nirvaha.in',
    phone: '+919876543210',
    password: 'password123',
    citizenType: 'individual',
    district: 'Ranchi',
    block: 'Ward 14',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMode('loading');
    try {
      await login({ email: loginForm.email, password: loginForm.password });
      onAuthenticated?.();
    } catch (err) {
      setError(err.message);
      setMode('login');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMode('loading');
    try {
      await register(regForm);
      onAuthenticated?.();
    } catch (err) {
      setError(err.message);
      setMode('register');
    }
  };

  const handleAnonymous = async () => {
    setError('');
    setMode('loading');
    try {
      await loginAnonymous();
      onAuthenticated?.();
    } catch (err) {
      setError(err.message);
      setMode('landing');
    }
  };

  if (mode === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-bold text-lg">Connecting to NIRVAHA...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-xl shadow-orange-500/30 mb-4">
            <span className="text-3xl">🌿</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">NIRVAHA</h1>
          <p className="text-orange-300 text-sm font-medium mt-1">नागरिक पोर्टल • Citizen Portal</p>
          <p className="text-slate-400 text-xs mt-1">Jharkhand Civic Intelligence Platform</p>
        </div>

        {/* Landing Mode */}
        {mode === 'landing' && (
          <div className="space-y-3">
            <button
              onClick={() => setMode('login')}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-500/30 transition-all text-lg"
            >
              🔐 Login to Your Account
            </button>
            <button
              onClick={() => { setMode('register'); setStep(1); }}
              className="w-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold py-4 rounded-2xl backdrop-blur-sm transition-all"
            >
              📋 Register as Citizen
            </button>
            <button
              onClick={handleAnonymous}
              className="w-full bg-transparent hover:bg-white/5 border border-white/10 text-slate-400 hover:text-white font-medium py-3 rounded-xl transition-all text-sm"
            >
              👻 Continue Anonymously (Limited Access)
            </button>
            {error && <p className="text-red-400 text-center text-sm bg-red-900/20 rounded-xl py-2">{error}</p>}
          </div>
        )}

        {/* Login Mode */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-white font-black text-xl mb-2">Welcome Back</h2>
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Email Address</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-400 transition-all"
                placeholder="neha@nirvaha.in"
                required
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-400 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm bg-red-900/20 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black py-3 rounded-xl shadow-lg transition-all hover:shadow-orange-500/30">
              Login →
            </button>
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={() => setMode('landing')} className="flex-1 text-slate-400 hover:text-white text-sm font-medium transition-all">← Back</button>
              <button type="button" onClick={() => { setMode('register'); setStep(1); }} className="flex-1 text-orange-400 hover:text-orange-300 text-sm font-medium transition-all">New? Register →</button>
            </div>
          </form>
        )}

        {/* Register Mode — Step 1: Identity */}
        {mode === 'register' && step === 1 && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-white font-black text-xl">Who are you?</h2>
            <p className="text-slate-400 text-sm">Select your citizen type to get started</p>
            <div className="space-y-2">
              {CITIZEN_TYPES.map(ct => (
                <button
                  key={ct.id}
                  onClick={() => { setRegForm(f => ({ ...f, citizenType: ct.id })); setStep(2); }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-orange-400/60 hover:bg-orange-500/10 transition-all text-left"
                >
                  <span className="text-2xl">{ct.icon}</span>
                  <div>
                    <div className="text-white font-bold text-sm">{ct.label}</div>
                    <div className="text-slate-400 text-xs">{ct.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setMode('landing')} className="w-full text-slate-400 hover:text-white text-sm font-medium transition-all pt-1">← Back</button>
          </div>
        )}

        {/* Register Mode — Step 2: Details */}
        {mode === 'register' && step === 2 && (
          <form onSubmit={handleRegister} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{CITIZEN_TYPES.find(c => c.id === regForm.citizenType)?.icon}</span>
              <h2 className="text-white font-black text-xl">Create Your Account</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Full Name *</label>
                <input value={regForm.name} onChange={e => setRegForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-orange-400 transition-all text-sm" placeholder="Neha Dilip Bhamare" required />
              </div>
              <div>
                <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Mobile *</label>
                <input value={regForm.phone} onChange={e => setRegForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-orange-400 transition-all text-sm" placeholder="+919876543210" required />
              </div>
              <div>
                <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Email</label>
                <input type="email" value={regForm.email} onChange={e => setRegForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-orange-400 transition-all text-sm" placeholder="neha@nirvaha.in" />
              </div>
              <div>
                <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">District</label>
                <select value={regForm.district} onChange={e => setRegForm(f => ({ ...f, district: e.target.value }))}
                  className="w-full bg-slate-800 border border-white/20 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-orange-400 transition-all text-sm">
                  <option value="">Select District</option>
                  {JHARKHAND_DISTRICTS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Ward / Block</label>
                <input value={regForm.block} onChange={e => setRegForm(f => ({ ...f, block: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-orange-400 transition-all text-sm" placeholder="Ward 14" />
              </div>
              <div className="col-span-2">
                <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Password *</label>
                <input type="password" value={regForm.password} onChange={e => setRegForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-orange-400 transition-all text-sm" placeholder="Create a password" required />
              </div>
            </div>
            {error && <p className="text-red-400 text-sm bg-red-900/20 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black py-3 rounded-xl shadow-lg transition-all mt-1">
              Create Account →
            </button>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex-1 text-slate-400 hover:text-white text-sm font-medium">← Back</button>
              <button type="button" onClick={() => setMode('login')} className="flex-1 text-orange-400 hover:text-orange-300 text-sm font-medium">Have account? Login →</button>
            </div>
          </form>
        )}

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs mt-6">
          Government of Jharkhand • NIRVAHA Platform • SIH 2026
        </p>
      </div>
    </div>
  );
}
