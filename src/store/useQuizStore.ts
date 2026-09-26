import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Question, AnswerChoice, StudyMode, DailyLog, MistakeRecord, QuestionProgress } from '../types';
import { allQuestions, getQuestionsBySource, shuffleQuestions } from '../data/questions';

const TIMER_SECONDS = 30;

const getTodayString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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
  handleTimeout: () => void;
  nextQuestion: () => void;
  restartSession: () => void;
  setMode: (mode: StudyMode) => void;
  setSourceFilter: (source: string) => void;
  setCategoryFilter: (category: string) => void;
  tickTimer: () => void;
  setTimerActive: (active: boolean) => void;
  updateTodayNotes: (notes: string) => void;
  removeMistake: (questionId: string) => void;
}

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

      setTimerActive: (active) => set({ timerActive: active }),

      selectAnswer: (choice) => {
        const {
          questions,
          currentIndex,
          isAnswered,
          currentStreak,
          bestStreak,
          sessionCorrect,
          sessionWrong,
          dailyLogs,
          savedMistakeIds,
          questionProgress,
        } = get();
        if (isAnswered || questions.length === 0) return;

        const currentQ = questions[currentIndex];
        const isRight = choice === currentQ.correctAnswer;
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
        const prevProg: QuestionProgress = questionProgress[currentQ.id] || {
          questionId: currentQ.id,
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
            questionId: currentQ.id,
            userChoice: choice,
            timestamp: Date.now(),
            questionNum: currentQ.num,
            questionText: currentQ.question,
            correctAnswer: currentQ.correctAnswer,
            tip: currentQ.tip,
          };
          updatedMistakes.push(mistakeRecord);
          newSavedMistakeIds.add(currentQ.id);

          // GENTLE RE-QUEUE: If answered wrong, re-queue this question gently a bit later in the session
          // so the learner gets another chance to practice it!
          const alreadyAhead = questions.slice(currentIndex + 1).some((q) => q.id === currentQ.id);
          if (!alreadyAhead && questions.length > 1) {
            const reInsertIdx = Math.min(currentIndex + 5, questions.length);
            updatedQuestions = [
              ...questions.slice(0, reInsertIdx),
              currentQ,
              ...questions.slice(reInsertIdx),
            ];
          }
        } else {
          // If answered right in wrong_only mode or practice, can remove from saved active pool
          if (newSavedMistakeIds.has(currentQ.id)) {
            newSavedMistakeIds.delete(currentQ.id);
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

        set({
          questions: updatedQuestions,
          selectedAnswer: choice,
          isAnswered: true,
          isCorrect: isRight,
          isTimeout: false,
          timerActive: false,
          currentStreak: newStreak,
          bestStreak: newBestStreak,
          sessionCorrect: newCorrect,
          sessionWrong: newWrong,
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
        const { questions, currentIndex } = get();
        if (currentIndex + 1 >= questions.length) {
          set({ isFinished: true, timerActive: false });
        } else {
          const nextQ = questions[currentIndex + 1];
          const isPassage = nextQ?.isPassageQuestion === true;
          set({
            currentIndex: currentIndex + 1,
            selectedAnswer: null,
            isAnswered: false,
            isCorrect: false,
            isTimeout: false,
            timeLeft: isPassage ? 0 : TIMER_SECONDS,
            timerActive: !isPassage,
          });
        }
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
    }),
    {
      name: 'toeic-quiz-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        dailyLogs: state.dailyLogs,
        savedMistakeIds: state.savedMistakeIds,
        questionProgress: state.questionProgress,
        bestStreak: state.bestStreak,
        mode: state.mode,
        sourceFilter: state.sourceFilter,
      }),
    }
  )
);
