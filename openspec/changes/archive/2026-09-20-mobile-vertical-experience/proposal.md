## Why

CardByte Dungeon was designed primarily for desktop landscape viewports, causing UI truncation, cramped card ribbons, and horizontal map scrolling issues on mobile browsers. Adapting the game to an ergonomic vertical portrait format enables mobile web players to enjoy seamless roguelike runs, while desktop users gain an integrated mobile viewport preview mode for testing and alternative playstyles.

## What Changes

- **Mobile Viewport Enforcement**: On mobile devices/narrow screens, the layout locks to a vertical portrait format utilizing modern dynamic viewport height (`100dvh`) and safe-area insets.
- **Desktop Toggle for Mobile View**: Desktop view defaults to landscape but features a toggle button in the TopBar to switch into an aligned vertical smartphone emulation container that dynamically scales with window height.
- **Touch-First Card Interaction**:
  - Single tap to select/focus a card.
  - Long press (~350ms) to trigger a zoomed card inspection overlay with detailed stats, description, and haptic feedback (`navigator.vibrate`).
  - Double tap (<300ms) to play/execute the subroutine against the target ICE.
- **Ascending Cyberspace Map**: Vertical tower/spire orientation on vertical viewports (Depth 0 Intrusion at the bottom, ascending to Depth 7 Wintermute Core at the top) with automated auto-scroll centering on the operative's active node.
- **Thumb-Zone Combat HUD**: Mobile-adapted TopBar and combat status bar positioning crucial player vitals, RAM status, and the End Cycle button within natural thumb reach.

## Capabilities

### New Capabilities
- `mobile-ui-experience`: Covers vertical mobile viewport management, desktop mobile toggle preview, touch-first card interaction protocols (tap select, long-press inspection, double-tap execution), and thumb-friendly UI distributions.

### Modified Capabilities
- `matrix-progression`: Adds requirements for responsive vertical graph topology rendering and auto-scroll centering on the current layer depth.

## Impact

- **Components**:
  - `src/App.tsx`: Viewport root container, desktop mobile emulation wrapper.
  - `src/components/UI/TopBar.tsx`: Mobile toggle button in desktop mode, responsive layout and collapsed menu on narrow viewports.
  - `src/components/Combat/CardView.tsx`: Touch gesture handling (long-press timer, double-tap detection, haptic trigger).
  - `src/components/Combat/CombatView.tsx`: Overlapping card ribbon, mobile thumb-zone layout adjustments, card inspect modal.
  - `src/components/Map/CardByteGraph.tsx`: Responsive horizontal vs vertical matrix graph layouts and layer ordering.
- **Store & Persistence**: Potential UI preference for mobile view toggle on desktop stored in local storage/state.
- **Styles**: Global CSS utilities for `dvh` support and safe-area padding.
