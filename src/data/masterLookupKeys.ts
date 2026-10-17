// Master Answer Key Lookup Database for all TOEIC Exam Sets
// Full 200 Questions (LC 1-100 & RC 101-200) — Grouped into 3 Clusters: Hacker, YBM, Other
// Powered directly by normalized and official publisher-verified JSON data

import masterKeysJson from './json/masterAnswerKeys.json';

export type ExamClusterId = 'hacker' | 'ybm' | 'other';

export interface ExamClusterMeta {
  id: ExamClusterId;
  name: string;
  shortName: string;
  badge: string;
  description: string;
}

export const EXAM_CLUSTERS_META: ExamClusterMeta[] = [
  {
    id: 'hacker',
    name: '🔥 Cụm 1: Hacker TOEIC (Hacker 1, 2, 3)',
    shortName: '🔥 Cụm Hacker',
    badge: '30 Đề • 6,000 Câu',
    description: 'Trọn bộ 30 đề Hacker TOEIC 1, 2, 3 (3,000 LC + 3,000 RC)',
  },
  {
    id: 'ybm',
    name: '📘 Cụm 2: YBM TOEIC (YBM 2025 & Vol 1)',
    shortName: '📘 Cụm YBM',
    badge: '20 Đề • 4,000 Câu',
    description: 'Trọn bộ 20 đề YBM TOEIC 2025 & YBM 1000 Vol 1 (2,000 LC + 2,000 RC)',
  },
  {
    id: 'other',
    name: '📂 Cụm 3: Đề Lẻ & Docs (Docs 1, 2, 3, 4)',
    shortName: '📂 Cụm Đề Lẻ',
    badge: '8 Đề • 751 Câu',
    description: 'Các bộ đề lẻ thực chiến: Docs 1, Docs 2 Trial, Docs 3 TMA Online, Docs 4',
  },
];

export interface ExamBookMeta {
  id: string;
  name: string;
  cluster: ExamClusterId;
  hasListening: boolean;
  hasReading: boolean;
  testCount: number;
  testOptions?: { id: string; name: string }[];
}

export const EXAM_BOOKS_META: ExamBookMeta[] = [
  // Cụm 1: Hacker
  { id: 'Hacker 1 (Full 200 câu)', name: 'Hacker TOEIC 1 (Full 200 câu LC + RC)', cluster: 'hacker', hasListening: true, hasReading: true, testCount: 10 },
  { id: 'Hacker 2 (Full 200 câu)', name: 'Hacker TOEIC 2 (Full 200 câu LC + RC)', cluster: 'hacker', hasListening: true, hasReading: true, testCount: 10 },
  { id: 'Hacker 3 (Full 200 câu)', name: 'Hacker TOEIC 3 (Full 200 câu LC + RC)', cluster: 'hacker', hasListening: true, hasReading: true, testCount: 10 },
  // Cụm 2: YBM
  { id: 'YBM 2025 (Full 200 câu)', name: 'YBM TOEIC 2025 (Full 200 câu LC + RC)', cluster: 'ybm', hasListening: true, hasReading: true, testCount: 10 },
  { id: 'YBM 1000 Vol 1 (Full 200 câu)', name: 'YBM 1000 Vol 1 (Full 200 câu LC + RC)', cluster: 'ybm', hasListening: true, hasReading: true, testCount: 10 },
  // Cụm 3: Đề Lẻ & Docs
  { id: 'Docs 2 (Reading)', name: 'Docs 2 (Đề 1 Full 200 câu, Đề 2 YBM, Chuyên đề Tips)', cluster: 'other', hasListening: true, hasReading: true, testCount: 3 },
  { id: 'Docs 2 (Listening Test 1)', name: 'Docs 2 Listening (Test 1 Full 100 câu)', cluster: 'other', hasListening: true, hasReading: false, testCount: 1 },
  { id: 'Docs 1 (Test 2)', name: 'Docs 1 (Test 2 Full 100 câu & ToIce 2)', cluster: 'other', hasListening: false, hasReading: true, testCount: 2 },
  { id: 'Docs 3 (TMA Online)', name: 'Docs 3 TMA Online (Đề TMA Online 70 câu)', cluster: 'other', hasListening: false, hasReading: true, testCount: 1 },
  { id: 'Docs 4 (Hacker 3 Reading)', name: 'Docs 4 (Hacker 3 Reading Test 1 Full 100 câu)', cluster: 'other', hasListening: false, hasReading: true, testCount: 1 },
];

export const MASTER_ANSWER_KEYS: Record<string, Record<string, Record<string, string>>> = masterKeysJson as any;

export function lookupAnswer(book: string, test: number | string, questionNum: number | string): string | null {
  const b = MASTER_ANSWER_KEYS[book];
  if (!b) return null;
  const t = b[String(test)];
  if (!t) return null;
  return t[String(questionNum)] || null;
}

/**
 * Tự động tìm bộ đề và câu hỏi từ bất kì source/questionId nào trong hệ thống
 */
export function resolveBookAndTestFromSource(
  source?: string,
  questionId?: string,
  questionNum?: number
): { book: string; test: string; num?: number; questionNum?: number } | null {
  if (source && MASTER_ANSWER_KEYS[source]) {
    const firstTest = Object.keys(MASTER_ANSWER_KEYS[source])[0] || '1';
    return { book: source, test: firstTest, num: questionNum, questionNum };
  }

  const src = (source || '').toLowerCase();
  const qId = (questionId || '').toLowerCase();

  // 1. Docs 3 (TMA Online & Hackers Reading sample in Docs 3)
  if (qId.startsWith('docs3_hk2')) {
    return { book: 'Hacker 2 (Full 200 câu)', test: '1', num: questionNum, questionNum };
  }
  if (qId.startsWith('docs3_hk3')) {
    return { book: 'Hacker 3 (Full 200 câu)', test: '1', num: questionNum, questionNum };
  }
  if (src.includes('tma') || src.includes('docs 3') || qId.startsWith('docs3_')) {
    return { book: 'Docs 3 (TMA Online)', test: 'Đề TMA Online', num: questionNum, questionNum };
  }

  // 2. Docs 4 (Hacker 3 Reading Test 1)
  if (src.includes('docs 4') || qId.startsWith('docs4_')) {
    return { book: 'Docs 4 (Hacker 3 Reading)', test: 'Test 1', num: questionNum, questionNum };
  }

  // 3. Docs 2
  if (src.includes('docs 2 - đề 2') || src.includes('đề 2 ybm') || qId.startsWith('docs2_de2')) {
    return { book: 'Docs 2 (Reading)', test: 'Đề 2 (YBM Test 1)', num: questionNum, questionNum };
  }
  if (src.includes('chuyên đề') || qId.startsWith('docs2_drill')) {
    return { book: 'Docs 2 (Reading)', test: 'Chuyên đề Tips', num: questionNum, questionNum };
  }
  if (
    src.includes('docs 2 - đề 1') ||
    src.includes('đề 1 part 7') ||
    src.includes('luyện đề') ||
    qId.startsWith('docs2_de1') ||
    qId.startsWith('docs2_p5') ||
    qId.startsWith('docs2_p6')
  ) {
    return { book: 'Docs 2 (Reading)', test: 'Đề 1 (Trial Test)', num: questionNum, questionNum };
  }

  // 4. Docs 5: YBM vs Hacker 2
  // Note: Docs 5 YBM questions match 100% with YBM 2025 Reading tests!
  if (qId.startsWith('docs5_ybm1_') || (src.includes('docs 5') && src.includes('ybm'))) {
    const tMatch = src.match(/test\s*(\d+)/i) || qId.match(/_t(\d+)_/i);
    const testNum = tMatch ? tMatch[1] : '1';
    return { book: 'YBM 2025 (Full 200 câu)', test: testNum, num: questionNum, questionNum };
  }
  if (qId.startsWith('docs5_hacker2_') || (src.includes('docs 5') && src.includes('hacker 2'))) {
    const tMatch = src.match(/test\s*(\d+)/i) || qId.match(/_t(\d+)_/i);
    const testNum = tMatch ? tMatch[1] : '1';
    return { book: 'Hacker 2 (Full 200 câu)', test: testNum, num: questionNum, questionNum };
  }

  // 5. Hacker 1
  if (src.includes('hacker 1') || src.includes('hacker1') || qId.includes('hacker1') || qId.startsWith('h1_') || qId.startsWith('docs7_h1_')) {
    const tMatch = src.match(/test\s*(\d+)/i) || qId.match(/h1_(?:t)?(\d+)/i) || qId.match(/_t(\d+)_/i);
    const testNum = tMatch ? tMatch[1] : '1';
    return { book: 'Hacker 1 (Full 200 câu)', test: testNum, num: questionNum, questionNum };
  }

  // 6. Hacker 3
  if (src.includes('hacker 3') || src.includes('hacker3') || qId.includes('hacker3') || qId.startsWith('h3_') || qId.startsWith('docs6_h3_')) {
    const tMatch = src.match(/test\s*(\d+)/i) || qId.match(/h3_(?:t)?(\d+)/i) || qId.match(/_t(\d+)_/i);
    const testNum = tMatch ? tMatch[1] : '1';
    return { book: 'Hacker 3 (Full 200 câu)', test: testNum, num: questionNum, questionNum };
  }

  // 7. Hacker 2
  if (src.includes('hacker 2') || src.includes('hacker2') || qId.includes('hacker2')) {
    const tMatch = src.match(/test\s*(\d+)/i) || qId.match(/_t(\d+)_/i);
    const testNum = tMatch ? tMatch[1] : '1';
    return { book: 'Hacker 2 (Full 200 câu)', test: testNum, num: questionNum, questionNum };
  }

  // 8. YBM 2025
  if (src.includes('ybm 2025') || src.includes('ybm2025') || qId.startsWith('ybm2025_')) {
    const tMatch = src.match(/test\s*(\d+)/i) || qId.match(/_t(\d+)_/i);
    const testNum = tMatch ? tMatch[1] : '1';
    return { book: 'YBM 2025 (Full 200 câu)', test: testNum, num: questionNum, questionNum };
  }

  // 9. YBM 1000 Vol 1
  if (src.includes('ybm 1000') || src.includes('ybm1') || src.includes('ybm') || qId.includes('ybm1') || qId.startsWith('ybm1000_')) {
    const tMatch = src.match(/test\s*(\d+)/i) || qId.match(/_t(\d+)_/i);
    const testNum = tMatch ? tMatch[1] : '1';
    return { book: 'YBM 1000 Vol 1 (Full 200 câu)', test: testNum, num: questionNum, questionNum };
  }

  // 10. Docs 1 (ToIce 2 & Test 2)
  if (src.includes('toice 2') || qId.startsWith('toice2_')) {
    return { book: 'Docs 1 (Test 2)', test: 'ToIce 2', num: questionNum, questionNum };
  }
  if (src.includes('test 2') || src.includes('docs 1') || src.includes('part 6') || src.includes('part 7') || qId.startsWith('test2_')) {
    return { book: 'Docs 1 (Test 2)', test: 'Test 2', num: questionNum, questionNum };
  }

  // 11. Docs 2 Listening
  if (src.includes('listening') || qId.includes('listening_') || qId.startsWith('p1_') || qId.startsWith('p2_') || qId.startsWith('p3_') || qId.startsWith('p4_') || qId.startsWith('lc_')) {
    return { book: 'Docs 2 (Reading)', test: 'Đề 1 (Trial Test)', num: questionNum, questionNum };
  }

  return null;
}

export interface ClusterStatSummary {
  id: ExamClusterId;
  name: string;
  shortName: string;
  books: ExamBookMeta[];
  bookCount: number;
  testCount: number;
  lcQuestions: number;
  rcQuestions: number;
  totalQuestions: number;
}

export function getClusterStats(): ClusterStatSummary[] {
  return EXAM_CLUSTERS_META.map((cluster) => {
    const books = EXAM_BOOKS_META.filter((b) => b.cluster === cluster.id);
    let testCount = 0;
    let lcQuestions = 0;
    let rcQuestions = 0;

    books.forEach((b) => {
      const bookData = MASTER_ANSWER_KEYS[b.id] || {};
      const tests = Object.values(bookData);
      testCount += tests.length;
      tests.forEach((tObj) => {
        Object.keys(tObj).forEach((qStr) => {
          const n = parseInt(qStr, 10);
          if (!isNaN(n)) {
            if (n <= 100) lcQuestions++;
            else rcQuestions++;
          }
        });
      });
    });

    return {
      id: cluster.id,
      name: cluster.name,
      shortName: cluster.shortName,
      books,
      bookCount: books.length,
      testCount,
      lcQuestions,
      rcQuestions,
      totalQuestions: lcQuestions + rcQuestions,
    };
  });
}
