import React from 'react';
import { useCardByteStore } from '../../store/cardByteStore';
import { Skull, RotateCcw } from 'lucide-react';
import { t } from '../../locales';

export const GameOverScreen: React.FC = () => {
  const { locale, seed, currentNode, initNewRun } = useCardByteStore();

  const floorReached = currentNode ? currentNode.depth : 0;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 select-none relative">
      <div className="max-w-xl w-full text-center p-8 bg-[#0c1218]/95 border-2 border-rose-600 rounded-2xl box-glow-crimson">
        <div className="flex items-center justify-center space-x-2 text-rose-500 font-mono text-xs uppercase tracking-widest mb-2 animate-pulse">
          <Skull className="w-8 h-8 text-rose-500" />
          <span>{t(locale, 'gameOver.title')}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold font-mono text-rose-500 glow-crimson tracking-wider mb-2">
          {t(locale, 'gameOver.subtitle')}
        </h1>
        <p className="text-xs font-mono text-slate-400 mb-6">
          {t(locale, 'gameOver.cause')}
        </p>

        {/* Telemetry Summary */}
        <div className="bg-[#070b0e] border border-slate-800 rounded-lg p-4 font-mono text-xs text-left space-y-2 mb-6">
          <div className="flex justify-between border-b border-slate-800 pb-1">
            <span className="text-slate-400">{t(locale, 'common.layer')}:</span>
            <span className="text-rose-400 font-bold">{floorReached}/7</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">{t(locale, 'common.hex')}:</span>
            <span className="text-amber-400 font-bold">0x{seed.toString(16).toUpperCase()}</span>
          </div>
        </div>

        {/* Try Again Button */}
        <button
          onClick={() => initNewRun()}
          className="flex items-center justify-center space-x-2 w-full py-3.5 bg-rose-700 hover:bg-rose-600 text-white border-2 border-rose-500 rounded-xl font-mono text-sm font-bold tracking-wider uppercase transition-all box-glow-crimson hover:scale-105 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t(locale, 'gameOver.rebootDeck')}</span>
        </button>
      </div>
    </div>
  );
};
