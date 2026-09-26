import { Sparkles, Bot, ScrollText, Music, Terminal, GitFork, ExternalLink, Code2, Layers, Cpu, Smartphone, FileCode2 } from 'lucide-react';
import { LandingTranslations } from '../i18n/locales';
import { landingAudio } from '../audio/landingAudio';

interface GenesisSectionProps {
  t: LandingTranslations;
}

export function GenesisSection({ t }: GenesisSectionProps) {
  const pillarIcons = [ScrollText, Bot, Music];
  const techIcons = [Code2, Layers, Cpu, Music, Smartphone, FileCode2];

  return (
    <section id="genesis" className="w-full py-24 px-4 lg:px-8 border-t border-[#121f2b] bg-[#020509] relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#ff9f1c]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-[#00e5ff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* =========================================================================
            Part 1: The 48-Hour AI Acceleration Story
            ========================================================================= */}
        <div className="text-center mb-14">
          <span className="text-xs font-mono tracking-widest text-[#ff9f1c] uppercase font-bold block mb-2">
            {t.genesis.kicker}
          </span>
          <h2 className="text-3xl sm:text-5xl font-mono font-black tracking-tight text-white mb-4 uppercase">
            {t.genesis.title}
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 font-cyber">
            {t.genesis.subtitle}
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#ff9f1c] to-transparent mx-auto mt-6" />
        </div>

        {/* Roy Batty Quote Callout Box */}
        <div className="rounded-xl border border-[#1b2b3a] bg-[#040910]/80 p-6 sm:p-8 mb-14 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Terminal className="w-36 h-36 text-[#00e5ff]" />
          </div>
          <p className="text-base sm:text-xl font-mono italic text-slate-200 leading-relaxed mb-3">
            &ldquo;{t.genesis.quote}&rdquo;
          </p>
          <p className="text-xs sm:text-sm font-mono text-[#00e5ff] font-semibold">
            {t.genesis.quoteAuthor}
          </p>
        </div>

        {/* Narrative Flow */}
        <div className="space-y-6 text-slate-300 font-cyber text-base sm:text-lg leading-relaxed mb-16">
          <p>{t.genesis.p1}</p>
          <p>{t.genesis.p2}</p>
          <p className="text-slate-400 text-sm sm:text-base border-l-2 border-[#ff9f1c] pl-5 py-1.5 italic bg-[#ff9f1c]/5 rounded-r">
            {t.genesis.p3}
          </p>
        </div>

        {/* 3 Acceleration Pillars */}
        <div className="mb-24">
          <h3 className="text-xs font-mono tracking-widest text-[#00e5ff] font-bold uppercase mb-6 text-center sm:text-left">
            // {t.genesis.pillarsTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.genesis.pillars.map((p, i) => {
              const Icon = pillarIcons[i] || Sparkles;
              return (
                <div
                  key={i}
                  onMouseEnter={() => landingAudio.playClick(1000 + i * 100)}
                  className="rounded-xl border border-[#162737] bg-gradient-to-b from-[#050c14] to-[#020509] p-6 hover:border-[#ff9f1c] transition-all shadow-lg group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#ff9f1c]/10 border border-[#ff9f1c]/30 flex items-center justify-center text-[#ff9f1c] mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-mono font-bold text-white mb-2 group-hover:text-[#ff9f1c] transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 font-cyber leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            Part 2: Technical Radiography & Architecture
            ========================================================================= */}
        <div id="tech" className="pt-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-widest text-[#00e5ff] uppercase font-bold block mb-2">
              // ARCHITECTURE
            </span>
            <h3 className="text-2xl sm:text-4xl font-mono font-black tracking-tight text-white mb-3 uppercase">
              {t.genesis.techTitle}
            </h3>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 font-cyber">
              {t.genesis.techSubtitle}
            </p>
          </div>

          {/* 6 Tech Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {t.genesis.techCards.map((c, idx) => {
              const Icon = techIcons[idx] || Code2;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => landingAudio.playClick(900 + idx * 50)}
                  className="rounded-xl border border-[#162737] bg-gradient-to-b from-[#060e17] to-[#03060a] p-6 hover:border-[#00e5ff] transition-all shadow-md group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono tracking-widest text-[#00e5ff] font-bold bg-[#00e5ff]/10 px-2.5 py-0.5 rounded border border-[#00e5ff]/30">
                        {c.tag}
                      </span>
                      <Icon className="w-4 h-4 text-slate-500 group-hover:text-[#00e5ff] transition-colors" />
                    </div>
                    <h4 className="text-base font-mono font-bold text-white mb-2 group-hover:text-[#00e5ff] transition-colors">
                      {c.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 font-cyber leading-relaxed">
                      {c.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#101b26] flex items-center justify-between text-[10px] font-mono text-[#4e6477]">
                    <span>STATUS: OPERATIONAL</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* GitHub Source CTA */}
          <div className="flex justify-center">
            <a
              href="https://github.com/ArturoHerrera/cardbyte-dungeon"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => landingAudio.playClick(1200)}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-mono text-xs sm:text-sm font-bold tracking-wider text-slate-200 border border-[#1e3b52] hover:border-[#00e5ff] hover:text-[#00e5ff] bg-[#06111a] hover:bg-[#0a1824] shadow-[0_0_25px_rgba(0,0,0,0.6)] transition-all group"
            >
              <GitFork className="w-4 h-4 text-[#00e5ff] group-hover:rotate-12 transition-transform" />
              <span>EXPLORE SOURCE ON GITHUB</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00e5ff]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
