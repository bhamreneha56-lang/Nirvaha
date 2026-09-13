import React, { useState, useContext, useEffect } from 'react';
import SidebarLayout from '../shared/SidebarLayout';
import { AppContext } from '../../context/AppContext';
import ReportChallengeWizard from './components/ReportChallengeWizard';
import ChallengeJourney from './components/ChallengeJourney';
import CitizenChallengesMap from './components/CitizenChallengesMap';
import AIChatbot from './components/AIChatbot';
import { useAuth } from '../../context/AuthContext';
import { problems, getPriorityColor } from '../university/mockData';
import { getStoredProblems } from '../../utils/mockStorage';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';


const PersonalImpactAnalytics = () => {
  const [analytics, setAnalytics] = useState({ validations: 14, karmaTotal: 450, ledger: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/analytics/demo')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.validations !== 'undefined') {
          setAnalytics(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("API error:", err);
        setLoading(false);
      });
  }, []);

  const leaderboard = [
    { rank: 1, name: "Rahul Verma", karma: 1250, badge: "🥇 Civic Hero" },
    { rank: 2, name: "Sneha Kumari", karma: 1120, badge: "🥈 Top Verifier" },
    { rank: 3, name: "Neha Dilip Bhamare (You)", karma: 450, badge: "🥉 Active Citizen" },
    { rank: 4, name: "Arif Khan", karma: 390, badge: "🌟 Contributor" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-black mb-6">Impact & Karma Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 text-9xl opacity-10 translate-x-4 -translate-y-4">🏆</div>
            <div className="text-5xl font-black text-orange-600 mb-2">{loading ? '...' : analytics.karmaTotal}</div>
            <div className="text-sm font-bold text-orange-800 uppercase tracking-wider">Total Karma Points</div>
            <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-md transition-all">Redeem Rewards</button>
          </div>
          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 text-9xl opacity-10 translate-x-4 -translate-y-4">✅</div>
            <div className="text-5xl font-black text-green-600 mb-2">{loading ? '...' : analytics.validations}</div>
            <div className="text-sm font-bold text-green-800 uppercase tracking-wider">Community Validations</div>
            <div className="mt-4 text-xs font-medium text-green-700 bg-green-200/50 inline-block px-3 py-1 rounded-full border border-green-300">Top 15% in your District</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">⭐ Local Leaderboard</h3>
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div key={user.rank} className={`flex items-center justify-between p-3 rounded-lg border ${user.name.includes('(You)') ? 'bg-orange-50 border-orange-200 shadow-sm' : 'bg-white border-blue-100'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-black">#{user.rank}</div>
                    <div>
                      <div className="font-bold text-black text-sm">{user.name}</div>
                      <div className="text-xs text-black font-medium">{user.badge}</div>
                    </div>
                  </div>
                  <div className="font-black text-orange-600">{user.karma} <span className="text-[10px] text-orange-400">KP</span></div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">📜 Karma Ledger</h3>
            <div className="overflow-x-auto bg-white rounded-xl border border-blue-100 p-4 h-64 overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <tbody className="text-sm">
                  {loading ? (
                    <tr><td className="py-4 text-center text-black">Loading database...</td></tr>
                  ) : analytics.ledger && analytics.ledger.length > 0 ? (
                    analytics.ledger.map((entry, idx) => (
                      <tr key={idx} className="border-b border-blue-100/60 last:border-0">
                        <td className="py-3 text-black text-xs w-24">{new Date(entry.createdAt || Date.now()).toLocaleDateString()}</td>
                        <td className="py-3 font-medium text-black">{entry.reason}</td>
                        <td className="py-3 text-right font-bold text-green-600">+{entry.points}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td className="py-4 text-center text-black">No records found.</td></tr>
                  )}
                  {/* Mock Data to make ledger look good if empty */}
                  {!loading && (!analytics.ledger || analytics.ledger.length === 0) && (
                    <>
                      <tr className="border-b border-blue-100/60"><td className="py-3 text-black text-xs">Today</td><td className="py-3 font-medium text-black">Voted on local issue</td><td className="py-3 text-right font-bold text-green-600">+10</td></tr>
                      <tr className="border-b border-blue-100/60"><td className="py-3 text-black text-xs">Yesterday</td><td className="py-3 font-medium text-black">Verified nearby problem</td><td className="py-3 text-right font-bold text-green-600">+25</td></tr>
                      <tr className="border-b border-blue-100/60"><td className="py-3 text-black text-xs">10 Sep</td><td className="py-3 font-medium text-black">Reported a new challenge</td><td className="py-3 text-right font-bold text-green-600">+50</td></tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CitizenChallengesView = () => {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("All");
  const [priority, setPriority] = useState("All");

  const DOMAINS = ["All", ...Array.from(new Set(problems.map(p => p.domain)))];
  const PRIORITIES = ["All", "Critical", "High", "Medium", "Low"];

  const filtered = problems.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (domain !== "All" && p.domain !== domain) return false;
    if (priority !== "All" && p.priority !== priority) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-black mb-6">Community Challenges Map</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl border border-blue-100 h-96 overflow-hidden">
             <CitizenChallengesMap problems={filtered} />
          </div>
          <div className="space-y-4 overflow-y-auto h-96 pr-2">
            <h3 className="font-bold text-black sticky top-0 bg-white py-2 z-10">Highlighted Issues</h3>
            {filtered.slice(0, 5).map(p => (
              <div key={p.id} className="p-4 border border-blue-100 rounded-lg bg-white hover:border-orange-200 transition-all cursor-pointer">
                <div className="text-sm font-bold text-black">{p.title}</div>
                <div className="text-xs text-black mt-1">{p.district} • <span className={getPriorityColor(p.priority).split(' ')[1] || 'text-black'}>{p.priority} Priority</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-bold text-black">All Reported Challenges</h2>
          <div className="flex flex-wrap gap-3 items-center">
            <input type="text" placeholder="Search issues..." value={search} onChange={e => setSearch(e.target.value)}
              className="text-sm border border-blue-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300" />
            <select value={domain} onChange={e => setDomain(e.target.value)} className="text-sm border border-blue-100 rounded-lg px-3 py-2 bg-white outline-none">
              {DOMAINS.map(d => <option key={d} value={d}>{d === 'All' ? 'All Domains' : d}</option>)}
            </select>
            <select value={priority} onChange={e => setPriority(e.target.value)} className="text-sm border border-blue-100 rounded-lg px-3 py-2 bg-white outline-none">
              {PRIORITIES.map(p => <option key={p} value={p}>{p === 'All' ? 'All Priorities' : p}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-blue-100 text-black">
                <th className="pb-3 font-semibold px-4">Problem ID</th>
                <th className="pb-3 font-semibold px-4">Title & Location</th>
                <th className="pb-3 font-semibold px-4">Domain</th>
                <th className="pb-3 font-semibold px-4">Priority</th>
                <th className="pb-3 font-semibold px-4">Status</th>
                <th className="pb-3 font-semibold px-4">Posted Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-blue-100 hover:bg-orange-50/30 transition-colors cursor-pointer">
                  <td className="py-4 px-4 font-mono text-xs text-black font-semibold whitespace-nowrap">{p.id}</td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-black max-w-xs truncate">{p.title}</p>
                    <p className="text-xs text-black mt-1">{p.district}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-xs bg-white text-black rounded-full px-2 py-1 whitespace-nowrap">{p.domain}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full border font-semibold whitespace-nowrap ${getPriorityColor(p.priority)}`}>{p.priority}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-xs bg-white text-black rounded-full px-2 py-1 whitespace-nowrap">{p.status}</span>
                  </td>
                  <td className="py-4 px-4 text-xs text-black whitespace-nowrap">{p.postedDate}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-black font-medium">No challenges found matching your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const CitizenVoteView = () => {
  const [votes, setVotes] = useState(
    problems.reduce((acc, p) => ({ ...acc, [p.id]: p.communityConfirmations || 0 }), {})
  );
  const [votedFor, setVotedFor] = useState({});

  const handleVote = (id) => {
    if (votedFor[id]) {
      setVotes(prev => ({ ...prev, [id]: prev[id] - 1 }));
      setVotedFor(prev => ({ ...prev, [id]: false }));
    } else {
      setVotes(prev => ({ ...prev, [id]: prev[id] + 1 }));
      setVotedFor(prev => ({ ...prev, [id]: true }));
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-8 min-h-[500px]">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black">Vote on Community Problems</h2>
        <p className="text-black mt-2">Your votes help the government prioritize which challenges need immediate attention and funding.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map(p => (
          <div key={p.id} className={`border rounded-xl p-5 flex flex-col justify-between transition-all duration-300 ${votedFor[p.id] ? 'border-orange-500 shadow-md bg-orange-50/30' : 'border-blue-100 bg-white hover:shadow-md'}`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${getPriorityColor(p.priority)}`}>
                  {p.priority} Priority
                </span>
                <span className="text-xs text-black font-medium">{p.district}</span>
              </div>
              <h3 className="font-bold text-black text-lg leading-tight mb-2">{p.title}</h3>
              <p className="text-sm text-black line-clamp-3 mb-4">{p.description}</p>
            </div>
            
            <div className="pt-4 border-t border-blue-100 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-black font-medium uppercase tracking-wider">Total Votes</span>
                <span className={`text-xl font-black ${votedFor[p.id] ? 'text-orange-600' : 'text-black'}`}>
                  {votes[p.id]?.toLocaleString() || 0}
                </span>
              </div>
              <button 
                onClick={() => handleVote(p.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${votedFor[p.id] ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' : 'bg-blue-600 text-white hover:bg-blue-600'}`}
              >
                {votedFor[p.id] ? (
                  <><span>✅</span> Voted</>
                ) : (
                  <><span>👍</span> Upvote</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CitizenVolunteerView = () => {
  const [problems, setProblems] = useState([]);
  
  useEffect(() => {
    setProblems(getStoredProblems() || []);
  }, []);

  const districtCount = problems.reduce((acc, p) => {
    const dist = p.district || 'Unspecified';
    acc[dist] = (acc[dist] || 0) + 1;
    return acc;
  }, {});
  
  const barData = Object.entries(districtCount).map(([name, volunteers]) => ({ name, volunteers: volunteers * 3 })); // arbitrary scale for volunteers needed

  const volunteerRoles = [
    { title: "Data Collection", type: "Field Work", req: 5, uni: "BIT Mesra" },
    { title: "Community Outreach", type: "Workshop", req: 10, uni: "JUT Ranchi" },
    { title: "Prototype Testing", type: "Testing", req: 15, uni: "IIT ISM Dhanbad" },
    { title: "Translation Services", type: "Remote", req: 4, uni: "NIT Jamshedpur" }
  ];

  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-8 min-h-[500px]">
      <h2 className="text-2xl font-bold text-black mb-2">Volunteer for Ongoing Projects</h2>
      <p className="text-black mb-8">Join hands with universities and industry partners to help solve community problems.</p>
      
      {/* Chart Section */}
      <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-blue-50">
        <h3 className="font-bold text-lg mb-4 text-black">Volunteers Needed by District (From Database)</h3>
        <div className="h-64">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={barData}>
               <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
               <YAxis stroke="#64748b" fontSize={12} />
               <Tooltip cursor={{fill: '#f1f5f9'}} />
               <Bar dataKey="volunteers" fill="#f97316" radius={[4, 4, 0, 0]} />
             </BarChart>
           </ResponsiveContainer>
        </div>
      </div>

      {/* Table Section */}
      <div>
         <h3 className="font-bold text-lg mb-4 text-black">Open Volunteer Roles</h3>
         <div className="overflow-x-auto border border-blue-100 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-blue-100">
                  <th className="p-4 text-sm font-bold text-black">Role / Project</th>
                  <th className="p-4 text-sm font-bold text-black">Type</th>
                  <th className="p-4 text-sm font-bold text-black">Partner</th>
                  <th className="p-4 text-sm font-bold text-black">Needed</th>
                  <th className="p-4 text-sm font-bold text-black">Action</th>
                </tr>
              </thead>
              <tbody>
                {volunteerRoles.map((role, i) => (
                  <tr key={i} className="border-b border-blue-50 hover:bg-orange-50/30 transition-colors">
                    <td className="p-4 text-sm font-bold text-black">{role.title}</td>
                    <td className="p-4 text-sm text-black">
                       <span className="bg-orange-100 text-orange-800 text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-bold">{role.type}</span>
                    </td>
                    <td className="p-4 text-sm text-black font-medium">{role.uni}</td>
                    <td className="p-4 text-sm font-black text-orange-600">{role.req}</td>
                    <td className="p-4">
                       <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm">Sign Up</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

const CitizenProposalsView = () => {
  const [problems, setProblems] = useState([]);
  
  useEffect(() => {
    // Fetch local "database" of problems
    setProblems(getStoredProblems() || []);
  }, []);

  // Process data for charts
  const categoryCount = problems.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(categoryCount).map(([name, value]) => ({ name, value }));
  const COLORS = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6', '#eab308'];

  // Map problems to simulated proposals for the table
  const tableData = problems.slice(0, 10).map((p, i) => ({
    id: p._id || i,
    issue: p.title,
    uni: ['IIT ISM Dhanbad', 'BIT Mesra', 'NIT Jamshedpur', 'JUT Ranchi'][i % 4],
    phase: (p.status || 'ideation').replace('_', ' ').toUpperCase(),
    progress: Math.floor(Math.random() * 80) + 10,
  }));

  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center justify-between mb-2">
         <div>
           <h1 className="text-2xl font-black text-black">University Proposals</h1>
           <p className="text-sm text-black font-medium">Solutions being developed by students for your reported problems.</p>
         </div>
       </div>

       {/* Chart Section */}
       <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6">
         <h2 className="font-bold text-lg mb-4 text-black">Proposals by Category</h2>
         <div className="h-64">
           <ResponsiveContainer width="100%" height="100%">
             <PieChart>
               <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                 {pieData.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                 ))}
               </Pie>
               <Tooltip />
               <Legend />
             </PieChart>
           </ResponsiveContainer>
         </div>
       </div>

       {/* Table Section */}
       <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 overflow-hidden">
          <h2 className="font-bold text-lg mb-4 text-black">Active Proposal Database</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-blue-100">
                  <th className="p-3 text-sm font-bold text-black">Issue Title</th>
                  <th className="p-3 text-sm font-bold text-black">University</th>
                  <th className="p-3 text-sm font-bold text-black">Phase</th>
                  <th className="p-3 text-sm font-bold text-black">Progress</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map(row => (
                  <tr key={row.id} className="border-b border-blue-50 hover:bg-orange-50/20 transition-colors">
                    <td className="p-3 text-sm font-bold text-black">{row.issue}</td>
                    <td className="p-3 text-sm text-black">{row.uni}</td>
                    <td className="p-3 text-sm font-bold">
                       <span className="bg-blue-100 text-blue-800 text-[10px] px-2 py-1 rounded-full uppercase tracking-wider">{row.phase}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden w-24">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${row.progress}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-black">{row.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
                {tableData.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-sm font-bold text-black">No proposals currently active.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
       </div>
    </div>
  );
};


const StoryCard = ({ story }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(story.likes);

  const handleLike = () => {
    setLiked((v) => {
      setLikeCount((c) => v ? c - 1 : c + 1);
      return !v;
    });
  };

  return (
    <div className="border border-blue-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white flex flex-col group">
      {/* Before / After reveal */}
      <div className="h-52 flex relative overflow-hidden">
        {/* Before panel */}
        <div className="flex-1 relative overflow-hidden group-hover:flex-[0.45] transition-all duration-500 ease-in-out">
          <div className="absolute inset-0 bg-orange-900/30 mix-blend-multiply z-10" />
          <img src={story.beforeImg} alt="Before" className="w-full h-full object-cover grayscale saturate-50" />
          <span className="absolute bottom-3 left-3 z-20 bg-blue-600/70 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded backdrop-blur-sm">Before</span>
        </div>
        {/* Divider line */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 group-hover:left-[30%] z-30 transition-all duration-500 flex items-center pointer-events-none">
          <div className="w-0.5 h-full bg-white/80 shadow-lg" />
          <div className="absolute w-7 h-7 rounded-full bg-white shadow-xl flex items-center justify-center text-black text-[10px] font-black border border-blue-100">
            ↔
          </div>
        </div>
        {/* After panel */}
        <div className="flex-1 relative overflow-hidden group-hover:flex-[1.55] transition-all duration-500 ease-in-out">
          <div className="absolute inset-0 bg-green-900/10 mix-blend-overlay z-10" />
          <img src={story.afterImg} alt="After" className="w-full h-full object-cover" />
          <span className="absolute bottom-3 right-3 z-20 bg-green-500/95 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded backdrop-blur-sm">After</span>
        </div>
        {/* Partner badge */}
        <div className="absolute top-3 right-3 z-30 bg-white/90 backdrop-blur-sm border border-blue-100 rounded-lg px-2.5 py-1 text-[10px] font-bold text-black shadow-sm">
          🤝 {story.partner}
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Domain + date */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${story.domainColor}`}>
            {story.domain}
          </span>
          <span className="text-xs font-semibold text-black">✅ Resolved {story.resolvedDate}</span>
        </div>

        {/* Title */}
        <h4 className="font-black text-black text-lg mb-2 leading-snug group-hover:text-orange-700 transition-colors">
          {story.title}
        </h4>

        {/* Description */}
        <p className="text-sm text-black leading-relaxed mb-4">{story.description}</p>

        {/* Impact metrics strip */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {story.metrics.map((m) => (
            <div key={m.label} className="bg-white border border-blue-100 rounded-xl p-2.5 text-center">
              <div className="text-lg mb-0.5">{m.icon}</div>
              <div className="font-black text-black text-sm leading-none">{m.value}</div>
              <div className="text-[9px] font-semibold text-black mt-0.5 leading-tight">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Citizen quote */}
        <blockquote className="border-l-3 border-orange-300 bg-orange-50/60 px-4 py-2.5 rounded-r-xl text-xs text-black italic font-medium mb-4 border-l-4">
          {story.quote}
        </blockquote>

        {/* Actions row */}
        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-blue-100">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
              liked ? 'bg-orange-50 border-orange-200 text-orange-600' : 'border-blue-100 text-black hover:border-orange-200 hover:text-orange-500'
            }`}
          >
            {liked ? '❤️' : '🤍'} {likeCount}
          </button>
          <button
            onClick={() => setBookmarked((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
              bookmarked ? 'bg-orange-50 border-orange-200 text-orange-600' : 'border-blue-100 text-black hover:border-orange-200 hover:text-orange-500'
            }`}
          >
            {bookmarked ? '🔖' : '📑'} {bookmarked ? 'Saved' : 'Save'}
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-100 text-black hover:border-blue-200 hover:text-blue-600 transition-all">
            🔗 Share
          </button>
          <button className="ml-auto text-orange-600 font-bold text-xs hover:underline transition-all">
            Read full story →
          </button>
        </div>
      </div>
    </div>
  );
};

const CitizenCommunityView = () => {
  const [tab, setTab] = useState('forums');

  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-8 min-h-[600px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-black mb-2">Community Hub</h2>
          <p className="text-black font-medium">Discuss ideas, participate in decisions, and celebrate local wins.</p>
        </div>
        {tab === 'forums' && (
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-orange-500/20 transition-all flex items-center gap-2">
            <span>+</span> New Topic
          </button>
        )}
      </div>

      <div className="flex border-b border-blue-100 gap-8 mb-8 overflow-x-auto scrollbar-hide">
        <button onClick={() => setTab('forums')} className={`pb-4 text-sm font-bold transition-all whitespace-nowrap ${tab === 'forums' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-black hover:text-black'}`}>Discussion Forums</button>
        <button onClick={() => setTab('surveys')} className={`pb-4 text-sm font-bold transition-all whitespace-nowrap ${tab === 'surveys' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-black hover:text-black'}`}>Active Micro-Surveys</button>
        <button onClick={() => setTab('success')} className={`pb-4 text-sm font-bold transition-all whitespace-nowrap ${tab === 'success' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-black hover:text-black'}`}>Success Stories</button>
      </div>

      {tab === 'forums' && (
        <div className="space-y-4">
          {/* Forum Item 1 */}
          <div className="border border-blue-100 rounded-2xl p-5 bg-white hover:border-orange-200 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">RV</div>
                <div>
                  <div className="font-bold text-black text-sm">Rahul Verma</div>
                  <div className="text-xs text-black">Ward 14 • 2 hours ago</div>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">Sanitation</span>
            </div>
            <h4 className="font-bold text-black text-lg mb-2 group-hover:text-orange-600 transition-colors">Proposal for new waste segregation rules</h4>
            <p className="text-sm text-black mb-4 line-clamp-2">Let's discuss if we want separate bins for dry/wet or a common sorting facility at the end of the street. The municipal corporation is asking for our input by next week.</p>
            <div className="flex items-center gap-6 text-sm font-bold text-black pt-3 border-t border-slate-50">
              <span className="flex items-center gap-1.5 hover:text-orange-600"><span className="text-lg">💬</span> 24 Replies</span>
              <span className="flex items-center gap-1.5"><span className="text-lg">🔥</span> 15 Upvotes</span>
              <span className="flex items-center gap-1.5"><span className="text-lg">👁️</span> 156 Views</span>
            </div>
          </div>

          {/* Forum Item 2 */}
          <div className="border border-blue-100 rounded-2xl p-5 bg-white hover:border-orange-200 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-600">SK</div>
                <div>
                  <div className="font-bold text-black text-sm">Sneha Kumari</div>
                  <div className="text-xs text-black">Sector 2 • 1 day ago</div>
                </div>
              </div>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">Infrastructure</span>
            </div>
            <h4 className="font-bold text-black text-lg mb-2 group-hover:text-orange-600 transition-colors">Safety concerns regarding the new highway crossing</h4>
            <p className="text-sm text-black mb-4 line-clamp-2">The new crossing near the school lacks proper pedestrian signals. We should petition the authorities to install a foot overbridge before the monsoon starts.</p>
            <div className="flex items-center gap-6 text-sm font-bold text-black pt-3 border-t border-slate-50">
              <span className="flex items-center gap-1.5 hover:text-orange-600"><span className="text-lg">💬</span> 45 Replies</span>
              <span className="flex items-center gap-1.5"><span className="text-lg">🔥</span> 89 Upvotes</span>
              <span className="flex items-center gap-1.5"><span className="text-lg">👁️</span> 312 Views</span>
            </div>
          </div>
        </div>
      )}

      {tab === 'surveys' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-orange-200 rounded-2xl p-6 bg-gradient-to-br from-orange-50 to-orange-50/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">📊</div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-orange-200 text-orange-800 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md">Closes in 2 days</span>
                <span className="text-xs font-bold text-black">75% Voted</span>
              </div>
              <h4 className="font-black text-black text-xl mb-3">Water Filter Placement</h4>
              <p className="text-sm text-black font-medium mb-6">The university team has built the prototype. Where should the community water filter be placed?</p>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-orange-200 bg-white cursor-pointer hover:bg-orange-50/50 transition-colors">
                  <input type="radio" name="survey1" className="w-5 h-5 accent-orange-600" />
                  <span className="font-bold text-black">Near Panchayat Bhawan</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-orange-200 bg-white cursor-pointer hover:bg-orange-50/50 transition-colors">
                  <input type="radio" name="survey1" className="w-5 h-5 accent-orange-600" />
                  <span className="font-bold text-black">Next to Primary School</span>
                </label>
              </div>
              <button className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-slate-900/20">Submit Vote</button>
            </div>
          </div>
          
          <div className="border border-blue-200 rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-blue-50/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">🚦</div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-blue-200 text-blue-800 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md">New</span>
                <span className="text-xs font-bold text-black">12% Voted</span>
              </div>
              <h4 className="font-black text-black text-xl mb-3">Traffic Calming Measures</h4>
              <p className="text-sm text-black font-medium mb-6">Which solution do you prefer for reducing vehicle speed on Market Road?</p>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-blue-200 bg-white cursor-pointer hover:bg-blue-50/50 transition-colors">
                  <input type="radio" name="survey2" className="w-5 h-5 accent-blue-600" />
                  <span className="font-bold text-black">Install Speed Breakers</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-blue-200 bg-white cursor-pointer hover:bg-blue-50/50 transition-colors">
                  <input type="radio" name="survey2" className="w-5 h-5 accent-blue-600" />
                  <span className="font-bold text-black">Add Zebra Crossings</span>
                </label>
              </div>
              <button className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-slate-900/20">Submit Vote</button>
            </div>
          </div>

          <div className="border border-green-200 rounded-2xl p-6 bg-gradient-to-br from-green-50 to-green-50/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">🌳</div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-green-200 text-green-800 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md">Trending</span>
                <span className="text-xs font-bold text-black">45% Voted</span>
              </div>
              <h4 className="font-black text-black text-xl mb-3">City Park Renovation</h4>
              <p className="text-sm text-black font-medium mb-6">The old central park is being renovated. What should be prioritized in the first phase?</p>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-green-200 bg-white cursor-pointer hover:bg-green-50/50 transition-colors">
                  <input type="radio" name="survey3" className="w-5 h-5 accent-green-600" />
                  <span className="font-bold text-black">Children's Play Area</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-green-200 bg-white cursor-pointer hover:bg-green-50/50 transition-colors">
                  <input type="radio" name="survey3" className="w-5 h-5 accent-green-600" />
                  <span className="font-bold text-black">Open Gym & Jogging Track</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-green-200 bg-white cursor-pointer hover:bg-green-50/50 transition-colors">
                  <input type="radio" name="survey3" className="w-5 h-5 accent-green-600" />
                  <span className="font-bold text-black">More Seating & Lighting</span>
                </label>
              </div>
              <button className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-slate-900/20">Submit Vote</button>
            </div>
          </div>

          <div className="border border-purple-200 rounded-2xl p-6 bg-gradient-to-br from-purple-50 to-purple-50/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">🗑️</div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-purple-200 text-purple-800 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md">New</span>
                <span className="text-xs font-bold text-black">8% Voted</span>
              </div>
              <h4 className="font-black text-black text-xl mb-3">Waste Collection Schedule</h4>
              <p className="text-sm text-black font-medium mb-6">When do you prefer the municipal waste collection trucks to arrive in your locality?</p>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-purple-200 bg-white cursor-pointer hover:bg-purple-50/50 transition-colors">
                  <input type="radio" name="survey4" className="w-5 h-5 accent-purple-600" />
                  <span className="font-bold text-black">Early Morning (6 AM - 8 AM)</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-purple-200 bg-white cursor-pointer hover:bg-purple-50/50 transition-colors">
                  <input type="radio" name="survey4" className="w-5 h-5 accent-purple-600" />
                  <span className="font-bold text-black">Late Morning (9 AM - 11 AM)</span>
                </label>
              </div>
              <button className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-slate-900/20">Submit Vote</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'success' && (() => {
        const STORIES = [
          {
            id: 1,
            domain: 'Water',
            domainColor: 'bg-blue-100 text-blue-700',
            resolvedDate: 'Dec 2025',
            title: 'Smart Water Management in Hazaribagh',
            description: 'Resolved a 3-year-long water leakage issue using low-cost IoT sensors developed by NIT Jamshedpur students. Real-time data reduced wastage by 62%.',
            beforeImg: 'https://picsum.photos/seed/waterbefore/800/600',
            afterImg: 'https://picsum.photos/seed/waterafter/800/600',
            partner: 'NIT Jamshedpur',
            metrics: [
              { label: 'Households Benefited', value: '2,400', icon: '🏠' },
              { label: 'Water Saved / Month', value: '1.2M L', icon: '💧' },
              { label: 'Resolution Time', value: '4 months', icon: '⏱️' },
            ],
            likes: 312,
            quote: '"For the first time in 3 years, clean water runs all day." – Panchayat Head, Ward 5',
          },
          {
            id: 2,
            domain: 'Education',
            domainColor: 'bg-blue-200 text-blue-600',
            resolvedDate: 'Aug 2025',
            title: 'Digital Literacy Labs in Dumka',
            description: 'Deployed refurbished computers and educational software to 15 rural schools with the help of BIT Mesra volunteers. Student digital-skills scores tripled.',
            beforeImg: 'https://picsum.photos/seed/edubefore/800/600',
            afterImg: 'https://picsum.photos/seed/eduafter/800/600',
            partner: 'BIT Mesra',
            metrics: [
              { label: 'Schools Upgraded', value: '15', icon: '🏫' },
              { label: 'Students Impacted', value: '3,200', icon: '🎓' },
              { label: 'Cost per Student', value: '₹180', icon: '💰' },
            ],
            likes: 218,
            quote: '"Our kids now know things we never imagined." – Teacher, Dumka Govt School',
          },
          {
            id: 3,
            domain: 'Roads',
            domainColor: 'bg-orange-100 text-orange-700',
            resolvedDate: 'Oct 2025',
            title: 'Polymer Pothole Sealing in Bokaro',
            description: 'BIT Mesra Innovation Lab developed polymer-based sealant that outlasted traditional bitumen by 5x. 23 km of arterial roads restored permanently.',
            beforeImg: 'https://picsum.photos/seed/roadbefore/800/600',
            afterImg: 'https://picsum.photos/seed/roadafter/800/600',
            partner: 'BIT Mesra Innovation Lab',
            metrics: [
              { label: 'Road Restored', value: '23 km', icon: '🛣️' },
              { label: 'Accident Reduction', value: '41%', icon: '⚠️' },
              { label: 'Lifespan vs Bitumen', value: '5×', icon: '🔬' },
            ],
            likes: 189,
            quote: '"Finally, roads that survive monsoon." – Commuter, Sector 4',
          },
          {
            id: 4,
            domain: 'Health',
            domainColor: 'bg-orange-100 text-orange-700',
            resolvedDate: 'Jun 2025',
            title: 'Mobile TB Screening in Palamu',
            description: 'AI-assisted portable X-ray units deployed in 8 remote blocks of Palamu. Early detection rate jumped to 89%, saving hundreds of lives annually.',
            beforeImg: 'https://picsum.photos/seed/healthbefore/800/600',
            afterImg: 'https://picsum.photos/seed/healthafter/800/600',
            partner: 'AIIMS Patna + IIT Dhanbad',
            metrics: [
              { label: 'Blocks Covered', value: '8', icon: '📍' },
              { label: 'Early Detection', value: '89%', icon: '🩺' },
              { label: 'Patients Treated', value: '1,140', icon: '❤️‍🩹' },
            ],
            likes: 275,
            quote: '"I was diagnosed early and fully cured. This unit saved my life." – Patient, Chainpur',
          },
        ];

        return (
          <div className="space-y-10">
            {/* ── Hero Impact Banner ── */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-green-950 p-8 text-white shadow-xl">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #10b981 0%, transparent 60%), radial-gradient(circle at 80% 20%, #f97316 0%, transparent 50%)' }} />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-black uppercase tracking-widest">Live Impact Dashboard</span>
                  </div>
                  <h3 className="text-2xl font-black mb-1">Jharkhand Citizens Changed the Story</h3>
                  <p className="text-black text-sm font-medium">Every resolved challenge is a community victory. Here's what we've achieved together.</p>
                </div>
                <div className="grid grid-cols-3 gap-4 shrink-0">
                  {[
                    { val: '47', label: 'Issues Resolved', color: 'text-green-400' },
                    { val: '1.2L+', label: 'People Impacted', color: 'text-orange-400' },
                    { val: '₹3.8Cr', label: 'Value Generated', color: 'text-blue-400' },
                  ].map((s) => (
                    <div key={s.label} className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                      <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
                      <div className="text-[10px] text-black font-semibold mt-0.5 leading-tight">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Story Cards Grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
              {STORIES.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>

            {/* ── Load More ── */}
            <div className="text-center pt-2">
              <button className="border border-blue-100 hover:border-orange-300 hover:bg-orange-50 text-black hover:text-orange-700 font-bold px-8 py-3 rounded-xl text-sm transition-all shadow-sm">
                Load More Stories ↓
              </button>
              <p className="text-xs text-black mt-2 font-medium">Showing 4 of 47 resolved challenges</p>
            </div>
          </div>
        );
      })()}

    </div>
  );
};

const CitizenAlertsView = () => {
  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-8 min-h-[500px]">
      <h2 className="text-2xl font-bold text-black mb-6">Local Alerts & Announcements</h2>
      <div className="space-y-4">
        <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-bold text-orange-900">Heavy Rainfall Warning (Red Alert)</h4>
            <span className="text-xs font-bold text-orange-700 bg-orange-200 px-2 py-1 rounded">Urgent</span>
          </div>
          <p className="text-sm text-orange-800">Severe waterlogging expected in low-lying areas of Dhanbad. Municipal teams are on standby.</p>
          <div className="text-xs text-orange-600 mt-2 font-medium">Issued by IMD & District Administration • 1 hour ago</div>
        </div>
        
        <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-bold text-blue-900">New Solar Scheme Enrolment</h4>
            <span className="text-xs font-bold text-blue-700 bg-blue-200 px-2 py-1 rounded">Info</span>
          </div>
          <p className="text-sm text-blue-800">Applications open for PM-KUSUM subsidized solar pumps for farmers in Hazaribagh.</p>
          <div className="text-xs text-blue-600 mt-2 font-medium">Issued by JREDA • 1 day ago</div>
        </div>

        <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-bold text-green-900">Road Construction Completed</h4>
            <span className="text-xs font-bold text-green-700 bg-green-200 px-2 py-1 rounded">Success</span>
          </div>
          <p className="text-sm text-green-800">The 4-lane expansion of Bypass Road has been successfully completed ahead of schedule.</p>
          <div className="text-xs text-green-600 mt-2 font-medium">Issued by NHAI • 2 days ago</div>
        </div>

        <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-bold text-purple-900">Town Hall Meeting: Waste Management</h4>
            <span className="text-xs font-bold text-purple-700 bg-purple-200 px-2 py-1 rounded">Event</span>
          </div>
          <p className="text-sm text-purple-800">Join the Mayor and sanitation officials to discuss the new decentralized waste management plan for your ward.</p>
          <div className="text-xs text-purple-600 mt-2 font-medium">Issued by Municipal Corporation • 3 days ago</div>
        </div>
      </div>
    </div>
  );
};

const CitizenReportsView = () => {
  const [reports] = useState([
    { id: 1, title: 'Ward 14 Sanitation Monthly Audit', date: '2026-08-31', type: 'Sanitation', size: '2.4 MB', status: 'Ready' },
    { id: 2, title: 'Community Impact Summary (Q2)', date: '2026-07-15', type: 'Impact', size: '1.1 MB', status: 'Ready' },
    { id: 3, title: 'Public Transport Delay Analysis', date: '2026-07-20', type: 'Transport', size: '3.6 MB', status: 'Ready' },
    { id: 4, title: 'Water Logging Complaints Report', date: '2026-06-10', type: 'Infrastructure', size: '1.8 MB', status: 'Ready' }
  ]);

  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-8 min-h-[500px]">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-black">Generated Reports</h2>
          <p className="text-black mt-2">Access and download localized community reports and platform summaries.</p>
        </div>
        <button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all text-sm flex items-center gap-2 whitespace-nowrap">
           + Generate New
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b-2 border-slate-200">
              <th className="py-4 px-4 text-sm font-black text-slate-800 uppercase tracking-wider">Report Name</th>
              <th className="py-4 px-4 text-sm font-black text-slate-800 uppercase tracking-wider">Category</th>
              <th className="py-4 px-4 text-sm font-black text-slate-800 uppercase tracking-wider">Generated On</th>
              <th className="py-4 px-4 text-sm font-black text-slate-800 uppercase tracking-wider">Size</th>
              <th className="py-4 px-4 text-sm font-black text-slate-800 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reports.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-4">
                  <div className="font-bold text-slate-900">{r.title}</div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-1 rounded-md uppercase tracking-wider">{r.type}</span>
                </td>
                <td className="py-4 px-4 text-sm font-medium text-slate-600">{r.date}</td>
                <td className="py-4 px-4 text-sm font-medium text-slate-600">{r.size}</td>
                <td className="py-4 px-4">
                  <button className="text-blue-600 hover:text-blue-800 font-bold text-sm bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors border border-blue-200">
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CitizenSettingsView = () => {
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');
  const { logout } = useAuth();

  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm min-h-[600px] flex overflow-hidden">
      {/* Settings Sidebar */}
      <div className="w-64 bg-white border-r border-blue-100 p-6 flex flex-col gap-2">
        <h2 className="text-lg font-black text-black mb-4 px-3">Settings</h2>
        <button onClick={() => setActiveSettingsTab('profile')} className={`text-left px-4 py-2.5 rounded-lg font-bold text-sm transition-all ${activeSettingsTab === 'profile' ? 'bg-white shadow-sm border border-blue-100 text-orange-600' : 'text-black hover:bg-white'}`}>👤 Profile & KYC</button>
        <button onClick={() => setActiveSettingsTab('notifications')} className={`text-left px-4 py-2.5 rounded-lg font-bold text-sm transition-all ${activeSettingsTab === 'notifications' ? 'bg-white shadow-sm border border-blue-100 text-orange-600' : 'text-black hover:bg-white'}`}>🔔 Notifications</button>
        <button onClick={() => setActiveSettingsTab('location')} className={`text-left px-4 py-2.5 rounded-lg font-bold text-sm transition-all ${activeSettingsTab === 'location' ? 'bg-white shadow-sm border border-blue-100 text-orange-600' : 'text-black hover:bg-white'}`}>📍 Location & Ward</button>
        <button onClick={() => setActiveSettingsTab('privacy')} className={`text-left px-4 py-2.5 rounded-lg font-bold text-sm transition-all ${activeSettingsTab === 'privacy' ? 'bg-white shadow-sm border border-blue-100 text-orange-600' : 'text-black hover:bg-white'}`}>🔒 Privacy</button>
        
        <div className="mt-auto pt-6 border-t border-blue-100">
          <button onClick={logout} className="w-full text-left px-4 py-2.5 rounded-lg font-bold text-sm text-orange-600 hover:bg-orange-50 transition-all border border-transparent hover:border-orange-100">
            🚪 Sign Out
          </button>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 p-8">
        {activeSettingsTab === 'profile' && (
          <div className="max-w-2xl animate-fade-in">
            <h3 className="text-xl font-bold text-black mb-6 border-b border-blue-100 pb-4">Profile & KYC</h3>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-inner">N</div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold text-black">Neha Dilip Bhamare</h4>
                  <span className="bg-green-100 text-green-700 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full flex items-center gap-1">✅ Verified</span>
                </div>
                <p className="text-sm text-black">Citizen Account • Member since 2024</p>
                <button className="text-sm font-bold text-orange-600 mt-2 hover:underline">Change Avatar</button>
              </div>
            </div>

            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-black uppercase tracking-wider">Full Name</label>
                  <input type="text" defaultValue="Neha Dilip Bhamare" className="w-full p-2.5 border border-blue-100 rounded-lg mt-1 font-medium bg-white" readOnly />
                </div>
                <div>
                  <label className="text-xs font-bold text-black uppercase tracking-wider">Mobile Number</label>
                  <input type="text" defaultValue="+91 98765 43210" className="w-full p-2.5 border border-blue-100 rounded-lg mt-1 font-medium" />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-bold text-black uppercase tracking-wider">Govt ID Link (Aadhaar / Voter ID)</label>
                <div className="flex items-center gap-3 mt-1">
                  <input type="text" value="XXXX-XXXX-4321" readOnly className="flex-1 p-2.5 border border-green-200 bg-green-50 text-green-800 rounded-lg font-medium" />
                  <button type="button" className="px-4 py-2.5 bg-white text-black rounded-lg font-bold text-sm hover:bg-white">Re-verify</button>
                </div>
                <p className="text-xs text-black mt-1">Your ID is encrypted and only used to prevent duplicate reports.</p>
              </div>
              
              <div>
                <label className="text-xs font-bold text-black uppercase tracking-wider">Platform Language</label>
                <select className="w-full p-2.5 border border-blue-100 rounded-lg mt-1 font-medium">
                  <option>English</option>
                  <option>Hindi (हिंदी)</option>
                  <option>Santhali (ᱥᱟᱱᱛᱟᱲᱤ)</option>
                </select>
              </div>

              <div className="pt-6 border-t border-blue-100 mt-6">
                <button type="button" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-slate-900/20">Save Profile Changes</button>
              </div>
            </form>
          </div>
        )}

        {activeSettingsTab === 'notifications' && (
          <div className="max-w-2xl animate-fade-in">
            <h3 className="text-xl font-bold text-black mb-6 border-b border-blue-100 pb-4">Notification Preferences</h3>
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-black">Emergency & Local Alerts</div>
                  <div className="text-sm text-black">Get SMS for Red Alerts (Weather, Power Cuts) in your district.</div>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-orange-500 mt-1" />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-black">Proposal Updates</div>
                  <div className="text-sm text-black">Notify me when a university submits a solution for a problem I voted on.</div>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-orange-500 mt-1" />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-black">Community Surveys</div>
                  <div className="text-sm text-black">Email me when a new micro-survey is available in my Ward.</div>
                </div>
                <input type="checkbox" className="w-5 h-5 accent-orange-500 mt-1" />
              </div>
            </div>
          </div>
        )}

        {activeSettingsTab === 'location' && (
          <div className="max-w-2xl animate-fade-in">
            <h3 className="text-xl font-bold text-black mb-6 border-b border-blue-100 pb-4">Location & Ward Setup</h3>
            <p className="text-sm text-black mb-6">Setting your exact location helps us filter challenges and alerts relevant to you.</p>
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-black uppercase tracking-wider">District</label>
                  <select className="w-full p-2.5 border border-blue-100 rounded-lg mt-1 font-medium">
                    <option>Ranchi</option>
                    <option>Dhanbad</option>
                    <option>Hazaribagh</option>
                    <option>Giridih</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-black uppercase tracking-wider">Ward / Block</label>
                  <input type="text" defaultValue="Ward 14" className="w-full p-2.5 border border-blue-100 rounded-lg mt-1 font-medium" />
                </div>
              </div>
              <button type="button" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold mt-4">Update Location</button>
            </form>
          </div>
        )}

        {activeSettingsTab === 'privacy' && (
          <div className="max-w-2xl animate-fade-in">
            <h3 className="text-xl font-bold text-black mb-6 border-b border-blue-100 pb-4">Privacy & Anonymity</h3>
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-black">Post Anonymously by Default</div>
                  <div className="text-sm text-black">Hide your real name when reporting new issues.</div>
                </div>
                <input type="checkbox" className="w-5 h-5 accent-orange-500 mt-1" />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-black">Public Profile</div>
                  <div className="text-sm text-black">Allow others to see your Karma score and verification badge.</div>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-orange-500 mt-1" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function CitizenDashboard() {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [tab, setTab] = useState('overview'); // inner tabs
  const [myProblems, setMyProblems] = useState([]);
  const [loadingProblems, setLoadingProblems] = useState(false);
  const [trackerPid, setTrackerPid] = useState('');

  // Fetch my problems
  useEffect(() => {
    if (activeTab === 'overview' || activeTab === 'dashboard' || tab === 'overview' || tab === 'history') {
      const fetchMyProblems = async () => {
        setLoadingProblems(true);
        try {
          if (token) {
            const res = await fetch('http://localhost:5000/api/problems/my', {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
              const data = await res.json();
              if (Array.isArray(data) && data.length > 0) {
                setMyProblems(data);
                setLoadingProblems(false);
                return;
              }
            }
          }
        } catch (err) {
          console.warn('Backend unavailable, loading local problem records:', err);
        }

        // Fallback to local storage
        const localProbs = getStoredProblems();
        setMyProblems(localProbs);
        setLoadingProblems(false);
      };
      fetchMyProblems();
    }
  }, [activeTab, tab, token]);
  
  const [submitting, setSubmitting] = useState(false);

  // Compute stats dynamically from problems so they are always accurate
  const stats = {
    myChallenges: myProblems.length,
    underReview: myProblems.filter(p => p.status === 'submitted' || p.status === 'under_review').length,
    inProgress: myProblems.filter(p => p.status === 'verified' || p.status === 'assigned' || p.status === 'in_progress').length,
    resolved: myProblems.filter(p => p.status === 'deployed' || p.status === 'resolved' || p.status === 'closed').length
  };

  const renderContent = () => {
    if (activeTab === 'vote') return <CitizenVoteView />;
    if (activeTab === 'challenges') return <CitizenChallengesView />;
    if (activeTab === 'volunteer') return <CitizenVolunteerView />;
    if (activeTab === 'community') return <CitizenCommunityView />;
    if (activeTab === 'alerts') return <CitizenAlertsView />;
    if (activeTab === 'report') return <ReportChallengeWizard onComplete={(t) => { setActiveTab('dashboard'); if (t) setTab(t); }} />;
    if (activeTab === 'settings') return <CitizenSettingsView />;

    if (activeTab === 'proposals') return <CitizenProposalsView />;
    if (activeTab === 'reports') return <CitizenReportsView />;

    if (activeTab === 'analytics') {
      return <PersonalImpactAnalytics />;
    }

    // Default: Dashboard Active Tab
    return (
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        {tab === 'overview' && (
          <div className="bg-gradient-to-r from-orange-50 to-orange-50 border border-orange-100 rounded-3xl p-8 sm:p-10 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 opacity-5 rounded-full blur-3xl"></div>
            <div className="relative z-10 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl font-black text-black mb-2">Good Morning, {user?.name?.split(' ')[0] || 'Citizen'} 👋</h1>
              <p className="text-lg text-black font-medium max-w-xl">Help turn your community's challenges into solutions by reporting, tracking, and validating real-world issues.</p>
            </div>
            <div className="relative z-10 shrink-0">
              <div className="flex gap-4">
                <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl border border-orange-200/50 shadow-sm text-center">
                  <div className="text-3xl font-black text-orange-600 mb-1">{user?.karmaTotal || 0}</div>
                  <div className="text-[10px] font-bold text-orange-800 uppercase tracking-widest">Karma Points</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions Grid (Restored) */}
        {tab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div onClick={() => setTab('new')} className="bg-white border border-blue-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group flex flex-col h-full">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">📝</div>
              <h3 className="text-sm font-bold text-black mb-1">Report a Challenge</h3>
              <p className="text-xs text-black font-medium leading-relaxed">Submit a societal problem with text, voice, photos.</p>
            </div>
            
            <div onClick={() => setTab('track')} className="bg-white border border-blue-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group flex flex-col h-full">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">🔍</div>
              <h3 className="text-sm font-bold text-black mb-1">Track a Problem</h3>
              <p className="text-xs text-black font-medium leading-relaxed">Enter your PID and see the complete status.</p>
            </div>

            <div onClick={() => setActiveTab('challenges')} className="bg-white border border-blue-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-green-200 transition-all cursor-pointer group flex flex-col h-full">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">📍</div>
              <h3 className="text-sm font-bold text-black mb-1">Nearby Challenges</h3>
              <p className="text-xs text-black font-medium leading-relaxed">See problems reported around your community.</p>
            </div>

            <div onClick={() => setActiveTab('analytics')} className="bg-white border border-blue-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group flex flex-col h-full">
              <div className="w-10 h-10 bg-blue-200 rounded-xl flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">🌟</div>
              <h3 className="text-sm font-bold text-black mb-1">Community Impact</h3>
              <p className="text-xs text-black font-medium leading-relaxed">See problems that have already become solutions.</p>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            {/* Tabs Navigation (Visible when not in overview to easily switch back) */}
            {tab !== 'overview' && (
              <div className="flex border-b border-blue-100 gap-4 sm:gap-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <button onClick={() => setTab('overview')} className="pb-4 text-sm font-bold text-black hover:text-black transition-all">&larr; Back to Dashboard</button>
                <button onClick={() => setTab('new')} className={`pb-4 text-sm font-bold transition-all ${tab === 'new' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-black hover:text-black'}`}>Report a New Issue</button>
                <button onClick={() => setTab('history')} className={`pb-4 text-sm font-bold transition-all ${tab === 'history' || tab === 'track' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-black hover:text-black'}`}>My Submissions & History</button>
              </div>
            )}

            {/* Dashboard Overview Content */}
            {tab === 'overview' && (
              <div className="space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm text-center">
                    <div className="text-3xl font-black text-black">{stats.myChallenges}</div>
                    <div className="text-xs font-bold text-black uppercase tracking-widest mt-2">My Challenges</div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm text-center">
                    <div className="text-3xl font-black text-orange-600">{stats.underReview}</div>
                    <div className="text-xs font-bold text-black uppercase tracking-widest mt-2">Under Review</div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm text-center">
                    <div className="text-3xl font-black text-blue-600">{stats.inProgress}</div>
                    <div className="text-xs font-bold text-black uppercase tracking-widest mt-2">In Progress</div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm text-center">
                    <div className="text-3xl font-black text-green-600">{stats.resolved}</div>
                    <div className="text-xs font-bold text-black uppercase tracking-widest mt-2">Resolved</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-black mb-6">Status Breakdown</h2>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Under Review', value: stats.underReview, color: '#f59e0b' },
                              { name: 'In Progress', value: stats.inProgress, color: '#3b82f6' },
                              { name: 'Resolved', value: stats.resolved, color: '#10b981' }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {[
                               { name: 'Under Review', value: stats.underReview, color: '#f59e0b' },
                               { name: 'In Progress', value: stats.inProgress, color: '#3b82f6' },
                               { name: 'Resolved', value: stats.resolved, color: '#10b981' }
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-black mb-6">Weekly Activity</h2>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { name: 'Mon', submissions: 2, resolved: 0 },
                          { name: 'Tue', submissions: 4, resolved: 1 },
                          { name: 'Wed', submissions: 1, resolved: 2 },
                          { name: 'Thu', submissions: 3, resolved: 0 },
                          { name: 'Fri', submissions: 5, resolved: 3 },
                          { name: 'Sat', submissions: 2, resolved: 1 },
                          { name: 'Sun', submissions: 0, resolved: 0 }
                        ]}>
                          <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip cursor={{ fill: '#f8fafc' }} />
                          <Legend />
                          <Bar dataKey="submissions" name="Submissions" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="resolved" name="Resolved" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Recent Problems List */}
                <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-black">Recent Problems</h2>
                    <button onClick={() => setTab('history')} className="text-sm font-bold text-orange-600 hover:underline">View All</button>
                  </div>
                  <div className="space-y-4">
                    <div onClick={() => setTab('track')} className="border border-blue-100 rounded-xl p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer bg-white/50">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-bold bg-blue-600 text-white px-2 py-1 rounded">PID: NIR-2026-000241</span>
                          <span className="text-xs font-bold text-black">Submitted: 8 Sep 2026</span>
                        </div>
                        <h4 className="font-bold text-black text-lg">Unsafe drinking water facility</h4>
                        <div className="text-sm text-black mt-1">📍 Nashik / Ward 4</div>
                      </div>
                      <span className="w-fit px-3 py-1.5 bg-orange-100 text-orange-800 text-xs font-bold rounded-full uppercase tracking-widest whitespace-nowrap">Under Gov Review</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === 'new' && (
              <ReportChallengeWizard onComplete={setTab} />
            )}

            {tab === 'history' && (
              <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 sm:p-8 min-h-[400px]">
                <h2 className="text-xl font-bold text-black mb-6">Your Challenge History</h2>
                
                <div className="space-y-4">
                  {loadingProblems ? (
                    <div className="text-center py-8 text-black font-medium">Loading your submissions...</div>
                  ) : myProblems.length > 0 ? (
                    myProblems.map(problem => (
                      <div key={problem._id} className="border border-blue-100 rounded-xl p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:border-orange-300 transition-all">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold bg-white text-black px-2 py-1 rounded font-mono uppercase">{problem.problemIdReadable}</span>
                            <span className="text-xs text-black">{new Date(problem.createdAt).toLocaleDateString()}</span>
                          </div>
                          <h4 className="font-bold text-black text-lg">{problem.title}</h4>
                          <p className="text-xs text-black mt-1">{problem.category} • {problem.district || 'Location not specified'}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`w-fit px-3 py-1 text-xs font-bold rounded-full uppercase tracking-widest ${problem.status === 'resolved' || problem.status === 'closed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                            {problem.status.replace('_', ' ')}
                          </span>
                          <button 
                            onClick={() => {
                              setTrackerPid(problem.problemIdReadable);
                              setTab('track');
                            }} 
                            className="text-sm font-bold text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Track
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed border-blue-100 rounded-xl">
                      <div className="text-4xl mb-3">📝</div>
                      <p className="text-black font-medium">You haven't submitted any problems yet.</p>
                      <button onClick={() => setTab('new')} className="mt-4 bg-orange-100 text-orange-700 hover:bg-orange-200 px-4 py-2 rounded-lg font-bold text-sm transition-colors">Report a Problem</button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {tab === 'track' && (
              <ChallengeJourney pid={trackerPid} />
            )}
          </div>
          
          {/* Right Sidebar */}
          {tab === 'overview' && (
            <div className="w-full lg:w-80 shrink-0 space-y-6">
              {/* Profile Card */}
              <div className="bg-[#138808] text-white rounded-2xl p-6 shadow-lg shadow-green-900/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                    <h3 className="font-extrabold text-lg">Citizen Profile</h3>
                    <div className="text-green-200 text-xs font-semibold uppercase tracking-wider mt-1">Individual Citizen</div>
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl">👤</div>
                </div>
                
                <div className="space-y-3 relative z-10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-green-100">Problems Reported</span>
                    <span className="font-bold text-xl">12</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-green-100">Verified</span>
                    <span className="font-bold text-xl">8</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-green-100">Under Solution</span>
                    <span className="font-bold text-xl">3</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-green-100">Resolved</span>
                    <span className="font-bold text-xl">5</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-green-700/50 flex justify-between items-center text-sm">
                    <span className="text-green-100 font-bold">People Impacted</span>
                    <span className="font-black text-2xl text-green-300">850+</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6">
                <h3 className="font-bold text-black mb-4">Verification Needed</h3>
                <p className="text-sm text-black mb-4 leading-relaxed">
                  Help validate other problems reported in your area to earn Karma points and ensure accurate data.
                </p>
                <div className="border border-blue-100 bg-white p-4 rounded-xl mb-4">
                  <h4 className="font-bold text-black text-sm mb-1">Dengue outbreak in Morabadi</h4>
                  <p className="text-xs text-black mb-3">Reported 2 days ago • 1.2km away</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-white border border-blue-100 text-black text-xs font-bold py-2 rounded-lg hover:bg-green-50 hover:text-green-700 transition-all">Verify 👍</button>
                    <button className="flex-1 bg-white border border-blue-100 text-black text-xs font-bold py-2 rounded-lg hover:bg-orange-50 hover:text-orange-700 transition-all">Reject 👎</button>
                  </div>
                </div>
                <button className="w-full text-center text-xs font-bold text-orange-600 hover:underline">View all nearby reports</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <SidebarLayout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        roleTitle="Citizen & Community Portal" 
        userName={user?.name || 'Citizen'}
      >
        {renderContent()}
      </SidebarLayout>
      <AIChatbot />
    </>
  );
}

