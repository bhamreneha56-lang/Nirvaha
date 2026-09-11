import React, { useState, useContext } from 'react';
import SidebarLayout from '../shared/SidebarLayout';
import { AppContext } from '../../context/AppContext';

export default function CitizenDashboard() {
  const { state, dispatch } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('dashboard'); // sidebar active tab
  const [tab, setTab] = useState('new'); // inner tab
  
  const [form, setForm] = useState({ title: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleListen = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support voice recognition. Try Chrome or Edge.");
      return;
    }
    
    if (isListening) return; // Prevent multiple instances

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-IN'; // Works great for Hinglish too

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      // Update form description with the recognized text
      setForm(prev => ({ ...prev, description: currentTranscript }));
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
    
    // Auto stop after 10 seconds of listening for demo purposes
    setTimeout(() => {
      recognition.stop();
    }, 10000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return;
    setSubmitting(true);
    try {
      // Use mock API from our api-client
      const { fetchApi } = await import('../../shared/api-client');
      const data = await fetchApi('/problems', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          submitterDetails: { name: 'Suresh Munda', type: 'Citizen' },
          district: 'Ranchi',
        })
      });
      dispatch({ type: 'ADD_PROBLEM', problem: data });
      setForm({ title: '', description: '' });
      setTab('history');
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  const renderContent = () => {
    if (activeTab === 'challenges') {
      return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 min-h-[500px]">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Community Challenges Map</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-slate-100 rounded-xl border border-slate-200 h-96 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage: 'radial-gradient(circle at center, black 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
               <div className="text-6xl absolute z-10">🗺️</div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-slate-700">Nearby Issues</h3>
              <div className="p-4 border border-slate-100 rounded-lg bg-slate-50">
                <div className="text-sm font-bold text-slate-800">Water pipeline burst</div>
                <div className="text-xs text-slate-500 mt-1">Sector 2 • High Priority</div>
              </div>
              <div className="p-4 border border-slate-100 rounded-lg bg-slate-50">
                <div className="text-sm font-bold text-slate-800">Streetlights non-functional</div>
                <div className="text-xs text-slate-500 mt-1">Main Road • Medium Priority</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (activeTab === 'proposals') {
      return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 min-h-[500px]">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Solution Proposals</h2>
          <p className="text-slate-500 mb-6">Track the progress of solutions being built for the problems you reported.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-sm">
                  <th className="pb-3 font-semibold">Related Issue</th>
                  <th className="pb-3 font-semibold">Assigned University</th>
                  <th className="pb-3 font-semibold">Phase</th>
                  <th className="pb-3 font-semibold">ETA</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-slate-100">
                  <td className="py-4 font-bold text-slate-800">Water contamination</td>
                  <td className="py-4">IIT ISM Dhanbad</td>
                  <td className="py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md font-bold text-xs">Prototyping</span></td>
                  <td className="py-4">Oct 2026</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 font-bold text-slate-800">Traffic Congestion</td>
                  <td className="py-4">BIT Mesra</td>
                  <td className="py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-md font-bold text-xs">Pilot Deployment</span></td>
                  <td className="py-4">Nov 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeTab === 'analytics') {
      return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 min-h-[500px]">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Personal Impact Analytics</h2>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
              <div className="text-4xl font-black text-orange-600">14</div>
              <div className="text-sm font-bold text-orange-800 mt-2">Community Validations</div>
            </div>
            <div className="p-6 bg-green-50 rounded-xl border border-green-100">
              <div className="text-4xl font-black text-green-600">450</div>
              <div className="text-sm font-bold text-green-800 mt-2">Total Karma Points</div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'settings') {
      return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 max-w-2xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Account Settings</h2>
          <form className="space-y-4">
            <div><label className="text-sm font-bold text-slate-700">Full Name</label><input type="text" defaultValue="Suresh Munda" className="w-full p-3 border border-slate-200 rounded-lg mt-1" /></div>
            <div><label className="text-sm font-bold text-slate-700">Phone Number</label><input type="text" defaultValue="+91 98765 43210" className="w-full p-3 border border-slate-200 rounded-lg mt-1" /></div>
            <div><label className="text-sm font-bold text-slate-700">Language Preference</label><select className="w-full p-3 border border-slate-200 rounded-lg mt-1"><option>English</option><option>Hindi</option><option>Santhali</option></select></div>
            <button type="button" className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold mt-4">Save Changes</button>
          </form>
        </div>
      );
    }

    return (
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Area */}
        <div className="flex-1 space-y-8">
          
          {/* Tabs */}
          <div className="flex border-b border-slate-200 gap-4 sm:gap-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <button onClick={() => setTab('new')} className={`pb-4 text-sm font-bold transition-all ${tab === 'new' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-slate-500 hover:text-slate-800'}`}>
              Report a New Issue
            </button>
            <button onClick={() => setTab('history')} className={`pb-4 text-sm font-bold transition-all ${tab === 'history' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-slate-500 hover:text-slate-800'}`}>
              My Submissions & History
            </button>
          </div>

          {tab === 'new' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-[#FF9933] to-[#f97316] p-6 sm:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <h2 className="text-xl sm:text-2xl font-extrabold mb-2 relative z-10">Voice Submission</h2>
                <p className="text-orange-100 max-w-md relative z-10 font-medium text-sm sm:text-base">
                  Speak in Hindi, Santhali, or English. Our AI will automatically translate, structure, and categorize your problem.
                </p>
                  <div className="mt-8 flex items-center gap-4 sm:gap-6 relative z-10">
                    <button 
                      type="button" 
                      onClick={handleListen}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.4)] flex flex-col items-center justify-center transition-transform group relative ${isListening ? 'bg-red-500 text-white scale-110 shadow-[0_0_40px_rgba(239,68,68,0.6)]' : 'bg-white text-orange-600 hover:scale-105'}`}
                    >
                      {isListening && <span className="absolute inset-0 border-2 border-red-500 rounded-full animate-ping opacity-50"></span>}
                      {!isListening && <span className="absolute inset-0 border-2 border-white rounded-full animate-ping opacity-50"></span>}
                      <span className="text-2xl sm:text-3xl">🎤</span>
                    </button>
                    <div className="text-xs sm:text-sm font-bold tracking-widest uppercase">
                      {isListening ? 'Listening... Speak now' : 'Tap to speak'}
                    </div>
                  </div>
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 border-t border-slate-200"></div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Or type manually</div>
                  <div className="flex-1 border-t border-slate-200"></div>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Problem Title</label>
                    <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} type="text" placeholder="E.g., Broken handpump in Sector 4" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium text-slate-800" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Detailed Description</label>
                    <textarea required value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows="4" placeholder="Describe the issue, how long it has been going on, and who is affected..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium text-slate-800"></textarea>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Upload Evidence (Photo/Video)</label>
                      <div className="border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-100 hover:border-orange-400 transition-all cursor-pointer">
                        <span className="text-2xl mb-2">📸</span>
                        <span className="text-sm font-bold">Browse or drag files</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Location & GPS</label>
                      <div className="border border-slate-200 rounded-xl bg-slate-50 p-6 flex flex-col items-center justify-center text-slate-500 relative overflow-hidden h-full">
                        <button type="button" className="bg-slate-800 hover:bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all z-10 flex items-center gap-2">
                          <span>📍</span> Auto-Detect GPS
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex justify-end">
                    <button disabled={submitting} type="submit" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5">
                      {submitting ? 'Submitting...' : 'Submit Challenge →'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {tab === 'history' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 min-h-[400px]">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Your Recent Submissions</h2>
              
              {state.problems.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center mt-12">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-5xl mb-6 border border-slate-100">📭</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">No Reports Yet</h3>
                  <p className="text-slate-500 max-w-md mx-auto">You haven't submitted any problems yet. When you report an issue, you can track its progress here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.problems.map(p => (
                    <div key={p.id} className="border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:border-orange-300 transition-all">
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg">{p.title}</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">AI Category: {p.category}</span>
                          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Date: {new Date(p.reportedOn).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <span className="w-fit px-3 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded-full uppercase tracking-widest">{p.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Right Sidebar */}
        <div className="w-full lg:w-80 shrink-0 space-y-6">
          <div className="bg-[#138808] text-white rounded-2xl p-6 shadow-lg shadow-green-900/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
             <div className="flex justify-between items-start mb-6 relative z-10">
               <div>
                 <h3 className="font-extrabold text-lg">Karma Profile</h3>
                 <div className="text-green-200 text-xs font-semibold uppercase tracking-wider mt-1">Top 5% in Ranchi</div>
               </div>
               <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl">
                 🏅
               </div>
             </div>
             
             <div className="text-5xl font-black mb-1 relative z-10">450</div>
             <div className="text-green-200 text-sm font-medium mb-6 relative z-10">Total points earned</div>
             
             <div className="space-y-3 relative z-10">
               <div className="flex justify-between items-center text-sm">
                 <span className="text-green-100">Problems Verified</span>
                 <span className="font-bold">2</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="text-green-100">Community Validations</span>
                 <span className="font-bold">14</span>
               </div>
             </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-4">Verification Needed</h3>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
              Help validate other problems reported in your area to earn Karma points and ensure accurate data.
            </p>
            <div className="border border-slate-100 bg-slate-50 p-4 rounded-xl mb-4">
               <h4 className="font-bold text-slate-800 text-sm mb-1">Dengue outbreak in Morabadi</h4>
               <p className="text-xs text-slate-500 mb-3">Reported 2 days ago • 1.2km away</p>
               <div className="flex gap-2">
                 <button className="flex-1 bg-white border border-slate-200 text-slate-700 text-xs font-bold py-2 rounded-lg hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-all">Verify 👍</button>
                 <button className="flex-1 bg-white border border-slate-200 text-slate-700 text-xs font-bold py-2 rounded-lg hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all">Reject 👎</button>
               </div>
            </div>
            <button className="w-full text-center text-xs font-bold text-orange-600 hover:underline">View all nearby reports</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <SidebarLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      roleTitle="Citizen Community Portal" 
      userName="Suresh Munda"
    >
      {renderContent()}
    </SidebarLayout>
  );
}
