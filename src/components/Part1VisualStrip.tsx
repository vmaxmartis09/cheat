import React, { useState } from 'react';
import { getPart1PhotosForTest, Part1PhotoItem } from '../data/part1VisualIndex';
import { ImageIcon, ChevronDown, ChevronUp, ZoomIn, X, Table, Headphones } from 'lucide-react';
import { useQuizStore } from '../store/useQuizStore';

interface Part1VisualStripProps {
  bookId: string;
  testNum: string | number;
  title?: string;
  className?: string;
  initialExpanded?: boolean;
  onSelectQuestion?: (num: number) => void;
}

export const Part1VisualStrip: React.FC<Part1VisualStripProps> = ({
  bookId,
  testNum,
  title,
  className = '',
  initialExpanded = true,
  onSelectQuestion,
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [lightboxPhoto, setLightboxPhoto] = useState<Part1PhotoItem | null>(null);

  const photos = getPart1PhotosForTest(bookId, String(testNum));

  if (!photos || photos.length === 0) {
    return null;
  }

  const handleOpenAnswers = () => {
    useQuizStore.getState().openFullAnswers({
      book: bookId,
      test: String(testNum),
    });
  };

  return (
    <div
      className={`rounded-2xl border border-sky-200/80 bg-gradient-to-r from-sky-50/70 via-white to-sky-50/50 p-2.5 sm:p-3 shadow-2xs transition-all ${className}`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 pb-1.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-sky-600 text-white shadow-2xs">
            <ImageIcon className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-[12px] font-extrabold text-[#262320] flex items-center gap-1.5">
              <span>{title || `6 Hình Nhận Diện Đề (Part 1: Câu 1–${photos.length})`}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-sky-100 text-sky-800 border border-sky-200">
                {photos.length} hình
              </span>
            </h4>
            <p className="text-[10px] text-[#8C8276] hidden sm:block">
              Nhìn 6 ảnh này để nhận diện ngay bạn đang làm đề nào trong phòng thi hoặc trên giấy
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleOpenAnswers}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10.5px] font-bold shadow-2xs transition cursor-pointer"
            title="Mở Bảng Nén 200 Đáp Án Của Đề Này"
          >
            <Table className="w-3 h-3" />
            <span className="hidden sm:inline">Đáp Án 200 Câu</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg border border-sky-200 text-sky-800 bg-white hover:bg-sky-100/70 text-[11px] font-bold transition cursor-pointer"
          >
            {isExpanded ? (
              <>
                <span className="hidden sm:inline">Thu gọn</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Hiện 6 hình</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* 6 Photos Grid */}
      {isExpanded && (
        <div className="mt-1.5 grid grid-cols-3 sm:grid-cols-6 gap-2 animate-in fade-in duration-200">
          {photos.map((photo) => (
            <div
              key={photo.qNum}
              className="group relative rounded-xl border border-sky-200/90 bg-white p-1 hover:border-sky-500 hover:shadow-xs transition flex flex-col justify-between"
            >
              {/* Question Number Badge */}
              <div className="flex items-center justify-between pb-0.5 px-0.5">
                <span className="text-[10px] font-mono font-extrabold text-sky-900 bg-sky-100 px-1.5 py-0.2 rounded">
                  #{photo.qNum}
                </span>
                <button
                  onClick={() => setLightboxPhoto(photo)}
                  className="text-gray-400 hover:text-sky-700 transition"
                  title="Phóng to ảnh"
                >
                  <ZoomIn className="w-3 h-3" />
                </button>
              </div>

              {/* Photo Image */}
              <div
                className="relative overflow-hidden rounded-lg bg-gray-50 aspect-4/3 cursor-pointer"
                onClick={() => {
                  if (onSelectQuestion) {
                    onSelectQuestion(photo.qNum);
                  } else {
                    setLightboxPhoto(photo);
                  }
                }}
              >
                <img
                  src={photo.imageUrl}
                  alt={`Part 1 Photo #${photo.qNum}`}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
              </div>

              {/* Quick jump */}
              {onSelectQuestion && (
                <button
                  onClick={() => onSelectQuestion(photo.qNum)}
                  className="mt-1 w-full py-0.5 text-[9.5px] font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 rounded transition text-center cursor-pointer"
                >
                  Xem câu #{photo.qNum}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Zoom Modal */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-xs animate-in fade-in"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-4 max-w-lg w-full space-y-3 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-extrabold text-sm text-[#262320] flex items-center gap-1.5">
                <Headphones className="w-4 h-4 text-sky-600" />
                Hình ảnh Part 1 — Câu #{lightboxPhoto.qNum} ({bookId} • Đề #{testNum})
              </span>
              <button
                onClick={() => setLightboxPhoto(null)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-2xl p-2 border border-gray-200 flex items-center justify-center max-h-[70vh] overflow-hidden">
              <img
                src={lightboxPhoto.imageUrl}
                alt={`Part 1 Photo #${lightboxPhoto.qNum}`}
                className="max-h-[65vh] w-auto object-contain rounded-xl shadow-xs"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                onClick={handleOpenAnswers}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition flex items-center gap-1 cursor-pointer"
              >
                <Table className="w-3.5 h-3.5" />
                <span>Xem Bảng Full 200 Đáp Án Của Đề</span>
              </button>
              <button
                onClick={() => setLightboxPhoto(null)}
                className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
