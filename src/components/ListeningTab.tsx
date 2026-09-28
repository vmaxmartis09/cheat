import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  getListeningQuestionsByPart,
  ListeningQuestion,
} from '../data/listeningQuestions';
import { AnswerChoice } from '../types';
import { useQuizStore } from '../store/useQuizStore';
import {
  Headphones,
  Play,
  Pause,
  Volume2,
  VolumeX,
  FastForward,
  Rewind,
  FileText,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Lightbulb,
  Radio,
  Flame,
  X,
  Maximize2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ListeningTab: React.FC = () => {
  // Store integration
  const { listeningAnswersMap, selectListeningAnswer } = useQuizStore();

  // Component state
  const [selectedPart, setSelectedPart] = useState<number | 'all'>('all');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [autoShowLiveScript, setAutoShowLiveScript] = useState<boolean>(true);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Audio player state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Filtered question set
  const filteredQuestions: ListeningQuestion[] = React.useMemo(() => {
    return getListeningQuestionsByPart(selectedPart);
  }, [selectedPart]);

  const currentQ: ListeningQuestion | undefined = filteredQuestions[currentIdx];

  // Map audio URL according to question's part
  const currentAudioUrl = React.useMemo(() => {
    if (!currentQ) return '/audio/part1.mp3';
    return `/audio/part${currentQ.part}.mp3`;
  }, [currentQ]);

  // Reset audio when question part changes
  useEffect(() => {
    if (audioRef.current && currentAudioUrl) {
      const wasPlaying = isPlaying;
      audioRef.current.src = currentAudioUrl;
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentAudioUrl]);

  // Audio event listeners
  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const seekRelative = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  // Handle Answer Selection
  const handleSelectAnswer = useCallback((choice: AnswerChoice) => {
    if (!currentQ) return;
    if (listeningAnswersMap[currentQ.id]) return; // already answered

    const isCorrect = choice === currentQ.correctAnswer;
    selectListeningAnswer(currentQ.id, choice, isCorrect);

    if (isCorrect) {
      setCurrentStreak((s) => s + 1);
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.8 },
      });
    } else {
      setCurrentStreak(0);
      setShowTranscript(true); // Auto show transcript on mistake
    }
  }, [currentQ, listeningAnswersMap, selectListeningAnswer]);

  // Navigation
  const handleNext = () => {
    if (currentIdx + 1 < filteredQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setShowTranscript(false);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
      setShowTranscript(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA'].includes(target.tagName)) return;

      if (['1', 'a', 'A'].includes(e.key)) handleSelectAnswer('A');
      else if (['2', 'b', 'B'].includes(e.key)) handleSelectAnswer('B');
      else if (['3', 'c', 'C'].includes(e.key)) handleSelectAnswer('C');
      else if (['4', 'd', 'D'].includes(e.key) && currentQ?.options['D']) handleSelectAnswer('D');
      else if (e.key === ' ' && e.shiftKey) {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSelectAnswer, currentQ]);

  // Total stats
  const totalAnswered = Object.keys(listeningAnswersMap).length;
  const correctCount = Object.values(listeningAnswersMap).filter((a) => a.isCorrect).length;
  const currentAnswerRecord = currentQ ? listeningAnswersMap[currentQ.id] : undefined;

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-[#FAF7F2] text-[#262320]">
      {/* 1. TOP SUB-HEADER: PART SELECTOR & STATS */}
      <div className="bg-white border-b border-[#EAE3D8] px-3 py-2 shrink-0">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Part Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto py-0.5 text-xs font-bold scrollbar-none">
            <button
              onClick={() => { setSelectedPart('all'); setCurrentIdx(0); }}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer whitespace-nowrap ${
                selectedPart === 'all'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-[#F4EFEA] text-[#6A625A] hover:bg-[#EAE3D8]'
              }`}
            >
              Tất cả (100 câu)
            </button>
            <button
              onClick={() => { setSelectedPart(1); setCurrentIdx(0); }}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer whitespace-nowrap ${
                selectedPart === 1
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-[#F4EFEA] text-[#6A625A] hover:bg-[#EAE3D8]'
              }`}
            >
              Part 1 (Q1-6 Có Ảnh)
            </button>
            <button
              onClick={() => { setSelectedPart(2); setCurrentIdx(0); }}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer whitespace-nowrap ${
                selectedPart === 2
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-[#F4EFEA] text-[#6A625A] hover:bg-[#EAE3D8]'
              }`}
            >
              Part 2 (Q7-31 Hỏi Đáp)
            </button>
            <button
              onClick={() => { setSelectedPart(3); setCurrentIdx(0); }}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer whitespace-nowrap ${
                selectedPart === 3
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-[#F4EFEA] text-[#6A625A] hover:bg-[#EAE3D8]'
              }`}
            >
              Part 3 (Q32-70 Hội Thoại)
            </button>
            <button
              onClick={() => { setSelectedPart(4); setCurrentIdx(0); }}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer whitespace-nowrap ${
                selectedPart === 4
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-[#F4EFEA] text-[#6A625A] hover:bg-[#EAE3D8]'
              }`}
            >
              Part 4 (Q71-100 Độc Thoại)
            </button>
          </div>

          {/* Quick Score & Streak */}
          <div className="flex items-center gap-2 text-xs">
            {currentStreak > 1 && (
              <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-200">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                {currentStreak}
              </span>
            )}
            <span className="text-[#7A7268] font-medium">
              Đúng: <strong className="text-emerald-700 font-bold">{correctCount}</strong>/{totalAnswered}
            </span>
          </div>
        </div>
      </div>

      {/* 2. AUDIO PLAYER BAR */}
      <div className="bg-[#FAF7F2] border-b border-[#EAE3D8] px-3 py-2 shrink-0 shadow-2xs">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Audio metadata & audio tag */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-800 shrink-0">
              <Headphones className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#262320] truncate">
                Hackers LC Test 7 — Part {currentQ?.part || 1}
              </div>
              <div className="text-[10px] text-[#7A7268] flex items-center gap-1.5">
                <Radio className="w-2.5 h-2.5 text-amber-600 animate-pulse" />
                <span>Audio chất lượng cao</span>
                {currentQ?.accent && (
                  <span className="bg-amber-100/70 text-amber-900 px-1 rounded text-[9px] font-semibold truncate max-w-[150px]">
                    {currentQ.accent}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* HTML5 Audio element */}
          <audio
            ref={audioRef}
            src={currentAudioUrl}
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            preload="metadata"
          />

          {/* Player controls */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            {/* Rewind 5s */}
            <button
              onClick={() => seekRelative(-5)}
              className="p-1.5 rounded-lg hover:bg-black/5 text-[#5A5248] transition cursor-pointer"
              title="Lùi 5 giây"
            >
              <Rewind className="w-4 h-4" />
            </button>

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center gap-1.5 shadow-2xs transition cursor-pointer text-xs"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isPlaying ? 'Tạm dừng' : 'Phát Audio'}</span>
            </button>

            {/* Forward 5s */}
            <button
              onClick={() => seekRelative(5)}
              className="p-1.5 rounded-lg hover:bg-black/5 text-[#5A5248] transition cursor-pointer"
              title="Tua 5 giây"
            >
              <FastForward className="w-4 h-4" />
            </button>

            {/* Time display */}
            <span className="text-[11px] font-mono text-[#7A7268] min-w-[70px] text-center">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            {/* Playback speed buttons */}
            <div className="flex items-center bg-white border border-[#E0D7CC] rounded-lg p-0.5 text-[10px] font-bold text-[#6A625A]">
              {[0.8, 1.0, 1.2].map((rate) => (
                <button
                  key={rate}
                  onClick={() => handleSpeedChange(rate)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer transition ${
                    playbackRate === rate ? 'bg-amber-600 text-white' : 'hover:text-[#262320]'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>

            {/* Mute button */}
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-lg hover:bg-black/5 text-[#5A5248] transition cursor-pointer"
              title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Live script toggle */}
            <label
              className="hidden md:flex items-center gap-1 text-[10px] font-bold text-[#6A625A] ml-1 bg-white border border-[#E0D7CC] px-2 py-1 rounded-lg cursor-pointer hover:border-amber-400 select-none"
              title="Tự động hiển thị lời thoại khi bấm Play Audio"
            >
              <input
                type="checkbox"
                checked={autoShowLiveScript}
                onChange={(e) => setAutoShowLiveScript(e.target.checked)}
                className="rounded accent-amber-600 cursor-pointer"
              />
              <span>Live Script</span>
            </label>
          </div>
        </div>

        {/* Progress scrub bar */}
        <div className="max-w-4xl mx-auto mt-1 px-1">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={(e) => {
              const val = Number(e.target.value);
              setCurrentTime(val);
              if (audioRef.current) audioRef.current.currentTime = val;
            }}
            className="w-full h-1 bg-[#EAE3D8] rounded-lg appearance-none cursor-pointer accent-amber-600 focus:outline-none"
          />
        </div>
      </div>

      {/* 3. MAIN QUESTION DISPLAY AREA */}
      <div className="flex-1 overflow-y-auto px-3 py-3 min-h-0">
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {currentQ ? (
            <div className="bg-white rounded-2xl border border-[#EAE3D8] p-4 sm:p-5 shadow-2xs flex flex-col gap-4">
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/15 text-amber-900 font-extrabold text-xs">
                    Part {currentQ.part} • Câu #{currentQ.num}
                  </span>
                  <span className="text-xs font-semibold text-[#7A7268] hidden sm:inline">
                    {currentQ.category}
                  </span>
                </div>
                <div className="text-xs font-mono text-[#8A8278]">
                  {currentIdx + 1} / {filteredQuestions.length}
                </div>
              </div>

              {/* Question Text / Prompt */}
              <div className="text-base sm:text-lg font-bold text-[#262320] leading-snug">
                {currentQ.question}
              </div>

              {/* Question Image (Part 1 Photograph or Part 3/4 Graphic) */}
              {currentQ.imageUrl && (
                <div className="flex flex-col items-center gap-2 p-3 bg-[#FAF8F5] rounded-2xl border border-[#E8DFD3]">
                  <div
                    className="relative group cursor-pointer overflow-hidden rounded-xl border border-[#DCD3C7] shadow-2xs max-w-full"
                    onClick={() => setZoomedImage(currentQ.imageUrl || null)}
                    title="Bấm để xem ảnh phóng to"
                  >
                    <img
                      src={currentQ.imageUrl}
                      alt={`TOEIC Listening Question ${currentQ.num}`}
                      className="max-h-72 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 bg-black/75 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm transition flex items-center gap-1">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Phóng to ảnh</span>
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#7A7268] flex items-center gap-1">
                    {currentQ.part === 1 ? '📷 Hình ảnh mô tả câu hỏi' : '📊 Bảng biểu / Hình ảnh dữ kiện câu hỏi'}
                    <span className="text-[10px] text-amber-700 underline cursor-pointer ml-1" onClick={() => setZoomedImage(currentQ.imageUrl || null)}>
                      (Xem cỡ lớn)
                    </span>
                  </span>
                </div>
              )}

              {/* LIVE AUDIO SCRIPT (Triggered when audio is playing) */}
              {isPlaying && autoShowLiveScript && currentQ.transcript && (
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-100/40 to-amber-500/10 border border-amber-300 shadow-2xs animate-in fade-in duration-200">
                  <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-amber-200/80">
                    <div className="flex items-center gap-2">
                      <div className="flex items-end gap-0.5 h-3">
                        <span className="w-1 bg-amber-600 rounded-full animate-bounce [animation-delay:-0.3s] h-3" />
                        <span className="w-1 bg-amber-600 rounded-full animate-bounce [animation-delay:-0.15s] h-2" />
                        <span className="w-1 bg-amber-600 rounded-full animate-bounce h-3.5" />
                      </div>
                      <span className="font-extrabold text-xs text-amber-900 uppercase tracking-wide">
                        Đang phát Audio • Lời thoại (Live Script)
                      </span>
                    </div>
                    <button
                      onClick={() => setAutoShowLiveScript(false)}
                      className="text-[10px] text-amber-800 hover:underline cursor-pointer"
                      title="Tắt tự động hiện script khi nghe để luyện nghe phản xạ"
                    >
                      Ẩn script khi nghe
                    </button>
                  </div>
                  <div className="text-xs text-[#2A241C] whitespace-pre-wrap leading-relaxed font-medium">
                    {currentQ.transcript}
                  </div>
                </div>
              )}

              {/* Options List */}
              <div className="grid grid-cols-1 gap-2 pt-1">
                {(['A', 'B', 'C', 'D'] as AnswerChoice[]).map((choiceKey) => {
                  const optionText = currentQ.options[choiceKey];
                  if (!optionText) return null;

                  const isSelected = currentAnswerRecord?.choice === choiceKey;
                  const isCorrectChoice = currentQ.correctAnswer === choiceKey;

                  let btnStyle = 'bg-[#FAF8F5] border-[#E8DFD3] text-[#262320] hover:bg-amber-50/70 hover:border-amber-300';
                  if (currentAnswerRecord) {
                    if (isCorrectChoice) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400/30';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-bold';
                    } else {
                      btnStyle = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={choiceKey}
                      onClick={() => handleSelectAnswer(choiceKey)}
                      disabled={Boolean(currentAnswerRecord)}
                      className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${btnStyle}`}
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        currentAnswerRecord && isCorrectChoice
                          ? 'bg-emerald-600 text-white'
                          : currentAnswerRecord && isSelected
                          ? 'bg-rose-600 text-white'
                          : 'bg-[#ECE5DC] text-[#4A4238]'
                      }`}>
                        {choiceKey}
                      </span>
                      <span className="flex-1 text-sm font-medium leading-relaxed">
                        {optionText}
                      </span>
                      {currentAnswerRecord && isCorrectChoice && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 self-center" />
                      )}
                      {currentAnswerRecord && isSelected && !isCorrectChoice && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 self-center" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Transcript Toggle & Audio Script View */}
              <div className="pt-2 border-t border-[#F0EAE1]">
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => setShowTranscript(!showTranscript)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F4EFEA] hover:bg-[#EAE3D8] text-[#5A5248] text-xs font-bold transition cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-700" />
                    <span>{showTranscript ? 'Ẩn Lời Thoại (Transcript)' : '👁️ Xem Audio Script & Lời Thoại'}</span>
                  </button>

                  {currentAnswerRecord && (
                    <span className={`text-xs font-bold flex items-center gap-1 ${
                      currentAnswerRecord.isCorrect ? 'text-emerald-700' : 'text-rose-700'
                    }`}>
                      {currentAnswerRecord.isCorrect ? '✓ Chọn Chính Xác!' : '✗ Chưa Đúng!'}
                    </span>
                  )}
                </div>

                {/* Expanded Transcript Box */}
                {showTranscript && currentQ.transcript && (
                  <div className="mt-3 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-[#2A241C] whitespace-pre-wrap leading-relaxed">
                    <div className="font-bold text-amber-900 mb-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Toàn văn Audio Script & Manh mối:
                    </div>
                    {currentQ.transcript}
                  </div>
                )}
              </div>

              {/* Tip & Explanation Box (Shown after answer or when transcript opened) */}
              {(currentAnswerRecord || showTranscript) && (
                <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#EAE1D5] flex flex-col gap-1.5 text-xs text-[#3A3228]">
                  <div className="flex items-center gap-1 font-bold text-amber-900">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>Mẹo Giải Nhanh & Lời Giải Chi Tiết</span>
                  </div>
                  <p className="leading-relaxed text-[#4A4238]">
                    {currentQ.explanation}
                  </p>
                  <div className="p-2 rounded-lg bg-amber-100/50 border border-amber-200 text-amber-950 font-medium">
                    {currentQ.tip}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-[#7A7268]">
              Không tìm thấy câu hỏi listening phù hợp.
            </div>
          )}

          {/* Bottom Question Switcher Controls */}
          <div className="flex items-center justify-between gap-3 pt-1 pb-4">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-[#EAE3D8] hover:bg-gray-50 text-xs font-bold text-[#5A5248] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Câu Trước</span>
            </button>

            {/* Quick jump input / selector */}
            <div className="text-xs font-semibold text-[#7A7268]">
              Câu {currentIdx + 1} / {filteredQuestions.length}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIdx + 1 >= filteredQuestions.length}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
            >
              <span>Câu Tiếp</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* LIGHTBOX / ZOOM MODAL FOR LISTENING IMAGES */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setZoomedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden p-2 shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 hover:bg-black text-white cursor-pointer z-10 transition"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={zoomedImage}
              alt="Zoomed Listening Question"
              className="max-h-[82vh] w-auto object-contain rounded-xl"
            />
            <div className="text-xs font-semibold text-[#5A5248] mt-2">
              Ảnh câu hỏi TOEIC Listening • Bấm nền đen hoặc nút X để đóng
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
