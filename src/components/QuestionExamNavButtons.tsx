import React from 'react';
import { useQuizStore } from '../store/useQuizStore';
import { resolveFullExamSetInfo } from '../data/examSetResolver';
import { BookOpen, CheckCircle2, Zap, Headphones, Layers } from 'lucide-react';

export interface QuestionExamNavButtonsProps {
  question: {
    id?: string;
    source?: string;
    num?: number;
    test?: number | string;
    book?: string;
  };
  variant?: 'pill' | 'card' | 'bar' | 'compact' | 'mini';
  className?: string;
  hidePractice?: boolean;
}

export const QuestionExamNavButtons: React.FC<QuestionExamNavButtonsProps> = ({
  question,
  variant = 'compact',
  className = '',
  hidePractice = false,
}) => {
  const { openFullExamSet, openFullAnswers, startPracticeExamSet, startListeningExamSet } = useQuizStore();

  const info = resolveFullExamSetInfo(question);
  const isListening = question.num !== undefined && question.num <= 100 && (info.lcTest !== undefined || Boolean((question as any).audioUrl));

  const handleOpenExamSet = (e: React.MouseEvent) => {
    e.stopPropagation();
    openFullExamSet({
      examSetId: info.examSetId,
      examSetName: info.examSetName,
      originId: question.id,
      questionNum: info.questionNum,
    });
  };

  const handleOpenAnswers = (e: React.MouseEvent) => {
    e.stopPropagation();
    openFullAnswers({
      book: info.book,
      test: info.test,
      questionNum: info.questionNum,
    });
  };

  const handlePracticeExamSet = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isListening) {
      startListeningExamSet(info.lcTest, info.questionNum);
    } else {
      startPracticeExamSet(info.rcSource, info.questionNum);
    }
  };

  // 1. Mini / Compact variant for tight spaces (headers, search result cards, passage sub-cards)
  if (variant === 'mini' || variant === 'compact') {
    return (
      <div className={`inline-flex flex-wrap items-center gap-1.5 ${className}`}>
        {/* Full Đề Button */}
        <button
          type="button"
          onClick={handleOpenExamSet}
          title={`Xem trọn bộ đề: ${info.examSetName} (${info.totalQuestions} câu)`}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-[11px] font-bold cursor-pointer transition-all hover:scale-102 active:scale-98 shadow-2xs"
        >
          <Layers className="w-3 h-3 text-sky-600 shrink-0" />
          <span className="truncate max-w-[170px]">{info.examSetName}</span>
        </button>

        {/* Full Đáp Án Button */}
        <button
          type="button"
          onClick={handleOpenAnswers}
          title={`Xem bảng đáp án trọn bộ của ${info.examSetName}`}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold cursor-pointer transition-all hover:scale-102 active:scale-98 shadow-2xs"
        >
          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
          <span>Full Đáp Án</span>
        </button>

        {/* Practice Full Set Button */}
        {!hidePractice && (
          <button
            type="button"
            onClick={handlePracticeExamSet}
            title={isListening ? `Luyện nghe trọn bộ ${info.examSetName}` : `Làm bài trọn bộ ${info.examSetName}`}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-bold cursor-pointer transition-all hover:scale-102 active:scale-98 shadow-2xs"
          >
            {isListening ? (
              <Headphones className="w-3 h-3 text-amber-600 shrink-0" />
            ) : (
              <Zap className="w-3 h-3 text-amber-600 shrink-0" />
            )}
            <span>{isListening ? 'Nghe Cả Đề' : 'Làm Cả Đề'}</span>
          </button>
        )}
      </div>
    );
  }

  // 2. Bar / Card variant (Flashcard header, Expanded Question Cards)
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {/* Full Đề Button */}
      <button
        type="button"
        onClick={handleOpenExamSet}
        title={`Mở danh sách trọn bộ đề: ${info.examSetName}`}
        className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-300 text-[12px] font-bold cursor-pointer transition-all shadow-2xs hover:shadow-xs"
      >
        <BookOpen className="w-3.5 h-3.5 text-sky-600 shrink-0" />
        <span className="truncate">Đề: {info.examSetName}</span>
      </button>

      {/* Full Đáp Án Button */}
      <button
        type="button"
        onClick={handleOpenAnswers}
        title={`Xem bảng đáp án trọn bộ của ${info.examSetName}`}
        className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold cursor-pointer transition-all shadow-2xs hover:shadow-xs"
      >
        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
        <span>Full Đáp Án ({info.totalQuestions} câu)</span>
      </button>

      {/* Practice Button */}
      {!hidePractice && (
        <button
          type="button"
          onClick={handlePracticeExamSet}
          title={isListening ? `Luyện nghe trọn bộ ${info.examSetName}` : `Luyện làm trọn bộ ${info.examSetName}`}
          className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-[12px] font-bold cursor-pointer transition-all shadow-2xs hover:shadow-xs"
        >
          {isListening ? (
            <Headphones className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <Zap className="w-3.5 h-3.5 shrink-0" />
          )}
          <span>{isListening ? 'Nghe Cả Đề' : 'Làm Cả Đề'}</span>
        </button>
      )}
    </div>
  );
};
