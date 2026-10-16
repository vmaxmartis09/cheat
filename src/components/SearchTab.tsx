import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { allQuestions } from '../data/questions';
import {
  getAllListeningQuestions,
  getListeningQuestionsByTestAndPart,
  ListeningQuestion,
} from '../data/listeningQuestions';
import { Question, AnswerChoice } from '../types';
import {
  EXAM_BOOKS_META,
  MASTER_ANSWER_KEYS,
  resolveBookAndTestFromSource,
} from '../data/masterLookupKeys';
import { useQuizStore } from '../store/useQuizStore';
import {
  Search,
  X,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Mic,
  BookOpen,
  ArrowLeft,
  Layers,
  Copy,
  Check,
  ExternalLink,
  Globe,
  Sparkles,
  ChevronRight,
  Zap,
  BookMarked,
  HelpCircle,
  Share2,
  Table,
  Headphones,
  Image as ImageIcon,
  Camera,
} from 'lucide-react';
import { ImageSearchModal } from './ImageSearchModal';

// ============================================================
// Types & Match Indicators
// ============================================================
export type MatchType =
  | 'question'
  | 'answer'
  | 'passage'
  | 'transcript'
  | 'num'
  | 'explanation'
  | 'source'
  | 'keywords';

export const MATCH_TYPE_LABELS: Record<MatchType, { text: string; color: string }> = {
  question: { text: 'Khớp: Câu hỏi', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  answer: { text: 'Khớp: Phương án', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  transcript: { text: 'Khớp: Transcript', color: 'bg-sky-100 text-sky-800 border-sky-300' },
  passage: { text: 'Khớp: Bài đọc', color: 'bg-amber-100 text-amber-900 border-amber-300' },
  num: { text: 'Khớp: Số câu', color: 'bg-rose-100 text-rose-800 border-rose-300' },
  explanation: { text: 'Khớp: Giải thích', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  source: { text: 'Khớp: Bộ đề/Test', color: 'bg-teal-100 text-teal-800 border-teal-300' },
  keywords: { text: 'Khớp: Mẹo / Từ khóa', color: 'bg-orange-100 text-orange-900 border-orange-300' },
};

export type SearchResult =
  | { kind: 'reading'; question: Question; matchedIn: MatchType; score: number }
  | { kind: 'listening'; question: ListeningQuestion; matchedIn: MatchType; score: number };

interface ExamSetFocus {
  kind: 'reading' | 'listening';
  /** For reading: source string. For listening: part number as string */
  setKey: string;
  /** The question id that was originally clicked – will be scrolled into view */
  originId: string;
}

// ============================================================
// Helpers
// ============================================================
function normalize(s: string) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\x00-\x1f\x7f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function highlight(text: string, query: string): React.ReactNode {
  if (!text || !query.trim()) return text || '';
  const normQ = normalize(query);
  if (!normQ) return text;

  const rawLower = text.toLowerCase();
  const queryLower = query.trim().toLowerCase();

  const idx = rawLower.indexOf(queryLower);
  if (idx !== -1) {
    const before = text.slice(0, idx);
    const matched = text.slice(idx, idx + queryLower.length);
    const after = text.slice(idx + queryLower.length);
    return (
      <>
        {before}
        <mark className="bg-amber-200/90 text-amber-950 font-bold px-0.5 rounded shadow-2xs">
          {matched}
        </mark>
        {highlight(after, query)}
      </>
    );
  }

  // Token fallback for multi-word queries
  const tokens = queryLower.split(/\s+/).filter((t) => t.length >= 2);
  if (tokens.length > 0) {
    try {
      const escaped = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
      const regex = new RegExp(`(${escaped})`, 'gi');
      const parts = text.split(regex);
      return (
        <>
          {parts.map((part, i) => {
            const isMatch = tokens.some((t) => t.toLowerCase() === part.toLowerCase());
            return isMatch ? (
              <mark key={i} className="bg-amber-200/90 text-amber-950 font-bold px-0.5 rounded shadow-2xs">
                {part}
              </mark>
            ) : (
              part
            );
          })}
        </>
      );
    } catch {
      return text;
    }
  }

  return text;
}

const CHOICE_LABELS: AnswerChoice[] = ['A', 'B', 'C', 'D'];
const ANSWER_COLORS: Record<string, string> = {
  A: 'bg-sky-50 border-sky-200 text-sky-800',
  B: 'bg-violet-50 border-violet-200 text-violet-800',
  C: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  D: 'bg-rose-50 border-rose-200 text-rose-800',
};
const CORRECT_RING = 'ring-2 ring-offset-1 ring-emerald-400 bg-emerald-50 border-emerald-300 font-bold';

// All unique reading sources sorted
const ALL_READING_SOURCES = [...new Set(allQuestions.map((q) => q.source))].sort();

// ============================================================
// Intelligent TOEIC In-App AI Analyzer Engine
// ============================================================
interface AnalysisResult {
  category: string;
  badge: string;
  structureNote: string;
  ruleTip: string;
  likelyAnswers: string[];
  collocations: string[];
}

function analyzeToeicQuestion(query: string, partLabel: string): AnalysisResult {
  const q = query.trim();

  // Pattern 1: Inversion after "and" or conjunctions ("and ------- his deputy", "as does")
  if (/and\s+[-_.]+\s+/i.test(q) || /as\s+does|so\s+does|neither\s+does/i.test(q)) {
    return {
      category: 'Đảo ngữ đồng tình (Inversion with "as/so does")',
      badge: '⚡ Ngữ pháp nâng cao',
      structureNote: 'Vị trí sau liên từ "and" đứng trước Chủ ngữ mới -> Cấu trúc đảo ngữ đồng tình: "and as does + S" (và ai đó cũng vậy) hoặc "and so does + S".',
      ruleTip: 'Mẹo 5s: Thấy "and" + chỗ trống + Danh từ làm chủ ngữ -> Chọn ngay "as does" hoặc "so does / so is".',
      likelyAnswers: ['as does', 'so does', 'as to', 'as long as'],
      collocations: ['maintain the present course', 'chief financial officer', 'deputy'],
    };
  }

  // Pattern 2: Leading conjunction followed by S + V ("------- you have familiarized yourself...")
  if (/^[-_.]+\s+[a-z]+/i.test(q) || /[-_.]+\s+you\s+have/i.test(q) || /once|although|before|after|unless/i.test(q)) {
    return {
      category: 'Liên từ chỉ thời gian / điều kiện (Conjunctions)',
      badge: '📌 Mệnh đề & Liên từ',
      structureNote: 'Đứng đầu câu và trước một mệnh đề hoàn chỉnh (S + V) -> Cần một Liên từ phụ thuộc (Subordinating Conjunction) như Once, Before, Although, Since.',
      ruleTip: 'Mẹo 5s: Đầu câu trước "S + V" -> Loại bỏ trạng từ (Already, Earlier, Soon); Chọn liên từ "Once" (Một khi) hoặc "Although" (Mặc dù).',
      likelyAnswers: ['Once', 'Before', 'Already', 'Earlier'],
      collocations: ['familiarize yourself with', 'basic commands', 'creative features'],
    };
  }

  // Pattern 3: Reflexive Pronouns after Subject ("The director ------- has often been seen...")
  if (/(director|manager|president|officer|she|he|they|mr\.|ms\.)\s+[-_.]+\s+(has|have|is|was|will|can|attended)/i.test(q) || /himself|herself|themselves|itself/i.test(q)) {
    return {
      category: 'Đại từ phản thân nhấn mạnh (Reflexive Pronouns)',
      badge: '👤 Đại từ (Pronouns)',
      structureNote: 'Câu đã có đầy đủ Chủ ngữ (S) và Vị ngữ (V), chỗ trống nằm kẹp giữa S và V -> Dùng đại từ phản thân (-self) để nhấn mạnh: "Đích thân ai đó".',
      ruleTip: 'Mẹo 5s: S + [chỗ trống] + V (câu đã đủ thành phần) -> Chọn ngay phương án có đuôi "-self" (himself / herself / itself).',
      likelyAnswers: ['himself', 'his', 'him', 'he'],
      collocations: ['staff canteen', 'along with other workers', 'take lunch'],
    };
  }

  // Pattern 4: Word Form - Adjective before Noun ("with ------- plants that require...")
  if (/[-_.]+\s+(plants|system|service|products|staff|employees|report|program|solution|results|materials)/i.test(q) || /native|annual|efficient|innovative|reliable/i.test(q)) {
    return {
      category: 'Từ loại (Word Form) - Tính từ bổ nghĩa Danh từ',
      badge: '📝 Trọng tâm Part 5',
      structureNote: 'Chỗ trống đứng trước danh từ (Noun) và sau mạo từ/giới từ -> Cần một Tính từ (Adjective) để bổ nghĩa cho danh từ đứng sau.',
      ruleTip: 'Mẹo 5s: [Giới từ / Mạo từ] + [Chỗ trống] + [Danh từ] -> Chọn tính từ nguyên bản (đuôi -ive, -al, -ic, -able, -ful) hoặc V-ed/V-ing.',
      likelyAnswers: ['native (Adj)', 'natively (Adv)', 'nativity (Noun)', 'nativeness (Noun)'],
      collocations: ['introduced plants', 'less watering', 'Department of Environment'],
    };
  }

  // Pattern 5: Word Form - Adverb modifying Verb / Adjective
  if (/[-_.]+\s+(increased|improved|announced|declined|completed|operating|distributed)/i.test(q) || /significantly|dramatically|recently|frequently/i.test(q)) {
    return {
      category: 'Từ loại (Word Form) - Trạng từ (Adverb -ly)',
      badge: '⚡ Quy tắc 3 giây',
      structureNote: 'Chỗ trống đứng trước động từ V-ed/V3 hoặc đứng cuối câu -> Cần một Trạng từ (Adverb đuôi -ly) để bổ nghĩa cho hành động.',
      ruleTip: 'Mẹo 5s: Vị trí bổ nghĩa cho Động từ, Tính từ hoặc cả câu -> Chọn phương án có đuôi "-ly" (significantly, quickly, thoroughly).',
      likelyAnswers: ['significantly', 'significant', 'significance', 'signify'],
      collocations: ['increase significantly', 'operate efficiently', 'strictly prohibited'],
    };
  }

  // Pattern 6: Preposition & Fixed Collocation
  if (/in\s+[-_.]+\s+with|accordance|compliance|response\s+to|prior\s+to|regard\s+to/i.test(q)) {
    return {
      category: 'Giới từ & Cụm từ cố định (Fixed Collocations)',
      badge: '📚 Cụm từ hay gặp',
      structureNote: 'Cụm giới từ cố định trong văn phong thương mại trang trọng: "in accordance with" (phù hợp với), "in response to" (đáp ứng với), "prior to" (trước khi).',
      ruleTip: 'Mẹo 5s: Học thuộc trọn cụm 3 từ: "in + [Danh từ] + with/to" -> Chọn "accordance" khi có "in ... with".',
      likelyAnswers: ['accordance', 'according', 'accord', 'accorded'],
      collocations: ['in accordance with', 'in compliance with', 'prior to the deadline'],
    };
  }

  // General TOEIC Analysis Default
  return {
    category: `Phân tích cấu trúc câu ${partLabel}`,
    badge: '🎯 Hướng dẫn giải chuẩn',
    structureNote: 'Đối với câu hỏi TOEIC, bước 1 là nhìn nhanh 4 phương án để xác định: Đây là câu hỏi Ngữ pháp (cùng gốc từ khác đuôi) hay Câu hỏi Từ vựng (4 từ khác nghĩa).',
    ruleTip: 'Mẹo 5s: Nếu 4 đáp án cùng gốc từ -> Nhìn 1 từ ngay trước và 1 từ ngay sau chỗ trống để xác định từ loại (Danh, Động, Tính, Trạng) mà không cần dịch cả câu.',
    likelyAnswers: ['(A) Danh từ', '(B) Động từ', '(C) Tính từ', '(D) Trạng từ'],
    collocations: ['business correspondence', 'annual conference', 'terms and conditions'],
  };
}

// ============================================================
// ReadingQuestionCard — used both in search results & exam set view
// ============================================================
const ReadingQuestionCard: React.FC<{
  question: Question;
  query: string;
  matchedIn?: MatchType;
  isExpanded: boolean;
  isHighlighted?: boolean;
  onToggle: () => void;
  onViewExamSet?: () => void;
  showViewExamSetBtn?: boolean;
}> = ({
  question,
  query,
  matchedIn,
  isExpanded,
  isHighlighted,
  onToggle,
  onViewExamSet,
  showViewExamSetBtn,
}) => {
  const q = question;
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when highlighted (exam set focus)
  useEffect(() => {
    if (isHighlighted && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isHighlighted]);

  const matchLabel = matchedIn ? MATCH_TYPE_LABELS[matchedIn] : null;

  return (
    <div
      ref={cardRef}
      className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
        isHighlighted
          ? 'border-amber-500 bg-amber-50/80 shadow-lg ring-2 ring-amber-300'
          : isExpanded
          ? 'border-amber-400 bg-amber-50/60 shadow-md'
          : 'border-[#EFE8DE] bg-white hover:border-amber-300 hover:shadow-sm'
      }`}
    >
      {/* Header row */}
      <button
        onClick={onToggle}
        className="w-full text-left flex items-start gap-3 px-4 py-3 cursor-pointer"
      >
        <span
          className={`shrink-0 mt-0.5 min-w-[2.2rem] text-center text-[11px] font-bold px-1.5 py-0.5 rounded-lg border ${
            isHighlighted
              ? 'bg-amber-400 text-white border-amber-500'
              : 'bg-amber-100 text-amber-800 border-amber-200'
          }`}
        >
          #{q.num}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <span className="text-[10px] font-semibold text-[#8C8276] uppercase tracking-wide">
              {q.source}
            </span>
            <span className="text-[10px] text-[#B0A89E]">·</span>
            <span className="text-[10px] text-[#8C8276]">{q.category}</span>
            {q.passageInfo && (
              <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded bg-sky-100 text-sky-800 border border-sky-200 truncate max-w-[200px]">
                📄 {q.passageInfo.title || 'Đoạn văn'}
              </span>
            )}
            {matchLabel && (
              <span
                className={`text-[9.5px] font-extrabold px-1.5 py-0.2 rounded-md border ${matchLabel.color}`}
              >
                {matchLabel.text}
              </span>
            )}
            {isHighlighted && (
              <span className="text-[10px] font-bold text-amber-600 ml-1">← đang tìm</span>
            )}
          </div>

          <p className="text-[13px] leading-snug text-[#262320] line-clamp-2 font-medium">
            {highlight(q.question, query)}
          </p>

          <div className="mt-1.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="text-[12px] font-bold text-emerald-700">
              {q.correctAnswer}: {q.options[q.correctAnswer]}
            </span>
          </div>
        </div>

        <span className="shrink-0 text-[#B0A89E] mt-1">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-amber-200/60">
          {/* Passage */}
          {q.passageInfo && (
            <div className="mt-3 p-3 rounded-xl bg-sky-50/70 border border-sky-200 text-[12px] text-sky-900 max-h-52 overflow-y-auto leading-relaxed whitespace-pre-wrap">
              <p className="font-bold text-sky-700 mb-1">📄 {q.passageInfo.title}</p>
              {highlight(q.passageInfo.content, query)}
              {q.passageInfo.vietnameseTranslation && (
                <div className="mt-2 pt-2 border-t border-sky-200 text-[11px] text-sky-800 italic">
                  <span className="font-bold not-italic text-sky-900">Bản dịch đoạn văn:</span>{' '}
                  {highlight(q.passageInfo.vietnameseTranslation, query)}
                </div>
              )}
            </div>
          )}

          {/* Full question */}
          <p className="mt-3 text-[13.5px] font-semibold leading-relaxed text-[#262320]">
            {highlight(q.question, query)}
          </p>

          {/* Options grid */}
          <div className="mt-2.5 grid grid-cols-1 gap-1.5">
            {CHOICE_LABELS.map((ch) => {
              const isCorrect = ch === q.correctAnswer;
              return (
                <div
                  key={ch}
                  className={`flex items-start gap-2 px-3 py-2 rounded-xl border text-[12.5px] transition-all ${
                    ANSWER_COLORS[ch]
                  } ${isCorrect ? CORRECT_RING : ''}`}
                >
                  <span className="shrink-0 font-bold w-4">{ch}.</span>
                  <span className="flex-1">{highlight(q.options[ch as AnswerChoice], query)}</span>
                  {isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation */}
          <div className="mt-3 p-2.5 rounded-xl bg-white border border-[#EFE8DE] text-[11.5px] text-[#5C554E] leading-relaxed">
            <span className="font-bold text-amber-700">💡 Giải thích: </span>
            {highlight(q.explanation, query)}
          </div>

          {/* Vietnamese meaning */}
          {q.vietnameseMeaning && (
            <div className="mt-2 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-[11.5px] text-emerald-950 leading-relaxed">
              <span className="font-bold text-emerald-800">🌐 Dịch nghĩa: </span>
              {highlight(q.vietnameseMeaning, query)}
            </div>
          )}

          {q.tip && (
            <div className="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11.5px] text-amber-900 leading-relaxed">
              <span className="font-bold text-amber-800">⚡ Mẹo: </span>
              {highlight(q.tip, query)}
            </div>
          )}

          {/* Action buttons: Jump to practice, View Full Answers, View Exam Set */}
          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const store = useQuizStore.getState();
                store.setSourceFilter(q.source);
                store.initSession('sequential', q.source, 'all');
                const qIdx = useQuizStore.getState().questions.findIndex((item) => item.id === q.id);
                if (qIdx !== -1) {
                  store.jumpToIndex(qIdx);
                }
                store.setActiveTab('practice');
              }}
              className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-[12px] font-bold cursor-pointer transition-all shadow-2xs"
              title="Mở câu này trong chế độ luyện tập để làm bài"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Làm Câu Này</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                const resolved = resolveBookAndTestFromSource(q.source, q.id, q.num);
                useQuizStore.getState().openFullAnswers(resolved || { questionNum: q.num });
              }}
              className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold cursor-pointer transition-all shadow-2xs"
              title="Xem bảng đáp án trọn bộ (Full 200 câu) của đề này"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Full Đáp Án (200 câu)</span>
            </button>

            {showViewExamSetBtn && onViewExamSet && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewExamSet();
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-amber-50 text-amber-800 border border-amber-300 text-[12px] font-bold cursor-pointer transition-all shadow-2xs"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Xem cả đề "{q.source}"</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// ListeningQuestionCard
// ============================================================
const ListeningQuestionCard: React.FC<{
  question: ListeningQuestion;
  query: string;
  matchedIn?: MatchType;
  isExpanded: boolean;
  isHighlighted?: boolean;
  onToggle: () => void;
  onViewExamSet?: () => void;
  showViewExamSetBtn?: boolean;
}> = ({
  question,
  query,
  matchedIn,
  isExpanded,
  isHighlighted,
  onToggle,
  onViewExamSet,
  showViewExamSetBtn,
}) => {
  const q = question;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHighlighted && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isHighlighted]);

  const testNum = (q as any).test;
  const testLabel = testNum ? `Hacker 2 · Test ${testNum}` : 'Docs 2 Listening';
  const matchLabel = matchedIn ? MATCH_TYPE_LABELS[matchedIn] : null;

  return (
    <div
      ref={cardRef}
      className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
        isHighlighted
          ? 'border-sky-500 bg-sky-50/80 shadow-lg ring-2 ring-sky-300'
          : isExpanded
          ? 'border-sky-400 bg-sky-50/60 shadow-md'
          : 'border-[#EFE8DE] bg-white hover:border-sky-300 hover:shadow-sm'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left flex items-start gap-3 px-4 py-3 cursor-pointer"
      >
        <span
          className={`shrink-0 mt-0.5 min-w-[2.2rem] text-center text-[11px] font-bold px-1.5 py-0.5 rounded-lg border ${
            isHighlighted
              ? 'bg-sky-500 text-white border-sky-600'
              : 'bg-sky-100 text-sky-800 border-sky-200'
          }`}
        >
          #{q.num}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <span className="text-[10px] font-bold text-sky-800 bg-sky-100 border border-sky-200 px-1.5 py-0.2 rounded">
              🎧 {testLabel}
            </span>
            <span className="text-[10px] text-[#B0A89E]">·</span>
            <span className="text-[10px] font-semibold text-sky-700 uppercase tracking-wide">
              Part {q.part}
            </span>
            <span className="text-[10px] text-[#B0A89E]">·</span>
            <span className="text-[10px] text-[#8C8276] truncate max-w-[150px]">{q.category}</span>
            {matchLabel && (
              <span
                className={`text-[9.5px] font-extrabold px-1.5 py-0.2 rounded-md border ${matchLabel.color}`}
              >
                {matchLabel.text}
              </span>
            )}
            {isHighlighted && (
              <span className="text-[10px] font-bold text-sky-600 ml-1">← đang tìm</span>
            )}
          </div>

          <p className="text-[13px] leading-snug text-[#262320] line-clamp-2 font-medium">
            {highlight(q.question, query)}
          </p>

          <div className="mt-1.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="text-[12px] font-bold text-emerald-700">
              {q.correctAnswer}: {q.options[q.correctAnswer]}
            </span>
          </div>
        </div>

        <span className="shrink-0 text-[#B0A89E] mt-1">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-sky-200/60">
          {/* Photograph / Graphic illustration if present */}
          {q.imageUrl && (
            <div className="mt-3 relative rounded-xl overflow-hidden border border-sky-200 bg-sky-950/5 p-1 max-w-sm">
              <div className="flex items-center gap-1 px-1.5 pb-1 text-[10px] font-bold text-sky-800">
                <ImageIcon className="w-3 h-3 text-sky-600" />
                <span>Hình ảnh câu #{q.num}</span>
              </div>
              <img
                src={q.imageUrl}
                alt={`TOEIC Listening illustration #${q.num}`}
                className="w-full h-auto max-h-56 object-contain rounded-lg mx-auto bg-white"
                loading="lazy"
              />
            </div>
          )}

          {/* Accent badge */}
          {q.accent && (
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 text-[11px] font-bold border border-sky-200">
              <Mic className="w-3 h-3 text-sky-600" />
              <span>Giọng đọc: {highlight(q.accent, query)}</span>
            </div>
          )}

          <p className="mt-3 text-[13.5px] font-semibold leading-relaxed text-[#262320]">
            {highlight(q.question, query)}
          </p>

          {/* Options */}
          <div className="mt-2.5 grid grid-cols-1 gap-1.5">
            {(Object.keys(q.options) as AnswerChoice[]).map((ch) => {
              const isCorrect = ch === q.correctAnswer;
              return (
                <div
                  key={ch}
                  className={`flex items-start gap-2 px-3 py-2 rounded-xl border text-[12.5px] transition-all ${
                    ANSWER_COLORS[ch] ?? 'bg-gray-50 border-gray-200'
                  } ${isCorrect ? CORRECT_RING : ''}`}
                >
                  <span className="shrink-0 font-bold w-4">{ch}.</span>
                  <span className="flex-1">{highlight(q.options[ch] ?? '', query)}</span>
                  {isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Transcript */}
          {q.transcript && (
            <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11.5px] text-slate-100 leading-relaxed whitespace-pre-wrap font-mono">
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-700 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                <span className="flex items-center gap-1.5 text-sky-400">
                  <Headphones className="w-3.5 h-3.5" />
                  Transcript Audio
                </span>
                {q.accent && <span className="text-slate-300 font-normal">{q.accent}</span>}
              </div>
              {highlight(q.transcript, query)}
            </div>
          )}

          {/* Explanation */}
          <div className="mt-3 p-2.5 rounded-xl bg-white border border-[#EFE8DE] text-[11.5px] text-[#5C554E] leading-relaxed">
            <span className="font-bold text-sky-700">💡 Giải thích: </span>
            {highlight(q.explanation, query)}
          </div>

          {q.tip && (
            <div className="mt-2 p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-[11.5px] text-sky-900 leading-relaxed">
              <span className="font-bold text-sky-800">⚡ Mẹo Part {q.part}: </span>
              {highlight(q.tip, query)}
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const store = useQuizStore.getState();
                const targetTest = testNum || 1;
                store.setListeningSelectedTest(targetTest);
                store.setListeningSelectedPart('all');
                const list = getListeningQuestionsByTestAndPart(targetTest, 'all');
                const qIdx = list.findIndex((item) => item.id === q.id);
                if (qIdx !== -1) {
                  store.setListeningCurrentIndex(qIdx);
                }
                store.setActiveTab('listening');
              }}
              className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-[12px] font-bold cursor-pointer transition-all shadow-2xs"
              title="Mở câu này trong tab Luyện Nghe và bật audio"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Luyện Nghe Câu Này</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                const resolved = resolveBookAndTestFromSource(testLabel, q.id, q.num);
                useQuizStore.getState().openFullAnswers(
                  resolved || {
                    book: 'Hacker 2 (Full 200 câu)',
                    test: String(testNum || '1'),
                    questionNum: q.num,
                  }
                );
              }}
              className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold cursor-pointer transition-all shadow-2xs"
              title="Xem bảng đáp án trọn bộ (Full 200 câu) của đề này"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Full Đáp Án (200 câu)</span>
            </button>

            {showViewExamSetBtn && onViewExamSet && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewExamSet();
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-sky-50 text-sky-800 border border-sky-300 text-[12px] font-bold cursor-pointer transition-all shadow-2xs"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Xem cả {testNum ? `Test ${testNum}` : `Part ${q.part}`}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// ExamSetView — full exam set browser
// ============================================================
const ExamSetView: React.FC<{
  focus: ExamSetFocus;
  searchQuery: string;
  onExit: () => void;
}> = ({ focus, searchQuery, onExit }) => {
  const [expandedId, setExpandedId] = useState<string | null>(focus.originId);

  // Derive the questions for this set
  const questions = useMemo(() => {
    if (focus.kind === 'reading') {
      return allQuestions
        .filter((q) => q.source === focus.setKey)
        .sort((a, b) => a.num - b.num);
    } else {
      if (focus.setKey.startsWith('hacker2_t')) {
        const testNum = parseInt(focus.setKey.replace('hacker2_t', ''), 10);
        return getAllListeningQuestions()
          .filter((q) => (q as any).test === testNum)
          .sort((a, b) => a.num - b.num);
      }
      const partNum = parseInt(focus.setKey, 10) as 1 | 2 | 3 | 4;
      return getAllListeningQuestions()
        .filter((q) => q.part === partNum)
        .sort((a, b) => a.num - b.num);
    }
  }, [focus]);

  const setLabel =
    focus.kind === 'reading'
      ? focus.setKey
      : focus.setKey.startsWith('hacker2_t')
      ? `Hacker 2 · Test ${focus.setKey.replace('hacker2_t', '')} (Listening 100 câu)`
      : `Listening Part ${focus.setKey}`;

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Sticky header */}
      <div className="shrink-0 px-3 pt-3 pb-2">
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${
            focus.kind === 'reading'
              ? 'bg-amber-50 border-amber-300'
              : 'bg-sky-50 border-sky-300'
          }`}
        >
          {focus.kind === 'reading' ? (
            <BookOpen className="w-5 h-5 text-amber-700 shrink-0" />
          ) : (
            <Mic className="w-5 h-5 text-sky-700 shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <p
              className={`text-[13px] font-bold truncate ${
                focus.kind === 'reading' ? 'text-amber-900' : 'text-sky-900'
              }`}
            >
              {setLabel}
            </p>
            <p className="text-[11px] text-[#8C8276]">
              {questions.length} câu · Câu được highlight ← là câu đang tìm
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                if (focus.kind === 'reading') {
                  const resolved = resolveBookAndTestFromSource(focus.setKey);
                  useQuizStore.getState().openFullAnswers(resolved || {});
                } else if (focus.setKey.startsWith('hacker2_t')) {
                  const testNum = focus.setKey.replace('hacker2_t', '');
                  useQuizStore.getState().openFullAnswers({
                    book: 'Hacker 2 (Full 200 câu)',
                    test: testNum,
                  });
                } else {
                  useQuizStore.getState().openFullAnswers({
                    book: 'Hacker 2 (Full 200 câu)',
                    test: '1',
                  });
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11.5px] font-bold cursor-pointer transition shadow-2xs"
              title="Xem bảng đáp án trọn bộ 200 câu của bộ đề này"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Full Đáp Án</span>
            </button>
            <button
              onClick={onExit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#EFE8DE] text-[11.5px] font-semibold text-[#5C554E] hover:bg-gray-50 cursor-pointer transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Thoát
            </button>
          </div>
        </div>

        {/* Mini stats */}
        <div className="mt-2 flex items-center gap-3 px-1">
          <span className="text-[11px] text-[#8C8276]">
            Câu <span className="font-bold text-amber-700">#{questions[0]?.num}</span>
            {' '}→{' '}
            <span className="font-bold text-amber-700">#{questions[questions.length - 1]?.num}</span>
          </span>
          <span className="flex-1 h-px bg-[#EFE8DE]" />
          <button
            onClick={onExit}
            className="text-[10px] text-[#B0A89E] hover:text-rose-500 cursor-pointer transition"
          >
            ✕ Quay lại kết quả tìm kiếm
          </button>
        </div>
      </div>

      {/* Scrollable questions list */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 min-h-0 space-y-2">
        {focus.kind === 'reading'
          ? (questions as Question[]).map((q) => (
              <ReadingQuestionCard
                key={q.id}
                question={q}
                query={searchQuery}
                isExpanded={expandedId === q.id}
                isHighlighted={q.id === focus.originId}
                onToggle={() => setExpandedId((prev) => (prev === q.id ? null : q.id))}
                showViewExamSetBtn={false}
              />
            ))
          : (questions as ListeningQuestion[]).map((q) => (
              <ListeningQuestionCard
                key={q.id}
                question={q}
                query={searchQuery}
                isExpanded={expandedId === q.id}
                isHighlighted={q.id === focus.originId}
                onToggle={() => setExpandedId((prev) => (prev === q.id ? null : q.id))}
                showViewExamSetBtn={false}
              />
            ))}
      </div>
    </div>
  );
};

// ============================================================
// NoResultsPanel — Professional TOEIC Search & AI Solver Hub
// ============================================================

interface PartOption {
  key: string | null;
  label: string;
  partTag: string;
  emoji: string;
}

const PART_OPTIONS: PartOption[] = [
  { key: null,   label: 'Tất cả TOEIC',  partTag: 'TOEIC',                  emoji: '📚' },
  { key: 'p5',   label: 'Part 5',        partTag: 'TOEIC Part 5 Incomplete Sentences', emoji: '✏️' },
  { key: 'p6',   label: 'Part 6',        partTag: 'TOEIC Part 6 Text Completion',     emoji: '📝' },
  { key: 'p7',   label: 'Part 7',        partTag: 'TOEIC Part 7 Reading Passage',     emoji: '📖' },
  { key: 'lc1',  label: 'Listening P1',  partTag: 'TOEIC Listening Part 1 Photos',    emoji: '🖼️' },
  { key: 'lc2',  label: 'Listening P2',  partTag: 'TOEIC Listening Part 2 Q&A',       emoji: '❓' },
  { key: 'lc3',  label: 'Listening P3',  partTag: 'TOEIC Listening Part 3 Dialogues', emoji: '🗣️' },
  { key: 'lc4',  label: 'Listening P4',  partTag: 'TOEIC Listening Part 4 Talks',     emoji: '📢' },
];

type PromptTemplateMode = 'google_dork' | 'ai_expert' | 'study4_vn' | 'exact_quote';

const NoResultsPanel: React.FC<{ query: string; onRetry: (word: string) => void }> = ({ query, onRetry }) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [promptMode, setPromptMode] = useState<PromptTemplateMode>('google_dork');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai_solver' | 'prompt_box' | 'web_hubs'>('ai_solver');

  const cleanQuery = query.trim();
  const part = PART_OPTIONS.find((p) => p.key === selectedPart) ?? PART_OPTIONS[0];

  // ── 1. In-App AI Analyzer Breakdown ───────────────────────
  const analysis = useMemo(() => {
    return analyzeToeicQuestion(cleanQuery, part.label);
  }, [cleanQuery, part.label]);

  // ── 2. Professional Prompt Templates ──────────────────────
  const generatedPrompt = useMemo(() => {
    if (promptMode === 'ai_expert') {
      return `[TOEIC 990 EXPERT PROMPT]
Bạn là chuyên gia luyện thi TOEIC 990 điểm. Hãy phân tích và đưa ra lời giải chi tiết cho câu hỏi ${part.partTag} sau đây:

Câu hỏi:
"${cleanQuery}"

Yêu cầu phân tích chi tiết:
1. 🎯 Xác định vị trí chỗ trống cần từ loại gì (Danh từ / Động từ / Tính từ / Trạng từ / Đại từ / Liên từ) và dịch nghĩa toàn bộ câu sang tiếng Việt.
2. 🔬 Phân tích cấu trúc ngữ pháp tại chỗ trống, chỉ rõ dấu hiệu nhận biết 1 từ trước và 1 từ sau.
3. ⚡ Mẹo giải nhanh trong 5-10 giây để không cần dịch hết cả câu.
4. ⚠️ Đưa ra 4 phương án mẫu A, B, C, D (nếu chưa có) và chỉ rõ đáp án đúng nhất cùng phân tích lý do loại trừ các đáp án bẫy.`;
    }

    if (promptMode === 'study4_vn') {
      return `site:study4.com OR site:toeic123.vn OR site:zim.vn OR site:prep.vn "${cleanQuery}"`;
    }

    if (promptMode === 'exact_quote') {
      return `"${cleanQuery}"`;
    }

    // Default: 'google_dork' (ETS / Question & Answer Key Finder)
    return `"${cleanQuery}" ("(A)" OR "(B)" OR "(C)" OR "(D)" OR "ETS" OR "đáp án" OR "answer key" OR "${part.partTag}")`;
  }, [cleanQuery, part.partTag, promptMode]);

  // ── 3. Multi-Hub Search URLs ──────────────────────────────
  const googleDorkQuery = `"${cleanQuery}" ("(A)" OR "(B)" OR "(C)" OR "(D)" OR "ETS" OR "đáp án" OR "answer key")`;
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(googleDorkQuery)}`;
  const chatGptUrl = `https://chatgpt.com/?q=${encodeURIComponent(
    `Giải câu hỏi TOEIC ${part.partTag} sau và cho biết đáp án đúng kèm giải thích: "${cleanQuery}"`
  )}`;
  const perplexityUrl = `https://www.perplexity.ai/search?q=${encodeURIComponent(
    `Giải thích câu hỏi TOEIC ${part.partTag} sau và tìm đáp án đúng: "${cleanQuery}"`
  )}`;
  const study4Url = `https://www.google.com/search?q=${encodeURIComponent(
    `site:study4.com OR site:toeic123.vn "${cleanQuery}"`
  )}`;

  const handleCopy = (textToCopy?: string) => {
    const text = textToCopy || generatedPrompt;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const wordChips = cleanQuery.split(/\s+/).filter((w) => w.length > 2).slice(0, 6);

  return (
    <div className="flex flex-col gap-3 py-3 px-1">
      {/* Header Banner */}
      <div className="flex flex-col items-center text-center gap-1">
        <span className="text-3xl">🔍</span>
        <p className="text-[#8C8276] font-bold text-[14px]">Không tìm thấy trong bộ đề nội bộ</p>
        <p className="text-[11px] text-[#B0A89E] max-w-sm">
          Đã kích hoạt <strong>Trợ lý phân tích TOEIC AI</strong> & <strong>Cổng tra cứu đa nguồn</strong> trực tiếp trên màn hình.
        </p>
      </div>

      {/* ── Step 1: Part Selector ─────────────────────────────── */}
      <div className="bg-white rounded-2xl p-3 border border-[#EFE8DE] shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10.5px] font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1.5">
            <span>🎯</span> Chọn Part câu hỏi để tăng độ chính xác:
          </p>
          <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-1.5 py-0.5 rounded-md">
            {part.label}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PART_OPTIONS.map((opt) => (
            <button
              key={String(opt.key)}
              onClick={() => setSelectedPart(opt.key)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold cursor-pointer transition-all border ${
                selectedPart === opt.key
                  ? 'bg-amber-500 text-white border-amber-500 shadow-xs scale-102'
                  : 'bg-[#FAF7F2] border-[#EFE8DE] text-[#5C554E] hover:border-amber-300 hover:bg-amber-50'
              }`}
            >
              <span>{opt.emoji}</span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Step 2: Main View Switcher (AI Solver vs Prompts vs Search Hub) ── */}
      <div className="flex items-center bg-white p-1 rounded-2xl border border-[#EFE8DE] shadow-2xs">
        <button
          onClick={() => setActiveTab('ai_solver')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11.5px] font-bold cursor-pointer transition ${
            activeTab === 'ai_solver'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-[#8C8276] hover:text-[#262320]'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          Phân tích trong App
        </button>

        <button
          onClick={() => setActiveTab('prompt_box')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11.5px] font-bold cursor-pointer transition ${
            activeTab === 'prompt_box'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-[#8C8276] hover:text-[#262320]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Mẫu Prompt Chuẩn
        </button>

        <button
          onClick={() => setActiveTab('web_hubs')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11.5px] font-bold cursor-pointer transition ${
            activeTab === 'web_hubs'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-[#8C8276] hover:text-[#262320]'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          Tìm Ngoài Web
        </button>
      </div>

      {/* ── TAB 1: IN-APP AI SOLVER (Trực tiếp 100% trên màn hình) ─────── */}
      {activeTab === 'ai_solver' && (
        <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/60 p-4 shadow-sm space-y-3 animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-[11px] font-bold">
                AI
              </span>
              <div>
                <p className="text-[12.5px] font-bold text-emerald-950">{analysis.category}</p>
                <p className="text-[10px] text-emerald-700 font-semibold">{analysis.badge}</p>
              </div>
            </div>
            <button
              onClick={() => handleCopy()}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-emerald-300 text-emerald-800 text-[11px] font-bold hover:bg-emerald-100 cursor-pointer transition"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Đã copy' : 'Copy'}
            </button>
          </div>

          {/* Question Text Box */}
          <div className="p-3 bg-white rounded-xl border border-emerald-200 text-[12.5px] text-[#262320] leading-relaxed font-medium shadow-2xs">
            <span className="text-[10px] font-bold uppercase text-emerald-700 block mb-1">📝 Câu hỏi đang phân tích:</span>
            "{cleanQuery}"
          </div>

          {/* Grammar & Structure Breakdown */}
          <div className="p-3 bg-white rounded-xl border border-emerald-200 text-[12px] text-[#262320] leading-relaxed space-y-1.5 shadow-2xs">
            <p className="font-bold text-emerald-800 flex items-center gap-1">
              <BookMarked className="w-3.5 h-3.5 text-emerald-600" />
              Cấu trúc & Vị trí ngữ pháp:
            </p>
            <p className="text-[11.5px] text-[#4A4238] leading-relaxed pl-1">
              {analysis.structureNote}
            </p>
          </div>

          {/* 5-Second Cheat Tip */}
          <div className="p-3 bg-amber-100/80 rounded-xl border border-amber-300 text-[12px] text-amber-950 leading-relaxed shadow-2xs">
            <p className="font-bold text-amber-900 flex items-center gap-1 mb-0.5">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              Mẹo giải nhanh 5 giây (Cheat Tip):
            </p>
            <p className="text-[11.5px] font-medium leading-relaxed pl-1">
              {analysis.ruleTip}
            </p>
          </div>

          {/* Likely Answer Patterns & Collocations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="p-2.5 bg-white rounded-xl border border-emerald-200">
              <p className="text-[10.5px] font-bold text-emerald-800 uppercase mb-1 flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-emerald-600" />
                Dự đoán dạng phương án:
              </p>
              <div className="flex flex-wrap gap-1">
                {analysis.likelyAnswers.map((ans, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 text-[10.5px] font-semibold border border-emerald-200">
                    {ans}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-emerald-200">
              <p className="text-[10.5px] font-bold text-emerald-800 uppercase mb-1 flex items-center gap-1">
                <Share2 className="w-3 h-3 text-emerald-600" />
                Cụm từ đắt giá (Collocations):
              </p>
              <div className="flex flex-wrap gap-1">
                {analysis.collocations.map((col, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-lg bg-sky-50 text-sky-900 text-[10.5px] font-semibold border border-sky-200">
                    {col}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Hub inside AI Tab */}
          <div className="pt-1 flex gap-2">
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11.5px] font-bold bg-sky-500 hover:bg-sky-600 text-white cursor-pointer transition-all no-underline shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Tra trên Google
            </a>

            <a
              href={chatGptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11.5px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer transition-all no-underline shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Mở ChatGPT giải
            </a>
          </div>
        </div>
      )}

      {/* ── TAB 2: PROMPT CHUYÊN NGHIỆP CHUẨN TOEIC 990 ──────────────── */}
      {activeTab === 'prompt_box' && (
        <div className="rounded-2xl border-2 border-amber-300/90 bg-amber-50/70 p-3.5 shadow-xs space-y-3 animate-in fade-in duration-200">
          {/* Style selector pills */}
          <div className="flex items-center justify-between gap-1 flex-wrap">
            <p className="text-[10.5px] font-bold text-amber-800 uppercase tracking-wide">
              Chọn kiểu Prompt chuẩn:
            </p>

            <div className="flex items-center bg-white/90 p-0.5 rounded-xl border border-amber-200 shadow-2xs">
              <button
                onClick={() => setPromptMode('google_dork')}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition ${
                  promptMode === 'google_dork'
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : 'text-[#8C8276] hover:text-[#262320]'
                }`}
              >
                Dork Google
              </button>
              <button
                onClick={() => setPromptMode('ai_expert')}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition ${
                  promptMode === 'ai_expert'
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : 'text-[#8C8276] hover:text-[#262320]'
                }`}
              >
                Hỏi AI 990
              </button>
              <button
                onClick={() => setPromptMode('study4_vn')}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition ${
                  promptMode === 'study4_vn'
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : 'text-[#8C8276] hover:text-[#262320]'
                }`}
              >
                Web VN
              </button>
              <button
                onClick={() => setPromptMode('exact_quote')}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition ${
                  promptMode === 'exact_quote'
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : 'text-[#8C8276] hover:text-[#262320]'
                }`}
              >
                Chính xác
              </button>
            </div>
          </div>

          {/* Prompt description banner */}
          <div className="text-[10.5px] text-amber-900 bg-white/60 px-2.5 py-1 rounded-lg border border-amber-200">
            {promptMode === 'google_dork' && '🔍 Dork Google chuẩn: Tìm câu hỏi kèm 4 phương án (A)(B)(C)(D) hoặc file đề ETS.'}
            {promptMode === 'ai_expert' && '🤖 Prompt chuyên gia: Yêu cầu phân tích từ loại, dịch nghĩa, mẹo 5s và chỉ ra bẫy ETS.'}
            {promptMode === 'study4_vn' && '📚 Dork chuyên trang: Quét trực tiếp trên Study4, Toeic123, ZIM, Prep.'}
            {promptMode === 'exact_quote' && '🎯 Tìm nguyên văn chuỗi từ khóa trong ngoặc kép.'}
          </div>

          {/* Prompt Text Preview Box */}
          <div className="bg-white rounded-xl border border-amber-200 p-3 text-[12px] text-[#262320] leading-relaxed font-mono select-all cursor-text break-words shadow-2xs whitespace-pre-wrap max-h-56 overflow-y-auto">
            {generatedPrompt}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleCopy()}
              className={`flex items-center justify-center gap-2 py-2.5 px-2 rounded-xl text-[12px] font-bold cursor-pointer transition-all duration-200 shadow-xs ${
                copied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white border-2 border-amber-300 text-amber-900 hover:bg-amber-100'
              }`}
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-amber-700" />}
              {copied ? 'Đã copy vào Clipboard!' : 'Copy Prompt Này'}
            </button>

            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-[12px] font-bold bg-sky-500 hover:bg-sky-600 text-white cursor-pointer transition-all duration-200 no-underline shadow-xs"
            >
              <ExternalLink className="w-4 h-4" />
              Mở Google Ngay
            </a>
          </div>
        </div>
      )}

      {/* ── TAB 3: CỔNG TRA CỨU ĐA NGUỒN 1 CHẠM (MULTI-HUB SEARCH) ─────── */}
      {activeTab === 'web_hubs' && (
        <div className="rounded-2xl border border-[#EFE8DE] bg-white p-3.5 shadow-xs space-y-2.5 animate-in fade-in duration-200">
          <p className="text-[11px] font-bold text-[#8C8276] uppercase tracking-wide">
            🌐 Bấm 1 chạm để tra cứu trực tiếp trên các nền tảng:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Google Search */}
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl border border-sky-200 bg-sky-50/60 hover:bg-sky-100/80 transition cursor-pointer no-underline text-[#262320]"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🔍</span>
                <div>
                  <p className="text-[12px] font-bold text-sky-950">Google Search (ETS Dork)</p>
                  <p className="text-[10px] text-[#8C8276]">Tìm đề thi & đáp án chuẩn</p>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
            </a>

            {/* ChatGPT */}
            <a
              href={chatGptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/80 transition cursor-pointer no-underline text-[#262320]"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🤖</span>
                <div>
                  <p className="text-[12px] font-bold text-emerald-950">ChatGPT</p>
                  <p className="text-[10px] text-[#8C8276]">Tự động điền câu hỏi & giải</p>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            </a>

            {/* Perplexity AI */}
            <a
              href={perplexityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100/80 transition cursor-pointer no-underline text-[#262320]"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🧠</span>
                <div>
                  <p className="text-[12px] font-bold text-indigo-950">Perplexity AI</p>
                  <p className="text-[10px] text-[#8C8276]">AI tìm kiếm nguồn web trực tiếp</p>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
            </a>

            {/* Study4 / VN Portals */}
            <a
              href={study4Url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100/80 transition cursor-pointer no-underline text-[#262320]"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">📚</span>
                <div>
                  <p className="text-[12px] font-bold text-amber-950">Study4 & Kho Đề VN</p>
                  <p className="text-[10px] text-[#8C8276]">Quét trang giải đề TOEIC VN</p>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
            </a>
          </div>
        </div>
      )}

      {/* ── Step 4: Quick retry chips inside app ────────────────── */}
      {wordChips.length > 0 && (
        <div className="text-center mt-1">
          <p className="text-[10.5px] text-[#B0A89E] mb-1.5">
            Bấm từ khóa ngắn để tìm lại trong bộ đề nội bộ:
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {wordChips.map((word) => (
              <button
                key={word}
                onClick={() => onRetry(word)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#EFE8DE] bg-white text-[#5C554E] text-[11px] font-semibold cursor-pointer hover:bg-amber-50 hover:border-amber-300 transition"
              >
                <ChevronRight className="w-3 h-3 text-amber-500" />
                {word}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// Main SearchTab Component
// ============================================================
export const SearchTab: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [examSetFocus, setExamSetFocus] = useState<ExamSetFocus | null>(null);
  const [searchMode, setSearchMode] = useState<'search' | 'matrix'>('search');
  const [selectedBook, setSelectedBook] = useState<string>(EXAM_BOOKS_META[0]?.id || 'Hacker 2 (Full 200 câu)');
  const [selectedTestNum, setSelectedTestNum] = useState<string>('1');
  const [searchKindFilter, setSearchKindFilter] = useState<'all' | 'listening' | 'reading'>('all');
  const [searchPartFilter, setSearchPartFilter] = useState<'all' | number>('all');
  const [visibleLimit, setVisibleLimit] = useState<number>(60);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Global paste handler to open image OCR search
  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          setShowImageModal(true);
          break;
        }
      }
    };
    window.addEventListener('paste', handleGlobalPaste);
    return () => window.removeEventListener('paste', handleGlobalPaste);
  }, []);

  // Reset pagination on filter or query change
  useEffect(() => {
    setVisibleLimit(60);
  }, [query, searchKindFilter, searchPartFilter]);

  // ---- Comprehensive Dynamic search across all 5,666 questions ----
  const results = useMemo<SearchResult[]>(() => {
    const raw = query.trim();
    if (!raw) return [];
    const normQ = normalize(raw);
    if (!normQ) return [];

    const out: SearchResult[] = [];
    const numMatch = raw.match(/^(?:câu|cau|#|q)?\s*(\d+)$/i);
    const targetNum = numMatch ? parseInt(numMatch[1], 10) : null;
    const tokens = normQ.split(/\s+/).filter(Boolean);

    // 1. All Reading questions (4,566 questions)
    for (const q of allQuestions) {
      let matchedIn: MatchType | null = null;
      let score = 0;

      // Question number direct match
      if (targetNum !== null) {
        if (q.num === targetNum) {
          matchedIn = 'num';
          score += 200;
        } else if (String(q.num).startsWith(String(targetNum))) {
          matchedIn = 'num';
          score += 60;
        }
      }

      const normQuestion = normalize(q.question);
      const normOptions = Object.values(q.options).map(normalize).join(' ');
      const normExplanation = normalize(q.explanation || '');
      const normSource = normalize(q.source || '');
      const normCategory = normalize(q.category || '');
      const normTip = normalize(q.tip || '');
      const normMeaning = normalize(q.vietnameseMeaning || '');
      const normKeywords = (q.keywords || []).map(normalize).join(' ');
      const normPassage = q.passageInfo
        ? normalize(
            `${q.passageInfo.title} ${q.passageInfo.content} ${q.passageInfo.vietnameseTranslation || ''}`
          )
        : '';

      // Direct phrase match
      if (!matchedIn) {
        if (normQuestion.includes(normQ)) {
          matchedIn = 'question';
          score += 100;
        } else if (normOptions.includes(normQ)) {
          matchedIn = 'answer';
          score += 90;
        } else if (normPassage && normPassage.includes(normQ)) {
          matchedIn = 'passage';
          score += 85;
        } else if (normExplanation.includes(normQ)) {
          matchedIn = 'explanation';
          score += 70;
        } else if (
          normMeaning.includes(normQ) ||
          normKeywords.includes(normQ) ||
          normTip.includes(normQ)
        ) {
          matchedIn = 'keywords';
          score += 60;
        } else if (normSource.includes(normQ) || normCategory.includes(normQ)) {
          matchedIn = 'source';
          score += 50;
        }
      }

      // Multi-token fallback: raise if EVERY token appears somewhere in the question
      if (!matchedIn && tokens.length > 1) {
        const combined = `${q.num} câu ${q.num} ${normQuestion} ${normOptions} ${normPassage} ${normExplanation} ${normSource} ${normCategory} ${normTip} ${normMeaning} ${normKeywords}`;
        if (tokens.every((tok) => combined.includes(tok))) {
          if (normQuestion.includes(tokens[0])) matchedIn = 'question';
          else if (normOptions.includes(tokens[0])) matchedIn = 'answer';
          else if (normPassage.includes(tokens[0])) matchedIn = 'passage';
          else if (normSource.includes(tokens[0])) matchedIn = 'source';
          else matchedIn = 'explanation';
          score += 40 + tokens.length * 5;
        }
      }

      if (matchedIn) {
        out.push({ kind: 'reading', question: q, matchedIn, score });
      }
    }

    // 2. All Listening questions (1,100 questions: Hacker 2 LC Tests 1-10 [1,000 Qs] + Docs 2 LC [100 Qs])
    const allListening = getAllListeningQuestions();
    for (const q of allListening) {
      let matchedIn: MatchType | null = null;
      let score = 0;

      if (targetNum !== null) {
        if (q.num === targetNum) {
          matchedIn = 'num';
          score += 200;
        } else if (String(q.num).startsWith(String(targetNum))) {
          matchedIn = 'num';
          score += 60;
        }
      }

      const testNum = (q as any).test;
      const testSetName = testNum
        ? `hacker 2 test ${testNum} lc part ${q.part}`
        : `docs 2 listening part ${q.part}`;
      const normTestSet = normalize(testSetName);
      const normQuestion = normalize(q.question);
      const normTranscript = normalize(q.transcript || '');
      const normOptions = Object.values(q.options).map(normalize).join(' ');
      const normExplanation = normalize(q.explanation || '');
      const normCategory = normalize(q.category || '');
      const normTip = normalize(q.tip || '');
      const normAccent = normalize(q.accent || '');

      if (!matchedIn) {
        if (normQuestion.includes(normQ)) {
          matchedIn = 'question';
          score += 100;
        } else if (normTranscript.includes(normQ)) {
          matchedIn = 'transcript';
          score += 95;
        } else if (normOptions.includes(normQ)) {
          matchedIn = 'answer';
          score += 90;
        } else if (normExplanation.includes(normQ)) {
          matchedIn = 'explanation';
          score += 70;
        } else if (normTip.includes(normQ) || normAccent.includes(normQ)) {
          matchedIn = 'keywords';
          score += 60;
        } else if (normTestSet.includes(normQ) || normCategory.includes(normQ)) {
          matchedIn = 'source';
          score += 50;
        }
      }

      // Multi-token fallback
      if (!matchedIn && tokens.length > 1) {
        const combined = `${q.num} câu ${q.num} part ${q.part} p${q.part} ${normTestSet} ${normQuestion} ${normOptions} ${normTranscript} ${normExplanation} ${normCategory} ${normTip} ${normAccent}`;
        if (tokens.every((tok) => combined.includes(tok))) {
          if (normTranscript.includes(tokens[0])) matchedIn = 'transcript';
          else if (normQuestion.includes(tokens[0])) matchedIn = 'question';
          else if (normOptions.includes(tokens[0])) matchedIn = 'answer';
          else if (normTestSet.includes(tokens[0])) matchedIn = 'source';
          else matchedIn = 'explanation';
          score += 40 + tokens.length * 5;
        }
      }

      if (matchedIn) {
        out.push({ kind: 'listening', question: q, matchedIn, score });
      }
    }

    // Sort descending by score, then by question number
    return out.sort((a, b) => b.score - a.score || a.question.num - b.question.num);
  }, [query]);

  const handleToggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const clearSearch = () => {
    setQuery('');
    setExpandedId(null);
    inputRef.current?.focus();
  };

  // Filtered results by kind and part
  const filteredResults = useMemo(() => {
    return results.filter((r) => {
      if (searchKindFilter === 'listening' && r.kind !== 'listening') return false;
      if (searchKindFilter === 'reading' && r.kind !== 'reading') return false;
      if (searchPartFilter !== 'all') {
        const part =
          r.kind === 'listening'
            ? r.question.part
            : r.question.num <= 130
            ? 5
            : r.question.num <= 146
            ? 6
            : 7;
        if (part !== searchPartFilter) return false;
      }
      return true;
    });
  }, [results, searchKindFilter, searchPartFilter]);

  const lcCount = useMemo(() => results.filter((r) => r.kind === 'listening').length, [results]);
  const rcCount = useMemo(() => results.filter((r) => r.kind === 'reading').length, [results]);

  // Breakdown by parts for filter pills
  const partCounts = useMemo(() => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
    for (const r of results) {
      const part =
        r.kind === 'listening'
          ? r.question.part
          : r.question.num <= 130
          ? 5
          : r.question.num <= 146
          ? 6
          : 7;
      if (counts[part] !== undefined) counts[part]++;
    }
    return counts;
  }, [results]);

  const hasResults = results.length > 0;
  const showEmpty = query.trim().length > 0 && !hasResults;

  // ── If user tapped "Xem toàn bộ đề", show exam-set browser ──
  if (examSetFocus) {
    return (
      <ExamSetView
        focus={examSetFocus}
        searchQuery={query}
        onExit={() => setExamSetFocus(null)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* ---- Mode Switcher Pills ---- */}
      <div className="shrink-0 px-3 pt-2.5 pb-1 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 bg-[#EFE8DE]/60 p-0.5 rounded-xl border border-[#E5DDD2] text-xs font-bold">
          <button
            onClick={() => setSearchMode('search')}
            className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              searchMode === 'search'
                ? 'bg-white text-emerald-800 shadow-2xs font-extrabold'
                : 'text-[#6B635B] hover:text-[#262320]'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Tìm Theo Từ Khóa</span>
          </button>
          <button
            onClick={() => setSearchMode('matrix')}
            className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              searchMode === 'matrix'
                ? 'bg-emerald-600 text-white shadow-2xs font-extrabold'
                : 'text-[#6B635B] hover:text-[#262320]'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Bảng Đáp Án Trọn Bộ (Full Test)</span>
          </button>
        </div>

        {searchMode === 'matrix' && (
          <span className="text-[10px] text-emerald-700 font-semibold hidden sm:inline">
            Tra cứu toàn bộ 200 câu LC + RC
          </span>
        )}
      </div>

      {searchMode === 'matrix' ? (
        <div className="flex-1 overflow-y-auto px-3 py-2 min-h-0 space-y-3">
          {/* Book & Test Selection Bar */}
          <div className="bg-white p-3 rounded-2xl border border-[#EFE8DE] shadow-xs flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <label className="text-xs font-bold text-[#5C5247]">Bộ Đề:</label>
              <select
                value={selectedBook}
                onChange={(e) => {
                  setSelectedBook(e.target.value);
                  setSelectedTestNum('1');
                }}
                className="bg-[#FAF7F2] border border-[#DCD3C7] text-xs font-bold rounded-xl px-2.5 py-1.5 text-[#262320] focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {EXAM_BOOKS_META.map((bm) => (
                  <option key={bm.id} value={bm.id}>
                    {bm.name}
                  </option>
                ))}
              </select>

              <label className="text-xs font-bold text-[#5C5247] ml-1">Đề Thi:</label>
              <select
                value={selectedTestNum}
                onChange={(e) => setSelectedTestNum(e.target.value)}
                className="bg-[#FAF7F2] border border-[#DCD3C7] text-xs font-bold rounded-xl px-2.5 py-1.5 text-[#262320] focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {selectedBook === 'Docs 2 (Reading)' ? (
                  <>
                    <option value="Đề 1 (Trial Test)">Đề 1 (Trial Test - 134 câu)</option>
                    <option value="Đề 2 (YBM Test 1)">Đề 2 (YBM Test 1 - 100 câu)</option>
                  </>
                ) : selectedBook === 'Docs 1 (Test 2)' ? (
                  <option value="Test 2">Test 2 (100 câu)</option>
                ) : (
                  Array.from({ length: 10 }, (_, i) => i + 1).map((t) => (
                    <option key={t} value={String(t)}>
                      Test {t}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => useQuizStore.getState().openFullAnswers({ book: selectedBook, test: selectedTestNum })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition cursor-pointer"
                title="Mở toàn màn hình xem đáp án nén 1 màn hình"
              >
                <Table className="w-3.5 h-3.5" />
                <span>Xem Bảng Nén 1 Màn Hình</span>
              </button>
              <div className="text-[11px] font-mono text-[#8C8276] hidden sm:block">
                {selectedBook} • Đề #{selectedTestNum}
              </div>
            </div>
          </div>

          {/* Quick Stats & Jump */}
          {(() => {
            const currentKeys = MASTER_ANSWER_KEYS[selectedBook]?.[selectedTestNum] || {};
            const qNums = Object.keys(currentKeys).map(Number).sort((a, b) => a - b);
            const lcNums = qNums.filter((n) => n <= 100);
            const rcNums = qNums.filter((n) => n > 100);

            if (qNums.length === 0) {
              return (
                <div className="bg-white p-8 rounded-2xl border border-[#EFE8DE] text-center text-[#8C8276] text-xs">
                  Không tìm thấy đáp án cho bộ đề này.
                </div>
              );
            }

            const renderQuestionBlocks = (nums: number[], isLc: boolean) => {
              const blocks: number[][] = [];
              for (let i = 0; i < nums.length; i += 5) {
                blocks.push(nums.slice(i, i + 5));
              }

              const pillStyles: Record<string, { bg: string; text: string }> = {
                A: { bg: 'bg-sky-500', text: 'text-white' },
                B: { bg: 'bg-indigo-600', text: 'text-white' },
                C: { bg: 'bg-emerald-600', text: 'text-white' },
                D: { bg: 'bg-amber-500', text: 'text-white' },
              };

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {blocks.map((block, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border border-[#E8DFD3] p-2.5 shadow-2xs space-y-1.5 hover:border-emerald-300 transition"
                    >
                      <div className="flex items-center justify-between text-[10.5px] font-bold text-[#8C8276] pb-1 border-b border-[#F4EFEA]">
                        <span>Câu {block[0]} - {block[block.length - 1]}</span>
                        <span className={`text-[9px] font-mono px-1 rounded ${isLc ? 'bg-sky-50 text-sky-700' : 'bg-amber-50 text-amber-800'}`}>
                          {isLc ? 'LC' : 'RC'}
                        </span>
                      </div>

                      <div className="space-y-1">
                        {block.map((num) => {
                          const ans = currentKeys[num] || '-';
                          const style = pillStyles[ans] || { bg: 'bg-gray-400', text: 'text-white' };

                          return (
                            <div
                              key={num}
                              className="flex items-center justify-between px-2 py-1 rounded-lg bg-[#FAF8F5] border border-[#F2ECE3] hover:bg-white text-xs"
                            >
                              <span className="font-mono font-bold text-[#5C5247]">#{num}</span>
                              <div className="flex items-center gap-1">
                                {(['A', 'B', 'C', 'D'] as const).map((ch) => {
                                  const isSelected = ans === ch;
                                  return (
                                    <span
                                      key={ch}
                                      className={`w-5 h-5 rounded-md text-[11px] font-black flex items-center justify-center transition ${
                                        isSelected ? `${style.bg} ${style.text} shadow-2xs` : 'text-[#D0C7BD]'
                                      }`}
                                    >
                                      {ch}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              );
            };

            return (
              <div className="space-y-4">
                {/* Listening Keys (1-100) */}
                {lcNums.length > 0 && (
                  <div className="bg-[#FAF7F2] rounded-2xl border border-sky-200/80 p-3 sm:p-4 shadow-2xs space-y-2.5">
                    <div className="flex items-center justify-between pb-1.5 border-b border-sky-200">
                      <span className="font-extrabold text-xs text-sky-900 flex items-center gap-1.5">
                        <Mic className="w-3.5 h-3.5 text-sky-600" />
                        🎧 LISTENING KEY (Câu 1 - 100)
                      </span>
                      <span className="text-[10px] text-sky-700 font-bold bg-sky-100 px-2 py-0.5 rounded-full">
                        {lcNums.length} câu
                      </span>
                    </div>

                    {renderQuestionBlocks(lcNums, true)}
                  </div>
                )}

                {/* Reading Keys (101-200) */}
                {rcNums.length > 0 && (
                  <div className="bg-[#FAF7F2] rounded-2xl border border-amber-200/80 p-3 sm:p-4 shadow-2xs space-y-2.5">
                    <div className="flex items-center justify-between pb-1.5 border-b border-amber-200">
                      <span className="font-extrabold text-xs text-amber-900 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                        📖 READING KEY (Câu 101 - 200)
                      </span>
                      <span className="text-[10px] text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-full">
                        {rcNums.length} câu
                      </span>
                    </div>

                    {renderQuestionBlocks(rcNums, false)}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      ) : (
      <>
      {/* ---- Search bar & Filters ---- */}
      <div className="shrink-0 px-3 pt-1 pb-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0A89E] pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setExpandedId(null);
              }}
              placeholder="Tìm tất cả: câu hỏi, từ khóa, transcript, giải thích, số câu (vd: hacker 2 45, 101, once, as does)..."
              className="w-full pl-9 pr-10 py-2.5 rounded-2xl border-2 border-[#EFE8DE] bg-white text-[13.5px] text-[#262320] placeholder:text-[#B0A89E] focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all shadow-xs"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B0A89E] hover:text-[#262320] transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowImageModal(true)}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs shadow-xs transition-all cursor-pointer shrink-0 border border-amber-400/40 active:scale-95"
            title="Tìm kiếm bằng hình ảnh hoặc dán ảnh chụp đề (Ctrl+V)"
          >
            <Camera className="w-4 h-4" />
            <span className="hidden sm:inline">Tìm Bằng Ảnh (OCR)</span>
            <span className="sm:hidden">Ảnh</span>
          </button>
        </div>

        {hasResults && (
          <div className="mt-2.5 space-y-2 px-1">
            <div className="flex flex-wrap items-center justify-between gap-1.5 text-[11px] text-[#8C8276]">
              <span>
                Tìm thấy <span className="font-extrabold text-amber-700">{results.length}</span> câu hỏi (Toàn bộ 5.666 câu LC + RC)
              </span>
              <span className="text-[10px] text-[#B0A89E]">
                Hiển thị <span className="font-bold text-[#5C554E]">{Math.min(visibleLimit, filteredResults.length)}</span> / {filteredResults.length} câu
              </span>
            </div>

            {/* Kind & Part Filters */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setSearchKindFilter('all')}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                  searchKindFilter === 'all'
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : 'bg-[#F2ECE3] text-[#6B635B] hover:bg-[#EAE2D7]'
                }`}
              >
                Tất cả ({results.length})
              </button>
              <button
                onClick={() => setSearchKindFilter('listening')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                  searchKindFilter === 'listening'
                    ? 'bg-sky-600 text-white shadow-2xs'
                    : 'bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100'
                }`}
              >
                <Headphones className="w-3 h-3" />
                <span>Nghe ({lcCount})</span>
              </button>
              <button
                onClick={() => setSearchKindFilter('reading')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                  searchKindFilter === 'reading'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <BookOpen className="w-3 h-3" />
                <span>Đọc ({rcCount})</span>
              </button>

              <span className="h-4 w-px bg-[#DCD3C7] mx-0.5" />

              <button
                onClick={() => setSearchPartFilter('all')}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                  searchPartFilter === 'all'
                    ? 'bg-[#262320] text-white'
                    : 'bg-white border border-[#DCD3C7] text-[#6B635B] hover:bg-gray-50'
                }`}
              >
                All Parts
              </button>
              {([1, 2, 3, 4, 5, 6, 7] as const).map((p) => {
                const count = partCounts[p] || 0;
                if (count === 0 && searchPartFilter !== p) return null;
                const isLc = p <= 4;
                return (
                  <button
                    key={p}
                    onClick={() => setSearchPartFilter(searchPartFilter === p ? 'all' : p)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                      searchPartFilter === p
                        ? isLc ? 'bg-sky-600 text-white' : 'bg-amber-600 text-white'
                        : isLc
                        ? 'bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100'
                        : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    P{p} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ---- Results Scroll View ---- */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 min-h-0 space-y-2">
        {/* Empty / hint state */}
        {!query.trim() && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-10">
            <Search className="w-12 h-12 text-[#D4CBBC]" />
            <p className="text-[#8C8276] font-bold text-sm">Tra cứu toàn diện 5.666 câu TOEIC</p>
            <p className="text-[11.5px] text-[#B0A89E] max-w-sm leading-relaxed">
              Tìm theo bất kỳ từ khóa nào trong đề: câu hỏi, đáp án, transcript, giọng đọc, bài đọc, số câu (vd: 101, hacker 2 45, once, as does).
            </p>
            <div className="mt-2 flex flex-wrap gap-2 justify-center max-w-md">
              {[
                'hacker 2 45',
                'câu 101',
                'transcript',
                'as does',
                'Once',
                'water leak',
                'native',
                'deputy',
              ].map((ex) => (
                <button
                  key={ex}
                  onClick={() => setQuery(ex)}
                  className="px-2.5 py-1 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 text-[11px] font-semibold cursor-pointer hover:bg-amber-100 transition shadow-2xs"
                >
                  {ex}
                </button>
              ))}
            </div>

            {/* Quick jump: browse exam sets directly */}
            <div className="mt-4 w-full max-w-md text-left space-y-3">
              <p className="text-[11px] font-bold text-[#8C8276] px-1">
                📚 Xem toàn bộ danh sách câu theo đề:
              </p>

              {/* Hacker 2 LC */}
              <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-2.5 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-sky-900 px-1">
                  <span className="flex items-center gap-1.5">
                    <Headphones className="w-3.5 h-3.5 text-sky-600" />
                    Hacker 2 Listening (Tests 1 - 10)
                  </span>
                  <span className="text-[10px] text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                    1.000 câu LC
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((t) => (
                    <button
                      key={`h2_lc_${t}`}
                      onClick={() =>
                        setExamSetFocus({
                          kind: 'listening',
                          setKey: `hacker2_t${t}`,
                          originId: `hacker2_t${t}_q1`,
                        })
                      }
                      className="px-2 py-1.5 rounded-lg bg-white border border-sky-200 hover:bg-sky-500 hover:text-white text-sky-800 text-xs font-bold text-center transition cursor-pointer"
                    >
                      Test {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reading Sources */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-2.5 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-amber-900 px-1">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                    Hacker 2 Reading & Toàn bộ Đề RC
                  </span>
                  <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                    4.566 câu RC
                  </span>
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                  {ALL_READING_SOURCES.slice(0, 15).map((src) => {
                    const count = allQuestions.filter((q) => q.source === src).length;
                    return (
                      <button
                        key={src}
                        onClick={() =>
                          setExamSetFocus({
                            kind: 'reading',
                            setKey: src,
                            originId: allQuestions.find((q) => q.source === src)?.id ?? '',
                          })
                        }
                        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border border-[#EFE8DE] bg-white hover:border-amber-300 hover:bg-amber-50 text-[11.5px] text-[#262320] font-medium cursor-pointer transition"
                      >
                        <span className="truncate pr-2">{src}</span>
                        <span className="text-[10px] text-[#8C8276] shrink-0">{count} câu →</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Empty results panel ── */}
        {showEmpty && (
          <NoResultsPanel query={query} onRetry={(word) => setQuery(word)} />
        )}

        {/* ── Direct Question Cards (Raised immediately!) ── */}
        {filteredResults.slice(0, visibleLimit).map((r) => {
          const id = r.question.id;
          return r.kind === 'reading' ? (
            <ReadingQuestionCard
              key={id}
              question={r.question}
              query={query}
              matchedIn={r.matchedIn}
              isExpanded={expandedId === id}
              onToggle={() => handleToggle(id)}
              showViewExamSetBtn
              onViewExamSet={() =>
                setExamSetFocus({
                  kind: 'reading',
                  setKey: r.question.source,
                  originId: id,
                })
              }
            />
          ) : (
            <ListeningQuestionCard
              key={id}
              question={r.question}
              query={query}
              matchedIn={r.matchedIn}
              isExpanded={expandedId === id}
              onToggle={() => handleToggle(id)}
              showViewExamSetBtn
              onViewExamSet={() => {
                const testVal = (r.question as any).test;
                setExamSetFocus({
                  kind: 'listening',
                  setKey: testVal ? `hacker2_t${testVal}` : String(r.question.part),
                  originId: id,
                });
              }}
            />
          );
        })}

        {/* Load more / Pagination buttons */}
        {filteredResults.length > visibleLimit && (
          <div className="pt-3 pb-6 flex flex-col sm:flex-row items-center justify-center gap-2">
            <button
              onClick={() => setVisibleLimit((prev) => prev + 60)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition cursor-pointer"
            >
              Hiển thị thêm 60 câu nữa (Còn {filteredResults.length - visibleLimit} câu)
            </button>
            <button
              onClick={() => setVisibleLimit(filteredResults.length)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-gray-50 border border-[#EFE8DE] text-[#5C554E] font-semibold text-xs transition cursor-pointer"
            >
              Xem tất cả ({filteredResults.length} câu)
            </button>
          </div>
        )}
      </div>
      </>
      )}

      <ImageSearchModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        onSelectQuery={(q) => {
          setQuery(q);
          setSearchMode('search');
          setShowImageModal(false);
          inputRef.current?.focus();
        }}
      />
    </div>
  );
};

export default SearchTab;
