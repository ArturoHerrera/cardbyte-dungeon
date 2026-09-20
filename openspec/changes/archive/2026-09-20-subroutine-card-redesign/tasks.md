## 1. Tutorial Deck Canonicalization

- [x] 1.1 Update `src/data/tutorialScenario.ts` to use canonical card names and IDs (`Logic Spike`, `ICE-Buffer`, `ICE-Breaker`, `Overclock`)
- [x] 1.2 Update tutorial step strings in `src/locales/en.ts` and `src/locales/es.ts` to reference `[Logic Spike]`, `[ICE-Buffer]`, and `[ICE-Breaker]`

## 2. CardView Component Redesign

- [x] 2.1 Refactor `src/components/Combat/CardView.tsx` with prominent neon RAM energy indicator and type-accented styling
- [x] 2.2 Implement Instant Stat Telemetry chip row (`DMG`, `BLOCK`, `VULNERABLE`, `WEAK`, `POISON`, `ENERGY`) below artwork
- [x] 2.3 Polish cyberdeck ROM cartridge bezel, description box contrast, and compact mode scaling

## 3. Codex & Documentation Alignment

- [x] 3.1 Update `holographic_cartridges` in Operator Codex (`src/locales/en.ts` and `src/locales/es.ts`) describing the stat telemetry chips
- [x] 3.2 Update `README.md` (EN & ES) with subroutine stat chip and RAM badge descriptions
- [x] 3.3 Recapture `docs/assets/combat-screen.png` showing updated combat arena with modern cards and enemy viewport

## 4. Verification & Validation

- [x] 4.1 Run `npx tsc --noEmit` and `npm run build` to guarantee type safety and successful production compilation
- [x] 4.2 Verify in browser that tutorial and standard combat render artwork without fallbacks, stat chips display accurately, and hover interactions remain smooth
