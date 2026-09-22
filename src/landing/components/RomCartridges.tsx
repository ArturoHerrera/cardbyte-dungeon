import { Download, FileText, CheckCircle2, HardDrive } from 'lucide-react';
import { LandingTranslations } from '../i18n/locales';
import { landingAudio } from '../audio/landingAudio';

interface RomCartridgesProps {
  t: LandingTranslations;
}

export function RomCartridges({ t }: RomCartridgesProps) {
  const esDownloadUrl =
    (import.meta as unknown as { env: Record<string, string> }).env?.VITE_PDF_ES_URL ||
    'https://github.com/ArturoHerrera/cardbyte-dungeon/releases';

  const enDownloadUrl =
    (import.meta as unknown as { env: Record<string, string> }).env?.VITE_PDF_EN_URL ||
    'https://github.com/ArturoHerrera/cardbyte-dungeon/releases';

  return (
    <section id="manuals" className="w-full py-20 px-4 lg:px-8 border-t border-[#121f2b] bg-[#020508] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-mono tracking-widest text-[#00e5ff] uppercase font-bold block mb-2">
            {t.roms.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-white mb-4">
            {t.roms.title}
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 font-sans">
            {t.roms.description}
          </p>
        </div>

        {/* Dual Cartridge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* ROM 01: Spanish Grimoire Cartridge */}
          <div className="relative rounded-xl border border-[#1e3448] bg-gradient-to-b from-[#0a1520] to-[#04080e] p-6 sm:p-8 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-[#00ff66] transition-all group">
            {/* Top Hardware Notches */}
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-[#142330]">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-[#00ff66]" />
                <span className="text-xs font-mono font-bold tracking-widest text-[#00ff66]">
                  {t.roms.esCartridge.tag}
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-wider text-slate-500 bg-[#070e14] px-2 py-0.5 rounded border border-[#142330]">
                SHA-256 VERIFIED
              </span>
            </div>

            {/* Cartridge Face */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#00ff66]" />
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {t.roms.esCartridge.subtitle}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white mb-3 group-hover:text-[#00ff66] transition-colors">
                {t.roms.esCartridge.title}
              </h3>
              <p className="text-sm font-mono text-[#00e5ff] mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00e5ff]" />
                {t.roms.esCartridge.pages}
              </p>
              <p className="text-xs text-slate-400 font-mono">
                {t.roms.esCartridge.format}
              </p>
            </div>

            {/* Micro Hardware Ventilation Slots */}
            <div className="flex gap-1.5 mb-6 opacity-40">
              <span className="h-1.5 flex-1 bg-[#162738] rounded-sm" />
              <span className="h-1.5 flex-1 bg-[#162738] rounded-sm" />
              <span className="h-1.5 flex-1 bg-[#162738] rounded-sm" />
              <span className="h-1.5 flex-1 bg-[#162738] rounded-sm" />
              <span className="h-1.5 flex-1 bg-[#162738] rounded-sm" />
            </div>

            {/* Download and Read CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#142330]">
              <a
                href={esDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => landingAudio.playClick(1300)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-mono font-bold text-xs tracking-wider text-[#030609] bg-[#00ff66] hover:bg-[#38ff8e] shadow-[0_0_15px_rgba(0,255,102,0.3)] transition-all"
              >
                <Download className="w-4 h-4" />
                <span>{t.roms.esCartridge.downloadLabel}</span>
              </a>
              <a
                href="https://github.com/ArturoHerrera/cardbyte-dungeon/blob/main/docs/CARDBYTE_MANUAL_DEL_OPERADOR.es.md"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => landingAudio.playClick(900)}
                className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-lg font-mono text-xs text-slate-300 border border-[#1b3145] hover:border-[#00e5ff] hover:text-[#00e5ff] bg-[#070e14] transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{t.roms.esCartridge.readOnlineLabel}</span>
              </a>
            </div>

            {/* Bottom Gold Contacts Strip */}
            <div className="mt-5 pt-2 flex justify-center gap-1 opacity-70">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} className="w-2.5 h-3 bg-gradient-to-b from-[#e5a93b] to-[#a6741b] rounded-t-sm" />
              ))}
            </div>
          </div>

          {/* ROM 02: English Manual Cartridge */}
          <div className="relative rounded-xl border border-[#1e3448] bg-gradient-to-b from-[#0a1520] to-[#04080e] p-6 sm:p-8 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-[#00f0ff] transition-all group">
            {/* Top Hardware Notches */}
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-[#142330]">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-[#00f0ff]" />
                <span className="text-xs font-mono font-bold tracking-widest text-[#00f0ff]">
                  {t.roms.enCartridge.tag}
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-wider text-slate-500 bg-[#070e14] px-2 py-0.5 rounded border border-[#142330]">
                SHA-256 VERIFIED
              </span>
            </div>

            {/* Cartridge Face */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {t.roms.enCartridge.subtitle}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white mb-3 group-hover:text-[#00f0ff] transition-colors">
                {t.roms.enCartridge.title}
              </h3>
              <p className="text-sm font-mono text-[#00f0ff] mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00f0ff]" />
                {t.roms.enCartridge.pages}
              </p>
              <p className="text-xs text-slate-400 font-mono">
                {t.roms.enCartridge.format}
              </p>
            </div>

            {/* Micro Hardware Ventilation Slots */}
            <div className="flex gap-1.5 mb-6 opacity-40">
              <span className="h-1.5 flex-1 bg-[#162738] rounded-sm" />
              <span className="h-1.5 flex-1 bg-[#162738] rounded-sm" />
              <span className="h-1.5 flex-1 bg-[#162738] rounded-sm" />
              <span className="h-1.5 flex-1 bg-[#162738] rounded-sm" />
              <span className="h-1.5 flex-1 bg-[#162738] rounded-sm" />
            </div>

            {/* Download and Read CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#142330]">
              <a
                href={enDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => landingAudio.playClick(1300)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-mono font-bold text-xs tracking-wider text-[#030609] bg-[#00f0ff] hover:bg-[#4df4ff] shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
              >
                <Download className="w-4 h-4" />
                <span>{t.roms.enCartridge.downloadLabel}</span>
              </a>
              <a
                href="https://github.com/ArturoHerrera/cardbyte-dungeon/blob/main/docs/CARDBYTE_OPERATOR_MANUAL.en.md"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => landingAudio.playClick(900)}
                className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-lg font-mono text-xs text-slate-300 border border-[#1b3145] hover:border-[#00f0ff] hover:text-[#00f0ff] bg-[#070e14] transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{t.roms.enCartridge.readOnlineLabel}</span>
              </a>
            </div>

            {/* Bottom Gold Contacts Strip */}
            <div className="mt-5 pt-2 flex justify-center gap-1 opacity-70">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} className="w-2.5 h-3 bg-gradient-to-b from-[#e5a93b] to-[#a6741b] rounded-t-sm" />
              ))}
            </div>
          </div>
        </div>

        {/* CDN Notice */}
        <p className="text-center text-xs font-mono text-slate-500 mt-8">
          // {t.roms.notice}
        </p>
      </div>
    </section>
  );
}
