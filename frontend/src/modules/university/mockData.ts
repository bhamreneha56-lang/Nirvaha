// TODO: replace all static data with real API calls

export const university = {
  id: "u_bit_mesra",
  name: "Birla Institute of Technology, Mesra",
  shortName: "BIT Mesra",
  logo: "BIT",
  district: "Ranchi",
  state: "Jharkhand",
  established: 1986,
  type: "Deemed University",
  verified: true,
  rating: 4.6,
  ratingBreakdown: { timeliness: 4.8, solutionQuality: 4.5, communication: 4.3, communityImpact: 4.7 },
  activeProjects: 6,
  problemsCompleted: 23,
  successRate: 87,
  departments: ["Computer Science & Engineering","Electronics & Communication","Civil Engineering","Mechanical Engineering","Environmental Science","Biotechnology","Information Technology","Electrical Engineering","Chemical Engineering","Applied Mathematics"],
  labs: ["Advanced Computing Lab","Water Testing & Analysis Lab","Structural Engineering Lab","GIS & Remote Sensing Lab","IoT & Embedded Systems Lab","Environmental Monitoring Lab","Robotics & Automation Lab","Biotechnology Research Lab"],
  incubationFacilities: ["BIT Mesra Technology Incubation Centre","Startup Innovation Hub","TIDE 2.0 Incubator"],
  researchCentres: ["Centre for Advanced Manufacturing","Centre for Renewable Energy","Centre for Water Resource Management","AI & Data Science Centre"],
  badges: ["5 Projects Deployed","NEP 2020 Compliant","Top 10 in Ranchi District","Industry Partner Excellence","AI Innovation Award 2025","Green Campus Certified"],
  pendingProposals: 3,
};

export type Priority = "Critical" | "High" | "Medium" | "Low";
export type ProblemStatus = "Submitted" | "AI Processed" | "Govt Verified" | "University Assigned" | "In Progress" | "Piloted" | "Deployed";

export interface Problem {
  id: string; title: string; domain: string; subdomain: string; district: string;
  priority: Priority; status: ProblemStatus; description: string;
  affectedPopulation: number; durationExisting: string; priorAttempts: string;
  communityConfirmations: number; postedDate: string; deadline: string;
  requiredExpertise: string[]; recommendedTeamSize: number; labRequirements: { name: string; available: boolean }[];
  fundingAvailable: string; aiMatchScore: number; aiSuccessChance: number;
  aiReasons: string[]; aiDomainSuccessRate: number; stateAvgSuccessRate: number;
  similarProjects: { title: string; outcome: "Successful" | "Discontinued"; university: string }[];
  location: string; village: string;
}

export const problems: any[] = [
  {
    "id": "JH-WAT-2026-04021",
    "title": "Hand pump near the primary school has been dry for",
    "domain": "Water Resources",
    "subdomain": "",
    "district": "Ranchi",
    "priority": "High",
    "status": "university_assigned",
    "description": "Hand pump near the primary school has been dry for 3 months, women and children walking 2km daily for water.",
    "affectedPopulation": 0,
    "durationExisting": "",
    "priorAttempts": "",
    "communityConfirmations": 0,
    "postedDate": "",
    "deadline": "",
    "requiredExpertise": [],
    "recommendedTeamSize": 5,
    "labRequirements": [],
    "fundingAvailable": "",
    "aiMatchScore": 85,
    "aiSuccessChance": 80,
    "aiReasons": [],
    "aiDomainSuccessRate": 70,
    "stateAvgSuccessRate": 60,
    "similarProjects": [],
    "location": "",
    "village": ""
  },
  {
    "id": "JH-EDU-2026-04022",
    "title": "Government middle school has no functional science",
    "domain": "Education",
    "subdomain": "",
    "district": "Ranchi",
    "priority": "High",
    "status": "gov_verified",
    "description": "Government middle school has no functional science lab; students cannot do practicals for board prep.",
    "affectedPopulation": 0,
    "durationExisting": "",
    "priorAttempts": "",
    "communityConfirmations": 0,
    "postedDate": "",
    "deadline": "",
    "requiredExpertise": [],
    "recommendedTeamSize": 5,
    "labRequirements": [],
    "fundingAvailable": "",
    "aiMatchScore": 85,
    "aiSuccessChance": 80,
    "aiReasons": [],
    "aiDomainSuccessRate": 70,
    "stateAvgSuccessRate": 60,
    "similarProjects": [],
    "location": "",
    "village": ""
  },
  {
    "id": "JH-AGR-2026-04023",
    "title": "Paddy crops damaged repeatedly by wild elephant he",
    "domain": "Agriculture",
    "subdomain": "",
    "district": "Dumka",
    "priority": "High",
    "status": "in_progress",
    "description": "Paddy crops damaged repeatedly by wild elephant herds crossing from the forest, no early warning system exists.",
    "affectedPopulation": 0,
    "durationExisting": "",
    "priorAttempts": "",
    "communityConfirmations": 0,
    "postedDate": "",
    "deadline": "",
    "requiredExpertise": [],
    "recommendedTeamSize": 5,
    "labRequirements": [],
    "fundingAvailable": "",
    "aiMatchScore": 85,
    "aiSuccessChance": 80,
    "aiReasons": [],
    "aiDomainSuccessRate": 70,
    "stateAvgSuccessRate": 60,
    "similarProjects": [],
    "location": "",
    "village": ""
  },
  {
    "id": "JH-ENV-2026-04024",
    "title": "Untreated dyeing-unit wastewater is being released",
    "domain": "Environment",
    "subdomain": "",
    "district": "Gumla",
    "priority": "High",
    "status": "ai_processed",
    "description": "Untreated dyeing-unit wastewater is being released into the local stream, contaminating irrigation water downstream.",
    "affectedPopulation": 0,
    "durationExisting": "",
    "priorAttempts": "",
    "communityConfirmations": 0,
    "postedDate": "",
    "deadline": "",
    "requiredExpertise": [],
    "recommendedTeamSize": 5,
    "labRequirements": [],
    "fundingAvailable": "",
    "aiMatchScore": 85,
    "aiSuccessChance": 80,
    "aiReasons": [],
    "aiDomainSuccessRate": 70,
    "stateAvgSuccessRate": 60,
    "similarProjects": [],
    "location": "",
    "village": ""
  },
  {
    "id": "JH-URB-2026-04025",
    "title": "Waterlogging on Station Road every monsoon due to ",
    "domain": "Urban Infrastructure",
    "subdomain": "",
    "district": "Deoghar",
    "priority": "High",
    "status": "submitted",
    "description": "Waterlogging on Station Road every monsoon due to blocked and undersized stormwater drains.",
    "affectedPopulation": 0,
    "durationExisting": "",
    "priorAttempts": "",
    "communityConfirmations": 0,
    "postedDate": "",
    "deadline": "",
    "requiredExpertise": [],
    "recommendedTeamSize": 5,
    "labRequirements": [],
    "fundingAvailable": "",
    "aiMatchScore": 85,
    "aiSuccessChance": 80,
    "aiReasons": [],
    "aiDomainSuccessRate": 70,
    "stateAvgSuccessRate": 60,
    "similarProjects": [],
    "location": "",
    "village": ""
  }
];


export const faculty = [
  { id: "f1", name: "Dr. Rajan Sharma", department: "Civil Engineering", expertise: ["Water Resources","Structural Analysis","GIS Mapping","Environmental Engineering"], projects: 8, hoursMentoorange: 340, outcomes: "7 Successful, 1 Discontinued" },
  { id: "f2", name: "Prof. Anjali Mishra", department: "Environmental Science", expertise: ["Water Quality","Air Pollution","Waste Management","Remote Sensing"], projects: 6, hoursMentoorange: 280, outcomes: "6 Successful" },
  { id: "f3", name: "Dr. Suresh Kumar Patel", department: "Electronics & Communication", expertise: ["IoT Systems","Sensor Networks","Embedded Systems","Signal Processing"], projects: 9, hoursMentoorange: 420, outcomes: "8 Successful, 1 Discontinued" },
  { id: "f4", name: "Prof. Priya Nair", department: "Computer Science & Engineering", expertise: ["Mobile App Development","Offline-First Systems","AI/ML","NLP"], projects: 11, hoursMentoorange: 510, outcomes: "10 Successful, 1 In-Progress" },
  { id: "f5", name: "Dr. Amit Verma", department: "Electrical Engineering", expertise: ["Solar Power Systems","Smart Grids","Power Electronics","Renewable Energy"], projects: 5, hoursMentoorange: 210, outcomes: "5 Successful" },
  { id: "f6", name: "Prof. Kavitha Reddy", department: "Computer Science & Engineering", expertise: ["Data Analytics","Dashboard Development","Cloud Computing","React.js"], projects: 7, hoursMentoorange: 310, outcomes: "7 Successful" },
  { id: "f7", name: "Dr. Mohan Oraon", department: "Environmental Science", expertise: ["Tribal Ecology","Biodiversity","Forest Management","Community Engagement"], projects: 4, hoursMentoorange: 190, outcomes: "4 Successful" },
  { id: "f8", name: "Prof. Deepak Singh", department: "Mechanical Engineering", expertise: ["Manufacturing","Fabrication","Product Design","Materials Science"], projects: 3, hoursMentoorange: 140, outcomes: "2 Successful, 1 In-Progress" },
];

export const students = [
  { id: "s1", name: "Arjun Toppo", discipline: "Computer Science & Engineering", skills: ["React","Node.js","Python","ML"], year: 3 },
  { id: "s2", name: "Priya Hembram", discipline: "Electronics & Communication", skills: ["Arduino","Raspberry Pi","PCB Design","IoT"], year: 4 },
  { id: "s3", name: "Rohit Mahato", discipline: "Civil Engineering", skills: ["AutoCAD","STAAD Pro","GIS","Surveying"], year: 4 },
  { id: "s4", name: "Sunita Oraon", discipline: "Environmental Science", skills: ["Water Analysis","Air Quality Testing","GIS","Field Survey"], year: 3 },
  { id: "s5", name: "Vikram Soren", discipline: "Computer Science & Engineering", skills: ["Flutter","Firebase","React Native","SQL"], year: 3 },
  { id: "s6", name: "Anita Munda", discipline: "Electrical Engineering", skills: ["Solar Panel Design","Circuit Analysis","MATLAB","PLC"], year: 4 },
  { id: "s7", name: "Deepak Birua", discipline: "Electronics & Communication", skills: ["Sensor Integration","FPGA","Signal Processing","Python"], year: 4 },
  { id: "s8", name: "Kavita Besra", discipline: "Computer Science & Engineering", skills: ["Data Analytics","Tableau","Python","SQL"], year: 2 },
  { id: "s9", name: "Rajan Kisku", discipline: "Civil Engineering", skills: ["Structural Design","Hydraulics","REVIT","Project Management"], year: 4 },
  { id: "s10", name: "Meena Hansda", discipline: "Environmental Science", skills: ["Lab Analysis","Field Work","Report Writing","GIS"], year: 3 },
  { id: "s11", name: "Aakash Kumar", discipline: "Mechanical Engineering", skills: ["CAD","3D Printing","Welding","Fabrication"], year: 4 },
  { id: "s12", name: "Neha Tudu", discipline: "Computer Science & Engineering", skills: ["NLP","Python","Linguistics","Web Dev"], year: 3 },
  { id: "s13", name: "Sunil Marandi", discipline: "Electronics & Communication", skills: ["Embedded C","Microcontrollers","Wireless Comms","Power Electronics"], year: 3 },
  { id: "s14", name: "Poonam Gope", discipline: "Civil Engineering", skills: ["Soil Testing","Water Sampling","Field Survey","Report Writing"], year: 4 },
  { id: "s15", name: "Rahul Minz", discipline: "Computer Science & Engineering", skills: ["React","TypeScript","UI/UX Design","REST APIs"], year: 2 },
];

export const projects = [
  { id: "pr1", title: "Bokaro Industrial Pollution Sensor Network", problemId: "JH-AIR-2025-03002", stage: "Deployed", team: ["f3","f2","s2","s7","s4"], industryPartner: "Hindalco Industries", nextMilestone: "Final Report", daysUntilMilestone: -5, atRisk: false, fundingTotal: 2200000, fundingReceived: 2200000 },
  { id: "pr2", title: "Ranchi Gram Panchayat Digital Portal", problemId: "JH-EGV-2025-12001", stage: "Deployed", team: ["f4","f6","s1","s5","s15"], industryPartner: null, nextMilestone: "Impact Assessment", daysUntilMilestone: 12, atRisk: false, fundingTotal: 900000, fundingReceived: 900000 },
  { id: "pr3", title: "Subarnarekha Flood Early Warning System", problemId: "JH-FLD-2026-09011", stage: "Prototyping", team: ["f1","f3","f2","s2","s3","s7","s9"], industryPartner: "NTPC Foundation", nextMilestone: "Hardware Integration", daysUntilMilestone: 8, atRisk: false, fundingTotal: 3500000, fundingReceived: 2100000 },
  { id: "pr4", title: "Khunti Solar Micro-Grid", problemId: "JH-SOL-2026-02088", stage: "Testing", team: ["f5","f3","s6","s13","s2"], industryPartner: "NTPC Foundation", nextMilestone: "Load Test", daysUntilMilestone: -3, atRisk: true, fundingTotal: 2500000, fundingReceived: 1800000 },
  { id: "pr5", title: "Murhu Telemedicine Kiosk", problemId: "JH-HLT-2026-06078", stage: "Pilot", team: ["f4","f3","s1","s2","s5"], industryPartner: "Tata Trusts", nextMilestone: "User Training", daysUntilMilestone: 15, atRisk: false, fundingTotal: 2000000, fundingReceived: 1500000 },
  { id: "pr6", title: "Dumka Teacher Digital Training App", problemId: "JH-DIG-2026-05034", stage: "Approved", team: ["f4","f6","s1","s8","s12"], industryPartner: null, nextMilestone: "Curriculum Design", daysUntilMilestone: 6, atRisk: false, fundingTotal: 800000, fundingReceived: 400000 },
];

export const domainPerformance = [
  { domain: "Water Resources", successRate: 85, projects: 5, stateAvg: 61 },
  { domain: "E-Governance", successRate: 95, projects: 4, stateAvg: 70 },
  { domain: "Air Quality", successRate: 83, projects: 3, stateAvg: 55 },
  { domain: "Solar Energy", successRate: 79, projects: 4, stateAvg: 64 },
  { domain: "Flood Management", successRate: 90, projects: 2, stateAvg: 62 },
  { domain: "Digital Literacy", successRate: 91, projects: 2, stateAvg: 67 },
  { domain: "Waste Management", successRate: 74, projects: 3, stateAvg: 60 },
  { domain: "Agricultural Tech", successRate: 80, projects: 2, stateAvg: 59 },
  { domain: "Healthcare Access", successRate: 65, projects: 1, stateAvg: 52 },
];

export const quarterlyData = [
  { quarter: "Q1 2025", accepted: 3, completed: 2 },
  { quarter: "Q2 2025", accepted: 4, completed: 3 },
  { quarter: "Q3 2025", accepted: 5, completed: 4 },
  { quarter: "Q4 2025", accepted: 4, completed: 4 },
  { quarter: "Q1 2026", accepted: 6, completed: 3 },
];

export const fundingData = [
  { quarter: "Q1 2025", amount: 1200000 },
  { quarter: "Q2 2025", amount: 1800000 },
  { quarter: "Q3 2025", amount: 2400000 },
  { quarter: "Q4 2025", amount: 2100000 },
  { quarter: "Q1 2026", amount: 3500000 },
];

export const disciplineCombo = [
  { name: "CS+ECE", value: 35, successRate: 91 },
  { name: "Civil+Env", value: 25, successRate: 85 },
  { name: "CS+Civil+ECE", value: 20, successRate: 88 },
  { name: "Elec+CS", value: 12, successRate: 79 },
  { name: "Others", value: 8, successRate: 62 },
];

export const activityFeed = [
  { id: "a1", type: "ai_match", text: "AI matched you to 'Flood Early Warning – Subarnarekha Basin' with 96% match score", time: "2 hours ago", icon: "🤖" },
  { id: "a2", type: "status", text: "Project 'Murhu Telemedicine Kiosk' moved to Pilot stage", time: "5 hours ago", icon: "🚀" },
  { id: "a3", type: "funding", text: "₹7L funding disbursed for Khunti Solar Micro-Grid from NTPC Foundation", time: "1 day ago", icon: "💰" },
  { id: "a4", type: "proposal", text: "Your proposal for 'Dumka Teacher Digital Training App' was approved by DoTE Jharkhand", time: "2 days ago", icon: "✅" },
  { id: "a5", type: "notification", text: "New comment from Ramgarh District Collector on 'Groundwater Contamination' problem", time: "2 days ago", icon: "💬" },
  { id: "a6", type: "ai_match", text: "AI identified 3 new problems matching your department strengths this week", time: "3 days ago", icon: "🤖" },
];

export const successSparkline = [12, 14, 15, 17, 18, 20, 21, 23];

export const STAGE_ORDER = ["Proposal","Approved","Prototyping","Testing","Pilot","Deployed"] as const;
export type Stage = typeof STAGE_ORDER[number];

export const PROBLEM_STATUSES: ProblemStatus[] = ["Submitted","AI Processed","Govt Verified","University Assigned","In Progress","Piloted","Deployed"];

export function getSuccessColor(score: number): string {
  if (score >= 70) return "text-green-600";
  if (score >= 40) return "text-orange-500";
  return "text-orange-500";
}
export function getSuccessBg(score: number): string {
  if (score >= 70) return "bg-green-100 text-green-700 border-green-200";
  if (score >= 40) return "bg-orange-100 text-orange-700 border-orange-200";
  return "bg-orange-100 text-orange-700 border-orange-200";
}
export function getPriorityColor(p: Priority): string {
  const map: Record<Priority,string> = { Critical:"bg-orange-100 text-orange-700 border-orange-300", High:"bg-orange-100 text-orange-700 border-orange-300", Medium:"bg-yellow-100 text-yellow-700 border-yellow-300", Low:"bg-green-100 text-green-700 border-green-300" };
  return map[p];
}
export function getStageColor(stage: string): string {
  const map: Record<string,string> = { Proposal:"bg-white text-black", Approved:"bg-blue-100 text-blue-700", Prototyping:"bg-violet-100 text-violet-700", Testing:"bg-orange-100 text-orange-700", Pilot:"bg-orange-100 text-orange-700", Deployed:"bg-green-100 text-green-700" };
  return map[stage] || "bg-white text-black";
}
