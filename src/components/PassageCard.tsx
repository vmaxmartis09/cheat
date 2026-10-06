import React, { useState, useRef, useEffect } from 'react';
import { useQuizStore } from '../store/useQuizStore';
import { Question, AnswerChoice } from '../types';
import {
  BookOpen,
  Check,
  X,
  Compass,
  Lightbulb,
  ArrowRight,
  Eye,
  EyeOff,
  Layers,
  Maximize2,
  Minimize2,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

export const PassageCard: React.FC = () => {
  const {
    questions,
    currentIndex,
    answeredMap,
    selectAnswerForQuestion,
    nextPassage,
    retakeQuestion,
    questionProgress,
    jumpToIndex,
    reviewTimeLeft,
    tickReviewTimer,
  } = useQuizStore();

  const currentQ = questions[currentIndex];

  // Reading view controls
  const [showTranslation, setShowTranslation] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [highlightClues, setHighlightClues] = useState(false);
  const [mobileTab, setMobileTab] = useState<'both' | 'passage' | 'questions'>('both');
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);

  const questionsContainerRef = useRef<HTMLDivElement>(null);
  const passageContainerRef = useRef<HTMLDivElement>(null);

  // Cooldown review timer: tick every second while reviewTimeLeft > 0
  useEffect(() => {
    if (reviewTimeLeft <= 0) return;
    const timer = setInterval(() => {
      tickReviewTimer();
    }, 1000);
    return () => clearInterval(timer);
  }, [reviewTimeLeft, tickReviewTimer]);

  if (!currentQ || !currentQ.passageInfo) {
    return null;
  }

  const passageId = currentQ.passageId || currentQ.passageInfo.id;
  const passageInfo = currentQ.passageInfo;

  // Find all questions in the current quiz session that belong to this passage
  const passageQuestionsWithIdx: { question: Question; sessionIndex: number }[] = [];
  questions.forEach((q, idx) => {
    const pId = q.passageId || q.passageInfo?.id;
    if (pId === passageId) {
      passageQuestionsWithIdx.push({ question: q, sessionIndex: idx });
    }
  });

  const passageQuestions = passageQuestionsWithIdx.map((item) => item.question);
  const totalInPassage = passageQuestions.length;
  const answeredInPassage = passageQuestions.filter((q) => Boolean(answeredMap[q.id])).length;
  const allAnswered = totalInPassage > 0 && answeredInPassage === totalInPassage;

  const optionKeys: AnswerChoice[] = ['A', 'B', 'C', 'D'];

  // Smooth scroll to a specific question
  const scrollToQuestion = (qNum: number, qId: string) => {
    setActiveQuestionId(qId);
    setMobileTab('questions');
    const el = document.getElementById(`passage-q-${qNum}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Font size classes
  const fontSizeClasses = {
    sm: 'text-[13.5px] sm:text-[14px] leading-relaxed',
    base: 'text-[15px] sm:text-[16px] leading-relaxed sm:leading-loose',
    lg: 'text-[17px] sm:text-[18.5px] leading-loose',
  };

  // Passage text to display
  const rawContent = showTranslation && passageInfo.vietnameseTranslation
    ? passageInfo.vietnameseTranslation
    : passageInfo.content;

  // Render text with clue highlighting if enabled
  const renderPassageText = () => {
    if (!highlightClues || showTranslation) {
      return (
        <div className={`text-[#26211C] whitespace-pre-line font-sans select-text ${fontSizeClasses[fontSize]}`}>
          {rawContent}
        </div>
      );
    }

    // Collect clue quotes from all questions in this passage
    const clueQuotes = passageQuestions
      .map((q) => q.clue?.clueQuote)
      .filter((quote): quote is string => Boolean(quote && quote.trim().length > 3));

    if (clueQuotes.length === 0) {
      return (
        <div className={`text-[#26211C] whitespace-pre-line font-sans select-text ${fontSizeClasses[fontSize]}`}>
          {rawContent}
        </div>
      );
    }

    // Highlight clue quotes safely
    let renderedContent: React.ReactNode = rawContent;
    try {
      // Escape regex special chars
      const escapedQuotes = clueQuotes.map((q) =>
        q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      );
      const regex = new RegExp(`(${escapedQuotes.join('|')})`, 'gi');
      const parts = rawContent.split(regex);

      renderedContent = parts.map((part, i) => {
        const isMatch = clueQuotes.some(
          (quote) => quote.toLowerCase() === part.toLowerCase()
        );
        if (isMatch) {
          return (
            <mark
              key={i}
              className="bg-amber-200/80 text-amber-950 px-1 py-0.5 rounded font-semibold border-b-2 border-amber-400 shadow-2xs"
              title="Manh mối trả lời câu hỏi"
            >
              {part}
            </mark>
          );
        }
        return part;
      });
    } catch {
      renderedContent = rawContent;
    }

    return (
      <div className={`text-[#26211C] whitespace-pre-line font-sans select-text ${fontSizeClasses[fontSize]}`}>
        {renderedContent}
      </div>
    );
  };

  return (
    <div className="flashcard-appear flex-1 flex flex-col h-full min-h-0 w-full space-y-2">
      {/* MOBILE TOP TAB SWITCHER (Hidden on desktop md:) */}
      <div className="md:hidden flex items-center justify-between gap-1 p-1 bg-white border border-[#EFE8DE] rounded-xl shadow-2xs shrink-0">
        <button
          onClick={() => setMobileTab('passage')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
            mobileTab === 'passage'
              ? 'bg-amber-600 text-white shadow-2xs'
              : 'text-[#6B635B] hover:text-[#262320]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>📖 Đọc Bài</span>
        </button>

        <button
          onClick={() => setMobileTab('questions')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
            mobileTab === 'questions'
              ? 'bg-amber-600 text-white shadow-2xs'
              : 'text-[#6B635B] hover:text-[#262320]'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>✍️ Câu Hỏi ({answeredInPassage}/{totalInPassage})</span>
        </button>

        <button
          onClick={() => setMobileTab('both')}
          className={`py-1.5 px-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
            mobileTab === 'both'
              ? 'bg-amber-100 text-amber-900 border border-amber-300'
              : 'text-[#8C8276] hover:text-[#262320]'
          }`}
          title="Xem cả bài đọc và câu hỏi"
        >
          <span>⚡ Cả Hai</span>
        </button>
      </div>

      {/* MAIN DUAL-COLUMN CONTAINER (RESPONSIVE GRID) */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 h-full min-h-0 overflow-hidden">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: FULL SPACIOUS READING PASSAGE              */}
        {/* ======================================================== */}
        <div
          className={`bg-white border border-[#EFE8DE] rounded-2xl shadow-sm shadow-amber-950/5 flex flex-col h-full min-h-0 overflow-hidden transition-all ${
            mobileTab === 'questions' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* TOP PASSAGE TOOLBAR */}
          <div className="px-3.5 py-2.5 border-b border-[#F0EAE1] bg-[#FCFBF9] flex items-center justify-between gap-2 shrink-0 flex-wrap">
            {/* Title & Range */}
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs shrink-0 shadow-2xs">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  Đoạn văn #{passageQuestions[0]?.num} - #{passageQuestions[passageQuestions.length - 1]?.num}
                </span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#F4EFE6] text-[#5C5247] font-semibold text-xs truncate max-w-[180px] sm:max-w-[260px]">
                {passageInfo.title}
              </span>
            </div>

            {/* Quick Actions (Font size, Translation, Clues, Fullscreen) */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Font Size Selector */}
              <div className="flex items-center bg-[#F2ECE3] rounded-lg p-0.5 text-xs font-semibold">
                <button
                  onClick={() => setFontSize('sm')}
                  className={`px-1.5 py-0.5 rounded transition cursor-pointer text-[11px] ${
                    fontSize === 'sm' ? 'bg-white text-amber-900 font-bold shadow-2xs' : 'text-[#7A7065]'
                  }`}
                  title="Cỡ chữ nhỏ"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize('base')}
                  className={`px-1.5 py-0.5 rounded transition cursor-pointer text-xs ${
                    fontSize === 'base' ? 'bg-white text-amber-900 font-bold shadow-2xs' : 'text-[#7A7065]'
                  }`}
                  title="Cỡ chữ chuẩn"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('lg')}
                  className={`px-1.5 py-0.5 rounded transition cursor-pointer text-xs ${
                    fontSize === 'lg' ? 'bg-white text-amber-900 font-bold shadow-2xs' : 'text-[#7A7065]'
                  }`}
                  title="Cỡ chữ lớn"
                >
                  A+
                </button>
              </div>

              {/* Clue Highlight Toggle */}
              <button
                onClick={() => setHighlightClues(!highlightClues)}
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg font-semibold transition cursor-pointer shadow-2xs ${
                  highlightClues
                    ? 'bg-amber-200 text-amber-950 border border-amber-300 font-bold'
                    : 'bg-white text-[#6B635B] border border-[#E8DFD3] hover:text-[#262320]'
                }`}
                title="Tô sáng các vị trí chứa câu trả lời trong đoạn văn"
              >
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span className="hidden sm:inline">Manh mối</span>
              </button>

              {/* Translation Toggle */}
              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer shadow-2xs ${
                  showTranslation
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/90'
                }`}
              >
                {showTranslation ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                <span>{showTranslation ? 'Bản gốc' : 'Dịch Việt'}</span>
              </button>

              {/* Fullscreen Expand */}
              <button
                onClick={() => setIsFullScreen(true)}
                className="p-1.5 rounded-lg bg-white border border-[#E8DFD3] text-[#6B635B] hover:text-[#262320] transition cursor-pointer shadow-2xs"
                title="Phóng to đọc bài toàn màn hình"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* PASSAGE TEXT CONTENT: SCROLLABLE WITH GENEROUS PADDING */}
          <div
            ref={passageContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FFFDF9] min-h-0 space-y-3"
          >
            {showTranslation && (
              <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Đang hiển thị bản dịch tiếng Việt để bạn đối chiếu nội dung.</span>
              </div>
            )}

            {renderPassageText()}
          </div>

          {/* PASSAGE FOOTER (Word count & prompt) */}
          <div className="px-4 py-2 border-t border-[#F0EAE1] bg-[#FCFBF9] text-[11px] text-[#8C8276] flex items-center justify-between shrink-0">
            <span>💡 Mẹo: Bấm chọn đáp án ở cột bên phải để tra cứu manh mối trực tiếp</span>
            <span className="font-mono">{passageInfo.content.split(/\s+/).length} từ</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: ALL QUESTIONS FOR THIS PASSAGE            */}
        {/* ======================================================== */}
        <div
          className={`bg-white border border-[#EFE8DE] rounded-2xl shadow-sm shadow-amber-950/5 flex flex-col h-full min-h-0 overflow-hidden transition-all ${
            mobileTab === 'passage' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* QUESTION SELECTOR TOP BAR */}
          <div className="px-3.5 py-2.5 border-b border-[#F0EAE1] bg-[#FCFBF9] flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-1 overflow-x-auto py-0.5">
              <span className="text-xs text-[#8C8276] font-semibold mr-1 flex items-center gap-1 shrink-0">
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                <span>Câu:</span>
              </span>

              {passageQuestionsWithIdx.map(({ question: q, sessionIndex: idx }) => {
                const ans = answeredMap[q.id];
                const isCurrent = idx === currentIndex || activeQuestionId === q.id;

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      jumpToIndex(idx);
                      scrollToQuestion(q.num, q.id);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                      ans
                        ? ans.isCorrect
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-rose-100 text-rose-900 border border-rose-300'
                        : isCurrent
                        ? 'bg-amber-600 text-white shadow-2xs ring-2 ring-amber-500/50'
                        : 'bg-[#F2ECE3] text-[#5C5247] hover:bg-[#EAE2D7]'
                    }`}
                  >
                    <span>#{q.num}</span>
                    {ans && (
                      ans.isCorrect ? (
                        <Check className="w-3 h-3 text-emerald-700 stroke-[3]" />
                      ) : (
                        <X className="w-3 h-3 text-rose-600 stroke-[3]" />
                      )
                    )}
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-mono text-[#8C8276] shrink-0 font-semibold bg-white border border-[#E8DFD3] px-2.5 py-1 rounded-lg shadow-2xs">
              Đã làm: <strong className="text-amber-800">{answeredInPassage}</strong>/{totalInPassage}
            </div>
          </div>

          {/* SCROLLABLE QUESTIONS CONTAINER */}
          <div
            ref={questionsContainerRef}
            className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 min-h-0"
          >
            {passageQuestions.map((q) => {
              const ans = answeredMap[q.id];
              const isAnswered = Boolean(ans);
              const isCorrect = ans?.isCorrect ?? false;
              const selectedAnswer = ans?.selectedAnswer ?? null;
              const progress = questionProgress[q.id];
              const isChallenging = Boolean(progress && progress.wrongCount >= 2);
              const isActive = activeQuestionId === q.id || q.num === currentQ.num;

              return (
                <div
                  key={q.id}
                  id={`passage-q-${q.num}`}
                  onClick={() => setActiveQuestionId(q.id)}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-200 space-y-3 ${
                    isActive ? 'ring-2 ring-amber-400/80 shadow-md' : 'shadow-2xs'
                  } ${
                    isAnswered
                      ? isCorrect
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : 'bg-rose-50/40 border-rose-200'
                      : 'bg-white border-[#EAE3D6]'
                  }`}
                >
                  {/* Question Header & Category */}
                  <div className="flex items-center justify-between gap-1 text-xs">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-mono font-bold text-xs">
                        #{q.num}
                      </span>
                      {q.isMustLearn && (
                        <span className="px-1.5 py-0.2 rounded-md bg-amber-500 text-white font-bold text-[9.5px] shadow-2xs">
                          ⭐ Bắt buộc học thuộc
                        </span>
                      )}
                      <span className="text-[#8C8276] text-[11px] font-medium">
                        {q.category}
                      </span>
                    </div>

                    {isAnswered && (
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                          isCorrect
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-rose-100 text-rose-900 border border-rose-300'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                            Chính xác
                          </>
                        ) : (
                          <>
                            <X className="w-3.5 h-3.5 text-rose-600 stroke-[3]" />
                            Đáp án đúng: {q.correctAnswer}
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Challenging Gentle Reminder */}
                  {isChallenging && (
                    <div className="flex items-center gap-1.5 text-xs text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200/80">
                      <span>🌱</span>
                      <span>
                        Câu này bạn từng làm sai <strong>{progress?.wrongCount} lần</strong>. Đọc kỹ manh mối bên dưới nhé!
                      </span>
                    </div>
                  )}

                  {/* Question Prompt */}
                  <div className="font-semibold text-sm sm:text-[14.5px] text-[#1F1C18] leading-snug">
                    {q.question}
                  </div>

                  {/* 4 Choices */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {optionKeys.map((key) => {
                      const optionText = q.options[key];
                      const isThisCorrect = isAnswered && key === q.correctAnswer;
                      const isThisSelected = isAnswered && key === selectedAnswer;

                      let style = 'bg-white border-[#E8DFD3] hover:border-amber-400 hover:bg-[#FFFDF9] text-[#262320] shadow-2xs';

                      if (isAnswered) {
                        if (isThisCorrect) {
                          style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400/70';
                        } else if (isThisSelected && !isCorrect) {
                          style = 'bg-rose-50 border-rose-400 text-rose-900 line-through opacity-85';
                        } else {
                          style = 'bg-[#FAF7F2] border-[#EFE8DE] text-[#9E948A] opacity-60';
                        }
                      }

                      return (
                        <button
                          key={key}
                          onClick={() => selectAnswerForQuestion(q.id, key)}
                          disabled={isAnswered}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition duration-150 cursor-pointer text-xs sm:text-sm ${style}`}
                        >
                          <div className="flex items-center gap-2 flex-1 mr-1">
                            <span
                              className={`w-5 h-5 rounded-md flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                                isThisCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : isThisSelected && !isCorrect
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-[#F0EAE1] text-[#4A423B]'
                              }`}
                            >
                              {key}
                            </span>
                            <span className="font-medium text-xs sm:text-[13px] leading-tight line-clamp-2">
                              {optionText}
                            </span>
                          </div>

                          {isThisCorrect ? (
                            <Check className="w-4 h-4 text-emerald-700 shrink-0 stroke-[3]" />
                          ) : isThisSelected && !isCorrect ? (
                            <X className="w-4 h-4 text-rose-600 shrink-0 stroke-[3]" />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>

                  {/* Inline Feedback & Clues when answered */}
                  {isAnswered && (
                    <div className="tip-reveal space-y-2 pt-2 border-t border-[#F0EAE1] text-xs">
                      {/* NẾU LÀM SAI: CHỈ MẸO & LẤY CÂU NÀY LÀM VÍ DỤ MINH HỌA */}
                      {!isCorrect && (
                        <div className="p-2.5 rounded-xl bg-[#FFFDF7] border border-rose-300 space-y-1.5 shadow-2xs">
                          <div className="flex items-center gap-1 font-bold text-rose-900 text-xs">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                            <span>Phân Tích Lỗi Sai & Mẹo Nhớ:</span>
                          </div>
                          <p className="text-xs text-[#262320]">
                            Bạn đã chọn: <strong className="text-rose-700">({selectedAnswer}) {q.options[selectedAnswer!]}</strong>. Đáp án chuẩn là: <strong className="text-emerald-700">({q.correctAnswer}) {q.options[q.correctAnswer]}</strong>.
                          </p>
                          <p className="text-xs text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200">
                            💡 <strong>Mẹo:</strong> {q.tip || q.explanation}
                          </p>
                        </div>
                      )}

                      {q.clue ? (
                        <div className="p-2.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 space-y-1.5">
                          <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-xs uppercase">
                            <Compass className="w-4 h-4 text-emerald-700" />
                            <span>Vị Trí Manh Mối: {q.clue.clueLocation}</span>
                          </div>

                          <div className="p-2 rounded-lg bg-white/90 border border-emerald-300 font-medium text-emerald-900 text-xs sm:text-[13px] leading-relaxed">
                            🔎 <strong>Trích dẫn trong bài:</strong> "{q.clue.clueQuote}"
                          </div>

                          <p className="text-xs text-[#2D4536] leading-relaxed">
                            ⚡ <strong>Cách tìm nhanh:</strong> {q.clue.scanningTip}
                          </p>
                        </div>
                      ) : (
                        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
                          <div className="flex items-center gap-1 font-bold text-amber-900 text-xs uppercase">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
                            <span>Giải Thích & Mẹo:</span>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed">{q.tip || q.explanation}</p>
                        </div>
                      )}

                      {/* Vietnamese translation of question */}
                      {q.vietnameseMeaning && (
                        <div className="px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#EFE8DE] text-xs text-[#4A423B] italic">
                          Dịch nghĩa câu hỏi: "{q.vietnameseMeaning}"
                        </div>
                      )}

                      {/* Retake Button for Passage Question */}
                      <div className="pt-1 flex justify-end">
                        <button
                          onClick={() => retakeQuestion(q.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#DCD3C7] hover:bg-amber-50 text-[11px] font-bold text-[#4A4238] transition cursor-pointer shadow-2xs"
                          title="Làm lại câu hỏi này"
                        >
                          <RotateCcw className="w-3 h-3 text-amber-700" />
                          <span>Làm lại câu này</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* BOTTOM ACTION BAR */}
          <div className="p-2.5 sm:p-3 border-t border-[#F0EAE1] bg-[#FCFBF9] shrink-0 space-y-2">
            <button
              onClick={nextPassage}
              disabled={reviewTimeLeft > 0}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition cursor-pointer active:scale-[0.99] ${
                reviewTimeLeft > 0
                  ? 'bg-[#E5DDD2] text-[#8C8276] cursor-not-allowed opacity-80'
                  : allAnswered
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-emerald-700/20'
                  : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-amber-600/20'
              }`}
            >
              <span>
                {reviewTimeLeft > 0
                  ? `⏳ Đang đọc manh mối & mẹo (còn ${reviewTimeLeft}s...)`
                  : allAnswered
                  ? 'Đã Hoàn Thành Bài Đọc — Chuyển Sang Bài Tiếp Theo'
                  : `Chuyển Sang Bài Tiếp Theo (${answeredInPassage}/${totalInPassage} câu đã làm)`}
              </span>
              {reviewTimeLeft === 0 && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* FULLSCREEN READING MODAL (DISTRACTION-FREE)              */}
      {/* ======================================================== */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-3xl max-w-4xl w-full h-[90vh] flex flex-col shadow-2xl border border-[#EFE8DE] overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#F0EAE1] bg-[#FCFBF9] flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-700" />
                <div>
                  <h3 className="font-bold text-base text-[#262320]">
                    {passageInfo.title}
                  </h3>
                  <span className="text-xs text-[#8C8276]">
                    Đoạn văn câu #{passageQuestions[0]?.num} - #{passageQuestions[passageQuestions.length - 1]?.num}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Font Size Selector */}
                <div className="flex items-center bg-[#F2ECE3] rounded-lg p-0.5 text-xs font-semibold">
                  <button
                    onClick={() => setFontSize('sm')}
                    className={`px-2 py-1 rounded transition cursor-pointer text-xs ${
                      fontSize === 'sm' ? 'bg-white text-amber-900 font-bold shadow-2xs' : 'text-[#7A7065]'
                    }`}
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setFontSize('base')}
                    className={`px-2 py-1 rounded transition cursor-pointer text-xs ${
                      fontSize === 'base' ? 'bg-white text-amber-900 font-bold shadow-2xs' : 'text-[#7A7065]'
                    }`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('lg')}
                    className={`px-2 py-1 rounded transition cursor-pointer text-xs ${
                      fontSize === 'lg' ? 'bg-white text-amber-900 font-bold shadow-2xs' : 'text-[#7A7065]'
                    }`}
                  >
                    A+
                  </button>
                </div>

                {/* Translation button */}
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/90 font-semibold transition cursor-pointer"
                >
                  {showTranslation ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showTranslation ? 'Bản gốc' : 'Dịch Việt'}</span>
                </button>

                {/* Close Fullscreen */}
                <button
                  onClick={() => setIsFullScreen(false)}
                  className="p-1.5 rounded-lg bg-[#F0EAE1] hover:bg-[#E5DDD2] text-[#262320] transition cursor-pointer"
                  title="Đóng chế độ toàn màn hình"
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-[#FFFDF9] select-text">
              {renderPassageText()}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-[#F0EAE1] bg-[#FCFBF9] flex items-center justify-between text-xs text-[#8C8276] shrink-0">
              <span>Bấm nút thu nhỏ hoặc Đóng để quay lại làm câu hỏi</span>
              <button
                onClick={() => setIsFullScreen(false)}
                className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition cursor-pointer"
              >
                Quay Lại Làm Bài ({totalInPassage} câu)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
