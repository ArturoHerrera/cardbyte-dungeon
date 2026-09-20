## Context

During gameplay testing and audit, it was discovered that hovering over any card in the combat view hand triggers a hover transform (`hover:-translate-y-3 hover:scale-105`) that rises ~18px above the card's resting height. Because the hand ribbon has minimal top padding (`pt-2`), the card's header and top border physically overlap the status telemetry bar and the `[ FIN DE CICLO ]` / `[ END TURN ]` button. In addition, card descriptions used `text-[10px]` which causes eye strain, and certain secondary telemetry text used `text-slate-500` against deep black backgrounds failing WCAG AA contrast.

## Goals / Non-Goals

**Goals:**
- Eliminate card hover occlusion over the combat telemetry bar and end-cycle button.
- Enforce clean z-index layering (`relative z-20` on telemetry, `relative z-10` on hand).
- Increase card description font size to `text-[11px]` with comfortable line-height.
- Enhance contrast of secondary text from `text-slate-500` to `text-slate-400`.
- Implement `@media (prefers-reduced-motion: reduce)` in `index.css`.
- Maintain strict responsive 100vh viewport constraint.

**Non-Goals:**
- Altering card costs, values, damage formulas, or enemy AI behavior.
- Replacing the retro CRT visual styling.

## Decisions

### 1. Dedicated Top Padding Buffer in Hand Ribbon
- **Decision**: Update hand container in `CombatView.tsx` from `pt-2 pb-1` to `pt-6 pb-2`.
- **Rationale**: Gives 24px of breathing room above the resting cards. Any upward hover translation (even with `scale-105`) remains comfortably inside the hand ribbon, never crossing the border line.

### 2. Contained Card Hover Transform
- **Decision**: Tweak card hover in `CardView.tsx` to `hover:-translate-y-2 hover:scale-[1.03]`.
- **Rationale**: Delivers the tactile "card lift" feel without excessive vertical expansion.

### 3. Z-Index Isolation
- **Decision**: Assign `relative z-20` to the middle status separator in `CombatView.tsx` and ensure `btn-end-turn` has higher stacking precedence.
- **Rationale**: Prevents any rogue transforms or rapid mouse cursor movements from stealing click events from the end-turn button.

### 4. WCAG AA Contrast Compliance
- **Decision**: Elevate `text-slate-500` to `text-slate-400` / `#94a3b8` across telemetry labels.
- **Rationale**: Achieves > 4.5:1 contrast ratio against `#070b0e` / `#05080b` background tokens.
