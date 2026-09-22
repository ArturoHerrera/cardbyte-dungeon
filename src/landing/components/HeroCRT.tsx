import { useState, useEffect } from 'react';
import { Play, BookOpen, ShieldAlert, Cpu, Activity, Database } from 'lucide-react';
import { LandingTranslations } from '../i18n/locales';
import { landingAudio } from '../audio/landingAudio';

interface HeroCRTProps {
  t: LandingTranslations;
}

export function HeroCRT({ t }: HeroCRTProps) {
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
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section className="relative w-full pt-10 pb-16 px-4 lg:px-8 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Matrix & Subtle Cyber Gradient */}
      <div className="absolute inset-0 matrix-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#00ff66]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main CRT Frame Container */}
      <div className="relative w-full max-w-5xl rounded-xl border border-[#1a2d3d] bg-[#050b11] p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_25px_rgba(0,240,255,0.03)] overflow-hidden">
        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 crt-overlay pointer-events-none z-10" />

        {/* Decorative Terminal Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#142330] pb-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff003c]/70 border border-[#ff003c]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffb000]/70 border border-[#ffb000]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66]/70 border border-[#00ff66]" />
            </div>
            <span className="text-[11px] font-mono tracking-widest text-[#00e5ff] font-bold ml-2">
              ONO-SENDAI 7 // NEURAL_DECK_EMULATOR
            </span>
          </div>

          {/* Real-time Telemetry Grid */}
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1 bg-[#09141d] px-2 py-0.5 rounded border border-[#162736]">
              <Activity className="w-3 h-3 text-[#00ff66]" />
              {t.hero.telemetry.latency}
            </span>
            <span className="flex items-center gap-1 bg-[#09141d] px-2 py-0.5 rounded border border-[#162736]">
              <ShieldAlert className="w-3 h-3 text-[#ff003c]" />
              {t.hero.telemetry.iceLevel}
            </span>
            <span className="hidden sm:flex items-center gap-1 bg-[#09141d] px-2 py-0.5 rounded border border-[#162736]">
              <Cpu className="w-3 h-3 text-[#00e5ff]" />
              {t.hero.telemetry.engine}
            </span>
            <span className="hidden sm:flex items-center gap-1 bg-[#09141d] px-2 py-0.5 rounded border border-[#162736]">
              <Database className="w-3 h-3 text-[#ffb000]" />
              {t.hero.telemetry.memory}
            </span>
          </div>
        </div>

        {/* Hero Kicker */}
        <div className="text-center mb-3">
          <span className="inline-block text-xs sm:text-sm font-mono tracking-widest text-[#00ff66] font-semibold">
            {t.hero.kicker}
          </span>
        </div>

        {/* Giant Cyberspace Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-mono font-black text-center tracking-tight text-white mb-6 uppercase">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-white to-[#00ff66] drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
            {t.hero.title}
          </span>
        </h1>

        {/* Typewriter Terminal Quote Box */}
        <div className="w-full max-w-3xl mx-auto rounded-lg border border-[#172d3d] bg-[#020609]/90 p-4 sm:p-5 mb-8 shadow-inner">
          <div className="flex items-start gap-3">
            <span className="text-[#00ff66] font-mono text-sm leading-relaxed font-bold select-none">&gt;&gt;</span>
            <p className="font-mono text-sm sm:text-base text-slate-300 italic leading-relaxed min-h-[3rem]">
              &ldquo;{displayedQuote}&rdquo;
              <span
                className={`inline-block w-2.5 h-4 ml-1 bg-[#00ff66] align-middle ${
                  cursorVisible ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </p>
          </div>
        </div>

        {/* Narrative Subtext */}
        <p className="max-w-2xl mx-auto text-center text-sm sm:text-base text-slate-300 font-sans leading-relaxed mb-10">
          {t.hero.subtext}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20">
          <a
            href="/game.html"
            onClick={() => landingAudio.playClick(1500)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-mono font-bold tracking-widest text-sm text-[#030609] bg-gradient-to-r from-[#00f0ff] to-[#00ff66] hover:from-[#38f8ff] hover:to-[#43ff8e] shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:shadow-[0_0_35px_rgba(0,255,102,0.7)] transition-all hover:scale-[1.03] active:scale-95 group"
          >
            <Play className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
            <span>{t.hero.ctaPlay}</span>
          </a>

          <a
            href="#manuals"
            onClick={() => landingAudio.playClick(1000)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-mono font-semibold tracking-wider text-sm text-slate-300 border border-[#1e384d] hover:border-[#00f0ff] bg-[#07131d] hover:bg-[#0c1d2c] hover:text-white shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all"
          >
            <BookOpen className="w-4 h-4 text-[#00f0ff]" />
            <span>{t.hero.ctaManuals}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
