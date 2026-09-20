## Why

The combat interface currently relies on generic Lucide icons (`Swords`, `Shield`, `Zap`) inside minimal card containers. While functionally sound, it lacks the visual punch, evocative cyberpunk atmosphere, and tactical identity expected of a modern cyberpunk roguelike deckbuilder. Introducing custom, high-fidelity card artwork for each subroutine alongside an upgraded holo-cartridge bezel, interactive foil sheen for upgraded/rare subroutines, and distinct visual hierarchy will dramatically improve player engagement and immersion.

## What Changes

- **Dedicated Subroutine Artwork**: Generate and integrate thematic, high-definition cyberpunk artworks for all 10 distinct subroutines (`Logic Spike`, `ICE-Buffer`, `ICE-Breaker`, `Logic Worm`, `Packet Jam`, `Overclock`, `System Purge`, `Bruteforce`, `Execute`, `Neuro-Toxin`, and `Firewall Aura`).
- **Cyberdeck Cartridge Bezel & Styling**: Redesign the card chassis with futuristic hardware details, beveled art frame, technical metadata chips, and action badges.
- **Holographic & Foil Visual Feedback**: Add subtle CSS holographic shine / chromatic sheen to upgraded (`+`) and rare subroutines.
- **Asset Optimization & Fallback Integrity**: Store artwork assets locally in compact, modern web format (WebP) with CSS fallbacks ensuring instantaneous offline loading without latency.
- **Codex & Documentation Synchronization**: Update the Operator Codex (`en.ts` and `es.ts`) with holographic cartridge lore and synchronize `README.md` and `cardbyte_dungeon_openspec.md`.

## Capabilities

### New Capabilities
<!-- No brand new game system capability is introduced; this modifies visual delivery within combat -->

### Modified Capabilities
- `combat-engine`: Extend visual inspection and rendering requirements to require unique thematic subroutine artwork, cartridge framing, and holographic foil indicators on upgraded/rare cards without occluding combat telemetry.

## Impact

- **Affected Code**: `src/components/Combat/CardView.tsx`, `public/assets/cards/` (or `src/assets/cards/`), `src/index.css` (glow, foil, and animation tokens).
- **Zero Breaking Gameplay Changes**: The mathematical combat engine, card costs, status effects, and localization keys remain fully preserved.
