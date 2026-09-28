# -*- coding: utf-8 -*-
import pypdf
import re

r = pypdf.PdfReader('docs2/extracted/Session 11_ Final trial test correction (part 1)/Session 11: Final trial test correction (part 1)/reading part 7 original file.pdf')
pages_text = [p.extract_text() for p in r.pages]

print(f"Read {len(pages_text)} pages")
