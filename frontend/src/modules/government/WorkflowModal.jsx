import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimulation } from '../../context/SimulationContext';
import { X, ShieldAlert, CheckCircle2, Send, AlertTriangle } from 'lucide-react';

export default function WorkflowModal() {
  const { state, dispatch } = useSimulation();
  const { activeWorkflow } = state;

  const [formData, setFormData] = useState({
    decision: 'verified',
    remarks: '',
    officerId: '',
    responseExpected: '72 hours',
    newPriority: 99,
    reason: ''
  });

  if (!activeWorkflow) return null;

  const handleClose = () => {
    dispatch({ type: 'CANCEL_WORKFLOW' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeWorkflow.action === 'VERIFY_EVIDENCE') {
      dispatch({ 
        type: 'VERIFY_EVIDENCE', 
        payload: { id: activeWorkflow.problemId, decision: formData.decision, remarks: formData.remarks } 
      });
    } else if (activeWorkflow.action === 'ASSIGN_OFFICER') {
      dispatch({ 
        type: 'ASSIGN_OFFICER', 
        payload: { problemId: activeWorkflow.problemId, officerId: formData.officerId || state.officers[0].id, responseExpected: formData.responseExpected } 
      });
    } else if (activeWorkflow.action === 'OVERRIDE_AI') {
      dispatch({ 
        type: 'OVERRIDE_AI', 
        payload: { id: activeWorkflow.problemId, newPriority: formData.newPriority, reason: formData.reason } 
      });
    } else if (activeWorkflow.action === 'CREATE_MASTER_CHALLENGE') {
      dispatch({
        type: 'CREATE_MASTER_CHALLENGE',
        payload: { 
          clusterId: activeWorkflow.clusterId, 
          title: formData.challengeTitle || 'Illegal Dumping at Market', 
          location: formData.challengeLocation || 'Main Market Area',
          reportCount: 18
        }
      });
    } else if (activeWorkflow.action === 'INVITE_UNIVERSITY') {
      dispatch({
        type: 'INVITE_UNIVERSITY',
        payload: { challengeId: activeWorkflow.challengeId }
      });
    }
  };

  const renderContent = () => {
    switch (activeWorkflow.action) {
      case 'VERIFY_EVIDENCE':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Decision</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.decision}
                onChange={e => setFormData({...formData, decision: e.target.value})}
              >
                <option value="verified">Evidence Verified (Proceed to Routing)</option>
                <option value="more_info">Request More Information</option>
                <option value="reject">Reject (Invalid / Hoax)</option>
                <option value="duplicate">Mark as Duplicate</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Verification Remarks (Required)</label>
              <textarea 
                required
                rows={3}
                placeholder="Enter justification for this decision..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.remarks}
                onChange={e => setFormData({...formData, remarks: e.target.value})}
              />
            </div>
          </div>
        );
      
      case 'ASSIGN_OFFICER':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Select Officer</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.officerId}
                onChange={e => setFormData({...formData, officerId: e.target.value})}
                required
              >
                <option value="">-- Select an Officer --</option>
                {state.officers.map(o => (
                  <option key={o.id} value={o.id}>{o.name} (Load: {o.workload}%)</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">SLA / Expected Response Time</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.responseExpected}
                onChange={e => setFormData({...formData, responseExpected: e.target.value})}
              >
                <option value="24 hours">24 Hours (Emergency)</option>
                <option value="72 hours">72 Hours (Standard)</option>
                <option value="7 days">7 Days (Routine)</option>
              </select>
            </div>
          </div>
        );

      case 'OVERRIDE_AI':
        return (
          <div className="space-y-4">
            <div className="bg-orange-50 text-orange-800 p-3 rounded-lg text-xs font-medium border border-orange-200 flex gap-2">
              <AlertTriangle size={16} className="shrink-0" />
              You are overriding an AI-generated priority score. This action will be audited.
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">New Priority Score (1-100)</label>
              <input 
                type="number"
                min="1" max="100"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.newPriority}
                onChange={e => setFormData({...formData, newPriority: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Reason for Override (Required)</label>
              <textarea 
                required
                rows={3}
                placeholder="Why is the AI prediction incorrect?"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.reason}
                onChange={e => setFormData({...formData, reason: e.target.value})}
              />
            </div>
          </div>
        );

      case 'CREATE_MASTER_CHALLENGE':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-xs font-medium border border-blue-200">
              You are about to merge multiple verified citizen reports into a single Master Challenge. 
              This will open the problem for University and Industry solutions.
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Challenge Title</label>
              <input 
                type="text"
                required
                defaultValue="Illegal Dumping at Market"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Affected Location</label>
              <input 
                type="text"
                required
                defaultValue="Main Market Area"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'INVITE_UNIVERSITY':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Select Institution</label>
              <select 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select Partner --</option>
                <option value="BIT_MESRA">BIT Mesra (93% Match - IoT/Water)</option>
                <option value="NIT_JAMSHEDPUR">NIT Jamshedpur (87% Match - Water Quality)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Response Deadline</label>
              <input 
                type="date"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );
      
      case 'START_AI_ANALYSIS':
        return (
          <div className="space-y-4">
            <div className="bg-purple-50 text-purple-800 p-3 rounded-lg text-xs font-medium border border-purple-200">
              The AI Engine will analyze evidence, score priority, and check for duplicates.
            </div>
          </div>
        );

      case 'REJECT_CASE':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Reason for Rejection (Required)</label>
              <textarea 
                required
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.reason}
                onChange={e => setFormData({...formData, reason: e.target.value})}
              />
            </div>
          </div>
        );

      case 'ESCALATE_CASE':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Escalation Reason (Required)</label>
              <textarea 
                required
                rows={3}
                placeholder="Why is this case being escalated?"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={formData.reason}
                onChange={e => setFormData({...formData, reason: e.target.value})}
              />
            </div>
          </div>
        );

      case 'START_INSPECTION':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-xs font-medium border border-blue-200">
              Marking this case as under active field inspection.
            </div>
          </div>
        );

      case 'SUBMIT_RESOLUTION':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Resolution Remarks (Required)</label>
              <textarea 
                required
                rows={3}
                placeholder="Describe the actions taken to resolve this issue."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.remarks}
                onChange={e => setFormData({...formData, remarks: e.target.value})}
              />
            </div>
          </div>
        );
      
      default:
        return <div>Unknown workflow.</div>;
    }
  };

  const titles = {
    'VERIFY_EVIDENCE': 'Verify Problem Evidence',
    'ASSIGN_OFFICER': 'Assign Field Officer',
    'OVERRIDE_AI': 'Manual AI Override',
    'CREATE_MASTER_CHALLENGE': 'Create Master Challenge',
    'INVITE_UNIVERSITY': 'Invite University Partner',
    'START_AI_ANALYSIS': 'Initialize AI Engine',
    'REJECT_CASE': 'Reject Problem Case',
    'ESCALATE_CASE': 'Escalate Case',
    'START_INSPECTION': 'Begin Field Inspection',
    'SUBMIT_RESOLUTION': 'Submit Final Resolution'
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
        >
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center text-slate-900">
            <h3 className="font-serif font-black tracking-wide text-lg flex items-center gap-2">
              <ShieldAlert size={20} className="text-blue-600" />
              {titles[activeWorkflow.action] || 'Workflow Action'}
            </h3>
            <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 pb-2 border-b border-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> 
              Target: {activeWorkflow.problemId}
            </div>
            
            {renderContent()}

            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button 
                type="button" 
                onClick={handleClose}
                className="px-5 py-2.5 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md transition-colors flex items-center gap-2"
              >
                <CheckCircle2 size={16} /> Confirm & Execute
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
