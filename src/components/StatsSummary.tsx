import React, { useEffect } from 'react';
import { useQuizStore } from '../store/useQuizStore';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Shuffle, Award, BarChart3 } from 'lucide-react';

interface StatsSummaryProps {
  onGoToResultsTab: () => void;
}

export const StatsSummary: React.FC<StatsSummaryProps> = ({ onGoToResultsTab }) => {
  const {
    questions,
    sessionCorrect,
    bestStreak,
    restartSession,
    initSession,
    savedMistakeIds,
  } = useQuizStore();

  const total = questions.length;
  const accuracy = total > 0 ? Math.round((sessionCorrect / total) * 100) : 0;

  useEffect(() => {
    if (accuracy >= 70) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D97706', '#F59E0B', '#10B981', '#6366F1', '#EC4899'],
      });
    }
  }, [accuracy]);

  return (
    <div className="flashcard-appear bg-white border border-[#EFE8DE] rounded-2xl p-4 sm:p-5 text-center shadow-sm shadow-amber-950/5 space-y-3 max-w-md w-full mx-auto">
      <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100/80 border border-amber-200 flex items-center justify-center text-amber-800 shadow-2xs">
        {accuracy >= 80 ? (
          <Trophy className="w-6 h-6 text-amber-600" />
        ) : (
          <Award className="w-6 h-6 text-amber-600" />
        )}
      </div>

      <div>
        <h2 className="text-base font-bold text-[#262320] tracking-tight">
          Hoàn Thành Đợt Luyện!
        </h2>
        <p className="text-[11px] text-[#8C8276]">
          Kết quả đã được tự động lưu vào tab Kết quả
        </p>
      </div>

      {/* Accuracy Badge */}
      <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] flex items-center justify-around">
        <div>
          <div className="text-xl font-extrabold text-amber-800 font-mono">
            {accuracy}%
          </div>
          <div className="text-[10px] text-[#8C8276] font-medium">Độ chính xác</div>
        </div>

        <div className="h-8 w-px bg-[#E5DDD2]" />

        <div>
          <div className="text-lg font-bold text-emerald-800 font-mono">
            {sessionCorrect} / {total}
          </div>
          <div className="text-[10px] text-[#8C8276] font-medium">Số câu đúng</div>
        </div>

        <div className="h-8 w-px bg-[#E5DDD2]" />

        <div>
          <div className="text-lg font-bold text-amber-700 font-mono">
            {bestStreak}
          </div>
          <div className="text-[10px] text-[#8C8276] font-medium">Chuỗi đúng</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-1.5 pt-1">
        <button
          onClick={() => restartSession()}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white border border-[#E8DFD3] hover:bg-[#FDFBF7] text-[#262320] text-xs font-bold transition shadow-2xs cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Luyện lại từ đầu</span>
        </button>

        <button
          onClick={() => initSession('random')}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-bold transition shadow-md shadow-amber-600/20 cursor-pointer"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Xáo trộn Ngẫu nhiên</span>
        </button>

        <button
          onClick={onGoToResultsTab}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold transition cursor-pointer"
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Xem Kết Quả & Ôn Lại Câu Sai ({savedMistakeIds.length})</span>
        </button>
      </div>
    </div>
  );
};
