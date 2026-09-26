import React from 'react';
import { useQuizStore } from '../store/useQuizStore';
import {
  Flame,
  Layers,
  BookOpen,
  Shuffle,
  AlertCircle,
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'practice' | 'results';
  onSwitchToPracticeAll: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSwitchToPracticeAll }) => {
  const {
    mode,
    setMode,
    sourceFilter,
    setSourceFilter,
    currentStreak,
    savedMistakeIds,
  } = useQuizStore();

  return (
    <header className="px-3.5 py-2 border-b border-[#EFE8DE] bg-[#FAF7F2]/95 backdrop-blur-md shrink-0">
      <div className="flex items-center justify-between gap-1.5 max-w-md mx-auto">
        {/* Brand & Source Selector */}
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-black text-xs shadow-2xs">
            T
          </div>
          {activeTab === 'practice' ? (
            <div className="relative">
              <select
                value={sourceFilter}
                aria-label="Chọn bộ đề"
                onChange={(e) => setSourceFilter(e.target.value)}
                className="appearance-none bg-white border border-[#E8DFD3] text-[#262320] text-xs font-semibold rounded-lg pl-2 pr-5 py-1 focus:outline-none focus:border-amber-500 cursor-pointer shadow-2xs"
              >
                <option value="all">Tất cả đề (113 câu)</option>
                <option value="ToIce 2">ToIce 2 Part 5 (40 câu)</option>
                <option value="Test 2 Part 5">Test 2 Part 5 (40 câu)</option>
                <option value="Part 6 Đọc Điền">Part 6 Điền từ (15 câu)</option>
                <option value="Part 7 Đoạn Văn">Part 7 Bài đọc (18 câu)</option>
                <option value="passages">Chỉ bài đọc đoạn văn (33 câu)</option>
              </select>
              <Layers className="w-2.5 h-2.5 text-[#8C8276] absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          ) : (
            <span className="font-bold text-xs text-[#262320]">
              Kết Quả & Ôn Lỗi Sai
            </span>
          )}
        </div>

        {/* Right side controls for Practice tab */}
        {activeTab === 'practice' ? (
          <div className="flex items-center gap-1">
            {mode === 'wrong_only' ? (
              <div className="flex items-center gap-1">
                <span className="px-2 py-0.5 rounded-md bg-rose-100 border border-rose-200 text-rose-800 text-[10px] font-bold flex items-center gap-0.5">
                  <AlertCircle className="w-3 h-3 text-rose-600" />
                  Đang ôn câu sai ({savedMistakeIds.length})
                </span>
                <button
                  onClick={onSwitchToPracticeAll}
                  className="text-[10px] text-amber-800 underline font-semibold px-1 py-0.5 hover:text-amber-950"
                  title="Thoát ôn câu sai và luyện toàn bộ đề"
                >
                  Thoát
                </button>
              </div>
            ) : (
              <div className="flex items-center bg-[#F0EAE1] p-0.5 rounded-lg border border-[#E5DDD2] text-[10px] font-semibold">
                <button
                  onClick={() => setMode('sequential')}
                  className={`px-2 py-0.5 rounded-md transition cursor-pointer ${
                    mode === 'sequential'
                      ? 'bg-white text-amber-900 shadow-2xs font-bold'
                      : 'text-[#6B635B] hover:text-[#262320]'
                  }`}
                  title="Tuần tự theo đề"
                >
                  <BookOpen className="w-3 h-3 inline mr-0.5" />
                  <span>Tuần tự</span>
                </button>

                <button
                  onClick={() => setMode('random')}
                  className={`px-2 py-0.5 rounded-md transition cursor-pointer ${
                    mode === 'random'
                      ? 'bg-white text-amber-900 shadow-2xs font-bold'
                      : 'text-[#6B635B] hover:text-[#262320]'
                  }`}
                  title="Xáo trộn ngẫu nhiên"
                >
                  <Shuffle className="w-3 h-3 inline mr-0.5" />
                  <span>Xáo trộn</span>
                </button>
              </div>
            )}

            {/* Streak */}
            {currentStreak > 1 && (
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-100 border border-amber-200 rounded-md text-amber-800 text-[10px] font-bold">
                <Flame className="w-3 h-3 text-amber-600 fill-amber-500" />
                <span>{currentStreak}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            {savedMistakeIds.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                {savedMistakeIds.length} câu sai
              </span>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
