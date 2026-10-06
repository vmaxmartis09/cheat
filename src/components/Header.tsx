import React from 'react';
import { useQuizStore } from '../store/useQuizStore';
import {
  Flame,
  Layers,
  BookOpen,
  Shuffle,
  AlertCircle,
  Headphones,
  Cloud,
  Database,
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'practice' | 'listening' | 'results' | 'search';
  onSwitchToPracticeAll: () => void;
  onOpenSyncModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSwitchToPracticeAll,
  onOpenSyncModal,
}) => {
  const {
    mode,
    setMode,
    sourceFilter,
    setSourceFilter,
    currentStreak,
    savedMistakeIds,
    questions,
    currentIndex,
    isFinished,
    userPasskey,
    isLoggedIn,
    syncStatus,
    syncMethod,
  } = useQuizStore();

  const currentQ = questions[currentIndex];
  const isPassageView = activeTab === 'practice' && !isFinished && Boolean(currentQ?.isPassageQuestion && currentQ?.passageInfo);

  return (
    <header className="px-3.5 py-2 border-b border-[#EFE8DE] bg-[#FAF7F2]/95 backdrop-blur-md shrink-0">
      <div className={`flex items-center justify-between gap-1.5 mx-auto transition-all duration-200 ${
        isPassageView ? 'max-w-7xl' : 'max-w-2xl'
      }`}>
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
                className="appearance-none bg-white border border-[#E8DFD3] text-[#262320] text-xs font-semibold rounded-lg pl-2 pr-6 py-1 focus:outline-none focus:border-amber-500 cursor-pointer shadow-2xs max-w-[270px] truncate"
              >
                <optgroup label="⭐ GIAI ĐOẠN 1: DOCS 1 (BẮT BUỘC HỌC THUỘC)">
                  <option value="stage_1">⭐ Trọn bộ Docs 1 (151 câu Bắt Buộc)</option>
                  <option value="ToIce 2">Docs 1: ToIce 2 (#101-165)</option>
                  <option value="Test 2 Full">Docs 1: Test 2 Full 100 câu (#101-200)</option>
                  <option value="Test 2 Part 5">Docs 1: Test 2 Part 5 (#101-140)</option>
                  <option value="Part 6 Đọc Điền">Docs 1: Part 6 Đọc Điền (15 câu)</option>
                  <option value="Part 7 Đoạn Văn">Docs 1: Part 7 Đọc Hiểu (56 câu)</option>
                </optgroup>
                <optgroup label="🚀 GIAI ĐOẠN 2: DOCS 2 (TRỌN BỘ 234 CÂU READING)">
                  <option value="stage_2">🚀 Trọn bộ Docs 2 (Tất cả 234 câu Reading)</option>
                  <option value="Docs 2 - Đề 1 Full">Docs 2: Trọn bộ Đề 1 (Trial Test - 100 câu)</option>
                  <option value="Docs 2 - Đề 2 YBM Full">Docs 2: Trọn bộ Đề 2 (YBM Test 1 - 100 câu)</option>
                  <option value="Docs 2 - Chuyên đề Tips">Docs 2: Chuyên đề & Rèn Tips (34 câu)</option>
                  <option value="Docs 2 - Part 5 All">Docs 2: Toàn bộ Part 5 (66 câu)</option>
                  <option value="Docs 2 - Part 6 All">Docs 2: Toàn bộ Part 6 (44 câu)</option>
                </optgroup>
                <optgroup label="🔥 GIAI ĐOẠN 3: DOCS 3 (ĐỀ THI TMA ONLINE & HACKERS)">
                  <option value="stage_3">🔥 Trọn bộ Docs 3 (Tất cả 81 câu Reading)</option>
                  <option value="Docs 3 - Đề TMA Online Full">Docs 3: Đề TMA Online Full (70 câu)</option>
                  <option value="Docs 3 - Đề TMA Online Part 5">Docs 3: TMA Online Part 5 (28 câu)</option>
                  <option value="Docs 3 - Đề TMA Online Part 6">Docs 3: TMA Online Part 6 (16 câu)</option>
                  <option value="Docs 3 - Đề TMA Online Part 7">Docs 3: TMA Online Part 7 (26 câu)</option>
                  <option value="Docs 3 - Hackers Reading">Docs 3: Hackers Reading (11 câu)</option>
                </optgroup>
                <optgroup label="💎 GIAI ĐOẠN 4: DOCS 4 (HACKER TOEIC 3 & 2)">
                  <option value="stage_4">💎 Trọn bộ Docs 4 (Hacker 3 Test 1 - 100 câu)</option>
                  <option value="Docs 4 - Hacker 3 Test 1 Full">Docs 4: Hacker 3 Test 1 Full (100 câu)</option>
                  <option value="Docs 4 - Hacker 3 Test 1 Part 5">Docs 4: Hacker 3 Test 1 Part 5 (30 câu)</option>
                  <option value="Docs 4 - Hacker 3 Test 1 Part 6">Docs 4: Hacker 3 Test 1 Part 6 (16 câu)</option>
                  <option value="Docs 4 - Hacker 3 Test 1 Part 7">Docs 4: Hacker 3 Test 1 Part 7 (54 câu)</option>
                </optgroup>
                <optgroup label="📚 TOÀN BỘ KHO ĐỀ">
                  <option value="all_both_stages">Tất cả đề Docs 1, Docs 2, Docs 3 & Docs 4 (566 câu)</option>
                </optgroup>
              </select>
              <Layers className="w-2.5 h-2.5 text-[#8C8276] absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          ) : activeTab === 'listening' ? (
            <span className="font-bold text-xs text-[#262320] flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-amber-600" />
              Luyện Nghe TOEIC (100 câu LC)
            </span>
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

        {/* Global Cloud Sync Button */}
        <button
          onClick={onOpenSyncModal}
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white border border-[#E8DFD3] hover:border-amber-400 text-xs font-bold text-[#4A4238] shadow-2xs transition cursor-pointer"
          title={syncMethod === 'supabase' ? 'Đang lưu trực tiếp vào Supabase' : 'Đồng bộ tiến trình đa thiết bị (Passkey: vmax0109)'}
        >
          {syncMethod === 'supabase' ? (
            <Database className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <Cloud
              className={`w-3.5 h-3.5 ${
                syncStatus === 'syncing'
                  ? 'text-amber-600 animate-spin'
                  : syncStatus === 'synced'
                  ? 'text-emerald-600'
                  : syncStatus === 'error'
                  ? 'text-rose-600'
                  : 'text-amber-700'
              }`}
            />
          )}
          <span className="hidden sm:inline font-mono text-[11px] text-[#262320]">
            {syncMethod === 'supabase' ? 'Supabase' : isLoggedIn ? userPasskey || 'vmax0109' : 'Đồng bộ'}
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              syncStatus === 'syncing'
                ? 'bg-amber-500 animate-pulse'
                : syncStatus === 'error'
                ? 'bg-rose-500'
                : 'bg-emerald-500'
            }`}
          />
        </button>
      </div>
    </header>
  );
};
