"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { problems, faculty, university, PROBLEM_STATUSES, getSuccessBg, getPriorityColor } from "@/lib/mockData";
import SuccessRing from "@/components/university/SuccessRing";
import { MapPin, Users, Clock, CheckCircle2, XCircle, AlertCircle, Heart, ArrowLeft, MessageSquare, Send, ChevronRight, Layers, Star } from "lucide-react";

export default function ProblemDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const problem = problems.find(p => p.id === id);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([{ author: "Dr. Rajan Sharma", text: "Can you clarify the exact contamination levels? We need a water sample for lab analysis.", time: "2 days ago" }]);
  const [accepted, setAccepted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"details"|"ai"|"team">("details");

  if (!problem) return (
    <div className="text-center py-20">
      <p className="text-5xl mb-4">🔍</p>
      <h2 className="text-xl font-bold text-slate-700">Problem not found</h2>
      <Link href="/university/challenges" className="text-indigo-600 mt-4 inline-block text-sm hover:underline">← Back to Challenges</Link>
    </div>
  );

  const stageIdx = PROBLEM_STATUSES.indexOf(problem.status);
  const matchFaculty = faculty.slice(0,3);

  const scoreBreakdown = [
    { label: "Feasibility", score: 82 },
    { label: "Team Fit", score: problem.aiSuccessChance + 3 > 100 ? 97 : problem.aiSuccessChance + 3 },
    { label: "Domain Performance", score: problem.aiDomainSuccessRate },
    { label: "Resource Availability", score: problem.labRequirements.filter(l=>l.available).length / problem.labRequirements.length * 100 | 0 },
  ];

  return (
    <div className="space-y-5">
      {/* Back */}
      <Link href="/university/challenges" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft size={14}/> Back to Challenges
      </Link>

      {/* HEADER */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-wrap gap-2 items-center mb-3">
          <span className="font-mono text-sm text-indigo-600 font-bold">{problem.id}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${getPriorityColor(problem.priority)}`}>{problem.priority}</span>
          <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full px-2 py-0.5">{problem.domain}</span>
          <span className="text-xs bg-slate-100 text-slate-600 rounded-full px-2 py-0.5">{problem.subdomain}</span>
        </div>
        <h1 className="text-xl font-black text-slate-900 mb-4">{problem.title}</h1>

        {/* Status Stepper */}
        <div className="overflow-x-auto">
          <div className="flex items-center gap-0 min-w-max">
            {PROBLEM_STATUSES.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`flex flex-col items-center`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${i < stageIdx ? "bg-green-500 border-green-500 text-white" : i === stageIdx ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-300" : "bg-white border-slate-300 text-slate-400"}`}>
                    {i < stageIdx ? "✓" : i+1}
                  </div>
                  <span className={`text-xs mt-1 font-medium whitespace-nowrap ${i === stageIdx ? "text-indigo-600" : i < stageIdx ? "text-green-600" : "text-slate-400"}`}>{s}</span>
                </div>
                {i < PROBLEM_STATUSES.length - 1 && (
                  <div className={`h-0.5 w-8 mx-1 mb-4 ${i < stageIdx ? "bg-green-400" : "bg-slate-200"}`}/>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {(["details","ai","team"] as const).map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${activeTab===t?"bg-white shadow text-slate-900":"text-slate-500 hover:text-slate-700"}`}>
            {t === "ai" ? "AI Insights" : t === "team" ? "Team Requirements" : "Problem Details"}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className={`grid gap-5 ${activeTab !== "details" ? "" : "lg:grid-cols-5"}`}>
        {/* LEFT COL */}
        {activeTab === "details" && (
          <div className="lg:col-span-3 space-y-4">
            {/* Description */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-3">Problem Description</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{problem.description}</p>
            </div>

            {/* Evidence Gallery */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-3">Evidence Gallery</h3>
              <div className="grid grid-cols-3 gap-2">
                {[1,2,3].map(n => (
                  <div key={n} className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                    <span className="text-slate-500 text-2xl">📷</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">3 images · 1 document uploaded by citizen</p>
            </div>

            {/* Location + Stats */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-3">Location & Impact</h3>
              <div className="bg-slate-100 rounded-lg h-32 flex items-center justify-center mb-3">
                <div className="text-center text-slate-500">
                  <MapPin size={24} className="mx-auto mb-1"/>
                  <p className="text-xs font-semibold">{problem.location}</p>
                  <p className="text-xs">{problem.village}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Affected Population", value: problem.affectedPopulation.toLocaleString() },
                  { label: "Duration", value: problem.durationExisting },
                  { label: "Prior Attempts", value: problem.priorAttempts },
                  { label: "Community Confirmations", value: `✅ ${problem.communityConfirmations} citizens` },
                ].map(s => (
                  <div key={s.label} className="bg-slate-50 rounded-lg p-2.5">
                    <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Past Projects */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-3">Similar Past Projects</h3>
              <div className="space-y-2">
                {problem.similarProjects.map((sp, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${sp.outcome==="Successful"?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`}>{sp.outcome}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-700">{sp.title}</p>
                      <p className="text-xs text-slate-400">{sp.university}</p>
                    </div>
                    <button className="text-xs text-indigo-600 hover:underline">View case study</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><MessageSquare size={16}/> Q&A with Government</h3>
              <div className="space-y-3 mb-4">
                {comments.map((c,i) => (
                  <div key={i} className="bg-indigo-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-indigo-700">{c.author}</p>
                    <p className="text-sm text-slate-700 mt-1">{c.text}</p>
                    <p className="text-xs text-slate-400 mt-1">{c.time}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={comment} onChange={e=>setComment(e.target.value)} placeholder="Ask a clarifying question..." className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"/>
                <button onClick={() => { if(comment) { setComments(c=>[...c,{author:"BIT Mesra (You)",text:comment,time:"Just now"}]); setComment(""); }}} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors">
                  <Send size={14}/>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT COL / AI Tab */}
        {(activeTab === "details" || activeTab === "ai") && (
          <div className={`${activeTab==="details"?"lg:col-span-2":""} space-y-4`}>
            {/* AI Success Panel */}
            <div className="bg-gradient-to-br from-indigo-950 to-slate-900 rounded-xl p-5 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <SuccessRing score={problem.aiSuccessChance} size={72} strokeWidth={7}/>
                <div>
                  <p className="text-white font-black text-lg">AI Success Chance</p>
                  <p className="text-indigo-300 text-xs">Based on your university profile</p>
                  {/* TODO: replace with GET /api/ai/success-chance */}
                </div>
              </div>
              <div className="space-y-2.5">
                {scoreBreakdown.map(s => (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-indigo-200">{s.label}</span>
                      <span className={`font-bold ${s.score>=70?"text-green-400":s.score>=40?"text-amber-400":"text-red-400"}`}>{s.score}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${s.score>=70?"bg-green-400":s.score>=40?"bg-amber-400":"bg-red-400"}`} style={{width:`${s.score}%`}}/>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-indigo-200 leading-relaxed">
                  <span className="font-bold text-white">AI Analysis:</span> Based on BIT Mesra's historical performance in {problem.domain} ({problem.aiDomainSuccessRate}% success rate) and current faculty/lab availability, this problem aligns strongly with your institutional strengths. The required expertise in {problem.requiredExpertise.slice(0,2).join(" and ")} maps directly to your top departments.
                </p>
              </div>
              <div className="flex gap-2 mt-3">
                <span className="text-xs bg-green-900/40 border border-green-700/40 text-green-300 rounded-full px-2.5 py-1 font-semibold">Your domain: {problem.aiDomainSuccessRate}%</span>
                <span className="text-xs bg-slate-700/40 border border-slate-600 text-slate-300 rounded-full px-2.5 py-1">State avg: {problem.stateAvgSuccessRate}%</span>
              </div>
            </div>

            {/* Funding */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-2 text-sm">Funding Available</h3>
              <p className="text-sm text-green-700 font-semibold">{problem.fundingAvailable}</p>
            </div>

            {/* AI Reasons */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-3 text-sm">Why AI Recommends This</h3>
              <ul className="space-y-2">
                {problem.aiReasons.map((r,i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 size={14} className="text-green-500 mt-0.5 flex-shrink-0"/>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TEAM Tab */}
        {activeTab === "team" && (
          <div className="space-y-4">
            {/* Required Expertise */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-3">Required Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {problem.requiredExpertise.map(e => (
                  <span key={e} className="text-sm bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg px-3 py-1.5 font-medium">{e}</span>
                ))}
              </div>
              <div className="mt-3 p-3 bg-slate-50 rounded-lg flex items-center gap-2">
                <Users size={16} className="text-slate-500"/>
                <p className="text-sm text-slate-700">Recommended team size: <span className="font-bold">{problem.recommendedTeamSize} members</span></p>
              </div>
            </div>

            {/* Faculty Match */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-3">Faculty Expertise Match — BIT Mesra</h3>
              <div className="space-y-3">
                {matchFaculty.map(f => (
                  <div key={f.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm flex-shrink-0">
                      {f.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800">{f.name}</p>
                      <p className="text-xs text-slate-500">{f.department}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {f.expertise.slice(0,2).map(e => (
                          <span key={e} className="text-xs bg-green-50 text-green-700 border border-green-200 rounded-full px-1.5 py-0.5">{e}</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-green-600 font-semibold flex items-center gap-1"><CheckCircle2 size={12}/> Match</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lab Requirements */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-3">Lab / Infrastructure Requirements</h3>
              <div className="space-y-2">
                {problem.labRequirements.map(l => (
                  <div key={l.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50">
                    {l.available ? <CheckCircle2 size={16} className="text-green-500 flex-shrink-0"/> : <XCircle size={16} className="text-red-400 flex-shrink-0"/>}
                    <p className="text-sm text-slate-700 flex-1">{l.name}</p>
                    <span className={`text-xs font-semibold ${l.available?"text-green-600":"text-red-500"}`}>{l.available?"Available":"Not Available"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* STICKY ACTIONS */}
      <div className="sticky bottom-4 bg-white/90 backdrop-blur border border-slate-200 rounded-2xl p-4 shadow-xl flex flex-wrap gap-3 items-center justify-between">
        <p className="text-sm text-slate-600 font-medium">Deadline: <span className="font-bold text-slate-800">{problem.deadline}</span></p>
        <div className="flex flex-wrap gap-2">
          <button onClick={()=>setSaved(s=>!s)} className={`flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border font-semibold transition-all ${saved?"bg-pink-50 text-pink-600 border-pink-200":"text-slate-600 border-slate-300 hover:bg-slate-50"}`}>
            <Heart size={14} className={saved?"fill-pink-500 text-pink-500":""}/> {saved?"Saved":"Save"}
          </button>
          <Link href="/university/challenges" className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border border-slate-300 text-slate-600 font-semibold hover:bg-slate-50 transition-all">
            <AlertCircle size={14}/> Reject
          </Link>
          <button className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border border-slate-300 text-slate-600 font-semibold hover:bg-slate-50 transition-all">
            <MessageSquare size={14}/> Request Clarification
          </button>
          <Link href="/university/team-builder" className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border border-indigo-300 bg-indigo-50 text-indigo-700 font-semibold hover:bg-indigo-100 transition-all">
            <Users size={14}/> Start Team Builder
          </Link>
          <button onClick={()=>setAccepted(true)} className={`flex items-center gap-1.5 text-sm px-5 py-2 rounded-lg font-bold transition-all shadow-md ${accepted?"bg-green-500 text-white shadow-green-300":"bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-300"}`}>
            <CheckCircle2 size={14}/> {accepted?"Accepted!":"Accept Challenge"}
          </button>
        </div>
      </div>
    </div>
  );
}
