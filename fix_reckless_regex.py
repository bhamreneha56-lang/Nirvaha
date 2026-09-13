import re, glob

def fix(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    orig = content
    
    # Fix the reckless red->orange
    content = content.replace('shaorange', 'shared')
    content = content.replace('renorange', 'rendered')
    content = content.replace('storange', 'stored')
    content = content.replace('exploorange', 'explored')
    content = content.replace('compaoorange', 'compared')
    content = content.replace('unresoorange', 'unresolved')
    content = content.replace('cenorange', 'centered')
    content = content.replace('scorange', 'scored')
    content = content.replace('cblue', 'cyan')
    content = content.replace('sblue', 'steal')
    content = content.replace('incorangeible', 'incredible')
    
    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Reverted mistakes in", filepath)

for ext in ('**/*.jsx', '**/*.tsx', '**/*.js', '**/*.ts'):
    for filepath in glob.glob(f'frontend/src/modules/{ext}', recursive=True):
        fix(filepath)
