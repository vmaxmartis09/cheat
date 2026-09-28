export interface ListeningQuestion {
  id: string;
  num: number;
  part: 1 | 2 | 3 | 4;
  category: string;
  question: string;
  options: Record<string, string>;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  accent?: string;
  transcript?: string;
  audioUrl?: string;
  imageUrl?: string;
  explanation: string;
  tip: string;
  stage: number;
  badge: string;
}

export const listeningQuestions: ListeningQuestion[] = [
  {
    "id": "lc_p1_1",
    "num": 1,
    "part": 1,
    "category": "Mô tả Tranh (Photographs)",
    "question": "Nghe audio và chọn câu mô tả đúng nhất cho bức tranh #1.",
    "options": {
      "A": "People are pouring some beverages.",
      "B": "People are spreading out platters.",
      "C": "People are holding wine glasses.",
      "D": "People are sitting across from each other."
    },
    "correctAnswer": "C",
    "accent": "Australian accent",
    "transcript": "Speaker: Australian accent\n(A) People are pouring some beverages.\n(B) People are spreading out platters.\n(C) People are holding wine glasses.\n(D) People are sitting across from each other.",
    "audioUrl": "/audio/part1.mp3",
    "explanation": "Đáp án chính xác là (C): 'People are holding wine glasses.'. Miêu tả trực tiếp và chính xác nhất hành động/vị trí đồ vật trong bức tranh #1.",
    "tip": "⚡ MẸO PART 1: Quan sát hành động của người và vị trí vật thể. Cảnh giác với bẫy thì Hiện tại tiếp diễn bị động ('is being V-ed' chỉ hành động đang diễn ra, nếu không có người thao tác thì loại trừ ngay).",
    "stage": 2,
    "badge": "🎧 Listening Part 1",
    "imageUrl": "/images/listening/p1_q1.jpg"
  },
  {
    "id": "lc_p1_2",
    "num": 2,
    "part": 1,
    "category": "Mô tả Tranh (Photographs)",
    "question": "Nghe audio và chọn câu mô tả đúng nhất cho bức tranh #2.",
    "options": {
      "A": "She's removing fabric from a machine.",
      "B": "She's connecting a pipe to a device.",
      "C": "She's pulling a laundry cart.",
      "D": "She's laying a sheet on the floor."
    },
    "correctAnswer": "A",
    "accent": "British accent",
    "transcript": "Speaker: British accent\n(A) She's removing fabric from a machine.\n(B) She's connecting a pipe to a device.\n(C) She's pulling a laundry cart.\n(D) She's laying a sheet on the floor.",
    "audioUrl": "/audio/part1.mp3",
    "explanation": "Đáp án chính xác là (A): 'She's removing fabric from a machine.'. Miêu tả trực tiếp và chính xác nhất hành động/vị trí đồ vật trong bức tranh #2.",
    "tip": "⚡ MẸO PART 1: Quan sát hành động của người và vị trí vật thể. Cảnh giác với bẫy thì Hiện tại tiếp diễn bị động ('is being V-ed' chỉ hành động đang diễn ra, nếu không có người thao tác thì loại trừ ngay).",
    "stage": 2,
    "badge": "🎧 Listening Part 1",
    "imageUrl": "/images/listening/p1_q2.jpg"
  },
  {
    "id": "lc_p1_3",
    "num": 3,
    "part": 1,
    "category": "Mô tả Tranh (Photographs)",
    "question": "Nghe audio và chọn câu mô tả đúng nhất cho bức tranh #3.",
    "options": {
      "A": "A woman is waving at a group.",
      "B": "A woman is photographing a tree.",
      "C": "The men are setting up a camera.",
      "D": "The men are posing for a picture."
    },
    "correctAnswer": "D",
    "accent": "Canadian accent",
    "transcript": "Speaker: Canadian accent\n(A) A woman is waving at a group.\n(B) A woman is photographing a tree.\n(C) The men are setting up a camera.\n(D) The men are posing for a picture.",
    "audioUrl": "/audio/part1.mp3",
    "explanation": "Đáp án chính xác là (D): 'The men are posing for a picture.'. Miêu tả trực tiếp và chính xác nhất hành động/vị trí đồ vật trong bức tranh #3.",
    "tip": "⚡ MẸO PART 1: Quan sát hành động của người và vị trí vật thể. Cảnh giác với bẫy thì Hiện tại tiếp diễn bị động ('is being V-ed' chỉ hành động đang diễn ra, nếu không có người thao tác thì loại trừ ngay).",
    "stage": 2,
    "badge": "🎧 Listening Part 1",
    "imageUrl": "/images/listening/p1_q3.jpg"
  },
  {
    "id": "lc_p1_4",
    "num": 4,
    "part": 1,
    "category": "Mô tả Tranh (Photographs)",
    "question": "Nghe audio và chọn câu mô tả đúng nhất cho bức tranh #4.",
    "options": {
      "A": "A power tool has been left in a case.",
      "B": "An electrical cord is being coiled.",
      "C": "A worker is cutting the base of a pole.",
      "D": "A ladder has been propped against a wall."
    },
    "correctAnswer": "D",
    "accent": "American accent",
    "transcript": "Speaker: American accent\n(A) A power tool has been left in a case.\n(B) An electrical cord is being coiled.\n(C) A worker is cutting the base of a pole.\n(D) A ladder has been propped against a wall.",
    "audioUrl": "/audio/part1.mp3",
    "explanation": "Đáp án chính xác là (D): 'A ladder has been propped against a wall.'. Miêu tả trực tiếp và chính xác nhất hành động/vị trí đồ vật trong bức tranh #4.",
    "tip": "⚡ MẸO PART 1: Quan sát hành động của người và vị trí vật thể. Cảnh giác với bẫy thì Hiện tại tiếp diễn bị động ('is being V-ed' chỉ hành động đang diễn ra, nếu không có người thao tác thì loại trừ ngay).",
    "stage": 2,
    "badge": "🎧 Listening Part 1",
    "imageUrl": "/images/listening/p1_q4.jpg"
  },
  {
    "id": "lc_p1_5",
    "num": 5,
    "part": 1,
    "category": "Mô tả Tranh (Photographs)",
    "question": "Nghe audio và chọn câu mô tả đúng nhất cho bức tranh #5.",
    "options": {
      "A": "A frame has been hung near a lamp.",
      "B": "Windows are on both sides of a room.",
      "C": "Some diners are having a meal at a table.",
      "D": "A flowerpot is situated next to a carpet."
    },
    "correctAnswer": "A",
    "accent": "British accent",
    "transcript": "Speaker: British accent\n(A) A frame has been hung near a lamp.\n(B) Windows are on both sides of a room.\n(C) Some diners are having a meal at a table.\n(D) A flowerpot is situated next to a carpet.",
    "audioUrl": "/audio/part1.mp3",
    "explanation": "Đáp án chính xác là (A): 'A frame has been hung near a lamp.'. Miêu tả trực tiếp và chính xác nhất hành động/vị trí đồ vật trong bức tranh #5.",
    "tip": "⚡ MẸO PART 1: Quan sát hành động của người và vị trí vật thể. Cảnh giác với bẫy thì Hiện tại tiếp diễn bị động ('is being V-ed' chỉ hành động đang diễn ra, nếu không có người thao tác thì loại trừ ngay).",
    "stage": 2,
    "badge": "🎧 Listening Part 1",
    "imageUrl": "/images/listening/p1_q5.jpg"
  },
  {
    "id": "lc_p1_6",
    "num": 6,
    "part": 1,
    "category": "Mô tả Tranh (Photographs)",
    "question": "Nghe audio và chọn câu mô tả đúng nhất cho bức tranh #6.",
    "options": {
      "A": "Some equipment is being carried indoors.",
      "B": "A monitor is mounted on the wall.",
      "C": "A room has been decorated with patterned paper.",
      "D": "Some weights have been stored in a box."
    },
    "correctAnswer": "B",
    "accent": "Canadian accent",
    "transcript": "Speaker: Canadian accent\n(A) Some equipment is being carried indoors.\n(B) A monitor is mounted on the wall.\n(C) A room has been decorated with patterned paper.\n(D) Some weights have been stored in a box.",
    "audioUrl": "/audio/part1.mp3",
    "explanation": "Đáp án chính xác là (B): 'A monitor is mounted on the wall.'. Miêu tả trực tiếp và chính xác nhất hành động/vị trí đồ vật trong bức tranh #6.",
    "tip": "⚡ MẸO PART 1: Quan sát hành động của người và vị trí vật thể. Cảnh giác với bẫy thì Hiện tại tiếp diễn bị động ('is being V-ed' chỉ hành động đang diễn ra, nếu không có người thao tác thì loại trừ ngay).",
    "stage": 2,
    "badge": "🎧 Listening Part 1",
    "imageUrl": "/images/listening/p1_q6.jpg"
  },
  {
    "id": "lc_p2_7",
    "num": 7,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q7: \"Who can register for the business Spanish class?\"",
    "options": {
      "A": "Anyone interested may sign up.",
      "B": "It’s right by the cash register.",
      "C": "Kendra is our newest instructor."
    },
    "correctAnswer": "A",
    "accent": "Australian accent → American accent",
    "transcript": "Speaker (Australian accent → American accent): \"Who can register for the business Spanish class?\"\n(A) Anyone interested may sign up.\n(B) It’s right by the cash register.\n(C) Kendra is our newest instructor.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (A): 'Anyone interested may sign up.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Câu hỏi WHO -> Tìm câu trả lời chỉ người, chức danh hoặc bộ phận phụ trách ('Anyone interested', 'Sue', 'the manager').",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_8",
    "num": 8,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q8: \"Which of our clients will have to pay increased fees?\"",
    "options": {
      "A": "They all will.",
      "B": "I processed the payment.",
      "C": "Because of rising costs."
    },
    "correctAnswer": "A",
    "accent": "Canadian accent → British accent",
    "transcript": "Speaker (Canadian accent → British accent): \"Which of our clients will have to pay increased fees?\"\n(A) They all will.\n(B) I processed the payment.\n(C) Because of rising costs.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (A): 'They all will.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Chú ý từ để hỏi đầu câu (Who/Where/When/Why/How). Cảnh giác với bẫy từ đồng âm (sound-alike distractor) và câu hỏi Yes/No.",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_9",
    "num": 9,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q9: \"Have you considered switching to a different bank?\"",
    "options": {
      "A": "Just a $50 cash withdrawal, please.",
      "B": "You’d better let the accountant know.",
      "C": "I like my current one well enough."
    },
    "correctAnswer": "C",
    "accent": "American accent → British accent",
    "transcript": "Speaker (American accent → British accent): \"Have you considered switching to a different bank?\"\n(A) Just a $50 cash withdrawal, please.\n(B) You’d better let the accountant know.\n(C) I like my current one well enough.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (C): 'I like my current one well enough.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Chú ý từ để hỏi đầu câu (Who/Where/When/Why/How). Cảnh giác với bẫy từ đồng âm (sound-alike distractor) và câu hỏi Yes/No.",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_10",
    "num": 10,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q10: \"Let’s take a walk through the park.\"",
    "options": {
      "A": "I’ll go grab my jacket.",
      "B": "It’s underneath that tree.",
      "C": "About two miles."
    },
    "correctAnswer": "A",
    "accent": "Canadian accent → American accent",
    "transcript": "Speaker (Canadian accent → American accent): \"Let’s take a walk through the park.\"\n(A) I’ll go grab my jacket.\n(B) It’s underneath that tree.\n(C) About two miles.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (A): 'I’ll go grab my jacket.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Câu đề xuất / gợi ý -> Tìm câu đồng ý hoặc từ chối lịch sự ('That would save us money', 'Sounds great', 'I have another meeting').",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_11",
    "num": 11,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q11: \"I don’t know how to fill out the new time sheet.\"",
    "options": {
      "A": "I think I saw it on your desk.",
      "B": "Ask Sue to give you a hand.",
      "C": "My friend showed me around."
    },
    "correctAnswer": "B",
    "accent": "British accent → Canadian accent",
    "transcript": "Speaker (British accent → Canadian accent): \"I don’t know how to fill out the new time sheet.\"\n(A) I think I saw it on your desk.\n(B) Ask Sue to give you a hand.\n(C) My friend showed me around.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (B): 'Ask Sue to give you a hand.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Chú ý từ để hỏi đầu câu (Who/Where/When/Why/How). Cảnh giác với bẫy từ đồng âm (sound-alike distractor) và câu hỏi Yes/No.",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_12",
    "num": 12,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q12: \"Where did you decide to hold the fundraising banquet?\"",
    "options": {
      "A": "A few options are being discussed.",
      "B": "Most of the guests have arrived.",
      "C": "It will take place next Saturday."
    },
    "correctAnswer": "A",
    "accent": "Australian accent → American accent",
    "transcript": "Speaker (Australian accent → American accent): \"Where did you decide to hold the fundraising banquet?\"\n(A) A few options are being discussed.\n(B) Most of the guests have arrived.\n(C) It will take place next Saturday.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (A): 'A few options are being discussed.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Câu hỏi WHERE -> Tìm câu trả lời chỉ vị trí, địa điểm hoặc câu trả lời gián tiếp chỉ sự linh hoạt.",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_13",
    "num": 13,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q13: \"How much will it cost to have this skirt altered?\"",
    "options": {
      "A": "That color suits you.",
      "B": "All items of clothing are on sale.",
      "C": "There’s no charge for that."
    },
    "correctAnswer": "C",
    "accent": "British accent → Canadian accent",
    "transcript": "Speaker (British accent → Canadian accent): \"How much will it cost to have this skirt altered?\"\n(A) That color suits you.\n(B) All items of clothing are on sale.\n(C) There’s no charge for that.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (C): 'There’s no charge for that.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Chú ý từ để hỏi đầu câu (Who/Where/When/Why/How). Cảnh giác với bẫy từ đồng âm (sound-alike distractor) và câu hỏi Yes/No.",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_14",
    "num": 14,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q14: \"Is North Road closed off for street repairs?\"",
    "options": {
      "A": "Yes, until next week.",
      "B": "No, the shop is on Leland Drive.",
      "C": "That is the quickest route."
    },
    "correctAnswer": "A",
    "accent": "Australian accent → British accent",
    "transcript": "Speaker (Australian accent → British accent): \"Is North Road closed off for street repairs?\"\n(A) Yes, until next week.\n(B) No, the shop is on Leland Drive.\n(C) That is the quickest route.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (A): 'Yes, until next week.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Chú ý từ để hỏi đầu câu (Who/Where/When/Why/How). Cảnh giác với bẫy từ đồng âm (sound-alike distractor) và câu hỏi Yes/No.",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_15",
    "num": 15,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q15: \"Wouldn’t you rather have a first class seat for the flight?\"",
    "options": {
      "A": "No, I wanted coffee instead.",
      "B": "I’ve already arrived at the Gimpo airport.",
      "C": "Yes, but it’s too expensive."
    },
    "correctAnswer": "C",
    "accent": "American accent → Canadian accent",
    "transcript": "Speaker (American accent → Canadian accent): \"Wouldn’t you rather have a first class seat for the flight?\"\n(A) No, I wanted coffee instead.\n(B) I’ve already arrived at the Gimpo airport.\n(C) Yes, but it’s too expensive.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (C): 'Yes, but it’s too expensive.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Chú ý từ để hỏi đầu câu (Who/Where/When/Why/How). Cảnh giác với bẫy từ đồng âm (sound-alike distractor) và câu hỏi Yes/No.",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_16",
    "num": 16,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q16: \"Why are you dissatisfied with these eyeglasses?\"",
    "options": {
      "A": "We manufacture commercial lenses.",
      "B": "Don’t you think the frames are too large?",
      "C": "Customers seem to be happy with the results."
    },
    "correctAnswer": "B",
    "accent": "Australian accent → American accent",
    "transcript": "Speaker (Australian accent → American accent): \"Why are you dissatisfied with these eyeglasses?\"\n(A) We manufacture commercial lenses.\n(B) Don’t you think the frames are too large?\n(C) Customers seem to be happy with the results.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (B): 'Don’t you think the frames are too large?'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Chú ý từ để hỏi đầu câu (Who/Where/When/Why/How). Cảnh giác với bẫy từ đồng âm (sound-alike distractor) và câu hỏi Yes/No.",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_17",
    "num": 17,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q17: \"Is the new line of sportswear going to be launched on schedule?\"",
    "options": {
      "A": "About two months ago.",
      "B": "It is very popular with consumers.",
      "C": "The launch has been pushed back."
    },
    "correctAnswer": "C",
    "accent": "British accent → Australian accent",
    "transcript": "Speaker (British accent → Australian accent): \"Is the new line of sportswear going to be launched on schedule?\"\n(A) About two months ago.\n(B) It is very popular with consumers.\n(C) The launch has been pushed back.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (C): 'The launch has been pushed back.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Chú ý từ để hỏi đầu câu (Who/Where/When/Why/How). Cảnh giác với bẫy từ đồng âm (sound-alike distractor) và câu hỏi Yes/No.",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_18",
    "num": 18,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q18: \"Apparently, Abby from the human resources department was promoted.\"",
    "options": {
      "A": "I hadn’t heard about the outing.",
      "B": "Mr. Richard has named her regional director.",
      "C": "They’re promoting a new product."
    },
    "correctAnswer": "B",
    "accent": "American accent → Canadian accent",
    "transcript": "Speaker (American accent → Canadian accent): \"Apparently, Abby from the human resources department was promoted.\"\n(A) I hadn’t heard about the outing.\n(B) Mr. Richard has named her regional director.\n(C) They’re promoting a new product.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (B): 'Mr. Richard has named her regional director.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Chú ý từ để hỏi đầu câu (Who/Where/When/Why/How). Cảnh giác với bẫy từ đồng âm (sound-alike distractor) và câu hỏi Yes/No.",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_19",
    "num": 19,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q19: \"Where do you want to get together to plan our backpacking trip?\"",
    "options": {
      "A": "I don’t have a preference.",
      "B": "Our gear must be packed.",
      "C": "Don’t you think we should camp for a few nights?"
    },
    "correctAnswer": "A",
    "accent": "Australian accent → British accent",
    "transcript": "Speaker (Australian accent → British accent): \"Where do you want to get together to plan our backpacking trip?\"\n(A) I don’t have a preference.\n(B) Our gear must be packed.\n(C) Don’t you think we should camp for a few nights?",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (A): 'I don’t have a preference.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Câu hỏi WHERE -> Tìm câu trả lời chỉ vị trí, địa điểm hoặc câu trả lời gián tiếp chỉ sự linh hoạt.",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_20",
    "num": 20,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q20: \"Why don’t we carpool to the office from now on?\"",
    "options": {
      "A": "I usually drive to work.",
      "B": "There are vehicles parked along the street.",
      "C": "That would save us gas money."
    },
    "correctAnswer": "C",
    "accent": "Canadian accent → American accent",
    "transcript": "Speaker (Canadian accent → American accent): \"Why don’t we carpool to the office from now on?\"\n(A) I usually drive to work.\n(B) There are vehicles parked along the street.\n(C) That would save us gas money.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (C): 'That would save us gas money.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Câu đề xuất / gợi ý -> Tìm câu đồng ý hoặc từ chối lịch sự ('That would save us money', 'Sounds great', 'I have another meeting').",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_21",
    "num": 21,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q21: \"When will my raise go into effect?\"",
    "options": {
      "A": "I’d like to go in, too.",
      "B": "The show begins at 5 p.m.",
      "C": "Within a week or so."
    },
    "correctAnswer": "C",
    "accent": "British accent → Canadian accent",
    "transcript": "Speaker (British accent → Canadian accent): \"When will my raise go into effect?\"\n(A) I’d like to go in, too.\n(B) The show begins at 5 p.m.\n(C) Within a week or so.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (C): 'Within a week or so.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Câu hỏi WHEN -> Tìm câu trả lời chỉ mốc thời gian ('Within a week', 'At 5 p.m.', 'Next month').",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_22",
    "num": 22,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q22: \"Aren’t suitcases supposed to be stored in overhead compartments?\"",
    "options": {
      "A": "Small ones can be kept under the seats.",
      "B": "The airline has misplaced my luggage.",
      "C": "The store is still open."
    },
    "correctAnswer": "A",
    "accent": "American accent → Australian accent",
    "transcript": "Speaker (American accent → Australian accent): \"Aren’t suitcases supposed to be stored in overhead compartments?\"\n(A) Small ones can be kept under the seats.\n(B) The airline has misplaced my luggage.\n(C) The store is still open.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (A): 'Small ones can be kept under the seats.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Chú ý từ để hỏi đầu câu (Who/Where/When/Why/How). Cảnh giác với bẫy từ đồng âm (sound-alike distractor) và câu hỏi Yes/No.",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_23",
    "num": 23,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q23: \"Employees receive a commission on every appliance that they sell.\"",
    "options": {
      "A": "That model is one of our top sellers.",
      "B": "That’s a great incentive for workers.",
      "C": "Actually, we visited a local dealership."
    },
    "correctAnswer": "B",
    "accent": "Australian accent → British accent",
    "transcript": "Speaker (Australian accent → British accent): \"Employees receive a commission on every appliance that they sell.\"\n(A) That model is one of our top sellers.\n(B) That’s a great incentive for workers.\n(C) Actually, we visited a local dealership.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (B): 'That’s a great incentive for workers.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Chú ý từ để hỏi đầu câu (Who/Where/When/Why/How). Cảnh giác với bẫy từ đồng âm (sound-alike distractor) và câu hỏi Yes/No.",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_24",
    "num": 24,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q24: \"How long can I use this transit pass?\"",
    "options": {
      "A": "You can buy it at the ticket office.",
      "B": "It’s good for two more weeks.",
      "C": "Transfer at Stanford Station."
    },
    "correctAnswer": "B",
    "accent": "American accent → Canadian accent",
    "transcript": "Speaker (American accent → Canadian accent): \"How long can I use this transit pass?\"\n(A) You can buy it at the ticket office.\n(B) It’s good for two more weeks.\n(C) Transfer at Stanford Station.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (B): 'It’s good for two more weeks.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Chú ý từ để hỏi đầu câu (Who/Where/When/Why/How). Cảnh giác với bẫy từ đồng âm (sound-alike distractor) và câu hỏi Yes/No.",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_25",
    "num": 25,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q25: \"Has anyone confirmed tonight’s dinner reservations at Denarii Bistro?\"",
    "options": {
      "A": "Sure, I can make some food for us.",
      "B": "The restaurant on Elm Street.",
      "C": "Didn’t your secretary contact the restaurant?"
    },
    "correctAnswer": "C",
    "accent": "Australian accent → Canadian accent",
    "transcript": "Speaker (Australian accent → Canadian accent): \"Has anyone confirmed tonight’s dinner reservations at Denarii Bistro?\"\n(A) Sure, I can make some food for us.\n(B) The restaurant on Elm Street.\n(C) Didn’t your secretary contact the restaurant?",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (C): 'Didn’t your secretary contact the restaurant?'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Chú ý từ để hỏi đầu câu (Who/Where/When/Why/How). Cảnh giác với bẫy từ đồng âm (sound-alike distractor) và câu hỏi Yes/No.",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_26",
    "num": 26,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q26: \"The CEO offered you a position as a sales manager, didn’t she?\"",
    "options": {
      "A": "I really appreciate your offer.",
      "B": "No, that’s just a rumor.",
      "C": "I plan to host the corporate executives."
    },
    "correctAnswer": "B",
    "accent": "British accent → Australian accent",
    "transcript": "Speaker (British accent → Australian accent): \"The CEO offered you a position as a sales manager, didn’t she?\"\n(A) I really appreciate your offer.\n(B) No, that’s just a rumor.\n(C) I plan to host the corporate executives.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (B): 'No, that’s just a rumor.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Chú ý từ để hỏi đầu câu (Who/Where/When/Why/How). Cảnh giác với bẫy từ đồng âm (sound-alike distractor) và câu hỏi Yes/No.",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_27",
    "num": 27,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q27: \"What time will the volunteers show up for the event?\"",
    "options": {
      "A": "At the main entrance.",
      "B": "I’ll have to check with Ann.",
      "C": "There are 30 expected guests."
    },
    "correctAnswer": "B",
    "accent": "Canadian accent → American accent",
    "transcript": "Speaker (Canadian accent → American accent): \"What time will the volunteers show up for the event?\"\n(A) At the main entrance.\n(B) I’ll have to check with Ann.\n(C) There are 30 expected guests.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (B): 'I’ll have to check with Ann.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Chú ý từ để hỏi đầu câu (Who/Where/When/Why/How). Cảnh giác với bẫy từ đồng âm (sound-alike distractor) và câu hỏi Yes/No.",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_28",
    "num": 28,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q28: \"Please set up two additional workspaces.\"",
    "options": {
      "A": "I’ll take care of that now.",
      "B": "OK, but subtract the sum from the bill.",
      "C": "Everyone had his or her own station."
    },
    "correctAnswer": "A",
    "accent": "British accent → Canadian accent",
    "transcript": "Speaker (British accent → Canadian accent): \"Please set up two additional workspaces.\"\n(A) I’ll take care of that now.\n(B) OK, but subtract the sum from the bill.\n(C) Everyone had his or her own station.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (A): 'I’ll take care of that now.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Chú ý từ để hỏi đầu câu (Who/Where/When/Why/How). Cảnh giác với bẫy từ đồng âm (sound-alike distractor) và câu hỏi Yes/No.",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_29",
    "num": 29,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q29: \"Whose fountain pen is sitting on the front desk?\"",
    "options": {
      "A": "Sign your name on the register.",
      "B": "I’ve never seen it before.",
      "C": "You may sit anywhere you’d like."
    },
    "correctAnswer": "B",
    "accent": "Australian accent → American accent",
    "transcript": "Speaker (Australian accent → American accent): \"Whose fountain pen is sitting on the front desk?\"\n(A) Sign your name on the register.\n(B) I’ve never seen it before.\n(C) You may sit anywhere you’d like.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (B): 'I’ve never seen it before.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Câu hỏi WHO -> Tìm câu trả lời chỉ người, chức danh hoặc bộ phận phụ trách ('Anyone interested', 'Sue', 'the manager').",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_30",
    "num": 30,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q30: \"Are you going to paint the kitchen yourself or hire a contractor?\"",
    "options": {
      "A": "The same color as the living room.",
      "B": "Put it next to the refrigerator.",
      "C": "I’m too busy these days."
    },
    "correctAnswer": "C",
    "accent": "British accent → Canadian accent",
    "transcript": "Speaker (British accent → Canadian accent): \"Are you going to paint the kitchen yourself or hire a contractor?\"\n(A) The same color as the living room.\n(B) Put it next to the refrigerator.\n(C) I’m too busy these days.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (C): 'I’m too busy these days.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Chú ý từ để hỏi đầu câu (Who/Where/When/Why/How). Cảnh giác với bẫy từ đồng âm (sound-alike distractor) và câu hỏi Yes/No.",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p2_31",
    "num": 31,
    "part": 2,
    "category": "Hỏi & Đáp (Question-Response)",
    "question": "Q31: \"Did you buy the watch we saw at the department store yesterday?\"",
    "options": {
      "A": "I will deliver it soon.",
      "B": "I couldn’t resist.",
      "C": "Yes, I thought it was."
    },
    "correctAnswer": "B",
    "accent": "Australian accent → American accent",
    "transcript": "Speaker (Australian accent → American accent): \"Did you buy the watch we saw at the department store yesterday?\"\n(A) I will deliver it soon.\n(B) I couldn’t resist.\n(C) Yes, I thought it was.",
    "audioUrl": "/audio/part2.mp3",
    "explanation": "Đáp án đúng là (B): 'I couldn’t resist.'. Phản hồi tự nhiên và hợp lý nhất cho câu hỏi/phát biểu.",
    "tip": "⚡ MẸO PART 2: Chú ý từ để hỏi đầu câu (Who/Where/When/Why/How). Cảnh giác với bẫy từ đồng âm (sound-alike distractor) và câu hỏi Yes/No.",
    "stage": 2,
    "badge": "🎧 Listening Part 2"
  },
  {
    "id": "lc_p3_32",
    "num": 32,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What task has the woman been assigned?",
    "options": {
      "A": "Planning an event",
      "B": "Revising an annual report",
      "C": "Arranging rides for staff",
      "D": "Promoting a competition"
    },
    "correctAnswer": "A",
    "transcript": "W: Hi, Mark. Our department head wants me to arrange the corporation's year-end party. However, I'm not sure when it should be hosted. How about December 21?\nM: Could you think about choosing another day? The 21st is when the Tampa Bay Hurricanes plays in the championship ice hockey game, and I know a lot of staff plan to watch that.\nW: Thanks for reminding me. Would December 22 be better, then?\nM: Definitely. Also, I can help out by sending a notice to fellow employees. So, let me know once you settle on a specific time and the other details.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (A): 'Planning an event'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "British accent → Canadian accent"
  },
  {
    "id": "lc_p3_33",
    "num": 33,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What does the man request the woman do?",
    "options": {
      "A": "Lead a team-building exercise",
      "B": "Consider a different date",
      "C": "Speak to a department head",
      "D": "Announce the results of a match"
    },
    "correctAnswer": "B",
    "transcript": "W: Hi, Mark. Our department head wants me to arrange the corporation's year-end party. However, I'm not sure when it should be hosted. How about December 21?\nM: Could you think about choosing another day? The 21st is when the Tampa Bay Hurricanes plays in the championship ice hockey game, and I know a lot of staff plan to watch that.\nW: Thanks for reminding me. Would December 22 be better, then?\nM: Definitely. Also, I can help out by sending a notice to fellow employees. So, let me know once you settle on a specific time and the other details.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (B): 'Consider a different date'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "British accent → Canadian accent"
  },
  {
    "id": "lc_p3_34",
    "num": 34,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What does the man offer to do?",
    "options": {
      "A": "Get passes for a game",
      "B": "Write down some directions",
      "C": "Search for a local business",
      "D": "Message some colleagues"
    },
    "correctAnswer": "D",
    "transcript": "W: Hi, Mark. Our department head wants me to arrange the corporation's year-end party. However, I'm not sure when it should be hosted. How about December 21?\nM: Could you think about choosing another day? The 21st is when the Tampa Bay Hurricanes plays in the championship ice hockey game, and I know a lot of staff plan to watch that.\nW: Thanks for reminding me. Would December 22 be better, then?\nM: Definitely. Also, I can help out by sending a notice to fellow employees. So, let me know once you settle on a specific time and the other details.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (D): 'Message some colleagues'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "British accent → Canadian accent"
  },
  {
    "id": "lc_p3_35",
    "num": 35,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "Who most likely is the man?",
    "options": {
      "A": "A film editor",
      "B": "A television program host",
      "C": "A box office attendant",
      "D": "A movie critic"
    },
    "correctAnswer": "C",
    "transcript": "W: Excuse me, I'd like to see the 8:00 P.M. screening of Voyage Across Australia.\nM: I'm sorry. But tickets for that and all other show times tonight have been sold out. You may book a seat for tomorrow night, however.\nW: I didn't realize the movie was that popular. I have to be at the office tomorrow night. Will the film still be playing at the theater next week?\nM: Yes. In fact, Andy Baker, the director, will be present for a question and answer session following the screening next Wednesday at 3:30 P.M. You can find out more information about that by reading the flyer posted behind you.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (C): 'A box office attendant'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "British accent → Australian accent"
  },
  {
    "id": "lc_p3_36",
    "num": 36,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What does the woman ask the man about? 42. What does the woman ask the man about?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "correctAnswer": "B",
    "transcript": "W: Excuse me, I'd like to see the 8:00 P.M. screening of Voyage Across Australia.\nM: I'm sorry. But tickets for that and all other show times tonight have been sold out. You may book a seat for tomorrow night, however.\nW: I didn't realize the movie was that popular. I have to be at the office tomorrow night. Will the film still be playing at the theater next week?\nM: Yes. In fact, Andy Baker, the director, will be present for a question and answer session following the screening next Wednesday at 3:30 P.M. You can find out more information about that by reading the flyer posted behind you.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (B): 'Option B'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "British accent → Australian accent"
  },
  {
    "id": "lc_p3_37",
    "num": 37,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What does the man say about Andy Baker?",
    "options": {
      "A": "He will meet with investors.",
      "B": "He attended a cinema opening.",
      "C": "He will respond to some inquiries.",
      "D": "He released a production last year."
    },
    "correctAnswer": "C",
    "transcript": "W: Excuse me, I'd like to see the 8:00 P.M. screening of Voyage Across Australia.\nM: I'm sorry. But tickets for that and all other show times tonight have been sold out. You may book a seat for tomorrow night, however.\nW: I didn't realize the movie was that popular. I have to be at the office tomorrow night. Will the film still be playing at the theater next week?\nM: Yes. In fact, Andy Baker, the director, will be present for a question and answer session following the screening next Wednesday at 3:30 P.M. You can find out more information about that by reading the flyer posted behind you.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (C): 'He will respond to some inquiries.'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "British accent → Australian accent"
  },
  {
    "id": "lc_p3_38",
    "num": 38,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "Where does the man most likely work?",
    "options": {
      "A": "At a travel agency",
      "B": "At a repair shop",
      "C": "At a real estate office",
      "D": "At shopping center"
    },
    "correctAnswer": "B",
    "transcript": "W: Good morning. This is Clara Davis, and I'm having trouble with my laptop. Your shop did a fantastic job fixing it previously, so I'd like to hire you again.\nM: What's the issue this time, Ms. Davis?\nW: The screen keeps freezing, and the computer often restarts automatically.\nM: Well, that sounds like a software error, which isn't my area of expertise. My associate Robert specializes in those types of repairs. Would it be possible to bring your laptop to our office next Monday? He can work on it then.\nW: I'm going abroad for a real estate workshop on Sunday. I'd really like it running properly before then.\nM: Hmm . . . let me transfer you to Robert now. I can't say whether he'll be able to fit you into his schedule sometime today. One moment, please.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (B): 'At a repair shop'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "American accent → Canadian accent"
  },
  {
    "id": "lc_p3_39",
    "num": 39,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What does the man suggest the woman do?",
    "options": {
      "A": "Bring a device to a business",
      "B": "Restart a machine",
      "C": "Install some software",
      "D": "Replace a laptop component"
    },
    "correctAnswer": "A",
    "transcript": "W: Good morning. This is Clara Davis, and I'm having trouble with my laptop. Your shop did a fantastic job fixing it previously, so I'd like to hire you again.\nM: What's the issue this time, Ms. Davis?\nW: The screen keeps freezing, and the computer often restarts automatically.\nM: Well, that sounds like a software error, which isn't my area of expertise. My associate Robert specializes in those types of repairs. Would it be possible to bring your laptop to our office next Monday? He can work on it then.\nW: I'm going abroad for a real estate workshop on Sunday. I'd really like it running properly before then.\nM: Hmm . . . let me transfer you to Robert now. I can't say whether he'll be able to fit you into his schedule sometime today. One moment, please.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (A): 'Bring a device to a business'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "American accent → Canadian accent"
  },
  {
    "id": "lc_p3_40",
    "num": 40,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What does the man mean when he says, \"let me transfer you to Robert now\"?",
    "options": {
      "A": "He has to get approval from a superior.",
      "B": "He is unfamiliar with a product model.",
      "C": "He has to leave for a workshop.",
      "D": "He is unable to set up an appointment."
    },
    "correctAnswer": "D",
    "transcript": "W: Good morning. This is Clara Davis, and I'm having trouble with my laptop. Your shop did a fantastic job fixing it previously, so I'd like to hire you again.\nM: What's the issue this time, Ms. Davis?\nW: The screen keeps freezing, and the computer often restarts automatically.\nM: Well, that sounds like a software error, which isn't my area of expertise. My associate Robert specializes in those types of repairs. Would it be possible to bring your laptop to our office next Monday? He can work on it then.\nW: I'm going abroad for a real estate workshop on Sunday. I'd really like it running properly before then.\nM: Hmm . . . let me transfer you to Robert now. I can't say whether he'll be able to fit you into his schedule sometime today. One moment, please.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (D): 'He is unable to set up an appointment.'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "American accent → Canadian accent"
  },
  {
    "id": "lc_p3_41",
    "num": 41,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What are the speakers mainly discussing?",
    "options": {
      "A": "A coworker's vacation",
      "B": "A corporate regulation",
      "C": "An overseas investment",
      "D": "A supervisor's promotion"
    },
    "correctAnswer": "B",
    "transcript": "M: Did you hear about the policy change for business travel expenses? Employees will have to submit relevant receipts within at least three days following the end date of a trip.\nW: But that means I'll need to get the paperwork from my recent visit to our warehouse in Dubai in order by today. I won't have time for that.\nM: Don't worry. The rule doesn't take effect until the end of next month.\nW: That's a relief. Why is the policy being modified?\nM: The goal is to improve efficiency within the financial department.\nW: Makes sense. Last week, the head of the division was actually telling me how hard it is to track costs when people aren't timely about turning in their receipts.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (B): 'A corporate regulation'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "Australian accent → British accent"
  },
  {
    "id": "lc_p3_42",
    "num": 42,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What does the woman ask the man about?",
    "options": {
      "A": "The reason for a change",
      "B": "The duration of a trip",
      "C": "The cost of a renovation",
      "D": "The size of a warehouse"
    },
    "correctAnswer": "A",
    "transcript": "M: Did you hear about the policy change for business travel expenses? Employees will have to submit relevant receipts within at least three days following the end date of a trip.\nW: But that means I'll need to get the paperwork from my recent visit to our warehouse in Dubai in order by today. I won't have time for that.\nM: Don't worry. The rule doesn't take effect until the end of next month.\nW: That's a relief. Why is the policy being modified?\nM: The goal is to improve efficiency within the financial department.\nW: Makes sense. Last week, the head of the division was actually telling me how hard it is to track costs when people aren't timely about turning in their receipts.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (A): 'The reason for a change'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "Australian accent → British accent"
  },
  {
    "id": "lc_p3_43",
    "num": 43,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What did the woman do last week?",
    "options": {
      "A": "Talked with a manager",
      "B": "Applied for a transfer",
      "C": "Edited a policy manual",
      "D": "Submitted a written complaint"
    },
    "correctAnswer": "A",
    "transcript": "M: Did you hear about the policy change for business travel expenses? Employees will have to submit relevant receipts within at least three days following the end date of a trip.\nW: But that means I'll need to get the paperwork from my recent visit to our warehouse in Dubai in order by today. I won't have time for that.\nM: Don't worry. The rule doesn't take effect until the end of next month.\nW: That's a relief. Why is the policy being modified?\nM: The goal is to improve efficiency within the financial department.\nW: Makes sense. Last week, the head of the division was actually telling me how hard it is to track costs when people aren't timely about turning in their receipts.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (A): 'Talked with a manager'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "Australian accent → British accent"
  },
  {
    "id": "lc_p3_44",
    "num": 44,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "Where does the conversation probably take place?",
    "options": {
      "A": "At a department store",
      "B": "At a library",
      "C": "At an accounting office",
      "D": "At a bookstore"
    },
    "correctAnswer": "B",
    "transcript": "W: Excuse me. I checked out some novels here earlier today, and I may have left my wallet somewhere near this circulation desk. Has one been found recently?\nM: Not to my knowledge. However, I think you'd better visit our lost-and-found center just one floor up. Someone could have possibly picked it up and brought it there.\nW: I see. Also, I'm wondering if it's possible to borrow these DVDs without my library card. Unfortunately, my card was also in my wallet.\nM: Certainly. We have your account in our system, so I can go ahead and do that for you. May I ask for your account number?",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (B): 'At a library'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "American accent → Australian accent"
  },
  {
    "id": "lc_p3_45",
    "num": 45,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What suggestion does the man make?",
    "options": {
      "A": "Contacting an organization again",
      "B": "Borrowing a specific book",
      "C": "Going to another area",
      "D": "Ordering a replacement card"
    },
    "correctAnswer": "C",
    "transcript": "W: Excuse me. I checked out some novels here earlier today, and I may have left my wallet somewhere near this circulation desk. Has one been found recently?\nM: Not to my knowledge. However, I think you'd better visit our lost-and-found center just one floor up. Someone could have possibly picked it up and brought it there.\nW: I see. Also, I'm wondering if it's possible to borrow these DVDs without my library card. Unfortunately, my card was also in my wallet.\nM: Certainly. We have your account in our system, so I can go ahead and do that for you. May I ask for your account number?",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (C): 'Going to another area'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "American accent → Australian accent"
  },
  {
    "id": "lc_p3_46",
    "num": 46,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What information does the man need?",
    "options": {
      "A": "An account holder's name",
      "B": "A publication title",
      "C": "An e-mail address",
      "D": "An identification number"
    },
    "correctAnswer": "B",
    "transcript": "W: Excuse me. I checked out some novels here earlier today, and I may have left my wallet somewhere near this circulation desk. Has one been found recently?\nM: Not to my knowledge. However, I think you'd better visit our lost-and-found center just one floor up. Someone could have possibly picked it up and brought it there.\nW: I see. Also, I'm wondering if it's possible to borrow these DVDs without my library card. Unfortunately, my card was also in my wallet.\nM: Certainly. We have your account in our system, so I can go ahead and do that for you. May I ask for your account number?",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (B): 'A publication title'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "American accent → Australian accent"
  },
  {
    "id": "lc_p3_47",
    "num": 47,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "Why did the man call the woman?",
    "options": {
      "A": "In a grocery store",
      "B": "In a private residence",
      "C": "In a television studio",
      "D": "In a dining establishment"
    },
    "correctAnswer": "B",
    "transcript": "W: The Sporting Supplier. This is Wanda. What can I help you with?\nM: I'd like to ask about a tennis racket I found on your homepage—the Kendell Swift XE. I'm wondering if these racquets come with spare grips for the handle or if those would need to be purchased separately.\nW: All tennis racquets come with just one standard grip. But we offer a variety of other grips that absorb shock and reduce hand strain. Those can be added on for an extra charge.\nM: OK. I'm interested in the shock-absorbing types, so I'll take another look online this afternoon and see what specific options are available. Thanks.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (B): 'In a private residence'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "British accent → Canadian accent"
  },
  {
    "id": "lc_p3_48",
    "num": 48,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What does the woman mention about racquet grips?",
    "options": {
      "A": "They are currently out of stock.",
      "B": "They are made with quality materials.",
      "C": "They come in various types.",
      "D": "They have been used by sports stars."
    },
    "correctAnswer": "A",
    "transcript": "W: The Sporting Supplier. This is Wanda. What can I help you with?\nM: I'd like to ask about a tennis racket I found on your homepage—the Kendell Swift XE. I'm wondering if these racquets come with spare grips for the handle or if those would need to be purchased separately.\nW: All tennis racquets come with just one standard grip. But we offer a variety of other grips that absorb shock and reduce hand strain. Those can be added on for an extra charge.\nM: OK. I'm interested in the shock-absorbing types, so I'll take another look online this afternoon and see what specific options are available. Thanks.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (A): 'They are currently out of stock.'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "British accent → Canadian accent"
  },
  {
    "id": "lc_p3_49",
    "num": 49,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What will the man probably do this afternoon?",
    "options": {
      "A": "Attend a tennis class",
      "B": "Browse some items",
      "C": "Call a sales associate",
      "D": "Return some racquets"
    },
    "correctAnswer": "D",
    "transcript": "W: The Sporting Supplier. This is Wanda. What can I help you with?\nM: I'd like to ask about a tennis racket I found on your homepage—the Kendell Swift XE. I'm wondering if these racquets come with spare grips for the handle or if those would need to be purchased separately.\nW: All tennis racquets come with just one standard grip. But we offer a variety of other grips that absorb shock and reduce hand strain. Those can be added on for an extra charge.\nM: OK. I'm interested in the shock-absorbing types, so I'll take another look online this afternoon and see what specific options are available. Thanks.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (D): 'Return some racquets'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "British accent → Canadian accent"
  },
  {
    "id": "lc_p3_50",
    "num": 50,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What problem does the woman describe?",
    "options": {
      "A": "She visited the incorrect office.",
      "B": "She lost a financial document.",
      "C": "She does not have a day planner.",
      "D": "She is late for a consultation."
    },
    "correctAnswer": "C",
    "transcript": "W: Hi, Charlie. I'm having dinner with our investment consultant in Brownville in 30 minutes, but I forgot my day planner at the office. It contains the name and address of the restaurant we agreed to meet at, which I need.\nM: Yes, it's right here on your desk. Is it OK if I open it and find those details?\nW: Please do. Is there a sticky note attached to the page with the information for the meeting with Charles Grand?\nM: Indeed. It says that you have a table booked at El Toro Bistro on 45 Weston Avenue.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (C): 'She does not have a day planner.'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "American accent → Australian accent"
  },
  {
    "id": "lc_p3_51",
    "num": 51,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What does the woman allow the man to do?",
    "options": {
      "A": "Participate in a conference call",
      "B": "Remove equipment from an office",
      "C": "Send notes to an advisor",
      "D": "Review her personal belongings"
    },
    "correctAnswer": "D",
    "transcript": "W: Hi, Charlie. I'm having dinner with our investment consultant in Brownville in 30 minutes, but I forgot my day planner at the office. It contains the name and address of the restaurant we agreed to meet at, which I need.\nM: Yes, it's right here on your desk. Is it OK if I open it and find those details?\nW: Please do. Is there a sticky note attached to the page with the information for the meeting with Charles Grand?\nM: Indeed. It says that you have a table booked at El Toro Bistro on 45 Weston Avenue.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (D): 'Review her personal belongings'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "American accent → Australian accent"
  },
  {
    "id": "lc_p3_52",
    "num": 52,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What detail does the man provide?",
    "options": {
      "A": "A meeting location",
      "B": "A reservation time",
      "C": "A client's name",
      "D": "A coworker's address"
    },
    "correctAnswer": "A",
    "transcript": "W: Hi, Charlie. I'm having dinner with our investment consultant in Brownville in 30 minutes, but I forgot my day planner at the office. It contains the name and address of the restaurant we agreed to meet at, which I need.\nM: Yes, it's right here on your desk. Is it OK if I open it and find those details?\nW: Please do. Is there a sticky note attached to the page with the information for the meeting with Charles Grand?\nM: Indeed. It says that you have a table booked at El Toro Bistro on 45 Weston Avenue.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (A): 'A meeting location'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "American accent → Australian accent"
  },
  {
    "id": "lc_p3_53",
    "num": 53,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "Where is the conversation most likely taking",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "correctAnswer": "C",
    "transcript": "M: Thanks for joining me as a special guest on my cooking show here at our broadcasting studio today, Wendy. I'm sure many of my TV viewers have been looking forward to this.\nW: No problem, Chef Hammond. So, what will you be creating with these ingredients?\nM: Well, since the theme of our program is Italian dishes, I'll demonstrate how to make spaghetti with cream sauce.\nW: Sounds delicious. Um, there are eggs mixed into the sauce, right?\nM: Oh, you're familiar with this dish? The recipe calls for two eggs. And here's something to keep in mind. It's important to lower the heat on the stovetop when adding the eggs so that they don't become scrambled.\nW: That's a fantastic tip! Should I add the cheese now?\nM: Yes, please. Meanwhile, I'll show our audience the differences between Italian- and American-style bacon.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (C): 'Option C'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "Canadian accent → British accent"
  },
  {
    "id": "lc_p3_54",
    "num": 54,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "Why does the man say, \"you’re familiar with this dish\"?",
    "options": {
      "A": "To accept a recommendation about a recipe",
      "B": "To show appreciation for a cooking tip",
      "C": "To request assistance with a demonstration",
      "D": "To express agreement regarding an ingredient"
    },
    "correctAnswer": "C",
    "transcript": "M: Thanks for joining me as a special guest on my cooking show here at our broadcasting studio today, Wendy. I'm sure many of my TV viewers have been looking forward to this.\nW: No problem, Chef Hammond. So, what will you be creating with these ingredients?\nM: Well, since the theme of our program is Italian dishes, I'll demonstrate how to make spaghetti with cream sauce.\nW: Sounds delicious. Um, there are eggs mixed into the sauce, right?\nM: Oh, you're familiar with this dish? The recipe calls for two eggs. And here's something to keep in mind. It's important to lower the heat on the stovetop when adding the eggs so that they don't become scrambled.\nW: That's a fantastic tip! Should I add the cheese now?\nM: Yes, please. Meanwhile, I'll show our audience the differences between Italian- and American-style bacon.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (C): 'To request assistance with a demonstration'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "Canadian accent → British accent"
  },
  {
    "id": "lc_p3_55",
    "num": 55,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What will the man most likely do next?",
    "options": {
      "A": "Explain food differences",
      "B": "Read over menu options",
      "C": "Consult with a culinary expert",
      "D": "Put away some utensils"
    },
    "correctAnswer": "A",
    "transcript": "M: Thanks for joining me as a special guest on my cooking show here at our broadcasting studio today, Wendy. I'm sure many of my TV viewers have been looking forward to this.\nW: No problem, Chef Hammond. So, what will you be creating with these ingredients?\nM: Well, since the theme of our program is Italian dishes, I'll demonstrate how to make spaghetti with cream sauce.\nW: Sounds delicious. Um, there are eggs mixed into the sauce, right?\nM: Oh, you're familiar with this dish? The recipe calls for two eggs. And here's something to keep in mind. It's important to lower the heat on the stovetop when adding the eggs so that they don't become scrambled.\nW: That's a fantastic tip! Should I add the cheese now?\nM: Yes, please. Meanwhile, I'll show our audience the differences between Italian- and American-style bacon.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (A): 'Explain food differences'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "Canadian accent → British accent"
  },
  {
    "id": "lc_p3_56",
    "num": 56,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What department does the man work in?",
    "options": {
      "A": "Administration",
      "B": "Marketing",
      "C": "Finance",
      "D": "Research"
    },
    "correctAnswer": "A",
    "transcript": "M: Kumiko, do you know where I can find a copy of the study our research department conducted on health care devices? I need data from it to make another report.\nW: I've got a printout of that in my file cabinet right here. By the way, are you going to the Heart and Lung Foundation's annual charity fundraiser on May 4? Or will you be too busy working on this project?\nM: I requested a deadline extension. I heard that there will be many industry professionals attending the fundraiser, so I don't want to miss it. It would be a great opportunity to network with them.\nW: Definitely . . . If you haven't registered yet, I can do it for you.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (A): 'Administration'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "Australian accent → American accent"
  },
  {
    "id": "lc_p3_57",
    "num": 57,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What does the man imply when he says, \"I requested a deadline extension\"?",
    "options": {
      "A": "He will reschedule a business meeting.",
      "B": "He will deal with other problems.",
      "C": "He will appear at a gathering.",
      "D": "He will expand a work project."
    },
    "correctAnswer": "B",
    "transcript": "M: Kumiko, do you know where I can find a copy of the study our research department conducted on health care devices? I need data from it to make another report.\nW: I've got a printout of that in my file cabinet right here. By the way, are you going to the Heart and Lung Foundation's annual charity fundraiser on May 4? Or will you be too busy working on this project?\nM: I requested a deadline extension. I heard that there will be many industry professionals attending the fundraiser, so I don't want to miss it. It would be a great opportunity to network with them.\nW: Definitely . . . If you haven't registered yet, I can do it for you.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (B): 'He will deal with other problems.'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "Australian accent → American accent"
  },
  {
    "id": "lc_p3_58",
    "num": 58,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What does the woman offer to do?",
    "options": {
      "A": "Give some notes to a superior",
      "B": "Sign a colleague up for an event",
      "C": "Make a personal donation",
      "D": "Revise some reports"
    },
    "correctAnswer": "A",
    "transcript": "M: Kumiko, do you know where I can find a copy of the study our research department conducted on health care devices? I need data from it to make another report.\nW: I've got a printout of that in my file cabinet right here. By the way, are you going to the Heart and Lung Foundation's annual charity fundraiser on May 4? Or will you be too busy working on this project?\nM: I requested a deadline extension. I heard that there will be many industry professionals attending the fundraiser, so I don't want to miss it. It would be a great opportunity to network with them.\nW: Definitely . . . If you haven't registered yet, I can do it for you.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (A): 'Give some notes to a superior'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "Australian accent → American accent"
  },
  {
    "id": "lc_p3_59",
    "num": 59,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What does the team leader want the man to do?",
    "options": {
      "A": "Hire a branch manager",
      "B": "Give an award to a top performer",
      "C": "Present some diagrams",
      "D": "Choose a representative"
    },
    "correctAnswer": "C",
    "transcript": "W: You did a great job creating these charts about our export trends. Our team leader wants you to make a presentation on them at the Manila branch next week.\nM: That's great. But will I have enough time to secure a visa for business travel before then? It took longer than I anticipated to get one the last time I went abroad.\nW: I've already spoken with the head of human resources about that. He was informed by the embassy that the visa approval process can be completed in under a week.\nM: OK. Then, could you e-mail me the presentation template you made for last week's audit meeting? I liked the design of it and want to use it.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (C): 'Present some diagrams'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "American accent → Australian accent"
  },
  {
    "id": "lc_p3_60",
    "num": 60,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "Why is the man worried?",
    "options": {
      "A": "A process may take too long.",
      "B": "A presentation did not go well.",
      "C": "A chart has been misplaced.",
      "D": "An audit is approaching."
    },
    "correctAnswer": "B",
    "transcript": "W: You did a great job creating these charts about our export trends. Our team leader wants you to make a presentation on them at the Manila branch next week.\nM: That's great. But will I have enough time to secure a visa for business travel before then? It took longer than I anticipated to get one the last time I went abroad.\nW: I've already spoken with the head of human resources about that. He was informed by the embassy that the visa approval process can be completed in under a week.\nM: OK. Then, could you e-mail me the presentation template you made for last week's audit meeting? I liked the design of it and want to use it.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (B): 'A presentation did not go well.'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "American accent → Australian accent"
  },
  {
    "id": "lc_p3_61",
    "num": 61,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What does the man ask the woman to do?",
    "options": {
      "A": "Update a mailing list",
      "B": "Turn in an application",
      "C": "Share a template",
      "D": "Meet with a designer"
    },
    "correctAnswer": "A",
    "transcript": "W: You did a great job creating these charts about our export trends. Our team leader wants you to make a presentation on them at the Manila branch next week.\nM: That's great. But will I have enough time to secure a visa for business travel before then? It took longer than I anticipated to get one the last time I went abroad.\nW: I've already spoken with the head of human resources about that. He was informed by the embassy that the visa approval process can be completed in under a week.\nM: OK. Then, could you e-mail me the presentation template you made for last week's audit meeting? I liked the design of it and want to use it.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (A): 'Update a mailing list'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "American accent → Australian accent"
  },
  {
    "id": "lc_p3_62",
    "num": 62,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "Where most likely do the speakers work?",
    "options": {
      "A": "At an advertising company",
      "B": "At an educational institution",
      "C": "At an engineering firm",
      "D": "At a staffing agency"
    },
    "correctAnswer": "A",
    "transcript": "W1: This has been an excellent year for our company.\nW2: Without a doubt. We've increased the number of jobseekers who we have helped find work by almost 25 percent.\nM: What's more, we've established strong relationships with major employers.\nW2: Yeah. Consistent dealings with enterprises such as South Bend Corporation will be central to our success moving forward.\nW1: Is it true that South Bend has contracted us again to find more engineering interns?\nM: That's right.\nW2: Do you know the number of positions they need filled?\nM: Not exactly. I'm guessing five or six. What I do know is that the contract we signed gives us four weeks to find suitable applicants.\nW1: That should be a comfortable amount of time to work with.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (A): 'At an advertising company'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "American accent → British accent → Canadian accent"
  },
  {
    "id": "lc_p3_63",
    "num": 63,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What is implied about South Bend Corporation?",
    "options": {
      "A": "It is unsatisfied with a candidate.",
      "B": "It wants to negotiate some prices.",
      "C": "It terminated some employees.",
      "D": "It hired a business in the past."
    },
    "correctAnswer": "D",
    "transcript": "W1: This has been an excellent year for our company.\nW2: Without a doubt. We've increased the number of jobseekers who we have helped find work by almost 25 percent.\nM: What's more, we've established strong relationships with major employers.\nW2: Yeah. Consistent dealings with enterprises such as South Bend Corporation will be central to our success moving forward.\nW1: Is it true that South Bend has contracted us again to find more engineering interns?\nM: That's right.\nW2: Do you know the number of positions they need filled?\nM: Not exactly. I'm guessing five or six. What I do know is that the contract we signed gives us four weeks to find suitable applicants.\nW1: That should be a comfortable amount of time to work with.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (D): 'It hired a business in the past.'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "American accent → British accent → Canadian accent"
  },
  {
    "id": "lc_p3_64",
    "num": 64,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "How long will the speakers have to complete a task?",
    "options": {
      "A": "Three weeks",
      "B": "Four weeks",
      "C": "Five weeks",
      "D": "Six weeks"
    },
    "correctAnswer": "B",
    "transcript": "W1: This has been an excellent year for our company.\nW2: Without a doubt. We've increased the number of jobseekers who we have helped find work by almost 25 percent.\nM: What's more, we've established strong relationships with major employers.\nW2: Yeah. Consistent dealings with enterprises such as South Bend Corporation will be central to our success moving forward.\nW1: Is it true that South Bend has contracted us again to find more engineering interns?\nM: That's right.\nW2: Do you know the number of positions they need filled?\nM: Not exactly. I'm guessing five or six. What I do know is that the contract we signed gives us four weeks to find suitable applicants.\nW1: That should be a comfortable amount of time to work with.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (B): 'Four weeks'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "accent": "American accent → British accent → Canadian accent"
  },
  {
    "id": "lc_p3_65",
    "num": 65,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What problem does the woman mention?",
    "options": {
      "A": "A manager is not available.",
      "B": "A soap line received poor reviews.",
      "C": "A team is understaffed.",
      "D": "An assignment has not been finished."
    },
    "correctAnswer": "D",
    "transcript": "W: Shane, the IT team was supposed to update the Web site yesterday to include information about our new Oceans Alive line of soap, but it hasn't been done yet.\nM: I forgot to tell you. They're gonna finish this afternoon, by . . . um . . . 3:00 P.M. at the latest.\nW: OK, I'll check it then. Is there anything that needs to be done for the product release event being held at SuperSmart at the end of next month?\nM: Of our new products, the shampoo, hand soap, and face cleanser are made of organic ingredients, but the body wash isn't. The current coupon must be modified to ensure it's valid for the entire line.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (D): 'An assignment has not been finished.'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "imageUrl": "/images/listening/p3_q67.jpg",
    "accent": "British accent → Canadian accent"
  },
  {
    "id": "lc_p3_66",
    "num": 66,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What kind of event will be held next month?",
    "options": {
      "A": "A product release",
      "B": "A trade show",
      "C": "A yearly sale",
      "D": "An awards ceremony"
    },
    "correctAnswer": "C",
    "transcript": "W: Shane, the IT team was supposed to update the Web site yesterday to include information about our new Oceans Alive line of soap, but it hasn't been done yet.\nM: I forgot to tell you. They're gonna finish this afternoon, by . . . um . . . 3:00 P.M. at the latest.\nW: OK, I'll check it then. Is there anything that needs to be done for the product release event being held at SuperSmart at the end of next month?\nM: Of our new products, the shampoo, hand soap, and face cleanser are made of organic ingredients, but the body wash isn't. The current coupon must be modified to ensure it's valid for the entire line.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (C): 'A yearly sale'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "imageUrl": "/images/listening/p3_q67.jpg",
    "accent": "British accent → Canadian accent"
  },
  {
    "id": "lc_p3_67",
    "num": 67,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "Look at the graphic. Which product is not covered by the coupon?",
    "options": {
      "A": "Shampoo",
      "B": "Hand soap",
      "C": "Face cleanser",
      "D": "Body wash"
    },
    "correctAnswer": "A",
    "transcript": "W: Shane, the IT team was supposed to update the Web site yesterday to include information about our new Oceans Alive line of soap, but it hasn't been done yet.\nM: I forgot to tell you. They're gonna finish this afternoon, by . . . um . . . 3:00 P.M. at the latest.\nW: OK, I'll check it then. Is there anything that needs to be done for the product release event being held at SuperSmart at the end of next month?\nM: Of our new products, the shampoo, hand soap, and face cleanser are made of organic ingredients, but the body wash isn't. The current coupon must be modified to ensure it's valid for the entire line.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (A): 'Shampoo'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "imageUrl": "/images/listening/p3_q67.jpg",
    "accent": "British accent → Canadian accent"
  },
  {
    "id": "lc_p3_68",
    "num": 68,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What does the man ask the woman about?",
    "options": {
      "A": "Why an analysis was performed",
      "B": "When construction will begin",
      "C": "Whether an assessment is finished",
      "D": "If an amusement park has opened"
    },
    "correctAnswer": "B",
    "transcript": "M: Gina, has the environmental assessment that Skylark Incorporated commissioned our research firm to conduct been completed?\nW: It has. I was in charge of carrying it out, and everything went smoothly.\nM: Good. If I remember correctly, the company is concerned with rainfall levels.\nW: That's right—in four counties that it's considering constructing an amusement park.\nM: So, I assume you recommend that the firm build at the driest location of the ones analyzed.\nW: No, actually. That one isn't suitable, since land costs there exceed Skylark's budget. As a result, we recommended the next best option.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (B): 'When construction will begin'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "imageUrl": "/images/listening/p3_q70.jpg",
    "accent": "Australian accent → American accent"
  },
  {
    "id": "lc_p3_69",
    "num": 69,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "What was the woman responsible for?",
    "options": {
      "A": "Conducting an examination",
      "B": "Selecting a meeting place",
      "C": "Printing a map of a region",
      "D": "Securing a business contract"
    },
    "correctAnswer": "D",
    "transcript": "M: Gina, has the environmental assessment that Skylark Incorporated commissioned our research firm to conduct been completed?\nW: It has. I was in charge of carrying it out, and everything went smoothly.\nM: Good. If I remember correctly, the company is concerned with rainfall levels.\nW: That's right—in four counties that it's considering constructing an amusement park.\nM: So, I assume you recommend that the firm build at the driest location of the ones analyzed.\nW: No, actually. That one isn't suitable, since land costs there exceed Skylark's budget. As a result, we recommended the next best option.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (D): 'Securing a business contract'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "imageUrl": "/images/listening/p3_q70.jpg",
    "accent": "Australian accent → American accent"
  },
  {
    "id": "lc_p3_70",
    "num": 70,
    "part": 3,
    "category": "Đoạn Hội Thoại (Short Conversations)",
    "question": "Look at the graphic. Which county has been recommended?",
    "options": {
      "A": "Riley County",
      "B": "Bower County",
      "C": "Vaughn County",
      "D": "Jasper County"
    },
    "correctAnswer": "D",
    "transcript": "M: Gina, has the environmental assessment that Skylark Incorporated commissioned our research firm to conduct been completed?\nW: It has. I was in charge of carrying it out, and everything went smoothly.\nM: Good. If I remember correctly, the company is concerned with rainfall levels.\nW: That's right—in four counties that it's considering constructing an amusement park.\nM: So, I assume you recommend that the firm build at the driest location of the ones analyzed.\nW: No, actually. That one isn't suitable, since land costs there exceed Skylark's budget. As a result, we recommended the next best option.",
    "audioUrl": "/audio/part3.mp3",
    "explanation": "Đáp án chính xác là (D): 'Jasper County'. Căn cứ vào thông tin đối thoại trong bài nghe.",
    "tip": "⚡ MẸO PART 3: Luôn đọc trước 3 câu hỏi và gạch chân từ khóa trong 8 giây nghỉ giữa các đoạn thoại. Chú ý người nói (nam hay nữ) để bắt đúng lượt lời.",
    "stage": 2,
    "badge": "🎧 Listening Part 3",
    "imageUrl": "/images/listening/p3_q70.jpg",
    "accent": "Australian accent → American accent"
  },
  {
    "id": "lc_p4_71",
    "num": 71,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "Where does the listener probably work?",
    "options": {
      "A": "At a travel agency",
      "B": "At a media company",
      "C": "At a financial firm",
      "D": "At a law office"
    },
    "correctAnswer": "C",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (C): 'At a financial firm'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_72",
    "num": 72,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "What will the speaker do on Monday?",
    "options": {
      "A": "Prepare a report",
      "B": "Go to the airport",
      "C": "Attend a convention",
      "D": "Give a presentation"
    },
    "correctAnswer": "D",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (D): 'Give a presentation'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_73",
    "num": 73,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "What information does the speaker ask for?",
    "options": {
      "A": "Restaurant recommendations",
      "B": "Clients' names",
      "C": "A meeting agenda",
      "D": "An order number"
    },
    "correctAnswer": "B",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (B): 'Clients' names'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_74",
    "num": 74,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "At what event is the speech being given?",
    "options": {
      "A": "A service center opening",
      "B": "A product launch party",
      "C": "A monthly shareholders meeting",
      "D": "A company anniversary celebration"
    },
    "correctAnswer": "C",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (C): 'A monthly shareholders meeting'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_75",
    "num": 75,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "Why does the speaker praise Patricia Sanderson?",
    "options": {
      "A": "She altered a logo design.",
      "B": "She designed a popular Web site.",
      "C": "She suggested a device feature.",
      "D": "She signed an important client."
    },
    "correctAnswer": "D",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (D): 'She signed an important client.'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_76",
    "num": 76,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "What will most likely happen next?",
    "options": {
      "A": "An employee will be introduced.",
      "B": "A device will be demonstrated.",
      "C": "A speech will be given.",
      "D": "A video will be played."
    },
    "correctAnswer": "D",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (D): 'A video will be played.'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_77",
    "num": 77,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "What did the listener do on Thursday?",
    "options": {
      "A": "Submitted an application",
      "B": "E-mailed a manager",
      "C": "Participated in an interview",
      "D": "Revised a contract"
    },
    "correctAnswer": "C",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (C): 'Participated in an interview'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_78",
    "num": 78,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "What was the CEO impressed with?",
    "options": {
      "A": "A proposal to boost sales",
      "B": "A plan to train new employees",
      "C": "A design for a home appliance",
      "D": "A suggestion for a brochure"
    },
    "correctAnswer": "A",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (A): 'A proposal to boost sales'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_79",
    "num": 79,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "What does the speaker mean when she says, \"the current manager will be retiring in three weeks\"?",
    "options": {
      "A": "A schedule will likely be updated.",
      "B": "A decision must be made quickly.",
      "C": "An employee will be promoted soon.",
      "D": "A position has just become available."
    },
    "correctAnswer": "B",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (B): 'A decision must be made quickly.'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_80",
    "num": 80,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "Where most likely are the listeners?",
    "options": {
      "A": "At a construction site",
      "B": "At a medical clinic",
      "C": "At a manufacturing plant",
      "D": "At a car dealership"
    },
    "correctAnswer": "C",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (C): 'At a manufacturing plant'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_81",
    "num": 81,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "According to the speaker, what has been changed?",
    "options": {
      "A": "The price of some merchandise",
      "B": "The order of a tour",
      "C": "The type of machines used",
      "D": "The operational hours of a facility"
    },
    "correctAnswer": "B",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (B): 'The order of a tour'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_82",
    "num": 82,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "What are listeners instructed to do?",
    "options": {
      "A": "Avoid touching equipment",
      "B": "Read an instruction manual",
      "C": "Wear protective gear",
      "D": "Enroll in a class"
    },
    "correctAnswer": "A",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (A): 'Avoid touching equipment'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_83",
    "num": 83,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "What is the message mainly about?",
    "options": {
      "A": "A new menu",
      "B": "A recent critique",
      "C": "A facility reopening",
      "D": "A catering inquiry"
    },
    "correctAnswer": "B",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (B): 'A recent critique'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_84",
    "num": 84,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "Why does the speaker say, \"Ms. Clay has very high standards\"?",
    "options": {
      "A": "To indicate regret",
      "B": "To express anticipation",
      "C": "To explain a recurring request",
      "D": "To complain about a coworker"
    },
    "correctAnswer": "B",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (B): 'To express anticipation'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_85",
    "num": 85,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "What does the speaker ask the listener to do?",
    "options": {
      "A": "Adjust a recipe",
      "B": "Organize a party",
      "C": "Post a review online",
      "D": "Visit a newspaper office"
    },
    "correctAnswer": "C",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (C): 'Post a review online'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_86",
    "num": 86,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "What is the advertisement mainly about?",
    "options": {
      "A": "A radio program",
      "B": "An awards ceremony",
      "C": "An acting audition",
      "D": "A musical contest"
    },
    "correctAnswer": "D",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (D): 'A musical contest'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_87",
    "num": 87,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "What does the speaker say about the judges?",
    "options": {
      "A": "They will be former contestants.",
      "B": "They will choose the final winner.",
      "C": "They will be changed each week.",
      "D": "They will consider viewer feedback."
    },
    "correctAnswer": "C",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (C): 'They will be changed each week.'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_88",
    "num": 88,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "What does the speaker say is available on the Web site?",
    "options": {
      "A": "An audio recording",
      "B": "A venue list",
      "C": "A performance schedule",
      "D": "A film trailer"
    },
    "correctAnswer": "B",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (B): 'A venue list'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_89",
    "num": 89,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "What is mentioned about the previous speakers?",
    "options": {
      "A": "They worked for major publications.",
      "B": "They graduated from James College.",
      "C": "They gave stimulating lectures.",
      "D": "They received writing prizes."
    },
    "correctAnswer": "C",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (C): 'They gave stimulating lectures.'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_90",
    "num": 90,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "What will the speaker talk about?",
    "options": {
      "A": "The importance of reading",
      "B": "The influence of literature",
      "C": "The value of higher education",
      "D": "The effects of legal reform"
    },
    "correctAnswer": "B",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (B): 'The influence of literature'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_91",
    "num": 91,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "Who is Jack Coyle?",
    "options": {
      "A": "An author",
      "B": "A college lecturer",
      "C": "A public official",
      "D": "A lawyer"
    },
    "correctAnswer": "A",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (A): 'An author'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4"
  },
  {
    "id": "lc_p4_92",
    "num": 92,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "Who is the speaker most likely addressing?",
    "options": {
      "A": "Store customers",
      "B": "Marketing consultants",
      "C": "Shop employees",
      "D": "Construction workers"
    },
    "correctAnswer": "C",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (C): 'Shop employees'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4",
    "imageUrl": "/images/listening/p4_q93.jpg"
  },
  {
    "id": "lc_p4_93",
    "num": 93,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "Look at the graphic. Where has the display been set up?",
    "options": {
      "A": "In Aisle 1",
      "B": "In Aisle 2",
      "C": "In Aisle 3",
      "D": "In Aisle 4"
    },
    "correctAnswer": "B",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (B): 'In Aisle 2'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4",
    "imageUrl": "/images/listening/p4_q93.jpg"
  },
  {
    "id": "lc_p4_94",
    "num": 94,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "According to the speaker, what will be announced tomorrow?",
    "options": {
      "A": "The dates of a renovation project",
      "B": "The name of a design firm",
      "C": "The details of a sportswear production",
      "D": "The location of a new branch"
    },
    "correctAnswer": "A",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (A): 'The dates of a renovation project'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4",
    "imageUrl": "/images/listening/p4_q93.jpg"
  },
  {
    "id": "lc_p4_95",
    "num": 95,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "What did the speaker do yesterday?",
    "options": {
      "A": "Visited a business",
      "B": "Looked at some data",
      "C": "Went to a sales conference",
      "D": "Gave a presentation"
    },
    "correctAnswer": "B",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (B): 'Looked at some data'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4",
    "imageUrl": "/images/listening/p4_q96.jpg"
  },
  {
    "id": "lc_p4_96",
    "num": 96,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "Look at the graphic. Which branch does the graph refer to?",
    "options": {
      "A": "Kingston",
      "B": "Albany",
      "C": "Bethany",
      "D": "Newark"
    },
    "correctAnswer": "B",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (B): 'Albany'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4",
    "imageUrl": "/images/listening/p4_q96.jpg"
  },
  {
    "id": "lc_p4_97",
    "num": 97,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "What will most likely happen next?",
    "options": {
      "A": "A report will be revised.",
      "B": "A manager will be introduced.",
      "C": "A document will be distributed.",
      "D": "A store will be contacted."
    },
    "correctAnswer": "C",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (C): 'A document will be distributed.'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4",
    "imageUrl": "/images/listening/p4_q96.jpg"
  },
  {
    "id": "lc_p4_98",
    "num": 98,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "What happened last month?",
    "options": {
      "A": "A permit application was rejected.",
      "B": "A structure was inspected.",
      "C": "A project was started.",
      "D": "A sports arena was completed."
    },
    "correctAnswer": "C",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (C): 'A project was started.'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4",
    "imageUrl": "/images/listening/p4_q100.jpg"
  },
  {
    "id": "lc_p4_99",
    "num": 99,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "Why is a change being made?",
    "options": {
      "A": "To reduce some expenses",
      "B": "To reflect client requests",
      "C": "To improve communication",
      "D": "To accommodate time constraints"
    },
    "correctAnswer": "D",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (D): 'To accommodate time constraints'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4",
    "imageUrl": "/images/listening/p4_q100.jpg"
  },
  {
    "id": "lc_p4_100",
    "num": 100,
    "part": 4,
    "category": "Bài Nói Ngắn (Short Talks)",
    "question": "Look at the graphic. Which step was removed from a work process?",
    "options": {
      "A": "Meet with clients",
      "B": "Discuss plan with team leader",
      "C": "Modify plans based on feedback",
      "D": "Submit for approval"
    },
    "correctAnswer": "B",
    "audioUrl": "/audio/part4.mp3",
    "explanation": "Đáp án chính xác là (B): 'Discuss plan with team leader'. Căn cứ theo nội dung bài nói trong đề thi Hackers Test 7 Part 4.",
    "tip": "⚡ MẸO PART 4: Xác định thể loại bài nói (thông báo sân bay, quảng cáo, tin nhắn thoại, bài phát biểu). Câu đầu thường trả lời cho câu hỏi mục đích hoặc nghề nghiệp/địa điểm.",
    "stage": 2,
    "badge": "🎧 Listening Part 4",
    "imageUrl": "/images/listening/p4_q100.jpg"
  }
];

export const getListeningQuestionsByPart = (part: number | 'all'): ListeningQuestion[] => {
  if (part === 'all') return listeningQuestions;
  return listeningQuestions.filter((q) => q.part === part);
};

export const getListeningStats = () => {
  const parts = { 1: 0, 2: 0, 3: 0, 4: 0 };
  listeningQuestions.forEach((q) => {
    parts[q.part]++;
  });
  return {
    total: listeningQuestions.length,
    parts,
  };
};
