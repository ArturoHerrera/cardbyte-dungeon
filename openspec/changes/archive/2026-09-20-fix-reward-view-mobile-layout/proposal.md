## Why

In mobile viewports and vertical simulation mode, the 3 draft card choices in `CardRewardView.tsx` and `TreasureView.tsx` wrap into a vertical column spanning over 800px. Because the container is centered vertically without proper scrolling boundaries, the header title text is cropped by the top screen edge and the "SALTAR RECOMPENSA" (Skip Reward) action button is pushed completely off-screen.

Redesigning the mobile layout into a horizontal, swipeable selection ribbon keeps all 3 subroutine choices, the header, and the skip button fully visible and thumb-accessible within a single mobile screen height.

## What Changes

- **Horizontal Swipe/Scroll Choice Ribbon**: In mobile vertical view (`mobileViewMode` or screen `< 768px`), `CardRewardView` and `TreasureView` display the 3 card choices in a horizontal scroll row (`overflow-x-auto`, `snap-x`, `gap-3`) with compact card sizing (`scale="compact"`).
- **Persistent Unclipped Header & Footer**: The header title and the skip reward action button remain fully visible inside the viewport bounds without clipping.
- **Scroll Safeguard**: The outer view container supports `overflow-y-auto` and compact padding (`p-2 sm:p-6`) as a fallback safeguard on ultra-short screens.

## Capabilities

### New Capabilities
<!-- No new capabilities -->

### Modified Capabilities
- `mobile-ui-experience`: Add requirement for responsive draft reward and treasure vault layout in vertical mobile viewports.

## Impact

- **Modified Files**: `src/components/UI/CardRewardView.tsx`, `src/components/UI/TreasureView.tsx`.
- **Dependencies**: Zero external dependencies; uses native Tailwind CSS layout utilities.
