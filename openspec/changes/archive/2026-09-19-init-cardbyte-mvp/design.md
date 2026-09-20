## Context

See `proposal.md` for background and motivation. The project is an initial greenfield implementation of CardByte Dungeon, styled after the 1984 cyberpunk world of *Neuromancer*. Constraints include zero heavy visual/audio assets, client-side only architecture (no backend server), single-screen responsive viewport (`100vh` / `100dvh`), and deterministic RNG.

## Goals / Non-Goals

**Goals:**
- Implement a decoupled, modular state architecture in Zustand using three clear slices: `RunSlice`, `CombatSlice`, and `UISlice`.
- Provide deterministic PRNG-based matrix generation with strict connectivity and crypto-fog of war.
- Build a composable card execution pipeline (`CardAction[]`) supporting multifaceted subroutines (damage, block, status, draw, energy, self-damage).
- Build a dual-tier persistence model: active run auto-save with F5 reload recovery, plus ROM Dump export/import (Base64 string with CRC32 and `.deck` file).
- Create a retro-cyberpunk aesthetic via pure CSS/Tailwind (dark matrix, CRT scanlines, phosphor greens, cold cyans, amber highlights, crimson alerts) without sprite assets.

**Non-Goals:**
- Remote server databases, backend API endpoints, or online user accounts.
- Audio synthesis or soundtrack integration (deferred to post-MVP).
- Infinite vertical scrolling maps (strictly constrained to single-screen horizontal landscape).

## Decisions

### 1. Zustand Slice Decoupling
- **Decision:** Separate game state into `RunSlice` (persistent run data), `CombatSlice` (ephemeral battle state), and `UISlice` (screens, modals, logs).
- **Rationale:** Prevents bloated god-stores and ensures clearing a battle state doesn't mutate or leak into the persistent deck or map progress.
- **Alternatives Considered:** Single monolithic store (leads to race conditions and messy state resets) vs. React Context + useReducer (leads to excessive re-renders during animations).

### 2. Composable `CardAction[]` Pipeline
- **Decision:** Every card contains an array of atomic actions (`DAMAGE`, `BLOCK`, `APPLY_STATUS`, `DRAW`, `GAIN_ENERGY`, `SELF_DAMAGE`).
- **Rationale:** Allows building rich multi-effect cards like *Overclock* (gain RAM, draw card, take self-damage) and *Packet Jam* (block + weak) without modifying core engine logic.
- **Alternatives Considered:** Static fields (`value`, `blockValue`, `effect`) on `Card` (breaks as soon as a card does two things at once).

### 3. Progressive Crypto-Fog of War Decryption
- **Decision:** Depths 0, 1, and 7 are permanently visible; Depths 2-6 start hidden with hexadecimal noise and decrypt when preceding nodes are cleared.
- **Rationale:** Deepens tactical tension and matches the narrative of hacking through unknown matrix layers.
- **Alternatives Considered:** 100% visible map from start (standard *Slay the Spire*, less immersive for matrix hacking) vs. 1-node horizon (too blind for strategic path planning).

### 4. Dual-Tier Storage & Neural Deck Cartridge Dump
- **Decision:** Auto-save run and profile to `localStorage`, with an export/import layer yielding a CRC32-checksummed Base64 string or a `.deck` file.
- **Rationale:** Gives players resilience against tab closures while allowing frictionless save transfers across devices without server maintenance costs.
- **Alternatives Considered:** Supabase/Firebase backend (unnecessary operational complexity and login barriers for an MVP).

## Risks / Trade-offs

- [Single-Screen Viewport Overflow on Small Screens] → Enforce strict max-height constraints, fixed-size card ribbons with transform hover scaling, and an explicit 10-card hand cap.
- [Corrupted ROM Dump Payloads on Import] → Strict schema parsing with Zod or manual structural checks, wrapped in CRC32 checksum validation. Invalid data halts with terminal alert without mutating active state.
- [State Desynchronization on Combat Reload] → If the player refreshes during combat, the system rehydrates to the beginning of the combat encounter (or restores node state cleanly) to prevent duplicate card exploitation.
