
import { useState } from "react";
import { problems } from "./mockData";
import { Zap, CheckCircle2, Send, Save, ChevronRight } from "lucide-react";

const fields = [
  { key: "problemUnderstanding", label: "Problem Understanding", placeholder: "Describe the core issue and its root causes...", rows: 4 },
  { key: "proposedSolution", label: "Proposed Solution", placeholder: "Detail your technical solution approach...", rows: 4 },
  { key: "innovationAngle", label: "Innovation / Novelty Angle", placeholder: "What makes your approach innovative or unique?", rows: 3 },
  { key: "technicalApproach", label: "Technical Approach", placeholder: "Step-by-step methodology, tools, algorithms, hardware...", rows: 4 },
  { key: "expectedImpact", label: "Expected Impact", placeholder: "Quantify: how many people, by how much, by when...", rows: 3 },
  { key: "risks", label: "Risks & Mitigation", placeholder: "Identify key risks and how you will mitigate them...", rows: 3 },
  { key: "testingPlan", label: "Testing & Validation Plan", placeholder: "How will you test and validate your solution?", rows: 3 },
];

const AI_DRAFT: Record<string, string> = {
  problemUnderstanding: "The groundwater contamination crisis in Ramgarh district represents a severe public health emergency affecting 8,200 residents across 14 villages. Arsenic and fluoride contamination — traced to industrial effluent seepage from coal washeries operating since 2018 — has accumulated to levels 3-5x beyond BIS drinking water standards. Children under 12 show early fluorosis symptoms. The absence of community-scale filtration has left residents dependent on contaminated well water as their sole source.",
  proposedSolution: "We propose deploying a modular, solar-powered community water purification system integrating multi-stage filtration (activated alumina for fluoride removal, iron coprécipitation for arsenic, and UV disinfection) at 4 strategic village cluster points. Each unit will serve 2,000 residents, is maintainable by a trained local operator, and includes IoT-based water quality monitoring with real-time alerts to district health officials.",
  innovationAngle: "Unlike conventional centralized water treatment requiring grid power, our solution uses hybrid solar-battery operation with offline-capable IoT monitoring via LoRaWAN mesh networking — eliminating dependence on grid power and internet connectivity. The modular design allows expansion without orangeesign. A QR-code-linked maintenance log ensures traceability of filter replacements.",
  technicalApproach: "Phase 1 (Weeks 1-4): Water sample collection and lab analysis at BIT Mesra Water Testing Lab. Phase 2 (Weeks 5-10): System design and pilot unit fabrication. Phase 3 (Weeks 11-16): Deployment at 1 pilot village (Barkatha). Phase 4 (Weeks 17-20): Performance monitoring, community training, and scale-up to remaining 3 cluster sites. Tools: ArcGIS for contamination mapping, Arduino-based IoT sensors, Python for data dashboard.",
  expectedImpact: "Primary: 8,200 residents gain access to safe drinking water within 6 months. Secondary: Reduction in fluorosis cases by 60% within 12 months post-deployment based on comparable projects. Economic: Each household saves ₹800/month spent on bottled water. Long-term: Framework replicable to 40+ similar districts in Jharkhand.",
  risks: "Risk 1: Community adoption resistance — Mitigation: Involve gram panchayat leaders from Day 1; conduct water quality demonstration events. Risk 2: Solar power insufficiency in monsoon — Mitigation: Size battery backup for 4 cloudy days. Risk 3: Filter membrane clogging from high turbidity — Mitigation: Pre-filter sediment stage; monitor turbidity via IoT sensor.",
  testingPlan: "Month 1: Lab validation of filtration efficiency (target: arsenic <10 ppb, fluoride <1.5 mg/L per BIS 10500). Month 3: Pilot village water quality test by JTRL (independent). Month 5: Community satisfaction survey. Month 6: NABL-accorangeited lab certification before full scale-up.",
};

export default function ProposalPage() {
  const [selectedProblem, setSelectedProblem] = useState(problems[0].id);
  const [form, setForm] = useState<Record<string, string>>({ costEstimate: "", timeline: "", resources: "" });
  const [aiModal, setAiModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const problem = problems.find(p => p.id === selectedProblem)!;

  const applyAIDraft = () => {
    setForm(prev => ({ ...prev, ...AI_DRAFT }));
    setAiModal(false);
  };

  if (submitted) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mb-4">🎉</div>
      <h2 className="text-2xl font-black text-black">Proposal Submitted!</h2>
      <p className="text-black mt-2 text-sm">Your proposal for <span className="font-semibold">{problem.title}</span> has been submitted to the government for review.</p>
      <p className="text-xs text-black mt-1">Expected review time: 5-7 working days</p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-black">New Proposal</h1>
          <p className="text-sm text-black mt-0.5">Submit your university's solution proposal</p>
        </div>
        <button onClick={() => setAiModal(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-500 transition-all shadow-lg shadow-indigo-300">
          <Zap size={15} className="fill-white"/> AI Writing Assistant
        </button>
      </div>

      {/* Problem selector */}
      <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm">
        <label className="text-sm font-bold text-black block mb-2">Challenge</label>
        <select value={selectedProblem} onChange={e => setSelectedProblem(e.target.value)}
          className="w-full text-sm border border-blue-100 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
          {problems.map(p => <option key={p.id} value={p.id}>[{p.id}] {p.title}</option>)}
        </select>
        {problem && <p className="text-xs text-black mt-2">Domain: {problem.domain} · Deadline: {problem.deadline} · Funding: {problem.fundingAvailable}</p>}
      </div>

      {/* Form fields */}
      <div className="bg-white rounded-xl border border-blue-100 p-5 shadow-sm space-y-5">
        {fields.map(f => (
          <div key={f.key}>
            <label className="text-sm font-bold text-black block mb-1.5">{f.label}</label>
            <textarea rows={f.rows} value={form[f.key] || ""} onChange={e => setForm(prev => ({...prev,[f.key]:e.target.value}))}
              placeholder={f.placeholder}
              className="w-full text-sm border border-blue-100 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none leading-relaxed"/>
          </div>
        ))}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-bold text-black block mb-1.5">Cost Estimate (₹)</label>
            <input type="number" value={form.costEstimate} onChange={e => setForm(p=>({...p,costEstimate:e.target.value}))}
              placeholder="e.g. 1500000" className="w-full text-sm border border-blue-100 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"/>
          </div>
          <div>
            <label className="text-sm font-bold text-black block mb-1.5">Project Timeline</label>
            <input type="text" value={form.timeline} onChange={e => setForm(p=>({...p,timeline:e.target.value}))}
              placeholder="e.g. April 2026 – October 2026" className="w-full text-sm border border-blue-100 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"/>
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-black block mb-1.5">Resources Needed</label>
          <textarea rows={2} value={form.resources || ""} onChange={e => setForm(p=>({...p,resources:e.target.value}))}
            placeholder="Equipment, personnel, software, field access..." className="w-full text-sm border border-blue-100 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"/>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-black hover:bg-white transition-all">
          <Save size={15}/> Save Draft
        </button>
        <button onClick={() => setSubmitted(true)}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-300">
          <Send size={15}/> Submit Proposal
        </button>
      </div>

      {/* AI Modal */}
      {aiModal && (
        <div className="fixed inset-0 bg-blue-600/50 z-50 flex items-center justify-center p-4" onClick={() => setAiModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center"><Zap size={18} className="fill-white text-white"/></div>
              <div>
                <h3 className="font-black text-black">AI Writing Assistant</h3>
                <p className="text-xs text-black">Pre-filled based on {problem.title}</p>
              </div>
            </div>
            <div className="bg-blue-500 border border-blue-400 rounded-xl p-4 mb-4 max-h-64 overflow-y-auto space-y-3">
              {fields.map(f => (
                <div key={f.key}>
                  <p className="text-xs font-bold text-blue-600">{f.label}</p>
                  <p className="text-xs text-black mt-0.5 leading-relaxed">{AI_DRAFT[f.key]?.slice(0,120)}...</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setAiModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-black hover:bg-white">Cancel</button>
              <button onClick={applyAIDraft} className="flex-1 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-bold hover:bg-blue-500 flex items-center justify-center gap-2">
                <CheckCircle2 size={15}/> Use This Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
