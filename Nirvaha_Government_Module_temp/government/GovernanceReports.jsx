import React from 'react';
import { FileText, Download, Printer } from 'lucide-react';

export default function GovernanceReports() {
  const reports = [
    { title: 'Daily Situation Report', desc: 'Summary of critical cases, SLAs, and new escalations.', date: 'Today, 08:00 AM' },
    { title: 'Weekly Governance Report', desc: 'District-wise performance, project updates.', date: 'Mon, 08:00 AM' },
    { title: 'Monthly AI Intelligence Report', desc: 'Predictive analytics accuracy, risk factors.', date: '1st of Month' }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Governance Reports</h1>
          <p className="text-sm text-slate-500 font-medium">Auto-generated district and state-level operational reports.</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {reports.map((r, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col h-full">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
              <FileText size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{r.title}</h3>
            <p className="text-sm text-slate-500 mb-4 flex-1">{r.desc}</p>
            <div className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">{r.date}</div>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-slate-900 text-white text-xs font-bold py-2 rounded flex items-center justify-center gap-2 hover:bg-black">
                <Download size={14} /> Export PDF
              </button>
              <button className="px-3 bg-slate-100 text-slate-600 rounded hover:bg-slate-200">
                <Printer size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
