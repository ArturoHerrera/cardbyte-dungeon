## 1. Localization Strings

- [x] 1.1 Add `installSubroutine` and `selectSubroutinePrompt` translation keys to `src/locales/en.ts` and `src/locales/es.ts` and verify with TypeScript checks

## 2. CardRewardView Confirmation Workflow

- [x] 2.1 In `src/components/UI/CardRewardView.tsx`, add `selectedCardId` state, pass `isFocused` and `onFocus` to `CardView`, and bind `onPlay` to confirm the selected card
- [x] 2.2 In `src/components/UI/CardRewardView.tsx`, render a primary "INSTALL SUBROUTINE" confirm button when a card is focused alongside the skip button

## 3. TreasureView Confirmation Workflow

- [x] 3.1 In `src/components/UI/TreasureView.tsx`, add `selectedCardId` state, pass `isFocused` and `onFocus` to `CardView`, and bind `onPlay` to confirm the selected card
- [x] 3.2 In `src/components/UI/TreasureView.tsx`, render a primary "INSTALL SUBROUTINE" confirm button when a card is focused alongside the skip button

## 4. Verification & Validation

- [x] 4.1 Run `npm run build` to verify zero TypeScript/CSS build errors
- [x] 4.2 Test in browser to verify that tapping a card focuses it without accidental drafting, clicking "INSTALL SUBROUTINE" commits it to the deck, and double-tapping also confirms
