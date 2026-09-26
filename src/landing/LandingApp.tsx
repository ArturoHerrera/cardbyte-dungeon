import { useState } from 'react';
import { Locale, translations } from './i18n/locales';
import { TopNav } from './components/TopNav';
import { HeroBladeRunner } from './components/HeroBladeRunner';
import { GenesisSection } from './components/GenesisSection';
import { GrimoiresSection } from './components/GrimoiresSection';
import { ArchitectDossier } from './components/ArchitectDossier';
import { Cpu } from 'lucide-react';

export function LandingApp() {
  const [locale, setLocale] = useState<Locale>('en');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const t = translations[locale];

  const handleRomSwapped = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2200);
  };

  return (
    <div className="min-h-screen w-full bg-[#020408] text-slate-100 flex flex-col font-sans selection:bg-[#ff9f1c] selection:text-[#020408]">
      {/* Dynamic Top Navigation Bar */}
      <TopNav
        locale={locale}
        setLocale={setLocale}
        t={t}
        onRomSwapped={handleRomSwapped}
      />

      {/* Floating System ROM Ingestion Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg border border-[#ff9f1c] bg-[#06101a]/95 text-[#ff9f1c] font-mono text-xs shadow-[0_0_25px_rgba(255,159,28,0.4)] animate-bounce backdrop-blur-md">
          <Cpu className="w-4 h-4 animate-spin text-[#ff9f1c]" />
          <span className="tracking-widest font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Main Narrative Stream */}
      <main className="flex-1 w-full flex flex-col">
        {/* Section 1: Blade Runner Cinematic Hero */}
        <HeroBladeRunner t={t} />

        {/* Section 2: Genesis Narrative & Technical Architecture */}
        <GenesisSection t={t} />

        {/* Section 3: Physical Grimoires & 1-Click Downloads */}
        <GrimoiresSection t={t} />

        {/* Section 4: Architect Security Dossier & LinkedIn Profile */}
        <ArchitectDossier t={t} />
      </main>

      {/* Diegetic Footer */}
      <footer className="w-full border-t border-[#111e2a] bg-[#010306] py-12 px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-3 font-mono text-xs text-slate-500">
          <div className="flex items-center gap-2.5 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-[#ff9f1c] animate-pulse" />
            <span className="tracking-widest font-bold text-slate-300">
              {t.footer.corp}
            </span>
          </div>
          <p className="text-slate-500">{t.footer.note}</p>
          <p className="text-[#324558]">{t.footer.openSource}</p>
        </div>
      </footer>
    </div>
  );
}
