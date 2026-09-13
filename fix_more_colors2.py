import re, glob

def fix(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    orig = content
    
    # Map colors to the allowed 4
    content = re.sub(r'amber', 'orange', content)
    content = re.sub(r'emerald', 'green', content)
    content = re.sub(r'teal', 'blue', content)
    content = re.sub(r'cyan', 'blue', content)
    content = re.sub(r'red', 'orange', content)
    content = re.sub(r'rose', 'orange', content)
    content = re.sub(r'pink', 'orange', content)
    content = re.sub(r'zinc', 'gray', content)  # gray is a shade of black/white but let's replace text-zinc to black
    content = re.sub(r'text-gray-\d+', 'text-black', content)
    
    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Fixed colors in", filepath)

for ext in ('**/*.jsx', '**/*.tsx', '**/*.js', '**/*.ts'):
    for filepath in glob.glob(f'frontend/src/modules/{ext}', recursive=True):
        fix(filepath)
