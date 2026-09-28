# -*- coding: utf-8 -*-
import json
import re
import openpyxl

# 1. Load Part 5 questions
from build_docs2_data import part5_questions

# 2. Load Part 6 questions
from generate_docs2_questions import part6_questions

print(f"Part 5 count: {len(part5_questions)}")
print(f"Part 6 count: {len(part6_questions)}")
