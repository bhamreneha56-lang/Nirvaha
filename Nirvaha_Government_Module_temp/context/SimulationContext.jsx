import React, { createContext, useReducer, useContext } from 'react';
import {
  JHARKHAND_DISTRICTS,
  DISTRICTS,
  CATEGORIES,
  DEPARTMENTS,
  OFFICERS,
  UNIVERSITIES,
  INDUSTRIES,
  SEED_PROBLEMS,
  SEED_CLUSTERS,
  SEED_CHALLENGES,
  SEED_PROJECTS,
  SEED_RISKS,
  SEED_PREVENTIVE_ORDERS,
  SEED_KNOWLEDGE_RECORDS,
  SEED_AUDIT_LOGS,
  SEED_NOTIFICATIONS,
  INITIAL_STATS
} from '../data/seedData';

export const SimulationContext = createContext(null);

const initialState = {
  // 1. Authentication, Roles & RBAC (null = Landing page)
  role: null,
  currentUser: {
    id: 'USR-001',
    name: 'Secretary, IT & Governance',
    email: 'secretary.gov@jharkhand.gov.in',
    designation: 'State Operations Lead',
    role: 'government',
    department: 'All Departments',
    jurisdiction: 'Jharkhand (State)',
    phone: '+91 94311 00001'
  },
  currentUniversity: 'u1',
  currentIndustry: 'i1',
  view: 'landing',
  viewParams: {},
  language: 'en',
  citizenPoints: 350,
  studentCredits: 12,

  // 2. Core Entities Hydrated from Comprehensive Seed Data
  problems: SEED_PROBLEMS,
  clusters: SEED_CLUSTERS,
  challenges: SEED_CHALLENGES,
  projects: SEED_PROJECTS,
  knowledgeRecords: SEED_KNOWLEDGE_RECORDS,
  risks: SEED_RISKS,
  preventiveOrders: SEED_PREVENTIVE_ORDERS,
  officers: OFFICERS,
  departments: DEPARTMENTS,
  universities: UNIVERSITIES,
  industries: INDUSTRIES,
  districts: JHARKHAND_DISTRICTS,

  // 3. Live Audit Ledger & Multi-Role Notification Center
  auditLogs: SEED_AUDIT_LOGS,
  notifications: SEED_NOTIFICATIONS,

  // 4. Executive Telemetry Stats
  stats: INITIAL_STATS,

  // 5. Geospatial GIS State
  mapState: {
    center: [23.6102, 85.2799],
    zoom: 7,
    selectedDistrict: null,
    visibleLayers: {
      problems: true,
      critical: true,
      hotspots: true,
      clusters: true,
      challenges: true,
      projects: true,
      risks: true,
      predictedRisks: true,
      universities: true,
      partners: true
    },
    heatmapMode: 'Density'
  },

  // 6. Active Modals, Drawers & UI Control
  activeWorkflow: null,
  activeDrawerCaseId: null,
  activeChallengeDrawerId: null,
  activeRiskDrawerId: null,

  // 7. Global Filters
  globalFilters: {
    state: 'All States',
    district: 'All Districts',
    department: 'All Departments',
    category: 'All Categories',
    status: 'All Statuses',
    dateRange: 'Last 30 Days',
    searchQuery: ''
  },

  toasts: []
};

// Pure helper: create audit log entry
function addLog(actionName, details, type = 'action', actorRole = 'system') {
  return {
    id: `LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    time: new Date().toLocaleTimeString(),
    timestamp: new Date().toISOString(),
    action: actionName,
    details,
    type,
    actorRole,
    status: 'SUCCESS'
  };
}

// Pure helper: create in-app notification
function addNotif({ toRole, recipientName, title, message, severity = 'info', linkTarget = null }) {
  return {
    id: `NOTIF-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    toRole,
    recipientRole: toRole,
    to: toRole,
    recipientName: recipientName || toRole,
    title,
    message,
    time: 'Just now',
    unread: true,
    severity,
    linkTarget
  };
}

function reducer(state, action) {
  switch (action.type) {
    // ------------------------------------------------------------------------
    // UI, Navigation & Filters
    // ------------------------------------------------------------------------
    case 'SET_GLOBAL_FILTER':
      return {
        ...state,
        globalFilters: { ...state.globalFilters, ...action.payload }
      };

    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...(state.toasts || []), { id: action.payload?.id || Date.now().toString(), ...action.payload }]
      };

    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: (state.toasts || []).filter(t => t.id !== action.payload)
      };

    case 'START_WORKFLOW':
      return { ...state, activeWorkflow: action.payload };

    case 'CANCEL_WORKFLOW':
      return { ...state, activeWorkflow: null };

    case 'OPEN_CASE_DRAWER':
      return { ...state, activeDrawerCaseId: action.payload };

    case 'CLOSE_CASE_DRAWER':
      return { ...state, activeDrawerCaseId: null };

    case 'SET_ROLE': {
      const rawPayload = action.payload ?? action.role;
      const newRole = typeof rawPayload === 'object' ? rawPayload.role : rawPayload;
      const userName = typeof rawPayload === 'object' ? rawPayload.userName : undefined;
      const jurisdiction = typeof rawPayload === 'object' ? rawPayload.jurisdiction : undefined;

      return {
        ...state,
        role: newRole,
        currentUser: {
          ...state.currentUser,
          role: newRole || state.currentUser.role,
          name: userName || state.currentUser.name,
          jurisdiction: jurisdiction || state.currentUser.jurisdiction
        },
        auditLogs: [addLog('Role Switched', `Active role changed to ${newRole || 'Landing'}.`, 'system'), ...state.auditLogs]
      };
    }

    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload }
      };

    case 'NAV':
      return {
        ...state,
        view: action.view || state.view,
        viewParams: action.params || {}
      };

    case 'SET_LANG':
      return {
        ...state,
        language: action.payload || action.lang || 'en'
      };

    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: (state.notifications || []).map(n =>
          n.id === action.payload ? { ...n, unread: false } : n
        )
      };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...(state.notifications || [])]
      };

    // ------------------------------------------------------------------------
    // Problem & Grievance Lifecycle
    // ------------------------------------------------------------------------
    case 'SIMULATE_NEW_REPORT':
    case 'ADD_PROBLEM': {
      const p = action.payload || action.problem || {};
      const newId = `NIR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newProblem = {
        id: p.id || newId,
        title: p.title || 'Reported Civic Issue',
        description: p.description || 'Community reported issue requiring administrative action.',
        category: p.category || 'Water',
        location: p.location || 'Ward 12',
        district: p.district || 'Ranchi',
        lat: p.lat || 23.3441,
        lng: p.lng || 85.3096,
        severity: p.severity || 'High',
        priority: p.priority || (p.severity === 'Critical' ? 'Urgent' : 'High'),
        priorityScore: p.priorityScore || 85,
        aiConfidence: p.aiConfidence || 89,
        evidenceVerified: false,
        reportsCount: p.reportsCount || 1,
        upvotes: p.upvotes || 1,
        reportedOn: p.reportedOn || new Date().toISOString().split('T')[0],
        status: 'NEW',
        assignedOfficer: null,
        assignedDept: p.assignedDept || null,
        escalationLevel: 0,
        timeline: [
          { state: 'Citizen Reported', time: new Date().toLocaleTimeString(), actor: p.submitter?.name || p.submitter || 'Citizen', done: true }
        ],
        resolutionProof: null,
        citizenFeedback: null
      };

      const totalProblems = (state.stats?.totalProblems || 0) + 1;
      const critical = newProblem.severity === 'Critical'
        ? (state.stats?.critical || 0) + 1
        : (state.stats?.critical || 0);

      const notif = addNotif({
        toRole: 'department_officer',
        recipientName: 'Department Officer',
        title: 'New Grievance Registered',
        message: `Grievance ${newProblem.id} (${newProblem.title}) registered in ${newProblem.district}. Pending verification.`,
        severity: 'info',
        linkTarget: newProblem.id
      });

      return {
        ...state,
        problems: [newProblem, ...state.problems],
        stats: {
          ...state.stats,
          totalProblems,
          critical
        },
        notifications: [notif, ...(state.notifications || [])],
        auditLogs: [addLog('New Report', `Problem ${newProblem.id} received and classified.`, 'citizen'), ...state.auditLogs]
      };
    }

    case 'UPDATE_PROBLEM':
      return {
        ...state,
        problems: state.problems.map(p => p.id === action.payload.id ? { ...p, ...action.payload } : p)
      };

    case 'UPVOTE':
    case 'UPVOTE_PROBLEM':
      return {
        ...state,
        problems: state.problems.map(p =>
          p.id === (action.payload?.id || action.payload || action.id)
            ? { ...p, upvotes: (p.upvotes || 0) + 1 }
            : p
        )
      };

    case 'START_AI_ANALYSIS': {
      const targetId = action.payload?.id || action.payload;
      return {
        ...state,
        activeWorkflow: null,
        problems: state.problems.map(p => {
          if (p.id === targetId) {
            return {
              ...p,
              status: 'VERIFICATION_PENDING',
              timeline: [...p.timeline, { state: 'AI Analyzed', time: new Date().toLocaleTimeString(), done: true }]
            };
          }
          return p;
        }),
        auditLogs: [addLog('AI Analysis Started', `AI scanning ${targetId} for priority and duplicates.`, 'system'), ...state.auditLogs]
      };
    }

    case 'VERIFY_EVIDENCE': {
      const { id, decision, remarks } = action.payload;
      const isVerified = decision === 'verified';
      const newStatus = isVerified ? 'VERIFIED' : (decision === 'rejected' ? 'REJECTED' : 'MORE_INFO_NEEDED');

      return {
        ...state,
        activeWorkflow: null,
        problems: state.problems.map(p => {
          if (p.id === id) {
            return {
              ...p,
              evidenceVerified: isVerified,
              status: newStatus,
              timeline: [
                ...p.timeline,
                { state: isVerified ? 'Verified' : (decision === 'rejected' ? 'Rejected' : 'Info Requested'), time: new Date().toLocaleTimeString(), done: true }
              ]
            };
          }
          return p;
        }),
        auditLogs: [addLog('Verification Complete', `Decision: ${(decision || '').toUpperCase()}. Remarks: ${remarks || ''}`, 'officer'), ...state.auditLogs]
      };
    }

    case 'ASSIGN_OFFICER': {
      const { problemId, officerId, responseExpected } = action.payload;
      const assignedOfficer = state.officers.find(o => o.id === officerId);

      const notifOfficer = addNotif({
        toRole: 'department_officer',
        recipientName: assignedOfficer?.name || officerId,
        title: `Direct Assignment: ${problemId}`,
        message: `You have been assigned case ${problemId}. Expected SLA response: ${responseExpected || '48 hours'}.`,
        severity: 'urgent',
        linkTarget: problemId
      });

      const notifCitizen = addNotif({
        toRole: 'citizen',
        recipientName: 'Citizen Submitter',
        title: 'Officer Assigned',
        message: `Officer ${assignedOfficer?.name || officerId} assigned to your complaint ${problemId}.`,
        severity: 'info',
        linkTarget: problemId
      });

      return {
        ...state,
        activeWorkflow: null,
        officers: state.officers.map(o => {
          if (o.id === officerId) {
            return { ...o, workload: Math.min(100, (o.workload || 0) + 3), activeCasesCount: (o.activeCasesCount || 0) + 1 };
          }
          return o;
        }),
        problems: state.problems.map(p => {
          if (p.id === problemId) {
            return {
              ...p,
              assignedOfficer: officerId,
              assignedOfficerId: officerId,
              status: 'ASSIGNED',
              timeline: [...p.timeline, { state: 'Assigned', time: new Date().toLocaleTimeString(), done: true }]
            };
          }
          return p;
        }),
        notifications: [notifOfficer, notifCitizen, ...(state.notifications || [])],
        auditLogs: [addLog('Officer Assigned', `Officer ${officerId} assigned to ${problemId}. SLA: ${responseExpected || '48 hours'}`, 'officer'), ...state.auditLogs]
      };
    }

    case 'START_INSPECTION': {
      const targetId = action.payload?.id || action.payload;
      return {
        ...state,
        activeWorkflow: null,
        problems: state.problems.map(p => {
          if (p.id === targetId) {
            return {
              ...p,
              status: 'IN_PROGRESS',
              timeline: [...p.timeline, { state: 'Inspection Started', time: new Date().toLocaleTimeString(), done: true }]
            };
          }
          return p;
        }),
        auditLogs: [addLog('Inspection Started', `Field officer began inspection for ${targetId}.`, 'officer'), ...state.auditLogs]
      };
    }

    case 'OVERRIDE_AI': {
      const { id, newPriority, reason, field, newValue } = action.payload;
      const updatedValue = newPriority ?? newValue;

      return {
        ...state,
        activeWorkflow: null,
        problems: state.problems.map(p => {
          if (p.id === id) {
            return {
              ...p,
              priorityScore: field === 'priorityScore' || newPriority !== undefined ? updatedValue : p.priorityScore,
              [field || 'priorityScore']: updatedValue,
              timeline: [...p.timeline, { state: 'AI Overridden', time: new Date().toLocaleTimeString(), done: true }]
            };
          }
          return p;
        }),
        auditLogs: [addLog('AI Override', `Priority updated to ${updatedValue}. Reason: ${reason}`, 'warning'), ...state.auditLogs]
      };
    }

    case 'REJECT_CASE': {
      const { id, reason } = action.payload;
      return {
        ...state,
        activeWorkflow: null,
        problems: state.problems.map(p => {
          if (p.id === id) {
            return {
              ...p,
              status: 'REJECTED',
              timeline: [...p.timeline, { state: 'Rejected', time: new Date().toLocaleTimeString(), done: true }]
            };
          }
          return p;
        }),
        auditLogs: [addLog('Case Rejected', `Problem ${id} rejected. Reason: ${reason}`, 'officer'), ...state.auditLogs]
      };
    }

    case 'REQUEST_MORE_INFO': {
      const { id, requestedDetails } = action.payload;
      return {
        ...state,
        activeWorkflow: null,
        problems: state.problems.map(p => {
          if (p.id === id) {
            return {
              ...p,
              status: 'MORE_INFO_NEEDED',
              timeline: [...p.timeline, { state: 'Info Requested', time: new Date().toLocaleTimeString(), done: true }]
            };
          }
          return p;
        }),
        auditLogs: [addLog('More Info Requested', `Requested details for ${id}: ${requestedDetails}`, 'officer'), ...state.auditLogs]
      };
    }

    case 'ESCALATE_CASE': {
      const { id, reason } = action.payload;
      let newLevel = 1;
      const targetProb = state.problems.find(p => p.id === id);
      if (targetProb) {
        newLevel = (targetProb.escalationLevel || 0) + 1;
      }

      const dmNotif = addNotif({
        toRole: 'district_magistrate',
        recipientName: 'District Magistrate',
        title: `Escalation Alert: ${id}`,
        message: `Case ${id} escalated to Level ${newLevel}. Reason: ${reason || 'SLA breached'}.`,
        severity: 'warning',
        linkTarget: id
      });

      return {
        ...state,
        activeWorkflow: null,
        problems: state.problems.map(p => {
          if (p.id === id) {
            return {
              ...p,
              status: 'ESCALATED',
              escalationLevel: newLevel,
              timeline: [...p.timeline, { state: `Escalated L${newLevel}`, time: new Date().toLocaleTimeString(), done: true }]
            };
          }
          return p;
        }),
        notifications: [dmNotif, ...(state.notifications || [])],
        auditLogs: [addLog('Case Escalated', `Problem ${id} escalated. Reason: ${reason || 'SLA Breached'}`, 'warning'), ...state.auditLogs]
      };
    }

    // ------------------------------------------------------------------------
    // Outcome Verification State Machine Invariant:
    // IN_PROGRESS -> RESOLUTION_SUBMITTED -> FIELD_AUDITED -> CITIZEN_VALIDATION_PENDING -> VERIFIED_CLOSED / DISPUTED
    // Direct transition to CLOSED is strictly prohibited!
    // ------------------------------------------------------------------------
    case 'SUBMIT_RESOLUTION': {
      const { id, beforePhoto, beforeImage, afterPhoto, afterImage, latitude, longitude, remarks, completionRemarks } = action.payload;
      const proofRemarks = remarks || completionRemarks || 'Site clearance and repairs executed.';

      const inspectorNotif = addNotif({
        toRole: 'field_inspector',
        recipientName: 'Field Inspector',
        title: 'Inspection Required',
        message: `Resolution proof submitted for ${id}. Independent site audit required.`,
        severity: 'urgent',
        linkTarget: id
      });

      return {
        ...state,
        activeWorkflow: null,
        problems: state.problems.map(p => {
          if (p.id === id) {
            return {
              ...p,
              status: 'RESOLUTION_SUBMITTED',
              resolutionProof: {
                beforeImage: beforePhoto || beforeImage || 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=400',
                afterImage: afterPhoto || afterImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400',
                completionRemarks: proofRemarks,
                submittedAt: new Date().toISOString(),
                geoTag: {
                  lat: latitude || p.lat || 23.3441,
                  lng: longitude || p.lng || 85.3096,
                  accuracyMeters: 4.2
                },
                inspectorVerdict: null,
                inspectedAt: null
              },
              timeline: [
                ...p.timeline,
                { state: 'Resolution Submitted', time: new Date().toLocaleTimeString(), done: true }
              ]
            };
          }
          return p;
        }),
        notifications: [inspectorNotif, ...(state.notifications || [])],
        auditLogs: [addLog('Resolution Submitted', `Resolution proof submitted for problem ${id}. Remarks: ${proofRemarks}`, 'officer'), ...state.auditLogs]
      };
    }

    case 'INSPECTOR_AUDIT': {
      const { id, auditPassed, notes, checklist, remarks } = action.payload;
      const passed = auditPassed !== false;
      const auditNotes = notes || remarks || (passed ? 'Field inspection approved; quality verified.' : 'Deficiencies identified.');

      const nextStatus = passed ? 'CITIZEN_VALIDATION_PENDING' : 'IN_PROGRESS';

      const citizenNotif = passed
        ? addNotif({
            toRole: 'citizen',
            recipientName: 'Citizen Submitter',
            title: 'Action Required: Validate Outcome',
            message: `Repair verified by inspector for ${id}. Please confirm resolution and rate satisfaction.`,
            severity: 'urgent',
            linkTarget: id
          })
        : addNotif({
            toRole: 'department_officer',
            recipientName: 'Department Officer',
            title: 'Rework Required: Audit Failed',
            message: `Field audit failed for ${id}. Contractor rework ordered. Deficiencies: ${auditNotes}`,
            severity: 'warning',
            linkTarget: id
          });

      return {
        ...state,
        activeWorkflow: null,
        problems: state.problems.map(p => {
          if (p.id === id) {
            return {
              ...p,
              status: nextStatus,
              resolutionProof: {
                ...(p.resolutionProof || {}),
                inspectorVerdict: passed ? 'VERIFIED_SATISFACTORY' : 'VERIFIED_DEFICIENT',
                inspectedAt: new Date().toISOString(),
                checklist: checklist || { physicalCompleteness: passed, materialQuality: passed, siteClearance: passed }
              },
              timeline: [
                ...p.timeline,
                {
                  state: passed ? 'Field Audited' : 'Field Audit Failed',
                  time: new Date().toLocaleTimeString(),
                  actor: 'Field Inspector',
                  remarks: auditNotes,
                  done: true
                },
                ...(passed ? [{ state: 'Citizen Validation Pending', time: new Date().toLocaleTimeString(), actor: 'NIRVAHA Gateway', done: true }] : [])
              ]
            };
          }
          return p;
        }),
        notifications: [citizenNotif, ...(state.notifications || [])],
        auditLogs: [addLog(passed ? 'Field Audit Approved' : 'Field Audit Rejected', `Audit result for problem ${id}: ${passed ? 'APPROVED' : 'FAILED'}. Notes: ${auditNotes}`, 'field_inspector'), ...state.auditLogs]
      };
    }

    case 'CITIZEN_VALIDATE_RESOLUTION': {
      const { id, confirmed, rating, feedback, comment } = action.payload;
      const isConfirmed = confirmed !== false;
      const starRating = rating || 5;
      const userComment = feedback || comment || 'Issue completely resolved.';

      const officerNotif = addNotif({
        toRole: 'department_officer',
        recipientName: 'Department Officer',
        title: 'Case Verified & Closed',
        message: `Citizen confirmed resolution for ${id} (${starRating}★). Outstanding outcome!`,
        severity: 'success',
        linkTarget: id
      });

      return {
        ...state,
        activeWorkflow: null,
        citizenPoints: (state.citizenPoints || 0) + (starRating === 5 ? 50 : 25),
        problems: state.problems.map(p => {
          if (p.id === id) {
            return {
              ...p,
              status: 'VERIFIED_CLOSED',
              citizenFeedback: {
                confirmed: isConfirmed,
                rating: starRating,
                comment: userComment,
                validatedAt: new Date().toISOString(),
                disputeReason: null
              },
              timeline: [
                ...p.timeline,
                { state: 'Citizen Validated', time: new Date().toLocaleTimeString(), actor: 'Citizen', remarks: `${starRating}/5 Stars: ${userComment}`, done: true }
              ]
            };
          }
          return p;
        }),
        notifications: [officerNotif, ...(state.notifications || [])],
        auditLogs: [addLog('Citizen Confirmed Resolution', `Citizen validated resolution for problem ${id} with ${starRating}/5 stars.`, 'citizen'), ...state.auditLogs]
      };
    }

    case 'DISPUTE_RESOLUTION': {
      const { id, disputeReason, reason, feedback } = action.payload;
      const reasonText = disputeReason || reason || feedback || 'Issue not resolved satisfactorily.';

      const dmNotif = addNotif({
        toRole: 'district_magistrate',
        recipientName: 'District Magistrate',
        title: `Citizen Dispute: ${id}`,
        message: `Citizen disputed resolution for ${id}: "${reasonText}". Review required.`,
        severity: 'warning',
        linkTarget: id
      });

      return {
        ...state,
        activeWorkflow: null,
        problems: state.problems.map(p => {
          if (p.id === id) {
            const nextEscalation = (p.escalationLevel || 0) + 1;
            return {
              ...p,
              status: 'DISPUTED',
              escalationLevel: nextEscalation,
              citizenFeedback: {
                confirmed: false,
                rating: 1,
                disputeReason: reasonText,
                validatedAt: new Date().toISOString()
              },
              timeline: [
                ...p.timeline,
                { state: 'Citizen Disputed', time: new Date().toLocaleTimeString(), actor: 'Citizen', remarks: reasonText, done: true },
                { state: `Escalated to DM (L${nextEscalation})`, time: new Date().toLocaleTimeString(), actor: 'NIRVAHA Escalation Engine', done: true }
              ]
            };
          }
          return p;
        }),
        notifications: [dmNotif, ...(state.notifications || [])],
        auditLogs: [addLog('Citizen Disputed Resolution', `Citizen disputed resolution for problem ${id}: "${reasonText}". Escalated to DM.`, 'citizen'), ...state.auditLogs]
      };
    }

    case 'RESOLVE_DISPUTE': {
      const { id, resolutionAction, action: actType, justification } = action.payload;
      const decision = resolutionAction || actType || 'reopen';
      const isReopen = decision === 'reopen';

      return {
        ...state,
        activeWorkflow: null,
        problems: state.problems.map(p => {
          if (p.id === id) {
            return {
              ...p,
              status: isReopen ? 'IN_PROGRESS' : 'VERIFIED_CLOSED',
              disputeResolution: {
                reviewedByDM: state.currentUser?.name || 'District Magistrate',
                reviewedAt: new Date().toISOString(),
                action: decision,
                justification: justification || 'Reviewed under executive authority.'
              },
              timeline: [
                ...p.timeline,
                {
                  state: isReopen ? 'DM Reopened for Rework' : 'DM Enforced Closure',
                  time: new Date().toLocaleTimeString(),
                  actor: 'District Magistrate',
                  remarks: justification || 'Reviewed under executive authority.',
                  done: true
                }
              ]
            };
          }
          return p;
        }),
        auditLogs: [addLog(isReopen ? 'Dispute Resolved (Reopened)' : 'Dispute Resolved (Enforced Close)', `DM decided "${decision}" for problem ${id}. Justification: ${justification}`, 'district_magistrate'), ...state.auditLogs]
      };
    }

    // ------------------------------------------------------------------------
    // USP 1: Root Cause Engine & DBSCAN Clustering
    // ------------------------------------------------------------------------
    case 'TRIGGER_CLUSTER_ANALYSIS': {
      const { category, district } = action.payload || {};
      const newClusterId = `CLUSTER-${Math.floor(100 + Math.random() * 900)}`;
      const matchingProblems = state.problems.filter(p =>
        (!category || p.category === category) &&
        (!district || p.district === district)
      );

      const newCluster = {
        id: newClusterId,
        title: `${category || 'Civic Infrastructure'} Spatial Cluster (${district || 'Jharkhand'})`,
        category: category || 'Water',
        districts: district ? [district] : ['Ranchi'],
        centroidLat: matchingProblems[0]?.lat || 23.3441,
        centroidLng: matchingProblems[0]?.lng || 85.3096,
        radiusKm: 12.5,
        problemIds: matchingProblems.slice(0, 5).map(p => p.id),
        reportCount: Math.max(matchingProblems.length, 12),
        severity: 'High',
        systemicScore: 88,
        status: 'DETECTED',
        masterChallengeId: null,
        rootCauseHypothesis: 'Co-located recurring infrastructural failures point to underlying structural wear and lack of preventative maintenance.',
        recommendedIntervention: 'Comprehensive engineering overhaul and modular equipment replacement.',
        capexEst: 1800000,
        opexSaved3YrEst: 4200000
      };

      return {
        ...state,
        clusters: [newCluster, ...(state.clusters || [])],
        auditLogs: [addLog('Cluster Analysis Triggered', `Spatial cluster ${newClusterId} identified for ${category || 'all categories'} in ${district || 'state'}.`, 'system'), ...state.auditLogs]
      };
    }

    case 'MERGE_INTO_CLUSTER': {
      const { problemId, clusterId } = action.payload;
      return {
        ...state,
        clusters: (state.clusters || []).map(c => {
          if (c.id === clusterId) {
            return {
              ...c,
              problemIds: Array.from(new Set([...(c.problemIds || []), problemId])),
              reportCount: (c.reportCount || 0) + 1
            };
          }
          return c;
        }),
        problems: state.problems.map(p => {
          if (p.id === problemId) {
            return {
              ...p,
              clusterId,
              status: 'CLUSTERED_SYSTEMIC',
              timeline: [...p.timeline, { state: 'Clustered to Systemic', time: new Date().toLocaleTimeString(), done: true }]
            };
          }
          return p;
        }),
        auditLogs: [addLog('Problem Clustered', `Problem ${problemId} merged into cluster ${clusterId}.`, 'system'), ...state.auditLogs]
      };
    }

    case 'CREATE_SYSTEMIC_INTERVENTION': {
      const { clusterId, interventionPlan, estimatedBudget, expectedOpExSavings } = action.payload;
      return {
        ...state,
        clusters: (state.clusters || []).map(c => {
          if (c.id === clusterId) {
            return {
              ...c,
              status: 'ANALYZED',
              recommendedIntervention: interventionPlan || c.recommendedIntervention,
              capexEst: estimatedBudget || c.capexEst,
              opexSaved3YrEst: expectedOpExSavings || c.opexSaved3YrEst
            };
          }
          return c;
        }),
        auditLogs: [addLog('Intervention Proposed', `Intervention plan attached to cluster ${clusterId}.`, 'officer'), ...state.auditLogs]
      };
    }

    case 'DISMISS_CLUSTER':
      return {
        ...state,
        clusters: (state.clusters || []).map(c =>
          c.id === action.payload?.clusterId ? { ...c, status: 'DISMISSED' } : c
        )
      };

    // ------------------------------------------------------------------------
    // USP 2: Predictive Governance Radar
    // ------------------------------------------------------------------------
    case 'SCAN_PREDICTIVE_RISKS': {
      return {
        ...state,
        auditLogs: [addLog('Predictive Scan Completed', 'Evaluated multi-factor risk algorithms across all 24 districts.', 'system'), ...state.auditLogs]
      };
    }

    case 'GENERATE_EARLY_WARNING': {
      const { riskId, title } = action.payload;
      const targetRisk = (state.risks || []).find(r => r.id === riskId);
      const alertTitle = title || targetRisk?.title || 'Predictive Crisis Alert';

      const warningNotif = addNotif({
        toRole: 'department_officer',
        recipientName: 'Department Officer',
        title: `Early Warning: ${alertTitle}`,
        message: `High risk detected in ${targetRisk?.district || 'Ranchi'}. Preventive action recommended.`,
        severity: 'warning',
        linkTarget: riskId
      });

      return {
        ...state,
        toasts: [...(state.toasts || []), { id: Date.now().toString(), title: 'Early Warning Issued', message: alertTitle, type: 'warning' }],
        notifications: [warningNotif, ...(state.notifications || [])],
        auditLogs: [addLog('Early Warning Broadcast', `Warning issued for risk ${riskId}: ${alertTitle}`, 'system'), ...state.auditLogs]
      };
    }

    case 'CREATE_PREVENTIVE_ACTION': {
      const { riskId, title, dept, officerId, deadline, budget } = action.payload;
      const newOrder = {
        id: `PWO-${Math.floor(100 + Math.random() * 900)}`,
        riskId: riskId || 'RISK-101',
        title: title || 'Emergency Preventive Maintenance Order',
        department: dept || 'UDHD',
        departmentCode: dept || 'UDHD',
        assignedOfficerId: officerId || 'O-106',
        assignedOfficerName: 'Er. Vikas Anand',
        deadline: deadline || '2026-09-20 18:00',
        budgetAllocated: budget || 120000,
        status: 'DISPATCHED',
        progress: 10,
        actionChecklist: [
          { step: 'Deploy emergency field unit', completed: true },
          { step: 'Clear critical culvert and drainage blocks', completed: false },
          { step: 'Sensor and post-action verification', completed: false }
        ]
      };

      return {
        ...state,
        activeWorkflow: null,
        preventiveOrders: [newOrder, ...(state.preventiveOrders || [])],
        risks: (state.risks || []).map(r => r.id === riskId ? { ...r, status: 'PREVENTIVE_ASSIGNED', preventiveOrderId: newOrder.id } : r),
        auditLogs: [addLog('Preventive Order Dispatched', `Order ${newOrder.id} dispatched for risk ${riskId}. Budget: ₹${newOrder.budgetAllocated}`, 'officer'), ...state.auditLogs]
      };
    }

    case 'COMPLETE_PREVENTIVE_ACTION': {
      const { actionId, completionReport } = action.payload;
      return {
        ...state,
        preventiveOrders: (state.preventiveOrders || []).map(o =>
          o.id === actionId ? { ...o, status: 'COMPLETED', progress: 100, completionReport: completionReport || 'Completed on schedule.' } : o
        ),
        auditLogs: [addLog('Preventive Order Completed', `Work order ${actionId} marked complete.`, 'officer'), ...state.auditLogs]
      };
    }

    case 'DISMISS_RISK': {
      const { riskId, reason } = action.payload;
      return {
        ...state,
        risks: (state.risks || []).map(r => r.id === riskId ? { ...r, status: 'DISMISSED' } : r),
        auditLogs: [addLog('Risk Dismissed', `Risk ${riskId} dismissed. Reason: ${reason || 'False alarm'}`, 'officer'), ...state.auditLogs]
      };
    }

    // ------------------------------------------------------------------------
    // USP 4: Controlled Challenge Pipeline
    // ------------------------------------------------------------------------
    case 'CREATE_MASTER_CHALLENGE': {
      const newChallenge = {
        id: `MC-${Math.floor(1000 + Math.random() * 9000)}`,
        sourceClusterId: action.payload?.clusterId || null,
        title: action.payload?.title || 'Master Challenge for Systemic Infrastructure Intervention',
        description: action.payload?.description || 'Collaborative challenge inviting University and CSR solutions.',
        category: action.payload?.category || 'Water',
        district: action.payload?.district || 'Ranchi',
        location: action.payload?.location || 'Ranchi & Surrounding Blocks',
        lat: action.payload?.lat || 23.35,
        lng: action.payload?.lng || 85.32,
        priority: action.payload?.priority || 88,
        linkedReports: action.payload?.reportCount || action.payload?.linkedReports || 28,
        status: 'OPEN_FOR_SOLUTIONS',
        fundingGoal: action.payload?.fundingGoal || 2000000,
        committedFunds: action.payload?.committedFunds || 0,
        assignedUniversityId: null,
        partnerIndustryId: null,
        proposalsCount: 0,
        tranches: [
          { id: 't1', title: 'Tranche 1: Prototype & Bench Testing', amount: 600000, status: 'PENDING' },
          { id: 't2', title: 'Tranche 2: Field Pilot at 3 Sites', amount: 800000, status: 'PENDING' },
          { id: 't3', title: 'Tranche 3: Production Deployment & Handover', amount: 600000, status: 'PENDING' }
        ]
      };

      return {
        ...state,
        activeWorkflow: null,
        challenges: [newChallenge, ...(state.challenges || [])],
        auditLogs: [addLog('Challenge Created', `Master Challenge ${newChallenge.id} created from cluster ${action.payload?.clusterId || 'Systemic'}.`, 'system'), ...state.auditLogs]
      };
    }

    case 'PUBLISH_CHALLENGE': {
      const { challengeId } = action.payload;
      return {
        ...state,
        challenges: (state.challenges || []).map(c =>
          c.id === challengeId ? { ...c, status: 'OPEN_FOR_SOLUTIONS' } : c
        ),
        auditLogs: [addLog('Challenge Published', `Master Challenge ${challengeId} published to University and Industry portals.`, 'officer'), ...state.auditLogs]
      };
    }

    case 'INVITE_UNIVERSITY': {
      const { challengeId, universityId } = action.payload;
      const targetUni = (state.universities || []).find(u => u.id === universityId);

      const uniNotif = addNotif({
        toRole: 'university',
        recipientName: targetUni?.name || 'Academic Partner',
        title: `Challenge Invitation: ${challengeId}`,
        message: `Your institution is invited to submit a technical proposal for ${challengeId}.`,
        severity: 'info',
        linkTarget: challengeId
      });

      return {
        ...state,
        activeWorkflow: null,
        challenges: (state.challenges || []).map(c =>
          c.id === challengeId ? { ...c, status: 'INVITATION_SENT', assignedUniversityId: universityId || c.assignedUniversityId } : c
        ),
        notifications: [uniNotif, ...(state.notifications || [])],
        auditLogs: [addLog('Invitation Sent', `Sent proposal request to university ${universityId || ''} for Challenge ${challengeId}.`, 'officer'), ...state.auditLogs]
      };
    }

    case 'SUBMIT_PROPOSAL': {
      const { challengeId, universityId, proposalTitle, estimatedCost } = action.payload;
      return {
        ...state,
        challenges: (state.challenges || []).map(c =>
          c.id === challengeId ? { ...c, proposalsCount: (c.proposalsCount || 0) + 1, status: 'EVALUATING' } : c
        ),
        auditLogs: [addLog('Proposal Submitted', `University ${universityId} submitted proposal "${proposalTitle || 'RFP'}" for Challenge ${challengeId}.`, 'university'), ...state.auditLogs]
      };
    }

    case 'PLEDGE_CSR_FUNDS': {
      const { challengeId, industryId, amount } = action.payload;
      return {
        ...state,
        challenges: (state.challenges || []).map(c =>
          c.id === challengeId ? { ...c, committedFunds: (c.committedFunds || 0) + (amount || 500000) } : c
        ),
        auditLogs: [addLog('CSR Funding Pledged', `Industry ${industryId} pledged ₹${amount || 500000} to Challenge ${challengeId}.`, 'industry'), ...state.auditLogs]
      };
    }

    case 'AWARD_PILOT_PROJECT': {
      const { challengeId, universityId, industryId, projectTitle, initialGrant } = action.payload;
      const newProjId = `PROJ-00${(state.projects || []).length + 1}`;
      const newProject = {
        id: newProjId,
        challengeId,
        universityId: universityId || 'u3',
        industryId: industryId || 'i1',
        title: projectTitle || 'Modular Infrastructure Pilot Project',
        leadPartner: 'Academic & Industry Consortium',
        stage: 'PROTOTYPE',
        progress: 15,
        status: 'ON_TRACK',
        milestones: [
          { id: 'm1', name: 'Detailed Architectural Blueprint & Lab Test', status: 'In Progress', dueOn: '2026-10-15' },
          { id: 'm2', name: 'Field Prototype Construction at Site 1', status: 'To Do', dueOn: '2026-11-20' },
          { id: 'm3', name: 'Independent Quality Audit & Community Handover', status: 'To Do', dueOn: '2026-12-30' }
        ],
        funding: { ask: initialGrant || 300000, pledged: initialGrant || 300000, released: (initialGrant || 300000) * 0.3 },
        ipStatus: 'Disclosure Drafted',
        team: { faculty: 'Lead Researcher', students: ['Student 1', 'Student 2'] },
        impact: { beneficiaries: 500, costSaved: 25000, timeSavedMonths: 1 }
      };

      return {
        ...state,
        activeWorkflow: null,
        projects: [newProject, ...(state.projects || [])],
        challenges: (state.challenges || []).map(c =>
          c.id === challengeId ? { ...c, status: 'PILOT_AWARDED', assignedUniversityId: universityId, partnerIndustryId: industryId } : c
        ),
        auditLogs: [addLog('Pilot Project Awarded', `Project ${newProjId} awarded for challenge ${challengeId}. Initial Grant: ₹${initialGrant || 300000}`, 'officer'), ...state.auditLogs]
      };
    }

    case 'UPDATE_PROJECT_MILESTONE': {
      const { projectId, milestoneId, status: mStatus } = action.payload;
      return {
        ...state,
        projects: (state.projects || []).map(p => {
          if (p.id === projectId) {
            const updatedMilestones = (p.milestones || []).map(m =>
              m.id === milestoneId ? { ...m, status: mStatus || 'Done', verifiedOn: new Date().toISOString().split('T')[0] } : m
            );
            const doneCount = updatedMilestones.filter(m => m.status === 'Done').length;
            const newProgress = Math.round((doneCount / updatedMilestones.length) * 100);
            return {
              ...p,
              milestones: updatedMilestones,
              progress: newProgress,
              stage: newProgress === 100 ? 'VERIFIED_COMPLETE' : (newProgress > 50 ? 'DEPLOYMENT' : p.stage)
            };
          }
          return p;
        }),
        auditLogs: [addLog('Milestone Verified', `Milestone ${milestoneId} updated for project ${projectId}.`, 'partner'), ...state.auditLogs]
      };
    }

    case 'RELEASE_TRANCHE_FUND': {
      const { projectId, amount } = action.payload;
      return {
        ...state,
        projects: (state.projects || []).map(p => {
          if (p.id === projectId) {
            return {
              ...p,
              funding: {
                ...p.funding,
                released: (p.funding?.released || 0) + (amount || 50000)
              }
            };
          }
          return p;
        }),
        auditLogs: [addLog('Tranche Released', `Released ₹${amount || 50000} from escrow for project ${projectId}.`, 'partner'), ...state.auditLogs]
      };
    }

    case 'COMPLETE_PROJECT': {
      const { projectId, impactReport } = action.payload;
      return {
        ...state,
        projects: (state.projects || []).map(p =>
          p.id === projectId ? { ...p, stage: 'VERIFIED_COMPLETE', progress: 100, impact: { ...p.impact, ...impactReport } } : p
        ),
        auditLogs: [addLog('Project Completed', `Solution Project ${projectId} marked VERIFIED_COMPLETE. Ready for Knowledge Archival.`, 'officer'), ...state.auditLogs]
      };
    }

    // ------------------------------------------------------------------------
    // USP 5: Knowledge Reuse Engine
    // ------------------------------------------------------------------------
    case 'ARCHIVE_TO_KNOWLEDGE_BASE': {
      const { projectId, solutionMetadata, title, domain, costPerUnit } = action.payload;
      const meta = solutionMetadata || {};
      const newRecord = {
        id: `KR-${Math.floor(100 + Math.random() * 900)}`,
        sourceProjectId: projectId || 'PROJ-001',
        title: title || meta.title || 'Standardized Modular Civic Infrastructure Solution',
        domain: domain || meta.domain || 'Sanitation',
        district: 'Ranchi',
        successRate: 95,
        timesReused: 0,
        problemBlueprint: meta.blueprint || 'Recurring infrastructural failure pattern solved with standardized modular design.',
        solutionArchitecture: meta.architecture || 'Pre-tested engineering assembly with automated telemetry and low maintenance footprint.',
        implementationCostINR: costPerUnit || meta.costPerUnit || 150000,
        costDisplay: `₹${((costPerUnit || meta.costPerUnit || 150000) / 100000).toFixed(1)}L per unit`,
        deploymentDurationDays: meta.deploymentDays || 14,
        impactMetrics: {
          beneficiaries: 500,
          recurringMaintenanceSaved: 35000
        },
        reusableAssets: {
          cadBlueprints: 'https://nirvaha.gov.in/assets/cad/blueprint_standard.dwg',
          billOfMaterials: 'https://nirvaha.gov.in/assets/bom/bom_standard.xlsx',
          standardOperatingProcedure: 'SOP-OPS-001: Operational Installation and Preventive Care'
        },
        recommendedForKeywords: [domain || 'civic', 'infrastructure', 'modular']
      };

      return {
        ...state,
        knowledgeRecords: [newRecord, ...(state.knowledgeRecords || [])],
        auditLogs: [addLog('Archived to Knowledge Base', `New Knowledge Record ${newRecord.id} generated from project ${projectId || ''}.`, 'knowledge_officer'), ...state.auditLogs]
      };
    }

    case 'ADOPT_KNOWLEDGE_SOLUTION': {
      const { problemId, knowledgeRecordId } = action.payload;
      const record = (state.knowledgeRecords || []).find(k => k.id === knowledgeRecordId);

      return {
        ...state,
        knowledgeRecords: (state.knowledgeRecords || []).map(k =>
          k.id === knowledgeRecordId ? { ...k, timesReused: (k.timesReused || 0) + 1 } : k
        ),
        problems: state.problems.map(p => {
          if (p.id === problemId) {
            return {
              ...p,
              status: 'IN_PROGRESS',
              timeline: [
                ...p.timeline,
                { state: 'Solution Adopted', time: new Date().toLocaleTimeString(), actor: 'Knowledge Engine', remarks: `Adopted ${record?.title || knowledgeRecordId}`, done: true }
              ]
            };
          }
          return p;
        }),
        auditLogs: [addLog('Knowledge Solution Adopted', `Applied playbook ${knowledgeRecordId} to problem ${problemId}.`, 'officer'), ...state.auditLogs]
      };
    }

    default:
      return state;
  }
}

export function SimulationProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SimulationContext.Provider value={{ state, dispatch }}>
      {children}
    </SimulationContext.Provider>
  );
}

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};

export default SimulationContext;
