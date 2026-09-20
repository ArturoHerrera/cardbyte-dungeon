## 1. Asset & CSS Foundations

- [x] 1.1 Verify presence and integrity of all 4 enemy WebP assets in `public/assets/enemies/`
- [x] 1.2 Add CSS utility classes in `src/index.css` for enemy scanner reticles, elite amber breach pulses, and boss matrix shimmer effects

## 2. Enemy Card Viewport Overhaul

- [x] 2.1 Upgrade `src/components/Combat/EnemyCard.tsx` with high-definition artwork viewport, cybernetic corner brackets, and scanning telemetry
- [x] 2.2 Implement elite affix and boss tier visual decorators (amber breach pulse for elites, crimson perimeter aura for Wintermute)
- [x] 2.3 Integrate graceful fallback handling to render thematic Lucide iconography if an image fails to load
- [x] 2.4 Verify telemetry anchor integration with `SysAssistAnchor` ensuring simulation protocol tutorial behaves correctly

## 3. Bilingual Codex & Documentation

- [x] 3.1 Add `hostile_constructs` entry to Operator Codex in `src/locales/en.ts` and `src/locales/es.ts`
- [x] 3.2 Update `README.md` (both English and Spanish sections) with hostile ICE classification and artwork details

## 4. Verification & Validation

- [x] 4.1 Run tests and build checks (`npm test`, `npm run build`) to ensure type safety and no regressions
- [x] 4.2 Visually verify enemy viewport presentation across standard, elite, and Wintermute boss states, as well as the tutorial simulation
