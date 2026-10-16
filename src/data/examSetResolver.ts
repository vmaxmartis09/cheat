import { Question } from '../types';
import { ListeningQuestion, getListeningQuestionsByTestAndPart } from './listeningQuestions';
import { allQuestions, getQuestionsBySource } from './questions';

export interface FullExamSetInfo {
  examSetId: string;
  examSetName: string;
  badgeText: string;
  book: string;
  test: string;
  questionNum?: number;
  hasListening: boolean;
  hasReading: boolean;
  totalQuestions: number;
  rcSource?: string;
  lcTest?: number | string;
}

/**
 * Universal resolver to find which Exam Set (Bộ Đề) any question belongs to,
 * whether it is a Reading question or a Listening question.
 */
export function resolveFullExamSetInfo(q: {
  id?: string;
  source?: string;
  num?: number;
  test?: number | string;
  book?: string;
}): FullExamSetInfo {
  const src = (q.source || '').toLowerCase();
  const id = (q.id || '').toLowerCase();
  const book = (q.book || '').toLowerCase();
  const num = q.num;

  // 1. Docs 3 (TMA Online & Hackers Reading in Docs 3)
  if (id.startsWith('docs3_hk2')) {
    return {
      examSetId: 'hacker2_t1',
      examSetName: 'Hacker 2 · Test 1',
      badgeText: 'Hacker 2 · Test 1',
      book: 'Hacker 2 (Full 200 câu)',
      test: '1',
      questionNum: num,
      hasListening: true,
      hasReading: true,
      totalQuestions: 200,
      rcSource: 'Docs 5 - Hacker 2 Test 1 Full',
      lcTest: 1,
    };
  }
  if (id.startsWith('docs3_hk3')) {
    return {
      examSetId: 'hacker3_t1',
      examSetName: 'Hacker 3 · Test 1',
      badgeText: 'Hacker 3 · Test 1',
      book: 'Hacker 3 (RC 101-200)',
      test: '1',
      questionNum: num,
      hasListening: true,
      hasReading: true,
      totalQuestions: 200,
      rcSource: 'Hacker 3 Test 1 Full',
      lcTest: 'h3_1',
    };
  }
  if (src.includes('tma') || src.includes('docs 3') || id.startsWith('docs3_')) {
    return {
      examSetId: 'docs3_tma',
      examSetName: 'Docs 3 · Đề TMA Online',
      badgeText: 'Docs 3 · TMA',
      book: 'Docs 3 (TMA Online)',
      test: 'Đề TMA Online',
      questionNum: num,
      hasListening: false,
      hasReading: true,
      totalQuestions: 70,
      rcSource: 'Docs 3 - Đề TMA Online Full',
    };
  }

  // 2. Docs 4 (Hacker 3 Reading Test 1)
  if (src.includes('docs 4') || id.startsWith('docs4_')) {
    return {
      examSetId: 'docs4_t1',
      examSetName: 'Docs 4 · Hacker 3 Reading Test 1',
      badgeText: 'Docs 4 · Test 1',
      book: 'Docs 4 (Hacker 3 Reading)',
      test: 'Test 1',
      questionNum: num,
      hasListening: false,
      hasReading: true,
      totalQuestions: 100,
      rcSource: 'Docs 4 - Hacker 3 Test 1 Full',
    };
  }

  // 3. Docs 5: YBM (100% matches YBM 2025) vs Hacker 2
  if (id.startsWith('docs5_ybm1_') || (src.includes('docs 5') && src.includes('ybm'))) {
    const tMatch = src.match(/test\s*(\d+)/i) || id.match(/_t(\d+)_/i);
    const t = tMatch ? tMatch[1] : '1';
    return {
      examSetId: `ybm2025_t${t}`,
      examSetName: `YBM 2025 · Test ${t}`,
      badgeText: `YBM 2025 · Test ${t}`,
      book: 'YBM 2025 (RC 101-200)',
      test: t,
      questionNum: num,
      hasListening: false,
      hasReading: true,
      totalQuestions: 100,
      rcSource: `Docs 5 - YBM 1000 Vol 1 Test ${t} Full`,
    };
  }
  if (id.startsWith('docs5_hacker2_') || (src.includes('docs 5') && src.includes('hacker 2'))) {
    const tMatch = src.match(/test\s*(\d+)/i) || id.match(/_t(\d+)_/i);
    const t = tMatch ? tMatch[1] : '1';
    return {
      examSetId: `hacker2_t${t}`,
      examSetName: `Hacker 2 · Test ${t}`,
      badgeText: `Hacker 2 · Test ${t}`,
      book: 'Hacker 2 (Full 200 câu)',
      test: t,
      questionNum: num,
      hasListening: true,
      hasReading: true,
      totalQuestions: 200,
      rcSource: `Docs 5 - Hacker 2 Test ${t} Full`,
      lcTest: parseInt(t, 10),
    };
  }

  // 4. Hacker 2 (Tests 1-10: Full 200 questions each, 100 LC + 100 RC)
  if (src.includes('hacker 2') || src.includes('hacker2') || id.includes('hacker2') || book.includes('hacker 2')) {
    const tMatch = src.match(/test\s*(\d+)/i) || id.match(/_t(\d+)_/i) || [null, String(q.test || 1)];
    const t = tMatch ? tMatch[1] : '1';
    return {
      examSetId: `hacker2_t${t}`,
      examSetName: `Hacker 2 · Test ${t}`,
      badgeText: `Hacker 2 · Test ${t}`,
      book: 'Hacker 2 (Full 200 câu)',
      test: t,
      questionNum: num,
      hasListening: true,
      hasReading: true,
      totalQuestions: 200,
      rcSource: `Docs 5 - Hacker 2 Test ${t} Full`,
      lcTest: parseInt(t, 10),
    };
  }

  // 5. Hacker 3 (Tests 1-10: Full 200 questions each, 100 LC + 100 RC)
  if (
    src.includes('hacker 3') ||
    src.includes('hacker3') ||
    id.includes('hacker3') ||
    id.startsWith('h3_') ||
    id.startsWith('docs6_hacker3_') ||
    book.includes('hacker 3')
  ) {
    const tMatch = src.match(/test\s*(\d+)/i) || id.match(/h3_(?:t)?(\d+)/i) || id.match(/_t(\d+)_/i) || [null, String(q.test || 1)];
    const t = tMatch ? tMatch[1] : '1';
    return {
      examSetId: `hacker3_t${t}`,
      examSetName: `Hacker 3 · Test ${t}`,
      badgeText: `Hacker 3 · Test ${t}`,
      book: 'Hacker 3 (RC 101-200)',
      test: t,
      questionNum: num,
      hasListening: true,
      hasReading: true,
      totalQuestions: 200,
      rcSource: `Hacker 3 Test ${t} Full`,
      lcTest: `h3_${t}`,
    };
  }

  // 6. Hacker 1 (Tests 1-10: Full 200 questions each, 100 LC + 100 RC)
  if (
    src.includes('hacker 1') ||
    src.includes('hacker1') ||
    id.includes('hacker1') ||
    id.startsWith('h1_') ||
    id.startsWith('docs7_hacker1_') ||
    book.includes('hacker 1')
  ) {
    const tMatch = src.match(/test\s*(\d+)/i) || id.match(/h1_(?:t)?(\d+)/i) || id.match(/_t(\d+)_/i) || [null, String(q.test || 1)];
    const t = tMatch ? tMatch[1] : '1';
    return {
      examSetId: `hacker1_t${t}`,
      examSetName: `Hacker 1 · Test ${t}`,
      badgeText: `Hacker 1 · Test ${t}`,
      book: 'Hacker 1 (RC 101-200)',
      test: t,
      questionNum: num,
      hasListening: true,
      hasReading: true,
      totalQuestions: 200,
      rcSource: `Hacker 1 Test ${t} Full`,
      lcTest: `h1_${t}`,
    };
  }

  // 7. YBM 1000 Vol 1 (Tests 1-10: 100 RC each)
  if (src.includes('ybm 1000') || src.includes('ybm1') || id.includes('ybm1')) {
    const tMatch = src.match(/test\s*(\d+)/i) || id.match(/_t(\d+)_/i);
    const t = tMatch ? tMatch[1] : '1';
    return {
      examSetId: `ybm1_t${t}`,
      examSetName: `YBM 1000 · Test ${t}`,
      badgeText: `YBM 1000 · Test ${t}`,
      book: 'YBM 1000 Vol 1 (RC 101-200)',
      test: t,
      questionNum: num,
      hasListening: false,
      hasReading: true,
      totalQuestions: 100,
      rcSource: `Docs 5 - YBM 1000 Vol 1 Test ${t} Full`,
    };
  }

  // 8. Docs 2 - Đề 2 (YBM Test 1: 100 RC)
  if (src.includes('đề 2') || src.includes('de 2') || id.includes('docs2_de2')) {
    return {
      examSetId: 'docs2_de2',
      examSetName: 'Docs 2 · Đề 2 (YBM)',
      badgeText: 'Docs 2 · Đề 2',
      book: 'Docs 2 (Reading)',
      test: 'Đề 2 (YBM Test 1)',
      questionNum: num,
      hasListening: false,
      hasReading: true,
      totalQuestions: 100,
      rcSource: 'Docs 2 - Đề 2 YBM Full',
    };
  }

  // 9. Docs 2 - Chuyên đề Tips (34 RC questions)
  if (src.includes('chuyên đề') || src.includes('chuyen de') || id.includes('docs2_drill')) {
    return {
      examSetId: 'docs2_tips',
      examSetName: 'Docs 2 · Chuyên đề Tips',
      badgeText: 'Docs 2 · Tips',
      book: 'Docs 2 (Reading)',
      test: 'Chuyên đề Tips',
      questionNum: num,
      hasListening: false,
      hasReading: true,
      totalQuestions: 34,
      rcSource: 'Docs 2 - Chuyên đề Tips',
    };
  }

  // 7. Docs 2 - Đề 1 (Trial Test: Full 200 questions, 100 LC + 100 RC)
  if (
    src.includes('đề 1') ||
    src.includes('de 1') ||
    src.includes('luyện đề') ||
    id.includes('docs2_de1') ||
    id.includes('docs2_p5') ||
    id.includes('docs2_p6') ||
    id.startsWith('lc_') ||
    src.includes('listening')
  ) {
    return {
      examSetId: 'docs2_de1',
      examSetName: 'Docs 2 · Đề 1 (Trial Test)',
      badgeText: 'Docs 2 · Đề 1',
      book: 'Docs 2 (Reading)',
      test: 'Đề 1 (Trial Test)',
      questionNum: num,
      hasListening: true,
      hasReading: true,
      totalQuestions: 200,
      rcSource: 'Docs 2 - Đề 1 Full',
      lcTest: 0,
    };
  }

  // 8. Docs 1 - ToIce 2 (51 RC questions)
  if (src.includes('toice 2') || id.includes('toice2_')) {
    return {
      examSetId: 'docs1_toice2',
      examSetName: 'Docs 1 · Đề ToIce 2',
      badgeText: 'Docs 1 · ToIce 2',
      book: 'Docs 1 (Test 2)',
      test: 'ToIce 2',
      questionNum: num,
      hasListening: false,
      hasReading: true,
      totalQuestions: 51,
      rcSource: 'ToIce 2 Full',
    };
  }

  // 9. Docs 1 - Test 2 (100 RC questions)
  if (src.includes('test 2') || id.includes('test2_')) {
    return {
      examSetId: 'docs1_t2',
      examSetName: 'Docs 1 · Test 2',
      badgeText: 'Docs 1 · Test 2',
      book: 'Docs 1 (Test 2)',
      test: 'Test 2',
      questionNum: num,
      hasListening: false,
      hasReading: true,
      totalQuestions: 100,
      rcSource: 'Test 2 Full',
    };
  }

  // 10. Docs 3 - TMA Online (81 RC questions)
  if (src.includes('tma') || src.includes('hackers reading') || id.includes('docs3_')) {
    return {
      examSetId: 'docs3_tma',
      examSetName: 'Docs 3 · Đề TMA Online',
      badgeText: 'Docs 3 · TMA',
      book: 'Docs 3 (TMA Online)',
      test: 'Đề TMA Online',
      questionNum: num,
      hasListening: false,
      hasReading: true,
      totalQuestions: 81,
      rcSource: 'Docs 3 - Đề TMA Online Full',
    };
  }

  // Default fallback
  return {
    examSetId: 'hacker2_t1',
    examSetName: 'Hacker 2 · Test 1',
    badgeText: 'Hacker 2 · Test 1',
    book: 'Hacker 2 (Full 200 câu)',
    test: '1',
    questionNum: num,
    hasListening: true,
    hasReading: true,
    totalQuestions: 200,
    rcSource: 'Docs 5 - Hacker 2 Test 1 Full',
    lcTest: 1,
  };
}

/**
 * Loads all questions (both LC and RC) belonging to the given canonical examSetId.
 */
export function getFullExamSetQuestions(examSetId: string): {
  info: FullExamSetInfo;
  lcQuestions: ListeningQuestion[];
  rcQuestions: Question[];
  allQuestionsCount: number;
} {
  // 1. Hacker 2 (Tests 1-10)
  if (examSetId.startsWith('hacker2_t')) {
    const t = parseInt(examSetId.replace('hacker2_t', ''), 10);
    const info = resolveFullExamSetInfo({ source: `Hacker 2 Test ${t}` });
    const rcQuestions = getQuestionsBySource(`Docs 5 - Hacker 2 Test ${t} Full`).sort((a, b) => a.num - b.num);
    const lcQuestions = getListeningQuestionsByTestAndPart(t, 'all').sort((a, b) => a.num - b.num);
    return {
      info,
      lcQuestions,
      rcQuestions,
      allQuestionsCount: lcQuestions.length + rcQuestions.length,
    };
  }

  // 2. Hacker 3 (Tests 1-10)
  if (examSetId.startsWith('hacker3_t')) {
    const t = parseInt(examSetId.replace('hacker3_t', ''), 10);
    const info = resolveFullExamSetInfo({ source: `Hacker 3 Test ${t}` });
    const rcQuestions = getQuestionsBySource(`Hacker 3 Test ${t} Full`).sort((a, b) => a.num - b.num);
    const lcQuestions = getListeningQuestionsByTestAndPart(`h3_${t}`, 'all').sort((a, b) => a.num - b.num);
    return {
      info,
      lcQuestions,
      rcQuestions,
      allQuestionsCount: lcQuestions.length + rcQuestions.length,
    };
  }

  // 3. Hacker 1 (Tests 1-10)
  if (examSetId.startsWith('hacker1_t')) {
    const t = parseInt(examSetId.replace('hacker1_t', ''), 10);
    const info = resolveFullExamSetInfo({ source: `Hacker 1 Test ${t}` });
    const rcQuestions = getQuestionsBySource(`Hacker 1 Test ${t} Full`).sort((a, b) => a.num - b.num);
    const lcQuestions = getListeningQuestionsByTestAndPart(`h1_${t}`, 'all').sort((a, b) => a.num - b.num);
    return {
      info,
      lcQuestions,
      rcQuestions,
      allQuestionsCount: lcQuestions.length + rcQuestions.length,
    };
  }

  // 4. YBM 2025 / YBM 1000 (Tests 1-10)
  if (examSetId.startsWith('ybm2025_t') || examSetId.startsWith('ybm1_t')) {
    const t = parseInt(examSetId.replace(/^(?:ybm2025_t|ybm1_t)/, ''), 10);
    const info = resolveFullExamSetInfo({ source: `Docs 5 - YBM 1000 Vol 1 Test ${t}` });
    const rcQuestions = getQuestionsBySource(`Docs 5 - YBM 1000 Vol 1 Test ${t} Full`).sort((a, b) => a.num - b.num);
    return {
      info,
      lcQuestions: [],
      rcQuestions,
      allQuestionsCount: rcQuestions.length,
    };
  }

  // 4b. Docs 4 (Hacker 3 Reading Test 1)
  if (examSetId === 'docs4_t1') {
    const info = resolveFullExamSetInfo({ id: 'docs4_hacker3_t1_101' });
    const rcQuestions = getQuestionsBySource('Docs 4 - Hacker 3 Test 1 Full').sort((a, b) => a.num - b.num);
    return {
      info,
      lcQuestions: [],
      rcQuestions,
      allQuestionsCount: rcQuestions.length,
    };
  }

  // 5. Docs 2 - Đề 1 (Trial Test)
  if (examSetId === 'docs2_de1') {
    const info = resolveFullExamSetInfo({ id: 'docs2_de1_p7_147' });
    const rcQuestions = getQuestionsBySource('Docs 2 - Đề 1 Full').sort((a, b) => a.num - b.num);
    const lcQuestions = getListeningQuestionsByTestAndPart(0, 'all').sort((a, b) => a.num - b.num);
    return {
      info,
      lcQuestions,
      rcQuestions,
      allQuestionsCount: lcQuestions.length + rcQuestions.length,
    };
  }

  // 6. Docs 2 - Đề 2 (YBM)
  if (examSetId === 'docs2_de2') {
    const info = resolveFullExamSetInfo({ id: 'docs2_de2_p5_101' });
    const rcQuestions = getQuestionsBySource('Docs 2 - Đề 2 YBM Full').sort((a, b) => a.num - b.num);
    return {
      info,
      lcQuestions: [],
      rcQuestions,
      allQuestionsCount: rcQuestions.length,
    };
  }

  // 7. Docs 2 - Chuyên đề Tips
  if (examSetId === 'docs2_tips') {
    const info = resolveFullExamSetInfo({ id: 'docs2_drill_p5_107' });
    const rcQuestions = getQuestionsBySource('Docs 2 - Chuyên đề Tips').sort((a, b) => a.num - b.num);
    return {
      info,
      lcQuestions: [],
      rcQuestions,
      allQuestionsCount: rcQuestions.length,
    };
  }

  // 8. Docs 1 - Test 2
  if (examSetId === 'docs1_t2') {
    const info = resolveFullExamSetInfo({ id: 'test2_101' });
    const rcQuestions = getQuestionsBySource('Test 2 Full').sort((a, b) => a.num - b.num);
    return {
      info,
      lcQuestions: [],
      rcQuestions,
      allQuestionsCount: rcQuestions.length,
    };
  }

  // 9. Docs 1 - ToIce 2
  if (examSetId === 'docs1_toice2') {
    const info = resolveFullExamSetInfo({ id: 'toice2_101' });
    const rcQuestions = allQuestions.filter((q) => q.id.startsWith('toice2_')).sort((a, b) => a.num - b.num);
    return {
      info,
      lcQuestions: [],
      rcQuestions,
      allQuestionsCount: rcQuestions.length,
    };
  }

  // 10. Docs 3 - TMA Online
  if (examSetId === 'docs3_tma') {
    const info = resolveFullExamSetInfo({ id: 'docs3_tma_101' });
    const rcQuestions = getQuestionsBySource('Docs 3 - Đề TMA Online Full').sort((a, b) => a.num - b.num);
    return {
      info,
      lcQuestions: [],
      rcQuestions,
      allQuestionsCount: rcQuestions.length,
    };
  }

  // Fallback: Hacker 2 Test 1
  return getFullExamSetQuestions('hacker2_t1');
}
