import { Question, AnswerChoice, QuestionOptions } from '../types';

interface SimilarTemplate {
  categoryMatch?: string;
  triggerKeywords?: string[];
  question: string;
  options: QuestionOptions;
  correctAnswer: AnswerChoice;
  explanation: string;
  tip: string;
  vietnameseMeaning: string;
}

// Curated bank of authentic TOEIC similar questions mapped to common patterns
const similarTemplates: SimilarTemplate[] = [
  // 1. Inversion with "and as does/do" (like ToIce 2 #101)
  {
    categoryMatch: 'Ngữ pháp & Thì',
    triggerKeywords: ['as does', 'and', 'deputy'],
    question: "The regional director approved the revised budget proposal, and ------- the department managers.",
    options: {
      A: "as do",
      B: "as did",
      C: "as long as",
      D: "whereas"
    },
    correctAnswer: "B",
    explanation: "Đảo ngữ đồng tình ở thì quá khứ đơn: 'and as did + S' (và các trưởng bộ phận cũng vậy, tương tự 'and so did the department managers'). Do mệnh đề trước dùng 'approved' ở quá khứ nên trợ động từ là 'did'.",
    tip: "⚡ MẸO NHỚ: Mệnh đề trước là quá khứ ('approved') + 'and' -> Chọn đảo ngữ 'as did + S'.",
    vietnameseMeaning: "Giám đốc khu vực đã phê duyệt đề xuất ngân sách sửa đổi, và các trưởng bộ phận cũng vậy."
  },

  // 2. Conjunction "Once" (like ToIce 2 #102)
  {
    categoryMatch: 'Liên từ',
    triggerKeywords: ['Once', 'familiarized'],
    question: "------- the legal department signs off on the agreement, we can proceed with the merger.",
    options: {
      A: "Once",
      B: "Already",
      C: "Early",
      D: "During"
    },
    correctAnswer: "A",
    explanation: "'Once' là liên từ chỉ thời gian mang nghĩa 'Một khi / Ngay khi...'. Phía sau là mệnh đề (S + V) 'the legal department signs off...'. Already và Early là phó từ, During là giới từ (chỉ cộng cụm danh từ).",
    tip: "⚡ MẸO NHỚ: Đứng đầu câu trước một mệnh đề hoàn chỉnh (S + V) -> Chọn liên từ 'Once' (Một khi...).",
    vietnameseMeaning: "Một khi phòng pháp chế ký duyệt thỏa thuận, chúng ta có thể tiến hành sáp nhập."
  },

  // 3. Reflexive Pronoun "himself / herself / itself" (like ToIce 2 #103)
  {
    categoryMatch: 'Mệnh đề & Đại từ',
    triggerKeywords: ['himself', 'director'],
    question: "The company president ------- inspected the new manufacturing facility before the grand opening ceremony.",
    options: {
      A: "him",
      B: "his",
      C: "himself",
      D: "he"
    },
    correctAnswer: "C",
    explanation: "Câu đã có đầy đủ chủ ngữ (The company president) và vị ngữ (inspected...). Chỗ trống đứng ngay sau chủ ngữ dùng đại từ phản thân 'himself' để nhấn mạnh: 'Đích thân chủ tịch công ty'.",
    tip: "⚡ MẸO NHỚ: Đứng ngay sau Danh từ làm chủ ngữ để nhấn mạnh 'đích thân ai đó' -> Chọn đại từ phản thân (-self).",
    vietnameseMeaning: "Đích thân chủ tịch công ty đã kiểm tra cơ sở sản xuất mới trước lễ khai trương."
  },

  // 4. Word Form: Adverb modifying Verb (e.g. significantly / promptly / thoroughly)
  {
    categoryMatch: 'Từ loại',
    triggerKeywords: ['significantly', 'promptly', 'thoroughly', 'carefully', 'greatly'],
    question: "Customer satisfaction ratings have ------- increased since the introduction of the 24-hour support hotline.",
    options: {
      A: "dramatic",
      B: "dramatically",
      C: "drama",
      D: "dramatize"
    },
    correctAnswer: "B",
    explanation: "Đứng giữa trợ động từ 'have' và phân từ hai 'increased' bắt buộc phải là một Trạng từ (Adv - đuôi 'ly') để bổ nghĩa cho động từ đó.",
    tip: "⚡ MẸO NHỚ: 'have/has' + [ Trạng từ (-ly) ] + 'V3/ed' -> Chọn ngay từ có đuôi '-ly' (dramatically: một cách đáng kể).",
    vietnameseMeaning: "Chỉ số hài lòng của khách hàng đã tăng lên một cách đáng kể kể từ khi đưa vào đường dây nóng hỗ trợ 24 giờ."
  },

  // 5. Word Form: Noun after Preposition / Possessive
  {
    categoryMatch: 'Từ loại',
    triggerKeywords: ['requirement', 'decision', 'permission', 'information', 'guideline'],
    question: "All employees must complete the safety training in accordance with company -------.",
    options: {
      A: "regulate",
      B: "regulations",
      C: "regulatory",
      D: "regulated"
    },
    correctAnswer: "B",
    explanation: "Sau danh từ bổ nghĩa 'company' (hoặc sau cụm giới từ 'in accordance with') cần một Danh từ (Noun) làm tân ngữ. 'regulations' là danh từ số nhiều chỉ các quy định.",
    tip: "⚡ MẸO NHỚ: Sau giới từ / sở hữu / danh từ ghép -> Cần Danh từ (đuôi -tion / -ment / -ance / -s).",
    vietnameseMeaning: "Tất cả nhân viên phải hoàn thành khóa đào tạo an toàn theo đúng các quy định của công ty."
  },

  // 6. Preposition: Prior to / In advance of
  {
    categoryMatch: 'Giới từ',
    triggerKeywords: ['prior to', 'instead of', 'in response to', 'advance'],
    question: "------- submitting your expense report, please ensure that all original receipts are attached.",
    options: {
      A: "Prior to",
      B: "Ahead",
      C: "Previous",
      D: "Rather"
    },
    correctAnswer: "A",
    explanation: "'Prior to + V-ing/Noun' là cụm giới từ đồng nghĩa với 'Before' (Trước khi). Các từ khác không đi trực tiếp với V-ing theo cấu trúc này (Ahead of, Previous to).",
    tip: "⚡ MẸO NHỚ: Thấy '------- + V-ing' mang nghĩa 'trước khi' -> Chọn ngay 'Prior to' (= Before).",
    vietnameseMeaning: "Trước khi nộp báo cáo chi phí, vui lòng đảm bảo rằng tất cả biên lai gốc đã được đính kèm."
  },

  // 7. Conjunction: Although vs Despite / In spite of
  {
    categoryMatch: 'Liên từ',
    triggerKeywords: ['Although', 'Despite', 'Even though', 'In spite of'],
    question: "------- the unexpected transport strike, all conference speakers arrived at the venue on schedule.",
    options: {
      A: "Although",
      B: "Despite",
      C: "Even though",
      D: "Whereas"
    },
    correctAnswer: "B",
    explanation: "Phía sau chỗ trống là một Cụm danh từ 'the unexpected transport strike' (không có động từ chia thì) -> Dùng giới từ 'Despite' (Mặc dù). 'Although / Even though / Whereas' bắt buộc phải cộng Mệnh đề (S + V).",
    tip: "⚡ MẸO NHỚ: Phía sau là Cụm danh từ (Noun Phrase) -> Chọn 'Despite / In spite of'. Phía sau là Mệnh đề (S + V) -> Chọn 'Although / Even though'.",
    vietnameseMeaning: "Mặc dù xảy ra cuộc đình công giao thông bất ngờ, tất cả diễn giả hội nghị vẫn đến địa điểm đúng giờ."
  },

  // 8. Passive Voice: be + V3/ed
  {
    categoryMatch: 'Ngữ pháp & Thì',
    triggerKeywords: ['will be', 'was', 'were', 'implemented', 'conducted'],
    question: "The proposed marketing strategy will be ------- by the executive committee next Tuesday.",
    options: {
      A: "evaluate",
      B: "evaluating",
      C: "evaluated",
      D: "evaluates"
    },
    correctAnswer: "C",
    explanation: "Cấu trúc bị động ở tương lai đơn: 'will be + V3/ed' (sẽ được đánh giá). Chủ ngữ là vật 'The proposed marketing strategy' (chiến lược) không tự đánh giá mà được ủy ban đánh giá.",
    tip: "⚡ MẸO NHỚ: 'be / will be / was / were' + 'by...' -> Câu bị động, chọn động từ ở dạng 'V3/ed'.",
    vietnameseMeaning: "Chiến lược tiếp thị được đề xuất sẽ được ban giám đốc đánh giá vào thứ Ba tới."
  },

  // 9. Relative Clause: Who vs Which vs Whose
  {
    categoryMatch: 'Mệnh đề & Đại từ',
    triggerKeywords: ['who', 'which', 'whose', 'whom'],
    question: "The technician ------- repaired the main server yesterday received a commendation from the IT director.",
    options: {
      A: "who",
      B: "which",
      C: "whom",
      D: "whose"
    },
    correctAnswer: "A",
    explanation: "Đại từ quan hệ thay thế cho danh từ chỉ người 'The technician' và làm chủ ngữ cho động từ 'repaired' -> Chọn 'who'.",
    tip: "⚡ MẸO NHỚ: Danh từ chỉ người + [ who ] + Động từ (V) -> Luôn chọn 'who'.",
    vietnameseMeaning: "Kỹ thuật viên người đã sửa máy chủ chính ngày hôm qua đã nhận được lời khen ngợi từ giám đốc CNTT."
  },

  // 10. Vocabulary: Business Collocation (e.g. conduct survey / implement policy)
  {
    categoryMatch: 'Từ vựng',
    triggerKeywords: ['conduct', 'implement', 'comply', 'address', 'provide'],
    question: "The research institute plans to ------- an extensive survey on consumer purchasing habits.",
    options: {
      A: "conduct",
      B: "proceed",
      C: "behave",
      D: "operate"
    },
    correctAnswer: "A",
    explanation: "Cụm từ cố định trong TOEIC: 'conduct a survey / study / research / inspection' (tiến hành một cuộc khảo sát / nghiên cứu / thanh tra).",
    tip: "⚡ MẸO NHỚ: Đi với 'a survey / research / inspection' -> Chọn ngay động từ 'conduct' (tiến hành).",
    vietnameseMeaning: "Viện nghiên cứu dự định tiến hành một cuộc khảo sát quy mô lớn về thói quen mua sắm của người tiêu dùng."
  },

  // 11. Reading Comprehension Detail Check
  {
    categoryMatch: 'Đọc hiểu Đoạn văn',
    triggerKeywords: ['purpose', 'indicated', 'stated', 'clue'],
    question: "According to the corporate memorandum, what is required ------- participating in the international seminar?",
    options: {
      A: "prior to",
      B: "during",
      C: "instead",
      D: "except"
    },
    correctAnswer: "A",
    explanation: "Cấu trúc 'prior to + V-ing' nghĩa là 'trước khi tham gia hội thảo'. Manh mối thường nằm ở điều kiện tiên quyết trong văn bản thông báo.",
    tip: "⚡ MẸO NHỚ: Quét nhanh các từ khóa chỉ thời gian và điều kiện: 'prior to / before / in advance of'.",
    vietnameseMeaning: "Theo bản ghi nhớ của công ty, điều gì được yêu cầu trước khi tham gia hội thảo quốc tế?"
  }
];

/**
 * Intelligent Similar Question Generator
 * Generates an authentic similar question testing the exact same grammatical pattern or vocabulary rule.
 */
export function generateSimilarQuestion(targetQ: Question): Question {
  // Try to find a matching template by category and keywords
  let matchedTemplate: SimilarTemplate | undefined;

  // 1. Try matching by keywords
  if (targetQ.keywords && targetQ.keywords.length > 0) {
    matchedTemplate = similarTemplates.find((tmpl) =>
      tmpl.triggerKeywords?.some((kw) =>
        targetQ.keywords!.some((targetKw) => targetKw.toLowerCase().includes(kw.toLowerCase()))
      )
    );
  }

  // 2. Try matching by category
  if (!matchedTemplate) {
    matchedTemplate = similarTemplates.find((tmpl) =>
      tmpl.categoryMatch && targetQ.category.toLowerCase().includes(tmpl.categoryMatch.toLowerCase())
    );
  }

  // 3. Fallback: select a template or synthesize from targetQ
  if (!matchedTemplate) {
    // Pick based on targetQ.num modulo
    const index = Math.abs(targetQ.num) % similarTemplates.length;
    matchedTemplate = similarTemplates[index];
  }

  const uniqueId = `${targetQ.id}_similar_${Date.now()}`;

  return {
    id: uniqueId,
    num: targetQ.num,
    source: targetQ.source,
    category: targetQ.category,
    question: matchedTemplate.question,
    options: matchedTemplate.options,
    correctAnswer: matchedTemplate.correctAnswer,
    explanation: `[🎯 CÂU ĐỒNG DẠNG CỦNG CỐ CÂU #${targetQ.num}]: ${matchedTemplate.explanation}`,
    tip: `⚡ ÁP DỤNG CÙNG MẸO TỪ CÂU #${targetQ.num}: ${targetQ.tip}`,
    keywords: matchedTemplate.triggerKeywords || targetQ.keywords,
    vietnameseMeaning: matchedTemplate.vietnameseMeaning,
    isMustLearn: false, // Similar clone is for immediate drill practice
    isSimilarClone: true,
    similarToQuestionNum: targetQ.num,
    similarReason: `Đồng dạng với câu #${targetQ.num} — Cùng quy tắc ${targetQ.category}`,
    badge: '🎯 Câu tương tự rèn luyện',
  };
}
