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
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password, citizenType, district, block })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    saveSession(data.token, data.user);
    return data;
  }, [saveSession]);

  const login = useCallback(async ({ email, phone, password }) => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, phone, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    saveSession(data.token, data.user);
    return data;
  }, [saveSession]);

  const loginAnonymous = useCallback(async () => {
    const res = await fetch(`${API}/auth/anonymous`, { method: 'POST' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Anonymous login failed');
    saveSession(data.token, data.user);
    return data;
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
