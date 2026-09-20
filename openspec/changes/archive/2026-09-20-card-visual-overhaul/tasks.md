## 1. Asset Generation & Directory Setup

- [x] 1.1 Create `public/assets/cards/` asset directory and generate high-definition cyberpunk artworks in WebP format for starter subroutines (`logic_spike.webp`, `ice_buffer.webp`, `ice_breaker.webp`); verify files exist on disk.
- [x] 1.2 Generate dedicated cyberpunk artworks in WebP format for intermediate and rare subroutines (`logic_worm.webp`, `packet_jam.webp`, `overclock.webp`, `system_purge.webp`, `bruteforce.webp`, `execute.webp`, `neuro_toxin.webp`, `firewall_aura.webp`); verify files exist on disk.

## 2. CardView Component Enhancement

- [x] 2.1 In `src/components/Combat/CardView.tsx`, map card keys to their generated artwork paths with fallback detection (`onError`), retaining the theme icons gracefully when images are unavailable; verify rendering without layout distortion.
- [x] 2.2 In `src/components/Combat/CardView.tsx`, overhaul the card frame with cyberdeck cartridge bezels, action type headers, and glowing borders; verify visual structure in compact and normal scales.
- [x] 2.3 Add CSS holographic foil sheen effects to `src/index.css` for upgraded (`+`) and rare subroutines with `@media (prefers-reduced-motion: reduce)` support; verify visual sheen on hover.

## 3. Codex & Documentation Synchronization

- [x] 3.1 Update `src/locales/en.ts` and `src/locales/es.ts` with Operator Codex entries for Holographic Subroutine Cartridges and visual tiers; verify translation keys.
- [x] 3.2 Update `README.md` (English & Spanish) and `cardbyte_dungeon_openspec.md` documenting the holographic card aesthetics and artwork integration; verify Markdown integrity.

## 4. Build & Visual Verification

- [x] 4.1 Run TypeScript type check (`npx tsc --noEmit`) and production build (`npm run build`) to ensure zero errors.
- [x] 4.2 Validate the card visual overhaul in browser session across combat hand, card reward modal, and deck view modal, ensuring non-occlusive hand hover.
