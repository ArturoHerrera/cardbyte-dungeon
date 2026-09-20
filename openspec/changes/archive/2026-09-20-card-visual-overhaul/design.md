## Context

Currently, `CardView.tsx` renders a standard card container with a generic Lucide icon inside a dark box with a simple matrix-grid background. While responsive and functional, it lacks individual graphic identity. The project philosophy is zero heavy third-party runtime dependencies, instant client-side performance, and a dark cyberpunk Ono-Sendai terminal aesthetic.

## Goals / Non-Goals

**Goals:**
- Provide a dedicated, high-impact cyberpunk artwork for every unique subroutine in the catalog.
- Introduce an elevated holographic cyberdeck ROM cartridge bezel with beveled corners and glowing circuit frames.
- Add CSS-driven holographic foil shimmer to upgraded (`+`) and rare subroutines.
- Keep assets lightweight, crisp, and bundled in `public/assets/cards/` in WebP format.
- Ensure 100% graceful fallback: if an image fails or is loading, the existing styled vector icon is shown.

**Non-Goals:**
- Full 3D WebGL rendering engine (Three.js/Canvas), which would bloat the bundle and degrade performance.
- Changing card mechanics, actions, or stats.

## Decisions

### Decision 1: Dedicated WebP Artwork Generation per Subroutine
- **Approach**: Generate 10 specialized, evocative cyberpunk illustrations matching the exact lore of each card (`Logic Spike`, `ICE-Buffer`, `ICE-Breaker`, `Logic Worm`, `Packet Jam`, `Overclock`, `System Purge`, `Bruteforce`, `Execute`, `Neuro-Toxin`, `Firewall Aura`).
- **Storage**: Place in `public/assets/cards/<card_key>.webp`.
- **Alternative considered**: Plain SVG icons. *Rejected* because they cannot provide the rich narrative texture and atmospheric depth of full digital illustration.

### Decision 2: Dual Layer Rendering (Image Artwork + Fallback Icon)
- **Approach**: In `CardView.tsx`, render an `<img>` with `onError` toggle to fallback gracefully to the thematic Lucide icon and gradient if the asset is missing or blocked.
- **Alternative considered**: Hard dependency on images with broken image placeholders. *Rejected* to maintain resilience.

### Decision 3: Holographic Shimmer via Pure CSS
- **Approach**: Use a CSS pseudo-element (`::after`) with a linear gradient at an angle (`transform: rotate(25deg)` and animated translation or sheen on hover) for cards with `upgraded: true` or `rarity === 'RARE'`.
- **Alternative considered**: Heavy JS-based canvas shaders. *Rejected* as pure CSS accomplishes smooth 60fps holographic luster with zero JS overhead.

### Decision 4: Responsive Sizing & Viewport Containment
- **Approach**: Retain the exact dimensions (`w-44 h-60` normal, `w-36 h-48` compact) so hand view elevation and layout bounds (max 10 cards) remain strictly non-occlusive.

## Risks / Trade-offs

- **[Risk]** Image assets could increase initial bundle size.
  - **Mitigation**: Encode all illustrations in high-efficiency WebP format (~15-25 KB each), totaling < 250 KB for the entire game, well within fast initial load benchmarks.
- **[Risk]** Foil animations might distract or trigger motion sensitivities.
  - **Mitigation**: Keep sheen subtle and disable active sweeps under `@media (prefers-reduced-motion: reduce)`.
