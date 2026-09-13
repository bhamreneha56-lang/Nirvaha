import React, { useState } from 'react';
import SidebarLayout from '../shared/SidebarLayout';
import { LayoutDashboard, Compass, Users, Briefcase, BarChart2, Building, Search, Bell, Target, TrendingUp, Award, Clock, CheckCircle2, ChevronRight, Activity, Zap, FileText } from 'lucide-react';

export default function IndustryDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [collabTab, setCollabTab] = useState('active');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'discover', label: 'Discover', icon: <Compass size={20} /> },
    { id: 'collaborations', label: 'Collaborations', icon: <Users size={20} /> },
    { id: 'opportunities', label: 'Opportunities', icon: <Briefcase size={20} /> },
    { id: 'analytics', label: 'Impact & Analytics', icon: <BarChart2 size={20} /> },
    { id: 'organisation', label: 'Organisation', icon: <Building size={20} /> },
  ];

  const renderDashboard = () => (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-black tracking-tight">Industry & CSR Dashboard</h1>
          <p className="text-sm text-black font-medium">Real-time university project matching and CSR metrics</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
            <input type="text" placeholder="Search projects, CSR, tech..." className="pl-10 pr-4 py-2 border border-blue-100 rounded-lg text-sm focus:outline-none focus:border-orange-500" />
          </div>
          <button className="relative p-2 text-black hover:text-black">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
          </button>
          <div className="flex items-center bg-white border border-blue-100 rounded-lg p-1">
            <button className="px-3 py-1 bg-white text-black text-xs font-bold rounded-md">Official</button>
            <button className="px-3 py-1 text-black hover:text-black text-xs font-bold rounded-md">Admin</button>
          </div>
          <button className="px-3 py-1.5 border border-blue-100 bg-white text-black text-xs font-bold rounded-lg hover:bg-white">EN / HI</button>
        </div>
      </div>

      <div className="bg-white border-2 border-blue-500 rounded-2xl p-8 text-black flex justify-between shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10 max-w-xl">
          <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 font-bold text-[10px] tracking-wider uppercase rounded mb-4 backdrop-blur-sm border border-white/5">Corporate CSR Portal</span>
          <h2 className="text-3xl font-black mb-3 text-black">Good morning, Tata Steel Foundation</h2>
          <p className="text-black text-sm mb-8 leading-relaxed">Discover high-impact university projects and build meaningful collaborations across Jharkhand.</p>
          <div className="flex gap-4">
            <button onClick={() => setActiveTab('discover')} className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold text-sm hover:from-orange-600 hover:to-orange-700 transition shadow-lg shadow-orange-500/20">Explore Projects</button>
            <button onClick={() => setActiveTab('opportunities')} className="px-6 py-2.5 bg-white/10 text-blue-600 border border-blue-200 rounded-lg font-bold text-sm hover:bg-white/20 transition backdrop-blur-sm">Post a Challenge</button>
          </div>
        </div>
        <div className="relative z-10 flex items-center pr-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md text-center flex flex-col items-center justify-center">
            <span className="text-[10px] font-bold text-black uppercase tracking-widest mb-2">Impact Scorecard</span>
            <div className="text-5xl font-black text-black mb-2 tracking-tight">94.8</div>
            <span className="text-xs text-black font-medium">Top 5% CSR Contributor in Jharkhand</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-black mb-4">Platform Impact KPIs</h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-white border border-blue-100 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-black">Active Collaborations</span><Users size={16} className="text-orange-500" /></div>
            <div className="text-2xl font-black text-black mb-2">8</div>
            <div className="flex items-center gap-1 text-[10px] font-bold"><span className="text-green-500 bg-green-50 px-1.5 py-0.5 rounded">+2 this month</span><span className="text-black">Projects in progress</span></div>
          </div>
          <div className="bg-white border border-blue-100 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-black">Funding Committed</span><span className="text-green-500 font-bold">$</span></div>
            <div className="text-2xl font-black text-black mb-2">₹1.45 Cr</div>
            <div className="flex items-center gap-1 text-[10px] font-bold"><span className="text-green-500 bg-green-50 px-1.5 py-0.5 rounded">+18%</span><span className="text-black">Milestone escrow protected</span></div>
          </div>
          <div className="bg-white border border-blue-100 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-black">Projects Supported</span><Building size={16} className="text-blue-500" /></div>
            <div className="text-2xl font-black text-black mb-2">14</div>
            <div className="flex items-center gap-1 text-[10px] font-bold"><span className="text-green-500 bg-green-50 px-1.5 py-0.5 rounded">+4</span><span className="text-black">Across 5 universities</span></div>
          </div>
          <div className="bg-white border border-blue-100 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-black">Mentorship Hours</span><Users size={16} className="text-blue-600" /></div>
            <div className="text-2xl font-black text-black mb-2">240 Hrs</div>
            <div className="flex items-center gap-1 text-[10px] font-bold"><span className="text-green-500 bg-green-50 px-1.5 py-0.5 rounded">+35 hrs</span><span className="text-black">By senior engineers</span></div>
          </div>
          <div className="bg-white border border-blue-100 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-black">CSR Impact</span><Award size={16} className="text-orange-500" /></div>
            <div className="text-2xl font-black text-black mb-2">45,000+</div>
            <div className="flex items-center gap-1 text-[10px] font-bold"><span className="text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">High Impact</span><span className="text-black">Lives directly benefited</span></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDiscover = () => (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold text-black flex items-center gap-2">AI Recommended High-Impact Projects</h2>
          <p className="text-sm text-black">Matched using domain fit, CSR mandate alignment, funding capacity, and geographic target.</p>
        </div>
        <button className="text-sm font-bold text-black hover:text-black">View All Projects →</button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-orange-500 tracking-wider uppercase">ENVIRONMENT & SAFETY</span>
            <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold flex items-center gap-1">94% Match</span>
          </div>
          <h3 className="text-lg font-black text-black mb-2">AI-Poweorange Mine Safety & Hazard Warning System</h3>
          <p className="text-xs text-black font-bold mb-4 flex items-center gap-1">IIT (ISM) Dhanbad • Pilot Stage</p>
          <p className="text-sm text-black mb-6">Underground roof collapsing and gas leakage cause fatal mining accidents. Real-time multi-...</p>
          
          <div className="bg-white rounded-xl p-4 mb-6">
            <h4 className="text-[10px] font-bold text-black uppercase tracking-wider mb-3">WHY AI MATCHED THIS:</h4>
            <ul className="space-y-2 text-xs text-black font-medium">
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" /> Technology expertise matches your Mining AI focus</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" /> CSR interest aligns with Worker Safety & Environment</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" /> Funding capacity is within your ₹50L budget</li>
            </ul>
          </div>
          <div className="flex gap-2 mb-6">
            <span className="px-2 py-1 bg-white text-black rounded text-[10px] font-bold">AI/ML</span>
            <span className="px-2 py-1 bg-white text-black rounded text-[10px] font-bold">IoT</span>
            <span className="px-2 py-1 bg-white text-black rounded text-[10px] font-bold">Computer Vision</span>
          </div>
          <div className="mt-auto border-t border-blue-100 pt-4 flex justify-between items-center mb-4">
            <span className="text-xs text-black font-medium">Funding Goal</span>
            <span className="font-black text-black">₹35,00,000</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="py-2 border border-blue-100 text-black font-bold text-xs rounded-lg hover:bg-white">View Details</button>
            <button className="py-2 border border-orange-500 text-orange-500 font-bold text-xs rounded-lg hover:bg-orange-50">Express Interest</button>
            <button className="py-2 border border-blue-100 text-black font-bold text-xs rounded-lg hover:bg-white">Mentor</button>
            <button className="py-2 bg-orange-500 text-white font-bold text-xs rounded-lg hover:bg-orange-600">Fund Project</button>
          </div>
        </div>

        <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-orange-500 tracking-wider uppercase">RURAL DEVELOPMENT</span>
            <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold flex items-center gap-1">91% Match</span>
          </div>
          <h3 className="text-lg font-black text-black mb-2">Solar Microgrid for Tribal Village Water Purification</h3>
          <p className="text-xs text-black font-bold mb-4 flex items-center gap-1">BIT Mesra, Ranchi • Testing Stage</p>
          <p className="text-sm text-black mb-6">Remote tribal villages in Ranchi district lack clean drinking water and electricity. Fluoride...</p>
          
          <div className="bg-white rounded-xl p-4 mb-6">
            <h4 className="text-[10px] font-bold text-black uppercase tracking-wider mb-3">WHY AI MATCHED THIS:</h4>
            <ul className="space-y-2 text-xs text-black font-medium">
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" /> CSR category matches your Rural Empowerment targets</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" /> Proven field testing in West Singhbhum district</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" /> High social return on investment (SROI 4.2x)</li>
            </ul>
          </div>
          <div className="flex gap-2 mb-6">
            <span className="px-2 py-1 bg-white text-black rounded text-[10px] font-bold">IoT</span>
            <span className="px-2 py-1 bg-white text-black rounded text-[10px] font-bold">CleanTech</span>
            <span className="px-2 py-1 bg-white text-black rounded text-[10px] font-bold">Solar PV</span>
          </div>
          <div className="mt-auto border-t border-blue-100 pt-4 flex justify-between items-center mb-4">
            <span className="text-xs text-black font-medium">Funding Goal</span>
            <span className="font-black text-black">₹22,50,000</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="py-2 border border-blue-100 text-black font-bold text-xs rounded-lg hover:bg-white">View Details</button>
            <button className="py-2 border border-orange-500 text-orange-500 font-bold text-xs rounded-lg hover:bg-orange-50">Express Interest</button>
            <button className="py-2 border border-blue-100 text-black font-bold text-xs rounded-lg hover:bg-white">Mentor</button>
            <button className="py-2 bg-orange-500 text-white font-bold text-xs rounded-lg hover:bg-orange-600">Fund Project</button>
          </div>
        </div>

        <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-orange-500 tracking-wider uppercase">AGRICULTURE & LIVELIHOOD</span>
            <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold flex items-center gap-1">88% Match</span>
          </div>
          <h3 className="text-lg font-black text-black mb-2">Smart Drone Sprayer for Precision Paddy Agriculture</h3>
          <p className="text-xs text-black font-bold mb-4 flex items-center gap-1">Birsa Agricultural University, Kanke • Prototype</p>
          <p className="text-sm text-black mb-6">Pest infestation destroys up to 35% of paddy crops in Jharkhand. Manual spraying is labor intensive...</p>
          
          <div className="bg-white rounded-xl p-4 mb-6">
            <h4 className="text-[10px] font-bold text-black uppercase tracking-wider mb-3">WHY AI MATCHED THIS:</h4>
            <ul className="space-y-2 text-xs text-black font-medium">
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" /> Agritech innovation supported by Govt. of Jharkhand</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" /> Directly reduces chemical exposure for small farmers</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" /> Low cost deployment model</li>
            </ul>
          </div>
          <div className="flex gap-2 mb-6">
            <span className="px-2 py-1 bg-white text-black rounded text-[10px] font-bold">Drones</span>
            <span className="px-2 py-1 bg-white text-black rounded text-[10px] font-bold">AI/ML</span>
            <span className="px-2 py-1 bg-white text-black rounded text-[10px] font-bold">Hardware</span>
          </div>
          <div className="mt-auto border-t border-blue-100 pt-4 flex justify-between items-center mb-4">
            <span className="text-xs text-black font-medium">Funding Goal</span>
            <span className="font-black text-black">₹18,00,000</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="py-2 border border-blue-100 text-black font-bold text-xs rounded-lg hover:bg-white">View Details</button>
            <button className="py-2 border border-orange-500 text-orange-500 font-bold text-xs rounded-lg hover:bg-orange-50">Express Interest</button>
            <button className="py-2 border border-blue-100 text-black font-bold text-xs rounded-lg hover:bg-white">Mentor</button>
            <button className="py-2 bg-orange-500 text-white font-bold text-xs rounded-lg hover:bg-orange-600">Fund Project</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCollaborations = () => (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-black tracking-tight">Active Collaborations & Escrow</h1>
          <p className="text-sm text-black font-medium">Track milestone progression, fund releases, and project communication</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-blue-100 shadow-sm min-h-[600px]">
        <h2 className="text-xl font-bold text-black mb-2">Active Collaborations & Project Monitoring</h2>
        <p className="text-sm text-black mb-6">Track real-time progress, escrow funding release, support cards, and multi-stakeholder chat.</p>
        
        <div className="flex border-b border-blue-100 mb-8">
          <button onClick={() => setCollabTab('active')} className={`px-6 py-3 font-bold text-sm border-b-2 transition ${collabTab === 'active' ? 'border-orange-500 text-orange-500' : 'border-transparent text-black hover:text-black'}`}>Active Projects (2)</button>
          <button onClick={() => setCollabTab('milestone')} className={`px-6 py-3 font-bold text-sm border-b-2 transition ${collabTab === 'milestone' ? 'border-orange-500 text-orange-500' : 'border-transparent text-black hover:text-black'}`}>Milestone Progression</button>
          <button className="px-6 py-3 font-bold text-sm border-b-2 border-transparent text-black hover:text-black">Escrow Funding & Release</button>
          <button className="px-6 py-3 font-bold text-sm border-b-2 border-transparent text-black hover:text-black">Support Programs</button>
          <button className="px-6 py-3 font-bold text-sm border-b-2 border-transparent text-black hover:text-black">Project Communication</button>
        </div>

        {collabTab === 'active' ? (
          <div className="grid grid-cols-2 gap-6">
            <div className="border border-blue-100 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold border border-green-100 flex items-center gap-1"><CheckCircle2 size={12}/> Health: Good</span>
                <span className="text-[10px] font-bold text-black uppercase tracking-wider">Stage: Pilot Stage</span>
              </div>
              <h3 className="text-xl font-black text-black mb-1">AI Mine Safety & Hazard Warning System</h3>
              <p className="text-sm text-black mb-6">IIT (ISM) Dhanbad</p>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-black">Overall Progress</span>
                  <span className="text-xs font-black text-black">75%</span>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full w-3/4"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-white rounded-xl">
                <div>
                  <div className="text-[10px] font-bold text-black uppercase tracking-wider mb-1">Committed Grant</div>
                  <div className="font-black text-black">₹35,00,000</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-black uppercase tracking-wider mb-1">Next Milestone Deadline</div>
                  <div className="font-black text-orange-600">25 Sep 2026</div>
                </div>
              </div>
              <button onClick={() => setCollabTab('milestone')} className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-sm transition">Manage Milestones & Escrow</button>
            </div>

            <div className="border border-blue-100 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold border border-green-100 flex items-center gap-1"><CheckCircle2 size={12}/> Health: On Track</span>
                <span className="text-[10px] font-bold text-black uppercase tracking-wider">Stage: Testing Stage</span>
              </div>
              <h3 className="text-xl font-black text-black mb-1">Solar Microgrid for Tribal Villages</h3>
              <p className="text-sm text-black mb-6">BIT Mesra, Ranchi</p>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-black">Overall Progress</span>
                  <span className="text-xs font-black text-black">40%</span>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full w-[40%]"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-white rounded-xl">
                <div>
                  <div className="text-[10px] font-bold text-black uppercase tracking-wider mb-1">Committed Grant</div>
                  <div className="font-black text-black">₹22,50,000</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-black uppercase tracking-wider mb-1">Next Milestone Deadline</div>
                  <div className="font-black text-orange-600">10 Oct 2026</div>
                </div>
              </div>
              <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-sm transition">Manage Milestones & Escrow</button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 border border-blue-100">
             <div className="mb-10">
               <span className="text-[10px] font-bold text-orange-500 tracking-wider uppercase mb-1 block">SELECTED COLLABORATION</span>
               <h3 className="text-xl font-black text-black">AI Mine Safety & Hazard Warning System</h3>
               <p className="text-sm text-black">IIT (ISM) Dhanbad</p>
             </div>

             <div className="relative flex justify-between mb-16">
                <div className="absolute top-6 left-12 right-12 h-1 bg-white -z-10"></div>
                <div className="absolute top-6 left-12 w-1/2 h-1 bg-green-500 -z-10"></div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-green-50 border-2 border-green-500 flex items-center justify-center text-green-500 mb-3 shadow-sm"><CheckCircle2 size={24}/></div>
                  <span className="font-bold text-sm text-black">Prototype Hardware</span>
                  <span className="text-xs font-bold text-black">₹10,00,000</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-green-500 flex items-center justify-center text-green-500 mb-3 shadow-sm relative">
                    <div className="w-8 h-8 rounded-full border border-green-500/50 flex items-center justify-center"><CheckCircle2 size={20}/></div>
                  </div>
                  <span className="font-bold text-sm text-black">Lab Simulation & Testing</span>
                  <span className="text-xs font-bold text-black">₹15,00,000</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-orange-50 border-2 border-orange-500 flex items-center justify-center text-orange-500 font-black mb-3 shadow-sm">3</div>
                  <span className="font-bold text-sm text-orange-500">Field Pilot Deployment</span>
                  <span className="text-xs font-bold text-black">₹10,00,000</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-100 flex items-center justify-center text-black font-black mb-3 shadow-sm">4</div>
                  <span className="font-bold text-sm text-black">Final Safety Certification</span>
                  <span className="text-xs font-bold text-black">₹5,00,000</span>
                </div>
             </div>

             <div className="flex gap-6">
                <div className="flex-1 bg-white border border-blue-100 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-black text-lg text-black">Prototype Hardware <span className="text-sm font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded ml-2">Approved</span></h4>
                  </div>
                  <p className="text-sm text-black mb-4">IoT sensor mesh fabricated & bench tested.</p>
                  <div className="flex justify-between items-center text-xs font-bold text-black">
                    <span>Completion Progress</span>
                    <span>100%</span>
                  </div>
                </div>
                <div className="flex-1 bg-green-50 border border-green-200 rounded-xl p-6 flex items-start gap-4">
                   <div className="bg-white rounded-full p-2 text-green-500 shadow-sm shrink-0"><CheckCircle2 size={24}/></div>
                   <div>
                     <div className="text-xs font-bold text-green-600 mb-1">Milestone "Field Pilot Deployment"</div>
                     <div className="text-sm font-bold text-black leading-relaxed">APPROVED! Escrow release of ₹10,00,000 initiated to university account.</div>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderOpportunities = () => (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex border-b border-blue-100 mb-2">
        <button className="px-6 py-3 font-bold text-sm border-b-2 border-orange-500 text-orange-500">Micro-Expert Help Desk (4)</button>
        <button className="px-6 py-3 font-bold text-sm border-b-2 border-transparent text-black">Startup Launchpad (2)</button>
        <button className="px-6 py-3 font-bold text-sm border-b-2 border-transparent text-black">Investor Pitch Days (2)</button>
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex justify-between items-center">
         <div>
           <h2 className="text-lg font-black text-black mb-1">Earn Honorarium & Contribute Senior Technical Guidance</h2>
           <p className="text-sm text-black">Short 2-5 hour reviews requested by university research groups across Jharkhand.</p>
         </div>
         <span className="font-bold text-orange-500 bg-white px-4 py-2 rounded-lg shadow-sm border border-orange-100">Micro-Mentorship</span>
      </div>

      <div className="grid grid-cols-3 gap-6">
         <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Architecture Review</span>
              <span className="text-xs text-black font-semibold flex items-center gap-1"><Clock size={12}/> 3 Hours</span>
            </div>
            <h4 className="font-bold text-black mb-2 leading-tight">High-Throughput IoT Telemetry Architecture Audit</h4>
            <p className="text-xs text-black mb-4 line-clamp-2">Review MQTT message broker scaling architecture for 50,000 active mine sensors.</p>
            <div className="text-xs text-black mb-6 flex gap-2">
               <span className="font-bold text-black">Requiorange Tech:</span> 
               <span className="bg-white px-1.5 py-0.5 rounded font-semibold">Cloud / MQTT / Kafka</span>
            </div>
            <div className="mt-auto flex justify-between items-center pt-4 border-t border-blue-100">
              <div>
                <div className="text-[10px] text-black font-bold uppercase">Expert Honorarium</div>
                <div className="font-black text-green-600">₹15,000</div>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-xs transition shadow-sm">Accept Task</button>
            </div>
         </div>

         <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-blue-600 bg-blue-200 px-2 py-1 rounded">ML Model Review</span>
              <span className="text-xs text-black font-semibold flex items-center gap-1"><Clock size={12}/> 4 Hours</span>
            </div>
            <h4 className="font-bold text-black mb-2 leading-tight">Paddy Leaf Blight Convolutional Neural Network Code Audit</h4>
            <p className="text-xs text-black mb-4 line-clamp-2">Evaluate PyTorch model precision, recall, and quantization for edge deployment on agricultural drones.</p>
            <div className="text-xs text-black mb-6 flex gap-2">
               <span className="font-bold text-black">Requiorange Tech:</span> 
               <span className="bg-white px-1.5 py-0.5 rounded font-semibold">PyTorch / Edge AI</span>
            </div>
            <div className="mt-auto flex justify-between items-center pt-4 border-t border-blue-100">
              <div>
                <div className="text-[10px] text-black font-bold uppercase">Expert Honorarium</div>
                <div className="font-black text-green-600">₹20,000</div>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-xs transition shadow-sm">Accept Task</button>
            </div>
         </div>

         <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">UI/UX Review</span>
              <span className="text-xs text-black font-semibold flex items-center gap-1"><Clock size={12}/> 2 Hours</span>
            </div>
            <h4 className="font-bold text-black mb-2 leading-tight">Tribal Solar Water ATM Kiosk Touchscreen UX Review</h4>
            <p className="text-xs text-black mb-4 line-clamp-2">Audit multilingual UI accessibility for rural villagers with low literacy rates.</p>
            <div className="text-xs text-black mb-6 flex gap-2">
               <span className="font-bold text-black">Requiorange Tech:</span> 
               <span className="bg-white px-1.5 py-0.5 rounded font-semibold">UI/UX / Accessibility</span>
            </div>
            <div className="mt-auto flex justify-between items-center pt-4 border-t border-blue-100">
              <div>
                <div className="text-[10px] text-black font-bold uppercase">Expert Honorarium</div>
                <div className="font-black text-green-600">₹12,000</div>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-xs transition shadow-sm">Accept Task</button>
            </div>
         </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="flex flex-col gap-6 p-4">
      <div className="mb-2">
        <h1 className="text-2xl font-black text-black tracking-tight">CSR Impact, Compliance & Analytics</h1>
        <p className="text-sm text-black font-medium">Audit CSR investments, verify digital certificates, track SDG alignment, and view state leaderboards.</p>
      </div>
      
      <div className="flex border-b border-blue-100 mb-4">
        <button className="px-6 py-3 font-bold text-sm border-b-2 border-orange-500 text-orange-500">Analytics & Insights</button>
        <button className="px-6 py-3 font-bold text-sm border-b-2 border-transparent text-black">Verified CSR Certificates (2)</button>
        <button className="px-6 py-3 font-bold text-sm border-b-2 border-transparent text-black">Social Impact & Leaderboard</button>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-2">
        <div className="bg-white border border-blue-100 rounded-xl p-5">
          <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-black">Funding Committed</span><span className="text-green-500 font-bold bg-green-50 px-1 rounded">$</span></div>
          <div className="text-2xl font-black text-black mb-2">₹1.45 Cr</div>
          <span className="text-[10px] font-bold text-black">+18% YoY</span>
        </div>
        <div className="bg-white border border-blue-100 rounded-xl p-5">
          <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-black">Projects Supported</span><Building size={16} className="text-blue-600 bg-blue-500 px-1 rounded" /></div>
          <div className="text-2xl font-black text-black mb-2">14</div>
          <span className="text-[10px] font-bold text-black">5 Universities</span>
        </div>
        <div className="bg-white border border-blue-100 rounded-xl p-5">
          <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-black">Mentorship Hours</span><Users size={16} className="text-blue-600 bg-blue-200 px-1 rounded" /></div>
          <div className="text-2xl font-black text-black mb-2">240 Hrs</div>
          <span className="text-[10px] font-bold text-black">32 Engineers</span>
        </div>
        <div className="bg-white border border-blue-100 rounded-xl p-5">
          <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-black">Deployments</span><CheckCircle2 size={16} className="text-orange-500 bg-orange-50 px-1 rounded" /></div>
          <div className="text-2xl font-black text-black mb-2">6 Pits/Sites</div>
          <span className="text-[10px] font-bold text-black">Field Active</span>
        </div>
        <div className="bg-white border border-blue-100 rounded-xl p-5">
          <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-black">Impact Score</span><Award size={16} className="text-orange-500 bg-orange-50 px-1 rounded" /></div>
          <div className="text-2xl font-black text-black mb-2">94.8 / 100</div>
          <span className="text-[10px] font-bold text-black">Top 5% in State</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
         <div className="bg-white border border-blue-100 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold text-black">Funding Disbursed Over Time</h3>
                <p className="text-xs text-black">Quarterly CSR Escrow Payouts (2025 - 2026)</p>
              </div>
              <span className="text-xs font-bold text-green-500">+24% Growth</span>
            </div>
            <div className="flex items-end gap-4 h-48 mt-4 pt-4 border-t border-blue-100">
               <div className="flex flex-col items-center flex-1"><span className="text-xs font-bold mb-1">₹20L</span><div className="w-full bg-blue-600 rounded-t-sm h-[20%]"></div><span className="text-xs mt-2">Q1 2025</span></div>
               <div className="flex flex-col items-center flex-1"><span className="text-xs font-bold mb-1">₹35L</span><div className="w-full bg-blue-600 rounded-t-sm h-[35%]"></div><span className="text-xs mt-2">Q2 2025</span></div>
               <div className="flex flex-col items-center flex-1"><span className="text-xs font-bold mb-1">₹50L</span><div className="w-full bg-blue-600 rounded-t-sm h-[50%]"></div><span className="text-xs mt-2">Q3 2025</span></div>
               <div className="flex flex-col items-center flex-1"><span className="text-xs font-bold mb-1">₹75L</span><div className="w-full bg-blue-600 rounded-t-sm h-[75%]"></div><span className="text-xs mt-2">Q4 2025</span></div>
               <div className="flex flex-col items-center flex-1"><span className="text-xs font-bold mb-1">₹1.1Cr</span><div className="w-full bg-blue-600 rounded-t-sm h-[90%]"></div><span className="text-xs mt-2">Q1 2026</span></div>
               <div className="flex flex-col items-center flex-1"><span className="text-xs font-bold mb-1">₹1.45Cr</span><div className="w-full bg-orange-600 rounded-t-sm h-[100%]"></div><span className="text-xs mt-2">Q2 2026</span></div>
            </div>
         </div>
         <div className="bg-white border border-blue-100 rounded-2xl p-6">
            <h3 className="font-bold text-black">Projects by Industry Sector</h3>
            <p className="text-xs text-black mb-6">Domain distribution</p>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-bold text-black mb-2"><span>Mining & Heavy Industry</span><span>6 Projects (40%)</span></div>
                <div className="h-2 bg-white rounded-full overflow-hidden"><div className="h-full bg-orange-500 w-[40%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold text-black mb-2"><span>Rural Development & Clean Water</span><span>4 Projects (25%)</span></div>
                <div className="h-2 bg-white rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[25%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold text-black mb-2"><span>Agritech & Precision Farming</span><span>3 Projects (20%)</span></div>
                <div className="h-2 bg-white rounded-full overflow-hidden"><div className="h-full bg-green-500 w-[20%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold text-black mb-2"><span>Fintech & Blockchain Governance</span><span>1 Project (15%)</span></div>
                <div className="h-2 bg-white rounded-full overflow-hidden"><div className="h-full bg-blue-200 w-[15%]"></div></div>
              </div>
            </div>
         </div>
      </div>
    </div>
  );

  const renderOrganisation = () => (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm flex flex-col min-h-[calc(100vh-160px)] p-8 m-4">
       <div className="flex justify-between items-start mb-8 pb-8 border-b border-blue-100">
          <div>
            <h2 className="text-3xl font-black text-black tracking-tight">Tata Steel Foundation</h2>
            <p className="text-black font-medium mt-1">Corporate Social Responsibility Partner</p>
          </div>
          <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm flex items-center gap-2">Verified CSR Partner <CheckCircle2 size={16}/></span>
       </div>
       <div className="grid grid-cols-3 gap-12">
          <div className="col-span-2">
             <h3 className="font-bold text-black mb-2">About Organisation</h3>
             <p className="text-black leading-relaxed mb-6">Tata Steel Foundation is the CSR arm of Tata Steel, committed to sustainable development and inclusive growth across Jharkhand. We actively collaborate with technical universities to fund and mentor high-impact solutions in mining safety, rural electrification, and water resource management.</p>
             <h3 className="font-bold text-black mb-4">CSR Focus Areas</h3>
             <div className="flex flex-wrap gap-2">
               <span className="bg-white text-black px-3 py-1 rounded font-semibold text-sm">Mining Safety & IoT</span>
               <span className="bg-white text-black px-3 py-1 rounded font-semibold text-sm">Rural Development</span>
               <span className="bg-white text-black px-3 py-1 rounded font-semibold text-sm">Clean Water Tech</span>
               <span className="bg-white text-black px-3 py-1 rounded font-semibold text-sm">Skill Development</span>
             </div>
          </div>
          <div>
             <div className="bg-white p-6 rounded-xl border border-blue-100">
                <h4 className="font-bold text-black mb-4">Contact & Admin</h4>
                <div className="space-y-4 text-sm">
                  <div><div className="text-black font-medium text-xs mb-1">Primary CSR Head</div><div className="font-bold text-black">Dr. Soumitra Singh</div></div>
                  <div><div className="text-black font-medium text-xs mb-1">Email</div><div className="font-bold text-black">csr@tatasteelfoundation.org</div></div>
                  <div><div className="text-black font-medium text-xs mb-1">Registration</div><div className="font-bold text-black">CSR-2019-JH-9982</div></div>
                  <div><div className="text-black font-medium text-xs mb-1">Annual CSR Budget</div><div className="font-bold text-black">₹12.5 Cr</div></div>
                </div>
                <button className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-600 transition">Edit Profile</button>
             </div>
          </div>
       </div>
    </div>
  );

  const renderContent = () => {
    if (activeTab === 'dashboard') return renderDashboard();
    if (activeTab === 'discover') return renderDiscover();
    if (activeTab === 'collaborations') return renderCollaborations();
    if (activeTab === 'opportunities') return renderOpportunities();
    if (activeTab === 'analytics') return renderAnalytics();
    if (activeTab === 'organisation') return renderOrganisation();
    return renderDashboard();
  };

  return (
    <SidebarLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      roleTitle="Official"
      userName="Tata Steel Foundation"
      tabs={tabs}
    >
      {renderContent()}
    </SidebarLayout>
  );
}
