# -*- coding: utf-8 -*-
"""
Full generator for src/data/docs2Questions.ts
Contains all 100 questions for Docs 2:
- Part 5: Q101-130 (30 questions, ordered by similar category)
- Part 6: Q131-146 (16 questions, 4 passages)
- Part 7: Q147-200 (54 questions, 15 passages)
"""

import json

# Import Part 5 questions
from build_docs2_data import part5_questions

# Define Part 6
part6_p1_content = """Royal Exchange Building Reborn as Hotel

Nationwide hotel operator Verdant Group [131] millions of pounds over three years converting the Royal Exchange Building on Quay Street, a historical landmark, into a hotel. "We wanted to preserve the building's key architectural elements," says Verdant's CEO Gaille Edwards. "That's why we hired a group of historical experts to work with our team." [132]
The building retains much of its original charm as the 18th century structure and stonework remain intact. However, the building's interior has all the [133] found at any other five-star accommodations, such as a pool and spa.
The combination of the hotel's modern facilities with its historic appearance makes the venue a major [134] for tourists. Already, suites are fully booked for its opening weekend, which is scheduled for late next month."""

part6_p1_vn = """Tòa nhà Royal Exchange tái sinh thành Khách sạn

Tập đoàn điều hành khách sạn toàn quốc Verdant Group đã chi hàng triệu bảng Anh trong ba năm để cải tạo Tòa nhà Royal Exchange trên Phố Quay, một di tích lịch sử, thành một khách sạn. "Chúng tôi muốn bảo tồn các yếu tố kiến trúc then chốt của tòa nhà," Giám đốc điều hành Verdant, bà Gaille Edwards cho biết. "Đó là lý do chúng tôi thuê một nhóm chuyên gia lịch sử làm việc cùng đội ngũ của mình." Đánh giá từ kết quả, dường như họ đã rất thành công. Tòa nhà vẫn giữ được nhiều nét quyến rũ ban đầu vì cấu trúc và công trình bằng đá từ thế kỷ 18 vẫn còn nguyên vẹn. Tuy nhiên, nội thất tòa nhà có đầy đủ các tiện nghi được tìm thấy ở bất kỳ nơi lưu trú năm sao nào khác, chẳng hạn như hồ bơi và spa. Sự kết hợp giữa tiện nghi hiện đại với vẻ ngoài cổ kính khiến nơi đây trở thành một điểm thu hút khách du lịch lớn. Hiện tại, các phòng cao cấp đã được đặt kín chỗ cho dịp cuối tuần khai trương vào cuối tháng tới."""

part6_p2_content = """July 15
Allison Morita
Vestige Insurance
4186 Maryland Avenue
Pinellas, FL 34624

Dear Ms. Morita,
I am writing to you in the hope that you can [135] my insurance claim. I spoke with general claims agent Gary Fink on July 6, [136], at the time, explained the process and recommended that I write this letter.
Last month, on June 20, I suffered an injury when I slipped and fell in my kitchen. The impact caused me to break my wrist, which forced me to undergo surgery. Does my policy cover injuries of this nature? [137], I expect to be reimbursed. Currently, my medical expenses amount to about $900. [138]
Please respond as soon as you review my documentation.
Thank you.

Sincerely,
June Miller"""

part6_p2_vn = """Ngày 15 tháng 7
Allison Morita
Bảo hiểm Vestige
4186 Đại lộ Maryland
Pinellas, FL 34624

Kính gửi bà Morita,
Tôi viết thư cho bà với hy vọng bà có thể xử lý hồ sơ yêu cầu bồi thường bảo hiểm của tôi. Tôi đã nói chuyện với nhân viên bồi thường Gary Fink vào ngày 6 tháng 7, người mà vào thời điểm đó đã giải thích quy trình và khuyên tôi nên viết bức thư này.
Tháng trước, vào ngày 20 tháng 6, tôi bị chấn thương khi trượt ngã trong nhà bếp. Cú va đập khiến tôi bị gãy cổ tay và phải phẫu thuật. Liệu hợp đồng bảo hiểm của tôi có chi trả cho các chấn thương dạng này không? Nếu có, tôi mong đợi sẽ được hoàn trả chi phí. Hiện tại, chi phí y tế của tôi lên tới khoảng 900 đô la. Tôi đã đính kèm các biên lai để chứng minh cho yêu cầu bồi thường này. Xin vui lòng phản hồi ngay sau khi bà xem xét hồ sơ của tôi.
Cảm ơn bà.

Trân trọng,
June Miller"""

part6_p3_content = """Welcome to Redstone National Park

For the protection of the park, all visitors are asked to observe some basic [139].
Redstone National Park officially closes at 8 P.M. [140], there are a number of campsites situated throughout the park for those who wish to stay overnight. It is important to note that this option is only available to those with permits. [141]
We also ask that all visitors be thoughtful about maintaining the premises. Please make sure that rubbish and anything brought into wildlife areas is taken out upon leaving or disposed of in the appropriate receptacles.
Following these rules will help to ensure the [142] of the park's beauty for future visitors.
For any questions or concerns, please call 555-9092."""

part6_p3_vn = """Chào mừng quý khách đến với Công viên Quốc gia Redstone

Để bảo vệ công viên, tất cả du khách được yêu cầu tuân thủ một số quy định cơ bản.
Công viên Quốc gia Redstone chính thức đóng cửa lúc 8 giờ tối. Tuy nhiên, có một số khu cắm trại nằm rải rác khắp công viên cho những ai muốn ở lại qua đêm. Cần lưu ý rằng lựa chọn này chỉ dành cho những người có giấy phép. Những giấy phép này có thể nhận tại trung tâm du khách mỗi ngày cho đến buổi trưa.
Chúng tôi cũng yêu cầu tất cả du khách có ý thức giữ gìn khuôn viên. Xin hãy đảm bảo rác thải và đồ dùng mang vào khu bảo tồn hoang dã đều phải được thu dọn khi rời đi hoặc vứt vào thùng rác thích hợp.
Tuân thủ những quy tắc này sẽ giúp đảm bảo việc bảo tồn vẻ đẹp của công viên cho các du khách tương lai.
Nếu có câu hỏi hoặc thắc mắc, vui lòng gọi 555-9092."""

part6_p4_content = """To: Janet Boyle <jboyle55@overmail.net>
From: Customer Service <service@lagoonair.com>
Subject: Your inquiry
Date: July 29
Attachment: Baggage claim form

Dear Ms. Boyle,
This is in reply to your inquiry about [143] baggage. Problems involving luggage on domestic flights must be reported to airline personnel at an airport within 48 hours of flight arrival. However, if you have flown in from outside the country, you may report any destruction to your luggage to claims@lagoonair.com using the attached form. Claims can also be [144] in person at an airline office. [145] The airline will not grant any claim made more than 14 days following your flight.
Lagoon Airlines is not liable for any harm to luggage that is of poor quality or possesses an inherent defect. [146], reimbursement for repairs is not offered for minor wear and tear.

Sincerely,
Lagoon Airlines Customer Service"""

part6_p4_vn = """Gửi: Janet Boyle <jboyle55@overmail.net>
Từ: Bộ phận Chăm sóc Khách hàng <service@lagoonair.com>
Tiêu đề: Thắc mắc của bạn
Ngày: 29 tháng 7
Đính kèm: Mẫu đơn khiếu nại hành lý

Kính gửi bà Boyle,
Thư này nhằm giải đáp thắc mắc của bà về hành lý bị hư hại. Các sự cố hành lý trên chuyến bay nội địa phải được báo cho nhân viên tại sân bay trong vòng 48 giờ sau khi hạ cánh. Tuy nhiên, nếu bà bay quốc tế, bà có thể báo cáo mọi thiệt hại hành lý tới địa chỉ claims@lagoonair.com bằng mẫu đơn đính kèm. Khiếu nại cũng có thể được nộp trực tiếp tại văn phòng hãng. Xin lưu ý rằng có thời hạn chót để nộp đơn xin bồi hoàn. Hãng sẽ không giải quyết khiếu nại nào gửi sau 14 ngày kể từ chuyến bay.
Lagoon Airlines không chịu trách nhiệm đối với hư hại của hành lý kém chất lượng hoặc lỗi cố hữu. Ngoài ra, việc bồi hoàn sửa chữa sẽ không áp dụng cho các vết trầy xước hao mòn nhỏ.

Trân trọng,
Bộ phận Dịch vụ Khách hàng Lagoon Airlines"""

part6_questions = [
    # Royal Exchange Building (131-134)
    {
        "id": "docs2_p6_131",
        "num": 131,
        "source": "Docs 2 - Part 6 Đọc Điền",
        "category": "Ngữ pháp & Thì (Grammar & Tenses)",
        "question": "Nationwide hotel operator Verdant Group ------- millions of pounds over three years converting the Royal Exchange Building...",
        "options": {
            "A": "spends",
            "B": "spent",
            "C": "will spend",
            "D": "spending"
        },
        "correctAnswer": "B",
        "explanation": "Hành động chi hàng triệu bảng đã diễn ra trong suốt 3 năm trong quá khứ để hoàn tất việc chuyển đổi tòa nhà (toàn bộ đoạn sau kể về kết quả đã hoàn thành) -> Chia thì Quá khứ đơn 'spent'.",
        "tip": "⚡ MẸO PART 6: Đoạn văn kể về dự án đã hoàn thành ('hired a group', 'remain intact') -> Động từ chính chia Quá khứ đơn 'spent'.",
        "keywords": ["over three years", "spent millions"],
        "vietnameseMeaning": "Tập đoàn điều hành khách sạn toàn quốc Verdant Group đã chi hàng triệu bảng Anh trong ba năm để cải tạo tòa nhà.",
        "isPassageQuestion": True,
        "passageInfo": {
            "id": "docs2_p6_p1",
            "title": "Part 6: Bài báo - Khách sạn Royal Exchange",
            "content": part6_p1_content,
            "vietnameseTranslation": part6_p1_vn,
            "clues": []
        },
        "clue": {
            "questionNum": 131,
            "correctAnswer": "B",
            "clueLocation": "Đoạn 1, dòng 1",
            "clueQuote": "Verdant Group spent millions of pounds over three years converting the Royal Exchange Building",
            "scanningTip": "Dấu hiệu thời gian over three years diễn tả hành động kéo dài và đã hoàn tất trong quá khứ."
        },
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p6_132",
        "num": 132,
        "source": "Docs 2 - Part 6 Đọc Điền",
        "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
        "question": "Chọn câu phù hợp nhất để điền vào vị trí [132] trong đoạn văn:",
        "options": {
            "A": "It will take another year before the hotel opens its doors.",
            "B": "This is Verdant Group's first project that is a joint venture.",
            "C": "Judging from the results, it seems that they were successful.",
            "D": "Consequently, the construction firm's initial proposal was rejected."
        },
        "correctAnswer": "C",
        "explanation": "Câu trước: Giám đốc nói họ thuê chuyên gia lịch sử để bảo tồn nét kiến trúc. Câu sau: Tòa nhà vẫn giữ được nét quyến rũ nguyên bản từ thế kỷ 18. Do đó câu nối hợp lý nhất về logic là: 'Judging from the results, it seems that they were successful.' (Đánh giá từ kết quả, có vẻ họ đã rất thành công).",
        "tip": "⚡ MẸO ĐIỀN CÂU (TTL - Topic, Tone, Logic): Câu trước nói về mục tiêu bảo tồn, câu sau khen tòa nhà giữ trọn nét đẹp cổ -> Chọn câu khen ngợi kết quả thành công.",
        "keywords": ["hired historical experts", "Judging from results", "successful"],
        "vietnameseMeaning": "Đánh giá từ kết quả, dường như họ đã rất thành công.",
        "isPassageQuestion": True,
        "passageInfo": {
            "id": "docs2_p6_p1",
            "title": "Part 6: Bài báo - Khách sạn Royal Exchange",
            "content": part6_p1_content,
            "vietnameseTranslation": part6_p1_vn,
            "clues": []
        },
        "clue": {
            "questionNum": 132,
            "correctAnswer": "C",
            "clueLocation": "Đoạn 1-2, vị trí [132]",
            "clueQuote": "That's why we hired a group of historical experts to work with our team. Judging from the results, it seems that they were successful.",
            "scanningTip": "Đọc câu trước và sau chỗ trống: liên kết giữa 'hired experts' và 'retains original charm'."
        },
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p6_133",
        "num": 133,
        "source": "Docs 2 - Part 6 Đọc Điền",
        "category": "Từ vựng (Vocabulary)",
        "question": "However, the building's interior has all the ------- (133) found at any other five-star accommodations, such as a pool and spa.",
        "options": {
            "A": "activities",
            "B": "priorities",
            "C": "opportunities",
            "D": "amenities"
        },
        "correctAnswer": "D",
        "explanation": "Trong khách sạn và bất động sản nghỉ dưỡng, 'amenities' là các tiện nghi dịch vụ cao cấp (như hồ bơi, spa, phòng gym). Ví dụ được đưa ra ngay sau là: 'such as a pool and spa'.",
        "tip": "⚡ MẸO TỪ VỰNG KHÁCH SẠN: Thấy liệt kê 'such as a pool and spa' tại nơi lưu trú 5 sao (five-star accommodations) -> Chọn ngay 'amenities' (các tiện nghi).",
        "keywords": ["amenities", "five-star accommodations", "pool and spa"],
        "vietnameseMeaning": "Tuy nhiên, nội thất của tòa nhà có đầy đủ các tiện nghi được tìm thấy ở bất kỳ nơi lưu trú 5 sao nào khác, chẳng hạn như hồ bơi và spa.",
        "isPassageQuestion": True,
        "passageInfo": {
            "id": "docs2_p6_p1",
            "title": "Part 6: Bài báo - Khách sạn Royal Exchange",
            "content": part6_p1_content,
            "vietnameseTranslation": part6_p1_vn,
            "clues": []
        },
        "clue": {
            "questionNum": 133,
            "correctAnswer": "D",
            "clueLocation": "Đoạn 2, dòng 2-3",
            "clueQuote": "has all the amenities found at any other five-star accommodations, such as a pool and spa",
            "scanningTip": "Từ khóa manh mối: five-star accommodations, pool and spa."
        },
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p6_134",
        "num": 134,
        "source": "Docs 2 - Part 6 Đọc Điền",
        "category": "Từ vựng (Vocabulary)",
        "question": "The combination of the hotel's modern facilities with its historic appearance makes the venue a major ------- (134) for tourists.",
        "options": {
            "A": "issue",
            "B": "accomplishment",
            "C": "attraction",
            "D": "commitment"
        },
        "correctAnswer": "C",
        "explanation": "Cụm danh từ cố định trong du lịch: 'tourist attraction' hoặc 'a major attraction for tourists' = điểm đến thu hút đông đảo khách du lịch.",
        "tip": "⚡ MẸO COLLOCATION: Đi với 'for tourists' (cho du khách) -> Chọn 'attraction' (tourist attraction = điểm thu hút khách du lịch).",
        "keywords": ["major attraction", "for tourists"],
        "vietnameseMeaning": "Sự kết hợp giữa cơ sở vật chất hiện đại với vẻ ngoài cổ kính khiến địa điểm này trở thành một điểm thu hút lớn đối với du khách.",
        "isPassageQuestion": True,
        "passageInfo": {
            "id": "docs2_p6_p1",
            "title": "Part 6: Bài báo - Khách sạn Royal Exchange",
            "content": part6_p1_content,
            "vietnameseTranslation": part6_p1_vn,
            "clues": []
        },
        "clue": {
            "questionNum": 134,
            "correctAnswer": "C",
            "clueLocation": "Đoạn 3, dòng 1-2",
            "clueQuote": "makes the venue a major attraction for tourists",
            "scanningTip": "Cụm cố định: major attraction for tourists."
        },
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },

    # Vestige Insurance (135-138)
    {
        "id": "docs2_p6_135",
        "num": 135,
        "source": "Docs 2 - Part 6 Đọc Điền",
        "category": "Từ vựng (Vocabulary)",
        "question": "I am writing to you in the hope that you can ------- (135) my insurance claim.",
        "options": {
            "A": "cancel",
            "B": "handle",
            "C": "change",
            "D": "summarize"
        },
        "correctAnswer": "B",
        "explanation": "Cụm 'handle an insurance claim' = xử lý / giải quyết một hồ sơ yêu cầu bồi thường bảo hiểm. Khách hàng viết thư nhờ công ty bảo hiểm giải quyết quyền lợi của mình.",
        "tip": "⚡ MẸO COLLOCATION: Đi với 'insurance claim' (yêu cầu bồi thường) -> Động từ chuẩn là 'handle' (xử lý, giải quyết).",
        "keywords": ["handle", "insurance claim"],
        "vietnameseMeaning": "Tôi viết thư này với hy vọng bà có thể xử lý yêu cầu bồi thường bảo hiểm của tôi.",
        "isPassageQuestion": True,
        "passageInfo": {
            "id": "docs2_p6_p2",
            "title": "Part 6: Thư gửi - Yêu cầu bồi thường bảo hiểm Vestige",
            "content": part6_p2_content,
            "vietnameseTranslation": part6_p2_vn,
            "clues": []
        },
        "clue": {
            "questionNum": 135,
            "correctAnswer": "B",
            "clueLocation": "Đoạn 1, dòng 1",
            "clueQuote": "in the hope that you can handle my insurance claim",
            "scanningTip": "Động từ đi cùng claim là handle/process."
        },
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p6_136",
        "num": 136,
        "source": "Docs 2 - Part 6 Đọc Điền",
        "category": "Mệnh đề & Đại từ (Clauses & Pronouns)",
        "question": "I spoke with general claims agent Gary Fink on July 6, ------- (136), at the time, explained the process and recommended that I write this letter.",
        "options": {
            "A": "when",
            "B": "who",
            "C": "how",
            "D": "why"
        },
        "correctAnswer": "B",
        "explanation": "Đại từ quan hệ thay thế cho danh từ chỉ người 'general claims agent Gary Fink' và làm chủ ngữ cho động từ 'explained' -> Dùng 'who'.",
        "tip": "⚡ MẸO ĐẠI TỪ QUAN HỆ: Đứng sau tên người (Gary Fink) có dấu phẩy và làm Chủ ngữ trước động từ 'explained' -> Chọn 'who'.",
        "keywords": ["Gary Fink", "who explained"],
        "vietnameseMeaning": "Tôi đã trao đổi với nhân viên bồi thường Gary Fink vào ngày 6 tháng 7, người mà vào thời điểm đó đã giải thích quy trình cho tôi.",
        "isPassageQuestion": True,
        "passageInfo": {
            "id": "docs2_p6_p2",
            "title": "Part 6: Thư gửi - Yêu cầu bồi thường bảo hiểm Vestige",
            "content": part6_p2_content,
            "vietnameseTranslation": part6_p2_vn,
            "clues": []
        },
        "clue": {
            "questionNum": 136,
            "correctAnswer": "B",
            "clueLocation": "Đoạn 1, dòng 2",
            "clueQuote": "agent Gary Fink on July 6, who, at the time, explained the process",
            "scanningTip": "Đại từ quan hệ thay thế cho Gary Fink."
        },
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p6_137",
        "num": 137,
        "source": "Docs 2 - Part 6 Đọc Điền",
        "category": "Liên từ (Conjunctions)",
        "question": "Does my policy cover injuries of this nature? ------- (137), I expect to be reimbursed.",
        "options": {
            "A": "If so",
            "B": "Until then",
            "C": "After that",
            "D": "On condition of"
        },
        "correctAnswer": "A",
        "explanation": "Câu trước đặt câu hỏi Yes/No: 'Liệu hợp đồng có bảo hiểm cho chấn thương dạng này không?'. Cụm 'If so' (= Nếu đúng như vậy / Nếu có) nối tiếp mạch logic: Nếu có thì tôi mong muốn được bồi hoàn.",
        "tip": "⚡ MẸO TỪ NỐI: Sau một câu hỏi nghi vấn 'Does...?' -> Cụm đáp lại giả định điều kiện là 'If so' (Nếu đúng như vậy).",
        "keywords": ["Does my policy cover", "If so", "reimbursed"],
        "vietnameseMeaning": "Hợp đồng của tôi có chi trả cho chấn thương dạng này không? Nếu có, tôi mong đợi được bồi hoàn.",
        "isPassageQuestion": True,
        "passageInfo": {
            "id": "docs2_p6_p2",
            "title": "Part 6: Thư gửi - Yêu cầu bồi thường bảo hiểm Vestige",
            "content": part6_p2_content,
            "vietnameseTranslation": part6_p2_vn,
            "clues": []
        },
        "clue": {
            "questionNum": 137,
            "correctAnswer": "A",
            "clueLocation": "Đoạn 2, dòng 3-4",
            "clueQuote": "Does my policy cover injuries of this nature? If so, I expect to be reimbursed.",
            "scanningTip": "Liên kết logic giữa câu hỏi và mệnh đề điều kiện giả định."
        },
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p6_138",
        "num": 138,
        "source": "Docs 2 - Part 6 Đọc Điền",
        "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
        "question": "Chọn câu phù hợp nhất để điền vào vị trí [138] trong bức thư:",
        "options": {
            "A": "I have enclosed receipts to support this claim.",
            "B": "Only half of the amount has been paid by your company.",
            "C": "It is difficult to determine who was at fault for the accident.",
            "D": "Let me know when my insurance contract has been authorized."
        },
        "correctAnswer": "A",
        "explanation": "Câu trước đề cập đến số tiền viện phí: 'Currently, my medical expenses amount to about $900.' Câu sau nói: 'Please respond as soon as you review my documentation.' Do đó câu điền vào cần nhắc đến chứng từ viện phí gửi kèm: 'I have enclosed receipts to support this claim.' (Tôi đã gửi kèm các biên lai để chứng minh cho yêu cầu này).",
        "tip": "⚡ MẸO ĐIỀN CÂU: Câu trước nói về chi phí 900$, câu sau bảo xem xét giấy tờ (documentation) -> Câu điền phải chứa 'receipts' (biên lai đính kèm).",
        "keywords": ["$900", "enclosed receipts", "review documentation"],
        "vietnameseMeaning": "Tôi đã đính kèm các biên lai viện phí để chứng minh cho yêu cầu bồi thường này.",
        "isPassageQuestion": True,
        "passageInfo": {
            "id": "docs2_p6_p2",
            "title": "Part 6: Thư gửi - Yêu cầu bồi thường bảo hiểm Vestige",
            "content": part6_p2_content,
            "vietnameseTranslation": part6_p2_vn,
            "clues": []
        },
        "clue": {
            "questionNum": 138,
            "correctAnswer": "A",
            "clueLocation": "Đoạn 2, vị trí [138]",
            "clueQuote": "expenses amount to about $900. I have enclosed receipts to support this claim. Please respond as soon as you review my documentation.",
            "scanningTip": "Từ khóa kết nối: $900 -> receipts -> review documentation."
        },
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },

    # Redstone National Park (139-142)
    {
        "id": "docs2_p6_139",
        "num": 139,
        "source": "Docs 2 - Part 6 Đọc Điền",
        "category": "Từ vựng (Vocabulary)",
        "question": "For the protection of the park, all visitors are asked to observe some basic ------- (139).",
        "options": {
            "A": "preventions",
            "B": "demonstrations",
            "C": "policies",
            "D": "corrections"
        },
        "correctAnswer": "C",
        "explanation": "Collocation: 'observe basic policies / rules' = tuân thủ các chính sách / quy định cơ bản. Các câu tiếp theo liệt kê giờ đóng cửa, giấy phép cắm trại, quy định vứt rác.",
        "tip": "⚡ MẸO TỪ VỰNG: 'observe policies/rules' = tuân thủ quy định/chính sách. (A: phòng ngừa, B: biểu tình/thuyết minh, D: sửa đổi).",
        "keywords": ["observe", "basic policies", "protection of the park"],
        "vietnameseMeaning": "Để bảo vệ công viên, tất cả du khách được yêu cầu tuân thủ một số quy định cơ bản.",
        "isPassageQuestion": True,
        "passageInfo": {
            "id": "docs2_p6_p3",
            "title": "Part 6: Thông báo - Quy định tại Công viên Quốc gia Redstone",
            "content": part6_p3_content,
            "vietnameseTranslation": part6_p3_vn,
            "clues": []
        },
        "clue": {
            "questionNum": 139,
            "correctAnswer": "C",
            "clueLocation": "Đoạn 1, dòng 1",
            "clueQuote": "all visitors are asked to observe some basic policies",
            "scanningTip": "observe đi với policies/rules."
        },
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p6_140",
        "num": 140,
        "source": "Docs 2 - Part 6 Đọc Điền",
        "category": "Liên từ (Conjunctions)",
        "question": "Redstone National Park officially closes at 8 P.M. ------- (140), there are a number of campsites situated throughout the park for those who wish to stay overnight.",
        "options": {
            "A": "Previously",
            "B": "Besides",
            "C": "However",
            "D": "Moreover"
        },
        "correctAnswer": "C",
        "explanation": "Câu trước nói công viên đóng cửa lúc 8 giờ tối. Câu sau nói có các khu cắm trại cho người muốn ở lại qua đêm. Hai câu có mối quan hệ tương phản, đối lập -> Dùng 'However' (Tuy nhiên).",
        "tip": "⚡ MẸO TỪ NỐI TƯƠNG PHẢN: Vế 1: Đóng cửa lúc 8h tối. Vế 2: Có khu cắm trại qua đêm. Hai vế đối lập nhau -> Chọn 'However' (Tuy nhiên).",
        "keywords": ["closes at 8 P.M.", "However", "stay overnight"],
        "vietnameseMeaning": "Công viên chính thức đóng cửa lúc 8 giờ tối. Tuy nhiên, có một số khu cắm trại dành cho những ai muốn ở lại qua đêm.",
        "isPassageQuestion": True,
        "passageInfo": {
            "id": "docs2_p6_p3",
            "title": "Part 6: Thông báo - Quy định tại Công viên Quốc gia Redstone",
            "content": part6_p3_content,
            "vietnameseTranslation": part6_p3_vn,
            "clues": []
        },
        "clue": {
            "questionNum": 140,
            "correctAnswer": "C",
            "clueLocation": "Đoạn 2, dòng 1-2",
            "clueQuote": "closes at 8 P.M. However, there are a number of campsites",
            "scanningTip": "Tương phản giữa đóng cửa và cho ở lại qua đêm."
        },
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p6_141",
        "num": 141,
        "source": "Docs 2 - Part 6 Đọc Điền",
        "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
        "question": "Chọn câu phù hợp nhất để điền vào vị trí [141] trong thông báo:",
        "options": {
            "A": "We project that these campsites will be completed by the end of the year.",
            "B": "It must be closely monitored by park rangers at all times.",
            "C": "The easiest way to get to the park is by taking a shuttle bus.",
            "D": "These can be obtained at the visitor center every day until noon."
        },
        "correctAnswer": "D",
        "explanation": "Câu trước kết thúc bằng: 'this option is only available to those with permits' (chỉ dành cho những người có giấy phép). Từ 'These' ở phương án D thay thế cho 'permits' (Các giấy phép này có thể lấy tại trung tâm du khách mỗi ngày trước buổi trưa).",
        "tip": "⚡ MẸO ĐẠI TỪ LIÊN KẾT: Câu trước kết thúc bằng danh từ số nhiều 'permits' -> Câu sau dùng đại từ 'These' để tiếp nối: 'These [permits] can be obtained...'.",
        "keywords": ["those with permits", "These can be obtained"],
        "vietnameseMeaning": "Những giấy phép này có thể lấy tại trung tâm du khách mỗi ngày cho đến buổi trưa.",
        "isPassageQuestion": True,
        "passageInfo": {
            "id": "docs2_p6_p3",
            "title": "Part 6: Thông báo - Quy định tại Công viên Quốc gia Redstone",
            "content": part6_p3_content,
            "vietnameseTranslation": part6_p3_vn,
            "clues": []
        },
        "clue": {
            "questionNum": 141,
            "correctAnswer": "D",
            "clueLocation": "Đoạn 2, vị trí [141]",
            "clueQuote": "available to those with permits. These can be obtained at the visitor center every day until noon.",
            "scanningTip": "Từ nối đại từ: permits -> These can be obtained."
        },
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p6_142",
        "num": 142,
        "source": "Docs 2 - Part 6 Đọc Điền",
        "category": "Từ loại (Word Form)",
        "question": "Following these rules will help to ensure the ------- (142) of the park's beauty for future visitors.",
        "options": {
            "A": "preserves",
            "B": "preservation",
            "C": "preservative",
            "D": "preserved"
        },
        "correctAnswer": "B",
        "explanation": "Vị trí đứng sau mạo từ 'the' và trước giới từ 'of' bắt buộc là Danh từ. 'preservation' = sự bảo tồn, gìn giữ (preservation of the park's beauty). 'Preservative' là chất bảo quản thực phẩm.",
        "tip": "⚡ MẸO CẤU TRÚC TỪ LOẠI: 'the + [DANH TỪ] + of' -> Chọn danh từ đuôi '-tion' (preservation: sự bảo tồn).",
        "keywords": ["the preservation of", "park's beauty"],
        "vietnameseMeaning": "Tuân thủ những quy tắc này sẽ giúp đảm bảo việc bảo tồn vẻ đẹp của công viên cho các du khách tương lai.",
        "isPassageQuestion": True,
        "passageInfo": {
            "id": "docs2_p6_p3",
            "title": "Part 6: Thông báo - Quy định tại Công viên Quốc gia Redstone",
            "content": part6_p3_content,
            "vietnameseTranslation": part6_p3_vn,
            "clues": []
        },
        "clue": {
            "questionNum": 142,
            "correctAnswer": "B",
            "clueLocation": "Đoạn 4, dòng 1-2",
            "clueQuote": "ensure the preservation of the park's beauty",
            "scanningTip": "the + N + of."
        },
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },

    # Lagoon Airlines (143-146)
    {
        "id": "docs2_p6_143",
        "num": 143,
        "source": "Docs 2 - Part 6 Đọc Điền",
        "category": "Từ vựng (Vocabulary)",
        "question": "This is in reply to your inquiry about ------- (143) baggage. Problems involving luggage... report any destruction to your luggage...",
        "options": {
            "A": "delayed",
            "B": "damaged",
            "C": "unattended",
            "D": "allowable"
        },
        "correctAnswer": "B",
        "explanation": "Câu tiếp theo trong bài giải thích: 'report any destruction to your luggage' (báo cáo bất kỳ hư hại nào đối với hành lý). Từ đồng nghĩa với 'destruction to luggage' chính là 'damaged baggage' (hành lý bị hư hỏng).",
        "tip": "⚡ MẸO TỪ ĐỒNG NGHĨA NGỮ CẢNH: Câu sau dùng 'destruction to your luggage' -> Chỗ trống tương đương là 'damaged baggage' (hành lý hư hại).",
        "keywords": ["damaged baggage", "destruction to your luggage"],
        "vietnameseMeaning": "Thư này nhằm giải đáp thắc mắc của bà về hành lý bị hư hỏng.",
        "isPassageQuestion": True,
        "passageInfo": {
            "id": "docs2_p6_p4",
            "title": "Part 6: Email - Giải đáp khiếu nại hành lý của Hãng Lagoon Airlines",
            "content": part6_p4_content,
            "vietnameseTranslation": part6_p4_vn,
            "clues": []
        },
        "clue": {
            "questionNum": 143,
            "correctAnswer": "B",
            "clueLocation": "Đoạn 1, dòng 1-3",
            "clueQuote": "inquiry about damaged baggage. However... report any destruction to your luggage",
            "scanningTip": "Manh mối nằm ở từ destruction to your luggage ở câu sau."
        },
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p6_144",
        "num": 144,
        "source": "Docs 2 - Part 6 Đọc Điền",
        "category": "Từ vựng (Vocabulary)",
        "question": "Claims can also be ------- (144) in person at an airline office.",
        "options": {
            "A": "submitted",
            "B": "retrieved",
            "C": "denied",
            "D": "waived"
        },
        "correctAnswer": "A",
        "explanation": "Hồ sơ khiếu nại (claims) có thể được 'nộp' trực tiếp: 'Claims can also be submitted in person'. Câu trước đề cập gửi qua email (using attached form), câu này bổ sung cách nộp trực tiếp.",
        "tip": "⚡ MẸO COLLOCATION: Đi với đơn từ / hồ sơ khiếu nại (claims) -> Chọn 'submitted in person' (được nộp trực tiếp).",
        "keywords": ["Claims can also be submitted", "in person"],
        "vietnameseMeaning": "Các đơn khiếu nại cũng có thể được nộp trực tiếp tại văn phòng của hãng hàng không.",
        "isPassageQuestion": True,
        "passageInfo": {
            "id": "docs2_p6_p4",
            "title": "Part 6: Email - Giải đáp khiếu nại hành lý của Hãng Lagoon Airlines",
            "content": part6_p4_content,
            "vietnameseTranslation": part6_p4_vn,
            "clues": []
        },
        "clue": {
            "questionNum": 144,
            "correctAnswer": "A",
            "clueLocation": "Đoạn 1, dòng 4-5",
            "clueQuote": "Claims can also be submitted in person at an airline office",
            "scanningTip": "Từ khóa: claims, in person."
        },
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p6_145",
        "num": 145,
        "source": "Docs 2 - Part 6 Đọc Điền",
        "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
        "question": "Chọn câu phù hợp nhất để điền vào vị trí [145] trong email:",
        "options": {
            "A": "You will receive confirmation of your flight reservation by e-mail.",
            "B": "Refer to your ticket to view the baggage allowance for this flight.",
            "C": "We will deliver the bag to your address after it has been recovered.",
            "D": "Please note that there is a deadline to apply for reimbursement."
        },
        "correctAnswer": "D",
        "explanation": "Câu ngay sau chỗ trống đưa ra quy định cụ thể về thời gian: 'The airline will not grant any claim made more than 14 days following your flight.' (Hãng sẽ không chấp nhận khiếu nại quá 14 ngày). Do đó câu điền vào thông báo trước về thời hạn: 'Please note that there is a deadline to apply for reimbursement.'",
        "tip": "⚡ MẸO ĐIỀN CÂU: Câu sau quy định thời hạn chót 'more than 14 days' -> Câu trước báo trước 'there is a deadline' (có một thời hạn chót).",
        "keywords": ["deadline to apply", "more than 14 days"],
        "vietnameseMeaning": "Xin lưu ý rằng có thời hạn chót để nộp đơn xin bồi hoàn chi phí.",
        "isPassageQuestion": True,
        "passageInfo": {
            "id": "docs2_p6_p4",
            "title": "Part 6: Email - Giải đáp khiếu nại hành lý của Hãng Lagoon Airlines",
            "content": part6_p4_content,
            "vietnameseTranslation": part6_p4_vn,
            "clues": []
        },
        "clue": {
            "questionNum": 145,
            "correctAnswer": "D",
            "clueLocation": "Đoạn 1, vị trí [145]",
            "clueQuote": "Please note that there is a deadline to apply for reimbursement. The airline will not grant any claim made more than 14 days following your flight.",
            "scanningTip": "Liên kết từ vựng logic: deadline <-> 14 days."
        },
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p6_146",
        "num": 146,
        "source": "Docs 2 - Part 6 Đọc Điền",
        "category": "Liên từ (Conjunctions)",
        "question": "Lagoon Airlines is not liable for any harm to luggage that is of poor quality or possesses an inherent defect. ------- (146), reimbursement for repairs is not offered for minor wear and tear.",
        "options": {
            "A": "Thereafter",
            "B": "Nonetheless",
            "C": "Additionally",
            "D": "Otherwise"
        },
        "correctAnswer": "C",
        "explanation": "Câu trước nêu trường hợp hãng không chịu trách nhiệm (hành lý kém chất lượng hoặc lỗi sẵn có). Câu sau nêu thêm một trường hợp khác hãng cũng không bồi thường (hao mòn trầy xước nhỏ). Quan hệ bổ sung thêm thông tin cùng chiều -> Chọn 'Additionally' (Ngoài ra / Hơn nữa).",
        "tip": "⚡ MẸO TỪ NỐI BỔ SUNG: Vế trước: Hãng không chịu trách nhiệm A. Vế sau: Hãng cũng không bồi thường B. Quan hệ bổ sung thêm điều kiện -> Chọn 'Additionally' (Ngoài ra).",
        "keywords": ["not liable for", "Additionally", "not offered"],
        "vietnameseMeaning": "Ngoài ra, việc bồi hoàn chi phí sửa chữa sẽ không được áp dụng đối với những vết trầy xước hao mòn nhỏ.",
        "isPassageQuestion": True,
        "passageInfo": {
            "id": "docs2_p6_p4",
            "title": "Part 6: Email - Giải đáp khiếu nại hành lý của Hãng Lagoon Airlines",
            "content": part6_p4_content,
            "vietnameseTranslation": part6_p4_vn,
            "clues": []
        },
        "clue": {
            "questionNum": 146,
            "correctAnswer": "C",
            "clueLocation": "Đoạn 2, dòng 2-3",
            "clueQuote": "is not liable for any harm... Additionally, reimbursement for repairs is not offered",
            "scanningTip": "Hai điều khoản miễn trừ trách nhiệm được nối bằng từ bổ sung Additionally."
        },
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    }
]

print(f"Compiled Part 6: {len(part6_questions)} questions")
