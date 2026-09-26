export type AnswerChoice = 'A' | 'B' | 'C' | 'D';

export interface QuestionOptions {
  A: string;
  B: string;
  C: string;
  D: string;
}

export type QuestionCategory =
  | 'Từ vựng (Vocabulary)'
  | 'Từ loại (Word Form)'
  | 'Giới từ & Cụm từ (Prepositions)'
  | 'Ngữ pháp & Thì (Grammar & Tenses)'
  | 'Mệnh đề & Đại từ (Clauses & Pronouns)'
  | 'Liên từ (Conjunctions)'
  | 'Đọc hiểu Đoạn văn (Reading Comprehension)'
  | string;

export interface ClueDetail {
  questionNum: number;
  questionText?: string;
  correctAnswer: AnswerChoice;
  correctChoiceText?: string;
  clueLocation: string; // e.g. "Đoạn 1, dòng 2-3"
  clueQuote: string; // Trích dẫn câu gốc trong bài chứa đáp án
  clueExplanation?: string; // Hướng dẫn suy luận từ manh mối
  scanningTip: string; // Mẹo quét từ khóa nhanh
}

export interface PassageInfo {
  id: string;
  title: string;
  type?: string;
  content: string;
  vietnameseTranslation?: string;
  questionIds?: string[];
  clues: ClueDetail[];
}

export interface Question {
  id: string;
  num: number;
  source: 'ToIce 2' | 'Test 2 Part 5' | 'Part 6 Đọc Điền' | 'Part 7 Đoạn Văn' | 'Test 2' | string;
  category: QuestionCategory;
  question: string;
  options: QuestionOptions;
  correctAnswer: AnswerChoice;
  explanation: string;
  tip: string;
  keywords?: string[];
  vietnameseMeaning?: string;

  // Passage specific fields
  isPassageQuestion?: boolean;
  passageId?: string;
  passageInfo?: PassageInfo;
  clue?: ClueDetail;
}

export type StudyMode = 'sequential' | 'random' | 'wrong_only' | 'repeat_difficult';

export interface QuestionProgress {
  questionId: string;
  wrongCount: number;
  correctCount: number;
  lastAttemptDate: string; // YYYY-MM-DD
  lastAttemptTimestamp: number;
  lastResult: 'correct' | 'wrong' | 'timeout';
}

export interface MistakeRecord {
  questionId: string;
  userChoice: AnswerChoice | 'TIMEOUT';
  timestamp: number;
  questionNum: number;
  questionText: string;
  correctAnswer: AnswerChoice;
  tip: string;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  totalAnswered: number;
  correctCount: number;
  wrongCount: number;
  timeoutCount: number;
  mistakes: MistakeRecord[];
  notes: string;
  lastUpdated: number;
}
