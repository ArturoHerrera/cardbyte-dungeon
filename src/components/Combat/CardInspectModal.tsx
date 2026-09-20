import React from 'react';
import { useCardByteStore } from '../../store/cardByteStore';
import { Card } from '../../types/cardbyte';
import { X, Zap, Swords, Shield, AlertTriangle, Sparkles, Target } from 'lucide-react';
import { t } from '../../locales';

export const CardInspectModal: React.FC = () => {
  const { locale, activeModal, inspectedCard, closeModal, playCard, playerEnergy, turnPhase } = useCardByteStore();

  if (activeModal !== 'CARD_INSPECT' || !inspectedCard) return null;

  const card: Card = inspectedCard;
  const isPlayable = turnPhase === 'PLAYER' && card.cost <= playerEnergy;

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

  const dmgVal = card.actions.find(a => a.type === 'DAMAGE')?.value;
  const blockVal = card.actions.find(a => a.type === 'BLOCK')?.value;
  const vulnVal = card.actions.find(a => a.status === 'VULNERABLE')?.value;
  const weakVal = card.actions.find(a => a.status === 'WEAK')?.value;
  const poisonVal = card.actions.find(a => a.status === 'POISON')?.value;
  const energyVal = card.actions.find(a => a.type === 'GAIN_ENERGY')?.value;

  const localizedDesc = t(locale, `cards.${baseKey}.desc`, {
    val: dmgVal || blockVal || 6,
    dmg: dmgVal || 6,
    block: blockVal || 5,
    vuln: vulnVal || 2,
    weak: weakVal || 2,
    poison: poisonVal || 4,
    ram: energyVal || 1,
    draw: 1,
    heat: 2,
  });

  const displayDesc = localizedDesc !== `cards.${baseKey}.desc`
    ? (card.upgraded ? `[+] ${localizedDesc}` : localizedDesc)
    : card.description;

  const getArtworkFilename = (): string => {
    if (baseKey.startsWith('starter_strike') || card.name.toLowerCase().includes('spike')) return 'logic_spike.webp';
    if (baseKey.startsWith('starter_defend') || card.name.toLowerCase().includes('buffer')) return 'ice_buffer.webp';
    if (baseKey.startsWith('starter_bash') || card.name.toLowerCase().includes('breaker')) return 'ice_breaker.webp';
    if (card.name.toLowerCase().includes('worm')) return 'logic_worm.webp';
    if (card.name.toLowerCase().includes('jam')) return 'packet_jam.webp';
    if (card.name.toLowerCase().includes('overclock')) return 'overclock.webp';
    if (card.name.toLowerCase().includes('purge')) return 'system_purge.webp';
    if (card.name.toLowerCase().includes('brute')) return 'bruteforce.webp';
    if (card.name.toLowerCase().includes('execute')) return 'execute.webp';
    if (card.name.toLowerCase().includes('toxin')) return 'neuro_toxin.webp';
    if (card.name.toLowerCase().includes('aura')) return 'firewall_aura.webp';
    return card.type === 'ATTACK' ? 'logic_spike.webp' : card.type === 'DEFEND' ? 'ice_buffer.webp' : 'overclock.webp';
  };

  const handleExecute = () => {
    closeModal();
    playCard(card.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-sm bg-[#080d12] border-2 border-cyan-500/80 rounded-2xl shadow-[0_0_40px_rgba(0,229,255,0.3)] p-5 flex flex-col items-center relative select-none font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-[#0c1218] border border-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Subroutine Header */}
        <div className="w-full flex items-center justify-between border-b border-[#1e2c38] pb-3 mb-3">
          <div className="flex items-center space-x-2">
            <div className="px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-400 text-cyan-200 font-black text-sm flex items-center space-x-1">
              <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400 animate-pulse" />
              <span>{card.cost} RAM</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded uppercase tracking-wider bg-slate-800 text-slate-300 font-bold">
              {card.type}
            </span>
          </div>
          {card.upgraded && (
            <span className="text-amber-400 text-xs font-black tracking-widest flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OVERCLOCKED</span>
            </span>
          )}
        </div>

        {/* Artwork Display */}
        <div className="w-48 h-48 rounded-xl overflow-hidden border-2 border-[#1e2c38] relative my-2 shadow-inner bg-[#030608]">
          <img
            src={`/assets/cards/${getArtworkFilename()}`}
            alt={displayName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080d12] via-transparent to-transparent"></div>
        </div>

        {/* Subroutine Identity */}
        <h3 className="text-lg font-black tracking-wider text-slate-100 uppercase mt-2 text-center">
          {displayName}
        </h3>

        {/* Description & Action Telemetry */}
        <div className="w-full bg-[#05080b] border border-slate-800/80 rounded-xl p-3 my-3 text-xs text-slate-300 leading-relaxed text-center">
          {displayDesc}
        </div>

        {/* Stats breakdown badge grid */}
        <div className="w-full grid grid-cols-2 gap-2 my-1 text-[11px]">
          {dmgVal && (
            <div className="flex items-center justify-center space-x-1.5 p-1.5 rounded bg-rose-950/40 border border-rose-900 text-rose-300">
              <Swords className="w-3.5 h-3.5" />
              <span>DMG: <strong>{dmgVal}</strong></span>
            </div>
          )}
          {blockVal && (
            <div className="flex items-center justify-center space-x-1.5 p-1.5 rounded bg-cyan-950/40 border border-cyan-900 text-cyan-300">
              <Shield className="w-3.5 h-3.5" />
              <span>SHIELD: <strong>{blockVal}</strong></span>
            </div>
          )}
          {vulnVal && (
            <div className="flex items-center justify-center space-x-1.5 p-1.5 rounded bg-amber-950/40 border border-amber-900 text-amber-300">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>VULNERABLE: <strong>+{vulnVal}</strong></span>
            </div>
          )}
          {poisonVal && (
            <div className="flex items-center justify-center space-x-1.5 p-1.5 rounded bg-emerald-950/40 border border-emerald-900 text-emerald-300">
              <Target className="w-3.5 h-3.5" />
              <span>CORROSION: <strong>{poisonVal}</strong></span>
            </div>
          )}
        </div>

        {/* In-Combat Direct Execution Button */}
        {turnPhase === 'PLAYER' && (
          <button
            onClick={handleExecute}
            disabled={!isPlayable}
            className={`
              w-full mt-3 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider
              flex items-center justify-center space-x-2 transition-all border
              ${
                isPlayable
                  ? 'bg-rose-900/90 border-rose-500 text-rose-100 hover:bg-rose-800 shadow-[0_0_15px_rgba(244,63,94,0.4)] cursor-pointer active:scale-98'
                  : 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed'
              }
            `}
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>{isPlayable ? 'EXECUTE SUBROUTINE' : 'INSUFFICIENT RAM'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
