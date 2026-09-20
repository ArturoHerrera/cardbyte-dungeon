## 1. CardRewardView Mobile Horizontal Ribbon Refactor

- [x] 1.1 In `src/components/UI/CardRewardView.tsx`, update the card choices container to a horizontal scrollable ribbon (`overflow-x-auto`, `snap-x`, `gap-3`) with compact card scaling (`scale={mobileViewMode ? 'compact' : 'normal'}`) and `shrink-0 snap-center`
- [x] 1.2 In `src/components/UI/CardRewardView.tsx`, ensure the outer viewport container has `overflow-y-auto`, compact padding (`p-2 sm:p-6`), and margins so title and skip button never clip
- [x] 1.3 Add audio SFX cues (`CARD_INJECT` on select, `UI_CLICK` on skip) in `CardRewardView.tsx`

## 2. TreasureView Mobile Horizontal Ribbon Refactor

- [x] 2.1 In `src/components/UI/TreasureView.tsx`, update the card choices container to a horizontal scrollable ribbon (`overflow-x-auto`, `snap-x`, `gap-3`) with compact card scaling (`scale={mobileViewMode ? 'compact' : 'normal'}`) and `shrink-0 snap-center`
- [x] 2.2 In `src/components/UI/TreasureView.tsx`, ensure the outer viewport container has `overflow-y-auto`, compact padding (`p-2 sm:p-6`), and margins so title and skip button never clip
- [x] 2.3 Add audio SFX cues (`CARD_INJECT` on select, `UI_CLICK` on skip) in `TreasureView.tsx`

## 3. Verification & Validation

- [x] 3.1 Verify production build (`npm run build`) with zero TypeScript/CSS errors
- [x] 3.2 Visually validate CardRewardView and TreasureView on mobile viewport (390x844) to confirm headers, choices, and skip buttons are 100% visible and unclipped
