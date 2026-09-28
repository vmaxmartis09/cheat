# -*- coding: utf-8 -*-
"""
Parses all 15 passages from part7_all_ocr.txt and outputs part7_questions.
"""

import re
import openpyxl

wb = openpyxl.load_workbook('docs2/extracted/Session 11_ Final trial test correction (part 1)/Session 11: Final trial test correction (part 1)/Master answer sheet for final test.xlsx', data_only=True)
ws = wb['answer Key for final test']
answers = {}
for r in range(3, 28):
    for c_q, c_a in [(10, 11), (12, 13), (14, 15), (16, 17)]:
        q = ws.cell(r, c_q).value
        a = ws.cell(r, c_a).value
        if q and 147 <= int(q) <= 200:
            answers[int(q)] = a

with open('docs2/extracted/part7_all_ocr.txt') as f:
    text = f.read()

# Clean up OCR noise like PAGE headers and footer barcodes
text = re.sub(r'=== PAGE \d+ ===', '', text)
text = re.sub(r'TEST\s*8\s*PART\s*7\s*\d+', '', text)
text = re.sub(r'GO ON TO THE NEXT PAGE', '', text)
text = re.sub(r'\d+\s+Hackers[Ii]ngang\.com', '', text)
text = re.sub(r'Hackers[Ii]ngang\.com', '', text)

matches = list(re.finditer(r'Questions?\s+(\d+)\s*[-–]\s*(\d+)\s+refer to the following\s+([^\n.]+)', text))

print(f"Found {len(matches)} passage headers")
for i, m in enumerate(matches):
    print(f"{i+1}: Q{m.group(1)}-Q{m.group(2)} -> {m.group(3).strip()}")
