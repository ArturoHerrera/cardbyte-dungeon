import { Sparkles, Bot, ScrollText, Music, Terminal } from 'lucide-react';
import { LandingTranslations } from '../i18n/locales';
import { landingAudio } from '../audio/landingAudio';

interface GenesisStoryProps {
  t: LandingTranslations;
}

export function GenesisStory({ t }: GenesisStoryProps) {
  const icons = [Bot, ScrollText, Music];

  return (
    <section id="genesis" className="w-full py-20 px-4 lg:px-8 border-t border-[#121f2b] bg-[#03070b] relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono tracking-widest text-[#00ff66] uppercase font-bold block mb-2">
            {t.genesis.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-white mb-4">
            {t.genesis.title}
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#00ff66] to-transparent mx-auto" />
        </div>

        {/* The Gibson Quote Callout */}
        <div className="rounded-xl border border-[#162738] bg-[#060e15] p-6 sm:p-8 mb-12 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Terminal className="w-32 h-32 text-[#00ff66]" />
          </div>
          <p className="text-base sm:text-lg font-mono italic text-slate-200 leading-relaxed mb-3">
            &ldquo;{t.genesis.quote}&rdquo;
          </p>
          <p className="text-xs sm:text-sm font-mono text-[#00e5ff] font-semibold">
            {t.genesis.quoteAuthor}
          </p>
        </div>

        {/* Narrative Paragraphs */}
        <div className="space-y-6 text-slate-300 font-sans text-base sm:text-lg leading-relaxed mb-14">
          <p>{t.genesis.p1}</p>
          <p>{t.genesis.p2}</p>
          <p className="text-slate-400 text-sm sm:text-base border-l-2 border-[#00f0ff] pl-4 py-1 italic">
            {t.genesis.p3}
          </p>
        </div>

        {/* 3 Pillar Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.genesis.highlights.map((h, i) => {
            const Icon = icons[i] || Sparkles;
            return (
              <div
                key={i}
                onMouseEnter={() => landingAudio.playClick(1050 + i * 100)}
                className="rounded-lg border border-[#172c3d] bg-[#050b11] p-6 hover:border-[#00e5ff] hover:bg-[#08131d] transition-all shadow-md group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff] mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-mono font-bold text-white mb-2 group-hover:text-[#00e5ff] transition-colors">
                  {h.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                  {h.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
