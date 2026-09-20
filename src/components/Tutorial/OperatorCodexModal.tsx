import React, { useState } from 'react';
import { useCardByteStore } from '../../store/cardByteStore';
import { CODEX_CATEGORIES, CODEX_ENTRIES, CodexCategory } from '../../data/codexData';
import { BookOpen, X, ChevronRight, Terminal, Shield, Zap, Globe, Cpu } from 'lucide-react';
import { t } from '../../locales';

export const OperatorCodexModal: React.FC = () => {
  const { locale, activeModal, closeModal } = useCardByteStore();
  const [selectedCategory, setSelectedCategory] = useState<CodexCategory>('basics');
  const [activeEntryId, setActiveEntryId] = useState<string>('deck_ram');

  if (activeModal !== 'CODEX') return null;

  const currentEntries = CODEX_ENTRIES.filter((e) => e.category === selectedCategory);
  const activeEntry = CODEX_ENTRIES.find((e) => e.id === activeEntryId) || currentEntries[0];

  const getCategoryIcon = (category: CodexCategory) => {
    switch (category) {
      case 'basics':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'combat':
        return <Shield className="w-4 h-4 text-cyan-400" />;
      case 'status':
        return <Cpu className="w-4 h-4 text-rose-400" />;
      case 'matrix':
        return <Globe className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="max-w-4xl w-full max-h-[88vh] bg-[#070d14] border-2 border-cyan-500/80 rounded-xl flex flex-col font-mono text-slate-200 shadow-[0_0_35px_rgba(6,182,212,0.25)] relative overflow-hidden">
        {/* Header Ribbon */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-950 bg-[#0a1420]/80">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan-950/60 border border-cyan-500/40 rounded">
              <BookOpen className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-cyan-400 font-bold tracking-wider text-base sm:text-lg flex items-center gap-2">
                <span>{t(locale, 'codex.title')}</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded">
                  v4.02
                </span>
              </h2>
              <p className="text-[11px] text-slate-400 tracking-tight">
                {t(locale, 'codex.subtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            aria-label={t(locale, 'common.close')}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Navigation Bar */}
        <div className="flex border-b border-cyan-950/80 bg-[#050a10] px-4 gap-2 overflow-x-auto scrollbar-none">
          {CODEX_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const firstOfCat = CODEX_ENTRIES.find((e) => e.category === cat.id);
                  if (firstOfCat) setActiveEntryId(firstOfCat.id);
                }}
                className={`flex items-center gap-2 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{t(locale, cat.nameKey)}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body: Sidebar List + Detail Panel */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[360px]">
          {/* Topics List */}
          <div className="w-full md:w-72 border-r border-cyan-950/80 bg-[#05090f]/70 overflow-y-auto p-3 space-y-1.5">
            <div className="text-[10px] font-bold text-slate-500 uppercase px-2 py-1 tracking-widest">
              // INDEX_LIST
            </div>
            {currentEntries.map((entry) => {
              const isSelected = activeEntry?.id === entry.id;
              return (
                <button
                  key={entry.id}
                  onClick={() => setActiveEntryId(entry.id)}
                  className={`w-full text-left p-2.5 rounded text-xs flex items-center justify-between border transition-all ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-200 font-bold shadow-sm'
                      : 'bg-[#09101a]/50 border-cyan-950/40 text-slate-300 hover:border-cyan-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-sm shrink-0">{entry.icon}</span>
                    <span className="truncate">{t(locale, entry.titleKey)}</span>
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isSelected ? 'text-cyan-400' : 'text-slate-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active Topic Details View */}
          <div className="flex-1 p-6 overflow-y-auto bg-[#070e17]/90 flex flex-col justify-between">
            {activeEntry ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-cyan-900/40">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 bg-cyan-950/40 border border-cyan-800/40 rounded-lg">
                      {activeEntry.icon}
                    </span>
                    <div>
                      <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50">
                        {activeEntry.tag}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                        {t(locale, activeEntry.titleKey)}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="bg-[#050a12] border border-cyan-950 p-4 rounded-lg text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
                  <p>{t(locale, activeEntry.descKey)}</p>
                </div>

                {/* Subsystem Telemetry Badge */}
                <div className="p-3 bg-[#0a1420]/50 border border-cyan-900/30 rounded flex items-center gap-2 text-[11px] text-cyan-300/80">
                  <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    SYSTEM STATUS: ARCHIVAL DATA VERIFIED // ONO-SENDAI KERNEL APPROVED
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500 text-xs">
                SELECT A PROTOCOL FROM THE LIST
              </div>
            )}

            {/* Modal Bottom Footer */}
            <div className="pt-4 mt-6 border-t border-cyan-950/60 flex items-center justify-between text-[11px] text-slate-500">
              <span>ESC / [X] TO CLOSE</span>
              <button
                onClick={closeModal}
                className="px-4 py-1.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/60 rounded text-xs font-semibold tracking-wider transition-colors"
              >
                {t(locale, 'common.close')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
