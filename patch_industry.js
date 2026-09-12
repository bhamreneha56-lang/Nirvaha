const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend/src/modules/industry/IndustryDashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Add renderOrganisation and renderOpportunities functions
const organisationCode = `
  const renderOrganisation = () => (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-[calc(100vh-160px)] p-8">
      <div className="mb-8">
        <h3 className="font-bold text-slate-900 mb-2">About Organisation</h3>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-sm text-slate-600">
          Tata Steel Foundation is the CSR arm of Tata Steel committed to sustainable rural development, technical education, tribal welfare, and environment conservation across Jharkhand.
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
           <div className="flex items-center gap-2 mb-4">
             <span className="text-orange-500">⚙️</span>
             <h3 className="font-bold text-slate-900">Technology Expertise Focus</h3>
           </div>
           <p className="text-xs text-slate-500 mb-4">Select technology domains your engineering team can mentor or co-develop with universities:</p>
           <div className="flex flex-wrap gap-2">
             {['AI/ML', 'IoT', 'Cloud', 'Blockchain', 'Cybersecurity', 'Data Analytics', 'Web Development', 'Hardware'].map((tech, i) => (
               <span key={tech} className={\`px-3 py-1.5 rounded-full text-xs font-semibold border \${['AI/ML','IoT','Cloud','Data Analytics','Hardware'].includes(tech) ? 'border-orange-500 text-orange-600 bg-orange-50' : 'border-slate-200 text-slate-500'}\`}>
                 {['AI/ML','IoT','Cloud','Data Analytics','Hardware'].includes(tech) && <span className="mr-1">✓</span>}
                 {tech}
               </span>
             ))}
           </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
           <div className="flex items-center gap-2 mb-4">
             <span className="text-teal-500">🎯</span>
             <h3 className="font-bold text-slate-900">CSR Mandate & Interest Categories</h3>
           </div>
           <p className="text-xs text-slate-500 mb-4">Select priority social impact areas for grant funding and partnership:</p>
           <div className="flex flex-wrap gap-2">
             {['Education', 'Agriculture', 'Healthcare', 'Environment', 'Rural Development', 'Women Empowerment', 'Skill Development'].map((cat, i) => (
               <span key={cat} className={\`px-3 py-1.5 rounded-full text-xs font-semibold border \${['Education','Agriculture','Healthcare','Environment','Rural Development','Skill Development'].includes(cat) ? 'border-teal-500 text-teal-700 bg-teal-50' : 'border-slate-200 text-slate-500'}\`}>
                 {['Education','Agriculture','Healthcare','Environment','Rural Development','Skill Development'].includes(cat) && <span className="mr-1">✓</span>}
                 {cat}
               </span>
             ))}
           </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-slate-900 mb-4">Resource & Execution Capacity Metrics</h3>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 grid grid-cols-4 gap-4">
           <div>
             <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1 flex items-center gap-1">
               <span className="text-green-500">$</span> Funding Capacity
             </div>
             <div className="font-black text-slate-900">₹5.00 Cr / Year</div>
           </div>
           <div>
             <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1 flex items-center gap-1">
               <span className="text-blue-500">👥</span> Mentorship Capacity
             </div>
             <div className="font-black text-slate-900">50 Engineers / 300 Hours</div>
           </div>
           <div>
             <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1 flex items-center gap-1">
               <span className="text-purple-500">🏢</span> Resource Availability
             </div>
             <div className="font-black text-slate-900">High (3 Industrial Labs)</div>
           </div>
           <div>
             <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1 flex items-center gap-1">
               <span className="text-orange-500">🚀</span> Pilot & Deployment
             </div>
             <div className="font-black text-slate-900 text-sm">Jamshedpur & West Singhbhum Plants</div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderOpportunities = () => (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[calc(100vh-160px)]">
       <div className="flex border-b border-slate-200 px-6 pt-2">
         {['Micro-Expert Help Desk (4)', 'Startup Launchpad (2)', 'Investor Pitch Days (2)'].map((tab, i) => {
           return (
             <button 
               key={tab} 
               className={\`px-4 py-4 font-semibold text-sm transition-colors border-b-2 \${i === 0 ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-700'}\`}
             >
               {tab}
             </button>
           )
         })}
       </div>

       <div className="flex-1 overflow-auto p-8 bg-slate-50/50">
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 mb-8 flex justify-between items-center">
             <div>
               <h3 className="font-bold text-orange-900">Earn Honorarium & Contribute Senior Technical Guidance</h3>
               <p className="text-sm text-orange-700 mt-1">Short 2-5 hour reviews requested by university research groups across Jharkhand.</p>
             </div>
             <span className="font-bold text-orange-500 text-sm">Micro-Mentorship</span>
          </div>

          <div className="grid grid-cols-3 gap-6">
             <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Architecture Review</span>
                  <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">⏱️ 3 Hours</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2 leading-tight">High-Throughput IoT Telemetry Architecture Audit</h4>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">Review MQTT message broker scaling architecture for 50,000 active mine sensors.</p>
                
                <div className="text-xs text-slate-700 mb-6 flex gap-2">
                   <span className="font-bold text-slate-500">Required Tech:</span> 
                   <span className="bg-slate-100 px-1.5 py-0.5 rounded font-semibold">Cloud / MQTT / Kafka</span>
                </div>

                <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-100">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Expert Honorarium</div>
                    <div className="font-black text-green-600">₹15,000</div>
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-xs transition shadow-sm">
                    Accept Task
                  </button>
                </div>
             </div>

             <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">ML Model Review</span>
                  <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">⏱️ 4 Hours</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2 leading-tight">Paddy Leaf Blight Convolutional Neural Network Code Audit</h4>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">Evaluate PyTorch model precision, recall, and quantization for edge deployment on agricultural drones.</p>
                
                <div className="text-xs text-slate-700 mb-6 flex gap-2">
                   <span className="font-bold text-slate-500">Required Tech:</span> 
                   <span className="bg-slate-100 px-1.5 py-0.5 rounded font-semibold">PyTorch / Edge AI</span>
                </div>

                <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-100">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Expert Honorarium</div>
                    <div className="font-black text-green-600">₹20,000</div>
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-xs transition shadow-sm">
                    Accept Task
                  </button>
                </div>
             </div>

             <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2 py-1 rounded">UI/UX Review</span>
                  <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">⏱️ 2 Hours</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2 leading-tight">Tribal Solar Water ATM Kiosk Touchscreen UX Review</h4>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">Audit multilingual UI accessibility for rural villagers with low literacy rates.</p>
                
                <div className="text-xs text-slate-700 mb-6 flex gap-2">
                   <span className="font-bold text-slate-500">Required Tech:</span> 
                   <span className="bg-slate-100 px-1.5 py-0.5 rounded font-semibold">UI/UX / Accessibility</span>
                </div>

                <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-100">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Expert Honorarium</div>
                    <div className="font-black text-green-600">₹12,000</div>
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-xs transition shadow-sm">
                    Accept Task
                  </button>
                </div>
             </div>

             <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">Security Review</span>
                  <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">⏱️ 5 Hours</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2 leading-tight">Blockchain CSR Escrow Smart Contract Penetration Audit</h4>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">Review Solidity escrow contract for reentrancy vulnerabilities and access control flaws.</p>
                
                <div className="text-xs text-slate-700 mb-6 flex gap-2">
                   <span className="font-bold text-slate-500">Required Tech:</span> 
                   <span className="bg-slate-100 px-1.5 py-0.5 rounded font-semibold">Solidity / Smart Contracts</span>
                </div>

                <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-100">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Expert Honorarium</div>
                    <div className="font-black text-green-600">₹25,000</div>
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-xs transition shadow-sm">
                    Accept Task
                  </button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
`;

const insertIndex = content.lastIndexOf('return (');
if (insertIndex !== -1) {
    content = content.slice(0, insertIndex) + organisationCode + '\n  ' + content.slice(insertIndex);
    
    // Add them to the return statement
    content = content.replace(
      "{activeTab === 'impact' && renderAnalytics()}",
      "{activeTab === 'impact' && renderAnalytics()}\n      {activeTab === 'organisation' && renderOrganisation()}\n      {activeTab === 'opportunities' && renderOpportunities()}"
    );
    
    // Also remove the placeholder for these tabs
    content = content.replace(
      "{(activeTab !== 'dashboard' && activeTab !== 'collaborations' && activeTab !== 'impact') && (",
      "{(activeTab !== 'dashboard' && activeTab !== 'collaborations' && activeTab !== 'impact' && activeTab !== 'organisation' && activeTab !== 'opportunities') && ("
    );

    // Let's add AppContext
    if (!content.includes('import { AppContext }')) {
        content = content.replace(
            "import SidebarLayout from '../shared/SidebarLayout';",
            "import SidebarLayout from '../shared/SidebarLayout';\nimport { AppContext } from '../../context/AppContext';"
        );
        content = content.replace(
            "export default function IndustryDashboard() {",
            "export default function IndustryDashboard() {\n  const { state, dispatch } = React.useContext(AppContext);"
        );
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully patched IndustryDashboard.jsx');
} else {
    console.log('Could not find insertion point.');
}
