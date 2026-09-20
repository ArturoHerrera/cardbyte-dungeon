import React, { useEffect } from 'react';
import { useCardByteStore } from '../../store/cardByteStore';
import { TUTORIAL_STEPS } from '../../data/tutorialScenario';
import { t } from '../../locales';
import { Terminal, HelpCircle } from 'lucide-react';

export const TutorialGuideOverlay: React.FC = () => {
  const {
    locale,
    isTutorial,
    tutorialStepIndex,
    setTutorialStepIndex,
    enemy,
    turnPhase,
  } = useCardByteStore();


  useEffect(() => {
    if (!isTutorial || !enemy) return;

    // Evaluate progression based on combat state
    if (tutorialStepIndex === 1) {
      // Advance to step 2 once player has attacked and enemy took damage
      if (enemy.hp < 24) {
        setTutorialStepIndex(2);
      }
    } else if (tutorialStepIndex === 2) {
      // Step 2 is active until enemy turn finishes or player has played defend and ended turn
      if (turnPhase === 'ENEMY') {
        // transitioning
      } else if (enemy.hp <= 12) {
        setTutorialStepIndex(3);
      }
    } else if (tutorialStepIndex === 3) {
      if (enemy.statusEffects['VULNERABLE'] || enemy.hp <= 6) {
        setTutorialStepIndex(4);
      }
    }
  }, [isTutorial, tutorialStepIndex, enemy?.hp, enemy?.statusEffects, turnPhase, setTutorialStepIndex]);

  if (!isTutorial) return null;

  const currentStep = TUTORIAL_STEPS.find((s) => s.stepIndex === tutorialStepIndex) || TUTORIAL_STEPS[0];

  return (
    <div className="w-full max-w-4xl mx-auto mb-2 px-3 z-30 font-mono select-none animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="bg-[#050c14]/95 border-2 border-emerald-500/80 rounded-xl p-3 shadow-[0_0_25px_rgba(16,185,129,0.3)] relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Left: Guide Avatar & Step Info */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-950/80 border border-emerald-500/50 rounded-lg flex items-center justify-center shrink-0">
            <Terminal className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                {t(locale, 'tutorial.simBadge')}
              </span>
              <span className="text-xs text-slate-400 font-bold">
                STEP {currentStep.stepIndex} / {TUTORIAL_STEPS.length}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-white mt-1 leading-snug">
              {t(locale, currentStep.instructionKey)}
            </p>
          </div>
        </div>

        {/* Right: Tactical Tip Box */}
        {currentStep.tipKey && (
          <div className="sm:max-w-xs bg-[#081622] border border-cyan-900/60 rounded-lg p-2 flex items-start space-x-2 text-[11px] text-cyan-300 shrink-0">
            <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span className="leading-tight">{t(locale, currentStep.tipKey)}</span>
          </div>
        )}
      </div>
    </div>
  );
};
