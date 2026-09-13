import re, glob

pattern = re.compile(r'[a-zA-Z]orange|orange[a-ce-zA-CE-Z]')
skip_pattern = re.compile(r'bg-orange|text-orange|border-orange|shadow-orange|from-orange|to-orange|hover:orange|ring-orange|via-orange|divide-orange|placeholder-orange|outline-orange|selection:bg-orange|className|\.orange-|orange-\d|#.*orange|//.*orange|Orange')

for ext in ('**/*.jsx', '**/*.tsx', '**/*.js', '**/*.ts'):
    for filepath in glob.glob(f'frontend/src/{ext}', recursive=True):
        with open(filepath, 'r', encoding='utf-8') as f:
            for i, line in enumerate(f, 1):
                if pattern.search(line) and not skip_pattern.search(line):
                    print(f'{filepath}:{i}: {line.strip()[:120]}')
