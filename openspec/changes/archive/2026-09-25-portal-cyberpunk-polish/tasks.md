## 1. Branding & Assets

- [x] 1.1 Create `public/favicon.svg` with authentic cyberpunk cyberdeck vector geometry and link it in `index.html` and `game.html`.
- [x] 1.2 Update brand title to `CARDBYTE // DUNGEON` across `TopNav.tsx`, `LandingApp.tsx`, and `locales.ts`.

## 2. Cyberpunk Typography

- [x] 2.1 Import `Rajdhani` and `Share Tech Mono` Google Fonts in `index.html` and `game.html` and configure font variables in `src/index.css`.
- [x] 2.2 Apply `font-cyber` / `font-mono` across `LandingApp.tsx` and components to eliminate generic sans-serif fallbacks.

## 3. Dynamic Multi-Quote Terminal Engine

- [x] 3.1 Expand quote anthology in `src/landing/i18n/locales.ts` with 6 iconic quotes from *Neuromancer*, *Blade Runner*, and *The Matrix* (bilingual ES/EN).
- [x] 3.2 Upgrade `HeroBladeRunner.tsx` with a continuous looping typewriter state machine (typing -> reading pause -> backspace -> next quote).

## 4. Verification & Build

- [x] 4.1 Run `npm run build` to verify clean TypeScript compilation and Vite packaging with zero errors.
- [x] 4.2 Verify continuous typewriter cycling, favicon rendering, and fonts in browser preview.
