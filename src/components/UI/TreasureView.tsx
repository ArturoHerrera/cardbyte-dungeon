import React, { useMemo } from 'react';
import { useCardByteStore } from '../../store/cardByteStore';
import { CardView } from '../Combat/CardView';
import { generateDraftChoices } from '../../engine/cardCatalog';
import { createPRNG } from '../../engine/random';
import { Flame, ArrowRight } from 'lucide-react';
import { Card } from '../../types/cardbyte';
import { t } from '../../locales';

export const TreasureView: React.FC = () => {
  const { locale, seed, currentNode, addCardToMasterDeck, completeNonCombatNode } = useCardByteStore();

  const choices = useMemo(() => {
    const prng = createPRNG(seed + (currentNode?.depth || 0) * 317 + 99);
    return generateDraftChoices(prng, 'TREASURE');
  }, [seed, currentNode]);

  const handleSelectCard = (card: Card) => {
    addCardToMasterDeck(card);
    completeNonCombatNode();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 select-none relative">
      <div className="max-w-3xl w-full text-center p-6 bg-[#0c1218]/95 border border-purple-800/80 rounded-xl box-glow-amber">
        <div className="flex items-center justify-center space-x-2 text-purple-400 font-mono text-sm uppercase tracking-widest mb-1">
          <Flame className="w-4 h-4 text-purple-400" />
          <span>{t(locale, 'treasure.title')}</span>
        </div>
        <h2 className="text-xl font-bold font-mono text-slate-100 mb-6">
          {t(locale, 'treasure.subtitle')}
        </h2>

        {/* 3 Rare Choices Grid */}
        <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
          {choices.map((card) => (
            <CardView
              key={card.id}
              card={card}
              canAfford={true}
              onPlay={() => handleSelectCard(card)}
            />
          ))}
        </div>

        {/* Skip Action */}
        <button
          onClick={() => completeNonCombatNode()}
          className="flex items-center space-x-2 mx-auto px-6 py-2 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-slate-200 rounded font-mono text-xs uppercase tracking-wider transition-colors"
        >
          <span>{t(locale, 'treasure.purgeAndLeave')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
