import React, { useState, useEffect } from 'react';
import { getPart1PhotosForTest, Part1PhotoItem } from '../data/part1VisualIndex';
import {
  ImageIcon,
  ChevronDown,
  ChevronUp,
  ZoomIn,
  X,
  Table,
  Headphones,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { useQuizStore } from '../store/useQuizStore';
import { resolveFullExamSetInfo } from '../data/examSetResolver';

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

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxPhoto || !photos || photos.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const idx = photos.findIndex((p) => p.qNum === lightboxPhoto.qNum);
      if (idx === -1) return;

      if (e.key === 'ArrowLeft' && idx > 0) {
        setLightboxPhoto(photos[idx - 1]);
      } else if (e.key === 'ArrowRight' && idx < photos.length - 1) {
        setLightboxPhoto(photos[idx + 1]);
      } else if (e.key === 'Escape') {
        setLightboxPhoto(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhoto, photos]);

  if (!photos || photos.length === 0) {
    return null;
  }

  const handleOpenAnswers = () => {
    useQuizStore.getState().openFullAnswers({
      book: bookId,
      test: String(testNum),
    });
  };

  const handleOpenExamSet = (qNum: number = 1) => {
    const info = resolveFullExamSetInfo({ source: bookId, test: testNum, num: qNum });
    useQuizStore.getState().openFullExamSet({
      examSetId: info.examSetId,
      examSetName: info.examSetName,
      questionNum: qNum,
    });
  };

  const currentIdx = lightboxPhoto ? photos.findIndex((p) => p.qNum === lightboxPhoto.qNum) : -1;
  const prevPhoto = currentIdx > 0 ? photos[currentIdx - 1] : null;
  const nextPhoto = currentIdx >= 0 && currentIdx < photos.length - 1 ? photos[currentIdx + 1] : null;

  return (
    <div
      className={`rounded-2xl border border-sky-200/90 bg-gradient-to-r from-sky-50/70 via-white to-sky-50/50 p-2.5 sm:p-3 shadow-2xs transition-all ${className}`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 pb-1.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-sky-600 text-white shadow-2xs shrink-0">
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
            onClick={() => handleOpenExamSet(1)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-300 text-[10.5px] font-bold shadow-2xs transition cursor-pointer"
            title="Xem Toàn Bộ 200 Câu Của Đề Này"
          >
            <BookOpen className="w-3 h-3 text-sky-600" />
            <span className="hidden sm:inline">Cả Đề</span>
          </button>

          <button
            onClick={handleOpenAnswers}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10.5px] font-bold shadow-2xs transition cursor-pointer"
            title="Mở Bảng Nén 200 Đáp Án Của Đề Này"
          >
            <Table className="w-3 h-3" />
            <span className="hidden sm:inline">200 Đáp Án</span>
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

      {/* 6 Photos Grid: Big and clear thumbnails */}
      {isExpanded && (
        <div className="mt-1.5 grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5 animate-in fade-in duration-200">
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
                  title="Phóng to ảnh và duyệt tiếp"
                >
                  <ZoomIn className="w-3 h-3" />
                </button>
              </div>

              {/* Photo Image - larger aspect */}
              <div
                className="relative overflow-hidden rounded-lg bg-gray-50 aspect-4/3 min-h-[75px] sm:min-h-[90px] cursor-pointer flex items-center justify-center p-0.5"
                onClick={() => {
                  setLightboxPhoto(photo);
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
                  className="mt-1 w-full py-0.5 text-[9.5px] font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 rounded transition text-center cursor-pointer truncate"
                >
                  Xem câu #{photo.qNum}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Zoom Modal with Prev / Next Navigation */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative bg-white rounded-3xl border border-gray-200 shadow-2xl p-3 sm:p-4 max-w-xl w-full space-y-3 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-extrabold text-xs sm:text-sm text-[#262320] flex items-center gap-1.5 truncate">
                <Headphones className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="truncate">
                  Part 1 — Câu #{lightboxPhoto.qNum} ({currentIdx + 1}/{photos.length}) • {bookId} (Đề {testNum})
                </span>
              </span>
              <button
                onClick={() => setLightboxPhoto(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo with Navigation Overlay */}
            <div className="relative bg-[#1A1816] rounded-2xl p-2 border border-gray-800 flex items-center justify-center min-h-[260px] max-h-[70vh] overflow-hidden select-none">
              <img
                src={lightboxPhoto.imageUrl}
                alt={`Part 1 Photo #${lightboxPhoto.qNum}`}
                className="max-h-[62vh] w-auto max-w-full object-contain rounded-xl shadow-lg"
              />

              {/* Prev Button */}
              {prevPhoto && (
                <button
                  onClick={() => setLightboxPhoto(prevPhoto)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center shadow-lg transition cursor-pointer"
                  title="Ảnh câu trước (Phím ←)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Button */}
              {nextPhoto && (
                <button
                  onClick={() => setLightboxPhoto(nextPhoto)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center shadow-lg transition cursor-pointer"
                  title="Ảnh câu tiếp theo (Phím →)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Thumbnails strip inside lightbox */}
            <div className="flex items-center justify-center gap-1.5 overflow-x-auto py-1">
              {photos.map((p) => (
                <button
                  key={p.qNum}
                  onClick={() => setLightboxPhoto(p)}
                  className={`w-9 h-9 rounded-lg border overflow-hidden transition cursor-pointer shrink-0 ${
                    p.qNum === lightboxPhoto.qNum
                      ? 'border-sky-500 ring-2 ring-sky-400 scale-105'
                      : 'border-gray-200 opacity-60 hover:opacity-100'
                  }`}
                  title={`Câu #${p.qNum}`}
                >
                  <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100 gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setLightboxPhoto(null);
                    handleOpenExamSet(lightboxPhoto.qNum);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-300 font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                  <span>Xem Cả Đề</span>
                </button>
                <button
                  onClick={() => {
                    setLightboxPhoto(null);
                    handleOpenAnswers();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition flex items-center gap-1 cursor-pointer"
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>200 Đáp Án</span>
                </button>
              </div>

              <button
                onClick={() => setLightboxPhoto(null)}
                className="px-3.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition cursor-pointer"
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
