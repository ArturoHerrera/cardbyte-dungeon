## Why

Following the visual overhaul of the player's subroutine cards (`card-visual-overhaul`), hostile ICE constructs and enemies in the combat arena still rely on simple generic Lucide icons. Upgrading hostile constructs with dedicated high-definition cyberpunk illustrations and a tactical ICE telemetry chassis elevates visual immersion, strengthens thematic hierarchy between standard constructs, elites, and the Wintermute boss, and ensures aesthetic parity across both combatants.

## What Changes

- **Hostile ICE Viewport**: Transform `EnemyCard` to feature a high-definition cyberpunk holographic viewport displaying dedicated WebP artwork for all 4 hostile archetypes (`bit_bug.webp`, `memory_brute.webp`, `daemon_cultist.webp`, `wintermute.webp`).
- **Tactical Chassis & Telemetry**: Redesign the enemy display frame with a cyberdeck ICE enclosure, tactical HUD telemetry, scanline overlays, and animated threat level indicators.
- **Elite & Boss Hierarchy**: Implement dedicated visual treatments for Elite affixes (amber pulse, thermal breach aura) and the Wintermute Matrix-God boss (crimson box glow, glitch shimmer).
- **Graceful Fallback**: Maintain robust fallback rendering to Lucide icons with cybernetic badges in case of image load failures.
- **Bilingual Codex & SysAssist Synchronization**: Add dedicated entries in the Operator Codex (`en.ts` and `es.ts`) detailing Hostile ICE classifications, and preserve `SysAssistAnchor` telemetry tooltips during the tutorial simulation.
- **Documentation & README**: Update project `README.md` in both English and Spanish documenting the Hostile ICE Constructs and Threat Telemetry system.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `combat-engine`: Update enemy presentation requirements to specify high-definition ICE construct viewports, fallback handling, hierarchy styling for elite and boss entities, and operator codex synchronization.

## Impact

- `src/components/Combat/EnemyCard.tsx`: Major visual and structure overhaul.
- `public/assets/enemies/`: Consumption of the 4 generated WebP artwork assets.
- `src/locales/en.ts` & `src/locales/es.ts`: Add `hostile_constructs` Codex entries.
- `README.md`: Bilingual documentation update.
- `src/index.css`: Add CSS styling/glow utilities for enemy scanning and boss glitch aura if required.
