import os
import re
import glob

def patch_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Replace dark backgrounds with blue or orange or white
    content = re.sub(r'bg-slate-900|bg-slate-800|bg-black', 'bg-blue-600', content)
    content = re.sub(r'hover:bg-black|hover:bg-slate-900|hover:bg-slate-800', 'hover:bg-blue-700', content)
    
    # Replace dark gradients in Industry
    content = re.sub(r'bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950', 'bg-white border-2 border-blue-500', content)
    content = re.sub(r'bg-gradient-to-br from-slate-900 to-slate-800', 'bg-white border-2 border-green-500', content)
    
    # Text colors to black
    content = re.sub(r'text-slate-900|text-slate-800|text-slate-700|text-slate-600|text-slate-500|text-slate-400', 'text-black', content)
    content = re.sub(r'text-gray-900|text-gray-800|text-gray-700|text-gray-600|text-gray-500|text-gray-400', 'text-black', content)
    
    # Some specific texts on white backgrounds that were white (like in Industry dark card)
    # The Industry card was text-white, now background is white, so text must be black
    # Instead of blindly doing this, let's just ensure no 'text-indigo-200' etc
    content = re.sub(r'text-indigo-200|text-indigo-300|text-purple-200', 'text-black', content)
    
    # Backgrounds to white
    content = re.sub(r'bg-slate-50|bg-slate-100|bg-slate-200', 'bg-white', content)
    content = re.sub(r'bg-gray-50|bg-gray-100|bg-gray-200', 'bg-white', content)
    
    # Borders to blue or green or orange
    content = re.sub(r'border-slate-200|border-slate-100|border-gray-200', 'border-blue-100', content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Patched {filepath}")

for ext in ('**/*.jsx', '**/*.tsx', '**/*.js', '**/*.ts'):
    for filepath in glob.glob(f'frontend/src/modules/{ext}', recursive=True):
        patch_file(filepath)
