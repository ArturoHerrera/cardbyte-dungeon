## 1. Store Node Completion & Reconciliation Action

- [x] 1.1 In `src/store/cardByteStore.ts`, define `completeNonCombatNode()` to decrypt map progress from `currentNode.id`, update `map.currentNodeId`, set `currentNode` to the completed node, persist run state, and navigate to `'MAP'`. Verify via unit/type check.
- [x] 1.2 In `src/store/cardByteStore.ts`, add self-healing map reconciliation in `resumeRun()` and state initialization so that any active run with an un-decrypted `currentNode` automatically runs `decryptMapProgress`. Verify that saved runs resume with navigable next layers.

## 2. Non-Combat Views Integration

- [x] 2.1 In `src/components/UI/TreasureView.tsx`, update `handleSelectCard` and the "Purge & Leave" skip button to call `completeNonCombatNode()`. Verify that exiting a Treasure node transitions smoothly and updates the map.
- [x] 2.2 In `src/components/UI/RestView.tsx`, update `handleCooldown`, `handleRefactor`, and `handleExecutePurge` to call `completeNonCombatNode()`. Verify that exiting a Rest node transitions smoothly and updates the map.

## 3. Build & Browser Playtest Verification

- [x] 3.1 Run TypeScript type check (`npx tsc --noEmit`) and production bundle build (`npm run build`) to ensure zero errors.
- [x] 3.2 In the active browser session, verify that the current run immediately reveals Phase 3 (Depth 2) nodes and allows clicking the next node, fully resolving the soft-lock.
