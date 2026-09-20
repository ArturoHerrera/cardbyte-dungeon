## Context

In `CardByte Dungeon`, progression across the 8-layer matrix DAG depends on completing the active node and running `decryptMapProgress(map, completedNodeId)`. Currently, this is only performed inside `cardByteStore.ts` upon resolving combat against an enemy. As a result, non-combat nodes (`TREASURE` and `REST`) leave `currentNode.completed = false`, leave `map.currentNodeId` pointing to an earlier node, and leave next-layer nodes encrypted (`revealed = false`), locking the player out of subsequent layers.

## Goals / Non-Goals

**Goals:**
- Provide a standardized `completeNonCombatNode()` action in `cardByteStore.ts` that runs `decryptMapProgress`, marks completion, sets `map.currentNodeId`, and saves the run.
- Update `TreasureView.tsx` (card select and purge/leave) and `RestView.tsx` (cooldown, patch/upgrade, and purge) to trigger node completion before transitioning to `MAP`.
- Provide an automatic reconciliation mechanism on `resumeRun` and inside `CardByteGraph.tsx` so that existing runs already trapped at a non-combat node are immediately unblocked without losing player run progress.

**Non-Goals:**
- Altering the loot generation tables or rest site healing/purge rules.
- Changing combat resolution or tutorial flows.

## Decisions

### Decision 1: Dedicated `completeNonCombatNode()` store action
- **Approach**: Add `completeNonCombatNode: () => void` to `cardByteStore.ts`. When called:
  - Takes `currentNode` from state.
  - Runs `decryptMapProgress(map, currentNode.id)`.
  - Sets `currentNode = updatedMap.nodes[currentNode.id]`.
  - Sets `currentScreen = 'MAP'`.
  - Calls `saveRunToStorage()`.
- **Alternative considered**: Having each component (`TreasureView`, `RestView`) import `decryptMapProgress` and manipulate map state directly. *Rejected* because state mutations and persistence must remain centralized in the store.

### Decision 2: Resilient Navigation & State Reconciliation
- **Approach**: In `resumeRun()` and `CardByteGraph.tsx`:
  - If `currentNode` is defined and `map.currentNodeId !== currentNode.id`, or if `currentNode` is at depth $D$ and its `nextIds` are not yet revealed, automatically trigger reconciliation by decrypting from `currentNode.id`.
- **Alternative considered**: Forcing the user to abandon their run and restart. *Rejected* because players should not lose active game progress due to this bug.

## Risks / Trade-offs

- **[Risk]** Accidental double-decryption if a node is exited multiple times.
  - **Mitigation**: `decryptMapProgress` is idempotent; calling it on an already completed node returns consistent state.
