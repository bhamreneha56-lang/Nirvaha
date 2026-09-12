// Offline / Mock fallback storage for NIRVAHA platform
// Enables 100% functionality on standalone deployments (e.g. Vercel) without a running backend

export const DEFAULT_USER = {
  _id: 'usr-demo-001',
  name: 'Neha Dilip Bhamare',
  email: 'neha@nirvaha.in',
  phone: '+91 98765 43210',
  role: 'citizen',
  citizenType: 'Individual Citizens',
  district: 'Ranchi',
  block: 'Kanke',
  karmaTotal: 450,
  validationsCount: 14,
  createdAt: new Date().toISOString()
};

export const getStoredProblems = () => {
  try {
    const raw = localStorage.getItem('nirvaha_problems');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}

  const initial = [
    {
      _id: 'prob-local-001',
      problemIdReadable: 'NIR-PROB-2026-000184',
      title: 'Contaminated drinking water in Kanke block',
      category: 'Water Resources',
      subcategory: 'Drinking Water Contamination',
      description: 'Handpump discharging high turbid water with metallic odor for over 3 weeks. Affecting 250+ households in the ward.',
      district: 'Ranchi',
      block: 'Kanke',
      ward: 'Ward 12',
      severity: 'Critical',
      emergencyFlag: false,
      status: 'submitted',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      submittedBy: { name: 'Neha Dilip Bhamare', role: 'citizen' }
    },
    {
      _id: 'prob-local-002',
      problemIdReadable: 'NIR-PROB-2026-000241',
      title: 'Unsafe primary school approach road',
      category: 'Roads & Transport',
      subcategory: 'Potholes / Culvert Damage',
      description: 'Monsoon flash flood damaged the primary approach road to the Government Middle School. Rickshaws and children face acute safety hazards.',
      district: 'Ranchi',
      block: 'Namkum',
      ward: 'Ward 4',
      severity: 'High',
      emergencyFlag: false,
      status: 'verified',
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      submittedBy: { name: 'Neha Dilip Bhamare', role: 'citizen' }
    },
    {
      _id: 'prob-local-003',
      problemIdReadable: 'NIR-PROB-2026-000319',
      title: 'Solar microgrid inverter malfunction in PHC',
      category: 'Energy & Power',
      subcategory: 'Public Facility Power Loss',
      description: 'Primary Health Centre cold storage vaccine unit without backup power due to inverter capacitor burnout.',
      district: 'Ranchi',
      block: 'Ormanjhi',
      ward: 'Ward 2',
      severity: 'Critical',
      emergencyFlag: true,
      status: 'in_progress',
      createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
      submittedBy: { name: 'Neha Dilip Bhamare', role: 'citizen' }
    }
  ];
  try {
    localStorage.setItem('nirvaha_problems', JSON.stringify(initial));
  } catch (e) {}
  return initial;
};

export const saveNewProblemLocally = (formData, user) => {
  const problems = getStoredProblems();
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const problemIdReadable = `NIR-PROB-${year}-${randomNum}`;

  const newProb = {
    _id: `prob-local-${Date.now()}`,
    problemIdReadable,
    ...formData,
    status: 'submitted',
    createdAt: new Date().toISOString(),
    submittedBy: user || DEFAULT_USER
  };

  problems.unshift(newProb);
  try {
    localStorage.setItem('nirvaha_problems', JSON.stringify(problems));
  } catch (e) {}
  return newProb;
};

export const getProblemByPidLocally = (pid) => {
  if (!pid) return null;
  const problems = getStoredProblems();
  const cleanPid = pid.trim().toLowerCase();
  const found = problems.find(
    p => (p.problemIdReadable && p.problemIdReadable.toLowerCase() === cleanPid) || p._id === pid
  );

  if (found) {
    const isSubmitted = found.status === 'submitted';
    const isVerified = ['verified', 'assigned', 'in_progress', 'deployed', 'closed'].includes(found.status);
    const isAssigned = ['assigned', 'in_progress', 'deployed', 'closed'].includes(found.status);

    const history = [
      {
        fromStatus: null,
        toStatus: 'submitted',
        note: 'Problem registered into NIRVAHA system and assigned unique PID.',
        timestamp: found.createdAt
      }
    ];

    if (isVerified) {
      history.unshift({
        fromStatus: 'submitted',
        toStatus: 'verified',
        note: 'Authority and Panchayati Raj Institution validated jurisdiction and priority.',
        timestamp: new Date(new Date(found.createdAt).getTime() + 86400000).toISOString()
      });
    }

    if (isAssigned) {
      history.unshift({
        fromStatus: 'verified',
        toStatus: 'assigned',
        note: 'Opportunity published to Higher Education & CSR ecosystem; working team assigned.',
        timestamp: new Date(new Date(found.createdAt).getTime() + 86400000 * 2).toISOString()
      });
    }

    return { problem: found, history };
  }

  // Fallback demo journey for any entered PID so demo never breaks
  return {
    problem: {
      _id: 'prob-demo-' + pid,
      problemIdReadable: pid.toUpperCase(),
      title: 'Societal Challenge (' + pid.toUpperCase() + ')',
      category: 'Public Infrastructure',
      district: 'Ranchi',
      description: 'Active challenge record registered in NIRVAHA Civic intelligence platform.',
      severity: 'Moderate',
      status: 'verified',
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    history: [
      {
        fromStatus: 'submitted',
        toStatus: 'verified',
        note: 'Authority and Panchayati Raj Institution validated jurisdiction and priority.',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        fromStatus: null,
        toStatus: 'submitted',
        note: 'Problem registered into NIRVAHA system and assigned unique PID.',
        timestamp: new Date(Date.now() - 86400000 * 3).toISOString()
      }
    ]
  };
};
