import { Download, FileText, CheckCircle2, BookOpen } from 'lucide-react';
import { LandingTranslations } from '../i18n/locales';
import { landingAudio } from '../audio/landingAudio';

interface GrimoiresSectionProps {
  t: LandingTranslations;
}

export function GrimoiresSection({ t }: GrimoiresSectionProps) {
  const esDownloadUrl =
    (import.meta as unknown as { env: Record<string, string> }).env?.VITE_PDF_ES_URL ||
    'https://github.com/ArturoHerrera/cardbyte-dungeon/releases/latest/download/Cardbyte_Dungeon_Grimoire_ES.pdf';

  const enDownloadUrl =
    (import.meta as unknown as { env: Record<string, string> }).env?.VITE_PDF_EN_URL ||
    'https://github.com/ArturoHerrera/cardbyte-dungeon/releases/latest/download/Cardbyte_Dungeon_Grimoire_EN.pdf';

  return (
    <section id="grimoires" className="w-full py-24 px-4 lg:px-8 border-t border-[#121f2b] bg-[#020407] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00e5ff]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-widest text-[#00e5ff] uppercase font-bold block mb-2">
            {t.grimoires.kicker}
          </span>
          <h2 className="text-3xl sm:text-5xl font-mono font-black tracking-tight text-white mb-4 uppercase">
            {t.grimoires.title}
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 font-cyber">
            {t.grimoires.description}
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent mx-auto mt-6" />
        </div>

        {/* Master Showcase Layout: Cover Display + Dual Edition Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Visual Book Cover Presentation (Span 5) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group perspective-[1000px] max-w-[340px] sm:max-w-[380px]">
              {/* Volumetric glow beneath the book */}
              <div className="absolute -inset-4 bg-gradient-to-b from-[#00e5ff]/20 to-[#ff9f1c]/15 rounded-2xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />

              {/* Physical Book Cover Card */}
              <div className="relative rounded-xl border border-[#1d354a] bg-[#060e17] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src="/assets/book/cover.jpg"
                  alt={t.grimoires.coverAlt}
                  className="w-full h-auto object-cover rounded-t-xl"
                  loading="lazy"
                />

                {/* Book Spine Highlight Overlay */}
                <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Footer Badge on Cover */}
                <div className="p-4 bg-[#050b12] border-t border-[#142330] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#ff9f1c]" />
                    <span className="text-[11px] font-mono tracking-widest text-slate-300 font-bold uppercase">
                      OFFICIAL COMPENDIUM
                    </span>
                  </div>
                  <span className="text-[10px] font-mono tracking-wider text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-0.5 rounded border border-[#00e5ff]/30">
                    80+ PAGES
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[11px] font-mono text-slate-500 mt-4 tracking-wider text-center">
              // CANONICAL US LETTER // PRINT-READY VECTOR EDITION
            </p>
          </div>

          {/* Right Column: Spanish and English Edition Dossiers (Span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Edition 1: Spanish Dossier */}
            <div className="rounded-xl border border-[#1b2f42] bg-gradient-to-b from-[#08131e] to-[#03080e] p-6 sm:p-7 shadow-xl hover:border-[#00e5ff] transition-all group">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#122130]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
                  <span className="text-xs font-mono font-bold tracking-widest text-[#00e5ff]">
                    {t.grimoires.esCartridge.tag}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-[#060c14] px-2 py-0.5 rounded border border-[#142330]">
                  VERIFIED BUILD
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-mono font-bold text-white mb-2 group-hover:text-[#00e5ff] transition-colors">
                {t.grimoires.esCartridge.title}
              </h3>
              <p className="text-xs font-mono text-slate-400 mb-3">
                {t.grimoires.esCartridge.subtitle}
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300 mb-6">
                <span className="flex items-center gap-1.5 text-[#ff9f1c]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t.grimoires.esCartridge.pages}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">
                  {t.grimoires.esCartridge.format}
                </span>
              </div>

              {/* Direct 1-Click Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={esDownloadUrl}
                  download="Cardbyte_Dungeon_Grimoire_ES.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => landingAudio.playClick(1300)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-mono font-bold text-xs tracking-wider text-[#020408] bg-[#00e5ff] hover:bg-[#43f4ff] shadow-[0_0_20px_rgba(0,229,255,0.35)] transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.grimoires.esCartridge.downloadLabel}</span>
                </a>

                <a
                  href="https://github.com/ArturoHerrera/cardbyte-dungeon/blob/main/docs/CARDBYTE_MANUAL_DEL_OPERADOR.es.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => landingAudio.playClick(900)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-lg font-mono text-xs text-slate-300 border border-[#1b3145] hover:border-[#00e5ff] hover:text-[#00e5ff] bg-[#060e16] transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t.grimoires.esCartridge.readOnlineLabel}</span>
                </a>
              </div>
            </div>

            {/* Edition 2: English Dossier */}
            <div className="rounded-xl border border-[#1b2f42] bg-gradient-to-b from-[#08131e] to-[#03080e] p-6 sm:p-7 shadow-xl hover:border-[#ff9f1c] transition-all group">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#122130]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff9f1c] shadow-[0_0_8px_#ff9f1c]" />
                  <span className="text-xs font-mono font-bold tracking-widest text-[#ff9f1c]">
                    {t.grimoires.enCartridge.tag}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-[#060c14] px-2 py-0.5 rounded border border-[#142330]">
                  VERIFIED BUILD
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-mono font-bold text-white mb-2 group-hover:text-[#ff9f1c] transition-colors">
                {t.grimoires.enCartridge.title}
              </h3>
              <p className="text-xs font-mono text-slate-400 mb-3">
                {t.grimoires.enCartridge.subtitle}
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300 mb-6">
                <span className="flex items-center gap-1.5 text-[#00e5ff]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t.grimoires.enCartridge.pages}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">
                  {t.grimoires.enCartridge.format}
                </span>
              </div>

              {/* Direct 1-Click Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={enDownloadUrl}
                  download="Cardbyte_Dungeon_Grimoire_EN.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => landingAudio.playClick(1300)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-mono font-bold text-xs tracking-wider text-[#020408] bg-[#ff9f1c] hover:bg-[#ffb338] shadow-[0_0_20px_rgba(255,159,28,0.35)] transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.grimoires.enCartridge.downloadLabel}</span>
                </a>

                <a
                  href="https://github.com/ArturoHerrera/cardbyte-dungeon/blob/main/docs/CARDBYTE_OPERATOR_MANUAL.en.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => landingAudio.playClick(900)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-lg font-mono text-xs text-slate-300 border border-[#1b3145] hover:border-[#ff9f1c] hover:text-[#ff9f1c] bg-[#060e16] transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t.grimoires.enCartridge.readOnlineLabel}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CDN Notice */}
        <p className="text-center text-xs font-mono text-slate-500 mt-12">
          // {t.grimoires.notice}
        </p>
      </div>
    </section>
  );
}
