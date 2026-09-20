## Why

During a design and accessibility audit, visual collisions and readability hurdles were identified: hovered cards in the combat viewport expand upward and overlap the status/telemetry bar and end-turn action, card descriptions have cramped font sizes (`10px`), and certain telemetry text colors lack sufficient contrast against dark background surfaces. Fixing these issues ensures a frictionless tactical combat flow and complies with modern accessibility principles without sacrificing the 1984 cyberpunk terminal aesthetic.

## What Changes

- **Combat Card Hover Geometry**: Adjust card elevation (`-translate-y-2`) and give the hand ribbon adequate top padding/margins so hover expansion occurs strictly within its allocated region without overlapping the telemetry separator.
- **Combat Telemetry Elevation**: Place the middle status separator (RAM, draw pile, discard buffer, and End Turn button) on a distinct layer (`relative z-20`) to guarantee interactive elements are never covered by card transforms.
- **Card Typography & Readability**: Upgrade card description text size from `text-[10px]` to `text-[11px]` with `leading-snug` and improved spacing for comfortable readability during combat.
- **Visual Contrast**: Elevate muted `text-slate-500` secondary telemetries to `text-slate-400` / `#94a3b8` to meet WCAG AA contrast standards (> 4.5:1 ratio) on `#05080b` / `#0c1218` surfaces.
- **End-Turn Button Prominence**: Increase the visual weight and hit target of the main combat cycle button (`btn-end-turn`) for swift, accurate clicks.
- **Motion Reduction Support**: Add a `@media (prefers-reduced-motion: reduce)` rule in `index.css` to gracefully disable continuous pulsing and bouncing for users with motion sensitivity.

## Capabilities

### New Capabilities
<!-- None: purely visual and UX refinement -->

### Modified Capabilities
- `combat-engine`: Enhances visual layout and interaction guarantees in combat view so that all interactive zones and telemetry indicators remain unobstructed during card inspection.

## Impact

- **UI Components**: Updates [`CombatView.tsx`](file:///home/josear/dev/cardbyte-dungeon/src/components/Combat/CombatView.tsx), [`CardView.tsx`](file:///home/josear/dev/cardbyte-dungeon/src/components/Combat/CardView.tsx), and [`index.css`](file:///home/josear/dev/cardbyte-dungeon/src/index.css).
- **Zero API or Store Breaks**: State and engine math remain completely unchanged.
