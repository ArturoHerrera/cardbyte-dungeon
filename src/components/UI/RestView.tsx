import React, { useState, useMemo } from 'react';
import { useCardByteStore } from '../../store/cardByteStore';
import { HeartPulse, Cpu, Check } from 'lucide-react';
import { CardView } from '../Combat/CardView';
import { t } from '../../locales';

export const RestView: React.FC = () => {
  const { locale, playerFleshHp, playerMaxHp, masterDeck, healPlayer, upgradeMasterCard, setScreen } = useCardByteStore();
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [mode, setMode] = useState<'CHOICE' | 'UPGRADE'>('CHOICE');

  const healAmount = Math.floor(playerMaxHp * 0.3); // +15 HP
  const upgradableCards = useMemo(() => masterDeck.filter((c) => !c.upgraded), [masterDeck]);

  const handlePurge = () => {
    healPlayer(healAmount);
    setScreen('MAP');
  };

  const handleRefactor = () => {
    if (selectedCardId) {
      upgradeMasterCard(selectedCardId);
      setScreen('MAP');
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 select-none relative">
      <div className="max-w-3xl w-full text-center p-6 bg-[#0c1218]/95 border border-emerald-800/80 rounded-xl box-glow-green">
        <div className="flex items-center justify-center space-x-2 text-[#00ff66] font-mono text-sm uppercase tracking-widest mb-1">
          <HeartPulse className="w-4 h-4" />
          <span>{t(locale, 'rest.title')}</span>
        </div>
        <h2 className="text-xl font-bold font-mono text-slate-100 mb-6">
          {t(locale, 'rest.subtitle')}
        </h2>

        {mode === 'CHOICE' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto mb-4">
            {/* Option A: Purge / Heal */}
            <button
              onClick={handlePurge}
              className="p-6 bg-[#070b0e] border-2 border-emerald-600 hover:border-[#00ff66] rounded-xl flex flex-col items-center justify-center hover:scale-105 transition-all group box-glow-green"
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
              onClick={() => setMode('UPGRADE')}
              className="p-6 bg-[#070b0e] border-2 border-cyan-600 hover:border-[#00e5ff] rounded-xl flex flex-col items-center justify-center hover:scale-105 transition-all group box-glow-cyan"
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
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-xs font-mono text-cyan-300 mb-4">
              {t(locale, 'rest.selectCardPrompt')}
            </p>

            {/* Upgradable Cards Grid */}
            <div className="flex items-center justify-center gap-4 flex-wrap max-h-72 overflow-y-auto p-2 mb-6">
              {upgradableCards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => setSelectedCardId(card.id)}
                  className={`cursor-pointer transition-transform ${
                    selectedCardId === card.id ? 'ring-2 ring-[#00ff66] scale-105' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  <CardView card={card} scale="compact" />
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMode('CHOICE')}
                className="px-4 py-2 bg-slate-900 border border-slate-700 text-slate-400 rounded font-mono text-xs"
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
        )}
      </div>
    </div>
  );
};
