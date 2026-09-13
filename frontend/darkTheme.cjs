const fs = require('fs');

function makeDark(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replacements for Dark Theme
    content = content.replace(/bg-white/g, 'bg-slate-900/60');
    content = content.replace(/text-black/g, 'text-slate-100');
    content = content.replace(/border-blue-100/g, 'border-white/10');
    content = content.replace(/text-slate-500/g, 'text-slate-400');
    content = content.replace(/hover:bg-slate-100/g, 'hover:bg-white/10');
    content = content.replace(/hover:text-slate-900/g, 'hover:text-white');
    content = content.replace(/bg-slate-50/g, 'bg-white/5');
    content = content.replace(/border-blue-50/g, 'border-white/5');
    
    // In SidebarLayout
    content = content.replace(/bg-slate-900\/60 text-slate-100 font-sans/, 'bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 text-slate-100 font-sans');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Processed ' + filePath);
}

makeDark('src/modules/shared/SidebarLayout.jsx');
makeDark('src/modules/citizen/CitizenDashboard.jsx');