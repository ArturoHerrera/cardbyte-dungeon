## Why

A comprehensive technical audit revealed subtle performance bottlenecks, memory leak vulnerabilities, and edge-case bugs across the audio engine, state store, UI lifecycles, and persistence layers:
1. Procedural Web Audio oscillator and gain nodes are never disconnected (`.disconnect()`) after playback finishes, causing audio thread subgraphs to linger in browser memory.
2. Background tab switching pauses audio elements but leaves the Web Audio context active, consuming battery and CPU cycles on mobile devices.
3. The Zustand store accumulates unlimited `combatLog` messages, and does not evaluate enemy poison fatalities at the end of enemy turns (resulting in soft-locks where a 0 HP enemy remains alive).
4. Component lifecycle cleanup is missing for touch gesture timers (`CardView`) and notification timers (`RomDumpModal`), leading to post-unmount task execution and closure retention.
5. ROM dump import lacks payload schema sanity validation, making the app vulnerable to unrecoverable white/black-screen crashes on corrupted or malformed saves.

Resolving these issues ensures long-term runtime stability, optimal mobile battery efficiency, and airtight state integrity.

## What Changes

- **Audio Engine**:
  - Automatically disconnect transient `AudioNode` instances (oscillators, gains, biquad filters) upon completion via `onended` callbacks in `ProceduralSynth`.
  - Suspend `AudioContext` when document visibility switches to `hidden` and resume on `visible`.
- **Combat & State Management**:
  - Bound `combatLog` to a finite circular buffer (max 60 entries) to halt unbounded array growth and prevent redundant render cloning overhead.
  - Check enemy HP after poison damage resolution in `endTurn()` to properly trigger victory or reward transitions.
  - Reset transient combat slice state (`enemy`, `hand`, `drawPile`, `discardPile`, `playerStatusEffects`) cleanly when runs conclude or restart.
- **Component Lifecycle & UI Performance**:
  - Add unmount timer cleanups in `CardView` (`longPressTimerRef`) and `RomDumpModal`.
  - Use `useShallow` from `zustand/react/shallow` in `TopBar` to prevent re-rendering on unrelated store state updates.
- **Data Persistence**:
  - Validate schema structure in `importDump()` before applying profiles or active runs.

## Capabilities

### New Capabilities
<!-- None: all changes fit under existing capabilities -->

### Modified Capabilities
- `cyber-audio-system`: Add requirements for explicit Web Audio node lifecycle disposal upon completion and battery-efficient context suspension in background tabs.
- `combat-engine`: Require bounded telemetry log retention and deterministic end-of-turn status effect death resolution.
- `data-persistence`: Require structural schema validation on imported ROM dump payloads before restoring state.

## Impact

- **Affected files**:
  - [proceduralSynth.ts](file:///home/josear/dev/cardbyte-dungeon/src/audio/proceduralSynth.ts)
  - [audioManager.ts](file:///home/josear/dev/cardbyte-dungeon/src/audio/audioManager.ts)
  - [cardByteStore.ts](file:///home/josear/dev/cardbyte-dungeon/src/store/cardByteStore.ts)
  - [storageAdapter.ts](file:///home/josear/dev/cardbyte-dungeon/src/engine/storageAdapter.ts)
  - [CardView.tsx](file:///home/josear/dev/cardbyte-dungeon/src/components/Combat/CardView.tsx)
  - [RomDumpModal.tsx](file:///home/josear/dev/cardbyte-dungeon/src/components/UI/RomDumpModal.tsx)
  - [TopBar.tsx](file:///home/josear/dev/cardbyte-dungeon/src/components/UI/TopBar.tsx)
- **Dependencies**: No external packages needed (`zustand/react/shallow` is already included in `zustand`).
- **Breaking changes**: None. Backward compatible with existing valid player saves.
