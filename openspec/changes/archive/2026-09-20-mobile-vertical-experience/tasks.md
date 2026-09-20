## 1. Viewport & Container Foundations

- [x] 1.1 Add mobile viewport preference state (`mobileViewMode`) to store and configure `h-[100dvh]` root styling with safe-area padding in `src/index.css` and `src/App.tsx`
- [x] 1.2 Implement Desktop Mobile View Toggle button in `src/components/UI/TopBar.tsx` allowing desktop users to switch between standard landscape and centered portrait smartphone emulation frame
- [x] 1.3 Adapt `TopBar.tsx` for vertical mobile viewports (collapsible menu / compact vitals HUD) to avoid truncation on narrow displays

## 2. Touch Gestures & Subroutine Interaction

- [x] 2.1 Implement touch gesture detection in `src/components/Combat/CardView.tsx` (single-tap selection, 350ms long-press with haptic vibration `navigator.vibrate(40)`, and 300ms double-tap execution)
- [x] 2.2 Create `src/components/Combat/CardInspectModal.tsx` displaying enlarged artwork, detailed subroutine mechanics, and status effect breakdowns triggered by long-press
- [x] 2.3 Verify and safeguard touch scrolling so horizontal dragging across cards does not trigger accidental execution

## 3. Combat Thumb-Zone Layout Adaptation

- [x] 3.1 Refactor `src/components/Combat/CombatView.tsx` to conditionally apply vertical ergonomics (enemy upper half, compact middle telemetry bar with thumb-accessible End Turn button, bottom hand ribbon)
- [x] 3.2 Implement overlapping card spacing in hand ribbon on narrow screens to cleanly display hands of up to 10 cards without clipping

## 4. Ascending Vertical Cyberspace Map

- [x] 4.1 Update `src/components/Map/CardByteGraph.tsx` to render an ascending vertical spire (Depth 0 at bottom, Depth 7 at top) when vertical mode is active
- [x] 4.2 Update SVG network connection drawing in `CardByteGraph.tsx` to accurately connect vertical layers
- [x] 4.3 Implement auto-scroll centering in `CardByteGraph.tsx` to smoothly focus the operative's active layer upon mount or node progression

## 5. Verification & Validation

- [x] 5.1 Run test suite and build validation (`npm test`, `npm run build`) to ensure zero regressions
- [x] 5.2 Validate full flow in desktop mode, desktop-toggled mobile view, and simulated mobile viewport (390x844) across Map, Combat, Modals, and Touch gestures
