## Why

When players complete non-combat matrix nodes (Data Vault / `TREASURE` and Decompression Sites / `REST`), the game navigates back to the `MAP` screen without advancing `map.currentNodeId` or executing `decryptMapProgress`. As a result, subsequent layers remain cryptographically locked and unclickable, creating a progression soft-lock.

## What Changes

- Add a centralized `completeNonCombatNode()` action in `useCardByteStore` (or integrate node completion into the exit handlers of non-combat nodes).
- Upon selecting a card reward in `TreasureView` or skipping/purging in `TreasureView`, invoke node completion to decrypt connected nodes at depth+1/depth+2, mark the node as completed, advance `map.currentNodeId`, and persist the run.
- Upon cooling down, refactoring (upgrading), or purging a card in `RestView`, invoke node completion to decrypt connected nodes, update `map.currentNodeId`, and persist the run.
- Add an automatic state reconciliation check on `resumeRun` and `CardByteGraph` so that if an active run currently has a completed or active `currentNode` whose outgoing edges are not yet revealed, it automatically resolves accessibility and lifts the soft-lock.

## Capabilities

### Modified Capabilities
- `matrix-progression`: Update `Crypto-Fog of War and Decryption Horizon` to specify that completing ANY node (combat, treasure, or rest) decrypts downstream nodes and enables navigation to child nodes.

## Impact

- `src/store/cardByteStore.ts`: Centralize node completion logic and state recovery.
- `src/components/UI/TreasureView.tsx`: Call completion handler instead of raw `setScreen('MAP')`.
- `src/components/UI/RestView.tsx`: Call completion handler instead of raw `setScreen('MAP')`.
- `src/components/Map/CardByteGraph.tsx`: Ensure accessible node resolution gracefully handles active runs.
