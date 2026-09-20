import React from 'react';
import { Card } from '../../types/cardbyte';
import { Swords, Shield, Zap, Cpu } from 'lucide-react';
import { useCardByteStore } from '../../store/cardByteStore';
import { t } from '../../locales';

interface CardViewProps {
  card: Card;
  disabled?: boolean;
  canAfford?: boolean;
  onPlay?: (cardId: string) => void;
  scale?: 'normal' | 'compact';
}

export const CardView: React.FC<CardViewProps> = ({
  card,
  disabled = false,
  canAfford = true,
  onPlay,
  scale = 'normal',
}) => {
  const { locale } = useCardByteStore();
  const isPlayable = !disabled && canAfford;

  // Resolve localized card key
  const baseKey = card.id.startsWith('starter_strike')
    ? 'starter_strike'
    : card.id.startsWith('starter_defend')
    ? 'starter_defend'
    : card.id.startsWith('starter_bash')
    ? 'starter_bash'
    : card.name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+$/, '');

  const localizedName = t(locale, `cards.${baseKey}.name`);
  const displayName = localizedName !== `cards.${baseKey}.name` 
    ? (card.upgraded ? `${localizedName}+` : localizedName)
    : card.name;

  const dmgVal = card.actions.find(a => a.type === 'DAMAGE')?.value || 6;
  const blockVal = card.actions.find(a => a.type === 'BLOCK')?.value || 5;
  const vulnVal = card.actions.find(a => a.status === 'VULNERABLE')?.value || 2;
  const weakVal = card.actions.find(a => a.status === 'WEAK')?.value || 2;
  const poisonVal = card.actions.find(a => a.status === 'POISON')?.value || 4;

  const localizedDesc = t(locale, `cards.${baseKey}.desc`, {
    val: dmgVal || blockVal,
    dmg: dmgVal,
    block: blockVal,
    vuln: vulnVal,
    weak: weakVal,
    poison: poisonVal,
    ram: 1,
    draw: 1,
    heat: 2,
  });

  const displayDesc = localizedDesc !== `cards.${baseKey}.desc`
    ? (card.upgraded ? `[+] ${localizedDesc}` : localizedDesc)
    : card.description;

  const getTypeTheme = () => {
    switch (card.type) {
      case 'ATTACK':
        return {
          border: 'border-rose-700/80 hover:border-rose-400',
          bg: 'from-rose-950/40 to-[#0c1218]',
          costBg: 'bg-rose-900 border-rose-500 text-rose-200',
          glow: 'hover:box-glow-crimson',
          icon: <Swords className="w-5 h-5 text-rose-400" />,
        };
      case 'DEFEND':
        return {
          border: 'border-cyan-700/80 hover:border-cyan-400',
          bg: 'from-cyan-950/40 to-[#0c1218]',
          costBg: 'bg-cyan-900 border-cyan-500 text-cyan-200',
          glow: 'hover:box-glow-cyan',
          icon: <Shield className="w-5 h-5 text-cyan-400" />,
        };
      case 'SKILL':
        return {
          border: 'border-amber-700/80 hover:border-amber-400',
          bg: 'from-amber-950/40 to-[#0c1218]',
          costBg: 'bg-amber-900 border-amber-500 text-amber-200',
          glow: 'hover:box-glow-amber',
          icon: <Zap className="w-5 h-5 text-amber-400" />,
        };
    }
  };

  const theme = getTypeTheme();
  const widthClass = scale === 'compact' ? 'w-36 h-48' : 'w-44 h-60';

  return (
    <div
      onClick={() => isPlayable && onPlay && onPlay(card.id)}
      className={`
        ${widthClass} rounded-lg border-2 p-2.5 flex flex-col justify-between select-none
        bg-gradient-to-b ${theme.bg} ${theme.border} ${theme.glow}
        transition-all duration-200 relative group
        ${isPlayable ? 'cursor-pointer hover:-translate-y-2 hover:scale-[1.03] z-10' : 'opacity-50 grayscale cursor-not-allowed'}
      `}
    >
      {/* Top Header: Cost Orbe & Card Name */}
      <div className="flex items-center justify-between w-full">
        <div className={`w-7 h-7 rounded-full border flex items-center justify-center font-bold text-xs shadow-md ${theme.costBg}`}>
          {card.cost}
        </div>
        <div className="text-right flex-1 pl-1">
          <div className="text-[11px] font-mono font-bold text-slate-100 truncate tracking-tight">
            {displayName}
          </div>
          <div className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter">
            {card.type}
          </div>
        </div>
      </div>

      {/* Central Cybernetic Graphic Container */}
      <div className="w-full flex-1 my-2 bg-[#05080b]/80 border border-slate-800 rounded flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 matrix-grid"></div>
        {theme.icon}
        {card.upgraded && (
          <span className="absolute top-1 right-1 text-[8px] font-mono font-bold text-[#00ff66] bg-[#00ff66]/20 px-1 rounded border border-[#00ff66]/40">
            UPG+
          </span>
        )}
      </div>

      {/* Card Description */}
      <div className="text-[11px] font-mono text-slate-200 leading-snug bg-[#070b0e]/90 p-2 rounded border border-slate-800/80 min-h-[52px] flex items-center">
        {displayDesc}
      </div>

      {/* Action Indicators */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[9px] font-mono text-slate-400">
        <span className="flex items-center space-x-0.5">
          <Cpu className="w-2.5 h-2.5 text-slate-500" />
          <span>RAM {card.cost}</span>
        </span>
        {card.rarity && (
          <span className={card.rarity === 'RARE' ? 'text-amber-400 font-bold' : 'text-slate-500'}>
            {card.rarity}
          </span>
        )}
      </div>
    </div>
  );
};
