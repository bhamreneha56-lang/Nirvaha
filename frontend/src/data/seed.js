import UNIFIED_DATA from './unified_dataset.json';

export const DISTRICTS = [
  "Ranchi","Jamshedpur (East Singhbhum)","Dhanbad","Bokaro","Hazaribagh",
  "Giridih","Deoghar","Dumka","Godda","Sahebganj","Pakur","Latehar",
  "Lohardaga","Gumla","Simdega","West Singhbhum","Khunti","Ramgarh",
  "Koderma","Chatra","Palamu","Garhwa","Saraikela-Kharsawan","Shivpur (Nawadih)"
];

export const CATEGORIES = [
  { key:"Water Resources", icon:"💧", color:"#0ea5e9" },
  { key:"Education", icon:"📚", color:"#f59e0b" },
  { key:"Agriculture", icon:"🌾", color:"#84cc16" },
  { key:"Environment", icon:"🌳", color:"#16a34a" },
  { key:"Urban Infrastructure", icon:"🏢", color:"#475569" },
  { key:"Sanitation", icon:"🚽", color:"#8b5cf6" },
  { key:"Healthcare", icon:"🏥", color:"#ef4444" },
  { key:"Energy", icon:"⚡", color:"#eab308" },
  { key:"Rural Livelihoods", icon:"🚜", color:"#d97706" },
  { key:"Public Administration", icon:"🏛️", color:"#b45309" },
];

export const catMeta = (key) => CATEGORIES.find(c => c.key === key) || CATEGORIES[9];

export const UNIVERSITIES = UNIFIED_DATA.universities;
export const INDUSTRIES = UNIFIED_DATA.industryStartupNgoPartners;

export const STATUSES = ["Submitted","Under Review","Routed to University","In Progress","Resolved"];
export const SUBMITTER_TYPES = ["Individual Citizen","Community Group","NGO / Community Organisation","PRI Representative","ULB Representative","Government Agency"];
export const LANGUAGES = [
  { code:"en", label:"English",  native:"English" },
  { code:"hi", label:"Hindi",    native:"हिन्दी" },
  { code:"sat",label:"Santhali", native:"ᱥᱟᱱᱛᱟᱲᱤ" },
];

export const SEED_PROBLEMS = UNIFIED_DATA.problems.map(p => ({
  id: p.id,
  title: p.title || p.description.substring(0, 50) + "...",
  description: p.description,
  category: p.domainAI,
  district: p.district,
  submitter: p.submitterType,
  status: p.status === "university_assigned" ? "Routed to University" : 
          p.status === "in_progress" ? "In Progress" : 
          p.status === "submitted" ? "Submitted" : "Under Review",
  reportedOn: p.reportedOn || "2026-08-01",
  upvotes: Math.floor(Math.random() * 50)
}));

export const SEED_PROJECTS = UNIFIED_DATA.projects.map(p => ({
  id: p.id,
  problemId: p.problemId,
  universityId: p.universityId,
  industryId: p.industryPartnerId,
  title: p.title,
  status: p.status === "prototyping" ? "In Progress" : "Done",
  funding: { ask: p.fundingCommitted, pledged: p.fundingCommitted, released: p.fundingDisbursed },
  team: { faculty: "Faculty", students: ["Student A", "Student B"] }
}));

export const SEED_NOTIFICATIONS = [
  { id:"n1", to:"citizen",    forUser:"You", text:"Your report was routed to " + (UNIVERSITIES[0]?.name || "University") + ".", time:"2h ago", unread:true },
  { id:"n3", to:"university", forUser:"BIT Mesra", text:"New problem assigned. Response SLA: 5 days.", time:"1d ago", unread:true },
  { id:"n4", to:"industry",   forUser:"TataTech Rural Innovations", text:"Your commitment released on milestone verification.", time:"3d ago", unread:false },
  { id:"n5", to:"government", forUser:"Secretary", text:"Weekly summary: 47 new submissions, 12 routed, 3 resolved. Top district: Ranchi.", time:"6h ago", unread:true },
];
