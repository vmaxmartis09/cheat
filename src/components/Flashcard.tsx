import React, { useEffect, useCallback, useState } from 'react';
import { useQuizStore } from '../store/useQuizStore';
import { AnswerChoice } from '../types';
import { TimerBar } from './TimerBar';
import {
  Check,
  X,
  Tag,
  FileText,
  ArrowRight,
  Lightbulb,
  Sparkles,
  BookOpen,
  Eye,
  EyeOff,
  Compass,
  ListCollapse,
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
  } = useQuizStore();

  const currentQ = questions[currentIndex];
  const currentProgress = currentQ ? questionProgress[currentQ.id] : undefined;
  const isChallenging = Boolean(currentProgress && currentProgress.wrongCount >= 2);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showAllClues, setShowAllClues] = useState(false);

  // Reset local states on question change
  useEffect(() => {
    setShowTranslation(false);
    setShowAllClues(false);
  }, [currentIndex]);

  const handleSelectOption = useCallback(
    (choice: AnswerChoice) => {
      if (isAnswered) return;
      selectAnswer(choice);
    },
    [isAnswered, selectAnswer]
  );

  // Keyboard shortcut support: 1/2/3/4 or A/B/C/D, Space/Enter for Next
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
          nextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, handleSelectOption, nextQuestion]);

  if (!currentQ) {
    return (
      <div className="p-8 text-center text-[#8C8276] text-xs">
        Không có câu hỏi nào trong danh mục này.
      </div>
    );
  }

  const optionKeys: AnswerChoice[] = ['A', 'B', 'C', 'D'];
  const correctOptionText = currentQ.options[currentQ.correctAnswer];
  const isPassage = currentQ.isPassageQuestion && currentQ.passageInfo;

  // Format question with visual inline answer directly in the text!
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
                  className="inline-flex items-center px-2 py-0.5 mx-1 rounded border border-amber-400 bg-amber-100/90 text-amber-900 font-mono font-bold text-xs shadow-2xs animate-pulse"
                >
                  [ ? ]
                </span>
              );
            }

            // Answered: Show visual inline answer directly in the blank!
            if (isCorrect) {
              return (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 mx-1 rounded-md border border-emerald-500 bg-emerald-100 text-emerald-900 font-bold text-xs shadow-2xs"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                  <span>({currentQ.correctAnswer}) {correctOptionText}</span>
                </span>
              );
            }

            // Wrong Answer
            const wrongChoiceText = selectedAnswer ? currentQ.options[selectedAnswer] : null;
            return (
              <span
                key={index}
                className="inline-flex items-center flex-wrap gap-1 px-2 py-0.5 mx-1 rounded-md border border-rose-300 bg-rose-50 text-xs font-bold"
              >
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
    <div className="flashcard-appear flex-1 flex flex-col h-full min-h-0 max-w-md w-full mx-auto">
      {/* CARD MAIN WRAPPER: FILLS HEIGHT HARMONIOUSLY */}
      <div className="bg-white border border-[#EFE8DE] rounded-2xl p-3.5 sm:p-4 shadow-sm shadow-amber-950/5 flex-1 flex flex-col justify-between h-full min-h-0 space-y-2">
        
        {/* UPPER CONTENT: META + TIMER + QUESTION + EXPLANATION (SCROLLS ONLY IF SCREEN IS VERY SHORT) */}
        <div className="flex-1 flex flex-col space-y-2.5 min-h-0 overflow-y-auto pr-0.5">
          {/* Top Mini Info Bar */}
          <div className="flex items-center justify-between gap-1 text-[11px] pb-1.5 border-b border-[#F0EAE1] shrink-0">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#F5EFE6] text-[#5C5247] font-bold text-[10px] shrink-0">
                <FileText className="w-3 h-3 text-amber-700" />
                <span>#{currentQ.num}</span>
              </span>

              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200/80 text-amber-900 font-medium text-[10px] truncate">
                <Tag className="w-2.5 h-2.5 shrink-0" />
                <span className="truncate">{currentQ.category}</span>
              </span>
            </div>

            <div className="font-mono text-[#8C8276] text-[11px] shrink-0">
              <strong className="text-[#262320]">{currentIndex + 1}</strong>/{questions.length}
            </div>
          </div>

          {/* Timer Bar (Automatically shows "Không đếm giờ" for passages!) */}
          <div className="shrink-0">
            <TimerBar />
          </div>

          {/* NẾU LÀ CÂU HỎI ĐOẠN VĂN: HIỂN THỊ NỘI DUNG ĐOẠN VĂN */}
          {isPassage && currentQ.passageInfo && (
            <div className="p-2.5 rounded-xl bg-[#FFFDF8] border border-amber-200/80 space-y-1.5 text-xs shadow-2xs shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 font-bold text-amber-950 text-[11px] truncate">
                  <BookOpen className="w-3 h-3 text-amber-700 shrink-0" />
                  <span className="truncate">{currentQ.passageInfo.title}</span>
                </div>
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="flex items-center gap-1 text-[10px] text-amber-800 bg-amber-100/80 hover:bg-amber-100 px-1.5 py-0.5 rounded font-semibold transition shrink-0 cursor-pointer"
                >
                  {showTranslation ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showTranslation ? 'Xem bài gốc' : 'Xem bản dịch'}</span>
                </button>
              </div>

              <div className="max-h-28 sm:max-h-36 overflow-y-auto text-[11.5px] leading-relaxed text-[#3E352F] pr-1 whitespace-pre-line bg-white/70 p-2 rounded-lg border border-[#EFE8DE] font-sans">
                {showTranslation && currentQ.passageInfo.vietnameseTranslation
                  ? currentQ.passageInfo.vietnameseTranslation
                  : currentQ.passageInfo.content}
              </div>
            </div>
          )}

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
            <div className="text-[14px] sm:text-[15.5px] font-semibold text-[#1F1C18] leading-relaxed tracking-tight">
              {renderVisualQuestionText()}
            </div>
          </div>

          {/* INLINE VISUAL EXPLANATION & MẸO (ZERO SCROLL) */}
          {isAnswered && (
            <div className="tip-reveal space-y-1.5 pt-1.5 border-t border-[#F0EAE1]">
              {/* PHẢN HỒI DỊU DÀNG NẾU LÀ CÂU ĐÃ SAI >= 2 LẦN */}
              {isChallenging && (
                isCorrect ? (
                  <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-center gap-2">
                    <span className="text-base shrink-0">🎉</span>
                    <p className="leading-snug">
                      <strong>Tuyệt vời quá!</strong> Bạn đã nhớ mẹo và vượt qua câu từng bị nhầm {currentProgress?.wrongCount} lần rồi đó! Cố gắng duy trì nhé! 🌟
                    </p>
                  </div>
                ) : (
                  <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50/90 border border-amber-300/80 text-amber-950 text-xs flex items-center gap-2">
                    <span className="text-base shrink-0">💛</span>
                    <p className="leading-snug">
                      <strong>Không sao đâu bạn nhé!</strong> Câu này cấu trúc hơi lắt léo xíu thôi. Hãy xem mẹo ngắn và từ khóa bên dưới, câu này sẽ xuất hiện lại nhẹ nhàng để bạn ôn lại nhé! ✨
                    </p>
                  </div>
                )
              )}

              {/* If passage question: SHOW HƯỚNG DẪN TÌM MANH MỐI */}
              {isPassage && currentQ.clue ? (
                <div className="p-2 rounded-lg bg-emerald-50/90 border border-emerald-200 text-emerald-950 text-[11px] leading-snug space-y-1">
                  <div className="flex items-center justify-between text-emerald-900 font-bold text-[10px] uppercase">
                    <span className="flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Manh Mối Trong Bài: {currentQ.clue.clueLocation}</span>
                    </span>
                    <button
                      onClick={() => setShowAllClues(!showAllClues)}
                      className="text-[9px] underline text-emerald-800 hover:text-emerald-950 font-semibold cursor-pointer"
                    >
                      {showAllClues ? 'Thu gọn' : 'Xem cả đoạn'}
                    </button>
                  </div>

                  <div className="p-1 rounded bg-white/80 border border-emerald-300/60 font-medium text-emerald-900 text-[10.5px]">
                    🔎 <strong>Trích dẫn:</strong> "{currentQ.clue.clueQuote}"
                  </div>

                  <p className="text-[10.5px] text-[#2D4536]">
                    ⚡ <strong>Cách tìm:</strong> {currentQ.clue.scanningTip}
                  </p>

                  {/* Optional: All Clues in this Passage */}
                  {showAllClues && currentQ.passageInfo && (
                    <div className="mt-1 pt-1 border-t border-emerald-200 space-y-1 bg-white/90 p-2 rounded-lg">
                      <div className="font-bold text-[10px] text-emerald-900 flex items-center gap-1">
                        <ListCollapse className="w-3 h-3" />
                        <span>Tổng Hợp Manh Mối Cả Đoạn Văn:</span>
                      </div>
                      {currentQ.passageInfo.clues.map((cl, i) => (
                        <div key={i} className="text-[10px] text-zinc-700 pb-0.5 border-b border-zinc-100">
                          <strong className="text-emerald-800">Câu #{cl.questionNum} ({cl.correctAnswer}):</strong> {cl.clueLocation} ➔ <em>"{cl.clueQuote}"</em>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Single Part 5 question: Short Cheat Code */
                <div className="p-2.5 rounded-xl bg-[#FFFDF5] border border-amber-200 text-[#4D3A18] text-[11.5px] leading-snug space-y-1">
                  <div className="flex items-center gap-1 text-amber-900 font-bold text-[10px] uppercase">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 fill-amber-500/20" />
                    <span>Mẹo Nhận Biết Siêu Tốc:</span>
                  </div>
                  <p className="font-medium">{currentQ.tip}</p>

                  {currentQ.keywords && currentQ.keywords.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1 mt-1">
                      <span className="text-[10px] text-[#7A6A55] font-semibold flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5 text-amber-600" /> Từ khóa:
                      </span>
                      {currentQ.keywords.map((kw, i) => (
                        <span
                          key={i}
                          className="px-1 py-0.2 rounded bg-amber-100 text-amber-900 font-mono text-[9px] font-bold"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Quick Vietnamese Meaning */}
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
        <div className="space-y-2 pt-2 shrink-0 border-t border-[#F5EFE6]">
          {/* 4 CHOICES: 2x2 FOR PASSAGES, RESPONSIVE ROWS/GRID FOR PART 5 */}
          <div className={isPassage ? "grid grid-cols-2 gap-2" : "grid grid-cols-1 sm:grid-cols-2 gap-2"}>
            {optionKeys.map((key) => {
              const optionText = currentQ.options[key];
              const isThisCorrect = isAnswered && key === currentQ.correctAnswer;
              const isThisSelected = isAnswered && key === selectedAnswer;

              return (
                <button
                  key={key}
                  onClick={() => handleSelectOption(key)}
                  disabled={isAnswered}
                  className={`min-h-[46px] sm:min-h-[48px] flex items-center justify-between px-3 py-2 rounded-xl border text-left transition-all duration-150 cursor-pointer ${getOptionStyle(
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
                    <span className="font-semibold text-xs sm:text-[13px] leading-tight line-clamp-2">
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

          {/* NEXT QUESTION BUTTON */}
          {isAnswered && (
            <div className="pt-0.5">
              <button
                onClick={nextQuestion}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-600/20 active:scale-[0.99] transition cursor-pointer"
              >
                <span>Câu Tiếp Theo</span>
                <ArrowRight className="w-4 h-4" />
                <span className="hidden sm:inline font-mono text-[9px] bg-white/20 px-1 py-0.2 rounded ml-1">
                  Space
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
