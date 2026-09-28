# -*- coding: utf-8 -*-
import json
import re
import openpyxl

# Load Part 5 questions from build_docs2_data.py
import build_docs2_data
part5_list = build_docs2_data.part5_questions

print(f"Loaded {len(part5_list)} Part 5 questions")

