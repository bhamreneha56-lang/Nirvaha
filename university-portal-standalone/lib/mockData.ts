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

export const problems: Problem[] = [
  {
    id: "JH-WAT-2026-04021", title: "Groundwater Contamination in Ramgarh Villages", domain: "Water Resources", subdomain: "Groundwater Quality",
    district: "Ramgarh", priority: "Critical", status: "Govt Verified",
    description: "Severe arsenic and fluoride contamination detected in 14 villages across Ramgarh district. Over 8,000 residents rely on these wells as primary water sources. Multiple children have shown symptoms of fluorosis. The contamination has been traced to industrial effluent seepage from nearby coal washeries. Immediate testing, filtration design, and community-scale water treatment solutions are urgently required.",
    affectedPopulation: 8200, durationExisting: "3 years", priorAttempts: "Manual filtration attempted by NGO in 2024 — failed at scale",
    communityConfirmations: 342, postedDate: "2026-01-15", deadline: "2026-04-30",
    requiredExpertise: ["Civil Engineering","Environmental Science","Chemical Engineering","Community Health"],
    recommendedTeamSize: 6,
    labRequirements: [{ name: "Water Testing & Analysis Lab", available: true },{ name: "GIS & Remote Sensing Lab", available: true },{ name: "Chemical Analysis Equipment", available: true },{ name: "Mobile Testing Kit", available: false }],
    fundingAvailable: "₹18L — Jharkhand Jal Mission + Tata Steel CSR interest",
    aiMatchScore: 94, aiSuccessChance: 88,
    aiReasons: ["Matches your Civil & Environmental dept strength","Similar to 3 water projects you completed successfully","Water Testing Lab available on campus","Strong faculty expertise in environmental chemistry"],
    aiDomainSuccessRate: 85, stateAvgSuccessRate: 61,
    similarProjects: [{ title: "Boron Removal in Dhanbad Wells", outcome: "Successful", university: "BIT Mesra" },{ title: "Fluoride Filter Design – Hazaribagh", outcome: "Successful", university: "NIT Jamshedpur" }],
    location: "Ramgarh District", village: "Barkatha cluster",
  },
  {
    id: "JH-ROA-2026-07143", title: "Rural Road Erosion — Monsoon Damage Mapping", domain: "Road Infrastructure", subdomain: "Road Repair & Mapping",
    district: "Giridih", priority: "High", status: "AI Processed",
    description: "Over 47 km of rural roads in Giridih district suffer severe erosion damage after each monsoon, cutting off 22 villages from markets and hospitals for 3-4 months annually. Manual surveys are slow and inaccurate. A GIS-based damage assessment and prioritisation system with drone mapping is needed to direct repair budgets effectively.",
    affectedPopulation: 15000, durationExisting: "5 years", priorAttempts: "Manual PWD survey 2023 — took 4 months, low accuracy",
    communityConfirmations: 156, postedDate: "2026-02-03", deadline: "2026-05-15",
    requiredExpertise: ["Civil Engineering","GIS & Remote Sensing","Computer Science"],
    recommendedTeamSize: 5,
    labRequirements: [{ name: "GIS & Remote Sensing Lab", available: true },{ name: "Drone Equipment", available: false },{ name: "Structural Engineering Lab", available: true }],
    fundingAvailable: "₹12L — PMGSY + Giridih Zila Parishad",
    aiMatchScore: 79, aiSuccessChance: 76,
    aiReasons: ["GIS Lab available on campus","CS department has drone imaging expertise","1 similar completed project"],
    aiDomainSuccessRate: 72, stateAvgSuccessRate: 58,
    similarProjects: [{ title: "Road Damage AI Mapping – Bokaro", outcome: "Successful", university: "BIT Mesra" }],
    location: "Giridih District", village: "Bengabad Block",
  },
  {
    id: "JH-SOL-2026-02088", title: "Solar Micro-Grid for Off-Grid Tribal Hamlet", domain: "Solar Energy", subdomain: "Rural Electrification",
    district: "West Singhbhum", priority: "High", status: "University Assigned",
    description: "Boria hamlet (pop. 340) has had zero grid electricity for 60 years. Diesel generator costs ₹4,500/month per household — unaffordable. A solar micro-grid with battery storage and smart load management is needed for 68 households, a school, and a health sub-centre.",
    affectedPopulation: 340, durationExisting: "60 years", priorAttempts: "JREDA survey done in 2023, no follow-up implementation",
    communityConfirmations: 68, postedDate: "2026-01-28", deadline: "2026-06-01",
    requiredExpertise: ["Electrical Engineering","Electronics & Communication","Computer Science"],
    recommendedTeamSize: 5,
    labRequirements: [{ name: "IoT & Embedded Systems Lab", available: true },{ name: "Electrical Testing Lab", available: true },{ name: "Solar Panel Testing Rig", available: false }],
    fundingAvailable: "₹25L — PM-KUSUM scheme + NTPC Foundation CSR",
    aiMatchScore: 82, aiSuccessChance: 81,
    aiReasons: ["IoT Lab perfectly suited for smart grid control","Electronics dept has prior solar project experience","Strong team capacity currently available"],
    aiDomainSuccessRate: 79, stateAvgSuccessRate: 64,
    similarProjects: [{ title: "Solar Grid – Khunti Village Cluster", outcome: "Successful", university: "BIT Mesra" },{ title: "Solar Pilot – Latehar Remote Area", outcome: "Discontinued", university: "JUT Ranchi" }],
    location: "West Singhbhum District", village: "Boria Hamlet, Chakradharpur Block",
  },
  {
    id: "JH-DIG-2026-05034", title: "Digital Literacy for Tribal School Teachers", domain: "Digital Literacy", subdomain: "Teacher Training",
    district: "Dumka", priority: "Medium", status: "Govt Verified",
    description: "1,200 government school teachers in Santhal Pargana have never received digital training. Basic computer usage, educational apps, and e-government portal navigation need to be taught. A scalable, offline-capable training curriculum with a mobile app is required, usable even with intermittent internet.",
    affectedPopulation: 42000, durationExisting: "ongoing", priorAttempts: "State training portal exists but no last-mile delivery",
    communityConfirmations: 89, postedDate: "2026-02-14", deadline: "2026-07-31",
    requiredExpertise: ["Computer Science","Education Technology","Human-Computer Interaction"],
    recommendedTeamSize: 4,
    labRequirements: [{ name: "Advanced Computing Lab", available: true },{ name: "Mobile App Dev Setup", available: true }],
    fundingAvailable: "₹8L — SAMG Digital Jharkhand Initiative",
    aiMatchScore: 88, aiSuccessChance: 91,
    aiReasons: ["CS department is your #1 strength","Excellent track record in e-governance projects","Mobile app curriculum development previously done"],
    aiDomainSuccessRate: 91, stateAvgSuccessRate: 67,
    similarProjects: [{ title: "E-Literacy for Anganwadi Workers – Ranchi", outcome: "Successful", university: "BIT Mesra" }],
    location: "Dumka District", village: "Santhal Pargana Region",
  },
  {
    id: "JH-AGR-2026-08067", title: "Smart Irrigation Alert System for Paddy Farmers", domain: "Agricultural Tech", subdomain: "Precision Agriculture",
    district: "Hazaribagh", priority: "High", status: "Submitted",
    description: "Small and marginal paddy farmers in Hazaribagh lose 35% of yield annually due to water stress — either over-irrigation causing root rot or under-irrigation causing crop failure. A low-cost IoT soil moisture sensing system with SMS/voice alerts (as most farmers lack smartphones) is needed for 500 farmer-households.",
    affectedPopulation: 2800, durationExisting: "4 years", priorAttempts: "Manual tensiometer advised by KVK — not adopted",
    communityConfirmations: 127, postedDate: "2026-03-01", deadline: "2026-08-15",
    requiredExpertise: ["Electronics & Communication","Computer Science","Agricultural Engineering","IoT Systems"],
    recommendedTeamSize: 5,
    labRequirements: [{ name: "IoT & Embedded Systems Lab", available: true },{ name: "Environmental Monitoring Lab", available: true },{ name: "Field Testing Equipment", available: false }],
    fundingAvailable: "₹14L — Krishi Vigyan Kendra + ITC Agri-Business CSR",
    aiMatchScore: 85, aiSuccessChance: 83,
    aiReasons: ["IoT Lab is a key strength","CS + ECE combined team available","Matches your precision agriculture sub-domain expertise"],
    aiDomainSuccessRate: 80, stateAvgSuccessRate: 59,
    similarProjects: [{ title: "Drip Irrigation Monitoring – Palamu", outcome: "Successful", university: "Birsa Agricultural University" }],
    location: "Hazaribagh District", village: "Ichak Block",
  },
  {
    id: "JH-AIR-2026-03055", title: "Real-Time Air Quality Monitoring Network — Dhanbad", domain: "Air Quality", subdomain: "Pollution Monitoring",
    district: "Dhanbad", priority: "Critical", status: "AI Processed",
    description: "Dhanbad (India's coal capital) has no real-time air quality monitoring network. PM2.5, SO2, and NO2 levels are estimated to be 4-6x WHO limits during coal processing seasons. A network of 12 low-cost IoT sensor nodes with a public-facing dashboard and government alerting system is required.",
    affectedPopulation: 450000, durationExisting: "decades", priorAttempts: "CPCB station — only 1 station for the entire district, data lag 48h",
    communityConfirmations: 891, postedDate: "2026-01-20", deadline: "2026-05-01",
    requiredExpertise: ["Environmental Science","Electronics & Communication","Computer Science","Data Analytics"],
    recommendedTeamSize: 7,
    labRequirements: [{ name: "Environmental Monitoring Lab", available: true },{ name: "IoT & Embedded Systems Lab", available: true },{ name: "Air Quality Sensor Calibration Rig", available: false }],
    fundingAvailable: "₹22L — JSERC + Hindalco Industries CSR",
    aiMatchScore: 91, aiSuccessChance: 86,
    aiReasons: ["Environmental Science + ECE combination is your proven strength","IoT sensor network deployed for flood project — directly transferable","Largest affected population problem this quarter"],
    aiDomainSuccessRate: 83, stateAvgSuccessRate: 55,
    similarProjects: [{ title: "Industrial Pollution Sensor Net – Bokaro", outcome: "Successful", university: "BIT Mesra" }],
    location: "Dhanbad District", village: "Jharia, Sindri, Katras areas",
  },
  {
    id: "JH-FLD-2026-09011", title: "Flood Early Warning System — Subarnarekha Basin", domain: "Flood Management", subdomain: "Disaster Early Warning",
    district: "East Singhbhum", priority: "Critical", status: "In Progress",
    description: "The Subarnarekha river floods 11 villages annually with less than 2 hours warning time. A multi-parameter sensor network (rainfall, river level, soil saturation) with automated SMS/siren alerts in Santali, Hindi, and Bengali is required to give 6-8 hours advance warning.",
    affectedPopulation: 22000, durationExisting: "12 years", priorAttempts: "CWC gauge station — single point, no last-mile alert",
    communityConfirmations: 1243, postedDate: "2025-11-10", deadline: "2026-03-31",
    requiredExpertise: ["Civil Engineering","Electronics & Communication","Computer Science","Environmental Science"],
    recommendedTeamSize: 8,
    labRequirements: [{ name: "IoT & Embedded Systems Lab", available: true },{ name: "GIS & Remote Sensing Lab", available: true },{ name: "Structural Engineering Lab", available: true }],
    fundingAvailable: "₹35L — NDMA + NTPC Foundation",
    aiMatchScore: 96, aiSuccessChance: 92,
    aiReasons: ["Highest match score this quarter","Your team successfully deployed Bokaro sensor net","All required labs available on campus","Faculty PI Dr. Sharma has flood modelling publications"],
    aiDomainSuccessRate: 90, stateAvgSuccessRate: 62,
    similarProjects: [{ title: "Damodar Flood Alert Pilot – Bokaro", outcome: "Successful", university: "BIT Mesra" }],
    location: "East Singhbhum District", village: "Baharagora, Ghatsila cluster",
  },
  {
    id: "JH-HLT-2026-06078", title: "Telemedicine Kiosk for Remote Tribal PHC", domain: "Healthcare Access", subdomain: "Telemedicine",
    district: "Khunti", priority: "High", status: "Piloted",
    description: "PHC in Murhu block serves 18,000 tribal residents but has 1 doctor for every 9,000 people. A telemedicine kiosk with vitals measurement (BP, SpO2, temperature, glucose), video consult capability, and offline medical record keeping could extend specialist reach to 6 sub-centres.",
    affectedPopulation: 18000, durationExisting: "ongoing", priorAttempts: "NHM mobile van — 1 visit/month, insufficient",
    communityConfirmations: 234, postedDate: "2025-12-05", deadline: "2026-09-30",
    requiredExpertise: ["Biomedical Engineering","Electronics & Communication","Computer Science","Community Health"],
    recommendedTeamSize: 6,
    labRequirements: [{ name: "IoT & Embedded Systems Lab", available: true },{ name: "Biomedical Equipment Lab", available: false },{ name: "Advanced Computing Lab", available: true }],
    fundingAvailable: "₹20L — Ayushman Bharat Digital Mission + Tata Trusts",
    aiMatchScore: 74, aiSuccessChance: 67,
    aiReasons: ["CSE team has health-tech app experience","No Biomedical Engineering dept — partial match","ECE team can handle vitals hardware"],
    aiDomainSuccessRate: 65, stateAvgSuccessRate: 52,
    similarProjects: [{ title: "Health Kiosk Pilot – Simdega", outcome: "Successful", university: "AIIMS Deoghar" }],
    location: "Khunti District", village: "Murhu Block PHC",
  },
  {
    id: "JH-WAS-2026-10033", title: "Solid Waste Segregation & Composting — Jamshedpur Ward 14", domain: "Waste Management", subdomain: "Urban Solid Waste",
    district: "East Singhbhum", priority: "Medium", status: "Govt Verified",
    description: "Ward 14 of Jamshedpur Municipal Corporation generates 8 tonnes/day of mixed solid waste. No segregation at source, no compost facility. A community-managed dry-wet segregation system with decentralised composting and a QR-code-based incentive scheme for participating households is needed.",
    affectedPopulation: 24000, durationExisting: "8 years", priorAttempts: "JMC awareness campaign 2022 — 12% adoption, abandoned",
    communityConfirmations: 178, postedDate: "2026-02-22", deadline: "2026-08-31",
    requiredExpertise: ["Environmental Science","Civil Engineering","Computer Science","Social Science"],
    recommendedTeamSize: 5,
    labRequirements: [{ name: "Environmental Monitoring Lab", available: true },{ name: "Chemical Analysis Equipment", available: true }],
    fundingAvailable: "₹11L — SBM Urban + Tata Steel CSR",
    aiMatchScore: 81, aiSuccessChance: 77,
    aiReasons: ["Environmental Science is your 2nd strongest domain","CS team can build the incentive app","Similar community-tech intervention done before"],
    aiDomainSuccessRate: 74, stateAvgSuccessRate: 60,
    similarProjects: [{ title: "E-Waste Collection App – Ranchi", outcome: "Successful", university: "BIT Mesra" }],
    location: "East Singhbhum District", village: "Jamshedpur Ward 14",
  },
  {
    id: "JH-MIN-2026-11045", title: "Underground Mine Safety Alert System", domain: "Mining Safety", subdomain: "Worker Safety IoT",
    district: "Dhanbad", priority: "Critical", status: "Submitted",
    description: "BCCL Kusunda mine has had 3 fatalities in 2025 due to gas accumulation and roof collapse with no early detection. A distributed sensor network for CH4, CO, temperature, and seismic vibration with autonomous alerts to workers' wristbands and surface control room is critically needed.",
    affectedPopulation: 1200, durationExisting: "ongoing risk", priorAttempts: "Manual gas checks every 4 hours — insufficient detection speed",
    communityConfirmations: 45, postedDate: "2026-03-10", deadline: "2026-07-01",
    requiredExpertise: ["Electronics & Communication","Computer Science","Mining Engineering","Mechanical Engineering"],
    recommendedTeamSize: 7,
    labRequirements: [{ name: "IoT & Embedded Systems Lab", available: true },{ name: "Mining Simulation Lab", available: false },{ name: "Structural Engineering Lab", available: true }],
    fundingAvailable: "₹40L — DGMS + Coal India CSR + NTPC",
    aiMatchScore: 68, aiSuccessChance: 58,
    aiReasons: ["No Mining Engineering dept — gap in expertise","IoT hardware capability available","High funding — worth collaborating with IIT ISM"],
    aiDomainSuccessRate: 55, stateAvgSuccessRate: 48,
    similarProjects: [{ title: "Gas Sensor Pilot – Jharia Underground", outcome: "Discontinued", university: "IIT ISM Dhanbad" }],
    location: "Dhanbad District", village: "BCCL Kusunda Colliery",
  },
  {
    id: "JH-EGV-2026-12009", title: "Offline-First Gram Panchayat Digital Services Portal", domain: "E-Governance", subdomain: "Digital Public Services",
    district: "Pakur", priority: "Medium", status: "AI Processed",
    description: "Gram panchayat offices in Pakur district operate on paper — birth certificates, ration card corrections, and land dispute filings take 3-6 months. Internet connectivity is intermittent (2G only). An offline-first progressive web app synced to state servers during connectivity windows can reduce service time to 3 days.",
    affectedPopulation: 85000, durationExisting: "70 years", priorAttempts: "State e-district portal — not usable without stable internet",
    communityConfirmations: 412, postedDate: "2026-02-08", deadline: "2026-09-01",
    requiredExpertise: ["Computer Science","Human-Computer Interaction","Regional Language Tech"],
    recommendedTeamSize: 4,
    labRequirements: [{ name: "Advanced Computing Lab", available: true },{ name: "Mobile App Dev Setup", available: true }],
    fundingAvailable: "₹9L — Digital Jharkhand + NIC partnership",
    aiMatchScore: 93, aiSuccessChance: 95,
    aiReasons: ["Your #1 domain — CS/IT is your absolute strength","PWA offline apps built in 2 previous projects","Largest reach impact: 85,000 beneficiaries","Faculty expertise in regional language NLP"],
    aiDomainSuccessRate: 95, stateAvgSuccessRate: 70,
    similarProjects: [{ title: "Offline Aadhar Correction App – Ranchi", outcome: "Successful", university: "BIT Mesra" },{ title: "Panchayat Digi-Sewa – Lohardaga", outcome: "Successful", university: "BIT Mesra" }],
    location: "Pakur District", village: "Pakur & Maheshpur Blocks",
  },
  {
    id: "JH-TRB-2026-13021", title: "Tribal Language Digital Preservation Platform", domain: "Tribal Welfare", subdomain: "Cultural Preservation",
    district: "Simdega", priority: "Low", status: "Submitted",
    description: "Mundari, Ho, and Kurukh languages spoken by 2.3M Jharkhand tribals have fewer than 200 digitised texts and no speech corpus. A community-sourced digital archiving platform with voice recording, transcription, and searchable database is needed to preserve these endangered languages.",
    affectedPopulation: 2300000, durationExisting: "30 years decline", priorAttempts: "Physical manuscript digitisation by Jharkhand Archives — limited scope",
    communityConfirmations: 234, postedDate: "2026-03-15", deadline: "2027-03-01",
    requiredExpertise: ["Computer Science","Linguistics","NLP & Speech Technology","Anthropology"],
    recommendedTeamSize: 5,
    labRequirements: [{ name: "Advanced Computing Lab", available: true },{ name: "Speech Processing Lab", available: false }],
    fundingAvailable: "₹7L — Ministry of Tribal Affairs + Ford Foundation",
    aiMatchScore: 72, aiSuccessChance: 65,
    aiReasons: ["CS/NLP capability present","No linguistics dept — cross-discipline gap","Long timeline makes this feasible despite partial match"],
    aiDomainSuccessRate: 62, stateAvgSuccessRate: 45,
    similarProjects: [{ title: "Santhali Script OCR Project", outcome: "Successful", university: "Sido Kanhu Murmu University" }],
    location: "Simdega District", village: "Simdega Town + remote blocks",
  },
];

export const faculty = [
  { id: "f1", name: "Dr. Rajan Sharma", department: "Civil Engineering", expertise: ["Water Resources","Structural Analysis","GIS Mapping","Environmental Engineering"], projects: 8, hoursMentored: 340, outcomes: "7 Successful, 1 Discontinued" },
  { id: "f2", name: "Prof. Anjali Mishra", department: "Environmental Science", expertise: ["Water Quality","Air Pollution","Waste Management","Remote Sensing"], projects: 6, hoursMentored: 280, outcomes: "6 Successful" },
  { id: "f3", name: "Dr. Suresh Kumar Patel", department: "Electronics & Communication", expertise: ["IoT Systems","Sensor Networks","Embedded Systems","Signal Processing"], projects: 9, hoursMentored: 420, outcomes: "8 Successful, 1 Discontinued" },
  { id: "f4", name: "Prof. Priya Nair", department: "Computer Science & Engineering", expertise: ["Mobile App Development","Offline-First Systems","AI/ML","NLP"], projects: 11, hoursMentored: 510, outcomes: "10 Successful, 1 In-Progress" },
  { id: "f5", name: "Dr. Amit Verma", department: "Electrical Engineering", expertise: ["Solar Power Systems","Smart Grids","Power Electronics","Renewable Energy"], projects: 5, hoursMentored: 210, outcomes: "5 Successful" },
  { id: "f6", name: "Prof. Kavitha Reddy", department: "Computer Science & Engineering", expertise: ["Data Analytics","Dashboard Development","Cloud Computing","React.js"], projects: 7, hoursMentored: 310, outcomes: "7 Successful" },
  { id: "f7", name: "Dr. Mohan Oraon", department: "Environmental Science", expertise: ["Tribal Ecology","Biodiversity","Forest Management","Community Engagement"], projects: 4, hoursMentored: 190, outcomes: "4 Successful" },
  { id: "f8", name: "Prof. Deepak Singh", department: "Mechanical Engineering", expertise: ["Manufacturing","Fabrication","Product Design","Materials Science"], projects: 3, hoursMentored: 140, outcomes: "2 Successful, 1 In-Progress" },
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
  if (score >= 40) return "text-amber-500";
  return "text-red-500";
}
export function getSuccessBg(score: number): string {
  if (score >= 70) return "bg-green-100 text-green-700 border-green-200";
  if (score >= 40) return "bg-amber-100 text-amber-700 border-amber-200";
  return "bg-red-100 text-red-700 border-red-200";
}
export function getPriorityColor(p: Priority): string {
  const map: Record<Priority,string> = { Critical:"bg-red-100 text-red-700 border-red-300", High:"bg-orange-100 text-orange-700 border-orange-300", Medium:"bg-yellow-100 text-yellow-700 border-yellow-300", Low:"bg-green-100 text-green-700 border-green-300" };
  return map[p];
}
export function getStageColor(stage: string): string {
  const map: Record<string,string> = { Proposal:"bg-slate-100 text-slate-600", Approved:"bg-blue-100 text-blue-700", Prototyping:"bg-violet-100 text-violet-700", Testing:"bg-amber-100 text-amber-700", Pilot:"bg-orange-100 text-orange-700", Deployed:"bg-green-100 text-green-700" };
  return map[stage] || "bg-gray-100 text-gray-600";
}
