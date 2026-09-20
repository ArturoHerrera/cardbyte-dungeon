import React, { useState, useMemo } from 'react';
import { useCardByteStore } from '../../store/cardByteStore';
import { HeartPulse, Cpu, Trash2, Check, AlertTriangle } from 'lucide-react';
import { CardView } from '../Combat/CardView';
import { t } from '../../locales';

export const RestView: React.FC = () => {
  const { 
    locale, 
    playerFleshHp, 
    playerMaxHp, 
    masterDeck, 
    healPlayer, 
    upgradeMasterCard, 
    removeCardFromMasterDeck,
    setScreen 
  } = useCardByteStore();

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [mode, setMode] = useState<'CHOICE' | 'UPGRADE' | 'PURGE'>('CHOICE');

  const healAmount = Math.floor(playerMaxHp * 0.3); // +15 HP
  const upgradableCards = useMemo(() => masterDeck.filter((c) => !c.upgraded), [masterDeck]);
  const canPurge = masterDeck.length > 4;

  const handleCooldown = () => {
    healPlayer(healAmount);
    setScreen('MAP');
  };

  const handleRefactor = () => {
    if (selectedCardId) {
      upgradeMasterCard(selectedCardId);
      setScreen('MAP');
    }
  };

  const handleExecutePurge = () => {
    if (selectedCardId && canPurge) {
      removeCardFromMasterDeck(selectedCardId);
      setScreen('MAP');
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 select-none relative">
      <div className="max-w-4xl w-full text-center p-6 bg-[#0c1218]/95 border border-emerald-800/80 rounded-xl box-glow-green">
        <div className="flex items-center justify-center space-x-2 text-[#00ff66] font-mono text-sm uppercase tracking-widest mb-1">
          <HeartPulse className="w-4 h-4" />
          <span>{t(locale, 'rest.title')}</span>
        </div>
        <h2 className="text-xl font-bold font-mono text-slate-100 mb-6">
          {t(locale, 'rest.subtitle')}
        </h2>

        {mode === 'CHOICE' ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-4">
              {/* Option A: Core Cooldown */}
              <button
                onClick={handleCooldown}
                className="p-6 bg-[#070b0e] border-2 border-emerald-600 hover:border-[#00ff66] rounded-xl flex flex-col items-center justify-center hover:scale-105 transition-all group box-glow-green cursor-pointer"
              >
                <HeartPulse className="w-12 h-12 text-[#00ff66] mb-3 group-hover:animate-pulse" />
                <div className="font-mono font-bold text-sm text-slate-100 mb-1">
                  {t(locale, 'rest.cooldownTitle')}
                </div>
                <p className="font-mono text-xs text-slate-400">
                  {t(locale, 'rest.cooldownDesc', { hp: healAmount })}
                </p>
                <span className="mt-3 text-[10px] font-mono text-slate-500">
                  {t(locale, 'topbar.integrity')} {playerFleshHp}/{playerMaxHp}
                </span>
              </button>

              {/* Option B: Refactor / Upgrade */}
              <button
                onClick={() => {
                  setSelectedCardId(null);
                  setMode('UPGRADE');
                }}
                className="p-6 bg-[#070b0e] border-2 border-cyan-600 hover:border-[#00e5ff] rounded-xl flex flex-col items-center justify-center hover:scale-105 transition-all group box-glow-cyan cursor-pointer"
              >
                <Cpu className="w-12 h-12 text-cyan-400 mb-3 group-hover:rotate-12 transition-transform" />
                <div className="font-mono font-bold text-sm text-slate-100 mb-1">
                  {t(locale, 'rest.patchTitle')}
                </div>
                <p className="font-mono text-xs text-slate-400">
                  {t(locale, 'rest.patchDesc')}
                </p>
                <span className="mt-3 text-[10px] font-mono text-slate-500">
                  {t(locale, 'topbar.subroutines')}: {upgradableCards.length}
                </span>
              </button>

              {/* Option C: Purge Subroutine */}
              <button
                disabled={!canPurge}
                onClick={() => {
                  if (canPurge) {
                    setSelectedCardId(null);
                    setMode('PURGE');
                  }
                }}
                className={`p-6 bg-[#070b0e] border-2 rounded-xl flex flex-col items-center justify-center transition-all group ${
                  canPurge
                    ? 'border-red-600/80 hover:border-red-400 hover:scale-105 box-glow-red cursor-pointer'
                    : 'border-slate-800 opacity-50 cursor-not-allowed'
                }`}
              >
                <Trash2 className={`w-12 h-12 mb-3 ${canPurge ? 'text-red-400 group-hover:scale-110 transition-transform' : 'text-slate-600'}`} />
                <div className="font-mono font-bold text-sm text-slate-100 mb-1">
                  {t(locale, 'rest.purgeTitle')}
                </div>
                <p className="font-mono text-xs text-slate-400">
                  {t(locale, 'rest.purgeDesc')}
                </p>
                <span className="mt-3 text-[10px] font-mono text-slate-500">
                  {t(locale, 'topbar.subroutines')}: {masterDeck.length}
                </span>
              </button>
            </div>

            {!canPurge && (
              <div className="flex items-center justify-center space-x-2 text-amber-400 text-xs font-mono mt-2 bg-amber-950/40 border border-amber-800/60 rounded px-4 py-2 max-w-xl mx-auto">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{t(locale, 'rest.minBufferWarning')}</span>
              </div>
            )}
          </div>
        ) : mode === 'UPGRADE' ? (
          <div className="flex flex-col items-center">
            <p className="text-xs font-mono text-cyan-300 mb-4">
              {t(locale, 'rest.selectCardPrompt')}
            </p>

            {/* Upgradable Cards Grid */}
            <div className="flex items-center justify-center gap-4 flex-wrap max-h-72 overflow-y-auto p-2 mb-6">
              {upgradableCards.length === 0 ? (
                <p className="text-slate-500 font-mono text-xs my-8">
                  {t(locale, 'rest.fullyPatched')}
                </p>
              ) : (
                upgradableCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => setSelectedCardId(card.id)}
                    className={`cursor-pointer transition-transform ${
                      selectedCardId === card.id ? 'ring-2 ring-[#00ff66] scale-105' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    <CardView card={card} scale="compact" />
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMode('CHOICE')}
                className="px-4 py-2 bg-slate-900 border border-slate-700 text-slate-400 rounded font-mono text-xs hover:text-white cursor-pointer"
              >
                {t(locale, 'common.back')}
              </button>
              <button
                disabled={!selectedCardId}
                onClick={handleRefactor}
                className={`
                  flex items-center space-x-2 px-6 py-2 rounded font-mono text-xs uppercase font-bold
                  ${
                    selectedCardId
                      ? 'bg-[#00ff66] text-black hover:bg-[#39ff14] cursor-pointer box-glow-green'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }
                `}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{t(locale, 'common.confirm')}</span>
              </button>
            </div>
          </div>
        ) : (
          /* PURGE MODE */
          <div className="flex flex-col items-center">
            <p className="text-xs font-mono text-red-400 mb-4">
              {t(locale, 'rest.selectPurgePrompt')}
            </p>

            {/* All Master Deck Cards Grid */}
            <div className="flex items-center justify-center gap-4 flex-wrap max-h-72 overflow-y-auto p-2 mb-6">
              {masterDeck.map((card, idx) => (
                <div
                  key={`${card.id}_${idx}`}
                  onClick={() => setSelectedCardId(card.id)}
                  className={`cursor-pointer transition-transform ${
                    selectedCardId === card.id ? 'ring-2 ring-red-500 scale-105' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  <CardView card={card} scale="compact" />
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMode('CHOICE')}
                className="px-4 py-2 bg-slate-900 border border-slate-700 text-slate-400 rounded font-mono text-xs hover:text-white cursor-pointer"
              >
                {t(locale, 'common.back')}
              </button>
              <button
                disabled={!selectedCardId}
                onClick={handleExecutePurge}
                className={`
                  flex items-center space-x-2 px-6 py-2 rounded font-mono text-xs uppercase font-bold
                  ${
                    selectedCardId
                      ? 'bg-red-500 text-white hover:bg-red-600 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }
                `}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t(locale, 'rest.executePurge')}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
