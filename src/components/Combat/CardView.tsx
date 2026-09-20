import React from 'react';
import { Card } from '../../types/cardbyte';
import { Swords, Shield, Zap, Cpu, Target, ArrowDownCircle, Biohazard } from 'lucide-react';
import { useCardByteStore } from '../../store/cardByteStore';
import { audioManager } from '../../audio/audioManager';
import { t } from '../../locales';

interface CardViewProps {
  card: Card;
  disabled?: boolean;
  canAfford?: boolean;
  onPlay?: (cardId: string) => void;
  scale?: 'normal' | 'compact';
  isFocused?: boolean;
  onFocus?: (cardId: string) => void;
}

export const CardView: React.FC<CardViewProps> = ({
  card,
  disabled = false,
  canAfford = true,
  onPlay,
  scale = 'normal',
  isFocused = false,
  onFocus,
}) => {
  const { locale, mobileViewMode, openCardInspect } = useCardByteStore();
  const [imageFailed, setImageFailed] = React.useState(false);
  const isPlayable = !disabled && canAfford;

  // Touch gesture state refs
  const longPressTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartPosRef = React.useRef<{ x: number; y: number } | null>(null);
  const isLongPressTriggeredRef = React.useRef<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };
    isLongPressTriggeredRef.current = false;

    // Start 350ms long press inspection timer
    longPressTimerRef.current = setTimeout(() => {
      isLongPressTriggeredRef.current = true;
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try {
          navigator.vibrate(40);
        } catch {
          // ignore vibration errors
        }
      }
      openCardInspect(card);
    }, 350);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartPosRef.current || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - touchStartPosRef.current.x);
    const dy = Math.abs(touch.clientY - touchStartPosRef.current.y);
    // If movement > 10px, it is a scroll gesture: cancel long press
    if (dx > 10 || dy > 10) {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
    }
  };

  const handleTouchEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    if (isLongPressTriggeredRef.current) {
      return; // Already triggered modal
    }

    // In mobile mode: tap to focus or tap focused card to execute
    if (mobileViewMode) {
      if (isFocused) {
        if (isPlayable && onPlay) {
          onPlay(card.id);
        }
      } else {
        audioManager.playSfx('UI_CLICK');
        if (onFocus) {
          onFocus(card.id);
        }
      }
    }
  };

  const handleClick = () => {
    // Desktop click handling
    if (!mobileViewMode) {
      if (isPlayable && onPlay) {
        onPlay(card.id);
      }
    } else {
      // In mobile view (e.g. mouse test): focus then play
      if (isFocused) {
        if (isPlayable && onPlay) {
          onPlay(card.id);
        }
      } else {
        audioManager.playSfx('UI_CLICK');
        if (onFocus) {
          onFocus(card.id);
        }
      }
    }
  };

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

  // Artwork resolution
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
    return `${baseKey}.webp`;
  };

  const artworkSrc = `/assets/cards/${getArtworkFilename()}`;

  const getTypeTheme = () => {
    switch (card.type) {
      case 'ATTACK':
        return {
          border: 'border-rose-700/80 hover:border-rose-400',
          bg: 'from-rose-950/40 via-[#0a0f14] to-[#040608]',
          headerAccent: 'text-rose-400',
          ramBadge: 'bg-gradient-to-br from-rose-600 to-rose-950 border-rose-400 text-rose-100 shadow-[0_0_12px_rgba(244,63,94,0.6)]',
          glow: 'hover:box-glow-crimson',
          corner: 'border-rose-500',
          icon: <Swords className="w-5 h-5 text-rose-400" />,
        };
      case 'DEFEND':
        return {
          border: 'border-cyan-700/80 hover:border-cyan-400',
          bg: 'from-cyan-950/40 via-[#0a0f14] to-[#040608]',
          headerAccent: 'text-cyan-400',
          ramBadge: 'bg-gradient-to-br from-cyan-600 to-cyan-950 border-cyan-400 text-cyan-100 shadow-[0_0_12px_rgba(0,229,255,0.6)]',
          glow: 'hover:box-glow-cyan',
          corner: 'border-cyan-500',
          icon: <Shield className="w-5 h-5 text-cyan-400" />,
        };
      case 'SKILL':
        return {
          border: 'border-amber-700/80 hover:border-amber-400',
          bg: 'from-amber-950/40 via-[#0a0f14] to-[#040608]',
          headerAccent: 'text-amber-400',
          ramBadge: 'bg-gradient-to-br from-amber-600 to-amber-950 border-amber-400 text-amber-100 shadow-[0_0_12px_rgba(245,158,11,0.6)]',
          glow: 'hover:box-glow-amber',
          corner: 'border-amber-500',
          icon: <Zap className="w-5 h-5 text-amber-400" />,
        };
    }
  };

  const theme = getTypeTheme();
  const widthClass = scale === 'compact' ? 'w-36 h-[225px]' : 'w-44 h-[272px]';
  const isHolo = card.upgraded || card.rarity === 'RARE';

  return (
    <div
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onContextMenu={(e) => e.preventDefault()}
      className={`
        ${widthClass} rounded-xl border-2 p-2 flex flex-col justify-between select-none
        bg-gradient-to-b ${theme.bg} ${theme.border} ${theme.glow}
        transition-all duration-200 relative group
        ${isHolo ? 'holo-foil' : ''}
        ${isFocused ? '-translate-y-6 scale-[1.08] ring-2 ring-cyan-400 z-40 shadow-[0_0_25px_rgba(0,229,255,0.7)]' : ''}
        ${isPlayable ? 'cursor-pointer hover:-translate-y-2 hover:scale-[1.03] z-10' : 'opacity-50 grayscale cursor-not-allowed'}
      `}
    >
      {/* Inline Tap to Inject confirmation badge on focused card in mobile */}
      {mobileViewMode && isFocused && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-50 bg-rose-900 border border-rose-400 text-rose-100 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider animate-pulse shadow-lg pointer-events-none flex items-center space-x-1 whitespace-nowrap">
          <Zap className="w-2.5 h-2.5 fill-current text-rose-300" />
          <span>{isPlayable ? 'TAP TO INJECT' : 'NO RAM'}</span>
        </div>
      )}
      {/* Cyberdeck ROM Header: Neon RAM Badge & Subroutine Identity */}
      <div className="flex items-center justify-between w-full relative z-10 mb-1">
        {/* Prominent RAM Energy Cell Badge */}
        <div className={`flex items-center space-x-0.5 px-2 py-0.5 rounded-md border-2 font-mono font-black text-xs ${theme.ramBadge} tracking-tighter`}>
          <Zap className="w-3 h-3 fill-current animate-pulse" />
          <span>{card.cost}</span>
          <span className="text-[7px] font-normal uppercase opacity-80">RAM</span>
        </div>

        <div className="text-right flex-1 pl-2 truncate">
          <div className="text-[11px] font-mono font-bold text-slate-100 truncate tracking-tight">
            {displayName}
          </div>
          <div className={`text-[8px] font-mono uppercase tracking-widest ${theme.headerAccent} font-bold flex items-center justify-end space-x-1`}>
            <span>{card.type}</span>
          </div>
        </div>
      </div>

      {/* Cyberdeck Screen Cartridge Window */}
      <div className="w-full flex-1 my-1 bg-[#04070a] border border-slate-700/80 rounded-lg flex items-center justify-center relative overflow-hidden shadow-inner">
        <div className="absolute inset-0 opacity-15 matrix-grid z-0"></div>

        {/* Cyberdeck Corner Sensor Brackets */}
        <div className={`absolute top-0.5 left-0.5 w-2 h-2 border-t border-l ${theme.corner} z-10`}></div>
        <div className={`absolute top-0.5 right-0.5 w-2 h-2 border-t border-r ${theme.corner} z-10`}></div>
        <div className={`absolute bottom-0.5 left-0.5 w-2 h-2 border-b border-l ${theme.corner} z-10`}></div>
        <div className={`absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r ${theme.corner} z-10`}></div>
        
        {!imageFailed ? (
          <img
            src={artworkSrc}
            alt={card.name}
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover object-center z-1 transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center z-1">
            {theme.icon}
          </div>
        )}

        {/* Tactical Scanline & Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none z-2" />

        {/* UPG+ Status Badge */}
        {card.upgraded && (
          <span className="absolute top-1.5 right-1.5 z-10 text-[8px] font-mono font-bold text-[#00ff66] bg-black/90 px-1.5 py-0.5 rounded border border-[#00ff66]/70 shadow-[0_0_8px_rgba(0,255,102,0.6)]">
            UPG+
          </span>
        )}

        {/* Rare Tag Indicator */}
        {card.rarity === 'RARE' && (
          <span className="absolute bottom-1.5 left-1.5 z-10 text-[7px] font-mono font-bold text-amber-300 bg-amber-950/90 px-1.5 py-0.5 rounded border border-amber-500/60 shadow-[0_0_6px_rgba(245,158,11,0.5)]">
            RARE CHIP
          </span>
        )}
      </div>

      {/* Instant Stat Telemetry Chips Row */}
      <div className="flex flex-wrap items-center justify-center gap-1 mb-1 relative z-10">
        {dmgVal !== undefined && (
          <span className="flex items-center space-x-1 px-1.5 py-0.5 bg-rose-950/90 border border-rose-500/80 rounded text-rose-300 text-[9px] font-mono font-bold shadow-[0_0_6px_rgba(244,63,94,0.3)]">
            <Swords className="w-2.5 h-2.5 text-rose-400" />
            <span>{dmgVal} DMG</span>
          </span>
        )}
        {blockVal !== undefined && (
          <span className="flex items-center space-x-1 px-1.5 py-0.5 bg-cyan-950/90 border border-cyan-500/80 rounded text-cyan-300 text-[9px] font-mono font-bold shadow-[0_0_6px_rgba(0,229,255,0.3)]">
            <Shield className="w-2.5 h-2.5 text-cyan-400" />
            <span>{blockVal} BLOCK</span>
          </span>
        )}
        {vulnVal !== undefined && (
          <span className="flex items-center space-x-1 px-1.5 py-0.5 bg-amber-950/90 border border-amber-500/80 rounded text-amber-300 text-[9px] font-mono font-bold shadow-[0_0_6px_rgba(245,158,11,0.3)]">
            <Target className="w-2.5 h-2.5 text-amber-400" />
            <span>{vulnVal} VULN</span>
          </span>
        )}
        {weakVal !== undefined && (
          <span className="flex items-center space-x-1 px-1.5 py-0.5 bg-amber-950/90 border border-amber-500/80 rounded text-amber-300 text-[9px] font-mono font-bold shadow-[0_0_6px_rgba(245,158,11,0.3)]">
            <ArrowDownCircle className="w-2.5 h-2.5 text-amber-400" />
            <span>{weakVal} WEAK</span>
          </span>
        )}
        {poisonVal !== undefined && (
          <span className="flex items-center space-x-1 px-1.5 py-0.5 bg-emerald-950/90 border border-emerald-500/80 rounded text-emerald-300 text-[9px] font-mono font-bold shadow-[0_0_6px_rgba(16,185,129,0.3)]">
            <Biohazard className="w-2.5 h-2.5 text-emerald-400" />
            <span>{poisonVal} TOXIN</span>
          </span>
        )}
        {energyVal !== undefined && (
          <span className="flex items-center space-x-1 px-1.5 py-0.5 bg-amber-950/90 border border-amber-400 rounded text-amber-200 text-[9px] font-mono font-bold shadow-[0_0_6px_rgba(245,158,11,0.4)]">
            <Zap className="w-2.5 h-2.5 text-amber-300" />
            <span>+{energyVal} RAM</span>
          </span>
        )}
      </div>

      {/* Card Description */}
      <div className="text-[10px] font-mono text-slate-200 leading-tight bg-[#070b0e]/95 p-1.5 rounded-lg border border-slate-800/90 min-h-[46px] flex items-center justify-center text-center shadow-inner relative z-10">
        {displayDesc}
      </div>

      {/* Cartridge Bus Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[8px] font-mono text-slate-400 relative z-10 mt-1">
        <span className="flex items-center space-x-1 text-slate-400">
          <Cpu className="w-2.5 h-2.5 text-cyan-400" />
          <span>CYBERDECK // ROM</span>
        </span>
        <span className="text-[7px] text-slate-500 tracking-tighter uppercase font-mono">
          0x{card.id.slice(0, 4).toUpperCase()}
        </span>
      </div>
    </div>
  );
};
