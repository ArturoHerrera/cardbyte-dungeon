import React, { useMemo } from 'react';
import { useCardByteStore } from '../../store/cardByteStore';
import { CardView } from '../Combat/CardView';
import { generateDraftChoices } from '../../engine/cardCatalog';
import { createPRNG } from '../../engine/random';
import { audioManager } from '../../audio/audioManager';
import { Database, ArrowRight } from 'lucide-react';
import { Card } from '../../types/cardbyte';
import { t } from '../../locales';

export const CardRewardView: React.FC = () => {
  const { locale, seed, currentNode, addCardToMasterDeck, setScreen, mobileViewMode } = useCardByteStore();

  const choices = useMemo(() => {
    const tier = currentNode?.type === 'ELITE' ? 'ELITE' : 'STANDARD';
    const prng = createPRNG(seed + (currentNode?.depth || 0) * 113);
    return generateDraftChoices(prng, tier);
  }, [seed, currentNode]);

  const handleSelectCard = (card: Card) => {
    audioManager.playSfx('CARD_INJECT');
    addCardToMasterDeck(card);
    setScreen('MAP');
  };

  const handleSkip = () => {
    audioManager.playSfx('UI_CLICK');
    setScreen('MAP');
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-3 sm:p-6 overflow-y-auto select-none relative">
      <div className="max-w-3xl w-full text-center p-3 sm:p-6 bg-[#0c1218]/95 border border-cyan-800/80 rounded-xl box-glow-cyan flex flex-col justify-between my-auto shadow-2xl">
        <div>
          <div className="flex items-center justify-center space-x-2 text-cyan-400 font-mono text-xs sm:text-sm uppercase tracking-widest mb-1">
            <Database className="w-4 h-4" />
            <span>{t(locale, 'rewards.cardRewardTitle')}</span>
          </div>
          <h2 className="text-base sm:text-xl font-bold font-mono text-slate-100 mb-3 sm:mb-6">
            {t(locale, 'rewards.cardRewardSubtitle')}
          </h2>
        </div>

        {/* 3 Choices Ribbon */}
        <div className="w-full flex items-center justify-start sm:justify-center gap-3 sm:gap-6 overflow-x-auto py-2 px-2 mb-4 sm:mb-8 snap-x snap-mandatory">
          {choices.map((card) => (
            <div key={card.id} className="snap-center shrink-0">
              <CardView
                card={card}
                canAfford={true}
                scale={mobileViewMode ? 'compact' : 'normal'}
                onPlay={() => handleSelectCard(card)}
              />
            </div>
          ))}
        </div>

        {/* Skip Action */}
        <div>
          <button
            onClick={handleSkip}
            className="flex items-center space-x-2 mx-auto px-6 py-2.5 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-slate-200 rounded font-mono text-xs uppercase tracking-wider transition-colors active:scale-95"
          >
            <span>{t(locale, 'rewards.skipReward')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
