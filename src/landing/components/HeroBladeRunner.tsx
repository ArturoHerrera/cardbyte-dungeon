import { useState, useEffect } from 'react';
import { Play, BookOpen, ShieldAlert, Cpu, Activity, Database } from 'lucide-react';
import { LandingTranslations } from '../i18n/locales';
import { landingAudio } from '../audio/landingAudio';

interface HeroBladeRunnerProps {
  t: LandingTranslations;
}

export function HeroBladeRunner({ t }: HeroBladeRunnerProps) {
  const [displayedQuote, setDisplayedQuote] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  // Typewriter effect on quote change / locale switch
  useEffect(() => {
    let currentIdx = 0;
    setDisplayedQuote('');
    const quoteText = t.hero.quote;

    const interval = setInterval(() => {
      if (currentIdx < quoteText.length) {
        setDisplayedQuote(quoteText.slice(0, currentIdx + 1));
        currentIdx++;
      } else {
        clearInterval(interval);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [t.hero.quote]);

  // Terminal blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const handlePlayClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    landingAudio.playJackInSwell();
    setTimeout(() => {
      window.location.href = '/game.html';
    }, 280);
  };

  return (
    <section className="relative w-full min-h-[85vh] py-16 lg:py-24 px-4 lg:px-8 flex flex-col items-center justify-center overflow-hidden bg-[#020408]">
      {/* =========================================================================
          Volumetric Mist & Blade Runner Ambient Lighting (Lightweight CSS)
          ========================================================================= */}
      {/* Amber Light Beam */}
      <div className="absolute -top-32 -left-20 w-[550px] h-[750px] bg-gradient-to-br from-[#ff9f1c]/15 via-[#ff9f1c]/5 to-transparent rounded-full blur-[140px] pointer-events-none animate-mist-1" />

      {/* Rain Cyan Light Beam */}
      <div className="absolute -bottom-20 -right-20 w-[600px] h-[800px] bg-gradient-to-tl from-[#00e5ff]/12 via-[#00e5ff]/4 to-transparent rounded-full blur-[150px] pointer-events-none animate-mist-2" />

      {/* Ambient Angled Light Shaft */}
      <div className="absolute top-0 right-1/4 w-[280px] h-full bg-gradient-to-b from-[#ff9f1c]/10 via-[#00e5ff]/5 to-transparent blur-[110px] pointer-events-none animate-light-shaft" />

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 crt-overlay opacity-25 pointer-events-none" />

      {/* =========================================================================
          Hero Content Frame (Generous Dark Space, No Heavy Clutter)
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Kicker Protocol Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/5 mb-6 shadow-[0_0_15px_rgba(255,159,28,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff9f1c] animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-[#ffb703] font-bold uppercase">
            {t.hero.kicker}
          </span>
        </div>

        {/* Cinematic Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-mono font-black tracking-tight text-white mb-6 uppercase select-none">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff9f1c] via-[#f8fafc] to-[#00e5ff] drop-shadow-[0_0_35px_rgba(255,159,28,0.35)]">
            {t.hero.title}
          </span>
        </h1>

        {/* Atmospheric Gibson / Blade Runner Quote Box */}
        <div className="w-full max-w-2xl mx-auto rounded-xl border border-[#172635] bg-[#04080e]/80 backdrop-blur-md p-5 sm:p-6 mb-8 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          <p className="font-mono text-sm sm:text-base text-slate-300 italic leading-relaxed min-h-[3.2rem]">
            &ldquo;{displayedQuote}&rdquo;
            <span
              className={`inline-block w-2.5 h-4 ml-1 bg-[#ff9f1c] align-middle ${
                cursorVisible ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </p>
          <div className="mt-3 pt-2 border-t border-[#111c26] flex items-center justify-end">
            <span className="text-[10px] font-mono tracking-widest text-[#5c738a] uppercase">
              // {t.hero.quoteSource}
            </span>
          </div>
        </div>

        {/* Narrative Subtext */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-sans leading-relaxed mb-10 text-balance">
          {t.hero.subtext}
        </p>

        {/* Action Buttons: Play + Grimoires */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
          <a
            href="/game.html"
            onClick={handlePlayClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg font-mono font-black tracking-widest text-sm text-[#020408] bg-gradient-to-r from-[#ff9f1c] via-[#ffb703] to-[#00e5ff] hover:from-[#ffa82e] hover:to-[#4ff5ff] shadow-[0_0_30px_rgba(255,159,28,0.45)] hover:shadow-[0_0_45px_rgba(0,229,255,0.6)] transition-all hover:scale-[1.03] active:scale-95 group cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current transition-transform group-hover:scale-125" />
            <span>{t.hero.ctaPlay}</span>
          </a>

          <a
            href="#grimoires"
            onClick={() => landingAudio.playClick(1000)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-mono font-semibold tracking-wider text-sm text-slate-300 border border-[#1e3447] hover:border-[#00e5ff] bg-[#050c13] hover:bg-[#091522] hover:text-white shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-all"
          >
            <BookOpen className="w-4 h-4 text-[#00e5ff]" />
            <span>{t.hero.ctaManuals}</span>
          </a>
        </div>

        {/* Sleek Horizontal Telemetry Bar */}
        <div className="w-full max-w-3xl pt-6 border-t border-[#12202c] flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#00ff66]" />
            <span>{t.hero.telemetry.latency}</span>
          </span>
          <span className="hidden xs:inline text-slate-700">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-[#ff003c]" />
            <span className="text-[#ff385c]">{t.hero.telemetry.iceLevel}</span>
          </span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#00e5ff]" />
            <span>{t.hero.telemetry.engine}</span>
          </span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-[#ffb000]" />
            <span>{t.hero.telemetry.memory}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
