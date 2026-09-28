# -*- coding: utf-8 -*-
import re

with open('docs2/extracted/ybm_part5_ocr.txt') as f:
    text = f.read()

# Clean page headers
text = re.sub(r'=== PAGE \d+ ===', '', text)
text = re.sub(r'YBM RC 1000.*', '', text)
text = re.sub(r'GO ON TO THE NEXT PAGE', '', text)

blocks = [b.strip() for b in re.split(r'\n(?=1\d\d\.)', text) if b.strip()]
print(f"Found {len(blocks)} blocks in YBM Part 5")

for b in blocks[:5]:
    lines = [l.strip() for l in b.split('\n') if l.strip()]
    print("--- QUESTION ---")
    print(lines[0])
    for l in lines[1:]:
        if re.match(r'^\([A-D]\)', l):
            print("  ", l)
