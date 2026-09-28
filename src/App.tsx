import React, { useState, useEffect } from 'react';
import { useQuizStore } from './store/useQuizStore';
import { Header } from './components/Header';
import { Flashcard } from './components/Flashcard';
import { StatsSummary } from './components/StatsSummary';
import { ResultsView } from './components/ResultsView';
import { ListeningTab } from './components/ListeningTab';
import { LoginSyncModal } from './components/LoginSyncModal';
import { BookOpen, Headphones, BarChart3 } from 'lucide-react';

export const App: React.FC = () => {
  const {
    isFinished,
    initSession,
    questions,
    currentIndex,
    savedMistakeIds,
    isLoggedIn,
    pullFromCloud,
    loginWithPasskey,
    activeTab,
    setActiveTab,
  } = useQuizStore();
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);

  const currentQ = questions[currentIndex];
  const isPassageView = activeTab === 'practice' && !isFinished && Boolean(currentQ?.isPassageQuestion && currentQ?.passageInfo);

  useEffect(() => {
    // Check URL parameter ?passkey=... for instant seamless mobile login
    const params = new URLSearchParams(window.location.search);
    const urlPasskey = params.get('passkey');
    if (urlPasskey) {
      loginWithPasskey(urlPasskey);
    } else {
      initSession();
      if (isLoggedIn) {
        pullFromCloud();
      }
    }
  }, []);

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

  const handleGoToDocs2 = () => {
    initSession('sequential', 'stage_2');
    setActiveTab('practice');
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] flex flex-col justify-between bg-[#FAF7F2] text-[#262320] selection:bg-amber-200 selection:text-amber-900 overflow-hidden">
      {/* APP TOP HEADER */}
      <Header
        activeTab={activeTab}
        onSwitchToPracticeAll={handleGoToPracticeAll}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
      />

      {/* CLOUD SYNC & AUTH MODAL */}
      <LoginSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
      />

      {/* MAIN VIEWPORT: TAB "ÔN ĐỌC", "LUYỆN NGHE", HOẶC "KẾT QUẢ" */}
      <main className={`flex-1 w-full mx-auto px-2 sm:px-4 md:px-6 py-2 flex flex-col min-h-0 overflow-hidden transition-all duration-200 ${
        activeTab === 'listening' ? 'max-w-4xl' : isPassageView ? 'max-w-7xl' : 'max-w-2xl'
      }`}>
        {activeTab === 'practice' ? (
          <div className="flex-1 flex flex-col h-full min-h-0">
            {isFinished ? (
              <StatsSummary onGoToResultsTab={() => setActiveTab('results')} />
            ) : (
              <Flashcard />
            )}
          </div>
        ) : activeTab === 'listening' ? (
          <div className="flex-1 flex flex-col h-full min-h-0">
            <ListeningTab />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto min-h-0">
            <ResultsView
              onGoToPracticeMistakes={handleGoToPracticeMistakes}
              onGoToPracticeDifficult={handleGoToPracticeDifficult}
              onGoToPracticeAll={handleGoToPracticeAll}
              onGoToDocs2={handleGoToDocs2}
            />
          </div>
        )}
      </main>

      {/* COMPACT BOTTOM NAVIGATION BAR: 3 TABS */}
      <nav className="border-t border-[#EFE8DE] bg-[#FAF7F2]/95 backdrop-blur-md px-3 sm:px-6 py-1.5 flex items-center justify-around shrink-0 safe-bottom">
        <div className={`flex items-center justify-around w-full mx-auto gap-2 sm:gap-4 ${
          activeTab === 'listening' ? 'max-w-4xl' : isPassageView ? 'max-w-7xl' : 'max-w-2xl'
        }`}>
          {/* Tab 1: ÔN ĐỌC */}
          <button
            onClick={() => setActiveTab('practice')}
            className={`flex-1 flex flex-col items-center gap-0.5 py-1 px-2 sm:px-4 rounded-xl transition cursor-pointer ${
              activeTab === 'practice'
                ? 'text-amber-800 font-bold bg-amber-100/60 shadow-2xs'
                : 'text-[#8C8276] hover:text-[#262320]'
            }`}
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-[11px] sm:text-xs font-semibold">Ôn Đọc</span>
          </button>

          {/* Tab 2: LUYỆN NGHE */}
          <button
            onClick={() => setActiveTab('listening')}
            className={`flex-1 flex flex-col items-center gap-0.5 py-1 px-2 sm:px-4 rounded-xl transition cursor-pointer ${
              activeTab === 'listening'
                ? 'text-amber-800 font-bold bg-amber-100/60 shadow-2xs'
                : 'text-[#8C8276] hover:text-[#262320]'
            }`}
          >
            <Headphones className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-[11px] sm:text-xs font-semibold">Luyện Nghe (100c)</span>
          </button>

          {/* Tab 3: KẾT QUẢ */}
          <button
            onClick={() => setActiveTab('results')}
            className={`flex-1 flex flex-col items-center gap-0.5 py-1 px-2 sm:px-4 rounded-xl transition relative cursor-pointer ${
              activeTab === 'results'
                ? 'text-amber-800 font-bold bg-amber-100/60 shadow-2xs'
                : 'text-[#8C8276] hover:text-[#262320]'
            }`}
          >
            <div className="relative">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
              {savedMistakeIds.length > 0 && (
                <span className="absolute -top-1 -right-2 px-1 py-0.2 min-w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {savedMistakeIds.length}
                </span>
              )}
            </div>
            <span className="text-[11px] sm:text-xs font-semibold">Kết Quả</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
