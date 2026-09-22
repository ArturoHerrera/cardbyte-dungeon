import { useState } from 'react';
import { Locale, translations } from './i18n/locales';
import { TopNav } from './components/TopNav';
import { HeroCRT } from './components/HeroCRT';
import { RomCartridges } from './components/RomCartridges';
import { GenesisStory } from './components/GenesisStory';
import { TechRadiography } from './components/TechRadiography';
import { OperatorBadge } from './components/OperatorBadge';
import { Cpu } from 'lucide-react';

export function LandingApp() {
  const [locale, setLocale] = useState<Locale>('en');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const t = translations[locale];

  const handleRomSwapped = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#030609] text-slate-100 flex flex-col font-sans selection:bg-[#00f0ff] selection:text-[#030609]">
      {/* Dynamic Top Navigation Bar */}
      <TopNav
        locale={locale}
        setLocale={setLocale}
        t={t}
        onRomSwapped={handleRomSwapped}
      />

      {/* Floating System ROM Ingestion Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg border border-[#00ff66] bg-[#06141c]/95 text-[#00ff66] font-mono text-xs shadow-[0_0_20px_rgba(0,255,102,0.4)] animate-bounce">
          <Cpu className="w-4 h-4 animate-spin text-[#00ff66]" />
          <span className="tracking-widest font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Main Layout Stream */}
      <main className="flex-1 w-full flex flex-col">
        {/* Section 1: Hero CRT with Typewriter and Live Telemetry */}
        <HeroCRT t={t} />

        {/* Section 2: Physical ROM Manual Cartridges */}
        <RomCartridges t={t} />

        {/* Section 3: Behind the ICE (The 48h AI Acceleration Experiment) */}
        <GenesisStory t={t} />

        {/* Section 4: Technical Architecture & Radiography */}
        <TechRadiography t={t} />

        {/* Section 5: Operator Identity & Security Clearance Badge */}
        <OperatorBadge t={t} />
      </main>

      {/* Diegetic Footer */}
      <footer className="w-full border-t border-[#12202c] bg-[#020406] py-10 px-4 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-3 font-mono text-xs text-slate-500">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            <span className="tracking-widest font-bold text-slate-300">
              {t.footer.corp}
            </span>
          </div>
          <p>{t.footer.note}</p>
          <p className="text-[#3b4e60]">{t.footer.openSource}</p>
        </div>
      </footer>
    </div>
  );
}
