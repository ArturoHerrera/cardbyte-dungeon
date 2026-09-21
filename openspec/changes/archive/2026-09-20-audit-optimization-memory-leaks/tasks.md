## 1. Web Audio API Lifecycle & Power Optimization

- [x] 1.1 Implement explicit `AudioNode.disconnect()` in `ProceduralSynth.ts` using `onended` callbacks for all sound effect branches, and verify via TypeScript compile and sound test
- [x] 1.2 Add `suspend()` and `resume()` methods to `ProceduralSynth` and connect them to document `visibilitychange` in `AudioManager.ts`, verifying that background tab changes cleanly suspend/resume the audio context

## 2. Combat Engine & Zustand Store Integrity

- [x] 2.1 Enforce `MAX_COMBAT_LOGS = 60` bounded buffer in `cardByteStore.ts` and `combatEngine.ts`, verifying that log arrays do not exceed 60 items
- [x] 2.2 Add enemy HP evaluation after poison resolution in `cardByteStore.endTurn()`, ensuring that poison deaths immediately trigger reward/victory handling
- [x] 2.3 Implement clean state reset of transient combat variables (`enemy`, `hand`, `drawPile`, `discardPile`, `playerStatusEffects`) upon run conclusion or initialization in `cardByteStore.ts`

## 3. Component Lifecycle & Subscription Optimizations

- [x] 3.1 Add component unmount cleanup for `longPressTimerRef` in `src/components/Combat/CardView.tsx`
- [x] 3.2 Add cleanup for feedback timeouts in `src/components/UI/RomDumpModal.tsx`
- [x] 3.3 Optimize `TopBar.tsx` store subscription with `useShallow` from `zustand/react/shallow` to eliminate redundant renders from combat log and battle state updates

## 4. Persistence & Validation

- [x] 4.1 Add structural schema sanity checks to `localStorageAdapter.importDump()` in `src/engine/storageAdapter.ts` to reject corrupt or incomplete saves before persisting
- [x] 4.2 Run TypeScript verification (`npx tsc --noEmit`) and production build check (`npm run build`) to confirm full code and system integrity
