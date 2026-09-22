import { Code2, GitFork, ExternalLink, Layers, Smartphone, Volume2, Cpu, FileCode2 } from 'lucide-react';
import { LandingTranslations } from '../i18n/locales';
import { landingAudio } from '../audio/landingAudio';

interface TechRadiographyProps {
  t: LandingTranslations;
}

export function TechRadiography({ t }: TechRadiographyProps) {
  const cardIcons = [Code2, Layers, Cpu, Volume2, Smartphone, FileCode2];

  return (
    <section id="tech" className="w-full py-20 px-4 lg:px-8 border-t border-[#121f2b] bg-[#020406] relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase font-bold block mb-2">
            {t.tech.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-white mb-4">
            {t.tech.title}
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 font-sans">
            {t.tech.description}
          </p>
        </div>

        {/* 6 Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {t.tech.cards.map((c, idx) => {
            const Icon = cardIcons[idx] || Code2;
            return (
              <div
                key={idx}
                onMouseEnter={() => landingAudio.playClick(900 + idx * 50)}
                className="rounded-lg border border-[#172c3d] bg-gradient-to-b from-[#060e15] to-[#03070b] p-6 hover:border-[#00ff66] transition-all shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono tracking-widest text-[#00ff66] font-bold bg-[#00ff66]/10 px-2 py-0.5 rounded border border-[#00ff66]/30">
                      {c.tag}
                    </span>
                    <Icon className="w-4 h-4 text-slate-500 group-hover:text-[#00ff66] transition-colors" />
                  </div>
                  <h3 className="text-lg font-mono font-bold text-white mb-2 group-hover:text-[#00f0ff] transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                    {c.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#101d29] flex items-center justify-between text-[10px] font-mono text-[#4e6375]">
                  <span>STATUS: OPTIMIZED</span>
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
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-mono text-xs sm:text-sm font-bold tracking-wider text-slate-200 border border-[#1e3b52] hover:border-[#00f0ff] hover:text-[#00f0ff] bg-[#07131e] hover:bg-[#0c1e2e] shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-all group"
          >
            <GitFork className="w-4 h-4 text-[#00f0ff] group-hover:rotate-12 transition-transform" />
            <span>OPEN SOURCE ON GITHUB</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00f0ff]" />
          </a>
        </div>
      </div>
    </section>
  );
}
