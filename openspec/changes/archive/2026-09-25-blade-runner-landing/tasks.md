## 1. Assets, Styling & Audio Engine Preparation

- [x] 1.1 Copy the user-uploaded portrait to `public/assets/architect.jpg` and verify file presence and dimensions.
- [x] 1.2 Add CSS keyframe animations for ambient volumetric mist, light shafts, and biometric laser scanline in `src/index.css` and verify compile.
- [x] 1.3 Fine-tune `src/landing/audio/landingAudio.ts` with Vangelis-style analog CS-80 pad synthesizer harmonics and biometric scan sound effects, verifying synthesis methods.

## 2. Content & Internationalization

- [x] 2.1 Update `src/landing/i18n/locales.ts` with rich bilingual (ES/EN) copy covering the 48-hour AI experiment, OpenSpec workflow, book details, and Arturo Herrera's credentials.

## 3. Blade Runner Component Implementation

- [x] 3.1 Implement streamlined `TopNav.tsx` with minimalist audio indicator, language switcher, and direct Jack-In button.
- [x] 3.2 Implement `HeroBladeRunner.tsx` with volumetric mist backdrop, high-contrast typography, typewriter quote, and direct play CTA.
- [x] 3.3 Implement `GenesisSection.tsx` seamlessly unifying the 48h AI acceleration story, Gibson tribute, and tech radiography cards.
- [x] 3.4 Implement `GrimoiresSection.tsx` showcasing the canonical book cover art (`/assets/book/cover.jpg`) with 1-click download actions.
- [x] 3.5 Implement `ArchitectDossier.tsx` incorporating the nocturnal portrait, interactive biometric laser scan, credentials, and LinkedIn link.
- [x] 3.6 Assemble all components in `LandingApp.tsx` and verify cohesive visual hierarchy and generous dark space.

## 4. Verification & Build Validation

- [x] 4.1 Execute `npm run build` to verify clean TypeScript compilation and Vite bundling with zero errors.
- [x] 4.2 Verify interactive features (audio toggle, locale switch, biometric laser scan, PDF downloads, and game link) in browser preview.
