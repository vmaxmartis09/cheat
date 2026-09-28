# -*- coding: utf-8 -*-
import json
import re
import openpyxl

# Load Part 5
from build_docs2_data import part5_questions

# Load Part 6
from generate_docs2_questions import part6_questions

# Load Part 7
from generate_part7_data import passage_meta, answers, text

matches = list(re.finditer(r'Questions?\s+(\d+)\s*[-–]\s*(\d+)\s+refer to the following\s+([^\n.]+)', text))

part7_questions = []

for idx, meta in enumerate(passage_meta):
    sq, eq = meta["range"]
    m = matches[idx]
    start_pos = m.start()
    end_pos = matches[idx+1].start() if idx+1 < len(matches) else len(text)
    block = text[start_pos:end_pos]
    
    first_q_match = re.search(rf'\b{sq}\.\s+', block)
    passage_content = block[:first_q_match.start()].strip() if first_q_match else ""
    # Remove header line from passage_content
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
            # Clean OCR noise in option D
            opt_val = re.sub(r'TEST\s*\d+.*', '', opt_val).strip()
            opt_val = re.sub(r'Hackers.*', '', opt_val).strip()
            opt_val = re.sub(r'\d{5,}.*', '', opt_val).strip()
            options[opt_letter] = opt_val
            
        # Fallback for Q173 if needed
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
        
        correct_ans = answers.get(q_num, 'A')
        
        # Build explanation and tip
        explanation = f"Đối chiếu thông tin trong bài văn đoạn {idx+1}. Đáp án chính xác được xác nhận từ đáp án chuẩn của bài thi là ({correct_ans}): '{options.get(correct_ans, '')}'."
        tip = f"⚡ MẸO PART 7: Quét nhanh từ khóa trong câu hỏi '{clean_q_text[:40]}...' để định vị đoạn chứa thông tin tương ứng trong văn bản."
        
        # Specific high-value explanations for tricky questions
        if q_num == 147:
            explanation = "Facility manager Thomas Sutton viết: 'Therefore, we are asking everyone to manage their individual consumption responsibly and avoid unnecessary use...' -> Yêu cầu nhân viên kiểm soát và tiết kiệm lượng nước tiêu thụ."
            tip = "⚡ MẸO PART 7: Câu hỏi mục đích (purpose), quét từ khóa 'asking everyone to manage their individual consumption' -> Chọn C (monitor their water consumption)."
        elif q_num == 148:
            explanation = "Trong thông báo có viết: 'For the time being, I have also had the drinking fountains in the hallways shut off...' (tạm thời tắt vòi nước uống ở hành lang) -> Giới hạn quyền tiếp cận một tiện ích (restricted access to an amenity)."
            tip = "⚡ MẸO PART 7: Paraphrasing (từ đồng nghĩa): 'drinking fountains shut off' tương đương với 'Restricted access to an amenity' (hạn chế tiện nghi uống nước)."
        elif q_num == 149:
            explanation = "Đoạn 1 viết: 'As of August 31, the Send It Right packing and shipping center will no longer be located at this site... On September 1, you will find Send It Right across Centerville Highway in the Perkins Plaza' -> Ngày 31/8 sẽ đóng cửa cơ sở cũ để di dời sang địa điểm mới."
            tip = "⚡ MẸO PART 7: 'will no longer be located at this site... on September 1 in the Perkins Plaza' -> Chọn A (Close its establishment for relocation)."
        elif q_num == 150:
            explanation = "Đoạn 3 viết: 'as the additional space will allow us to hire more employees to work during peak hours' -> Địa điểm mới có không gian lớn hơn cho phép thuê thêm nhân viên."
            tip = "⚡ MẸO PART 7: 'hire more employees' paraphrased thành 'employ more personnel than previously' -> Chọn C."
        elif q_num == 153:
            explanation = "Joe Warner giải thích: 'Unfortunately, I have just learned that our president will be out of the country on that date. So, I would like to reschedule...' -> Chủ tịch/lãnh đạo (an executive) đi công tác nước ngoài không tham dự được."
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
            
        part7_questions.append({
            "id": f"docs2_p7_{q_num}",
            "num": q_num,
            "source": "Docs 2 - Part 7 Đoạn văn",
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
            "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
        })

print(f"Assembled {len(part7_questions)} Part 7 questions")

total_docs2 = part5_questions + part6_questions + part7_questions
print(f"TOTAL DOCS 2 QUESTIONS: {len(total_docs2)}")

# Write to src/data/docs2Questions.ts
ts_code = """import { Question } from '../types';

export const docs2Questions: Question[] = """ + json.dumps(total_docs2, ensure_ascii=False, indent=2) + """;

export const getDocs2QuestionsBySource = (source?: string): Question[] => {
  if (!source || source === 'all') return docs2Questions;
  if (source === 'Docs 2 - Full') return docs2Questions;
  if (source === 'Docs 2 - Part 5') return docs2Questions.filter((q) => q.num >= 101 && q.num <= 130);
  if (source === 'Docs 2 - Part 6') return docs2Questions.filter((q) => q.num >= 131 && q.num <= 146);
  if (source === 'Docs 2 - Part 7') return docs2Questions.filter((q) => q.num >= 147 && q.num <= 200);
  return docs2Questions.filter((q) => q.source === source);
};
"""

with open("src/data/docs2Questions.ts", "w", encoding="utf-8") as f:
    f.write(ts_code)

print("Successfully written to src/data/docs2Questions.ts!")
