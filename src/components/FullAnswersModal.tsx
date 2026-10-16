import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  MASTER_ANSWER_KEYS,
  EXAM_BOOKS_META,
  resolveBookAndTestFromSource,
} from '../data/masterLookupKeys';
import {
  allQuestions,
  docs1Questions,
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
import { resolveFullExamSetInfo } from '../data/examSetResolver';
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
  X,
  FileText,
  Volume2,
  Lightbulb,
  HelpCircle,
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

  if (book.includes('Docs 1') || book.includes('Test 2')) {
    rq = docs1Questions.find((q) => q.num === num);
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
  } else if (book.includes('YBM 1000')) {
    rq = docs5Questions.find(
      (q) => q.id.startsWith(`docs5_ybm1_t${testNum || 1}_`) && q.num === num
    );
  } else if (book.includes('Docs 2')) {
    if (test.includes('Đề 1')) {
      rq = docs2Questions.find(
        (q: Question) => (q.id.startsWith('docs2_de1') || q.source.includes('Đề 1')) && q.num === num
      );
    } else {
      rq = docs2Questions.find(
        (q: Question) => (q.id.startsWith('docs2_de2') || q.source.includes('YBM')) && q.num === num
      );
    }
  }

  // Fallback search across all questions
  if (!rq) {
    rq = allQuestions.find(
      (q) => q.num === num && (q.source.includes(book) || (testNum ? q.source.includes(`Test ${testNum}`) : false))
    );
  }
  if (!rq) {
    rq = allQuestions.find((q) => q.num === num);
  }

  if (rq) {
    return {
      num,
      book,
      test,
      partName: rq.category || getPartName(num),
      correctAnswer: rq.correctAnswer || officialAns,
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
  const [selectedBook, setSelectedBook] = useState<string>(() =>
    resolveValidBookId(fullAnswerTarget?.book)
  );
  const [selectedTest, setSelectedTest] = useState<string>(
    fullAnswerTarget?.test || '1'
  );
  const [highlightNum, setHighlightNum] = useState<number | undefined>(
    fullAnswerTarget?.questionNum ?? (fullAnswerTarget as any)?.num
  );

  // View Mode: 'matrix' (Single screen 1-màn-hình) vs 'cards' (Chi tiết)
  const [viewMode, setViewMode] = useState<'matrix' | 'cards'>('matrix');

  // Mobile active section for matrix view ('lc' | 'rc')
  const [mobileSection, setMobileSection] = useState<'lc' | 'rc'>('lc');

  // Search filter inside answers
  const [searchNum, setSearchNum] = useState<string>('');
  const [partFilter, setPartFilter] = useState<'all' | 'lc' | 'rc' | 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'p7'>('all');
  const [copied, setCopied] = useState<boolean>(false);

  // Bottom Sheet Detail State
  const [detailNum, setDetailNum] = useState<number | null>(null);
  const [showPassageTranslation, setShowPassageTranslation] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenDetail = (num: number) => {
    setHighlightNum(num);
    setDetailNum(num);
    setShowPassageTranslation(false);
  };

  const handleCloseDetail = () => {
    setDetailNum(null);
  };

  // Synchronize native <dialog> with detailNum state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (detailNum !== null) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [detailNum]);

  // Fallback light-dismiss for browsers without closedby support
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isInside = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInside) {
        handleCloseDetail();
      }
    };

    dialog.addEventListener('click', handleBackdropClick);
    return () => dialog.removeEventListener('click', handleBackdropClick);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  // Update when fullAnswerTarget changes from another component
  useEffect(() => {
    if (fullAnswerTarget) {
      const validBook = resolveValidBookId(fullAnswerTarget.book);
      setSelectedBook(validBook);

      if (fullAnswerTarget.test) {
        setSelectedTest(String(fullAnswerTarget.test));
      }
      const qNum = fullAnswerTarget.questionNum ?? (fullAnswerTarget as any)?.num;
      if (qNum) {
        setHighlightNum(qNum);
        if (qNum > 100) {
          setMobileSection('rc');
        } else {
          setMobileSection('lc');
        }
      }
    }
  }, [fullAnswerTarget]);

  const effectiveBook = MASTER_ANSWER_KEYS[selectedBook] ? selectedBook : DEFAULT_BOOK_ID;

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

  // Filtered list for Cards View
  const filteredNums = useMemo(() => {
    return allNums.filter((num) => {
      if (searchNum.trim()) {
        const query = searchNum.trim();
        const strNum = String(num);
        if (!strNum.includes(query)) return false;
      }

      if (partFilter === 'lc') return num <= 100;
      if (partFilter === 'rc') return num > 100;
      if (partFilter === 'p1') return num >= 1 && num <= 6;
      if (partFilter === 'p2') return num >= 7 && num <= 31;
      if (partFilter === 'p3') return num >= 32 && num <= 70;
      if (partFilter === 'p4') return num >= 71 && num <= 100;
      if (partFilter === 'p5') return num >= 101 && num <= 130;
      if (partFilter === 'p6') return num >= 131 && num <= 146;
      if (partFilter === 'p7') return num >= 147 && num <= 200;

      return true;
    });
  }, [allNums, searchNum, partFilter]);

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

  // Stats calculation
  const stats = useMemo(() => {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    allNums.forEach((n) => {
      const a = answersObj[n];
      if (a === 'A' || a === 'B' || a === 'C' || a === 'D') {
        counts[a]++;
      }
    });
    return counts;
  }, [allNums, answersObj]);

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

  const isNumInActiveFilter = (num: number) => {
    if (partFilter === 'all') return true;
    if (partFilter === 'lc') return num <= 100;
    if (partFilter === 'rc') return num > 100;
    if (partFilter === 'p1') return num >= 1 && num <= 6;
    if (partFilter === 'p2') return num >= 7 && num <= 31;
    if (partFilter === 'p3') return num >= 32 && num <= 70;
    if (partFilter === 'p4') return num >= 71 && num <= 100;
    if (partFilter === 'p5') return num >= 101 && num <= 130;
    if (partFilter === 'p6') return num >= 131 && num <= 146;
    if (partFilter === 'p7') return num >= 147 && num <= 200;
    return true;
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
                <div key={rIdx} className="flex items-center gap-1">
                  {/* Row index indicator */}
                  <span className="w-11 sm:w-12 text-[9.5px] font-mono font-semibold text-[#8C8276] shrink-0 text-right pr-1">
                    {startN}-{endN}:
                  </span>

                  {/* 10 Cells in this row */}
                  <div className="flex-1 grid grid-cols-10 gap-0.5 sm:gap-1">
                    {row.map((num) => {
                      const ans = answersObj[num] || '-';
                      const isHighlighted = highlightNum === num;
                      const inFilter = isNumInActiveFilter(num);
                      const style = pillColors[ans] || {
                        bg: 'bg-gray-300',
                        text: 'text-gray-800',
                        badge: 'bg-gray-300 text-gray-800',
                      };

                      return (
                        <button
                          key={num}
                          id={`ans-matrix-${num}`}
                          onClick={() => setHighlightNum(num)}
                          onDoubleClick={() => handleOpenDetail(num)}
                          title={`Câu ${num}: Đáp án (${ans}) - Nhấp đúp để xem chi tiết dạng Bottom Sheet`}
                          className={`group relative flex flex-col items-center justify-center py-1 rounded-lg transition-all cursor-pointer border select-none ${
                            isHighlighted
                              ? 'ring-3 ring-amber-400 bg-amber-100 border-amber-500 scale-105 z-10 shadow-sm font-black'
                              : inFilter
                              ? 'bg-[#FAF8F5] hover:bg-white border-[#EFE8DE] hover:border-emerald-300'
                              : 'opacity-25 grayscale bg-gray-100 border-gray-200'
                          }`}
                        >
                          <span className={`text-[9px] font-mono leading-none ${
                            isHighlighted ? 'text-amber-950 font-black' : 'text-[#7A7065]'
                          }`}>
                            {num}
                          </span>
                          <span
                            className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 rounded-md text-[10px] sm:text-[11px] font-black flex items-center justify-center transition-transform ${
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
      <div className="shrink-0 bg-white border-b border-[#EFE8DE] p-2.5 sm:p-3.5 shadow-2xs space-y-2.5">
        {/* Row 1: Title, View Switcher & Copy */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black text-[#262320] flex items-center gap-1.5">
                Bảng Đáp Án Nén 1 Màn Hình
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {allNums.length} câu
                </span>
              </h1>
              <p className="text-[11px] text-[#8C8276] hidden sm:block">
                Toàn bộ đáp án Listening (1-100) & Reading (101-200) trực quan trong một tầm mắt
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#F2ECE3] rounded-xl p-0.5 text-xs font-bold">
              <button
                onClick={() => setViewMode('matrix')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition cursor-pointer text-xs ${
                  viewMode === 'matrix'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-[#6B635B] hover:text-[#262320]'
                }`}
                title="Hiển thị dạng bảng nén 1 màn hình trực quan"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Bảng Nén</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition cursor-pointer text-xs ${
                  viewMode === 'cards'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-[#6B635B] hover:text-[#262320]'
                }`}
                title="Hiển thị danh sách thẻ chi tiết"
              >
                <List className="w-3.5 h-3.5" />
                <span>Thẻ Chi Tiết</span>
              </button>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] hover:border-emerald-400 text-xs font-bold text-[#4A4238] transition cursor-pointer shadow-2xs"
              title="Sao chép toàn bộ đáp án"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 hidden sm:inline">Đã chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#6B635B]" />
                  <span className="hidden sm:inline">Sao chép</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Select Book & Test */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          {/* Book selector */}
          <div className="sm:col-span-8 flex items-center gap-1.5">
            <label className="text-xs font-bold text-[#6B635B] shrink-0">Bộ đề:</label>
            <div className="relative flex-1">
              <select
                value={effectiveBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                className="w-full appearance-none bg-[#FAF7F2] border border-[#E8DFD3] focus:border-emerald-500 rounded-xl px-3 py-1.5 text-xs sm:text-sm font-bold text-[#262320] cursor-pointer shadow-2xs pr-8"
              >
                {EXAM_BOOKS_META.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.name}
                  </option>
                ))}
              </select>
              <Layers className="w-3.5 h-3.5 text-[#8C8276] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Test selector */}
          <div className="sm:col-span-4 flex items-center gap-1.5">
            <label className="text-xs font-bold text-[#6B635B] shrink-0">Test:</label>
            <div className="relative flex-1">
              <select
                value={availableTests.includes(selectedTest) ? selectedTest : availableTests[0] || '1'}
                onChange={(e) => setSelectedTest(e.target.value)}
                className="w-full appearance-none bg-[#FAF7F2] border border-[#E8DFD3] focus:border-emerald-500 rounded-xl px-3 py-1.5 text-xs sm:text-sm font-bold text-[#262320] cursor-pointer shadow-2xs pr-8"
              >
                {availableTests.map((t) => (
                  <option key={t} value={t}>
                    {/^(test|đề)\b/i.test(t) ? t : `Test ${t}`}
                  </option>
                ))}
              </select>
              <ChevronRight className="w-3.5 h-3.5 text-[#8C8276] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
            </div>
          </div>
        </div>

        {/* Row 2.5: 6 Hình Nhận Diện Đề (Part 1) */}
        <Part1VisualStrip
          bookId={effectiveBook}
          testNum={selectedTest}
          onSelectQuestion={(qNum) => setHighlightNum(qNum)}
        />

        {/* Row 3: Filter by Part + Search number */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1 border-t border-[#F0EAE1]">
          {/* Part filters */}
          <div className="flex items-center gap-1 overflow-x-auto py-0.5 max-w-full">
            <button
              onClick={() => setPartFilter('all')}
              className={`px-2 py-0.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                partFilter === 'all'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-[#FAF7F2] text-[#6B635B] hover:text-[#262320]'
              }`}
            >
              Tất cả ({allNums.length})
            </button>

            {currentMeta?.hasListening && (
              <>
                <button
                  onClick={() => setPartFilter('lc')}
                  className={`px-2 py-0.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                    partFilter === 'lc'
                      ? 'bg-sky-600 text-white shadow-2xs'
                      : 'bg-[#FAF7F2] text-[#6B635B] hover:text-[#262320]'
                  }`}
                >
                  🎧 Nghe (1-100)
                </button>
                <button
                  onClick={() => setPartFilter('p1')}
                  className={`px-1.5 py-0.5 rounded text-[10.5px] font-semibold transition cursor-pointer shrink-0 ${
                    partFilter === 'p1' ? 'bg-sky-200 text-sky-900 font-bold' : 'text-[#8C8276]'
                  }`}
                >
                  P1
                </button>
                <button
                  onClick={() => setPartFilter('p2')}
                  className={`px-1.5 py-0.5 rounded text-[10.5px] font-semibold transition cursor-pointer shrink-0 ${
                    partFilter === 'p2' ? 'bg-sky-200 text-sky-900 font-bold' : 'text-[#8C8276]'
                  }`}
                >
                  P2
                </button>
                <button
                  onClick={() => setPartFilter('p3')}
                  className={`px-1.5 py-0.5 rounded text-[10.5px] font-semibold transition cursor-pointer shrink-0 ${
                    partFilter === 'p3' ? 'bg-sky-200 text-sky-900 font-bold' : 'text-[#8C8276]'
                  }`}
                >
                  P3
                </button>
                <button
                  onClick={() => setPartFilter('p4')}
                  className={`px-1.5 py-0.5 rounded text-[10.5px] font-semibold transition cursor-pointer shrink-0 ${
                    partFilter === 'p4' ? 'bg-sky-200 text-sky-900 font-bold' : 'text-[#8C8276]'
                  }`}
                >
                  P4
                </button>
              </>
            )}

            <button
              onClick={() => setPartFilter('rc')}
              className={`px-2 py-0.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                partFilter === 'rc'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-[#FAF7F2] text-[#6B635B] hover:text-[#262320]'
              }`}
            >
              📖 Đọc (101-200)
            </button>
            <button
              onClick={() => setPartFilter('p5')}
              className={`px-1.5 py-0.5 rounded text-[10.5px] font-semibold transition cursor-pointer shrink-0 ${
                partFilter === 'p5' ? 'bg-amber-200 text-amber-900 font-bold' : 'text-[#8C8276]'
              }`}
            >
              P5
            </button>
            <button
              onClick={() => setPartFilter('p6')}
              className={`px-1.5 py-0.5 rounded text-[10.5px] font-semibold transition cursor-pointer shrink-0 ${
                partFilter === 'p6' ? 'bg-amber-200 text-amber-900 font-bold' : 'text-[#8C8276]'
              }`}
            >
              P6
            </button>
            <button
              onClick={() => setPartFilter('p7')}
              className={`px-1.5 py-0.5 rounded text-[10.5px] font-semibold transition cursor-pointer shrink-0 ${
                partFilter === 'p7' ? 'bg-amber-200 text-amber-900 font-bold' : 'text-[#8C8276]'
              }`}
            >
              P7
            </button>
          </div>

          {/* Search box for quick number search */}
          <div className="relative w-28 sm:w-36 shrink-0">
            <Search className="w-3.5 h-3.5 text-[#8C8276] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              inputMode="numeric"
              placeholder="Tìm câu số..."
              value={searchNum}
              onChange={(e) => setSearchNum(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#E8DFD3] focus:border-emerald-500 rounded-lg pl-7 pr-2 py-1 text-xs text-[#262320] focus:outline-none font-bold"
            />
            {searchNum && (
              <button
                onClick={() => setSearchNum('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#8C8276] hover:text-[#262320]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Distribution quick bar */}
        <div className="flex items-center gap-2 text-[10.5px] text-[#6B635B] bg-[#FAF7F2] px-2.5 py-1 rounded-lg">
          <span className="font-bold text-[#4A4238]">Phân bổ:</span>
          <span className="font-semibold text-sky-800">A: {stats.A}</span>
          <span>·</span>
          <span className="font-semibold text-violet-800">B: {stats.B}</span>
          <span>·</span>
          <span className="font-semibold text-emerald-800">C: {stats.C}</span>
          <span>·</span>
          <span className="font-semibold text-amber-900">D: {stats.D}</span>

          {highlightNum && (
            <span className="ml-auto text-[10px] text-amber-900 font-bold bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Đang chọn #{highlightNum}</span>
            </span>
          )}
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
                  className={`flex-1 py-1 px-2 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    mobileSection === 'lc'
                      ? 'bg-sky-600 text-white shadow-2xs'
                      : 'text-[#6B635B]'
                  }`}
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>🎧 Listening (1-100)</span>
                </button>
                <button
                  onClick={() => setMobileSection('rc')}
                  className={`flex-1 py-1 px-2 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    mobileSection === 'rc'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'text-[#6B635B]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>📖 Reading (101-200)</span>
                </button>
              </div>
            )}

            {/* Matrix Dual Columns (or single if only LC or RC) */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 min-h-0 overflow-hidden">
              {/* Listening Matrix */}
              {lcNums.length > 0 && (
                <div className={`h-full min-h-0 ${
                  rcNums.length > 0 && mobileSection === 'rc' ? 'hidden md:flex' : 'flex'
                } flex-col`}>
                  {renderDenseMatrix(lcNums, '🎧 LISTENING (Câu 1 - 100)', true)}
                </div>
              )}

              {/* Reading Matrix */}
              {rcNums.length > 0 && (
                <div className={`h-full min-h-0 ${
                  lcNums.length > 0 && mobileSection === 'lc' ? 'hidden md:flex' : 'flex'
                } flex-col`}>
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
                                onClick={() => setHighlightNum(num)}
                                onDoubleClick={() => handleOpenDetail(num)}
                                title={`Câu ${num}: Đáp án (${ans}) - Nhấp đúp để xem chi tiết dạng Bottom Sheet`}
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
      <dialog
        ref={dialogRef}
        closedby="any"
        aria-labelledby="question-detail-title"
        className="bottom-sheet-dialog"
        onCancel={(e) => {
          e.preventDefault();
          handleCloseDetail();
        }}
      >
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

          return (
            <div className="w-full max-w-3xl mx-auto bg-white rounded-t-3xl shadow-2xl border-t border-[#E8DFD3] flex flex-col max-h-[85vh] sm:max-h-[82vh] overflow-hidden animate-in slide-in-from-bottom duration-200">
              {/* Drag Handle Bar */}
              <div className="pt-2.5 pb-1 flex justify-center shrink-0 cursor-grab">
                <div className="w-12 h-1.5 rounded-full bg-[#D5CCC1]" />
              </div>

              {/* Bottom Sheet Header */}
              <div className="px-4 py-2.5 border-b border-[#F0EAE1] flex items-center justify-between shrink-0 bg-[#FAF7F2]/90">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-8 h-8 rounded-xl font-mono font-black text-sm flex items-center justify-center shrink-0 shadow-2xs ${detailStyle.badge}`}
                  >
                    {detailAns}
                  </span>
                  <div className="min-w-0">
                    <h2 id="question-detail-title" className="text-sm sm:text-base font-black text-[#262320] flex items-center gap-1.5">
                      <span>Câu #{detailNum}</span>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded-full border border-emerald-300">
                        Đáp án: {detailAns}
                      </span>
                    </h2>
                    <p className="text-[11px] text-[#7A7065] truncate">
                      {selectedBook} • Test {selectedTest} • {detailResolved.partName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <button
                    onClick={() => prevNum && handleOpenDetail(prevNum)}
                    disabled={!prevNum}
                    className="p-1.5 rounded-lg border border-[#E8DFD3] bg-white hover:bg-[#FAF7F2] disabled:opacity-30 disabled:pointer-events-none text-[#5C5247] cursor-pointer transition shadow-2xs"
                    title="Câu trước"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => nextNum && handleOpenDetail(nextNum)}
                    disabled={!nextNum}
                    className="p-1.5 rounded-lg border border-[#E8DFD3] bg-white hover:bg-[#FAF7F2] disabled:opacity-30 disabled:pointer-events-none text-[#5C5247] cursor-pointer transition shadow-2xs"
                    title="Câu tiếp theo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCloseDetail}
                    className="p-1.5 rounded-lg border border-[#E8DFD3] bg-white hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 text-[#7A7065] cursor-pointer ml-1 transition shadow-2xs"
                    title="Đóng (Esc)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 min-h-0 text-[#262320]">
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

                {/* Reading Specific: Passage */}
                {detailResolved.passage && (
                  <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-3.5 space-y-2">
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

                    <div className="text-[12.5px] leading-relaxed text-[#2C2723] whitespace-pre-wrap max-h-56 overflow-y-auto pr-1">
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
                  <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-[12.5px] leading-relaxed text-amber-950 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span>Giải thích đáp án:</span>
                    </div>
                    <p>{detailResolved.explanation}</p>
                  </div>
                )}

                {/* Vietnamese meaning */}
                {detailResolved.vietnameseMeaning && (
                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-[12.5px] leading-relaxed text-emerald-950 space-y-1">
                    <span className="font-bold text-emerald-900">🌐 Dịch nghĩa tiếng Việt: </span>
                    <p>{detailResolved.vietnameseMeaning}</p>
                  </div>
                )}

                {/* Tips / Clues */}
                {(detailResolved.tip || detailResolved.passage?.clue) && (
                  <div className="p-3 rounded-2xl bg-[#FFF9E6] border border-amber-300/80 text-xs leading-relaxed text-[#5C4500] space-y-1.5">
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
                  Mẹo: Nhấn <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#D5CCC1] font-mono text-[10px]">Esc</kbd> hoặc nhấp ra ngoài để đóng
                </div>

                <div className="flex items-center gap-2 ml-auto w-full sm:w-auto justify-end">
                  <button
                    onClick={handleCloseDetail}
                    className="px-3 py-2 rounded-xl border border-[#DCD3C7] bg-white hover:bg-gray-50 text-xs font-bold text-[#5C5247] cursor-pointer transition shadow-2xs"
                  >
                    Đóng
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
          );
        })()}
      </dialog>
    </div>
  );
};
