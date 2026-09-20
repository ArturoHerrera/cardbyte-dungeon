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

export default function App() {


  const { currentScreen, loadProfileFromStorage } = useCardByteStore();

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
    <div className="h-screen w-screen flex flex-col bg-[#05080b] matrix-grid text-slate-100 overflow-hidden relative">
      {/* CRT Scanline and vignette overlay */}
      <div className="absolute inset-0 crt-overlay pointer-events-none z-40"></div>

      {/* Persistent Hardware Top Bar */}
      <TopBar />

      {/* Main Viewport Screen */}
      <main className="flex-1 w-full h-[calc(100vh-3.5rem)] relative overflow-hidden flex flex-col items-center justify-center">
        {renderActiveScreen()}
      </main>

      {/* Global Modals */}
      <RomDumpModal />
      <DeckViewModal />
      <ProfileModal />
      <OperatorCodexModal />
      <TutorialVictoryModal />
    </div>
  );
}


