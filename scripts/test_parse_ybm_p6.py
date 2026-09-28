# -*- coding: utf-8 -*-
import re

with open('docs2/extracted/ybm_part6_ocr.txt') as f:
    text = f.read()

# Clean page headers
text = re.sub(r'=== PAGE \d+ ===', '', text)
text = re.sub(r'YBM RC 1000.*', '', text)
text = re.sub(r'GO ON TO THE NEXT PAGE', '', text)

matches = list(re.finditer(r'Questions?\s+(\d+)\s*[-–]\s*(\d+)', text))
print(f"Found {len(matches)} passages in YBM Part 6")

for i, m in enumerate(matches):
    sq, eq = int(m.group(1)), int(m.group(2))
    start_pos = m.start()
    end_pos = matches[i+1].start() if i+1 < len(matches) else len(text)
    block = text[start_pos:end_pos]
    print(f"Passage {i+1}: Q{sq}-Q{eq}, len={len(block)}")
