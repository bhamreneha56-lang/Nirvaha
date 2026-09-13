import re, glob

# All English words/JS methods containing 'red' that got mangled to 'orange'
replacements = {
    '.orangeuce': '.reduce',
    'orangeuce(': 'reduce(',
    'orangeirect': 'redirect',
    'Orangeirect': 'Redirect',
    'orangeundant': 'redundant',
    'orangeiscover': 'rediscover',
    'orangeeploy': 'redeploy',
    'orangeuce': 'reduce',
    'orangeucer': 'reducer',
    'orangeucers': 'reducers',
    'orangeuced': 'reduced',
    'orangeucing': 'reducing',
    'orangeuction': 'reduction',
    'orangeistribute': 'redistribute',
    'credorangeials': 'credentials',
    'credorangeial': 'credential',
    'childorangeon': 'children',
    'hundoranges': 'hundreds',
    'hundorange': 'hundred',
    'addoranges': 'address',
    'addoranges': 'address',
    'addorange': 'address',
    'recorangeion': 'recordion',
    'featuorange': 'featured',
    'registeorange': 'registered',
    'prefeoranged': 'preferred',
    'configurorange': 'configured',
    'infraorange': 'infrared',
    'boranged': 'bored',
    'scorange': 'scored',
    'storange': 'stored',
    'ignoorange': 'ignored',
    'explorange': 'explored',
    'acquiorange': 'acquired',
    'desiorange': 'desired',
    'inspiorange': 'inspired',
    'hiorange': 'hired',
    'fiorange': 'fired',
    'tiorange': 'tired',
    'wiorange': 'wired',
    'exporange': 'expired',
    'admiorange': 'admired',
    'requiorange': 'required',
    'retirange': 'retired',
    'paiorange': 'paired',
    'repaiorange': 'repaired',
    'compaiorange': 'compared',
    'preparorange': 'prepared',
    'declarorange': 'declared',
    'cleaorange': 'cleared',
    'appeaorange': 'appeared',
    'disappeaorange': 'disappeared',
    'squaorange': 'squared',
    'uncleaorange': 'uncleared',
    'answorange': 'answered',
    'empoweorange': 'empowered',
    'discoveorange': 'discovered',
    'recoveorange': 'recovered',
    'uncoveorange': 'uncovered',
    'deliveorange': 'delivered',
    'consideorange': 'considered',
    'monitoorange': 'monitored',
    'enteorange': 'entered',
    'centeorange': 'centered',
    'filteorange': 'filtered',
    'rendeorange': 'rendered',
    'offeorange': 'offered',
    'suffeorange': 'suffered',
    'triggeorange': 'triggered',
    'alteorange': 'altered',
    'ordeorange': 'ordered',
    'bordeorange': 'bordered',
    'poweorange': 'powered',
    'toweorange': 'towered',
    'loweorange': 'lowered',
    'showeorange': 'showered',
    'gatheorange': 'gathered',
    'engineeorange': 'engineered',
    'volunteeorange': 'volunteered',
    'pioneeorange': 'pioneered',
    'structuorange': 'structured',
    'captuorange': 'captured',
    'measuorange': 'measured',
    'secuorange': 'secured',
    'ensuorange': 'ensured',
    'proceduorange': 'procedured',
    'occurorange': 'occurred',
    'transferorange': 'transferred',
    'prefeorange': 'preferred',
    'refeorange': 'referred',
    'infeorange': 'inferred',
    'diffeorange': 'differed',
    'Orangeirect': 'Redirect',
    'orangeirect': 'redirect',
    'orangeistribut': 'redistribut',
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
# Also check utils, context, etc.
for ext in ('**/*.jsx', '**/*.tsx', '**/*.js', '**/*.ts'):
    for filepath in glob.glob(f'frontend/src/{ext}', recursive=True):
        pass  # already covered above
