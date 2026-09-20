import React from 'react';
import { useCardByteStore } from '../../store/cardByteStore';
import { Trophy, RotateCcw } from 'lucide-react';
import { t } from '../../locales';

export const VictoryScreen: React.FC = () => {
  const { locale, seed, playerFleshHp, playerMaxHp, masterDeck, initNewRun } = useCardByteStore();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 select-none relative">
      <div className="max-w-xl w-full text-center p-8 bg-[#0c1218]/95 border-2 border-[#00ff66] rounded-2xl box-glow-green">
        <div className="flex items-center justify-center space-x-2 text-[#00ff66] font-mono text-xs uppercase tracking-widest mb-2">
          <Trophy className="w-6 h-6 text-[#00ff66] animate-bounce" />
          <span>{t(locale, 'victory.title')}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-100 glow-green tracking-wider mb-2">
          {t(locale, 'victory.subtitle')}
        </h1>
        <p className="text-xs font-mono text-slate-400 mb-6">
          {t(locale, 'victory.wintermuteDecrypted')}
        </p>

        {/* Run Telemetry Summary */}
        <div className="bg-[#070b0e] border border-slate-800 rounded-lg p-4 font-mono text-xs text-left space-y-2 mb-6">
          <div className="flex justify-between border-b border-slate-800 pb-1">
            <span className="text-slate-400">{t(locale, 'common.hex')}:</span>
            <span className="text-amber-400 font-bold">0x{seed.toString(16).toUpperCase()}</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-1">
            <span className="text-slate-400">{t(locale, 'topbar.integrity')}</span>
            <span className="text-[#00ff66] font-bold">{playerFleshHp}/{playerMaxHp} HP</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">{t(locale, 'topbar.subroutines')}:</span>
            <span className="text-cyan-400 font-bold">{masterDeck.length}</span>
          </div>
        </div>

        {/* New Run Button */}
        <button
          onClick={() => initNewRun()}
          className="flex items-center justify-center space-x-2 w-full py-3.5 bg-[#00ff66] hover:bg-[#39ff14] text-black border-2 border-[#00ff66] rounded-xl font-mono text-sm font-bold tracking-wider uppercase transition-all box-glow-green hover:scale-105 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 fill-black" />
          <span>{t(locale, 'titleScreen.jackIn')}</span>
        </button>
      </div>
    </div>
  );
};
