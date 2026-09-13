const fs = require('fs');

let content = fs.readFileSync('src/modules/shared/SidebarLayout.jsx', 'utf8');

// Restore the white in the Tiranga flag border
content = content.replace(/<div className="h-full flex-1 bg-slate-900\/60"><\/div>/, '<div className="h-full flex-1 bg-white"></div>');

// Fix the header bg to be dark transparent instead of opaque slate-900/60
content = content.replace(/<header className="h-16 bg-slate-900\/60/g, '<header className="h-16 bg-white/5 backdrop-blur-md');

fs.writeFileSync('src/modules/shared/SidebarLayout.jsx', content, 'utf8');
console.log('Fixed SidebarLayout Tiranga and header');