import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  MASTER_ANSWER_KEYS,
  EXAM_BOOKS_META,
} from '../data/masterLookupKeys';
import { useQuizStore } from '../store/useQuizStore';
import {
  CheckCircle2,
  Copy,
  Check,
  Search,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const FullAnswersModal: React.FC = () => {
  const { fullAnswerTarget } = useQuizStore();

  // Selected Book and Test
  const [selectedBook, setSelectedBook] = useState<string>(
    fullAnswerTarget?.book || 'Hacker 2 (Full 200 câu)'
  );
  const [selectedTest, setSelectedTest] = useState<string>(
    fullAnswerTarget?.test || '1'
  );
  const [highlightNum, setHighlightNum] = useState<number | undefined>(
    fullAnswerTarget?.questionNum
  );

  // Search filter inside answers
  const [searchNum, setSearchNum] = useState<string>('');
  const [partFilter, setPartFilter] = useState<'all' | 'lc' | 'rc' | 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'p7'>('all');
  const [copied, setCopied] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Update when fullAnswerTarget changes from another component
  useEffect(() => {
    if (fullAnswerTarget) {
      if (fullAnswerTarget.book && MASTER_ANSWER_KEYS[fullAnswerTarget.book]) {
        setSelectedBook(fullAnswerTarget.book);
      }
      if (fullAnswerTarget.test) {
        setSelectedTest(fullAnswerTarget.test);
      }
      if (fullAnswerTarget.questionNum) {
        setHighlightNum(fullAnswerTarget.questionNum);
      }
    }
  }, [fullAnswerTarget]);

  // Available tests for current book
  const availableTests = useMemo(() => {
    const bookData = MASTER_ANSWER_KEYS[selectedBook];
    if (!bookData) return ['1'];
    return Object.keys(bookData).sort((a, b) => {
      const na = parseInt(a);
      const nb = parseInt(b);
      if (!isNaN(na) && !isNaN(nb)) return na - nb;
      return a.localeCompare(b);
    });
  }, [selectedBook]);

  // Ensure selected test exists in current book
  useEffect(() => {
    if (!availableTests.includes(selectedTest)) {
      setSelectedTest(availableTests[0] || '1');
    }
  }, [availableTests, selectedTest]);

  // Current answers dictionary
  const answersObj: Record<string, string> = useMemo(() => {
    return MASTER_ANSWER_KEYS[selectedBook]?.[selectedTest] || {};
  }, [selectedBook, selectedTest]);

  // Current meta
  const currentMeta = useMemo(() => {
    return EXAM_BOOKS_META.find((m) => m.id === selectedBook);
  }, [selectedBook]);

  // Sorted list of all question numbers
  const allNums = useMemo(() => {
    return Object.keys(answersObj)
      .map((k) => parseInt(k, 10))
      .filter((n) => !isNaN(n))
      .sort((a, b) => a - b);
  }, [answersObj]);

  // Filtered list
  const filteredNums = useMemo(() => {
    return allNums.filter((num) => {
      // Search filter
      if (searchNum.trim()) {
        const query = searchNum.trim();
        const strNum = String(num);
        if (!strNum.includes(query)) return false;
      }

      // Part filter
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

  // Auto scroll to highlighted question
  useEffect(() => {
    if (highlightNum) {
      setTimeout(() => {
        const el = document.getElementById(`ans-item-${highlightNum}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [highlightNum, selectedBook, selectedTest]);

  // Copy full answers
  const handleCopyAll = () => {
    const lines = filteredNums.map((n) => `${n}: ${answersObj[n]}`);
    navigator.clipboard.writeText(
      `ĐÁP ÁN: ${selectedBook} - Test ${selectedTest}\n` + lines.join('\n')
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Stats calculation
  const stats = useMemo(() => {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    filteredNums.forEach((n) => {
      const a = answersObj[n];
      if (a === 'A' || a === 'B' || a === 'C' || a === 'D') {
        counts[a]++;
      }
    });
    return counts;
  }, [filteredNums, answersObj]);

  const answerBadgeColors: Record<string, string> = {
    A: 'bg-sky-100 text-sky-800 border-sky-300 font-bold',
    B: 'bg-violet-100 text-violet-800 border-violet-300 font-bold',
    C: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    D: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#FAF7F2] text-[#262320]">
      {/* TOP CONTROLS & HEADER */}
      <div className="shrink-0 bg-white border-b border-[#EFE8DE] p-3 sm:p-4 shadow-2xs space-y-3">
        {/* Row 1: Title and Book Selector */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black text-[#262320] flex items-center gap-1.5">
                Bảng Đáp Án Chi Tiết (Full 200 Câu)
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {filteredNums.length} câu
                </span>
              </h1>
              <p className="text-[11px] text-[#8C8276]">
                Tra cứu đáp án chuẩn Part 1 - Part 7 nhanh chóng từ bất kì đề nào
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD3] hover:border-emerald-400 text-xs font-bold text-[#4A4238] transition cursor-pointer shadow-2xs"
              title="Sao chép toàn bộ đáp án"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Đã chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#6B635B]" />
                  <span>Sao chép</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Select Book & Test */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-1">
          {/* Book selector */}
          <div className="sm:col-span-8 flex items-center gap-2">
            <label className="text-xs font-bold text-[#6B635B] shrink-0">Bộ đề:</label>
            <div className="relative flex-1">
              <select
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                className="w-full appearance-none bg-[#FAF7F2] border border-[#E8DFD3] focus:border-emerald-500 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-[#262320] cursor-pointer shadow-2xs pr-8"
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
          <div className="sm:col-span-4 flex items-center gap-2">
            <label className="text-xs font-bold text-[#6B635B] shrink-0">Test:</label>
            <div className="relative flex-1">
              <select
                value={selectedTest}
                onChange={(e) => setSelectedTest(e.target.value)}
                className="w-full appearance-none bg-[#FAF7F2] border border-[#E8DFD3] focus:border-emerald-500 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-[#262320] cursor-pointer shadow-2xs pr-8"
              >
                {availableTests.map((t) => (
                  <option key={t} value={t}>
                    Test {t}
                  </option>
                ))}
              </select>
              <ChevronRight className="w-3.5 h-3.5 text-[#8C8276] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
            </div>
          </div>
        </div>

        {/* Row 3: Filter by Part + Search number */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#F0EAE1]">
          {/* Part filters */}
          <div className="flex items-center gap-1 overflow-x-auto py-0.5 max-w-full">
            <button
              onClick={() => setPartFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                partFilter === 'all'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-[#FAF7F2] text-[#6B635B] hover:text-[#262320]'
              }`}
            >
              Tất cả
            </button>

            {currentMeta?.hasListening && (
              <>
                <button
                  onClick={() => setPartFilter('lc')}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                    partFilter === 'lc'
                      ? 'bg-sky-600 text-white shadow-2xs'
                      : 'bg-[#FAF7F2] text-[#6B635B] hover:text-[#262320]'
                  }`}
                >
                  🎧 Nghe (1-100)
                </button>
                <button
                  onClick={() => setPartFilter('p1')}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer shrink-0 ${
                    partFilter === 'p1' ? 'bg-sky-200 text-sky-900 font-bold' : 'text-[#8C8276]'
                  }`}
                >
                  P1
                </button>
                <button
                  onClick={() => setPartFilter('p2')}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer shrink-0 ${
                    partFilter === 'p2' ? 'bg-sky-200 text-sky-900 font-bold' : 'text-[#8C8276]'
                  }`}
                >
                  P2
                </button>
                <button
                  onClick={() => setPartFilter('p3')}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer shrink-0 ${
                    partFilter === 'p3' ? 'bg-sky-200 text-sky-900 font-bold' : 'text-[#8C8276]'
                  }`}
                >
                  P3
                </button>
                <button
                  onClick={() => setPartFilter('p4')}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer shrink-0 ${
                    partFilter === 'p4' ? 'bg-sky-200 text-sky-900 font-bold' : 'text-[#8C8276]'
                  }`}
                >
                  P4
                </button>
              </>
            )}

            <button
              onClick={() => setPartFilter('rc')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                partFilter === 'rc'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-[#FAF7F2] text-[#6B635B] hover:text-[#262320]'
              }`}
            >
              📖 Đọc (101-200)
            </button>
            <button
              onClick={() => setPartFilter('p5')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer shrink-0 ${
                partFilter === 'p5' ? 'bg-amber-200 text-amber-900 font-bold' : 'text-[#8C8276]'
              }`}
            >
              P5
            </button>
            <button
              onClick={() => setPartFilter('p6')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer shrink-0 ${
                partFilter === 'p6' ? 'bg-amber-200 text-amber-900 font-bold' : 'text-[#8C8276]'
              }`}
            >
              P6
            </button>
            <button
              onClick={() => setPartFilter('p7')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer shrink-0 ${
                partFilter === 'p7' ? 'bg-amber-200 text-amber-900 font-bold' : 'text-[#8C8276]'
              }`}
            >
              P7
            </button>
          </div>

          {/* Search box for quick number search */}
          <div className="relative w-32 sm:w-40 shrink-0">
            <Search className="w-3.5 h-3.5 text-[#8C8276] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              inputMode="numeric"
              placeholder="Tìm câu số..."
              value={searchNum}
              onChange={(e) => setSearchNum(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#E8DFD3] focus:border-emerald-500 rounded-lg pl-8 pr-2 py-1 text-xs text-[#262320] focus:outline-none"
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
        <div className="flex items-center gap-2 text-[11px] text-[#6B635B] bg-[#FAF7F2] px-2.5 py-1 rounded-lg">
          <span className="font-bold text-[#4A4238]">Phân bổ:</span>
          <span className="font-semibold text-sky-800">A: {stats.A}</span>
          <span>·</span>
          <span className="font-semibold text-violet-800">B: {stats.B}</span>
          <span>·</span>
          <span className="font-semibold text-emerald-800">C: {stats.C}</span>
          <span>·</span>
          <span className="font-semibold text-amber-900">D: {stats.D}</span>
          {highlightNum && (
            <span className="ml-auto text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
              Đang chọn câu #{highlightNum}
            </span>
          )}
        </div>
      </div>

      {/* ANSWER GRID CONTAINER */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-3 sm:p-5 min-h-0 space-y-4"
      >
        {filteredNums.length === 0 ? (
          <div className="p-8 text-center text-[#8C8276] text-xs">
            Không tìm thấy câu nào phù hợp với bộ lọc.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2 sm:gap-2.5">
            {filteredNums.map((num) => {
              const ans = answersObj[num] || '-';
              const isHighlighted = highlightNum === num;
              const isListening = num <= 100;

              return (
                <div
                  key={num}
                  id={`ans-item-${num}`}
                  onClick={() => setHighlightNum(num)}
                  className={`flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer select-none ${
                    isHighlighted
                      ? 'border-emerald-500 bg-emerald-50/90 shadow-md ring-2 ring-emerald-400 scale-[1.02]'
                      : 'border-[#EFE8DE] bg-white hover:border-emerald-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                        isListening
                          ? 'bg-sky-50 text-sky-700 border border-sky-100'
                          : 'bg-amber-50 text-amber-800 border border-amber-100'
                      }`}
                    >
                      #{num}
                    </span>
                  </div>

                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black border shrink-0 ${
                      answerBadgeColors[ans] || 'bg-gray-100 text-gray-700 border-gray-200'
                    }`}
                  >
                    {ans}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
