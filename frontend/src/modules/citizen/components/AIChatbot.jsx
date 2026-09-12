import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

const API = 'http://localhost:5000/api';

export default function AIChatbot() {
  const { user, token } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: `Namaskar! 🙏 I'm **NIRVA**, your AI assistant for the NIRVAHA platform.\n\nI can help you:\n• Report a civic problem\n• Track your submissions\n• Find nearby issues\n• Understand government schemes\n\nHow can I help you today, ${user?.name?.split(' ')[0] || 'Citizen'}?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    const newMessages = [...messages, { role: 'user', text }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch(`${API}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: newMessages.slice(-10).map(m => ({ role: m.role, text: m.text })),
          userContext: {
            name: user?.name || 'Citizen',
            district: user?.district || '',
            karma: user?.karmaTotal || 0
          }
        })
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, { role: 'model', text: data.reply || 'I am having trouble. Please try again.' }]);
        return;
      }
    } catch {
      // Local intelligent response fallback
      const lower = text.toLowerCase();
      let reply = "I can guide you on reporting community problems, tracking your PID status, and connecting with local Panchayati Raj / municipal authorities. How can I assist you specifically?";
      if (lower.includes('track') || lower.includes('pid') || lower.includes('status')) {
        reply = "To track any issue, enter your **Problem ID** (format: `NIR-PROB-YYYY-XXXXXX`) in the **Track a Problem** card on your dashboard, or select 'Track' next to any entry in **My Submissions & History**.";
      } else if (lower.includes('report') || lower.includes('issue') || lower.includes('problem')) {
        reply = "You can report a problem using the **+ Report Issue** button or the 8-step wizard. NIRVAHA structures your complaint, assigns a permanent PID, and routes it to relevant departments and university research teams.";
      } else if (lower.includes('karma') || lower.includes('points') || lower.includes('reward')) {
        reply = "You earn **Karma Points** for submitting validated societal problems (+50 KP), voting on local priorities (+10 KP), and community verifications (+25 KP). These can be redeemed for civic badges and recognition.";
      } else if (lower.includes('water') || lower.includes('road') || lower.includes('school') || lower.includes('health')) {
        reply = "Problems in this category are automatically clustered by NIRVAHA AI, verified by local authorities, and converted into actionable R&D challenges for state universities and CSR partners.";
      }
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
    } finally {
      setLoading(false);
    }
  };

  const QUICK_PROMPTS = [
    'How do I report a problem?',
    'Track my submission',
    'What problems are near me?',
    'How does karma work?'
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full shadow-2xl shadow-orange-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        aria-label="Open AI Chat"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        {/* Unread badge */}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[9px] font-black text-white">1</span>
        )}
      </button>

      {/* Chat Drawer */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[580px] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-amber-400 rounded-xl flex items-center justify-center text-base font-black text-white">N</div>
            <div className="flex-1">
              <div className="text-white font-black text-sm">NIRVA AI Assistant</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-slate-400 text-[10px] font-medium">Powered by Gemini • Always online</span>
              </div>
            </div>
            <button onClick={() => setMessages([{ role: 'model', text: `Namaskar! 🙏 How can I help you?` }])}
              className="text-slate-400 hover:text-white text-xs font-medium transition-all">Clear</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50" style={{ maxHeight: '380px' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && (
                  <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center text-xs font-black text-orange-600 mr-2 shrink-0 mt-0.5">N</div>
                )}
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-orange-500 text-white rounded-tr-sm'
                    : 'bg-white text-slate-800 rounded-tl-sm shadow-sm border border-slate-100'
                }`}>
                  {/* Simple markdown bold support */}
                  {msg.text.split('\n').map((line, j) => (
                    <p key={j} className={j > 0 ? 'mt-1' : ''}>
                      {line.split(/\*\*(.*?)\*\*/).map((part, k) =>
                        k % 2 === 1 ? <strong key={k}>{part}</strong> : part
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center text-xs font-black text-orange-600 mr-2 shrink-0">N</div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-slate-100">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex gap-2 flex-wrap">
              {QUICK_PROMPTS.map(q => (
                <button key={q} onClick={() => { setInput(q); setTimeout(() => sendMessage(), 50); }}
                  className="bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-full hover:bg-orange-100 transition-all">
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={sendMessage} className="p-3 border-t border-slate-200 flex gap-2 bg-white">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message... (English or हिंदी)"
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-orange-400 transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-10 h-10 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white rounded-xl flex items-center justify-center transition-all shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
