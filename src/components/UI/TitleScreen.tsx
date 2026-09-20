import React, { useEffect } from 'react';
import { useCardByteStore } from '../../store/cardByteStore';
import { Terminal, Play, RotateCcw, HardDrive, BarChart3, BookOpen, Sparkles } from 'lucide-react';

import { t } from '../../locales';

export const TitleScreen: React.FC = () => {
  const { 
    locale, 
    hasActiveRun, 
    profile, 
    checkExistingRun, 
    initNewRun, 
    resumeRun, 
    openModal,
    startTutorialCombat,
  } = useCardByteStore();


  useEffect(() => {
    checkExistingRun();
  }, [checkExistingRun]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 select-none relative overflow-hidden">
      {/* Background Ambience */}
      <div className="max-w-xl w-full text-center p-8 bg-[#0c1218]/95 border-2 border-[#1e2c38] rounded-2xl box-glow-cyan z-10 relative">
        {/* Hardware Header */}
        <div className="flex items-center justify-center space-x-2 text-[#00ff66] font-mono text-xs uppercase tracking-widest mb-2">
          <Terminal className="w-4 h-4" />
          <span>{t(locale, 'titleScreen.subtitle')}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold font-mono text-[#00e5ff] glow-cyan tracking-wider mb-2">
          {t(locale, 'titleScreen.systemTitle')}
        </h1>
        <p className="text-xs font-mono text-slate-400 max-w-md mx-auto mb-8">
          A procedural turn-based card battler in the consensual hallucination of corporate Black ICE matrices.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3 max-w-sm mx-auto mb-8">
          {hasActiveRun && (
            <button
              onClick={() => resumeRun()}
              className="flex items-center justify-center space-x-2 w-full py-3.5 bg-cyan-950 border-2 border-cyan-400 hover:bg-cyan-900 text-cyan-200 rounded-xl font-mono text-sm font-bold tracking-wider uppercase transition-all box-glow-cyan hover:scale-105 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-cyan-300" />
              <span>{t(locale, 'titleScreen.resumeRun')}</span>
            </button>
          )}

          <button
            onClick={() => initNewRun()}
            className="flex items-center justify-center space-x-2 w-full py-3.5 bg-[#00ff66] hover:bg-[#39ff14] text-black border-2 border-[#00ff66] rounded-xl font-mono text-sm font-bold tracking-wider uppercase transition-all box-glow-green hover:scale-105 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>{t(locale, 'titleScreen.jackIn')}</span>
          </button>

          <button
            onClick={() => startTutorialCombat()}
            className="flex items-center justify-center space-x-2 w-full py-2.5 bg-[#0a1622] hover:bg-[#0f2438] text-cyan-300 border border-cyan-500/80 rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:scale-[1.02] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t(locale, 'tutorial.startSimulation')}</span>
          </button>


          <div className="grid grid-cols-3 gap-2 pt-2">
            <button
              onClick={() => openModal('CODEX')}
              className="flex items-center justify-center space-x-1.5 py-2 bg-[#070b0e] border border-cyan-800 hover:border-cyan-400 text-cyan-300 rounded-lg font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>CODEX</span>
            </button>

            <button
              onClick={() => openModal('ROM_DUMP')}
              className="flex items-center justify-center space-x-1.5 py-2 bg-[#070b0e] border border-amber-800 hover:border-amber-500 text-amber-400 rounded-lg font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span>{t(locale, 'topbar.systemDump')}</span>
            </button>

            <button
              onClick={() => openModal('PROFILE')}
              className="flex items-center justify-center space-x-1.5 py-2 bg-[#070b0e] border border-slate-700 hover:border-slate-500 text-slate-300 rounded-lg font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t(locale, 'topbar.cyberdeckProfile')}</span>
            </button>
          </div>
        </div>


        {/* Console Jockey Meta-Stats Footer */}
        <div className="border-t border-slate-800 pt-4 flex items-center justify-around text-[11px] font-mono text-slate-400">
          <div>
            {t(locale, 'modals.profile.totalRuns')} <strong className="text-slate-200">{profile.totalRuns}</strong>
          </div>
          <div>
            {t(locale, 'modals.profile.victories')} <strong className="text-[#00ff66]">{profile.victories}</strong>
          </div>
          <div>
            {t(locale, 'modals.profile.flatlines')} <strong className="text-rose-400">{profile.flatlines}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
