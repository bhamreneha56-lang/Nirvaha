import React from 'react';

export default function ChallengeJourney() {
  const steps = [
    { title: 'Challenge submitted', date: '08 Sep', status: 'completed', description: 'Citizen reported the issue.' },
    { title: 'AI classification completed', date: '09 Sep', status: 'completed', description: 'Categorized under Water Resources.' },
    { title: 'Government verified', date: '10 Sep', status: 'completed', description: 'Validated by local authorities.' },
    { title: 'Assigned to ABC University', date: '12 Sep', status: 'completed', description: 'Forwarded for solution development.' },
    { title: 'University team formed', date: '18 Sep', status: 'completed', description: '4 students & 1 faculty mentor assigned.' },
    { title: 'Solution proposal submitted', date: '25 Sep', status: 'active', description: 'Low-cost community water monitoring system proposed.' },
    { title: 'Prototype development', date: 'Pending', status: 'pending', description: 'Awaiting hardware assembly.' },
    { title: 'Pilot Testing', date: 'Pending', status: 'pending', description: 'Initial testing in community.' },
    { title: 'Deployment', date: 'Pending', status: 'pending', description: 'Full implementation.' },
    { title: 'Impact Validation', date: 'Pending', status: 'pending', description: 'Post-deployment citizen feedback.' }
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
      <h2 className="text-2xl font-black text-slate-900 mb-8">Problem Journey</h2>
      
      <div className="relative border-l-2 border-slate-200 ml-4 space-y-8">
        {steps.map((step, idx) => (
          <div key={idx} className="relative pl-8 animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${idx * 100}ms` }}>
            {/* Timeline Dot */}
            <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-white ${
              step.status === 'completed' ? 'bg-green-500' : 
              step.status === 'active' ? 'bg-orange-500 animate-pulse' : 'bg-slate-300'
            }`}></div>
            
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <h3 className={`font-bold text-lg ${
                  step.status === 'completed' ? 'text-slate-900' : 
                  step.status === 'active' ? 'text-orange-600' : 'text-slate-500'
                }`}>
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1">{step.description}</p>
              </div>
              <div className="text-sm font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded whitespace-nowrap w-fit">
                {step.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
