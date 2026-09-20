import React, { useEffect } from 'react';
import { useCardByteStore } from '../../store/cardByteStore';
import { Terminal, Play, RotateCcw, HardDrive, BarChart3, BookOpen, Sparkles } from 'lucide-react';
import { audioManager } from '../../audio/audioManager';

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

  const [isMuted, setIsMuted] = React.useState(audioManager.isAudioMuted());

  useEffect(() => {
    checkExistingRun();
    return audioManager.subscribe(() => {
      setIsMuted(audioManager.isAudioMuted());
    });
  }, [checkExistingRun]);

  const handleAction = (cb: () => void) => {
    audioManager.playSfx('UI_CLICK');
    cb();
  };

  const audioStatusText = isMuted ? (locale === 'es' ? 'MUTEADO' : 'MUTED') : 'ONLINE';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 sm:p-6 select-none relative overflow-y-auto">
      {/* Main Terminal Card */}
      <div className="max-w-md sm:max-w-xl w-full text-center p-4 sm:p-8 bg-[#0c1218]/95 border-2 border-[#1e2c38] rounded-2xl box-glow-cyan z-10 relative my-auto shadow-2xl">
        {/* Hardware Header */}
        <div className="flex items-center justify-center space-x-1.5 text-[#00ff66] font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-1 sm:mb-2">
          <Terminal className="w-3.5 h-3.5" />
          <span>{t(locale, 'titleScreen.subtitle')}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold font-mono text-[#00e5ff] glow-cyan tracking-wider mb-1 sm:mb-2 leading-tight">
          {t(locale, 'titleScreen.systemTitle')}
        </h1>
        <p className="text-[11px] sm:text-xs font-mono text-slate-400 max-w-sm sm:max-w-md mx-auto mb-2 sm:mb-4 leading-relaxed">
          A procedural turn-based card battler in the consensual hallucination of corporate Black ICE matrices.
        </p>

        {/* Dynamic Cyberdeck Status Telemetry */}
        <div className="text-[9px] sm:text-[10px] font-mono text-slate-500 mb-4 sm:mb-6 tracking-tight">
          {t(locale, 'titleScreen.terminalStatus', { audioStatus: audioStatusText })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2.5 sm:space-y-3 max-w-xs sm:max-w-sm mx-auto mb-4 sm:mb-6">
          {hasActiveRun && (
            <button
              onClick={() => handleAction(() => resumeRun())}
              className="flex items-center justify-between px-4 py-2.5 sm:py-3.5 bg-cyan-950 border-2 border-cyan-400 hover:bg-cyan-900 text-cyan-200 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider uppercase transition-all box-glow-cyan hover:scale-[1.02] active:scale-98 cursor-pointer"
            >
              <div className="w-5 shrink-0 flex items-center justify-start">
                <RotateCcw className="w-4 h-4 text-cyan-300" />
              </div>
              <span className="flex-1 text-center truncate">{t(locale, 'titleScreen.resumeRun')}</span>
              <div className="w-5 shrink-0" />
            </button>
          )}

          <button
            onClick={() => handleAction(() => initNewRun())}
            className="flex items-center justify-between px-4 py-2.5 sm:py-3.5 bg-[#00ff66] hover:bg-[#39ff14] text-black border-2 border-[#00ff66] rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider uppercase transition-all box-glow-green hover:scale-[1.02] active:scale-98 cursor-pointer shadow-[0_0_15px_rgba(0,255,102,0.4)]"
          >
            <div className="w-5 shrink-0 flex items-center justify-start">
              <Play className="w-4 h-4 fill-black" />
            </div>
            <span className="flex-1 text-center truncate">{t(locale, 'titleScreen.jackIn')}</span>
            <div className="w-5 shrink-0" />
          </button>

          <button
            onClick={() => handleAction(() => startTutorialCombat())}
            className="flex items-center justify-between px-4 py-2 sm:py-2.5 bg-[#0a1622] hover:bg-[#0f2438] text-cyan-300 border border-cyan-500/80 rounded-xl font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_12px_rgba(6,182,212,0.2)] hover:scale-[1.02] active:scale-98 cursor-pointer"
          >
            <div className="w-5 shrink-0 flex items-center justify-start">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <span className="flex-1 text-center truncate">{t(locale, 'tutorial.startSimulation')}</span>
            <div className="w-5 shrink-0" />
          </button>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-1">
            <button
              onClick={() => handleAction(() => openModal('CODEX'))}
              className="flex items-center justify-center space-x-1 py-1.5 sm:py-2 bg-[#070b0e] border border-cyan-800 hover:border-cyan-400 text-cyan-300 rounded-lg font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-colors"
            >
              <BookOpen className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate">CODEX</span>
            </button>

            <button
              onClick={() => handleAction(() => openModal('ROM_DUMP'))}
              className="flex items-center justify-center space-x-1 py-1.5 sm:py-2 bg-[#070b0e] border border-amber-800 hover:border-amber-500 text-amber-400 rounded-lg font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-colors"
            >
              <HardDrive className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate">{t(locale, 'topbar.systemDump')}</span>
            </button>

            <button
              onClick={() => handleAction(() => openModal('PROFILE'))}
              className="flex items-center justify-center space-x-1 py-1.5 sm:py-2 bg-[#070b0e] border border-slate-700 hover:border-slate-500 text-slate-300 rounded-lg font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-colors"
            >
              <BarChart3 className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate">{t(locale, 'topbar.cyberdeckProfile')}</span>
            </button>
          </div>
        </div>

        {/* Console Jockey Meta-Stats Footer */}
        <div className="border-t border-slate-800/80 pt-2.5 sm:pt-3 flex items-center justify-between px-2 sm:px-6 text-[10px] sm:text-[11px] font-mono text-slate-400">
          <div className="flex items-center space-x-1">
            <span className="opacity-80">{locale === 'es' ? 'INCURSIONES:' : 'RUNS:'}</span>
            <strong className="text-slate-200">{profile.totalRuns}</strong>
          </div>
          <div className="flex items-center space-x-1">
            <span className="opacity-80">{locale === 'es' ? 'VICTORIAS:' : 'WINS:'}</span>
            <strong className="text-[#00ff66]">{profile.victories}</strong>
          </div>
          <div className="flex items-center space-x-1">
            <span className="opacity-80">{locale === 'es' ? 'FLATLINES:' : 'FLATLINES:'}</span>
            <strong className="text-rose-400">{profile.flatlines}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
