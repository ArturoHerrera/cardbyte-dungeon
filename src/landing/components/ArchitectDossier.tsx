import { useState } from 'react';
import { ShieldCheck, Smartphone, GraduationCap, ExternalLink, Scan } from 'lucide-react';
import { LandingTranslations } from '../i18n/locales';
import { landingAudio } from '../audio/landingAudio';

interface ArchitectDossierProps {
  t: LandingTranslations;
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0 0-3.34 1.67 1.67 0 0 0 0 3.34m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function ArchitectDossier({ t }: ArchitectDossierProps) {
  const [isScanning, setIsScanning] = useState(false);

  const handleMouseEnter = () => {
    setIsScanning(true);
    landingAudio.playBiometricScan();
  };

  const handleMouseLeave = () => {
    setIsScanning(false);
  };

  return (
    <section id="architect" className="w-full py-24 px-4 lg:px-8 border-t border-[#121f2b] bg-[#020408] relative overflow-hidden">
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#ff9f1c]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-[#00e5ff]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-widest text-[#ff9f1c] uppercase font-bold block mb-2">
            {t.architect.kicker}
          </span>
          <h2 className="text-3xl sm:text-5xl font-mono font-black tracking-tight text-white mb-4 uppercase">
            {t.architect.title}
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#ff9f1c] to-transparent mx-auto mt-4" />
        </div>

        {/* Tyrell Corp Security Clearance Dossier Frame */}
        <div className="rounded-2xl border border-[#1b2c3c] bg-gradient-to-b from-[#060e17] via-[#04080e] to-[#020407] p-6 sm:p-10 shadow-[0_0_60px_rgba(0,0,0,0.95)] relative overflow-hidden">
          {/* Dossier Header Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-8 border-b border-[#132332]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#ff9f1c]" />
              <span className="text-xs font-mono tracking-widest text-[#ff9f1c] font-bold">
                {t.architect.badgeTitle}
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 bg-[#070e17] px-2.5 py-1 rounded border border-[#152535]">
              {t.architect.authId}
            </span>
          </div>

          {/* Main 2-Column Content Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center md:items-start">
            {/* Left Column: Portrait with Interactive Biometric Scan (Span 5) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleMouseEnter}
                className="relative rounded-2xl p-1 bg-gradient-to-b from-[#ff9f1c]/40 via-[#1a3449] to-[#00e5ff]/40 shadow-[0_0_35px_rgba(0,0,0,0.9)] cursor-pointer group transition-transform duration-500 hover:scale-[1.02]"
              >
                {/* Photo Viewport Container */}
                <div className="relative w-64 sm:w-72 h-96 sm:h-[420px] rounded-xl overflow-hidden bg-[#03060a]">
                  {/* Arturo's Portrait */}
                  <img
                    src="/assets/architect.jpg"
                    alt={t.architect.name}
                    className="w-full h-full object-cover object-center filter saturate-[1.08] contrast-[1.05] transition-all duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Subtle Scanlines over the portrait */}
                  <div className="absolute inset-0 crt-overlay opacity-30 pointer-events-none" />

                  {/* Biometric Laser Scanline (Active on hover/tap) */}
                  {isScanning && (
                    <>
                      {/* Laser Beam Horizontal Line */}
                      <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff9f1c] to-transparent shadow-[0_0_15px_#ff9f1c,0_0_25px_#00e5ff] biometric-laser-line pointer-events-none z-20" />

                      {/* Optical Grid Scan Overlay */}
                      <div className="absolute inset-0 bg-[#00e5ff]/5 pointer-events-none z-10 animate-pulse" />
                    </>
                  )}

                  {/* Top Status Overlay Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono z-20 pointer-events-none">
                    <span className="flex items-center gap-1.5 bg-[#020509]/85 text-[#00e5ff] px-2 py-0.5 rounded border border-[#00e5ff]/30 backdrop-blur-sm">
                      <Scan className="w-3 h-3 text-[#00e5ff]" />
                      <span>{isScanning ? 'SCANNING...' : 'VOIGHT-KAMPFF'}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-[#020509]/85 text-[#00ff66] px-2 py-0.5 rounded border border-[#00ff66]/30 backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-ping" />
                      <span>LIVE</span>
                    </span>
                  </div>

                  {/* Bottom Verification Strip */}
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#020408] via-[#020408]/90 to-transparent z-20">
                    <p className="text-[10px] font-mono text-[#ff9f1c] font-bold tracking-wider">
                      {isScanning ? t.architect.scanStatus : t.architect.scanPrompt}
                    </p>
                  </div>
                </div>
              </div>

              <span className="mt-3 text-[11px] font-mono text-slate-500 tracking-wider text-center">
                // HOVER TO TRIGGER RETINAL SCAN
              </span>
            </div>

            {/* Right Column: Bio, Credentials & LinkedIn Action (Span 7) */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="text-3xl sm:text-4xl font-mono font-black text-white tracking-wide mb-1 uppercase">
                  {t.architect.name}
                </h3>
                <p className="text-sm font-mono text-[#00e5ff] font-semibold mb-5">
                  {t.architect.role}
                </p>

                {/* Experience & Education Badges */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 mb-6">
                  <span className="inline-flex items-center gap-2 text-xs font-mono text-slate-200 bg-[#081522] border border-[#1a354c] px-3.5 py-1.5 rounded-lg">
                    <Smartphone className="w-4 h-4 text-[#ff9f1c]" />
                    <span>{t.architect.experience}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs font-mono text-slate-200 bg-[#081522] border border-[#1a354c] px-3.5 py-1.5 rounded-lg">
                    <GraduationCap className="w-4 h-4 text-[#00e5ff]" />
                    <span>{t.architect.education}</span>
                  </span>
                </div>

                {/* Bio Narrative */}
                <div className="space-y-4 text-slate-300 font-cyber text-sm sm:text-base leading-relaxed mb-6">
                  <p>{t.architect.bioP1}</p>
                  <p className="text-slate-400">{t.architect.bioP2}</p>
                </div>

                {/* Skills Chips */}
                <div className="mb-8">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest block mb-2">
                    // TECHNICAL DOMAINS & CRAFT
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {t.architect.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono text-slate-300 bg-[#050e16] border border-[#142636] px-2.5 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: LinkedIn + GitHub */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#122332]">
                <a
                  href="https://www.linkedin.com/in/arturo-herrera0792/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => landingAudio.playClick(1400)}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg font-mono text-xs sm:text-sm font-bold tracking-wider bg-[#0077b5] hover:bg-[#0096e6] text-white shadow-[0_0_25px_rgba(0,119,181,0.45)] transition-all hover:scale-105 active:scale-95 group cursor-pointer"
                >
                  <LinkedInIcon className="w-4 h-4 fill-current transition-transform group-hover:scale-115" />
                  <span>{t.architect.linkedInCta}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <a
                  href="https://github.com/ArturoHerrera/cardbyte-dungeon"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => landingAudio.playClick(1000)}
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-lg font-mono text-xs sm:text-sm font-bold tracking-wider text-slate-300 border border-[#21405a] hover:border-slate-300 hover:text-white bg-[#06121d] transition-all cursor-pointer"
                >
                  <GitHubIcon className="w-4 h-4 fill-current" />
                  <span>{t.architect.githubCta}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Dossier Serial Hash Barcode */}
          <div className="mt-10 pt-4 border-t border-[#101f2d] flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-[#43596d]">
            <span>HASH: 0xARTURO_HERRERA_0792_SYS_AUTH_VERIFIED</span>
            <div className="flex gap-0.5 opacity-70">
              {Array.from({ length: 32 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-3.5 inline-block ${i % 3 === 0 ? 'w-1 bg-[#43596d]' : 'w-0.5 bg-[#1b2b3a]'}`}
                />
              ))}
            </div>
            <span>CLEARANCE: LEVEL_05_ARCHITECT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
