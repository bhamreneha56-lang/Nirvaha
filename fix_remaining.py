import glob

replacements = {
    'Coveorange': 'Covered',
    'coveorange': 'covered',
    'cuorange': 'cured',
    'clusteorange': 'clustered',
    'createColoorangeMarker': 'createColoredMarker',
    'coloorange': 'colored',
    'Coloorange': 'Colored',
    'supportRequiorange': 'supportRequired',
    'Triggeorange': 'Triggered',
    'triggeorange': 'triggered',
    'aiPorangeicted': 'aiPredicted',
    'Porangeicted': 'Predicted',
    'porangeicted': 'predicted',
    'Porangeiction': 'Prediction',
    'porangeiction': 'prediction',
    'Ordeorange': 'Ordered',
    'ordeorange': 'ordered',
    'Reorange': 'Rered',
    'filteorange': 'filtered',
    'Orangedy': 'Reddy',
}

def fix(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    orig = content
    for bad, good in sorted(replacements.items(), key=lambda x: -len(x[0])):
        content = content.replace(bad, good)
    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Fixed', filepath)

for ext in ('**/*.jsx', '**/*.tsx', '**/*.js', '**/*.ts'):
    for filepath in glob.glob(f'frontend/src/{ext}', recursive=True):
        fix(filepath)
