import { Question } from '../types';
import { docs2Questions } from './docs2Questions';
import { docs3Questions } from './docs3Questions';
import { docs4Questions } from './docs4Questions';

const rawQuestions: Question[] = [
  {
    "id": "toice2_101",
    "num": 101,
    "source": "ToIce 2",
    "category": "Ngữ pháp & Thì (Grammar & Tenses)",
    "question": "The chief financial officer believes that we should maintain the present course, and ------- his deputy.",
    "options": {
      "A": "as to",
      "B": "whereas",
      "C": "as does",
      "D": "as long as"
    },
    "correctAnswer": "C",
    "explanation": "Cấu trúc đảo ngữ đồng tình khẳng định: 'as does + S' (cũng như... vậy), tương tự 'so does + S'. Ở đây giám đốc tài chính tin như vậy và cấp phó của ông ấy cũng tin như vậy.",
    "tip": "⚡ MẸO: Thấy 'and' + động từ trợ/to-be + Chủ ngữ mới -> Chọn đảo ngữ đồng tình khẳng định: 'as does' (và cấp phó của ông ta cũng vậy).",
    "keywords": [
      "and",
      "his deputy",
      "as does"
    ],
    "vietnameseMeaning": "Giám đốc tài chính tin rằng chúng ta nên duy trì đường lối hiện tại, và cấp phó của ông ấy cũng nghĩ như vậy."
  },
  {
    "id": "toice2_102",
    "num": 102,
    "source": "ToIce 2",
    "category": "Liên từ (Conjunctions)",
    "question": "------- you have familiarized yourself with the basic commands, we can begin to learn some of this program's more creative features.",
    "options": {
      "A": "Already",
      "B": "Before",
      "C": "Once",
      "D": "Earlier"
    },
    "correctAnswer": "C",
    "explanation": "'Once' là liên từ chỉ thời gian mang nghĩa 'Một khi...'. Đằng sau là mệnh đề hoàn chỉnh (S + V) 'you have familiarized yourself...'. Already và Earlier là trạng từ, không nối 2 mệnh đề.",
    "tip": "⚡ MẸO: Đứng đầu câu trước 1 mệnh đề (S + V) chỉ điều kiện/thời gian -> Chọn 'Once' (Một khi...).",
    "keywords": [
      "Once",
      "you have familiarized"
    ],
    "vietnameseMeaning": "Một khi bạn đã làm quen với các câu lệnh cơ bản, chúng ta có thể bắt đầu học các tính năng sáng tạo hơn của chương trình này."
  },
  {
    "id": "toice2_103",
    "num": 103,
    "source": "ToIce 2",
    "category": "Mệnh đề & Đại từ (Clauses & Pronouns)",
    "question": "The director ------- has often been seen to take his lunch in the staff canteen along with the other workers.",
    "options": {
      "A": "him",
      "B": "his",
      "C": "himself",
      "D": "he"
    },
    "correctAnswer": "C",
    "explanation": "Câu đã có đủ Chủ ngữ (The director) và Vị ngữ (has often been seen...). Chỗ trống đứng ngay sau danh từ làm chủ ngữ -> Dùng đại từ phản thân 'himself' để nhấn mạnh: 'Đích thân giám đốc'.",
    "tip": "⚡ MẸO: Câu đã đủ S và V, chỗ trống nằm kẹp giữa S và V -> Chọn ngay ĐẠI TỪ PHẢN THÂN (-self) để nhấn mạnh chủ ngữ.",
    "keywords": [
      "The director",
      "himself",
      "has often been seen"
    ],
    "vietnameseMeaning": "Đích thân ngài giám đốc thường được thấy ăn trưa tại căng tin nhân viên cùng với các công nhân khác."
  },
  {
    "id": "toice2_104",
    "num": 104,
    "source": "ToIce 2",
    "category": "Từ loại (Word Form)",
    "question": "The Department of the Environment supports the replacement of introduced plants with ------- plants that require much less watering.",
    "options": {
      "A": "native",
      "B": "nativity",
      "C": "natively",
      "D": "nativeness"
    },
    "correctAnswer": "A",
    "explanation": "Chỗ trống đứng trước danh từ 'plants' -> Cần một TÍNH TỪ bổ nghĩa cho danh từ. 'native' (tính từ: bản địa) -> 'native plants' = cây bản địa.",
    "tip": "⚡ MẸO: Trước Danh từ (plants) cần Tính từ (Adj). Nhớ cụm quen thuộc: 'native plants' = thực vật bản địa.",
    "keywords": [
      "native plants",
      "require much less watering"
    ],
    "vietnameseMeaning": "Bộ Môi trường ủng hộ việc thay thế các loài cây du nhập bằng cây bản địa đòi hỏi ít nước tưới hơn nhiều."
  },
  {
    "id": "toice2_105",
    "num": 105,
    "source": "ToIce 2",
    "category": "Ngữ pháp & Thì (Grammar & Tenses)",
    "question": "Several exciting new pieces of equipment ------- in our gymnasium, and we invite you to come and try them out at no cost during the next week.",
    "options": {
      "A": "install",
      "B": "installed",
      "C": "have install",
      "D": "have been installed"
    },
    "correctAnswer": "D",
    "explanation": "Chủ ngữ là 'equipment' (thiết bị - đồ vật) -> Phải chia ở thể BỊ ĐỘNG (be + V3/ed). Chỉ có (D) 'have been installed' (đã được lắp đặt) là cấu trúc bị động chuẩn.",
    "tip": "⚡ MẸO: Chủ ngữ chỉ đồ vật (equipment - thiết bị) -> Không tự làm được, PHẢI CHỌN BỊ ĐỘNG (have/has been + V-ed).",
    "keywords": [
      "equipment",
      "have been installed"
    ],
    "vietnameseMeaning": "Một số thiết bị mới đầy thú vị đã được lắp đặt tại phòng tập của chúng tôi, mời bạn ghé dùng thử miễn phí vào tuần tới."
  },
  {
    "id": "toice2_106",
    "num": 106,
    "source": "ToIce 2",
    "category": "Từ vựng (Vocabulary)",
    "question": "A small group of contestants has been selected following a nationwide search ------- over the last six months.",
    "options": {
      "A": "alerted",
      "B": "engaged",
      "C": "protected",
      "D": "conducted"
    },
    "correctAnswer": "D",
    "explanation": "Cụm collocation kinh điển: 'conduct a search/survey/study' (tiến hành tìm kiếm, khảo sát). Ở đây rút gọn mệnh đề bị động: 'a search (which was) conducted' = cuộc tìm kiếm được tiến hành.",
    "tip": "⚡ MẸO: Đi với search, survey, research, study -> Nhắm ngay động từ 'conduct' (tiến hành).",
    "keywords": [
      "search",
      "conducted",
      "over the last six months"
    ],
    "vietnameseMeaning": "Một nhóm nhỏ thí sinh đã được chọn sau một cuộc tìm kiếm toàn quốc được tiến hành trong suốt 6 tháng qua."
  },
  {
    "id": "toice2_107",
    "num": 107,
    "source": "ToIce 2",
    "category": "Mệnh đề & Đại từ (Clauses & Pronouns)",
    "question": "Naturally, our company utilizes the production process ------- guarantees the most satisfactory results.",
    "options": {
      "A": "that",
      "B": "who",
      "C": "what",
      "D": "how"
    },
    "correctAnswer": "A",
    "explanation": "Đại từ quan hệ 'that' thay thế cho danh từ chỉ vật 'production process' (quy trình sản xuất) và làm chủ ngữ cho động từ 'guarantees'. 'who' chỉ người, 'what/how' không làm đại từ quan hệ sau danh từ.",
    "tip": "⚡ MẸO: Đứng sau Danh từ chỉ vật (process - quy trình) và trước Động từ (guarantees) -> Chọn ngay 'that' hoặc 'which'.",
    "keywords": [
      "production process",
      "that guarantees"
    ],
    "vietnameseMeaning": "Đương nhiên, công ty chúng tôi áp dụng quy trình sản xuất đảm bảo mang lại kết quả thỏa đáng nhất."
  },
  {
    "id": "toice2_108",
    "num": 108,
    "source": "ToIce 2",
    "category": "Giới từ & Cụm từ (Prepositions)",
    "question": "According to the sign posted in front of the main office, the repair center is now ------- new management.",
    "options": {
      "A": "over",
      "B": "around",
      "C": "between",
      "D": "under"
    },
    "correctAnswer": "D",
    "explanation": "Cụm giới từ cố định (collocation) siêu phổ biến trong TOEIC: 'under new management' = dưới sự quản lý/điều hành mới.",
    "tip": "⚡ MẸO: Thấy 'management' (sự quản lý) -> 99% chọn giới từ 'under' -> 'under new management'.",
    "keywords": [
      "under new management"
    ],
    "vietnameseMeaning": "Theo biển báo trước văn phòng chính, trung tâm sửa chữa hiện nay đang dưới sự quản lý mới."
  },
  {
    "id": "toice2_109",
    "num": 109,
    "source": "ToIce 2",
    "category": "Từ vựng (Vocabulary)",
    "question": "Health inspections are conducted ------- at restaurants throughout the province for the purpose of maintaining high standards of hygiene.",
    "options": {
      "A": "extremely",
      "B": "marginally",
      "C": "overly",
      "D": "routinely"
    },
    "correctAnswer": "D",
    "explanation": "'routinely' (trạng từ) = một cách định kỳ, thường lệ. Các đợt thanh tra an toàn vệ sinh thực phẩm được tiến hành định kỳ (conducted routinely).",
    "tip": "⚡ MẸO: Thấy thanh tra, kiểm tra (inspections, checks) đi với 'conducted' -> Chọn 'routinely' (định kỳ/thường xuyên).",
    "keywords": [
      "inspections",
      "conducted routinely",
      "hygiene"
    ],
    "vietnameseMeaning": "Các đợt thanh tra y tế được tiến hành định kỳ tại các nhà hàng trên toàn tỉnh nhằm duy trì tiêu chuẩn vệ sinh cao."
  },
  {
    "id": "toice2_110",
    "num": 110,
    "source": "ToIce 2",
    "category": "Giới từ & Cụm từ (Prepositions)",
    "question": "Numerous speakers came forward to express their gratitude ------- the retiring secretary's unfailing courtesy and efficiency.",
    "options": {
      "A": "for",
      "B": "at",
      "C": "to",
      "D": "with"
    },
    "correctAnswer": "A",
    "explanation": "Cấu trúc: 'gratitude to someone' (biết ơn ai), 'gratitude FOR something' (lòng biết ơn VÌ điều gì). Ở đây là vì sự nhã nhặn và hiệu quả của người thư ký -> dùng 'for'.",
    "tip": "⚡ MẸO: Thấy 'gratitude' (lòng biết ơn) đứng trước lý do/sự việc -> Chọn 'for' (express gratitude for sth).",
    "keywords": [
      "express gratitude for"
    ],
    "vietnameseMeaning": "Nhiều diễn giả đã tiến lên bày tỏ lòng biết ơn đối với sự nhã nhặn và tinh thần làm việc không mệt mỏi của cô thư ký sắp về hưu."
  },
  {
    "id": "toice2_111",
    "num": 111,
    "source": "ToIce 2",
    "category": "Liên từ (Conjunctions)",
    "question": "------- you are no doubt aware, the new security system requires the installation of a backup power source in case an emergency situation arises.",
    "options": {
      "A": "As",
      "B": "For",
      "C": "With",
      "D": "So"
    },
    "correctAnswer": "A",
    "explanation": "Cụm diễn đạt cố định: 'As you are (no doubt) aware' = Như bạn (chắc chắn) đã biết. Thường dùng mở đầu thông báo nội bộ.",
    "tip": "⚡ MẸO: Đầu câu có cụm '... you are aware / as you know' -> Chọn ngay 'As' (As you are aware = Như bạn đã biết).",
    "keywords": [
      "As you are aware"
    ],
    "vietnameseMeaning": "Như bạn chắc chắn đã biết, hệ thống an ninh mới yêu cầu lắp đặt nguồn điện dự phòng phòng trường hợp khẩn cấp."
  },
  {
    "id": "toice2_112",
    "num": 112,
    "source": "ToIce 2",
    "category": "Từ loại (Word Form)",
    "question": "ABC Shoe Store asked ------- to make their final selections and bring them to cashiers' stations within 30 minutes.",
    "options": {
      "A": "shopper",
      "B": "shopping",
      "C": "to shop",
      "D": "Shoppers"
    },
    "correctAnswer": "D",
    "explanation": "Cấu trúc: 'ask + someone + to do sth'. Vế sau dùng tính từ sở hữu số nhiều 'their final selections' -> Tân ngữ phía trước phải là danh từ số nhiều 'shoppers' (khách mua sắm).",
    "tip": "⚡ MẸO: Thấy vế sau có 'their' (của họ - số nhiều) -> Phía trước chọn Danh từ số nhiều có đuôi 's' ('shoppers').",
    "keywords": [
      "asked shoppers",
      "their final selections"
    ],
    "vietnameseMeaning": "Cửa hàng giày ABC yêu cầu các khách mua sắm đưa ra lựa chọn cuối cùng và mang ra quầy thu ngân trong vòng 30 phút."
  },
  {
    "id": "toice2_113",
    "num": 113,
    "source": "ToIce 2",
    "category": "Từ vựng (Vocabulary)",
    "question": "Rexington Engineering has recently set up an entire new research ------- because of the increasing interest in robotic technology.",
    "options": {
      "A": "separation",
      "B": "partition",
      "C": "segmentation",
      "D": "division"
    },
    "correctAnswer": "D",
    "explanation": "Trong môi trường doanh nghiệp, 'division' là phòng ban, bộ phận. 'research division' = bộ phận nghiên cứu.",
    "tip": "⚡ MẸO: Thấy 'research' (nghiên cứu) trong ngữ cảnh công ty -> Ghép thành cụm 'research division' (phòng/bộ phận nghiên cứu).",
    "keywords": [
      "research division"
    ],
    "vietnameseMeaning": "Rexington Engineering gần đây đã thành lập một bộ phận nghiên cứu hoàn toàn mới do sự quan tâm ngày càng tăng đối với công nghệ robot."
  },
  {
    "id": "toice2_114",
    "num": 114,
    "source": "ToIce 2",
    "category": "Từ vựng (Vocabulary)",
    "question": "Electron Recycling has developed a profitable business by recycling metals retrieved from ------- electronic components.",
    "options": {
      "A": "discarded",
      "B": "extended",
      "C": "unoccupied",
      "D": "suppressed"
    },
    "correctAnswer": "A",
    "explanation": "'discarded' = bị vứt bỏ, phế thải. Tái chế kim loại lấy từ các linh kiện điện tử bị vứt bỏ (discarded electronic components).",
    "tip": "⚡ MẸO: Thấy 'recycling' (tái chế) -> Tái chế những thứ 'bị vứt bỏ' -> Chọn 'discarded'.",
    "keywords": [
      "recycling",
      "discarded electronic components"
    ],
    "vietnameseMeaning": "Electron Recycling đã phát triển một mảng kinh doanh sinh lời bằng cách tái chế kim loại thu hồi từ các linh kiện điện tử bị vứt bỏ."
  },
  {
    "id": "toice2_115",
    "num": 115,
    "source": "ToIce 2",
    "category": "Từ vựng (Vocabulary)",
    "question": "Consultation with the appropriate experts is essential if we are to arrive at an ------- decision.",
    "options": {
      "A": "informed",
      "B": "obtained",
      "C": "enlightened",
      "D": "acquainted"
    },
    "correctAnswer": "A",
    "explanation": "Cụm danh từ kinh điển: 'an informed decision' = quyết định sáng suốt / dựa trên thông tin đầy đủ sau khi tham vấn chuyên gia.",
    "tip": "⚡ MẸO: Đi với 'decision' (quyết định) -> Nhớ ngay cụm 'informed decision' (quyết định thấu đáo, sáng suốt).",
    "keywords": [
      "an informed decision"
    ],
    "vietnameseMeaning": "Việc tham khảo ý kiến các chuyên gia thích hợp là điều thiết yếu nếu chúng ta muốn đưa ra một quyết định sáng suốt."
  },
  {
    "id": "toice2_117",
    "num": 117,
    "source": "ToIce 2",
    "category": "Ngữ pháp & Thì (Grammar & Tenses)",
    "question": "Once you have paid the appropriate student fees, you will be able to ------- the medical, recreational, and other facilities.",
    "options": {
      "A": "access",
      "B": "accessed",
      "C": "accessory",
      "D": "accessible"
    },
    "correctAnswer": "A",
    "explanation": "Cấu trúc: 'be able to + V nguyên mẫu' (có thể làm gì). Do đó chỗ trống bắt buộc là động từ nguyên thể 'access' (sử dụng/tiếp cận).",
    "tip": "⚡ MẸO: Thấy 'be able to' -> Phía sau 100% chọn ĐỘNG TỪ NGUYÊN MẪU (V-inf) -> Chọn 'access'.",
    "keywords": [
      "be able to access"
    ],
    "vietnameseMeaning": "Một khi đã nộp học phí sinh viên phù hợp, bạn sẽ có thể sử dụng các cơ sở y tế, giải trí và các tiện ích khác."
  },
  {
    "id": "toice2_118",
    "num": 118,
    "source": "ToIce 2",
    "category": "Từ loại (Word Form)",
    "question": "Company strategists ------- predicted that conditions in the Middle East would eventually stabilize and result in expanded sales.",
    "options": {
      "A": "wrong",
      "B": "wronged",
      "C": "wrongly",
      "D": "wrongness"
    },
    "correctAnswer": "C",
    "explanation": "Chỗ trống đứng giữa Chủ ngữ (Company strategists) và Động từ chính (predicted) -> Cần một TRẠNG TỪ (Adv) có đuôi '-ly' để bổ nghĩa cho động từ: 'wrongly predicted' (dự đoán sai lầm).",
    "tip": "⚡ MẸO: Đứng ngay trước Động từ (predicted) -> Cần TRẠNG TỪ (đuôi -ly) để bổ nghĩa -> Chọn 'wrongly'.",
    "keywords": [
      "wrongly predicted"
    ],
    "vietnameseMeaning": "Các chiến lược gia công ty đã dự đoán sai lầm rằng tình hình ở Trung Đông cuối cùng sẽ ổn định và dẫn tới doanh số tăng."
  },
  {
    "id": "toice2_120",
    "num": 120,
    "source": "ToIce 2",
    "category": "Từ vựng (Vocabulary)",
    "question": "The unexpected surge in the prices of steel and other minerals will result in a dramatic increase in tax ------- this year.",
    "options": {
      "A": "rates",
      "B": "charges",
      "C": "expenses",
      "D": "revenues"
    },
    "correctAnswer": "D",
    "explanation": "Cụm danh từ kinh tế: 'tax revenues' = nguồn thu từ thuế (ngân sách nhà nước thu được). Giá tăng làm tăng tổng số tiền thu từ thuế.",
    "tip": "⚡ MẸO: Thấy 'tax' (thuế) đi với 'increase' (tăng thu ngân sách) -> Chọn 'tax revenues' (nguồn thu từ thuế).",
    "keywords": [
      "tax revenues",
      "dramatic increase"
    ],
    "vietnameseMeaning": "Sự tăng giá đột biến của thép và các khoáng sản khác sẽ dẫn đến mức tăng mạnh về nguồn thu ngân sách từ thuế trong năm nay."
  },
  {
    "id": "toice2_121",
    "num": 121,
    "source": "ToIce 2",
    "category": "Từ vựng (Vocabulary)",
    "question": "The secretary filling in at the reception desk has been performing so well that management is considering offering her a ------- position.",
    "options": {
      "A": "durable",
      "B": "periodic",
      "C": "binding",
      "D": "permanent"
    },
    "correctAnswer": "D",
    "explanation": "'permanent position' = vị trí công việc chính thức/dài hạn (ngược lại với thời vụ - temporary). Thư ký tạm quyền làm quá tốt nên được cất nhắc lên chính thức.",
    "tip": "⚡ MẸO: Thấy 'offering her a ... position' (tuyển dụng) -> 90% chọn 'permanent' (vị trí chính thức/lâu dài).",
    "keywords": [
      "permanent position"
    ],
    "vietnameseMeaning": "Cô thư ký làm thay ở bàn lễ tân đã thể hiện quá tốt đến mức ban quản lý đang cân nhắc trao cho cô một vị trí làm việc chính thức."
  },
  {
    "id": "toice2_122",
    "num": 122,
    "source": "ToIce 2",
    "category": "Liên từ (Conjunctions)",
    "question": "------- leaving school, she has worked in a variety of positions but has not yet found one which suits her talents or interests.",
    "options": {
      "A": "Despite",
      "B": "Since",
      "C": "In spite of",
      "D": "If"
    },
    "correctAnswer": "B",
    "explanation": "Nhìn vế chính chia thì HIỆN TẠI HOÀN THÀNH ('has worked') -> Giới từ/liên từ chỉ mốc thời gian bắt đầu hành động phải là 'Since' (Since + V-ing = Kể từ khi rời ghế nhà trường).",
    "tip": "⚡ MẸO: Vế sau có 'has/have + V3' (Hiện tại hoàn thành) -> Đầu câu chọn ngay 'Since' (Kể từ khi...).",
    "keywords": [
      "Since leaving school",
      "has worked"
    ],
    "vietnameseMeaning": "Kể từ khi tốt nghiệp ra trường, cô ấy đã làm qua nhiều vị trí khác nhau nhưng vẫn chưa tìm được công việc phù hợp với tài năng."
  },
  {
    "id": "toice2_123",
    "num": 123,
    "source": "ToIce 2",
    "category": "Từ loại (Word Form)",
    "question": "This is an excellent time to consider changing jobs because of the large number of positions ------- available in the mining sector.",
    "options": {
      "A": "commonly",
      "B": "currently",
      "C": "actively",
      "D": "approvingly"
    },
    "correctAnswer": "B",
    "explanation": "Cụm Adv + Adj cực kỳ quen thuộc: 'currently available' = hiện đang có sẵn / đang tuyển.",
    "tip": "⚡ MẸO: Thấy 'available' (có sẵn) -> Phía trước thường đi với 'currently' -> 'currently available' (hiện đang có sẵn).",
    "keywords": [
      "currently available"
    ],
    "vietnameseMeaning": "Đây là thời điểm tuyệt vời để cân nhắc đổi việc vì có số lượng lớn vị trí hiện đang mở tuyển trong ngành khai khoáng."
  },
  {
    "id": "toice2_124",
    "num": 124,
    "source": "ToIce 2",
    "category": "Mệnh đề & Đại từ (Clauses & Pronouns)",
    "question": "------- wanting to apply for maternity leave should let their immediate supervisor know about their plans at least one month in advance.",
    "options": {
      "A": "Them",
      "B": "That",
      "C": "One",
      "D": "Those"
    },
    "correctAnswer": "D",
    "explanation": "Cấu trúc: 'Those + V-ing' / 'Those who...' = Những ai/những người muốn... Vế sau có 'their' (của họ - số nhiều) nên chủ ngữ phải là 'Those'.",
    "tip": "⚡ MẸO: Đầu câu đứng trước 'wanting to / who' + phía sau có 'their' -> Chọn ngay 'Those' (Những ai muốn...).",
    "keywords": [
      "Those wanting to",
      "their immediate supervisor"
    ],
    "vietnameseMeaning": "Những ai muốn xin nghỉ thai sản nên báo cho quản lý trực tiếp biết kế hoạch của mình trước ít nhất một tháng."
  },
  {
    "id": "toice2_125",
    "num": 125,
    "source": "ToIce 2",
    "category": "Từ vựng (Vocabulary)",
    "question": "An independent investigator ------- a report on the company's financial operations which, for some unknown reason, was never released.",
    "options": {
      "A": "contracted",
      "B": "confirmed",
      "C": "compiled",
      "D": "converted"
    },
    "correctAnswer": "C",
    "explanation": "'compile a report' = biên soạn/tổng hợp báo cáo. 'compiled a report' = đã biên soạn một bản báo cáo.",
    "tip": "⚡ MẸO: Đi với 'a report' (báo cáo) -> Chọn 'compiled' (biên soạn báo cáo).",
    "keywords": [
      "compiled a report"
    ],
    "vietnameseMeaning": "Một điều tra viên độc lập đã biên soạn một báo cáo về các hoạt động tài chính của công ty mà không rõ vì lý do gì chưa từng được công bố."
  },
  {
    "id": "toice2_126",
    "num": 126,
    "source": "ToIce 2",
    "category": "Từ vựng (Vocabulary)",
    "question": "As you would expect at one of the world's most reputable hotels, the ------- is prompt, efficient, and discreet.",
    "options": {
      "A": "exertion",
      "B": "decision",
      "C": "challenge",
      "D": "service"
    },
    "correctAnswer": "D",
    "explanation": "Ngữ cảnh khách sạn uy tín (reputable hotels) có tính chất 'prompt, efficient' (nhanh chóng, hiệu quả, chu đáo) -> Danh từ thích hợp là 'service' (dịch vụ khách hàng).",
    "tip": "⚡ MẸO: Thấy 'hotel' (khách sạn) đi kèm các tính từ khen ngợi (prompt, efficient) -> Chọn 'service' (dịch vụ).",
    "keywords": [
      "hotels",
      "service is prompt"
    ],
    "vietnameseMeaning": "Đúng như bạn kỳ vọng tại một trong những khách sạn danh tiếng nhất thế giới, dịch vụ ở đây rất nhanh chóng, hiệu quả và kín đáo."
  },
  {
    "id": "toice2_127",
    "num": 127,
    "source": "ToIce 2",
    "category": "Từ loại (Word Form)",
    "question": "After a highly profitable first six months, the restaurant's profits for the second half of the year were a great -------.",
    "options": {
      "A": "disappoints",
      "B": "disappointed",
      "C": "disappointing",
      "D": "disappointment"
    },
    "correctAnswer": "D",
    "explanation": "Sau mạo từ 'a' và tính từ 'great' -> Cần một DANH TỪ. Hậu tố '-ment' là dấu hiệu của danh từ -> Chọn 'disappointment'.",
    "tip": "⚡ MẸO: Công thức: a / an + Tính từ (great) + DANH TỪ. Đuôi '-ment' là danh từ -> Chọn 'disappointment'.",
    "keywords": [
      "a great disappointment"
    ],
    "vietnameseMeaning": "Sau 6 tháng đầu năm có lãi cao, lợi nhuận của nhà hàng trong nửa cuối năm lại là một nỗi thất vọng lớn."
  },
  {
    "id": "toice2_128",
    "num": 128,
    "source": "ToIce 2",
    "category": "Mệnh đề & Đại từ (Clauses & Pronouns)",
    "question": "All drivers are required to maintain ------- logbooks accurately and to hand them in to the central office before leaving on Friday night.",
    "options": {
      "A": "its",
      "B": "his",
      "C": "our",
      "D": "their"
    },
    "correctAnswer": "D",
    "explanation": "Chủ ngữ là 'All drivers' (tất cả các tài xế - danh từ số nhiều) -> Tính từ sở hữu tương ứng phải là 'their' (của họ).",
    "tip": "⚡ MẸO: Chủ ngữ là 'All + Danh từ số nhiều' (All drivers) -> Tính từ sở hữu chắc chắn là 'their' (của họ).",
    "keywords": [
      "All drivers",
      "their logbooks"
    ],
    "vietnameseMeaning": "Tất cả tài xế được yêu cầu phải ghi chép nhật ký hành trình chính xác và nộp về văn phòng trung tâm trước khi ra về vào tối thứ Sáu."
  },
  {
    "id": "toice2_129",
    "num": 129,
    "source": "ToIce 2",
    "category": "Từ loại (Word Form)",
    "question": "It is true that the number of traffic accidents involving cyclists has increased ------- over the last 10 years.",
    "options": {
      "A": "meagerly",
      "B": "fundamentally",
      "C": "significantly",
      "D": "adequately"
    },
    "correctAnswer": "C",
    "explanation": "Động từ 'increased' (tăng) cần một trạng từ chỉ mức độ bổ nghĩa: 'increased significantly' = tăng đáng kể / tăng mạnh.",
    "tip": "⚡ MẸO: Thấy động từ tăng/giảm (increase, decrease, drop, rise) -> Chọn trạng từ 'significantly / dramatically / sharply'.",
    "keywords": [
      "increased significantly"
    ],
    "vietnameseMeaning": "Đúng là số lượng vụ tai nạn giao thông liên quan đến người đi xe đạp đã tăng lên đáng kể trong 10 năm qua."
  },
  {
    "id": "toice2_130",
    "num": 130,
    "source": "ToIce 2",
    "category": "Từ loại (Word Form)",
    "question": "The Department of Social Welfare's report this year indicated that it is focusing ------- on the homeless and long-term unemployed.",
    "options": {
      "A": "distinctly",
      "B": "individually",
      "C": "exceptionally",
      "D": "particularly"
    },
    "correctAnswer": "D",
    "explanation": "Cụm 'focusing particularly on...' = tập trung đặc biệt vào một nhóm đối tượng cụ thể.",
    "tip": "⚡ MẸO: Thấy 'focusing ... on' -> Chọn 'particularly' (tập trung đặc biệt vào...).",
    "keywords": [
      "focusing particularly on"
    ],
    "vietnameseMeaning": "Báo cáo năm nay của Bộ Phúc lợi Xã hội chỉ ra rằng họ đang tập trung đặc biệt vào người vô gia cư và người thất nghiệp dài hạn."
  },
  {
    "id": "toice2_131",
    "num": 131,
    "source": "ToIce 2",
    "category": "Từ vựng (Vocabulary)",
    "question": "The upcoming convention invites ------- from anyone working or having research interests in the field.",
    "options": {
      "A": "contributions",
      "B": "solutions",
      "C": "additions",
      "D": "subscription"
    },
    "correctAnswer": "A",
    "explanation": "Hội nghị học thuật/chuyên môn (convention) kêu gọi 'contributions' (các bài tham luận/bài đóng góp) từ các nhà nghiên cứu.",
    "tip": "⚡ MẸO: Thấy 'convention / conference' (hội nghị) đi với 'invites' -> Chọn 'contributions' (kêu gọi bài đóng góp/tham luận).",
    "keywords": [
      "invites contributions"
    ],
    "vietnameseMeaning": "Hội nghị sắp tới mời gọi các bài đóng góp từ bất kỳ ai đang làm việc hoặc quan tâm nghiên cứu trong lĩnh vực này."
  },
  {
    "id": "toice2_132",
    "num": 132,
    "source": "ToIce 2",
    "category": "Liên từ (Conjunctions)",
    "question": "------- the recent sales campaign was not as successful as we had expected, our new range of goods has been well reviewed by consumer groups.",
    "options": {
      "A": "Instead of",
      "B": "Notwithstanding",
      "C": "Although",
      "D": "Whereas"
    },
    "correctAnswer": "C",
    "explanation": "Nối mệnh đề mang tính tương phản: 'Although + Clause' (Mặc dù...). 'Instead of' đi với danh từ/V-ing.",
    "tip": "⚡ MẸO: Đứng đầu câu trước 1 mệnh đề đầy đủ (S + V) mang ý tương phản 'mặc dù...' -> Chọn 'Although'.",
    "keywords": [
      "Although the sales campaign was not"
    ],
    "vietnameseMeaning": "Mặc dù chiến dịch bán hàng gần đây không thành công như mong đợi, dòng sản phẩm mới của chúng ta vẫn được các nhóm tiêu dùng đánh giá cao."
  },
  {
    "id": "toice2_133",
    "num": 133,
    "source": "ToIce 2",
    "category": "Từ loại (Word Form)",
    "question": "Although he did not perform ------- well as a student, he went on to become one of the most respected scholars in his field.",
    "options": {
      "A": "especially",
      "B": "sufficiently",
      "C": "desperately",
      "D": "excellently"
    },
    "correctAnswer": "B",
    "explanation": "Cụm 'perform sufficiently well' = thể hiện đủ tốt / đạt kết quả tương đối.",
    "tip": "⚡ MẸO: 'perform sufficiently well' = học tập/thể hiện đủ tốt. 'sufficiently' bổ nghĩa cho trạng từ 'well'.",
    "keywords": [
      "perform sufficiently well"
    ],
    "vietnameseMeaning": "Mặc dù khi còn là sinh viên anh ấy không học tập quá xuất sắc, anh vẫn trở thành một trong những học giả được kính trọng nhất."
  },
  {
    "id": "toice2_134",
    "num": 134,
    "source": "ToIce 2",
    "category": "Ngữ pháp & Thì (Grammar & Tenses)",
    "question": "The new head of marketing is already making his mark on the company even though he only ------- 6 weeks ago.",
    "options": {
      "A": "carried",
      "B": "elapsed",
      "C": "deliberated",
      "D": "arrived"
    },
    "correctAnswer": "D",
    "explanation": "Có mốc thời gian rõ ràng trong quá khứ '6 weeks ago' (cách đây 6 tuần) -> Chia thì Quá khứ đơn: 'arrived' (mới đến công ty nhận việc).",
    "tip": "⚡ MẸO: Thấy '... ago' -> Dấu hiệu thì QUÁ KHỨ ĐƠN (V2/V-ed) -> Chọn ngay 'arrived'.",
    "keywords": [
      "arrived 6 weeks ago"
    ],
    "vietnameseMeaning": "Trưởng phòng marketing mới đã tạo được dấu ấn lên công ty dù ông ấy mới chỉ gia nhập cách đây 6 tuần."
  },
  {
    "id": "toice2_135",
    "num": 135,
    "source": "ToIce 2",
    "category": "Từ loại (Word Form)",
    "question": "The giant pharmaceutical company insists that its new drug is ------- safe as long as it used under the supervision of a doctor.",
    "options": {
      "A": "perfect",
      "B": "perfection",
      "C": "perfectly",
      "D": "perfecting"
    },
    "correctAnswer": "C",
    "explanation": "Đứng trước tính từ 'safe' (an toàn) -> Cần một TRẠNG TỪ (Adv - đuôi ly) để bổ nghĩa: 'perfectly safe' = hoàn toàn an toàn.",
    "tip": "⚡ MẸO: Công thức: be + TRẠNG TỪ (-ly) + TÍNH TỪ. 'safe' là tính từ -> Phía trước chọn 'perfectly'.",
    "keywords": [
      "perfectly safe"
    ],
    "vietnameseMeaning": "Tập đoàn dược phẩm khổng lồ khẳng định rằng loại thuốc mới của họ hoàn toàn an toàn miễn là sử dụng dưới sự giám sát của bác sĩ."
  },
  {
    "id": "toice2_136",
    "num": 136,
    "source": "ToIce 2",
    "category": "Từ vựng (Vocabulary)",
    "question": "While we still take telephone calls, other ------- of correspondence are encouraged to avoid tying up telephone lines unnecessarily.",
    "options": {
      "A": "profiles",
      "B": "views",
      "C": "outlines",
      "D": "forms"
    },
    "correctAnswer": "D",
    "explanation": "Cụm danh từ: 'forms of correspondence' = các hình thức trao đổi/liên lạc thư từ.",
    "tip": "⚡ MẸO: Thấy '... of correspondence' (thư từ liên lạc) -> Chọn 'forms' -> 'forms of correspondence' (các hình thức liên lạc).",
    "keywords": [
      "forms of correspondence"
    ],
    "vietnameseMeaning": "Trong khi chúng tôi vẫn tiếp nhận các cuộc gọi, các hình thức liên lạc khác được khuyến khích để tránh làm nghẽn đường dây điện thoại."
  },
  {
    "id": "toice2_137",
    "num": 137,
    "source": "ToIce 2",
    "category": "Từ vựng (Vocabulary)",
    "question": "As of October 1, Carla Fishermen will ------- the company as its interface in all dealings with the local government.",
    "options": {
      "A": "accommodate",
      "B": "perform",
      "C": "attend",
      "D": "represent"
    },
    "correctAnswer": "D",
    "explanation": "'represent the company' = đại diện cho công ty làm việc với chính quyền địa phương.",
    "tip": "⚡ MẸO: Đi với 'the company' làm cầu nối (interface) với cơ quan nhà nước -> Chọn 'represent' (đại diện cho công ty).",
    "keywords": [
      "represent the company"
    ],
    "vietnameseMeaning": "Kể từ ngày 1 tháng 10, Carla Fishermen sẽ đại diện cho công ty làm đầu mối trong mọi giao dịch với chính quyền địa phương."
  },
  {
    "id": "toice2_138",
    "num": 138,
    "source": "ToIce 2",
    "category": "Từ loại (Word Form)",
    "question": "------- in computer technology are allowing users to reach into any part of the world by just clicking a mouse.",
    "options": {
      "A": "advance",
      "B": "advancing",
      "C": "advancement",
      "D": "advances"
    },
    "correctAnswer": "D",
    "explanation": "Động từ theo sau là 'are allowing' (chia số nhiều) -> Chủ ngữ đầu câu PHẢI LÀ DANH TỪ SỐ NHIỀU -> Chọn 'advances' (những bước tiến bộ).",
    "tip": "⚡ MẸO: Động từ là 'are' (số nhiều) -> Chủ ngữ đầu câu phải có 's' số nhiều -> Chọn 'advances'.",
    "keywords": [
      "Advances in computer technology",
      "are allowing"
    ],
    "vietnameseMeaning": "Những tiến bộ trong công nghệ máy tính đang cho phép người dùng tiếp cận bất kỳ nơi nào trên thế giới chỉ với một cú nhấp chuột."
  },
  {
    "id": "toice2_139",
    "num": 139,
    "source": "ToIce 2",
    "category": "Từ loại (Word Form)",
    "question": "Ms. Julie Kennedy and her innovative marketing team have gained renown for creating ------- products for struggling companies.",
    "options": {
      "A": "promote",
      "B": "promotes",
      "C": "promotion",
      "D": "promotional"
    },
    "correctAnswer": "D",
    "explanation": "Đứng trước danh từ 'products' (sản phẩm) -> Cần một TÍNH TỪ bổ nghĩa. Đuôi '-al' là dấu hiệu nhận biết tính từ -> Chọn 'promotional' (sản phẩm quảng bá/quà tặng khuyến mãi).",
    "tip": "⚡ MẸO: Đứng trước Danh từ (products) cần Tính từ (Adj). Đuôi '-al' là tính từ -> Chọn 'promotional'.",
    "keywords": [
      "promotional products"
    ],
    "vietnameseMeaning": "Cô Julie Kennedy và đội ngũ marketing sáng tạo đã nổi tiếng nhờ tạo ra các sản phẩm quảng bá cho các công ty đang gặp khó khăn."
  },
  {
    "id": "toice2_140",
    "num": 140,
    "source": "ToIce 2",
    "category": "Giới từ & Cụm từ (Prepositions)",
    "question": "The Technical Department is currently formulating written guidelines ------- the use of our micro-publishing facilities.",
    "options": {
      "A": "in",
      "B": "for",
      "C": "at",
      "D": "with"
    },
    "correctAnswer": "B",
    "explanation": "Cụm danh từ: 'guidelines for something' = hướng dẫn cho việc gì / hướng dẫn sử dụng cái gì.",
    "tip": "⚡ MẸO: Thấy 'guidelines' (hướng dẫn) -> Đi với giới từ 'for' -> 'guidelines for the use' (hướng dẫn sử dụng).",
    "keywords": [
      "guidelines for"
    ],
    "vietnameseMeaning": "Phòng Kỹ thuật hiện đang xây dựng các hướng dẫn bằng văn bản cho việc sử dụng các thiết bị vi xuất bản của chúng tôi."
  },
  {
    "id": "toice2_147",
    "num": 147,
    "source": "Part 6 Đọc Điền",
    "category": "Từ vựng (Vocabulary)",
    "question": "[Thư nhắc nợ] I'm sorry to inform you that we are ------- your DF Banking credit card account.",
    "options": {
      "A": "canceling",
      "B": "suspending",
      "C": "opening",
      "D": "renewing"
    },
    "correctAnswer": "B",
    "explanation": "Câu sau nói tài khoản sẽ không được kích hoạt lại cho đến khi trả hết nợ (reactivated) -> Đây là hành động tạm khóa/đình chỉ thẻ tín dụng ('suspending').",
    "tip": "⚡ MẸO: Khách nợ tiền thẻ tín dụng, ngân hàng tạm ngừng hoạt động thẻ -> Chọn 'suspending' (đình chỉ/tạm khóa).",
    "keywords": [
      "suspending account",
      "debt"
    ],
    "vietnameseMeaning": "Tôi rất tiếc phải thông báo rằng chúng tôi đang tạm ngưng tài khoản thẻ tín dụng DF Banking của quý khách.",
    "isPassageQuestion": true,
    "passageId": "passage_df_banking",
    "passageInfo": {
      "id": "passage_df_banking",
      "title": "Thư Nhắc Nợ Thẻ Tín Dụng - DF Banking",
      "type": "Letter",
      "content": "Dianne Olsen\n152 Citizen Road, Manly, Sydney\n\nDear Ms. Olsen:\nI'm sorry to inform you that we are [147] you DF Banking credit card account. \n\nYour current balance is -$2,346.50, and we received only $1,100 by way of payment from you last month. Your account will not be reactivated until you completely clear this debt. In order to ensure we collect debts from delinquent account holders, we offer customers in your situation a number of repayment [148]. \n\nPlease contact us by email at inquiries@dfbanking.com or by phone at 0100-772-355 for more details. If you do not get in [149] with us, we will continue to charge your account at 12% interest. Moreover, should you fail to begin repaying your debt in a suitably swift manner, we will be forced to take control of your account.\n\nYours,\nFred Grover (Manager - Accounts Payable, DF Banking)",
      "vietnameseTranslation": "Kính gửi cô Olsen: Tôi rất tiếc phải thông báo rằng chúng tôi đang đình chỉ tài khoản thẻ tín dụng của cô. Số dư hiện tại là âm $2,346.50 và tháng trước cô chỉ thanh toán $1,100. Tài khoản sẽ không được mở lại cho đến khi trả hết nợ. Chúng tôi đưa ra một số phương án trả nợ. Nếu không liên lạc lại với chúng tôi, chúng tôi sẽ tiếp tục tính lãi suất 12%.",
      "questionIds": [
        "toice2_147",
        "toice2_148",
        "toice2_149"
      ],
      "clues": [
        {
          "questionNum": 147,
          "questionText": "I'm sorry to inform you that we are [147] you DF Banking credit card account.",
          "correctAnswer": "B",
          "correctChoiceText": "suspending",
          "clueLocation": "Đoạn 2, dòng 2",
          "clueQuote": "Your account will not be reactivated until you completely clear this debt.",
          "clueExplanation": "Câu sau nói tài khoản sẽ 'không được kích hoạt lại (not be reactivated)' cho đến khi trả hết nợ -> Tài khoản đang ở trạng thái bị tạm ngưng/đình chỉ.",
          "scanningTip": "Quét từ khóa 'reactivated' (mở lại) ở câu liền sau để biết trạng thái tài khoản đang bị đình chỉ (suspending)."
        },
        {
          "questionNum": 148,
          "questionText": "... we offer customers in your situation a number of repayment [148].",
          "correctAnswer": "B",
          "correctChoiceText": "options",
          "clueLocation": "Đoạn 2, dòng 3",
          "clueQuote": "we offer customers in your situation a number of repayment options.",
          "clueExplanation": "Sau cụm 'a number of' bắt buộc là Danh từ số nhiều (có s) -> Chọn 'options' (các phương án trả nợ).",
          "scanningTip": "Nhận diện ngay cấu trúc 'a number of + Danh từ số nhiều' -> Chọn options."
        },
        {
          "questionNum": 149,
          "questionText": "If you do not get in [149] with us, we will continue to charge your account...",
          "correctAnswer": "B",
          "correctChoiceText": "touch",
          "clueLocation": "Đoạn 3, dòng 2",
          "clueQuote": "If you do not get in touch with us, we will continue to charge your account at 12% interest.",
          "clueExplanation": "Thành ngữ cố định: 'get in touch with someone' = liên lạc, kết nối với ai.",
          "scanningTip": "Thấy 'get in ... with' -> 100% chọn 'touch' (get in touch with = liên hệ)."
        }
      ]
    },
    "clue": {
      "questionNum": 147,
      "questionText": "I'm sorry to inform you that we are [147] you DF Banking credit card account.",
      "correctAnswer": "B",
      "correctChoiceText": "suspending",
      "clueLocation": "Đoạn 2, dòng 2",
      "clueQuote": "Your account will not be reactivated until you completely clear this debt.",
      "clueExplanation": "Câu sau nói tài khoản sẽ 'không được kích hoạt lại (not be reactivated)' cho đến khi trả hết nợ -> Tài khoản đang ở trạng thái bị tạm ngưng/đình chỉ.",
      "scanningTip": "Quét từ khóa 'reactivated' (mở lại) ở câu liền sau để biết trạng thái tài khoản đang bị đình chỉ (suspending)."
    }
  },
  {
    "id": "toice2_148",
    "num": 148,
    "source": "Part 6 Đọc Điền",
    "category": "Từ loại (Word Form)",
    "question": "In order to ensure we collect debts, we offer customers in your situation a number of repayment -------.",
    "options": {
      "A": "opts",
      "B": "options",
      "C": "optional",
      "D": "optionally"
    },
    "correctAnswer": "B",
    "explanation": "Sau 'a number of repayment' cần một DANH TỪ SỐ NHIỀU -> 'repayment options' = các phương án/lựa chọn trả nợ.",
    "tip": "⚡ MẸO: Thấy 'a number of' -> Phía sau bắt buộc là DANH TỪ SỐ NHIỀU (có đuôi s) -> Chọn 'options'.",
    "keywords": [
      "repayment options",
      "a number of"
    ],
    "vietnameseMeaning": "Để đảm bảo thu hồi nợ, chúng tôi đưa ra cho quý khách một số phương án trả nợ.",
    "isPassageQuestion": true,
    "passageId": "passage_df_banking",
    "passageInfo": {
      "id": "passage_df_banking",
      "title": "Thư Nhắc Nợ Thẻ Tín Dụng - DF Banking",
      "type": "Letter",
      "content": "Dianne Olsen\n152 Citizen Road, Manly, Sydney\n\nDear Ms. Olsen:\nI'm sorry to inform you that we are [147] you DF Banking credit card account. \n\nYour current balance is -$2,346.50, and we received only $1,100 by way of payment from you last month. Your account will not be reactivated until you completely clear this debt. In order to ensure we collect debts from delinquent account holders, we offer customers in your situation a number of repayment [148]. \n\nPlease contact us by email at inquiries@dfbanking.com or by phone at 0100-772-355 for more details. If you do not get in [149] with us, we will continue to charge your account at 12% interest. Moreover, should you fail to begin repaying your debt in a suitably swift manner, we will be forced to take control of your account.\n\nYours,\nFred Grover (Manager - Accounts Payable, DF Banking)",
      "vietnameseTranslation": "Kính gửi cô Olsen: Tôi rất tiếc phải thông báo rằng chúng tôi đang đình chỉ tài khoản thẻ tín dụng của cô. Số dư hiện tại là âm $2,346.50 và tháng trước cô chỉ thanh toán $1,100. Tài khoản sẽ không được mở lại cho đến khi trả hết nợ. Chúng tôi đưa ra một số phương án trả nợ. Nếu không liên lạc lại với chúng tôi, chúng tôi sẽ tiếp tục tính lãi suất 12%.",
      "questionIds": [
        "toice2_147",
        "toice2_148",
        "toice2_149"
      ],
      "clues": [
        {
          "questionNum": 147,
          "questionText": "I'm sorry to inform you that we are [147] you DF Banking credit card account.",
          "correctAnswer": "B",
          "correctChoiceText": "suspending",
          "clueLocation": "Đoạn 2, dòng 2",
          "clueQuote": "Your account will not be reactivated until you completely clear this debt.",
          "clueExplanation": "Câu sau nói tài khoản sẽ 'không được kích hoạt lại (not be reactivated)' cho đến khi trả hết nợ -> Tài khoản đang ở trạng thái bị tạm ngưng/đình chỉ.",
          "scanningTip": "Quét từ khóa 'reactivated' (mở lại) ở câu liền sau để biết trạng thái tài khoản đang bị đình chỉ (suspending)."
        },
        {
          "questionNum": 148,
          "questionText": "... we offer customers in your situation a number of repayment [148].",
          "correctAnswer": "B",
          "correctChoiceText": "options",
          "clueLocation": "Đoạn 2, dòng 3",
          "clueQuote": "we offer customers in your situation a number of repayment options.",
          "clueExplanation": "Sau cụm 'a number of' bắt buộc là Danh từ số nhiều (có s) -> Chọn 'options' (các phương án trả nợ).",
          "scanningTip": "Nhận diện ngay cấu trúc 'a number of + Danh từ số nhiều' -> Chọn options."
        },
        {
          "questionNum": 149,
          "questionText": "If you do not get in [149] with us, we will continue to charge your account...",
          "correctAnswer": "B",
          "correctChoiceText": "touch",
          "clueLocation": "Đoạn 3, dòng 2",
          "clueQuote": "If you do not get in touch with us, we will continue to charge your account at 12% interest.",
          "clueExplanation": "Thành ngữ cố định: 'get in touch with someone' = liên lạc, kết nối với ai.",
          "scanningTip": "Thấy 'get in ... with' -> 100% chọn 'touch' (get in touch with = liên hệ)."
        }
      ]
    },
    "clue": {
      "questionNum": 148,
      "questionText": "... we offer customers in your situation a number of repayment [148].",
      "correctAnswer": "B",
      "correctChoiceText": "options",
      "clueLocation": "Đoạn 2, dòng 3",
      "clueQuote": "we offer customers in your situation a number of repayment options.",
      "clueExplanation": "Sau cụm 'a number of' bắt buộc là Danh từ số nhiều (có s) -> Chọn 'options' (các phương án trả nợ).",
      "scanningTip": "Nhận diện ngay cấu trúc 'a number of + Danh từ số nhiều' -> Chọn options."
    }
  },
  {
    "id": "toice2_149",
    "num": 149,
    "source": "Part 6 Đọc Điền",
    "category": "Giới từ & Cụm từ (Prepositions)",
    "question": "If you do not get in ------- with us, we will continue to charge your account at 12% interest.",
    "options": {
      "A": "conduct",
      "B": "touch",
      "C": "connection",
      "D": "link"
    },
    "correctAnswer": "B",
    "explanation": "Cụm thành ngữ cố định siêu phổ biến: 'get in touch with someone' = liên lạc/kết nối với ai.",
    "tip": "⚡ MẸO: Thấy 'get in ... with' -> 100% chọn 'touch' -> 'get in touch with' (liên lạc với).",
    "keywords": [
      "get in touch with"
    ],
    "vietnameseMeaning": "Nếu bạn không liên lạc lại với chúng tôi, chúng tôi sẽ tiếp tục tính lãi suất 12% trên tài khoản của bạn.",
    "isPassageQuestion": true,
    "passageId": "passage_df_banking",
    "passageInfo": {
      "id": "passage_df_banking",
      "title": "Thư Nhắc Nợ Thẻ Tín Dụng - DF Banking",
      "type": "Letter",
      "content": "Dianne Olsen\n152 Citizen Road, Manly, Sydney\n\nDear Ms. Olsen:\nI'm sorry to inform you that we are [147] you DF Banking credit card account. \n\nYour current balance is -$2,346.50, and we received only $1,100 by way of payment from you last month. Your account will not be reactivated until you completely clear this debt. In order to ensure we collect debts from delinquent account holders, we offer customers in your situation a number of repayment [148]. \n\nPlease contact us by email at inquiries@dfbanking.com or by phone at 0100-772-355 for more details. If you do not get in [149] with us, we will continue to charge your account at 12% interest. Moreover, should you fail to begin repaying your debt in a suitably swift manner, we will be forced to take control of your account.\n\nYours,\nFred Grover (Manager - Accounts Payable, DF Banking)",
      "vietnameseTranslation": "Kính gửi cô Olsen: Tôi rất tiếc phải thông báo rằng chúng tôi đang đình chỉ tài khoản thẻ tín dụng của cô. Số dư hiện tại là âm $2,346.50 và tháng trước cô chỉ thanh toán $1,100. Tài khoản sẽ không được mở lại cho đến khi trả hết nợ. Chúng tôi đưa ra một số phương án trả nợ. Nếu không liên lạc lại với chúng tôi, chúng tôi sẽ tiếp tục tính lãi suất 12%.",
      "questionIds": [
        "toice2_147",
        "toice2_148",
        "toice2_149"
      ],
      "clues": [
        {
          "questionNum": 147,
          "questionText": "I'm sorry to inform you that we are [147] you DF Banking credit card account.",
          "correctAnswer": "B",
          "correctChoiceText": "suspending",
          "clueLocation": "Đoạn 2, dòng 2",
          "clueQuote": "Your account will not be reactivated until you completely clear this debt.",
          "clueExplanation": "Câu sau nói tài khoản sẽ 'không được kích hoạt lại (not be reactivated)' cho đến khi trả hết nợ -> Tài khoản đang ở trạng thái bị tạm ngưng/đình chỉ.",
          "scanningTip": "Quét từ khóa 'reactivated' (mở lại) ở câu liền sau để biết trạng thái tài khoản đang bị đình chỉ (suspending)."
        },
        {
          "questionNum": 148,
          "questionText": "... we offer customers in your situation a number of repayment [148].",
          "correctAnswer": "B",
          "correctChoiceText": "options",
          "clueLocation": "Đoạn 2, dòng 3",
          "clueQuote": "we offer customers in your situation a number of repayment options.",
          "clueExplanation": "Sau cụm 'a number of' bắt buộc là Danh từ số nhiều (có s) -> Chọn 'options' (các phương án trả nợ).",
          "scanningTip": "Nhận diện ngay cấu trúc 'a number of + Danh từ số nhiều' -> Chọn options."
        },
        {
          "questionNum": 149,
          "questionText": "If you do not get in [149] with us, we will continue to charge your account...",
          "correctAnswer": "B",
          "correctChoiceText": "touch",
          "clueLocation": "Đoạn 3, dòng 2",
          "clueQuote": "If you do not get in touch with us, we will continue to charge your account at 12% interest.",
          "clueExplanation": "Thành ngữ cố định: 'get in touch with someone' = liên lạc, kết nối với ai.",
          "scanningTip": "Thấy 'get in ... with' -> 100% chọn 'touch' (get in touch with = liên hệ)."
        }
      ]
    },
    "clue": {
      "questionNum": 149,
      "questionText": "If you do not get in [149] with us, we will continue to charge your account...",
      "correctAnswer": "B",
      "correctChoiceText": "touch",
      "clueLocation": "Đoạn 3, dòng 2",
      "clueQuote": "If you do not get in touch with us, we will continue to charge your account at 12% interest.",
      "clueExplanation": "Thành ngữ cố định: 'get in touch with someone' = liên lạc, kết nối với ai.",
      "scanningTip": "Thấy 'get in ... with' -> 100% chọn 'touch' (get in touch with = liên hệ)."
    }
  },
  {
    "id": "test2_101",
    "num": 101,
    "source": "Test 2 Part 5",
    "category": "Từ vựng (Vocabulary)",
    "question": "The secretary filling in at the reception desk has been performing so well that management is considering offering her a ------- position.",
    "options": {
      "A": "durable",
      "B": "periodic",
      "C": "binding",
      "D": "permanent"
    },
    "correctAnswer": "D",
    "explanation": "'permanent position' = công việc chính thức/dài hạn. Nhân viên thay thế làm tốt nên được đề nghị vào vị trí lâu dài.",
    "tip": "⚡ MẸO: Thấy 'offering her a ... position' -> Chọn 'permanent' (vị trí làm việc chính thức).",
    "keywords": [
      "permanent position"
    ],
    "vietnameseMeaning": "Cô thư ký làm thay ở bàn lễ tân làm việc rất tốt nên ban quản lý đang cân nhắc trao cho cô vị trí chính thức."
  },
  {
    "id": "test2_102",
    "num": 102,
    "source": "Test 2 Part 5",
    "category": "Giới từ & Cụm từ (Prepositions)",
    "question": "The sales manager often takes the employees in his team out to dinner ------- his own expense.",
    "options": {
      "A": "at",
      "B": "by",
      "C": "from",
      "D": "with"
    },
    "correctAnswer": "A",
    "explanation": "Thành ngữ cố định: 'at one's own expense' = bằng tiền tự túc của ai / tự bỏ tiền túi ra.",
    "tip": "⚡ MẸO: Thấy '... one's own expense' -> Luôn chọn giới từ 'at' -> 'at his own expense' (tự bỏ tiền túi).",
    "keywords": [
      "at his own expense"
    ],
    "vietnameseMeaning": "Trưởng phòng kinh doanh thường dẫn nhân viên trong nhóm đi ăn tối bằng chính tiền túi của mình."
  },
  {
    "id": "test2_103",
    "num": 103,
    "source": "Test 2 Part 5",
    "category": "Ngữ pháp & Thì (Grammar & Tenses)",
    "question": "There ------- some speculation among reporters that Governor Angela Gray may not show up at her weekly press briefing tomorrow.",
    "options": {
      "A": "is",
      "B": "to be",
      "C": "are",
      "D": "being"
    },
    "correctAnswer": "A",
    "explanation": "Chủ ngữ thật sau 'There' là 'some speculation' (sự đồn đoán) - đây là DANH TỪ KHÔNG ĐẾM ĐƯỢC -> Động từ to be chia số ít ở thì hiện tại là 'is'.",
    "tip": "⚡ MẸO: 'speculation' là danh từ không đếm được (không có s) -> Đi với 'There is' (số ít).",
    "keywords": [
      "There is some speculation"
    ],
    "vietnameseMeaning": "Có một số đồn đoán giữa các phóng viên rằng Thống đốc Angela Gray có thể sẽ không xuất hiện tại buổi họp báo hàng tuần vào ngày mai."
  },
  {
    "id": "test2_104",
    "num": 104,
    "source": "Test 2 Part 5",
    "category": "Giới từ & Cụm từ (Prepositions)",
    "question": "According to the sign posted in front of the main office, the repair center is now ------- new management.",
    "options": {
      "A": "over",
      "B": "around",
      "C": "between",
      "D": "under"
    },
    "correctAnswer": "D",
    "explanation": "Cụm thành ngữ cố định trong kinh doanh: 'under new management' = dưới sự điều hành/quản lý mới.",
    "tip": "⚡ MẸO: Thấy '... new management' -> 100% chọn 'under' -> 'under new management'.",
    "keywords": [
      "under new management"
    ],
    "vietnameseMeaning": "Theo biển báo trước văn phòng chính, trung tâm sửa chữa hiện đang dưới sự điều hành mới."
  },
  {
    "id": "test2_105",
    "num": 105,
    "source": "Test 2 Part 5",
    "category": "Từ vựng (Vocabulary)",
    "question": "Participants are welcome to ------- important questions with the seminar leader at any time during the presentation.",
    "options": {
      "A": "make",
      "B": "raise",
      "C": "give",
      "D": "reach"
    },
    "correctAnswer": "B",
    "explanation": "Cụm từ phối hợp (collocation): 'raise questions' = nêu ra câu hỏi, đặt câu hỏi.",
    "tip": "⚡ MẸO: Đi với 'questions' (câu hỏi) -> Chọn 'raise' (raise questions = nêu câu hỏi). Không dùng 'make questions'.",
    "keywords": [
      "raise questions"
    ],
    "vietnameseMeaning": "Người tham gia được hoan nghênh nêu các câu hỏi quan trọng với người chủ trì hội thảo bất cứ lúc nào trong buổi thuyết trình."
  },
  {
    "id": "test2_106",
    "num": 106,
    "source": "Test 2 Part 5",
    "category": "Ngữ pháp & Thì (Grammar & Tenses)",
    "question": "The new advertising campaign has already proven to be much more effective ------- the previous one.",
    "options": {
      "A": "than",
      "B": "as",
      "C": "so",
      "D": "for"
    },
    "correctAnswer": "A",
    "explanation": "Cấu trúc so sánh hơn: 'more + Adj + THAN'. Phía trước có 'more effective' -> Phía sau phải là 'than'.",
    "tip": "⚡ MẸO: Thấy 'more' ở vế trước -> Nhắm mắt chọn ngay 'than' (so sánh hơn: more effective than).",
    "keywords": [
      "more effective than"
    ],
    "vietnameseMeaning": "Chiến dịch quảng cáo mới đã chứng tỏ hiệu quả hơn nhiều so với chiến dịch trước đó."
  },
  {
    "id": "test2_107",
    "num": 107,
    "source": "Test 2 Part 5",
    "category": "Giới từ & Cụm từ (Prepositions)",
    "question": "Entries for the Science Fair competition should be sent to the Lacefield Community Center ------- June 17 at the latest.",
    "options": {
      "A": "until",
      "B": "by",
      "C": "at",
      "D": "for"
    },
    "correctAnswer": "B",
    "explanation": "'by + mốc thời gian (at the latest)' = trước/muộn nhất vào thời điểm nào (hạn chót).",
    "tip": "⚡ MẸO: Thấy 'at the latest' (muộn nhất) đi kèm ngày tháng -> Luôn chọn 'by' (by + thời gian + at the latest).",
    "keywords": [
      "by June 17 at the latest"
    ],
    "vietnameseMeaning": "Bài dự thi Hội chợ Khoa học phải được gửi về Trung tâm Cộng đồng Lacefield muộn nhất trước ngày 17 tháng Sáu."
  },
  {
    "id": "test2_108",
    "num": 108,
    "source": "Test 2 Part 5",
    "category": "Từ vựng (Vocabulary)",
    "question": "Health inspections are conducted ------- at restaurants throughout the province for the purpose of maintaining high standards of hygiene.",
    "options": {
      "A": "extremely",
      "B": "marginally",
      "C": "overly",
      "D": "routinely"
    },
    "correctAnswer": "D",
    "explanation": "'routinely' = theo lịch định kỳ, thường xuyên. Các đợt kiểm tra vệ sinh được tiến hành định kỳ.",
    "tip": "⚡ MẸO: Thấy 'inspections are conducted' (kiểm tra được tiến hành) -> Chọn 'routinely' (tiến hành định kỳ).",
    "keywords": [
      "inspections are conducted routinely"
    ],
    "vietnameseMeaning": "Các đợt thanh tra y tế được tiến hành định kỳ tại các nhà hàng trên toàn tỉnh để duy trì tiêu chuẩn vệ sinh cao."
  },
  {
    "id": "test2_109",
    "num": 109,
    "source": "Test 2 Part 5",
    "category": "Ngữ pháp & Thì (Grammar & Tenses)",
    "question": "Once ------- into the program, interns will go through an orientation course designed to familiarize them with the division's procedures.",
    "options": {
      "A": "accept",
      "B": "accepting",
      "C": "accepted",
      "D": "acceptance"
    },
    "correctAnswer": "C",
    "explanation": "Rút gọn mệnh đề đồng chủ ngữ ở thể bị động sau liên từ 'Once': 'Once (they are) accepted into...' = Một khi được nhận vào chương trình.",
    "tip": "⚡ MẸO: 'Once + V-ed / V3' chỉ hành động được tiếp nhận/chấp nhận (bị động: Once accepted into = khi được nhận vào).",
    "keywords": [
      "Once accepted into"
    ],
    "vietnameseMeaning": "Một khi được nhận vào chương trình, các thực tập sinh sẽ trải qua một khóa định hướng để làm quen với các quy trình của bộ phận."
  },
  {
    "id": "test2_110",
    "num": 110,
    "source": "Test 2 Part 5",
    "category": "Mệnh đề & Đại từ (Clauses & Pronouns)",
    "question": "------- wanting to apply for maternity leave should let their immediate supervisor know about their plans at least one month in advance.",
    "options": {
      "A": "Them",
      "B": "That",
      "C": "One",
      "D": "Those"
    },
    "correctAnswer": "D",
    "explanation": "'Those wanting to...' = Những ai muốn... Đại từ 'Those' đứng đầu làm chủ ngữ chỉ người số nhiều.",
    "tip": "⚡ MẸO: Đứng đầu câu trước 'wanting / who wish' + phía sau có 'their' -> Chọn 'Those' (Những ai...).",
    "keywords": [
      "Those wanting to",
      "their plans"
    ],
    "vietnameseMeaning": "Những ai muốn xin nghỉ thai sản nên thông báo cho quản lý trực tiếp trước ít nhất một tháng."
  },
  {
    "id": "test2_111",
    "num": 111,
    "source": "Test 2 Part 5",
    "category": "Từ vựng (Vocabulary)",
    "question": "By clicking on the web-link below, you will ------- your customer account with Johnson's Online Shopping.",
    "options": {
      "A": "energize",
      "B": "activate",
      "C": "stimulate",
      "D": "prompt"
    },
    "correctAnswer": "B",
    "explanation": "'activate your account' = kích hoạt tài khoản của bạn. Nhấp vào đường link để kích hoạt.",
    "tip": "⚡ MẸO: Thấy 'account' (tài khoản) đi với 'click on the link' -> Chọn ngay 'activate' (kích hoạt tài khoản).",
    "keywords": [
      "activate your customer account"
    ],
    "vietnameseMeaning": "Bằng cách nhấp vào liên kết bên dưới, bạn sẽ kích hoạt tài khoản khách hàng của mình tại Johnson's Online Shopping."
  },
  {
    "id": "test2_112",
    "num": 112,
    "source": "Test 2 Part 5",
    "category": "Ngữ pháp & Thì (Grammar & Tenses)",
    "question": "Since June 2006, the customer relations department ------- over 50 Complaints from clients.",
    "options": {
      "A": "has received",
      "B": "was received",
      "C": "receive",
      "D": "will have received"
    },
    "correctAnswer": "A",
    "explanation": "Có 'Since + mốc thời gian quá khứ' (Since June 2006) -> Dấu hiệu thì HIỆN TẠI HOÀN THÀNH (have/has + V3/ed) ở thể chủ động: 'has received' (đã tiếp nhận).",
    "tip": "⚡ MẸO: Thấy 'Since + năm/tháng' -> Chia thì HIỆN TẠI HOÀN THÀNH (has/have + V3/ed). Bộ phận chủ động nhận phàn nàn nên chọn 'has received'.",
    "keywords": [
      "Since June 2006",
      "has received"
    ],
    "vietnameseMeaning": "Kể từ tháng 6 năm 2006, bộ phận quan hệ khách hàng đã tiếp nhận hơn 50 lời khiếu nại từ khách hàng."
  },
  {
    "id": "test2_113",
    "num": 113,
    "source": "Test 2 Part 5",
    "category": "Ngữ pháp & Thì (Grammar & Tenses)",
    "question": "King's Technical College, which was founded in 1611, is the ------- educational institution in the region.",
    "options": {
      "A": "old",
      "B": "older",
      "C": "oldest",
      "D": "elderly"
    },
    "correctAnswer": "C",
    "explanation": "Cấu trúc so sánh nhất: 'the + tính từ ngắn-est' -> 'the oldest' (lâu đời nhất).",
    "tip": "⚡ MẸO: Thấy 'the' trước chỗ trống và danh từ sau đó -> Chọn so sánh nhất có đuôi '-est' ('the oldest').",
    "keywords": [
      "the oldest educational institution"
    ],
    "vietnameseMeaning": "Trường Cao đẳng Kỹ thuật King's, được thành lập năm 1611, là cơ sở giáo dục lâu đời nhất trong vùng."
  },
  {
    "id": "test2_114",
    "num": 114,
    "source": "Test 2 Part 5",
    "category": "Từ vựng (Vocabulary)",
    "question": "Recent statistics indicate that young people are becoming more interested in ------- a career in the hospitality industry.",
    "options": {
      "A": "attracting",
      "B": "facilitating",
      "C": "pursuing",
      "D": "organizing"
    },
    "correctAnswer": "C",
    "explanation": "Cụm từ cố định: 'pursue a career' = theo đuổi sự nghiệp / con đường sự nghiệp.",
    "tip": "⚡ MẸO: Đi với 'a career' (sự nghiệp) -> Nhắm ngay động từ 'pursue' -> 'pursue a career' (theo đuổi sự nghiệp).",
    "keywords": [
      "pursuing a career"
    ],
    "vietnameseMeaning": "Các số liệu thống kê gần đây chỉ ra rằng giới trẻ đang ngày càng quan tâm hơn đến việc theo đuổi sự nghiệp trong ngành khách sạn - nhà hàng."
  },
  {
    "id": "test2_115",
    "num": 115,
    "source": "Test 2 Part 5",
    "category": "Giới từ & Cụm từ (Prepositions)",
    "question": "There will be several breaks ------- the day in order to give conference attendees time to get refreshments and use the bathroom facilities.",
    "options": {
      "A": "throughout",
      "B": "under",
      "C": "as",
      "D": "among"
    },
    "correctAnswer": "A",
    "explanation": "'throughout the day' = rải rác trong suốt cả ngày.",
    "tip": "⚡ MẸO: Thấy '... the day / the year' chỉ khoảng thời gian -> Chọn 'throughout' (trong suốt cả ngày/năm).",
    "keywords": [
      "throughout the day"
    ],
    "vietnameseMeaning": "Sẽ có một số khoảng nghỉ trong suốt cả ngày để người tham dự hội nghị có thời gian ăn nhẹ và sử dụng phòng vệ sinh."
  },
  {
    "id": "test2_116",
    "num": 116,
    "source": "Test 2 Part 5",
    "category": "Mệnh đề & Đại từ (Clauses & Pronouns)",
    "question": "The management at Gina's Tropical resort would like to remind guests to search ------- room for personal belongings before checking out at reception.",
    "options": {
      "A": "they",
      "B": "their",
      "C": "theirs",
      "D": "them"
    },
    "correctAnswer": "B",
    "explanation": "Chỗ trống đứng trước danh từ 'room' (phòng) -> Cần một TÍNH TỪ SỞ HỮU để chỉ phòng của khách (guests - số nhiều) -> Chọn 'their'.",
    "tip": "⚡ MẸO: Đứng ngay trước Danh từ (room) -> Chọn TÍNH TỪ SỞ HỮU ('their').",
    "keywords": [
      "remind guests",
      "their room"
    ],
    "vietnameseMeaning": "Ban quản lý khu nghỉ dưỡng Gina's Tropical muốn nhắc nhở du khách kiểm tra phòng của họ để tránh để quên đồ dùng cá nhân trước khi trả phòng."
  },
  {
    "id": "test2_117",
    "num": 117,
    "source": "Test 2 Part 5",
    "category": "Ngữ pháp & Thì (Grammar & Tenses)",
    "question": "------- merchandise has been packaged and is now ready to be transported from the warehouse to the retail outlets.",
    "options": {
      "A": "A",
      "B": "Each",
      "C": "Some",
      "D": "These"
    },
    "correctAnswer": "C",
    "explanation": "'merchandise' (hàng hóa) là DANH TỪ KHÔNG ĐẾM ĐƯỢC. Không dùng 'A/Each' (dùng cho N số ít đếm được), không dùng 'These' (dùng cho N số nhiều). Chỉ có 'Some' đi được với danh từ không đếm được.",
    "tip": "⚡ MẸO: 'merchandise' là danh từ KHÔNG ĐẾM ĐƯỢC -> Chỉ có 'Some' là kết hợp được ('Some merchandise').",
    "keywords": [
      "Some merchandise has been"
    ],
    "vietnameseMeaning": "Một số hàng hóa đã được đóng gói và sẵn sàng được vận chuyển từ nhà kho tới các điểm bán lẻ."
  },
  {
    "id": "test2_118",
    "num": 118,
    "source": "Test 2 Part 5",
    "category": "Từ loại (Word Form)",
    "question": "To gain access to confidential company documents, employees require ------- from the operations manager.",
    "options": {
      "A": "clear",
      "B": "clarify",
      "C": "clarity",
      "D": "clearance"
    },
    "correctAnswer": "D",
    "explanation": "Sau ngoại động từ 'require' cần một Tân ngữ (DANH TỪ). 'security/official clearance' = sự cấp phép / cho phép tiếp cận thông tin mật.",
    "tip": "⚡ MẸO: Sau động từ 'require' cần Danh từ. Thấy tài liệu mật (confidential) -> Chọn 'clearance' (sự cấp phép).",
    "keywords": [
      "require clearance"
    ],
    "vietnameseMeaning": "Để tiếp cận các tài liệu mật của công ty, nhân viên cần có sự cấp phép từ giám đốc vận hành."
  },
  {
    "id": "test2_119",
    "num": 119,
    "source": "Test 2 Part 5",
    "category": "Từ vựng (Vocabulary)",
    "question": "In order to ------- a yearly growth rate of six percent, we'll need to expand our product line while increasing the size of our investment.",
    "options": {
      "A": "remain",
      "B": "organize",
      "C": "sustain",
      "D": "aim"
    },
    "correctAnswer": "C",
    "explanation": "'sustain a growth rate' = duy trì tốc độ tăng trưởng kinh tế. 'sustain' = duy trì ổn định.",
    "tip": "⚡ MẸO: Thấy '... a growth rate' (tốc độ tăng trưởng) -> Chọn động từ 'sustain' (duy trì mức tăng trưởng).",
    "keywords": [
      "sustain a yearly growth rate"
    ],
    "vietnameseMeaning": "Để duy trì tốc độ tăng trưởng 6% hàng năm, chúng ta sẽ cần mở rộng dòng sản phẩm đồng thời gia tăng quy mô đầu tư."
  },
  {
    "id": "test2_120",
    "num": 120,
    "source": "Test 2 Part 5",
    "category": "Từ vựng (Vocabulary)",
    "question": "There is a ------- in the agreement for either side to back out of the deal if certain terms are not fulfilled.",
    "options": {
      "A": "provision",
      "B": "projection",
      "C": "property",
      "D": "profession"
    },
    "correctAnswer": "A",
    "explanation": "'provision in the agreement' = điều khoản quy định trong hợp đồng.",
    "tip": "⚡ MẸO: Thấy 'in the agreement / contract' (trong hợp đồng) -> Chọn 'provision' (điều khoản).",
    "keywords": [
      "provision in the agreement"
    ],
    "vietnameseMeaning": "Có một điều khoản trong hợp đồng cho phép một trong hai bên rút lui nếu một số điều kiện không được đáp ứng."
  },
  {
    "id": "test2_121",
    "num": 121,
    "source": "Test 2 Part 5",
    "category": "Giới từ & Cụm từ (Prepositions)",
    "question": "Next year, our agent in Shanghai will be in charge ------- distributing our products throughout China.",
    "options": {
      "A": "for",
      "B": "by",
      "C": "of",
      "D": "from"
    },
    "correctAnswer": "C",
    "explanation": "Cụm giới từ cố định: 'be in charge of + V-ing/Noun' = phụ trách / chịu trách nhiệm làm việc gì.",
    "tip": "⚡ MẸO: Thấy 'in charge ...' -> 100% chọn 'of' -> 'in charge of' (phụ trách).",
    "keywords": [
      "in charge of"
    ],
    "vietnameseMeaning": "Năm tới, đại lý của chúng ta tại Thượng Hải sẽ phụ trách việc phân phối sản phẩm trên toàn Trung Quốc."
  },
  {
    "id": "test2_122",
    "num": 122,
    "source": "Test 2 Part 5",
    "category": "Ngữ pháp & Thì (Grammar & Tenses)",
    "question": "Mr. Burroughs ------- in the human resources division for 25 years by the time he leaves the company next month.",
    "options": {
      "A": "has worked",
      "B": "had worked",
      "C": "will have worked",
      "D": "would work"
    },
    "correctAnswer": "C",
    "explanation": "Cấu trúc: 'by the time + S + V(hiện tại đơn - leaves)...' -> Vế chính chia THÌ TƯƠNG LAI HOÀN THÀNH ('will have + V3/ed') để diễn tả hành động sẽ hoàn tất tính đến một thời điểm trong tương lai.",
    "tip": "⚡ MẸO: 'by the time' + thì Hiện tại (leaves next month) -> Vế kia chọn TƯƠNG LAI HOÀN THÀNH ('will have worked').",
    "keywords": [
      "by the time",
      "will have worked"
    ],
    "vietnameseMeaning": "Ông Burroughs sẽ làm việc tại phòng nhân sự được 25 năm tính đến lúc ông rời công ty vào tháng tới."
  },
  {
    "id": "test2_123",
    "num": 123,
    "source": "Test 2 Part 5",
    "category": "Từ vựng (Vocabulary)",
    "question": "Many candidates for Duostand Co. were pleased to see the application process ------- on the company website.",
    "options": {
      "A": "simplified",
      "B": "reimbursed",
      "C": "dominated",
      "D": "obtained"
    },
    "correctAnswer": "A",
    "explanation": "Cấu trúc: 'see something + V3/ed' (thấy cái gì được làm gì). Ứng viên hài lòng vì quy trình nộp đơn được 'đơn giản hóa' ('simplified').",
    "tip": "⚡ MẸO: Thấy 'application process' (quy trình nộp hồ sơ) làm cho ứng viên hài lòng (pleased) -> Chọn 'simplified' (được đơn giản hóa).",
    "keywords": [
      "application process simplified"
    ],
    "vietnameseMeaning": "Nhiều ứng viên của công ty Duostand rất vui mừng khi thấy quy trình nộp hồ sơ đã được đơn giản hóa trên trang web công ty."
  },
  {
    "id": "test2_124",
    "num": 124,
    "source": "Test 2 Part 5",
    "category": "Liên từ (Conjunctions)",
    "question": "We can either drive to the community center to attend the lecture ------- listen to it on the Internet.",
    "options": {
      "A": "or",
      "B": "and",
      "C": "nor",
      "D": "but"
    },
    "correctAnswer": "A",
    "explanation": "Cặp liên từ tương quan kinh điển: 'either ... OR ...' (hoặc cái này hoặc cái kia).",
    "tip": "⚡ MẸO: Thấy 'either' ở phía trước -> Chọn ngay 'or' (either ... or ...).",
    "keywords": [
      "either ... or"
    ],
    "vietnameseMeaning": "Chúng ta có thể lái xe đến trung tâm cộng đồng để dự buổi diễn thuyết hoặc nghe trực tuyến qua mạng."
  },
  {
    "id": "test2_125",
    "num": 125,
    "source": "Test 2 Part 5",
    "category": "Ngữ pháp & Thì (Grammar & Tenses)",
    "question": "In next month's issue, we ------- coupons offering a steep discount for new subscriptions only.",
    "options": {
      "A": "were inserting",
      "B": "have been inserted",
      "C": "had inserted",
      "D": "will be inserting"
    },
    "correctAnswer": "D",
    "explanation": "Có mốc thời gian tương lai: 'In next month's issue' (Trong ấn phẩm tháng tới) -> Chia thì tương lai tiếp diễn: 'will be inserting'.",
    "tip": "⚡ MẸO: Thấy 'next month' (tháng tới) -> Chọn đáp án có thì TƯƠNG LAI ('will be inserting').",
    "keywords": [
      "In next month's issue",
      "will be inserting"
    ],
    "vietnameseMeaning": "Trong số phát hành tháng tới, chúng tôi sẽ đính kèm các phiếu giảm giá sâu chỉ dành cho độc giả đăng ký mới."
  },
  {
    "id": "test2_126",
    "num": 126,
    "source": "Test 2 Part 5",
    "category": "Từ vựng (Vocabulary)",
    "question": "Our legal advisor suggested that it would be in our best interests to ------- the lawsuit as quickly as possible.",
    "options": {
      "A": "confess",
      "B": "settle",
      "C": "witness",
      "D": "shield"
    },
    "correctAnswer": "B",
    "explanation": "'settle the lawsuit' = dàn xếp/hòa giải vụ kiện ngoài tòa.",
    "tip": "⚡ MẸO: Đi với 'lawsuit' (vụ kiện) trong kinh doanh -> Luôn chọn 'settle' -> 'settle the lawsuit' (dàn xếp vụ kiện).",
    "keywords": [
      "settle the lawsuit"
    ],
    "vietnameseMeaning": "Cố vấn pháp lý của chúng tôi đề xuất rằng việc dàn xếp vụ kiện càng sớm càng tốt sẽ là phương án có lợi nhất cho chúng ta."
  },
  {
    "id": "test2_127",
    "num": 127,
    "source": "Test 2 Part 5",
    "category": "Từ vựng (Vocabulary)",
    "question": "One of our most ------- workers, Charles always completes his tasks ahead of team schedule.",
    "options": {
      "A": "efficient",
      "B": "symbolic",
      "C": "useless",
      "D": "repeated"
    },
    "correctAnswer": "A",
    "explanation": "Vế sau giải thích 'always completes tasks ahead of schedule' (luôn hoàn thành trước hạn) -> Phản ánh người làm việc năng suất, 'efficient' (hiệu quả).",
    "tip": "⚡ MẸO: Luôn hoàn thành trước hạn (ahead of schedule) -> Người nhân viên 'efficient' (làm việc hiệu quả).",
    "keywords": [
      "most efficient workers",
      "ahead of schedule"
    ],
    "vietnameseMeaning": "Là một trong những nhân viên làm việc hiệu quả nhất của chúng tôi, Charles luôn hoàn thành nhiệm vụ trước thời hạn."
  },
  {
    "id": "test2_128",
    "num": 128,
    "source": "Test 2 Part 5",
    "category": "Từ vựng (Vocabulary)",
    "question": "After the earthquake, the building was ------- unsafe since its foundation was badly damaged.",
    "options": {
      "A": "maximized",
      "B": "erected",
      "C": "arranged",
      "D": "declared"
    },
    "correctAnswer": "D",
    "explanation": "'was declared unsafe' = bị chính quyền/chuyên gia tuyên bố là không an toàn.",
    "tip": "⚡ MẸO: Tòa nhà sau động đất bị tuyên bố là nguy hiểm -> 'was declared unsafe' (bị tuyên bố là không an toàn).",
    "keywords": [
      "declared unsafe"
    ],
    "vietnameseMeaning": "Sau trận động đất, tòa nhà đã bị tuyên bố là không an toàn vì nền móng của nó bị hư hại nặng nề."
  },
  {
    "id": "test2_129",
    "num": 129,
    "source": "Test 2 Part 5",
    "category": "Mệnh đề & Đại từ (Clauses & Pronouns)",
    "question": "The presenter showed a series of slides ------- detailed the results of her year-long study.",
    "options": {
      "A": "which",
      "B": "whose",
      "C": "whom",
      "D": "who"
    },
    "correctAnswer": "A",
    "explanation": "Đại từ quan hệ 'which' thay thế cho danh từ chỉ vật 'slides' và làm chủ ngữ cho động từ 'detailed'.",
    "tip": "⚡ MẸO: Đứng sau danh từ chỉ vật (slides) và trước động từ (detailed) -> Chọn 'which'.",
    "keywords": [
      "slides which detailed"
    ],
    "vietnameseMeaning": "Người thuyết trình đã trình chiếu một loạt các trang slide trình bày chi tiết kết quả nghiên cứu kéo dài một năm của cô ấy."
  },
  {
    "id": "test2_130",
    "num": 130,
    "source": "Test 2 Part 5",
    "category": "Từ vựng (Vocabulary)",
    "question": "An important ------- for this position is the ability to speak both Spanish and English.",
    "options": {
      "A": "notification",
      "B": "publication",
      "C": "qualification",
      "D": "proportion"
    },
    "correctAnswer": "C",
    "explanation": "'qualification for the position' = tiêu chuẩn, trình độ chuyên môn cho vị trí tuyển dụng (ở đây là khả năng song ngữ).",
    "tip": "⚡ MẸO: Thấy 'for this position is the ability to speak...' (tuyển dụng yêu cầu kỹ năng) -> Chọn 'qualification' (tiêu chuẩn/trình độ).",
    "keywords": [
      "important qualification for this position"
    ],
    "vietnameseMeaning": "Một tiêu chuẩn năng lực quan trọng cho vị trí này là khả năng nói được cả tiếng Tây Ban Nha và tiếng Anh."
  },
  {
    "id": "test2_131",
    "num": 131,
    "source": "Test 2 Part 5",
    "category": "Từ loại (Word Form)",
    "question": "The waitress said there weren't any tables open, but she would call my name once one became -------.",
    "options": {
      "A": "availability",
      "B": "availably",
      "C": "avail",
      "D": "available"
    },
    "correctAnswer": "D",
    "explanation": "Sau linking verb 'became' (trở nên) cần một TÍNH TỪ. 'available' = còn trống, có sẵn (bàn trống).",
    "tip": "⚡ MẸO: Sau động từ 'become / became' -> Chọn TÍNH TỪ ('available'). 'became available' = bàn trống chỗ.",
    "keywords": [
      "became available"
    ],
    "vietnameseMeaning": "Cô phục vụ nói chưa có bàn nào trống, nhưng cô sẽ gọi tên tôi ngay khi có một bàn sẵn sàng."
  },
  {
    "id": "test2_132",
    "num": 132,
    "source": "Test 2 Part 5",
    "category": "Từ vựng (Vocabulary)",
    "question": "Analysts regarded the ------- between the construction giants a win-win situation for both companies.",
    "options": {
      "A": "factor",
      "B": "management",
      "C": "authority",
      "D": "alliance"
    },
    "correctAnswer": "D",
    "explanation": "'alliance between...' = liên minh, sự liên kết hợp tác giữa các tập đoàn lớn.",
    "tip": "⚡ MẸO: Thấy '... between the giants' + 'win-win situation' (cả hai cùng có lợi) -> Chọn 'alliance' (liên minh/sự hợp tác).",
    "keywords": [
      "alliance between",
      "win-win situation"
    ],
    "vietnameseMeaning": "Các nhà phân tích đánh giá liên minh giữa các gã khổng lồ xây dựng là một thỏa thuận đôi bên cùng có lợi."
  },
  {
    "id": "test2_133",
    "num": 133,
    "source": "Test 2 Part 5",
    "category": "Giới từ & Cụm từ (Prepositions)",
    "question": "Actually, the Department of Transportation is responsible ------- approving roadwork permits in the county.",
    "options": {
      "A": "by",
      "B": "to",
      "C": "at",
      "D": "for"
    },
    "correctAnswer": "D",
    "explanation": "Cấu trúc kinh điển: 'be responsible FOR something / V-ing' = chịu trách nhiệm về việc gì.",
    "tip": "⚡ MẸO: Thấy 'responsible' -> 100% chọn 'for' -> 'responsible for' (chịu trách nhiệm về).",
    "keywords": [
      "responsible for"
    ],
    "vietnameseMeaning": "Trên thực tế, Sở Giao thông Vận tải chịu trách nhiệm phê duyệt giấy phép thi công đường bộ trong hạt."
  },
  {
    "id": "test2_134",
    "num": 134,
    "source": "Test 2 Part 5",
    "category": "Từ loại (Word Form)",
    "question": "Wedding cakes are the chef's -------, but he also creates wonderful Italian pasta dishes.",
    "options": {
      "A": "specialize",
      "B": "specialty",
      "C": "special",
      "D": "specialist"
    },
    "correctAnswer": "B",
    "explanation": "Sau sở hữu cách 'the chef's' cần một DANH TỪ. 'specialty' = món ăn đặc sản, món sở trường của đầu bếp.",
    "tip": "⚡ MẸO: Sau sở hữu cách 'the chef's' (của đầu bếp) nói về món ăn (wedding cakes) -> Chọn danh từ 'specialty' (món sở trường).",
    "keywords": [
      "the chef's specialty"
    ],
    "vietnameseMeaning": "Bánh cưới là món sở trường của bếp trưởng, nhưng ông cũng tạo ra những món mì Ý tuyệt vời."
  },
  {
    "id": "test2_135",
    "num": 135,
    "source": "Test 2 Part 5",
    "category": "Từ vựng (Vocabulary)",
    "question": "Once we receive verification that the shipment has been delivered, we will ------- the remainder of the unpaid bill.",
    "options": {
      "A": "suppose",
      "B": "remit",
      "C": "outsource",
      "D": "standardize"
    },
    "correctAnswer": "B",
    "explanation": "'remit the remainder of the bill' = chuyển khoản / thanh toán phần còn lại của hóa đơn.",
    "tip": "⚡ MẸO: Đi với 'unpaid bill' (hóa đơn chưa trả tiền) -> Chọn 'remit' (chuyển tiền/thanh toán hóa đơn).",
    "keywords": [
      "remit the remainder of the bill"
    ],
    "vietnameseMeaning": "Một khi chúng tôi nhận được xác nhận rằng lô hàng đã được giao, chúng tôi sẽ thanh toán phần còn lại của hóa đơn."
  },
  {
    "id": "test2_136",
    "num": 136,
    "source": "Test 2 Part 5",
    "category": "Ngữ pháp & Thì (Grammar & Tenses)",
    "question": "Since we have already ------- on a replacement for Ms. Leung, I think we can remove the topic from the meeting's agenda.",
    "options": {
      "A": "deciding",
      "B": "decision",
      "C": "decided",
      "D": "decide"
    },
    "correctAnswer": "C",
    "explanation": "Sau 'have already' là thì HIỆN TẠI HOÀN THÀNH -> Cần V3/ed: 'have already decided on' (đã quyết định).",
    "tip": "⚡ MẸO: Thấy 'have already ...' -> Sau 'have' luôn chọn động từ đuôi -ed (V3) -> Chọn 'decided'.",
    "keywords": [
      "have already decided on"
    ],
    "vietnameseMeaning": "Vì chúng ta đã quyết định được người thay thế cho cô Leung, tôi nghĩ chúng ta có thể gỡ bỏ chủ đề này khỏi chương trình họp."
  },
  {
    "id": "test2_137",
    "num": 137,
    "source": "Test 2 Part 5",
    "category": "Từ vựng (Vocabulary)",
    "question": "Later this month, Hideki Koiwa will deliver his ------- of the risks and benefits of investing in Chilean stocks.",
    "options": {
      "A": "expansion",
      "B": "analysis",
      "C": "shipment",
      "D": "expert"
    },
    "correctAnswer": "B",
    "explanation": "'deliver his analysis of...' = trình bày bản phân tích của mình về rủi ro và lợi ích khi đầu tư cổ phiếu.",
    "tip": "⚡ MẸO: Thấy nói về rủi ro và lợi ích (risks and benefits) -> Chọn 'analysis' (bản phân tích).",
    "keywords": [
      "deliver his analysis"
    ],
    "vietnameseMeaning": "Cuối tháng này, Hideki Koiwa sẽ trình bày bản phân tích của ông về những rủi ro và lợi ích khi đầu tư vào cổ phiếu Chile."
  },
  {
    "id": "test2_138",
    "num": 138,
    "source": "Test 2 Part 5",
    "category": "Từ vựng (Vocabulary)",
    "question": "Bridgeland Holding's ------- is to refrain from commenting on political issues, so we are unable to answer the reporter's questions.",
    "options": {
      "A": "policy",
      "B": "innocence",
      "C": "election",
      "D": "summons"
    },
    "correctAnswer": "A",
    "explanation": "'company's policy is to...' = chính sách/quy định của công ty là không bình luận về các vấn đề chính trị.",
    "tip": "⚡ MẸO: Quy định ứng xử của công ty ('refrain from commenting') -> Chọn 'policy' (chính sách/quy định).",
    "keywords": [
      "policy is to refrain from"
    ],
    "vietnameseMeaning": "Chính sách của Tập đoàn Bridgeland là không bình luận về các vấn đề chính trị, vì vậy chúng tôi không thể trả lời câu hỏi của phóng viên."
  },
  {
    "id": "test2_139",
    "num": 139,
    "source": "Test 2 Part 5",
    "category": "Từ loại (Word Form)",
    "question": "It is becoming ------- more difficult to find designers who are familiar with this software.",
    "options": {
      "A": "progress",
      "B": "progressive",
      "C": "progression",
      "D": "progressively"
    },
    "correctAnswer": "D",
    "explanation": "Đứng trước cụm so sánh hơn 'more difficult' -> Cần một TRẠNG TỪ (Adv có đuôi -ly) để bổ nghĩa: 'progressively more difficult' = ngày càng khó khăn hơn.",
    "tip": "⚡ MẸO: Đứng trước cụm so sánh 'more + Tính từ' -> Cần TRẠNG TỪ đuôi '-ly' bổ nghĩa -> Chọn 'progressively'.",
    "keywords": [
      "progressively more difficult"
    ],
    "vietnameseMeaning": "Ngày càng trở nên khó khăn hơn để tìm được những nhà thiết kế quen thuộc với phần mềm này."
  },
  {
    "id": "test2_140",
    "num": 140,
    "source": "Test 2 Part 5",
    "category": "Từ vựng (Vocabulary)",
    "question": "For such a large building project, you'll need to take out a massive loan to raise the necessary -------.",
    "options": {
      "A": "assistance",
      "B": "timeline",
      "C": "institution",
      "D": "capital"
    },
    "correctAnswer": "D",
    "explanation": "'raise capital' = huy động vốn. Vay một khoản vay lớn (take out a massive loan) để huy động nguồn vốn cần thiết ('capital').",
    "tip": "⚡ MẸO: Thấy 'loan' (khoản vay) + 'raise the necessary...' -> 100% chọn 'capital' (raise capital = huy động vốn).",
    "keywords": [
      "raise the necessary capital",
      "massive loan"
    ],
    "vietnameseMeaning": "Đối với một dự án xây dựng lớn như vậy, bạn sẽ cần phải vay một khoản vay khổng lồ để huy động nguồn vốn cần thiết."
  },
  {
    "id": "toice2_158",
    "num": 158,
    "source": "Part 7 Đoạn Văn",
    "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
    "question": "What is the purpose of the announcement?",
    "options": {
      "A": "To restrict unnecessary staff members from visiting the work area",
      "B": "To provide a timetable for some office renovation work",
      "C": "To thank employees for their support in the work",
      "D": "To prepare for an unexpected shipment delay"
    },
    "correctAnswer": "B",
    "explanation": "Thông báo cung cấp lịch trình chi tiết (timetable) cho công tác sửa chữa cải tạo văn phòng.",
    "tip": "⚡ MANH MỐI: Tiêu đề 'Office Renovation Schedule' + 'detailed timetable' -> Chọn B.",
    "isPassageQuestion": true,
    "passageId": "passage_renovation",
    "passageInfo": {
      "id": "passage_renovation",
      "title": "Thông Báo Kế Hoạch Sửa Chữa Văn Phòng",
      "type": "Announcement",
      "content": "MEMORANDUM - To: All Staff | From: Facilities Management | Date: March 1\nSubject: Office Renovation Schedule\n\nPlease be advised that the main office building will undergo comprehensive renovations over the next two months. Below is the detailed timetable for each department:\n\n• Ground Floor: March 10 - March 20. Ground floor staff will be relocated to temporary desks on the first floor during this period.\n• Second & Third Floors: March 25 - April 10.\n• Fourth Floor: April 21 - May 5.\n\nWe urge all employees to clear their personal belongings from work surfaces before the contractors arrive on their assigned floors. Thank you for your cooperation.",
      "vietnameseTranslation": "THÔNG BÁO: Tòa nhà văn phòng chính sẽ tiến hành sửa chữa trong 2 tháng tới. Lịch trình:\n- Tầng trệt: 10/3 - 20/3. Nhân viên tầng trệt sẽ chuyển tạm lên tầng 1 làm việc.\n- Tầng 2 & 3: 25/3 - 10/4.\n- Tầng 4: 21/4 - 5/5.\nChúng tôi khuyến khích nhân viên dọn dẹp đồ đạc cá nhân trước khi nhà thầu đến.",
      "questionIds": [
        "toice2_158",
        "toice2_159",
        "toice2_160",
        "toice2_161"
      ],
      "clues": [
        {
          "questionNum": 158,
          "questionText": "What is the purpose of the announcement?",
          "correctAnswer": "B",
          "correctChoiceText": "To provide a timetable for some office renovation work",
          "clueLocation": "Dòng Subject & Đoạn 1, dòng 2",
          "clueQuote": "Subject: Office Renovation Schedule ... Below is the detailed timetable for each department",
          "clueExplanation": "Dòng tiêu đề 'Office Renovation Schedule' và câu 'Below is the detailed timetable' nói rõ mục đích thông báo là cung cấp lịch trình sửa chữa.",
          "scanningTip": "Câu hỏi hỏi purpose (mục đích) -> Đọc ngay dòng Subject và 1-2 câu đầu đoạn 1."
        },
        {
          "questionNum": 159,
          "questionText": "Where will employees on the ground floor likely be on March 15?",
          "correctAnswer": "A",
          "correctChoiceText": "The first floor",
          "clueLocation": "Mục Ground Floor, dòng 4",
          "clueQuote": "March 10 - March 20. Ground floor staff will be relocated to temporary desks on the first floor during this period.",
          "clueExplanation": "Ngày 15/3 nằm trong khoảng 10/3 - 20/3. Nhân viên tầng trệt chuyển lên tầng 1 (the first floor).",
          "scanningTip": "Tìm từ khóa ngày 'March 15' và đối chiếu khoảng thời gian 10-20 March -> thấy ngay 'first floor'."
        },
        {
          "questionNum": 160,
          "questionText": "The word 'urge' in the last paragraph is closest in meaning to",
          "correctAnswer": "B",
          "correctChoiceText": "encourage",
          "clueLocation": "Đoạn cuối, dòng 1",
          "clueQuote": "We urge all employees to clear their personal belongings...",
          "clueExplanation": "'urge' nghĩa là thúc giục, khuyến khích nhân viên chủ động dọn đồ -> Đồng nghĩa với 'encourage'.",
          "scanningTip": "Từ vựng đồng nghĩa: urge = encourage (khuyến khích/thúc giục)."
        },
        {
          "questionNum": 161,
          "questionText": "During which period will the employees on the fourth floor not be affected?",
          "correctAnswer": "A",
          "correctChoiceText": "April 11-20",
          "clueLocation": "Mục Fourth Floor, dòng 6",
          "clueQuote": "Fourth Floor: April 21 - May 5.",
          "clueExplanation": "Tầng 4 chỉ thi công từ 21/4 đến 5/5. Do đó giai đoạn trước đó từ 11/4 đến 20/4 hoàn toàn không bị ảnh hưởng.",
          "scanningTip": "Quét mốc bắt đầu của Fourth Floor là 'April 21' -> Mốc thời gian trước đó (April 11-20) là không bị ảnh hưởng."
        }
      ]
    },
    "clue": {
      "questionNum": 158,
      "questionText": "What is the purpose of the announcement?",
      "correctAnswer": "B",
      "correctChoiceText": "To provide a timetable for some office renovation work",
      "clueLocation": "Dòng Subject & Đoạn 1, dòng 2",
      "clueQuote": "Subject: Office Renovation Schedule ... Below is the detailed timetable for each department",
      "clueExplanation": "Dòng tiêu đề 'Office Renovation Schedule' và câu 'Below is the detailed timetable' nói rõ mục đích thông báo là cung cấp lịch trình sửa chữa.",
      "scanningTip": "Câu hỏi hỏi purpose (mục đích) -> Đọc ngay dòng Subject và 1-2 câu đầu đoạn 1."
    },
    "vietnameseMeaning": "Mục đích của thông báo là cung cấp lịch trình cho công tác cải tạo văn phòng."
  },
  {
    "id": "toice2_159",
    "num": 159,
    "source": "Part 7 Đoạn Văn",
    "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
    "question": "Where will employees on the ground floor likely be on March 15?",
    "options": {
      "A": "The first floor",
      "B": "The second floor",
      "C": "The third floor",
      "D": "The fourth floor"
    },
    "correctAnswer": "A",
    "explanation": "Nhân viên tầng trệt làm việc tạm thời tại tầng 1 từ ngày 10/3 đến 20/3 (bao gồm ngày 15/3).",
    "tip": "⚡ MANH MỐI: 15/3 nằm trong khoảng 10-20/3 -> 'relocated to the first floor' -> Chọn A.",
    "isPassageQuestion": true,
    "passageId": "passage_renovation",
    "passageInfo": {
      "id": "passage_renovation",
      "title": "Thông Báo Kế Hoạch Sửa Chữa Văn Phòng",
      "type": "Announcement",
      "content": "MEMORANDUM - To: All Staff | From: Facilities Management | Date: March 1\nSubject: Office Renovation Schedule\n\nPlease be advised that the main office building will undergo comprehensive renovations over the next two months. Below is the detailed timetable for each department:\n\n• Ground Floor: March 10 - March 20. Ground floor staff will be relocated to temporary desks on the first floor during this period.\n• Second & Third Floors: March 25 - April 10.\n• Fourth Floor: April 21 - May 5.\n\nWe urge all employees to clear their personal belongings from work surfaces before the contractors arrive on their assigned floors. Thank you for your cooperation.",
      "vietnameseTranslation": "THÔNG BÁO: Tòa nhà văn phòng chính sẽ tiến hành sửa chữa trong 2 tháng tới. Lịch trình:\n- Tầng trệt: 10/3 - 20/3. Nhân viên tầng trệt sẽ chuyển tạm lên tầng 1 làm việc.\n- Tầng 2 & 3: 25/3 - 10/4.\n- Tầng 4: 21/4 - 5/5.\nChúng tôi khuyến khích nhân viên dọn dẹp đồ đạc cá nhân trước khi nhà thầu đến.",
      "questionIds": [
        "toice2_158",
        "toice2_159",
        "toice2_160",
        "toice2_161"
      ],
      "clues": [
        {
          "questionNum": 158,
          "questionText": "What is the purpose of the announcement?",
          "correctAnswer": "B",
          "correctChoiceText": "To provide a timetable for some office renovation work",
          "clueLocation": "Dòng Subject & Đoạn 1, dòng 2",
          "clueQuote": "Subject: Office Renovation Schedule ... Below is the detailed timetable for each department",
          "clueExplanation": "Dòng tiêu đề 'Office Renovation Schedule' và câu 'Below is the detailed timetable' nói rõ mục đích thông báo là cung cấp lịch trình sửa chữa.",
          "scanningTip": "Câu hỏi hỏi purpose (mục đích) -> Đọc ngay dòng Subject và 1-2 câu đầu đoạn 1."
        },
        {
          "questionNum": 159,
          "questionText": "Where will employees on the ground floor likely be on March 15?",
          "correctAnswer": "A",
          "correctChoiceText": "The first floor",
          "clueLocation": "Mục Ground Floor, dòng 4",
          "clueQuote": "March 10 - March 20. Ground floor staff will be relocated to temporary desks on the first floor during this period.",
          "clueExplanation": "Ngày 15/3 nằm trong khoảng 10/3 - 20/3. Nhân viên tầng trệt chuyển lên tầng 1 (the first floor).",
          "scanningTip": "Tìm từ khóa ngày 'March 15' và đối chiếu khoảng thời gian 10-20 March -> thấy ngay 'first floor'."
        },
        {
          "questionNum": 160,
          "questionText": "The word 'urge' in the last paragraph is closest in meaning to",
          "correctAnswer": "B",
          "correctChoiceText": "encourage",
          "clueLocation": "Đoạn cuối, dòng 1",
          "clueQuote": "We urge all employees to clear their personal belongings...",
          "clueExplanation": "'urge' nghĩa là thúc giục, khuyến khích nhân viên chủ động dọn đồ -> Đồng nghĩa với 'encourage'.",
          "scanningTip": "Từ vựng đồng nghĩa: urge = encourage (khuyến khích/thúc giục)."
        },
        {
          "questionNum": 161,
          "questionText": "During which period will the employees on the fourth floor not be affected?",
          "correctAnswer": "A",
          "correctChoiceText": "April 11-20",
          "clueLocation": "Mục Fourth Floor, dòng 6",
          "clueQuote": "Fourth Floor: April 21 - May 5.",
          "clueExplanation": "Tầng 4 chỉ thi công từ 21/4 đến 5/5. Do đó giai đoạn trước đó từ 11/4 đến 20/4 hoàn toàn không bị ảnh hưởng.",
          "scanningTip": "Quét mốc bắt đầu của Fourth Floor là 'April 21' -> Mốc thời gian trước đó (April 11-20) là không bị ảnh hưởng."
        }
      ]
    },
    "clue": {
      "questionNum": 159,
      "questionText": "Where will employees on the ground floor likely be on March 15?",
      "correctAnswer": "A",
      "correctChoiceText": "The first floor",
      "clueLocation": "Mục Ground Floor, dòng 4",
      "clueQuote": "March 10 - March 20. Ground floor staff will be relocated to temporary desks on the first floor during this period.",
      "clueExplanation": "Ngày 15/3 nằm trong khoảng 10/3 - 20/3. Nhân viên tầng trệt chuyển lên tầng 1 (the first floor).",
      "scanningTip": "Tìm từ khóa ngày 'March 15' và đối chiếu khoảng thời gian 10-20 March -> thấy ngay 'first floor'."
    },
    "vietnameseMeaning": "Vào ngày 15 tháng Ba, các nhân viên tầng trệt làm việc ở tầng một."
  },
  {
    "id": "toice2_160",
    "num": 160,
    "source": "Part 7 Đoạn Văn",
    "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
    "question": "The word 'urge' in the last paragraph is closest in meaning to",
    "options": {
      "A": "influence",
      "B": "encourage",
      "C": "support",
      "D": "command"
    },
    "correctAnswer": "B",
    "explanation": "Từ 'urge' mang nghĩa thúc giục, khuyến khích ai làm gì (encourage).",
    "tip": "⚡ MANH MỐI: urge = encourage (khuyến khích/thúc giục).",
    "isPassageQuestion": true,
    "passageId": "passage_renovation",
    "passageInfo": {
      "id": "passage_renovation",
      "title": "Thông Báo Kế Hoạch Sửa Chữa Văn Phòng",
      "type": "Announcement",
      "content": "MEMORANDUM - To: All Staff | From: Facilities Management | Date: March 1\nSubject: Office Renovation Schedule\n\nPlease be advised that the main office building will undergo comprehensive renovations over the next two months. Below is the detailed timetable for each department:\n\n• Ground Floor: March 10 - March 20. Ground floor staff will be relocated to temporary desks on the first floor during this period.\n• Second & Third Floors: March 25 - April 10.\n• Fourth Floor: April 21 - May 5.\n\nWe urge all employees to clear their personal belongings from work surfaces before the contractors arrive on their assigned floors. Thank you for your cooperation.",
      "vietnameseTranslation": "THÔNG BÁO: Tòa nhà văn phòng chính sẽ tiến hành sửa chữa trong 2 tháng tới. Lịch trình:\n- Tầng trệt: 10/3 - 20/3. Nhân viên tầng trệt sẽ chuyển tạm lên tầng 1 làm việc.\n- Tầng 2 & 3: 25/3 - 10/4.\n- Tầng 4: 21/4 - 5/5.\nChúng tôi khuyến khích nhân viên dọn dẹp đồ đạc cá nhân trước khi nhà thầu đến.",
      "questionIds": [
        "toice2_158",
        "toice2_159",
        "toice2_160",
        "toice2_161"
      ],
      "clues": [
        {
          "questionNum": 158,
          "questionText": "What is the purpose of the announcement?",
          "correctAnswer": "B",
          "correctChoiceText": "To provide a timetable for some office renovation work",
          "clueLocation": "Dòng Subject & Đoạn 1, dòng 2",
          "clueQuote": "Subject: Office Renovation Schedule ... Below is the detailed timetable for each department",
          "clueExplanation": "Dòng tiêu đề 'Office Renovation Schedule' và câu 'Below is the detailed timetable' nói rõ mục đích thông báo là cung cấp lịch trình sửa chữa.",
          "scanningTip": "Câu hỏi hỏi purpose (mục đích) -> Đọc ngay dòng Subject và 1-2 câu đầu đoạn 1."
        },
        {
          "questionNum": 159,
          "questionText": "Where will employees on the ground floor likely be on March 15?",
          "correctAnswer": "A",
          "correctChoiceText": "The first floor",
          "clueLocation": "Mục Ground Floor, dòng 4",
          "clueQuote": "March 10 - March 20. Ground floor staff will be relocated to temporary desks on the first floor during this period.",
          "clueExplanation": "Ngày 15/3 nằm trong khoảng 10/3 - 20/3. Nhân viên tầng trệt chuyển lên tầng 1 (the first floor).",
          "scanningTip": "Tìm từ khóa ngày 'March 15' và đối chiếu khoảng thời gian 10-20 March -> thấy ngay 'first floor'."
        },
        {
          "questionNum": 160,
          "questionText": "The word 'urge' in the last paragraph is closest in meaning to",
          "correctAnswer": "B",
          "correctChoiceText": "encourage",
          "clueLocation": "Đoạn cuối, dòng 1",
          "clueQuote": "We urge all employees to clear their personal belongings...",
          "clueExplanation": "'urge' nghĩa là thúc giục, khuyến khích nhân viên chủ động dọn đồ -> Đồng nghĩa với 'encourage'.",
          "scanningTip": "Từ vựng đồng nghĩa: urge = encourage (khuyến khích/thúc giục)."
        },
        {
          "questionNum": 161,
          "questionText": "During which period will the employees on the fourth floor not be affected?",
          "correctAnswer": "A",
          "correctChoiceText": "April 11-20",
          "clueLocation": "Mục Fourth Floor, dòng 6",
          "clueQuote": "Fourth Floor: April 21 - May 5.",
          "clueExplanation": "Tầng 4 chỉ thi công từ 21/4 đến 5/5. Do đó giai đoạn trước đó từ 11/4 đến 20/4 hoàn toàn không bị ảnh hưởng.",
          "scanningTip": "Quét mốc bắt đầu của Fourth Floor là 'April 21' -> Mốc thời gian trước đó (April 11-20) là không bị ảnh hưởng."
        }
      ]
    },
    "clue": {
      "questionNum": 160,
      "questionText": "The word 'urge' in the last paragraph is closest in meaning to",
      "correctAnswer": "B",
      "correctChoiceText": "encourage",
      "clueLocation": "Đoạn cuối, dòng 1",
      "clueQuote": "We urge all employees to clear their personal belongings...",
      "clueExplanation": "'urge' nghĩa là thúc giục, khuyến khích nhân viên chủ động dọn đồ -> Đồng nghĩa với 'encourage'.",
      "scanningTip": "Từ vựng đồng nghĩa: urge = encourage (khuyến khích/thúc giục)."
    },
    "vietnameseMeaning": "Từ 'urge' có nghĩa gần nhất với 'encourage'."
  },
  {
    "id": "toice2_161",
    "num": 161,
    "source": "Part 7 Đoạn Văn",
    "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
    "question": "During which period will the employees on the fourth floor not be affected?",
    "options": {
      "A": "April 11-20",
      "B": "April 21-30",
      "C": "May 1-9",
      "D": "May 10-19"
    },
    "correctAnswer": "A",
    "explanation": "Tầng 4 bắt đầu sửa từ 21/4 -> Khoảng thời gian từ 11/4 đến 20/4 không bị ảnh hưởng.",
    "tip": "⚡ MANH MỐI: Tầng 4 bắt đầu từ 21/4 -> Thời gian trước 21/4 (11-20/4) không bị ảnh hưởng.",
    "isPassageQuestion": true,
    "passageId": "passage_renovation",
    "passageInfo": {
      "id": "passage_renovation",
      "title": "Thông Báo Kế Hoạch Sửa Chữa Văn Phòng",
      "type": "Announcement",
      "content": "MEMORANDUM - To: All Staff | From: Facilities Management | Date: March 1\nSubject: Office Renovation Schedule\n\nPlease be advised that the main office building will undergo comprehensive renovations over the next two months. Below is the detailed timetable for each department:\n\n• Ground Floor: March 10 - March 20. Ground floor staff will be relocated to temporary desks on the first floor during this period.\n• Second & Third Floors: March 25 - April 10.\n• Fourth Floor: April 21 - May 5.\n\nWe urge all employees to clear their personal belongings from work surfaces before the contractors arrive on their assigned floors. Thank you for your cooperation.",
      "vietnameseTranslation": "THÔNG BÁO: Tòa nhà văn phòng chính sẽ tiến hành sửa chữa trong 2 tháng tới. Lịch trình:\n- Tầng trệt: 10/3 - 20/3. Nhân viên tầng trệt sẽ chuyển tạm lên tầng 1 làm việc.\n- Tầng 2 & 3: 25/3 - 10/4.\n- Tầng 4: 21/4 - 5/5.\nChúng tôi khuyến khích nhân viên dọn dẹp đồ đạc cá nhân trước khi nhà thầu đến.",
      "questionIds": [
        "toice2_158",
        "toice2_159",
        "toice2_160",
        "toice2_161"
      ],
      "clues": [
        {
          "questionNum": 158,
          "questionText": "What is the purpose of the announcement?",
          "correctAnswer": "B",
          "correctChoiceText": "To provide a timetable for some office renovation work",
          "clueLocation": "Dòng Subject & Đoạn 1, dòng 2",
          "clueQuote": "Subject: Office Renovation Schedule ... Below is the detailed timetable for each department",
          "clueExplanation": "Dòng tiêu đề 'Office Renovation Schedule' và câu 'Below is the detailed timetable' nói rõ mục đích thông báo là cung cấp lịch trình sửa chữa.",
          "scanningTip": "Câu hỏi hỏi purpose (mục đích) -> Đọc ngay dòng Subject và 1-2 câu đầu đoạn 1."
        },
        {
          "questionNum": 159,
          "questionText": "Where will employees on the ground floor likely be on March 15?",
          "correctAnswer": "A",
          "correctChoiceText": "The first floor",
          "clueLocation": "Mục Ground Floor, dòng 4",
          "clueQuote": "March 10 - March 20. Ground floor staff will be relocated to temporary desks on the first floor during this period.",
          "clueExplanation": "Ngày 15/3 nằm trong khoảng 10/3 - 20/3. Nhân viên tầng trệt chuyển lên tầng 1 (the first floor).",
          "scanningTip": "Tìm từ khóa ngày 'March 15' và đối chiếu khoảng thời gian 10-20 March -> thấy ngay 'first floor'."
        },
        {
          "questionNum": 160,
          "questionText": "The word 'urge' in the last paragraph is closest in meaning to",
          "correctAnswer": "B",
          "correctChoiceText": "encourage",
          "clueLocation": "Đoạn cuối, dòng 1",
          "clueQuote": "We urge all employees to clear their personal belongings...",
          "clueExplanation": "'urge' nghĩa là thúc giục, khuyến khích nhân viên chủ động dọn đồ -> Đồng nghĩa với 'encourage'.",
          "scanningTip": "Từ vựng đồng nghĩa: urge = encourage (khuyến khích/thúc giục)."
        },
        {
          "questionNum": 161,
          "questionText": "During which period will the employees on the fourth floor not be affected?",
          "correctAnswer": "A",
          "correctChoiceText": "April 11-20",
          "clueLocation": "Mục Fourth Floor, dòng 6",
          "clueQuote": "Fourth Floor: April 21 - May 5.",
          "clueExplanation": "Tầng 4 chỉ thi công từ 21/4 đến 5/5. Do đó giai đoạn trước đó từ 11/4 đến 20/4 hoàn toàn không bị ảnh hưởng.",
          "scanningTip": "Quét mốc bắt đầu của Fourth Floor là 'April 21' -> Mốc thời gian trước đó (April 11-20) là không bị ảnh hưởng."
        }
      ]
    },
    "clue": {
      "questionNum": 161,
      "questionText": "During which period will the employees on the fourth floor not be affected?",
      "correctAnswer": "A",
      "correctChoiceText": "April 11-20",
      "clueLocation": "Mục Fourth Floor, dòng 6",
      "clueQuote": "Fourth Floor: April 21 - May 5.",
      "clueExplanation": "Tầng 4 chỉ thi công từ 21/4 đến 5/5. Do đó giai đoạn trước đó từ 11/4 đến 20/4 hoàn toàn không bị ảnh hưởng.",
      "scanningTip": "Quét mốc bắt đầu của Fourth Floor là 'April 21' -> Mốc thời gian trước đó (April 11-20) là không bị ảnh hưởng."
    },
    "vietnameseMeaning": "Nhân viên tầng 4 không bị ảnh hưởng trong giai đoạn 11-20 tháng Tư."
  },
  {
    "id": "toice2_162",
    "num": 162,
    "source": "Part 7 Đoạn Văn",
    "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
    "question": "Which of the following is NOT true about the results of the questionnaire?",
    "options": {
      "A": "Mr. Williams felt that the restaurant was understaffed.",
      "B": "Mr. Williams liked the food he had today.",
      "C": "Mr. Williams felt that the price was very unreasonable.",
      "D": "Mr. Williams thought the menu selection needs were limited."
    },
    "correctAnswer": "C",
    "explanation": "Trong phiếu ông Williams đánh giá giá cả là 'Fair and reasonable' (Công bằng và hợp lý) nên nói giá rất bất hợp lý là câu không đúng.",
    "tip": "⚡ MANH MỐI: Mục Price & Value ghi 'Fair and reasonable' -> Câu C ngược lại nên chọn C.",
    "isPassageQuestion": true,
    "passageId": "passage_restaurant",
    "passageInfo": {
      "id": "passage_restaurant",
      "title": "Phiếu Đánh Giá Nhà Hàng - Mr. Williams",
      "type": "Questionnaire",
      "content": "CUSTOMER SATISFACTION QUESTIONNAIRE - Luigi's Italian Bistro\nCustomer Name: Mr. David Williams | Visit Time: 7:30 PM (Dinner) | Party size: 1\n\n• Food Quality: ★★★★★ (Delicious, loved the pasta!)\n• Service Speed: ★★☆☆☆ (The restaurant was clearly understaffed, waited 35 mins for food).\n• Price & Value: ★★★★☆ (Fair and reasonable pricing for central city dining).\n• Menu Selection: ★★☆☆☆ (Selection was quite limited, needs more seafood options).\n\nAdditional Comments: \"I usually enjoy my dinners here as a solo guest, but tonight the servers were struggling with too many tables.\" ",
      "vietnameseTranslation": "PHIẾU KHẢO SÁT KHÁCH HÀNG: Khách hàng David Williams, dùng bữa tối lúc 7:30 tối.\nChất lượng món: 5 sao (Rất ngon). Tốc độ phục vụ: 2 sao (Nhà hàng thiếu nhân viên). Giá cả: 4 sao (Hợp lý). Thực đơn: 2 sao (Lựa chọn còn hạn chế).",
      "questionIds": [
        "toice2_162",
        "toice2_163"
      ],
      "clues": [
        {
          "questionNum": 162,
          "questionText": "Which of the following is NOT true about the results of the questionnaire?",
          "correctAnswer": "C",
          "correctChoiceText": "Mr. Williams felt that the price was very unreasonable.",
          "clueLocation": "Mục Price & Value, dòng 4",
          "clueQuote": "Price & Value: ★★★★☆ (Fair and reasonable pricing for central city dining).",
          "clueExplanation": "Phiếu ghi rõ giá cả 'Fair and reasonable' (Hợp lý) -> Câu C nói giá 'rất bất hợp lý (very unreasonable)' là SAI.",
          "scanningTip": "Tìm từ khóa 'Price' trong phiếu -> thấy đánh giá 4 sao 'Fair and reasonable' -> Khẳng định C sai."
        },
        {
          "questionNum": 163,
          "questionText": "What can be implied about Mr. Williams?",
          "correctAnswer": "A",
          "correctChoiceText": "He had dinner at the restaurant.",
          "clueLocation": "Dòng Visit Time & Comments",
          "clueQuote": "Visit Time: 7:30 PM (Dinner) ... 'I usually enjoy my dinners here'",
          "clueExplanation": "Thời gian ghé là 7:30 tối (Dinner) và phần nhận xét ghi 'enjoy my dinners here' -> Ông ấy ăn tối tại nhà hàng.",
          "scanningTip": "Quét từ 'Dinner' ở dòng Visit Time để kết luận ông ấy ăn tối tại nhà hàng."
        }
      ]
    },
    "clue": {
      "questionNum": 162,
      "questionText": "Which of the following is NOT true about the results of the questionnaire?",
      "correctAnswer": "C",
      "correctChoiceText": "Mr. Williams felt that the price was very unreasonable.",
      "clueLocation": "Mục Price & Value, dòng 4",
      "clueQuote": "Price & Value: ★★★★☆ (Fair and reasonable pricing for central city dining).",
      "clueExplanation": "Phiếu ghi rõ giá cả 'Fair and reasonable' (Hợp lý) -> Câu C nói giá 'rất bất hợp lý (very unreasonable)' là SAI.",
      "scanningTip": "Tìm từ khóa 'Price' trong phiếu -> thấy đánh giá 4 sao 'Fair and reasonable' -> Khẳng định C sai."
    },
    "vietnameseMeaning": "Điều không đúng là: Ông Williams cảm thấy giá cả rất bất hợp lý."
  },
  {
    "id": "toice2_163",
    "num": 163,
    "source": "Part 7 Đoạn Văn",
    "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
    "question": "What can be implied about Mr. Williams?",
    "options": {
      "A": "He had dinner at the restaurant.",
      "B": "He came with several guests.",
      "C": "He is a regular customer.",
      "D": "He is a very picky person."
    },
    "correctAnswer": "A",
    "explanation": "Mục Visit Time ghi rõ '7:30 PM (Dinner)' -> Ông ấy đã ăn tối tại nhà hàng.",
    "tip": "⚡ MANH MỐI: Dòng Visit Time ghi '7:30 PM (Dinner)' -> Chọn A.",
    "isPassageQuestion": true,
    "passageId": "passage_restaurant",
    "passageInfo": {
      "id": "passage_restaurant",
      "title": "Phiếu Đánh Giá Nhà Hàng - Mr. Williams",
      "type": "Questionnaire",
      "content": "CUSTOMER SATISFACTION QUESTIONNAIRE - Luigi's Italian Bistro\nCustomer Name: Mr. David Williams | Visit Time: 7:30 PM (Dinner) | Party size: 1\n\n• Food Quality: ★★★★★ (Delicious, loved the pasta!)\n• Service Speed: ★★☆☆☆ (The restaurant was clearly understaffed, waited 35 mins for food).\n• Price & Value: ★★★★☆ (Fair and reasonable pricing for central city dining).\n• Menu Selection: ★★☆☆☆ (Selection was quite limited, needs more seafood options).\n\nAdditional Comments: \"I usually enjoy my dinners here as a solo guest, but tonight the servers were struggling with too many tables.\" ",
      "vietnameseTranslation": "PHIẾU KHẢO SÁT KHÁCH HÀNG: Khách hàng David Williams, dùng bữa tối lúc 7:30 tối.\nChất lượng món: 5 sao (Rất ngon). Tốc độ phục vụ: 2 sao (Nhà hàng thiếu nhân viên). Giá cả: 4 sao (Hợp lý). Thực đơn: 2 sao (Lựa chọn còn hạn chế).",
      "questionIds": [
        "toice2_162",
        "toice2_163"
      ],
      "clues": [
        {
          "questionNum": 162,
          "questionText": "Which of the following is NOT true about the results of the questionnaire?",
          "correctAnswer": "C",
          "correctChoiceText": "Mr. Williams felt that the price was very unreasonable.",
          "clueLocation": "Mục Price & Value, dòng 4",
          "clueQuote": "Price & Value: ★★★★☆ (Fair and reasonable pricing for central city dining).",
          "clueExplanation": "Phiếu ghi rõ giá cả 'Fair and reasonable' (Hợp lý) -> Câu C nói giá 'rất bất hợp lý (very unreasonable)' là SAI.",
          "scanningTip": "Tìm từ khóa 'Price' trong phiếu -> thấy đánh giá 4 sao 'Fair and reasonable' -> Khẳng định C sai."
        },
        {
          "questionNum": 163,
          "questionText": "What can be implied about Mr. Williams?",
          "correctAnswer": "A",
          "correctChoiceText": "He had dinner at the restaurant.",
          "clueLocation": "Dòng Visit Time & Comments",
          "clueQuote": "Visit Time: 7:30 PM (Dinner) ... 'I usually enjoy my dinners here'",
          "clueExplanation": "Thời gian ghé là 7:30 tối (Dinner) và phần nhận xét ghi 'enjoy my dinners here' -> Ông ấy ăn tối tại nhà hàng.",
          "scanningTip": "Quét từ 'Dinner' ở dòng Visit Time để kết luận ông ấy ăn tối tại nhà hàng."
        }
      ]
    },
    "clue": {
      "questionNum": 163,
      "questionText": "What can be implied about Mr. Williams?",
      "correctAnswer": "A",
      "correctChoiceText": "He had dinner at the restaurant.",
      "clueLocation": "Dòng Visit Time & Comments",
      "clueQuote": "Visit Time: 7:30 PM (Dinner) ... 'I usually enjoy my dinners here'",
      "clueExplanation": "Thời gian ghé là 7:30 tối (Dinner) và phần nhận xét ghi 'enjoy my dinners here' -> Ông ấy ăn tối tại nhà hàng.",
      "scanningTip": "Quét từ 'Dinner' ở dòng Visit Time để kết luận ông ấy ăn tối tại nhà hàng."
    },
    "vietnameseMeaning": "Có thể suy ra rằng ông Williams đã ăn tối tại nhà hàng."
  },
  {
    "id": "toice2_164",
    "num": 164,
    "source": "Part 7 Đoạn Văn",
    "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
    "question": "What is suggested in the advertisement?",
    "options": {
      "A": "The store will be celebrating its third year of business.",
      "B": "The price of items in the store will be slashed roughly by one third.",
      "C": "The sale period will last for two months.",
      "D": "The discounts will only be available to premier members."
    },
    "correctAnswer": "B",
    "explanation": "Bài viết nói giá được giảm 30-35%, tức là giảm xấp xỉ 1/3 (roughly one third off).",
    "tip": "⚡ MANH MỐI: 30%-35% = roughly one third -> Chọn B.",
    "isPassageQuestion": true,
    "passageId": "passage_sale",
    "passageInfo": {
      "id": "passage_sale",
      "title": "Quảng Cáo Đại Hạ Giá Mừng Sinh Nhật Cửa Hàng",
      "type": "Advertisement",
      "content": "METRO FASHION OUTLET - 5TH ANNIVERSARY GRAND SALE!\nCelebrate our 5th year in business with massive markdowns across all departments!\n\n• From October 1 to October 15, all store items will have their prices slashed by 30% to 35% (roughly one third off original retail prices!).\n• Exclusive Privilege: Customers who sign up for our VIP Premier Membership Card will receive an additional 15% discount, bringing total savings up to 50% (the maximum discount available)!\n\nCome visit us early at 104 Riverside Mall to grab the best selections.",
      "vietnameseTranslation": "ĐẠI HẠ GIÁ KỶ NIỆM 5 NĂM: Giảm giá từ 30% đến 35% cho tất cả mặt hàng (khoảng 1/3 giá gốc). Đặc biệt khách đăng ký thẻ hội viên VIP sẽ được giảm thêm 15%, tối đa lên đến 50%.",
      "questionIds": [
        "toice2_164",
        "toice2_165"
      ],
      "clues": [
        {
          "questionNum": 164,
          "questionText": "What is suggested in the advertisement?",
          "correctAnswer": "B",
          "correctChoiceText": "The price of items in the store will be slashed roughly by one third.",
          "clueLocation": "Dòng 3, mục dấu chấm đầu tiên",
          "clueQuote": "prices slashed by 30% to 35% (roughly one third off original retail prices!)",
          "clueExplanation": "Bài viết ghi rõ giá giảm 30%-35% tương đương khoảng 1/3 (roughly one third).",
          "scanningTip": "Quét từ khóa 'one third' hoặc 'slashed' -> đối chiếu dòng 3."
        },
        {
          "questionNum": 165,
          "questionText": "How can a customer receive the largest discount?",
          "correctAnswer": "C",
          "correctChoiceText": "By signing up for a special membership card",
          "clueLocation": "Dòng 4, mục Exclusive Privilege",
          "clueQuote": "Customers who sign up for our VIP Premier Membership Card will receive an additional 15% discount, bringing total savings up to 50% (the maximum discount available)!",
          "clueExplanation": "Để nhận mức giảm tối đa 50%, khách cần đăng ký thẻ hội viên VIP Premier.",
          "scanningTip": "Tìm từ khóa 'largest discount' / 'maximum discount' -> tìm thấy điều kiện 'sign up for VIP Premier Membership Card'."
        }
      ]
    },
    "clue": {
      "questionNum": 164,
      "questionText": "What is suggested in the advertisement?",
      "correctAnswer": "B",
      "correctChoiceText": "The price of items in the store will be slashed roughly by one third.",
      "clueLocation": "Dòng 3, mục dấu chấm đầu tiên",
      "clueQuote": "prices slashed by 30% to 35% (roughly one third off original retail prices!)",
      "clueExplanation": "Bài viết ghi rõ giá giảm 30%-35% tương đương khoảng 1/3 (roughly one third).",
      "scanningTip": "Quét từ khóa 'one third' hoặc 'slashed' -> đối chiếu dòng 3."
    },
    "vietnameseMeaning": "Quảng cáo gợi ý rằng giá các mặt hàng trong cửa hàng sẽ được giảm khoảng một phần ba."
  },
  {
    "id": "toice2_165",
    "num": 165,
    "source": "Part 7 Đoạn Văn",
    "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
    "question": "How can a customer receive the largest discount?",
    "options": {
      "A": "By coming in early to the store",
      "B": "By purchasing two or more items",
      "C": "By signing up for a special membership card",
      "D": "By paying in cash only"
    },
    "correctAnswer": "C",
    "explanation": "Đăng ký thẻ hội viên VIP Premier sẽ được giảm thêm 15%, đạt mức tối đa 50%.",
    "tip": "⚡ MANH MỐI: 'maximum discount' đạt được nhờ 'sign up for VIP Premier Membership Card' -> Chọn C.",
    "isPassageQuestion": true,
    "passageId": "passage_sale",
    "passageInfo": {
      "id": "passage_sale",
      "title": "Quảng Cáo Đại Hạ Giá Mừng Sinh Nhật Cửa Hàng",
      "type": "Advertisement",
      "content": "METRO FASHION OUTLET - 5TH ANNIVERSARY GRAND SALE!\nCelebrate our 5th year in business with massive markdowns across all departments!\n\n• From October 1 to October 15, all store items will have their prices slashed by 30% to 35% (roughly one third off original retail prices!).\n• Exclusive Privilege: Customers who sign up for our VIP Premier Membership Card will receive an additional 15% discount, bringing total savings up to 50% (the maximum discount available)!\n\nCome visit us early at 104 Riverside Mall to grab the best selections.",
      "vietnameseTranslation": "ĐẠI HẠ GIÁ KỶ NIỆM 5 NĂM: Giảm giá từ 30% đến 35% cho tất cả mặt hàng (khoảng 1/3 giá gốc). Đặc biệt khách đăng ký thẻ hội viên VIP sẽ được giảm thêm 15%, tối đa lên đến 50%.",
      "questionIds": [
        "toice2_164",
        "toice2_165"
      ],
      "clues": [
        {
          "questionNum": 164,
          "questionText": "What is suggested in the advertisement?",
          "correctAnswer": "B",
          "correctChoiceText": "The price of items in the store will be slashed roughly by one third.",
          "clueLocation": "Dòng 3, mục dấu chấm đầu tiên",
          "clueQuote": "prices slashed by 30% to 35% (roughly one third off original retail prices!)",
          "clueExplanation": "Bài viết ghi rõ giá giảm 30%-35% tương đương khoảng 1/3 (roughly one third).",
          "scanningTip": "Quét từ khóa 'one third' hoặc 'slashed' -> đối chiếu dòng 3."
        },
        {
          "questionNum": 165,
          "questionText": "How can a customer receive the largest discount?",
          "correctAnswer": "C",
          "correctChoiceText": "By signing up for a special membership card",
          "clueLocation": "Dòng 4, mục Exclusive Privilege",
          "clueQuote": "Customers who sign up for our VIP Premier Membership Card will receive an additional 15% discount, bringing total savings up to 50% (the maximum discount available)!",
          "clueExplanation": "Để nhận mức giảm tối đa 50%, khách cần đăng ký thẻ hội viên VIP Premier.",
          "scanningTip": "Tìm từ khóa 'largest discount' / 'maximum discount' -> tìm thấy điều kiện 'sign up for VIP Premier Membership Card'."
        }
      ]
    },
    "clue": {
      "questionNum": 165,
      "questionText": "How can a customer receive the largest discount?",
      "correctAnswer": "C",
      "correctChoiceText": "By signing up for a special membership card",
      "clueLocation": "Dòng 4, mục Exclusive Privilege",
      "clueQuote": "Customers who sign up for our VIP Premier Membership Card will receive an additional 15% discount, bringing total savings up to 50% (the maximum discount available)!",
      "clueExplanation": "Để nhận mức giảm tối đa 50%, khách cần đăng ký thẻ hội viên VIP Premier.",
      "scanningTip": "Tìm từ khóa 'largest discount' / 'maximum discount' -> tìm thấy điều kiện 'sign up for VIP Premier Membership Card'."
    },
    "vietnameseMeaning": "Khách hàng có thể nhận mức giảm giá lớn nhất bằng cách đăng ký thẻ hội viên đặc biệt."
  },
{
  "id": "toice2_116",
  "num": 116,
  "source": "ToIce 2",
  "category": "Từ loại & Phân từ (Participles)",
  "question": "A small group of contestants has been selected following a nationwide search ------- over the last six months.",
  "options": {
    "A": "alerted",
    "B": "engaged",
    "C": "protected",
    "D": "conducted"
  },
  "correctAnswer": "D",
  "explanation": "Rút gọn mệnh đề quan hệ dạng bị động: \"a nationwide search (which was) conducted over the last six months\" (cuộc tìm kiếm được tiến hành trên toàn quốc). Đi với danh từ search/survey là động từ conduct.",
  "tip": "⚡ MẸO: Cụm cố định: \"conduct a search / survey\" (tiến hành tìm kiếm, khảo sát). Thấy \"search\" -> chọn ngay \"conducted\"!",
  "keywords": [
    "nationwide search",
    "conducted",
    "six months"
  ],
  "vietnameseMeaning": "Một nhóm nhỏ thí sinh đã được chọn sau cuộc tìm kiếm trên toàn quốc được thực hiện trong 6 tháng qua."
},
{
  "id": "toice2_119",
  "num": 119,
  "source": "ToIce 2",
  "category": "Động từ khuyết thiếu (Modal Verbs)",
  "question": "Because there were too many participants at the seminar, we should ------- into smaller groups for discussion.",
  "options": {
    "A": "divisible",
    "B": "division",
    "C": "dividing",
    "D": "divide"
  },
  "correctAnswer": "D",
  "explanation": "Sau động từ khuyết thiếu (modal verb) \"should\" bắt buộc là động từ nguyên mẫu không \"to\" (V-bare). divide (v) chia nhỏ.",
  "tip": "⚡ MẸO: Sau modal verb \"should / could / will / would / must\" -> 100% chọn ĐỘNG TỪ NGUYÊN MẪU: \"divide\" (không chia đuôi ing/ed/s).",
  "keywords": [
    "should",
    "divide into",
    "smaller groups"
  ],
  "vietnameseMeaning": "Vì có quá nhiều người tham dự hội thảo, chúng ta nên chia thành các nhóm nhỏ hơn để thảo luận."
},
{
  "id": "test2_141",
  "num": 141,
  "source": "Test 2",
  "category": "Cụm từ cố định (Collocations)",
  "question": "I guess that most workers are already ------- with the evaluation process. However, for employees who are new to the company, let me outline the procedure here briefly.",
  "options": {
    "A": "unacquainted",
    "B": "familiar",
    "C": "casual",
    "D": "occupied"
  },
  "correctAnswer": "B",
  "explanation": "Cụm tính từ đi với giới từ: \"be familiar with sth\" = quen thuộc với cái gì.",
  "tip": "⚡ MẸO: Thấy giới từ \"with\" phía sau chỗ trống -> Chọn ngay \"familiar\" (be familiar with = quen thuộc với).",
  "keywords": [
    "already",
    "familiar with",
    "evaluation process"
  ],
  "vietnameseMeaning": "Tôi đoán rằng hầu hết nhân viên đã quen thuộc với quy trình đánh giá.",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p6_eval",
    "title": "To: All Staff - Annual Employee Evaluations",
    "content": "To: All Staff\n\nThis is to remind all staff that the management is about to begin conducting the annual employee evaluations. I guess that most workers are already [141] with the evaluation process. However, for employees who are new to the company, let me outline the procedure here briefly.\n\nAll employees are [142] to fill out a self-assessment form and hand it in to their immediate supervisors by the end of the week. Sometime later, employees will meet [143] to discuss their work with their manager. These one-on-one meetings will give employees an opportunity to get useful feedback on their performance. Once the management team has finished writing up the evaluations, every employee will receive a copy of the official report.\n\nI hope that you all find this process to be a helpful learning experience.\n\nThank you.\nTerrence Webb\nPersonnel Director, Mason Investment",
    "vietnameseTranslation": "Gửi: Toàn thể nhân viên\nThông báo này nhắc nhở toàn thể nhân viên rằng ban quản lý sắp bắt đầu thực hiện các đợt đánh giá thường niên...",
    "clues": [
      {
        "questionNum": 141,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 1, dòng 2",
        "clueQuote": "already [familiar] with the evaluation process",
        "scanningTip": "Tìm giới từ with ngay sau chỗ trống để chọn familiar."
      },
      {
        "questionNum": 142,
        "correctAnswer": "C",
        "clueLocation": "Đoạn 2, dòng 1",
        "clueQuote": "are [required] to fill out a self-assessment form",
        "scanningTip": "Cấu trúc bị động: be required to V (được yêu cầu làm gì)."
      },
      {
        "questionNum": 143,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 2, dòng 3",
        "clueQuote": "meet [individually] ... These one-on-one meetings",
        "scanningTip": "Manh mối: \"one-on-one meetings\" (gặp 1-1) = meet individually (gặp riêng từng người)."
      }
    ]
  },
  "clue": {
    "questionNum": 141,
    "correctAnswer": "B",
    "clueLocation": "Đoạn 1, dòng 2",
    "clueQuote": "already [familiar] with the evaluation process",
    "scanningTip": "Tìm giới từ with ngay sau chỗ trống -> chọn familiar with."
  }
},
{
  "id": "test2_142",
  "num": 142,
  "source": "Test 2",
  "category": "Thể bị động (Passive Voice)",
  "question": "All employees are ------- to fill out a self-assessment form and hand it in to their immediate supervisors by the end of the week.",
  "options": {
    "A": "require",
    "B": "requiring",
    "C": "required",
    "D": "to require"
  },
  "correctAnswer": "C",
  "explanation": "Cấu trúc bị động với to-infinitive: S + be + required + to V (được yêu cầu làm gì). Ở đây có to-be \"are\" nên cần V3/ed.",
  "tip": "⚡ MẸO: Thấy \"are\" + chỗ trống + \"to fill out\" -> Chọn bị động V-ed: \"required\" (được yêu cầu làm gì).",
  "keywords": [
    "are",
    "required to",
    "fill out"
  ],
  "vietnameseMeaning": "Tất cả nhân viên được yêu cầu điền vào biểu mẫu tự đánh giá và nộp cho người giám sát trực tiếp.",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p6_eval",
    "title": "To: All Staff - Annual Employee Evaluations",
    "content": "To: All Staff\n\nThis is to remind all staff that the management is about to begin conducting the annual employee evaluations. I guess that most workers are already [141] with the evaluation process. However, for employees who are new to the company, let me outline the procedure here briefly.\n\nAll employees are [142] to fill out a self-assessment form and hand it in to their immediate supervisors by the end of the week. Sometime later, employees will meet [143] to discuss their work with their manager. These one-on-one meetings will give employees an opportunity to get useful feedback on their performance. Once the management team has finished writing up the evaluations, every employee will receive a copy of the official report.\n\nI hope that you all find this process to be a helpful learning experience.\n\nThank you.\nTerrence Webb\nPersonnel Director, Mason Investment",
    "vietnameseTranslation": "Gửi: Toàn thể nhân viên\nThông báo này nhắc nhở toàn thể nhân viên rằng ban quản lý sắp bắt đầu thực hiện các đợt đánh giá thường niên...",
    "clues": [
      {
        "questionNum": 141,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 1, dòng 2",
        "clueQuote": "already [familiar] with the evaluation process",
        "scanningTip": "Tìm giới từ with ngay sau chỗ trống để chọn familiar."
      },
      {
        "questionNum": 142,
        "correctAnswer": "C",
        "clueLocation": "Đoạn 2, dòng 1",
        "clueQuote": "are [required] to fill out a self-assessment form",
        "scanningTip": "Cấu trúc bị động: be required to V (được yêu cầu làm gì)."
      },
      {
        "questionNum": 143,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 2, dòng 3",
        "clueQuote": "meet [individually] ... These one-on-one meetings",
        "scanningTip": "Manh mối: \"one-on-one meetings\" (gặp 1-1) = meet individually (gặp riêng từng người)."
      }
    ]
  },
  "clue": {
    "questionNum": 142,
    "correctAnswer": "C",
    "clueLocation": "Đoạn 2, dòng 1",
    "clueQuote": "are [required] to fill out a self-assessment form",
    "scanningTip": "Thấy are + ... + to V -> Cần phân từ bị động required."
  }
},
{
  "id": "test2_143",
  "num": 143,
  "source": "Test 2",
  "category": "Từ vựng & Trạng từ (Adverbs)",
  "question": "Sometime later, employees will meet ------- to discuss their work with their manager. These one-on-one meetings will give employees an opportunity to get useful feedback.",
  "options": {
    "A": "individually",
    "B": "simultaneously",
    "C": "impersonally",
    "D": "jointly"
  },
  "correctAnswer": "A",
  "explanation": "Câu tiếp theo có giải thích: \"These one-on-one meetings\" (các cuộc gặp mặt 1 kèm 1), do đó meet individually mang nghĩa gặp riêng từng người.",
  "tip": "⚡ MẸO: Manh mối câu kế tiếp: \"one-on-one meetings\" (gặp 1-1) = \"individually\" (riêng từng cá nhân).",
  "keywords": [
    "meet individually",
    "one-on-one meetings",
    "discuss"
  ],
  "vietnameseMeaning": "Sau đó, các nhân viên sẽ gặp riêng từng người để thảo luận về công việc với quản lý của họ.",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p6_eval",
    "title": "To: All Staff - Annual Employee Evaluations",
    "content": "To: All Staff\n\nThis is to remind all staff that the management is about to begin conducting the annual employee evaluations. I guess that most workers are already [141] with the evaluation process. However, for employees who are new to the company, let me outline the procedure here briefly.\n\nAll employees are [142] to fill out a self-assessment form and hand it in to their immediate supervisors by the end of the week. Sometime later, employees will meet [143] to discuss their work with their manager. These one-on-one meetings will give employees an opportunity to get useful feedback on their performance. Once the management team has finished writing up the evaluations, every employee will receive a copy of the official report.\n\nI hope that you all find this process to be a helpful learning experience.\n\nThank you.\nTerrence Webb\nPersonnel Director, Mason Investment",
    "vietnameseTranslation": "Gửi: Toàn thể nhân viên\nThông báo này nhắc nhở toàn thể nhân viên rằng ban quản lý sắp bắt đầu thực hiện các đợt đánh giá thường niên...",
    "clues": [
      {
        "questionNum": 141,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 1, dòng 2",
        "clueQuote": "already [familiar] with the evaluation process",
        "scanningTip": "Tìm giới từ with ngay sau chỗ trống để chọn familiar."
      },
      {
        "questionNum": 142,
        "correctAnswer": "C",
        "clueLocation": "Đoạn 2, dòng 1",
        "clueQuote": "are [required] to fill out a self-assessment form",
        "scanningTip": "Cấu trúc bị động: be required to V (được yêu cầu làm gì)."
      },
      {
        "questionNum": 143,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 2, dòng 3",
        "clueQuote": "meet [individually] ... These one-on-one meetings",
        "scanningTip": "Manh mối: \"one-on-one meetings\" (gặp 1-1) = meet individually (gặp riêng từng người)."
      }
    ]
  },
  "clue": {
    "questionNum": 143,
    "correctAnswer": "A",
    "clueLocation": "Đoạn 2, dòng 3",
    "clueQuote": "meet [individually] ... These one-on-one meetings",
    "scanningTip": "Tìm cụm \"one-on-one meetings\" ngay phía sau để đối chiếu nghĩa với individually."
  }
},
{
  "id": "test2_144",
  "num": 144,
  "source": "Test 2",
  "category": "Từ vựng & Cụm từ (Vocabulary & Collocations)",
  "question": "New York City officials announced yesterday that they are planning to ------- a child literacy campaign. The new \"Books for Kids\" program aims to improve children's reading skills.",
  "options": {
    "A": "launch",
    "B": "restrict",
    "C": "modify",
    "D": "scrutinize"
  },
  "correctAnswer": "A",
  "explanation": "Cụm cố định: \"launch a campaign / program\" = phát động/khởi chạy một chiến dịch/chương trình.",
  "tip": "⚡ MẸO: Thấy \"a campaign\" (chiến dịch) phía sau -> Chọn ngay \"launch\" (launch a campaign = phát động chiến dịch).",
  "keywords": [
    "planning to launch",
    "campaign",
    "program"
  ],
  "vietnameseMeaning": "Các quan chức thành phố New York hôm qua thông báo rằng họ đang lên kế hoạch phát động một chiến dịch xóa mù chữ cho trẻ em.",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p6_literacy",
    "title": "City Initiates Child Literacy Program",
    "content": "City Initiates Child Literacy Program\n\nNew York City officials announced yesterday that they are planning to [144] a child literacy campaign. The new \"Books for Kids\" program aims to improve children's reading skills. As part of the initiative, the city government will contribute over  million dollars to a library development fund. This will also be in [145] with a widespread publicity campaign raising awareness among parents about the importance of reading.\n\nThe city was compelled to act on this issue after a recent study showed children's reading skills to be declining. Many education experts believe that this decrease is a result of television shows and computer games replacing books [146] children's primary form of entertainment. Accordingly, the \"Books for Kids\" program is being brought in to reverse this worrying trend.",
    "vietnameseTranslation": "Thành phố khởi xướng chương trình đọc sách cho trẻ em\nCác quan chức NYC thông báo đang lên kế hoạch phát động chiến dịch...",
    "clues": [
      {
        "questionNum": 144,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 1, dòng 2",
        "clueQuote": "planning to [launch] a child literacy campaign",
        "scanningTip": "Tìm danh từ campaign phía sau để ghép cụm launch a campaign."
      },
      {
        "questionNum": 145,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 1, dòng 5",
        "clueQuote": "in [conjunction] with a widespread publicity campaign",
        "scanningTip": "Cụm cố định: in conjunction with (song song / kết hợp với)."
      },
      {
        "questionNum": 146,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 2, dòng 4",
        "clueQuote": "replacing books [as] children's primary form of entertainment",
        "scanningTip": "Cấu trúc: replace something AS something (thay thế cái gì như là...)."
      }
    ]
  },
  "clue": {
    "questionNum": 144,
    "correctAnswer": "A",
    "clueLocation": "Đoạn 1, dòng 2",
    "clueQuote": "planning to [launch] a child literacy campaign",
    "scanningTip": "Cụm từ: launch a campaign (phát động chiến dịch)."
  }
},
{
  "id": "test2_145",
  "num": 145,
  "source": "Test 2",
  "category": "Cụm từ cố định (Collocations)",
  "question": "This will also be in ------- with a widespread publicity campaign raising awareness among parents about the importance of reading.",
  "options": {
    "A": "consideration",
    "B": "conservation",
    "C": "conviction",
    "D": "conjunction"
  },
  "correctAnswer": "D",
  "explanation": "Cụm giới từ cố định: \"in conjunction with\" = kết hợp cùng với, song song với.",
  "tip": "⚡ MẸO: Thấy \"in ------- with\" -> Chọn ngay \"conjunction\" (cụm: in conjunction with = cùng với / kết hợp với).",
  "keywords": [
    "in conjunction with",
    "publicity campaign",
    "awareness"
  ],
  "vietnameseMeaning": "Điều này cũng sẽ được thực hiện song song với một chiến dịch tuyên truyền rộng rãi nhằm nâng cao nhận thức của phụ huynh.",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p6_literacy",
    "title": "City Initiates Child Literacy Program",
    "content": "City Initiates Child Literacy Program\n\nNew York City officials announced yesterday that they are planning to [144] a child literacy campaign. The new \"Books for Kids\" program aims to improve children's reading skills. As part of the initiative, the city government will contribute over  million dollars to a library development fund. This will also be in [145] with a widespread publicity campaign raising awareness among parents about the importance of reading.\n\nThe city was compelled to act on this issue after a recent study showed children's reading skills to be declining. Many education experts believe that this decrease is a result of television shows and computer games replacing books [146] children's primary form of entertainment. Accordingly, the \"Books for Kids\" program is being brought in to reverse this worrying trend.",
    "vietnameseTranslation": "Thành phố khởi xướng chương trình đọc sách cho trẻ em\nCác quan chức NYC thông báo đang lên kế hoạch phát động chiến dịch...",
    "clues": [
      {
        "questionNum": 144,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 1, dòng 2",
        "clueQuote": "planning to [launch] a child literacy campaign",
        "scanningTip": "Tìm danh từ campaign phía sau để ghép cụm launch a campaign."
      },
      {
        "questionNum": 145,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 1, dòng 5",
        "clueQuote": "in [conjunction] with a widespread publicity campaign",
        "scanningTip": "Cụm cố định: in conjunction with (song song / kết hợp với)."
      },
      {
        "questionNum": 146,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 2, dòng 4",
        "clueQuote": "replacing books [as] children's primary form of entertainment",
        "scanningTip": "Cấu trúc: replace something AS something (thay thế cái gì như là...)."
      }
    ]
  },
  "clue": {
    "questionNum": 145,
    "correctAnswer": "D",
    "clueLocation": "Đoạn 1, dòng 5",
    "clueQuote": "in [conjunction] with a widespread publicity campaign",
    "scanningTip": "Nhớ cấu trúc: in conjunction with."
  }
},
{
  "id": "test2_146",
  "num": 146,
  "source": "Test 2",
  "category": "Giới từ (Prepositions)",
  "question": "Many education experts believe that this decrease is a result of television shows and computer games replacing books ------- children's primary form of entertainment.",
  "options": {
    "A": "for",
    "B": "as",
    "C": "with",
    "D": "in"
  },
  "correctAnswer": "B",
  "explanation": "Cấu trúc \"replace X as Y\" = thay thế X với tư cách là / như là Y.",
  "tip": "⚡ MẸO: \"replacing books ------- form of entertainment\" -> Chọn \"as\" (thay thế sách như là hình thức giải trí chính).",
  "keywords": [
    "replacing books",
    "as",
    "primary form"
  ],
  "vietnameseMeaning": "Nhiều chuyên gia giáo dục tin rằng sự sụt giảm này là do các chương trình truyền hình và trò chơi máy tính thay thế sách như là hình thức giải trí chính của trẻ em.",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p6_literacy",
    "title": "City Initiates Child Literacy Program",
    "content": "City Initiates Child Literacy Program\n\nNew York City officials announced yesterday that they are planning to [144] a child literacy campaign. The new \"Books for Kids\" program aims to improve children's reading skills. As part of the initiative, the city government will contribute over  million dollars to a library development fund. This will also be in [145] with a widespread publicity campaign raising awareness among parents about the importance of reading.\n\nThe city was compelled to act on this issue after a recent study showed children's reading skills to be declining. Many education experts believe that this decrease is a result of television shows and computer games replacing books [146] children's primary form of entertainment. Accordingly, the \"Books for Kids\" program is being brought in to reverse this worrying trend.",
    "vietnameseTranslation": "Thành phố khởi xướng chương trình đọc sách cho trẻ em\nCác quan chức NYC thông báo đang lên kế hoạch phát động chiến dịch...",
    "clues": [
      {
        "questionNum": 144,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 1, dòng 2",
        "clueQuote": "planning to [launch] a child literacy campaign",
        "scanningTip": "Tìm danh từ campaign phía sau để ghép cụm launch a campaign."
      },
      {
        "questionNum": 145,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 1, dòng 5",
        "clueQuote": "in [conjunction] with a widespread publicity campaign",
        "scanningTip": "Cụm cố định: in conjunction with (song song / kết hợp với)."
      },
      {
        "questionNum": 146,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 2, dòng 4",
        "clueQuote": "replacing books [as] children's primary form of entertainment",
        "scanningTip": "Cấu trúc: replace something AS something (thay thế cái gì như là...)."
      }
    ]
  },
  "clue": {
    "questionNum": 146,
    "correctAnswer": "B",
    "clueLocation": "Đoạn 2, dòng 4",
    "clueQuote": "replacing books [as] children's primary form of entertainment",
    "scanningTip": "Tìm động từ replacing ở trước để điền as."
  }
},
{
  "id": "test2_147",
  "num": 147,
  "source": "Test 2",
  "category": "Giới từ (Prepositions)",
  "question": "Hotel chains have been ------- the first organizations to address this modern necessity, outfitting their rooms with Internet access.",
  "options": {
    "A": "along",
    "B": "at",
    "C": "away",
    "D": "among"
  },
  "correctAnswer": "D",
  "explanation": "Cụm \"among the first + danh từ số nhiều\" = nằm trong số những... đầu tiên.",
  "tip": "⚡ MẸO: Thấy \"have been ------- the first [plural noun]\" -> 100% chọn \"among\" (among the first organizations = trong số các tổ chức đầu tiên).",
  "keywords": [
    "have been among",
    "the first",
    "organizations"
  ],
  "vietnameseMeaning": "Các chuỗi khách sạn là một trong những tổ chức đầu tiên giải quyết nhu cầu hiện đại này bằng cách trang bị kết nối Internet trong phòng.",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p6_internet",
    "title": "Internet Access on Vacation & Hotel Services",
    "content": "As the Internet becomes more important in our lives, people are finding they can't bear to be away from their email for a few days even while on vacation. Hotel chains have been [147] the first organizations to address this modern necessity, outfitting their rooms with Internet access. Some hotels are even lending or renting notebook computers to guests.\n\nFor those who prefer something smaller, most new cell phones are equipped with web surfing capabilities. [148], that only works if you have your account set up for Internet access delivered by your local service provider. To solve that problem for people on the road, tourist spots in many countries now have cell phone booths. Overseas travelers can rent an online capable cell phone for the [149] of their trip, so they won't miss a single email.",
    "vietnameseTranslation": "Khi Internet ngày càng quan trọng, mọi người cảm thấy không thể rời xa email vài ngày ngay cả khi đi nghỉ. Các chuỗi khách sạn là một trong những nơi đầu tiên đáp ứng...",
    "clues": [
      {
        "questionNum": 147,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 1, dòng 3",
        "clueQuote": "have been [among] the first organizations",
        "scanningTip": "Cụm cố định: among the first + danh từ số nhiều."
      },
      {
        "questionNum": 148,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 2, dòng 2",
        "clueQuote": "[However], that only works if you have your account set up",
        "scanningTip": "Ý tương phản: điện thoại lướt web được, TUY NHIÊN chỉ hoạt động khi có đăng ký gói mạng."
      },
      {
        "questionNum": 149,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 2, dòng 6",
        "clueQuote": "for the [duration] of their trip",
        "scanningTip": "Cụm danh từ: for the duration of sth (trong suốt khoảng thời gian của...)."
      }
    ]
  },
  "clue": {
    "questionNum": 147,
    "correctAnswer": "D",
    "clueLocation": "Đoạn 1, dòng 3",
    "clueQuote": "have been [among] the first organizations",
    "scanningTip": "Cụm: among the first organizations (nằm trong số những tổ chức đầu tiên)."
  }
},
{
  "id": "test2_148",
  "num": 148,
  "source": "Test 2",
  "category": "Liên từ & Trạng từ liên kết (Transitions)",
  "question": "For those who prefer something smaller, most new cell phones are equipped with web surfing capabilities. -------, that only works if you have your account set up for Internet access delivered by your local service provider.",
  "options": {
    "A": "Therefore",
    "B": "However",
    "C": "Furthermore",
    "D": "Subsequently"
  },
  "correctAnswer": "B",
  "explanation": "Đầu câu có dấu phẩy mang tính tương phản: Điện thoại mới có khả năng lướt web, TUY NHIÊN điều đó chỉ hoạt động khi tài khoản đã đăng ký mạng.",
  "tip": "⚡ MẸO: Câu trước khen có chức năng, câu sau nêu rào cản/điều kiện ngặt nghèo (\"only works if...\") -> Chọn \"However\" (tuy nhiên).",
  "keywords": [
    "However",
    "only works if",
    "local provider"
  ],
  "vietnameseMeaning": "Tuy nhiên, điều đó chỉ hoạt động nếu bạn đã thiết lập tài khoản cho việc truy cập Internet từ nhà cung cấp dịch vụ địa phương.",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p6_internet",
    "title": "Internet Access on Vacation & Hotel Services",
    "content": "As the Internet becomes more important in our lives, people are finding they can't bear to be away from their email for a few days even while on vacation. Hotel chains have been [147] the first organizations to address this modern necessity, outfitting their rooms with Internet access. Some hotels are even lending or renting notebook computers to guests.\n\nFor those who prefer something smaller, most new cell phones are equipped with web surfing capabilities. [148], that only works if you have your account set up for Internet access delivered by your local service provider. To solve that problem for people on the road, tourist spots in many countries now have cell phone booths. Overseas travelers can rent an online capable cell phone for the [149] of their trip, so they won't miss a single email.",
    "vietnameseTranslation": "Khi Internet ngày càng quan trọng, mọi người cảm thấy không thể rời xa email vài ngày ngay cả khi đi nghỉ. Các chuỗi khách sạn là một trong những nơi đầu tiên đáp ứng...",
    "clues": [
      {
        "questionNum": 147,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 1, dòng 3",
        "clueQuote": "have been [among] the first organizations",
        "scanningTip": "Cụm cố định: among the first + danh từ số nhiều."
      },
      {
        "questionNum": 148,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 2, dòng 2",
        "clueQuote": "[However], that only works if you have your account set up",
        "scanningTip": "Ý tương phản: điện thoại lướt web được, TUY NHIÊN chỉ hoạt động khi có đăng ký gói mạng."
      },
      {
        "questionNum": 149,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 2, dòng 6",
        "clueQuote": "for the [duration] of their trip",
        "scanningTip": "Cụm danh từ: for the duration of sth (trong suốt khoảng thời gian của...)."
      }
    ]
  },
  "clue": {
    "questionNum": 148,
    "correctAnswer": "B",
    "clueLocation": "Đoạn 2, dòng 2",
    "clueQuote": "[However], that only works if you have your account set up",
    "scanningTip": "Nhận biết quan hệ tương phản giữa tính năng máy và điều kiện nhà mạng -> However."
  }
},
{
  "id": "test2_149",
  "num": 149,
  "source": "Test 2",
  "category": "Từ vựng & Cụm từ (Vocabulary & Collocations)",
  "question": "Overseas travelers can rent an online capable cell phone for the ------- of their trip, so they won't miss a single email.",
  "options": {
    "A": "duration",
    "B": "completion",
    "C": "itinerary",
    "D": "connection"
  },
  "correctAnswer": "A",
  "explanation": "Cụm danh từ: \"for the duration of their trip\" = trong suốt thời gian của chuyến đi.",
  "tip": "⚡ MẸO: Cụm cố định chỉ khoảng thời gian: \"for the duration of + N (trip / stay / project)\" -> Chọn ngay \"duration\"!",
  "keywords": [
    "duration of their trip",
    "rent",
    "travelers"
  ],
  "vietnameseMeaning": "Du khách quốc tế có thể thuê điện thoại có kết nối mạng trong suốt thời gian chuyến đi của mình để không bỏ lỡ email nào.",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p6_internet",
    "title": "Internet Access on Vacation & Hotel Services",
    "content": "As the Internet becomes more important in our lives, people are finding they can't bear to be away from their email for a few days even while on vacation. Hotel chains have been [147] the first organizations to address this modern necessity, outfitting their rooms with Internet access. Some hotels are even lending or renting notebook computers to guests.\n\nFor those who prefer something smaller, most new cell phones are equipped with web surfing capabilities. [148], that only works if you have your account set up for Internet access delivered by your local service provider. To solve that problem for people on the road, tourist spots in many countries now have cell phone booths. Overseas travelers can rent an online capable cell phone for the [149] of their trip, so they won't miss a single email.",
    "vietnameseTranslation": "Khi Internet ngày càng quan trọng, mọi người cảm thấy không thể rời xa email vài ngày ngay cả khi đi nghỉ. Các chuỗi khách sạn là một trong những nơi đầu tiên đáp ứng...",
    "clues": [
      {
        "questionNum": 147,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 1, dòng 3",
        "clueQuote": "have been [among] the first organizations",
        "scanningTip": "Cụm cố định: among the first + danh từ số nhiều."
      },
      {
        "questionNum": 148,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 2, dòng 2",
        "clueQuote": "[However], that only works if you have your account set up",
        "scanningTip": "Ý tương phản: điện thoại lướt web được, TUY NHIÊN chỉ hoạt động khi có đăng ký gói mạng."
      },
      {
        "questionNum": 149,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 2, dòng 6",
        "clueQuote": "for the [duration] of their trip",
        "scanningTip": "Cụm danh từ: for the duration of sth (trong suốt khoảng thời gian của...)."
      }
    ]
  },
  "clue": {
    "questionNum": 149,
    "correctAnswer": "A",
    "clueLocation": "Đoạn 2, dòng 6",
    "clueQuote": "for the [duration] of their trip",
    "scanningTip": "Nhớ cụm: for the duration of the trip (suốt chuyến đi)."
  }
},
{
  "id": "test2_150",
  "num": 150,
  "source": "Test 2",
  "category": "Từ vựng & Cụm từ (Vocabulary & Collocations)",
  "question": "Thank you for your email. I'm very glad to hear the construction of the Cape Town Emporium is ------- on schedule.",
  "options": {
    "A": "enhancing",
    "B": "proceeding",
    "C": "modifying",
    "D": "receding"
  },
  "correctAnswer": "B",
  "explanation": "Cụm cố định: \"proceed on schedule\" = tiến hành đúng tiến độ. enhance: nâng cao; modify: sửa đổi; recede: lùi xa.",
  "tip": "⚡ MẸO: Thấy \"construction / project\" + \"on schedule\" -> Chọn ngay \"proceeding\" (proceed on schedule = tiến hành đúng tiến độ).",
  "keywords": [
    "construction",
    "proceeding on schedule",
    "Cape Town"
  ],
  "vietnameseMeaning": "Cảm ơn email của bạn. Tôi rất vui khi biết công trình xây dựng Cape Town Emporium đang tiến hành đúng tiến độ.",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p6_capetown",
    "title": "Email: Cape Town Emporium Construction & Fixtures",
    "content": "To: dmahiangu@salc.com\nFrom: mflint@starlight.net\nSubject: Cape Town Emporium\n\nDear Mr. Mahlangu,\n\nThank you for your email. I'm very glad to hear the construction of the Cape Town Emporium is [150] on schedule.\n\nMy warehouse will soon ship a full assortment of Starlight Stationery products to our agent in Cape Town, and they will serve as the shop's initial inventory. Now we're just waiting for your [151] so that we can get underway. As soon as you give us the green light, we'll start on the shop's decorations, shelving, and other fixtures.\n\nOne area I'm concerned about is the delay of the parking lot's construction. I'm sure you'll agree the lot is critical to the success of this project, given its location in a district that has a limited number of parking spaces. Any information you can [152] me with regarding that situation will be appreciated.\n\nBest regards,\nMichael Flint\nDirector, Starlight Stationery",
    "vietnameseTranslation": "Gửi: Ông Mahlangu\nTừ: Michael Flint - Giám đốc Starlight Stationery\nCảm ơn bạn. Tôi rất vui vì tiến độ công trình đang diễn ra đúng kế hoạch...",
    "clues": [
      {
        "questionNum": 150,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 1, dòng 2",
        "clueQuote": "is [proceeding] on schedule",
        "scanningTip": "Cụm quen thuộc trong TOEIC: proceed on schedule."
      },
      {
        "questionNum": 151,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 2, dòng 3",
        "clueQuote": "waiting for your [confirmation] ... give us the green light",
        "scanningTip": "Cụm \"waiting for your confirmation\" = chờ bạn xác nhận / bật đèn xanh."
      },
      {
        "questionNum": 152,
        "correctAnswer": "C",
        "clueLocation": "Đoạn 3, dòng 5",
        "clueQuote": "Any information you can [provide] me with",
        "scanningTip": "Cấu trúc quen thuộc: provide somebody with something."
      }
    ]
  },
  "clue": {
    "questionNum": 150,
    "correctAnswer": "B",
    "clueLocation": "Đoạn 1, dòng 2",
    "clueQuote": "is [proceeding] on schedule",
    "scanningTip": "Cụm cố định: proceed on schedule (diễn ra đúng tiến độ)."
  }
},
{
  "id": "test2_151",
  "num": 151,
  "source": "Test 2",
  "category": "Từ vựng (Vocabulary)",
  "question": "Now we're just waiting for your ------- so that we can get underway. As soon as you give us the green light, we'll start on the shop's decorations.",
  "options": {
    "A": "contemplation",
    "B": "confirmation",
    "C": "concentration",
    "D": "condemnation"
  },
  "correctAnswer": "B",
  "explanation": "Câu tiếp theo có giải thích: \"give us the green light\" (bật đèn xanh cho phép), nghĩa là đang chờ sự xác nhận (confirmation).",
  "tip": "⚡ MẸO: Manh mối câu kế tiếp: \"give us the green light\" (cho phép) -> Chọn \"confirmation\" (sự xác nhận / phê duyệt).",
  "keywords": [
    "waiting for your confirmation",
    "green light",
    "underway"
  ],
  "vietnameseMeaning": "Bây giờ chúng tôi chỉ đang chờ sự xác nhận của bạn để có thể bắt đầu triển khai.",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p6_capetown",
    "title": "Email: Cape Town Emporium Construction & Fixtures",
    "content": "To: dmahiangu@salc.com\nFrom: mflint@starlight.net\nSubject: Cape Town Emporium\n\nDear Mr. Mahlangu,\n\nThank you for your email. I'm very glad to hear the construction of the Cape Town Emporium is [150] on schedule.\n\nMy warehouse will soon ship a full assortment of Starlight Stationery products to our agent in Cape Town, and they will serve as the shop's initial inventory. Now we're just waiting for your [151] so that we can get underway. As soon as you give us the green light, we'll start on the shop's decorations, shelving, and other fixtures.\n\nOne area I'm concerned about is the delay of the parking lot's construction. I'm sure you'll agree the lot is critical to the success of this project, given its location in a district that has a limited number of parking spaces. Any information you can [152] me with regarding that situation will be appreciated.\n\nBest regards,\nMichael Flint\nDirector, Starlight Stationery",
    "vietnameseTranslation": "Gửi: Ông Mahlangu\nTừ: Michael Flint - Giám đốc Starlight Stationery\nCảm ơn bạn. Tôi rất vui vì tiến độ công trình đang diễn ra đúng kế hoạch...",
    "clues": [
      {
        "questionNum": 150,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 1, dòng 2",
        "clueQuote": "is [proceeding] on schedule",
        "scanningTip": "Cụm quen thuộc trong TOEIC: proceed on schedule."
      },
      {
        "questionNum": 151,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 2, dòng 3",
        "clueQuote": "waiting for your [confirmation] ... give us the green light",
        "scanningTip": "Cụm \"waiting for your confirmation\" = chờ bạn xác nhận / bật đèn xanh."
      },
      {
        "questionNum": 152,
        "correctAnswer": "C",
        "clueLocation": "Đoạn 3, dòng 5",
        "clueQuote": "Any information you can [provide] me with",
        "scanningTip": "Cấu trúc quen thuộc: provide somebody with something."
      }
    ]
  },
  "clue": {
    "questionNum": 151,
    "correctAnswer": "B",
    "clueLocation": "Đoạn 2, dòng 3",
    "clueQuote": "waiting for your [confirmation] ... give us the green light",
    "scanningTip": "Tìm từ \"green light\" câu sau để suy ra confirmation."
  }
},
{
  "id": "test2_152",
  "num": 152,
  "source": "Test 2",
  "category": "Động từ & Cấu trúc đi kèm (Verb Patterns)",
  "question": "Any information you can ------- me with regarding that situation will be appreciated.",
  "options": {
    "A": "solicit",
    "B": "acquire",
    "C": "provide",
    "D": "deliver"
  },
  "correctAnswer": "C",
  "explanation": "Cấu trúc cố định: \"provide somebody with something\" = cung cấp cho ai cái gì. solicit: xin xỏ; acquire: mua được/thu được; deliver sth to sb.",
  "tip": "⚡ MẸO: Thấy tân ngữ \"me\" + giới từ \"with\" -> 100% cấu trúc: \"provide sb with sth\" (cung cấp cho tôi cái gì).",
  "keywords": [
    "provide me with",
    "information",
    "appreciated"
  ],
  "vietnameseMeaning": "Bất kỳ thông tin nào bạn có thể cung cấp cho tôi liên quan đến tình hình đó đều sẽ được đánh giá cao.",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p6_capetown",
    "title": "Email: Cape Town Emporium Construction & Fixtures",
    "content": "To: dmahiangu@salc.com\nFrom: mflint@starlight.net\nSubject: Cape Town Emporium\n\nDear Mr. Mahlangu,\n\nThank you for your email. I'm very glad to hear the construction of the Cape Town Emporium is [150] on schedule.\n\nMy warehouse will soon ship a full assortment of Starlight Stationery products to our agent in Cape Town, and they will serve as the shop's initial inventory. Now we're just waiting for your [151] so that we can get underway. As soon as you give us the green light, we'll start on the shop's decorations, shelving, and other fixtures.\n\nOne area I'm concerned about is the delay of the parking lot's construction. I'm sure you'll agree the lot is critical to the success of this project, given its location in a district that has a limited number of parking spaces. Any information you can [152] me with regarding that situation will be appreciated.\n\nBest regards,\nMichael Flint\nDirector, Starlight Stationery",
    "vietnameseTranslation": "Gửi: Ông Mahlangu\nTừ: Michael Flint - Giám đốc Starlight Stationery\nCảm ơn bạn. Tôi rất vui vì tiến độ công trình đang diễn ra đúng kế hoạch...",
    "clues": [
      {
        "questionNum": 150,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 1, dòng 2",
        "clueQuote": "is [proceeding] on schedule",
        "scanningTip": "Cụm quen thuộc trong TOEIC: proceed on schedule."
      },
      {
        "questionNum": 151,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 2, dòng 3",
        "clueQuote": "waiting for your [confirmation] ... give us the green light",
        "scanningTip": "Cụm \"waiting for your confirmation\" = chờ bạn xác nhận / bật đèn xanh."
      },
      {
        "questionNum": 152,
        "correctAnswer": "C",
        "clueLocation": "Đoạn 3, dòng 5",
        "clueQuote": "Any information you can [provide] me with",
        "scanningTip": "Cấu trúc quen thuộc: provide somebody with something."
      }
    ]
  },
  "clue": {
    "questionNum": 152,
    "correctAnswer": "C",
    "clueLocation": "Đoạn 3, dòng 5",
    "clueQuote": "Any information you can [provide] me with",
    "scanningTip": "Nhớ cấu trúc: provide sb with sth."
  }
}
,
{
  "id": "test2_153",
  "num": 153,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "By when should authorization be received from contributors?",
  "options": {
    "A": "November 1",
    "B": "November 15",
    "C": "December 1",
    "D": "December 23"
  },
  "correctAnswer": "B",
  "explanation": "Dòng 'November 15: Contact poets for permission to include work'. Xin phép các nhà thơ (poets) chính là nhận sự cho phép từ người đóng góp (authorization from contributors).",
  "tip": "⚡ MẸO: 'authorization from contributors' = 'permission' từ các nhà thơ (poets) -> Chọn ngày 15/11.",
  "keywords": [
    "November 15",
    "permission",
    "authorization"
  ],
  "vietnameseMeaning": "Trước thời điểm nào thì cần nhận được sự cho phép từ những người đóng góp?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_poems",
  "passageInfo": {
    "id": "test2_p7_poems",
    "title": "Lịch Trình Dự Án Tuyển Tập Thơ 2007 - Johnson Literary Publishers",
    "content": "Johnson Literary Publishers\n\nProject Title: 50 Best Poems of 2007\nProject Head: Elizabeth Rosinski\nWorking Deadline: January 1, 2008\n\nPhase Deadlines:\nNovember 1: Complete search for poems to be included\nNovember 15: Contact poets for permission to include work\nNovember 23: Finalize book layout\nDecember 1: Arrange cover design and promotion plan with marketing team\nDecember 23: Submit final version to vice president for approval\nJanuary 1: Send proof with instructions to printers",
    "vietnameseTranslation": "Nhà xuất bản Văn học Johnson\n\nTên dự án: 50 Bài thơ hay nhất năm 2007\nTrưởng dự án: Elizabeth Rosinski\nHạn chót công việc: 1 tháng 1, 2008\n\nThời hạn từng giai đoạn:\n1 tháng 11: Hoàn thành tìm kiếm các bài thơ sẽ đưa vào sách\n15 tháng 11: Liên hệ các nhà thơ để xin phép sử dụng tác phẩm\n23 tháng 11: Hoàn thiện bố cục sách\n1 tháng 12: Sắp xếp thiết kế bìa và kế hoạch quảng bá với đội ngũ marketing\n23 tháng 12: Nộp bản cuối cho phó chủ tịch phê duyệt\n1 tháng 1: Gửi bản in thử kèm hướng dẫn cho nhà in",
    "questionIds": [
      "test2_153",
      "test2_154"
    ],
    "clues": [
      {
        "questionNum": 153,
        "correctAnswer": "B",
        "clueLocation": "Dòng 5",
        "clueQuote": "November 15: Contact poets for permission to include work",
        "scanningTip": "Tìm từ 'permission' tương đương với 'authorization'."
      },
      {
        "questionNum": 154,
        "correctAnswer": "B",
        "clueLocation": "Dòng 8",
        "clueQuote": "December 23: Submit final version to vice president for approval",
        "scanningTip": "Sau mốc 1/12 (promotion plan) là ngày 23/12 nộp cho phó chủ tịch (an executive)."
      }
    ]
  },
  "clue": {
    "questionNum": 153,
    "correctAnswer": "B",
    "clueLocation": "Dòng 5",
    "clueQuote": "November 15: Contact poets for permission to include work",
    "scanningTip": "Tìm từ 'permission' tương đương với 'authorization'."
  }
},
{
  "id": "test2_154",
  "num": 154,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "What will be done after the advertising plan is created?",
  "options": {
    "A": "The layout of the book will be decided.",
    "B": "An executive will review the project.",
    "C": "The printed books will be sent to stores.",
    "D": "A list of poems will be compiled."
  },
  "correctAnswer": "B",
  "explanation": "Sau khi lập kế hoạch quảng cáo (promotion plan - 1/12), bước tiếp theo vào ngày 23/12 là nộp bản cuối cho Phó chủ tịch (vice president = an executive) phê duyệt (approval = review).",
  "tip": "⚡ MẸO: Sau 1/12 là ngày 23/12 'Submit final version to vice president for approval' -> 'vice president' là 'an executive' (lãnh đạo).",
  "keywords": [
    "December 23",
    "vice president",
    "executive",
    "approval"
  ],
  "vietnameseMeaning": "Điều gì sẽ được thực hiện sau khi kế hoạch quảng cáo được tạo ra?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_poems",
  "passageInfo": {
    "id": "test2_p7_poems",
    "title": "Lịch Trình Dự Án Tuyển Tập Thơ 2007 - Johnson Literary Publishers",
    "content": "Johnson Literary Publishers\n\nProject Title: 50 Best Poems of 2007\nProject Head: Elizabeth Rosinski\nWorking Deadline: January 1, 2008\n\nPhase Deadlines:\nNovember 1: Complete search for poems to be included\nNovember 15: Contact poets for permission to include work\nNovember 23: Finalize book layout\nDecember 1: Arrange cover design and promotion plan with marketing team\nDecember 23: Submit final version to vice president for approval\nJanuary 1: Send proof with instructions to printers",
    "vietnameseTranslation": "Nhà xuất bản Văn học Johnson\n\nTên dự án: 50 Bài thơ hay nhất năm 2007\nTrưởng dự án: Elizabeth Rosinski\nHạn chót công việc: 1 tháng 1, 2008\n\nThời hạn từng giai đoạn:\n1 tháng 11: Hoàn thành tìm kiếm các bài thơ sẽ đưa vào sách\n15 tháng 11: Liên hệ các nhà thơ để xin phép sử dụng tác phẩm\n23 tháng 11: Hoàn thiện bố cục sách\n1 tháng 12: Sắp xếp thiết kế bìa và kế hoạch quảng bá với đội ngũ marketing\n23 tháng 12: Nộp bản cuối cho phó chủ tịch phê duyệt\n1 tháng 1: Gửi bản in thử kèm hướng dẫn cho nhà in",
    "questionIds": [
      "test2_153",
      "test2_154"
    ],
    "clues": [
      {
        "questionNum": 153,
        "correctAnswer": "B",
        "clueLocation": "Dòng 5",
        "clueQuote": "November 15: Contact poets for permission to include work",
        "scanningTip": "Tìm từ 'permission' tương đương với 'authorization'."
      },
      {
        "questionNum": 154,
        "correctAnswer": "B",
        "clueLocation": "Dòng 8",
        "clueQuote": "December 23: Submit final version to vice president for approval",
        "scanningTip": "Sau mốc 1/12 (promotion plan) là ngày 23/12 nộp cho phó chủ tịch (an executive)."
      }
    ]
  },
  "clue": {
    "questionNum": 154,
    "correctAnswer": "B",
    "clueLocation": "Dòng 8",
    "clueQuote": "December 23: Submit final version to vice president for approval",
    "scanningTip": "Sau mốc 1/12 (promotion plan) là ngày 23/12 nộp cho phó chủ tịch (an executive)."
  }
},
{
  "id": "test2_155",
  "num": 155,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "Why was this letter written?",
  "options": {
    "A": "To inquire about an event facility",
    "B": "To offer a job to a qualified candidate",
    "C": "To thank an event organizer for his help",
    "D": "To cancel the participation in the job fair"
  },
  "correctAnswer": "C",
  "explanation": "Đoạn 1: 'express our gratitude for the work you did to organize last month's job fair' (cảm ơn người tổ chức hội chợ việc làm).",
  "tip": "⚡ MẸO: Thấy 'express our gratitude' = cảm ơn (thank an event organizer).",
  "keywords": [
    "express our gratitude",
    "organize",
    "thank"
  ],
  "vietnameseMeaning": "Tại sao bức thư này được viết?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_bby_fair",
  "passageInfo": {
    "id": "test2_p7_bby_fair",
    "title": "Thư Cảm Ơn Ban Tổ Chức Hội Chợ Việc Làm - BBY Technologies",
    "content": "Tammy Komo\nDavidson Conference Hall\n3005 Congress St.\nDavidson, AL\n\nDear Mr. Komo,\n\nOn behalf of my company, BBY Technologies, I would like to express our gratitude for the work you did to organize last month's job fair. We have participated in such events at the Davidson Conference Hall in past years, but this one was by far our most successful.\n\nOrdinarily, it is difficult for our firm to find qualified technicians to fill our positions. However, the advertising you did attracted many desirable candidates to the event. We have already filled over 80% of our open positions with recruits from the job fair.\n\nDue to the tremendous success of this year's event, I can assure you that BBY Technologies will participate again next year. Our projected growth for the coming year makes me believe that we will again be in need of more highly skilled technicians. I am sure you will also help us find them.\n\nRavi Miller\nHuman Resources\nBBY Technologies",
    "vietnameseTranslation": "Tammy Komo\nTrung tâm Hội nghị Davidson\n3005 Đường Congress\nDavidson, AL\n\nKính gửi ông Komo,\n\nThay mặt công ty tôi, BBY Technologies, tôi xin bày tỏ lòng biết ơn sâu sắc đối với công tác tổ chức hội chợ việc làm tháng trước của ông. Chúng tôi đã từng tham gia các sự kiện như vậy tại Trung tâm Hội nghị Davidson những năm trước, nhưng lần này là thành công nhất từ trước đến nay.\n\nThông thường, công ty chúng tôi rất khó tìm được các kỹ thuật viên đủ tiêu chuẩn để đảm nhận các vị trí. Tuy nhiên, hoạt động quảng cáo của ông đã thu hút rất nhiều ứng viên sáng giá. Chúng tôi đã tuyển dụng được hơn 80% số vị trí còn trống từ các ứng viên tại hội chợ việc làm.\n\nNhờ thành công vang dội của sự kiện năm nay, tôi khẳng định BBY Technologies sẽ tiếp tục tham gia vào năm tới. Dự báo tăng trưởng của chúng tôi trong năm tới khiến tôi tin rằng chúng tôi sẽ tiếp tục cần thêm nhiều kỹ thuật viên tay nghề cao. Tôi tin chắc ông cũng sẽ giúp chúng tôi tìm kiếm họ.\n\nRavi Miller\nPhòng Nhân sự\nBBY Technologies",
    "questionIds": [
      "test2_155",
      "test2_156",
      "test2_157"
    ],
    "clues": [
      {
        "questionNum": 155,
        "correctAnswer": "C",
        "clueLocation": "Đoạn 1, dòng 2-3",
        "clueQuote": "express our gratitude for the work you did to organize last month's job fair",
        "scanningTip": "Tìm từ khóa 'express gratitude' ở đoạn đầu thư."
      },
      {
        "questionNum": 156,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 2, dòng 3-4",
        "clueQuote": "We have already filled over 80% of our open positions with recruits from the job fair.",
        "scanningTip": "Tìm số liệu 80% và cụm 'filled open positions'."
      },
      {
        "questionNum": 157,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 3, dòng 2-3",
        "clueQuote": "Our projected growth for the coming year makes me believe that we will again be in need of more highly skilled technicians.",
        "scanningTip": "Tìm cụm 'projected growth' = expects to expand."
      }
    ]
  },
  "clue": {
    "questionNum": 155,
    "correctAnswer": "C",
    "clueLocation": "Đoạn 1, dòng 2-3",
    "clueQuote": "express our gratitude for the work you did to organize last month's job fair",
    "scanningTip": "Tìm từ khóa 'express gratitude' ở đoạn đầu thư."
  }
},
{
  "id": "test2_156",
  "num": 156,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "What happened after the job fair?",
  "options": {
    "A": "Mr. Komo received a promotion.",
    "B": "Mr. Miller dismissed some technicians.",
    "C": "The Davidson Conference Hall was closed.",
    "D": "BBY Technologies hired many workers."
  },
  "correctAnswer": "D",
  "explanation": "Đoạn 2: 'filled over 80% of our open positions with recruits from the job fair' (tuyển được hơn 80% vị trí trống = BBY Technologies hired many workers).",
  "tip": "⚡ MẸO: 'filled over 80% of open positions' = 'hired many workers'.",
  "keywords": [
    "filled over 80%",
    "recruits",
    "hired many workers"
  ],
  "vietnameseMeaning": "Điều gì đã diễn ra sau hội chợ việc làm?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_bby_fair",
  "passageInfo": {
    "id": "test2_p7_bby_fair",
    "title": "Thư Cảm Ơn Ban Tổ Chức Hội Chợ Việc Làm - BBY Technologies",
    "content": "Tammy Komo\nDavidson Conference Hall\n3005 Congress St.\nDavidson, AL\n\nDear Mr. Komo,\n\nOn behalf of my company, BBY Technologies, I would like to express our gratitude for the work you did to organize last month's job fair. We have participated in such events at the Davidson Conference Hall in past years, but this one was by far our most successful.\n\nOrdinarily, it is difficult for our firm to find qualified technicians to fill our positions. However, the advertising you did attracted many desirable candidates to the event. We have already filled over 80% of our open positions with recruits from the job fair.\n\nDue to the tremendous success of this year's event, I can assure you that BBY Technologies will participate again next year. Our projected growth for the coming year makes me believe that we will again be in need of more highly skilled technicians. I am sure you will also help us find them.\n\nRavi Miller\nHuman Resources\nBBY Technologies",
    "vietnameseTranslation": "Tammy Komo\nTrung tâm Hội nghị Davidson\n3005 Đường Congress\nDavidson, AL\n\nKính gửi ông Komo,\n\nThay mặt công ty tôi, BBY Technologies, tôi xin bày tỏ lòng biết ơn sâu sắc đối với công tác tổ chức hội chợ việc làm tháng trước của ông. Chúng tôi đã từng tham gia các sự kiện như vậy tại Trung tâm Hội nghị Davidson những năm trước, nhưng lần này là thành công nhất từ trước đến nay.\n\nThông thường, công ty chúng tôi rất khó tìm được các kỹ thuật viên đủ tiêu chuẩn để đảm nhận các vị trí. Tuy nhiên, hoạt động quảng cáo của ông đã thu hút rất nhiều ứng viên sáng giá. Chúng tôi đã tuyển dụng được hơn 80% số vị trí còn trống từ các ứng viên tại hội chợ việc làm.\n\nNhờ thành công vang dội của sự kiện năm nay, tôi khẳng định BBY Technologies sẽ tiếp tục tham gia vào năm tới. Dự báo tăng trưởng của chúng tôi trong năm tới khiến tôi tin rằng chúng tôi sẽ tiếp tục cần thêm nhiều kỹ thuật viên tay nghề cao. Tôi tin chắc ông cũng sẽ giúp chúng tôi tìm kiếm họ.\n\nRavi Miller\nPhòng Nhân sự\nBBY Technologies",
    "questionIds": [
      "test2_155",
      "test2_156",
      "test2_157"
    ],
    "clues": [
      {
        "questionNum": 155,
        "correctAnswer": "C",
        "clueLocation": "Đoạn 1, dòng 2-3",
        "clueQuote": "express our gratitude for the work you did to organize last month's job fair",
        "scanningTip": "Tìm từ khóa 'express gratitude' ở đoạn đầu thư."
      },
      {
        "questionNum": 156,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 2, dòng 3-4",
        "clueQuote": "We have already filled over 80% of our open positions with recruits from the job fair.",
        "scanningTip": "Tìm số liệu 80% và cụm 'filled open positions'."
      },
      {
        "questionNum": 157,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 3, dòng 2-3",
        "clueQuote": "Our projected growth for the coming year makes me believe that we will again be in need of more highly skilled technicians.",
        "scanningTip": "Tìm cụm 'projected growth' = expects to expand."
      }
    ]
  },
  "clue": {
    "questionNum": 156,
    "correctAnswer": "D",
    "clueLocation": "Đoạn 2, dòng 3-4",
    "clueQuote": "We have already filled over 80% of our open positions with recruits from the job fair.",
    "scanningTip": "Tìm số liệu 80% và cụm 'filled open positions'."
  }
},
{
  "id": "test2_157",
  "num": 157,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "What does Mr. Miller say about his company?",
  "options": {
    "A": "It will advertise more widely next year.",
    "B": "It will not attend the job fair in the future.",
    "C": "It provides intensive training to fair employees.",
    "D": "It expects to expand over the next year."
  },
  "correctAnswer": "D",
  "explanation": "Đoạn 3: 'Our projected growth for the coming year makes me believe that we will again be in need of more highly skilled technicians' (tăng trưởng dự báo = kỳ vọng mở rộng trong năm tới).",
  "tip": "⚡ MẸO: 'projected growth' (tăng trưởng dự kiến) = 'expects to expand' (mở rộng).",
  "keywords": [
    "projected growth",
    "coming year",
    "expand"
  ],
  "vietnameseMeaning": "Ông Miller nói gì về công ty của mình?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_bby_fair",
  "passageInfo": {
    "id": "test2_p7_bby_fair",
    "title": "Thư Cảm Ơn Ban Tổ Chức Hội Chợ Việc Làm - BBY Technologies",
    "content": "Tammy Komo\nDavidson Conference Hall\n3005 Congress St.\nDavidson, AL\n\nDear Mr. Komo,\n\nOn behalf of my company, BBY Technologies, I would like to express our gratitude for the work you did to organize last month's job fair. We have participated in such events at the Davidson Conference Hall in past years, but this one was by far our most successful.\n\nOrdinarily, it is difficult for our firm to find qualified technicians to fill our positions. However, the advertising you did attracted many desirable candidates to the event. We have already filled over 80% of our open positions with recruits from the job fair.\n\nDue to the tremendous success of this year's event, I can assure you that BBY Technologies will participate again next year. Our projected growth for the coming year makes me believe that we will again be in need of more highly skilled technicians. I am sure you will also help us find them.\n\nRavi Miller\nHuman Resources\nBBY Technologies",
    "vietnameseTranslation": "Tammy Komo\nTrung tâm Hội nghị Davidson\n3005 Đường Congress\nDavidson, AL\n\nKính gửi ông Komo,\n\nThay mặt công ty tôi, BBY Technologies, tôi xin bày tỏ lòng biết ơn sâu sắc đối với công tác tổ chức hội chợ việc làm tháng trước của ông. Chúng tôi đã từng tham gia các sự kiện như vậy tại Trung tâm Hội nghị Davidson những năm trước, nhưng lần này là thành công nhất từ trước đến nay.\n\nThông thường, công ty chúng tôi rất khó tìm được các kỹ thuật viên đủ tiêu chuẩn để đảm nhận các vị trí. Tuy nhiên, hoạt động quảng cáo của ông đã thu hút rất nhiều ứng viên sáng giá. Chúng tôi đã tuyển dụng được hơn 80% số vị trí còn trống từ các ứng viên tại hội chợ việc làm.\n\nNhờ thành công vang dội của sự kiện năm nay, tôi khẳng định BBY Technologies sẽ tiếp tục tham gia vào năm tới. Dự báo tăng trưởng của chúng tôi trong năm tới khiến tôi tin rằng chúng tôi sẽ tiếp tục cần thêm nhiều kỹ thuật viên tay nghề cao. Tôi tin chắc ông cũng sẽ giúp chúng tôi tìm kiếm họ.\n\nRavi Miller\nPhòng Nhân sự\nBBY Technologies",
    "questionIds": [
      "test2_155",
      "test2_156",
      "test2_157"
    ],
    "clues": [
      {
        "questionNum": 155,
        "correctAnswer": "C",
        "clueLocation": "Đoạn 1, dòng 2-3",
        "clueQuote": "express our gratitude for the work you did to organize last month's job fair",
        "scanningTip": "Tìm từ khóa 'express gratitude' ở đoạn đầu thư."
      },
      {
        "questionNum": 156,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 2, dòng 3-4",
        "clueQuote": "We have already filled over 80% of our open positions with recruits from the job fair.",
        "scanningTip": "Tìm số liệu 80% và cụm 'filled open positions'."
      },
      {
        "questionNum": 157,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 3, dòng 2-3",
        "clueQuote": "Our projected growth for the coming year makes me believe that we will again be in need of more highly skilled technicians.",
        "scanningTip": "Tìm cụm 'projected growth' = expects to expand."
      }
    ]
  },
  "clue": {
    "questionNum": 157,
    "correctAnswer": "D",
    "clueLocation": "Đoạn 3, dòng 2-3",
    "clueQuote": "Our projected growth for the coming year makes me believe that we will again be in need of more highly skilled technicians.",
    "scanningTip": "Tìm cụm 'projected growth' = expects to expand."
  }
},
{
  "id": "test2_158",
  "num": 158,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "Why is the store owner changing the hours of operation?",
  "options": {
    "A": "To fit in with the quiet season",
    "B": "To reduce staff expenses",
    "C": "To prepare for their peak period",
    "D": "To meet customer demand"
  },
  "correctAnswer": "A",
  "explanation": "Đoạn 2: 'decided it's time to slow down and relax a little in the off-season' (mùa thấp điểm/mùa vắng khách = quiet season).",
  "tip": "⚡ MẸO: 'off-season' (mùa vắng khách) đồng nghĩa với 'quiet season'.",
  "keywords": [
    "off-season",
    "quiet season"
  ],
  "vietnameseMeaning": "Tại sao chủ cửa hàng lại thay đổi giờ hoạt động?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_summer_shack",
  "passageInfo": {
    "id": "test2_p7_summer_shack",
    "title": "Thông Báo Giờ Mở Cửa - Quán Kem & Sữa Lắc Summer Shack",
    "content": "Dear Summer Shack Customers,\n\nFor the first time ever, the Summer Shack is opening for limited hours on May 1: 11:00 am - 6:30 pm Monday through Friday, and 10:00 am - 7:00 pm on weekends.\n\nWe've been providing local people with delicious milkshakes, ice cream, and frozen yogurt cones for over 25 years. After so many years of honest service, we've decided it's time to slow down and relax a little in the off-season.\n\nBut don't worry, we'll be back to business as usual in time for our busy summer period. On June 1, we'll resume our ordinary hours of business: 10:00 am - 8:30 pm Monday through Friday, and 9:00 am - 10:30 pm on weekends.\n\nWe look forward to seeing all of our customers in store soon. If you've never tried a Summer Shack product, you don't know what you're missing in summer. Summer Shack is the taste of summer!\n\nSummer Shack Owner",
    "vietnameseTranslation": "Kính gửi Quý khách hàng của Summer Shack,\n\nLần đầu tiên trong lịch sử, Summer Shack sẽ mở cửa với khung giờ giới hạn từ ngày 1 tháng 5: 11:00 sáng - 6:30 chiều từ Thứ Hai đến Thứ Sáu, và 10:00 sáng - 7:00 tối vào cuối tuần.\n\nChúng tôi đã phục vụ người dân địa phương những món sữa lắc thơm ngon, kem và kem ốc quế sữa chua đông lạnh suốt hơn 25 năm qua. Sau nhiều năm phục vụ tận tâm, chúng tôi quyết định đã đến lúc sống chậm lại và nghỉ ngơi một chút trong mùa thấp điểm (off-season).\n\nNhưng đừng lo, chúng tôi sẽ trở lại hoạt động bình thường đúng vào mùa hè bận rộn. Từ ngày 1 tháng 6, chúng tôi sẽ khôi phục giờ mở cửa bình thường: 10:00 sáng - 8:30 tối từ Thứ Hai đến Thứ Sáu, và 9:00 sáng - 10:30 tối vào cuối tuần.\n\nRất mong được sớm gặp lại quý khách tại cửa hàng.\n\nChủ quán Summer Shack",
    "questionIds": [
      "test2_158",
      "test2_159"
    ],
    "clues": [
      {
        "questionNum": 158,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 2, dòng 2-3",
        "clueQuote": "we've decided it's time to slow down and relax a little in the off-season.",
        "scanningTip": "Tìm từ 'off-season' (mùa vắng khách) tương đương 'quiet season'."
      },
      {
        "questionNum": 159,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 3, dòng 2-3",
        "clueQuote": "10:00 am - 8:30 pm Monday through Friday",
        "scanningTip": "Nhìn mốc ngày 'June 1' và đối chiếu giờ đóng cửa ngày trong tuần (Monday through Friday)."
      }
    ]
  },
  "clue": {
    "questionNum": 158,
    "correctAnswer": "A",
    "clueLocation": "Đoạn 2, dòng 2-3",
    "clueQuote": "we've decided it's time to slow down and relax a little in the off-season.",
    "scanningTip": "Tìm từ 'off-season' (mùa vắng khách) tương đương 'quiet season'."
  }
},
{
  "id": "test2_159",
  "num": 159,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "When will the Summer Shack close during the week starting June 1?",
  "options": {
    "A": "6:30",
    "B": "8:30",
    "C": "9:00",
    "D": "10:30"
  },
  "correctAnswer": "B",
  "explanation": "Đoạn 3: 'On June 1, we'll resume our ordinary hours of business: 10:00 am - 8:30 pm Monday through Friday' -> ngày trong tuần (during the week) đóng cửa lúc 8:30 tối.",
  "tip": "⚡ MẸO: 'during the week' là các ngày trong tuần (Mon-Fri) -> nhìn vào mốc đóng cửa 8:30 pm.",
  "keywords": [
    "June 1",
    "Monday through Friday",
    "8:30 pm"
  ],
  "vietnameseMeaning": "Summer Shack sẽ đóng cửa lúc mấy giờ trong các ngày trong tuần kể từ ngày 1 tháng 6?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_summer_shack",
  "passageInfo": {
    "id": "test2_p7_summer_shack",
    "title": "Thông Báo Giờ Mở Cửa - Quán Kem & Sữa Lắc Summer Shack",
    "content": "Dear Summer Shack Customers,\n\nFor the first time ever, the Summer Shack is opening for limited hours on May 1: 11:00 am - 6:30 pm Monday through Friday, and 10:00 am - 7:00 pm on weekends.\n\nWe've been providing local people with delicious milkshakes, ice cream, and frozen yogurt cones for over 25 years. After so many years of honest service, we've decided it's time to slow down and relax a little in the off-season.\n\nBut don't worry, we'll be back to business as usual in time for our busy summer period. On June 1, we'll resume our ordinary hours of business: 10:00 am - 8:30 pm Monday through Friday, and 9:00 am - 10:30 pm on weekends.\n\nWe look forward to seeing all of our customers in store soon. If you've never tried a Summer Shack product, you don't know what you're missing in summer. Summer Shack is the taste of summer!\n\nSummer Shack Owner",
    "vietnameseTranslation": "Kính gửi Quý khách hàng của Summer Shack,\n\nLần đầu tiên trong lịch sử, Summer Shack sẽ mở cửa với khung giờ giới hạn từ ngày 1 tháng 5: 11:00 sáng - 6:30 chiều từ Thứ Hai đến Thứ Sáu, và 10:00 sáng - 7:00 tối vào cuối tuần.\n\nChúng tôi đã phục vụ người dân địa phương những món sữa lắc thơm ngon, kem và kem ốc quế sữa chua đông lạnh suốt hơn 25 năm qua. Sau nhiều năm phục vụ tận tâm, chúng tôi quyết định đã đến lúc sống chậm lại và nghỉ ngơi một chút trong mùa thấp điểm (off-season).\n\nNhưng đừng lo, chúng tôi sẽ trở lại hoạt động bình thường đúng vào mùa hè bận rộn. Từ ngày 1 tháng 6, chúng tôi sẽ khôi phục giờ mở cửa bình thường: 10:00 sáng - 8:30 tối từ Thứ Hai đến Thứ Sáu, và 9:00 sáng - 10:30 tối vào cuối tuần.\n\nRất mong được sớm gặp lại quý khách tại cửa hàng.\n\nChủ quán Summer Shack",
    "questionIds": [
      "test2_158",
      "test2_159"
    ],
    "clues": [
      {
        "questionNum": 158,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 2, dòng 2-3",
        "clueQuote": "we've decided it's time to slow down and relax a little in the off-season.",
        "scanningTip": "Tìm từ 'off-season' (mùa vắng khách) tương đương 'quiet season'."
      },
      {
        "questionNum": 159,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 3, dòng 2-3",
        "clueQuote": "10:00 am - 8:30 pm Monday through Friday",
        "scanningTip": "Nhìn mốc ngày 'June 1' và đối chiếu giờ đóng cửa ngày trong tuần (Monday through Friday)."
      }
    ]
  },
  "clue": {
    "questionNum": 159,
    "correctAnswer": "B",
    "clueLocation": "Đoạn 3, dòng 2-3",
    "clueQuote": "10:00 am - 8:30 pm Monday through Friday",
    "scanningTip": "Nhìn mốc ngày 'June 1' và đối chiếu giờ đóng cửa ngày trong tuần (Monday through Friday)."
  }
},
{
  "id": "test2_160",
  "num": 160,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "Who has been replaced as chairperson of the board?",
  "options": {
    "A": "Mr. Blundell",
    "B": "Ms. Hernandez",
    "C": "Mr. MacDonald",
    "D": "Mr. Taiere"
  },
  "correctAnswer": "B",
  "explanation": "Đoạn 2: 'Like his predecessor, Gloria Hernandez, Mr. Blundell...' -> Gloria Hernandez là người tiền nhiệm (predecessor) đã bị thay thế.",
  "tip": "⚡ MẸO: 'replaced' = người bị thay thế, chính là người tiền nhiệm ('predecessor' Gloria Hernandez).",
  "keywords": [
    "predecessor",
    "Gloria Hernandez",
    "replaced"
  ],
  "vietnameseMeaning": "Ai là người đã bị thay thế ở vị trí chủ tịch hội đồng quản trị?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_farrell",
  "passageInfo": {
    "id": "test2_p7_farrell",
    "title": "Chủ Tịch Mới Của Tập Đoàn Ngân Hàng Đầu Tư - Farrell Group",
    "content": "New Chairman for Investment Banking Group\n\nThe board members of the Farrell Group, the investment banking giant, voted unanimously to elect Henry Blundell as chairman.\n\nLike his predecessor, Gloria Hernandez, Mr. Blundell is a well-known supporter of Farrell Group CEO Jacob MacDonald. Experts agree that this should ensure a smooth management transition for the company.\n\nSome analysts believe that the appointment is unwise because the relationship between the two men is too close. The Farrell Group has recorded declining profits for the last two years. Accordingly, they regarded Mr. Blundell's fellow board member Shanikwa Taiere as a better choice. Mr. Taiere, who has a reputation for shaking things up, could have provided the company with a much-needed change of direction. With Mr. Blundell as chairman, however, radical changes are unlikely in the near future.",
    "vietnameseTranslation": "Chủ tịch mới của Tập đoàn Ngân hàng Đầu tư\n\nCác thành viên hội đồng quản trị của Farrell Group, tập đoàn ngân hàng đầu tư khổng lồ, đã bỏ phiếu nhất trí bầu ông Henry Blundell làm chủ tịch.\n\nGiống như người tiền nhiệm của mình, bà Gloria Hernandez, ông Blundell là người ủng hộ nổi tiếng của Giám đốc điều hành Farrell Group, ông Jacob MacDonald. Các chuyên gia đồng tình rằng điều này sẽ đảm bảo quá trình chuyển giao quản lý diễn ra suôn sẻ.\n\nMột số nhà phân tích cho rằng quyết định bổ nhiệm này là thiếu khôn ngoan vì mối quan hệ giữa hai người quá thân thiết. Farrell Group đã ghi nhận lợi nhuận sụt giảm trong hai năm qua. Theo đó, họ xem thành viên hội đồng quản trị Shanikwa Taiere là lựa chọn tốt hơn. Ông Taiere, người nổi tiếng với việc tạo ra đột phá, có thể mang lại sự đổi mới hướng đi cần thiết. Tuy nhiên, với việc ông Blundell làm chủ tịch, những thay đổi mang tính triệt để khó có thể xảy ra trong tương lai gần.",
    "questionIds": [
      "test2_160",
      "test2_161"
    ],
    "clues": [
      {
        "questionNum": 160,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 2, dòng 1",
        "clueQuote": "Like his predecessor, Gloria Hernandez, Mr. Blundell is a well-known supporter...",
        "scanningTip": "Tìm từ 'predecessor' (người tiền nhiệm bị thay thế) ở đầu đoạn 2."
      },
      {
        "questionNum": 161,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 3, dòng 1",
        "clueQuote": "Some analysts believe that the appointment is unwise because the relationship between the two men is too close.",
        "scanningTip": "Quét cụm 'Some analysts believe' và từ 'unwise' (sai lầm)."
      }
    ]
  },
  "clue": {
    "questionNum": 160,
    "correctAnswer": "B",
    "clueLocation": "Đoạn 2, dòng 1",
    "clueQuote": "Like his predecessor, Gloria Hernandez, Mr. Blundell is a well-known supporter...",
    "scanningTip": "Tìm từ 'predecessor' (người tiền nhiệm bị thay thế) ở đầu đoạn 2."
  }
},
{
  "id": "test2_161",
  "num": 161,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "According to the article, what do some analysts believe?",
  "options": {
    "A": "The wrong appointment was made.",
    "B": "The company will stage a recovery.",
    "C": "The CEO is unhappy with the result.",
    "D": "Radical changes will be introduced."
  },
  "correctAnswer": "A",
  "explanation": "Đoạn 3: 'Some analysts believe that the appointment is unwise...' -> unwise (không khôn ngoan / sai lầm) tương đương với 'The wrong appointment was made'.",
  "tip": "⚡ MẸO: 'unwise' (sai lầm, thiếu sáng suốt) = 'wrong appointment'.",
  "keywords": [
    "appointment is unwise",
    "wrong appointment"
  ],
  "vietnameseMeaning": "Theo bài báo, một số nhà phân tích tin vào điều gì?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_farrell",
  "passageInfo": {
    "id": "test2_p7_farrell",
    "title": "Chủ Tịch Mới Của Tập Đoàn Ngân Hàng Đầu Tư - Farrell Group",
    "content": "New Chairman for Investment Banking Group\n\nThe board members of the Farrell Group, the investment banking giant, voted unanimously to elect Henry Blundell as chairman.\n\nLike his predecessor, Gloria Hernandez, Mr. Blundell is a well-known supporter of Farrell Group CEO Jacob MacDonald. Experts agree that this should ensure a smooth management transition for the company.\n\nSome analysts believe that the appointment is unwise because the relationship between the two men is too close. The Farrell Group has recorded declining profits for the last two years. Accordingly, they regarded Mr. Blundell's fellow board member Shanikwa Taiere as a better choice. Mr. Taiere, who has a reputation for shaking things up, could have provided the company with a much-needed change of direction. With Mr. Blundell as chairman, however, radical changes are unlikely in the near future.",
    "vietnameseTranslation": "Chủ tịch mới của Tập đoàn Ngân hàng Đầu tư\n\nCác thành viên hội đồng quản trị của Farrell Group, tập đoàn ngân hàng đầu tư khổng lồ, đã bỏ phiếu nhất trí bầu ông Henry Blundell làm chủ tịch.\n\nGiống như người tiền nhiệm của mình, bà Gloria Hernandez, ông Blundell là người ủng hộ nổi tiếng của Giám đốc điều hành Farrell Group, ông Jacob MacDonald. Các chuyên gia đồng tình rằng điều này sẽ đảm bảo quá trình chuyển giao quản lý diễn ra suôn sẻ.\n\nMột số nhà phân tích cho rằng quyết định bổ nhiệm này là thiếu khôn ngoan vì mối quan hệ giữa hai người quá thân thiết. Farrell Group đã ghi nhận lợi nhuận sụt giảm trong hai năm qua. Theo đó, họ xem thành viên hội đồng quản trị Shanikwa Taiere là lựa chọn tốt hơn. Ông Taiere, người nổi tiếng với việc tạo ra đột phá, có thể mang lại sự đổi mới hướng đi cần thiết. Tuy nhiên, với việc ông Blundell làm chủ tịch, những thay đổi mang tính triệt để khó có thể xảy ra trong tương lai gần.",
    "questionIds": [
      "test2_160",
      "test2_161"
    ],
    "clues": [
      {
        "questionNum": 160,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 2, dòng 1",
        "clueQuote": "Like his predecessor, Gloria Hernandez, Mr. Blundell is a well-known supporter...",
        "scanningTip": "Tìm từ 'predecessor' (người tiền nhiệm bị thay thế) ở đầu đoạn 2."
      },
      {
        "questionNum": 161,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 3, dòng 1",
        "clueQuote": "Some analysts believe that the appointment is unwise because the relationship between the two men is too close.",
        "scanningTip": "Quét cụm 'Some analysts believe' và từ 'unwise' (sai lầm)."
      }
    ]
  },
  "clue": {
    "questionNum": 161,
    "correctAnswer": "A",
    "clueLocation": "Đoạn 3, dòng 1",
    "clueQuote": "Some analysts believe that the appointment is unwise because the relationship between the two men is too close.",
    "scanningTip": "Quét cụm 'Some analysts believe' và từ 'unwise' (sai lầm)."
  }
},
{
  "id": "test2_162",
  "num": 162,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "What is the purpose of this form?",
  "options": {
    "A": "To purchase a new car model",
    "B": "To compare different car dealerships",
    "C": "To determine the best car for a customer",
    "D": "To provide feedback to a car seller"
  },
  "correctAnswer": "D",
  "explanation": "Tiêu đề 'Take a Second to Tell Us What You Think!' và các câu hỏi đánh giá xếp hạng -> cung cấp phản hồi cho người bán xe (provide feedback to a car seller).",
  "tip": "⚡ MẸO: Phiếu đánh giá rate poor/average/excellent = 'provide feedback'.",
  "keywords": [
    "Tell Us What You Think",
    "feedback"
  ],
  "vietnameseMeaning": "Mục đích của mẫu đơn này là gì?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_highway81",
  "passageInfo": {
    "id": "test2_p7_highway81",
    "title": "Phiếu Khảo Sát Đánh Giá Khách Hàng - Đại Lý Xe Hơi Highway 81 Motors",
    "content": "Highway 81 Motors\nTake a Second to Tell Us What You Think!\n\nDealership Facilities\nHow would you rate our facilities?\npoor _____ below average _____ average [X] above average _____ excellent _____\n\nHow would you rate the convenience of our location?\npoor _____ below average _____ average _____ above average [X] excellent _____\n\nPrices\nHow would you rate the appropriateness of the prices?\npoor _____ below average [X] average _____ above average _____ excellent _____\n\nSalesperson\nWho assisted you? Bruce Becker\nHow would you rate the helpfulness of your salesperson?\npoor [X] below average _____ average _____ above average _____ excellent _____\n\nWould you recommend Highway 81 Motors to your friends?\nyes _____ no [X]\n\nComments:\nI was very disappointed with the salesperson I dealt with. First of all, he did not listen to the features I was looking for in a car. Instead, he only wanted to show me the most expensive models. Also, he was very aggressive and tried to convince me to buy something I did not want. Because of my experience with Mr. Becker, I cannot recommend Highway 81 Motors to anyone.",
    "vietnameseTranslation": "Highway 81 Motors\nHãy dành vài giây cho chúng tôi biết suy nghĩ của bạn!\n\nCơ sở vật chất đại lý:\nBạn đánh giá thế nào về cơ sở vật chất của chúng tôi? Trung bình [X]\nBạn đánh giá thế nào về sự thuận tiện của vị trí? Trên trung bình [X]\n\nGiá cả:\nBạn đánh giá thế nào về mức độ hợp lý của giá cả? Dưới trung bình [X]\n\nNhân viên bán hàng:\nAi đã hỗ trợ bạn? Bruce Becker\nBạn đánh giá thế nào về sự hữu ích của nhân viên bán hàng? Kém [X]\n\nBạn có giới thiệu Highway 81 Motors cho bạn bè không? Không [X]\n\nÝ kiến đóng góp:\nTôi rất thất vọng về nhân viên bán hàng mà mình làm việc cùng. Trước hết, anh ta không thèm lắng nghe những tính năng tôi cần ở một chiếc xe. Thay vào đó, anh ta chỉ muốn dẫn tôi xem những mẫu xe đắt tiền nhất. Ngoài ra, anh ta rất hung hăng và cố thuyết phục tôi mua thứ tôi không muốn. Do trải nghiệm này với ông Becker, tôi không thể giới thiệu Highway 81 Motors cho bất kỳ ai.",
    "questionIds": [
      "test2_162",
      "test2_163",
      "test2_164"
    ],
    "clues": [
      {
        "questionNum": 162,
        "correctAnswer": "D",
        "clueLocation": "Tiêu đề mẫu đơn",
        "clueQuote": "Take a Second to Tell Us What You Think!",
        "scanningTip": "Nhìn tiêu đề của mẫu phiếu khảo sát ý kiến khách hàng."
      },
      {
        "questionNum": 163,
        "correctAnswer": "C",
        "clueLocation": "Phần Dealership Facilities, câu 2",
        "clueQuote": "convenience of our location: above average [X]",
        "scanningTip": "Đối chiếu mức đánh giá tick chọn cao nhất trong biểu mẫu (above average)."
      },
      {
        "questionNum": 164,
        "correctAnswer": "C",
        "clueLocation": "Phần Comments, dòng 3-4",
        "clueQuote": "he was very aggressive and tried to convince me to buy something I did not want.",
        "scanningTip": "Đọc phần nhận xét 'Comments' về ông Becker."
      }
    ]
  },
  "clue": {
    "questionNum": 162,
    "correctAnswer": "D",
    "clueLocation": "Tiêu đề mẫu đơn",
    "clueQuote": "Take a Second to Tell Us What You Think!",
    "scanningTip": "Nhìn tiêu đề của mẫu phiếu khảo sát ý kiến khách hàng."
  }
},
{
  "id": "test2_163",
  "num": 163,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "Which aspect was the customer most satisfied with?",
  "options": {
    "A": "The dealership's facilities",
    "B": "The salesperson's attitude",
    "C": "The dealership's location",
    "D": "The prices of the new models"
  },
  "correctAnswer": "C",
  "explanation": "Đối chiếu các mức đánh giá: Facilities (average), Prices (below average), Salesperson (poor), Location (above average - mức cao nhất trong tất cả các mục).",
  "tip": "⚡ MẸO: Mục nào có tick cao nhất? Location được 'above average' -> chọn 'dealership's location'.",
  "keywords": [
    "above average",
    "convenience of our location"
  ],
  "vietnameseMeaning": "Khách hàng hài lòng nhất với khía cạnh nào?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_highway81",
  "passageInfo": {
    "id": "test2_p7_highway81",
    "title": "Phiếu Khảo Sát Đánh Giá Khách Hàng - Đại Lý Xe Hơi Highway 81 Motors",
    "content": "Highway 81 Motors\nTake a Second to Tell Us What You Think!\n\nDealership Facilities\nHow would you rate our facilities?\npoor _____ below average _____ average [X] above average _____ excellent _____\n\nHow would you rate the convenience of our location?\npoor _____ below average _____ average _____ above average [X] excellent _____\n\nPrices\nHow would you rate the appropriateness of the prices?\npoor _____ below average [X] average _____ above average _____ excellent _____\n\nSalesperson\nWho assisted you? Bruce Becker\nHow would you rate the helpfulness of your salesperson?\npoor [X] below average _____ average _____ above average _____ excellent _____\n\nWould you recommend Highway 81 Motors to your friends?\nyes _____ no [X]\n\nComments:\nI was very disappointed with the salesperson I dealt with. First of all, he did not listen to the features I was looking for in a car. Instead, he only wanted to show me the most expensive models. Also, he was very aggressive and tried to convince me to buy something I did not want. Because of my experience with Mr. Becker, I cannot recommend Highway 81 Motors to anyone.",
    "vietnameseTranslation": "Highway 81 Motors\nHãy dành vài giây cho chúng tôi biết suy nghĩ của bạn!\n\nCơ sở vật chất đại lý:\nBạn đánh giá thế nào về cơ sở vật chất của chúng tôi? Trung bình [X]\nBạn đánh giá thế nào về sự thuận tiện của vị trí? Trên trung bình [X]\n\nGiá cả:\nBạn đánh giá thế nào về mức độ hợp lý của giá cả? Dưới trung bình [X]\n\nNhân viên bán hàng:\nAi đã hỗ trợ bạn? Bruce Becker\nBạn đánh giá thế nào về sự hữu ích của nhân viên bán hàng? Kém [X]\n\nBạn có giới thiệu Highway 81 Motors cho bạn bè không? Không [X]\n\nÝ kiến đóng góp:\nTôi rất thất vọng về nhân viên bán hàng mà mình làm việc cùng. Trước hết, anh ta không thèm lắng nghe những tính năng tôi cần ở một chiếc xe. Thay vào đó, anh ta chỉ muốn dẫn tôi xem những mẫu xe đắt tiền nhất. Ngoài ra, anh ta rất hung hăng và cố thuyết phục tôi mua thứ tôi không muốn. Do trải nghiệm này với ông Becker, tôi không thể giới thiệu Highway 81 Motors cho bất kỳ ai.",
    "questionIds": [
      "test2_162",
      "test2_163",
      "test2_164"
    ],
    "clues": [
      {
        "questionNum": 162,
        "correctAnswer": "D",
        "clueLocation": "Tiêu đề mẫu đơn",
        "clueQuote": "Take a Second to Tell Us What You Think!",
        "scanningTip": "Nhìn tiêu đề của mẫu phiếu khảo sát ý kiến khách hàng."
      },
      {
        "questionNum": 163,
        "correctAnswer": "C",
        "clueLocation": "Phần Dealership Facilities, câu 2",
        "clueQuote": "convenience of our location: above average [X]",
        "scanningTip": "Đối chiếu mức đánh giá tick chọn cao nhất trong biểu mẫu (above average)."
      },
      {
        "questionNum": 164,
        "correctAnswer": "C",
        "clueLocation": "Phần Comments, dòng 3-4",
        "clueQuote": "he was very aggressive and tried to convince me to buy something I did not want.",
        "scanningTip": "Đọc phần nhận xét 'Comments' về ông Becker."
      }
    ]
  },
  "clue": {
    "questionNum": 163,
    "correctAnswer": "C",
    "clueLocation": "Phần Dealership Facilities, câu 2",
    "clueQuote": "convenience of our location: above average [X]",
    "scanningTip": "Đối chiếu mức đánh giá tick chọn cao nhất trong biểu mẫu (above average)."
  }
},
{
  "id": "test2_164",
  "num": 164,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "What is said about Mr. Becker?",
  "options": {
    "A": "He drives an expensive vehicle.",
    "B": "He recommended Highway 81 Motors to his friends.",
    "C": "He pressured the customer.",
    "D": "He was disappointed with his colleague."
  },
  "correctAnswer": "C",
  "explanation": "Phần Comments: 'he was very aggressive and tried to convince me to buy something I did not want' -> hung hăng, ép khách mua = pressured the customer.",
  "tip": "⚡ MẸO: 'aggressive and tried to convince me to buy something I did not want' = 'pressured the customer' (gây áp lực ép mua).",
  "keywords": [
    "aggressive",
    "tried to convince me",
    "pressured"
  ],
  "vietnameseMeaning": "Điều gì được nói về ông Becker?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_highway81",
  "passageInfo": {
    "id": "test2_p7_highway81",
    "title": "Phiếu Khảo Sát Đánh Giá Khách Hàng - Đại Lý Xe Hơi Highway 81 Motors",
    "content": "Highway 81 Motors\nTake a Second to Tell Us What You Think!\n\nDealership Facilities\nHow would you rate our facilities?\npoor _____ below average _____ average [X] above average _____ excellent _____\n\nHow would you rate the convenience of our location?\npoor _____ below average _____ average _____ above average [X] excellent _____\n\nPrices\nHow would you rate the appropriateness of the prices?\npoor _____ below average [X] average _____ above average _____ excellent _____\n\nSalesperson\nWho assisted you? Bruce Becker\nHow would you rate the helpfulness of your salesperson?\npoor [X] below average _____ average _____ above average _____ excellent _____\n\nWould you recommend Highway 81 Motors to your friends?\nyes _____ no [X]\n\nComments:\nI was very disappointed with the salesperson I dealt with. First of all, he did not listen to the features I was looking for in a car. Instead, he only wanted to show me the most expensive models. Also, he was very aggressive and tried to convince me to buy something I did not want. Because of my experience with Mr. Becker, I cannot recommend Highway 81 Motors to anyone.",
    "vietnameseTranslation": "Highway 81 Motors\nHãy dành vài giây cho chúng tôi biết suy nghĩ của bạn!\n\nCơ sở vật chất đại lý:\nBạn đánh giá thế nào về cơ sở vật chất của chúng tôi? Trung bình [X]\nBạn đánh giá thế nào về sự thuận tiện của vị trí? Trên trung bình [X]\n\nGiá cả:\nBạn đánh giá thế nào về mức độ hợp lý của giá cả? Dưới trung bình [X]\n\nNhân viên bán hàng:\nAi đã hỗ trợ bạn? Bruce Becker\nBạn đánh giá thế nào về sự hữu ích của nhân viên bán hàng? Kém [X]\n\nBạn có giới thiệu Highway 81 Motors cho bạn bè không? Không [X]\n\nÝ kiến đóng góp:\nTôi rất thất vọng về nhân viên bán hàng mà mình làm việc cùng. Trước hết, anh ta không thèm lắng nghe những tính năng tôi cần ở một chiếc xe. Thay vào đó, anh ta chỉ muốn dẫn tôi xem những mẫu xe đắt tiền nhất. Ngoài ra, anh ta rất hung hăng và cố thuyết phục tôi mua thứ tôi không muốn. Do trải nghiệm này với ông Becker, tôi không thể giới thiệu Highway 81 Motors cho bất kỳ ai.",
    "questionIds": [
      "test2_162",
      "test2_163",
      "test2_164"
    ],
    "clues": [
      {
        "questionNum": 162,
        "correctAnswer": "D",
        "clueLocation": "Tiêu đề mẫu đơn",
        "clueQuote": "Take a Second to Tell Us What You Think!",
        "scanningTip": "Nhìn tiêu đề của mẫu phiếu khảo sát ý kiến khách hàng."
      },
      {
        "questionNum": 163,
        "correctAnswer": "C",
        "clueLocation": "Phần Dealership Facilities, câu 2",
        "clueQuote": "convenience of our location: above average [X]",
        "scanningTip": "Đối chiếu mức đánh giá tick chọn cao nhất trong biểu mẫu (above average)."
      },
      {
        "questionNum": 164,
        "correctAnswer": "C",
        "clueLocation": "Phần Comments, dòng 3-4",
        "clueQuote": "he was very aggressive and tried to convince me to buy something I did not want.",
        "scanningTip": "Đọc phần nhận xét 'Comments' về ông Becker."
      }
    ]
  },
  "clue": {
    "questionNum": 164,
    "correctAnswer": "C",
    "clueLocation": "Phần Comments, dòng 3-4",
    "clueQuote": "he was very aggressive and tried to convince me to buy something I did not want.",
    "scanningTip": "Đọc phần nhận xét 'Comments' về ông Becker."
  }
},
{
  "id": "test2_165",
  "num": 165,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "What does the memo discuss?",
  "options": {
    "A": "A talk being given by a company's CEO",
    "B": "The construction of a new auditorium",
    "C": "A workshop on developing lecturing skills",
    "D": "The introduction of an employee education program"
  },
  "correctAnswer": "D",
  "explanation": "Tiêu đề 'Corporate Training Lecture Series' và đoạn 1: 'launch next year of a monthly lecture series that will be open to all workers' -> giới thiệu chương trình đào tạo/giáo dục nhân viên.",
  "tip": "⚡ MẸO: 'Corporate Training Lecture Series' = 'employee education program'.",
  "keywords": [
    "Corporate Training",
    "employee education"
  ],
  "vietnameseMeaning": "Bản ghi nhớ thảo luận về điều gì?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_watson_memo",
  "passageInfo": {
    "id": "test2_p7_watson_memo",
    "title": "Thông Báo Chuỗi Bài Giảng Đào Tạo Doanh Nghiệp - Watson & Sons, Inc.",
    "content": "From: Juan Carlos Ruiz, Personnel Officer\nTo: All employees\nSubject: Corporate Training Lecture Series\nDate: December 2, 2008\n\nWatson & Sons, Inc. is committed to improving the lives of its employees. In this spirit, I am happy to announce the launch next year of a monthly lecture series that will be open to all Watson & Sons workers.\n\nOn the second Friday of each month, a guest lecturer will speak in auditorium B. Topics covered will be very diverse, from the latest industry innovations to tips for managing your work schedule effectively.\n\nThe first lecture has already been scheduled for January 10. Our speaker for the event will be Loretta Kumar, executive vice president of the Helmsman's Fund. She plans to discuss how recent trends in the corporate world have increased the quality of life of the average employee. In addition, we are currently talking with renowned author Bill Mead and hope to schedule his appearance sometime in spring.\n\nIf anyone has any questions about the program, please contact me in the personnel office at extension 5182.",
    "vietnameseTranslation": "Từ: Juan Carlos Ruiz, Cán bộ Nhân sự\nĐến: Toàn thể nhân viên\nChủ đề: Chuỗi bài giảng đào tạo doanh nghiệp\nNgày: 2 tháng 12, 2008\n\nWatson & Sons, Inc. luôn cam kết nâng cao chất lượng cuộc sống của nhân viên. Trên tinh thần này, tôi rất vui mừng thông báo về việc triển khai chuỗi bài giảng hàng tháng vào năm tới dành cho toàn thể nhân viên Watson & Sons.\n\nVào ngày Thứ Sáu thứ hai của mỗi tháng, một giảng viên khách mời sẽ thuyết trình tại khán phòng B. Các chủ đề sẽ rất đa dạng, từ những đổi mới mới nhất trong ngành cho đến các mẹo quản lý lịch trình làm việc hiệu quả.\n\nBài giảng đầu tiên đã được lên lịch vào ngày 10 tháng 1. Diễn giả là bà Loretta Kumar, phó chủ tịch điều hành của Helmsman's Fund...",
    "questionIds": [
      "test2_165",
      "test2_166",
      "test2_167"
    ],
    "clues": [
      {
        "questionNum": 165,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 1, dòng 2-3",
        "clueQuote": "launch next year of a monthly lecture series that will be open to all Watson & Sons workers.",
        "scanningTip": "Nhìn tiêu đề Subject và đoạn mở đầu."
      },
      {
        "questionNum": 166,
        "correctAnswer": "C",
        "clueLocation": "Đoạn 1, dòng 2 & Đoạn 2, dòng 1",
        "clueQuote": "monthly lecture series... On the second Friday of each month",
        "scanningTip": "Tìm từ chỉ tần suất 'monthly' hoặc 'each month'."
      },
      {
        "questionNum": 167,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 2 & 3",
        "clueQuote": "from the latest industry innovations to tips for managing your work schedule effectively... quality of life of the average employee",
        "scanningTip": "Đối chiếu 4 phương án với các chủ đề được liệt kê."
      }
    ]
  },
  "clue": {
    "questionNum": 165,
    "correctAnswer": "D",
    "clueLocation": "Đoạn 1, dòng 2-3",
    "clueQuote": "launch next year of a monthly lecture series that will be open to all Watson & Sons workers.",
    "scanningTip": "Nhìn tiêu đề Subject và đoạn mở đầu."
  }
},
{
  "id": "test2_166",
  "num": 166,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "How often will lectures be given?",
  "options": {
    "A": "Once a week",
    "B": "Every other week",
    "C": "Once a month",
    "D": "Every other month"
  },
  "correctAnswer": "C",
  "explanation": "Đoạn 1 ghi 'monthly lecture series' và đoạn 2 ghi 'On the second Friday of each month' -> mỗi tháng một lần (Once a month).",
  "tip": "⚡ MẸO: 'monthly' = 'Once a month' (mỗi tháng một lần).",
  "keywords": [
    "monthly",
    "each month",
    "Once a month"
  ],
  "vietnameseMeaning": "Các bài giảng sẽ được tổ chức với tần suất như thế nào?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_watson_memo",
  "passageInfo": {
    "id": "test2_p7_watson_memo",
    "title": "Thông Báo Chuỗi Bài Giảng Đào Tạo Doanh Nghiệp - Watson & Sons, Inc.",
    "content": "From: Juan Carlos Ruiz, Personnel Officer\nTo: All employees\nSubject: Corporate Training Lecture Series\nDate: December 2, 2008\n\nWatson & Sons, Inc. is committed to improving the lives of its employees. In this spirit, I am happy to announce the launch next year of a monthly lecture series that will be open to all Watson & Sons workers.\n\nOn the second Friday of each month, a guest lecturer will speak in auditorium B. Topics covered will be very diverse, from the latest industry innovations to tips for managing your work schedule effectively.\n\nThe first lecture has already been scheduled for January 10. Our speaker for the event will be Loretta Kumar, executive vice president of the Helmsman's Fund. She plans to discuss how recent trends in the corporate world have increased the quality of life of the average employee. In addition, we are currently talking with renowned author Bill Mead and hope to schedule his appearance sometime in spring.\n\nIf anyone has any questions about the program, please contact me in the personnel office at extension 5182.",
    "vietnameseTranslation": "Từ: Juan Carlos Ruiz, Cán bộ Nhân sự\nĐến: Toàn thể nhân viên\nChủ đề: Chuỗi bài giảng đào tạo doanh nghiệp\nNgày: 2 tháng 12, 2008\n\nWatson & Sons, Inc. luôn cam kết nâng cao chất lượng cuộc sống của nhân viên. Trên tinh thần này, tôi rất vui mừng thông báo về việc triển khai chuỗi bài giảng hàng tháng vào năm tới dành cho toàn thể nhân viên Watson & Sons.\n\nVào ngày Thứ Sáu thứ hai của mỗi tháng, một giảng viên khách mời sẽ thuyết trình tại khán phòng B. Các chủ đề sẽ rất đa dạng, từ những đổi mới mới nhất trong ngành cho đến các mẹo quản lý lịch trình làm việc hiệu quả.\n\nBài giảng đầu tiên đã được lên lịch vào ngày 10 tháng 1. Diễn giả là bà Loretta Kumar, phó chủ tịch điều hành của Helmsman's Fund...",
    "questionIds": [
      "test2_165",
      "test2_166",
      "test2_167"
    ],
    "clues": [
      {
        "questionNum": 165,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 1, dòng 2-3",
        "clueQuote": "launch next year of a monthly lecture series that will be open to all Watson & Sons workers.",
        "scanningTip": "Nhìn tiêu đề Subject và đoạn mở đầu."
      },
      {
        "questionNum": 166,
        "correctAnswer": "C",
        "clueLocation": "Đoạn 1, dòng 2 & Đoạn 2, dòng 1",
        "clueQuote": "monthly lecture series... On the second Friday of each month",
        "scanningTip": "Tìm từ chỉ tần suất 'monthly' hoặc 'each month'."
      },
      {
        "questionNum": 167,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 2 & 3",
        "clueQuote": "from the latest industry innovations to tips for managing your work schedule effectively... quality of life of the average employee",
        "scanningTip": "Đối chiếu 4 phương án với các chủ đề được liệt kê."
      }
    ]
  },
  "clue": {
    "questionNum": 166,
    "correctAnswer": "C",
    "clueLocation": "Đoạn 1, dòng 2 & Đoạn 2, dòng 1",
    "clueQuote": "monthly lecture series... On the second Friday of each month",
    "scanningTip": "Tìm từ chỉ tần suất 'monthly' hoặc 'each month'."
  }
},
{
  "id": "test2_167",
  "num": 167,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "According to the memo, what will NOT be covered?",
  "options": {
    "A": "Advice on efficient time management",
    "B": "Improvements in the lives of corporate workers",
    "C": "Recent advances in the industry",
    "D": "The history of Watson & Sons, Inc."
  },
  "correctAnswer": "D",
  "explanation": "Trong bài liệt kê: 'latest industry innovations' (C), 'tips for managing your work schedule effectively' (A), 'increased the quality of life of the average employee' (B). Không hề đề cập đến lịch sử công ty Watson & Sons (D).",
  "tip": "⚡ MẸO: Câu hỏi NOT covered -> quét danh sách các chủ đề ở đoạn 2 và 3, loại trừ A, B, C.",
  "keywords": [
    "NOT covered",
    "history of Watson & Sons"
  ],
  "vietnameseMeaning": "Theo bản ghi nhớ, điều gì sẽ KHÔNG được đề cập đến?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_watson_memo",
  "passageInfo": {
    "id": "test2_p7_watson_memo",
    "title": "Thông Báo Chuỗi Bài Giảng Đào Tạo Doanh Nghiệp - Watson & Sons, Inc.",
    "content": "From: Juan Carlos Ruiz, Personnel Officer\nTo: All employees\nSubject: Corporate Training Lecture Series\nDate: December 2, 2008\n\nWatson & Sons, Inc. is committed to improving the lives of its employees. In this spirit, I am happy to announce the launch next year of a monthly lecture series that will be open to all Watson & Sons workers.\n\nOn the second Friday of each month, a guest lecturer will speak in auditorium B. Topics covered will be very diverse, from the latest industry innovations to tips for managing your work schedule effectively.\n\nThe first lecture has already been scheduled for January 10. Our speaker for the event will be Loretta Kumar, executive vice president of the Helmsman's Fund. She plans to discuss how recent trends in the corporate world have increased the quality of life of the average employee. In addition, we are currently talking with renowned author Bill Mead and hope to schedule his appearance sometime in spring.\n\nIf anyone has any questions about the program, please contact me in the personnel office at extension 5182.",
    "vietnameseTranslation": "Từ: Juan Carlos Ruiz, Cán bộ Nhân sự\nĐến: Toàn thể nhân viên\nChủ đề: Chuỗi bài giảng đào tạo doanh nghiệp\nNgày: 2 tháng 12, 2008\n\nWatson & Sons, Inc. luôn cam kết nâng cao chất lượng cuộc sống của nhân viên. Trên tinh thần này, tôi rất vui mừng thông báo về việc triển khai chuỗi bài giảng hàng tháng vào năm tới dành cho toàn thể nhân viên Watson & Sons.\n\nVào ngày Thứ Sáu thứ hai của mỗi tháng, một giảng viên khách mời sẽ thuyết trình tại khán phòng B. Các chủ đề sẽ rất đa dạng, từ những đổi mới mới nhất trong ngành cho đến các mẹo quản lý lịch trình làm việc hiệu quả.\n\nBài giảng đầu tiên đã được lên lịch vào ngày 10 tháng 1. Diễn giả là bà Loretta Kumar, phó chủ tịch điều hành của Helmsman's Fund...",
    "questionIds": [
      "test2_165",
      "test2_166",
      "test2_167"
    ],
    "clues": [
      {
        "questionNum": 165,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 1, dòng 2-3",
        "clueQuote": "launch next year of a monthly lecture series that will be open to all Watson & Sons workers.",
        "scanningTip": "Nhìn tiêu đề Subject và đoạn mở đầu."
      },
      {
        "questionNum": 166,
        "correctAnswer": "C",
        "clueLocation": "Đoạn 1, dòng 2 & Đoạn 2, dòng 1",
        "clueQuote": "monthly lecture series... On the second Friday of each month",
        "scanningTip": "Tìm từ chỉ tần suất 'monthly' hoặc 'each month'."
      },
      {
        "questionNum": 167,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 2 & 3",
        "clueQuote": "from the latest industry innovations to tips for managing your work schedule effectively... quality of life of the average employee",
        "scanningTip": "Đối chiếu 4 phương án với các chủ đề được liệt kê."
      }
    ]
  },
  "clue": {
    "questionNum": 167,
    "correctAnswer": "D",
    "clueLocation": "Đoạn 2 & 3",
    "clueQuote": "from the latest industry innovations to tips for managing your work schedule effectively... quality of life of the average employee",
    "scanningTip": "Đối chiếu 4 phương án với các chủ đề được liệt kê."
  }
},
{
  "id": "test2_168",
  "num": 168,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "For whom is this notice intended?",
  "options": {
    "A": "The state commissioner",
    "B": "Tenants of an office building",
    "C": "Workers at a construction site",
    "D": "A building's maintenance crew"
  },
  "correctAnswer": "B",
  "explanation": "Thông báo gửi đến những người làm việc/thuê văn phòng trong tòa nhà Gordon ('all offices on a floor must be vacated', 'concerned occupants' = tenants of an office building).",
  "tip": "⚡ MẸO: 'Gordon Building', 'offices', 'occupants' -> người thuê văn phòng trong tòa nhà (tenants).",
  "keywords": [
    "Gordon Building",
    "occupants",
    "tenants"
  ],
  "vietnameseMeaning": "Thông báo này dành cho đối tượng nào?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_gordon_safety",
  "passageInfo": {
    "id": "test2_p7_gordon_safety",
    "title": "Thông Báo Lịch Thanh Tra An Toàn Tòa Nhà Gordon",
    "content": "Notice: Building Safety Inspection Schedule\n\nAs ordered by the state commissioner, the Gordon Building is to be inspected for safety violations. The entire process will last from August 18 to 20.\n\nInspections will be conducted on a floor-by-floor basis. Unfortunately, it is necessary to vacate each floor as it is inspected for about two hours. Below is the tentative schedule that has been provided by the commissioner's office:\n\nAugust 18: Floors 7-10\nAugust 19: Floors 3-6\nAugust 20: Floors 1-2 and parking lots\n\nAgain, all offices on a floor must be vacated while that floor is inspected. If you are unable to leave the premises on the dates recorded in the schedule, please contact the building management in room 101. The schedule will not be finalized until August 10, so the management is willing to listen to petitions from concerned occupants. Rearranging the dates will be a tricky administrative task so please only request a change if there is a valid reason for doing so.",
    "vietnameseTranslation": "Thông báo: Lịch kiểm tra an toàn tòa nhà\n\nTheo lệnh của ủy viên tiểu bang, Tòa nhà Gordon sẽ được kiểm tra các vi phạm về an toàn. Toàn bộ quá trình sẽ diễn ra từ ngày 18 đến ngày 20 tháng 8.\n\nViệc kiểm tra sẽ được tiến hành theo từng tầng. Đáng tiếc là mỗi tầng cần phải được sơ tán trong khoảng hai giờ khi được kiểm tra. Dưới đây là lịch trình dự kiến:\n18 tháng 8: Tầng 7-10\n19 tháng 8: Tầng 3-6\n20 tháng 8: Tầng 1-2 và bãi đỗ xe\n\nMột lần nữa, tất cả các văn phòng trên một tầng phải được sơ tán trong thời gian tầng đó được kiểm tra. Nếu bạn không thể rời khỏi địa điểm vào các ngày đã ghi trong lịch, vui lòng liên hệ ban quản lý tòa nhà tại phòng 101. Lịch trình sẽ chưa được hoàn thiện cho đến ngày 10 tháng 8, vì vậy ban quản lý sẵn sàng lắng nghe đơn kiến nghị từ những người thuê có liên quan...",
    "questionIds": [
      "test2_168",
      "test2_169",
      "test2_170",
      "test2_171"
    ],
    "clues": [
      {
        "questionNum": 168,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 1 & Đoạn 3",
        "clueQuote": "the Gordon Building is to be inspected... petitions from concerned occupants",
        "scanningTip": "Tìm các từ 'Gordon Building', 'offices', 'occupants' = tenants."
      },
      {
        "questionNum": 169,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 1, dòng 1-2",
        "clueQuote": "the Gordon Building is to be inspected for safety violations.",
        "scanningTip": "Tìm cụm 'inspected for' ở ngay câu đầu."
      },
      {
        "questionNum": 170,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 2 & Đoạn 3",
        "clueQuote": "August 20: Floors 1-2 and parking lots ... building management in room 101",
        "scanningTip": "Phòng 101 thuộc Tầng 1 -> ngày 20/8."
      },
      {
        "questionNum": 171,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 3, dòng 4-6",
        "clueQuote": "management is willing to listen to petitions... please only request a change if there is a valid reason",
        "scanningTip": "Tìm các từ 'request a change' hoặc 'rearranging the dates'."
      }
    ]
  },
  "clue": {
    "questionNum": 168,
    "correctAnswer": "B",
    "clueLocation": "Đoạn 1 & Đoạn 3",
    "clueQuote": "the Gordon Building is to be inspected... petitions from concerned occupants",
    "scanningTip": "Tìm các từ 'Gordon Building', 'offices', 'occupants' = tenants."
  }
},
{
  "id": "test2_169",
  "num": 169,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "Why are inspections being conducted?",
  "options": {
    "A": "To determine the cause of a fire",
    "B": "To ensure compliance with safety regulations",
    "C": "To renovate the interior of a building",
    "D": "To measure the available space on each floor"
  },
  "correctAnswer": "B",
  "explanation": "Đoạn 1: 'inspected for safety violations' -> kiểm tra vi phạm an toàn = đảm bảo tuân thủ quy định an toàn (compliance with safety regulations).",
  "tip": "⚡ MẸO: 'inspected for safety violations' = 'ensure compliance with safety regulations'.",
  "keywords": [
    "inspected for safety violations",
    "compliance"
  ],
  "vietnameseMeaning": "Tại sao việc kiểm tra lại được tiến hành?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_gordon_safety",
  "passageInfo": {
    "id": "test2_p7_gordon_safety",
    "title": "Thông Báo Lịch Thanh Tra An Toàn Tòa Nhà Gordon",
    "content": "Notice: Building Safety Inspection Schedule\n\nAs ordered by the state commissioner, the Gordon Building is to be inspected for safety violations. The entire process will last from August 18 to 20.\n\nInspections will be conducted on a floor-by-floor basis. Unfortunately, it is necessary to vacate each floor as it is inspected for about two hours. Below is the tentative schedule that has been provided by the commissioner's office:\n\nAugust 18: Floors 7-10\nAugust 19: Floors 3-6\nAugust 20: Floors 1-2 and parking lots\n\nAgain, all offices on a floor must be vacated while that floor is inspected. If you are unable to leave the premises on the dates recorded in the schedule, please contact the building management in room 101. The schedule will not be finalized until August 10, so the management is willing to listen to petitions from concerned occupants. Rearranging the dates will be a tricky administrative task so please only request a change if there is a valid reason for doing so.",
    "vietnameseTranslation": "Thông báo: Lịch kiểm tra an toàn tòa nhà\n\nTheo lệnh của ủy viên tiểu bang, Tòa nhà Gordon sẽ được kiểm tra các vi phạm về an toàn. Toàn bộ quá trình sẽ diễn ra từ ngày 18 đến ngày 20 tháng 8.\n\nViệc kiểm tra sẽ được tiến hành theo từng tầng. Đáng tiếc là mỗi tầng cần phải được sơ tán trong khoảng hai giờ khi được kiểm tra. Dưới đây là lịch trình dự kiến:\n18 tháng 8: Tầng 7-10\n19 tháng 8: Tầng 3-6\n20 tháng 8: Tầng 1-2 và bãi đỗ xe\n\nMột lần nữa, tất cả các văn phòng trên một tầng phải được sơ tán trong thời gian tầng đó được kiểm tra. Nếu bạn không thể rời khỏi địa điểm vào các ngày đã ghi trong lịch, vui lòng liên hệ ban quản lý tòa nhà tại phòng 101. Lịch trình sẽ chưa được hoàn thiện cho đến ngày 10 tháng 8, vì vậy ban quản lý sẵn sàng lắng nghe đơn kiến nghị từ những người thuê có liên quan...",
    "questionIds": [
      "test2_168",
      "test2_169",
      "test2_170",
      "test2_171"
    ],
    "clues": [
      {
        "questionNum": 168,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 1 & Đoạn 3",
        "clueQuote": "the Gordon Building is to be inspected... petitions from concerned occupants",
        "scanningTip": "Tìm các từ 'Gordon Building', 'offices', 'occupants' = tenants."
      },
      {
        "questionNum": 169,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 1, dòng 1-2",
        "clueQuote": "the Gordon Building is to be inspected for safety violations.",
        "scanningTip": "Tìm cụm 'inspected for' ở ngay câu đầu."
      },
      {
        "questionNum": 170,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 2 & Đoạn 3",
        "clueQuote": "August 20: Floors 1-2 and parking lots ... building management in room 101",
        "scanningTip": "Phòng 101 thuộc Tầng 1 -> ngày 20/8."
      },
      {
        "questionNum": 171,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 3, dòng 4-6",
        "clueQuote": "management is willing to listen to petitions... please only request a change if there is a valid reason",
        "scanningTip": "Tìm các từ 'request a change' hoặc 'rearranging the dates'."
      }
    ]
  },
  "clue": {
    "questionNum": 169,
    "correctAnswer": "B",
    "clueLocation": "Đoạn 1, dòng 1-2",
    "clueQuote": "the Gordon Building is to be inspected for safety violations.",
    "scanningTip": "Tìm cụm 'inspected for' ở ngay câu đầu."
  }
},
{
  "id": "test2_170",
  "num": 170,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "When will the building management office be inspected?",
  "options": {
    "A": "August 10",
    "B": "August 18",
    "C": "August 19",
    "D": "August 20"
  },
  "correctAnswer": "D",
  "explanation": "Đoạn 3 cho biết văn phòng ban quản lý ở 'room 101' (Phòng 101 nằm ở Tầng 1). Theo lịch ở Đoạn 2: 'August 20: Floors 1-2 and parking lots' -> Ngày 20 tháng 8!",
  "tip": "⚡ MẸO: 'room 101' = Tầng 1 (Floor 1). Lịch kiểm tra Tầng 1 là August 20.",
  "keywords": [
    "room 101",
    "Floors 1-2",
    "August 20"
  ],
  "vietnameseMeaning": "Văn phòng ban quản lý tòa nhà sẽ được kiểm tra vào ngày nào?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_gordon_safety",
  "passageInfo": {
    "id": "test2_p7_gordon_safety",
    "title": "Thông Báo Lịch Thanh Tra An Toàn Tòa Nhà Gordon",
    "content": "Notice: Building Safety Inspection Schedule\n\nAs ordered by the state commissioner, the Gordon Building is to be inspected for safety violations. The entire process will last from August 18 to 20.\n\nInspections will be conducted on a floor-by-floor basis. Unfortunately, it is necessary to vacate each floor as it is inspected for about two hours. Below is the tentative schedule that has been provided by the commissioner's office:\n\nAugust 18: Floors 7-10\nAugust 19: Floors 3-6\nAugust 20: Floors 1-2 and parking lots\n\nAgain, all offices on a floor must be vacated while that floor is inspected. If you are unable to leave the premises on the dates recorded in the schedule, please contact the building management in room 101. The schedule will not be finalized until August 10, so the management is willing to listen to petitions from concerned occupants. Rearranging the dates will be a tricky administrative task so please only request a change if there is a valid reason for doing so.",
    "vietnameseTranslation": "Thông báo: Lịch kiểm tra an toàn tòa nhà\n\nTheo lệnh của ủy viên tiểu bang, Tòa nhà Gordon sẽ được kiểm tra các vi phạm về an toàn. Toàn bộ quá trình sẽ diễn ra từ ngày 18 đến ngày 20 tháng 8.\n\nViệc kiểm tra sẽ được tiến hành theo từng tầng. Đáng tiếc là mỗi tầng cần phải được sơ tán trong khoảng hai giờ khi được kiểm tra. Dưới đây là lịch trình dự kiến:\n18 tháng 8: Tầng 7-10\n19 tháng 8: Tầng 3-6\n20 tháng 8: Tầng 1-2 và bãi đỗ xe\n\nMột lần nữa, tất cả các văn phòng trên một tầng phải được sơ tán trong thời gian tầng đó được kiểm tra. Nếu bạn không thể rời khỏi địa điểm vào các ngày đã ghi trong lịch, vui lòng liên hệ ban quản lý tòa nhà tại phòng 101. Lịch trình sẽ chưa được hoàn thiện cho đến ngày 10 tháng 8, vì vậy ban quản lý sẵn sàng lắng nghe đơn kiến nghị từ những người thuê có liên quan...",
    "questionIds": [
      "test2_168",
      "test2_169",
      "test2_170",
      "test2_171"
    ],
    "clues": [
      {
        "questionNum": 168,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 1 & Đoạn 3",
        "clueQuote": "the Gordon Building is to be inspected... petitions from concerned occupants",
        "scanningTip": "Tìm các từ 'Gordon Building', 'offices', 'occupants' = tenants."
      },
      {
        "questionNum": 169,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 1, dòng 1-2",
        "clueQuote": "the Gordon Building is to be inspected for safety violations.",
        "scanningTip": "Tìm cụm 'inspected for' ở ngay câu đầu."
      },
      {
        "questionNum": 170,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 2 & Đoạn 3",
        "clueQuote": "August 20: Floors 1-2 and parking lots ... building management in room 101",
        "scanningTip": "Phòng 101 thuộc Tầng 1 -> ngày 20/8."
      },
      {
        "questionNum": 171,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 3, dòng 4-6",
        "clueQuote": "management is willing to listen to petitions... please only request a change if there is a valid reason",
        "scanningTip": "Tìm các từ 'request a change' hoặc 'rearranging the dates'."
      }
    ]
  },
  "clue": {
    "questionNum": 170,
    "correctAnswer": "D",
    "clueLocation": "Đoạn 2 & Đoạn 3",
    "clueQuote": "August 20: Floors 1-2 and parking lots ... building management in room 101",
    "scanningTip": "Phòng 101 thuộc Tầng 1 -> ngày 20/8."
  }
},
{
  "id": "test2_171",
  "num": 171,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "What are affected readers entitled to do?",
  "options": {
    "A": "Request an exemption from the check",
    "B": "Ask for a change of assessment dates",
    "C": "Contact the state commissioner",
    "D": "Make their own inspection arrangements"
  },
  "correctAnswer": "B",
  "explanation": "Đoạn 3: 'management is willing to listen to petitions from concerned occupants... request a change...' -> được phép yêu cầu đổi ngày kiểm tra (Ask for a change of assessment dates).",
  "tip": "⚡ MẸO: 'petitions', 'request a change' = 'Ask for a change of assessment dates'.",
  "keywords": [
    "petitions",
    "request a change",
    "assessment dates"
  ],
  "vietnameseMeaning": "Những người đọc bị ảnh hưởng có quyền làm gì?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_gordon_safety",
  "passageInfo": {
    "id": "test2_p7_gordon_safety",
    "title": "Thông Báo Lịch Thanh Tra An Toàn Tòa Nhà Gordon",
    "content": "Notice: Building Safety Inspection Schedule\n\nAs ordered by the state commissioner, the Gordon Building is to be inspected for safety violations. The entire process will last from August 18 to 20.\n\nInspections will be conducted on a floor-by-floor basis. Unfortunately, it is necessary to vacate each floor as it is inspected for about two hours. Below is the tentative schedule that has been provided by the commissioner's office:\n\nAugust 18: Floors 7-10\nAugust 19: Floors 3-6\nAugust 20: Floors 1-2 and parking lots\n\nAgain, all offices on a floor must be vacated while that floor is inspected. If you are unable to leave the premises on the dates recorded in the schedule, please contact the building management in room 101. The schedule will not be finalized until August 10, so the management is willing to listen to petitions from concerned occupants. Rearranging the dates will be a tricky administrative task so please only request a change if there is a valid reason for doing so.",
    "vietnameseTranslation": "Thông báo: Lịch kiểm tra an toàn tòa nhà\n\nTheo lệnh của ủy viên tiểu bang, Tòa nhà Gordon sẽ được kiểm tra các vi phạm về an toàn. Toàn bộ quá trình sẽ diễn ra từ ngày 18 đến ngày 20 tháng 8.\n\nViệc kiểm tra sẽ được tiến hành theo từng tầng. Đáng tiếc là mỗi tầng cần phải được sơ tán trong khoảng hai giờ khi được kiểm tra. Dưới đây là lịch trình dự kiến:\n18 tháng 8: Tầng 7-10\n19 tháng 8: Tầng 3-6\n20 tháng 8: Tầng 1-2 và bãi đỗ xe\n\nMột lần nữa, tất cả các văn phòng trên một tầng phải được sơ tán trong thời gian tầng đó được kiểm tra. Nếu bạn không thể rời khỏi địa điểm vào các ngày đã ghi trong lịch, vui lòng liên hệ ban quản lý tòa nhà tại phòng 101. Lịch trình sẽ chưa được hoàn thiện cho đến ngày 10 tháng 8, vì vậy ban quản lý sẵn sàng lắng nghe đơn kiến nghị từ những người thuê có liên quan...",
    "questionIds": [
      "test2_168",
      "test2_169",
      "test2_170",
      "test2_171"
    ],
    "clues": [
      {
        "questionNum": 168,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 1 & Đoạn 3",
        "clueQuote": "the Gordon Building is to be inspected... petitions from concerned occupants",
        "scanningTip": "Tìm các từ 'Gordon Building', 'offices', 'occupants' = tenants."
      },
      {
        "questionNum": 169,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 1, dòng 1-2",
        "clueQuote": "the Gordon Building is to be inspected for safety violations.",
        "scanningTip": "Tìm cụm 'inspected for' ở ngay câu đầu."
      },
      {
        "questionNum": 170,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 2 & Đoạn 3",
        "clueQuote": "August 20: Floors 1-2 and parking lots ... building management in room 101",
        "scanningTip": "Phòng 101 thuộc Tầng 1 -> ngày 20/8."
      },
      {
        "questionNum": 171,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 3, dòng 4-6",
        "clueQuote": "management is willing to listen to petitions... please only request a change if there is a valid reason",
        "scanningTip": "Tìm các từ 'request a change' hoặc 'rearranging the dates'."
      }
    ]
  },
  "clue": {
    "questionNum": 171,
    "correctAnswer": "B",
    "clueLocation": "Đoạn 3, dòng 4-6",
    "clueQuote": "management is willing to listen to petitions... please only request a change if there is a valid reason",
    "scanningTip": "Tìm các từ 'request a change' hoặc 'rearranging the dates'."
  }
},
{
  "id": "test2_172",
  "num": 172,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "What is the main purpose of this email?",
  "options": {
    "A": "To schedule a stereo repair service",
    "B": "To demand a refund for a broken device",
    "C": "To solicit advice on how to fix a product",
    "D": "To order a replacement car stereo"
  },
  "correctAnswer": "C",
  "explanation": "Đoạn 5: 'Do you have any idea how to make the stereo work again? ... any help you can offer would be greatly appreciated' -> xin lời khuyên/hướng dẫn cách sửa (solicit advice on how to fix a product).",
  "tip": "⚡ MẸO: 'Do you have any idea how to make the stereo work again?' = 'solicit advice on how to fix'.",
  "keywords": [
    "Do you have any idea",
    "make the stereo work",
    "advice"
  ],
  "vietnameseMeaning": "Mục đích chính của email này là gì?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_ace4_stereo",
  "passageInfo": {
    "id": "test2_p7_ace4_stereo",
    "title": "Thư Hỏi Hướng Dẫn Kỹ Thuật Loa Xe Hơi - Ace 4 Electronics",
    "content": "To: Technical Services, Ace 4 Electronics\nFrom: Ken Huang\nSubject: Torre 211 car stereo\n\nDear service technician:\n\nI am writing about a problem I have encountered with one of your products. It is the Torre 211 car stereo, which I purchased from a local electronics store last week.\n\nI used the manual that came with the stereo and installed it myself in my 2002 Fremont automobile. In my initial test of the product, everything worked perfectly. Sound was transmitted through every speaker, the LCD display was lit up, and both the radio and CD player functions were operating.\n\nHowever, the next day when I began my morning commute, the stereo would not turn on. After I pressed the power button, the display showed the word \"STANDBY\" and would not respond to any commands. Since then, I have checked and rechecked all of the electrical connections, but I cannot find the problem.\n\nI tried to contact the retail store for help, but they refused to provide assistance because I had installed it myself. Apparently, under the terms of the warranty, the stereo should be installed by a certified professional.\n\nDo you have any idea how to make the stereo work again? I hope to have it functioning by next week for an out-of-state business trip I am taking. I realize that I made a mistake in not complying with the warranty terms, and that your company is not required to help me. However, any help you can offer would be greatly appreciated.",
    "vietnameseTranslation": "Đến: Bộ phận Kỹ thuật, Ace 4 Electronics\nTừ: Ken Huang\nChủ đề: Dàn âm thanh xe hơi Torre 211\n\nKính gửi kỹ thuật viên dịch vụ:\n\nTôi viết thư này về sự cố tôi gặp phải với một sản phẩm của quý công ty. Đó là dàn âm thanh xe hơi Torre 211 mà tôi đã mua từ một cửa hàng điện tử địa phương tuần trước.\n\nTôi đã sử dụng sách hướng dẫn đi kèm và tự mình lắp đặt nó vào chiếc xe hơi Fremont 2002 của mình. Trong lần kiểm tra ban đầu, mọi thứ hoạt động hoàn hảo: âm thanh phát qua mọi loa, màn hình LCD sáng và cả hai chức năng radio và đầu đĩa CD đều chạy tốt.\n\nTuy nhiên, ngày hôm sau khi tôi bắt đầu đi làm buổi sáng, dàn âm thanh không bật lên được. Sau khi tôi bấm nút nguồn, màn hình chỉ hiện chữ \"STANDBY\" và không phản hồi bất kỳ lệnh nào... Cửa hàng bán lẻ từ chối hỗ trợ vì theo điều khoản bảo hành, thiết bị phải được lắp đặt bởi chuyên gia có chứng chỉ. Quý công ty có cách nào giúp thiết bị hoạt động lại không?...",
    "questionIds": [
      "test2_172",
      "test2_173",
      "test2_174",
      "test2_175"
    ],
    "clues": [
      {
        "questionNum": 172,
        "correctAnswer": "C",
        "clueLocation": "Đoạn 5, dòng 1",
        "clueQuote": "Do you have any idea how to make the stereo work again?",
        "scanningTip": "Đọc câu hỏi chính ở đoạn cuối thư."
      },
      {
        "questionNum": 173,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 2, dòng 2-4",
        "clueQuote": "In my initial test of the product, everything worked perfectly. Sound was transmitted through every speaker, the LCD display was lit up, and both the radio and CD player functions were operating.",
        "scanningTip": "Đối chiếu các chức năng được liệt kê trong câu 'In my initial test'."
      },
      {
        "questionNum": 174,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 4, dòng 1",
        "clueQuote": "I tried to contact the retail store for help, but they refused to provide assistance...",
        "scanningTip": "Tìm cụm 'tried to contact'."
      },
      {
        "questionNum": 175,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 4, dòng 2-3",
        "clueQuote": "under the terms of the warranty, the stereo should be installed by a certified professional.",
        "scanningTip": "Tìm từ 'warranty' ở đoạn 4."
      }
    ]
  },
  "clue": {
    "questionNum": 172,
    "correctAnswer": "C",
    "clueLocation": "Đoạn 5, dòng 1",
    "clueQuote": "Do you have any idea how to make the stereo work again?",
    "scanningTip": "Đọc câu hỏi chính ở đoạn cuối thư."
  }
},
{
  "id": "test2_173",
  "num": 173,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "Which did Mr. Huang NOT test after he installed the stereo?",
  "options": {
    "A": "Radio and CD player",
    "B": "The STANDBY mode",
    "C": "Speaker operation",
    "D": "The screen"
  },
  "correctAnswer": "B",
  "explanation": "Đoạn 2: Trong lần kiểm tra đầu tiên (initial test), ông đã thử: loa ('every speaker' - C), màn hình ('LCD display' - D), radio và CD ('radio and CD player' - A). Chế độ 'STANDBY' là lỗi xuất hiện vào sáng hôm sau chứ không phải bài test ban đầu.",
  "tip": "⚡ MẸO: Tìm từ khóa 'initial test' ở đoạn 2: có speaker, LCD display, radio/CD. Không có Standby.",
  "keywords": [
    "initial test",
    "STANDBY",
    "NOT test"
  ],
  "vietnameseMeaning": "Ông Huang đã KHÔNG kiểm tra phần nào sau khi lắp đặt dàn âm thanh?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_ace4_stereo",
  "passageInfo": {
    "id": "test2_p7_ace4_stereo",
    "title": "Thư Hỏi Hướng Dẫn Kỹ Thuật Loa Xe Hơi - Ace 4 Electronics",
    "content": "To: Technical Services, Ace 4 Electronics\nFrom: Ken Huang\nSubject: Torre 211 car stereo\n\nDear service technician:\n\nI am writing about a problem I have encountered with one of your products. It is the Torre 211 car stereo, which I purchased from a local electronics store last week.\n\nI used the manual that came with the stereo and installed it myself in my 2002 Fremont automobile. In my initial test of the product, everything worked perfectly. Sound was transmitted through every speaker, the LCD display was lit up, and both the radio and CD player functions were operating.\n\nHowever, the next day when I began my morning commute, the stereo would not turn on. After I pressed the power button, the display showed the word \"STANDBY\" and would not respond to any commands. Since then, I have checked and rechecked all of the electrical connections, but I cannot find the problem.\n\nI tried to contact the retail store for help, but they refused to provide assistance because I had installed it myself. Apparently, under the terms of the warranty, the stereo should be installed by a certified professional.\n\nDo you have any idea how to make the stereo work again? I hope to have it functioning by next week for an out-of-state business trip I am taking. I realize that I made a mistake in not complying with the warranty terms, and that your company is not required to help me. However, any help you can offer would be greatly appreciated.",
    "vietnameseTranslation": "Đến: Bộ phận Kỹ thuật, Ace 4 Electronics\nTừ: Ken Huang\nChủ đề: Dàn âm thanh xe hơi Torre 211\n\nKính gửi kỹ thuật viên dịch vụ:\n\nTôi viết thư này về sự cố tôi gặp phải với một sản phẩm của quý công ty. Đó là dàn âm thanh xe hơi Torre 211 mà tôi đã mua từ một cửa hàng điện tử địa phương tuần trước.\n\nTôi đã sử dụng sách hướng dẫn đi kèm và tự mình lắp đặt nó vào chiếc xe hơi Fremont 2002 của mình. Trong lần kiểm tra ban đầu, mọi thứ hoạt động hoàn hảo: âm thanh phát qua mọi loa, màn hình LCD sáng và cả hai chức năng radio và đầu đĩa CD đều chạy tốt.\n\nTuy nhiên, ngày hôm sau khi tôi bắt đầu đi làm buổi sáng, dàn âm thanh không bật lên được. Sau khi tôi bấm nút nguồn, màn hình chỉ hiện chữ \"STANDBY\" và không phản hồi bất kỳ lệnh nào... Cửa hàng bán lẻ từ chối hỗ trợ vì theo điều khoản bảo hành, thiết bị phải được lắp đặt bởi chuyên gia có chứng chỉ. Quý công ty có cách nào giúp thiết bị hoạt động lại không?...",
    "questionIds": [
      "test2_172",
      "test2_173",
      "test2_174",
      "test2_175"
    ],
    "clues": [
      {
        "questionNum": 172,
        "correctAnswer": "C",
        "clueLocation": "Đoạn 5, dòng 1",
        "clueQuote": "Do you have any idea how to make the stereo work again?",
        "scanningTip": "Đọc câu hỏi chính ở đoạn cuối thư."
      },
      {
        "questionNum": 173,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 2, dòng 2-4",
        "clueQuote": "In my initial test of the product, everything worked perfectly. Sound was transmitted through every speaker, the LCD display was lit up, and both the radio and CD player functions were operating.",
        "scanningTip": "Đối chiếu các chức năng được liệt kê trong câu 'In my initial test'."
      },
      {
        "questionNum": 174,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 4, dòng 1",
        "clueQuote": "I tried to contact the retail store for help, but they refused to provide assistance...",
        "scanningTip": "Tìm cụm 'tried to contact'."
      },
      {
        "questionNum": 175,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 4, dòng 2-3",
        "clueQuote": "under the terms of the warranty, the stereo should be installed by a certified professional.",
        "scanningTip": "Tìm từ 'warranty' ở đoạn 4."
      }
    ]
  },
  "clue": {
    "questionNum": 173,
    "correctAnswer": "B",
    "clueLocation": "Đoạn 2, dòng 2-4",
    "clueQuote": "In my initial test of the product, everything worked perfectly. Sound was transmitted through every speaker, the LCD display was lit up, and both the radio and CD player functions were operating.",
    "scanningTip": "Đối chiếu các chức năng được liệt kê trong câu 'In my initial test'."
  }
},
{
  "id": "test2_174",
  "num": 174,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "What has Mr. Huang already attempted to do?",
  "options": {
    "A": "Ask the electronics store for assistance",
    "B": "Replace all of the electrical wires",
    "C": "Send an email to a certified professional",
    "D": "Install a replacement stereo by himself"
  },
  "correctAnswer": "A",
  "explanation": "Đoạn 4: 'I tried to contact the retail store for help, but they refused...' -> đã từng cố liên hệ cửa hàng điện tử nhờ giúp đỡ (Ask the electronics store for assistance).",
  "tip": "⚡ MẸO: 'tried to contact the retail store for help' = 'Ask the electronics store for assistance'.",
  "keywords": [
    "contact the retail store",
    "electronics store"
  ],
  "vietnameseMeaning": "Ông Huang đã từng cố gắng làm điều gì trước đó?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_ace4_stereo",
  "passageInfo": {
    "id": "test2_p7_ace4_stereo",
    "title": "Thư Hỏi Hướng Dẫn Kỹ Thuật Loa Xe Hơi - Ace 4 Electronics",
    "content": "To: Technical Services, Ace 4 Electronics\nFrom: Ken Huang\nSubject: Torre 211 car stereo\n\nDear service technician:\n\nI am writing about a problem I have encountered with one of your products. It is the Torre 211 car stereo, which I purchased from a local electronics store last week.\n\nI used the manual that came with the stereo and installed it myself in my 2002 Fremont automobile. In my initial test of the product, everything worked perfectly. Sound was transmitted through every speaker, the LCD display was lit up, and both the radio and CD player functions were operating.\n\nHowever, the next day when I began my morning commute, the stereo would not turn on. After I pressed the power button, the display showed the word \"STANDBY\" and would not respond to any commands. Since then, I have checked and rechecked all of the electrical connections, but I cannot find the problem.\n\nI tried to contact the retail store for help, but they refused to provide assistance because I had installed it myself. Apparently, under the terms of the warranty, the stereo should be installed by a certified professional.\n\nDo you have any idea how to make the stereo work again? I hope to have it functioning by next week for an out-of-state business trip I am taking. I realize that I made a mistake in not complying with the warranty terms, and that your company is not required to help me. However, any help you can offer would be greatly appreciated.",
    "vietnameseTranslation": "Đến: Bộ phận Kỹ thuật, Ace 4 Electronics\nTừ: Ken Huang\nChủ đề: Dàn âm thanh xe hơi Torre 211\n\nKính gửi kỹ thuật viên dịch vụ:\n\nTôi viết thư này về sự cố tôi gặp phải với một sản phẩm của quý công ty. Đó là dàn âm thanh xe hơi Torre 211 mà tôi đã mua từ một cửa hàng điện tử địa phương tuần trước.\n\nTôi đã sử dụng sách hướng dẫn đi kèm và tự mình lắp đặt nó vào chiếc xe hơi Fremont 2002 của mình. Trong lần kiểm tra ban đầu, mọi thứ hoạt động hoàn hảo: âm thanh phát qua mọi loa, màn hình LCD sáng và cả hai chức năng radio và đầu đĩa CD đều chạy tốt.\n\nTuy nhiên, ngày hôm sau khi tôi bắt đầu đi làm buổi sáng, dàn âm thanh không bật lên được. Sau khi tôi bấm nút nguồn, màn hình chỉ hiện chữ \"STANDBY\" và không phản hồi bất kỳ lệnh nào... Cửa hàng bán lẻ từ chối hỗ trợ vì theo điều khoản bảo hành, thiết bị phải được lắp đặt bởi chuyên gia có chứng chỉ. Quý công ty có cách nào giúp thiết bị hoạt động lại không?...",
    "questionIds": [
      "test2_172",
      "test2_173",
      "test2_174",
      "test2_175"
    ],
    "clues": [
      {
        "questionNum": 172,
        "correctAnswer": "C",
        "clueLocation": "Đoạn 5, dòng 1",
        "clueQuote": "Do you have any idea how to make the stereo work again?",
        "scanningTip": "Đọc câu hỏi chính ở đoạn cuối thư."
      },
      {
        "questionNum": 173,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 2, dòng 2-4",
        "clueQuote": "In my initial test of the product, everything worked perfectly. Sound was transmitted through every speaker, the LCD display was lit up, and both the radio and CD player functions were operating.",
        "scanningTip": "Đối chiếu các chức năng được liệt kê trong câu 'In my initial test'."
      },
      {
        "questionNum": 174,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 4, dòng 1",
        "clueQuote": "I tried to contact the retail store for help, but they refused to provide assistance...",
        "scanningTip": "Tìm cụm 'tried to contact'."
      },
      {
        "questionNum": 175,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 4, dòng 2-3",
        "clueQuote": "under the terms of the warranty, the stereo should be installed by a certified professional.",
        "scanningTip": "Tìm từ 'warranty' ở đoạn 4."
      }
    ]
  },
  "clue": {
    "questionNum": 174,
    "correctAnswer": "A",
    "clueLocation": "Đoạn 4, dòng 1",
    "clueQuote": "I tried to contact the retail store for help, but they refused to provide assistance...",
    "scanningTip": "Tìm cụm 'tried to contact'."
  }
},
{
  "id": "test2_175",
  "num": 175,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "What is specified in the warranty?",
  "options": {
    "A": "Only certified professionals should make repairs.",
    "B": "A recognized expert must handle installation.",
    "C": "Products damaged by overuse will not be refunded.",
    "D": "The warranty cannot be renewed for more than three years."
  },
  "correctAnswer": "B",
  "explanation": "Đoạn 4: 'under the terms of the warranty, the stereo should be installed by a certified professional' (chuyên gia được cấp chứng chỉ = recognized expert must handle installation).",
  "tip": "⚡ MẸO: 'installed by a certified professional' = 'recognized expert must handle installation'.",
  "keywords": [
    "warranty",
    "certified professional",
    "recognized expert"
  ],
  "vietnameseMeaning": "Điều gì được quy định cụ thể trong điều khoản bảo hành?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_ace4_stereo",
  "passageInfo": {
    "id": "test2_p7_ace4_stereo",
    "title": "Thư Hỏi Hướng Dẫn Kỹ Thuật Loa Xe Hơi - Ace 4 Electronics",
    "content": "To: Technical Services, Ace 4 Electronics\nFrom: Ken Huang\nSubject: Torre 211 car stereo\n\nDear service technician:\n\nI am writing about a problem I have encountered with one of your products. It is the Torre 211 car stereo, which I purchased from a local electronics store last week.\n\nI used the manual that came with the stereo and installed it myself in my 2002 Fremont automobile. In my initial test of the product, everything worked perfectly. Sound was transmitted through every speaker, the LCD display was lit up, and both the radio and CD player functions were operating.\n\nHowever, the next day when I began my morning commute, the stereo would not turn on. After I pressed the power button, the display showed the word \"STANDBY\" and would not respond to any commands. Since then, I have checked and rechecked all of the electrical connections, but I cannot find the problem.\n\nI tried to contact the retail store for help, but they refused to provide assistance because I had installed it myself. Apparently, under the terms of the warranty, the stereo should be installed by a certified professional.\n\nDo you have any idea how to make the stereo work again? I hope to have it functioning by next week for an out-of-state business trip I am taking. I realize that I made a mistake in not complying with the warranty terms, and that your company is not required to help me. However, any help you can offer would be greatly appreciated.",
    "vietnameseTranslation": "Đến: Bộ phận Kỹ thuật, Ace 4 Electronics\nTừ: Ken Huang\nChủ đề: Dàn âm thanh xe hơi Torre 211\n\nKính gửi kỹ thuật viên dịch vụ:\n\nTôi viết thư này về sự cố tôi gặp phải với một sản phẩm của quý công ty. Đó là dàn âm thanh xe hơi Torre 211 mà tôi đã mua từ một cửa hàng điện tử địa phương tuần trước.\n\nTôi đã sử dụng sách hướng dẫn đi kèm và tự mình lắp đặt nó vào chiếc xe hơi Fremont 2002 của mình. Trong lần kiểm tra ban đầu, mọi thứ hoạt động hoàn hảo: âm thanh phát qua mọi loa, màn hình LCD sáng và cả hai chức năng radio và đầu đĩa CD đều chạy tốt.\n\nTuy nhiên, ngày hôm sau khi tôi bắt đầu đi làm buổi sáng, dàn âm thanh không bật lên được. Sau khi tôi bấm nút nguồn, màn hình chỉ hiện chữ \"STANDBY\" và không phản hồi bất kỳ lệnh nào... Cửa hàng bán lẻ từ chối hỗ trợ vì theo điều khoản bảo hành, thiết bị phải được lắp đặt bởi chuyên gia có chứng chỉ. Quý công ty có cách nào giúp thiết bị hoạt động lại không?...",
    "questionIds": [
      "test2_172",
      "test2_173",
      "test2_174",
      "test2_175"
    ],
    "clues": [
      {
        "questionNum": 172,
        "correctAnswer": "C",
        "clueLocation": "Đoạn 5, dòng 1",
        "clueQuote": "Do you have any idea how to make the stereo work again?",
        "scanningTip": "Đọc câu hỏi chính ở đoạn cuối thư."
      },
      {
        "questionNum": 173,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 2, dòng 2-4",
        "clueQuote": "In my initial test of the product, everything worked perfectly. Sound was transmitted through every speaker, the LCD display was lit up, and both the radio and CD player functions were operating.",
        "scanningTip": "Đối chiếu các chức năng được liệt kê trong câu 'In my initial test'."
      },
      {
        "questionNum": 174,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 4, dòng 1",
        "clueQuote": "I tried to contact the retail store for help, but they refused to provide assistance...",
        "scanningTip": "Tìm cụm 'tried to contact'."
      },
      {
        "questionNum": 175,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 4, dòng 2-3",
        "clueQuote": "under the terms of the warranty, the stereo should be installed by a certified professional.",
        "scanningTip": "Tìm từ 'warranty' ở đoạn 4."
      }
    ]
  },
  "clue": {
    "questionNum": 175,
    "correctAnswer": "B",
    "clueLocation": "Đoạn 4, dòng 2-3",
    "clueQuote": "under the terms of the warranty, the stereo should be installed by a certified professional.",
    "scanningTip": "Tìm từ 'warranty' ở đoạn 4."
  }
},
{
  "id": "test2_176",
  "num": 176,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "Why did Ms. Ibach write this letter?",
  "options": {
    "A": "To share her opinion about a product",
    "B": "To apologize for an error she made",
    "C": "To inquire about a company's services",
    "D": "To correct an earlier communication"
  },
  "correctAnswer": "D",
  "explanation": "Đoạn 1: Trước đó bà viết thư hủy báo, nay xin đảo ngược yêu cầu ('reverse that request' = correct an earlier communication).",
  "tip": "⚡ MẸO: Đổi ý so với thư trước đó ('reverse that request') = 'correct an earlier communication'.",
  "keywords": [
    "reverse that request",
    "correct earlier communication"
  ],
  "vietnameseMeaning": "Tại sao cô Ibach viết bức thư này?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_times_ibach",
  "passageInfo": {
    "id": "test2_p7_times_ibach",
    "title": "Thư Xin Hủy Yêu Cầu Cắt Báo - Channel Region Times",
    "content": "Subscriptions Department\nChannel Region Times\n3500 Broadway\nVancouver, BC\n\nDear Sir or Madam,\n\nI recently wrote and requested that you cancel my subscription to your newspaper. Due to an unexpected change in my living situation, I would like to ask you to reverse that request.\n\nUp until last Friday, I believed that my company was transferring me to Montreal. That was the reason for my cancellation request. However, it seems that my transfer has been postponed until next year, and I will stay here in Vancouver until then. As a long-time reader of the Channel Region Times, I would very much like to continue my subscription to the paper.\n\nYou have probably already processed the cancellation of my account. In this case, I assume I will have to open a new one. I have just looked at your website and I understand that there is a $25 sign-up fee for new subscribers. Although I realize that I was at fault for prematurely terminating our agreement, would you be willing to waive the standard start-up charge for my subscription? I hope you can make this exception for me considering my unique circumstances. Please bear in mind, also, that I have been a loyal customer of yours for several years.\n\nThank you for your help.\n\nSincerely,\nKern Ibach",
    "vietnameseTranslation": "Phòng Đặt Báo Dài Hạn\nChannel Region Times\n3500 Broadway\nVancouver, BC\n\nKính gửi Quý tòa soạn,\n\nGần đây tôi đã viết thư yêu cầu quý báo hủy đăng ký báo dài hạn của mình. Do một thay đổi bất ngờ trong hoàn cảnh sống, tôi muốn đề nghị quý báo đảo ngược (hủy bỏ) yêu cầu đó.\n\nCho đến thứ Sáu tuần trước, tôi vẫn tin rằng công ty sẽ điều chuyển tôi đến Montreal. Đó là lý do tôi yêu cầu hủy báo. Tuy nhiên, việc điều chuyển đã bị hoãn lại sang năm sau, và tôi sẽ tiếp tục ở lại Vancouver cho đến lúc đó. Là một độc giả lâu năm của tờ Channel Region Times, tôi rất muốn tiếp tục nhận báo.\n\nCó thể quý báo đã xử lý việc hủy tài khoản của tôi. Trong trường hợp đó, tôi hiểu rằng mình sẽ phải mở một tài khoản mới và trên trang web có nêu phí đăng ký $25. Liệu quý báo có thể miễn khoản phí đăng ký tiêu chuẩn này cho tôi không? Rất mong quý báo châm chước vì tôi là khách hàng trung thành suốt nhiều năm qua...\n\nKern Ibach",
    "questionIds": [
      "test2_176",
      "test2_177",
      "test2_178",
      "test2_179",
      "test2_180"
    ],
    "clues": [
      {
        "questionNum": 176,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 1, dòng 2-3",
        "clueQuote": "Due to an unexpected change in my living situation, I would like to ask you to reverse that request.",
        "scanningTip": "Đọc mục đích ở cuối đoạn 1."
      },
      {
        "questionNum": 177,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 2, dòng 3-4",
        "clueQuote": "my transfer has been postponed until next year, and I will stay here in Vancouver until then.",
        "scanningTip": "Tìm cụm 'stay here in Vancouver'."
      },
      {
        "questionNum": 178,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 1, dòng 2",
        "clueQuote": "reverse that request",
        "scanningTip": "Xét ngữ cảnh đảo ngược quyết định (overturn)."
      },
      {
        "questionNum": 179,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 3, dòng 4-5",
        "clueQuote": "would you be willing to waive the standard start-up charge for my subscription?",
        "scanningTip": "Tìm từ 'waive' và số tiền '$25'."
      },
      {
        "questionNum": 180,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 2, dòng 4-5",
        "clueQuote": "As a long-time reader of the Channel Region Times, I would very much like to continue my subscription...",
        "scanningTip": "Tìm cụm 'long-time reader'."
      }
    ]
  },
  "clue": {
    "questionNum": 176,
    "correctAnswer": "D",
    "clueLocation": "Đoạn 1, dòng 2-3",
    "clueQuote": "Due to an unexpected change in my living situation, I would like to ask you to reverse that request.",
    "scanningTip": "Đọc mục đích ở cuối đoạn 1."
  }
},
{
  "id": "test2_177",
  "num": 177,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "What will Ms. Ibach do during the coming year?",
  "options": {
    "A": "Transfer to a different department",
    "B": "Visit Montreal for her job",
    "C": "Subscribe to a different newspaper",
    "D": "Remain living in Vancouver"
  },
  "correctAnswer": "D",
  "explanation": "Đoạn 2: 'my transfer has been postponed until next year, and I will stay here in Vancouver until then' (ở lại Vancouver = Remain living in Vancouver).",
  "tip": "⚡ MẸO: 'stay here in Vancouver' = 'Remain living in Vancouver'.",
  "keywords": [
    "postponed",
    "stay here in Vancouver"
  ],
  "vietnameseMeaning": "Cô Ibach sẽ làm gì trong năm tới?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_times_ibach",
  "passageInfo": {
    "id": "test2_p7_times_ibach",
    "title": "Thư Xin Hủy Yêu Cầu Cắt Báo - Channel Region Times",
    "content": "Subscriptions Department\nChannel Region Times\n3500 Broadway\nVancouver, BC\n\nDear Sir or Madam,\n\nI recently wrote and requested that you cancel my subscription to your newspaper. Due to an unexpected change in my living situation, I would like to ask you to reverse that request.\n\nUp until last Friday, I believed that my company was transferring me to Montreal. That was the reason for my cancellation request. However, it seems that my transfer has been postponed until next year, and I will stay here in Vancouver until then. As a long-time reader of the Channel Region Times, I would very much like to continue my subscription to the paper.\n\nYou have probably already processed the cancellation of my account. In this case, I assume I will have to open a new one. I have just looked at your website and I understand that there is a $25 sign-up fee for new subscribers. Although I realize that I was at fault for prematurely terminating our agreement, would you be willing to waive the standard start-up charge for my subscription? I hope you can make this exception for me considering my unique circumstances. Please bear in mind, also, that I have been a loyal customer of yours for several years.\n\nThank you for your help.\n\nSincerely,\nKern Ibach",
    "vietnameseTranslation": "Phòng Đặt Báo Dài Hạn\nChannel Region Times\n3500 Broadway\nVancouver, BC\n\nKính gửi Quý tòa soạn,\n\nGần đây tôi đã viết thư yêu cầu quý báo hủy đăng ký báo dài hạn của mình. Do một thay đổi bất ngờ trong hoàn cảnh sống, tôi muốn đề nghị quý báo đảo ngược (hủy bỏ) yêu cầu đó.\n\nCho đến thứ Sáu tuần trước, tôi vẫn tin rằng công ty sẽ điều chuyển tôi đến Montreal. Đó là lý do tôi yêu cầu hủy báo. Tuy nhiên, việc điều chuyển đã bị hoãn lại sang năm sau, và tôi sẽ tiếp tục ở lại Vancouver cho đến lúc đó. Là một độc giả lâu năm của tờ Channel Region Times, tôi rất muốn tiếp tục nhận báo.\n\nCó thể quý báo đã xử lý việc hủy tài khoản của tôi. Trong trường hợp đó, tôi hiểu rằng mình sẽ phải mở một tài khoản mới và trên trang web có nêu phí đăng ký $25. Liệu quý báo có thể miễn khoản phí đăng ký tiêu chuẩn này cho tôi không? Rất mong quý báo châm chước vì tôi là khách hàng trung thành suốt nhiều năm qua...\n\nKern Ibach",
    "questionIds": [
      "test2_176",
      "test2_177",
      "test2_178",
      "test2_179",
      "test2_180"
    ],
    "clues": [
      {
        "questionNum": 176,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 1, dòng 2-3",
        "clueQuote": "Due to an unexpected change in my living situation, I would like to ask you to reverse that request.",
        "scanningTip": "Đọc mục đích ở cuối đoạn 1."
      },
      {
        "questionNum": 177,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 2, dòng 3-4",
        "clueQuote": "my transfer has been postponed until next year, and I will stay here in Vancouver until then.",
        "scanningTip": "Tìm cụm 'stay here in Vancouver'."
      },
      {
        "questionNum": 178,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 1, dòng 2",
        "clueQuote": "reverse that request",
        "scanningTip": "Xét ngữ cảnh đảo ngược quyết định (overturn)."
      },
      {
        "questionNum": 179,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 3, dòng 4-5",
        "clueQuote": "would you be willing to waive the standard start-up charge for my subscription?",
        "scanningTip": "Tìm từ 'waive' và số tiền '$25'."
      },
      {
        "questionNum": 180,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 2, dòng 4-5",
        "clueQuote": "As a long-time reader of the Channel Region Times, I would very much like to continue my subscription...",
        "scanningTip": "Tìm cụm 'long-time reader'."
      }
    ]
  },
  "clue": {
    "questionNum": 177,
    "correctAnswer": "D",
    "clueLocation": "Đoạn 2, dòng 3-4",
    "clueQuote": "my transfer has been postponed until next year, and I will stay here in Vancouver until then.",
    "scanningTip": "Tìm cụm 'stay here in Vancouver'."
  }
},
{
  "id": "test2_178",
  "num": 178,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "The word \"reverse\" in paragraph 1, line 2 is closest in meaning to",
  "options": {
    "A": "return",
    "B": "overturn",
    "C": "oppose",
    "D": "reserve"
  },
  "correctAnswer": "B",
  "explanation": "'reverse a request' = đảo ngược / hủy bỏ quyết định trước đó, đồng nghĩa với 'overturn'.",
  "tip": "⚡ MẸO: 'reverse' (đảo ngược quyết định) = 'overturn'.",
  "keywords": [
    "reverse",
    "overturn"
  ],
  "vietnameseMeaning": "Từ \"reverse\" ở đoạn 1, dòng 2 gần nghĩa nhất với từ nào?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_times_ibach",
  "passageInfo": {
    "id": "test2_p7_times_ibach",
    "title": "Thư Xin Hủy Yêu Cầu Cắt Báo - Channel Region Times",
    "content": "Subscriptions Department\nChannel Region Times\n3500 Broadway\nVancouver, BC\n\nDear Sir or Madam,\n\nI recently wrote and requested that you cancel my subscription to your newspaper. Due to an unexpected change in my living situation, I would like to ask you to reverse that request.\n\nUp until last Friday, I believed that my company was transferring me to Montreal. That was the reason for my cancellation request. However, it seems that my transfer has been postponed until next year, and I will stay here in Vancouver until then. As a long-time reader of the Channel Region Times, I would very much like to continue my subscription to the paper.\n\nYou have probably already processed the cancellation of my account. In this case, I assume I will have to open a new one. I have just looked at your website and I understand that there is a $25 sign-up fee for new subscribers. Although I realize that I was at fault for prematurely terminating our agreement, would you be willing to waive the standard start-up charge for my subscription? I hope you can make this exception for me considering my unique circumstances. Please bear in mind, also, that I have been a loyal customer of yours for several years.\n\nThank you for your help.\n\nSincerely,\nKern Ibach",
    "vietnameseTranslation": "Phòng Đặt Báo Dài Hạn\nChannel Region Times\n3500 Broadway\nVancouver, BC\n\nKính gửi Quý tòa soạn,\n\nGần đây tôi đã viết thư yêu cầu quý báo hủy đăng ký báo dài hạn của mình. Do một thay đổi bất ngờ trong hoàn cảnh sống, tôi muốn đề nghị quý báo đảo ngược (hủy bỏ) yêu cầu đó.\n\nCho đến thứ Sáu tuần trước, tôi vẫn tin rằng công ty sẽ điều chuyển tôi đến Montreal. Đó là lý do tôi yêu cầu hủy báo. Tuy nhiên, việc điều chuyển đã bị hoãn lại sang năm sau, và tôi sẽ tiếp tục ở lại Vancouver cho đến lúc đó. Là một độc giả lâu năm của tờ Channel Region Times, tôi rất muốn tiếp tục nhận báo.\n\nCó thể quý báo đã xử lý việc hủy tài khoản của tôi. Trong trường hợp đó, tôi hiểu rằng mình sẽ phải mở một tài khoản mới và trên trang web có nêu phí đăng ký $25. Liệu quý báo có thể miễn khoản phí đăng ký tiêu chuẩn này cho tôi không? Rất mong quý báo châm chước vì tôi là khách hàng trung thành suốt nhiều năm qua...\n\nKern Ibach",
    "questionIds": [
      "test2_176",
      "test2_177",
      "test2_178",
      "test2_179",
      "test2_180"
    ],
    "clues": [
      {
        "questionNum": 176,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 1, dòng 2-3",
        "clueQuote": "Due to an unexpected change in my living situation, I would like to ask you to reverse that request.",
        "scanningTip": "Đọc mục đích ở cuối đoạn 1."
      },
      {
        "questionNum": 177,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 2, dòng 3-4",
        "clueQuote": "my transfer has been postponed until next year, and I will stay here in Vancouver until then.",
        "scanningTip": "Tìm cụm 'stay here in Vancouver'."
      },
      {
        "questionNum": 178,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 1, dòng 2",
        "clueQuote": "reverse that request",
        "scanningTip": "Xét ngữ cảnh đảo ngược quyết định (overturn)."
      },
      {
        "questionNum": 179,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 3, dòng 4-5",
        "clueQuote": "would you be willing to waive the standard start-up charge for my subscription?",
        "scanningTip": "Tìm từ 'waive' và số tiền '$25'."
      },
      {
        "questionNum": 180,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 2, dòng 4-5",
        "clueQuote": "As a long-time reader of the Channel Region Times, I would very much like to continue my subscription...",
        "scanningTip": "Tìm cụm 'long-time reader'."
      }
    ]
  },
  "clue": {
    "questionNum": 178,
    "correctAnswer": "B",
    "clueLocation": "Đoạn 1, dòng 2",
    "clueQuote": "reverse that request",
    "scanningTip": "Xét ngữ cảnh đảo ngược quyết định (overturn)."
  }
},
{
  "id": "test2_179",
  "num": 179,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "What does Ms. Ibach request?",
  "options": {
    "A": "Exemption from an extra charge",
    "B": "A free one-month subscription",
    "C": "A discount on the yearly rate",
    "D": "A subscription application form"
  },
  "correctAnswer": "A",
  "explanation": "Đoạn 3: 'would you be willing to waive the standard start-up charge for my subscription?' -> 'waive a charge' = miễn phí phụ thu (Exemption from an extra charge).",
  "tip": "⚡ MẸO: 'waive the charge' (miễn khoản phí) = 'exemption from charge'.",
  "keywords": [
    "waive",
    "standard start-up charge",
    "exemption"
  ],
  "vietnameseMeaning": "Cô Ibach yêu cầu điều gì?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_times_ibach",
  "passageInfo": {
    "id": "test2_p7_times_ibach",
    "title": "Thư Xin Hủy Yêu Cầu Cắt Báo - Channel Region Times",
    "content": "Subscriptions Department\nChannel Region Times\n3500 Broadway\nVancouver, BC\n\nDear Sir or Madam,\n\nI recently wrote and requested that you cancel my subscription to your newspaper. Due to an unexpected change in my living situation, I would like to ask you to reverse that request.\n\nUp until last Friday, I believed that my company was transferring me to Montreal. That was the reason for my cancellation request. However, it seems that my transfer has been postponed until next year, and I will stay here in Vancouver until then. As a long-time reader of the Channel Region Times, I would very much like to continue my subscription to the paper.\n\nYou have probably already processed the cancellation of my account. In this case, I assume I will have to open a new one. I have just looked at your website and I understand that there is a $25 sign-up fee for new subscribers. Although I realize that I was at fault for prematurely terminating our agreement, would you be willing to waive the standard start-up charge for my subscription? I hope you can make this exception for me considering my unique circumstances. Please bear in mind, also, that I have been a loyal customer of yours for several years.\n\nThank you for your help.\n\nSincerely,\nKern Ibach",
    "vietnameseTranslation": "Phòng Đặt Báo Dài Hạn\nChannel Region Times\n3500 Broadway\nVancouver, BC\n\nKính gửi Quý tòa soạn,\n\nGần đây tôi đã viết thư yêu cầu quý báo hủy đăng ký báo dài hạn của mình. Do một thay đổi bất ngờ trong hoàn cảnh sống, tôi muốn đề nghị quý báo đảo ngược (hủy bỏ) yêu cầu đó.\n\nCho đến thứ Sáu tuần trước, tôi vẫn tin rằng công ty sẽ điều chuyển tôi đến Montreal. Đó là lý do tôi yêu cầu hủy báo. Tuy nhiên, việc điều chuyển đã bị hoãn lại sang năm sau, và tôi sẽ tiếp tục ở lại Vancouver cho đến lúc đó. Là một độc giả lâu năm của tờ Channel Region Times, tôi rất muốn tiếp tục nhận báo.\n\nCó thể quý báo đã xử lý việc hủy tài khoản của tôi. Trong trường hợp đó, tôi hiểu rằng mình sẽ phải mở một tài khoản mới và trên trang web có nêu phí đăng ký $25. Liệu quý báo có thể miễn khoản phí đăng ký tiêu chuẩn này cho tôi không? Rất mong quý báo châm chước vì tôi là khách hàng trung thành suốt nhiều năm qua...\n\nKern Ibach",
    "questionIds": [
      "test2_176",
      "test2_177",
      "test2_178",
      "test2_179",
      "test2_180"
    ],
    "clues": [
      {
        "questionNum": 176,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 1, dòng 2-3",
        "clueQuote": "Due to an unexpected change in my living situation, I would like to ask you to reverse that request.",
        "scanningTip": "Đọc mục đích ở cuối đoạn 1."
      },
      {
        "questionNum": 177,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 2, dòng 3-4",
        "clueQuote": "my transfer has been postponed until next year, and I will stay here in Vancouver until then.",
        "scanningTip": "Tìm cụm 'stay here in Vancouver'."
      },
      {
        "questionNum": 178,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 1, dòng 2",
        "clueQuote": "reverse that request",
        "scanningTip": "Xét ngữ cảnh đảo ngược quyết định (overturn)."
      },
      {
        "questionNum": 179,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 3, dòng 4-5",
        "clueQuote": "would you be willing to waive the standard start-up charge for my subscription?",
        "scanningTip": "Tìm từ 'waive' và số tiền '$25'."
      },
      {
        "questionNum": 180,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 2, dòng 4-5",
        "clueQuote": "As a long-time reader of the Channel Region Times, I would very much like to continue my subscription...",
        "scanningTip": "Tìm cụm 'long-time reader'."
      }
    ]
  },
  "clue": {
    "questionNum": 179,
    "correctAnswer": "A",
    "clueLocation": "Đoạn 3, dòng 4-5",
    "clueQuote": "would you be willing to waive the standard start-up charge for my subscription?",
    "scanningTip": "Tìm từ 'waive' và số tiền '$25'."
  }
},
{
  "id": "test2_180",
  "num": 180,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "What does Ms. Ibach say about the Channel Region Times?",
  "options": {
    "A": "It is the most popular paper in Vancouver.",
    "B": "She has read it for a long time.",
    "C": "It should move its offices to Montreal.",
    "D": "The sign-up fee is too expensive."
  },
  "correctAnswer": "B",
  "explanation": "Đoạn 2: 'As a long-time reader of the Channel Region Times...' (là độc giả lâu năm = She has read it for a long time).",
  "tip": "⚡ MẸO: 'long-time reader' = 'read it for a long time'.",
  "keywords": [
    "long-time reader",
    "read it for a long time"
  ],
  "vietnameseMeaning": "Cô Ibach nói gì về tờ báo Channel Region Times?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_times_ibach",
  "passageInfo": {
    "id": "test2_p7_times_ibach",
    "title": "Thư Xin Hủy Yêu Cầu Cắt Báo - Channel Region Times",
    "content": "Subscriptions Department\nChannel Region Times\n3500 Broadway\nVancouver, BC\n\nDear Sir or Madam,\n\nI recently wrote and requested that you cancel my subscription to your newspaper. Due to an unexpected change in my living situation, I would like to ask you to reverse that request.\n\nUp until last Friday, I believed that my company was transferring me to Montreal. That was the reason for my cancellation request. However, it seems that my transfer has been postponed until next year, and I will stay here in Vancouver until then. As a long-time reader of the Channel Region Times, I would very much like to continue my subscription to the paper.\n\nYou have probably already processed the cancellation of my account. In this case, I assume I will have to open a new one. I have just looked at your website and I understand that there is a $25 sign-up fee for new subscribers. Although I realize that I was at fault for prematurely terminating our agreement, would you be willing to waive the standard start-up charge for my subscription? I hope you can make this exception for me considering my unique circumstances. Please bear in mind, also, that I have been a loyal customer of yours for several years.\n\nThank you for your help.\n\nSincerely,\nKern Ibach",
    "vietnameseTranslation": "Phòng Đặt Báo Dài Hạn\nChannel Region Times\n3500 Broadway\nVancouver, BC\n\nKính gửi Quý tòa soạn,\n\nGần đây tôi đã viết thư yêu cầu quý báo hủy đăng ký báo dài hạn của mình. Do một thay đổi bất ngờ trong hoàn cảnh sống, tôi muốn đề nghị quý báo đảo ngược (hủy bỏ) yêu cầu đó.\n\nCho đến thứ Sáu tuần trước, tôi vẫn tin rằng công ty sẽ điều chuyển tôi đến Montreal. Đó là lý do tôi yêu cầu hủy báo. Tuy nhiên, việc điều chuyển đã bị hoãn lại sang năm sau, và tôi sẽ tiếp tục ở lại Vancouver cho đến lúc đó. Là một độc giả lâu năm của tờ Channel Region Times, tôi rất muốn tiếp tục nhận báo.\n\nCó thể quý báo đã xử lý việc hủy tài khoản của tôi. Trong trường hợp đó, tôi hiểu rằng mình sẽ phải mở một tài khoản mới và trên trang web có nêu phí đăng ký $25. Liệu quý báo có thể miễn khoản phí đăng ký tiêu chuẩn này cho tôi không? Rất mong quý báo châm chước vì tôi là khách hàng trung thành suốt nhiều năm qua...\n\nKern Ibach",
    "questionIds": [
      "test2_176",
      "test2_177",
      "test2_178",
      "test2_179",
      "test2_180"
    ],
    "clues": [
      {
        "questionNum": 176,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 1, dòng 2-3",
        "clueQuote": "Due to an unexpected change in my living situation, I would like to ask you to reverse that request.",
        "scanningTip": "Đọc mục đích ở cuối đoạn 1."
      },
      {
        "questionNum": 177,
        "correctAnswer": "D",
        "clueLocation": "Đoạn 2, dòng 3-4",
        "clueQuote": "my transfer has been postponed until next year, and I will stay here in Vancouver until then.",
        "scanningTip": "Tìm cụm 'stay here in Vancouver'."
      },
      {
        "questionNum": 178,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 1, dòng 2",
        "clueQuote": "reverse that request",
        "scanningTip": "Xét ngữ cảnh đảo ngược quyết định (overturn)."
      },
      {
        "questionNum": 179,
        "correctAnswer": "A",
        "clueLocation": "Đoạn 3, dòng 4-5",
        "clueQuote": "would you be willing to waive the standard start-up charge for my subscription?",
        "scanningTip": "Tìm từ 'waive' và số tiền '$25'."
      },
      {
        "questionNum": 180,
        "correctAnswer": "B",
        "clueLocation": "Đoạn 2, dòng 4-5",
        "clueQuote": "As a long-time reader of the Channel Region Times, I would very much like to continue my subscription...",
        "scanningTip": "Tìm cụm 'long-time reader'."
      }
    ]
  },
  "clue": {
    "questionNum": 180,
    "correctAnswer": "B",
    "clueLocation": "Đoạn 2, dòng 4-5",
    "clueQuote": "As a long-time reader of the Channel Region Times, I would very much like to continue my subscription...",
    "scanningTip": "Tìm cụm 'long-time reader'."
  }
},
{
  "id": "test2_181",
  "num": 181,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "When was the invoice created?",
  "options": {
    "A": "March 1",
    "B": "March 31",
    "C": "April 16",
    "D": "May 8"
  },
  "correctAnswer": "C",
  "explanation": "Trên hóa đơn ghi rõ: 'Date: April 16, 2008'.",
  "tip": "⚡ MẸO: Nhìn dòng 'Date' trên phần hóa đơn đầu tiên: April 16.",
  "keywords": [
    "Date",
    "April 16",
    "invoice"
  ],
  "vietnameseMeaning": "Hóa đơn được lập vào ngày nào?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_woodbury",
  "passageInfo": {
    "id": "test2_p7_woodbury",
    "title": "Đoạn Kép: Hóa Đơn & Thư Điều Chỉnh Tiền Điện - Woodbury Gas & Electric",
    "content": "Woodbury Gas & Electric Company\nCustomer Invoice\n\nCustomer name: Carol Wyse\nCustomer ID: 3569-F9J3-5704\nCustomer address: 3590 Main St., Woodbury, VA\nDate: April 16, 2008\n\nBilling period: March 1 - March 31\nPrevious balance:  $0.00\nNew balance:        $84.79\nTotal amount due: $84.79\n\nDetails of charges in this billing period:\nGas Heat        $23.88\nCooking Gas  $14.07\nPower             $44.21\nTaxes              $2.63\nTotal               $84.79\n\n* Please contact the Woodbury Gas & Electric Company to raise any questions about your charge.\nInvoice prepared by: Charles Holmes, Accounting Assistant\n\n--------------------------------------------------\n\nCarol Wyse\n3590 Main St.\nWoodbury, VA\nMay 8, 2008\n\nDear Ms. Wyse,\n\nAn error in your invoice of April 16, 2008, has come to the attention of our accounting office. You were overcharged for the electricity you consumed in the month of March. The correct charge should have been $34.21. Please accept our apologies for this mistake.\n\nWe received your payment of $84.79 on May 2, 2008. The overcharge will be deducted from your bill and you will receive a credit. This surplus will be subtracted from your next bill. In addition, because we value you as a loyal Woodbury Gas & Electric customer, we will also apply a discount of $5.00 to your next bill.\n\nAgain, we apologize for any inconvenience this error may have caused you. Our goal at Woodbury Gas & Electric is to provide you with safe and reliable utility services at reasonable rates. If you have any questions about this matter, please contact the client relations officer Marc Baldwin at markbaldwin@woodbury.com. You can also learn more about any of our products and services by calling Barbara Cameron at the customer service department on 1-800-398-6334.\n\nThank you and have a great day,\n\nAndreas Hardin, Customer Service Director\nWoodbury Gas & Electric Company",
    "vietnameseTranslation": "Công ty Điện & Gas Woodbury\nHóa đơn khách hàng\n\nTên khách hàng: Carol Wyse\nMã khách hàng: 3569-F9J3-5704\nĐịa chỉ khách hàng: 3590 Đường Main, Woodbury, VA\nNgày lập hóa đơn: 16 tháng 4, 2008\nKỳ thanh toán: 1 tháng 3 - 31 tháng 3\nTổng số tiền phải thanh toán: $84.79\n\nChi tiết tiền các dịch vụ:\nSưởi gas: $23.88\nGas nấu ăn: $14.07\nTiền điện (Power): $44.21\nThuế: $2.63\nTổng cộng: $84.79\n\n--------------------------------------------------\n\nCarol Wyse, 3590 Đường Main, Woodbury, VA\nNgày 8 tháng 5, 2008\n\nKính gửi cô Wyse,\n\nMột sai sót trong hóa đơn ngày 16 tháng 4 năm 2008 của cô đã được phòng kế toán phát hiện. Cô đã bị tính tiền vượt mức cho lượng điện tiêu thụ trong tháng 3. Mức phí chính xác đáng lẽ là $34.21. Xin chân thành cáo lỗi vì sự cố này.\n\nChúng tôi đã nhận được khoản thanh toán $84.79 của cô vào ngày 2 tháng 5 năm 2008. Số tiền bị tính thừa sẽ được trừ vào hóa đơn tiếp theo dưới dạng tiền hoàn lại (credit). Ngoài ra, chúng tôi cũng sẽ giảm thêm $5.00 cho hóa đơn kỳ tới của cô... Nếu có thắc mắc, vui lòng liên hệ nhân viên phụ trách quan hệ khách hàng Marc Baldwin...",
    "questionIds": [
      "test2_181",
      "test2_182",
      "test2_183",
      "test2_184",
      "test2_185"
    ],
    "clues": [
      {
        "questionNum": 181,
        "correctAnswer": "C",
        "clueLocation": "Hóa đơn, dòng 4",
        "clueQuote": "Date: April 16, 2008",
        "scanningTip": "Tìm chữ 'Date' trên phần hóa đơn."
      },
      {
        "questionNum": 182,
        "correctAnswer": "C",
        "clueLocation": "Thư, đoạn 1, dòng 1-2",
        "clueQuote": "An error in your invoice of April 16, 2008, has come to the attention of our accounting office.",
        "scanningTip": "Đọc câu đầu tiên của lá thư thứ 2."
      },
      {
        "questionNum": 183,
        "correctAnswer": "C",
        "clueLocation": "Hóa đơn & Thư đoạn 1",
        "clueQuote": "Hóa đơn: 'Power $44.21' | Thư: 'overcharged for the electricity you consumed'",
        "scanningTip": "Kết hợp từ khóa 'electricity' trong thư với dòng 'Power' trên hóa đơn."
      },
      {
        "questionNum": 184,
        "correctAnswer": "A",
        "clueLocation": "Thư, đoạn 2, dòng 4-5",
        "clueQuote": "we will also apply a discount of $5.00 to your next bill.",
        "scanningTip": "Tìm từ 'discount' ở đoạn 2 của thư."
      },
      {
        "questionNum": 185,
        "correctAnswer": "A",
        "clueLocation": "Thư, đoạn 3, dòng 2-4",
        "clueQuote": "If you have any questions about this matter, please contact the client relations officer Marc Baldwin",
        "scanningTip": "Tìm tên 'Marc Baldwin' ở đoạn cuối thư."
      }
    ]
  },
  "clue": {
    "questionNum": 181,
    "correctAnswer": "C",
    "clueLocation": "Hóa đơn, dòng 4",
    "clueQuote": "Date: April 16, 2008",
    "scanningTip": "Tìm chữ 'Date' trên phần hóa đơn."
  }
},
{
  "id": "test2_182",
  "num": 182,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "What is the purpose of the letter?",
  "options": {
    "A": "To report a possible price increase",
    "B": "To request an overdue payment",
    "C": "To explain a recent billing mistake",
    "D": "To ask a customer for information"
  },
  "correctAnswer": "C",
  "explanation": "Thư mở đầu: 'An error in your invoice of April 16, 2008, has come to the attention... You were overcharged...' -> giải thích lỗi sai trên hóa đơn (explain a recent billing mistake).",
  "tip": "⚡ MẸO: 'error in your invoice' = 'billing mistake'.",
  "keywords": [
    "error in your invoice",
    "billing mistake"
  ],
  "vietnameseMeaning": "Mục đích của lá thư là gì?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_woodbury",
  "passageInfo": {
    "id": "test2_p7_woodbury",
    "title": "Đoạn Kép: Hóa Đơn & Thư Điều Chỉnh Tiền Điện - Woodbury Gas & Electric",
    "content": "Woodbury Gas & Electric Company\nCustomer Invoice\n\nCustomer name: Carol Wyse\nCustomer ID: 3569-F9J3-5704\nCustomer address: 3590 Main St., Woodbury, VA\nDate: April 16, 2008\n\nBilling period: March 1 - March 31\nPrevious balance:  $0.00\nNew balance:        $84.79\nTotal amount due: $84.79\n\nDetails of charges in this billing period:\nGas Heat        $23.88\nCooking Gas  $14.07\nPower             $44.21\nTaxes              $2.63\nTotal               $84.79\n\n* Please contact the Woodbury Gas & Electric Company to raise any questions about your charge.\nInvoice prepared by: Charles Holmes, Accounting Assistant\n\n--------------------------------------------------\n\nCarol Wyse\n3590 Main St.\nWoodbury, VA\nMay 8, 2008\n\nDear Ms. Wyse,\n\nAn error in your invoice of April 16, 2008, has come to the attention of our accounting office. You were overcharged for the electricity you consumed in the month of March. The correct charge should have been $34.21. Please accept our apologies for this mistake.\n\nWe received your payment of $84.79 on May 2, 2008. The overcharge will be deducted from your bill and you will receive a credit. This surplus will be subtracted from your next bill. In addition, because we value you as a loyal Woodbury Gas & Electric customer, we will also apply a discount of $5.00 to your next bill.\n\nAgain, we apologize for any inconvenience this error may have caused you. Our goal at Woodbury Gas & Electric is to provide you with safe and reliable utility services at reasonable rates. If you have any questions about this matter, please contact the client relations officer Marc Baldwin at markbaldwin@woodbury.com. You can also learn more about any of our products and services by calling Barbara Cameron at the customer service department on 1-800-398-6334.\n\nThank you and have a great day,\n\nAndreas Hardin, Customer Service Director\nWoodbury Gas & Electric Company",
    "vietnameseTranslation": "Công ty Điện & Gas Woodbury\nHóa đơn khách hàng\n\nTên khách hàng: Carol Wyse\nMã khách hàng: 3569-F9J3-5704\nĐịa chỉ khách hàng: 3590 Đường Main, Woodbury, VA\nNgày lập hóa đơn: 16 tháng 4, 2008\nKỳ thanh toán: 1 tháng 3 - 31 tháng 3\nTổng số tiền phải thanh toán: $84.79\n\nChi tiết tiền các dịch vụ:\nSưởi gas: $23.88\nGas nấu ăn: $14.07\nTiền điện (Power): $44.21\nThuế: $2.63\nTổng cộng: $84.79\n\n--------------------------------------------------\n\nCarol Wyse, 3590 Đường Main, Woodbury, VA\nNgày 8 tháng 5, 2008\n\nKính gửi cô Wyse,\n\nMột sai sót trong hóa đơn ngày 16 tháng 4 năm 2008 của cô đã được phòng kế toán phát hiện. Cô đã bị tính tiền vượt mức cho lượng điện tiêu thụ trong tháng 3. Mức phí chính xác đáng lẽ là $34.21. Xin chân thành cáo lỗi vì sự cố này.\n\nChúng tôi đã nhận được khoản thanh toán $84.79 của cô vào ngày 2 tháng 5 năm 2008. Số tiền bị tính thừa sẽ được trừ vào hóa đơn tiếp theo dưới dạng tiền hoàn lại (credit). Ngoài ra, chúng tôi cũng sẽ giảm thêm $5.00 cho hóa đơn kỳ tới của cô... Nếu có thắc mắc, vui lòng liên hệ nhân viên phụ trách quan hệ khách hàng Marc Baldwin...",
    "questionIds": [
      "test2_181",
      "test2_182",
      "test2_183",
      "test2_184",
      "test2_185"
    ],
    "clues": [
      {
        "questionNum": 181,
        "correctAnswer": "C",
        "clueLocation": "Hóa đơn, dòng 4",
        "clueQuote": "Date: April 16, 2008",
        "scanningTip": "Tìm chữ 'Date' trên phần hóa đơn."
      },
      {
        "questionNum": 182,
        "correctAnswer": "C",
        "clueLocation": "Thư, đoạn 1, dòng 1-2",
        "clueQuote": "An error in your invoice of April 16, 2008, has come to the attention of our accounting office.",
        "scanningTip": "Đọc câu đầu tiên của lá thư thứ 2."
      },
      {
        "questionNum": 183,
        "correctAnswer": "C",
        "clueLocation": "Hóa đơn & Thư đoạn 1",
        "clueQuote": "Hóa đơn: 'Power $44.21' | Thư: 'overcharged for the electricity you consumed'",
        "scanningTip": "Kết hợp từ khóa 'electricity' trong thư với dòng 'Power' trên hóa đơn."
      },
      {
        "questionNum": 184,
        "correctAnswer": "A",
        "clueLocation": "Thư, đoạn 2, dòng 4-5",
        "clueQuote": "we will also apply a discount of $5.00 to your next bill.",
        "scanningTip": "Tìm từ 'discount' ở đoạn 2 của thư."
      },
      {
        "questionNum": 185,
        "correctAnswer": "A",
        "clueLocation": "Thư, đoạn 3, dòng 2-4",
        "clueQuote": "If you have any questions about this matter, please contact the client relations officer Marc Baldwin",
        "scanningTip": "Tìm tên 'Marc Baldwin' ở đoạn cuối thư."
      }
    ]
  },
  "clue": {
    "questionNum": 182,
    "correctAnswer": "C",
    "clueLocation": "Thư, đoạn 1, dòng 1-2",
    "clueQuote": "An error in your invoice of April 16, 2008, has come to the attention of our accounting office.",
    "scanningTip": "Đọc câu đầu tiên của lá thư thứ 2."
  }
},
{
  "id": "test2_183",
  "num": 183,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "How much was the fee for the overcharged utility?",
  "options": {
    "A": "$23.88",
    "B": "$14.07",
    "C": "$44.21",
    "D": "$2.63"
  },
  "correctAnswer": "C",
  "explanation": "Lá thư nói: 'You were overcharged for the electricity... The correct charge should have been $34.21'. Nhìn lại hóa đơn mục điện (Power): ghi $44.21.",
  "tip": "⚡ MẸO: Hỏi khoản phí tiện ích bị tính thừa trên hóa đơn -> tiện ích bị tính thừa là điện ('Power'), trên hóa đơn là $44.21.",
  "keywords": [
    "overcharged",
    "electricity",
    "Power",
    "$44.21"
  ],
  "vietnameseMeaning": "Khoản phí tiện ích bị tính thừa trên hóa đơn là bao nhiêu?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_woodbury",
  "passageInfo": {
    "id": "test2_p7_woodbury",
    "title": "Đoạn Kép: Hóa Đơn & Thư Điều Chỉnh Tiền Điện - Woodbury Gas & Electric",
    "content": "Woodbury Gas & Electric Company\nCustomer Invoice\n\nCustomer name: Carol Wyse\nCustomer ID: 3569-F9J3-5704\nCustomer address: 3590 Main St., Woodbury, VA\nDate: April 16, 2008\n\nBilling period: March 1 - March 31\nPrevious balance:  $0.00\nNew balance:        $84.79\nTotal amount due: $84.79\n\nDetails of charges in this billing period:\nGas Heat        $23.88\nCooking Gas  $14.07\nPower             $44.21\nTaxes              $2.63\nTotal               $84.79\n\n* Please contact the Woodbury Gas & Electric Company to raise any questions about your charge.\nInvoice prepared by: Charles Holmes, Accounting Assistant\n\n--------------------------------------------------\n\nCarol Wyse\n3590 Main St.\nWoodbury, VA\nMay 8, 2008\n\nDear Ms. Wyse,\n\nAn error in your invoice of April 16, 2008, has come to the attention of our accounting office. You were overcharged for the electricity you consumed in the month of March. The correct charge should have been $34.21. Please accept our apologies for this mistake.\n\nWe received your payment of $84.79 on May 2, 2008. The overcharge will be deducted from your bill and you will receive a credit. This surplus will be subtracted from your next bill. In addition, because we value you as a loyal Woodbury Gas & Electric customer, we will also apply a discount of $5.00 to your next bill.\n\nAgain, we apologize for any inconvenience this error may have caused you. Our goal at Woodbury Gas & Electric is to provide you with safe and reliable utility services at reasonable rates. If you have any questions about this matter, please contact the client relations officer Marc Baldwin at markbaldwin@woodbury.com. You can also learn more about any of our products and services by calling Barbara Cameron at the customer service department on 1-800-398-6334.\n\nThank you and have a great day,\n\nAndreas Hardin, Customer Service Director\nWoodbury Gas & Electric Company",
    "vietnameseTranslation": "Công ty Điện & Gas Woodbury\nHóa đơn khách hàng\n\nTên khách hàng: Carol Wyse\nMã khách hàng: 3569-F9J3-5704\nĐịa chỉ khách hàng: 3590 Đường Main, Woodbury, VA\nNgày lập hóa đơn: 16 tháng 4, 2008\nKỳ thanh toán: 1 tháng 3 - 31 tháng 3\nTổng số tiền phải thanh toán: $84.79\n\nChi tiết tiền các dịch vụ:\nSưởi gas: $23.88\nGas nấu ăn: $14.07\nTiền điện (Power): $44.21\nThuế: $2.63\nTổng cộng: $84.79\n\n--------------------------------------------------\n\nCarol Wyse, 3590 Đường Main, Woodbury, VA\nNgày 8 tháng 5, 2008\n\nKính gửi cô Wyse,\n\nMột sai sót trong hóa đơn ngày 16 tháng 4 năm 2008 của cô đã được phòng kế toán phát hiện. Cô đã bị tính tiền vượt mức cho lượng điện tiêu thụ trong tháng 3. Mức phí chính xác đáng lẽ là $34.21. Xin chân thành cáo lỗi vì sự cố này.\n\nChúng tôi đã nhận được khoản thanh toán $84.79 của cô vào ngày 2 tháng 5 năm 2008. Số tiền bị tính thừa sẽ được trừ vào hóa đơn tiếp theo dưới dạng tiền hoàn lại (credit). Ngoài ra, chúng tôi cũng sẽ giảm thêm $5.00 cho hóa đơn kỳ tới của cô... Nếu có thắc mắc, vui lòng liên hệ nhân viên phụ trách quan hệ khách hàng Marc Baldwin...",
    "questionIds": [
      "test2_181",
      "test2_182",
      "test2_183",
      "test2_184",
      "test2_185"
    ],
    "clues": [
      {
        "questionNum": 181,
        "correctAnswer": "C",
        "clueLocation": "Hóa đơn, dòng 4",
        "clueQuote": "Date: April 16, 2008",
        "scanningTip": "Tìm chữ 'Date' trên phần hóa đơn."
      },
      {
        "questionNum": 182,
        "correctAnswer": "C",
        "clueLocation": "Thư, đoạn 1, dòng 1-2",
        "clueQuote": "An error in your invoice of April 16, 2008, has come to the attention of our accounting office.",
        "scanningTip": "Đọc câu đầu tiên của lá thư thứ 2."
      },
      {
        "questionNum": 183,
        "correctAnswer": "C",
        "clueLocation": "Hóa đơn & Thư đoạn 1",
        "clueQuote": "Hóa đơn: 'Power $44.21' | Thư: 'overcharged for the electricity you consumed'",
        "scanningTip": "Kết hợp từ khóa 'electricity' trong thư với dòng 'Power' trên hóa đơn."
      },
      {
        "questionNum": 184,
        "correctAnswer": "A",
        "clueLocation": "Thư, đoạn 2, dòng 4-5",
        "clueQuote": "we will also apply a discount of $5.00 to your next bill.",
        "scanningTip": "Tìm từ 'discount' ở đoạn 2 của thư."
      },
      {
        "questionNum": 185,
        "correctAnswer": "A",
        "clueLocation": "Thư, đoạn 3, dòng 2-4",
        "clueQuote": "If you have any questions about this matter, please contact the client relations officer Marc Baldwin",
        "scanningTip": "Tìm tên 'Marc Baldwin' ở đoạn cuối thư."
      }
    ]
  },
  "clue": {
    "questionNum": 183,
    "correctAnswer": "C",
    "clueLocation": "Hóa đơn & Thư đoạn 1",
    "clueQuote": "Hóa đơn: 'Power $44.21' | Thư: 'overcharged for the electricity you consumed'",
    "scanningTip": "Kết hợp từ khóa 'electricity' trong thư với dòng 'Power' trên hóa đơn."
  }
},
{
  "id": "test2_184",
  "num": 184,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "What will happen with Ms. Wyse's next bill?",
  "options": {
    "A": "It will be discounted.",
    "B": "It will include a penalty payment.",
    "C": "It will be completely waived.",
    "D": "It will contain a surplus charge."
  },
  "correctAnswer": "A",
  "explanation": "Thư đoạn 2: 'we will also apply a discount of $5.00 to your next bill' (được giảm giá $5 cho hóa đơn tới).",
  "tip": "⚡ MẸO: 'apply a discount of $5.00 to your next bill' = 'It will be discounted'.",
  "keywords": [
    "apply a discount",
    "next bill"
  ],
  "vietnameseMeaning": "Điều gì sẽ xảy ra với hóa đơn tiếp theo của cô Wyse?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_woodbury",
  "passageInfo": {
    "id": "test2_p7_woodbury",
    "title": "Đoạn Kép: Hóa Đơn & Thư Điều Chỉnh Tiền Điện - Woodbury Gas & Electric",
    "content": "Woodbury Gas & Electric Company\nCustomer Invoice\n\nCustomer name: Carol Wyse\nCustomer ID: 3569-F9J3-5704\nCustomer address: 3590 Main St., Woodbury, VA\nDate: April 16, 2008\n\nBilling period: March 1 - March 31\nPrevious balance:  $0.00\nNew balance:        $84.79\nTotal amount due: $84.79\n\nDetails of charges in this billing period:\nGas Heat        $23.88\nCooking Gas  $14.07\nPower             $44.21\nTaxes              $2.63\nTotal               $84.79\n\n* Please contact the Woodbury Gas & Electric Company to raise any questions about your charge.\nInvoice prepared by: Charles Holmes, Accounting Assistant\n\n--------------------------------------------------\n\nCarol Wyse\n3590 Main St.\nWoodbury, VA\nMay 8, 2008\n\nDear Ms. Wyse,\n\nAn error in your invoice of April 16, 2008, has come to the attention of our accounting office. You were overcharged for the electricity you consumed in the month of March. The correct charge should have been $34.21. Please accept our apologies for this mistake.\n\nWe received your payment of $84.79 on May 2, 2008. The overcharge will be deducted from your bill and you will receive a credit. This surplus will be subtracted from your next bill. In addition, because we value you as a loyal Woodbury Gas & Electric customer, we will also apply a discount of $5.00 to your next bill.\n\nAgain, we apologize for any inconvenience this error may have caused you. Our goal at Woodbury Gas & Electric is to provide you with safe and reliable utility services at reasonable rates. If you have any questions about this matter, please contact the client relations officer Marc Baldwin at markbaldwin@woodbury.com. You can also learn more about any of our products and services by calling Barbara Cameron at the customer service department on 1-800-398-6334.\n\nThank you and have a great day,\n\nAndreas Hardin, Customer Service Director\nWoodbury Gas & Electric Company",
    "vietnameseTranslation": "Công ty Điện & Gas Woodbury\nHóa đơn khách hàng\n\nTên khách hàng: Carol Wyse\nMã khách hàng: 3569-F9J3-5704\nĐịa chỉ khách hàng: 3590 Đường Main, Woodbury, VA\nNgày lập hóa đơn: 16 tháng 4, 2008\nKỳ thanh toán: 1 tháng 3 - 31 tháng 3\nTổng số tiền phải thanh toán: $84.79\n\nChi tiết tiền các dịch vụ:\nSưởi gas: $23.88\nGas nấu ăn: $14.07\nTiền điện (Power): $44.21\nThuế: $2.63\nTổng cộng: $84.79\n\n--------------------------------------------------\n\nCarol Wyse, 3590 Đường Main, Woodbury, VA\nNgày 8 tháng 5, 2008\n\nKính gửi cô Wyse,\n\nMột sai sót trong hóa đơn ngày 16 tháng 4 năm 2008 của cô đã được phòng kế toán phát hiện. Cô đã bị tính tiền vượt mức cho lượng điện tiêu thụ trong tháng 3. Mức phí chính xác đáng lẽ là $34.21. Xin chân thành cáo lỗi vì sự cố này.\n\nChúng tôi đã nhận được khoản thanh toán $84.79 của cô vào ngày 2 tháng 5 năm 2008. Số tiền bị tính thừa sẽ được trừ vào hóa đơn tiếp theo dưới dạng tiền hoàn lại (credit). Ngoài ra, chúng tôi cũng sẽ giảm thêm $5.00 cho hóa đơn kỳ tới của cô... Nếu có thắc mắc, vui lòng liên hệ nhân viên phụ trách quan hệ khách hàng Marc Baldwin...",
    "questionIds": [
      "test2_181",
      "test2_182",
      "test2_183",
      "test2_184",
      "test2_185"
    ],
    "clues": [
      {
        "questionNum": 181,
        "correctAnswer": "C",
        "clueLocation": "Hóa đơn, dòng 4",
        "clueQuote": "Date: April 16, 2008",
        "scanningTip": "Tìm chữ 'Date' trên phần hóa đơn."
      },
      {
        "questionNum": 182,
        "correctAnswer": "C",
        "clueLocation": "Thư, đoạn 1, dòng 1-2",
        "clueQuote": "An error in your invoice of April 16, 2008, has come to the attention of our accounting office.",
        "scanningTip": "Đọc câu đầu tiên của lá thư thứ 2."
      },
      {
        "questionNum": 183,
        "correctAnswer": "C",
        "clueLocation": "Hóa đơn & Thư đoạn 1",
        "clueQuote": "Hóa đơn: 'Power $44.21' | Thư: 'overcharged for the electricity you consumed'",
        "scanningTip": "Kết hợp từ khóa 'electricity' trong thư với dòng 'Power' trên hóa đơn."
      },
      {
        "questionNum": 184,
        "correctAnswer": "A",
        "clueLocation": "Thư, đoạn 2, dòng 4-5",
        "clueQuote": "we will also apply a discount of $5.00 to your next bill.",
        "scanningTip": "Tìm từ 'discount' ở đoạn 2 của thư."
      },
      {
        "questionNum": 185,
        "correctAnswer": "A",
        "clueLocation": "Thư, đoạn 3, dòng 2-4",
        "clueQuote": "If you have any questions about this matter, please contact the client relations officer Marc Baldwin",
        "scanningTip": "Tìm tên 'Marc Baldwin' ở đoạn cuối thư."
      }
    ]
  },
  "clue": {
    "questionNum": 184,
    "correctAnswer": "A",
    "clueLocation": "Thư, đoạn 2, dòng 4-5",
    "clueQuote": "we will also apply a discount of $5.00 to your next bill.",
    "scanningTip": "Tìm từ 'discount' ở đoạn 2 của thư."
  }
},
{
  "id": "test2_185",
  "num": 185,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "What does Marc Baldwin do in the company?",
  "options": {
    "A": "He handles customer complaints.",
    "B": "He introduces products and services to customers.",
    "C": "He prepares invoices.",
    "D": "He is the head of the customer service department."
  },
  "correctAnswer": "A",
  "explanation": "Thư đoạn 3: 'If you have any questions about this matter [sai sót hóa đơn], please contact the client relations officer Marc Baldwin' -> cán bộ quan hệ khách hàng giải quyết thắc mắc khiếu nại (handles customer complaints).",
  "tip": "⚡ MẸO: 'questions about this matter [error] -> contact client relations officer Marc Baldwin' = phụ trách khiếu nại khách hàng.",
  "keywords": [
    "client relations officer",
    "Marc Baldwin",
    "complaints"
  ],
  "vietnameseMeaning": "Marc Baldwin làm công việc gì trong công ty?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_woodbury",
  "passageInfo": {
    "id": "test2_p7_woodbury",
    "title": "Đoạn Kép: Hóa Đơn & Thư Điều Chỉnh Tiền Điện - Woodbury Gas & Electric",
    "content": "Woodbury Gas & Electric Company\nCustomer Invoice\n\nCustomer name: Carol Wyse\nCustomer ID: 3569-F9J3-5704\nCustomer address: 3590 Main St., Woodbury, VA\nDate: April 16, 2008\n\nBilling period: March 1 - March 31\nPrevious balance:  $0.00\nNew balance:        $84.79\nTotal amount due: $84.79\n\nDetails of charges in this billing period:\nGas Heat        $23.88\nCooking Gas  $14.07\nPower             $44.21\nTaxes              $2.63\nTotal               $84.79\n\n* Please contact the Woodbury Gas & Electric Company to raise any questions about your charge.\nInvoice prepared by: Charles Holmes, Accounting Assistant\n\n--------------------------------------------------\n\nCarol Wyse\n3590 Main St.\nWoodbury, VA\nMay 8, 2008\n\nDear Ms. Wyse,\n\nAn error in your invoice of April 16, 2008, has come to the attention of our accounting office. You were overcharged for the electricity you consumed in the month of March. The correct charge should have been $34.21. Please accept our apologies for this mistake.\n\nWe received your payment of $84.79 on May 2, 2008. The overcharge will be deducted from your bill and you will receive a credit. This surplus will be subtracted from your next bill. In addition, because we value you as a loyal Woodbury Gas & Electric customer, we will also apply a discount of $5.00 to your next bill.\n\nAgain, we apologize for any inconvenience this error may have caused you. Our goal at Woodbury Gas & Electric is to provide you with safe and reliable utility services at reasonable rates. If you have any questions about this matter, please contact the client relations officer Marc Baldwin at markbaldwin@woodbury.com. You can also learn more about any of our products and services by calling Barbara Cameron at the customer service department on 1-800-398-6334.\n\nThank you and have a great day,\n\nAndreas Hardin, Customer Service Director\nWoodbury Gas & Electric Company",
    "vietnameseTranslation": "Công ty Điện & Gas Woodbury\nHóa đơn khách hàng\n\nTên khách hàng: Carol Wyse\nMã khách hàng: 3569-F9J3-5704\nĐịa chỉ khách hàng: 3590 Đường Main, Woodbury, VA\nNgày lập hóa đơn: 16 tháng 4, 2008\nKỳ thanh toán: 1 tháng 3 - 31 tháng 3\nTổng số tiền phải thanh toán: $84.79\n\nChi tiết tiền các dịch vụ:\nSưởi gas: $23.88\nGas nấu ăn: $14.07\nTiền điện (Power): $44.21\nThuế: $2.63\nTổng cộng: $84.79\n\n--------------------------------------------------\n\nCarol Wyse, 3590 Đường Main, Woodbury, VA\nNgày 8 tháng 5, 2008\n\nKính gửi cô Wyse,\n\nMột sai sót trong hóa đơn ngày 16 tháng 4 năm 2008 của cô đã được phòng kế toán phát hiện. Cô đã bị tính tiền vượt mức cho lượng điện tiêu thụ trong tháng 3. Mức phí chính xác đáng lẽ là $34.21. Xin chân thành cáo lỗi vì sự cố này.\n\nChúng tôi đã nhận được khoản thanh toán $84.79 của cô vào ngày 2 tháng 5 năm 2008. Số tiền bị tính thừa sẽ được trừ vào hóa đơn tiếp theo dưới dạng tiền hoàn lại (credit). Ngoài ra, chúng tôi cũng sẽ giảm thêm $5.00 cho hóa đơn kỳ tới của cô... Nếu có thắc mắc, vui lòng liên hệ nhân viên phụ trách quan hệ khách hàng Marc Baldwin...",
    "questionIds": [
      "test2_181",
      "test2_182",
      "test2_183",
      "test2_184",
      "test2_185"
    ],
    "clues": [
      {
        "questionNum": 181,
        "correctAnswer": "C",
        "clueLocation": "Hóa đơn, dòng 4",
        "clueQuote": "Date: April 16, 2008",
        "scanningTip": "Tìm chữ 'Date' trên phần hóa đơn."
      },
      {
        "questionNum": 182,
        "correctAnswer": "C",
        "clueLocation": "Thư, đoạn 1, dòng 1-2",
        "clueQuote": "An error in your invoice of April 16, 2008, has come to the attention of our accounting office.",
        "scanningTip": "Đọc câu đầu tiên của lá thư thứ 2."
      },
      {
        "questionNum": 183,
        "correctAnswer": "C",
        "clueLocation": "Hóa đơn & Thư đoạn 1",
        "clueQuote": "Hóa đơn: 'Power $44.21' | Thư: 'overcharged for the electricity you consumed'",
        "scanningTip": "Kết hợp từ khóa 'electricity' trong thư với dòng 'Power' trên hóa đơn."
      },
      {
        "questionNum": 184,
        "correctAnswer": "A",
        "clueLocation": "Thư, đoạn 2, dòng 4-5",
        "clueQuote": "we will also apply a discount of $5.00 to your next bill.",
        "scanningTip": "Tìm từ 'discount' ở đoạn 2 của thư."
      },
      {
        "questionNum": 185,
        "correctAnswer": "A",
        "clueLocation": "Thư, đoạn 3, dòng 2-4",
        "clueQuote": "If you have any questions about this matter, please contact the client relations officer Marc Baldwin",
        "scanningTip": "Tìm tên 'Marc Baldwin' ở đoạn cuối thư."
      }
    ]
  },
  "clue": {
    "questionNum": 185,
    "correctAnswer": "A",
    "clueLocation": "Thư, đoạn 3, dòng 2-4",
    "clueQuote": "If you have any questions about this matter, please contact the client relations officer Marc Baldwin",
    "scanningTip": "Tìm tên 'Marc Baldwin' ở đoạn cuối thư."
  }
},
{
  "id": "test2_186",
  "num": 186,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "For whom is Ms. Miller's email intended?",
  "options": {
    "A": "A delivery person",
    "B": "A shipping company executive",
    "C": "A coworker at her company",
    "D": "Her department supervisor"
  },
  "correctAnswer": "C",
  "explanation": "Email gửi cho Tomas Varela, một đồng nghiệp cùng công ty ('My supervisor suggested that I coordinate with you', Cc cho supervisor Glen Beamer -> đồng nghiệp tại công ty = A coworker at her company).",
  "tip": "⚡ MẸO: Gửi nội bộ trong công ty, nhờ đồng nghiệp phối hợp = 'coworker at her company'.",
  "keywords": [
    "coordinate with you",
    "coworker"
  ],
  "vietnameseMeaning": "Email của cô Miller nhằm gửi tới đối tượng nào?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_shipping",
  "passageInfo": {
    "id": "test2_p7_shipping",
    "title": "Đoạn Kép: Trao Đổi Tìm Đối Tác Vận Chuyển Mới - Katie Miller & Tomas Varela",
    "content": "To: Tomas Varela\nFrom: Katie Miller\nCc: Glen Beamer\nSubject: New shipping firm needed\n\nMr. Varela,\n\nMy name is Katie Miller, and I work in the accounts payable department. My supervisor, Glen Beamer, has decided to end our contract with the shipping firm Hamilton Express due to their lack of reliability. He suggested that I coordinate with you to find a replacement because of your past experience in the shipping industry.\n\nSpecifically, we are looking for a company that can consistently handle our frequent next-day deliveries. These shipments are often sent to international destinations and must arrive within 48 hours of being mailed.\n\nPlease contact me with the names and details of any firms you think will be able to meet our needs. Your assistance in this matter is greatly appreciated.\n\n- Katie Miller\n\n--------------------------------------------------\n\nTo: Katie Miller\nFrom: Tomas Varela\nCc: Glen Beamer\nRE: New shipping firm needed\n\nHello Ms. Miller,\n\nI have already completed some research concerning shipping firm options. I am also sending this email to Glen Beamer so that he can review my findings.\n\nAs you know, ever since they were acquired a year ago by U.S. Parcels, they have been shifting their focus away from international shipments. As a result, they are now much less capable in this area.\n\nI have found two companies that I think can provide us with reliable shipping services:\n\nThe first is Worldwide Delivery, Inc. They have facilities in North America, Europe, and Asia, and international shipments make up most of their business.\n\nThe second option is FMH Airmail. Although they are not as widespread as Worldwide Delivery, they offer very competitive rates for corporate clients like us.\n\nIf your department decides to pursue a contract with one of these firms, I would be happy to participate in the negotiations. Just let me know if I can be of assistance.\n\n- Tomas Varela",
    "vietnameseTranslation": "Đến: Tomas Varela\nTừ: Katie Miller\nĐồng kính gửi: Glen Beamer\nChủ đề: Cần tìm công ty vận chuyển mới\n\nChào ông Varela,\nTôi là Katie Miller, làm việc tại phòng kế toán công nợ phải trả. Người giám sát của tôi, ông Glen Beamer, đã quyết định chấm dứt hợp đồng với công ty vận chuyển Hamilton Express vì họ thiếu tin cậy. Ông ấy đề nghị tôi phối hợp với ông để tìm đối tác thay thế do ông có kinh nghiệm làm việc trong ngành vận chuyển...\n\n--------------------------------------------------\n\nĐến: Katie Miller\nTừ: Tomas Varela\nĐồng kính gửi: Glen Beamer\nVề việc: Cần tìm công ty vận chuyển mới\n\nChào cô Miller,\nTôi đã hoàn thành một số nghiên cứu về các lựa chọn đối tác vận chuyển... Tôi đã tìm thấy 2 công ty đáng tin cậy:\nThứ nhất là Worldwide Delivery, Inc. Họ có cơ sở tại Bắc Mỹ, Châu Âu, Châu Á và các chuyến hàng quốc tế chiếm phần lớn hoạt động kinh doanh của họ.\nLựa chọn thứ hai là FMH Airmail. Mặc dù mạng lưới không rộng bằng Worldwide Delivery, nhưng họ đưa ra mức giá rất cạnh tranh (rẻ) cho khách hàng doanh nghiệp như chúng ta.\nNếu phòng của cô quyết định xúc tiến hợp đồng, tôi rất sẵn lòng tham gia đàm phán...",
    "questionIds": [
      "test2_186",
      "test2_187",
      "test2_188",
      "test2_189",
      "test2_190"
    ],
    "clues": [
      {
        "questionNum": 186,
        "correctAnswer": "C",
        "clueLocation": "Email 1, đoạn 1, dòng 3-4",
        "clueQuote": "He suggested that I coordinate with you to find a replacement because of your past experience...",
        "scanningTip": "Đọc lời giới thiệu của Katie Miller ở email 1."
      },
      {
        "questionNum": 187,
        "correctAnswer": "A",
        "clueLocation": "Email 1, đoạn 1 & 2",
        "clueQuote": "end our contract with the shipping firm Hamilton Express due to their lack of reliability... sent to international destinations",
        "scanningTip": "Kết hợp lý do hủy hợp đồng ở đoạn 1 và tính chất đơn hàng ở đoạn 2."
      },
      {
        "questionNum": 188,
        "correctAnswer": "A",
        "clueLocation": "Email 2, đoạn 2, dòng 2-3",
        "clueQuote": "they are now much less capable in this area.",
        "scanningTip": "Đọc đánh giá của ông Varela về đơn vị hiện tại ở đoạn 2 của email 2."
      },
      {
        "questionNum": 189,
        "correctAnswer": "A",
        "clueLocation": "Email 2, đoạn 4, dòng 2",
        "clueQuote": "they offer very competitive rates for corporate clients like us.",
        "scanningTip": "Tìm cụm 'competitive rates' trong email 2."
      },
      {
        "questionNum": 190,
        "correctAnswer": "A",
        "clueLocation": "Email 2, đoạn cuối, dòng 1-2",
        "clueQuote": "If your department decides to pursue a contract with one of these firms, I would be happy to participate in the negotiations.",
        "scanningTip": "Đọc câu đề nghị giúp đỡ ở dòng cuối email 2."
      }
    ]
  },
  "clue": {
    "questionNum": 186,
    "correctAnswer": "C",
    "clueLocation": "Email 1, đoạn 1, dòng 3-4",
    "clueQuote": "He suggested that I coordinate with you to find a replacement because of your past experience...",
    "scanningTip": "Đọc lời giới thiệu của Katie Miller ở email 1."
  }
},
{
  "id": "test2_187",
  "num": 187,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "Why does Mr. Beamer want to change shipping agents?",
  "options": {
    "A": "The current firm is unreliable for overseas deliveries.",
    "B": "Mr. Varela told him about a provider with lower rates.",
    "C": "His company needs to send urgent shipments.",
    "D": "Hamilton Express is relocating its facilities overseas."
  },
  "correctAnswer": "A",
  "explanation": "Email 1: 'end our contract with the shipping firm Hamilton Express due to their lack of reliability... These shipments are often sent to international destinations' -> không đáng tin cậy cho giao hàng quốc tế (unreliable for overseas deliveries).",
  "tip": "⚡ MẸO: 'lack of reliability' + 'international destinations' = 'unreliable for overseas deliveries'.",
  "keywords": [
    "lack of reliability",
    "international destinations",
    "unreliable"
  ],
  "vietnameseMeaning": "Tại sao ông Beamer muốn đổi đơn vị vận chuyển?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_shipping",
  "passageInfo": {
    "id": "test2_p7_shipping",
    "title": "Đoạn Kép: Trao Đổi Tìm Đối Tác Vận Chuyển Mới - Katie Miller & Tomas Varela",
    "content": "To: Tomas Varela\nFrom: Katie Miller\nCc: Glen Beamer\nSubject: New shipping firm needed\n\nMr. Varela,\n\nMy name is Katie Miller, and I work in the accounts payable department. My supervisor, Glen Beamer, has decided to end our contract with the shipping firm Hamilton Express due to their lack of reliability. He suggested that I coordinate with you to find a replacement because of your past experience in the shipping industry.\n\nSpecifically, we are looking for a company that can consistently handle our frequent next-day deliveries. These shipments are often sent to international destinations and must arrive within 48 hours of being mailed.\n\nPlease contact me with the names and details of any firms you think will be able to meet our needs. Your assistance in this matter is greatly appreciated.\n\n- Katie Miller\n\n--------------------------------------------------\n\nTo: Katie Miller\nFrom: Tomas Varela\nCc: Glen Beamer\nRE: New shipping firm needed\n\nHello Ms. Miller,\n\nI have already completed some research concerning shipping firm options. I am also sending this email to Glen Beamer so that he can review my findings.\n\nAs you know, ever since they were acquired a year ago by U.S. Parcels, they have been shifting their focus away from international shipments. As a result, they are now much less capable in this area.\n\nI have found two companies that I think can provide us with reliable shipping services:\n\nThe first is Worldwide Delivery, Inc. They have facilities in North America, Europe, and Asia, and international shipments make up most of their business.\n\nThe second option is FMH Airmail. Although they are not as widespread as Worldwide Delivery, they offer very competitive rates for corporate clients like us.\n\nIf your department decides to pursue a contract with one of these firms, I would be happy to participate in the negotiations. Just let me know if I can be of assistance.\n\n- Tomas Varela",
    "vietnameseTranslation": "Đến: Tomas Varela\nTừ: Katie Miller\nĐồng kính gửi: Glen Beamer\nChủ đề: Cần tìm công ty vận chuyển mới\n\nChào ông Varela,\nTôi là Katie Miller, làm việc tại phòng kế toán công nợ phải trả. Người giám sát của tôi, ông Glen Beamer, đã quyết định chấm dứt hợp đồng với công ty vận chuyển Hamilton Express vì họ thiếu tin cậy. Ông ấy đề nghị tôi phối hợp với ông để tìm đối tác thay thế do ông có kinh nghiệm làm việc trong ngành vận chuyển...\n\n--------------------------------------------------\n\nĐến: Katie Miller\nTừ: Tomas Varela\nĐồng kính gửi: Glen Beamer\nVề việc: Cần tìm công ty vận chuyển mới\n\nChào cô Miller,\nTôi đã hoàn thành một số nghiên cứu về các lựa chọn đối tác vận chuyển... Tôi đã tìm thấy 2 công ty đáng tin cậy:\nThứ nhất là Worldwide Delivery, Inc. Họ có cơ sở tại Bắc Mỹ, Châu Âu, Châu Á và các chuyến hàng quốc tế chiếm phần lớn hoạt động kinh doanh của họ.\nLựa chọn thứ hai là FMH Airmail. Mặc dù mạng lưới không rộng bằng Worldwide Delivery, nhưng họ đưa ra mức giá rất cạnh tranh (rẻ) cho khách hàng doanh nghiệp như chúng ta.\nNếu phòng của cô quyết định xúc tiến hợp đồng, tôi rất sẵn lòng tham gia đàm phán...",
    "questionIds": [
      "test2_186",
      "test2_187",
      "test2_188",
      "test2_189",
      "test2_190"
    ],
    "clues": [
      {
        "questionNum": 186,
        "correctAnswer": "C",
        "clueLocation": "Email 1, đoạn 1, dòng 3-4",
        "clueQuote": "He suggested that I coordinate with you to find a replacement because of your past experience...",
        "scanningTip": "Đọc lời giới thiệu của Katie Miller ở email 1."
      },
      {
        "questionNum": 187,
        "correctAnswer": "A",
        "clueLocation": "Email 1, đoạn 1 & 2",
        "clueQuote": "end our contract with the shipping firm Hamilton Express due to their lack of reliability... sent to international destinations",
        "scanningTip": "Kết hợp lý do hủy hợp đồng ở đoạn 1 và tính chất đơn hàng ở đoạn 2."
      },
      {
        "questionNum": 188,
        "correctAnswer": "A",
        "clueLocation": "Email 2, đoạn 2, dòng 2-3",
        "clueQuote": "they are now much less capable in this area.",
        "scanningTip": "Đọc đánh giá của ông Varela về đơn vị hiện tại ở đoạn 2 của email 2."
      },
      {
        "questionNum": 189,
        "correctAnswer": "A",
        "clueLocation": "Email 2, đoạn 4, dòng 2",
        "clueQuote": "they offer very competitive rates for corporate clients like us.",
        "scanningTip": "Tìm cụm 'competitive rates' trong email 2."
      },
      {
        "questionNum": 190,
        "correctAnswer": "A",
        "clueLocation": "Email 2, đoạn cuối, dòng 1-2",
        "clueQuote": "If your department decides to pursue a contract with one of these firms, I would be happy to participate in the negotiations.",
        "scanningTip": "Đọc câu đề nghị giúp đỡ ở dòng cuối email 2."
      }
    ]
  },
  "clue": {
    "questionNum": 187,
    "correctAnswer": "A",
    "clueLocation": "Email 1, đoạn 1 & 2",
    "clueQuote": "end our contract with the shipping firm Hamilton Express due to their lack of reliability... sent to international destinations",
    "scanningTip": "Kết hợp lý do hủy hợp đồng ở đoạn 1 và tính chất đơn hàng ở đoạn 2."
  }
},
{
  "id": "test2_188",
  "num": 188,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "What can be inferred from Mr. Varela's comments about the current shipping agent?",
  "options": {
    "A": "He concurs with Mr. Beamer's opinion.",
    "B": "He thinks it is more capable than its rivals.",
    "C": "He is unaware of recent industry developments.",
    "D": "He disagrees that the company should change agents."
  },
  "correctAnswer": "A",
  "explanation": "Email 2, đoạn 2: Ông Varela giải thích rằng từ khi bị mua lại, hãng vận chuyển hiện tại đã chuyển hướng khỏi mảng quốc tế và 'now much less capable in this area' -> đồng tình hoàn toàn với nhận định của ông Beamer (He concurs with Mr. Beamer's opinion).",
  "tip": "⚡ MẸO: 'concurs with' = đồng ý (agrees with).",
  "keywords": [
    "concurs with",
    "less capable"
  ],
  "vietnameseMeaning": "Có thể suy ra điều gì từ nhận xét của ông Varela về đơn vị vận chuyển hiện tại?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_shipping",
  "passageInfo": {
    "id": "test2_p7_shipping",
    "title": "Đoạn Kép: Trao Đổi Tìm Đối Tác Vận Chuyển Mới - Katie Miller & Tomas Varela",
    "content": "To: Tomas Varela\nFrom: Katie Miller\nCc: Glen Beamer\nSubject: New shipping firm needed\n\nMr. Varela,\n\nMy name is Katie Miller, and I work in the accounts payable department. My supervisor, Glen Beamer, has decided to end our contract with the shipping firm Hamilton Express due to their lack of reliability. He suggested that I coordinate with you to find a replacement because of your past experience in the shipping industry.\n\nSpecifically, we are looking for a company that can consistently handle our frequent next-day deliveries. These shipments are often sent to international destinations and must arrive within 48 hours of being mailed.\n\nPlease contact me with the names and details of any firms you think will be able to meet our needs. Your assistance in this matter is greatly appreciated.\n\n- Katie Miller\n\n--------------------------------------------------\n\nTo: Katie Miller\nFrom: Tomas Varela\nCc: Glen Beamer\nRE: New shipping firm needed\n\nHello Ms. Miller,\n\nI have already completed some research concerning shipping firm options. I am also sending this email to Glen Beamer so that he can review my findings.\n\nAs you know, ever since they were acquired a year ago by U.S. Parcels, they have been shifting their focus away from international shipments. As a result, they are now much less capable in this area.\n\nI have found two companies that I think can provide us with reliable shipping services:\n\nThe first is Worldwide Delivery, Inc. They have facilities in North America, Europe, and Asia, and international shipments make up most of their business.\n\nThe second option is FMH Airmail. Although they are not as widespread as Worldwide Delivery, they offer very competitive rates for corporate clients like us.\n\nIf your department decides to pursue a contract with one of these firms, I would be happy to participate in the negotiations. Just let me know if I can be of assistance.\n\n- Tomas Varela",
    "vietnameseTranslation": "Đến: Tomas Varela\nTừ: Katie Miller\nĐồng kính gửi: Glen Beamer\nChủ đề: Cần tìm công ty vận chuyển mới\n\nChào ông Varela,\nTôi là Katie Miller, làm việc tại phòng kế toán công nợ phải trả. Người giám sát của tôi, ông Glen Beamer, đã quyết định chấm dứt hợp đồng với công ty vận chuyển Hamilton Express vì họ thiếu tin cậy. Ông ấy đề nghị tôi phối hợp với ông để tìm đối tác thay thế do ông có kinh nghiệm làm việc trong ngành vận chuyển...\n\n--------------------------------------------------\n\nĐến: Katie Miller\nTừ: Tomas Varela\nĐồng kính gửi: Glen Beamer\nVề việc: Cần tìm công ty vận chuyển mới\n\nChào cô Miller,\nTôi đã hoàn thành một số nghiên cứu về các lựa chọn đối tác vận chuyển... Tôi đã tìm thấy 2 công ty đáng tin cậy:\nThứ nhất là Worldwide Delivery, Inc. Họ có cơ sở tại Bắc Mỹ, Châu Âu, Châu Á và các chuyến hàng quốc tế chiếm phần lớn hoạt động kinh doanh của họ.\nLựa chọn thứ hai là FMH Airmail. Mặc dù mạng lưới không rộng bằng Worldwide Delivery, nhưng họ đưa ra mức giá rất cạnh tranh (rẻ) cho khách hàng doanh nghiệp như chúng ta.\nNếu phòng của cô quyết định xúc tiến hợp đồng, tôi rất sẵn lòng tham gia đàm phán...",
    "questionIds": [
      "test2_186",
      "test2_187",
      "test2_188",
      "test2_189",
      "test2_190"
    ],
    "clues": [
      {
        "questionNum": 186,
        "correctAnswer": "C",
        "clueLocation": "Email 1, đoạn 1, dòng 3-4",
        "clueQuote": "He suggested that I coordinate with you to find a replacement because of your past experience...",
        "scanningTip": "Đọc lời giới thiệu của Katie Miller ở email 1."
      },
      {
        "questionNum": 187,
        "correctAnswer": "A",
        "clueLocation": "Email 1, đoạn 1 & 2",
        "clueQuote": "end our contract with the shipping firm Hamilton Express due to their lack of reliability... sent to international destinations",
        "scanningTip": "Kết hợp lý do hủy hợp đồng ở đoạn 1 và tính chất đơn hàng ở đoạn 2."
      },
      {
        "questionNum": 188,
        "correctAnswer": "A",
        "clueLocation": "Email 2, đoạn 2, dòng 2-3",
        "clueQuote": "they are now much less capable in this area.",
        "scanningTip": "Đọc đánh giá của ông Varela về đơn vị hiện tại ở đoạn 2 của email 2."
      },
      {
        "questionNum": 189,
        "correctAnswer": "A",
        "clueLocation": "Email 2, đoạn 4, dòng 2",
        "clueQuote": "they offer very competitive rates for corporate clients like us.",
        "scanningTip": "Tìm cụm 'competitive rates' trong email 2."
      },
      {
        "questionNum": 190,
        "correctAnswer": "A",
        "clueLocation": "Email 2, đoạn cuối, dòng 1-2",
        "clueQuote": "If your department decides to pursue a contract with one of these firms, I would be happy to participate in the negotiations.",
        "scanningTip": "Đọc câu đề nghị giúp đỡ ở dòng cuối email 2."
      }
    ]
  },
  "clue": {
    "questionNum": 188,
    "correctAnswer": "A",
    "clueLocation": "Email 2, đoạn 2, dòng 2-3",
    "clueQuote": "they are now much less capable in this area.",
    "scanningTip": "Đọc đánh giá của ông Varela về đơn vị hiện tại ở đoạn 2 của email 2."
  }
},
{
  "id": "test2_189",
  "num": 189,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "Which company will probably have the lowest prices?",
  "options": {
    "A": "FMH Airmail",
    "B": "U.S. Parcels",
    "C": "Worldwide Delivery, Inc.",
    "D": "Hamilton Express"
  },
  "correctAnswer": "A",
  "explanation": "Email 2: 'The second option is FMH Airmail... they offer very competitive rates for corporate clients' -> mức giá cạnh tranh nhất (lowest prices) = FMH Airmail.",
  "tip": "⚡ MẸO: 'very competitive rates' = giá cạnh tranh / rẻ nhất (lowest prices).",
  "keywords": [
    "competitive rates",
    "lowest prices",
    "FMH Airmail"
  ],
  "vietnameseMeaning": "Công ty nào có khả năng đưa ra mức giá thấp nhất?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_shipping",
  "passageInfo": {
    "id": "test2_p7_shipping",
    "title": "Đoạn Kép: Trao Đổi Tìm Đối Tác Vận Chuyển Mới - Katie Miller & Tomas Varela",
    "content": "To: Tomas Varela\nFrom: Katie Miller\nCc: Glen Beamer\nSubject: New shipping firm needed\n\nMr. Varela,\n\nMy name is Katie Miller, and I work in the accounts payable department. My supervisor, Glen Beamer, has decided to end our contract with the shipping firm Hamilton Express due to their lack of reliability. He suggested that I coordinate with you to find a replacement because of your past experience in the shipping industry.\n\nSpecifically, we are looking for a company that can consistently handle our frequent next-day deliveries. These shipments are often sent to international destinations and must arrive within 48 hours of being mailed.\n\nPlease contact me with the names and details of any firms you think will be able to meet our needs. Your assistance in this matter is greatly appreciated.\n\n- Katie Miller\n\n--------------------------------------------------\n\nTo: Katie Miller\nFrom: Tomas Varela\nCc: Glen Beamer\nRE: New shipping firm needed\n\nHello Ms. Miller,\n\nI have already completed some research concerning shipping firm options. I am also sending this email to Glen Beamer so that he can review my findings.\n\nAs you know, ever since they were acquired a year ago by U.S. Parcels, they have been shifting their focus away from international shipments. As a result, they are now much less capable in this area.\n\nI have found two companies that I think can provide us with reliable shipping services:\n\nThe first is Worldwide Delivery, Inc. They have facilities in North America, Europe, and Asia, and international shipments make up most of their business.\n\nThe second option is FMH Airmail. Although they are not as widespread as Worldwide Delivery, they offer very competitive rates for corporate clients like us.\n\nIf your department decides to pursue a contract with one of these firms, I would be happy to participate in the negotiations. Just let me know if I can be of assistance.\n\n- Tomas Varela",
    "vietnameseTranslation": "Đến: Tomas Varela\nTừ: Katie Miller\nĐồng kính gửi: Glen Beamer\nChủ đề: Cần tìm công ty vận chuyển mới\n\nChào ông Varela,\nTôi là Katie Miller, làm việc tại phòng kế toán công nợ phải trả. Người giám sát của tôi, ông Glen Beamer, đã quyết định chấm dứt hợp đồng với công ty vận chuyển Hamilton Express vì họ thiếu tin cậy. Ông ấy đề nghị tôi phối hợp với ông để tìm đối tác thay thế do ông có kinh nghiệm làm việc trong ngành vận chuyển...\n\n--------------------------------------------------\n\nĐến: Katie Miller\nTừ: Tomas Varela\nĐồng kính gửi: Glen Beamer\nVề việc: Cần tìm công ty vận chuyển mới\n\nChào cô Miller,\nTôi đã hoàn thành một số nghiên cứu về các lựa chọn đối tác vận chuyển... Tôi đã tìm thấy 2 công ty đáng tin cậy:\nThứ nhất là Worldwide Delivery, Inc. Họ có cơ sở tại Bắc Mỹ, Châu Âu, Châu Á và các chuyến hàng quốc tế chiếm phần lớn hoạt động kinh doanh của họ.\nLựa chọn thứ hai là FMH Airmail. Mặc dù mạng lưới không rộng bằng Worldwide Delivery, nhưng họ đưa ra mức giá rất cạnh tranh (rẻ) cho khách hàng doanh nghiệp như chúng ta.\nNếu phòng của cô quyết định xúc tiến hợp đồng, tôi rất sẵn lòng tham gia đàm phán...",
    "questionIds": [
      "test2_186",
      "test2_187",
      "test2_188",
      "test2_189",
      "test2_190"
    ],
    "clues": [
      {
        "questionNum": 186,
        "correctAnswer": "C",
        "clueLocation": "Email 1, đoạn 1, dòng 3-4",
        "clueQuote": "He suggested that I coordinate with you to find a replacement because of your past experience...",
        "scanningTip": "Đọc lời giới thiệu của Katie Miller ở email 1."
      },
      {
        "questionNum": 187,
        "correctAnswer": "A",
        "clueLocation": "Email 1, đoạn 1 & 2",
        "clueQuote": "end our contract with the shipping firm Hamilton Express due to their lack of reliability... sent to international destinations",
        "scanningTip": "Kết hợp lý do hủy hợp đồng ở đoạn 1 và tính chất đơn hàng ở đoạn 2."
      },
      {
        "questionNum": 188,
        "correctAnswer": "A",
        "clueLocation": "Email 2, đoạn 2, dòng 2-3",
        "clueQuote": "they are now much less capable in this area.",
        "scanningTip": "Đọc đánh giá của ông Varela về đơn vị hiện tại ở đoạn 2 của email 2."
      },
      {
        "questionNum": 189,
        "correctAnswer": "A",
        "clueLocation": "Email 2, đoạn 4, dòng 2",
        "clueQuote": "they offer very competitive rates for corporate clients like us.",
        "scanningTip": "Tìm cụm 'competitive rates' trong email 2."
      },
      {
        "questionNum": 190,
        "correctAnswer": "A",
        "clueLocation": "Email 2, đoạn cuối, dòng 1-2",
        "clueQuote": "If your department decides to pursue a contract with one of these firms, I would be happy to participate in the negotiations.",
        "scanningTip": "Đọc câu đề nghị giúp đỡ ở dòng cuối email 2."
      }
    ]
  },
  "clue": {
    "questionNum": 189,
    "correctAnswer": "A",
    "clueLocation": "Email 2, đoạn 4, dòng 2",
    "clueQuote": "they offer very competitive rates for corporate clients like us.",
    "scanningTip": "Tìm cụm 'competitive rates' trong email 2."
  }
},
{
  "id": "test2_190",
  "num": 190,
  "source": "Test 2",
  "category": "Đọc hiểu Đoạn văn (Reading Comprehension)",
  "question": "What does Mr. Varela offer to help with?",
  "options": {
    "A": "The creation of a new contract",
    "B": "Emailing alternative shipping firms",
    "C": "The reorganization of a department",
    "D": "Hiring a new shipping manager"
  },
  "correctAnswer": "A",
  "explanation": "Email 2 đoạn cuối: 'If your department decides to pursue a contract with one of these firms, I would be happy to participate in the negotiations' -> tham gia đàm phán hợp đồng mới = The creation of a new contract.",
  "tip": "⚡ MẸO: 'pursue a contract... participate in negotiations' = 'The creation of a new contract'.",
  "keywords": [
    "pursue a contract",
    "participate in negotiations",
    "new contract"
  ],
  "vietnameseMeaning": "Ông Varela đề nghị giúp đỡ việc gì?",
  "isPassageQuestion": true,
  "passageId": "test2_p7_shipping",
  "passageInfo": {
    "id": "test2_p7_shipping",
    "title": "Đoạn Kép: Trao Đổi Tìm Đối Tác Vận Chuyển Mới - Katie Miller & Tomas Varela",
    "content": "To: Tomas Varela\nFrom: Katie Miller\nCc: Glen Beamer\nSubject: New shipping firm needed\n\nMr. Varela,\n\nMy name is Katie Miller, and I work in the accounts payable department. My supervisor, Glen Beamer, has decided to end our contract with the shipping firm Hamilton Express due to their lack of reliability. He suggested that I coordinate with you to find a replacement because of your past experience in the shipping industry.\n\nSpecifically, we are looking for a company that can consistently handle our frequent next-day deliveries. These shipments are often sent to international destinations and must arrive within 48 hours of being mailed.\n\nPlease contact me with the names and details of any firms you think will be able to meet our needs. Your assistance in this matter is greatly appreciated.\n\n- Katie Miller\n\n--------------------------------------------------\n\nTo: Katie Miller\nFrom: Tomas Varela\nCc: Glen Beamer\nRE: New shipping firm needed\n\nHello Ms. Miller,\n\nI have already completed some research concerning shipping firm options. I am also sending this email to Glen Beamer so that he can review my findings.\n\nAs you know, ever since they were acquired a year ago by U.S. Parcels, they have been shifting their focus away from international shipments. As a result, they are now much less capable in this area.\n\nI have found two companies that I think can provide us with reliable shipping services:\n\nThe first is Worldwide Delivery, Inc. They have facilities in North America, Europe, and Asia, and international shipments make up most of their business.\n\nThe second option is FMH Airmail. Although they are not as widespread as Worldwide Delivery, they offer very competitive rates for corporate clients like us.\n\nIf your department decides to pursue a contract with one of these firms, I would be happy to participate in the negotiations. Just let me know if I can be of assistance.\n\n- Tomas Varela",
    "vietnameseTranslation": "Đến: Tomas Varela\nTừ: Katie Miller\nĐồng kính gửi: Glen Beamer\nChủ đề: Cần tìm công ty vận chuyển mới\n\nChào ông Varela,\nTôi là Katie Miller, làm việc tại phòng kế toán công nợ phải trả. Người giám sát của tôi, ông Glen Beamer, đã quyết định chấm dứt hợp đồng với công ty vận chuyển Hamilton Express vì họ thiếu tin cậy. Ông ấy đề nghị tôi phối hợp với ông để tìm đối tác thay thế do ông có kinh nghiệm làm việc trong ngành vận chuyển...\n\n--------------------------------------------------\n\nĐến: Katie Miller\nTừ: Tomas Varela\nĐồng kính gửi: Glen Beamer\nVề việc: Cần tìm công ty vận chuyển mới\n\nChào cô Miller,\nTôi đã hoàn thành một số nghiên cứu về các lựa chọn đối tác vận chuyển... Tôi đã tìm thấy 2 công ty đáng tin cậy:\nThứ nhất là Worldwide Delivery, Inc. Họ có cơ sở tại Bắc Mỹ, Châu Âu, Châu Á và các chuyến hàng quốc tế chiếm phần lớn hoạt động kinh doanh của họ.\nLựa chọn thứ hai là FMH Airmail. Mặc dù mạng lưới không rộng bằng Worldwide Delivery, nhưng họ đưa ra mức giá rất cạnh tranh (rẻ) cho khách hàng doanh nghiệp như chúng ta.\nNếu phòng của cô quyết định xúc tiến hợp đồng, tôi rất sẵn lòng tham gia đàm phán...",
    "questionIds": [
      "test2_186",
      "test2_187",
      "test2_188",
      "test2_189",
      "test2_190"
    ],
    "clues": [
      {
        "questionNum": 186,
        "correctAnswer": "C",
        "clueLocation": "Email 1, đoạn 1, dòng 3-4",
        "clueQuote": "He suggested that I coordinate with you to find a replacement because of your past experience...",
        "scanningTip": "Đọc lời giới thiệu của Katie Miller ở email 1."
      },
      {
        "questionNum": 187,
        "correctAnswer": "A",
        "clueLocation": "Email 1, đoạn 1 & 2",
        "clueQuote": "end our contract with the shipping firm Hamilton Express due to their lack of reliability... sent to international destinations",
        "scanningTip": "Kết hợp lý do hủy hợp đồng ở đoạn 1 và tính chất đơn hàng ở đoạn 2."
      },
      {
        "questionNum": 188,
        "correctAnswer": "A",
        "clueLocation": "Email 2, đoạn 2, dòng 2-3",
        "clueQuote": "they are now much less capable in this area.",
        "scanningTip": "Đọc đánh giá của ông Varela về đơn vị hiện tại ở đoạn 2 của email 2."
      },
      {
        "questionNum": 189,
        "correctAnswer": "A",
        "clueLocation": "Email 2, đoạn 4, dòng 2",
        "clueQuote": "they offer very competitive rates for corporate clients like us.",
        "scanningTip": "Tìm cụm 'competitive rates' trong email 2."
      },
      {
        "questionNum": 190,
        "correctAnswer": "A",
        "clueLocation": "Email 2, đoạn cuối, dòng 1-2",
        "clueQuote": "If your department decides to pursue a contract with one of these firms, I would be happy to participate in the negotiations.",
        "scanningTip": "Đọc câu đề nghị giúp đỡ ở dòng cuối email 2."
      }
    ]
  },
  "clue": {
    "questionNum": 190,
    "correctAnswer": "A",
    "clueLocation": "Email 2, đoạn cuối, dòng 1-2",
    "clueQuote": "If your department decides to pursue a contract with one of these firms, I would be happy to participate in the negotiations.",
    "scanningTip": "Đọc câu đề nghị giúp đỡ ở dòng cuối email 2."
  }
},
{
  "id": "test2_191",
  "num": 191,
  "source": "Test 2",
  "category": "Đoạn kép - Tìm kiếm thông tin",
  "question": "What can be found on the website listed in the article?",
  "options": {
    "A": "The latest information on the approaching storm",
    "B": "Official orders for all residents to evacuate",
    "C": "A map of the coast from Mayfield to Lincoln Beach",
    "D": "Updates on important international news stories"
  },
  "correctAnswer": "A",
  "explanation": "Đoạn cuối bài báo ghi: \"For updates, visit the Eastern News website at www.newseast.com\" -> Tìm thông tin cập nhật mới nhất về cơn bão.",
  "tip": "⚡ MẸO: Quét nhanh URL \"www.newseast.com\" trong bài -> Đọc câu chứa link: \"For updates...\" -> Chọn ngay câu nói về thông tin bão mới nhất.",
  "keywords": [
    "website",
    "www.newseast.com",
    "updates",
    "storm"
  ],
  "vietnameseMeaning": "Có thể tìm thấy điều gì trên trang web được liệt kê trong bài báo?",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p7_storm",
    "title": "Đoạn Kép: Cảnh báo bão & Thông báo thị trấn Mayfield",
    "content": "Eastern News\nSunday, October 12\nSevere Weather Alert\n\nA massive storm system in the Atlantic Ocean is headed towards the northeast seacoast. It is expected to make landfall in the afternoon on October 15.\n\nCoastal communities, from Mayfield in the south to Lincoln Beach in the north, are urged to make preparations for this storm. High winds, hail, and strong ocean waves will pose severe threats to residents in this region. No evacuations have been ordered, but authorities are recommending that citizens seek refuge farther inland if they are able to.\n\nFor updates, visit the Eastern News website at www.newseast.com.\n\n--------------------------------------------------\n\nNotice: For All Mayfield Citizens\nStay Safe during the Storm\n\nJust as forecasters have been predicting, a dangerous storm will be impacting the coast north of us in about 48 hours. Strong winds and the possibility of flooding will result. Regional authorities have recommended that those who can leave their homes should do so. However, we realize that not everyone will be able to evacuate, so preparations are being made to assist citizens who choose to stay.\n\nTeams of volunteers are currently visiting the neighborhoods closest to the ocean to help residents safeguard their homes. Placing boards over windows and doors and constructing small walls facing the ocean are the main methods being implemented. If you require assistance to protect your home, call the town office at 555-8903 and we will send a team to your house.\n\nDuring the storm, the Mayfield Auditorium will function as a shelter for anyone who needs it. In addition to food and water, over 1,000 cots will be available. The beds will be distributed on a first-come, first-served basis. Emergency personnel will be on alert before, during, and after the storm. If you experience an emergency situation, call 911 to report it. Responders will do their best to come to your aid.\n\nWorking together, we can ensure that all Mayfield residents remain safe during the next few days. If you have any questions, suggestions, or concerns, please do not hesitate to contact the town office.",
    "vietnameseTranslation": "Bản tin Eastern News - Cảnh báo thời tiết nguy hiểm bão Đại Tây Dương tiến vào bờ biển ngày 15/10. Thông báo thị trấn Mayfield mở nhà trú ẩn tại Mayfield Auditorium...",
    "clues": [
      {
        "questionNum": 191,
        "correctAnswer": "A",
        "clueLocation": "Bài 1, dòng cuối",
        "clueQuote": "For updates, visit the Eastern News website at www.newseast.com",
        "scanningTip": "Tìm website www.newseast.com -> thấy cụm For updates."
      },
      {
        "questionNum": 192,
        "correctAnswer": "D",
        "clueLocation": "Bài 1, đoạn 2, dòng 2",
        "clueQuote": "waves will pose severe threats to residents",
        "scanningTip": "pose threats = present threats (gây ra nguy hiểm)."
      },
      {
        "questionNum": 193,
        "correctAnswer": "D",
        "clueLocation": "Bài 2, đoạn 1-2",
        "clueQuote": "preparations are being made to assist citizens who choose to stay",
        "scanningTip": "Thông báo tập trung hỗ trợ người dân ở lại chống bão."
      },
      {
        "questionNum": 194,
        "correctAnswer": "B",
        "clueLocation": "Liên kết 2 bài",
        "clueQuote": "Bão đổ bộ chiều 15/10, thông báo phát trước 48h -> Ngày 13/10",
        "scanningTip": "Lấy ngày 15 trừ đi 48 giờ (2 ngày) = Ngày 13 tháng 10."
      },
      {
        "questionNum": 195,
        "correctAnswer": "B",
        "clueLocation": "Bài 2, đoạn 3",
        "clueQuote": "In addition to food and water, over 1,000 cots will be available",
        "scanningTip": "Chỉ có thức ăn, nước và giường xếp (cots). Không cung cấp Tools."
      }
    ]
  },
  "clue": {
    "questionNum": 191,
    "correctAnswer": "A",
    "clueLocation": "Bài 1, dòng cuối",
    "clueQuote": "For updates, visit the Eastern News website at www.newseast.com",
    "scanningTip": "Quét từ khóa www.newseast.com ở cuối bài 1."
  }
},
{
  "id": "test2_192",
  "num": 192,
  "source": "Test 2",
  "category": "Từ đồng nghĩa trong ngữ cảnh (Vocabulary in Context)",
  "question": "The word \"pose\" in paragraph 2, line 2 of the article is closest in meaning to:",
  "options": {
    "A": "situate",
    "B": "assume",
    "C": "imitate",
    "D": "present"
  },
  "correctAnswer": "D",
  "explanation": "Cụm từ \"pose a threat / danger\" = đặt ra / tạo ra mối đe dọa, đồng nghĩa với \"present a threat\".",
  "tip": "⚡ MẸO: \"pose a threat / risk\" = \"present a threat\" (gây ra, tạo ra hiểm họa). Ghi nhớ cặp từ kinh điển trong TOEIC!",
  "keywords": [
    "pose",
    "severe threats",
    "present"
  ],
  "vietnameseMeaning": "Từ \"pose\" trong đoạn 2, dòng 2 của bài báo có nghĩa gần nhất với từ nào?",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p7_storm",
    "title": "Đoạn Kép: Cảnh báo bão & Thông báo thị trấn Mayfield",
    "content": "Eastern News\nSunday, October 12\nSevere Weather Alert\n\nA massive storm system in the Atlantic Ocean is headed towards the northeast seacoast. It is expected to make landfall in the afternoon on October 15.\n\nCoastal communities, from Mayfield in the south to Lincoln Beach in the north, are urged to make preparations for this storm. High winds, hail, and strong ocean waves will pose severe threats to residents in this region. No evacuations have been ordered, but authorities are recommending that citizens seek refuge farther inland if they are able to.\n\nFor updates, visit the Eastern News website at www.newseast.com.\n\n--------------------------------------------------\n\nNotice: For All Mayfield Citizens\nStay Safe during the Storm\n\nJust as forecasters have been predicting, a dangerous storm will be impacting the coast north of us in about 48 hours. Strong winds and the possibility of flooding will result. Regional authorities have recommended that those who can leave their homes should do so. However, we realize that not everyone will be able to evacuate, so preparations are being made to assist citizens who choose to stay.\n\nTeams of volunteers are currently visiting the neighborhoods closest to the ocean to help residents safeguard their homes. Placing boards over windows and doors and constructing small walls facing the ocean are the main methods being implemented. If you require assistance to protect your home, call the town office at 555-8903 and we will send a team to your house.\n\nDuring the storm, the Mayfield Auditorium will function as a shelter for anyone who needs it. In addition to food and water, over 1,000 cots will be available. The beds will be distributed on a first-come, first-served basis. Emergency personnel will be on alert before, during, and after the storm. If you experience an emergency situation, call 911 to report it. Responders will do their best to come to your aid.\n\nWorking together, we can ensure that all Mayfield residents remain safe during the next few days. If you have any questions, suggestions, or concerns, please do not hesitate to contact the town office.",
    "clues": []
  },
  "clue": {
    "questionNum": 192,
    "correctAnswer": "D",
    "clueLocation": "Bài 1, đoạn 2, dòng 2",
    "clueQuote": "waves will pose severe threats to residents",
    "scanningTip": "Nhớ cụm từ: pose threats = present threats."
  }
},
{
  "id": "test2_193",
  "num": 193,
  "source": "Test 2",
  "category": "Đoạn kép - Ý chính thông báo",
  "question": "What is the notice mostly about?",
  "options": {
    "A": "A request for help from people in surrounding towns",
    "B": "When and where a powerful storm will come ashore",
    "C": "Preparations for evacuating all town residents",
    "D": "Assistance being offered for withstanding the storm"
  },
  "correctAnswer": "D",
  "explanation": "Thông báo nêu các biện pháp hỗ trợ người dân ở lại: tình nguyện viên giúp chằng chống nhà cửa, mở hội trường Mayfield làm nơi tạm trú, cung cấp nước và giường nằm.",
  "tip": "⚡ MẸO: Bài nói về volunteer giúp che cửa sổ, hội trường mở làm shelter cấp đồ ăn/nước -> Chủ đề là \"Assistance being offered\" (Hỗ trợ người dân chống bão).",
  "keywords": [
    "notice",
    "assist citizens",
    "shelter",
    "assistance"
  ],
  "vietnameseMeaning": "Nội dung chính của thông báo là gì?",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p7_storm",
    "title": "Đoạn Kép: Cảnh báo bão & Thông báo thị trấn Mayfield",
    "content": "Eastern News\nSunday, October 12\nSevere Weather Alert\n\nA massive storm system in the Atlantic Ocean is headed towards the northeast seacoast. It is expected to make landfall in the afternoon on October 15.\n\nCoastal communities, from Mayfield in the south to Lincoln Beach in the north, are urged to make preparations for this storm. High winds, hail, and strong ocean waves will pose severe threats to residents in this region. No evacuations have been ordered, but authorities are recommending that citizens seek refuge farther inland if they are able to.\n\nFor updates, visit the Eastern News website at www.newseast.com.\n\n--------------------------------------------------\n\nNotice: For All Mayfield Citizens\nStay Safe during the Storm\n\nJust as forecasters have been predicting, a dangerous storm will be impacting the coast north of us in about 48 hours. Strong winds and the possibility of flooding will result. Regional authorities have recommended that those who can leave their homes should do so. However, we realize that not everyone will be able to evacuate, so preparations are being made to assist citizens who choose to stay.\n\nTeams of volunteers are currently visiting the neighborhoods closest to the ocean to help residents safeguard their homes. Placing boards over windows and doors and constructing small walls facing the ocean are the main methods being implemented. If you require assistance to protect your home, call the town office at 555-8903 and we will send a team to your house.\n\nDuring the storm, the Mayfield Auditorium will function as a shelter for anyone who needs it. In addition to food and water, over 1,000 cots will be available. The beds will be distributed on a first-come, first-served basis. Emergency personnel will be on alert before, during, and after the storm. If you experience an emergency situation, call 911 to report it. Responders will do their best to come to your aid.\n\nWorking together, we can ensure that all Mayfield residents remain safe during the next few days. If you have any questions, suggestions, or concerns, please do not hesitate to contact the town office.",
    "clues": []
  },
  "clue": {
    "questionNum": 193,
    "correctAnswer": "D",
    "clueLocation": "Bài 2, đoạn 1 & 2",
    "clueQuote": "preparations are being made to assist citizens who choose to stay",
    "scanningTip": "Tìm từ assist trong đoạn 1 của bài 2."
  }
},
{
  "id": "test2_194",
  "num": 194,
  "source": "Test 2",
  "category": "Đoạn kép - Suy luận ngày tháng liên kết (Cross-referencing)",
  "question": "When was the notice probably issued?",
  "options": {
    "A": "October 12",
    "B": "October 13",
    "C": "October 14",
    "D": "October 15"
  },
  "correctAnswer": "B",
  "explanation": "Bài báo 1 ghi bão đổ bộ vào chiều October 15. Thông báo 2 ghi cơn bão sẽ ảnh hưởng trong khoảng 48 giờ nữa (in about 48 hours = 2 ngày). Vậy lấy ngày 15 trừ 2 ngày = October 13.",
  "tip": "⚡ MẸO LIÊN KẾT 2 BÀI: Bài 1 cho mốc \"October 15\" (đổ bộ), Bài 2 nói bão sẽ tới trong \"48 hours\" (2 ngày) -> 15 - 2 = 13 (October 13)!",
  "keywords": [
    "October 15",
    "48 hours",
    "October 13"
  ],
  "vietnameseMeaning": "Thông báo có thể được ban hành vào thời điểm nào?",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p7_storm",
    "title": "Đoạn Kép: Cảnh báo bão & Thông báo thị trấn Mayfield",
    "content": "Eastern News\nSunday, October 12\nSevere Weather Alert\n\nA massive storm system in the Atlantic Ocean is headed towards the northeast seacoast. It is expected to make landfall in the afternoon on October 15.\n\nCoastal communities, from Mayfield in the south to Lincoln Beach in the north, are urged to make preparations for this storm. High winds, hail, and strong ocean waves will pose severe threats to residents in this region. No evacuations have been ordered, but authorities are recommending that citizens seek refuge farther inland if they are able to.\n\nFor updates, visit the Eastern News website at www.newseast.com.\n\n--------------------------------------------------\n\nNotice: For All Mayfield Citizens\nStay Safe during the Storm\n\nJust as forecasters have been predicting, a dangerous storm will be impacting the coast north of us in about 48 hours. Strong winds and the possibility of flooding will result. Regional authorities have recommended that those who can leave their homes should do so. However, we realize that not everyone will be able to evacuate, so preparations are being made to assist citizens who choose to stay.\n\nTeams of volunteers are currently visiting the neighborhoods closest to the ocean to help residents safeguard their homes. Placing boards over windows and doors and constructing small walls facing the ocean are the main methods being implemented. If you require assistance to protect your home, call the town office at 555-8903 and we will send a team to your house.\n\nDuring the storm, the Mayfield Auditorium will function as a shelter for anyone who needs it. In addition to food and water, over 1,000 cots will be available. The beds will be distributed on a first-come, first-served basis. Emergency personnel will be on alert before, during, and after the storm. If you experience an emergency situation, call 911 to report it. Responders will do their best to come to your aid.\n\nWorking together, we can ensure that all Mayfield residents remain safe during the next few days. If you have any questions, suggestions, or concerns, please do not hesitate to contact the town office.",
    "clues": []
  },
  "clue": {
    "questionNum": 194,
    "correctAnswer": "B",
    "clueLocation": "Liên kết Bài 1 & Bài 2",
    "clueQuote": "Bài 1: landfall October 15 | Bài 2: in about 48 hours -> Ngày 13/10",
    "scanningTip": "Phép tính liên kết hai văn bản: 15 trừ đi 48 tiếng = ngày 13."
  }
},
{
  "id": "test2_195",
  "num": 195,
  "source": "Test 2",
  "category": "Đoạn kép - Câu hỏi phủ định NOT",
  "question": "What will NOT be provided at the Mayfield Auditorium?",
  "options": {
    "A": "Drinking water",
    "B": "Tools",
    "C": "Beds",
    "D": "Meals"
  },
  "correctAnswer": "B",
  "explanation": "Đoạn 3 bài 2 liệt kê: \"In addition to food and water, over 1,000 cots will be available.\" (food = meals, water = drinking water, cots = beds). Dụng cụ (Tools) không được cung cấp tại hội trường.",
  "tip": "⚡ MẸO LOẠI TRỪ: Tìm đoạn nhắc đến \"Mayfield Auditorium\": thấy có food (Meals), water, cots (Beds) -> Cái còn lại \"Tools\" là đáp án KHÔNG có!",
  "keywords": [
    "Mayfield Auditorium",
    "cots",
    "food and water",
    "Tools"
  ],
  "vietnameseMeaning": "Điều gì sẽ KHÔNG được cung cấp tại hội trường Mayfield?",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p7_storm",
    "title": "Đoạn Kép: Cảnh báo bão & Thông báo thị trấn Mayfield",
    "content": "Eastern News\nSunday, October 12\nSevere Weather Alert\n\nA massive storm system in the Atlantic Ocean is headed towards the northeast seacoast. It is expected to make landfall in the afternoon on October 15.\n\nCoastal communities, from Mayfield in the south to Lincoln Beach in the north, are urged to make preparations for this storm. High winds, hail, and strong ocean waves will pose severe threats to residents in this region. No evacuations have been ordered, but authorities are recommending that citizens seek refuge farther inland if they are able to.\n\nFor updates, visit the Eastern News website at www.newseast.com.\n\n--------------------------------------------------\n\nNotice: For All Mayfield Citizens\nStay Safe during the Storm\n\nJust as forecasters have been predicting, a dangerous storm will be impacting the coast north of us in about 48 hours. Strong winds and the possibility of flooding will result. Regional authorities have recommended that those who can leave their homes should do so. However, we realize that not everyone will be able to evacuate, so preparations are being made to assist citizens who choose to stay.\n\nTeams of volunteers are currently visiting the neighborhoods closest to the ocean to help residents safeguard their homes. Placing boards over windows and doors and constructing small walls facing the ocean are the main methods being implemented. If you require assistance to protect your home, call the town office at 555-8903 and we will send a team to your house.\n\nDuring the storm, the Mayfield Auditorium will function as a shelter for anyone who needs it. In addition to food and water, over 1,000 cots will be available. The beds will be distributed on a first-come, first-served basis. Emergency personnel will be on alert before, during, and after the storm. If you experience an emergency situation, call 911 to report it. Responders will do their best to come to your aid.\n\nWorking together, we can ensure that all Mayfield residents remain safe during the next few days. If you have any questions, suggestions, or concerns, please do not hesitate to contact the town office.",
    "clues": []
  },
  "clue": {
    "questionNum": 195,
    "correctAnswer": "B",
    "clueLocation": "Bài 2, đoạn 3",
    "clueQuote": "In addition to food and water, over 1,000 cots will be available",
    "scanningTip": "Quét từ cots = beds, food = meals, water. Chọn Tools."
  }
},
{
  "id": "test2_196",
  "num": 196,
  "source": "Test 2",
  "category": "Đoạn kép - Mục đích thư (Letter Purpose)",
  "question": "What is the purpose of Mr. Murthy's letter?",
  "options": {
    "A": "To submit his resignation",
    "B": "To contact a job applicant",
    "C": "To inquire about open positions",
    "D": "To apply for employment"
  },
  "correctAnswer": "D",
  "explanation": "Thư đầu của Duncan Murthy ghi: \"submit my application for the position of senior professional design consultant with your firm\" = nộp đơn xin việc làm.",
  "tip": "⚡ MẸO: Thấy \"submit my application for the position\" -> Chọn \"To apply for employment\" (nộp đơn xin việc).",
  "keywords": [
    "submit application",
    "position",
    "apply for employment"
  ],
  "vietnameseMeaning": "Mục đích lá thư của ông Murthy là gì?",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p7_murthy",
    "title": "Đoạn Kép: Đơn xin việc & Thư phản hồi tuyển dụng",
    "content": "Human Resources\nSmith Formal Interior Design\n24 Callaghan Circle\nLondon, England\n\nDear Sir or Madam:\nI am happy to introduce myself to you and submit my application for the position of senior professional design consultant with your firm. Hopefully you will agree that my extensive experience and skills in this field would make me a valuable member of your organization.\nI have worked in interior design for more than 15 years, spending most of that time with Brighton Interiors. There, I began as an intern after graduating from university and quickly advanced to the position of design specialist. I was considered the firm's leading designer of home interiors. For the past two years, I have worked as an independent design consultant for Elegant Designs and Uptown Home & Office, where I have started to become familiar with office and industrial architecture. Smith Formal Interior Design's reputation as the foremost high-end design firm is very impressive. I would consider it an honor to become a part of your company. Please find my resume and design portfolio included with this letter. If you agree that my background qualifies me for the advertised position, I would be happy to meet in person with the hiring manager to discuss this opportunity further.\n\nDuncan Murthy\n\n--------------------------------------------------\n\nDuncan Murthy\n811 Brightwood Rd.\nThompson, England\n\nDear Mr. Murthy,\nThank you for your interest in employment with our company. Our hiring team has carefully reviewed your application materials and found them outstanding. Unfortunately, due to the great quantity and quality of our candidate pool, we are unable to offer you a job at this time.\nIn fact, we have decided to pass on your application because your background doesn't satisfy the specific requirements of the position. The focus of the senior professional design consultant role is on office layout. However, you have spent the majority of your career designing home interiors. I hope you understand our decision.\nWe will keep your résumé on file. If you would like to apply for another position with us in the future, simply call one of our human resources officers and inform them that you are a repeat applicant. They will instruct you on our fast track application process.\n\nMadhu Vaas\nHuman Resources Officer\nSmith Formal Interior Design",
    "vietnameseTranslation": "Duncan Murthy gửi đơn ứng tuyển vị trí tư vấn thiết kế nội thất cao cấp tại Smith Formal Interior Design. Madhu Vaas hồi đáp từ chối vì ông chỉ có kinh nghiệm nhà ở thay vì văn phòng...",
    "clues": [
      {
        "questionNum": 196,
        "correctAnswer": "D",
        "clueLocation": "Thư 1, dòng 2",
        "clueQuote": "submit my application for the position of senior professional design consultant",
        "scanningTip": "Tìm submit my application -> apply for employment."
      },
      {
        "questionNum": 197,
        "correctAnswer": "B",
        "clueLocation": "Thư 1, dòng 5",
        "clueQuote": "worked in interior design for more than 15 years, spending most of that time with Brighton Interiors",
        "scanningTip": "Tìm cụm most of that time with Brighton Interiors."
      },
      {
        "questionNum": 198,
        "correctAnswer": "B",
        "clueLocation": "Thư 1, dòng 11",
        "clueQuote": "Please find my resume and design portfolio included with this letter",
        "scanningTip": "portfolio = sample of work (hồ sơ tác phẩm mẫu)."
      },
      {
        "questionNum": 199,
        "correctAnswer": "D",
        "clueLocation": "Thư 2, dòng 6",
        "clueQuote": "spent the majority of your career designing home interiors (at Brighton)",
        "scanningTip": "Vị trí cần thiết kế văn phòng (office layout), còn ông Murthy chuyên home interiors."
      },
      {
        "questionNum": 200,
        "correctAnswer": "B",
        "clueLocation": "Thư 2, dòng 8",
        "clueQuote": "simply call one of our human resources officers and inform them that you are a repeat applicant",
        "scanningTip": "Tìm cụm simply call ... before applying."
      }
    ]
  },
  "clue": {
    "questionNum": 196,
    "correctAnswer": "D",
    "clueLocation": "Thư 1, dòng 2",
    "clueQuote": "submit my application for the position of senior professional design consultant",
    "scanningTip": "Tìm submit my application."
  }
},
{
  "id": "test2_197",
  "num": 197,
  "source": "Test 2",
  "category": "Đoạn kép - Tìm kiếm chi tiết",
  "question": "Where has Mr. Murthy spent the majority of his career?",
  "options": {
    "A": "Uptown Home & Office",
    "B": "Brighton Interiors",
    "C": "Elegant Designs",
    "D": "Smith Formal Interior Design"
  },
  "correctAnswer": "B",
  "explanation": "Thư 1, dòng 5: \"worked in interior design for more than 15 years, spending most of that time with Brighton Interiors.\" (hơn 15 năm, phần lớn thời gian ở Brighton Interiors).",
  "tip": "⚡ MẸO: Tìm từ khóa \"majority\" = \"most of that time\" -> Đọc ngay sau là \"Brighton Interiors\"!",
  "keywords": [
    "majority of his career",
    "most of that time",
    "Brighton Interiors"
  ],
  "vietnameseMeaning": "Ông Murthy đã dành phần lớn sự nghiệp của mình ở đâu?",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p7_murthy",
    "title": "Đoạn Kép: Đơn xin việc & Thư phản hồi tuyển dụng",
    "content": "Human Resources\nSmith Formal Interior Design\n24 Callaghan Circle\nLondon, England\n\nDear Sir or Madam:\nI am happy to introduce myself to you and submit my application for the position of senior professional design consultant with your firm. Hopefully you will agree that my extensive experience and skills in this field would make me a valuable member of your organization.\nI have worked in interior design for more than 15 years, spending most of that time with Brighton Interiors. There, I began as an intern after graduating from university and quickly advanced to the position of design specialist. I was considered the firm's leading designer of home interiors. For the past two years, I have worked as an independent design consultant for Elegant Designs and Uptown Home & Office, where I have started to become familiar with office and industrial architecture. Smith Formal Interior Design's reputation as the foremost high-end design firm is very impressive. I would consider it an honor to become a part of your company. Please find my resume and design portfolio included with this letter. If you agree that my background qualifies me for the advertised position, I would be happy to meet in person with the hiring manager to discuss this opportunity further.\n\nDuncan Murthy\n\n--------------------------------------------------\n\nDuncan Murthy\n811 Brightwood Rd.\nThompson, England\n\nDear Mr. Murthy,\nThank you for your interest in employment with our company. Our hiring team has carefully reviewed your application materials and found them outstanding. Unfortunately, due to the great quantity and quality of our candidate pool, we are unable to offer you a job at this time.\nIn fact, we have decided to pass on your application because your background doesn't satisfy the specific requirements of the position. The focus of the senior professional design consultant role is on office layout. However, you have spent the majority of your career designing home interiors. I hope you understand our decision.\nWe will keep your résumé on file. If you would like to apply for another position with us in the future, simply call one of our human resources officers and inform them that you are a repeat applicant. They will instruct you on our fast track application process.\n\nMadhu Vaas\nHuman Resources Officer\nSmith Formal Interior Design",
    "clues": []
  },
  "clue": {
    "questionNum": 197,
    "correctAnswer": "B",
    "clueLocation": "Thư 1, dòng 5",
    "clueQuote": "spending most of that time with Brighton Interiors",
    "scanningTip": "Từ đồng nghĩa: majority of career = most of that time."
  }
},
{
  "id": "test2_198",
  "num": 198,
  "source": "Test 2",
  "category": "Đoạn kép - Tài liệu đính kèm",
  "question": "What will accompany Mr. Murthy's letter?",
  "options": {
    "A": "A company advertisement",
    "B": "A sample of his work",
    "C": "A recommendation letter",
    "D": "A business card"
  },
  "correctAnswer": "B",
  "explanation": "Thư 1, dòng 11: \"Please find my resume and design portfolio included with this letter.\" (portfolio = bộ sưu tập các sản phẩm/tác phẩm mẫu đã làm: A sample of his work).",
  "tip": "⚡ MẸO: \"accompany / included with letter\" -> Trong bài có \"design portfolio\" (hồ sơ năng lực/mẫu thiết kế) = \"A sample of his work\"!",
  "keywords": [
    "accompany",
    "included",
    "design portfolio",
    "sample of his work"
  ],
  "vietnameseMeaning": "Cái gì sẽ đi kèm cùng lá thư của ông Murthy?",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p7_murthy",
    "title": "Đoạn Kép: Đơn xin việc & Thư phản hồi tuyển dụng",
    "content": "Human Resources\nSmith Formal Interior Design\n24 Callaghan Circle\nLondon, England\n\nDear Sir or Madam:\nI am happy to introduce myself to you and submit my application for the position of senior professional design consultant with your firm. Hopefully you will agree that my extensive experience and skills in this field would make me a valuable member of your organization.\nI have worked in interior design for more than 15 years, spending most of that time with Brighton Interiors. There, I began as an intern after graduating from university and quickly advanced to the position of design specialist. I was considered the firm's leading designer of home interiors. For the past two years, I have worked as an independent design consultant for Elegant Designs and Uptown Home & Office, where I have started to become familiar with office and industrial architecture. Smith Formal Interior Design's reputation as the foremost high-end design firm is very impressive. I would consider it an honor to become a part of your company. Please find my resume and design portfolio included with this letter. If you agree that my background qualifies me for the advertised position, I would be happy to meet in person with the hiring manager to discuss this opportunity further.\n\nDuncan Murthy\n\n--------------------------------------------------\n\nDuncan Murthy\n811 Brightwood Rd.\nThompson, England\n\nDear Mr. Murthy,\nThank you for your interest in employment with our company. Our hiring team has carefully reviewed your application materials and found them outstanding. Unfortunately, due to the great quantity and quality of our candidate pool, we are unable to offer you a job at this time.\nIn fact, we have decided to pass on your application because your background doesn't satisfy the specific requirements of the position. The focus of the senior professional design consultant role is on office layout. However, you have spent the majority of your career designing home interiors. I hope you understand our decision.\nWe will keep your résumé on file. If you would like to apply for another position with us in the future, simply call one of our human resources officers and inform them that you are a repeat applicant. They will instruct you on our fast track application process.\n\nMadhu Vaas\nHuman Resources Officer\nSmith Formal Interior Design",
    "clues": []
  },
  "clue": {
    "questionNum": 198,
    "correctAnswer": "B",
    "clueLocation": "Thư 1, dòng 11",
    "clueQuote": "Please find my resume and design portfolio included with this letter",
    "scanningTip": "Tìm từ included -> design portfolio = sample of work."
  }
},
{
  "id": "test2_199",
  "num": 199,
  "source": "Test 2",
  "category": "Đoạn kép - Đối chiếu nguyên nhân từ chối",
  "question": "Which aspect does Ms. Vaas point out as Mr. Murthy's shortcoming?",
  "options": {
    "A": "His educational background",
    "B": "His salary expectations",
    "C": "His career as an independent design consultant",
    "D": "His experience at Brighton Interiors"
  },
  "correctAnswer": "D",
  "explanation": "Thư 2 của Ms. Vaas nêu lý do từ chối: vị trí cần chuyên về bố trí văn phòng (office layout), trong khi ông dành phần lớn sự nghiệp làm thiết kế nhà ở cá nhân tại Brighton (home interiors). Do đó kinh nghiệm chủ yếu ở Brighton là điểm chưa phù hợp.",
  "tip": "⚡ MẸO: Đọc lý do từ chối ở thư 2: \"focus on office layout. However, you have spent the majority of your career designing home interiors\" (kinh nghiệm ở công ty cũ Brighton).",
  "keywords": [
    "shortcoming",
    "Brighton Interiors",
    "home interiors",
    "office layout"
  ],
  "vietnameseMeaning": "Bà Vaas chỉ ra khía cạnh nào là điểm thiếu sót của ông Murthy?",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p7_murthy",
    "title": "Đoạn Kép: Đơn xin việc & Thư phản hồi tuyển dụng",
    "content": "Human Resources\nSmith Formal Interior Design\n24 Callaghan Circle\nLondon, England\n\nDear Sir or Madam:\nI am happy to introduce myself to you and submit my application for the position of senior professional design consultant with your firm. Hopefully you will agree that my extensive experience and skills in this field would make me a valuable member of your organization.\nI have worked in interior design for more than 15 years, spending most of that time with Brighton Interiors. There, I began as an intern after graduating from university and quickly advanced to the position of design specialist. I was considered the firm's leading designer of home interiors. For the past two years, I have worked as an independent design consultant for Elegant Designs and Uptown Home & Office, where I have started to become familiar with office and industrial architecture. Smith Formal Interior Design's reputation as the foremost high-end design firm is very impressive. I would consider it an honor to become a part of your company. Please find my resume and design portfolio included with this letter. If you agree that my background qualifies me for the advertised position, I would be happy to meet in person with the hiring manager to discuss this opportunity further.\n\nDuncan Murthy\n\n--------------------------------------------------\n\nDuncan Murthy\n811 Brightwood Rd.\nThompson, England\n\nDear Mr. Murthy,\nThank you for your interest in employment with our company. Our hiring team has carefully reviewed your application materials and found them outstanding. Unfortunately, due to the great quantity and quality of our candidate pool, we are unable to offer you a job at this time.\nIn fact, we have decided to pass on your application because your background doesn't satisfy the specific requirements of the position. The focus of the senior professional design consultant role is on office layout. However, you have spent the majority of your career designing home interiors. I hope you understand our decision.\nWe will keep your résumé on file. If you would like to apply for another position with us in the future, simply call one of our human resources officers and inform them that you are a repeat applicant. They will instruct you on our fast track application process.\n\nMadhu Vaas\nHuman Resources Officer\nSmith Formal Interior Design",
    "clues": []
  },
  "clue": {
    "questionNum": 199,
    "correctAnswer": "D",
    "clueLocation": "Thư 2, dòng 5-6",
    "clueQuote": "focus is on office layout. However, you have spent the majority of your career designing home interiors",
    "scanningTip": "Tìm câu bắt đầu bằng However trong thư 2."
  }
},
{
  "id": "test2_200",
  "num": 200,
  "source": "Test 2",
  "category": "Đoạn kép - Lời khuyên/hướng dẫn tương lai",
  "question": "What does Ms. Vaas recommend?",
  "options": {
    "A": "Gaining more experience in the design industry",
    "B": "Calling personnel before applying for future positions",
    "C": "Applying for a job in the company's overseas branch",
    "D": "Mailing an extra copy of his résumé to personnel"
  },
  "correctAnswer": "B",
  "explanation": "Thư 2, đoạn cuối: \"If you would like to apply for another position with us in the future, simply call one of our human resources officers and inform them that you are a repeat applicant.\" (gọi điện cho nhân sự trước khi nộp đơn lần sau để được duyệt theo quy trình nhanh).",
  "tip": "⚡ MẸO: Quét đoạn cuối thư 2: \"simply call one of our human resources officers\" (gọi cho nhân sự/personnel) -> Chọn ngay B!",
  "keywords": [
    "recommend",
    "future",
    "call human resources",
    "personnel"
  ],
  "vietnameseMeaning": "Bà Vaas khuyên điều gì?",
  "isPassageQuestion": true,
  "passageInfo": {
    "id": "test2_p7_murthy",
    "title": "Đoạn Kép: Đơn xin việc & Thư phản hồi tuyển dụng",
    "content": "Human Resources\nSmith Formal Interior Design\n24 Callaghan Circle\nLondon, England\n\nDear Sir or Madam:\nI am happy to introduce myself to you and submit my application for the position of senior professional design consultant with your firm. Hopefully you will agree that my extensive experience and skills in this field would make me a valuable member of your organization.\nI have worked in interior design for more than 15 years, spending most of that time with Brighton Interiors. There, I began as an intern after graduating from university and quickly advanced to the position of design specialist. I was considered the firm's leading designer of home interiors. For the past two years, I have worked as an independent design consultant for Elegant Designs and Uptown Home & Office, where I have started to become familiar with office and industrial architecture. Smith Formal Interior Design's reputation as the foremost high-end design firm is very impressive. I would consider it an honor to become a part of your company. Please find my resume and design portfolio included with this letter. If you agree that my background qualifies me for the advertised position, I would be happy to meet in person with the hiring manager to discuss this opportunity further.\n\nDuncan Murthy\n\n--------------------------------------------------\n\nDuncan Murthy\n811 Brightwood Rd.\nThompson, England\n\nDear Mr. Murthy,\nThank you for your interest in employment with our company. Our hiring team has carefully reviewed your application materials and found them outstanding. Unfortunately, due to the great quantity and quality of our candidate pool, we are unable to offer you a job at this time.\nIn fact, we have decided to pass on your application because your background doesn't satisfy the specific requirements of the position. The focus of the senior professional design consultant role is on office layout. However, you have spent the majority of your career designing home interiors. I hope you understand our decision.\nWe will keep your résumé on file. If you would like to apply for another position with us in the future, simply call one of our human resources officers and inform them that you are a repeat applicant. They will instruct you on our fast track application process.\n\nMadhu Vaas\nHuman Resources Officer\nSmith Formal Interior Design",
    "clues": []
  },
  "clue": {
    "questionNum": 200,
    "correctAnswer": "B",
    "clueLocation": "Thư 2, đoạn 3, dòng 2",
    "clueQuote": "simply call one of our human resources officers and inform them that you are a repeat applicant",
    "scanningTip": "Tìm động từ simply call ở cuối thư."
  }
}

];

export const docs1Questions: Question[] = rawQuestions.map((q) => ({
  ...q,
  stage: 1,
  isMustLearn: true,
  learningTag: 'Bắt buộc học thuộc',
  badge: '⭐ Giai đoạn 1: Bắt buộc học thuộc',
}));

// All questions combined: Docs 1 (151) + Docs 2 (234) + Docs 3 (81) + Docs 4 (100) = 566 questions
export const allQuestions: Question[] = [
  ...docs1Questions,
  ...docs2Questions,
  ...docs3Questions,
  ...docs4Questions,
];

export { docs3Questions, docs4Questions };

export const getQuestionsBySource = (source?: string): Question[] => {
  if (!source || source === 'all' || source === 'docs1_all' || source === 'must_learn' || source === 'stage_1') {
    return docs1Questions;
  }
  if (source === 'all_both_stages' || source === 'all_stages' || source === 'all_all_stages') return allQuestions;
  if (source === 'stage_2' || source === 'docs2_all') return docs2Questions;
  if (source === 'stage_3' || source === 'docs3_all') return docs3Questions;
  if (source === 'stage_4' || source === 'docs4_all') return docs4Questions;

  // Docs 1 sub-sources:
  if (source === 'ToIce 2') return docs1Questions.filter((q) => q.source.startsWith('ToIce 2'));
  if (source === 'Test 2 Full') return docs1Questions.filter((q) => q.source.startsWith('Test 2'));
  if (source === 'Test 2 Part 5') return docs1Questions.filter((q) => q.source.startsWith('Test 2') && !q.isPassageQuestion);
  if (source === 'Part 6 Đọc Điền') return docs1Questions.filter((q) => q.isPassageQuestion && q.num >= 141 && q.num <= 152);
  if (source === 'Part 7 Đoạn Văn') return docs1Questions.filter((q) => q.isPassageQuestion && q.num >= 153);
  if (source === 'docs1_passages') return docs1Questions.filter((q) => q.isPassageQuestion);

  // Docs 2 sub-sources:
  if (source === 'Docs 2 - Đề 1 Full') return docs2Questions.filter((q) => q.id.startsWith('docs2_de1') || q.source.includes('Đề 1') || q.source === 'Docs 2 - Part 5 Luyện đề' || q.source === 'Docs 2 - Part 6 Đọc Điền');
  if (source === 'Docs 2 - Đề 2 YBM Full') return docs2Questions.filter((q) => q.id.startsWith('docs2_de2') || q.source.includes('YBM'));
  if (source === 'Docs 2 - Chuyên đề Tips') return docs2Questions.filter((q) => q.id.startsWith('docs2_drill') || q.source.includes('Chuyên đề'));
  if (source === 'Docs 2 - Part 5 All' || source === 'Docs 2 - Part 5' || source === 'docs2_part5') return docs2Questions.filter((q) => !q.isPassageQuestion);
  if (source === 'Docs 2 - Part 6 All' || source === 'Docs 2 - Part 6' || source === 'docs2_part6') return docs2Questions.filter((q) => q.isPassageQuestion && q.num >= 131 && q.num <= 146);
  if (source === 'Docs 2 - Part 7 All' || source === 'Docs 2 - Part 7' || source === 'docs2_part7') return docs2Questions.filter((q) => q.isPassageQuestion && ((q.num >= 147 && q.num <= 200) || q.source.includes('Part 7')));
  if (source === 'docs2_passages') return docs2Questions.filter((q) => q.isPassageQuestion);

  // Docs 3 sub-sources:
  if (source === 'Docs 3 - Đề TMA Online Full' || source === 'docs3_tma_full') return docs3Questions.filter((q) => q.source.includes('TMA'));
  if (source === 'Docs 3 - Đề TMA Online Part 5') return docs3Questions.filter((q) => q.source === 'Docs 3 - Đề TMA Online Part 5');
  if (source === 'Docs 3 - Đề TMA Online Part 6') return docs3Questions.filter((q) => q.source === 'Docs 3 - Đề TMA Online Part 6');
  if (source === 'Docs 3 - Đề TMA Online Part 7') return docs3Questions.filter((q) => q.source === 'Docs 3 - Đề TMA Online Part 7');
  if (source === 'Docs 3 - Hackers Reading' || source === 'docs3_hackers') return docs3Questions.filter((q) => q.source === 'Docs 3 - Hackers Reading');
  if (source === 'Docs 3 - Part 5 All' || source === 'docs3_part5') return docs3Questions.filter((q) => !q.isPassageQuestion);
  if (source === 'Docs 3 - Part 6 All' || source === 'docs3_part6') return docs3Questions.filter((q) => q.isPassageQuestion && q.num >= 131 && q.num <= 146);
  if (source === 'Docs 3 - Part 7 All' || source === 'docs3_part7') return docs3Questions.filter((q) => q.isPassageQuestion && (q.num >= 147 || q.source.includes('Part 7')));
  if (source === 'docs3_passages') return docs3Questions.filter((q) => q.isPassageQuestion);

  // Docs 4 sub-sources (Hacker TOEIC 3):
  if (source === 'Docs 4 - Hacker 3 Test 1 Full' || source === 'docs4_hacker3_t1_full') return docs4Questions.filter((q) => q.id.startsWith('docs4_hacker3_t1'));
  if (source === 'Docs 4 - Hacker 3 Test 1 Part 5' || source === 'docs4_hacker3_t1_p5') return docs4Questions.filter((q) => q.source === 'Docs 4 - Hacker 3 Test 1 Part 5');
  if (source === 'Docs 4 - Hacker 3 Test 1 Part 6' || source === 'docs4_hacker3_t1_p6') return docs4Questions.filter((q) => q.source === 'Docs 4 - Hacker 3 Test 1 Part 6');
  if (source === 'Docs 4 - Hacker 3 Test 1 Part 7' || source === 'docs4_hacker3_t1_p7') return docs4Questions.filter((q) => q.source === 'Docs 4 - Hacker 3 Test 1 Part 7');
  if (source === 'Docs 4 - Part 5 All' || source === 'docs4_part5') return docs4Questions.filter((q) => !q.isPassageQuestion);
  if (source === 'Docs 4 - Part 6 All' || source === 'docs4_part6') return docs4Questions.filter((q) => q.isPassageQuestion && q.num >= 131 && q.num <= 146);
  if (source === 'Docs 4 - Part 7 All' || source === 'docs4_part7') return docs4Questions.filter((q) => q.isPassageQuestion && q.num >= 147);
  if (source === 'docs4_passages') return docs4Questions.filter((q) => q.isPassageQuestion);

  if (source === 'passages') return allQuestions.filter((q) => q.isPassageQuestion);

  return allQuestions.filter((q) => q.source === source);
};

export const shuffleQuestions = (items: Question[]): Question[] => {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
