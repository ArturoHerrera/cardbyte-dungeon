## Why

In `CardRewardView.tsx` and `TreasureView.tsx`, clicking or tapping a card choice in mobile viewmode fails to select the subroutine because `CardView` enforces a two-step `focus then play` protocol (`mobileViewMode && isFocused`) without receiving `isFocused` or `onFocus` props from the reward containers. Furthermore, players need a deliberate confirmation step when choosing subroutines so they do not inadvertently draft a card by accident on touchscreens.

## What Changes

- **Card Focus & Inspection in Reward Views**: Tapping a draft card in `CardRewardView` and `TreasureView` focuses the card, highlighting it with an elevated neon outline without immediately committing it.
- **Explicit Confirmation Action**: When a card is focused, a prominent action button ("INSTALAR SUBRUTINA" / "INSTALL SUBROUTINE") appears alongside the skip button, allowing the player to deliberately install the card.
- **Double-Tap / Direct Play Compatibility**: Tapping the already-focused card a second time also confirms and installs the subroutine.
- **Audio Feedback**: Plays `UI_CLICK` when focusing a card, `CARD_INJECT` when confirming/installing, and `UI_CLICK` when skipping.

## Capabilities

### New Capabilities
<!-- No new capabilities -->

### Modified Capabilities
- `mobile-ui-experience`: Update `Responsive Subroutine Reward and Vault Layout` requirement to require two-step focus-and-confirm interaction for draft subroutine selection.

## Impact

- **Modified Files**:
  - `src/components/UI/CardRewardView.tsx`
  - `src/components/UI/TreasureView.tsx`
  - `src/locales/en.ts`
  - `src/locales/es.ts`
- **Dependencies**: None.
