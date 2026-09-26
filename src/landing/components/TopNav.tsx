import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal, Play, Languages } from 'lucide-react';
import { Locale, LandingTranslations } from '../i18n/locales';
import { landingAudio } from '../audio/landingAudio';

interface TopNavProps {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: LandingTranslations;
  onRomSwapped?: (msg: string) => void;
}

export function TopNav({ locale, setLocale, t, onRomSwapped }: TopNavProps) {
  const [isMuted, setIsMuted] = useState(landingAudio.getMuted());
  const [isSwitchingLocale, setIsSwitchingLocale] = useState(false);

  useEffect(() => {
    return landingAudio.subscribe((muted) => setIsMuted(muted));
  }, []);

  const handleToggleAudio = () => {
    landingAudio.toggleMute();
  };

  const handleToggleLocale = () => {
    const nextLocale: Locale = locale === 'en' ? 'es' : 'en';
    setIsSwitchingLocale(true);
    landingAudio.playRomInject();
    setLocale(nextLocale);

    const patchMsg = nextLocale === 'es' ? '[PATCHING_ROM: ES-MX...]' : '[PATCHING_ROM: EN-US...]';
    if (onRomSwapped) {
      onRomSwapped(patchMsg);
    }

    setTimeout(() => {
      setIsSwitchingLocale(false);
    }, 1000);
  };

  const handleJackInClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    landingAudio.playJackInSwell();
    setTimeout(() => {
      window.location.href = '/game.html';
    }, 280);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#020408]/85 border-b border-[#111e2a] px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Terminal Header */}
        <a
          href="#"
          onClick={() => landingAudio.playClick(1100)}
          className="flex items-center gap-3 text-slate-100 hover:text-[#00e5ff] transition-colors group"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff9f1c] shadow-[0_0_10px_#ff9f1c]" />
            <span className="absolute w-4 h-4 rounded-full bg-[#ff9f1c]/30 animate-ping" />
          </div>
          <div className="flex items-center gap-2 font-mono text-sm tracking-widest font-black">
            <Terminal className="w-4 h-4 text-[#00e5ff]" />
            <span className="tracking-wider text-white group-hover:text-[#00e5ff] transition-colors">
              {t.nav.title}
            </span>
          </div>
        </a>

        {/* Anchor Navigation Links (Minimalist & Roomy) */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono tracking-widest text-slate-400">
          <a
            href="#genesis"
            onClick={() => landingAudio.playClick(900)}
            className="hover:text-[#ff9f1c] transition-colors"
          >
            // {t.nav.story}
          </a>
          <a
            href="#grimoires"
            onClick={() => landingAudio.playClick(900)}
            className="hover:text-[#00e5ff] transition-colors"
          >
            // {t.nav.manuals}
          </a>
          <a
            href="#tech"
            onClick={() => landingAudio.playClick(900)}
            className="hover:text-[#ff9f1c] transition-colors"
          >
            // {t.nav.tech}
          </a>
          <a
            href="#architect"
            onClick={() => landingAudio.playClick(900)}
            className="hover:text-[#00e5ff] transition-colors"
          >
            // {t.nav.operator}
          </a>
        </nav>

        {/* Controls: Audio Toggle, Language Switcher, Direct Jack In */}
        <div className="flex items-center gap-2.5 sm:gap-3 font-mono text-xs">
          {/* Audio Ambient Synth Toggle */}
          <button
            onClick={handleToggleAudio}
            title={isMuted ? 'Enable Ambient Synth (Vangelis CS-80 pad)' : 'Mute Ambient Synth'}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-all cursor-pointer
              ${
                !isMuted
                  ? 'border-[#ff9f1c] text-[#ff9f1c] bg-[#ff9f1c]/10 shadow-[0_0_12px_rgba(255,159,28,0.25)]'
                  : 'border-[#1b2b3a] text-slate-400 hover:text-slate-200 hover:border-slate-500 bg-[#060c12]'
              }
            `}
          >
            {!isMuted ? (
              <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#ff9f1c]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span className="hidden sm:inline text-[11px] font-semibold tracking-wider">
              {!isMuted ? t.meta.audioActive : t.meta.audioMuted}
            </span>
          </button>

          {/* Language Switch */}
          <button
            onClick={handleToggleLocale}
            title="Toggle Language (ES / EN)"
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-all cursor-pointer
              ${
                isSwitchingLocale
                  ? 'border-[#00e5ff] text-[#00e5ff] bg-[#00e5ff]/20 animate-pulse'
                  : 'border-[#1b2b3a] text-slate-300 hover:border-[#00e5ff] hover:text-[#00e5ff] bg-[#060c12]'
              }
            `}
          >
            <Languages className="w-3.5 h-3.5 text-[#00e5ff]" />
            <span className="font-bold text-[11px] tracking-wider">
              {locale === 'en' ? 'EN' : 'ES'}
            </span>
          </button>

          {/* Direct Jack In to Game */}
          <a
            href="/game.html"
            onClick={handleJackInClick}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-md font-bold tracking-widest text-[#020408] bg-gradient-to-r from-[#ff9f1c] to-[#00e5ff] hover:from-[#ffb703] hover:to-[#38f8ff] shadow-[0_0_18px_rgba(255,159,28,0.35)] transition-all hover:scale-105 active:scale-95"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{t.meta.jackIn}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
