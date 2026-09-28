import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Question, AnswerChoice, StudyMode, DailyLog, MistakeRecord, QuestionProgress } from '../types';
import { allQuestions, getQuestionsBySource, shuffleQuestions } from '../data/questions';
import { generateSimilarQuestion } from '../data/similarQuestions';
import { SyncService, DEFAULT_PASSKEY, UserSyncPayload } from '../services/syncService';

const TIMER_SECONDS = 30;

const getTodayString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export interface QuestionAnswerRecord {
  selectedAnswer: AnswerChoice;
  isCorrect: boolean;
  timestamp: number;
}

interface QuizState {
  // Config & List
  questions: Question[];
  currentIndex: number;
  mode: StudyMode;
  sourceFilter: string;
  categoryFilter: string;

  // Question state
  selectedAnswer: AnswerChoice | null;
  isAnswered: boolean;
  isCorrect: boolean;
  isTimeout: boolean;
  timeLeft: number;
  timerActive: boolean;
  answeredMap: Record<string, QuestionAnswerRecord>;

  // Listening state
  listeningAnswersMap: Record<string, { choice: string; isCorrect: boolean }>;

  // Cloud Sync & Auth state
  userPasskey: string;
  isLoggedIn: boolean;
  lastSyncedAt: number | null;
  syncStatus: 'idle' | 'syncing' | 'synced' | 'error';

  // Session summary
  sessionCorrect: number;
  sessionWrong: number;
  currentStreak: number;
  bestStreak: number;
  isFinished: boolean;

  // Persistent storage
  dailyLogs: Record<string, DailyLog>;
  savedMistakeIds: string[]; // pool of all wrong questions across time
  questionProgress: Record<string, QuestionProgress>; // historical mistake and correct count per question

  // Actions
  initSession: (mode?: StudyMode, source?: string, category?: string) => void;
  selectAnswer: (choice: AnswerChoice) => void;
  selectAnswerForQuestion: (questionId: string, choice: AnswerChoice) => void;
  selectListeningAnswer: (questionId: string, choice: string, isCorrect: boolean) => void;
  handleTimeout: () => void;
  nextQuestion: () => void;
  nextPassage: () => void;
  jumpToIndex: (index: number) => void;
  restartSession: () => void;
  setMode: (mode: StudyMode) => void;
  setSourceFilter: (source: string) => void;
  setCategoryFilter: (category: string) => void;
  tickTimer: () => void;
  setTimerActive: (active: boolean) => void;
  reviewTimeLeft: number;
  tickReviewTimer: () => void;
  updateTodayNotes: (notes: string) => void;
  removeMistake: (questionId: string) => void;

  // Sync actions
  loginWithPasskey: (passkey: string) => Promise<boolean>;
  logoutPasskey: () => void;
  syncToCloud: () => Promise<boolean>;
  pullFromCloud: () => Promise<boolean>;
  importFromJson: (payload: UserSyncPayload) => boolean;
}

let syncDebounceTimer: any = null;
const scheduleAutoSync = (get: any) => {
  const { isLoggedIn, userPasskey } = get();
  if (!isLoggedIn || !userPasskey) return;
  if (syncDebounceTimer) clearTimeout(syncDebounceTimer);
  syncDebounceTimer = setTimeout(() => {
    get().syncToCloud();
  }, 2000);
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      questions: allQuestions,
      currentIndex: 0,
      mode: 'sequential',
      sourceFilter: 'all',
      categoryFilter: 'all',

      selectedAnswer: null,
      isAnswered: false,
      isCorrect: false,
      isTimeout: false,
      timeLeft: TIMER_SECONDS,
      timerActive: true,
      reviewTimeLeft: 0,
      answeredMap: {},

      listeningAnswersMap: {},
      userPasskey: DEFAULT_PASSKEY,
      isLoggedIn: true,
      lastSyncedAt: null,
      syncStatus: 'idle',

      sessionCorrect: 0,
      sessionWrong: 0,
      currentStreak: 0,
      bestStreak: 0,
      isFinished: false,

      dailyLogs: {},
      savedMistakeIds: [],
      questionProgress: {},

      initSession: (overrideMode, overrideSource, overrideCategory) => {
        const state = get();
        const mode = overrideMode ?? state.mode;
        const source = overrideSource ?? state.sourceFilter;
        const category = overrideCategory ?? state.categoryFilter;

        let filtered = getQuestionsBySource(source);

        if (category && category !== 'all') {
          filtered = filtered.filter((q) => q.category === category);
        }

        if (mode === 'wrong_only') {
          const mistakeSet = new Set(state.savedMistakeIds);
          filtered = filtered.filter((q) => mistakeSet.has(q.id));
          if (filtered.length === 0) {
            // fallback if no mistakes
            filtered = getQuestionsBySource(source);
          }
        } else if (mode === 'repeat_difficult') {
          const progress = state.questionProgress;
          filtered = filtered.filter((q) => (progress[q.id]?.wrongCount ?? 0) >= 2);
          if (filtered.length === 0) {
            // fallback if no repeated mistakes yet
            filtered = getQuestionsBySource(source);
          }
        } else if (mode === 'random') {
          filtered = shuffleQuestions(filtered);
        } else {
          // sequential: ALWAYS includes all questions in the set, never skips previously answered questions!
          filtered = [...filtered].sort((a, b) => a.num - b.num);
        }

        const firstQ = filtered[0];
        const isPassage = firstQ?.isPassageQuestion === true;

        set({
          questions: filtered,
          currentIndex: 0,
          mode,
          sourceFilter: source,
          categoryFilter: category,
          selectedAnswer: null,
          isAnswered: false,
          isCorrect: false,
          isTimeout: false,
          timeLeft: isPassage ? 0 : TIMER_SECONDS,
          timerActive: !isPassage,
          reviewTimeLeft: 0,
          answeredMap: {},
          sessionCorrect: 0,
          sessionWrong: 0,
          currentStreak: 0,
          isFinished: false,
        });
      },

      setMode: (mode) => {
        get().initSession(mode);
      },

      setSourceFilter: (source) => {
        get().initSession(undefined, source);
      },

      setCategoryFilter: (category) => {
        get().initSession(undefined, undefined, category);
      },

      tickTimer: () => {
        const { isAnswered, timeLeft, timerActive, handleTimeout, questions, currentIndex } = get();
        const currentQ = questions[currentIndex];
        if (isAnswered || !timerActive || currentQ?.isPassageQuestion) return;

        if (timeLeft <= 1) {
          handleTimeout();
        } else {
          set({ timeLeft: timeLeft - 1 });
        }
      },

      tickReviewTimer: () => {
        const { reviewTimeLeft } = get();
        if (reviewTimeLeft > 0) {
          set({ reviewTimeLeft: reviewTimeLeft - 1 });
        }
      },

      setTimerActive: (active) => set({ timerActive: active }),

      selectAnswer: (choice) => {
        const { questions, currentIndex } = get();
        if (questions.length === 0) return;
        const currentQ = questions[currentIndex];
        if (!currentQ) return;
        get().selectAnswerForQuestion(currentQ.id, choice);
      },

      selectAnswerForQuestion: (questionId, choice) => {
        const {
          questions,
          currentIndex,
          currentStreak,
          bestStreak,
          sessionCorrect,
          sessionWrong,
          dailyLogs,
          savedMistakeIds,
          questionProgress,
          answeredMap,
        } = get();

        // If already answered, do nothing
        if (answeredMap[questionId]) return;

        const targetQ = questions.find((q) => q.id === questionId) || allQuestions.find((q) => q.id === questionId);
        if (!targetQ) return;

        const isRight = choice === targetQ.correctAnswer;
        const todayStr = getTodayString();

        const newStreak = isRight ? currentStreak + 1 : 0;
        const newBestStreak = Math.max(bestStreak, newStreak);
        const newCorrect = isRight ? sessionCorrect + 1 : sessionCorrect;
        const newWrong = isRight ? sessionWrong : sessionWrong + 1;

        // Daily log update
        const existingLog: DailyLog = dailyLogs[todayStr] || {
          date: todayStr,
          totalAnswered: 0,
          correctCount: 0,
          wrongCount: 0,
          timeoutCount: 0,
          mistakes: [],
          notes: '',
          lastUpdated: Date.now(),
        };

        const updatedMistakes = [...existingLog.mistakes];
        const newSavedMistakeIds = new Set(savedMistakeIds);

        // Historical question progress
        const prevProg: QuestionProgress = questionProgress[targetQ.id] || {
          questionId: targetQ.id,
          wrongCount: 0,
          correctCount: 0,
          lastAttemptDate: todayStr,
          lastAttemptTimestamp: Date.now(),
          lastResult: isRight ? 'correct' : 'wrong',
        };

        const updatedProgress: QuestionProgress = {
          ...prevProg,
          wrongCount: isRight ? prevProg.wrongCount : prevProg.wrongCount + 1,
          correctCount: isRight ? prevProg.correctCount + 1 : prevProg.correctCount,
          lastAttemptDate: todayStr,
          lastAttemptTimestamp: Date.now(),
          lastResult: isRight ? 'correct' : 'wrong',
        };

        let updatedQuestions = questions;

        if (!isRight) {
          const mistakeRecord: MistakeRecord = {
            questionId: targetQ.id,
            userChoice: choice,
            timestamp: Date.now(),
            questionNum: targetQ.num,
            questionText: targetQ.question,
            correctAnswer: targetQ.correctAnswer,
            tip: targetQ.tip,
          };
          updatedMistakes.push(mistakeRecord);
          newSavedMistakeIds.add(targetQ.id);

          // GENTLE RE-QUEUE for non-passage single questions
          if (!targetQ.isPassageQuestion) {
            const alreadyAhead = questions.slice(currentIndex + 1).some((q) => q.id === targetQ.id);
            if (!alreadyAhead && questions.length > 1) {
              const reInsertIdx = Math.min(currentIndex + 5, questions.length);
              updatedQuestions = [
                ...questions.slice(0, reInsertIdx),
                targetQ,
                ...questions.slice(reInsertIdx),
              ];
            }
          }
        } else {
          if (newSavedMistakeIds.has(targetQ.id)) {
            newSavedMistakeIds.delete(targetQ.id);
          }

          // CƠ CHẾ: NẾU LÀM ĐÚNG 1 CÂU -> TỰ ĐỘNG XUẤT HIỆN 1 CÂU TƯƠNG TỰ ĐỂ TIẾP TỤC LÀM
          if (!targetQ.isSimilarClone) {
            const similarQ = generateSimilarQuestion(targetQ);
            const targetIdx = updatedQuestions.findIndex((q) => q.id === targetQ.id);
            if (targetIdx !== -1) {
              updatedQuestions = [
                ...updatedQuestions.slice(0, targetIdx + 1),
                similarQ,
                ...updatedQuestions.slice(targetIdx + 1),
              ];
            }
          }
        }

        const updatedLog: DailyLog = {
          ...existingLog,
          totalAnswered: existingLog.totalAnswered + 1,
          correctCount: isRight ? existingLog.correctCount + 1 : existingLog.correctCount,
          wrongCount: !isRight ? existingLog.wrongCount + 1 : existingLog.wrongCount,
          mistakes: updatedMistakes,
          lastUpdated: Date.now(),
        };

        const newAnsweredMap = {
          ...answeredMap,
          [targetQ.id]: {
            selectedAnswer: choice,
            isCorrect: isRight,
            timestamp: Date.now(),
          },
        };

        const currentQ = questions[currentIndex];
        const isCurrentQ = currentQ && currentQ.id === targetQ.id;

        set({
          questions: updatedQuestions,
          answeredMap: newAnsweredMap,
          reviewTimeLeft: 9, // Minimum 9 seconds mandatory review cooldown
          ...(isCurrentQ
            ? {
                selectedAnswer: choice,
                isAnswered: true,
                isCorrect: isRight,
                timerActive: false,
              }
            : {}),
          currentStreak: newStreak,
          bestStreak: newBestStreak,
          sessionCorrect: newCorrect,
          sessionWrong: newWrong,
          savedMistakeIds: Array.from(newSavedMistakeIds),
          questionProgress: {
            ...questionProgress,
            [targetQ.id]: updatedProgress,
          },
          dailyLogs: {
            ...dailyLogs,
            [todayStr]: updatedLog,
          },
        });

        scheduleAutoSync(get);
      },

      handleTimeout: () => {
        const {
          questions,
          currentIndex,
          isAnswered,
          sessionWrong,
          dailyLogs,
          savedMistakeIds,
          questionProgress,
        } = get();
        if (isAnswered || questions.length === 0) return;

        const currentQ = questions[currentIndex];
        const todayStr = getTodayString();

        const existingLog: DailyLog = dailyLogs[todayStr] || {
          date: todayStr,
          totalAnswered: 0,
          correctCount: 0,
          wrongCount: 0,
          timeoutCount: 0,
          mistakes: [],
          notes: '',
          lastUpdated: Date.now(),
        };

        const mistakeRecord: MistakeRecord = {
          questionId: currentQ.id,
          userChoice: 'TIMEOUT',
          timestamp: Date.now(),
          questionNum: currentQ.num,
          questionText: currentQ.question,
          correctAnswer: currentQ.correctAnswer,
          tip: currentQ.tip,
        };

        const newSavedMistakeIds = new Set(savedMistakeIds);
        newSavedMistakeIds.add(currentQ.id);

        const prevProg: QuestionProgress = questionProgress[currentQ.id] || {
          questionId: currentQ.id,
          wrongCount: 0,
          correctCount: 0,
          lastAttemptDate: todayStr,
          lastAttemptTimestamp: Date.now(),
          lastResult: 'timeout',
        };

        const updatedProgress: QuestionProgress = {
          ...prevProg,
          wrongCount: prevProg.wrongCount + 1,
          lastAttemptDate: todayStr,
          lastAttemptTimestamp: Date.now(),
          lastResult: 'timeout',
        };

        let updatedQuestions = questions;
        const alreadyAhead = questions.slice(currentIndex + 1).some((q) => q.id === currentQ.id);
        if (!alreadyAhead && questions.length > 1) {
          const reInsertIdx = Math.min(currentIndex + 5, questions.length);
          updatedQuestions = [
            ...questions.slice(0, reInsertIdx),
            currentQ,
            ...questions.slice(reInsertIdx),
          ];
        }

        const updatedLog: DailyLog = {
          ...existingLog,
          totalAnswered: existingLog.totalAnswered + 1,
          wrongCount: existingLog.wrongCount + 1,
          timeoutCount: existingLog.timeoutCount + 1,
          mistakes: [...existingLog.mistakes, mistakeRecord],
          lastUpdated: Date.now(),
        };

        set({
          questions: updatedQuestions,
          selectedAnswer: null,
          isAnswered: true,
          isCorrect: false,
          isTimeout: true,
          timeLeft: 0,
          timerActive: false,
          reviewTimeLeft: 9, // Minimum 9 seconds mandatory review cooldown
          currentStreak: 0,
          sessionWrong: sessionWrong + 1,
          savedMistakeIds: Array.from(newSavedMistakeIds),
          questionProgress: {
            ...questionProgress,
            [currentQ.id]: updatedProgress,
          },
          dailyLogs: {
            ...dailyLogs,
            [todayStr]: updatedLog,
          },
        });
      },

      nextQuestion: () => {
        const { questions, currentIndex, answeredMap, reviewTimeLeft } = get();
        // Mandatory 9 seconds cooldown to read tip before moving to next question
        if (reviewTimeLeft > 0) return;

        if (currentIndex + 1 >= questions.length) {
          set({ isFinished: true, timerActive: false, reviewTimeLeft: 0 });
        } else {
          const nextQ = questions[currentIndex + 1];
          const isPassage = nextQ?.isPassageQuestion === true;
          const ans = answeredMap[nextQ.id];
          set({
            currentIndex: currentIndex + 1,
            selectedAnswer: ans?.selectedAnswer ?? null,
            isAnswered: Boolean(ans),
            isCorrect: ans?.isCorrect ?? false,
            isTimeout: false,
            timeLeft: isPassage ? 0 : TIMER_SECONDS,
            timerActive: !isPassage && !ans,
            reviewTimeLeft: 0,
          });
        }
      },

      nextPassage: () => {
        const { questions, currentIndex, answeredMap, reviewTimeLeft } = get();
        if (reviewTimeLeft > 0) return;
        const currentQ = questions[currentIndex];
        if (!currentQ) return;
        const currentPassageId = currentQ.passageId || currentQ.passageInfo?.id;

        let nextIdx = currentIndex + 1;
        while (
          nextIdx < questions.length &&
          ((questions[nextIdx].passageId && questions[nextIdx].passageId === currentPassageId) ||
           (questions[nextIdx].passageInfo?.id === currentPassageId))
        ) {
          nextIdx++;
        }

        if (nextIdx >= questions.length) {
          set({ isFinished: true, timerActive: false, reviewTimeLeft: 0 });
        } else {
          const nextQ = questions[nextIdx];
          const isPassage = nextQ?.isPassageQuestion === true;
          const ans = answeredMap[nextQ.id];
          set({
            currentIndex: nextIdx,
            selectedAnswer: ans?.selectedAnswer ?? null,
            isAnswered: Boolean(ans),
            isCorrect: ans?.isCorrect ?? false,
            isTimeout: false,
            timeLeft: isPassage ? 0 : TIMER_SECONDS,
            timerActive: !isPassage && !ans,
            reviewTimeLeft: 0,
          });
        }
      },

      jumpToIndex: (index: number) => {
        const { questions, answeredMap } = get();
        if (index < 0 || index >= questions.length) return;
        const targetQ = questions[index];
        const isPassage = targetQ?.isPassageQuestion === true;
        const ans = answeredMap[targetQ.id];
        set({
          currentIndex: index,
          selectedAnswer: ans?.selectedAnswer ?? null,
          isAnswered: Boolean(ans),
          isCorrect: ans?.isCorrect ?? false,
          isTimeout: false,
          timeLeft: isPassage ? 0 : TIMER_SECONDS,
          timerActive: !isPassage && !ans,
          reviewTimeLeft: 0,
        });
      },

      restartSession: () => {
        get().initSession();
      },

      updateTodayNotes: (notes: string) => {
        const todayStr = getTodayString();
        const { dailyLogs } = get();
        const existingLog: DailyLog = dailyLogs[todayStr] || {
          date: todayStr,
          totalAnswered: 0,
          correctCount: 0,
          wrongCount: 0,
          timeoutCount: 0,
          mistakes: [],
          notes: '',
          lastUpdated: Date.now(),
        };

        set({
          dailyLogs: {
            ...dailyLogs,
            [todayStr]: {
              ...existingLog,
              notes,
              lastUpdated: Date.now(),
            },
          },
        });
      },

      removeMistake: (questionId: string) => {
        const { savedMistakeIds } = get();
        set({
          savedMistakeIds: savedMistakeIds.filter((id) => id !== questionId),
        });
      },

      selectListeningAnswer: (questionId: string, choice: string, isCorrect: boolean) => {
        const { listeningAnswersMap } = get();
        const updated = {
          ...listeningAnswersMap,
          [questionId]: { choice, isCorrect },
        };
        set({ listeningAnswersMap: updated });
        scheduleAutoSync(get);
      },

      loginWithPasskey: async (passkey: string) => {
        const clean = passkey.trim();
        if (!clean) return false;
        set({ userPasskey: clean, isLoggedIn: true });
        return await get().pullFromCloud();
      },

      logoutPasskey: () => {
        set({ isLoggedIn: false });
      },

      syncToCloud: async () => {
        const state = get();
        const passkey = state.userPasskey || DEFAULT_PASSKEY;
        if (!passkey) return false;

        set({ syncStatus: 'syncing' });
        const payload: UserSyncPayload = {
          passkey,
          version: 1,
          lastUpdated: Date.now(),
          answeredMap: state.answeredMap,
          listeningAnswersMap: state.listeningAnswersMap,
          savedMistakeIds: state.savedMistakeIds,
          questionProgress: state.questionProgress,
          dailyLogs: state.dailyLogs,
          bestStreak: state.bestStreak,
        };

        const res = await SyncService.saveToCloud(payload);
        if (res.success) {
          set({ syncStatus: 'synced', lastSyncedAt: Date.now() });
          return true;
        } else {
          set({ syncStatus: 'error' });
          return false;
        }
      },

      pullFromCloud: async () => {
        const state = get();
        const passkey = state.userPasskey || DEFAULT_PASSKEY;
        if (!passkey) return false;

        set({ syncStatus: 'syncing' });
        const res = await SyncService.loadFromCloud(passkey);
        if (res.success && res.data) {
          const localPayload: UserSyncPayload = {
            passkey,
            version: 1,
            lastUpdated: state.lastSyncedAt || 0,
            answeredMap: state.answeredMap,
            listeningAnswersMap: state.listeningAnswersMap,
            savedMistakeIds: state.savedMistakeIds,
            questionProgress: state.questionProgress,
            dailyLogs: state.dailyLogs,
            bestStreak: state.bestStreak,
          };
          const merged = SyncService.smartMerge(localPayload, res.data);
          set({
            answeredMap: merged.answeredMap,
            listeningAnswersMap: merged.listeningAnswersMap,
            savedMistakeIds: merged.savedMistakeIds,
            questionProgress: merged.questionProgress,
            dailyLogs: merged.dailyLogs,
            bestStreak: merged.bestStreak,
            syncStatus: 'synced',
            lastSyncedAt: Date.now(),
          });
          return true;
        } else {
          set({ syncStatus: 'error' });
          return false;
        }
      },

      importFromJson: (payload: UserSyncPayload) => {
        if (!payload || typeof payload !== 'object') return false;
        const state = get();
        const localPayload: UserSyncPayload = {
          passkey: state.userPasskey || DEFAULT_PASSKEY,
          version: 1,
          lastUpdated: state.lastSyncedAt || 0,
          answeredMap: state.answeredMap,
          listeningAnswersMap: state.listeningAnswersMap,
          savedMistakeIds: state.savedMistakeIds,
          questionProgress: state.questionProgress,
          dailyLogs: state.dailyLogs,
          bestStreak: state.bestStreak,
        };
        const merged = SyncService.smartMerge(localPayload, payload);
        set({
          answeredMap: merged.answeredMap,
          listeningAnswersMap: merged.listeningAnswersMap,
          savedMistakeIds: merged.savedMistakeIds,
          questionProgress: merged.questionProgress,
          dailyLogs: merged.dailyLogs,
          bestStreak: merged.bestStreak,
          userPasskey: merged.passkey || state.userPasskey,
          isLoggedIn: true,
          lastSyncedAt: Date.now(),
          syncStatus: 'synced',
        });
        get().syncToCloud();
        return true;
      },
    }),
    {
      name: 'toeic-quiz-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        dailyLogs: state.dailyLogs,
        savedMistakeIds: state.savedMistakeIds,
        questionProgress: state.questionProgress,
        answeredMap: state.answeredMap,
        listeningAnswersMap: state.listeningAnswersMap,
        bestStreak: state.bestStreak,
        mode: state.mode,
        sourceFilter: state.sourceFilter,
        userPasskey: state.userPasskey,
        isLoggedIn: state.isLoggedIn,
        lastSyncedAt: state.lastSyncedAt,
      }),
    }
  )
);
