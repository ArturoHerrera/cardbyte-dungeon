## 1. Combat Viewport & Hover Collision Fixes

- [x] 1.1 In `src/components/Combat/CombatView.tsx`, add a dedicated top padding buffer (`pt-6 pb-2`) to the hand ribbon container and assign `relative z-20` to the middle status separator.
- [x] 1.2 In `src/components/Combat/CardView.tsx`, refine card hover transform to `hover:-translate-y-2 hover:scale-[1.03]` so hovered cards remain strictly within the hand region.
- [x] 1.3 Verify in browser that hovering over any card in hand does not cross or overlap the status telemetry bar or the end-cycle button.

## 2. Typography & Readability Improvements

- [x] 2.1 In `src/components/Combat/CardView.tsx`, upgrade card description font size from `text-[10px]` to `text-[11px]` with `leading-snug`.
- [x] 2.2 Increase visual prominence and hit area of the End Cycle button (`btn-end-turn`) in `src/components/Combat/CombatView.tsx`.
- [x] 2.3 Elevate low-contrast secondary texts (`text-slate-500` -> `text-slate-400`) across terminal status labels in `CombatView.tsx`, `EnemyCard.tsx`, and `TopBar.tsx`.

## 3. Motion Accessibility & Build Verification

- [x] 3.1 In `src/index.css`, implement `@media (prefers-reduced-motion: reduce)` rules to suppress continuous bouncing and intense pulsing for users with motion sensitivity.
- [x] 3.2 Run `npm run build` to guarantee zero TypeScript or styling regressions.
- [x] 3.3 Validate the resolved combat view in the browser under 100vh constraint.
