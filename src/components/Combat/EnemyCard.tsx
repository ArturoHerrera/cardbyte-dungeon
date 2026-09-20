import React from 'react';
import { Enemy } from '../../types/cardbyte';
import { Shield, Swords, Zap, Bug, Server, Flame, Skull, AlertTriangle } from 'lucide-react';
import { useCardByteStore } from '../../store/cardByteStore';
import { SysAssistAnchor } from '../Tutorial/SysAssistAnchor';
import { t } from '../../locales';


interface EnemyCardProps {
  enemy: Enemy;
}

export const EnemyCard: React.FC<EnemyCardProps> = ({ enemy }) => {
  const { locale } = useCardByteStore();

  const getArchetypeIcon = () => {
    switch (enemy.archetype) {
      case 'BIT_BUG':
        return <Bug className="w-10 h-10 text-emerald-400" />;
      case 'MEMORY_BRUTE':
        return <Server className="w-10 h-10 text-rose-500" />;
      case 'DAEMON_CULTIST':
        return <Flame className="w-10 h-10 text-purple-400" />;
      case 'WINTERMUTE':
        return <Skull className="w-14 h-14 text-rose-500 animate-pulse glow-crimson" />;
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
          <div className="flex items-center space-x-1 px-2.5 py-1 bg-rose-950/80 border border-rose-500/80 rounded-full text-rose-300 font-mono font-bold text-xs box-glow-crimson animate-bounce">
            <Swords className="w-3.5 h-3.5 text-rose-400" />
            <span>{intent.value}</span>
            <span className="text-[9px] uppercase font-normal ml-1">DMG</span>
          </div>
        );
      case 'DEFEND':
        return (
          <div className="flex items-center space-x-1 px-2.5 py-1 bg-cyan-950/80 border border-cyan-500/80 rounded-full text-cyan-300 font-mono font-bold text-xs box-glow-cyan">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>+{intent.value}</span>
            <span className="text-[9px] uppercase font-normal ml-1">{t(locale, 'combat.defense')}</span>
          </div>
        );
      case 'BUFF':
        return (
          <div className="flex items-center space-x-1 px-2.5 py-1 bg-amber-950/80 border border-amber-500/80 rounded-full text-amber-300 font-mono font-bold text-xs box-glow-amber">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] uppercase font-bold">BUFF</span>
          </div>
        );
    }
  };

  const hpPercent = Math.max(0, Math.min(100, (enemy.hp / enemy.maxHp) * 100));

  return (
    <div className="flex flex-col items-center justify-center p-4 select-none relative">
      {/* Intent Balloon Floating Above Construct */}
      <div className="mb-3 flex flex-col items-center">
        <span className="text-[10px] font-mono text-slate-400 tracking-wider mb-0.5">
          {t(locale, 'combat.targetHostile')}:
        </span>
        <SysAssistAnchor id="enemy_intent" position="top">
          {getIntentDisplay()}
        </SysAssistAnchor>
        <span className="text-[10px] font-mono text-slate-400 mt-1 max-w-xs text-center truncate">
          {enemy.intent.description}
        </span>
      </div>


      {/* Main Construct Avatar Frame */}
      <div className="w-48 h-48 rounded-xl border-2 border-slate-700 bg-gradient-to-b from-[#0c1218] to-[#05080b] flex flex-col items-center justify-center relative overflow-hidden box-glow-crimson group">
        <div className="absolute inset-0 matrix-grid opacity-20"></div>

        {/* Construct Visual Asset */}
        <div className="z-10 transform transition-transform group-hover:scale-110 duration-200">
          {getArchetypeIcon()}
        </div>

        {/* Passive Shield Indicator */}
        {enemy.block > 0 && (
          <div className="absolute top-2 right-2 flex items-center space-x-1 bg-cyan-950/90 border border-cyan-500 px-2 py-0.5 rounded text-cyan-300 text-xs font-mono font-bold">
            <Shield className="w-3 h-3 text-cyan-400" />
            <span>{enemy.block}</span>
          </div>
        )}

        {/* Affixes Tags */}
        <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1 justify-center">
          {enemy.affixes.map((affix) => (
            <span
              key={affix}
              className="text-[9px] font-mono bg-slate-900 border border-slate-700 text-slate-300 px-1.5 py-0.2 rounded flex items-center space-x-0.5"
            >
              <AlertTriangle className="w-2 h-2 text-amber-400" />
              <span>{affix}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Construct Title & Classification */}
      <div className="mt-3 text-center">
        <div className="text-sm font-mono font-bold text-slate-100 glow-cyan">
          {getLocalizedEnemyName()}
        </div>
        <div className="text-[10px] font-mono text-slate-400">
          [{enemy.archetype}]
        </div>
      </div>

      {/* HP Bar */}
      <div className="w-48 mt-2">
        <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
          <span>{t(locale, 'topbar.integrity')}</span>
          <span className="font-bold text-rose-400">{enemy.hp} / {enemy.maxHp}</span>
        </div>
        <div className="w-full h-2.5 bg-slate-900 rounded-full border border-slate-700 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-300"
            style={{ width: `${hpPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Status Effects List */}
      <div className="flex items-center space-x-2 mt-2">
        {Object.entries(enemy.statusEffects).map(([key, val]) => (
          <span
            key={key}
            className="text-[10px] font-mono px-2 py-0.5 rounded border border-purple-800 bg-purple-950/60 text-purple-300 uppercase font-bold"
          >
            {key}: {val}
          </span>
        ))}
      </div>
    </div>
  );
};
