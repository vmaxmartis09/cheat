import React, { useEffect, useCallback } from 'react';
import { useQuizStore } from '../store/useQuizStore';
import { AnswerChoice } from '../types';
import { TimerBar } from './TimerBar';
import { PassageCard } from './PassageCard';
import {
  Check,
  X,
  Tag,
  FileText,
  ArrowRight,
  Lightbulb,
  Sparkles,
  BookOpen,
  AlertTriangle,
  Clock,
} from 'lucide-react';

export const Flashcard: React.FC = () => {
  const {
    questions,
    currentIndex,
    selectedAnswer,
    isAnswered,
    isCorrect,
    selectAnswer,
    nextQuestion,
    questionProgress,
    reviewTimeLeft,
    tickReviewTimer,
  } = useQuizStore();

  const currentQ = questions[currentIndex];
  const previousQ = currentIndex > 0 ? questions[currentIndex - 1] : null;
  const currentProgress = currentQ ? questionProgress[currentQ.id] : undefined;
  const isChallenging = Boolean(currentProgress && currentProgress.wrongCount >= 2);

  // Cooldown review timer: tick every second while isAnswered && reviewTimeLeft > 0
  useEffect(() => {
    if (!isAnswered || reviewTimeLeft <= 0) return;

    const timer = setInterval(() => {
      tickReviewTimer();
    }, 1000);

    return () => clearInterval(timer);
  }, [isAnswered, reviewTimeLeft, tickReviewTimer]);

  const handleSelectOption = useCallback(
    (choice: AnswerChoice) => {
      if (isAnswered) return;
      selectAnswer(choice);
    },
    [isAnswered, selectAnswer]
  );

  // Keyboard shortcut support: 1/2/3/4 or A/B/C/D, Space/Enter for Next (after 9s cooldown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isAnswered) {
        const key = e.key.toUpperCase();
        if (key === '1' || key === 'A') handleSelectOption('A');
        else if (key === '2' || key === 'B') handleSelectOption('B');
        else if (key === '3' || key === 'C') handleSelectOption('C');
        else if (key === '4' || key === 'D') handleSelectOption('D');
      } else {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          if (reviewTimeLeft === 0) {
            nextQuestion();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, handleSelectOption, nextQuestion, reviewTimeLeft]);

  if (!currentQ) {
    return (
      <div className="p-8 text-center text-[#8C8276] text-xs">
        Không có câu hỏi nào trong danh mục này.
      </div>
    );
  }

  if (currentQ.isPassageQuestion && currentQ.passageInfo) {
    return <PassageCard />;
  }

  const optionKeys: AnswerChoice[] = ['A', 'B', 'C', 'D'];
  const correctOptionText = currentQ.options[currentQ.correctAnswer];

  // Format question with visual inline answer directly in the text
  const renderVisualQuestionText = () => {
    const text = currentQ.question;
    const parts = text.split(/(_{3,}|\.{3,}|\-{3,}|…{2,}|\.{5,}|\[\d+\])/);

    return (
      <span>
        {parts.map((part, index) => {
          if (part.match(/_{3,}|\.{3,}|\-{3,}|…{2,}|\.{5,}|\[\d+\]/)) {
            if (!isAnswered) {
              return (
                <span
                  key={index}
                  className="font-mono text-amber-700 bg-amber-100/90 border border-amber-300 px-2 py-0.5 rounded mx-1 font-bold inline-block text-xs"
                >
                  [-------]
                </span>
              );
            }

            const wrongChoiceText =
              selectedAnswer && selectedAnswer !== currentQ.correctAnswer
                ? currentQ.options[selectedAnswer]
                : null;

            return (
              <span key={index} className="inline-flex items-center gap-1 font-mono text-xs font-bold mx-1">
                {wrongChoiceText && (
                  <span className="line-through text-rose-700 opacity-80 mr-0.5">
                    ({selectedAnswer}) {wrongChoiceText}
                  </span>
                )}
                <span className="text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-1.5 py-0.2 rounded inline-flex items-center gap-0.5">
                  <Check className="w-3 h-3 text-emerald-700" />
                  ({currentQ.correctAnswer}) {correctOptionText}
                </span>
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </span>
    );
  };

  const getOptionStyle = (key: AnswerChoice) => {
    if (!isAnswered) {
      return 'bg-white border-[#E8DFD3] hover:border-amber-400 hover:bg-[#FFFDF9] text-[#262320] shadow-2xs active:scale-[0.98]';
    }

    const isThisCorrect = key === currentQ.correctAnswer;
    const isThisSelected = key === selectedAnswer;

    if (isThisCorrect) {
      return 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs ring-1 ring-emerald-400';
    }
    if (isThisSelected && !isCorrect) {
      return 'bg-rose-50 border-rose-400 text-rose-900 line-through opacity-85';
    }

    return 'bg-[#FAF7F2] border-[#EFE8DE] text-[#9E948A] opacity-60';
  };

  return (
    <div className="flashcard-appear flex-1 flex flex-col h-full min-h-0 max-w-2xl w-full mx-auto">
      {/* CARD MAIN WRAPPER */}
      <div className="bg-white border border-[#EFE8DE] rounded-2xl p-4 sm:p-5 shadow-sm shadow-amber-950/5 flex-1 flex flex-col justify-between h-full min-h-0 space-y-2.5">
        
        {/* UPPER CONTENT: META + TIMER + QUESTION + EXPLANATION */}
        <div className="flex-1 flex flex-col space-y-2.5 min-h-0 overflow-y-auto pr-0.5">
          {/* Top Mini Info Bar */}
          <div className="flex items-center justify-between gap-1 text-[11px] pb-2 border-b border-[#F0EAE1] shrink-0">
            <div className="flex items-center gap-1.5 overflow-hidden flex-wrap">
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#F5EFE6] text-[#5C5247] font-bold text-[10px] shrink-0">
                <FileText className="w-3 h-3 text-amber-700" />
                <span>#{currentQ.num}</span>
              </span>

              {/* ⭐ BẮT BUỘC HỌC THUỘC BADGE */}
              {currentQ.isMustLearn && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500 text-white font-bold text-[10px] tracking-wide shadow-2xs">
                  <span>⭐ Bắt buộc học thuộc</span>
                </span>
              )}

              {/* 🎯 CÂU TƯƠNG TỰ BADGE */}
              {currentQ.isSimilarClone && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold text-[10px] tracking-wide shadow-2xs">
                  <Sparkles className="w-3 h-3 text-emerald-200" />
                  <span>🎯 Câu tương tự (#{currentQ.similarToQuestionNum})</span>
                </span>
              )}

              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200/80 text-amber-900 font-medium text-[10px] truncate">
                <Tag className="w-2.5 h-2.5 shrink-0" />
                <span className="truncate">{currentQ.category}</span>
              </span>
            </div>

            <div className="font-mono text-[#8C8276] text-xs shrink-0">
              <strong className="text-[#262320]">{currentIndex + 1}</strong>/{questions.length}
            </div>
          </div>

          {/* SIMILAR QUESTION INTRO BANNER */}
          {currentQ.isSimilarClone && (
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 text-emerald-950 flex items-center gap-2 shadow-2xs shrink-0">
              <span className="text-xl shrink-0">🎯</span>
              <div className="text-xs">
                <div className="font-bold text-emerald-900 flex items-center gap-1">
                  <span>CÂU TƯƠNG TỰ THỰC HÀNH NGAY</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 bg-emerald-200/80 rounded">
                    Cùng dạng với câu #{currentQ.similarToQuestionNum}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-snug mt-0.5">
                  Bạn vừa làm đúng câu trước! Hãy áp dụng ngay quy tắc đó vào câu này để phản xạ nhuần nhuyễn nhé!
                </p>
              </div>
            </div>
          )}

          {/* Timer Bar */}
          <div className="shrink-0">
            <TimerBar />
          </div>

          {/* GENTLE REMINDER: NẾU ĐÃ SAI >= 2 LẦN */}
          {isChallenging && (
            <div className="flex items-start gap-2 p-2 sm:px-3 sm:py-2 rounded-xl bg-amber-50/95 border border-amber-200/90 text-amber-950 text-xs shadow-2xs shrink-0">
              <span className="text-base shrink-0">🌱</span>
              <div className="leading-snug">
                <span className="font-bold text-amber-900">Lời nhắc dịu dàng: </span>
                <span className="text-[#59431E]">
                  Câu này bạn từng băn khoăn {currentProgress?.wrongCount} lần rồi nè. Cứ thong thả đọc mẹo vàng bên dưới nhé, bạn hoàn toàn làm được mà! ✨
                </span>
              </div>
            </div>
          )}

          {/* QUESTION STATEMENT: PROMINENT & COMFORTABLE TO READ */}
          <div className="py-1">
            <div className="text-[14.5px] sm:text-[16px] font-semibold text-[#1F1C18] leading-relaxed tracking-tight">
              {renderVisualQuestionText()}
            </div>
          </div>

          {/* INLINE VISUAL EXPLANATION & MẸO (KHI ĐÃ TRẢ LỜI) */}
          {isAnswered && (
            <div className="tip-reveal space-y-2 pt-2 border-t border-[#F0EAE1]">
              
              {/* NẾU LÀM SAI: CHỈ MẸO VÀ LẤY CÂU NÀY RA LÀM VÍ DỤ MINH HỌA */}
              {!isCorrect ? (
                <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FFFDF7] border-2 border-rose-300 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between pb-1.5 border-b border-rose-200/80">
                    <div className="flex items-center gap-1.5 text-rose-900 font-bold text-xs uppercase tracking-wide">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Phân Tích Lỗi Sai & Mẹo Khắc Phục</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                      Đọc kỹ để nhớ sâu
                    </span>
                  </div>

                  {/* 1. MẸO VÀNG RÚT RA */}
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-0.5">
                    <div className="flex items-center gap-1 font-bold text-amber-900 text-[11px] uppercase">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                      <span>Bí Kíp Nhận Biết Siêu Tốc:</span>
                    </div>
                    <p className="leading-relaxed font-medium">{currentQ.tip}</p>
                  </div>

                  {/* 2. LẤY CÂU NÀY LÀM VÍ DỤ ĐỐI CHIẾU THỰC TẾ */}
                  <div className="p-2.5 rounded-xl bg-white border border-[#EFE8DE] text-xs space-y-1.5 shadow-2xs">
                    <div className="font-bold text-[#3B342C] text-[11px] flex items-center gap-1">
                      <span>📌</span>
                      <span>Lấy câu này (#{currentQ.num}) làm ví dụ phân tích thực tế:</span>
                    </div>
                    
                    <div className="pl-2.5 border-l-2 border-amber-400 space-y-1 text-[#262320]">
                      <p className="text-[11.5px] italic text-[#4A423B]">
                        "{currentQ.question}"
                      </p>
                      <div className="text-[11px] flex flex-wrap gap-2 pt-0.5">
                        {selectedAnswer && (
                          <span className="text-rose-700">
                            ❌ Bạn chọn: <strong>({selectedAnswer}) {currentQ.options[selectedAnswer]}</strong> (Chưa chuẩn)
                          </span>
                        )}
                        <span className="text-emerald-700">
                          ✅ Đáp án đúng: <strong>({currentQ.correctAnswer}) {currentQ.options[currentQ.correctAnswer]}</strong>
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5C5247] leading-relaxed pt-0.5">
                        👉 <strong>Giải thích bản chất:</strong> {currentQ.explanation}
                      </p>
                    </div>
                  </div>

                  {/* 3. NẾU CÓ CÂU TRƯỚC: SO SÁNH VỚI CÂU TRƯỚC */}
                  {previousQ && (
                    <div className="p-2 rounded-xl bg-[#F8F5EE] border border-[#E8DFD3] text-[11px] text-[#5C5247] space-y-1">
                      <div className="font-semibold text-[#3B342C] flex items-center gap-1 text-[10.5px]">
                        <span>🔍</span>
                        <span>So sánh điểm khác với câu trước (#{previousQ.num}):</span>
                      </div>
                      <p className="leading-relaxed">
                        Ở câu trước (#{previousQ.num}), đáp án là <strong>({previousQ.correctAnswer}) {previousQ.options[previousQ.correctAnswer]}</strong> ({previousQ.category}). Sang câu này (#{currentQ.num}), mấu chốt nằm ở: <strong>{currentQ.keywords?.join(', ') || 'dấu hiệu từ trước/sau chỗ trống'}</strong>!
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* NẾU LÀM ĐÚNG: KHEN NGỢI & CÂU TƯƠNG TỰ */
                <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-300 text-emerald-950 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-xs uppercase">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>Chính Xác! Bạn Đã Nắm Rõ Mẹo:</span>
                  </div>
                  <p className="text-xs font-medium leading-relaxed">{currentQ.tip}</p>
                  <div className="p-2 rounded-lg bg-white/80 border border-emerald-200 text-[11px] text-emerald-900">
                    ⚡ <strong>Giải thích chi tiết:</strong> {currentQ.explanation}
                  </div>
                  {!currentQ.isSimilarClone && (
                    <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1 pt-0.5">
                      <span>🎯</span>
                      <span>Hệ thống đã tự động kích hoạt 1 câu tương tự ngay tiếp theo để bạn rèn luyện phản xạ!</span>
                    </div>
                  )}
                </div>
              )}

              {/* Dịch nghĩa tiếng Việt */}
              {currentQ.vietnameseMeaning && (
                <div className="px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#EFE8DE] text-[11px] text-[#4A423B] flex items-start gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <span className="italic leading-snug">"{currentQ.vietnameseMeaning}"</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* LOWER SECTION: CHOICES & NEXT BUTTON (ANCHORED AT BOTTOM) */}
        <div className="space-y-2.5 pt-2 shrink-0 border-t border-[#F5EFE6]">
          {/* 4 CHOICES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {optionKeys.map((key) => {
              const optionText = currentQ.options[key];
              const isThisCorrect = isAnswered && key === currentQ.correctAnswer;
              const isThisSelected = isAnswered && key === selectedAnswer;

              return (
                <button
                  key={key}
                  onClick={() => handleSelectOption(key)}
                  disabled={isAnswered}
                  className={`min-h-[46px] sm:min-h-[50px] flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${getOptionStyle(
                    key
                  )}`}
                >
                  <div className="flex items-center gap-2 overflow-hidden flex-1 mr-1">
                    <span
                      className={`w-6 h-6 rounded-md flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        isThisCorrect
                          ? 'bg-emerald-600 text-white'
                          : isThisSelected && !isCorrect
                          ? 'bg-rose-600 text-white'
                          : 'bg-[#F0EAE1] text-[#4A423B]'
                      }`}
                    >
                      {key}
                    </span>
                    <span className="font-semibold text-xs sm:text-[13.5px] leading-tight line-clamp-2">
                      {optionText}
                    </span>
                  </div>

                  {/* Right indicator */}
                  <div className="shrink-0">
                    {isThisCorrect ? (
                      <Check className="w-4 h-4 text-emerald-700 stroke-[3]" />
                    ) : isThisSelected && !isCorrect ? (
                      <X className="w-4 h-4 text-rose-600 stroke-[3]" />
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 9S MANDATORY REVIEW COUNTDOWN BAR & NEXT BUTTON */}
          {isAnswered && (
            <div className="space-y-2 pt-1">
              {/* Cooldown Timer Alert Bar */}
              {reviewTimeLeft > 0 ? (
                <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50/90 border border-amber-300 text-amber-950 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-700 animate-spin" />
                      <span>Dành thời gian đọc kỹ mẹo & ví dụ phân tích:</span>
                    </span>
                    <span className="font-mono font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md text-xs">
                      còn {reviewTimeLeft}s
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-amber-200/70 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-600 rounded-full transition-all duration-1000 ease-linear shadow-xs"
                      style={{ width: `${((9 - reviewTimeLeft) / 9) * 100}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center text-xs font-semibold text-emerald-700 py-0.5 flex items-center justify-center gap-1 animate-pulse">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Đã hết thời gian chờ 9s — Bạn đã sẵn sàng sang câu tiếp theo!</span>
                </div>
              )}

              {/* NEXT QUESTION BUTTON */}
              <button
                onClick={nextQuestion}
                disabled={reviewTimeLeft > 0}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition cursor-pointer ${
                  reviewTimeLeft > 0
                    ? 'bg-[#E5DDD2] text-[#8C8276] cursor-not-allowed opacity-80'
                    : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-amber-600/25 active:scale-[0.99] ring-2 ring-amber-400/50'
                }`}
              >
                <span>
                  {reviewTimeLeft > 0
                    ? `⏳ Đang đọc mẹo & giải thích (còn ${reviewTimeLeft}s...)`
                    : '👉 Sẵn Sàng — Chuyển Sang Câu Mới'}
                </span>
                {reviewTimeLeft === 0 && <ArrowRight className="w-4 h-4" />}
                {reviewTimeLeft === 0 && (
                  <span className="hidden sm:inline font-mono text-[9px] bg-white/20 px-1 py-0.2 rounded ml-1">
                    Space
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
