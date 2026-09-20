import React from 'react';
import { useCardByteStore } from '../../store/cardByteStore';
import { Shield, Heart, Zap, Database, Terminal, HardDrive } from 'lucide-react';
import { t } from '../../locales';

export const TopBar: React.FC = () => {
  const { 
    locale,
    setLocale,
    playerFleshHp, 
    playerMaxHp, 
    playerBlock, 
    playerEnergy, 
    playerMaxEnergy, 
    seed, 
    currentNode, 
    currentScreen,
    openModal,
    setScreen,
    masterDeck 
  } = useCardByteStore();

  const floorDisplay = currentNode ? `${currentNode.depth}/7` : '0/7';
  const hexSeed = seed ? `0x${seed.toString(16).toUpperCase()}` : '0x00000';

  return (
    <header className="w-full h-14 bg-[#070b0e]/95 border-b border-[#1e2c38] px-4 flex items-center justify-between text-xs font-mono select-none z-30 shrink-0">
      {/* Left: Deck Brand & Breadcrumb */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1.5 px-2 py-1 bg-[#0c1218] border border-[#1e2c38] rounded">
          <Terminal className="w-3.5 h-3.5 text-[#00ff66]" />
          <span className="text-[#00ff66] font-bold tracking-wider">{t(locale, 'common.deckBrand')}</span>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-slate-400">
          <span>//</span>
          <span>{t(locale, 'common.layer')}: <strong className="text-cyan-400">{floorDisplay}</strong></span>
          <span>//</span>
          <span>{t(locale, 'common.hex')}: <strong className="text-amber-400">{hexSeed}</strong></span>
        </div>
      </div>

      {/* Center: Vitals (Only visible when run active) */}
      {currentScreen !== 'TITLE' && currentScreen !== 'VICTORY' && currentScreen !== 'GAME_OVER' && (
        <div className="flex items-center space-x-4">
          {/* Neural Integrity (HP) */}
          <div className="flex items-center space-x-1.5 bg-[#0c1218] px-2.5 py-1 border border-rose-900/50 rounded">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/30" />
            <span className="text-slate-300">{t(locale, 'topbar.integrity')}</span>
            <span className="text-rose-400 font-bold">{playerFleshHp}/{playerMaxHp}</span>
          </div>

          {/* ICE-Buffer (Block) */}
          <div className="flex items-center space-x-1.5 bg-[#0c1218] px-2.5 py-1 border border-cyan-900/50 rounded">
            <Shield className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
            <span className="text-slate-300">{t(locale, 'topbar.buffer')}</span>
            <span className="text-cyan-400 font-bold">{playerBlock}</span>
          </div>

          {/* Deck RAM (Energy) */}
          <div className="flex items-center space-x-1.5 bg-[#0c1218] px-2.5 py-1 border border-amber-900/50 rounded">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            <span className="text-slate-300">{t(locale, 'topbar.ram')}</span>
            <span className="text-amber-400 font-bold">{playerEnergy}/{playerMaxEnergy}</span>
          </div>
        </div>
      )}

      {/* Right: Actions (ROM Storage, Deck, Menu, Language Switcher) */}
      <div className="flex items-center space-x-2">
        {/* Language Switcher */}
        <div className="flex items-center border border-[#1e2c38] rounded bg-[#0c1218] overflow-hidden text-[11px]">
          <button
            onClick={() => setLocale('en')}
            className={`px-2 py-1 font-bold transition-colors ${
              locale === 'en'
                ? 'bg-cyan-500/20 text-cyan-400 border-r border-[#1e2c38]'
                : 'text-slate-400 hover:text-slate-200 border-r border-[#1e2c38]'
            }`}
            title="English"
          >
            EN
          </button>
          <button
            onClick={() => setLocale('es')}
            className={`px-2 py-1 font-bold transition-colors ${
              locale === 'es'
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Español"
          >
            ES
          </button>
        </div>

        {currentScreen !== 'TITLE' && currentScreen !== 'MAP' && (
          <button
            onClick={() => setScreen('MAP')}
            className="px-2.5 py-1 bg-[#0c1218] border border-cyan-800/80 text-cyan-400 hover:bg-cyan-950/40 rounded transition-colors text-[11px]"
            title="Inspect Matrix Graph"
          >
            {t(locale, 'topbar.returnToMatrix')}
          </button>
        )}

        {currentScreen !== 'TITLE' && (
          <button
            onClick={() => openModal('DECK_VIEW')}
            className="flex items-center space-x-1 px-2.5 py-1 bg-[#0c1218] border border-[#1e2c38] hover:border-slate-500 text-slate-300 rounded transition-colors text-[11px]"
            title="Inspect Subroutine Deck"
          >
            <Database className="w-3 h-3 text-cyan-400" />
            <span>{t(locale, 'topbar.deckLabel')} ({masterDeck.length})</span>
          </button>
        )}

        <button
          onClick={() => openModal('ROM_DUMP')}
          className="flex items-center space-x-1 px-2.5 py-1 bg-[#0c1218] border border-amber-800/70 hover:border-amber-500 text-amber-400 rounded transition-colors text-[11px]"
          title="Backup or Restore Cartridge Dump"
        >
          <HardDrive className="w-3 h-3 text-amber-400" />
          <span className="hidden sm:inline">{t(locale, 'topbar.systemDump')}</span>
        </button>
      </div>
    </header>
  );
};
