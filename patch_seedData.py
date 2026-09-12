import re

def patch_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if "import UNIFIED_DATA from './unified_dataset.json';" not in content:
        content = "import UNIFIED_DATA from './unified_dataset.json';\n" + content
        
    # Replace UNIVERSITIES
    content = re.sub(
        r'export const UNIVERSITIES = \[.*?\];', 
        'export const UNIVERSITIES = UNIFIED_DATA.universities;', 
        content, flags=re.DOTALL
    )
    
    # Replace INDUSTRIES
    content = re.sub(
        r'export const INDUSTRIES = \[.*?\];', 
        'export const INDUSTRIES = UNIFIED_DATA.industryStartupNgoPartners;', 
        content, flags=re.DOTALL
    )
    
    # Replace SEED_PROBLEMS
    problems_code = """export const SEED_PROBLEMS = UNIFIED_DATA.problems.map((p, index) => ({
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
}));"""
    content = re.sub(
        r'export const SEED_PROBLEMS = \[.*?\];', 
        problems_code, 
        content, flags=re.DOTALL
    )
    
    # Replace SEED_PROJECTS
    projects_code = """export const SEED_PROJECTS = UNIFIED_DATA.projects.map(p => ({
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
}));"""
    content = re.sub(
        r'export const SEED_PROJECTS = \[.*?\];', 
        projects_code, 
        content, flags=re.DOTALL
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

patch_file('frontend/src/data/seedData.js')
patch_file('Nirvaha_Government_Module_temp/data/seedData.js')
print("Patched both seedData.js files")
