import { ShieldCheck, Terminal, Smartphone, GraduationCap } from 'lucide-react';
import { LandingTranslations } from '../i18n/locales';
import { landingAudio } from '../audio/landingAudio';

interface OperatorBadgeProps {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function OperatorBadge({ t }: OperatorBadgeProps) {
  return (
    <section id="operator" className="w-full py-20 px-4 lg:px-8 border-t border-[#121f2b] bg-[#03060a] relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono tracking-widest text-[#00ff66] uppercase font-bold block mb-2">
            {t.operator.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-white mb-4">
            {t.operator.title}
          </h2>
        </div>

        {/* Physical Cyber ID Clearance Badge Container */}
        <div className="relative rounded-2xl border-2 border-[#1c384e] bg-gradient-to-b from-[#08131e] via-[#050b12] to-[#020508] p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_20px_rgba(0,255,102,0.1)] overflow-hidden">
          {/* Lanyard Clip Hole at Top */}
          <div className="flex justify-center -mt-6 sm:-mt-10 mb-6">
            <div className="w-24 h-4 rounded-b-md bg-[#020406] border-x border-b border-[#224460] flex items-center justify-center">
              <span className="w-10 h-1.5 rounded-full bg-[#10202e]" />
            </div>
          </div>

          {/* Badge Top Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#142636] pb-4 mb-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#00ff66]" />
              <span className="text-xs font-mono tracking-widest text-[#00ff66] font-bold">
                {t.operator.badgeTitle}
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-[#536b80] bg-[#070e17] px-2 py-0.5 rounded border border-[#142636]">
              AUTH_ID: #0792-AH
            </span>
          </div>

          {/* Main Operator Content Layout */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Holographic Avatar Box */}
            <div className="flex flex-col items-center">
              <div className="w-36 h-44 rounded-xl border border-[#00f0ff]/50 bg-gradient-to-b from-[#0e2436] to-[#04090e] flex flex-col items-center justify-center relative overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                {/* Avatar Scanlines */}
                <div className="absolute inset-0 crt-overlay pointer-events-none opacity-60" />
                <Terminal className="w-12 h-12 text-[#00f0ff] mb-2" />
                <span className="font-mono text-2xl font-black tracking-widest text-white">
                  AH
                </span>
                <span className="text-[9px] font-mono tracking-wider text-[#00ff66] mt-1 bg-[#00ff66]/10 px-2 py-0.5 rounded border border-[#00ff66]/30">
                  SYSTEM ARCHITECT
                </span>
              </div>
              <span className="mt-3 text-[10px] font-mono text-slate-500 tracking-wider">
                ONO-SENDAI PROTOCOL
              </span>
            </div>

            {/* Operator Credentials Details */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-mono font-black text-white tracking-wide mb-1">
                {t.operator.name}
              </h3>
              <p className="text-sm font-mono text-[#00f0ff] font-semibold mb-4">
                {t.operator.role}
              </p>

              {/* Badges: Android Senior + AI Student */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-5">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-[#091724] border border-[#1b344b] px-3 py-1 rounded-full">
                  <Smartphone className="w-3.5 h-3.5 text-[#00ff66]" />
                  {t.operator.experience}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-[#091724] border border-[#1b344b] px-3 py-1 rounded-full">
                  <GraduationCap className="w-3.5 h-3.5 text-[#00f0ff]" />
                  {t.operator.education}
                </span>
              </div>

              {/* Bio Summary */}
              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed mb-6">
                {t.operator.bio}
              </p>

              {/* Action Buttons: Direct LinkedIn + GitHub */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a
                  href="https://www.linkedin.com/in/arturo-herrera0792/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => landingAudio.playClick(1400)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-mono text-xs font-bold tracking-wider bg-[#0077b5] hover:bg-[#0096e6] text-white shadow-[0_0_20px_rgba(0,119,181,0.4)] transition-all hover:scale-105 active:scale-95"
                >
                  <LinkedInIcon className="w-4 h-4 fill-current" />
                  <span>{t.operator.linkedInCta}</span>
                </a>

                <a
                  href="https://github.com/ArturoHerrera/cardbyte-dungeon"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => landingAudio.playClick(1000)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-mono text-xs font-bold tracking-wider text-slate-300 border border-[#21405a] hover:border-slate-300 hover:text-white bg-[#081420] transition-all"
                >
                  <GitHubIcon className="w-4 h-4 fill-current" />
                  <span>{t.operator.githubCta}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Barcode / Hash Strip */}
          <div className="mt-8 pt-4 border-t border-[#122332] flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-[#384c5e]">
            <span>HASH: 0xARTURO_HERRERA_0792_SYS_AUTH</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 32 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-4 inline-block ${i % 3 === 0 ? 'w-1 bg-[#384c5e]' : 'w-0.5 bg-[#1d2a36]'}`}
                />
              ))}
            </div>
            <span>CLEARANCE: LEVEL_05</span>
          </div>
        </div>
      </div>
    </section>
  );
}
