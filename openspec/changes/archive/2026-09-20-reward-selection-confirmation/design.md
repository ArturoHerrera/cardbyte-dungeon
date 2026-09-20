## Context

See `proposal.md` for motivation. In `CardRewardView.tsx` and `TreasureView.tsx`, `CardView` was passed without `isFocused` and `onFocus` props. In `mobileViewMode`, `CardView` strictly delegates tap/click to focusing unless `isFocused` is true.

## Goals / Non-Goals

**Goals:**
- Provide stateful focus tracking (`selectedCardId: string | null`) in `CardRewardView` and `TreasureView`.
- Wire `isFocused={selectedCardId === card.id}` and `onFocus={() => setSelectedCardId(card.id)}` to each `CardView`.
- Render a dedicated confirm button (`[ INSTALAR SUBRUTINA ]` / `[ INSTALL SUBROUTINE ]`) when a card is selected.
- Allow double-tapping / second click on the focused card to trigger confirmation as well (`onPlay={() => handleConfirmSelection(card)}`).
- Maintain full localization (English and Spanish) for new action labels.

**Non-Goals:**
- Alter combat card interaction logic or card catalog generation.

## Decisions

### 1. Stateful Selection in Reward Panels
- **Decision**: Introduce `const [selectedCardId, setSelectedCardId] = useState<string | null>(null);` in `CardRewardView` and `TreasureView`.
- **Rationale**: Decouples card inspection/focus from irreversible deck mutation, preventing accidental card additions.

### 2. Action Bar Layout
- **Decision**: The footer action bar displays two buttons when a card is focused:
  1. Primary Confirm Button (`bg-gradient-to-r from-cyan-600 to-cyan-500` or `from-purple-600 to-purple-500` in Treasure): "INSTALAR SUBRUTINA" with `Download` or `Check` icon.
  2. Secondary Skip Button: "SALTAR RECOMPENSA" / "OMITIR BÓVEDA".
  If no card is focused, the primary button is either hidden or in a disabled state indicating "SELECCIONA UNA SUBRUTINA".
- **Alternatives considered**:
  - Only double-click without a button: Hard to discover on mobile touchscreens without visual affordance.

### 3. Audio Triggers
- **Decision**: `UI_CLICK` on card tap (focus) and on skip. `CARD_INJECT` on confirmed installation.

## Risks / Trade-offs

- **[Risk] Screen space on compact mobile screens** → **Mitigation**: Action buttons sit side-by-side or stacked in a compact flex container (`flex flex-col sm:flex-row items-center justify-center gap-2`), maintaining full visibility.
