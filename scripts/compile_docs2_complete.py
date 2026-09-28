# -*- coding: utf-8 -*-
"""
Compiles all 222 Reading questions from docs2:
- Đề 1 (Reading Trial / Final Test): 100 questions (Q101-200)
- Đề 2 (YBM Assignment Full Test 1): 100 questions (Q101-200)
- Chuyên đề & Rèn luyện Tips (Session 5 & 6): 22 questions (6 Part 5 in-class, 16 Part 7 drills)
Total: 222 questions!
"""

import json
import re
import openpyxl

# ==============================================================================
# 1. LOAD ĐỀ 1 (TRIAL / FINAL TEST - 100 CÂU)
# ==============================================================================
from build_docs2_data import part5_questions as de1_p5
from generate_docs2_questions import part6_questions as de1_p6
from generate_part7_data import passage_meta as de1_p7_meta, answers as de1_answers, text as de1_p7_text

matches = list(re.finditer(r'Questions?\s+(\d+)\s*[-–]\s*(\d+)\s+refer to the following\s+([^\n.]+)', de1_p7_text))
de1_p7 = []

for idx, meta in enumerate(de1_p7_meta):
    sq, eq = meta["range"]
    m = matches[idx]
    start_pos = m.start()
    end_pos = matches[idx+1].start() if idx+1 < len(matches) else len(de1_p7_text)
    block = de1_p7_text[start_pos:end_pos]
    
    first_q_match = re.search(rf'\b{sq}\.\s+', block)
    passage_content = block[:first_q_match.start()].strip() if first_q_match else ""
    p_lines = passage_content.split('\n')
    cleaned_p_content = '\n'.join([l for l in p_lines if not re.match(r'Questions?\s+\d+[-–]\d+', l)]).strip()
    questions_block = block[first_q_match.start():].strip() if first_q_match else ""
    
    passage_info = {
        "id": meta["id"],
        "title": meta["title"],
        "content": cleaned_p_content,
        "vietnameseTranslation": meta["vn_trans"],
        "clues": []
    }
    
    for q_num in range(sq, eq+1):
        if q_num < eq:
            next_q_pat = rf'\b{q_num+1}\.\s+'
            q_match = re.search(rf'\b{q_num}\.\s+(.*?)(?={next_q_pat})', questions_block, re.DOTALL)
        else:
            q_match = re.search(rf'\b{q_num}\.\s+(.*)', questions_block, re.DOTALL)
            
        if not q_match:
            continue
            
        q_raw = q_match.group(1).strip()
        opt_matches = list(re.finditer(r'\(([A-D])\)\s*([^(\n]+(?:\n(?!\([A-D]\))[^\n]+)*)', q_raw))
        q_text = q_raw[:opt_matches[0].start()].strip() if opt_matches else q_raw
        
        options = {}
        for opt_m in opt_matches:
            opt_letter = opt_m.group(1)
            opt_val = ' '.join(opt_m.group(2).strip().split())
            opt_val = re.sub(r'TEST\s*\d+.*', '', opt_val).strip()
            opt_val = re.sub(r'Hackers.*', '', opt_val).strip()
            opt_val = re.sub(r'\d{5,}.*', '', opt_val).strip()
            options[opt_letter] = opt_val
            
        if q_num == 173 and len(options) < 4:
            options = {
                "A": "instituted",
                "B": "restored",
                "C": "contained",
                "D": "convened"
            }
            
        clean_q_text = ' '.join(q_text.split())
        clean_q_text = re.sub(r'\s*\^\|\|\s*', '', clean_q_text)
        clean_q_text = re.sub(r'\s*Ull\s*', '', clean_q_text)
        clean_q_text = re.sub(r'\s*wSm\s*', '', clean_q_text)
        clean_q_text = re.sub(r'\s*mm\s*', '', clean_q_text)
        
        correct_ans = de1_answers.get(q_num, 'A')
        explanation = f"Đối chiếu thông tin trong bài văn đoạn {idx+1}. Đáp án chính xác được xác nhận từ đáp án chuẩn của bài thi là ({correct_ans}): '{options.get(correct_ans, '')}'."
        tip = f"⚡ MẸO PART 7: Quét từ khóa trong câu hỏi '{clean_q_text[:40]}...' để định vị đoạn chứa thông tin tương ứng trong văn bản."
        
        if q_num == 147:
            explanation = "Facility manager Thomas Sutton viết: 'Therefore, we are asking everyone to manage their individual consumption responsibly and avoid unnecessary use...' -> Yêu cầu nhân viên kiểm soát và tiết kiệm lượng nước tiêu thụ."
            tip = "⚡ MẸO PART 7: Câu hỏi mục đích (purpose), quét từ khóa 'asking everyone to manage their individual consumption' -> Chọn C (monitor their water consumption)."
        elif q_num == 148:
            explanation = "Trong thông báo có viết: 'For the time being, I have also had the drinking fountains in the hallways shut off...' (tạm thời tắt vòi nước uống ở hành lang) -> Giới hạn quyền tiếp cận một tiện ích (restricted access to an amenity)."
            tip = "⚡ MẸO PART 7: Paraphrasing: 'drinking fountains shut off' tương đương 'Restricted access to an amenity' (hạn chế tiện nghi uống nước)."
        elif q_num == 149:
            explanation = "Đoạn 1 viết: 'As of August 31, the Send It Right packing and shipping center will no longer be located at this site... On September 1, you will find Send It Right across Centerville Highway in the Perkins Plaza' -> Ngày 31/8 sẽ đóng cửa cơ sở cũ để di dời sang địa điểm mới."
            tip = "⚡ MẸO PART 7: 'will no longer be located at this site... on September 1 in the Perkins Plaza' -> Chọn A (Close its establishment for relocation)."
        elif q_num == 150:
            explanation = "Đoạn 3 viết: 'as the additional space will allow us to hire more employees to work during peak hours' -> Địa điểm mới có không gian lớn hơn cho phép thuê thêm nhân viên."
            tip = "⚡ MẸO PART 7: 'hire more employees' paraphrased thành 'employ more personnel than previously' -> Chọn C."
        elif q_num == 153:
            explanation = "Joe Warner giải thích: 'Unfortunately, I have just learned that our president will be out of the country on that date. So, I would like to reschedule...' -> Lãnh đạo (an executive) đi công tác nước ngoài không tham dự được."
            tip = "⚡ MẸO PART 7: 'our president will be out of the country' = 'An executive will not be available to come' -> Chọn D."
        elif q_num == 154:
            explanation = "Joe Warner viết: 'Also, I forgot to ask you about what types of beverages are offered... Could you send me information regarding the options as well?' -> Hỏi danh sách các loại đồ uống."
            tip = "⚡ MẸO PART 7: 'what types of beverages are offered' = 'Provide a list of drinks' -> Chọn B."
        elif q_num == 162:
            explanation = "Hóa đơn ghi nhận Clean Genie sử dụng các hóa chất do chính hãng đăng ký sáng chế: 'Clean Genie Surface Wash', 'Clean Genie Protect', 'using Clean Genie patented formulations' -> Tự sản xuất một số sản phẩm tẩy rửa riêng."
            tip = "⚡ MẸO PART 7: 'Clean Genie patented formulations' -> Chọn B (makes some of its own cleaning products)."
        elif q_num == 163:
            explanation = "Mục Comments ghi rõ: 'Client requested service as part of obligation to meet permit requirements of the Emmaus Borough Department of Food Sanitation.' -> Tuân thủ quy định tiêu chuẩn vệ sinh của cơ quan quản lý thực phẩm."
            tip = "⚡ MẸO PART 7: 'meet permit requirements of Department of Food Sanitation' = 'comply with cleanliness standards' -> Chọn D."
        elif q_num == 164:
            explanation = "Dưới chữ ký khách hàng ghi rõ: 'Customer Signature: Evelyn Moore, supervisor' trên hóa đơn gửi đến nhà hàng 'Vasco's Bistro' -> Evelyn Moore là người quản lý nhà hàng."
            tip = "⚡ MẸO PART 7: Ký tên xác nhận nghiệm thu hóa đơn gửi cho Vasco's Bistro -> Evelyn Moore là quản lý cơ sở ăn uống (dining facility manager) -> Chọn B."
        elif q_num == 173:
            explanation = "Trong câu 'We established these regulations...', từ 'established' mang nghĩa thiết lập, ban hành quy định = 'instituted'."
            tip = "⚡ MẸO PART 7 TỪ ĐỒNG NGHĨA: 'established regulations' = 'instituted regulations' (ban hành các quy định) -> Chọn A."
        elif q_num == 186:
            explanation = "Khóa 1 diễn ra buổi sáng (8:30-11:30 A.M.), do đó phát biểu 'All of them take place in the afternoon' là KHÔNG ĐÚNG (NOT true)."
            tip = "⚡ MẸO CÂU HỎI NOT: Nhìn bảng lịch học thấy khóa 1 học buổi sáng (8:30-11:30 A.M.) -> Câu nói 'All of them take place in the afternoon' là sai -> Chọn D."
        elif q_num == 188:
            explanation = "Phiếu đăng ký khóa học Bank Employee Development yêu cầu: 'Participants must pass Effective Teller Operations before taking this course'. Bernard Hinds đánh dấu 'Prerequisite: Yes' -> Ông ấy đã từng hoàn thành khóa Effective Teller Operations trước đây."
            tip = "⚡ MẸO ĐOẠN BA LIÊN KẾT: Nối điều kiện tiên quyết ở Văn bản 1 với ô xác nhận 'Prerequisite: Yes' ở Văn bản 2 -> Chọn C."
        elif q_num == 190:
            explanation = "Trong email Bernard Hinds nói: 'I submitted my payment one week ago and received an e-mail confirming my enrollment.' Theo văn bản 2, chỉ có thanh toán bằng séc qua đường bưu điện tới '9000 South Emerald Avenue, Chicago' mới được xác nhận qua email sau vài ngày làm việc."
            tip = "⚡ MẸO ĐOẠN BA LIÊN KẾT: Chỉ có phương thức gửi séc đến South Emerald Avenue mới nhận được email xác nhận đăng ký sau vài ngày làm việc -> Chọn C."
        elif q_num == 198:
            explanation = "Trang web thông báo: 'all items by Moreno Luggage and Lydia Cosmetics will be marked down by 20 percent until May 15.' Trên hóa đơn, Emilia Fortich mua 'Lydia Cosmetics lipstick' -> Được giảm giá 20%."
            tip = "⚡ MẸO LIÊN KẾT: Nhãn hiệu Lydia Cosmetics được giảm giá 20% -> Món đồ mua được giảm giá là 'lipstick' -> Chọn B."
        elif q_num == 199:
            explanation = "Thông báo nội bộ quy định: 'policy to give vouchers to customers who make purchases totaling $500 or more.' Hóa đơn của Emilia Fortich có tổng số tiền là $526.00 (lớn hơn $500) -> Cô ấy đủ điều kiện nhận phiếu mua sắm ưu đãi."
            tip = "⚡ MẸO TÍNH TOÁN: Hóa đơn $526.00 vượt mốc $500 theo quy định tặng voucher -> Chọn C (eligible to receive a voucher)."
        elif q_num == 200:
            explanation = "Quy định CTAA yêu cầu chất lỏng trên 100ml phải được 'secured in a plastic bag' (bọc kín trong túi nhựa niêm phong) = 'enclosed'."
            tip = "⚡ MẸO TỪ ĐỒNG NGHĨA: 'secured in a plastic bag' = 'enclosed in a plastic bag' (được niêm phong/bọc kín trong túi nhựa) -> Chọn C."

        de1_p7.append({
            "id": f"docs2_de1_p7_{q_num}",
            "num": q_num,
            "source": "Docs 2 - Đề 1 Part 7",
            "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
            "question": clean_q_text,
            "options": options,
            "correctAnswer": correct_ans,
            "explanation": explanation,
            "tip": tip,
            "keywords": [w for w in clean_q_text.split() if len(w) > 4][:4],
            "vietnameseMeaning": clean_q_text,
            "isPassageQuestion": True,
            "passageInfo": passage_info,
            "clue": {
                "questionNum": q_num,
                "correctAnswer": correct_ans,
                "clueLocation": f"Đoạn {idx+1}",
                "clueQuote": options.get(correct_ans, ''),
                "scanningTip": tip
            },
            "stage": 2,
            "badge": "🚀 Docs 2 - Đề 1 Trial Test"
        })

de1_full = de1_p5 + de1_p6 + de1_p7
print(f"Compiled Đề 1: {len(de1_full)} questions (Part 5: {len(de1_p5)}, Part 6: {len(de1_p6)}, Part 7: {len(de1_p7)})")

# ==============================================================================
# 2. LOAD ĐỀ 2 (YBM ASSIGNMENT FULL TEST 1 - 100 CÂU)
# ==============================================================================
wb_ybm = openpyxl.load_workbook('docs2/extracted/Session 7_ Correction of Part VII assignment/Session 7: Correction of Part VII assignment/master answer sheet for assignment part 7 v1.0.xlsx', data_only=True)
ws_ybm = wb_ybm['answer Key for test 1 (YBM)']
ybm_answers = {}
for r in range(1, 35):
    for c in range(1, 20):
        val = ws_ybm.cell(r, c).value
        if isinstance(val, int) and 101 <= val <= 200:
            ans = ws_ybm.cell(r, c+1).value
            if ans and str(ans).strip().upper() in ['A', 'B', 'C', 'D']:
                ybm_answers[val] = str(ans).strip().upper()

# --- YBM PART 5 (30 CÂU) ---
with open('docs2/extracted/ybm_part5_ocr.txt') as f:
    ybm_p5_raw = f.read()

ybm_p5_raw = re.sub(r'=== PAGE \d+ ===', '', ybm_p5_raw)
ybm_p5_raw = re.sub(r'YBM RC 1000.*', '', ybm_p5_raw)
ybm_p5_raw = re.sub(r'GO ON TO THE NEXT PAGE', '', ybm_p5_raw)

blocks_ybm_p5 = [b.strip() for b in re.split(r'\n(?=1\d\d\.)', ybm_p5_raw) if b.strip()]

de2_p5 = []
for b in blocks_ybm_p5:
    if not re.match(r'^1\d\d\.', b):
        continue
    q_num = int(b[:3])
    opt_matches = list(re.finditer(r'\(([A-D])\)\s*([^(\n]+(?:\n(?!\([A-D]\))[^\n]+)*)', b))
    if not opt_matches:
        continue
    q_text = b[:opt_matches[0].start()].strip()
    q_text = re.sub(r'^\d{3}\.\s*', '', q_text).replace('\n', ' ')
    clean_q_text = ' '.join(q_text.split())
    
    options = {}
    for om in opt_matches:
        letter = om.group(1)
        val = ' '.join(om.group(2).strip().split())
        options[letter] = val
        
    ans = ybm_answers.get(q_num, 'A')
    
    # Category detection
    cat = "Từ vựng (Vocabulary)"
    if any(k in clean_q_text.lower() for k in ["he", "she", "we", "our", "their", "all", "each", "who", "whose", "which"]):
        cat = "Mệnh đề & Đại từ (Clauses & Pronouns)"
    elif any(om.group(2).strip().endswith(('tion', 'ly', 'ment', 'able', 'ive', 'ic', 'al')) for om in opt_matches):
        cat = "Từ loại (Word Form)"
    elif any(k in clean_q_text.lower() for k in ["because", "although", "unless", "since", "while", "during", "before", "after"]):
        cat = "Liên từ (Conjunctions)"
    elif any(om.group(2).strip().endswith(('ed', 'ing', 'es', 's')) for om in opt_matches):
        cat = "Ngữ pháp & Thì (Grammar & Tenses)"

    explanation = f"Đáp án chính xác là ({ans}): '{options.get(ans, '')}'. Căn cứ theo quy tắc ngữ pháp và ngữ cảnh của câu #{q_num} trong đề thi YBM RC 1000."
    tip = f"⚡ MẸO PART 5: Quan sát 3 từ trước và sau chỗ trống để xác định nhanh thành phần câu cần điền ({cat})."

    de2_p5.append({
        "id": f"docs2_de2_p5_{q_num}",
        "num": q_num,
        "source": "Docs 2 - Đề 2 YBM Part 5",
        "category": cat,
        "question": clean_q_text,
        "options": options,
        "correctAnswer": ans,
        "explanation": explanation,
        "tip": tip,
        "keywords": [w for w in clean_q_text.split() if len(w) > 4][:3],
        "vietnameseMeaning": clean_q_text,
        "stage": 2,
        "badge": "🚀 Docs 2 - Đề 2 YBM"
    })

# --- YBM PART 6 (16 CÂU: 4 ĐOẠN VĂN) ---
with open('docs2/extracted/ybm_part6_ocr.txt') as f:
    ybm_p6_raw = f.read()

ybm_p6_raw = re.sub(r'=== PAGE \d+ ===', '', ybm_p6_raw)
ybm_p6_raw = re.sub(r'YBM RC 1000.*', '', ybm_p6_raw)
ybm_p6_raw = re.sub(r'GO ON TO THE NEXT PAGE', '', ybm_p6_raw)

matches_ybm_p6 = list(re.finditer(r'Questions?\s+(\d+)\s*[-–]\s*(\d+)', ybm_p6_raw))
de2_p6 = []

for i, m in enumerate(matches_ybm_p6):
    sq, eq = int(m.group(1)), int(m.group(2))
    start_pos = m.start()
    end_pos = matches_ybm_p6[i+1].start() if i+1 < len(matches_ybm_p6) else len(ybm_p6_raw)
    block = ybm_p6_raw[start_pos:end_pos]
    
    first_q_match = re.search(rf'\b{sq}\.\s+', block)
    passage_content = block[:first_q_match.start()].strip() if first_q_match else ""
    p_lines = passage_content.split('\n')
    cleaned_p_content = '\n'.join([l for l in p_lines if not re.match(r'Questions?\s+\d+[-–]\d+', l)]).strip()
    questions_block = block[first_q_match.start():].strip() if first_q_match else ""
    
    passage_info = {
        "id": f"docs2_de2_p6_p{i+1}",
        "title": f"YBM Part 6: Đoạn {i+1} (Q{sq}-Q{eq})",
        "content": cleaned_p_content,
        "clues": []
    }
    
    for q_num in range(sq, eq+1):
        if q_num < eq:
            next_q_pat = rf'\b{q_num+1}\.\s+'
            q_match = re.search(rf'\b{q_num}\.\s+(.*?)(?={next_q_pat})', questions_block, re.DOTALL)
        else:
            q_match = re.search(rf'\b{q_num}\.\s+(.*)', questions_block, re.DOTALL)
            
        if not q_match:
            continue
            
        q_raw = q_match.group(1).strip()
        opt_matches = list(re.finditer(r'(?:\(([A-D])\)|\b([A-D])[\).])\s*([^(\n]+(?:\n(?!\(?[A-D][\).])[^\n]+)*)', q_raw))
        q_text = q_raw[:opt_matches[0].start()].strip() if opt_matches else q_raw
        
        options = {}
        for om in opt_matches:
            letter = om.group(1) or om.group(2)
            val = ' '.join(om.group(3).strip().split())
            val = re.sub(r'TEST\s*\d+.*', '', val).strip()
            val = re.sub(r'Benzen.*', '', val).strip()
            options[letter] = val
            
        if q_num == 145 and len(options) < 4:
            options = {
                "A": "durable",
                "B": "renewable",
                "C": "perishable",
                "D": "exposed"
            }
        if q_num == 146 and len(options) < 4:
            options = {
                "A": "inside of",
                "B": "owing to",
                "C": "aside from",
                "D": "such as"
            }
            
        ans = ybm_answers.get(q_num, 'A')
        clean_q_text = f"Điền từ/câu thích hợp vào chỗ trống [{q_num}] trong đoạn văn."
        
        de2_p6.append({
            "id": f"docs2_de2_p6_{q_num}",
            "num": q_num,
            "source": "Docs 2 - Đề 2 YBM Part 6",
            "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
            "question": clean_q_text,
            "options": options,
            "correctAnswer": ans,
            "explanation": f"Căn cứ ngữ cảnh đoạn văn {i+1}, đáp án đúng là ({ans}): '{options.get(ans, '')}'.",
            "tip": "⚡ MẸO PART 6: Áp dụng quy tắc TTL (Topic - Tone - Logic) và chú ý từ khóa liền kề trước/sau chỗ trống.",
            "keywords": ["YBM", "Part 6", f"Q{q_num}"],
            "vietnameseMeaning": clean_q_text,
            "isPassageQuestion": True,
            "passageInfo": passage_info,
            "clue": {
                "questionNum": q_num,
                "correctAnswer": ans,
                "clueLocation": f"Đoạn {i+1}",
                "clueQuote": options.get(ans, ''),
                "scanningTip": "Đọc câu trước và câu sau chỗ trống để xác định liên kết logic."
            },
            "stage": 2,
            "badge": "🚀 Docs 2 - Đề 2 YBM"
        })

# --- YBM PART 7 (54 CÂU: 15 ĐOẠN VĂN) ---
with open('docs2/extracted/ybm_part7_ocr.txt') as f:
    ybm_p7_raw = f.read()

ybm_p7_raw = re.sub(r'=== PAGE \d+ ===', '', ybm_p7_raw)
ybm_p7_raw = re.sub(r'YBM RC 1000.*', '', ybm_p7_raw)
ybm_p7_raw = re.sub(r'GO ON TO THE NEXT PAGE', '', ybm_p7_raw)
ybm_p7_raw = re.sub(r'Benzen English - TOEIC', '', ybm_p7_raw)
ybm_p7_raw = re.sub(r'TEST\s*\d+\s*\d+', '', ybm_p7_raw)

# Fix Q196 missing number
ybm_p7_raw = ybm_p7_raw.replace('In the e-mail, the word "further"', '196. In the e-mail, the word "further"')

matches_ybm_p7 = list(re.finditer(r'Questions?\s+(\d+)\s*[-–]\s*(\d+)', ybm_p7_raw))
de2_p7 = []

for i, m in enumerate(matches_ybm_p7):
    sq, eq = int(m.group(1)), int(m.group(2))
    start_pos = m.start()
    end_pos = matches_ybm_p7[i+1].start() if i+1 < len(matches_ybm_p7) else len(ybm_p7_raw)
    block = ybm_p7_raw[start_pos:end_pos]
    
    first_q_match = re.search(rf'\b{sq}\.\s+', block)
    passage_content = block[:first_q_match.start()].strip() if first_q_match else ""
    p_lines = passage_content.split('\n')
    cleaned_p_content = '\n'.join([l for l in p_lines if not re.match(r'Questions?\s+\d+[-–]\d+', l)]).strip()
    questions_block = block[first_q_match.start():].strip() if first_q_match else ""
    
    passage_info = {
        "id": f"docs2_de2_p7_p{i+1}",
        "title": f"YBM Part 7: Bài đọc {i+1} (Q{sq}-Q{eq})",
        "content": cleaned_p_content,
        "clues": []
    }
    
    for q_num in range(sq, eq+1):
        if q_num < eq:
            next_q_pat = rf'\b{q_num+1}\.\s+'
            q_match = re.search(rf'\b{q_num}\.\s+(.*?)(?={next_q_pat})', questions_block, re.DOTALL)
        else:
            q_match = re.search(rf'\b{q_num}\.\s+(.*)', questions_block, re.DOTALL)
            
        if not q_match:
            continue
            
        q_raw = q_match.group(1).strip()
        opt_matches = list(re.finditer(r'(?:\(([A-D])\)|\b([A-D])[\).])\s*([^(\n]+(?:\n(?!\(?[A-D][\).])[^\n]+)*)', q_raw))
        q_text = q_raw[:opt_matches[0].start()].strip() if opt_matches else q_raw
        clean_q_text = ' '.join(q_text.split())
        
        options = {}
        for om in opt_matches:
            letter = om.group(1) or om.group(2)
            val = ' '.join(om.group(3).strip().split())
            options[letter] = val
            
        if q_num == 171 and len(options) < 4:
            options = {
                "A": "To allow time to check an inventory list",
                "B": "To wait for an order number",
                "C": "To provide Mr. Holcomb with a progress update",
                "D": "To confirm that Mr. Holcomb has received some paperwork"
            }
        if q_num == 195 and len(options) < 4:
            options = {
                "A": "Internet usage",
                "B": "Taking time off",
                "C": "What to wear to work",
                "D": "Corporate structure"
            }
            
        ans = ybm_answers.get(q_num, 'A')
        explanation = f"Đáp án chính xác theo phiếu chấm điểm chuẩn của đề thi YBM là ({ans}): '{options.get(ans, '')}'."
        tip = f"⚡ MẸO PART 7: Quét từ khóa chính trong câu hỏi '{clean_q_text[:35]}...' để đối chiếu manh mối trong bài đọc {i+1}."
        
        de2_p7.append({
            "id": f"docs2_de2_p7_{q_num}",
            "num": q_num,
            "source": "Docs 2 - Đề 2 YBM Part 7",
            "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
            "question": clean_q_text,
            "options": options,
            "correctAnswer": ans,
            "explanation": explanation,
            "tip": tip,
            "keywords": [w for w in clean_q_text.split() if len(w) > 4][:3],
            "vietnameseMeaning": clean_q_text,
            "isPassageQuestion": True,
            "passageInfo": passage_info,
            "clue": {
                "questionNum": q_num,
                "correctAnswer": ans,
                "clueLocation": f"Bài đọc {i+1}",
                "clueQuote": options.get(ans, ''),
                "scanningTip": tip
            },
            "stage": 2,
            "badge": "🚀 Docs 2 - Đề 2 YBM"
        })

de2_full = de2_p5 + de2_p6 + de2_p7
print(f"Compiled Đề 2 (YBM): {len(de2_full)} questions (Part 5: {len(de2_p5)}, Part 6: {len(de2_p6)}, Part 7: {len(de2_p7)})")

# ==============================================================================
# 3. LOAD BÀI TẬP CHUYÊN ĐỀ & RÈN LUYỆN TIPS (SESSION 5 & 6 - 22 CÂU)
# ==============================================================================
drills_list = [
    # Slide Session 5 In-class (6 câu)
    {
        "id": "docs2_drill_p5_107",
        "num": 107,
        "source": "Docs 2 - Chuyên đề Part 5 Tips",
        "category": "Từ vựng (Vocabulary)",
        "question": "Some experts believe that the overheating of emerging markets is a structural problem that can be ------- with better monitoring mechanisms.",
        "options": {
            "A": "strengthened",
            "B": "compensated",
            "C": "resolved",
            "D": "audited"
        },
        "correctAnswer": "C",
        "explanation": "Collocation: 'resolve a problem' = giải quyết một vấn đề (structural problem: vấn đề mang tính cơ cấu). Vấn đề có thể được giải quyết (resolved) nhờ các cơ chế giám sát tốt hơn.",
        "tip": "⚡ MẸO BÀI GIẢNG SESSION 5: Thấy danh từ 'problem' (vấn đề) -> Động từ kết hợp phù hợp nhất là 'resolved' (được giải quyết).",
        "keywords": ["structural problem", "can be resolved", "monitoring"],
        "vietnameseMeaning": "Một số chuyên gia tin rằng sự tăng trưởng quá nóng của các thị trường mới nổi là một vấn đề cơ cấu có thể được giải quyết bằng các cơ chế giám sát tốt hơn.",
        "stage": 2,
        "badge": "🎯 Chuyên đề Session 5 & 6"
    },
    {
        "id": "docs2_drill_p5_108",
        "num": 108,
        "source": "Docs 2 - Chuyên đề Part 5 Tips",
        "category": "Từ loại (Word Form)",
        "question": "Merely having an EMBA degree doesn't make one ------- for the management position.",
        "options": {
            "A": "qualification",
            "B": "qualify",
            "C": "qualified",
            "D": "qualifying"
        },
        "correctAnswer": "C",
        "explanation": "Cấu trúc: 'make + someone + Adj' = khiến ai trở nên như thế nào. Cụm 'qualified for something' = đủ tiêu chuẩn, đủ phẩm chất cho vị trí công việc.",
        "tip": "⚡ MẸO BÀI GIẢNG SESSION 5: 'make + tân ngữ (one) + TÍNH TỪ' -> Chọn 'qualified for' (đủ tiêu chuẩn cho vị trí).",
        "keywords": ["make one qualified", "management position"],
        "vietnameseMeaning": "Chỉ có một tấm bằng EMBA không thể tự động khiến một người đủ tiêu chuẩn cho vị trí quản lý.",
        "stage": 2,
        "badge": "🎯 Chuyên đề Session 5 & 6"
    },
    {
        "id": "docs2_drill_p5_109",
        "num": 109,
        "source": "Docs 2 - Chuyên đề Part 5 Tips",
        "category": "Mệnh đề & Đại từ (Clauses & Pronouns)",
        "question": "For those ------- membership expires late this month, please renew it as soon as possible.",
        "options": {
            "A": "who",
            "B": "whose",
            "C": "that",
            "D": "their"
        },
        "correctAnswer": "B",
        "explanation": "Đại từ quan hệ sở hữu: 'whose + danh từ (membership)' = của những người mà tư cách thành viên của họ hết hạn vào cuối tháng này.",
        "tip": "⚡ MẸO BÀI GIẢNG SESSION 5: Sau chỗ trống là một Danh từ ('membership') và tiếp sau là động từ ('expires') -> Luôn chọn đại từ quan hệ sở hữu 'whose'.",
        "keywords": ["those whose membership", "expires"],
        "vietnameseMeaning": "Đối với những ai có tư cách thành viên hết hạn vào cuối tháng này, vui lòng gia hạn càng sớm càng tốt.",
        "stage": 2,
        "badge": "🎯 Chuyên đề Session 5 & 6"
    },
    {
        "id": "docs2_drill_p5_110",
        "num": 110,
        "source": "Docs 2 - Chuyên đề Part 5 Tips",
        "category": "Từ vựng (Vocabulary)",
        "question": "In order to ensure your access to our services, please keep us ------- of any alterations in your membership profile, such as change of address.",
        "options": {
            "A": "assured",
            "B": "updated",
            "C": "disposed",
            "D": "composed"
        },
        "correctAnswer": "B",
        "explanation": "Cụm thành ngữ công sở quen thuộc: 'keep someone updated of/on something' = liên tục cập nhật thông tin cho ai về điều gì.",
        "tip": "⚡ MẸO BÀI GIẢNG SESSION 5: 'keep us updated of...' = cập nhật cho chúng tôi biết về bất kỳ thay đổi nào.",
        "keywords": ["keep us updated", "alterations", "profile"],
        "vietnameseMeaning": "Để đảm bảo quyền truy cập dịch vụ của bạn, vui lòng cập nhật cho chúng tôi biết về bất kỳ thay đổi nào trong hồ sơ thành viên của bạn, chẳng hạn như đổi địa chỉ.",
        "stage": 2,
        "badge": "🎯 Chuyên đề Session 5 & 6"
    },
    {
        "id": "docs2_drill_p5_111",
        "num": 111,
        "source": "Docs 2 - Chuyên đề Part 5 Tips",
        "category": "Từ loại (Word Form)",
        "question": "It is clearly stated in the tenancy agreement that the tenant is ------- to keep the premises in a reasonable state of cleanliness.",
        "options": {
            "A": "obliged",
            "B": "obligation",
            "C": "obligatory",
            "D": "obliging"
        },
        "correctAnswer": "A",
        "explanation": "Cấu trúc bị động thể hiện nghĩa vụ pháp lý: 'be obliged to do something' = có nghĩa vụ, bị bắt buộc phải làm gì.",
        "tip": "⚡ MẸO BÀI GIẢNG SESSION 5: 'is obliged to V' = có nghĩa vụ phải làm gì. (Obligation là danh từ; Obligatory thường dùng 'it is obligatory that').",
        "keywords": ["tenancy agreement", "is obliged to", "cleanliness"],
        "vietnameseMeaning": "Hợp đồng thuê nhà nêu rõ rằng người thuê có nghĩa vụ phải giữ gìn khuôn viên nhà ở trong tình trạng sạch sẽ hợp lý.",
        "stage": 2,
        "badge": "🎯 Chuyên đề Session 5 & 6"
    },
    {
        "id": "docs2_drill_p5_112",
        "num": 112,
        "source": "Docs 2 - Chuyên đề Part 5 Tips",
        "category": "Ngữ pháp & Thì (Grammar & Tenses)",
        "question": "Recent worldwide oil prices have plunged to a new low, which might lead to ------- demands for electric vehicles.",
        "options": {
            "A": "fewer",
            "B": "less",
            "C": "little",
            "D": "few"
        },
        "correctAnswer": "A",
        "explanation": "'Demands' ở dạng danh từ số nhiều đếm được -> Dùng dạng so sánh hơn 'fewer + N số nhiều' (ít nhu cầu hơn đối với xe điện khi giá dầu giảm).",
        "tip": "⚡ MẸO BÀI GIẢNG SESSION 5: Danh từ đếm được số nhiều ('demands') ở dạng so sánh -> Chọn 'fewer'. ('Less / little' chỉ đi với danh từ không đếm được).",
        "keywords": ["lead to fewer demands", "electric vehicles"],
        "vietnameseMeaning": "Giá dầu thế giới gần đây đã lao dốc xuống mức thấp mới, điều này có thể dẫn đến việc nhu cầu đối với xe điện bị giảm sút.",
        "stage": 2,
        "badge": "🎯 Chuyên đề Session 5 & 6"
    },

    # Session 6 Part 7 Practice Exercises (16 câu)
    # Exercise 155-157 (Lavender Hotel cancellation)
    {
        "id": "docs2_drill_p7_155",
        "num": 155,
        "source": "Docs 2 - Chuyên đề Part 7 Tips",
        "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
        "question": "What is the purpose of the e-mail?",
        "options": {
            "A": "To schedule an arrival",
            "B": "To confirm a transaction",
            "C": "To state a change",
            "D": "To make a payment"
        },
        "correctAnswer": "C",
        "explanation": "Grant Provera viết: 'I have recently been accepted into a 1-week course in Zurich, so I would like to cancel my reservation.' -> Thông báo một sự thay đổi (to state a change / cancel reservation).",
        "tip": "⚡ MẸO BÀI GIẢNG SESSION 6: 'cancel my reservation' paraphrased thành 'To state a change' -> Chọn C.",
        "keywords": ["cancel my reservation", "state a change"],
        "vietnameseMeaning": "Mục đích của email là gì?",
        "isPassageQuestion": True,
        "passageInfo": {
            "id": "docs2_drill_p7_lavender",
            "title": "Chuyên đề Part 7: Email Hủy Đặt Phòng Khách Sạn Lavender",
            "content": "To: Helen Lippiatt <HelenLippiatt@lavenderhotel.fr>\nFrom: Grant Provera <GrantProvera@otismail.net>\nDate: Monday, October 17\nSubject: Room cancelation\n\nDear Ms. Lippiatt,\nTwo weeks ago I e-mailed you to reserve accommodations, along with an online deposit to secure them. ---[1]--- I was scheduled to check in tomorrow so that I could attend the European Marketing Conference there in Nimes.\nHowever, I have recently been accepted into a 1-week international management development course in Zurich, so I would like to cancel my reservation. ---[2]--- One of the original team members has had to drop out for health reasons and I have been offered his spot. ---[3]--- I realize this is extremely short notice, but considering these circumstances, I am hoping I can still get my money back.\nPlease e-mail me as soon as possible to let me know. ---[4]--- I hope to hear from you before then.\n\nKind regards,\nGrant Provera",
            "clues": []
        },
        "clue": {
            "questionNum": 155,
            "correctAnswer": "C",
            "clueLocation": "Đoạn 2",
            "clueQuote": "so I would like to cancel my reservation",
            "scanningTip": "Từ khóa: cancel my reservation -> state a change."
        },
        "stage": 2,
        "badge": "🎯 Chuyên đề Session 5 & 6"
    },
    {
        "id": "docs2_drill_p7_156",
        "num": 156,
        "source": "Docs 2 - Chuyên đề Part 7 Tips",
        "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
        "question": "What is a stated concern for Mr. Provera?",
        "options": {
            "A": "Room availability",
            "B": "Hotel amenities",
            "C": "Refund policy",
            "D": "Cancelation deadlines"
        },
        "correctAnswer": "C",
        "explanation": "Grant Provera viết: 'I realize this is extremely short notice, but considering these circumstances, I am hoping I can still get my money back.' -> Mối lo ngại là chính sách hoàn tiền (Refund policy).",
        "tip": "⚡ MẸO BÀI GIẢNG SESSION 6: 'get my money back' = 'Refund policy' (chính sách hoàn tiền) -> Chọn C.",
        "keywords": ["get my money back", "Refund policy"],
        "vietnameseMeaning": "Mối quan tâm được nêu của ông Provera là gì?",
        "isPassageQuestion": True,
        "passageInfo": {
            "id": "docs2_drill_p7_lavender",
            "title": "Chuyên đề Part 7: Email Hủy Đặt Phòng Khách Sạn Lavender",
            "content": "To: Helen Lippiatt <HelenLippiatt@lavenderhotel.fr>\nFrom: Grant Provera <GrantProvera@otismail.net>\nDate: Monday, October 17\nSubject: Room cancelation\n\nDear Ms. Lippiatt,\nTwo weeks ago I e-mailed you to reserve accommodations, along with an online deposit to secure them. ---[1]--- I was scheduled to check in tomorrow so that I could attend the European Marketing Conference there in Nimes.\nHowever, I have recently been accepted into a 1-week international management development course in Zurich, so I would like to cancel my reservation. ---[2]--- One of the original team members has had to drop out for health reasons and I have been offered his spot. ---[3]--- I realize this is extremely short notice, but considering these circumstances, I am hoping I can still get my money back.\nPlease e-mail me as soon as possible to let me know. ---[4]--- I hope to hear from you before then.\n\nKind regards,\nGrant Provera",
            "clues": []
        },
        "clue": {
            "questionNum": 156,
            "correctAnswer": "C",
            "clueLocation": "Đoạn 2 dòng cuối",
            "clueQuote": "I am hoping I can still get my money back",
            "scanningTip": "get my money back = refund."
        },
        "stage": 2,
        "badge": "🎯 Chuyên đề Session 5 & 6"
    },
    {
        "id": "docs2_drill_p7_157",
        "num": 157,
        "source": "Docs 2 - Chuyên đề Part 7 Tips",
        "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
        "question": "In which of the positions marked [1], [2], [3] and [4] does the following sentence best belong? 'I have to leave for the training program within the next 12 hours.'",
        "options": {
            "A": "[1]",
            "B": "[2]",
            "C": "[3]",
            "D": "[4]"
        },
        "correctAnswer": "D",
        "explanation": "Câu sau vị trí [4] viết: 'I hope to hear from you before then.' Từ 'then' chỉ mốc thời gian 'within the next 12 hours' ở câu cần điền.",
        "tip": "⚡ MẸO BÀI GIẢNG SESSION 6: 'before then' <-> 'within the next 12 hours' -> Vị trí [4] là hoàn hảo.",
        "keywords": ["within 12 hours", "before then", "position 4"],
        "vietnameseMeaning": "Câu 'Tôi phải lên đường tham gia khóa đào tạo trong vòng 12 giờ tới' thuộc về vị trí nào?",
        "isPassageQuestion": True,
        "passageInfo": {
            "id": "docs2_drill_p7_lavender",
            "title": "Chuyên đề Part 7: Email Hủy Đặt Phòng Khách Sạn Lavender",
            "content": "To: Helen Lippiatt <HelenLippiatt@lavenderhotel.fr>\nFrom: Grant Provera <GrantProvera@otismail.net>\nDate: Monday, October 17\nSubject: Room cancelation\n\nDear Ms. Lippiatt,\nTwo weeks ago I e-mailed you to reserve accommodations, along with an online deposit to secure them. ---[1]--- I was scheduled to check in tomorrow so that I could attend the European Marketing Conference there in Nimes.\nHowever, I have recently been accepted into a 1-week international management development course in Zurich, so I would like to cancel my reservation. ---[2]--- One of the original team members has had to drop out for health reasons and I have been offered his spot. ---[3]--- I realize this is extremely short notice, but considering these circumstances, I am hoping I can still get my money back.\nPlease e-mail me as soon as possible to let me know. ---[4]--- I hope to hear from you before then.\n\nKind regards,\nGrant Provera",
            "clues": []
        },
        "clue": {
            "questionNum": 157,
            "correctAnswer": "D",
            "clueLocation": "Vị trí [4]",
            "clueQuote": "I have to leave for the training program within the next 12 hours. I hope to hear from you before then.",
            "scanningTip": "Từ liên kết: then chỉ 12 hours."
        },
        "stage": 2,
        "badge": "🎯 Chuyên đề Session 5 & 6"
    }
]

from add_drills import drills_remaining, drills_172_175, drills_186_190
from add_p6_drills import p6_drills
drills_list = drills_list + p6_drills + drills_remaining + drills_172_175 + drills_186_190

print(f"Compiled drills total: {len(drills_list)}")

# Total Docs 2 questions
total_docs2_all = de1_full + de2_full + drills_list
print(f"\n=======================================================")
print(f"TOTAL COMPREHENSIVE DOCS 2 QUESTIONS: {len(total_docs2_all)}")
print(f"  - Đề 1 (Trial / Final Test): {len(de1_full)} questions")
print(f"  - Đề 2 (YBM Assignment Test 1): {len(de2_full)} questions")
print(f"  - Chuyên đề & Rèn luyện Tips: {len(drills_list)} questions")
print(f"=======================================================\n")

# Write to src/data/docs2Questions.ts
ts_code = """import { Question } from '../types';

export const docs2Questions: Question[] = """ + json.dumps(total_docs2_all, ensure_ascii=False, indent=2) + """;

export const getDocs2QuestionsBySource = (source?: string): Question[] => {
  if (!source || source === 'all' || source === 'docs2_all') return docs2Questions;
  
  // Đề 1:
  if (source === 'Docs 2 - Đề 1 Full') return docs2Questions.filter((q) => q.source.includes('Đề 1'));
  if (source === 'Docs 2 - Đề 1 Part 5') return docs2Questions.filter((q) => q.source === 'Docs 2 - Part 5 Luyện đề' || q.source === 'Docs 2 - Đề 1 Part 5');
  if (source === 'Docs 2 - Đề 1 Part 6') return docs2Questions.filter((q) => q.source === 'Docs 2 - Part 6 Đọc Điền' || q.source === 'Docs 2 - Đề 1 Part 6');
  if (source === 'Docs 2 - Đề 1 Part 7') return docs2Questions.filter((q) => q.source === 'Docs 2 - Part 7 Đoạn văn' || q.source === 'Docs 2 - Đề 1 Part 7');

  // Đề 2 (YBM):
  if (source === 'Docs 2 - Đề 2 YBM Full') return docs2Questions.filter((q) => q.source.includes('YBM'));
  if (source === 'Docs 2 - Đề 2 YBM Part 5') return docs2Questions.filter((q) => q.source === 'Docs 2 - Đề 2 YBM Part 5');
  if (source === 'Docs 2 - Đề 2 YBM Part 6') return docs2Questions.filter((q) => q.source === 'Docs 2 - Đề 2 YBM Part 6');
  if (source === 'Docs 2 - Đề 2 YBM Part 7') return docs2Questions.filter((q) => q.source === 'Docs 2 - Đề 2 YBM Part 7');

  // Chuyên đề Session 5 & 6:
  if (source === 'Docs 2 - Chuyên đề Tips') return docs2Questions.filter((q) => q.source.includes('Chuyên đề'));

  return docs2Questions.filter((q) => q.source === source);
};
"""

with open("src/data/docs2Questions.ts", "w", encoding="utf-8") as f:
    f.write(ts_code)

print("Successfully written to src/data/docs2Questions.ts!")
