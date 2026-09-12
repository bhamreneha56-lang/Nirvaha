import os
path = "c:/Users/Dell/Desktop/sih/frontend/src/modules/university/ChallengesPage.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

import re
content = re.sub(r"onClick=\{\(\) => navigate\(\s*`/university/challenges/\$\{p\.id\}`\)?>", r"onClick={() => navigate(`/university/challenges/${p.id}`)}>", content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
