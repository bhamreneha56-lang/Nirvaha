import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const API = 'http://localhost:5000/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, restore session from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('nirvaha_token');
    const savedUser = localStorage.getItem('nirvaha_user');
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {}
    }
    setLoading(false);
  }, []);

  const saveSession = useCallback((tok, usr) => {
    setToken(tok);
    setUser(usr);
    localStorage.setItem('nirvaha_token', tok);
    localStorage.setItem('nirvaha_user', JSON.stringify(usr));
  }, []);

  const register = useCallback(async ({ name, email, phone, password, citizenType, district, block }) => {
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password, citizenType, district, block })
      });
      if (res.ok) {
        const data = await res.json();
        saveSession(data.token, data.user);
        return data;
      }
    } catch (err) {
      console.warn('Backend unavailable, falling back to local session registration:', err);
    }

    // Local / Offline fallback (e.g. deployed on Vercel without backend)
    const mockUser = {
      _id: 'usr-reg-' + Date.now(),
      name: name || 'Citizen User',
      email: email || 'citizen@nirvaha.in',
      phone: phone || '+91 98765 43210',
      role: 'citizen',
      citizenType: citizenType || 'Individual Citizens',
      district: district || 'Ranchi',
      block: block || 'Kanke',
      karmaTotal: 50,
      validationsCount: 0,
      createdAt: new Date().toISOString()
    };
    const mockToken = 'mock_jwt_token_' + Date.now();
    saveSession(mockToken, mockUser);
    return { token: mockToken, user: mockUser };
  }, [saveSession]);

  const login = useCallback(async ({ email, phone, password }) => {
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, password })
      });
      if (res.ok) {
        const data = await res.json();
        saveSession(data.token, data.user);
        return data;
      }
    } catch (err) {
      console.warn('Backend unavailable, falling back to local demo login:', err);
    }

    // Local / Offline fallback (e.g. deployed on Vercel without backend)
    const mockUser = {
      _id: 'usr-demo-' + Date.now(),
      name: (email && email.toLowerCase().includes('neha')) ? 'Neha Dilip Bhamare' : (email ? email.split('@')[0] : 'Citizen User'),
      email: email || 'neha@nirvaha.in',
      phone: phone || '+91 98765 43210',
      role: 'citizen',
      citizenType: 'Individual Citizens',
      district: 'Ranchi',
      block: 'Kanke',
      karmaTotal: 450,
      validationsCount: 14,
      createdAt: new Date().toISOString()
    };
    const mockToken = 'mock_jwt_token_' + Date.now();
    saveSession(mockToken, mockUser);
    return { token: mockToken, user: mockUser };
  }, [saveSession]);

  const loginAnonymous = useCallback(async () => {
    try {
      const res = await fetch(`${API}/auth/anonymous`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        saveSession(data.token, data.user);
        return data;
      }
    } catch (err) {
      console.warn('Backend unavailable, falling back to local anonymous session:', err);
    }

    const mockUser = {
      _id: 'usr-anon-' + Date.now(),
      name: 'Anonymous Citizen',
      email: `anon_${Date.now()}@nirvaha.local`,
      role: 'citizen',
      citizenType: 'Individual Citizens',
      isAnonymous: true,
      district: 'Ranchi',
      block: 'Kanke',
      karmaTotal: 0,
      validationsCount: 0,
      createdAt: new Date().toISOString()
    };
    const mockToken = 'mock_jwt_anon_' + Date.now();
    saveSession(mockToken, mockUser);
    return { token: mockToken, user: mockUser };
  }, [saveSession]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('nirvaha_token');
    localStorage.removeItem('nirvaha_user');
  }, []);

  const authFetch = useCallback(async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    };
    return fetch(url, { ...options, headers });
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, loginAnonymous, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
