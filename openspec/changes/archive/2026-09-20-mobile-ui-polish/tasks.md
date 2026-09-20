## 1. Device Detection & Strict Mobile Lock

- [x] 1.1 In `src/components/UI/TopBar.tsx`, hide the Mobile View toggle button on mobile viewports (`hidden md:flex`) so mobile phone browsers cannot exit vertical orientation
- [x] 1.2 In `src/store/cardByteStore.ts`, ensure `mobileViewMode` defaults to `true` whenever `window.innerWidth < 768`

## 2. Title Screen Layout & Button Alignment

- [x] 2.1 Refactor `src/components/UI/TitleScreen.tsx` to reduce vertical padding (`p-3 sm:p-6`) and margins (`mb-3 sm:mb-6`) so the meta-stats footer is 100% visible above mobile browser navigation bars
- [x] 2.2 Symmetrically align icons and labels in the main action buttons (Resume, Jack In, Tutorial Simulation) using a balanced slot layout to eliminate left-weight visual skew
- [x] 2.3 Format the meta-stats footer into a clean responsive row (`[INCURSIONES: 0] [VICTORIAS: 0] [FLATLINES: 0]`) without multiline text wrapping

## 3. Matrix Spire Optimization & Immediate Focus

- [x] 3.1 Remove bottom dead space in `src/components/Map/CardByteGraph.tsx` and ensure the vertical spire fills the entire height
- [x] 3.2 Implement reliable immediate auto-scroll to the operative's active layer (`activeLayerRef`) on mount so new runs never display Depth 7 at initial render

## 4. Combat Arena Scaling & Intent Header Polish

- [x] 4.1 In `src/components/Combat/EnemyCard.tsx` and `CombatView.tsx`, compact the upper enemy viewport height and artwork scale on vertical mobile mode to prevent the threat intent badge from clipping against the top edge

## 5. Hand Ribbon: Tap-to-Focus & Execution Redesign

- [x] 5.1 Remove prone-to-error double-tap logic from `src/components/Combat/CardView.tsx`
- [x] 5.2 Implement tap-to-focus protocol in `CombatView.tsx`: first tap elevates the card to `z-30` (`-translate-y-8`, neon targeting perimeter); tapping the focused card again (or an inline "INJECT" button) executes the subroutine
- [x] 5.3 Verify that 350ms long-press smoothly triggers `CardInspectModal` with tactile vibration pulse

## 6. Documentation & Screenshot Refresh

- [x] 6.1 Capture refreshed mobile vertical screenshots of the Title Screen, Matrix Map Spire, and Combat View
- [x] 6.2 Update `README.md` (both English and Spanish sections) with mobile vertical view specifications, touch interaction mechanics, and new screenshots

## 7. Verification & Testing

- [x] 7.1 Verify production build (`npm run build`) with zero TypeScript errors
- [x] 7.2 Visually validate Title Screen, Map auto-scroll, and Combat card focus execution in browser

