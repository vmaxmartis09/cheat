// Utility to manage recent exam history and part navigation across Search, Matrix, and Full Answers Hub

export interface RecentExamItem {
  book: string;
  test: string;
  label: string;
  timestamp: number;
}

export interface PartShortcutItem {
  part: number;
  label: string;
  num: number;
  type: 'lc' | 'rc';
  name: string;
}

export const TOEIC_PARTS_SHORTCUTS: PartShortcutItem[] = [
  { part: 1, label: 'P1: #1', num: 1, type: 'lc', name: 'Part 1 (Tranh)' },
  { part: 2, label: 'P2: #7', num: 7, type: 'lc', name: 'Part 2 (Hỏi đáp)' },
  { part: 3, label: 'P3: #32', num: 32, type: 'lc', name: 'Part 3 (Hội thoại)' },
  { part: 4, label: 'P4: #71', num: 71, type: 'lc', name: 'Part 4 (Bài nói)' },
  { part: 5, label: 'P5: #101', num: 101, type: 'rc', name: 'Part 5 (Điền câu)' },
  { part: 6, label: 'P6: #131', num: 131, type: 'rc', name: 'Part 6 (Điền đoạn)' },
  { part: 7, label: 'P7: #147', num: 147, type: 'rc', name: 'Part 7 (Đọc hiểu)' },
];

const STORAGE_KEY = 'toeic_recent_exams';

export const DEFAULT_RECENT_EXAMS: RecentExamItem[] = [
  { book: 'Hacker 2 (Full 200 câu)', test: '1', label: 'Hacker 2 · Đề 1', timestamp: 1 },
  { book: 'Hacker 2 (Full 200 câu)', test: '2', label: 'Hacker 2 · Đề 2', timestamp: 2 },
  { book: 'Hacker 3 (RC 101-200)', test: '1', label: 'Hacker 3 · Đề 1', timestamp: 3 },
  { book: 'Hacker 1 (RC 101-200)', test: '1', label: 'Hacker 1 · Đề 1', timestamp: 4 },
];

export function getRecentExams(): RecentExamItem[] {
  if (typeof window === 'undefined') return DEFAULT_RECENT_EXAMS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_RECENT_EXAMS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return DEFAULT_RECENT_EXAMS;
  } catch {
    return DEFAULT_RECENT_EXAMS;
  }
}

export function saveRecentExam(book: string, test: string): RecentExamItem[] {
  if (typeof window === 'undefined') return DEFAULT_RECENT_EXAMS;
  try {
    const current = getRecentExams();
    const filtered = current.filter((item) => !(item.book === book && item.test === test));
    const bookShort = book
      .replace(/\s*\(.*?\)/g, '')
      .replace(/TOEIC/gi, '')
      .trim();
    const testShort = /^(test|đề)\b/i.test(test) ? test : `Đề ${test}`;
    const newItem: RecentExamItem = {
      book,
      test,
      label: `${bookShort} · ${testShort}`,
      timestamp: Date.now(),
    };
    const updated = [newItem, ...filtered].slice(0, 5);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return DEFAULT_RECENT_EXAMS;
  }
}
