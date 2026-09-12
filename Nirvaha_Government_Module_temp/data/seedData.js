import UNIFIED_DATA from './unified_dataset.json';
/**
 * NIRVAHA SEED DATASET — Comprehensive Jharkhand Civic-Tech & Governance Dataset
 * ==============================================================================
 * File: frontend/src/data/seedData.js (Proposed Drop-in Replacement)
 * Classification: State Invariants & Entity Hydration Engine
 * Target: Single Source of Truth for SimulationContext.jsx & AppContext.jsx
 *
 * Entities Covered:
 *  1. 24 Jharkhand Districts with official coordinates, census demographics & bounds
 *  2. 10 Governance Departments with SLA metrics, heads & performance metrics
 *  3. 10 Realistic Department Officers with workloads, contact details & skills
 *  4. 11 Higher Education Institutions (HEIs) & Technical Universities
 *  5. 8 Industry & PSU CSR Foundations with budgets and active commitments
 *  6. 28 Diverse Problem Cases covering ALL 10 State Progression Invariant States
 *  7. 5 Spatial & Semantic Problem Clusters (DBSCAN outputs)
 *  8. 4 Master Challenges with multi-tranche CSR & University co-funding
 *  9. 7 Active/Completed Solution Projects with milestone verification logs
 * 10. 5 Predictive Risk Alerts with probability, time windows & affected pop
 * 11. 3 Preventive Work Orders dispatched from predictive risks
 * 12. 4 Institutional Knowledge Records with reusable blueprints, BOMs & SOPs
 * 13. 10 Immutable Audit Log Entries demonstrating provenance & state tracking
 * 14. 8 Multi-Role In-App Notifications
 * 15. Initial System KPI Telemetry & Departmental Scorecards
 */

// ============================================================================
// 1. 24 JHARKHAND DISTRICTS WITH GEOGRAPHIC COORDINATES & ADMINISTRATIVE METRICS
// ============================================================================

export const JHARKHAND_DISTRICTS = [
  {
    id: "DIST-01",
    name: "Ranchi",
    division: "South Chotanagpur",
    hq: "Ranchi",
    lat: 23.3441,
    lng: 85.3096,
    population: 2914253,
    areaKm2: 5097,
    activeCases: 42,
    resolvedCases: 198,
    riskLevel: "High",
    tier: 1
  },
  {
    id: "DIST-02",
    name: "Dhanbad",
    division: "North Chotanagpur",
    hq: "Dhanbad",
    lat: 23.7957,
    lng: 86.4304,
    population: 2684487,
    areaKm2: 2040,
    activeCases: 38,
    resolvedCases: 164,
    riskLevel: "High",
    tier: 1
  },
  {
    id: "DIST-03",
    name: "Bokaro",
    division: "North Chotanagpur",
    hq: "Bokaro Steel City",
    lat: 23.6693,
    lng: 86.1511,
    population: 2062330,
    areaKm2: 2883,
    activeCases: 29,
    resolvedCases: 142,
    riskLevel: "Medium",
    tier: 1
  },
  {
    id: "DIST-04",
    name: "East Singhbhum",
    nameAlt: "Jamshedpur (East Singhbhum)",
    division: "Kolhan",
    hq: "Jamshedpur",
    lat: 22.8046,
    lng: 86.2029,
    population: 2293919,
    areaKm2: 3562,
    activeCases: 31,
    resolvedCases: 185,
    riskLevel: "Medium",
    tier: 1
  },
  {
    id: "DIST-05",
    name: "Hazaribagh",
    division: "North Chotanagpur",
    hq: "Hazaribagh",
    lat: 23.9925,
    lng: 85.3637,
    population: 1734495,
    areaKm2: 3555,
    activeCases: 24,
    resolvedCases: 119,
    riskLevel: "Medium",
    tier: 2
  },
  {
    id: "DIST-06",
    name: "Deoghar",
    division: "Santhal Pargana",
    hq: "Deoghar",
    lat: 24.4826,
    lng: 86.6997,
    population: 1492073,
    areaKm2: 2477,
    activeCases: 22,
    resolvedCases: 94,
    riskLevel: "Medium",
    tier: 2
  },
  {
    id: "DIST-07",
    name: "Dumka",
    division: "Santhal Pargana",
    hq: "Dumka",
    lat: 24.2676,
    lng: 87.2498,
    population: 1321442,
    areaKm2: 3761,
    activeCases: 19,
    resolvedCases: 86,
    riskLevel: "Low",
    tier: 2
  },
  {
    id: "DIST-08",
    name: "Giridih",
    division: "North Chotanagpur",
    hq: "Giridih",
    lat: 24.1839,
    lng: 86.3056,
    population: 2445474,
    areaKm2: 4962,
    activeCases: 27,
    resolvedCases: 108,
    riskLevel: "Medium",
    tier: 2
  },
  {
    id: "DIST-09",
    name: "Godda",
    division: "Santhal Pargana",
    hq: "Godda",
    lat: 24.8267,
    lng: 87.2144,
    population: 1313551,
    areaKm2: 2266,
    activeCases: 18,
    resolvedCases: 72,
    riskLevel: "High",
    tier: 2
  },
  {
    id: "DIST-10",
    name: "Sahebganj",
    division: "Santhal Pargana",
    hq: "Sahebganj",
    lat: 25.2425,
    lng: 87.6434,
    population: 1150567,
    areaKm2: 2063,
    activeCases: 16,
    resolvedCases: 61,
    riskLevel: "High",
    tier: 2
  },
  {
    id: "DIST-11",
    name: "Pakur",
    division: "Santhal Pargana",
    hq: "Pakur",
    lat: 24.6340,
    lng: 87.8492,
    population: 900422,
    areaKm2: 1806,
    activeCases: 14,
    resolvedCases: 53,
    riskLevel: "Medium",
    tier: 3
  },
  {
    id: "DIST-12",
    name: "Latehar",
    division: "Palamu",
    hq: "Latehar",
    lat: 23.7441,
    lng: 84.4984,
    population: 726978,
    areaKm2: 4291,
    activeCases: 15,
    resolvedCases: 48,
    riskLevel: "Medium",
    tier: 3
  },
  {
    id: "DIST-13",
    name: "Lohardaga",
    division: "South Chotanagpur",
    hq: "Lohardaga",
    lat: 23.4316,
    lng: 84.6826,
    population: 461790,
    areaKm2: 1502,
    activeCases: 11,
    resolvedCases: 49,
    riskLevel: "Low",
    tier: 3
  },
  {
    id: "DIST-14",
    name: "Gumla",
    division: "South Chotanagpur",
    hq: "Gumla",
    lat: 23.0428,
    lng: 84.5422,
    population: 1025213,
    areaKm2: 5360,
    activeCases: 17,
    resolvedCases: 65,
    riskLevel: "Medium",
    tier: 3
  },
  {
    id: "DIST-15",
    name: "Simdega",
    division: "South Chotanagpur",
    hq: "Simdega",
    lat: 22.6170,
    lng: 84.5074,
    population: 599578,
    areaKm2: 3774,
    activeCases: 13,
    resolvedCases: 42,
    riskLevel: "Low",
    tier: 3
  },
  {
    id: "DIST-16",
    name: "West Singhbhum",
    division: "Kolhan",
    hq: "Chaibasa",
    lat: 22.5539,
    lng: 85.8118,
    population: 1502338,
    areaKm2: 7224,
    activeCases: 26,
    resolvedCases: 89,
    riskLevel: "High",
    tier: 2
  },
  {
    id: "DIST-17",
    name: "Khunti",
    division: "South Chotanagpur",
    hq: "Khunti",
    lat: 23.0729,
    lng: 85.2789,
    population: 531885,
    areaKm2: 2535,
    activeCases: 12,
    resolvedCases: 57,
    riskLevel: "Low",
    tier: 3
  },
  {
    id: "DIST-18",
    name: "Ramgarh",
    division: "North Chotanagpur",
    hq: "Ramgarh Cantonment",
    lat: 23.6300,
    lng: 85.5186,
    population: 949443,
    areaKm2: 1341,
    activeCases: 19,
    resolvedCases: 76,
    riskLevel: "Medium",
    tier: 2
  },
  {
    id: "DIST-19",
    name: "Koderma",
    division: "North Chotanagpur",
    hq: "Koderma",
    lat: 24.4678,
    lng: 85.5939,
    population: 716259,
    areaKm2: 1500,
    activeCases: 14,
    resolvedCases: 58,
    riskLevel: "Low",
    tier: 3
  },
  {
    id: "DIST-20",
    name: "Chatra",
    division: "North Chotanagpur",
    hq: "Chatra",
    lat: 24.2092,
    lng: 84.8719,
    population: 1042886,
    areaKm2: 3718,
    activeCases: 16,
    resolvedCases: 64,
    riskLevel: "Medium",
    tier: 3
  },
  {
    id: "DIST-21",
    name: "Palamu",
    division: "Palamu",
    hq: "Medininagar (Daltonganj)",
    lat: 24.0378,
    lng: 84.0689,
    population: 1939869,
    areaKm2: 4393,
    activeCases: 28,
    resolvedCases: 95,
    riskLevel: "High",
    tier: 2
  },
  {
    id: "DIST-22",
    name: "Garhwa",
    division: "Palamu",
    hq: "Garhwa",
    lat: 24.1610,
    lng: 83.8052,
    population: 1322784,
    areaKm2: 4044,
    activeCases: 21,
    resolvedCases: 70,
    riskLevel: "Medium",
    tier: 2
  },
  {
    id: "DIST-23",
    name: "Saraikela-Kharsawan",
    division: "Kolhan",
    hq: "Saraikela",
    lat: 22.6994,
    lng: 85.9309,
    population: 1065056,
    areaKm2: 2657,
    activeCases: 20,
    resolvedCases: 81,
    riskLevel: "Medium",
    tier: 2
  },
  {
    id: "DIST-24",
    name: "Jamtara",
    nameAlt: "Shivpur (Nawadih)",
    division: "Santhal Pargana",
    hq: "Jamtara",
    lat: 23.9587,
    lng: 86.8016,
    population: 791042,
    areaKm2: 1811,
    activeCases: 15,
    resolvedCases: 52,
    riskLevel: "Low",
    tier: 3
  }
];

// Backwards-compatible legacy DISTRICTS array of district name strings
export const DISTRICTS = [
  "Ranchi",
  "Jamshedpur (East Singhbhum)",
  "Dhanbad",
  "Bokaro",
  "Hazaribagh",
  "Giridih",
  "Deoghar",
  "Dumka",
  "Godda",
  "Sahebganj",
  "Pakur",
  "Latehar",
  "Lohardaga",
  "Gumla",
  "Simdega",
  "West Singhbhum",
  "Khunti",
  "Ramgarh",
  "Koderma",
  "Chatra",
  "Palamu",
  "Garhwa",
  "Saraikela-Kharsawan",
  "Shivpur (Nawadih)"
];

// Map helper to find full district metadata by name
export const getDistrictMeta = (districtName) => {
  if (!districtName) return JHARKHAND_DISTRICTS[0];
  const clean = districtName.toLowerCase().replace(/[^a-z]/g, "");
  return (
    JHARKHAND_DISTRICTS.find(d => {
      const match1 = d.name.toLowerCase().replace(/[^a-z]/g, "");
      const match2 = d.nameAlt ? d.nameAlt.toLowerCase().replace(/[^a-z]/g, "") : "";
      return match1.includes(clean) || clean.includes(match1) || (match2 && (match2.includes(clean) || clean.includes(match2)));
    }) || JHARKHAND_DISTRICTS[0]
  );
};


// ============================================================================
// 2. 10 THEMATIC CIVIC CATEGORIES
// ============================================================================

export const CATEGORIES = [
  { key: "Water", label: "Drinking Water & Sanitation", icon: "💧", color: "#0ea5e9", deptCode: "PHED", slaHours: 48 },
  { key: "Sanitation", label: "Public Hygiene & Waste", icon: "🚽", color: "#8b5cf6", deptCode: "UDHD", slaHours: 48 },
  { key: "Roads", label: "Roads, Bridges & Transport", icon: "🛣️", color: "#64748b", deptCode: "PWD", slaHours: 72 },
  { key: "Agriculture", label: "Agriculture & Livelihood", icon: "🌾", color: "#84cc16", deptCode: "AGRI", slaHours: 96 },
  { key: "Education", label: "School Education & Literacy", icon: "📚", color: "#f59e0b", deptCode: "EDU", slaHours: 72 },
  { key: "Health", label: "Health & Clinical Facilities", icon: "🏥", color: "#ef4444", deptCode: "HEALTH", slaHours: 24 },
  { key: "Accessibility", label: "Divyangjan & Universal Access", icon: "♿", color: "#06b6d4", deptCode: "WCD", slaHours: 72 },
  { key: "Environment", label: "Forest, Pollution & Ecology", icon: "🌳", color: "#16a34a", deptCode: "FOREST", slaHours: 72 },
  { key: "Urban Infra", label: "Urban Utilities & Civic Infra", icon: "🏙️", color: "#475569", deptCode: "UDHD", slaHours: 48 },
  { key: "Public Service", label: "PDS, Welfare & Digital Services", icon: "🏛️", color: "#b45309", deptCode: "FCS", slaHours: 48 }
];

export const catMeta = (key) => CATEGORIES.find(c => c.key === key) || CATEGORIES[9];


// ============================================================================
// 3. 10 JHARKHAND GOVERNMENT DEPARTMENTS & TELEMETRY
// ============================================================================

export const DEPARTMENTS = [
  {
    id: "DEPT-01",
    code: "PHED",
    name: "Drinking Water & Sanitation Department (PHED)",
    shortName: "PHED (Water)",
    headOfficer: "Er. Rajeshwar Prasad",
    activeCases: 1284,
    criticalCases: 84,
    slaComplianceRate: 88.4,
    officerCount: 42,
    citizenSatisfaction: 4.1,
    budgetAllocatedCr: 420.5,
    primaryDomain: "Water"
  },
  {
    id: "DEPT-02",
    code: "PWD",
    name: "Road Construction Department (RCD / PWD)",
    shortName: "Roads & Highways",
    headOfficer: "Er. Alok Kumar Singh",
    activeCases: 1017,
    criticalCases: 112,
    slaComplianceRate: 81.2,
    officerCount: 38,
    citizenSatisfaction: 3.8,
    budgetAllocatedCr: 680.0,
    primaryDomain: "Roads"
  },
  {
    id: "DEPT-03",
    code: "HEALTH",
    name: "Health, Medical Education & Family Welfare",
    shortName: "Health & Clinics",
    headOfficer: "Dr. Sunita Soren",
    activeCases: 812,
    criticalCases: 45,
    slaComplianceRate: 94.7,
    officerCount: 65,
    citizenSatisfaction: 4.5,
    budgetAllocatedCr: 550.0,
    primaryDomain: "Health"
  },
  {
    id: "DEPT-04",
    code: "EDU",
    name: "School Education & Literacy Department",
    shortName: "School Education",
    headOfficer: "Smt. Meenakshi Toppo",
    activeCases: 628,
    criticalCases: 18,
    slaComplianceRate: 89.6,
    officerCount: 28,
    citizenSatisfaction: 4.3,
    budgetAllocatedCr: 490.0,
    primaryDomain: "Education"
  },
  {
    id: "DEPT-05",
    code: "AGRI",
    name: "Agriculture, Animal Husbandry & Co-operative",
    shortName: "Agriculture",
    headOfficer: "Sri Rameshwar Mahto",
    activeCases: 492,
    criticalCases: 22,
    slaComplianceRate: 86.5,
    officerCount: 31,
    citizenSatisfaction: 4.0,
    budgetAllocatedCr: 310.0,
    primaryDomain: "Agriculture"
  },
  {
    id: "DEPT-06",
    code: "UDHD",
    name: "Urban Development & Housing Department (UDHD)",
    shortName: "Urban Infra & Waste",
    headOfficer: "Er. Vikas Anand",
    activeCases: 741,
    criticalCases: 67,
    slaComplianceRate: 86.8,
    officerCount: 34,
    citizenSatisfaction: 4.0,
    budgetAllocatedCr: 380.0,
    primaryDomain: "Urban Infra"
  },
  {
    id: "DEPT-07",
    code: "WCD",
    name: "Women, Child Development & Social Welfare",
    shortName: "Social Welfare & Accessibility",
    headOfficer: "Smt. Priyanka Kumari",
    activeCases: 384,
    criticalCases: 14,
    slaComplianceRate: 92.1,
    officerCount: 24,
    citizenSatisfaction: 4.4,
    budgetAllocatedCr: 210.0,
    primaryDomain: "Accessibility"
  },
  {
    id: "DEPT-08",
    code: "FOREST",
    name: "Department of Forest, Environment & Climate Change",
    shortName: "Forest & Environment",
    headOfficer: "Sri Animesh Sengupta",
    activeCases: 342,
    criticalCases: 39,
    slaComplianceRate: 87.9,
    officerCount: 22,
    citizenSatisfaction: 4.2,
    budgetAllocatedCr: 180.0,
    primaryDomain: "Environment"
  },
  {
    id: "DEPT-09",
    code: "FCS",
    name: "Food, Public Distribution & Consumer Affairs",
    shortName: "PDS & Food Civil Supplies",
    headOfficer: "Sri Dilip Kumar Roy",
    activeCases: 512,
    criticalCases: 58,
    slaComplianceRate: 83.4,
    officerCount: 26,
    citizenSatisfaction: 3.9,
    budgetAllocatedCr: 290.0,
    primaryDomain: "Public Service"
  },
  {
    id: "DEPT-10",
    code: "ENERGY",
    name: "Energy Department / JUVNL (Electricity)",
    shortName: "Energy & Electricity",
    headOfficer: "Er. Sanjay K. Tirkey",
    activeCases: 942,
    criticalCases: 104,
    slaComplianceRate: 82.3,
    officerCount: 51,
    citizenSatisfaction: 3.9,
    budgetAllocatedCr: 520.0,
    primaryDomain: "Urban Infra"
  }
];


// ============================================================================
// 4. 10 REALISTIC FIELD & DEPARTMENT OFFICERS
// ============================================================================

export const OFFICERS = [
  {
    id: "O-101",
    name: "Er. Rajeshwar Prasad",
    designation: "Executive Engineer",
    dept: "PHED",
    departmentCode: "PHED",
    district: "Ranchi",
    jurisdiction: "Ranchi Urban & Bundu Sub-division",
    skill: "Drinking Water Networks & Tube-wells",
    skillDomain: "Water",
    workload: 42,
    slaRating: 94.2,
    activeCasesCount: 7,
    phone: "+91 94311 20101",
    email: "r.prasad.phed@jharkhand.gov.in",
    distance: 2,
    status: "AVAILABLE",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&fit=crop&crop=faces"
  },
  {
    id: "O-102",
    name: "Er. Alok Kumar Singh",
    designation: "Superintending Engineer",
    dept: "Roads",
    departmentCode: "PWD",
    district: "Dhanbad",
    jurisdiction: "Dhanbad Industrial Corridor & NH-33 Link",
    skill: "Bituminous Pavement & Bridges",
    skillDomain: "Roads",
    workload: 88,
    slaRating: 82.5,
    activeCasesCount: 16,
    phone: "+91 94311 20102",
    email: "ak.singh.pwd@jharkhand.gov.in",
    distance: 4,
    status: "OVERLOADED",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&fit=crop&crop=faces"
  },
  {
    id: "O-103",
    name: "Dr. Sunita Soren",
    designation: "Chief Medical Officer",
    dept: "Health",
    departmentCode: "HEALTH",
    district: "East Singhbhum",
    jurisdiction: "Jamshedpur PHCs & Chaibasa Tribal Belt",
    skill: "Epidemiology & Rural Clinic Operations",
    skillDomain: "Health",
    workload: 54,
    slaRating: 96.0,
    activeCasesCount: 9,
    phone: "+91 94311 20103",
    email: "dr.soren.health@jharkhand.gov.in",
    distance: 6,
    status: "AVAILABLE",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&fit=crop&crop=faces"
  },
  {
    id: "O-104",
    name: "Smt. Meenakshi Toppo",
    designation: "District Superintendent of Education",
    dept: "Education",
    departmentCode: "EDU",
    district: "Hazaribagh",
    jurisdiction: "Simaria, Barhi & Hazaribagh Sadar",
    skill: "School Infrastructure & Mid-Day Meal Log",
    skillDomain: "Education",
    workload: 61,
    slaRating: 89.4,
    activeCasesCount: 11,
    phone: "+91 94311 20104",
    email: "m.toppo.edu@jharkhand.gov.in",
    distance: 8,
    status: "AVAILABLE",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&fit=crop&crop=faces"
  },
  {
    id: "O-105",
    name: "Sri Rameshwar Mahto",
    designation: "District Agriculture Officer",
    dept: "Agriculture",
    departmentCode: "AGRI",
    district: "Chatra",
    jurisdiction: "Chatra & Ramgarh Farming Blocks",
    skill: "Soil Testing & Pest Early Detection",
    skillDomain: "Agriculture",
    workload: 35,
    slaRating: 91.8,
    activeCasesCount: 5,
    phone: "+91 94311 20105",
    email: "r.mahto.agri@jharkhand.gov.in",
    distance: 12,
    status: "AVAILABLE",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&fit=crop&crop=faces"
  },
  {
    id: "O-106",
    name: "Er. Vikas Anand",
    designation: "City Engineer / Municipal Commissioner",
    dept: "Urban Infra",
    departmentCode: "UDHD",
    district: "Bokaro",
    jurisdiction: "Bokaro Steel City Wards 1-14",
    skill: "Stormwater Drainage & Street Lighting Grids",
    skillDomain: "Urban Infra",
    workload: 78,
    slaRating: 84.1,
    activeCasesCount: 14,
    phone: "+91 94311 20106",
    email: "v.anand.udhd@jharkhand.gov.in",
    distance: 3,
    status: "AVAILABLE",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&fit=crop&crop=faces"
  },
  {
    id: "O-107",
    name: "Smt. Priyanka Kumari",
    designation: "District Social Welfare Officer",
    dept: "Accessibility",
    departmentCode: "WCD",
    district: "Gumla",
    jurisdiction: "Gumla, Khunti & Lohardaga Tribal Blocks",
    skill: "Divyangjan Universal Design & Welfare Disbursal",
    skillDomain: "Accessibility",
    workload: 29,
    slaRating: 95.3,
    activeCasesCount: 4,
    phone: "+91 94311 20107",
    email: "p.kumari.wcd@jharkhand.gov.in",
    distance: 9,
    status: "AVAILABLE",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=120&fit=crop&crop=faces"
  },
  {
    id: "O-108",
    name: "Sri Animesh Sengupta",
    designation: "Divisional Forest Officer (DFO)",
    dept: "Environment",
    departmentCode: "FOREST",
    district: "West Singhbhum",
    jurisdiction: "Saranda Forest & South Koel Basin",
    skill: "Forest Fire Modeling & Riverbank Stabilization",
    skillDomain: "Environment",
    workload: 67,
    slaRating: 90.2,
    activeCasesCount: 10,
    phone: "+91 94311 20108",
    email: "a.sengupta.forest@jharkhand.gov.in",
    distance: 14,
    status: "AVAILABLE",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&fit=crop&crop=faces"
  },
  {
    id: "O-109",
    name: "Sri Dilip Kumar Roy",
    designation: "District Supply Officer",
    dept: "Public Service",
    departmentCode: "FCS",
    district: "Giridih",
    jurisdiction: "Giridih & Dhanbad Ration Outlets",
    skill: "Aadhaar e-POS Sync & Supply Chain Audits",
    skillDomain: "Public Service",
    workload: 83,
    slaRating: 80.7,
    activeCasesCount: 15,
    phone: "+91 94311 20109",
    email: "dk.roy.fcs@jharkhand.gov.in",
    distance: 7,
    status: "AVAILABLE",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&fit=crop&crop=faces"
  },
  {
    id: "O-110",
    name: "Er. Sanjay K. Tirkey",
    designation: "Executive Engineer (Transmission)",
    dept: "Energy",
    departmentCode: "ENERGY",
    district: "Deoghar",
    jurisdiction: "Deoghar, Dumka & Santhal Grid",
    skill: "Rural Electrification & Solar Microgrids",
    skillDomain: "Urban Infra",
    workload: 48,
    slaRating: 88.0,
    activeCasesCount: 8,
    phone: "+91 94311 20110",
    email: "sk.tirkey.juvnl@jharkhand.gov.in",
    distance: 11,
    status: "AVAILABLE",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&fit=crop&crop=faces"
  }
];


// ============================================================================
// 5. 11 HIGHER EDUCATION INSTITUTIONS (HEIs) & UNIVERSITIES
// ============================================================================

export const UNIVERSITIES = UNIFIED_DATA.universities;


// ============================================================================
// 6. 8 INDUSTRY & CORPORATE CSR FOUNDATIONS
// ============================================================================

export const INDUSTRIES = UNIFIED_DATA.industryStartupNgoPartners;

export const SUBMITTER_TYPES = [
  "Individual",
  "Community Group",
  "Panchayati Raj Institution",
  "Urban Local Body",
  "Government Department"
];

export const STATUSES = [
  "NEW",
  "AI_ANALYZED",
  "VERIFICATION_PENDING",
  "VERIFIED",
  "ASSIGNED",
  "IN_PROGRESS",
  "RESOLUTION_SUBMITTED",
  "FIELD_AUDITED",
  "CITIZEN_VALIDATION_PENDING",
  "DISPUTED",
  "VERIFIED_CLOSED",
  "CLUSTERED_SYSTEMIC"
];

export const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "sat", label: "Santhali", native: "ᱥᱟᱱᱛᱟᱲᱤ" }
];


// ============================================================================
// 7. 28 REALISTIC CIVIC PROBLEM CASES (ALL 10 STATE PROGRESSION STATES)
// ============================================================================

export const SEED_PROBLEMS = UNIFIED_DATA.problems.map((p, index) => ({
    id: p.id,
    aliasId: "p" + index,
    title: p.title || p.description.substring(0, 50),
    description: p.description,
    category: p.domainAI || "Water",
    district: p.district || "Ranchi",
    location: p.district + " Area",
    lat: p.lat || 23.3300,
    lng: p.lng || 85.3300,
    submitter: { name: "Citizen", type: p.submitterType || "Individual Citizen", phone: "+91 94311 00101" },
    priority: "High",
    priorityScore: 92,
    aiConfidence: 94,
    severity: "Critical",
    status: p.status === 'university_assigned' ? 'ASSIGNED' : p.status === 'in_progress' ? 'IN_PROGRESS' : 'NEW',
    assignedOfficer: "O-101",
    assignedDept: p.linkedGovDeptId || "PHED",
    escalationLevel: 0,
    evidenceVerified: true,
    reportsCount: 1,
    upvotes: Math.floor(Math.random() * 50),
    reportedOn: p.reportedOn || "2026-08-18",
    clusterId: "CLUSTER-101",
    timeline: [
        { state: 'Citizen Reported', time: "10:00 AM", actor: 'Citizen', done: true }
    ],
    resolutionProof: null,
    citizenFeedback: null
}));


// ============================================================================
// 8. 5 SPATIAL & THEMATIC PROBLEM CLUSTERS (DBSCAN ENGINE OUTPUTS)
// ============================================================================

export const SEED_CLUSTERS = [
  {
    id: "CLUSTER-101",
    title: "Deep Aquifer Depletion & Arsenic/Fluoride Ingress",
    category: "Water",
    districts: ["Ranchi", "Palamu", "Garhwa"],
    centroidLat: 23.8500,
    centroidLng: 84.7500,
    radiusKm: 24.5,
    problemIds: ["JH-WAT-2026-04021", "NIR-2026-00011"],
    reportCount: 47,
    severity: "Critical",
    systemicScore: 94,
    status: "CONVERTED_TO_CHALLENGE",
    masterChallengeId: "MC-1024",
    rootCauseHypothesis: "Unregulated borewell extraction dropped deep groundwater table by 14m, drawing naturally occurring arsenic layers into potable aquifers.",
    recommendedIntervention: "Autonomous solar-powered adsorption filtration plants with live telemetry.",
    capexEst: 2500000,
    opexSaved3YrEst: 7200000
  },
  {
    id: "CLUSTER-102",
    title: "Monsoon Sub-Base Washout on Heavy Freight NH-33 Corridor",
    category: "Roads",
    districts: ["Godda", "Deoghar", "Dumka"],
    centroidLat: 24.6000,
    centroidLng: 87.0000,
    radiusKm: 38.0,
    problemIds: ["JH-EDU-2026-04022"],
    reportCount: 34,
    severity: "High",
    systemicScore: 88,
    status: "CONVERTED_TO_CHALLENGE",
    masterChallengeId: "MC-1025",
    rootCauseHypothesis: "Inadequate lateral stormwater culverts causing hydrostatic uplift beneath bituminous wear-course during heavy monsoon rain.",
    recommendedIntervention: "Geogrid-reinforced sub-base and smartphone vision early pothole radar.",
    capexEst: 1800000,
    opexSaved3YrEst: 4500000
  },
  {
    id: "CLUSTER-103",
    title: "School Hygiene Deficits & Waterless Bio-Digester Voids",
    category: "Sanitation",
    districts: ["Hazaribagh", "Garhwa", "Chatra"],
    centroidLat: 24.0500,
    centroidLng: 84.9500,
    radiusKm: 29.0,
    problemIds: ["JH-AGR-2026-04023", "NIR-2026-00019"],
    reportCount: 26,
    severity: "High",
    systemicScore: 91,
    status: "CONVERTED_TO_CHALLENGE",
    masterChallengeId: "MC-1026",
    rootCauseHypothesis: "Standard soak-pit toilets failed due to clayey impermeable soil; absence of continuous water connection led to abandonment.",
    recommendedIntervention: "Prefabricated modular bio-digesters with greywater recycling loops.",
    capexEst: 1500000,
    opexSaved3YrEst: 3900000
  },
  {
    id: "CLUSTER-104",
    title: "Industrial Leachate & Mining Slag Runoff in Damodar-Koel Basins",
    category: "Environment",
    districts: ["Dhanbad", "West Singhbhum", "Bokaro"],
    centroidLat: 23.1500,
    centroidLng: 85.7500,
    radiusKm: 48.0,
    problemIds: ["JH-URB-2026-04025", "NIR-2026-00012"],
    reportCount: 57,
    severity: "Critical",
    systemicScore: 96,
    status: "CONVERTED_TO_CHALLENGE",
    masterChallengeId: "MC-1027",
    rootCauseHypothesis: "Unlined open slag dumping grounds proximate to perennial river banks producing heavy metal acid drainage during peak monsoon runoff.",
    recommendedIntervention: "Microbial inoculant bioremediation barriers and silt filtration bunds.",
    capexEst: 3200000,
    opexSaved3YrEst: 9600000
  },
  {
    id: "CLUSTER-105",
    title: "Tribal Millet Value-Chain & Post-Harvest Processing Voids",
    category: "Agriculture",
    districts: ["Lohardaga", "Ramgarh", "Gumla"],
    centroidLat: 23.4000,
    centroidLng: 84.8500,
    radiusKm: 26.0,
    problemIds: ["JH-ENV-2026-04024", "NIR-2026-00023"],
    reportCount: 18,
    severity: "Medium",
    systemicScore: 79,
    status: "ANALYZED",
    masterChallengeId: null,
    rootCauseHypothesis: "Smallholder tribal farmers lack destoning and dehulling equipment, compelling distress raw grain sales to intermediaries at 40% value loss.",
    recommendedIntervention: "Decentralized micro-processing kiosks powered by mini-solar grids.",
    capexEst: 1100000,
    opexSaved3YrEst: 2800000
  }
];


// ============================================================================
// 9. 4 MASTER CHALLENGES WITH UNIVERSITY / CSR CO-FUNDING
// ============================================================================

export const SEED_CHALLENGES = [
  {
    id: "MC-1024",
    sourceClusterId: "CLUSTER-101",
    title: "Autonomous Solar RO Water Purification Units with Real-time TDS Telemetry",
    category: "Water",
    district: "Ranchi & Palamu",
    location: "Bundu & Hussainabad Blocks",
    lat: 23.3500,
    lng: 85.3200,
    priority: 94,
    linkedReports: 47,
    status: "OPEN_FOR_SOLUTIONS",
    fundingGoal: 2500000, // ₹25 Lakhs
    committedFunds: 1800000, // ₹18 Lakhs
    assignedUniversityId: "u9", // IIT ISM Dhanbad
    partnerIndustryId: "i1", // Tata Steel CSR
    proposalsCount: 3,
    tranches: [
      { id: "t1", title: "Tranche 1: Hydrogeological Survey & Lab Bench Prototype", amount: 600000, status: "DISBURSED" },
      { id: "t2", title: "Tranche 2: Field Pilot at 3 Contaminated Villages", amount: 1200000, status: "PLEDGED" },
      { id: "t3", title: "Tranche 3: Final Deployment & Telemetry Integration", amount: 700000, status: "PENDING" }
    ]
  },
  {
    id: "MC-1025",
    sourceClusterId: "CLUSTER-102",
    title: "Computer Vision Pothole Mapping & High-Durability Cold-Mix Asphalt",
    category: "Roads",
    district: "Godda & Deoghar",
    location: "NH-33 Godda Corridor",
    lat: 24.7500,
    lng: 87.1000,
    priority: 88,
    linkedReports: 34,
    status: "EVALUATING",
    fundingGoal: 1800000,
    committedFunds: 1800000,
    assignedUniversityId: "u2", // NIT Jamshedpur
    partnerIndustryId: "i2", // Jindal Steel Foundation
    proposalsCount: 4,
    tranches: [
      { id: "t1", title: "Tranche 1: Smartphone AI Training Dataset (500 km)", amount: 500000, status: "DISBURSED" },
      { id: "t2", title: "Tranche 2: Cold-mix Polymer Modified Asphalt Pilot", amount: 900000, status: "DISBURSED" },
      { id: "t3", title: "Tranche 3: NHAI Handover & Maintenance Dashboard", amount: 400000, status: "PLEDGED" }
    ]
  },
  {
    id: "MC-1026",
    sourceClusterId: "CLUSTER-103",
    title: "Modular Pre-cast Bio-Digester Sanitation Units for Rural Schools",
    category: "Sanitation",
    district: "Hazaribagh & Garhwa",
    location: "Simaria & Bardiha School Belts",
    lat: 24.0200,
    lng: 85.1500,
    priority: 91,
    linkedReports: 26,
    status: "PROJECT_AWARDED",
    fundingGoal: 1500000,
    committedFunds: 1500000,
    assignedUniversityId: "u3", // Ranchi University
    partnerIndustryId: "i3", // CCL CSR
    proposalsCount: 2,
    tranches: [
      { id: "t1", title: "Tranche 1: Architectural CAD & Inoculant Culture", amount: 400000, status: "DISBURSED" },
      { id: "t2", title: "Tranche 2: Pre-cast Mold Fabrication & Installation", amount: 800000, status: "DISBURSED" },
      { id: "t3", title: "Tranche 3: Student Hygiene Verification & Handover", amount: 300000, status: "DISBURSED" }
    ]
  },
  {
    id: "MC-1027",
    sourceClusterId: "CLUSTER-104",
    title: "Microbial Inoculant Bioremediation for Coal & Iron Slag Mining Leachate",
    category: "Environment",
    district: "Dhanbad & West Singhbhum",
    location: "Damodar Riverbank & Koel Tributary",
    lat: 23.3500,
    lng: 86.0500,
    priority: 96,
    linkedReports: 57,
    status: "OPEN_FOR_SOLUTIONS",
    fundingGoal: 3200000,
    committedFunds: 2400000,
    assignedUniversityId: "u7", // Kolhan University
    partnerIndustryId: "i4", // BCCL CSR
    proposalsCount: 5,
    tranches: [
      { id: "t1", title: "Tranche 1: Hydrological Sampling & Bacterial Isolation", amount: 800000, status: "DISBURSED" },
      { id: "t2", title: "Tranche 2: Bioreactor Construction at Topchanchi", amount: 1600000, status: "PLEDGED" },
      { id: "t3", title: "Tranche 3: Continuous Water Quality Sensor Stream", amount: 800000, status: "PENDING" }
    ]
  }
];

// ============================================================================
// 10. 7 SOLUTION PROJECTS (MILESTONES, TRANCHES, IP & IMPACT)
// ============================================================================

export const SEED_PROJECTS = UNIFIED_DATA.projects.map(p => ({
    id: p.id,
    problemId: p.problemId,
    title: p.title,
    university: p.universityId,
    industryPartner: p.industryPartnerId,
    status: "PROTOTYPING",
    fundingRequired: 500000,
    fundingCommitted: 500000,
    impactMetrics: { affectedPopulation: 500, scalabilityScore: 8 },
    sdgAlignment: ["SDG 6"]
}));


// ============================================================================
// 11. 5 PREDICTIVE RISK ALERTS (PREVENTIVE GOVERNANCE RADAR)
// ============================================================================

export const SEED_RISKS = [
  {
    id: "RISK-101",
    title: "Urban Inundation & Trunk Drain Siltation Hazard",
    type: "Urban Flooding",
    category: "Urban Infra",
    district: "Ranchi",
    location: "Lowland Wards 12, 14 & Namkum Culvert",
    lat: 23.3441,
    lng: 85.3096,
    radiusMeters: 1800,
    probability: 88,
    timeWindow: "< 7 Days",
    window: "2-3 Weeks",
    status: "ACTION_REQUIRED",
    severity: "Critical",
    affectedPopulation: 42000,
    contributingFactors: [
      "Met Office forecast of 145mm precipitation over 48 hours",
      "Namkum culvert siltation level estimated at 78% capacity",
      "14 citizen complaints of waterlogging logged in surrounding 1.2 km"
    ],
    recommendedAction: "Dispatch emergency excavator crew to clear trunk drain outlet.",
    preventiveOrderId: "PWO-501"
  },
  {
    id: "RISK-102",
    title: "Vector-Borne Dengue Surge in Unlined Industrial Pockets",
    type: "Dengue Outbreak",
    category: "Health",
    district: "Dhanbad",
    location: "BCCL Sector 4 & Katras Road Area",
    lat: 23.8100,
    lng: 86.4200,
    radiusMeters: 2500,
    probability: 76,
    timeWindow: "14 Days",
    window: "1 Month",
    status: "ACTION_REQUIRED",
    severity: "High",
    affectedPopulation: 28000,
    contributingFactors: [
      "Post-monsoon stagnant pools in abandoned open-cast quarries",
      "Ambient humidity above 82% accelerating mosquito breeding cycles",
      "PHC Chaibasa reporting 35% rise in undifferentiated febrile cases"
    ],
    recommendedAction: "Execute anti-larval fogging and chlorine distribution.",
    preventiveOrderId: "PWO-502"
  },
  {
    id: "RISK-103",
    title: "Dry Forest Canopy Fire Hazard along Rail Siding",
    type: "Forest Fire Risk",
    category: "Environment",
    district: "West Singhbhum",
    location: "Saranda Forest Sector 9 Rail Corridor",
    lat: 22.4000,
    lng: 85.7000,
    radiusMeters: 5000,
    probability: 68,
    timeWindow: "30 Days",
    window: "3-4 Weeks",
    status: "MONITORING",
    severity: "Medium",
    affectedPopulation: 6500,
    contributingFactors: [
      "Satellite dry vegetation index (NDVI) dropped 22% below seasonal mean",
      "Freight train brake sparking incidents recorded along siding",
      "Precipitation deficit of 42mm in August"
    ],
    recommendedAction: "Create 10-meter cleared firebreak lines along rail reserve.",
    preventiveOrderId: "PWO-503"
  },
  {
    id: "RISK-104",
    title: "Frost Hazard for Kharif/Rabi Transition Potato Crops",
    type: "Crop Frost Warning",
    category: "Agriculture",
    district: "Latehar",
    location: "Netarhat Plateau Fringe, Latehar",
    lat: 23.4800,
    lng: 84.2700,
    radiusMeters: 8000,
    probability: 62,
    timeWindow: "30 Days",
    window: "1 Month",
    status: "MONITORING",
    severity: "Medium",
    affectedPopulation: 14500,
    contributingFactors: [
      "IMD localized minimum temperature projection dipping to 4°C",
      "Late monsoon soil moisture depletion in upland sandy loam"
    ],
    recommendedAction: "Issue agricultural advisory for light evening furrow irrigation.",
    preventiveOrderId: null
  },
  {
    id: "RISK-105",
    title: "Structural Sub-base Scour on Subarnarekha River Bridge",
    type: "Bridge Scour Risk",
    category: "Roads",
    district: "East Singhbhum",
    location: "Old NH-33 Subarnarekha River Crossing",
    lat: 22.8200,
    lng: 86.2300,
    radiusMeters: 800,
    probability: 82,
    timeWindow: "< 7 Days",
    window: "Next 48 hrs",
    status: "ACTION_REQUIRED",
    severity: "Critical",
    affectedPopulation: 85000,
    contributingFactors: [
      "River discharge exceeded high water level by 1.1 meters",
      "Sonic echo-sounding indicated 1.8m bed scour near Pier 4",
      "Heavy commercial mineral freight traffic exceeding 40 tonnes"
    ],
    recommendedAction: "Deploy rip-rap boulder armouring around Pier 4 foundation.",
    preventiveOrderId: null
  }
];


// ============================================================================
// 12. 3 PREVENTIVE WORK ORDERS (FROM PREDICTIVE RISKS)
// ============================================================================

export const SEED_PREVENTIVE_ORDERS = [
  {
    id: "PWO-501",
    riskId: "RISK-101",
    title: "Emergency Desilting of Namkum Trunk Drainage Channel",
    department: "UDHD",
    departmentCode: "UDHD",
    assignedOfficerId: "O-106",
    assignedOfficerName: "Er. Vikas Anand",
    deadline: "2026-09-16 18:00",
    budgetAllocated: 150000, // ₹1.5 Lakhs
    status: "DISPATCHED",
    progress: 40,
    actionChecklist: [
      { step: "Deployment of 2 JCB excavators at Namkum outfall", completed: true },
      { step: "Clearing 450m culvert bottleneck", completed: true },
      { step: "Dumping silt to designated landfill", completed: false },
      { step: "Drone post-clearance cross-section verification", completed: false }
    ],
    completionReport: null
  },
  {
    id: "PWO-502",
    riskId: "RISK-102",
    title: "Targeted Anti-Larval Fogging & Chlorination in BCCL Sector 4",
    department: "HEALTH",
    departmentCode: "HEALTH",
    assignedOfficerId: "O-103",
    assignedOfficerName: "Dr. Sunita Soren",
    deadline: "2026-09-22 17:00",
    budgetAllocated: 85000,
    status: "PENDING",
    progress: 10,
    actionChecklist: [
      { step: "Issuance of 500 kg bleaching powder to ward teams", completed: true },
      { step: "Ultra-low-volume malathion fogging in quarry villages", completed: false },
      { step: "School water tank chlorination drive", completed: false }
    ],
    completionReport: null
  },
  {
    id: "PWO-503",
    riskId: "RISK-103",
    title: "Creation of 10m Firebreak Lines along Saranda Rail Reserve",
    department: "FOREST",
    departmentCode: "FOREST",
    assignedOfficerId: "O-108",
    assignedOfficerName: "Sri Animesh Sengupta",
    deadline: "2026-09-30 18:00",
    budgetAllocated: 220000,
    status: "DISPATCHED",
    progress: 65,
    actionChecklist: [
      { step: "Controlled brush clearance along 12 km railway siding", completed: true },
      { step: "Deployment of 4 local Van Samiti fire watch towers", completed: true },
      { step: "Thermal satellite telemetry test verification", completed: false }
    ],
    completionReport: null
  }
];


// ============================================================================
// 13. 4 INSTITUTIONAL KNOWLEDGE RECORDS (KNOWLEDGE REUSE ENGINE)
// ============================================================================

export const SEED_KNOWLEDGE_RECORDS = [
  {
    id: "KR-101",
    sourceProjectId: "PROJ-001",
    title: "Modular Pre-cast Bio-Toilet Retrofit for Rural Schools",
    domain: "Sanitation",
    district: "Hazaribagh",
    successRate: 98,
    timesReused: 12,
    problemBlueprint: "School attendance drop among adolescent girls caused by dilapidated, waterless soak-pit latrines in clayey soil zones.",
    solutionArchitecture: "Pre-cast RC cylindrical anaerobic bio-digester tank inoculated with DRDO microbial consortia, linked to 500L rooftop solar gravity-fed water tank.",
    implementationCostINR: 180000,
    costDisplay: "₹1.8L per 2-unit block",
    deploymentDurationDays: 14,
    impactMetrics: {
      girlsAttendanceIncreasePercent: 28,
      waterUsageReducedLpd: 450,
      maintenanceCostPerYearINR: 3500
    },
    reusableAssets: {
      cadBlueprints: "https://nirvaha.gov.in/assets/cad/bio_toilet_v2.dwg",
      billOfMaterials: "https://nirvaha.gov.in/assets/bom/bio_toilet_bom.xlsx",
      standardOperatingProcedure: "SOP-SAN-042: Monthly Inoculant Feeding & Siphon Flushing",
      testedContractors: ["Ranchi Precast Pvt Ltd", "Bokaro Modular Civil Fab"]
    },
    recommendedForKeywords: ["toilet", "school", "girls", "sanitation", "odf", "hygiene"]
  },
  {
    id: "KR-102",
    sourceProjectId: "PROJ-002",
    title: "3 kVA Rooftop Solar Micro-Grid with LiFePO4 for Anganwadi Centers",
    domain: "Education & Energy",
    district: "Dumka",
    successRate: 96,
    timesReused: 18,
    problemBlueprint: "6-8 hours daily rural power outages disrupting mid-day meal preparation and digital learning in remote preschool Anganwadis.",
    solutionArchitecture: "4x 540W Mono PERC solar panels coupled with 3 kVA MPPT hybrid inverter and 48V 100Ah LiFePO4 wall-mount battery with remote IoT telemetry.",
    implementationCostINR: 240000,
    costDisplay: "₹2.4L per center",
    deploymentDurationDays: 7,
    impactMetrics: {
      uptimePercent: 99.4,
      mealsServedOnTimePercent: 100,
      dieselAvoidedLitersPerYear: 780
    },
    reusableAssets: {
      electricalSchematics: "https://nirvaha.gov.in/assets/schematics/solar_microgrid_3kva.pdf",
      billOfMaterials: "https://nirvaha.gov.in/assets/bom/anganwadi_solar_bom.xlsx",
      standardOperatingProcedure: "SOP-ENG-019: Battery Health Telemetry & Panel Dusting Cycle",
      testedContractors: ["Jharkhand Solar Energy Corp", "Chotanagpur Green Tech"]
    },
    recommendedForKeywords: ["solar", "anganwadi", "electricity", "power cut", "mid-day meal", "energy"]
  },
  {
    id: "KR-103",
    sourceProjectId: "PROJ-004",
    title: "Smartphone Edge-AI Pothole & Road Roughness Profiling",
    domain: "Roads & Transport",
    district: "Godda",
    successRate: 91,
    timesReused: 7,
    problemBlueprint: "Delays of 45-60 days in detecting pavement sub-base deterioration on rural highways leading to fatal two-wheeler accidents.",
    solutionArchitecture: "YOLOv8 quantized model running locally on vehicle-mounted Android devices streaming GPS coordinates and pothole dimensions via lightweight MQTT.",
    implementationCostINR: 120000,
    costDisplay: "₹1.2L per district setup",
    deploymentDurationDays: 3,
    impactMetrics: {
      detectionAccuracyPercent: 92.4,
      inspectionCostReductionPercent: 68,
      speedOfRepairDays: 4
    },
    reusableAssets: {
      codeRepository: "https://github.com/nirvaha-gov/edge-pothole-vision",
      billOfMaterials: "Standard shock-absorbing motorcycle windshield clamp + OTG GPS",
      standardOperatingProcedure: "SOP-PWD-008: Pothole Priority Scoring & Contractor Auto-Dispatch",
      testedContractors: ["NIT Jamshedpur Innovation Hub", "Ranchi Analytics Labs"]
    },
    recommendedForKeywords: ["pothole", "nh-33", "road", "accident", "highway", "asphalt"]
  },
  {
    id: "KR-104",
    sourceProjectId: "PROJ-005",
    title: "SQLite Offline-First Cryptographic PDS Attendance & Grain Ledger",
    domain: "Public Service",
    district: "Dhanbad",
    successRate: 97,
    timesReused: 9,
    problemBlueprint: "Unstable cellular connectivity in mining belts causing 18-day PDS shop shutdowns and leaving vulnerable families without ration.",
    solutionArchitecture: "Progressive Web Application storing cryptographically signed offline quota tokens in SQLCipher with auto-reconciliation when 2G signal resumes.",
    implementationCostINR: 150000,
    costDisplay: "₹1.5L per block rollout",
    deploymentDurationDays: 10,
    impactMetrics: {
      transactionFailureRatePercent: 0.2,
      grainDisbursalOnTimePercent: 99.8,
      reconciliationLagHours: 1.2
    },
    reusableAssets: {
      codeRepository: "https://github.com/nirvaha-gov/pds-offline-sync",
      billOfMaterials: "OTG Biometric Sensor (STQC Certified) + Android 11+ Tablet",
      standardOperatingProcedure: "SOP-FCS-012: Offline Token Verification & End-of-Day Batch Push",
      testedContractors: ["BIT Mesra Software Incubator"]
    },
    recommendedForKeywords: ["ration", "pds", "aadhaar", "offline", "portal down", "food"]
  }
];


// ============================================================================
// 14. 10 REALISTIC AUDIT LOG ENTRIES (PROVENANCE & STATE PROGRESSION)
// ============================================================================

export const SEED_AUDIT_LOGS = [
  {
    id: "LOG-20260912-0001",
    timestamp: "2026-09-12T08:00:00.000Z",
    timeFormatted: "08:00:00 AM",
    actorId: "SYSTEM-CORE",
    actorName: "NIRVAHA System Core",
    actorRole: "system",
    actionType: "SYSTEM_INITIALIZED",
    entityType: "system",
    entityId: "NIR-SYS",
    details: "NIRVAHA Operations Engine initialized with 24 Jharkhand districts and 10 state departments.",
    status: "SUCCESS"
  },
  {
    id: "LOG-20260912-0002",
    timestamp: "2026-09-12T08:15:22.000Z",
    timeFormatted: "08:15:22 AM",
    actorId: "CITIZEN-0101",
    actorName: "Budhram Munda",
    actorRole: "citizen",
    actionType: "PROBLEM_SUBMITTED",
    entityType: "problem",
    entityId: "JH-WAT-2026-04021",
    details: "Citizen reported Handpump failure in Toli village (Bundu, Ranchi).",
    status: "SUCCESS"
  },
  {
    id: "LOG-20260912-0003",
    timestamp: "2026-09-12T08:16:04.000Z",
    timeFormatted: "08:16:04 AM",
    actorId: "AI-ENGINE",
    actorName: "NIRVAHA AI Classifier",
    actorRole: "system",
    actionType: "AI_TRIAGED",
    entityType: "problem",
    entityId: "JH-WAT-2026-04021",
    previousState: "NEW",
    newState: "VERIFICATION_PENDING",
    details: "Classified to Category: Water (PHED). Priority Score: 92/100 (Critical). Confidence: 94%.",
    status: "SUCCESS"
  },
  {
    id: "LOG-20260912-0004",
    timestamp: "2026-09-12T08:30:15.000Z",
    timeFormatted: "08:30:15 AM",
    actorId: "O-101",
    actorName: "Er. Rajeshwar Prasad",
    actorRole: "department_officer",
    actionType: "EVIDENCE_VERIFIED",
    entityType: "problem",
    entityId: "JH-WAT-2026-04021",
    previousState: "VERIFICATION_PENDING",
    newState: "VERIFIED",
    details: "Officer verified photographic evidence. Hydrogeological groundwater drop confirmed.",
    status: "SUCCESS"
  },
  {
    id: "LOG-20260912-0005",
    timestamp: "2026-09-12T08:45:00.000Z",
    timeFormatted: "08:45:00 AM",
    actorId: "DBSCAN-CLUSTERER",
    actorName: "Root Cause Engine",
    actorRole: "system",
    actionType: "PROBLEM_CLUSTERED",
    entityType: "cluster",
    entityId: "CLUSTER-101",
    previousState: "VERIFIED",
    newState: "CLUSTERED_SYSTEMIC",
    details: "JH-WAT-2026-04021 clustered into CLUSTER-101 (47 related complaints within 24.5 km).",
    status: "SUCCESS"
  },
  {
    id: "LOG-20260912-0006",
    timestamp: "2026-09-12T09:00:10.000Z",
    timeFormatted: "09:00:10 AM",
    actorId: "O-104",
    actorName: "Smt. Meenakshi Toppo",
    actorRole: "department_officer",
    actionType: "RESOLUTION_SUBMITTED",
    entityType: "problem",
    entityId: "JH-AGR-2026-04023",
    previousState: "IN_PROGRESS",
    newState: "RESOLUTION_SUBMITTED",
    details: "Resolution proof submitted for Simaria School bio-toilets with geotagged photo pair.",
    status: "SUCCESS"
  },
  {
    id: "LOG-20260912-0007",
    timestamp: "2026-09-12T09:30:45.000Z",
    timeFormatted: "09:30:45 AM",
    actorId: "INSP-402",
    actorName: "Sri K. Murmu (Field Inspector)",
    actorRole: "field_inspector",
    actionType: "FIELD_AUDIT_APPROVED",
    entityType: "problem",
    entityId: "JH-AGR-2026-04023",
    previousState: "RESOLUTION_SUBMITTED",
    newState: "CITIZEN_VALIDATION_PENDING",
    details: "Independent field audit verified bio-digester flow rate and hygiene checklist.",
    status: "SUCCESS"
  },
  {
    id: "LOG-20260912-0008",
    timestamp: "2026-09-12T10:15:30.000Z",
    timeFormatted: "10:15:30 AM",
    actorId: "CITIZEN-0103",
    actorName: "Headmaster D. Soren",
    actorRole: "citizen",
    actionType: "CITIZEN_CONFIRMED_RESOLUTION",
    entityType: "problem",
    entityId: "JH-AGR-2026-04023",
    previousState: "CITIZEN_VALIDATION_PENDING",
    newState: "VERIFIED_CLOSED",
    details: "Citizen validated resolution with 5/5 Star rating: 'Girls attendance restored to 100%'.",
    status: "SUCCESS"
  },
  {
    id: "LOG-20260912-0009",
    timestamp: "2026-09-12T10:45:12.000Z",
    timeFormatted: "10:45:12 AM",
    actorId: "CITIZEN-0108",
    actorName: "Bokaro Citizen Forum",
    actorRole: "citizen",
    actionType: "CITIZEN_DISPUTED_RESOLUTION",
    entityType: "problem",
    entityId: "NIR-2026-00008",
    previousState: "RESOLUTION_SUBMITTED",
    newState: "DISPUTED",
    details: "Citizen disputed resolution: 'Only 3 bulbs replaced in Sector 1. Sectors 4 and 5A pitch dark.'",
    status: "ESCALATION"
  },
  {
    id: "LOG-20260912-0010",
    timestamp: "2026-09-12T11:00:00.000Z",
    timeFormatted: "11:00:00 AM",
    actorId: "PREDICTIVE-RADAR",
    actorName: "Early Warning Risk Radar",
    actorRole: "system",
    actionType: "PREVENTIVE_ORDER_DISPATCHED",
    entityType: "risk",
    entityId: "RISK-101",
    details: "Predicted urban flood in Namkum Lowland Wards (88% prob). Dispatched PWO-501 to Er. Vikas Anand.",
    status: "WARNING"
  }
];


// ============================================================================
// 15. 8 IN-APP NOTIFICATIONS ACROSS ALL 6 ROLES
// ============================================================================

export const SEED_NOTIFICATIONS = [
  {
    id: "NOTIF-01",
    toRole: "citizen",
    recipientName: "Budhram Munda",
    title: "Cluster Formed for Your Report",
    message: "Your report 'Handpump failure in Toli village' was aggregated into Master Challenge MC-1024 with IIT ISM Dhanbad.",
    time: "25m ago",
    unread: true,
    severity: "info",
    linkTarget: "JH-WAT-2026-04021"
  },
  {
    id: "NOTIF-02",
    toRole: "citizen",
    recipientName: "Warden S. Toppo",
    title: "Action Required: Confirm Resolution",
    message: "PHED has installed the 250 LPH RO water plant at KGBV Khunti. Please verify and submit your rating.",
    time: "1h ago",
    unread: true,
    severity: "urgent",
    linkTarget: "NIR-2026-00015"
  },
  {
    id: "NOTIF-03",
    toRole: "department_officer",
    recipientName: "Er. Rajeshwar Prasad",
    title: "High Priority Case Assigned",
    message: "Arsenic contamination suspected in shallow wells of Palamu (NIR-2026-00011). Response SLA: 24 hours.",
    time: "2h ago",
    unread: true,
    severity: "urgent",
    linkTarget: "NIR-2026-00011"
  },
  {
    id: "NOTIF-04",
    toRole: "district_magistrate",
    recipientName: "District Magistrate Bokaro",
    title: "Case Disputed — L2 Escalation",
    message: "Streetlight outage case NIR-2026-00008 disputed by Bokaro Citizen Forum. Review required.",
    time: "3h ago",
    unread: true,
    severity: "warning",
    linkTarget: "NIR-2026-00008"
  },
  {
    id: "NOTIF-05",
    toRole: "field_inspector",
    recipientName: "Sri K. Murmu",
    title: "Physical Audit Assigned",
    message: "Audit inspection request assigned for PDS offline app deployment in Giridih (NIR-2026-00026).",
    time: "4h ago",
    unread: false,
    severity: "info",
    linkTarget: "NIR-2026-00026"
  },
  {
    id: "NOTIF-06",
    toRole: "partner_csr",
    recipientName: "Tata Steel CSR",
    title: "Milestone Verified — Tranche Released",
    message: "Milestone 2 verified for project PROJ-001 (Bio-toilet retrofit). ₹45,000 released from escrow.",
    time: "1d ago",
    unread: false,
    severity: "success",
    linkTarget: "PROJ-001"
  },
  {
    id: "NOTIF-07",
    toRole: "knowledge_officer",
    recipientName: "Knowledge Secretariat",
    title: "New Knowledge Record Generated",
    message: "Project PROJ-002 (Solar Micro-grid Anganwadi) successfully archived as KR-102 with 96% success rating.",
    time: "2d ago",
    unread: false,
    severity: "success",
    linkTarget: "KR-102"
  },
  {
    id: "NOTIF-08",
    toRole: "department_officer",
    recipientName: "Er. Vikas Anand",
    title: "Predictive Early Warning PWO-501",
    message: "Urban flood probability 88% in Namkum lowland wards. PWO-501 issued with ₹1.5L emergency budget.",
    time: "3h ago",
    unread: true,
    severity: "warning",
    linkTarget: "PWO-501"
  }
];


// ============================================================================
// 16. INITIAL SYSTEM STATS & KPI TELEMETRY
// ============================================================================

export const INITIAL_STATS = {
  totalProblems: 12482,
  critical: 326,
  pending: 1842,
  aiPredicted: 27,
  slaAtRisk: 84,
  escalated: 31,
  verificationRate: 94.8,
  firstResponseRate: 91.2,
  slaCompliance: 87.4,
  resolutionRate: 82.6,
  satisfaction: 4.2,
  reopenedCases: 6.8,
  departments: [
    { name: "Drinking Water (PHED)", code: "PHED", cases: 1284, onTime: 84, sla: 88.4, sat: 4.1 },
    { name: "Roads & Transport (PWD)", code: "PWD", cases: 1017, onTime: 79, sla: 81.2, sat: 3.8 },
    { name: "Health & Clinics", code: "HEALTH", cases: 812, onTime: 93, sla: 94.7, sat: 4.5 },
    { name: "School Education", code: "EDU", cases: 628, onTime: 89, sla: 89.6, sat: 4.3 },
    { name: "Urban Infrastructure (UDHD)", code: "UDHD", cases: 741, onTime: 86, sla: 86.8, sat: 4.0 },
    { name: "Energy & Electricity (JUVNL)", code: "ENERGY", cases: 942, onTime: 82, sla: 82.3, sat: 3.9 }
  ],
  slaControl: {
    onTrack: 1421,
    atRisk: 84,
    breached: 22,
    extended: 17
  },
  pipeline: {
    clusters: 47,
    reviewed: 32,
    master: 18,
    open: 11,
    projects: 7,
    pilots: 4,
    deployed: 2
  }
};


