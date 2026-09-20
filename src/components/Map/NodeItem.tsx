import React from 'react';
import { MapNode } from '../../types/cardbyte';
import { Skull, Swords, ShieldAlert, HeartPulse, Flame, Lock } from 'lucide-react';
import { useCardByteStore } from '../../store/cardByteStore';
import { t } from '../../locales';

interface NodeItemProps {
  node: MapNode;
  isAccessible: boolean;
  isCurrent: boolean;
  onSelect: (nodeId: string) => void;
}

export const NodeItem: React.FC<NodeItemProps> = ({
  node,
  isAccessible,
  isCurrent,
  onSelect,
}) => {
  const getNodeIcon = () => {
    if (!node.revealed) {
      return <Lock className="w-4 h-4 text-slate-500 animate-pulse" />;
    }

    switch (node.type) {
      case 'COMBAT':
        return <Swords className="w-4 h-4 text-cyan-400" />;
      case 'ELITE':
        return <ShieldAlert className="w-4 h-4 text-amber-400" />;
      case 'REST':
        return <HeartPulse className="w-4 h-4 text-emerald-400" />;
      case 'TREASURE':
        return <Flame className="w-4 h-4 text-purple-400" />;
      case 'BOSS':
        return <Skull className="w-5 h-5 text-rose-500 animate-pulse" />;
    }
  };

  const { locale } = useCardByteStore();

  const getLabel = () => {
    if (!node.revealed) {
      // Scrambled hex value
      return `0x${((node.depth * 37 + node.index * 13) % 256).toString(16).padStart(2, '0').toUpperCase()}`;
    }
    switch (node.type) {
      case 'COMBAT':
        return t(locale, 'map.nodeCombat');
      case 'ELITE':
        return t(locale, 'map.nodeElite');
      case 'REST':
        return t(locale, 'map.nodeRest');
      case 'TREASURE':
        return t(locale, 'map.nodeTreasure');
      case 'BOSS':
        return t(locale, 'map.nodeBoss');
    }
  };

  let borderStyle = 'border-slate-800 bg-[#080d12] text-slate-500';
  if (isCurrent) {
    borderStyle = 'border-[#00ff66] bg-[#00ff66]/10 text-[#00ff66] box-glow-green ring-2 ring-[#00ff66]/40';
  } else if (isAccessible) {
    borderStyle = 'border-cyan-400 bg-cyan-950/40 text-cyan-300 hover:box-glow-cyan hover:scale-110 cursor-pointer animate-pulse';
  } else if (node.completed) {
    borderStyle = 'border-slate-700 bg-slate-900/40 text-slate-600 opacity-60';
  }

  return (
    <div className="flex flex-col items-center justify-center m-2 relative">
      <button
        id={`node-${node.id}`}
        disabled={!isAccessible}
        onClick={() => onSelect(node.id)}
        className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-200 z-10 ${borderStyle}`}
        title={`${node.revealed ? node.type : 'Encrypted Node'} (Layer ${node.depth})`}
      >
        {getNodeIcon()}
      </button>

      <span className="text-[10px] font-mono mt-1 text-slate-400 tracking-tighter uppercase">
        {getLabel()}
      </span>
    </div>
  );
};
