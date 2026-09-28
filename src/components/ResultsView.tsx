import React, { useState } from 'react';
import { useQuizStore } from '../store/useQuizStore';
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Edit3,
  Calendar,
  Clock,
  BookOpen,
} from 'lucide-react';

interface ResultsViewProps {
  onGoToPracticeMistakes: () => void;
  onGoToPracticeDifficult: () => void;
  onGoToPracticeAll: () => void;
  onGoToDocs2?: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  onGoToPracticeMistakes,
  onGoToPracticeDifficult,
  onGoToPracticeAll,
  onGoToDocs2,
}) => {
  const { dailyLogs, savedMistakeIds, questionProgress, updateTodayNotes } = useQuizStore();

  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  const currentLog = dailyLogs[selectedDate] || {
    date: selectedDate,
    totalAnswered: 0,
    correctCount: 0,
    wrongCount: 0,
    timeoutCount: 0,
    mistakes: [],
    notes: '',
    lastUpdated: Date.now(),
  };

  const [notesInput, setNotesInput] = useState<string>(currentLog.notes || '');

  React.useEffect(() => {
    setNotesInput(currentLog.notes || '');
  }, [selectedDate, currentLog.notes]);

  const datesList = Object.keys(dailyLogs).sort().reverse();
  if (!datesList.includes(todayStr)) {
    datesList.unshift(todayStr);
  }

  const accuracy =
    currentLog.totalAnswered > 0
      ? Math.round((currentLog.correctCount / currentLog.totalAnswered) * 100)
      : 0;

  const handleSaveNotes = () => {
    updateTodayNotes(notesInput);
  };

  const difficultList = Object.values(questionProgress || {}).filter((p) => p.wrongCount >= 2);

  return (
    <div className="flex-1 flex flex-col space-y-3.5 max-w-md w-full mx-auto pb-4">
      {/* 1. MỤC ÔN LẠI NHỮNG CÂU SAI (ĐƯỢC ĐẶT NỔI BẬT NHẤT TRÊN ĐẦU) */}
      <div className="bg-white border-2 border-rose-200 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#262320]">
                Mục Ôn Lại Những Câu Sai
              </h2>
              <p className="text-[11px] text-[#8C8276]">
                Khắc phục điểm yếu để không lặp lại lỗi
              </p>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-rose-100 border border-rose-200 text-rose-800 text-xs font-bold font-mono">
            {savedMistakeIds.length} câu
          </span>
        </div>

        {savedMistakeIds.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs text-[#52443C] leading-snug">
              Bạn có <strong>{savedMistakeIds.length}</strong> câu trả lời sai cần củng cố lại ngay.
            </p>
            <button
              onClick={onGoToPracticeMistakes}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs shadow-md shadow-rose-600/20 active:scale-[0.99] transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Bấm Vào Đây Để Ôn {savedMistakeIds.length} Câu Sai Ngay</span>
            </button>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] text-center space-y-2">
            <p className="text-xs text-emerald-800 font-semibold">
              🎉 Tuyệt vời! Hiện tại bạn không có câu sai nào trong danh sách.
            </p>
            <button
              onClick={onGoToPracticeAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Tiếp tục luyện đề mới</span>
            </button>
          </div>
        )}
      </div>

      {/* 1.1 LỜI NHẮC DỊU DÀNG: CÁC CÂU ĐÃ SAI >= 2 LẦN */}
      {difficultList.length > 0 && (
        <div className="bg-gradient-to-br from-amber-50/90 to-[#FFFDF8] border-2 border-amber-300/80 rounded-2xl p-4 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 text-base">
                🌱
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-950">
                  Câu Cần Lưu Ý (Đã Nhầm ≥ 2 Lần)
                </h3>
                <p className="text-[11px] text-amber-800/90">
                  Nhắc lại dịu dàng — không áp lực, giúp củng cố phản xạ
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-200/80 border border-amber-300 text-amber-950 text-xs font-bold font-mono">
              {difficultList.length} câu
            </span>
          </div>

          <p className="text-xs text-[#52443C] leading-snug">
            Có <strong>{difficultList.length} câu</strong> bạn từng băn khoăn từ 2 lần trở lên. Ôn lại vài lần với mẹo vàng là bạn sẽ tự tin ngay!
          </p>

          <button
            onClick={onGoToPracticeDifficult}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs shadow-md shadow-amber-600/20 active:scale-[0.99] transition cursor-pointer"
          >
            <span>🌱 Ôn Lại {difficultList.length} Câu Hay Nhầm Này Ngay</span>
          </button>
        </div>
      )}

      {/* 1.2 TIẾN HÀNH GIAI ĐOẠN 2: DOCS 2 */}
      {onGoToDocs2 && (
        <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/90 to-purple-50/90 border-2 border-indigo-200/90 rounded-2xl p-4 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 text-base">
                🚀
              </div>
              <div>
                <h3 className="text-sm font-bold text-indigo-950">
                  Giai Đoạn 2: Docs 2 (Nâng Cao & Luyện Đề)
                </h3>
                <p className="text-[11px] text-indigo-800/90">
                  100 câu Reading Test (Part 5, 6, 7) — Đầy đủ mẹo & học theo dạng
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-indigo-200/80 border border-indigo-300 text-indigo-950 text-xs font-bold font-mono">
              100 câu
            </span>
          </div>

          <p className="text-xs text-[#4338CA] leading-snug">
            Sau khi học thuộc các câu ở Docs 1, bạn hãy tiến hành làm <strong>Docs 2</strong>. Hệ thống tự động xếp liền kề các dạng câu giống nhau và tạo câu đồng dạng khi làm đúng!
          </p>

          <button
            onClick={onGoToDocs2}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 active:scale-[0.99] transition cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>🚀 Bấm Vào Đây Để Tiến Hành Docs 2 Ngay</span>
          </button>
        </div>
      )}

      {/* YÊN TÂM LUYỆN TẬP QUA CÁC NGÀY */}
      <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] flex items-start gap-2 text-xs text-[#5A5046]">
        <span className="text-base shrink-0 mt-0.5">☀️</span>
        <p className="leading-relaxed">
          <strong>Yên tâm luyện tập:</strong> Sang ngày hôm sau bạn vẫn có thể ôn luyện lại toàn bộ câu hỏi (kể cả câu đã làm đúng hoặc sai hôm nay), hệ thống không khóa hay bỏ qua bất kỳ câu nào nhé!
        </p>
      </div>

      {/* 2. BẢNG THỐNG KÊ KẾT QUẢ THEO NGÀY */}
      <div className="bg-white border border-[#EFE8DE] rounded-2xl p-3.5 shadow-2xs space-y-3">
        {/* Date Selector Tabs */}
        <div className="flex items-center justify-between gap-1 pb-1 border-b border-[#F0EAE1]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#262320]">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>Kết quả học theo ngày:</span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {datesList.slice(0, 3).map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDate(d)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition ${
                  selectedDate === d
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-[#FAF7F2] text-[#6B635B] border border-[#E8DFD3]'
                }`}
              >
                {d === todayStr ? 'Hôm nay' : d.slice(5)}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-4 gap-1.5 text-center">
          <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE]">
            <div className="text-[10px] text-[#8C8276] font-medium">Đã làm</div>
            <div className="text-base font-extrabold text-[#262320] font-mono mt-0.5">
              {currentLog.totalAnswered}
            </div>
          </div>

          <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="text-[10px] text-emerald-800 font-semibold flex items-center justify-center gap-0.5">
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>Đúng</span>
            </div>
            <div className="text-base font-extrabold text-emerald-800 font-mono mt-0.5">
              {currentLog.correctCount}
            </div>
          </div>

          <div className="p-2 rounded-xl bg-rose-50 border border-rose-200">
            <div className="text-[10px] text-rose-800 font-semibold flex items-center justify-center gap-0.5">
              <XCircle className="w-2.5 h-2.5" />
              <span>Sai</span>
            </div>
            <div className="text-base font-extrabold text-rose-800 font-mono mt-0.5">
              {currentLog.wrongCount}
            </div>
          </div>

          <div className="p-2 rounded-xl bg-amber-50 border border-amber-200">
            <div className="text-[10px] text-amber-900 font-semibold flex items-center justify-center gap-0.5">
              <TrendingUp className="w-2.5 h-2.5" />
              <span>Tỉ lệ</span>
            </div>
            <div className="text-base font-extrabold text-amber-900 font-mono mt-0.5">
              {accuracy}%
            </div>
          </div>
        </div>

        {/* Section: Daily Improvement Notes */}
        <div className="pt-1 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-900">
              <Edit3 className="w-3.5 h-3.5 text-amber-700" />
              <span>Hôm nay tôi đã học được gì & cải thiện gì?</span>
            </div>
            <span className="text-[9px] text-[#8C8276]">Tự lưu</span>
          </div>

          <textarea
            value={notesInput}
            onChange={(e) => {
              setNotesInput(e.target.value);
              if (selectedDate === todayStr) {
                updateTodayNotes(e.target.value);
              }
            }}
            onBlur={handleSaveNotes}
            placeholder="Ghi lại các mẹo vàng hôm nay bạn vừa ghi nhớ (ví dụ: 'Thấy management chọn under, after require cần Danh từ, Since + V-ing...')"
            rows={2}
            className="w-full bg-[#FAF7F2] border border-[#E8DFD3] rounded-lg p-2 text-xs text-[#262320] placeholder-[#9E948A] focus:outline-none focus:border-amber-500 transition resize-none leading-snug"
          />
        </div>
      </div>

      {/* 3. CHI TIẾT CÁC LỖI SAI TRONG NGÀY (CÓ SẴN ĐÁP ÁN ĐÚNG & MẸO VÀNG) */}
      <div className="bg-white border border-[#EFE8DE] rounded-2xl p-3.5 shadow-2xs space-y-2.5">
        <h3 className="text-xs font-bold text-[#262320] flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>Chi Tiết Lỗi Sai Ngày {selectedDate === todayStr ? 'Hôm Nay' : selectedDate}</span>
          </span>
          <span className="text-[10px] text-[#8C8276] font-normal">
            ({currentLog.mistakes.length} câu)
          </span>
        </h3>

        {currentLog.mistakes.length === 0 ? (
          <div className="p-3 rounded-xl bg-[#FAF7F2] text-center text-xs text-[#8C8276]">
            Không có câu sai nào được ghi nhận trong ngày này.
          </div>
        ) : (
          <div className="space-y-2">
            {currentLog.mistakes.map((m, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] space-y-1 text-xs"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#262320]">
                      Câu #{m.questionNum}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-500 text-white font-bold text-[9px] shadow-2xs">
                      ⭐ Bắt buộc học thuộc
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {m.userChoice === 'TIMEOUT' ? (
                      <span className="text-amber-800 font-semibold flex items-center gap-0.5 text-[10px]">
                        <Clock className="w-3 h-3" /> Hết 30s
                      </span>
                    ) : (
                      <span className="text-rose-700 text-[10px]">
                        Bạn chọn: <strong>{m.userChoice}</strong>
                      </span>
                    )}
                    <span className="text-emerald-800 font-bold text-[10px] bg-emerald-100 px-1 py-0.2 rounded">
                      Đúng: {m.correctAnswer}
                    </span>
                  </div>
                </div>

                <p className="text-[#4A423B] text-[11px] leading-snug">
                  {m.questionText}
                </p>

                <div className="p-1.5 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-[10.5px] flex items-start gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                  <span>{m.tip}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
