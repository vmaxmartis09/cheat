import React from 'react';
import { useQuizStore, AppTabId } from '../store/useQuizStore';
import {
  X,
  Zap,
  BookOpen,
  Headphones,
  SearchCheck,
  CheckCircle2,
  BarChart3,
  Check,
  Sparkles,
} from 'lucide-react';

interface TabCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TabCustomizerModal: React.FC<TabCustomizerModalProps> = ({ isOpen, onClose }) => {
  const { visibleTabs, toggleTabVisibility, setTabPreset } = useQuizStore();

  if (!isOpen) return null;

  const isFocusPreset =
    visibleTabs.search &&
    visibleTabs.answers &&
    !visibleTabs.practice &&
    !visibleTabs.listening;

  const isFullPreset =
    visibleTabs.search &&
    visibleTabs.answers &&
    visibleTabs.practice &&
    visibleTabs.listening &&
    visibleTabs.results;

  const tabsInfo: Array<{
    id: AppTabId;
    title: string;
    desc: string;
    icon: React.ElementType;
    color: string;
  }> = [
    {
      id: 'search',
      title: 'Tra Cứu (Tìm Nhanh)',
      desc: 'Tìm câu hỏi, từ khóa, transcript, giải thích, OCR ảnh',
      icon: SearchCheck,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      id: 'answers',
      title: 'Full Đáp Án (Bảng Nén 200 Câu)',
      desc: 'Bảng nén 1 màn hình 10x10, tra đáp án nhanh trong 0.05s',
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      id: 'practice',
      title: 'Ôn Đọc (Flashcard Reading)',
      desc: 'Luyện làm đề Reading theo từng câu / bài đọc',
      icon: BookOpen,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      id: 'listening',
      title: 'Luyện Nghe (Listening LC)',
      desc: 'Luyện nghe Hacker 2 LC Tests 1-10 kèm audio & transcript',
      icon: Headphones,
      color: 'text-sky-600 bg-sky-50 border-sky-200',
    },
    {
      id: 'results',
      title: 'Kết Quả & Cài Đặt',
      desc: 'Xem tiến độ học tập, câu sai cần ôn và tuỳ biến ứng dụng',
      icon: BarChart3,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF7F2] w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl border border-[#E8DFD3] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-white border-b border-[#EFE8DE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-[#262320]">
                Tuỳ Biến Số Lượng Tab Hiển Thị
              </h2>
              <p className="text-[11px] text-[#8C8276]">
                Ẩn bớt tab ít dùng để thanh bar gọn gàng, bấm nhanh hơn
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#FAF7F2] hover:bg-gray-100 text-[#8C8276] cursor-pointer transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Presets */}
        <div className="p-3 bg-[#F5EFE6] border-b border-[#E8DFD3] space-y-2">
          <span className="text-[10px] font-black uppercase text-[#8C8276] tracking-wider">
            Chọn nhanh cấu hình đề xuất:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setTabPreset('focus_lookup')}
              className={`p-2.5 rounded-xl text-left border transition cursor-pointer flex flex-col gap-1 ${
                isFocusPreset
                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs font-black'
                  : 'bg-white text-[#4A423B] border-[#E8DFD3] hover:border-amber-400'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-extrabold">
                <Zap className="w-3.5 h-3.5" />
                <span>Focus Tra Cứu (3 Tab)</span>
              </div>
              <p className={`text-[10.5px] leading-tight ${isFocusPreset ? 'text-amber-100' : 'text-[#8C8276]'}`}>
                Ẩn Ôn Đọc & Nghe, chỉ hiện Tra Cứu + Full Đáp Án
              </p>
            </button>

            <button
              onClick={() => setTabPreset('all')}
              className={`p-2.5 rounded-xl text-left border transition cursor-pointer flex flex-col gap-1 ${
                isFullPreset
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs font-black'
                  : 'bg-white text-[#4A423B] border-[#E8DFD3] hover:border-emerald-400'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-extrabold">
                <Check className="w-3.5 h-3.5" />
                <span>Hiện Cả 5 Tab</span>
              </div>
              <p className={`text-[10.5px] leading-tight ${isFullPreset ? 'text-emerald-100' : 'text-[#8C8276]'}`}>
                Hiện đầy đủ Ôn Đọc, Luyện Nghe, Tra Cứu, Đáp Án
              </p>
            </button>
          </div>
        </div>

        {/* Tab Checkboxes List */}
        <div className="p-3 overflow-y-auto space-y-2 flex-1">
          <span className="text-[10px] font-black uppercase text-[#8C8276] tracking-wider px-1">
            Bật / Tắt từng tab riêng lẻ:
          </span>
          <div className="space-y-1.5">
            {tabsInfo.map((tab) => {
              const isChecked = visibleTabs[tab.id];
              const Icon = tab.icon;

              return (
                <div
                  key={tab.id}
                  onClick={() => toggleTabVisibility(tab.id)}
                  className={`flex items-center justify-between p-2.5 rounded-2xl border transition cursor-pointer select-none ${
                    isChecked
                      ? 'bg-white border-amber-300 shadow-2xs'
                      : 'bg-[#F2ECE3]/70 border-[#E5DDD2] opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${tab.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-extrabold text-[#262320]">
                        {tab.title}
                      </div>
                      <div className="text-[11px] text-[#7A7065] truncate">
                        {tab.desc}
                      </div>
                    </div>
                  </div>

                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition shrink-0 ${
                    isChecked
                      ? 'bg-amber-500 border-amber-600 text-white'
                      : 'bg-white border-[#DCD3C7] text-transparent'
                  }`}>
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-[#EFE8DE] flex items-center justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-xs transition cursor-pointer"
          >
            Hoàn tất & Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
