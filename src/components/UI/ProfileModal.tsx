import React from 'react';
import { useCardByteStore } from '../../store/cardByteStore';
import { BarChart3, Trophy, Skull, Activity, X } from 'lucide-react';
import { t } from '../../locales';

export const ProfileModal: React.FC = () => {
  const { locale, activeModal, closeModal, profile } = useCardByteStore();

  if (activeModal !== 'PROFILE') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="max-w-lg w-full bg-[#0c1218] border-2 border-cyan-800 rounded-xl p-6 relative font-mono text-slate-200 box-glow-cyan flex flex-col">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-cyan-400 font-bold mb-1">
          <BarChart3 className="w-5 h-5" />
          <span>{t(locale, 'modals.profile.title')}</span>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          {t(locale, 'modals.profile.alias')} // {t(locale, 'modals.profile.systemSignature')}
        </p>

        {/* High-level stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-[#070b0e] border border-slate-800 p-3 rounded text-center">
            <Activity className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-slate-100">{profile.totalRuns}</div>
            <div className="text-[10px] text-slate-400 uppercase">{t(locale, 'modals.profile.totalRuns')}</div>
          </div>
          <div className="bg-[#070b0e] border border-slate-800 p-3 rounded text-center">
            <Trophy className="w-4 h-4 text-[#00ff66] mx-auto mb-1" />
            <div className="text-lg font-bold text-[#00ff66]">{profile.victories}</div>
            <div className="text-[10px] text-slate-400 uppercase">{t(locale, 'modals.profile.victories')}</div>
          </div>
          <div className="bg-[#070b0e] border border-slate-800 p-3 rounded text-center">
            <Skull className="w-4 h-4 text-rose-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-rose-400">{profile.flatlines}</div>
            <div className="text-[10px] text-slate-400 uppercase">{t(locale, 'modals.profile.flatlines')}</div>
          </div>
        </div>

        {/* Run history list */}
        <div className="border-t border-slate-800 pt-4">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">
            RECENT RUN LOGS:
          </span>
          <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
            {profile.history.length === 0 ? (
              <p className="text-xs text-slate-600 italic">No previous incursions logged.</p>
            ) : (
              profile.history.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-[11px] bg-[#070b0e] border border-slate-850 p-2 rounded"
                >
                  <div className="flex items-center space-x-2">
                    <span
                      className={`font-bold ${
                        h.result === 'VICTORY' ? 'text-[#00ff66]' : 'text-rose-500'
                      }`}
                    >
                      [{h.result}]
                    </span>
                    <span className="text-slate-400">LAYER {h.floorReached}/7</span>
                  </div>
                  <div className="text-slate-500">
                    0x{h.seed.toString(16).toUpperCase()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
