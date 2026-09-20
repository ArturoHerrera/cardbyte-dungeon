import React from 'react';
import { useCardByteStore } from '../../store/cardByteStore';
import { EnemyCard } from './EnemyCard';
import { CardView } from './CardView';
import { Play, RotateCcw, BookOpen } from 'lucide-react';
import { SysAssistAnchor } from '../Tutorial/SysAssistAnchor';
import { TutorialGuideOverlay } from '../Tutorial/TutorialGuideOverlay';

import { t } from '../../locales';
import { audioManager } from '../../audio/audioManager';

export const CombatView: React.FC = () => {
  const {
    locale,
    enemy,
    hand,
    drawPile,
    discardPile,
    playerEnergy,
    playerStatusEffects,
    playerFleshHp,
    turnPhase,
    combatLog,
    playCard,
    endTurn,
    openModal,
    mobileViewMode,
  } = useCardByteStore();

  const [focusedCardId, setFocusedCardId] = React.useState<string | null>(null);
  const prevHpRef = React.useRef(playerFleshHp);

  // Trigger DAMAGE_CRIT on unblocked damage
  React.useEffect(() => {
    if (playerFleshHp < prevHpRef.current) {
      audioManager.playSfx('DAMAGE_CRIT');
    }
    prevHpRef.current = playerFleshHp;
  }, [playerFleshHp]);

  // Clear focused card if hand changes or turn changes
  React.useEffect(() => {
    setFocusedCardId(null);
  }, [turnPhase, hand.length]);

  const handlePlayCard = (cardId: string) => {
    const card = hand.find((c) => c.id === cardId);
    if (card) {
      const hasBlock = card.actions.some((a) => a.type === 'BLOCK');
      if (hasBlock) {
        audioManager.playSfx('SHIELD_UP');
      } else {
        audioManager.playSfx('CARD_INJECT');
      }
    }
    playCard(cardId);
    setFocusedCardId(null);
  };

  const handleEndTurn = () => {
    audioManager.playSfx('TURN_END');
    setFocusedCardId(null);
    endTurn();
  };

  if (!enemy) return null;

  return (
    <div 
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest('.card-view-wrapper')) {
          setFocusedCardId(null);
        }
      }}
      className="w-full h-full flex flex-col justify-between p-2 sm:p-3 select-none overflow-hidden relative"
    >
      {/* Tutorial Scenario HUD Overlay */}
      <TutorialGuideOverlay />

      {/* Top Arena Header: Telemetry & Enemy Construct */}
      <div className={`flex-1 flex flex-col items-center justify-center relative min-h-0 ${mobileViewMode ? 'py-1' : ''}`}>
        <EnemyCard enemy={enemy} />

        {/* Floating Combat Console Log Snippet (Hidden in mobile mode) */}
        {!mobileViewMode && (
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
        )}
      </div>

      {/* Middle Status Separator */}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between border-t border-b border-[#1e2c38] py-1.5 px-3 text-xs font-mono text-slate-300 shrink-0 relative z-20 bg-[#070b0e]/95 backdrop-blur-sm shadow-md">
        <div className="flex items-center space-x-2 sm:space-x-4 text-[11px] sm:text-xs">
          <span>RAM: <strong className="text-cyan-400">{hand.length}/10</strong></span>
          <span>DRAW: <strong className="text-slate-300">{drawPile.length}</strong></span>
          <SysAssistAnchor id="discard_pile" position="top">
            <span className="cursor-help">{t(locale, 'combat.discardBuffer')}: <strong className="text-slate-300">{discardPile.length}</strong></span>
          </SysAssistAnchor>
          {!mobileViewMode && Object.entries(playerStatusEffects).map(([k, v]) => (
            <span key={k} className="text-rose-400 uppercase font-bold text-[10px]">
              [{k}: {v}]
            </span>
          ))}
        </div>

        {/* Right side: Codex manual & End Turn */}
        <div className="flex items-center space-x-2">
          {!mobileViewMode && (
            <button
              onClick={() => openModal('CODEX')}
              className="flex items-center space-x-1 px-2 py-1 bg-[#0c1218] border border-cyan-800/80 hover:border-cyan-400 text-cyan-300 rounded transition-colors text-[11px]"
              title="Open Operator Codex"
            >
              <BookOpen className="w-3 h-3 text-cyan-400" />
              <span className="hidden sm:inline">CODEX</span>
            </button>
          )}

          {/* End Turn Button */}
          <button
            id="btn-end-turn"
            disabled={turnPhase !== 'PLAYER'}
            onClick={handleEndTurn}
            className={`
              flex items-center space-x-1.5 px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg font-mono font-bold text-xs uppercase tracking-wider
              transition-all duration-150 border select-none
              ${
                turnPhase === 'PLAYER'
                  ? 'bg-rose-950/90 border-rose-500 text-rose-200 hover:bg-rose-900 hover:scale-105 cursor-pointer box-glow-crimson active:scale-95'
                  : 'bg-slate-900 border-slate-700 text-slate-400 cursor-not-allowed'
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
      </div>

      {/* Bottom: Hand Layer Ribbon */}
      <div 
        className={`
          w-full shrink-0 flex items-end justify-center pt-6 pb-2 overflow-x-auto relative z-10
          ${mobileViewMode ? 'min-h-[240px] px-2' : 'min-h-[265px] px-4'}
        `}
      >
        <div 
          className={`
            flex items-end transition-all
            ${mobileViewMode ? '-space-x-12 hover:space-x-1 px-6 pb-2' : 'space-x-3 px-4'}
          `}
        >
          {hand.map((card) => {
            const isFocused = focusedCardId === card.id;
            return (
              <div 
                key={card.id}
                className={`card-view-wrapper transition-all duration-200 ${
                  isFocused 
                    ? 'z-40' 
                    : mobileViewMode 
                    ? 'hover:z-30 hover:-translate-y-4 z-10' 
                    : 'z-10'
                }`}
              >
                <CardView
                  card={card}
                  canAfford={card.cost <= playerEnergy}
                  disabled={turnPhase !== 'PLAYER'}
                  onPlay={handlePlayCard}
                  scale={mobileViewMode ? 'compact' : 'normal'}
                  isFocused={isFocused}
                  onFocus={(id) => setFocusedCardId(id)}
                />
              </div>
            );
          })}
          {hand.length === 0 && (
            <div className="text-slate-400 font-mono text-xs py-8">
              [ RAM EMPTY - CLICK {t(locale, 'combat.endCycle')} ]
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
