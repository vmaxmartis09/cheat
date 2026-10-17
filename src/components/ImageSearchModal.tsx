import React, { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import {
  Camera,
  UploadCloud,
  ImageIcon,
  Loader2,
  Sparkles,
  CheckCircle2,
  X,
  FileText,
  Table,
  Check,
  HelpCircle,
  Grid,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Headphones,
} from 'lucide-react';
import { allQuestions } from '../data/questions';
import { getAllListeningQuestions } from '../data/listeningQuestions';
import { DOCS_IMAGE_CATALOG, DocsImageItem } from '../data/docsImageCatalog';
import { PART1_TESTS_CATALOG } from '../data/part1VisualIndex';
import { matchImageToPart1Tests, VisualTestMatch } from '../utils/visualSimilarityMatcher';
import { useQuizStore } from '../store/useQuizStore';
import { resolveFullExamSetInfo } from '../data/examSetResolver';

interface ImageSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuery: (query: string) => void;
}

interface MatchResult {
  kind: 'reading' | 'listening' | 'catalog';
  title: string;
  subtitle: string;
  correctAnswer?: string;
  explanation?: string;
  source?: string;
  num?: number;
  queryToSearch: string;
  score: number;
}

interface ZoomLightboxState {
  photos: Array<{ qNum: number; imageUrl: string }>;
  currentIndex: number;
  bookName: string;
  testLabel: string;
  bookId: string;
  testNum: string;
}

export const ImageSearchModal: React.FC<ImageSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectQuery,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStatus, setProgressStatus] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [extractedText, setExtractedText] = useState<string>('');
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [visualMatches, setVisualMatches] = useState<VisualTestMatch[]>([]);
  const [matchedDocsItem, setMatchedDocsItem] = useState<DocsImageItem | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Tabs: 'upload' (Visual match + OCR) | 'browse_part1' (6 pictures all tests) | 'browse_docs' (old docs)
  const [activeTab, setActiveTab] = useState<'upload' | 'browse_part1' | 'browse_docs'>('upload');
  const [selectedBookFilter, setSelectedBookFilter] = useState<string>('all');
  const [zoomLightbox, setZoomLightbox] = useState<ZoomLightboxState | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const lightboxTouchStartX = useRef<number | null>(null);

  // Global paste handler when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            handleFileSelect(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isOpen]);

  // Keyboard navigation for zoomLightbox
  useEffect(() => {
    if (!zoomLightbox) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && zoomLightbox.currentIndex > 0) {
        setZoomLightbox((prev) => (prev ? { ...prev, currentIndex: prev.currentIndex - 1 } : null));
      } else if (e.key === 'ArrowRight' && zoomLightbox.currentIndex < zoomLightbox.photos.length - 1) {
        setZoomLightbox((prev) => (prev ? { ...prev, currentIndex: prev.currentIndex + 1 } : null));
      } else if (e.key === 'Escape') {
        setZoomLightbox(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomLightbox]);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const resetState = () => {
    setImagePreview(null);
    setImageFile(null);
    setIsProcessing(false);
    setProgressStatus('');
    setProgressPercent(0);
    setExtractedText('');
    setMatchResults([]);
    setVisualMatches([]);
    setMatchedDocsItem(null);
    setErrorMessage(null);
    setActiveTab('upload');
  };

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Vui lòng chọn một file hình ảnh hợp lệ (PNG, JPG, WebP, GIF)');
      return;
    }

    setErrorMessage(null);
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setActiveTab('upload');

    // 1. Run Instant Visual Image Matching on Part 1 photographs
    try {
      const vMatches = await matchImageToPart1Tests(file);
      setVisualMatches(vMatches);
    } catch (err) {
      console.warn('Visual matching error:', err);
    }

    // 2. Run OCR Text Extraction
    processImage(file);
  };

  // Run OCR with Tesseract.js
  const processImage = async (file: File | string) => {
    setIsProcessing(true);
    setProgressPercent(10);
    setProgressStatus('Đang phân tích hình ảnh và nhận diện...');
    setErrorMessage(null);
    setMatchResults([]);
    setMatchedDocsItem(null);

    try {
      const result = await Tesseract.recognize(file, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgressStatus('Đang đọc chữ trong ảnh...');
            setProgressPercent(Math.round((m.progress || 0) * 100));
          } else if (m.status === 'loading tesseract core') {
            setProgressStatus('Đang tải mô hình OCR...');
            setProgressPercent(30);
          } else if (m.status === 'loading language traineddata') {
            setProgressStatus('Đang nạp từ điển tiếng Anh...');
            setProgressPercent(50);
          }
        },
      });

      const rawText = result.data.text || '';
      const cleanText = rawText.replace(/\s+/g, ' ').trim();
      setExtractedText(cleanText);

      if (cleanText) {
        setProgressStatus('Đang so khớp với câu hỏi trong đề...');
        setProgressPercent(95);
        findMatches(cleanText);
      }
    } catch (err: any) {
      console.error('OCR Error:', err);
    } finally {
      setIsProcessing(false);
      setProgressPercent(100);
      setProgressStatus('Hoàn tất!');
    }
  };

  // Smart text matcher
  const findMatches = (text: string) => {
    const norm = (s: string) =>
      (s || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    const normText = norm(text);
    const tokens = normText.split(' ').filter((w) => w.length >= 4);

    // 1. Check docs catalog match
    let matchedDoc: DocsImageItem | null = null;
    let docMaxScore = 0;
    for (const doc of DOCS_IMAGE_CATALOG) {
      let score = 0;
      if (normText.includes(norm(doc.filename))) score += 100;
      if (doc.sampleText && normText.includes(norm(doc.sampleText.slice(0, 40)))) score += 80;
      for (const kw of doc.sampleKeywords) {
        if (normText.includes(kw.toLowerCase())) score += 15;
      }
      if (score > docMaxScore && score >= 30) {
        docMaxScore = score;
        matchedDoc = doc;
      }
    }
    setMatchedDocsItem(matchedDoc);

    const matches: MatchResult[] = [];

    // 2. Check question numbers in text (e.g., "101", "124", "45")
    const numRegex = /\b(1[0-9]{2}|[1-9][0-9]?)\b/g;
    const foundNums = Array.from(new Set((text.match(numRegex) || []).map(Number))).filter(
      (n) => n >= 1 && n <= 200
    );

    // 3. Search Reading questions
    for (const q of allQuestions) {
      let score = 0;
      const qNorm = norm(q.question);
      const optNorm = norm(Object.values(q.options).join(' '));

      if (qNorm.length > 15 && normText.includes(qNorm.slice(0, 25))) {
        score += 150;
      } else if (normText.length > 15 && qNorm.includes(normText.slice(0, 25))) {
        score += 120;
      }

      let hitTokens = 0;
      for (const t of tokens) {
        if (qNorm.includes(t)) {
          score += 15;
          hitTokens++;
        } else if (optNorm.includes(t)) {
          score += 8;
        }
      }

      if (foundNums.includes(q.num)) {
        score += 25;
      }

      if (score >= 35 || hitTokens >= 3) {
        matches.push({
          kind: 'reading',
          title: `Câu #${q.num}: ${q.question.slice(0, 90)}...`,
          subtitle: `${q.source || 'Reading'} • Part ${q.num <= 130 ? 5 : q.num <= 146 ? 6 : 7}`,
          correctAnswer: `${q.correctAnswer}: ${q.options[q.correctAnswer]}`,
          explanation: q.explanation || q.tip,
          source: q.source,
          num: q.num,
          queryToSearch: q.question.slice(0, 40),
          score,
        });
      }
    }

    // 4. Search Listening questions
    const allLC = getAllListeningQuestions();
    for (const q of allLC) {
      let score = 0;
      const qNorm = norm(q.question);
      const tNorm = norm(q.transcript || '');

      if (qNorm.length > 15 && normText.includes(qNorm.slice(0, 25))) {
        score += 150;
      } else if (tNorm.length > 20 && normText.includes(tNorm.slice(0, 30))) {
        score += 140;
      }

      let hitTokens = 0;
      for (const t of tokens) {
        if (qNorm.includes(t)) {
          score += 15;
          hitTokens++;
        } else if (tNorm.includes(t)) {
          score += 10;
          hitTokens++;
        }
      }

      if (foundNums.includes(q.num)) {
        score += 20;
      }

      if (score >= 35 || hitTokens >= 3) {
        matches.push({
          kind: 'listening',
          title: `Câu #${q.num} (LC): ${q.question.slice(0, 90)}...`,
          subtitle: `${q.badge || 'Listening'} • Part ${q.part}`,
          correctAnswer: `${q.correctAnswer}: ${q.options[q.correctAnswer]}`,
          explanation: q.explanation,
          source: q.badge,
          num: q.num,
          queryToSearch: q.question.slice(0, 40),
          score,
        });
      }
    }

    matches.sort((a, b) => b.score - a.score);
    setMatchResults(matches.slice(0, 8));
  };

  const handleOpenAnswersForTest = (bookId: string, testNum: string) => {
    useQuizStore.getState().openFullAnswers({
      book: bookId,
      test: String(testNum),
    });
    onClose();
  };

  const handleOpenFullExamSet = (bookId: string, testNum: string, qNum: number = 1) => {
    const info = resolveFullExamSetInfo({ source: bookId, test: testNum, num: qNum });
    useQuizStore.getState().openFullExamSet({
      examSetId: info.examSetId,
      examSetName: info.examSetName,
      questionNum: qNum,
    });
    onClose();
  };

  const handleOpenDocInAnswers = (doc: DocsImageItem) => {
    if (doc.test) {
      useQuizStore.getState().openFullAnswers({
        book: doc.book.includes('YBM 1000')
          ? 'YBM 1000 Vol 1 (Full 200 câu)'
          : doc.book.includes('YBM')
          ? 'YBM 2025 (Full 200 câu)'
          : doc.book.includes('Hacker 3')
          ? 'Hacker 3 (Full 200 câu)'
          : doc.book.includes('Hacker 1')
          ? 'Hacker 1 (Full 200 câu)'
          : 'Hacker 2 (Full 200 câu)',
        test: String(doc.test),
      });
      onClose();
    } else {
      onSelectQuery(doc.book);
      onClose();
    }
  };

  const filteredCatalog = PART1_TESTS_CATALOG.filter((item) => {
    if (selectedBookFilter === 'all') return true;
    if (selectedBookFilter === 'hacker2') return item.bookId.includes('Hacker 2');
    if (selectedBookFilter === 'ybm_vol1') return item.bookId.includes('YBM 1000');
    if (selectedBookFilter === 'ybm_2025') return item.bookId.includes('YBM 2025');
    if (selectedBookFilter === 'hacker3') return item.bookId.includes('Hacker 3');
    if (selectedBookFilter === 'docs2') return item.bookId.includes('Docs 2');
    return true;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#E8DFD3] shadow-2xl w-full max-w-3xl max-h-[94vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-3.5 bg-white border-b border-[#EFE8DE] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-xs">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#262320] flex items-center gap-2">
                <span>Tìm Đề Bằng Hình Ảnh Tương Tự</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Visual Matcher + 6 Ảnh Part 1
                </span>
              </h3>
              <p className="text-xs text-[#8C8276]">
                So khớp 6 ảnh Part 1 để nhận diện ngay bạn đang làm đề nào, hoặc đọc chữ đề thi
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              resetState();
              onClose();
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#8C8276] hover:text-[#262320] hover:bg-gray-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Main Mode Tabs */}
        <div className="px-5 pt-2.5 pb-2 flex items-center gap-2 bg-[#FAF7F2] border-b border-[#EFE8DE] text-xs font-bold shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer whitespace-nowrap ${
              activeTab === 'upload'
                ? 'bg-amber-500 text-white shadow-2xs'
                : 'text-[#6B635B] hover:bg-white'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Tải / Dán Ảnh Đề (So Khớp Tự Động)</span>
          </button>
          <button
            onClick={() => setActiveTab('browse_part1')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer whitespace-nowrap ${
              activeTab === 'browse_part1'
                ? 'bg-sky-600 text-white shadow-2xs'
                : 'text-[#6B635B] hover:bg-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Kho 6 Ảnh Part 1 Tất Cả Các Đề (41 Đề)</span>
          </button>
          <button
            onClick={() => setActiveTab('browse_docs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer whitespace-nowrap ${
              activeTab === 'browse_docs'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-[#6B635B] hover:bg-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>194 Ảnh Docs Cũ & Bảng Đáp Án</span>
          </button>
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 min-h-0">
          {/* ======================================================== */}
          {/* TAB 1: UPLOAD / PASTE & AUTO VISUAL MATCHING              */}
          {/* ======================================================== */}
          {activeTab === 'upload' && (
            <>
              {/* Drop / Upload Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const file = e.dataTransfer.files[0];
                  if (file) handleFileSelect(file);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-4 sm:p-5 text-center cursor-pointer transition-all ${
                  dragOver
                    ? 'border-amber-500 bg-amber-50/80 scale-[0.99]'
                    : imagePreview
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-[#DCD3C7] bg-white hover:border-amber-400 hover:bg-amber-50/30'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />

                {imagePreview ? (
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src={imagePreview}
                      alt="Xem trước ảnh chụp"
                      className="max-h-40 max-w-full rounded-xl border border-[#DCD3C7] object-contain bg-white shadow-xs"
                    />
                    <div className="text-left space-y-1.5 flex-1">
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Đã tải ảnh lên thành công</span>
                      </div>
                      <p className="text-xs font-bold text-[#262320]">
                        {imageFile?.name || 'Ảnh đề thi TOEIC'}
                      </p>
                      <p className="text-[11px] text-[#8C8276]">
                        Bấm vào khung để đổi ảnh, hoặc nhấn <kbd className="px-1 py-0.5 bg-gray-100 border rounded text-[9.5px]">Ctrl+V</kbd> để dán ảnh mới bất kỳ lúc nào.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 py-2">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-[#262320]">
                      Kéo thả ảnh vào đây, hoặc <span className="text-amber-600 underline">bấm để chọn file / chụp camera</span>
                    </p>
                    <p className="text-xs text-[#8C8276]">
                      Nhận diện được: <strong>1 bức ảnh tranh Part 1</strong>, hoặc <strong>ảnh chụp cả trang (2–6 tranh)</strong>, hoặc ảnh câu hỏi trắc nghiệm!
                    </p>
                  </div>
                )}
              </div>

              {/* Error banner */}
              {errorMessage && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              {/* Processing bar */}
              {isProcessing && (
                <div className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-xs space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs font-bold text-[#5C5247]">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
                      <span>{progressStatus}</span>
                    </div>
                    <span className="font-mono text-amber-600">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-amber-500 h-1.5 rounded-full transition-all duration-200"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* TOP RESULT: VISUAL PART 1 MATCHES */}
              {visualMatches.length > 0 && (
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold text-[#262320] uppercase tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>🎯 Kết Quả So Khớp Hình Ảnh Part 1 ({visualMatches.length} bộ đề tương tự)</span>
                    </h4>
                    <span className="text-[10px] text-[#8C8276]">Độ tương đồng cao nhất</span>
                  </div>

                  {visualMatches.slice(0, 3).map((match, idx) => {
                    const isTop1 = idx === 0;
                    return (
                      <div
                        key={`${match.bookId}-${match.testNum}`}
                        className={`rounded-2xl border p-3.5 transition shadow-xs space-y-3 ${
                          isTop1
                            ? 'bg-gradient-to-r from-emerald-50/80 via-white to-emerald-50/50 border-emerald-300 ring-2 ring-emerald-400/20'
                            : 'bg-white border-[#E8DFD3]'
                        }`}
                      >
                        {/* Match Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`w-6 h-6 rounded-lg text-white font-black text-xs flex items-center justify-center ${
                              isTop1 ? 'bg-emerald-600 shadow-2xs' : 'bg-gray-400'
                            }`}>
                              #{idx + 1}
                            </span>
                            <div>
                              <p className="text-sm font-extrabold text-[#262320]">
                                {match.bookName} • {match.testLabel}
                              </p>
                              <p className="text-[11px] text-[#7A7065]">
                                Khớp với ảnh <strong>Câu #{match.matchedQNum}</strong> ({match.sampleLabel || 'vùng nhận diện'})
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 flex-wrap justify-end">
                            <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-extrabold">
                              Khớp {match.confidence}%
                            </span>
                            <button
                              onClick={() => handleOpenFullExamSet(match.bookId, match.testNum, match.matchedQNum)}
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-300 font-extrabold text-xs shadow-2xs transition cursor-pointer"
                              title="Xem toàn bộ câu hỏi và làm bài thi của đề này"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                              <span className="hidden sm:inline">Xem Cả Đề</span>
                            </button>
                            <button
                              onClick={() => handleOpenAnswersForTest(match.bookId, match.testNum)}
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-2xs transition cursor-pointer"
                            >
                              <Table className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Mở 200 Đáp Án</span>
                            </button>
                          </div>
                        </div>

                        {/* 6 Part 1 Pictures of this Matched Test - Bigger & Clearer */}
                        <div className="pt-1 border-t border-gray-100">
                          <p className="text-[10px] font-bold text-[#8C8276] uppercase tracking-wider mb-1.5">
                            🖼️ 6 Hình Part 1 của bộ đề này để đối chiếu:
                          </p>
                          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                            {match.allPhotos.map((photo, pIdx) => {
                              const isTargetHit = photo.qNum === match.matchedQNum;
                              return (
                                <div
                                  key={photo.qNum}
                                  onClick={() =>
                                    setZoomLightbox({
                                      photos: match.allPhotos,
                                      currentIndex: pIdx,
                                      bookName: match.bookName,
                                      testLabel: match.testLabel,
                                      bookId: match.bookId,
                                      testNum: match.testNum,
                                    })
                                  }
                                  className={`relative rounded-xl p-1 border cursor-pointer group bg-gray-50 flex flex-col justify-between hover:shadow-xs transition ${
                                    isTargetHit
                                      ? 'border-emerald-500 ring-2 ring-emerald-300 bg-emerald-50/20'
                                      : 'border-gray-200 hover:border-sky-400'
                                  }`}
                                  title={`Câu #${photo.qNum} - Bấm để phóng to và lướt xem tiếp`}
                                >
                                  <div className="flex items-center justify-between pb-0.5 px-0.5">
                                    <span
                                      className={`px-1.5 py-0.2 rounded text-[9.5px] font-mono font-bold ${
                                        isTargetHit ? 'bg-emerald-600 text-white' : 'bg-black/60 text-white'
                                      }`}
                                    >
                                      #{photo.qNum}
                                    </span>
                                    <ZoomIn className="w-3 h-3 text-gray-400 group-hover:text-sky-600 transition" />
                                  </div>
                                  <div className="relative overflow-hidden rounded-lg bg-white aspect-4/3 min-h-[70px] sm:min-h-[85px] flex items-center justify-center p-0.5">
                                    <img
                                      src={photo.imageUrl}
                                      alt={`Câu #${photo.qNum}`}
                                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                                      loading="lazy"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Recognized Docs Catalog Match */}
              {matchedDocsItem && (
                <div className="bg-sky-50 border-2 border-sky-300 p-3.5 rounded-2xl shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">🎯</span>
                      <span className="text-xs font-bold text-sky-950">
                        Khớp với tài liệu Docs: {matchedDocsItem.description}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-sky-200 text-sky-900 rounded-md">
                      {matchedDocsItem.folder}
                    </span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleOpenDocInAnswers(matchedDocsItem)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 transition cursor-pointer"
                    >
                      <Table className="w-3.5 h-3.5" />
                      <span>Xem Full 200 Đáp Án Bộ Đề Này</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Text Match Results if present */}
              {matchResults.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-extrabold text-[#262320] uppercase tracking-wide flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    <span title={extractedText ? `Nội dung chữ OCR: ${extractedText.slice(0, 100)}` : undefined}>
                      Câu Hỏi Khớp Theo Nội Dung Chữ ({matchResults.length} câu)
                    </span>
                  </h4>

                  <div className="space-y-2">
                    {matchResults.slice(0, 4).map((m, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          onSelectQuery(m.queryToSearch || `#${m.num}`);
                          onClose();
                        }}
                        className="bg-white p-3 rounded-2xl border border-[#E8DFD3] hover:border-amber-400 hover:shadow-xs transition cursor-pointer space-y-1 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#262320] group-hover:text-amber-700 transition">
                            {m.title}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                            Khớp {Math.min(99, Math.round(m.score))}%
                          </span>
                        </div>
                        <div className="text-[11px] text-[#8C8276]">{m.subtitle}</div>
                        {m.correctAnswer && (
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[11px] font-bold">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Đáp án chuẩn: {m.correctAnswer}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ======================================================== */}
          {/* TAB 2: BROWSE ALL 41 TEST SETS WITH 6 PART 1 PICTURES     */}
          {/* ======================================================== */}
          {activeTab === 'browse_part1' && (
            <div className="space-y-3">
              {/* Filter pills */}
              <div className="flex flex-wrap items-center gap-1.5 pb-1">
                <button
                  onClick={() => setSelectedBookFilter('all')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedBookFilter === 'all'
                      ? 'bg-sky-600 text-white shadow-2xs'
                      : 'bg-white border text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Tất cả ({PART1_TESTS_CATALOG.length} đề)
                </button>
                <button
                  onClick={() => setSelectedBookFilter('hacker2')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedBookFilter === 'hacker2'
                      ? 'bg-sky-600 text-white shadow-2xs'
                      : 'bg-white border text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Hacker 2 (10 đề)
                </button>
                <button
                  onClick={() => setSelectedBookFilter('ybm_vol1')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedBookFilter === 'ybm_vol1'
                      ? 'bg-sky-600 text-white shadow-2xs'
                      : 'bg-white border text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  YBM 1000 Vol 1 (10 đề)
                </button>
                <button
                  onClick={() => setSelectedBookFilter('ybm_2025')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedBookFilter === 'ybm_2025'
                      ? 'bg-sky-600 text-white shadow-2xs'
                      : 'bg-white border text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  YBM 2025 (10 đề)
                </button>
                <button
                  onClick={() => setSelectedBookFilter('hacker3')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedBookFilter === 'hacker3'
                      ? 'bg-sky-600 text-white shadow-2xs'
                      : 'bg-white border text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Hacker 3 (10 đề)
                </button>
                <button
                  onClick={() => setSelectedBookFilter('docs2')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedBookFilter === 'docs2'
                      ? 'bg-sky-600 text-white shadow-2xs'
                      : 'bg-white border text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Docs 2
                </button>
              </div>

              {/* Test list */}
              <div className="space-y-3">
                {filteredCatalog.map((item) => (
                  <div
                    key={`${item.bookId}-${item.testNum}`}
                    className="bg-white rounded-2xl border border-[#E8DFD3] p-3 shadow-2xs space-y-2 hover:border-sky-300 transition"
                  >
                    <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                      <div>
                        <span className="text-xs font-extrabold text-[#262320]">
                          {item.bookName} • {item.testLabel}
                        </span>
                        <span className="ml-2 text-[10px] font-mono text-[#8C8276]">
                          {item.photos.length} hình Part 1
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenFullExamSet(item.bookId, item.testNum, 1)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-300 text-[11px] font-bold shadow-2xs transition cursor-pointer"
                          title="Xem toàn bộ câu hỏi và làm bài thi của đề này"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                          <span className="hidden sm:inline">Xem Cả Đề</span>
                        </button>
                        <button
                          onClick={() => handleOpenAnswersForTest(item.bookId, item.testNum)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-2xs transition cursor-pointer"
                        >
                          <Table className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">200 Đáp Án</span>
                        </button>
                      </div>
                    </div>

                    {/* 6 Photos Grid: Bigger, 3 cols on mobile, 6 on desktop */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {item.photos.map((photo, pIdx) => (
                        <div
                          key={photo.qNum}
                          onClick={() =>
                            setZoomLightbox({
                              photos: item.photos,
                              currentIndex: pIdx,
                              bookName: item.bookName,
                              testLabel: item.testLabel,
                              bookId: item.bookId,
                              testNum: item.testNum,
                            })
                          }
                          className="relative rounded-xl p-1 border border-gray-200 hover:border-sky-500 bg-gray-50 cursor-pointer group flex flex-col justify-between hover:shadow-xs transition"
                          title={`Câu #${photo.qNum} - Bấm để phóng to và lướt xem tiếp`}
                        >
                          <div className="flex items-center justify-between pb-0.5 px-0.5">
                            <span className="px-1.5 py-0.2 rounded text-[9.5px] font-mono font-bold bg-black/60 text-white">
                              #{photo.qNum}
                            </span>
                            <ZoomIn className="w-3 h-3 text-gray-400 group-hover:text-sky-600 transition" />
                          </div>
                          <div className="relative overflow-hidden rounded-lg bg-white aspect-4/3 min-h-[70px] sm:min-h-[85px] flex items-center justify-center p-0.5">
                            <img
                              src={photo.imageUrl}
                              alt={`Câu #${photo.qNum}`}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: BROWSE OLD DOCS IMAGES (194 ITEMS)                 */}
          {/* ======================================================== */}
          {activeTab === 'browse_docs' && (
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-2xl border border-[#EFE8DE] text-xs text-[#5C5247]">
                <p className="font-bold text-[#262320] mb-1">
                  📁 Tổng hợp 194 hình ảnh đề thi & bảng đáp án trong các folder Docs cũ:
                </p>
                <p className="text-[11px] text-[#8C8276]">
                  Gồm 84 ảnh đề chụp trong <code>docs3</code> (Hacker 2 LC/RC, Hacker 3 LC/RC, TMA Online), 10 trang đáp án gốc <code>docs5</code> (YBM 1000 Vol 1), và 100 ảnh tranh & biểu đồ cropped <code>public/images/hacker2_lc</code>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DOCS_IMAGE_CATALOG.slice(0, 40).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-white border border-[#E8DFD3] hover:border-sky-400 transition space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-1 border-b border-[#F2ECE3]">
                        <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded">
                          {item.folder}
                        </span>
                        <span className="text-[10px] text-[#8C8276] font-mono">{item.filename}</span>
                      </div>
                      <p className="text-xs font-bold text-[#262320] mt-1.5">{item.description}</p>
                      <p className="text-[11px] text-[#6B635B] mt-0.5">{item.type}</p>
                      {item.previewUrl && (
                        <img
                          src={item.previewUrl}
                          alt={item.description}
                          className="mt-2 h-24 w-full object-contain rounded-lg border border-gray-100 bg-white"
                          loading="lazy"
                        />
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 pt-1">
                      <button
                        onClick={() => handleOpenDocInAnswers(item)}
                        className="flex-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-xl flex items-center justify-center gap-1 transition cursor-pointer"
                      >
                        <Table className="w-3 h-3" />
                        <span>Xem Đáp Án</span>
                      </button>
                      <button
                        onClick={() => {
                          onSelectQuery(item.description);
                          onClose();
                        }}
                        className="py-1.5 px-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-[11px] rounded-xl border border-amber-200 transition cursor-pointer"
                      >
                        Tìm Câu
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-white border-t border-[#EFE8DE] flex items-center justify-between shrink-0">
          <span className="text-[11px] text-[#8C8276] flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            Nhận diện hình ảnh thị giác (dHash + Canvas) 100% trong trình duyệt của bạn
          </span>
          <button
            onClick={() => {
              resetState();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#262320] text-xs font-bold transition cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>

      {/* Lightbox Image Zoom with Prev / Next Navigation */}
      {zoomLightbox && (() => {
        const currentPhoto = zoomLightbox.photos[zoomLightbox.currentIndex];
        const prevP = zoomLightbox.currentIndex > 0 ? zoomLightbox.photos[zoomLightbox.currentIndex - 1] : null;
        const nextP = zoomLightbox.currentIndex < zoomLightbox.photos.length - 1 ? zoomLightbox.photos[zoomLightbox.currentIndex + 1] : null;

        return (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-xs animate-in fade-in"
            onClick={() => setZoomLightbox(null)}
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
                    Part 1 — Câu #{currentPhoto?.qNum} ({zoomLightbox.currentIndex + 1}/{zoomLightbox.photos.length}) • {zoomLightbox.bookName} ({zoomLightbox.testLabel})
                  </span>
                </span>
                <button
                  onClick={() => setZoomLightbox(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Photo with Navigation Overlay (Touch swipeable) */}
              <div
                className="relative bg-[#1A1816] rounded-2xl p-2 border border-gray-800 flex items-center justify-center min-h-[260px] max-h-[70vh] overflow-hidden select-none"
                onTouchStart={(e) => {
                  lightboxTouchStartX.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  if (lightboxTouchStartX.current === null) return;
                  const dx = e.changedTouches[0].clientX - lightboxTouchStartX.current;
                  lightboxTouchStartX.current = null;
                  if (dx < -50 && nextP) {
                    setZoomLightbox({ ...zoomLightbox, currentIndex: zoomLightbox.currentIndex + 1 });
                  } else if (dx > 50 && prevP) {
                    setZoomLightbox({ ...zoomLightbox, currentIndex: zoomLightbox.currentIndex - 1 });
                  }
                }}
              >
                <img
                  src={currentPhoto?.imageUrl}
                  alt={`Part 1 Photo #${currentPhoto?.qNum}`}
                  className="max-h-[62vh] w-auto max-w-full object-contain rounded-xl shadow-lg"
                />

                {/* Prev Button */}
                {prevP && (
                  <button
                    onClick={() => setZoomLightbox({ ...zoomLightbox, currentIndex: zoomLightbox.currentIndex - 1 })}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center shadow-lg transition cursor-pointer"
                    title="Ảnh câu trước (Phím ←)"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                {/* Next Button */}
                {nextP && (
                  <button
                    onClick={() => setZoomLightbox({ ...zoomLightbox, currentIndex: zoomLightbox.currentIndex + 1 })}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center shadow-lg transition cursor-pointer"
                    title="Ảnh câu tiếp theo (Phím →)"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
              </div>

              {/* Thumbnails strip inside lightbox */}
              <div className="flex items-center justify-center gap-1.5 overflow-x-auto py-1">
                {zoomLightbox.photos.map((p, idx) => (
                  <button
                    key={p.qNum}
                    onClick={() => setZoomLightbox({ ...zoomLightbox, currentIndex: idx })}
                    className={`w-9 h-9 rounded-lg border overflow-hidden transition cursor-pointer shrink-0 ${
                      idx === zoomLightbox.currentIndex
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
                      const qn = currentPhoto?.qNum || 1;
                      setZoomLightbox(null);
                      handleOpenFullExamSet(zoomLightbox.bookId, zoomLightbox.testNum, qn);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-300 font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                    <span>Xem Cả Đề</span>
                  </button>
                  <button
                    onClick={() => {
                      setZoomLightbox(null);
                      handleOpenAnswersForTest(zoomLightbox.bookId, zoomLightbox.testNum);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition flex items-center gap-1 cursor-pointer"
                  >
                    <Table className="w-3.5 h-3.5" />
                    <span>200 Đáp Án</span>
                  </button>
                </div>

                <button
                  onClick={() => setZoomLightbox(null)}
                  className="px-3.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
