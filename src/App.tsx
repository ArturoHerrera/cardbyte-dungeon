import { useEffect } from 'react';
import { useCardByteStore } from './store/cardByteStore';
import { TopBar } from './components/UI/TopBar';
import { TitleScreen } from './components/UI/TitleScreen';
import { CardByteGraph } from './components/Map/CardByteGraph';
import { CombatView } from './components/Combat/CombatView';
import { CardRewardView } from './components/UI/CardRewardView';
import { RestView } from './components/UI/RestView';
import { TreasureView } from './components/UI/TreasureView';
import { VictoryScreen } from './components/UI/VictoryScreen';
import { GameOverScreen } from './components/UI/GameOverScreen';
import { RomDumpModal } from './components/UI/RomDumpModal';
import { DeckViewModal } from './components/UI/DeckViewModal';
import { ProfileModal } from './components/UI/ProfileModal';
import { OperatorCodexModal } from './components/Tutorial/OperatorCodexModal';
import { TutorialVictoryModal } from './components/Tutorial/TutorialVictoryModal';
import { CardInspectModal } from './components/Combat/CardInspectModal';

export default function App() {
  const { currentScreen, loadProfileFromStorage, mobileViewMode } = useCardByteStore();

  useEffect(() => {
    loadProfileFromStorage();
  }, [loadProfileFromStorage]);

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'TITLE':
        return <TitleScreen />;
      case 'MAP':
        return <CardByteGraph />;
      case 'COMBAT':
        return <CombatView />;
      case 'CARD_REWARD':
        return <CardRewardView />;
      case 'REST':
        return <RestView />;
      case 'TREASURE':
        return <TreasureView />;
      case 'VICTORY':
        return <VictoryScreen />;
      case 'GAME_OVER':
        return <GameOverScreen />;
      default:
        return <TitleScreen />;
    }
  };

  return (
    <div className="w-screen h-screen h-[100dvh] flex items-center justify-center bg-[#020406] matrix-grid overflow-hidden relative select-none">
      {/* Dynamic Mobile Frame Container */}
      <div
        className={`
          flex flex-col bg-[#05080b] text-slate-100 overflow-hidden relative transition-all duration-300
          ${
            mobileViewMode
              ? 'w-full max-w-[430px] h-full shadow-[0_0_50px_rgba(0,0,0,0.9)] border-x border-[#1e2c38] mobile-viewport-container'
              : 'w-full h-full mobile-viewport-container'
          }
        `}
      >
        {/* CRT Scanline and vignette overlay */}
        <div className="absolute inset-0 crt-overlay pointer-events-none z-40"></div>

        {/* Persistent Hardware Top Bar */}
        <TopBar />

        {/* Main Viewport Screen */}
        <main className="flex-1 w-full relative overflow-hidden flex flex-col items-center justify-center min-h-0">
          {renderActiveScreen()}
        </main>

        {/* Global Modals */}
        <RomDumpModal />
        <DeckViewModal />
        <ProfileModal />
        <OperatorCodexModal />
        <TutorialVictoryModal />
        <CardInspectModal />
      </div>
    </div>
  );
}


