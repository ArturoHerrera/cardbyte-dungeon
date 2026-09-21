import React, { useState, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useCardByteStore } from '../../store/cardByteStore';
import { Shield, Heart, Zap, Database, Terminal, HardDrive, BookOpen, HelpCircle, Smartphone, Monitor, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { SysAssistAnchor } from '../Tutorial/SysAssistAnchor';
import { audioManager } from '../../audio/audioManager';

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
    masterDeck,
    sysAssistEnabled,
    toggleSysAssist,
    mobileViewMode,
    toggleMobileViewMode,
  } = useCardByteStore(
    useShallow((s) => ({
      locale: s.locale,
      setLocale: s.setLocale,
      playerFleshHp: s.playerFleshHp,
      playerMaxHp: s.playerMaxHp,
      playerBlock: s.playerBlock,
      playerEnergy: s.playerEnergy,
      playerMaxEnergy: s.playerMaxEnergy,
      seed: s.seed,
      currentNode: s.currentNode,
      currentScreen: s.currentScreen,
      openModal: s.openModal,
      setScreen: s.setScreen,
      masterDeck: s.masterDeck,
      sysAssistEnabled: s.sysAssistEnabled,
      toggleSysAssist: s.toggleSysAssist,
      mobileViewMode: s.mobileViewMode,
      toggleMobileViewMode: s.toggleMobileViewMode,
    }))
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(audioManager.isAudioMuted());

  useEffect(() => {
    return audioManager.subscribe(() => {
      setIsAudioMuted(audioManager.isAudioMuted());
    });
  }, []);

  const handleToggleAudio = () => {
    audioManager.playSfx('UI_CLICK');
    audioManager.toggleMute();
  };

  const floorDisplay = currentNode ? `${currentNode.depth}/7` : '0/7';
  const hexSeed = seed ? `0x${seed.toString(16).toUpperCase()}` : '0x00000';

  return (
    <header className="w-full h-12 bg-[#070b0e]/95 border-b border-[#1e2c38] px-3 flex items-center justify-between text-xs font-mono select-none z-30 shrink-0 relative">
      {/* Left: Deck Brand & Breadcrumb */}
      <div className="flex items-center space-x-2 shrink-0">
        <div className="flex items-center space-x-1.5 px-2 py-0.5 bg-[#0c1218] border border-[#1e2c38] rounded">
          <Terminal className="w-3 h-3 text-[#00ff66]" />
          <span className="text-[#00ff66] font-bold tracking-wider text-[11px]">{t(locale, 'common.deckBrand')}</span>
        </div>
        {!mobileViewMode && (
          <div className="hidden lg:flex items-center space-x-2 text-slate-400 text-[11px]">
            <span>//</span>
            <span>{t(locale, 'common.layer')}: <strong className="text-cyan-400">{floorDisplay}</strong></span>
            <span>//</span>
            <span>{t(locale, 'common.hex')}: <strong className="text-amber-400">{hexSeed}</strong></span>
          </div>
        )}
      </div>

      {/* Center: Vitals (Only visible when run active) */}
      {currentScreen !== 'TITLE' && currentScreen !== 'VICTORY' && currentScreen !== 'GAME_OVER' && (
        <div className="flex items-center space-x-1.5 sm:space-x-3 text-[11px]">
          {/* Neural Integrity (HP) */}
          <div className="flex items-center space-x-1 bg-[#0c1218] px-1.5 sm:px-2 py-0.5 border border-rose-900/50 rounded">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500/30" />
            <span className="text-rose-400 font-bold">{playerFleshHp}/{playerMaxHp}</span>
          </div>

          {/* ICE-Buffer (Block) */}
          <SysAssistAnchor id="ice_buffer" position="bottom">
            <div className="flex items-center space-x-1 bg-[#0c1218] px-1.5 sm:px-2 py-0.5 border border-cyan-900/50 rounded">
              <Shield className="w-3 h-3 text-cyan-400 fill-cyan-400/20" />
              <span className="text-cyan-400 font-bold">{playerBlock}</span>
            </div>
          </SysAssistAnchor>

          {/* Deck RAM (Energy) */}
          <SysAssistAnchor id="ram_counter" position="bottom">
            <div className="flex items-center space-x-1 bg-[#0c1218] px-1.5 sm:px-2 py-0.5 border border-amber-900/50 rounded">
              <Zap className="w-3 h-3 text-amber-400 fill-amber-400/20" />
              <span className="text-amber-400 font-bold">{playerEnergy}/{playerMaxEnergy}</span>
            </div>
          </SysAssistAnchor>
        </div>
      )}

      {/* Right: Actions */}
      <div className="flex items-center space-x-1.5">
        {/* Audio Mute/Unmute Quick Toggle */}
        <button
          onClick={handleToggleAudio}
          className={`p-1.5 rounded transition-all border ${
            !isAudioMuted 
              ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_8px_rgba(0,229,255,0.4)]' 
              : 'bg-[#0c1218] border-[#1e2c38] text-slate-500 hover:text-slate-300'
          }`}
          title={isAudioMuted ? 'Audio: MUTED (Click to Activate)' : 'Audio: ACTIVE (Click to Mute)'}
        >
          {!isAudioMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* Desktop Mobile View Toggle (Hidden strictly on mobile phone screens) */}
        <button
          onClick={toggleMobileViewMode}
          className={`hidden md:flex p-1.5 rounded transition-all border ${
            mobileViewMode 
              ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_8px_rgba(0,229,255,0.4)]' 
              : 'bg-[#0c1218] border-[#1e2c38] text-slate-400 hover:text-slate-200'
          }`}
          title={mobileViewMode ? 'Exit Mobile Simulation' : 'Toggle Mobile Portrait Simulation'}
        >
          {mobileViewMode ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
        </button>

        {/* In Mobile View: Burger dropdown for secondary controls */}
        {mobileViewMode ? (
          <div className="relative">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 bg-[#0c1218] border border-[#1e2c38] hover:border-slate-500 text-slate-300 rounded transition-colors"
              title="System Menu"
            >
              {mobileMenuOpen ? <X className="w-3.5 h-3.5 text-rose-400" /> : <Menu className="w-3.5 h-3.5 text-cyan-400" />}
            </button>

            {/* Mobile Dropdown Panel */}
            {mobileMenuOpen && (
              <div className="absolute right-0 top-10 w-48 bg-[#090e13]/98 border border-[#1e2c38] rounded-lg shadow-2xl p-2 z-50 flex flex-col space-y-1.5">
                {/* Language Switcher */}
                <div className="flex items-center justify-between px-2 py-1 bg-[#0c1218] rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400">LANG:</span>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => { setLocale('en'); setMobileMenuOpen(false); }}
                      className={`px-2 py-0.5 text-[10px] rounded ${locale === 'en' ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400'}`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => { setLocale('es'); setMobileMenuOpen(false); }}
                      className={`px-2 py-0.5 text-[10px] rounded ${locale === 'es' ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400'}`}
                    >
                      ES
                    </button>
                  </div>
                </div>

                {/* Audio Toggle Item in Mobile Menu */}
                <button
                  onClick={handleToggleAudio}
                  className="w-full flex items-center justify-between px-2 py-1 bg-[#0c1218] hover:bg-slate-800 text-slate-300 rounded text-[10px]"
                >
                  <span className="flex items-center space-x-1.5">
                    {!isAudioMuted ? <Volume2 className="w-3 h-3 text-cyan-400" /> : <VolumeX className="w-3 h-3 text-slate-500" />}
                    <span>AUDIO</span>
                  </span>
                  <span className={!isAudioMuted ? 'text-[#00ff66]' : 'text-slate-500'}>
                    {!isAudioMuted ? 'ONLINE' : 'MUTED'}
                  </span>
                </button>

                {currentScreen !== 'TITLE' && currentScreen !== 'MAP' && (
                  <button
                    onClick={() => { setScreen('MAP'); setMobileMenuOpen(false); }}
                    className="w-full text-left px-2 py-1 bg-[#0c1218] hover:bg-cyan-950/30 text-cyan-400 rounded text-[10px]"
                  >
                    {t(locale, 'topbar.returnToMatrix')}
                  </button>
                )}

                {currentScreen !== 'TITLE' && (
                  <button
                    onClick={() => { openModal('DECK_VIEW'); setMobileMenuOpen(false); }}
                    className="w-full flex items-center justify-between px-2 py-1 bg-[#0c1218] hover:bg-slate-800 text-slate-300 rounded text-[10px]"
                  >
                    <span>{t(locale, 'topbar.deckLabel')}</span>
                    <span className="text-cyan-400 font-bold">{masterDeck.length}</span>
                  </button>
                )}

                <button
                  onClick={() => { toggleSysAssist(); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-between px-2 py-1 bg-[#0c1218] hover:bg-slate-800 text-slate-300 rounded text-[10px]"
                >
                  <span>SYS_ASSIST</span>
                  <span className={sysAssistEnabled ? 'text-[#00ff66]' : 'text-slate-500'}>
                    {sysAssistEnabled ? 'ON' : 'OFF'}
                  </span>
                </button>

                <button
                  onClick={() => { openModal('CODEX'); setMobileMenuOpen(false); }}
                  className="w-full flex items-center space-x-1.5 px-2 py-1 bg-[#0c1218] hover:bg-slate-800 text-cyan-300 rounded text-[10px]"
                >
                  <BookOpen className="w-3 h-3 text-cyan-400" />
                  <span>CODEX</span>
                </button>

                <button
                  onClick={() => { openModal('ROM_DUMP'); setMobileMenuOpen(false); }}
                  className="w-full flex items-center space-x-1.5 px-2 py-1 bg-[#0c1218] hover:bg-slate-800 text-amber-400 rounded text-[10px]"
                >
                  <HardDrive className="w-3 h-3 text-amber-400" />
                  <span>{t(locale, 'topbar.systemDump')}</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Standard Desktop Actions */
          <div className="flex items-center space-x-1.5">
            {/* Language Switcher */}
            <div className="flex items-center border border-[#1e2c38] rounded bg-[#0c1218] overflow-hidden text-[11px]">
              <button
                onClick={() => setLocale('en')}
                className={`px-2 py-0.5 font-bold transition-colors ${
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
                className={`px-2 py-0.5 font-bold transition-colors ${
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
                className="px-2 py-0.5 bg-[#0c1218] border border-cyan-800/80 text-cyan-400 hover:bg-cyan-950/40 rounded transition-colors text-[11px]"
                title="Inspect Matrix Graph"
              >
                {t(locale, 'topbar.returnToMatrix')}
              </button>
            )}

            {currentScreen !== 'TITLE' && (
              <button
                onClick={() => openModal('DECK_VIEW')}
                className="flex items-center space-x-1 px-2 py-0.5 bg-[#0c1218] border border-[#1e2c38] hover:border-slate-500 text-slate-300 rounded transition-colors text-[11px]"
                title="Inspect Subroutine Deck"
              >
                <Database className="w-3 h-3 text-cyan-400" />
                <span>{t(locale, 'topbar.deckLabel')} ({masterDeck.length})</span>
              </button>
            )}

            {/* SYS_ASSIST Toggle Button */}
            <button
              onClick={toggleSysAssist}
              className={`flex items-center space-x-1 px-2 py-0.5 rounded transition-colors text-[11px] border ${
                sysAssistEnabled
                  ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  : 'bg-[#0c1218] border-slate-700/80 text-slate-400 hover:text-slate-200'
              }`}
              title={sysAssistEnabled ? 'SYS_ASSIST: ACTIVE (Click to mute)' : 'SYS_ASSIST: MUTED (Click to activate)'}
            >
              <HelpCircle className={`w-3 h-3 ${sysAssistEnabled ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span className="hidden md:inline">{sysAssistEnabled ? 'AID: ON' : 'AID: OFF'}</span>
            </button>

            <button
              onClick={() => openModal('CODEX')}
              className="flex items-center space-x-1 px-2 py-0.5 bg-[#0c1218] border border-cyan-800/80 hover:border-cyan-400 text-cyan-300 rounded transition-colors text-[11px]"
              title="Open Operator Codex Manual"
            >
              <BookOpen className="w-3 h-3 text-cyan-400" />
              <span>CODEX</span>
            </button>

            <button
              onClick={() => openModal('ROM_DUMP')}
              className="flex items-center space-x-1 px-2 py-0.5 bg-[#0c1218] border border-amber-800/70 hover:border-amber-500 text-amber-400 rounded transition-colors text-[11px]"
              title="Backup or Restore Cartridge Dump"
            >
              <HardDrive className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">{t(locale, 'topbar.systemDump')}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
