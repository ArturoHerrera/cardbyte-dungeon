import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Cpu, Terminal } from 'lucide-react';
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
  const [isPatching, setIsPatching] = useState(false);

  useEffect(() => {
    return landingAudio.subscribe((muted) => setIsMuted(muted));
  }, []);

  const handleToggleAudio = () => {
    landingAudio.toggleMute();
  };

  const handleToggleLocale = () => {
    const nextLocale: Locale = locale === 'en' ? 'es' : 'en';
    setIsPatching(true);
    landingAudio.playRomInject();
    setLocale(nextLocale);

    const patchMsg = nextLocale === 'es' ? '[PATCHING_ROM: ES-MX...]' : '[INJECTING_LOCALE: EN-US...]';
    if (onRomSwapped) {
      onRomSwapped(patchMsg);
    }

    setTimeout(() => {
      setIsPatching(false);
    }, 1200);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#030609]/90 border-b border-[#142330] px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Terminal Header */}
        <a
          href="#"
          onClick={() => landingAudio.playClick(1100)}
          className="flex items-center gap-2.5 text-slate-100 hover:text-[#00f0ff] transition-colors group"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66] animate-pulse" />
          <div className="flex items-center gap-1.5 font-mono text-sm tracking-widest font-bold">
            <Terminal className="w-4 h-4 text-[#00f0ff]" />
            <span className="text-[#00f0ff]">{t.nav.title}</span>
          </div>
          <span className="hidden sm:inline-block text-[10px] tracking-widest text-[#4b5c6b] font-mono border border-[#142330] px-1.5 py-0.5 rounded bg-[#060c12]">
            {t.meta.sublevel}
          </span>
        </a>

        {/* Anchor Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider text-slate-400">
          <a
            href="#genesis"
            onClick={() => landingAudio.playClick(900)}
            className="hover:text-[#00f0ff] transition-colors"
          >
            // {t.nav.story}
          </a>
          <a
            href="#manuals"
            onClick={() => landingAudio.playClick(900)}
            className="hover:text-[#00f0ff] transition-colors"
          >
            // {t.nav.manuals}
          </a>
          <a
            href="#tech"
            onClick={() => landingAudio.playClick(900)}
            className="hover:text-[#00f0ff] transition-colors"
          >
            // {t.nav.tech}
          </a>
          <a
            href="#operator"
            onClick={() => landingAudio.playClick(900)}
            className="hover:text-[#00ff66] transition-colors"
          >
            // {t.nav.operator}
          </a>
        </nav>

        {/* Controls: Audio Toggle, ROM Switcher, Jack In */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Audio Ambient Synth Toggle */}
          <button
            onClick={handleToggleAudio}
            title={isMuted ? 'Unmute Ambient WebAudio' : 'Mute Ambient WebAudio'}
            className={`
              flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-mono border transition-all
              ${
                !isMuted
                  ? 'border-[#00ff66] text-[#00ff66] bg-[#00ff66]/10 shadow-[0_0_12px_rgba(0,255,102,0.2)]'
                  : 'border-[#1b2a36] text-slate-400 hover:text-slate-200 hover:border-slate-500 bg-[#070e14]'
              }
            `}
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
            <span className="hidden sm:inline text-[11px] font-semibold">
              {!isMuted ? t.meta.audioActive : t.meta.audioMuted}
            </span>
          </button>

          {/* Diegetic ROM Cartridge Language Switch */}
          <button
            onClick={handleToggleLocale}
            title="Swap Locale ROM Module"
            className={`
              flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-mono border transition-all relative overflow-hidden
              ${
                isPatching
                  ? 'border-[#ffb000] text-[#ffb000] bg-[#ffb000]/20 animate-pulse'
                  : 'border-[#1e3444] text-[#00e5ff] hover:border-[#00e5ff] bg-[#08121a]'
              }
            `}
          >
            <Cpu className={`w-3.5 h-3.5 ${isPatching ? 'animate-spin text-[#ffb000]' : 'text-[#00e5ff]'}`} />
            <span className="font-bold text-[11px] tracking-wider">
              {locale === 'en' ? 'ROM: EN-US' : 'ROM: ES-MX'}
            </span>
          </button>

          {/* Direct Jack In to Game */}
          <a
            href="/game.html"
            onClick={() => landingAudio.playClick(1400)}
            className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-mono font-bold tracking-wider bg-[#00f0ff] hover:bg-[#38f8ff] text-[#03070b] shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            <span>{t.meta.jackIn}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
