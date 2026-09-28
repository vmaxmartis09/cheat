# -*- coding: utf-8 -*-
"""
Script to compile all Docs 2 questions (Part 5: Q101-130, Part 6: Q131-146, Part 7: Q147-200)
with full questions, options A-D, answers, Vietnamese meanings, explanations, TOEIC tips,
and grouped by similar types for adjacent learning ("học liền kề những dạng giống nhau").
"""

import json

# ==========================================
# PART 5 QUESTIONS (30 QUESTIONS: Q101-Q130)
# Grouped by category for adjacent learning
# ==========================================

part5_questions = [
    # --- NHÓM 1: TỪ LOẠI (WORD FORM) ---
    {
        "id": "docs2_p5_101",
        "num": 101,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Từ loại (Word Form)",
        "question": "The meteorologist reviews the daily weather patterns and makes ------- for temperatures and conditions.",
        "options": {
            "A": "predicts",
            "B": "predictions",
            "C": "predicted",
            "D": "predictably"
        },
        "correctAnswer": "B",
        "explanation": "Sau ngoại động từ 'makes' cần 1 Tân ngữ là Danh từ. 'make predictions' là cụm collocation thông dụng mang nghĩa 'đưa ra dự báo/dự đoán'. Đuôi '-tion' là dấu hiệu nhận biết danh từ.",
        "tip": "⚡ MẸO: Sau động từ 'make/makes' cần Danh từ làm tân ngữ -> Nhận diện ngay đuôi '-tion' (predictions: sự dự đoán).",
        "keywords": ["makes", "weather patterns", "predictions"],
        "vietnameseMeaning": "Nhà khí tượng học xem xét các mô hình thời tiết hàng ngày và đưa ra các dự báo về nhiệt độ và điều kiện thời tiết.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_102",
        "num": 102,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Từ loại (Word Form)",
        "question": "Sommerland Shopping Mall is situated ------- ten minutes away from the downtown area.",
        "options": {
            "A": "approximating",
            "B": "approximated",
            "C": "approximately",
            "D": "approximate"
        },
        "correctAnswer": "C",
        "explanation": "Đứng trước cụm từ chỉ khoảng cách / thời gian có số lượng ('ten minutes away') cần một Trạng từ chỉ mức độ xấp xỉ ('approximately' = khoảng, xấp xỉ).",
        "tip": "⚡ MẸO: Trước con số / thời gian / khoảng cách (ten minutes, 50%, 100 people) -> Chọn Trạng từ đuôi '-ly' (approximately, roughly, nearly).",
        "keywords": ["situated", "approximately", "ten minutes away"],
        "vietnameseMeaning": "Trung tâm mua sắm Sommerland nằm cách khu vực trung tâm thành phố khoảng mười phút di chuyển.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_105",
        "num": 105,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Từ loại (Word Form)",
        "question": "After Benton Enterprises adopted the ------- of allowing its staff to work flexible hours, productivity began to rise.",
        "options": {
            "A": "practice",
            "B": "practically",
            "C": "practiced",
            "D": "practitioner"
        },
        "correctAnswer": "A",
        "explanation": "Vị trí nằm sau mạo từ 'the' và trước giới từ 'of' bắt buộc là Danh từ. 'adopt the practice of V-ing' = áp dụng thông lệ/thói quen/chính sách làm việc gì. 'Practitioner' là danh từ chỉ người (người hành nghề), không hợp nghĩa.",
        "tip": "⚡ MẸO: 'the + [DANH TỪ] + of' -> Cụm 'adopt the practice of' (áp dụng chính sách/thông lệ).",
        "keywords": ["adopted the", "practice of", "flexible hours"],
        "vietnameseMeaning": "Sau khi Benton Enterprises áp dụng chính sách cho phép nhân viên làm việc theo giờ linh hoạt, năng suất bắt đầu tăng lên.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_113",
        "num": 113,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Từ loại (Word Form)",
        "question": "Work from artist Leah Mills' newest collection was displayed ------- at the Beech Gallery in Atlanta.",
        "options": {
            "A": "exclusion",
            "B": "exclusively",
            "C": "excludes",
            "D": "exclude"
        },
        "correctAnswer": "B",
        "explanation": "Động từ dạng bị động 'was displayed' đã hoàn chỉnh ngữ pháp. Vị trí bổ nghĩa cho động từ/câu cần một Trạng từ đuôi '-ly' (exclusively = độc quyền, duy nhất).",
        "tip": "⚡ MẸO: Giữa hoặc sau cụm động từ bị động 'be + V-ed + [TRẠNG TỪ] + giới từ' -> Luôn chọn trạng từ đuôi '-ly' (exclusively).",
        "keywords": ["was displayed", "exclusively", "Gallery"],
        "vietnameseMeaning": "Các tác phẩm trong bộ sưu tập mới nhất của nghệ sĩ Leah Mills được trưng bày độc quyền tại Phòng trưng bày Beech ở Atlanta.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_118",
        "num": 118,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Từ loại (Word Form)",
        "question": "The launch of Blanca Restaurant was successful -------, but the proprietor wished the event had attracted greater attention from local media.",
        "options": {
            "A": "rather",
            "B": "enough",
            "C": "soon",
            "D": "yet"
        },
        "correctAnswer": "B",
        "explanation": "Quy tắc vị trí của 'enough': 'Tính từ / Trạng từ + enough' (successful enough: đủ thành công). Các từ khác như 'rather' đứng trước tính từ (rather successful).",
        "tip": "⚡ MẸO: Đứng SAU Tính từ (successful) để bổ nghĩa -> Chỉ có 'enough' đứng sau tính từ (Adj + enough).",
        "keywords": ["successful enough", "proprietor", "local media"],
        "vietnameseMeaning": "Lễ khai trương Nhà hàng Blanca đã diễn ra đủ thành công, nhưng người chủ vẫn ước sự kiện thu hút được sự chú ý lớn hơn từ truyền thông địa phương.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_127",
        "num": 127,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Từ loại (Word Form)",
        "question": "Steeltop's machinery is solidly built and will operate ------- for years without the need for costly maintenance and repairs.",
        "options": {
            "A": "explicitly",
            "B": "regretfully",
            "C": "reliably",
            "D": "attentively"
        },
        "correctAnswer": "C",
        "explanation": "Động từ 'operate' (nội động từ: vận hành) cần một Trạng từ bổ nghĩa về cách thức. Ngữ cảnh: máy móc được chế tạo chắc chắn (solidly built) thì sẽ vận hành một cách 'đáng tin cậy / ổn định' (reliably).",
        "tip": "⚡ MẸO: Máy móc bền chắc (solidly built) thì vận hành 'reliably' (ổn định, đáng tin cậy) không lo hỏng hóc.",
        "keywords": ["solidly built", "operate reliably", "maintenance"],
        "vietnameseMeaning": "Máy móc của Steeltop được chế tạo rất chắc chắn và sẽ vận hành ổn định trong nhiều năm mà không cần bảo trì, sửa chữa tốn kém.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_129",
        "num": 129,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Từ loại (Word Form)",
        "question": "Copyright ------- have the exclusive right to use, modify, and distribute the images they upload to Westforth Corporation's Web site.",
        "options": {
            "A": "held",
            "B": "holds",
            "C": "holding",
            "D": "holders"
        },
        "correctAnswer": "D",
        "explanation": "Trước động từ số nhiều 'have' cần Danh từ số nhiều làm Chủ ngữ. 'Copyright holders' là cụm danh từ ghép chỉ 'những người nắm giữ bản quyền'. Đuôi '-er/-ers' chỉ người.",
        "tip": "⚡ MẸO: Trước động từ 'have' (số nhiều) cần Chủ ngữ số nhiều -> Cụm danh từ 'Copyright holders' (những người sở hữu bản quyền).",
        "keywords": ["Copyright holders", "exclusive right", "images"],
        "vietnameseMeaning": "Những người nắm giữ bản quyền có quyền độc quyền sử dụng, sửa đổi và phân phối hình ảnh mà họ tải lên trang web của Westforth Corporation.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },

    # --- NHÓM 2: NGỮ PHÁP, THÌ & DẠNG ĐỘNG TỪ (GRAMMAR & TENSES) ---
    {
        "id": "docs2_p5_106",
        "num": 106,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Ngữ pháp & Thì (Grammar & Tenses)",
        "question": "Evergreen Hotel was built at a time when Baldwin City ------- strong growth, but it may close if the recession continues.",
        "options": {
            "A": "undergoes",
            "B": "is undergoing",
            "C": "will undergo",
            "D": "was undergoing"
        },
        "correctAnswer": "D",
        "explanation": "Mệnh đề trước chia thì quá khứ đơn 'Evergreen Hotel was built'. Mệnh đề quan hệ thời gian 'at a time when...' diễn tả bối cảnh đang diễn ra tại thời điểm quá khứ đó -> Chia Quá khứ tiếp diễn 'was undergoing'.",
        "tip": "⚡ MẸO: Hòa hợp thì quá khứ! 'was built' + 'at a time when' -> Hành động đang xảy ra trong quá khứ chọn 'was undergoing'.",
        "keywords": ["was built", "at a time when", "was undergoing"],
        "vietnameseMeaning": "Khách sạn Evergreen được xây dựng vào thời điểm Thành phố Baldwin đang trải qua sự phát triển mạnh mẽ, nhưng nó có thể phải đóng cửa nếu suy thoái kinh tế tiếp diễn.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_109",
        "num": 109,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Ngữ pháp & Thì (Grammar & Tenses)",
        "question": "The human resources manager called a meeting on Monday ------- everyone about his plan to hire new employees in the coming months.",
        "options": {
            "A": "informs",
            "B": "informed",
            "C": "be informed",
            "D": "to inform"
        },
        "correctAnswer": "D",
        "explanation": "Câu đã có đầy đủ Chủ ngữ (manager) và Động từ chính (called a meeting). Chỗ trống đứng sau để chỉ mục đích của hành động ('triệu tập cuộc họp ĐỂ thông báo...') -> Dùng To-infinitive (to inform).",
        "tip": "⚡ MẸO: Câu đã có S + V chính hoàn chỉnh. Đứng sau để chỉ mục đích -> Chọn 'to V' (to inform: để thông báo).",
        "keywords": ["called a meeting", "to inform", "plan"],
        "vietnameseMeaning": "Trưởng phòng nhân sự đã triệu tập một cuộc họp vào thứ Hai để thông báo cho mọi người về kế hoạch tuyển thêm nhân viên mới trong những tháng tới.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_110",
        "num": 110,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Ngữ pháp & Thì (Grammar & Tenses)",
        "question": "Mary Rose was asked to join the information access team because she ------- similar projects previously.",
        "options": {
            "A": "was contributed",
            "B": "had contributed",
            "C": "contributes",
            "D": "will contribute"
        },
        "correctAnswer": "B",
        "explanation": "Trạng từ 'previously' (trước đó) kết hợp với hành động trong quá khứ 'was asked' cho thấy việc đóng góp vào các dự án tương tự đã xảy ra TRƯỚC thời điểm được mời -> Chia thì Quá khứ hoàn thành (had contributed).",
        "tip": "⚡ MẸO: Có 'previously' (trước đó) + hành động quá khứ (was asked) -> Chọn thì Quá khứ hoàn thành 'had + V3/ed' (had contributed).",
        "keywords": ["was asked", "previously", "had contributed"],
        "vietnameseMeaning": "Mary Rose được mời tham gia nhóm tiếp cận thông tin vì cô ấy đã từng đóng góp vào các dự án tương tự trước đây.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_115",
        "num": 115,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Ngữ pháp & Thì (Grammar & Tenses)",
        "question": "Customers with packages exceeding 250 centimeters in length are ------- additional shipping fees by Bowden Couriers.",
        "options": {
            "A": "charging",
            "B": "charged",
            "C": "chargers",
            "D": "charges"
        },
        "correctAnswer": "B",
        "explanation": "Cấu trúc câu bị động: 'are + V3/ed + by...'. Khách hàng có kiện hàng vượt quá 250cm 'bị tính' thêm phí vận chuyển -> Dùng quá khứ phân từ 'charged'.",
        "tip": "⚡ MẸO: Nhìn thấy 'are' phía trước và 'by [tên công ty]' phía sau -> Câu bị động 'be + V-ed' -> Chọn ngay 'charged'.",
        "keywords": ["are charged", "additional fees", "by Bowden Couriers"],
        "vietnameseMeaning": "Những khách hàng có kiện hàng vượt quá chiều dài 250 cm sẽ bị công ty chuyển phát Bowden Couriers tính thêm phí vận chuyển.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_122",
        "num": 122,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Ngữ pháp & Thì (Grammar & Tenses)",
        "question": "The staff in charge of writing press releases should get all facts ------- thoroughly before sending an announcement to the media.",
        "options": {
            "A": "checked",
            "B": "checking",
            "C": "check",
            "D": "checks"
        },
        "correctAnswer": "A",
        "explanation": "Cấu trúc truyền khiến bị động với 'get': 'get + something + V3/ed' (nhờ ai làm gì hoặc kiểm tra cái gì được hoàn thành). Ở đây tân ngữ là vật ('all facts' - các sự kiện/thông tin) -> Cần phân từ quá khứ 'checked'.",
        "tip": "⚡ MẸO CẤU TRÚC: 'GET + Tân ngữ VẬT (facts) + V-ed/P2' -> Chọn 'checked' (kiểm chứng kỹ lưỡng).",
        "keywords": ["get all facts", "checked", "press releases"],
        "vietnameseMeaning": "Nhân viên phụ trách viết thông cáo báo chí nên kiểm chứng kỹ lưỡng mọi sự kiện trước khi gửi thông báo tới giới truyền thông.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },

    # --- NHÓM 3: MỆNH ĐỀ & ĐẠI TỪ (CLAUSES & PRONOUNS) ---
    {
        "id": "docs2_p5_104",
        "num": 104,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Mệnh đề & Đại từ (Clauses & Pronouns)",
        "question": "Mr. Katz was confident that ------- could do a better job with database maintenance than his highly skilled team.",
        "options": {
            "A": "less",
            "B": "few",
            "C": "those",
            "D": "whatever"
        },
        "correctAnswer": "B",
        "explanation": "'Few' đóng vai trò là đại từ số nhiều mang nghĩa phủ định 'hầu như không ai / rất ít người'. Câu mang ý nghĩa so sánh: Ông Katz tin rằng hiếm có ai làm tốt hơn đội ngũ tay nghề cao của ông.",
        "tip": "⚡ MẸO: 'Few' làm đại từ chỉ người mang nghĩa 'rất ít người / hiếm có ai' (few could do a better job than...). 'Less' đi với không đếm được.",
        "keywords": ["confident that", "few could do", "better job"],
        "vietnameseMeaning": "Ông Katz tự tin rằng hiếm có ai có thể bảo trì cơ sở dữ liệu tốt hơn đội ngũ tay nghề cao của ông.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_114",
        "num": 114,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Mệnh đề & Đại từ (Clauses & Pronouns)",
        "question": "------- wishing to work overtime this month is reminded to advise the supervisor before the end of the week.",
        "options": {
            "A": "Whoever",
            "B": "All",
            "C": "Those",
            "D": "Anyone"
        },
        "correctAnswer": "D",
        "explanation": "Động từ chính của câu là 'IS reminded' (chia số ít). 'All' và 'Those' là đại từ số nhiều (phải đi với 'are'). 'Whoever' cần một mệnh đề hoàn chỉnh có động từ chia (Whoever wishes). Rút gọn mệnh đề: 'Anyone (who is) wishing to... is reminded' -> Chọn 'Anyone'.",
        "tip": "⚡ BẪY KINH ĐIỂN TOEIC: Hãy nhìn động từ 'IS reminded' (số ít)! 'Those' và 'All' phải đi với 'are'. Chỉ có 'Anyone' mới đi với động từ số ít 'is'.",
        "keywords": ["Anyone wishing to", "is reminded", "overtime"],
        "vietnameseMeaning": "Bất kỳ ai muốn làm thêm giờ trong tháng này xin lưu ý thông báo cho người giám sát trước cuối tuần.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_123",
        "num": 123,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Mệnh đề & Đại từ (Clauses & Pronouns)",
        "question": "Ms. Reyes considered the amount of luggage she was taking on her beach excursion before deciding on ------- car to rent.",
        "options": {
            "A": "these",
            "B": "where",
            "C": "other",
            "D": "which"
        },
        "correctAnswer": "D",
        "explanation": "'Which' đóng vai trò từ hạn định nghi vấn đứng trước danh từ số ít 'car' để thể hiện sự lựa chọn giữa các đối tượng ('deciding on which car to rent' = quyết định nên thuê chiếc xe nào).",
        "tip": "⚡ MẸO: Đứng trước danh từ số ít 'car' để thể hiện sự lựa chọn (chọn xe nào) -> Dùng 'which + N' (which car to rent).",
        "keywords": ["deciding on", "which car to rent", "luggage"],
        "vietnameseMeaning": "Bà Reyes đã cân nhắc số lượng hành lý mang theo trong chuyến đi biển trước khi quyết định nên thuê chiếc xe nào.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },

    # --- NHÓM 4: GIỚI TỪ & LIÊN TỪ (PREPOSITIONS & CONJUNCTIONS) ---
    {
        "id": "docs2_p5_103",
        "num": 103,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Giới từ & Cụm từ (Prepositions)",
        "question": "All airlines are required by law to keep inflatable life jackets located ------- passenger seats in case there is an emergency.",
        "options": {
            "A": "following",
            "B": "next",
            "C": "except",
            "D": "underneath"
        },
        "correctAnswer": "D",
        "explanation": "Quy tắc an toàn hàng không: áo phao cứu sinh (life jackets) luôn được đặt 'bên dưới' ghế ngồi của hành khách -> Giới từ chỉ vị trí 'underneath' (ở ngay dưới).",
        "tip": "⚡ MẸO: Áo phao trên máy bay nằm ở đâu? Nằm ở bên dưới ghế ngồi -> Chọn 'underneath' (bên dưới).",
        "keywords": ["life jackets", "located underneath", "passenger seats"],
        "vietnameseMeaning": "Tất cả các hãng hàng không đều bị pháp luật bắt buộc phải để áo phao cứu sinh bơm hơi nằm bên dưới ghế hành khách phòng trường hợp khẩn cấp.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_120",
        "num": 120,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Liên từ (Conjunctions)",
        "question": "Renovations can begin on Bounty Bank's main offices ------- the board authorizes the project.",
        "options": {
            "A": "also",
            "B": "pending",
            "C": "unless",
            "D": "once"
        },
        "correctAnswer": "D",
        "explanation": "'Once' là liên từ chỉ thời gian mang nghĩa 'một khi / ngay khi' (+ S + V). Ngay khi hội đồng phê duyệt dự án thì việc cải tạo có thể bắt đầu.",
        "tip": "⚡ MẸO: Nối 2 mệnh đề hoàn chỉnh (Renovations can begin... + the board authorizes...) -> Chọn liên từ 'once' (một khi / ngay khi).",
        "keywords": ["can begin", "once the board authorizes", "project"],
        "vietnameseMeaning": "Việc cải tạo có thể bắt đầu tại trụ sở chính của Ngân hàng Bounty một khi hội đồng quản trị phê duyệt dự án.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_125",
        "num": 125,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Giới từ & Cụm từ (Prepositions)",
        "question": "------- a few members opposing the plan, the executive board has decided to go through with the investment in Diehl Electronics.",
        "options": {
            "A": "Notwithstanding",
            "B": "Consequently",
            "C": "Between",
            "D": "Throughout"
        },
        "correctAnswer": "A",
        "explanation": "'Notwithstanding' là giới từ mang nghĩa tương đương 'Despite / In spite of' (Mặc dù / Bất chấp), theo sau là cụm danh từ ('a few members opposing...'). Hai vế thể hiện sự tương phản.",
        "tip": "⚡ MẸO: 'Notwithstanding + Noun Phrase' = Mặc dù / Bất chấp (= Despite). Thấy có ý kiến phản đối nhưng ban quản trị vẫn quyết định đầu tư -> Tương phản nhượng bộ.",
        "keywords": ["Notwithstanding", "opposing the plan", "decided to go through"],
        "vietnameseMeaning": "Bất chấp một vài thành viên phản đối kế hoạch, ban điều hành vẫn quyết định tiến hành việc đầu tư vào Diehl Electronics.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_128",
        "num": 128,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Giới từ & Cụm từ (Prepositions)",
        "question": "The spokesperson for Beaumont Industries made an official apology ------- the company for the way it dealt with a delivery delay.",
        "options": {
            "A": "as soon as",
            "B": "according to",
            "C": "in spite of",
            "D": "on behalf of"
        },
        "correctAnswer": "D",
        "explanation": "Cụm thành ngữ cố định trong kinh doanh: 'on behalf of someone / an organization' = thay mặt, đại diện cho ai. Người phát ngôn gửi lời xin lỗi thay mặt cho công ty.",
        "tip": "⚡ MẸO THÀNH NGỮ: Người phát ngôn (spokesperson) lên tiếng xin lỗi 'thay mặt cho' công ty -> Dùng ngay cụm 'on behalf of' (thay mặt cho).",
        "keywords": ["spokesperson", "official apology", "on behalf of the company"],
        "vietnameseMeaning": "Người phát ngôn của Beaumont Industries đã đưa ra lời xin lỗi chính thức thay mặt cho công ty về cách xử lý sự cố chậm trễ giao hàng.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_130",
        "num": 130,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Liên từ (Conjunctions)",
        "question": "------- the weather is pleasant, the company's social gathering will occur at Ogilvy Park this weekend.",
        "options": {
            "A": "Rather than",
            "B": "Assuming that",
            "C": "Owing to",
            "D": "Hence"
        },
        "correctAnswer": "B",
        "explanation": "'Assuming that + Clause (S + V)' là liên từ chỉ điều kiện mang nghĩa 'Giả sử rằng / Miễn là / Với điều kiện là' (= Providing that / If). Vế sau là mệnh đề 'the weather is pleasant'. 'Owing to' là giới từ (đi với N, không đi với clause).",
        "tip": "⚡ MẸO: Đứng đầu mệnh đề S + V (the weather is pleasant) chỉ điều kiện -> Chọn 'Assuming that' (= If / Provided that: Giả sử là / Miễn là).",
        "keywords": ["Assuming that", "weather is pleasant", "gathering will occur"],
        "vietnameseMeaning": "Giả sử thời tiết thuận lợi, buổi gặp mặt giao lưu của công ty sẽ diễn ra tại Công viên Ogilvy vào cuối tuần này.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },

    # --- NHÓM 5: TỪ VỰNG & COLLOCATIONS (VOCABULARY) ---
    {
        "id": "docs2_p5_107",
        "num": 107,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Từ vựng (Vocabulary)",
        "question": "The display coordinator's role is to ensure that everything sold in the store is arranged ------- to look appealing to customers.",
        "options": {
            "A": "barely",
            "B": "namely",
            "C": "formerly",
            "D": "carefully"
        },
        "correctAnswer": "D",
        "explanation": "Bổ nghĩa cho động từ 'arranged' (sắp xếp). Mục đích là để trông bắt mắt (look appealing) đối với khách hàng -> Hàng hóa phải được sắp xếp một cách 'cẩn thận, chu đáo' (carefully).",
        "tip": "⚡ MẸO DỊCH NGHĨA: Sắp xếp hàng hóa trưng bày để thu hút khách thì phải sắp xếp 'carefully' (cẩn thận). (A: hiếm khi, B: cụ thể là, C: trước đây).",
        "keywords": ["arranged carefully", "appealing to customers"],
        "vietnameseMeaning": "Vai trò của điều phối viên trưng bày là đảm bảo mọi thứ bán trong cửa hàng được sắp xếp cẩn thận để trông thật bắt mắt với khách hàng.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_108",
        "num": 108,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Từ vựng (Vocabulary)",
        "question": "Many consumers agreed that Edgewood Limited's greatest strength was its ------- in maintaining high levels of quality.",
        "options": {
            "A": "comparison",
            "B": "component",
            "C": "consistency",
            "D": "conclusion"
        },
        "correctAnswer": "C",
        "explanation": "'Consistency in doing something' = sự nhất quán, kiên định, ổn định trong việc gì. Điểm mạnh lớn nhất của công ty là sự nhất quán trong việc duy trì tiêu chuẩn chất lượng cao.",
        "tip": "⚡ MẸO TỪ VỰNG: Cụm từ quen thuộc trong quản lý chất lượng: 'consistency in maintaining quality' = sự nhất quán / phong độ ổn định trong duy trì chất lượng.",
        "keywords": ["greatest strength", "consistency in", "high levels of quality"],
        "vietnameseMeaning": "Nhiều người tiêu dùng đồng ý rằng thế mạnh lớn nhất của Edgewood Limited là sự ổn định và nhất quán trong việc duy trì chất lượng ở mức cao.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_111",
        "num": 111,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Từ vựng (Vocabulary)",
        "question": "The accounting department's current software program is not ------- for the tasks that need to be performed.",
        "options": {
            "A": "adequate",
            "B": "competent",
            "C": "comforting",
            "D": "proficient"
        },
        "correctAnswer": "A",
        "explanation": "'Adequate for something' = đáp ứng đủ, thỏa đáng cho việc gì. Chủ ngữ là phần mềm (software program - vật), do đó không dùng 'competent' hay 'proficient' (vì hai từ này chỉ năng lực của con người).",
        "tip": "⚡ MẸO BẪY: 'Competent / Proficient' chỉ dùng khen người thành thạo. Đánh giá phần mềm/thiết bị đáp ứng đủ công việc hay không -> Dùng 'adequate for' (đáp ứng đủ).",
        "keywords": ["software program", "not adequate for", "tasks"],
        "vietnameseMeaning": "Phần mềm hiện tại của phòng kế toán không đủ đáp ứng cho các tác vụ cần phải thực hiện.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_112",
        "num": 112,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Từ vựng (Vocabulary)",
        "question": "Chef Alan Peralta's ------- of classic French dishes is considered both unique and daring in the culinary world.",
        "options": {
            "A": "obligation",
            "B": "calculation",
            "C": "subtraction",
            "D": "interpretation"
        },
        "correctAnswer": "D",
        "explanation": "Trong ẩm thực và nghệ thuật, 'interpretation of dishes' = cách biến tấu, cách thể hiện, sự sáng tạo món ăn. Sự biến tấu món ăn Pháp của đầu bếp được đánh giá là độc đáo (unique) và táo bạo (daring).",
        "tip": "⚡ MẸO TỪ VỰNG: 'interpretation of dishes / music' = phong cách biến tấu, thể hiện nghệ thuật ẩm thực. (A: nghĩa vụ, B: tính toán, C: phép trừ).",
        "keywords": ["interpretation of", "French dishes", "unique and daring"],
        "vietnameseMeaning": "Cách biến tấu các món ăn Pháp cổ điển của Đầu bếp Alan Peralta được giới ẩm thực đánh giá là vừa độc đáo vừa táo bạo.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_116",
        "num": 116,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Từ vựng (Vocabulary)",
        "question": "Participants will be given ample time after the presentation to ------- any concerns they may have about the marketing plan.",
        "options": {
            "A": "raise",
            "B": "discharge",
            "C": "screen",
            "D": "invest"
        },
        "correctAnswer": "A",
        "explanation": "Collocation kinh điển trong hội thảo công sở: 'raise concerns / raise questions' = nêu lên, đưa ra những băn khoăn, câu hỏi thắc mắc.",
        "tip": "⚡ MẸO COLLOCATION: Đi với 'concerns' hoặc 'questions' -> Chọn động từ 'raise' (raise concerns = nêu lên những băn khoăn thắc mắc).",
        "keywords": ["raise any concerns", "presentation", "marketing plan"],
        "vietnameseMeaning": "Những người tham gia sẽ có nhiều thời gian sau bài thuyết trình để nêu lên bất kỳ thắc mắc nào mà họ có về kế hoạch tiếp thị.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_117",
        "num": 117,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Từ vựng (Vocabulary)",
        "question": "The new road from Batik Enterprise's warehouse to the post office has been a great ------- for employees in the shipping department.",
        "options": {
            "A": "registration",
            "B": "increment",
            "C": "movement",
            "D": "advantage"
        },
        "correctAnswer": "D",
        "explanation": "Con đường mới giúp kết nối trực tiếp kho với bưu điện mang lại 'a great advantage' = một lợi thế / sự thuận lợi rất lớn cho nhân viên giao vận.",
        "tip": "⚡ MẸO TỪ VỰNG: Con đường mới mở giúp công việc nhanh hơn -> Mang lại 'lợi thế/thuận lợi lớn' -> Chọn 'advantage'. (A: đăng ký, B: tăng lương, C: chuyển động).",
        "keywords": ["new road", "great advantage", "shipping department"],
        "vietnameseMeaning": "Con đường mới nối từ nhà kho của Batik Enterprise đến bưu điện đã tạo ra một thuận lợi to lớn cho các nhân viên ở bộ phận vận chuyển.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_119",
        "num": 119,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Từ vựng (Vocabulary)",
        "question": "Edmonton Supply is ------- to extend a discount when customers place a minimum order for 1,000 units of the camping accessories.",
        "options": {
            "A": "capable",
            "B": "respective",
            "C": "compatible",
            "D": "willing"
        },
        "correctAnswer": "D",
        "explanation": "Cấu trúc: 'be willing to V' = sẵn lòng làm gì (sẵn sàng giảm giá khi khách đặt số lượng lớn). 'Capable' phải đi với 'of V-ing', 'compatible' đi với 'with'.",
        "tip": "⚡ MẸO CẤU TRÚC: 'be willing to + V nguyên mẫu' = sẵn lòng / sẵn sàng làm gì. (Capable of V-ing; Compatible with).",
        "keywords": ["willing to extend a discount", "minimum order"],
        "vietnameseMeaning": "Edmonton Supply sẵn lòng giảm giá khi khách hàng đặt đơn hàng tối thiểu 1.000 sản phẩm phụ kiện cắm trại.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_121",
        "num": 121,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Từ vựng (Vocabulary)",
        "question": "Ms. Wilson left behind a career in law to ------- her dream of running a bed-and-breakfast in Tuscany.",
        "options": {
            "A": "aspire",
            "B": "pursue",
            "C": "withdraw",
            "D": "contend"
        },
        "correctAnswer": "B",
        "explanation": "Cụm collocation thường gặp: 'pursue one's dream / career' = theo đuổi ước mơ / sự nghiệp. Rời bỏ ngành luật để theo đuổi ước mơ mở homestay.",
        "tip": "⚡ MẸO COLLOCATION: Đi với 'dream' (ước mơ) -> Luôn là 'pursue one's dream' (theo đuổi giấc mơ của ai).",
        "keywords": ["pursue her dream", "career in law", "bed-and-breakfast"],
        "vietnameseMeaning": "Bà Wilson đã từ bỏ sự nghiệp trong ngành luật để theo đuổi ước mơ mở một nhà nghỉ homestay tại vùng Tuscany.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_124",
        "num": 124,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Từ vựng (Vocabulary)",
        "question": "A top competitor withdrew from the international tennis tournament due to a ------- injury.",
        "options": {
            "A": "captivating",
            "B": "prescribing",
            "C": "towering",
            "D": "lingering"
        },
        "correctAnswer": "D",
        "explanation": "'A lingering injury' = một chấn thương dai dẳng, kéo dài chưa khỏi hẳn. Đây là nguyên nhân khiến vận động viên phải rút lui khỏi giải đấu.",
        "tip": "⚡ MẸO TỪ VỰNG: Bổ nghĩa cho 'injury' (chấn thương thể thao kéo dài không dứt) -> Dùng tính từ 'lingering' (dai dẳng, âm ỉ).",
        "keywords": ["withdrew", "tennis tournament", "lingering injury"],
        "vietnameseMeaning": "Một đối thủ hạt giống hàng đầu đã rút lui khỏi giải quần vợt quốc tế vì một chấn thương dai dẳng kéo dài.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    },
    {
        "id": "docs2_p5_126",
        "num": 126,
        "source": "Docs 2 - Part 5 Luyện đề",
        "category": "Từ vựng (Vocabulary)",
        "question": "An international body has ------- the formation of a protected area covering large sections of the Amazon rainforest.",
        "options": {
            "A": "notified",
            "B": "approved",
            "C": "deducted",
            "D": "signified"
        },
        "correctAnswer": "B",
        "explanation": "'Approve the formation / establishment of something' = phê duyệt việc thành lập / thiết lập cái gì. Một tổ chức quốc tế đã chính thức phê duyệt việc thành lập khu bảo tồn rừng nhiệt đới Amazon.",
        "tip": "⚡ MẸO TỪ VỰNG: Cơ quan, tổ chức xem xét một đề án -> 'approve the formation' = phê chuẩn, phê duyệt việc thành lập.",
        "keywords": ["international body", "approved the formation", "protected area"],
        "vietnameseMeaning": "Một tổ chức quốc tế đã phê duyệt việc thành lập một khu bảo tồn bao phủ nhiều khu vực rộng lớn của rừng mưa Amazon.",
        "stage": 2,
        "badge": "🚀 Giai đoạn 2: Luyện đề & Nâng cao"
    }
]

print(f"Compiled Part 5: {len(part5_questions)} questions")
