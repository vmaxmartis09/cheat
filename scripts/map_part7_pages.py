# -*- coding: utf-8 -*-
import pypdf
import re

r = pypdf.PdfReader('docs2/extracted/Session 11_ Final trial test correction (part 1)/Session 11: Final trial test correction (part 1)/reading part 7 original file.pdf')

passage_ranges = [
    (147, 148), (149, 150), (151, 152), (153, 154),
    (155, 157), (158, 161), (162, 164), (165, 167),
    (168, 171), (172, 175), (176, 180), (181, 185),
    (186, 190), (191, 195), (196, 200)
]

for idx, (sq, eq) in enumerate(passage_ranges):
    matching_pages = []
    for p_num, p in enumerate(r.pages):
        text = p.extract_text()
        if f"{sq}." in text or f"{eq}." in text or f"{sq}-{eq}" in text or f"{sq} -" in text or (sq == 153 and p_num == 3) or (sq == 186 and p_num in [15, 16]) or (sq == 196 and p_num in [19, 20]):
            matching_pages.append(p_num + 1)
    print(f"Passage {idx+1:2d} (Q{sq}-Q{eq}): Pages {matching_pages}")
