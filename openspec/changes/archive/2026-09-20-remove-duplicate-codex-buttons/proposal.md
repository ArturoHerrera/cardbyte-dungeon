## Why

In desktop mode, users see duplicate "CODEX" buttons simultaneously: one in the global persistent `TopBar` and another inside the view header of `CardByteGraph.tsx` (as well as inside `CombatView.tsx`). Removing the redundant view-level buttons and consolidating Codex access strictly in the persistent `TopBar` cleans up the desktop layout and eliminates cognitive friction.

## What Changes

- **Consolidate Codex access in TopBar**: The global `TopBar` retains the persistent `[📖 CODEX]` button accessible across all active screens.
- **Remove redundant button from CardByteGraph**: Eliminate the local `CODEX` button from the matrix map header in `src/components/Map/CardByteGraph.tsx`.
- **Remove redundant button from CombatView**: Eliminate the local `CODEX` button from the mid-screen combat status bar in `src/components/Combat/CombatView.tsx`.

## Capabilities

### New Capabilities
<!-- No new capabilities -->

### Modified Capabilities
<!-- No requirement changes; the existing tutorial-system Requirement: Operator Codex Modal already states the codex is accessible from Title Screen, Matrix Map, and Combat Screen, which TopBar satisfies -->

## Impact

- **Modified Files**:
  - `src/components/Map/CardByteGraph.tsx`
  - `src/components/Combat/CombatView.tsx`
- **Dependencies**: None.
