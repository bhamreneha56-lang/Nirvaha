import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, AlertTriangle, ShieldAlert, CheckCircle2, Building2, UserCircle, Activity } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export default function CaseDrawer() {
  const { state, dispatch } = useSimulation();
  const { activeDrawerCaseId, problems } = state;

  // Use the requested problem or fallback to the first one for the prototype
  const caseData = problems.find(p => p.id === activeDrawerCaseId) || problems[0];

  const handleClose = () => {
    dispatch({ type: 'CLOSE_CASE_DRAWER' });
  };

  const startWorkflow = (actionName) => {
    dispatch({ type: 'START_WORKFLOW', payload: { action: actionName, problemId: caseData.id } });
  };

  return (
    <AnimatePresence>
      {activeDrawerCaseId && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-blue-600/40 backdrop-blur-sm z-[90]"
            onClick={handleClose}
          />
          <motion.div 
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[100] flex flex-col border-l border-blue-100"
          >
            {/* Header */}
            <div className="bg-white border-b border-blue-100 text-black p-5 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black text-black uppercase tracking-widest">{caseData.id}</span>
                  {caseData.severity === 'Critical' && (
                    <span className="bg-orange-100 text-orange-700 border border-orange-200 px-2 py-0.5 rounded text-[10px] font-black uppercase flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div> Critical
                    </span>
                  )}
                </div>
                <h2 className="font-serif text-xl font-bold tracking-tight text-black">{caseData.title}</h2>
                <div className="flex items-center gap-4 mt-2 text-xs font-medium text-black">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {caseData.location}</span>
                  <span className="flex items-center gap-1"><Building2 size={12} /> {caseData.category}</span>
                </div>
              </div>
              <button onClick={handleClose} className="text-black hover:text-black transition-colors bg-white border border-blue-100 hover:bg-white p-1.5 rounded shadow-sm">
                <X size={18} />
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-blue-100 bg-white">
              <div className="p-3 text-center">
                <div className="text-[9px] font-black uppercase tracking-widest text-black mb-0.5">Priority</div>
                <div className="text-lg font-black text-orange-600">{caseData.priorityScore}<span className="text-[10px]">/100</span></div>
              </div>
              <div className="p-3 text-center">
                <div className="text-[9px] font-black uppercase tracking-widest text-black mb-0.5">Reports</div>
                <div className="text-lg font-black text-black">{caseData.reportsCount}</div>
              </div>
              <div className="p-3 text-center">
                <div className="text-[9px] font-black uppercase tracking-widest text-black mb-0.5">SLA Risk</div>
                <div className="text-lg font-black text-orange-600">81%</div>
              </div>
            </div>

            {/* Content Scrollable */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              <div className="space-y-4">
                <h4 className="text-xs font-black text-black uppercase tracking-widest border-b border-blue-100 pb-1">Current Status</h4>
                <div className="flex items-center justify-between bg-blue-50 border border-blue-100 p-3 rounded-lg">
                  <div className="font-bold text-blue-900">{caseData.status.replace(/_/g, ' ')}</div>
                  {caseData.assignedOfficer ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-black bg-white px-2 py-1 rounded shadow-sm">
                      <UserCircle size={14} className="text-blue-500" /> {caseData.assignedOfficer}
                    </div>
                  ) : (
                    <div className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded uppercase">Unassigned</div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black text-black uppercase tracking-widest border-b border-blue-100 pb-1 flex items-center justify-between">
                  Activity Timeline
                  <Activity size={14} className="text-black"/>
                </h4>
                <div className="relative pl-4 space-y-4 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white">
                  {(caseData.timeline || []).map((event, i) => (
                    <div key={i} className="relative z-10 flex flex-col">
                      <div className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full border-2 border-white bg-blue-500 shadow-sm"></div>
                      <span className="text-[10px] font-bold text-black uppercase tracking-wider">{event.time}</span>
                      <span className="text-sm font-bold text-black">{event.state}</span>
                    </div>
                  ))}
                  <div className="relative z-10 flex flex-col opacity-50">
                    <div className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full border-2 border-blue-100 bg-white"></div>
                    <span className="text-[10px] font-bold text-black uppercase tracking-wider">PENDING NEXT</span>
                    <span className="text-sm font-bold text-black">{caseData.status === 'NEW' ? 'Field Verification' : 'Resolution'}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Sticky Action Footer */}
            <div className="p-4 bg-white border-t border-blue-100 space-y-2">
              <div className="text-[10px] font-black text-black uppercase tracking-widest text-center mb-2">Requiorange Actions</div>
              
              {caseData.status === 'NEW' && (
                <div className="grid grid-cols-1 gap-2">
                  <button onClick={() => startWorkflow('START_AI_ANALYSIS')} className="w-full bg-blue-200 hover:bg-blue-200 text-white font-bold text-xs py-2.5 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2">
                    Start AI Analysis
                  </button>
                </div>
              )}

              {caseData.status === 'VERIFICATION_PENDING' && (
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => startWorkflow('VERIFY_EVIDENCE')} className="w-full bg-blue-600 hover:bg-blue-600 text-white font-bold text-xs py-2.5 rounded-lg shadow-sm transition-all">
                    Verify Problem
                  </button>
                  <button onClick={() => startWorkflow('REJECT_CASE')} className="w-full bg-white border border-orange-200 text-orange-600 hover:bg-orange-50 font-bold text-xs py-2.5 rounded-lg transition-all">
                    Reject Case
                  </button>
                </div>
              )}

              {caseData.status === 'VERIFIED' && (
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => startWorkflow('ASSIGN_OFFICER')} className="w-full bg-blue-600 hover:bg-blue-600 text-white font-bold text-xs py-2.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-1">
                    <UserCircle size={14} /> Assign Officer
                  </button>
                  <button onClick={() => startWorkflow('CREATE_MASTER_CHALLENGE')} className="w-full bg-blue-200 text-blue-600 border border-blue-300 hover:bg-blue-200 font-bold text-xs py-2.5 rounded-lg transition-all">
                    Create Challenge
                  </button>
                </div>
              )}

              {caseData.status === 'ASSIGNED' && (
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => startWorkflow('START_INSPECTION')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-lg shadow-sm transition-all">
                    Start Inspection
                  </button>
                  <button onClick={() => startWorkflow('ESCALATE_CASE')} className="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 font-bold text-xs py-2.5 rounded-lg transition-all">
                    Escalate Case
                  </button>
                </div>
              )}
              
              {caseData.status === 'IN_PROGRESS' && (
                <div className="grid grid-cols-1 gap-2">
                  <button onClick={() => startWorkflow('SUBMIT_RESOLUTION')} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xs py-2.5 rounded-lg shadow-sm transition-all">
                    Submit Resolution
                  </button>
                </div>
              )}

              <button 
                  onClick={() => startWorkflow('OVERRIDE_AI')} 
                  className="w-full mt-2 bg-white hover:bg-white text-black font-bold text-xs py-2 rounded-lg transition-all"
              >
                Manual Override / Edit
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
