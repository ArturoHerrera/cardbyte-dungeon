import React from 'react';
import { useCardByteStore } from '../../store/cardByteStore';
import { CardView } from '../Combat/CardView';
import { Database, X } from 'lucide-react';
import { t } from '../../locales';

export const DeckViewModal: React.FC = () => {
  const { locale, activeModal, closeModal, masterDeck } = useCardByteStore();

  if (activeModal !== 'DECK_VIEW') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="max-w-4xl w-full max-h-[85vh] bg-[#0c1218] border-2 border-cyan-800 rounded-xl p-6 relative font-mono text-slate-200 box-glow-cyan flex flex-col">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-[#00e5ff] font-bold mb-1">
          <Database className="w-5 h-5" />
          <span>{t(locale, 'modals.deckView.title')} ({masterDeck.length})</span>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          {t(locale, 'modals.deckView.subtitle')}
        </p>

        {/* Cards Grid */}
        <div className="flex-1 overflow-y-auto flex flex-wrap gap-4 items-center justify-center p-2">
          {masterDeck.map((card) => (
            <CardView key={card.id} card={card} scale="compact" />
          ))}
        </div>
      </div>
    </div>
  );
};
