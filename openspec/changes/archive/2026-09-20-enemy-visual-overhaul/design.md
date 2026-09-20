## Context

See [proposal.md](proposal.md) for motivation.
The combat view (`CombatView.tsx`) currently houses `EnemyCard.tsx`, which relies on Lucide vector icons (`Bug`, `Server`, `Flame`, `Skull`) centered inside a circular border. Player cards already use high-definition WebP illustrations with cartridge bezels and foil treatments. 4 matching high-definition 1:1 square WebP assets for enemies have been placed in `public/assets/enemies/`.
Furthermore, the Operator Codex and bilingual README must be kept in sync with the new visual construct hierarchy and telemetry chassis.

## Goals / Non-Goals

**Goals:**
- Upgrade `EnemyCard.tsx` with a central high-tech holographic viewport showcasing the archetype artwork (`bit_bug.webp`, `memory_brute.webp`, `daemon_cultist.webp`, `wintermute.webp`).
- Frame the artwork inside a cybernetic sensor enclosure with subtle scanlines, corner reticles, and archetype accent colors (Emerald for Bug, Crimson for Brute, Violet for Cultist, Golden-Red for Wintermute).
- Add distinct visual hierarchy indicators for Elite encounters (amber perimeter, hazard stripes, or thermal breach aura) and Boss Wintermute (deep crimson perimeter glow `glow-crimson`, signal shimmer).
- Maintain robust image error fallback to the styled Lucide vector iconography.
- Preserve responsive layout without breaking compact combat arena screens, and preserve `SysAssistAnchor` telemetry hooks for tutorial training.
- Update Operator Codex in `src/locales/en.ts` and `src/locales/es.ts` with lore and mechanical classification of hostile constructs.
- Document hostile ICE classification and artwork in `README.md` (EN & ES).

**Non-Goals:**
- Modifying enemy combat AI, stats, or intent calculations (handled in `enemyAi.ts` and `combatEngine.ts`).
- Adding canvas or WebGL particle engines (pure Tailwind + CSS animations suffice).

## Decisions

1. **Asset Resolution Mapping in `EnemyCard.tsx`**
   - *Choice*: Map `enemy.archetype` directly to `/assets/enemies/${filename}.webp`:
     - `BIT_BUG` -> `bit_bug.webp`
     - `MEMORY_BRUTE` -> `memory_brute.webp`
     - `DAEMON_CULTIST` -> `daemon_cultist.webp`
     - `WINTERMUTE` -> `wintermute.webp`
   - *Rationale*: Simple, deterministic, and mirrors the card artwork resolution logic in `CardView.tsx`.
   - *Alternative*: Dynamic backend asset URLs; rejected as unnecessary for offline/client-side single-player gameplay.

2. **Chassis & Viewport Composition**
   - *Choice*: Create an aspect-square (1:1) viewport window surrounded by a brushed metal / dark carbon cyber-chassis with corner brackets (`border-t-2 border-l-2`, etc.), an archetype-colored scanline overlay, and telemetry HUD tags.
   - *Rationale*: Provides a cohesive "targeting scanner" feeling fitting the cyberspace lore.

3. **Fallback Strategy with React State**
   - *Choice*: Use `const [imgError, setImgError] = useState(false);` on `<img onError={() => setImgError(true)} />`. When `imgError` is true, render the Lucide icon with a cyberpunk grid backdrop.
   - *Rationale*: Guarantees the UI never shows broken image icons or collapsed boxes if assets are missing.

4. **Codex & Documentation Architecture**
   - *Choice*: Add `hostile_constructs` under `codex.entries` in both `en.ts` and `es.ts`, and add dedicated subsection under Combat in `README.md`.
   - *Rationale*: Preserves complete documentation parity established in previous changes.

## Risks / Trade-offs

- [Viewport size squeezing on mobile / small heights] → Use responsive max-height constraints (e.g. `w-32 h-32 md:w-44 md:h-44`) with `object-cover` and rounded cybernetic corners to ensure stats, intent, and HP remain fully visible.
- [Reduced motion preference] → Respect `@media (prefers-reduced-motion: reduce)` for pulsing and glowing CSS effects.
