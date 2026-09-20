## Why

Live on-device testing in mobile browsers (Brave on Android) highlighted layout flaws and touch friction: the desktop toggle was accessible on phones (violating the vertical-only rule), excessive padding pushed title stats beneath the browser navigation bar, main action button icons were left-aligned against multiline text, the vertical matrix map had wasted bottom space and mounted at Depth 7 instead of the active layer, the enemy combat intent box was truncated at the top, and double-tapping overlapping cards caused accidental subroutine executions.

## What Changes

- **Strict Mobile Portrait Lock**: Permanently hide the desktop view toggle on screens with viewport width < 768px; phone browsers are strictly locked to vertical mode with zero option to exit.
- **Title Screen Ergonomic Polish**: Compact vertical padding and margins on mobile; center button icons and labels symmetrically; ensure run stats footer is 100% visible above browser bottom toolbars without scrolling.
- **Matrix Spire Area & Focus Optimization**: Remove empty bottom margin space in `CardByteGraph.tsx`, ensuring the climbing spire fills 100% of usable height and immediately auto-scrolls down to the operative's active layer (Depth 0 on fresh run).
- **Combat Enemy Construct Scaling**: Scale down the upper enemy construct container on vertical viewports to ensure threat intent telemetry and health bars never clip against the top edge.
- **Focused Card Execution Protocol**: Replace double-tap on overlapping cards with **Tap to Focus & Elevate (`z-30`) -> Tap Focused Card or Inline "INJECT" button to Execute**, while keeping Long Press (~350ms) for high-definition modal inspection.
- **Documentation & Screenshots**: Update `README.md` in both English and Spanish documenting mobile touch controls, ergonomics, and refreshed screenshots.

## Capabilities

### Modified Capabilities
- `mobile-ui-experience`: Refines mobile viewport lock rules (hidden toggle on phones), updates touch card interaction protocol (Tap to Focus -> Tap/Button to Execute instead of double-tap), and improves combat enemy scale constraints.
- `matrix-progression`: Refines vertical matrix spire requirements to eliminate dead space and enforce immediate auto-scroll positioning on the active entry depth.

## Impact

- **Components**:
  - `src/components/UI/TopBar.tsx`: Hide mobile/desktop toggle button on mobile viewports (`hidden md:flex`).
  - `src/components/UI/TitleScreen.tsx`: Mobile padding, symmetric button alignment, and compact visible meta-stats footer.
  - `src/components/Map/CardByteGraph.tsx`: Eliminate wasted bottom spacing and guarantee mount scroll to `currentDepth`.
  - `src/components/Combat/EnemyCard.tsx` & `CombatView.tsx`: Responsive vertical enemy scaling, focused card state, and inline execute trigger.
  - `src/components/Combat/CardView.tsx`: Refactored touch listeners for single-tap focus and clean execution.
- **Documentation**: `README.md` updated with mobile screenshots and usability instructions.
