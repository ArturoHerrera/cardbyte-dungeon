## Context

See `proposal.md` for motivation and background.

Currently in `CardRewardView.tsx` and `TreasureView.tsx`, the 3 draft cards use `flex-wrap`. In mobile portrait viewports (max-w-[430px]), the cards wrap into an 800px+ vertical column. Combined with `justify-center` without vertical scroll constraints, the top title is cropped and the bottom skip button overflows out of view.

## Goals / Non-Goals

**Goals:**
- Eliminate vertical cropping on mobile screens in `CardRewardView` and `TreasureView`.
- Render the 3 card choices in a horizontal swipe ribbon (`overflow-x-auto`, `snap-x`, `gap-3`) with compact scaling (`scale="compact"`).
- Guarantee the header text and the skip action button remain 100% visible inside the single viewport height.
- Add audio feedback (`CARD_INJECT` on choice, `UI_CLICK` on skip).

**Non-Goals:**
- Alter draft card generation logic or random seeding.

## Decisions

### 1. Horizontal Swipe Ribbon with Compact Cards on Mobile
- **Decision**: In `CardRewardView.tsx` and `TreasureView.tsx`:
  - When `mobileViewMode` is active:
    - Card container uses `w-full flex items-center justify-start sm:justify-center gap-3 sm:gap-6 overflow-x-auto py-2 px-2 snap-x snap-mandatory`.
    - Each `CardView` uses `scale={mobileViewMode ? 'compact' : 'normal'}` and `snap-center shrink-0`.
- **Rationale**: Keeps total height under ~450px so header, choices, and skip action button all fit comfortably within mobile viewports (e.g. 667px - 844px) without needing vertical scrolling.
- **Alternatives considered**:
  - Vertical list with vertical scrollbar: Requires massive scrolling, hides the skip button at the bottom, and feels tedious for choosing 1 of 3 cards.

### 2. Viewport Frame & Scroll Boundary Safety
- **Decision**: Set the outer container to `w-full h-full flex flex-col items-center justify-center p-2 sm:p-6 overflow-y-auto select-none relative`. The inner panel uses compact padding `p-3 sm:p-6`.
- **Rationale**: On extremely short mobile screens (e.g. landscape or small phones), `overflow-y-auto` provides a safety net preventing any element from being clipped.

### 3. Audio Interaction Feedback
- **Decision**: Trigger `audioManager.playSfx('CARD_INJECT')` when a card is selected, and `audioManager.playSfx('UI_CLICK')` when skip is pressed.
- **Rationale**: Consistently reinforces the tactile sensation of committing a subroutine to the deck ROM.

## Risks / Trade-offs

- **[Risk] Horizontal overflow indicator visibility** → **Mitigation**: Cards use `snap-center shrink-0` and the first card is slightly offset so users see the edge of the second and third card, naturally indicating swipeability.
