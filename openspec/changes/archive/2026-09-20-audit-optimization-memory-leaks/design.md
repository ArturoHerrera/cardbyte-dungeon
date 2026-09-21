## Context

See [proposal.md](file:///home/josear/dev/cardbyte-dungeon/openspec/changes/audit-optimization-memory-leaks/proposal.md) for motivation. The CardByte Dungeon client relies on React 19, Zustand v5 for state management, and the native Web Audio API for procedural sound effects.

Auditing highlighted specific lifecycle gaps: Web Audio nodes remain interconnected post-playback, background tabs keep the audio thread hot, `combatLog` arrays grow infinitely in state snapshots, end-of-turn poison fatalities don't trigger the victory pipeline, and React touch/feedback timers linger past component unmounts.

## Goals / Non-Goals

**Goals:**
- Eliminate Web Audio node retention leaks using the W3C `AudioNode.disconnect()` pattern.
- Suspend `AudioContext` during document visibility `'hidden'` state to conserve mobile battery.
- Enforce bounded circular buffering on `combatLog` ($O(1)$ amortized memory footprint, max 60 entries).
- Ensure deterministic victory/reward triggering on enemy poison death during `endTurn()`.
- Dispose React timers in `CardView` and `RomDumpModal` on unmount.
- Optimize high-frequency subscriber components (`TopBar`) using `useShallow` from `zustand/react/shallow`.
- Add schema validation to `localStorageAdapter.importDump()`.

**Non-Goals:**
- Refactoring the entire combat engine or changing damage formulas.
- Adding third-party audio or state libraries (everything is handled using native Web APIs and existing dependencies).
- Breaking existing saved runs or profiles.

## Decisions

### 1. Web Audio Node Disconnection via `onended`
- **Decision**: Connect an `onended` handler to the primary `OscillatorNode` in each `ProceduralSynth.playSfx` branch to invoke `.disconnect()` on all nodes in that transient subgraph.
- **Alternatives considered**:
  - *`setTimeout` disconnection*: Prone to race conditions and timer throttling in background tabs. `onended` is triggered directly by the Web Audio clock thread.
  - *Node pooling*: Overkill and complex for lightweight procedural chimes and clicks; modern browser audio engines collect disconnected nodes instantly.

### 2. AudioContext Lifecycle Management
- **Decision**: Wire `document.addEventListener('visibilitychange')` in `AudioManager` to also invoke `this.synth.suspend()` and `this.synth.resume()`.
- **Alternatives considered**:
  - *Leaving synth running*: Wastes CPU cycles on mobile devices running continuous audio context clocks in background tabs.

### 3. Bounded Telemetry Buffer
- **Decision**: Introduce a `MAX_COMBAT_LOGS = 60` constant in `cardByteStore.ts` and `combatEngine.ts`. When pushing new logs, use `.slice(-(MAX_COMBAT_LOGS - 1))` before appending.
- **Alternatives considered**:
  - *Separate log store*: Unnecessary architectural complexity; keeping it bounded in state snapshots preserves immutability and undo/dump capabilities without memory bloat.

### 4. Poison Death Resolution in `endTurn()`
- **Decision**: In `cardByteStore.endTurn()`, evaluate `if (nextState.enemy.hp <= 0)` immediately following `executeEnemyTurn()`. If dead, route to `TUTORIAL_VICTORY`, `VICTORY`, or `CARD_REWARD` identically to `playCard()`.
- **Alternatives considered**:
  - *Resolving in combatEngine*: `combatEngine` is a pure function returning state snapshots, while the store controls screen navigation, modal openings, and storage clearing. The check belongs in `endTurn()` in `cardByteStore`.

### 5. Component Lifecycle Cleanup
- **Decision**: Add `useEffect` cleanup in `CardView.tsx` to clear `longPressTimerRef.current`. In `RomDumpModal.tsx`, store feedback timeout IDs in a ref and clear them in the component's cleanup return.
- **Alternatives considered**:
  - *Ignore unmount warnings*: Degrades code quality and keeps stale closures alive in memory.

### 6. Zustand Subscription Optimization with `useShallow`
- **Decision**: In `TopBar.tsx`, wrap the store selector with `useShallow` from `zustand/react/shallow` so that updates to `combatLog`, `hand`, or combat snapshot state do not trigger TopBar re-renders.
- **Alternatives considered**:
  - *Individual atomic selectors*: Creates 15+ separate hook calls; `useShallow` provides equivalent render-skipping with a single clean object selector.

### 7. ROM Dump Schema Validation
- **Decision**: Validate that parsed import objects contain valid `profile` object properties and, if `activeRun` is present, valid `map.nodes` and `masterDeck` arrays before writing to `localStorage`.
- **Alternatives considered**:
  - *Try-catch alone*: Fails to catch logical omissions that cause subsequent runtime crashes when reading undefined map nodes.

## Risks / Trade-offs

- **[Risk] Audio glitches on rapid visibility toggles** → **Mitigation**: Guard `synth.suspend()` and `synth.resume()` with state checks (`ctx.state === 'running'` / `'suspended'`) and catch promise rejections.
- **[Risk] Missed logs for long historical reviews** → **Mitigation**: 60 entries provides plenty of scrollback for combat telemetry while keeping memory bounded. Full run stats are preserved in profile history.
- **[Risk] Rejection of old ROM dumps** → **Mitigation**: Make schema validation forgiving for optional fields while strictly requiring critical run structures (`map.nodes`, `masterDeck`).
