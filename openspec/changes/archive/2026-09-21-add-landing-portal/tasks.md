## 1. Multi-Page Architecture Setup

- [x] 1.1 Migrate existing `index.html` to `game.html` and verify the game still mounts `/src/main.tsx` correctly
- [x] 1.2 Update `vite.config.ts` with multi-page rollup inputs (`index.html` and `game.html`) and verify `npm run build` succeeds
- [x] 1.3 Create new `index.html` configured for the landing portal mounting `/src/landing/main.tsx`

## 2. Core Foundations: Audio & Locale Engine

- [x] 2.1 Implement `src/landing/i18n/locales.ts` containing complete English and Spanish copy for all landing sections and verify translations resolve correctly
- [x] 2.2 Implement `src/landing/audio/landingAudio.ts` with procedural ambient synth drone, mechanical click effects, and mute state management
- [x] 2.3 Implement top navigation bar with live audio toggle, diegetic ROM language switcher, and direct "JACK IN" link

## 3. Hero & In-Universe Showcase

- [x] 3.1 Implement `src/landing/components/HeroCRT.tsx` with scanlines, flickering CRT styling, telemetry badges, and typewriter effect
- [x] 3.2 Implement `src/landing/components/RomCartridges.tsx` rendering physical-style ROM cartridge cards for Spanish and English grimoires with release download triggers

## 4. Genesis & Technical Radiography

- [x] 4.1 Implement `src/landing/components/GenesisStory.tsx` detailing the 48-hour AI experiment, cyberpunk inspiration, and design philosophy
- [x] 4.2 Implement `src/landing/components/TechRadiography.tsx` detailing React 19, Tailwind v4, Zustand, WebAudio, and mobile-first architecture with repository links

## 5. Operator Identity & Verification

- [x] 5.1 Implement `src/landing/components/OperatorBadge.tsx` displaying Arturo Herrera's cyber security ID credential, Android experience, AI studies, and LinkedIn link
- [x] 5.2 Assemble `src/landing/LandingApp.tsx` integrating all sections into a seamless responsive layout
- [x] 5.3 Run production build `npm run build` and verify with preview that both `/` (Landing) and `/game.html` (Game) operate without errors or asset cross-contamination
