# -*- coding: utf-8 -*-
import pypdf

r = pypdf.PdfReader('docs2/extracted/Session 11_ Final trial test correction (part 1)/Session 11: Final trial test correction (part 1)/reading part 7 original file.pdf')

for p_num in range(1, len(r.pages)):
    print(f"=== PAGE {p_num+1} ===")
    lines = [l.strip() for l in r.pages[p_num].extract_text().split('\n') if l.strip()]
    for l in lines[:15]:
        print("  ", l)
