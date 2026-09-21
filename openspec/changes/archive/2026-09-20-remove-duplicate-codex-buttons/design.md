## Context

See `proposal.md` for motivation. In desktop mode, `TopBar.tsx` renders a permanent `[📖 CODEX]` button. However, `CardByteGraph.tsx` and `CombatView.tsx` also include secondary `CODEX` buttons rendered conditionally under `!mobileViewMode`.

## Goals / Non-Goals

**Goals:**
- Consolidate Codex manual access into the persistent `TopBar` header across desktop and mobile.
- Remove the local `CODEX` button from `CardByteGraph.tsx` header.
- Remove the local `CODEX` button from `CombatView.tsx` status bar.

**Non-Goals:**
- Alter the mobile menu or Title Screen codex triggers.
- Change the contents or behaviour of `OperatorCodexModal.tsx`.

## Decisions

### 1. Centralized Header Action Pattern
- **Decision**: Keep Codex exclusively in `TopBar.tsx` (on desktop as an inline toolbar button, and on mobile inside the hamburger drawer menu). Remove local buttons from child views.
- **Rationale**: Keeps screen headers focused on view-specific telemetry (e.g. `DESTINATION: CORE (DEPTH 7)` in the map, or end-turn controls in combat) and eliminates visual redundancy.

## Risks / Trade-offs

- **[Risk] Discoverability during combat** → **Mitigation**: `TopBar` is always visible at the top of the screen in combat, keeping the Codex within immediate reach at all times.
