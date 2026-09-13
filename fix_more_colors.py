import re, glob

def fix(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    orig = content
    
    # Replace unauthorized colors
    content = re.sub(r'bg-purple-\d+', 'bg-blue-200', content)
    content = re.sub(r'text-purple-\d+', 'text-blue-600', content)
    content = re.sub(r'border-purple-\d+', 'border-blue-300', content)
    
    content = re.sub(r'bg-indigo-\d+', 'bg-blue-500', content)
    content = re.sub(r'text-indigo-\d+', 'text-blue-600', content)
    content = re.sub(r'border-indigo-\d+', 'border-blue-400', content)
    
    content = re.sub(r'bg-slate-\d+', 'bg-white', content)  
    # Wait, if I replace all bg-slate-\d+, what about buttons? bg-slate-900 was replaced by bg-blue-600.
    # What's left might be bg-slate-50, 100, 200 which were replaced by bg-white.
    
    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Fixed colors in", filepath)

for ext in ('**/*.jsx', '**/*.tsx', '**/*.js', '**/*.ts'):
    for filepath in glob.glob(f'frontend/src/modules/{ext}', recursive=True):
        fix(filepath)
