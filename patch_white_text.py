import re

def fix(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    orig = content
    # In IndustryDashboard.jsx
    content = content.replace('bg-white border-2 border-blue-500 rounded-2xl p-8 text-white', 'bg-white border-2 border-blue-500 rounded-2xl p-8 text-black')
    content = content.replace('text-3xl font-black mb-3 text-white', 'text-3xl font-black mb-3 text-black')
    content = content.replace('text-5xl font-black text-white', 'text-5xl font-black text-black')
    # Any other text-white on white/bg-transparent?
    # the inline-block in IndustryDashboard
    content = content.replace('bg-white/10 text-orange-400 font-bold text-[10px]', 'bg-orange-100 text-orange-600 font-bold text-[10px]')
    content = content.replace('text-white border border-white/20', 'text-blue-600 border border-blue-200')
    
    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Fixed", filepath)

fix('frontend/src/modules/industry/IndustryDashboard.jsx')
