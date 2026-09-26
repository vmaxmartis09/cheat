import React, { useEffect } from 'react';
import { Question, AnswerChoice } from '../types';
import { Lightbulb, CheckCircle2, XCircle, ArrowRight, BookOpen, Sparkles, AlertCircle } from 'lucide-react';

interface TipExplanationProps {
  question: Question;
  selectedAnswer: AnswerChoice | null;
  isCorrect: boolean;
  isTimeout: boolean;
  onNext: () => void;
}

export const TipExplanation: React.FC<TipExplanationProps> = ({
  question,
  selectedAnswer,
  isCorrect,
  isTimeout,
  onNext,
}) => {
  // Listen for Space or Enter key to go to next question
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext]);

  const correctChoiceText = question.options[question.correctAnswer];

  return (
    <div className="tip-reveal mt-4 space-y-3">
      {/* Result Status Banner */}
      <div
        className={`p-3 rounded-xl border flex items-center justify-between gap-2.5 ${
          isCorrect
            ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
            : isTimeout
            ? 'bg-amber-50/90 border-amber-200 text-amber-900'
            : 'bg-rose-50/90 border-rose-200 text-rose-900'
        }`}
      >
        <div className="flex items-center gap-2">
          {isCorrect ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : isTimeout ? (
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}

          <div>
            <div className="text-xs font-bold leading-tight">
              {isCorrect
                ? 'Chính xác! Nắm chắc mẹo nhé.'
                : isTimeout
                ? 'Hết giờ 30s! Xem ngay mẹo dưới đây:'
                : 'Chưa đúng! Học ngay mẹo nhớ câu này:'}
            </div>
            <div className="text-[11px] opacity-90 mt-0.5">
              Đáp án đúng: <span className="font-bold underline text-[#262320]">({question.correctAnswer}) {correctChoiceText}</span>
              {selectedAnswer && !isCorrect && (
                <span className="ml-1 text-rose-700">
                  (Bạn chọn: {selectedAnswer})
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CHEAT CODE / MẸO LÀM BÀI (Super short, golden keywords for weak English learners) */}
      <div className="p-3.5 rounded-xl bg-[#FFFDF5] border border-amber-200 shadow-2xs relative">
        <div className="flex items-center gap-1.5 text-amber-800 text-[11px] font-bold uppercase tracking-wider mb-1.5">
          <Lightbulb className="w-4 h-4 text-amber-600 fill-amber-500/20" />
          <span>Mẹo Nhận Biết Siêu Tốc (Gặp lại chọn ngay)</span>
        </div>

        <p className="text-xs font-medium text-[#4D3A18] leading-relaxed">
          {question.tip}
        </p>

        {question.keywords && question.keywords.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 mt-2 pt-2 border-t border-amber-100">
            <span className="text-[10px] text-[#7A6A55] flex items-center gap-1 font-medium">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Từ khóa:
            </span>
            {question.keywords.map((kw, idx) => (
              <span
                key={idx}
                className="px-1.5 py-0.5 rounded bg-amber-100/80 border border-amber-200/80 text-amber-900 font-mono text-[10px] font-semibold"
              >
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* CHI TIẾT GIẢI THÍCH & DỊCH NGHĨA */}
      <div className="p-3.5 rounded-xl bg-white border border-[#EFE8DE] shadow-2xs space-y-2">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#6B635B] uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          <span>Giải Thích & Dịch Câu</span>
        </div>

        <p className="text-xs text-[#4A423B] leading-relaxed">
          {question.explanation}
        </p>

        {question.vietnameseMeaning && (
          <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#EFE8DE] text-xs text-[#3E3730] italic">
            <strong className="text-[#6B635B] not-italic font-semibold mr-1">Dịch:</strong>
            "{question.vietnameseMeaning}"
          </div>
        )}
      </div>

      {/* Next Button - Large Thumb Target for Mobile */}
      <div className="pt-1">
        <button
          onClick={onNext}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm shadow-md shadow-amber-600/25 active:scale-[0.99] transition cursor-pointer"
        >
          <span>Câu Tiếp Theo</span>
          <ArrowRight className="w-4 h-4" />
          <span className="hidden sm:inline font-mono text-[10px] bg-white/20 px-1.5 py-0.5 rounded ml-1">
            Space
          </span>
        </button>
      </div>
    </div>
  );
};
