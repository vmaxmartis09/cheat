import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { allQuestions } from '../data/questions';
import { listeningQuestions } from '../data/listeningQuestions';
import { Question, AnswerChoice } from '../types';
import { ListeningQuestion } from '../data/listeningQuestions';
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
} from 'lucide-react';

// ============================================================
// Types
// ============================================================
type SearchResult =
  | { kind: 'reading'; question: Question; matchedIn: 'question' | 'answer' | 'passage' | 'num' }
  | { kind: 'listening'; question: ListeningQuestion; matchedIn: 'question' | 'answer' | 'num' };

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
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const normQ = normalize(query);
  const parts: React.ReactNode[] = [];
  let i = 0;
  const lower = normalize(text);
  while (i < text.length) {
    const idx = lower.indexOf(normQ, i);
    if (idx === -1) {
      parts.push(text.slice(i));
      break;
    }
    if (idx > i) parts.push(text.slice(i, idx));
    parts.push(
      <mark key={idx} className="bg-amber-200 text-amber-900 rounded px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
    );
    i = idx + query.length;
  }
  return <>{parts}</>;
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
  isExpanded: boolean;
  isHighlighted?: boolean;
  onToggle: () => void;
  onViewExamSet?: () => void;
  showViewExamSetBtn?: boolean;
}> = ({ question, query, isExpanded, isHighlighted, onToggle, onViewExamSet, showViewExamSetBtn }) => {
  const q = question;
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when highlighted (exam set focus)
  useEffect(() => {
    if (isHighlighted && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isHighlighted]);

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
          <div className="flex flex-wrap items-center gap-1 mb-1">
            <span className="text-[10px] font-semibold text-[#8C8276] uppercase tracking-wide">
              {q.source}
            </span>
            <span className="text-[10px] text-[#B0A89E]">·</span>
            <span className="text-[10px] text-[#8C8276]">{q.category}</span>
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
            <div className="mt-3 p-3 rounded-xl bg-sky-50/70 border border-sky-200 text-[12px] text-sky-900 max-h-48 overflow-y-auto leading-relaxed whitespace-pre-wrap">
              <p className="font-bold text-sky-700 mb-1">📄 {q.passageInfo.title}</p>
              {highlight(q.passageInfo.content, query)}
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
            {q.explanation}
          </div>

          {q.tip && (
            <div className="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11.5px] text-amber-900 leading-relaxed">
              {q.tip}
            </div>
          )}

          {/* "View exam set" button */}
          {showViewExamSetBtn && onViewExamSet && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewExamSet();
              }}
              className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-[12.5px] font-bold cursor-pointer transition-all shadow-sm"
            >
              <Layers className="w-4 h-4" />
              Xem toàn bộ đề "{q.source}" (câu 1 → {allQuestions.filter(x => x.source === q.source).length})
            </button>
          )}
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
  isExpanded: boolean;
  isHighlighted?: boolean;
  onToggle: () => void;
  onViewExamSet?: () => void;
  showViewExamSetBtn?: boolean;
}> = ({ question, query, isExpanded, isHighlighted, onToggle, onViewExamSet, showViewExamSetBtn }) => {
  const q = question;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHighlighted && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isHighlighted]);

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
          <div className="flex flex-wrap items-center gap-1 mb-1">
            <Mic className="w-3 h-3 text-sky-500" />
            <span className="text-[10px] font-semibold text-sky-700 uppercase tracking-wide">
              Listening Part {q.part}
            </span>
            <span className="text-[10px] text-[#B0A89E]">·</span>
            <span className="text-[10px] text-[#8C8276]">{q.category}</span>
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
          <p className="mt-3 text-[13.5px] font-semibold leading-relaxed text-[#262320]">
            {highlight(q.question, query)}
          </p>

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

          <div className="mt-3 p-2.5 rounded-xl bg-white border border-[#EFE8DE] text-[11.5px] text-[#5C554E] leading-relaxed">
            <span className="font-bold text-sky-700">💡 Giải thích: </span>
            {q.explanation}
          </div>

          {q.tip && (
            <div className="mt-2 p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-[11.5px] text-sky-900 leading-relaxed">
              {q.tip}
            </div>
          )}

          {q.transcript && (
            <div className="mt-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 leading-relaxed whitespace-pre-wrap font-mono">
              <span className="font-bold not-italic text-slate-500 text-[10px] uppercase">
                Transcript:
              </span>
              {'\n'}
              {q.transcript}
            </div>
          )}

          {showViewExamSetBtn && onViewExamSet && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewExamSet();
              }}
              className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-[12.5px] font-bold cursor-pointer transition-all shadow-sm"
            >
              <Layers className="w-4 h-4" />
              Xem toàn bộ Listening Part {q.part} ({listeningQuestions.filter((x) => x.part === q.part).length} câu)
            </button>
          )}
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
      const partNum = parseInt(focus.setKey) as 1 | 2 | 3 | 4;
      return listeningQuestions
        .filter((q) => q.part === partNum)
        .sort((a, b) => a.num - b.num);
    }
  }, [focus]);

  const setLabel =
    focus.kind === 'reading'
      ? focus.setKey
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
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#EFE8DE] text-[11.5px] font-semibold text-[#5C554E] hover:bg-gray-50 cursor-pointer transition shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Thoát
          </button>
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
  const [focusedPassageId, setFocusedPassageId] = useState<string | null>(null);
  const [examSetFocus, setExamSetFocus] = useState<ExamSetFocus | null>(null);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // ---- Dynamic search (hooks MUST be before any conditional return) ----
  const results = useMemo<SearchResult[]>(() => {
    const raw = query.trim();
    if (!raw) return [];
    const normQ = normalize(raw);
    const out: SearchResult[] = [];
    const isNumericSearch = /^\d+$/.test(raw);

    // Reading questions
    for (const q of allQuestions) {
      if (isNumericSearch) {
        if (String(q.num).startsWith(raw)) {
          out.push({ kind: 'reading', question: q, matchedIn: 'num' });
          continue;
        }
      }
      if (normalize(q.question).includes(normQ)) {
        out.push({ kind: 'reading', question: q, matchedIn: 'question' });
        continue;
      }
      if (Object.values(q.options).some((opt) => normalize(opt).includes(normQ))) {
        out.push({ kind: 'reading', question: q, matchedIn: 'answer' });
        continue;
      }
      if (q.passageInfo && normalize(q.passageInfo.content).includes(normQ)) {
        out.push({ kind: 'reading', question: q, matchedIn: 'passage' });
        continue;
      }
    }

    // Listening questions
    for (const q of listeningQuestions) {
      if (isNumericSearch) {
        if (String(q.num).startsWith(raw)) {
          out.push({ kind: 'listening', question: q, matchedIn: 'num' });
          continue;
        }
      }
      if (normalize(q.question).includes(normQ)) {
        out.push({ kind: 'listening', question: q, matchedIn: 'question' });
        continue;
      }
      if (Object.values(q.options).some((opt) => normalize(opt).includes(normQ))) {
        out.push({ kind: 'listening', question: q, matchedIn: 'answer' });
        continue;
      }
    }

    return out;
  }, [query]);

  const handleToggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const clearSearch = () => {
    setQuery('');
    setExpandedId(null);
    setFocusedPassageId(null);
    inputRef.current?.focus();
  };

  // Group passage results
  const passageGroups = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    const solo: SearchResult[] = [];
    for (const r of results) {
      if (r.kind === 'reading' && r.question.passageId) {
        const pid = r.question.passageId;
        if (!groups[pid]) groups[pid] = [];
        groups[pid].push(r);
      } else {
        solo.push(r);
      }
    }
    return { groups, solo };
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
      {/* ---- Search bar ---- */}
      <div className="shrink-0 px-3 pt-3 pb-2">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0A89E] pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setExpandedId(null);
              setFocusedPassageId(null);
            }}
            placeholder="Nhập câu hỏi, đáp án, đoạn văn hoặc số câu…"
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

        {hasResults && (
          <div className="mt-2 flex items-center gap-2 px-1">
            <span className="text-[11px] text-[#8C8276]">
              Tìm thấy{' '}
              <span className="font-bold text-amber-700">{results.length}</span> kết quả
            </span>
            <span className="flex-1 h-px bg-[#EFE8DE]" />
            <span className="text-[10px] text-[#B0A89E]">
              Mở câu → nhấn <strong>Xem toàn bộ đề</strong> 📚
            </span>
          </div>
        )}
      </div>

      {/* ---- Results ---- */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 min-h-0 space-y-2">
        {/* Empty / hint state */}
        {!query.trim() && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-12">
            <Search className="w-12 h-12 text-[#D4CBBC]" />
            <p className="text-[#8C8276] font-semibold text-sm">Tra đáp án nhanh</p>
            <p className="text-[11px] text-[#B0A89E] max-w-[280px] leading-relaxed">
              Tìm theo câu hỏi, đáp án, đoạn văn hoặc số câu. Tìm thấy → mở câu → nhấn{' '}
              <strong>Xem toàn bộ đề</strong> để đọc cả bộ đề từ câu 1.
            </p>
            <div className="mt-2 flex flex-wrap gap-2 justify-center">
              {['101', 'native', 'as does', 'Once'].map((ex) => (
                <button
                  key={ex}
                  onClick={() => setQuery(ex)}
                  className="px-2.5 py-1 rounded-lg border border-amber-200 bg-amber-50 text-amber-800 text-[11px] font-semibold cursor-pointer hover:bg-amber-100 transition"
                >
                  {ex}
                </button>
              ))}
            </div>

            {/* Quick jump: browse exam sets directly */}
            <div className="mt-4 w-full max-w-sm text-left">
              <p className="text-[11px] font-bold text-[#8C8276] mb-2 px-1">
                📚 Hoặc chọn thẳng bộ đề:
              </p>
              <div className="flex flex-col gap-1.5">
                {ALL_READING_SOURCES.map((src) => {
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
                      className="flex items-center justify-between px-3 py-2 rounded-xl border border-[#EFE8DE] bg-white hover:border-amber-300 hover:bg-amber-50 text-[12px] text-[#262320] font-medium cursor-pointer transition"
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                        {src}
                      </span>
                      <span className="text-[10px] text-[#B0A89E]">{count} câu →</span>
                    </button>
                  );
                })}
                {([1, 2, 3, 4] as const).map((part) => {
                  const count = listeningQuestions.filter((q) => q.part === part).length;
                  return (
                    <button
                      key={`lc_p${part}`}
                      onClick={() =>
                        setExamSetFocus({
                          kind: 'listening',
                          setKey: String(part),
                          originId: listeningQuestions.find((q) => q.part === part)?.id ?? '',
                        })
                      }
                      className="flex items-center justify-between px-3 py-2 rounded-xl border border-[#EFE8DE] bg-white hover:border-sky-300 hover:bg-sky-50 text-[12px] text-[#262320] font-medium cursor-pointer transition"
                    >
                      <span className="flex items-center gap-2">
                        <Mic className="w-3.5 h-3.5 text-sky-600" />
                        Listening Part {part}
                      </span>
                      <span className="text-[10px] text-[#B0A89E]">{count} câu →</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Empty results panel with Part selector, prompt modes, and in-app web viewer ── */}
        {showEmpty && (
          <NoResultsPanel query={query} onRetry={(word) => setQuery(word)} />
        )}

        {/* Solo results */}
        {passageGroups.solo.map((r) => {
          const id = r.question.id;
          return r.kind === 'reading' ? (
            <ReadingQuestionCard
              key={id}
              question={r.question}
              query={query}
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
              question={(r as { kind: 'listening'; question: ListeningQuestion; matchedIn: string }).question}
              query={query}
              isExpanded={expandedId === id}
              onToggle={() => handleToggle(id)}
              showViewExamSetBtn
              onViewExamSet={() =>
                setExamSetFocus({
                  kind: 'listening',
                  setKey: String((r as { kind: 'listening'; question: ListeningQuestion; matchedIn: string }).question.part),
                  originId: id,
                })
              }
            />
          );
        })}

        {/* Passage groups */}
        {Object.entries(passageGroups.groups).map(([pid, groupResults]) => {
          const firstR = groupResults[0];
          const passageInfo =
            firstR.kind === 'reading' ? firstR.question.passageInfo : undefined;
          const isFocused = focusedPassageId === pid;

          return (
            <div
              key={pid}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isFocused
                  ? 'border-amber-400 shadow-md'
                  : 'border-[#EFE8DE] hover:border-amber-300'
              }`}
            >
              <button
                onClick={() =>
                  setFocusedPassageId((prev) => (prev === pid ? null : pid))
                }
                className="w-full text-left flex items-start gap-3 px-4 py-3 bg-amber-50/60 cursor-pointer"
              >
                <span className="shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-amber-200 text-amber-900 border border-amber-300">
                  Đoạn văn
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-amber-900 line-clamp-1">
                    {passageInfo?.title ?? pid}
                  </p>
                  <p className="text-[11px] text-[#8C8276]">
                    {groupResults.length} câu hỏi khớp
                  </p>
                </div>
                {isFocused ? (
                  <ChevronUp className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#B0A89E] shrink-0 mt-0.5" />
                )}
              </button>

              {isFocused && (
                <div className="bg-white">
                  {passageInfo && (
                    <div className="px-4 pt-3 pb-2">
                      <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200 text-[12px] text-sky-900 max-h-52 overflow-y-auto leading-relaxed whitespace-pre-wrap">
                        <p className="font-bold text-sky-700 mb-1">📄 {passageInfo.title}</p>
                        {highlight(passageInfo.content, query)}
                      </div>
                    </div>
                  )}

                  <div className="px-4 pb-2 space-y-2">
                    {groupResults.map((r) => {
                      if (r.kind !== 'reading') return null;
                      const q = r.question;
                      return (
                        <ReadingQuestionCard
                          key={q.id}
                          question={q}
                          query={query}
                          isExpanded={expandedId === q.id}
                          onToggle={() => handleToggle(q.id)}
                          showViewExamSetBtn
                          onViewExamSet={() =>
                            setExamSetFocus({
                              kind: 'reading',
                              setKey: q.source,
                              originId: q.id,
                            })
                          }
                        />
                      );
                    })}
                  </div>

                  {/* View full exam set for passage's source */}
                  {firstR.kind === 'reading' && (
                    <div className="px-4 pb-3">
                      <button
                        onClick={() =>
                          setExamSetFocus({
                            kind: 'reading',
                            setKey: firstR.question.source,
                            originId: firstR.question.id,
                          })
                        }
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-[12.5px] font-bold cursor-pointer transition-all shadow-sm"
                      >
                        <Layers className="w-4 h-4" />
                        Xem toàn bộ đề "{firstR.question.source}"
                      </button>
                    </div>
                  )}

                  <div className="px-4 pb-3">
                    <button
                      onClick={() => setFocusedPassageId(null)}
                      className="w-full text-center text-[11px] text-[#8C8276] py-1.5 rounded-xl hover:bg-amber-50 transition cursor-pointer border border-[#EFE8DE]"
                    >
                      ✕ Thu gọn đoạn văn này
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchTab;
