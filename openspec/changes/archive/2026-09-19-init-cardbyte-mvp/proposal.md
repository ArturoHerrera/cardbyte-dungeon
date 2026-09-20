## Why

CardByte Dungeon requires an initial Minimum Viable Product (MVP) implementation of a procedural turn-based card battler roguelike running entirely client-side. The goal is to provide fast 3-6 minute session loops across an 8-floor security matrix inspired by William Gibson's *Neuromancer* (1984), without heavy visual assets or server dependencies.

## What Changes

- **Core Game Engine**: Implement seeded PRNG (`mulberry32`), procedural DAG map generator with 8 layers and progressive decryption (crypto-fog of war), deterministic turn-based combat resolution, and composable card actions (`CardAction[]`).
- **Archetypes & AI**: Implement 3 regular enemy construct archetypes (*Bit-Bug*, *Memory-Brute*, *Daemon-Cultist*), affix modifiers, and a 4-turn cyclical boss (*AI Core // WINTERMUTE*).
- **Subroutine Deck**: Implement starter deck (4 Logic Spikes, 3 ICE-Buffers, 1 ICE-Breaker) and an 8-card draft pool with upgrade paths (`+`).
- **UI & Presentation**: Single-screen responsive layout (`100vh` / `100dvh`) with retro-cyberpunk aesthetic (CRT scanlines, orthogonal matrix grid, phosphor green, deck amber, cyan buffer, crimson alert).
- **Local Persistence & Portability**: Dual-tier storage (active run state and permanent player profile) via Zustand `persist` with `localStorage`, plus the "Neural Deck Cartridge // ROM DUMP" export/import system (Base64 Cyber-String with CRC32 and `.deck` file drag-and-drop).

## Capabilities

### New Capabilities
- `matrix-progression`: Procedural DAG matrix generation across 8 layers, connectivity invariants, boss convergence at Depth 7, and crypto-fog of war progressive decryption.
- `combat-engine`: Deterministic turn-based combat loop, Deck RAM economy, hand and deck management (L1 cache limit of 10), composable `CardAction` pipeline, and status effect multipliers (`VULNERABLE`, `WEAK`, `POISON`).
- `data-persistence`: Local storage persistence for runs and player profile, plus "Neural Deck Cartridge // ROM DUMP" import/export with CRC32 integrity validation.

### Modified Capabilities
*(None - initial greenfield MVP)*

## Impact

- **Target Stack**: React 19, Vite, TypeScript (strict mode), Zustand, Tailwind CSS, Lucide icons.
- **Dependencies**: Lucide React for vector iconography, lightweight CRC32/compression utility for ROM dumps.
- **System Footprint**: 100% browser client-side, zero external backend services, zero heavy image/audio assets.
