import React, { useState, useEffect } from 'react';
import { useQuizStore } from './store/useQuizStore';
import { Header } from './components/Header';
import { Flashcard } from './components/Flashcard';
import { StatsSummary } from './components/StatsSummary';
import { ResultsView } from './components/ResultsView';
import { BookOpen, BarChart3 } from 'lucide-react';

export const App: React.FC = () => {
  const { isFinished, savedMistakeIds, initSession } = useQuizStore();
  const [activeTab, setActiveTab] = useState<'practice' | 'results'>('practice');

  useEffect(() => {
    initSession();
  }, [initSession]);

  const handleGoToPracticeMistakes = () => {
    initSession('wrong_only');
    setActiveTab('practice');
  };

  const handleGoToPracticeDifficult = () => {
    initSession('repeat_difficult');
    setActiveTab('practice');
  };

  const handleGoToPracticeAll = () => {
    initSession('sequential');
    setActiveTab('practice');
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] flex flex-col justify-between bg-[#FAF7F2] text-[#262320] selection:bg-amber-200 selection:text-amber-900 overflow-hidden">
      {/* APP TOP HEADER */}
      <Header
        activeTab={activeTab}
        onSwitchToPracticeAll={handleGoToPracticeAll}
      />

      {/* MAIN VIEWPORT: TAB "ÔN" (CÂN ĐỐI 100% CHIỀU CAO) HOẶC TAB "KẾT QUẢ" */}
      <main className="flex-1 max-w-md w-full mx-auto px-3 py-2 flex flex-col min-h-0 overflow-hidden">
        {activeTab === 'practice' ? (
          <div className="flex-1 flex flex-col h-full min-h-0">
            {isFinished ? (
              <StatsSummary onGoToResultsTab={() => setActiveTab('results')} />
            ) : (
              <Flashcard />
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto min-h-0">
            <ResultsView
              onGoToPracticeMistakes={handleGoToPracticeMistakes}
              onGoToPracticeDifficult={handleGoToPracticeDifficult}
              onGoToPracticeAll={handleGoToPracticeAll}
            />
          </div>
        )}
      </main>

      {/* COMPACT BOTTOM NAVIGATION BAR: ONLY 2 TABS */}
      <nav className="border-t border-[#EFE8DE] bg-[#FAF7F2]/95 backdrop-blur-md px-6 py-2 flex items-center justify-around shrink-0 safe-bottom">
        {/* Tab 1: ÔN */}
        <button
          onClick={() => setActiveTab('practice')}
          className={`flex-1 flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition cursor-pointer ${
            activeTab === 'practice'
              ? 'text-amber-800 font-bold bg-amber-100/60 shadow-2xs'
              : 'text-[#8C8276] hover:text-[#262320]'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-xs font-semibold">Ôn Tập</span>
        </button>

        {/* Tab 2: KẾT QUẢ */}
        <button
          onClick={() => setActiveTab('results')}
          className={`flex-1 flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition relative cursor-pointer ${
            activeTab === 'results'
              ? 'text-amber-800 font-bold bg-amber-100/60 shadow-2xs'
              : 'text-[#8C8276] hover:text-[#262320]'
          }`}
        >
          <div className="relative">
            <BarChart3 className="w-5 h-5" />
            {savedMistakeIds.length > 0 && (
              <span className="absolute -top-1 -right-2 px-1 py-0.2 min-w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                {savedMistakeIds.length}
              </span>
            )}
          </div>
          <span className="text-xs font-semibold">Kết Quả</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
