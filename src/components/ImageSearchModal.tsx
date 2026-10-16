import React, { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import {
  Camera,
  UploadCloud,
  ImageIcon,
  Loader2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  X,
  FileText,
  Table,
  Check,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { allQuestions } from '../data/questions';
import { getAllListeningQuestions } from '../data/listeningQuestions';
import { DOCS_IMAGE_CATALOG, DocsImageItem } from '../data/docsImageCatalog';
import { useQuizStore } from '../store/useQuizStore';

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
  const [matchedDocsItem, setMatchedDocsItem] = useState<DocsImageItem | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [viewCatalogTab, setViewCatalogTab] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setMatchedDocsItem(null);
    setErrorMessage(null);
    setViewCatalogTab(false);
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Vui lòng chọn một file hình ảnh hợp lệ (PNG, JPG, WebP, GIF)');
      return;
    }

    setErrorMessage(null);
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    processImage(file);
  };

  // Run OCR with Tesseract.js
  const processImage = async (file: File | string) => {
    setIsProcessing(true);
    setProgressPercent(10);
    setProgressStatus('Đang khởi tạo bộ giải mã OCR...');
    setErrorMessage(null);
    setMatchResults([]);
    setMatchedDocsItem(null);

    try {
      const result = await Tesseract.recognize(file, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgressStatus('Đang nhận diện chữ tiếng Anh trong ảnh...');
            setProgressPercent(Math.round((m.progress || 0) * 100));
          } else if (m.status === 'loading tesseract core') {
            setProgressStatus('Đang tải thư viện OCR...');
            setProgressPercent(30);
          } else if (m.status === 'loading language traineddata') {
            setProgressStatus('Đang nạp mô hình từ điển tiếng Anh...');
            setProgressPercent(50);
          }
        },
      });

      const rawText = result.data.text || '';
      const cleanText = rawText.replace(/\s+/g, ' ').trim();
      setExtractedText(cleanText);

      if (!cleanText) {
        setErrorMessage('Không nhận diện được ký tự chữ nào rõ ràng trong ảnh. Hãy thử ảnh chụp thẳng góc và rõ nét hơn!');
        setIsProcessing(false);
        return;
      }

      setProgressStatus('Đang so khớp với 5.666 câu hỏi nội bộ...');
      setProgressPercent(95);

      // Perform matching across all database questions
      findMatches(cleanText);
    } catch (err: any) {
      console.error('OCR Error:', err);
      setErrorMessage('Lỗi xử lý OCR: ' + (err.message || 'Không thể đọc ảnh. Vui lòng thử lại.'));
    } finally {
      setIsProcessing(false);
      setProgressPercent(100);
      setProgressStatus('Hoàn tất!');
    }
  };

  // Smart matcher
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

      // Direct sentence / phrase containment
      if (qNorm.length > 15 && normText.includes(qNorm.slice(0, 25))) {
        score += 150;
      } else if (normText.length > 15 && qNorm.includes(normText.slice(0, 25))) {
        score += 120;
      }

      // Keyword token overlap
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

    // Sort descending by score
    matches.sort((a, b) => b.score - a.score);
    setMatchResults(matches.slice(0, 8));
  };

  const handleSelectMatch = (m: MatchResult) => {
    onSelectQuery(m.queryToSearch || `#${m.num}`);
    onClose();
  };

  const handleOpenDocInAnswers = (doc: DocsImageItem) => {
    if (doc.test) {
      useQuizStore.getState().openFullAnswers({
        book: doc.book.includes('YBM')
          ? 'YBM 1000 Vol 1 (Docs 5)'
          : doc.book.includes('Hacker 3')
          ? 'Hacker 3 (Full 200 câu)'
          : 'Hacker 2 (Full 200 câu)',
        test: String(doc.test),
      });
      onClose();
    } else {
      onSelectQuery(doc.book);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#E8DFD3] shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-[#EFE8DE] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#262320]">
                Tìm Kiếm Bằng Hình Ảnh / Dán Ảnh (OCR)
              </h3>
              <p className="text-xs text-[#8C8276]">
                Chụp ảnh đề, dán ảnh (Ctrl+V) hoặc chọn ảnh trong bộ Docs để tra câu tương tự
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

        {/* Tab switch: Upload vs Browse Docs Catalog */}
        <div className="px-5 pt-3 pb-2 flex gap-2 bg-[#FAF7F2] border-b border-[#EFE8DE] text-xs font-bold shrink-0">
          <button
            onClick={() => setViewCatalogTab(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer ${
              !viewCatalogTab
                ? 'bg-amber-500 text-white shadow-2xs'
                : 'text-[#6B635B] hover:bg-white'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Tải / Dán Ảnh Của Bạn (OCR)</span>
          </button>
          <button
            onClick={() => setViewCatalogTab(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer ${
              viewCatalogTab
                ? 'bg-sky-600 text-white shadow-2xs'
                : 'text-[#6B635B] hover:bg-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Kho 194 Ảnh Đề & Đáp Án Docs Cũ</span>
          </button>
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-0">
          {!viewCatalogTab ? (
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
                className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                  dragOver
                    ? 'border-amber-500 bg-amber-50/80 scale-[0.99]'
                    : imagePreview
                    ? 'border-emerald-300 bg-emerald-50/30'
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
                      className="max-h-44 max-w-full rounded-xl border border-[#DCD3C7] object-contain bg-white shadow-xs"
                    />
                    <div className="text-left space-y-1.5 flex-1">
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Đã nạp ảnh thành công</span>
                      </div>
                      <p className="text-xs font-bold text-[#262320]">
                        {imageFile?.name || 'Ảnh chụp đề TOEIC'}
                      </p>
                      <p className="text-[11px] text-[#8C8276]">
                        Bấm vào khung này nếu bạn muốn chọn ảnh khác, hoặc nhấn Ctrl+V để dán ảnh mới.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 py-3">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-[#262320]">
                      Kéo thả ảnh vào đây, hoặc <span className="text-amber-600 underline">bấm để chọn file / chụp camera</span>
                    </p>
                    <p className="text-xs text-[#8C8276]">
                      Mẹo: Có thể chụp ảnh màn hình rồi nhấn <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono">Ctrl + V</kbd> (hoặc <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono">⌘ + V</kbd>) dán trực tiếp!
                    </p>
                  </div>
                )}
              </div>

              {/* Progress bar during OCR */}
              {isProcessing && (
                <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs space-y-2.5 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs font-bold text-[#5C5247]">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
                      <span>{progressStatus}</span>
                    </div>
                    <span className="font-mono text-amber-600">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Recognized Text Snippet */}
              {extractedText && (
                <div className="bg-white p-3.5 rounded-2xl border border-[#EFE8DE] shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-[#5C5247] uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-500" />
                      Văn bản trích xuất từ ảnh (OCR):
                    </span>
                    <button
                      onClick={() => {
                        onSelectQuery(extractedText.slice(0, 50));
                        onClose();
                      }}
                      className="text-[11px] text-sky-600 font-bold hover:underline cursor-pointer"
                    >
                      Dùng tìm kiếm ↗
                    </button>
                  </div>
                  <p className="text-xs text-[#262320] bg-[#FAF8F5] p-2.5 rounded-xl border border-[#F2ECE3] font-mono leading-relaxed line-clamp-3">
                    "{extractedText}"
                  </p>
                </div>
              )}

              {/* Recognized Docs Catalog Match if present */}
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
                  <p className="text-xs text-sky-800">{matchedDocsItem.type}</p>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleOpenDocInAnswers(matchedDocsItem)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 transition cursor-pointer"
                    >
                      <Table className="w-3.5 h-3.5" />
                      <span>Xem Full 200 Đáp Án Bộ Đề Này</span>
                    </button>
                    {matchedDocsItem.test && (
                      <button
                        onClick={() => {
                          onSelectQuery(`${matchedDocsItem.book} Test ${matchedDocsItem.test}`);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white border border-sky-300 text-sky-800 text-xs font-bold hover:bg-sky-100 transition cursor-pointer"
                      >
                        Lọc câu hỏi trong đề
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Matching Questions List */}
              {matchResults.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold text-[#262320] uppercase tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Các câu hỏi khớp / tương tự ({matchResults.length} câu)
                    </h4>
                    <span className="text-[10.5px] text-[#8C8276]">Bấm để nhảy tới câu</span>
                  </div>

                  <div className="space-y-2">
                    {matchResults.map((m, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectMatch(m)}
                        className="bg-white p-3.5 rounded-2xl border border-[#E8DFD3] hover:border-amber-400 hover:shadow-xs transition cursor-pointer space-y-1.5 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#262320] group-hover:text-amber-700 transition">
                            {m.title}
                          </span>
                          <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                            Khớp {Math.min(99, Math.round(m.score))}%
                          </span>
                        </div>

                        <div className="text-[11px] text-[#8C8276]">{m.subtitle}</div>

                        {m.correctAnswer && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11.5px] font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Đáp án chuẩn: {m.correctAnswer}</span>
                          </div>
                        )}

                        {m.explanation && (
                          <p className="text-[11px] text-[#5C554E] line-clamp-2 italic">
                            💡 {m.explanation}
                          </p>
                        )}

                        <div className="flex items-center justify-end text-[11px] text-amber-600 font-bold group-hover:translate-x-0.5 transition pt-0.5">
                          <span>Xem câu hỏi này và đề thi</span>
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* ---- BROWSE DOCS CATALOG TAB ---- */
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
            OCR chạy 100% trong trình duyệt máy bạn (Client-side), an toàn & bảo mật
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
    </div>
  );
};
