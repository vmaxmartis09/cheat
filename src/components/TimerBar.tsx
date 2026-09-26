import React, { useEffect } from 'react';
import { useQuizStore } from '../store/useQuizStore';
import { Clock, AlertTriangle, BookOpen } from 'lucide-react';

export const TimerBar: React.FC = () => {
  const { timeLeft, timerActive, isAnswered, tickTimer, questions, currentIndex } = useQuizStore();
  const currentQ = questions[currentIndex];

  useEffect(() => {
    if (!timerActive || isAnswered || currentQ?.isPassageQuestion) return;

    const interval = setInterval(() => {
      tickTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, isAnswered, tickTimer, currentQ]);

  if (currentQ?.isPassageQuestion) {
    return (
      <div className="flex items-center justify-between px-2.5 py-1 rounded-lg bg-amber-50/80 border border-amber-200/70 text-[11px] text-amber-900 shadow-2xs">
        <span className="flex items-center gap-1.5 font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          <span>Bài đọc đoạn văn: Không đếm giờ</span>
        </span>
        <span className="text-[10px] text-amber-700 font-medium">Thong thả tìm manh mối</span>
      </div>
    );
  }

  const percentage = Math.max(0, Math.min(100, (timeLeft / 30) * 100));

  const getColorClass = () => {
    if (timeLeft <= 5) return 'bg-rose-500 shadow-rose-500/20';
    if (timeLeft <= 10) return 'bg-amber-500 shadow-amber-500/20';
    return 'bg-amber-600 shadow-amber-600/20';
  };

  const getTextColorClass = () => {
    if (timeLeft <= 5) return 'text-rose-600 font-bold animate-pulse';
    if (timeLeft <= 10) return 'text-amber-700 font-semibold';
    return 'text-[#6B635B]';
  };

  return (
    <div className="w-full space-y-1">
      <div className="flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-[#6B635B]">
          <Clock className={`w-3.5 h-3.5 ${timeLeft <= 5 ? 'text-rose-500 animate-spin' : 'text-[#8C8276]'}`} />
          <span className="font-medium">Thời gian:</span>
        </div>
        <div className={`flex items-center gap-1 font-mono ${getTextColorClass()}`}>
          {timeLeft <= 5 && <AlertTriangle className="w-3 h-3 text-rose-500" />}
          <span>{timeLeft}s / 30s</span>
        </div>
      </div>

      <div className="w-full h-1.5 bg-[#EFE8DE] rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-linear rounded-full shadow-2xs ${getColorClass()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
