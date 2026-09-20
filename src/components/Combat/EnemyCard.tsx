import React, { useState } from 'react';
import { Enemy } from '../../types/cardbyte';
import { Shield, Swords, Zap, Bug, Server, Flame, Skull, AlertTriangle, Crosshair, Radio } from 'lucide-react';
import { useCardByteStore } from '../../store/cardByteStore';
import { SysAssistAnchor } from '../Tutorial/SysAssistAnchor';
import { t } from '../../locales';

interface EnemyCardProps {
  enemy: Enemy;
}

export const EnemyCard: React.FC<EnemyCardProps> = ({ enemy }) => {
  const { locale, mobileViewMode } = useCardByteStore();
  const [imageFailed, setImageFailed] = useState(false);

  const isElite = enemy.affixes.length > 0 && !enemy.affixes.includes('SIMULATED') && enemy.archetype !== 'WINTERMUTE';
  const isBoss = enemy.archetype === 'WINTERMUTE';

  const getArtworkFilename = (): string => {
    switch (enemy.archetype) {
      case 'BIT_BUG':
        return 'bit_bug.webp';
      case 'MEMORY_BRUTE':
        return 'memory_brute.webp';
      case 'DAEMON_CULTIST':
        return 'daemon_cultist.webp';
      case 'WINTERMUTE':
        return 'wintermute.webp';
      default:
        return 'bit_bug.webp';
    }
  };

  const getArchetypeTheme = () => {
    switch (enemy.archetype) {
      case 'BIT_BUG':
        return {
          accent: 'text-emerald-400',
          border: 'border-emerald-500/50',
          corner: 'border-emerald-400',
          radarBg: 'bg-emerald-950/20',
          glow: 'shadow-[0_0_15px_rgba(16,185,129,0.25)]',
          badge: 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300',
        };
      case 'MEMORY_BRUTE':
        return {
          accent: 'text-rose-400',
          border: 'border-rose-600/50',
          corner: 'border-rose-500',
          radarBg: 'bg-rose-950/20',
          glow: 'shadow-[0_0_15px_rgba(244,63,94,0.3)]',
          badge: 'bg-rose-950/80 border-rose-500/60 text-rose-300',
        };
      case 'DAEMON_CULTIST':
        return {
          accent: 'text-purple-400',
          border: 'border-purple-600/50',
          corner: 'border-purple-400',
          radarBg: 'bg-purple-950/20',
          glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
          badge: 'bg-purple-950/80 border-purple-500/60 text-purple-300',
        };
      case 'WINTERMUTE':
        return {
          accent: 'text-rose-400',
          border: 'border-rose-500',
          corner: 'border-amber-400',
          radarBg: 'bg-rose-950/30',
          glow: 'boss-threat-glow shadow-[0_0_25px_rgba(244,63,94,0.6)]',
          badge: 'bg-rose-950/90 border-rose-500 text-rose-200 animate-pulse',
        };
    }
  };

  const getArchetypeFallbackIcon = () => {
    switch (enemy.archetype) {
      case 'BIT_BUG':
        return <Bug className="w-12 h-12 text-emerald-400" />;
      case 'MEMORY_BRUTE':
        return <Server className="w-12 h-12 text-rose-500" />;
      case 'DAEMON_CULTIST':
        return <Flame className="w-12 h-12 text-purple-400" />;
      case 'WINTERMUTE':
        return <Skull className="w-16 h-16 text-rose-500 animate-pulse glow-crimson" />;
    }
  };

  const getLocalizedEnemyName = () => {
    switch (enemy.archetype) {
      case 'BIT_BUG':
        return t(locale, 'enemies.bit_bug.name');
      case 'MEMORY_BRUTE':
        return t(locale, 'enemies.memory_brute.name');
      case 'DAEMON_CULTIST':
        return t(locale, 'enemies.daemon_cultist.name');
      case 'WINTERMUTE':
        return t(locale, 'enemies.wintermute.name');
      default:
        return enemy.name;
    }
  };

  const getIntentDisplay = () => {
    const { intent } = enemy;
    switch (intent.type) {
      case 'ATTACK':
        return (
          <div className="flex items-center space-x-1 px-3 py-1 bg-rose-950/90 border border-rose-500/90 rounded-full text-rose-300 font-mono font-bold text-xs box-glow-crimson animate-bounce">
            <Swords className="w-3.5 h-3.5 text-rose-400" />
            <span>{intent.value}</span>
            <span className="text-[9px] uppercase font-normal ml-1">DMG</span>
          </div>
        );
      case 'DEFEND':
        return (
          <div className="flex items-center space-x-1 px-3 py-1 bg-cyan-950/90 border border-cyan-500/90 rounded-full text-cyan-300 font-mono font-bold text-xs box-glow-cyan">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>+{intent.value}</span>
            <span className="text-[9px] uppercase font-normal ml-1">{t(locale, 'combat.defense')}</span>
          </div>
        );
      case 'BUFF':
        return (
          <div className="flex items-center space-x-1 px-3 py-1 bg-amber-950/90 border border-amber-500/90 rounded-full text-amber-300 font-mono font-bold text-xs box-glow-amber">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] uppercase font-bold">BUFF</span>
          </div>
        );
    }
  };

  const theme = getArchetypeTheme();
  const hpPercent = Math.max(0, Math.min(100, (enemy.hp / enemy.maxHp) * 100));

  return (
    <div className={`flex flex-col items-center justify-center ${mobileViewMode ? 'p-1' : 'p-2'} select-none relative`}>
      {/* Intent Balloon Floating Above Construct with Telemetry Anchor */}
      <div className={`${mobileViewMode ? 'mb-1' : 'mb-2'} flex flex-col items-center`}>
        <div className="flex items-center space-x-1 text-[9px] sm:text-[10px] font-mono text-slate-400 tracking-wider mb-0.5">
          <Crosshair className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-400 animate-spin-slow" />
          <span>{t(locale, 'combat.targetHostile')}:</span>
        </div>
        <SysAssistAnchor id="enemy_intent" position="top">
          {getIntentDisplay()}
        </SysAssistAnchor>
        <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 mt-0.5 max-w-xs text-center truncate">
          {enemy.intent.description}
        </span>
      </div>

      {/* Main Construct Telemetry Viewport Chassis */}
      <div
        className={`
          ${mobileViewMode ? 'w-32 h-32' : 'w-44 h-44 md:w-52 md:h-52'} rounded-lg border-2
          ${isElite ? 'elite-breach-glow border-amber-500' : isBoss ? 'boss-threat-glow border-rose-500' : theme.border}
          bg-[#060a0f] flex flex-col items-center justify-center relative overflow-hidden group ${theme.glow}
        `}
      >
        {/* Background Cyber Grid */}
        <div className="absolute inset-0 matrix-grid opacity-25"></div>

        {/* Tactical Scanlines */}
        <div className="absolute inset-0 enemy-scanlines pointer-events-none opacity-40 z-20"></div>

        {/* Cyberdeck Corner Brackets */}
        <div className={`absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 ${theme.corner} z-20`}></div>
        <div className={`absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 ${theme.corner} z-20`}></div>
        <div className={`absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 ${theme.corner} z-20`}></div>
        <div className={`absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 ${theme.corner} z-20`}></div>

        {/* Top Viewport Telemetry Header */}
        <div className="absolute top-1.5 left-2 right-2 flex justify-between items-center z-20 text-[8px] font-mono tracking-widest text-slate-400 uppercase">
          <span className="flex items-center space-x-1">
            <Radio className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
            <span>SEC_LVL.{enemy.depth || 1}</span>
          </span>
          <span className={theme.accent}>
            {isBoss ? 'GOD-CONSTRUCT' : isElite ? 'APEX-ICE' : 'HOSTILE-ICE'}
          </span>
        </div>

        {/* Dedicated High-Definition Artwork or Graceful Fallback */}
        <div className="relative w-full h-full flex items-center justify-center p-2 z-10">
          {!imageFailed ? (
            <img
              src={`/assets/enemies/${getArtworkFilename()}`}
              alt={enemy.name}
              onError={() => setImageFailed(true)}
              className="w-full h-full object-cover rounded filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-300"
              loading="eager"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-950/80 rounded border border-slate-800">
              <div className="transform group-hover:scale-110 transition-transform duration-200">
                {getArchetypeFallbackIcon()}
              </div>
            </div>
          )}
        </div>

        {/* Passive Shield Indicator */}
        {enemy.block > 0 && (
          <div className="absolute top-2 right-2 z-30 flex items-center space-x-1 bg-cyan-950/90 border border-cyan-400 px-2 py-0.5 rounded text-cyan-300 text-xs font-mono font-bold shadow-[0_0_8px_rgba(0,229,255,0.4)]">
            <Shield className="w-3.5 h-3.5 text-cyan-300" />
            <span>{enemy.block}</span>
          </div>
        )}

        {/* Affixes Tags Badge Overlay */}
        {enemy.affixes.length > 0 && (
          <div className="absolute bottom-2 left-2 right-2 z-30 flex flex-wrap gap-1 justify-center pointer-events-none">
            {enemy.affixes.map((affix) => (
              <span
                key={affix}
                className="text-[9px] font-mono bg-slate-950/90 border border-amber-500/80 text-amber-300 px-1.5 py-0.5 rounded flex items-center space-x-1 shadow-sm backdrop-blur-xs font-bold"
              >
                <AlertTriangle className="w-2.5 h-2.5 text-amber-400" />
                <span>{affix}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Construct Title & Classification */}
      <div className={`${mobileViewMode ? 'mt-1.5' : 'mt-2.5'} text-center`}>
        <div className={`${mobileViewMode ? 'text-xs' : 'text-sm'} font-mono font-bold text-slate-100 glow-cyan tracking-wide`}>
          {getLocalizedEnemyName()}
        </div>
        <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 flex items-center justify-center space-x-1 mt-0.5">
          <span className="text-slate-500">[</span>
          <span className={theme.accent}>{enemy.archetype}</span>
          <span className="text-slate-500">]</span>
        </div>
      </div>

      {/* HP Bar */}
      <div className={`${mobileViewMode ? 'w-40 mt-1' : 'w-48 md:w-56 mt-2'}`}>
        <div className="flex justify-between text-[10px] sm:text-[11px] font-mono text-slate-300 mb-0.5">
          <span className="text-slate-400 text-[9px] uppercase">{t(locale, 'topbar.integrity')}</span>
          <span className="font-bold text-rose-400 text-[11px] font-mono">{enemy.hp} / {enemy.maxHp}</span>
        </div>
        <div className="w-full h-2 bg-slate-950 rounded-full border border-slate-700/80 overflow-hidden p-0.5 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-rose-700 via-rose-500 to-rose-400 rounded-full transition-all duration-300"
            style={{ width: `${hpPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Status Effects List */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2 max-w-xs">
        {Object.entries(enemy.statusEffects).map(([key, val]) => (
          <span
            key={key}
            className="text-[10px] font-mono px-2 py-0.5 rounded border border-purple-600/80 bg-purple-950/80 text-purple-200 uppercase font-bold shadow-[0_0_6px_rgba(168,85,247,0.3)]"
          >
            {key}: {val}
          </span>
        ))}
      </div>
    </div>
  );
};
