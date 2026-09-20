import React from 'react';
import { useCardByteStore } from '../../store/cardByteStore';
import { EnemyCard } from './EnemyCard';
import { CardView } from './CardView';
import { Play, RotateCcw } from 'lucide-react';
import { t } from '../../locales';

export const CombatView: React.FC = () => {
  const {
    locale,
    enemy,
    hand,
    drawPile,
    discardPile,
    playerEnergy,
    playerStatusEffects,
    turnPhase,
    combatLog,
    playCard,
    endTurn,
  } = useCardByteStore();

  if (!enemy) return null;

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 select-none overflow-hidden relative">
      {/* Top Arena Header: Telemetry & Enemy Construct */}
      <div className="flex-1 flex flex-col items-center justify-center relative min-h-0">
        <EnemyCard enemy={enemy} />

        {/* Floating Combat Console Log Snippet */}
        <div className="absolute top-2 left-2 w-72 max-h-28 overflow-y-auto bg-[#070b0e]/85 border border-[#1e2c38] rounded p-2 text-[10px] font-mono text-slate-400 space-y-1 z-10 pointer-events-none hidden md:block">
          <div className="text-slate-500 font-bold border-b border-slate-800 pb-0.5">
            TERMINAL I/O LOG:
          </div>
          {combatLog.slice(-4).map((log, i) => (
            <p key={i} className="leading-tight text-slate-300 truncate">
              {log}
            </p>
          ))}
        </div>
      </div>

      {/* Middle Status Separator */}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between border-t border-b border-[#1e2c38] py-1.5 px-4 text-xs font-mono text-slate-300 shrink-0">
        <div className="flex items-center space-x-4">
          <span>RAM: <strong className="text-cyan-400">{hand.length}/10</strong></span>
          <span>DRAW: <strong className="text-slate-400">{drawPile.length}</strong></span>
          <span>{t(locale, 'combat.discardBuffer')}: <strong className="text-slate-400">{discardPile.length}</strong></span>
          {Object.entries(playerStatusEffects).map(([k, v]) => (
            <span key={k} className="text-rose-400 uppercase font-bold">
              [{k}: {v}]
            </span>
          ))}
        </div>

        {/* End Turn Button */}
        <button
          id="btn-end-turn"
          disabled={turnPhase !== 'PLAYER'}
          onClick={endTurn}
          className={`
            flex items-center space-x-1.5 px-4 py-1.5 rounded font-mono font-bold text-xs uppercase tracking-wider
            transition-all duration-150 border
            ${
              turnPhase === 'PLAYER'
                ? 'bg-rose-950/80 border-rose-500 text-rose-300 hover:bg-rose-900 hover:scale-105 cursor-pointer box-glow-crimson'
                : 'bg-slate-900 border-slate-700 text-slate-500 cursor-not-allowed'
            }
          `}
        >
          {turnPhase === 'PLAYER' ? (
            <>
              <Play className="w-3.5 h-3.5 fill-rose-300" />
              <span>{t(locale, 'combat.endCycle')}</span>
            </>
          ) : (
            <>
              <RotateCcw className="w-3.5 h-3.5 animate-spin" />
              <span>{t(locale, 'combat.enemyTurnBanner')}</span>
            </>
          )}
        </button>
      </div>

      {/* Bottom: Hand Layer Ribbon */}
      <div className="w-full shrink-0 flex items-end justify-center pt-2 pb-1 overflow-x-auto min-h-[250px]">
        <div className="flex items-end space-x-3 px-4">
          {hand.map((card) => (
            <CardView
              key={card.id}
              card={card}
              canAfford={card.cost <= playerEnergy}
              disabled={turnPhase !== 'PLAYER'}
              onPlay={playCard}
            />
          ))}
          {hand.length === 0 && (
            <div className="text-slate-500 font-mono text-xs py-8">
              [ RAM EMPTY - CLICK {t(locale, 'combat.endCycle')} ]
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
