import re, glob

# Build a comprehensive list of words that contain 'red' and got mangled
replacements = {
    'filteorange': 'filtered',
    'stoorange': 'stored',
    'rendeorange': 'rendered',
    'shaorange': 'shared',
    'Porangeictive': 'Predictive',
    'porangeictive': 'predictive',
    'poweorange': 'powered',
    'requiorange': 'required',
    'requiorangeExpertise': 'requiredExpertise',
    'centeorange': 'centered',
    'Centeorange': 'Centered',
    'consideorange': 'considered',
    'monitoorange': 'monitored',
    'registeorange': 'registered',
    'deliveorange': 'delivered',
    'discoveorange': 'discovered',
    'triggeorange': 'triggered',
    'configurorange': 'configured',
    'captuorange': 'captured',
    'structuorange': 'structured',
    'featuorange': 'featured',
    'measuorange': 'measured',
    'secuorange': 'secured',
    'explorange': 'explored',
    'Explorange': 'Explored',
    'offorange': 'offered',
    'coveoorange': 'covered',
    'answorange': 'answered',
    'ensuorange': 'ensured',
    'enteorange': 'entered',
    'empoweorange': 'empowered',
    'desiorange': 'desired',
    'preparorange': 'prepared',
    'compaorange': 'compared',
    'prefeoranged': 'preferred',
    'prefeorange': 'preferred',
    'alteorange': 'altered',
    'adhorange': 'adhered',
    'appeaorange': 'appeared',
    'cleaorange': 'cleared',
    'declaorange': 'declared',
    'gatheorange': 'gathered',
    'occurange': 'occurred',
    'occurranged': 'occurred',
    'occurorange': 'occurred',
    'infeorange': 'inferred',
    'uncoveoorange': 'uncovered',
    'recoveorange': 'recovered',
    'ordeorange': 'ordered',
    'unordeorange': 'unordered',
    'bordeorange': 'bordered',
    'favourorange': 'favoured',
    'labourorange': 'laboured',
    'colourorange': 'coloured',
    'honourorange': 'honoured',
    'engineeorange': 'engineered',
    'volunteeorange': 'volunteered',
    'categoorangeies': 'categories',
    'Categoorangeies': 'Categories',
    'inauguorange': 'inaugurated',
}

def fix(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    orig = content
    for bad, good in replacements.items():
        content = content.replace(bad, good)
    
    # Catch any remaining 'orange' that is part of a word (not a class name)
    # But be careful not to break Tailwind classes
    
    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Fixed', filepath)

for ext in ('**/*.jsx', '**/*.tsx', '**/*.js', '**/*.ts'):
    for filepath in glob.glob(f'frontend/src/{ext}', recursive=True):
        fix(filepath)
