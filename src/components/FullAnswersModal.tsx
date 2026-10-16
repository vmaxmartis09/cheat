import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  MASTER_ANSWER_KEYS,
  EXAM_BOOKS_META,
  resolveBookAndTestFromSource,
} from '../data/masterLookupKeys';
import {
  allQuestions,
  docs1Questions,
  docs3Questions,
  docs4Questions,
  docs5Questions,
  hacker3Questions,
  hacker1Questions,
} from '../data/questions';
import { docs2Questions } from '../data/docs2Questions';
import {
  getListeningQuestionsByTestAndPart,
  getAllListeningQuestions,
  listeningQuestions,
} from '../data/listeningQuestions';
import { hackerExtraListeningQuestions } from '../data/hackerExtraListening';
import { Question } from '../types';
import { useQuizStore } from '../store/useQuizStore';
import { Part1VisualStrip } from './Part1VisualStrip';
import { resolveFullExamSetInfo, getFullExamSetQuestions } from '../data/examSetResolver';
import {
  saveRecentExam,
  TOEIC_PARTS_SHORTCUTS,
} from '../data/recentExams';
import {
  CheckCircle2,
  Copy,
  Check,
  Search,
  Layers,
  ChevronRight,
  ChevronLeft,
  LayoutGrid,
  List,
  Headphones,
  BookOpen,
  ArrowRight,
  Sparkles,
  Zap,
  X,
  FileText,
  Volume2,
  Lightbulb,
  HelpCircle,
  Minimize2,
  Maximize2,
} from 'lucide-react';

interface ResolvedQuestionInfo {
  num: number;
  book: string;
  test: string;
  partName: string;
  correctAnswer: string;
  questionText?: string;
  options?: Record<string, string>;
  explanation?: string;
  tip?: string;
  vietnameseMeaning?: string;
  passage?: {
    title?: string;
    content?: string;
    vietnameseTranslation?: string;
    clue?: {
      location?: string;
      quote?: string;
      scanningTip?: string;
    };
  };
  listening?: {
    part: number;
    accent?: string;
    transcript?: string;
    audioUrl?: string;
    imageUrl?: string;
  };
  hasFullContent: boolean;
}

function resolveQuestionDetail(
  book: string,
  test: string,
  num: number,
  officialAns: string
): ResolvedQuestionInfo {
  const getPartName = (n: number) => {
    if (n <= 6) return 'Part 1 • Mô tả tranh (Photographs)';
    if (n <= 31) return 'Part 2 • Hỏi & Đáp (Question-Response)';
    if (n <= 70) return 'Part 3 • Hội thoại (Conversations)';
    if (n <= 100) return 'Part 4 • Bài nói ngắn (Short Talks)';
    if (n <= 130) return 'Part 5 • Điền câu (Incomplete Sentences)';
    if (n <= 146) return 'Part 6 • Điền đoạn (Text Completion)';
    return 'Part 7 • Đọc hiểu đoạn văn (Reading Comprehension)';
  };

  // 1. Listening questions (1 - 100)
  if (num <= 100) {
    let lq: any = null;
    const testNum = parseInt(test, 10);

    if (book.includes('Hacker 2')) {
      const list = getListeningQuestionsByTestAndPart(testNum || 1, 'all');
      lq = list.find((q) => q.num === num);
    } else if (book.includes('Hacker 3')) {
      lq = hackerExtraListeningQuestions.find(
        (q) => q.book === 'Hacker 3' && (testNum ? q.test === testNum : true) && q.num === num
      );
    } else if (book.includes('Hacker 1')) {
      lq = hackerExtraListeningQuestions.find(
        (q) => q.book === 'Hacker 1' && q.num === num
      );
    } else if (book.includes('Docs 2') || book.includes('Listening')) {
      lq = listeningQuestions.find((q) => q.num === num);
    }

    if (!lq) {
      lq = getAllListeningQuestions().find((q) => q.num === num);
    }

    if (lq) {
      return {
        num,
        book,
        test,
        partName: `Listening Part ${lq.part} • ${lq.category || ''}`,
        correctAnswer: lq.correctAnswer || officialAns,
        questionText: lq.question,
        options: lq.options as Record<string, string>,
        explanation: lq.explanation,
        tip: lq.tip,
        vietnameseMeaning: (lq as any).vietnameseMeaning,
        listening: {
          part: lq.part,
          accent: lq.accent,
          transcript: lq.transcript,
          audioUrl: lq.audioUrl,
          imageUrl: lq.imageUrl,
        },
        hasFullContent: true,
      };
    }
  }

  // 2. Reading questions (101 - 200)
  let rq: Question | undefined;
  const testNum = parseInt(test, 10);

  if (book.includes('Docs 3') || book.includes('TMA')) {
    rq = docs3Questions.find(
      (q) => q.num === num && (q.id.startsWith('docs3_tma_') || q.source.includes('TMA'))
    );
    if (!rq) {
      rq = docs3Questions.find((q) => q.num === num);
    }
  } else if (book.includes('Docs 4')) {
    rq = docs4Questions.find((q) => q.num === num);
  } else if (book.includes('Docs 1')) {
    if (test.includes('ToIce') || test.includes('Test 1')) {
      rq = docs1Questions.find(
        (q) => (q.id.startsWith('docs1_t1') || q.source.includes('ToIce')) && q.num === num
      );
    } else {
      rq = docs1Questions.find(
        (q) => (q.id.startsWith('docs1_t2') || q.source.includes('Test 2') || !q.source.includes('ToIce')) && q.num === num
      );
    }
  } else if (book.includes('Hacker 2')) {
    rq = docs5Questions.find(
      (q) => q.id.startsWith(`docs5_hacker2_t${testNum || 1}_`) && q.num === num
    );
    if (!rq) {
      rq = docs5Questions.find(
        (q) => q.num === num && q.source.includes('Hacker 2') && q.source.includes(`Test ${testNum || 1}`)
      );
    }
  } else if (book.includes('Hacker 3')) {
    rq = hacker3Questions.find(
      (q) => q.id.startsWith(`docs6_hacker3_t${testNum || 1}_`) && q.num === num
    );
  } else if (book.includes('Hacker 1')) {
    rq = hacker1Questions.find(
      (q) => q.id.startsWith(`docs7_hacker1_t${testNum || 1}_`) && q.num === num
    );
  } else if (book.includes('YBM 2025') || book.includes('YBM 1000')) {
    rq = docs5Questions.find(
      (q) => q.id.startsWith(`docs5_ybm1_t${testNum || 1}_`) && q.num === num
    );
  } else if (book.includes('Docs 2')) {
    if (test.includes('Đề 1')) {
      rq = docs2Questions.find(
        (q: Question) => (q.id.startsWith('docs2_de1') || q.source.includes('Đề 1')) && q.num === num
      );
    } else if (test.includes('Đề 2')) {
      rq = docs2Questions.find(
        (q: Question) => (q.id.startsWith('docs2_de2') || q.source.includes('Đề 2') || q.source.includes('YBM')) && q.num === num
      );
    } else {
      rq = docs2Questions.find(
        (q: Question) => (q.id.startsWith('docs2_drill') || q.source.includes('Chuyên đề')) && q.num === num
      );
    }
  }

  // Canonical exam set fallback
  if (!rq) {
    const info = resolveFullExamSetInfo({ source: book, test, num });
    const fullSet = getFullExamSetQuestions(info.examSetId);
    rq = fullSet.rcQuestions.find((q) => q.num === num);
  }

  // Fallback search across all questions: only match if question's source actually relates to book or test
  if (!rq) {
    rq = allQuestions.find(
      (q) => q.num === num && (q.source.includes(book) || (testNum ? q.source.includes(`Test ${testNum}`) : false))
    );
  }

  if (rq) {
    return {
      num,
      book,
      test,
      partName: rq.category || getPartName(num),
      correctAnswer: officialAns || rq.correctAnswer,
      questionText: rq.question,
      options: rq.options as unknown as Record<string, string>,
      explanation: rq.explanation,
      tip: rq.tip,
      vietnameseMeaning: rq.vietnameseMeaning,
      passage: rq.passageInfo
        ? {
            title: rq.passageInfo.title,
            content: rq.passageInfo.content,
            vietnameseTranslation: rq.passageInfo.vietnameseTranslation,
            clue: rq.clue
              ? {
                  location: rq.clue.clueLocation,
                  quote: rq.clue.clueQuote,
                  scanningTip: rq.clue.scanningTip,
                }
              : undefined,
          }
        : undefined,
      hasFullContent: true,
    };
  }

  return {
    num,
    book,
    test,
    partName: getPartName(num),
    correctAnswer: officialAns,
    hasFullContent: false,
  };
}

const DEFAULT_BOOK_ID = EXAM_BOOKS_META[0]?.id || 'Hacker 2 (Full 200 câu)';

function resolveValidBookId(rawBook?: string): string {
  if (!rawBook) return DEFAULT_BOOK_ID;
  if (MASTER_ANSWER_KEYS[rawBook]) return rawBook;
  const resolved = resolveBookAndTestFromSource(rawBook);
  if (resolved && MASTER_ANSWER_KEYS[resolved.book]) return resolved.book;
  return DEFAULT_BOOK_ID;
}

export const FullAnswersModal: React.FC = () => {
  const { fullAnswerTarget, setActiveTab, setListeningCurrentIndex, jumpToIndex, questions, openFullExamSet } = useQuizStore();

  // Selected Book and Test
  const [selectedBook, setSelectedBook] = useState<string>(() => {
    if (!fullAnswerTarget?.book) return DEFAULT_BOOK_ID;
    if (MASTER_ANSWER_KEYS[fullAnswerTarget.book]) return fullAnswerTarget.book;
    const resolved = resolveBookAndTestFromSource(fullAnswerTarget.book, undefined, fullAnswerTarget.questionNum);
    return resolved?.book || resolveValidBookId(fullAnswerTarget.book);
  });
  const [selectedTest, setSelectedTest] = useState<string>(() => {
    if (fullAnswerTarget?.test) return fullAnswerTarget.test;
    if (fullAnswerTarget?.book) {
      const resolved = resolveBookAndTestFromSource(fullAnswerTarget.book, undefined, fullAnswerTarget.questionNum);
      if (resolved?.test) return resolved.test;
    }
    return '1';
  });
  const [highlightNum, setHighlightNum] = useState<number | undefined>(
    fullAnswerTarget?.questionNum ?? (fullAnswerTarget as any)?.num
  );

  // View Mode: 'matrix' (Single screen 1-màn-hình) vs 'cards' (Chi tiết)
  const [viewMode, setViewMode] = useState<'matrix' | 'cards'>('matrix');

  // Mobile active section for matrix view ('lc' | 'rc' | 'both')
  const [mobileSection, setMobileSection] = useState<'lc' | 'rc' | 'both'>('lc');

  // Search filter inside answers
  const [searchNum, setSearchNum] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Bottom Sheet Detail State
  const [detailNum, setDetailNum] = useState<number | null>(null);
  const [sheetHeightMode, setSheetHeightMode] = useState<'peek' | 'full'>('full');
  const [showPassageTranslation, setShowPassageTranslation] = useState<boolean>(false);
  const touchStartPos = useRef<{ x: number; y: number; time: number } | null>(null);

  const handleOpenDetail = (num: number, mode: 'peek' | 'full' = 'full') => {
    setHighlightNum(num);
    setDetailNum(num);
    setSheetHeightMode(mode);
    setShowPassageTranslation(false);
  };

  const handleCloseDetail = () => {
    setDetailNum(null);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  // Update when fullAnswerTarget changes from another component
  useEffect(() => {
    if (fullAnswerTarget) {
      let targetBook = fullAnswerTarget.book;
      let targetTest = fullAnswerTarget.test;
      const qNum = fullAnswerTarget.questionNum ?? (fullAnswerTarget as any)?.num;

      if (targetBook && !MASTER_ANSWER_KEYS[targetBook]) {
        const resolved = resolveBookAndTestFromSource(targetBook, undefined, qNum);
        if (resolved) {
          targetBook = resolved.book;
          if (!targetTest || targetTest === '1' || (MASTER_ANSWER_KEYS[resolved.book] && !MASTER_ANSWER_KEYS[resolved.book][targetTest])) {
            targetTest = resolved.test;
          }
        }
      }

      const validBook = resolveValidBookId(targetBook);
      setSelectedBook(validBook);

      if (targetTest) {
        setSelectedTest(String(targetTest));
      } else if (MASTER_ANSWER_KEYS[validBook]) {
        setSelectedTest(Object.keys(MASTER_ANSWER_KEYS[validBook])[0] || '1');
      }

      if (qNum) {
        setHighlightNum(qNum);
        if (qNum > 100) {
          setMobileSection('rc');
        } else {
          setMobileSection('lc');
        }
        handleOpenDetail(qNum, 'full');
      }
    }
  }, [fullAnswerTarget]);

  const effectiveBook = MASTER_ANSWER_KEYS[selectedBook] ? selectedBook : DEFAULT_BOOK_ID;

  // Save recent exams on change
  useEffect(() => {
    if (effectiveBook && selectedTest) {
      saveRecentExam(effectiveBook, selectedTest);
    }
  }, [effectiveBook, selectedTest]);

  // Available tests for current book
  const availableTests = useMemo(() => {
    const bookData = MASTER_ANSWER_KEYS[effectiveBook];
    if (!bookData) return ['1'];
    return Object.keys(bookData).sort((a, b) => {
      const na = parseInt(a, 10);
      const nb = parseInt(b, 10);
      if (!isNaN(na) && !isNaN(nb)) return na - nb;
      return a.localeCompare(b);
    });
  }, [effectiveBook]);

  // Ensure selected test exists in current book
  useEffect(() => {
    if (!availableTests.includes(selectedTest)) {
      setSelectedTest(availableTests[0] || '1');
    }
  }, [availableTests, selectedTest]);

  // Current test navigation: prev and next
  const currentTestIdx = availableTests.indexOf(selectedTest);
  const prevTest = currentTestIdx > 0 ? availableTests[currentTestIdx - 1] : null;
  const nextTest = currentTestIdx >= 0 && currentTestIdx < availableTests.length - 1 ? availableTests[currentTestIdx + 1] : null;

  const handleNextExam = () => {
    if (nextTest) {
      setSelectedTest(nextTest);
      return;
    }
    const currentBookIdx = EXAM_BOOKS_META.findIndex((b) => b.id === effectiveBook);
    const nextBookIdx = (currentBookIdx + 1) % EXAM_BOOKS_META.length;
    const nextBook = EXAM_BOOKS_META[nextBookIdx];
    if (nextBook) {
      setSelectedBook(nextBook.id);
      const tests = Object.keys(MASTER_ANSWER_KEYS[nextBook.id] || {});
      setSelectedTest(tests[0] || '1');
    }
  };

  const handlePrevExam = () => {
    if (prevTest) {
      setSelectedTest(prevTest);
      return;
    }
    const currentBookIdx = EXAM_BOOKS_META.findIndex((b) => b.id === effectiveBook);
    const prevBookIdx = (currentBookIdx - 1 + EXAM_BOOKS_META.length) % EXAM_BOOKS_META.length;
    const prevBook = EXAM_BOOKS_META[prevBookIdx];
    if (prevBook) {
      setSelectedBook(prevBook.id);
      const tests = Object.keys(MASTER_ANSWER_KEYS[prevBook.id] || {});
      setSelectedTest(tests[tests.length - 1] || '1');
    }
  };

  // Current answers dictionary
  const answersObj: Record<string, string> = useMemo(() => {
    const bookData = MASTER_ANSWER_KEYS[effectiveBook] || {};
    return bookData[selectedTest] || bookData[availableTests[0]] || {};
  }, [effectiveBook, selectedTest, availableTests]);

  // Current meta
  const currentMeta = useMemo(() => {
    return EXAM_BOOKS_META.find((m) => m.id === effectiveBook);
  }, [effectiveBook]);

  // Sorted list of all question numbers
  const allNums = useMemo(() => {
    return Object.keys(answersObj)
      .map((k) => parseInt(k, 10))
      .filter((n) => !isNaN(n))
      .sort((a, b) => a - b);
  }, [answersObj]);

  const lcNums = useMemo(() => allNums.filter((n) => n <= 100), [allNums]);
  const rcNums = useMemo(() => allNums.filter((n) => n > 100), [allNums]);

  // Keyboard navigation when bottom sheet is open (Esc to close, Left/Right for prev/next question)
  useEffect(() => {
    if (detailNum === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseDetail();
      } else if (e.key === 'ArrowLeft') {
        const currentIdx = allNums.indexOf(detailNum);
        if (currentIdx > 0) {
          handleOpenDetail(allNums[currentIdx - 1]);
        }
      } else if (e.key === 'ArrowRight') {
        const currentIdx = allNums.indexOf(detailNum);
        if (currentIdx >= 0 && currentIdx < allNums.length - 1) {
          handleOpenDetail(allNums[currentIdx + 1]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [detailNum, allNums]);

  // Filtered list for Cards View
  const filteredNums = useMemo(() => {
    return allNums.filter((num) => {
      if (searchNum.trim()) {
        const query = searchNum.trim();
        const strNum = String(num);
        if (!strNum.includes(query)) return false;
      }
      return true;
    });
  }, [allNums, searchNum]);

  // If searchNum matches an exact number, highlight it
  useEffect(() => {
    const parsed = parseInt(searchNum.trim(), 10);
    if (!isNaN(parsed) && answersObj[parsed]) {
      setHighlightNum(parsed);
      if (parsed > 100) setMobileSection('rc');
      else setMobileSection('lc');
    }
  }, [searchNum, answersObj]);

  // Auto scroll in cards view
  useEffect(() => {
    if (viewMode === 'cards' && highlightNum) {
      setTimeout(() => {
        const el = document.getElementById(`ans-item-${highlightNum}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [highlightNum, viewMode]);

  // Copy full answers
  const handleCopyAll = () => {
    const listToCopy = filteredNums.length > 0 ? filteredNums : allNums;
    const lines = listToCopy.map((n) => `${n}: ${answersObj[n]}`);
    navigator.clipboard.writeText(
      `ĐÁP ÁN: ${selectedBook} - Test ${selectedTest}\n` + lines.join('\n')
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pillColors: Record<string, { bg: string; text: string; badge: string }> = {
    A: { bg: 'bg-sky-500 hover:bg-sky-600', text: 'text-white', badge: 'bg-sky-500 text-white' },
    B: { bg: 'bg-indigo-600 hover:bg-indigo-700', text: 'text-white', badge: 'bg-indigo-600 text-white' },
    C: { bg: 'bg-emerald-600 hover:bg-emerald-700', text: 'text-white', badge: 'bg-emerald-600 text-white' },
    D: { bg: 'bg-amber-500 hover:bg-amber-600', text: 'text-white', badge: 'bg-amber-500 text-white' },
  };

  const getQuestionPartName = (num: number) => {
    if (num <= 6) return 'Part 1 • Mô tả tranh (Photographs)';
    if (num <= 31) return 'Part 2 • Hỏi & Đáp (Question-Response)';
    if (num <= 70) return 'Part 3 • Hội thoại (Conversations)';
    if (num <= 100) return 'Part 4 • Bài nói ngắn (Short Talks)';
    if (num <= 130) return 'Part 5 • Điền câu (Incomplete Sentences)';
    if (num <= 146) return 'Part 6 • Điền đoạn (Text Completion)';
    return 'Part 7 • Đọc hiểu đoạn văn (Reading Comprehension)';
  };

  // Jump to practice mode
  const handleJumpToPractice = (num: number) => {
    if (num <= 100) {
      setListeningCurrentIndex(num - 1);
      setActiveTab('listening');
    } else {
      // Find index in reading questions
      const idx = questions.findIndex((q) => q.num === num);
      if (idx !== -1) {
        jumpToIndex(idx);
      }
      setActiveTab('practice');
    }
  };

  // Render 10x10 Matrix Table for 1-Screen View
  const renderDenseMatrix = (numsList: number[], title: string, isLc: boolean) => {
    if (numsList.length === 0) return null;

    // Group into rows of 10
    const rows: number[][] = [];
    for (let i = 0; i < numsList.length; i += 10) {
      rows.push(numsList.slice(i, i + 10));
    }

    return (
      <div className="flex-1 flex flex-col bg-white rounded-2xl border border-[#E8DFD3] shadow-xs overflow-hidden min-h-0">
        {/* Panel Header */}
        <div className={`px-3 py-2 border-b flex items-center justify-between shrink-0 ${
          isLc ? 'bg-sky-50/80 border-sky-100' : 'bg-amber-50/80 border-amber-100'
        }`}>
          <div className="flex items-center gap-1.5">
            {isLc ? (
              <Headphones className="w-4 h-4 text-sky-700" />
            ) : (
              <BookOpen className="w-4 h-4 text-amber-700" />
            )}
            <span className={`text-xs font-black uppercase tracking-wide ${
              isLc ? 'text-sky-900' : 'text-amber-900'
            }`}>
              {title}
            </span>
          </div>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
            isLc ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'
          }`}>
            {numsList.length} câu
          </span>
        </div>

        {/* Matrix Grid: Dense, 10 columns */}
        <div className="flex-1 overflow-auto p-2 sm:p-2.5">
          <div className="flex flex-col gap-1 min-w-[280px]">
            {rows.map((row, rIdx) => {
              const startN = row[0];
              const endN = row[row.length - 1];

              return (
                <div key={rIdx} className="flex items-center gap-0.5 sm:gap-1">
                  {/* Row index indicator */}
                  <span className="w-8 sm:w-11 text-[8.5px] sm:text-[9.5px] font-mono font-semibold text-[#8C8276] shrink-0 text-right pr-0.5 sm:pr-1">
                    {startN}-{endN}:
                  </span>

                  {/* 10 Cells in this row */}
                  <div className="flex-1 grid grid-cols-10 gap-0.5 sm:gap-1">
                    {row.map((num) => {
                      const ans = answersObj[num] || '-';
                      const isHighlighted = highlightNum === num;
                      const style = pillColors[ans] || {
                        bg: 'bg-gray-300',
                        text: 'text-gray-800',
                        badge: 'bg-gray-300 text-gray-800',
                      };

                      return (
                        <button
                          key={num}
                          id={`ans-matrix-${num}`}
                          onClick={() => handleOpenDetail(num, 'full')}
                          title={`Câu ${num}: Đáp án (${ans}) - Nhấp để xem chi tiết dạng Bottom Sheet`}
                          className={`group relative flex flex-col items-center justify-center py-0.5 sm:py-1 rounded-md sm:rounded-lg transition-all cursor-pointer border select-none ${
                            isHighlighted
                              ? 'ring-2 sm:ring-3 ring-amber-400 bg-amber-100 border-amber-500 scale-105 z-10 shadow-sm font-black'
                              : 'bg-[#FAF8F5] hover:bg-white border-[#EFE8DE] hover:border-emerald-300'
                          }`}
                        >
                          <span className={`text-[8px] sm:text-[9px] font-mono leading-none ${
                            isHighlighted ? 'text-amber-950 font-black' : 'text-[#7A7065]'
                          }`}>
                            {num}
                          </span>
                          <span
                            className={`w-3.5 h-3.5 sm:w-5 sm:h-5 mt-0.5 rounded sm:rounded-md text-[9px] sm:text-[11px] font-black flex items-center justify-center transition-transform ${
                              style.badge
                            } ${isHighlighted ? 'scale-110 shadow-2xs' : 'group-hover:scale-105'}`}
                          >
                            {ans}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#FAF7F2] text-[#262320]">
      {/* ======================================================== */}
      {/* TOP HEADER & EXAM SELECTOR                               */}
      {/* ======================================================== */}
      {/* ======================================================== */}
      {/* TOP HEADER & EXAM SELECTOR (ULTRA COMPACT FOR MOBILE)    */}
      {/* ======================================================== */}
      <div className="shrink-0 bg-white border-b border-[#EFE8DE] p-2 sm:p-2.5 shadow-2xs space-y-1.5">
        {/* Row 1: Book & Test selector + Next Đề ⚡ + Action Icons */}
        <div className="flex items-center justify-between gap-1.5 flex-wrap sm:flex-nowrap">
          {/* Left: Book + Test + Next Đề */}
          <div className="flex items-center gap-1 flex-1 min-w-0">
            {/* Book Selector */}
            <div className="relative min-w-0 max-w-[125px] sm:max-w-[200px]">
              <select
                value={effectiveBook}
                onChange={(e) => {
                  const newBook = e.target.value;
                  setSelectedBook(newBook);
                  const tests = Object.keys(MASTER_ANSWER_KEYS[newBook] || {});
                  setSelectedTest(tests[0] || '1');
                }}
                className="w-full appearance-none bg-[#FAF7F2] border border-[#E8DFD3] focus:border-emerald-500 rounded-lg pl-2 pr-6 py-1 text-xs font-black text-[#262320] cursor-pointer shadow-2xs truncate"
                title="Chọn bộ đề thi"
              >
                {EXAM_BOOKS_META.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.name}
                  </option>
                ))}
              </select>
              <Layers className="w-3 h-3 text-[#8C8276] absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Test Selector with Prev/Next buttons */}
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                onClick={handlePrevExam}
                className="p-1 rounded-lg border border-[#DCD3C7] bg-[#FAF7F2] hover:bg-white text-[#5C5247] transition shadow-2xs cursor-pointer"
                title="Đề thi trước (hoặc bộ đề trước)"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <div className="relative">
                <select
                  value={availableTests.includes(selectedTest) ? selectedTest : availableTests[0] || '1'}
                  onChange={(e) => setSelectedTest(e.target.value)}
                  className="appearance-none bg-[#FAF7F2] border border-[#E8DFD3] focus:border-emerald-500 rounded-lg pl-2 pr-5 py-1 text-xs font-black text-[#262320] cursor-pointer shadow-2xs text-center"
                >
                  {availableTests.map((t) => (
                    <option key={t} value={t}>
                      {/^(test|đề)\b/i.test(t) ? t : `Test ${t}`}
                    </option>
                  ))}
                </select>
                <ChevronRight className="w-3 h-3 text-[#8C8276] absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
              </div>
              <button
                onClick={handleNextExam}
                className="p-1 rounded-lg border border-[#DCD3C7] bg-[#FAF7F2] hover:bg-white text-[#5C5247] transition shadow-2xs cursor-pointer"
                title="Đề thi tiếp theo (hoặc bộ đề tiếp theo)"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* NEXT ĐỀ ⚡ BUTTON (1-Tap Quick Next) */}
            <button
              onClick={handleNextExam}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-2xs transition cursor-pointer shrink-0"
              title={nextTest ? `Chuyển ngay sang Đề ${nextTest}` : "Chuyển sang bộ đề tiếp theo"}
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span className="text-[11px] font-black">Next Đề</span>
            </button>
          </div>

          {/* Right: Action icons only (clean & space-saving) */}
          <div className="flex items-center gap-1 shrink-0 ml-auto">
            {/* View Full Exam Set */}
            <button
              onClick={() => {
                const info = resolveFullExamSetInfo({ source: effectiveBook, test: selectedTest, num: highlightNum || 101 });
                openFullExamSet({
                  examSetId: info.examSetId,
                  examSetName: info.examSetName,
                  questionNum: highlightNum || 101,
                });
              }}
              className="p-1 sm:px-2 sm:py-1 rounded-lg bg-sky-50 border border-sky-300 hover:bg-sky-100 text-xs font-bold text-sky-800 transition cursor-pointer shadow-2xs flex items-center gap-1"
              title="Mở toàn bộ 200 câu hỏi đề này để đọc câu hỏi và làm bài"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-600" />
              <span className="hidden sm:inline text-[11px]">Xem Cả Đề</span>
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopyAll}
              className="p-1 sm:px-2 sm:py-1 rounded-lg bg-[#FAF7F2] border border-[#E8DFD3] hover:border-emerald-400 text-xs font-bold text-[#4A4238] transition cursor-pointer shadow-2xs flex items-center gap-1"
              title="Sao chép toàn bộ đáp án"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 hidden sm:inline text-[11px]">Đã chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#6B635B]" />
                  <span className="hidden sm:inline text-[11px]">Chép</span>
                </>
              )}
            </button>

            {/* View Mode Toggle (Matrix / Cards) */}
            <div className="flex items-center bg-[#F2ECE3] rounded-lg p-0.5 text-xs font-bold">
              <button
                onClick={() => setViewMode('matrix')}
                className={`p-1 rounded-md transition cursor-pointer ${
                  viewMode === 'matrix' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-[#6B635B] hover:text-[#262320]'
                }`}
                title="Bảng Nén 1 màn hình"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1 rounded-md transition cursor-pointer ${
                  viewMode === 'cards' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-[#6B635B] hover:text-[#262320]'
                }`}
                title="Thẻ chi tiết"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: 1-Tap Quick Book Ribbon (Hacker 2, Hacker 3, Hacker 1, YBM, Docs 3, Docs 2) */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5 scrollbar-none max-w-full">
          <span className="text-[9.5px] font-black text-[#8C8276] uppercase tracking-wider shrink-0 mr-0.5">
            Bộ đề:
          </span>
          {EXAM_BOOKS_META.map((b) => {
            const isActive = effectiveBook === b.id;
            const shortName = b.name.replace(/\s*\(.*\)/, '');
            return (
              <button
                key={b.id}
                onClick={() => {
                  setSelectedBook(b.id);
                  const tests = Object.keys(MASTER_ANSWER_KEYS[b.id] || {});
                  setSelectedTest(tests[0] || '1');
                }}
                className={`px-2 py-0.5 rounded-lg text-[10.5px] font-bold shrink-0 transition cursor-pointer border ${
                  isActive
                    ? 'bg-amber-500 text-white border-amber-600 shadow-2xs font-black'
                    : 'bg-[#FAF7F2] hover:bg-white text-[#5C5247] border-[#E8DFD3]'
                }`}
              >
                {shortName}
              </button>
            );
          })}
        </div>

        {/* Row 3: 6 Hình Nhận Diện Đề (Part 1) */}
        {currentMeta?.hasListening && (
          <Part1VisualStrip
            bookId={effectiveBook}
            testNum={selectedTest}
            initialExpanded={false}
            hideAnswersBtn={true}
            onSelectQuestion={(qNum) => {
              setHighlightNum(qNum);
              handleOpenDetail(qNum);
            }}
          />
        )}

        {/* Row 4: Fast Search & Part Jump */}
        <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-[#F0EAE1]">
          {/* Part Jump Chips */}
          <div className="flex items-center gap-1 overflow-x-auto py-0.5 scrollbar-none flex-1 min-w-0">
            {TOEIC_PARTS_SHORTCUTS.map((p) => (
              <button
                key={p.part}
                onClick={() => {
                  setHighlightNum(p.num);
                  if (p.num <= 100) {
                    setMobileSection('lc');
                  } else {
                    setMobileSection('rc');
                  }
                  const el = document.getElementById(`ans-matrix-${p.num}`);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className={`px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold shrink-0 transition cursor-pointer border ${
                  p.type === 'lc'
                    ? 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100'
                    : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                }`}
                title={`Nhảy tới ${p.name}`}
              >
                {p.label.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Search box for quick number search with instant answer badge */}
          <div className="flex items-center gap-1 shrink-0">
            <div className="relative w-24 sm:w-32">
              <Search className="w-3 h-3 text-[#8C8276] absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                inputMode="numeric"
                placeholder="# Câu..."
                value={searchNum}
                onChange={(e) => setSearchNum(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const parsed = parseInt(searchNum.trim(), 10);
                    if (!isNaN(parsed) && answersObj[parsed]) {
                      handleOpenDetail(parsed, 'full');
                    }
                  }
                }}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD3] focus:border-emerald-500 rounded-lg pl-6 pr-5 py-0.5 text-xs text-[#262320] focus:outline-none font-bold shadow-2xs"
              />
              {searchNum && (
                <button
                  onClick={() => setSearchNum('')}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs text-[#8C8276] hover:text-[#262320] cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Instant Answer Badge */}
            {(() => {
              const parsed = parseInt(searchNum.trim(), 10);
              const targetAns = !isNaN(parsed) ? answersObj[parsed] : null;
              if (!targetAns) return null;

              const badgeColor =
                targetAns === 'A'
                  ? 'bg-sky-500'
                  : targetAns === 'B'
                  ? 'bg-indigo-600'
                  : targetAns === 'C'
                  ? 'bg-emerald-600'
                  : 'bg-amber-500';

              return (
                <button
                  onClick={() => handleOpenDetail(parsed, 'full')}
                  className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-2xs cursor-pointer transition animate-in fade-in"
                  title={`Mở câu ${parsed}: Đáp án (${targetAns})`}
                >
                  <span className="text-[10px]">#{parsed}:</span>
                  <span className={`w-3.5 h-3.5 rounded text-[9px] font-black flex items-center justify-center text-white ${badgeColor}`}>
                    {targetAns}
                  </span>
                </button>
              );
            })()}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MAIN VIEWPORT: MATRIX (1 MÀN HÌNH) VS CARDS              */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col p-2 sm:p-3 min-h-0 overflow-hidden">
        {viewMode === 'matrix' ? (
          <div className="flex-1 flex flex-col h-full min-h-0 space-y-2">
            {/* Mobile Tab Switcher when both LC & RC exist */}
            {lcNums.length > 0 && rcNums.length > 0 && (
              <div className="md:hidden flex items-center gap-1 bg-[#F2ECE3] p-0.5 rounded-xl text-xs font-bold shrink-0">
                <button
                  onClick={() => setMobileSection('lc')}
                  className={`flex-1 py-1 px-1.5 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                    mobileSection === 'lc'
                      ? 'bg-sky-600 text-white shadow-2xs font-black'
                      : 'text-[#6B635B]'
                  }`}
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>🎧 LC (1-100)</span>
                </button>
                <button
                  onClick={() => setMobileSection('rc')}
                  className={`flex-1 py-1 px-1.5 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                    mobileSection === 'rc'
                      ? 'bg-amber-600 text-white shadow-2xs font-black'
                      : 'text-[#6B635B]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>📖 RC (101-200)</span>
                </button>
                <button
                  onClick={() => setMobileSection('both')}
                  className={`flex-1 py-1 px-1.5 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                    mobileSection === 'both'
                      ? 'bg-emerald-600 text-white shadow-2xs font-black'
                      : 'text-[#6B635B]'
                  }`}
                  title="Hiển thị cả 200 câu cuộn mượt mà trên 1 trang"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Cả 200 Câu</span>
                </button>
              </div>
            )}

            {/* Matrix Dual Columns (or single if only LC or RC) */}
            <div className={`flex-1 ${
              mobileSection === 'both' ? 'overflow-y-auto' : 'overflow-hidden'
            } grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 min-h-0`}>
              {/* Listening Matrix */}
              {lcNums.length > 0 && (
                <div className={`${
                  mobileSection === 'both'
                    ? 'flex'
                    : rcNums.length > 0 && mobileSection === 'rc' ? 'hidden md:flex' : 'flex'
                } flex-col ${mobileSection === 'both' ? 'shrink-0' : 'h-full min-h-0'}`}>
                  {renderDenseMatrix(lcNums, '🎧 LISTENING (Câu 1 - 100)', true)}
                </div>
              )}

              {/* Reading Matrix */}
              {rcNums.length > 0 && (
                <div className={`${
                  mobileSection === 'both'
                    ? 'flex'
                    : lcNums.length > 0 && mobileSection === 'lc' ? 'hidden md:flex' : 'flex'
                } flex-col ${mobileSection === 'both' ? 'shrink-0' : 'h-full min-h-0'}`}>
                  {renderDenseMatrix(rcNums, '📖 READING (Câu 101 - 200)', false)}
                </div>
              )}
            </div>

            {/* Selected Question Action Bar (Floating at bottom of matrix) */}
            {highlightNum && answersObj[highlightNum] && (
              <div className="shrink-0 bg-white border border-amber-300 rounded-xl p-2.5 shadow-sm flex flex-wrap items-center justify-between gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
                <div
                  onClick={() => handleOpenDetail(highlightNum)}
                  className="flex items-center gap-2 cursor-pointer group"
                  title="Nhấp để xem nội dung chi tiết dạng Bottom Sheet (hoặc nhấp đúp ô câu hỏi)"
                >
                  <span className="w-7 h-7 rounded-lg bg-amber-500 text-white font-mono font-black text-sm flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    {answersObj[highlightNum]}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-[#262320] flex items-center gap-1.5">
                      <span>Câu #{highlightNum}: Đáp án là ({answersObj[highlightNum]})</span>
                      <span className="text-[10px] text-amber-700 bg-amber-100 font-semibold px-1.5 py-0.2 rounded border border-amber-300 group-hover:bg-amber-200 transition">
                        Xem nội dung câu
                      </span>
                    </div>
                    <div className="text-[11px] text-[#7A7065]">
                      {getQuestionPartName(highlightNum)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenDetail(highlightNum)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs shadow-2xs transition cursor-pointer"
                    title="Xem nội dung chi tiết dạng Bottom Sheet"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-700" />
                    <span>Xem đề bài</span>
                  </button>

                  <button
                    onClick={() => handleJumpToPractice(highlightNum)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition cursor-pointer"
                  >
                    <span>Mở luyện câu này</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Cards View */
          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto p-2 sm:p-3 min-h-0 space-y-4"
          >
            {filteredNums.length === 0 ? (
              <div className="p-8 text-center text-[#8C8276] text-xs">
                Không tìm thấy câu nào phù hợp với bộ lọc.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                {(() => {
                  const blocks: number[][] = [];
                  for (let i = 0; i < filteredNums.length; i += 5) {
                    blocks.push(filteredNums.slice(i, i + 5));
                  }

                  return blocks.map((block, bIdx) => {
                    const startNum = block[0];
                    const endNum = block[block.length - 1];
                    const isListening = startNum <= 100;

                    return (
                      <div
                        key={bIdx}
                        className="bg-white rounded-2xl border border-[#E8DFD3] p-3 shadow-2xs flex flex-col gap-2 hover:border-emerald-300 transition"
                      >
                        <div className="flex items-center justify-between text-[11px] font-bold pb-1.5 border-b border-[#F2ECE3]">
                          <span className="text-[#5C5247]">
                            Câu {startNum} - {endNum}
                          </span>
                          <span
                            className={`text-[9.5px] font-mono px-1.5 py-0.2 rounded font-bold ${
                              isListening ? 'bg-sky-50 text-sky-700' : 'bg-amber-50 text-amber-800'
                            }`}
                          >
                            {isListening ? 'Listening' : 'Reading'}
                          </span>
                        </div>

                        <div className="space-y-1">
                          {block.map((num) => {
                            const ans = answersObj[num] || '-';
                            const isHighlighted = highlightNum === num;
                            const style = pillColors[ans] || {
                              bg: 'bg-gray-400',
                              text: 'text-white',
                              badge: 'bg-gray-400 text-white',
                            };

                            return (
                              <div
                                key={num}
                                id={`ans-item-${num}`}
                                onClick={() => handleOpenDetail(num)}
                                title={`Câu ${num}: Đáp án (${ans}) - Nhấp để xem chi tiết dạng Bottom Sheet`}
                                className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer select-none ${
                                  isHighlighted
                                    ? 'border-emerald-500 bg-emerald-50/90 shadow-2xs ring-2 ring-emerald-400 font-bold'
                                    : 'border-[#F2ECE3] bg-[#FAF8F5] hover:bg-white hover:border-emerald-200'
                                }`}
                              >
                                <span className="font-mono text-xs font-bold text-[#5C5247]">
                                  #{num}
                                </span>

                                <div className="flex items-center gap-1">
                                  {(['A', 'B', 'C', 'D'] as const).map((choice) => {
                                    const isSelected = ans === choice;
                                    return (
                                      <span
                                        key={choice}
                                        className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center transition ${
                                          isSelected
                                            ? `${style.badge} shadow-xs scale-105`
                                            : 'text-[#C8BFB5] font-medium'
                                        }`}
                                      >
                                        {choice}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* BOTTOM SHEET: QUESTION CONTENT & EXPLANATION CHECK       */}
      {/* ======================================================== */}
      {/* ======================================================== */}
      {/* BOTTOM SHEET: QUESTION CONTENT & EXPLANATION CHECK       */}
      {/* ======================================================== */}
      {detailNum !== null && (() => {
        const detailAns = answersObj[detailNum] || '-';
        const detailResolved = resolveQuestionDetail(selectedBook, selectedTest, detailNum, detailAns);
        const detailStyle = pillColors[detailAns] || {
          bg: 'bg-amber-500',
          text: 'text-white',
          badge: 'bg-amber-500 text-white',
        };
        const currentIdxInAll = allNums.indexOf(detailNum);
        const prevNum = currentIdxInAll > 0 ? allNums[currentIdxInAll - 1] : null;
        const nextNum = currentIdxInAll >= 0 && currentIdxInAll < allNums.length - 1 ? allNums[currentIdxInAll + 1] : null;

        const onTouchStartSheet = (e: React.TouchEvent) => {
          if (e.touches.length === 1) {
            touchStartPos.current = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY,
              time: Date.now(),
            };
          }
        };

        const onTouchEndSheet = (e: React.TouchEvent) => {
          if (!touchStartPos.current) return;
          const dx = e.changedTouches[0].clientX - touchStartPos.current.x;
          const dy = e.changedTouches[0].clientY - touchStartPos.current.y;
          const dt = Date.now() - touchStartPos.current.time;
          touchStartPos.current = null;

          // Quick horizontal swipe (swiping left = next question, swiping right = prev question)
          if (dt < 400 && Math.abs(dx) > 50 && Math.abs(dy) < 55) {
            if (dx < 0 && nextNum) {
              handleOpenDetail(nextNum, sheetHeightMode);
            } else if (dx > 0 && prevNum) {
              handleOpenDetail(prevNum, sheetHeightMode);
            }
          }
        };

        const onTouchEndHandle = (e: React.TouchEvent) => {
          if (!touchStartPos.current) return;
          const dy = e.changedTouches[0].clientY - touchStartPos.current.y;
          touchStartPos.current = null;
          if (dy > 40) {
            if (sheetHeightMode === 'full') {
              setSheetHeightMode('peek');
            } else {
              handleCloseDetail();
            }
          } else if (dy < -40) {
            setSheetHeightMode('full');
          }
        };

        return (
          <div
            className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center animate-in fade-in duration-150 p-0 sm:p-4 ${
              sheetHeightMode === 'peek' ? 'bg-black/35 backdrop-blur-2xs' : 'bg-black/60 backdrop-blur-xs'
            }`}
            onClick={handleCloseDetail}
            role="dialog"
            aria-modal="true"
            aria-labelledby="question-detail-title"
          >
            <div
              className={`w-full max-w-3xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl border-t sm:border border-[#E8DFD3] flex flex-col transition-all duration-200 ease-out overflow-hidden animate-in slide-in-from-bottom ${
                sheetHeightMode === 'peek'
                  ? 'h-[50vh] max-h-[52vh]'
                  : 'h-[92vh] sm:h-[86vh] max-h-[94vh]'
              }`}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStartSheet}
              onTouchEnd={onTouchEndSheet}
            >
              {/* Drag Handle Bar with Peek/Full toggle */}
              <div
                className="pt-2 pb-1 flex flex-col items-center justify-center shrink-0 cursor-pointer sm:hidden bg-[#FAF7F2]"
                onClick={() => setSheetHeightMode((prev) => (prev === 'peek' ? 'full' : 'peek'))}
                onTouchStart={onTouchStartSheet}
                onTouchEnd={onTouchEndHandle}
                title={sheetHeightMode === 'peek' ? 'Bấm để mở rộng toàn màn hình' : 'Bấm để thu nhỏ một nửa'}
              >
                <div className="w-12 h-1.5 rounded-full bg-[#D5CCC1]" />
                <span className="text-[9px] font-semibold text-[#8C8276] mt-0.5">
                  {sheetHeightMode === 'peek' ? '▲ Vuốt / Chạm để mở rộng' : '▼ Vuốt / Chạm để thu gọn'}
                </span>
              </div>

              {/* Bottom Sheet Header */}
              <div className="px-3.5 sm:px-4 py-2 border-b border-[#F0EAE1] flex items-center justify-between shrink-0 bg-[#FAF7F2]">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl font-mono font-black text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-2xs ${detailStyle.badge}`}
                  >
                    {detailAns}
                  </span>
                  <div className="min-w-0">
                    <h2 id="question-detail-title" className="text-xs sm:text-base font-black text-[#262320] flex items-center gap-1.5">
                      <span>Câu #{detailNum}</span>
                      <span className="text-[10px] sm:text-[11px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-full border border-emerald-300">
                        Đáp án: {detailAns}
                      </span>
                    </h2>
                    <p className="text-[10px] sm:text-[11px] text-[#7A7065] truncate">
                      {selectedBook} • Test {selectedTest} • {detailResolved.partName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-1.5">
                  {/* Peek / Full toggle button */}
                  <button
                    onClick={() => setSheetHeightMode((prev) => (prev === 'peek' ? 'full' : 'peek'))}
                    className="p-1.5 rounded-lg border border-[#E8DFD3] bg-white hover:bg-[#FAF7F2] text-[#5C5247] cursor-pointer transition shadow-2xs hidden sm:flex"
                    title={sheetHeightMode === 'peek' ? 'Mở rộng (92% màn hình)' : 'Thu nhỏ (50% màn hình)'}
                  >
                    {sheetHeightMode === 'peek' ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => prevNum && handleOpenDetail(prevNum, sheetHeightMode)}
                    disabled={!prevNum}
                    className="p-1.5 rounded-lg border border-[#E8DFD3] bg-white hover:bg-[#FAF7F2] disabled:opacity-30 disabled:pointer-events-none text-[#5C5247] cursor-pointer transition shadow-2xs"
                    title="Câu trước (← hoặc vuốt phải)"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => nextNum && handleOpenDetail(nextNum, sheetHeightMode)}
                    disabled={!nextNum}
                    className="p-1.5 rounded-lg border border-[#E8DFD3] bg-white hover:bg-[#FAF7F2] disabled:opacity-30 disabled:pointer-events-none text-[#5C5247] cursor-pointer transition shadow-2xs"
                    title="Câu tiếp theo (→ hoặc vuốt trái)"
                  >
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={handleCloseDetail}
                    className="p-1.5 rounded-lg border border-[#E8DFD3] bg-white hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 text-[#7A7065] cursor-pointer ml-0.5 sm:ml-1 transition shadow-2xs"
                    title="Đóng (Esc)"
                  >
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 min-h-0 text-[#262320] overscroll-contain pb-28 sm:pb-8">
                {/* Listening Specific: Image / Audio / Transcript */}
                {detailResolved.listening && (
                  <div className="space-y-3">
                    {detailResolved.listening.imageUrl && (
                      <div className="rounded-xl overflow-hidden border border-[#E8DFD3] bg-[#FAF8F5] flex justify-center p-2">
                        <img
                          src={detailResolved.listening.imageUrl}
                          alt={`Listening Question #${detailNum}`}
                          className="max-h-56 object-contain rounded-lg"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    {detailResolved.listening.accent && (
                      <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                        <Headphones className="w-3.5 h-3.5 text-sky-600" />
                        <span>Giọng đọc: {detailResolved.listening.accent}</span>
                      </div>
                    )}

                    {detailResolved.listening.audioUrl && (
                      <div className="p-2.5 rounded-xl bg-sky-50/80 border border-sky-200 flex items-center gap-2">
                        <Volume2 className="w-4 h-4 text-sky-700 shrink-0" />
                        <audio
                          controls
                          src={detailResolved.listening.audioUrl}
                          className="w-full h-8"
                        />
                      </div>
                    )}

                    {detailResolved.listening.transcript && (
                      <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-sky-950 leading-relaxed whitespace-pre-wrap">
                        <div className="font-bold text-sky-800 mb-1 flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          <span>Audio Transcript:</span>
                        </div>
                        {detailResolved.listening.transcript}
                      </div>
                    )}
                  </div>
                )}

                {/* Reading Specific: Passage without restrictive max-h so users see the full text smoothly */}
                {detailResolved.passage && (
                  <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-3.5 sm:p-4 space-y-2">
                    <div className="flex items-center justify-between border-b border-sky-200/80 pb-1.5">
                      <span className="font-extrabold text-xs text-sky-900 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-sky-700" />
                        <span>{detailResolved.passage.title || 'Đoạn văn đọc hiểu'}</span>
                      </span>
                      {detailResolved.passage.vietnameseTranslation && (
                        <button
                          onClick={() => setShowPassageTranslation((prev) => !prev)}
                          className="text-[11px] font-bold text-sky-700 hover:text-sky-900 underline cursor-pointer"
                        >
                          {showPassageTranslation ? 'Ẩn bản dịch' : 'Xem bản dịch tiếng Việt'}
                        </button>
                      )}
                    </div>

                    <div className="text-[12.5px] leading-relaxed text-[#2C2723] whitespace-pre-wrap">
                      {detailResolved.passage.content}
                    </div>

                    {showPassageTranslation && detailResolved.passage.vietnameseTranslation && (
                      <div className="pt-2 border-t border-sky-200/80 text-[11.5px] text-sky-900 leading-relaxed italic bg-white/70 p-2.5 rounded-xl">
                        <span className="font-bold not-italic text-sky-950">Dịch nghĩa đoạn văn: </span>
                        {detailResolved.passage.vietnameseTranslation}
                      </div>
                    )}
                  </div>
                )}

                {/* Question Text */}
                {detailResolved.questionText && (
                  <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-1">
                    <span className="text-[11px] font-bold text-[#8C8276] uppercase tracking-wide">
                      Nội dung câu hỏi:
                    </span>
                    <p className="text-sm sm:text-base font-bold text-[#262320] leading-snug">
                      {detailResolved.questionText}
                    </p>
                  </div>
                )}

                {/* Options Grid */}
                {detailResolved.options && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-[#8C8276] uppercase tracking-wide">
                      Các phương án lựa chọn:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(['A', 'B', 'C', 'D'] as const).map((choice) => {
                        const optText = detailResolved.options?.[choice] || '';
                        if (!optText) return null;
                        const isCorrect = choice === detailResolved.correctAnswer;
                        return (
                          <div
                            key={choice}
                            className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs sm:text-[13px] transition-all ${
                              isCorrect
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-400 shadow-2xs'
                                : 'border-[#EFE8DE] bg-[#FAF8F5] text-[#4A4238]'
                            }`}
                          >
                            <span
                              className={`w-5 h-5 rounded-md font-mono font-black text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                                isCorrect
                                    ? 'bg-emerald-600 text-white shadow-2xs'
                                  : 'bg-white text-[#7A7065] border border-[#DCD3C7]'
                              }`}
                            >
                              {choice}
                            </span>
                            <span className="flex-1 leading-snug">{optText}</span>
                            {isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Detailed Explanation */}
                {detailResolved.explanation && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-[12.5px] leading-relaxed text-amber-950 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span>Giải thích đáp án:</span>
                    </div>
                    <p>{detailResolved.explanation}</p>
                  </div>
                )}

                {/* Vietnamese meaning */}
                {detailResolved.vietnameseMeaning && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-[12.5px] leading-relaxed text-emerald-950 space-y-1">
                    <span className="font-bold text-emerald-900">🌐 Dịch nghĩa tiếng Việt: </span>
                    <p>{detailResolved.vietnameseMeaning}</p>
                  </div>
                )}

                {/* Tips / Clues */}
                {(detailResolved.tip || detailResolved.passage?.clue) && (
                  <div className="p-3.5 rounded-2xl bg-[#FFF9E6] border border-amber-300/80 text-xs leading-relaxed text-[#5C4500] space-y-1.5">
                    {detailResolved.tip && (
                      <div>
                        <span className="font-bold text-amber-900 flex items-center gap-1 mb-0.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          <span>Mẹo làm nhanh:</span>
                        </span>
                        <p>{detailResolved.tip}</p>
                      </div>
                    )}

                    {detailResolved.passage?.clue && (
                      <div className="pt-1.5 border-t border-amber-200/80 text-[11.5px] space-y-0.5">
                        {detailResolved.passage.clue.location && (
                          <p>
                            <strong>Vị trí manh mối:</strong> {detailResolved.passage.clue.location}
                          </p>
                        )}
                        {detailResolved.passage.clue.quote && (
                          <p className="italic">
                            <strong>Câu chứa đáp án:</strong> "{detailResolved.passage.clue.quote}"
                          </p>
                        )}
                        {detailResolved.passage.clue.scanningTip && (
                          <p>
                            <strong>Mẹo quét từ khóa:</strong> {detailResolved.passage.clue.scanningTip}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Fallback info when full question text is not in database */}
                {!detailResolved.hasFullContent && (
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs leading-relaxed text-[#5C4E3D] space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900">
                      <HelpCircle className="w-4 h-4 text-amber-600" />
                      <span>Bảng đáp án chính thức từ đề thi</span>
                    </div>
                    <p>
                      Bộ đề <strong>{selectedBook}</strong> - <strong>Test {selectedTest}</strong> được trích xuất và đối soát chuẩn xác từ bảng đáp án gốc.
                    </p>
                    <div className="p-2.5 rounded-xl bg-white border border-amber-200 text-center font-bold text-sm text-[#262320]">
                      Đáp án chuẩn câu #{detailNum} là: <span className="text-emerald-700 text-base font-black">({detailAns})</span>
                    </div>
                    <p className="text-[11px] text-[#8C8276]">
                      Bạn có thể so sánh trực tiếp với tài liệu hoặc đề thi PDF gốc tương ứng với Test {selectedTest}.
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Sheet Footer */}
              <div className="px-4 py-3 border-t border-[#F0EAE1] bg-[#FAF7F2] flex items-center justify-between gap-2 shrink-0 safe-bottom">
                <div className="text-[11px] text-[#8C8276] hidden sm:block">
                  Phím tắt: <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#D5CCC1] font-mono text-[10px]">Esc</kbd> đóng • <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#D5CCC1] font-mono text-[10px]">←</kbd><kbd className="px-1.5 py-0.5 rounded bg-white border border-[#D5CCC1] font-mono text-[10px]">→</kbd> đổi câu
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 ml-auto w-full sm:w-auto justify-end">
                  {sheetHeightMode === 'peek' && (
                    <button
                      onClick={() => setSheetHeightMode('full')}
                      className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold text-xs shadow-2xs transition cursor-pointer"
                      title="Mở rộng để xem toàn bộ bài đọc, giải thích và transcript"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-amber-700" />
                      <span>Mở rộng</span>
                    </button>
                  )}

                  <button
                    onClick={handleCloseDetail}
                    className="px-2.5 sm:px-3 py-2 rounded-xl border border-[#DCD3C7] bg-white hover:bg-gray-50 text-xs font-bold text-[#5C5247] cursor-pointer transition shadow-2xs"
                  >
                    Đóng
                  </button>

                  <button
                    onClick={() => {
                      handleCloseDetail();
                      const info = resolveFullExamSetInfo({ source: effectiveBook, test: selectedTest, num: detailNum });
                      openFullExamSet({
                        examSetId: info.examSetId,
                        examSetName: info.examSetName,
                        questionNum: detailNum,
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-300 font-bold text-xs shadow-2xs transition cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                    <span>Xem Cả Đề</span>
                  </button>

                  <button
                    onClick={() => {
                      handleCloseDetail();
                      handleJumpToPractice(detailNum);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                  >
                    <span>Mở làm câu này</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
