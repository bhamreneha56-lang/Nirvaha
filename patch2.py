import re
with open('frontend/src/modules/industry/IndustryDashboard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

if 'useSimulation' not in content:
    content = content.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { useSimulation } from '../../context/SimulationContext';")

if 'const { state } = useSimulation();' not in content:
    content = content.replace("const [activeTab, setActiveTab] = useState('dashboard');", "const [activeTab, setActiveTab] = useState('dashboard');\n  const { state } = useSimulation();\n  const { projects = [], problems = [] } = state;")

challenges_new = '''<div className="grid grid-cols-2 gap-6">
            {projects.map((proj, idx) => {
               const prob = problems.find(p => p.id === proj.problemId) || {};
               return (
            <div key={proj.id || idx} className="p-6 border border-slate-200 rounded-xl hover:border-orange-400 cursor-pointer transition">
               <div className="flex justify-between items-start mb-4">
                 <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md font-bold text-xs uppercase">{prob.category || 'Domain'} • {proj.university || 'University'}</span>
                 <span className="text-xs font-bold text-slate-400">Ask: ₹{((proj.fundingRequired || 1500000)/100000).toFixed(1)}L</span>
               </div>
               <h3 className="font-bold text-lg mb-2">{proj.title}</h3>
               <p className="text-slate-500 text-sm mb-4">{prob.description ? prob.description.substring(0, 100) + '...' : 'University prototype ready for field testing.'}</p>
               <div className="flex gap-2">
                 <button className="flex-1 py-2 bg-orange-500 text-white rounded-lg font-bold text-sm hover:bg-orange-600 transition">Fund Project</button>
                 <button className="flex-1 py-2 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-black transition">Offer Mentorship</button>
               </div>
            </div>
               );
            })}
          </div>'''

content = re.sub(r'<div className="grid grid-cols-2 gap-6">.*?</div>\s*</div>\s*\);\s*}', challenges_new + '\n        </div>\n      );\n    }', content, flags=re.DOTALL)

with open('frontend/src/modules/industry/IndustryDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Patched Industry')
