import React, { useState } from 'react';
import { useCardByteStore } from '../../store/cardByteStore';
import { SYS_ASSIST_HINTS } from '../../data/sysAssistData';
import { t } from '../../locales';
import { HelpCircle } from 'lucide-react';

interface SysAssistAnchorProps {
  id: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  forceShowIndicator?: boolean;
}

export const SysAssistAnchor: React.FC<SysAssistAnchorProps> = ({
  id,
  children,
  position = 'top',
  className = '',
  forceShowIndicator = false,
}) => {
  const { locale, sysAssistEnabled } = useCardByteStore();
  const [isHovered, setIsHovered] = useState(false);

  const hint = SYS_ASSIST_HINTS[id];

  if (!hint) {
    return <>{children}</>;
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'top-full mt-2 left-1/2 -translate-x-1/2';
      case 'left':
        return 'right-full mr-2 top-1/2 -translate-y-1/2';
      case 'right':
        return 'left-full ml-2 top-1/2 -translate-y-1/2';
      case 'top':
      default:
        return 'bottom-full mb-2 left-1/2 -translate-x-1/2';
    }
  };

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {children}

      {/* Subtle indicator dot when assist mode is active */}
      {sysAssistEnabled && forceShowIndicator && (
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
      )}

      {/* Floating Assist Popover */}
      {sysAssistEnabled && isHovered && (
        <div
          role="tooltip"
          className={`absolute ${getPositionClasses()} z-50 w-56 sm:w-64 p-3 bg-[#060c14]/95 border border-cyan-500/80 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.35)] text-slate-200 font-mono pointer-events-none animate-in fade-in zoom-in-95 duration-150`}
        >
          <div className="flex items-center space-x-1.5 text-cyan-400 font-bold text-[11px] uppercase tracking-wider pb-1 mb-1 border-b border-cyan-950">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{t(locale, hint.titleKey)}</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            {t(locale, hint.bodyKey)}
          </p>
          <div className="mt-1.5 pt-1 text-[9px] text-cyan-500/70 tracking-widest uppercase flex items-center justify-between">
            <span>SYS_ASSIST v1.0</span>
            <span>// TELEMETRY</span>
          </div>
        </div>
      )}
    </div>
  );
};
