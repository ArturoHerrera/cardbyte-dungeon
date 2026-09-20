import React from 'react';
import { useCardByteStore } from '../../store/cardByteStore';
import { CheckCircle2, Play, Home } from 'lucide-react';
import { t } from '../../locales';

export const TutorialVictoryModal: React.FC = () => {
  const { locale, activeModal, closeModal, setScreen, initNewRun } = useCardByteStore();

  if (activeModal !== 'TUTORIAL_VICTORY') return null;

  const handleReturnToTitle = () => {
    closeModal();
    setScreen('TITLE');
  };

  const handleStartLiveRun = () => {
    closeModal();
    initNewRun();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="max-w-lg w-full bg-[#070e17] border-2 border-emerald-500 rounded-2xl p-6 sm:p-8 font-mono text-slate-200 shadow-[0_0_40px_rgba(16,185,129,0.35)] text-center relative overflow-hidden">
        {/* Glow accent */}
        <div className="mx-auto w-16 h-16 bg-emerald-950/80 border-2 border-emerald-400 rounded-full flex items-center justify-center mb-4 box-glow-green">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>

        <span className="text-[10px] text-emerald-400 uppercase tracking-widest px-2.5 py-1 bg-emerald-950/70 border border-emerald-800 rounded font-bold">
          // PROTOCOL_0: CERTIFIED
        </span>

        <h2 className="text-xl sm:text-2xl font-black text-white mt-3 mb-1 tracking-wider">
          {t(locale, 'tutorial.victoryTitle')}
        </h2>
        <p className="text-xs text-slate-400 mb-6 max-w-sm mx-auto">
          {t(locale, 'tutorial.victorySubtitle')}
        </p>

        {/* Action Controls */}
        <div className="space-y-3 max-w-xs mx-auto">
          <button
            onClick={handleStartLiveRun}
            className="flex items-center justify-center space-x-2 w-full py-3 bg-[#00ff66] hover:bg-[#39ff14] text-black border-2 border-[#00ff66] rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all box-glow-green hover:scale-105 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>{t(locale, 'tutorial.startRealRun')}</span>
          </button>

          <button
            onClick={handleReturnToTitle}
            className="flex items-center justify-center space-x-2 w-full py-2.5 bg-[#0a1420] hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors"
          >
            <Home className="w-4 h-4 text-slate-400" />
            <span>{t(locale, 'tutorial.returnToMenu')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
