## Context

The current CardByte Dungeon interface assumes a 16:9 or standard widescreen landscape display. Adapting to modern mobile web browsers requires handling variable viewport heights (`100dvh`), avoiding browser navigation bar jumping, adapting touch interactions (long-press vs double-tap), and reorganizing the 8-depth graph into an intuitive climbing spire.

See `proposal.md` for motivation and background.

## Goals / Non-Goals

**Goals:**
- Provide a clean, native-feeling portrait mobile experience on smartphone web browsers (`width < 768px`).
- Implement an explicit desktop toggle in the TopBar that switches desktop widescreen into an emulated vertical mobile frame.
- Add touch gestures for cards: single tap to select, long-press (350ms) with tactile vibration for zoom inspection, double tap (<300ms) to play.
- Reverse graph layer rendering in vertical mode into an ascending bottom-to-top climb with smooth auto-scrolling to the active depth.
- Restructure TopBar, Combat HUD, and Hand Ribbon for thumb-zone ergonomics in portrait orientation.

**Non-Goals:**
- Native App Store packaging (Cordova, Capacitor, React Native) — this remains pure progressive web application (PWA/SPA) running in mobile browsers.
- Landscape mode on mobile devices (portrait will be enforced on phone screens).

## Decisions

### 1. Viewport Adaptation Architecture (`isVerticalMode`)
- **Detection**: Check `window.innerWidth < 768` OR explicit state `emulateMobileView` (toggled via TopBar button on desktop).
- **Styling**: Use `h-[100dvh]` to account for dynamic address bars in Safari iOS and Chrome Android.
- **Emulated Frame**: When active on desktop, `App.tsx` wraps the game in a centered frame (`max-w-[440px] w-full h-[100dvh] shadow-2xl border-x border-[#1e2c38]`) with letterboxed ambient matrix grid on the sides.

### 2. Touch Gestures in `CardView`
- **Implementation**: Pointer/Touch event listeners (`onTouchStart`, `onTouchEnd`, `onClick`).
  - Timer for 350ms triggers `openInspectModal(card)` and calls `navigator.vibrate?.(40)`.
  - Timestamp tracking between taps: if second tap occurs within 300ms of first tap, trigger `onPlay(card.id)`.
  - Click fallback on desktop mouse clicks remains single-click to play (or double click in mobile mode).

### 3. Vertical Spire Cyberspace Map in `CardByteGraph`
- **Direction**: In vertical mode, layers are mapped `[7, 6, 5, 4, 3, 2, 1, 0]` from top to bottom.
- **Scroll**: Container has `overflow-y-auto` and a `useRef` that executes `scrollIntoView({ behavior: 'smooth', block: 'center' })` targeting the current node's layer.
- **SVG Connections**: Coordinates calculated vertically (`y` based on layer depth, `x` based on node column index).

### 4. Thumb-Zone Combat Layout
- **Enemy Card**: Upper 40% of the screen. Scaled appropriately for narrow widths.
- **Combat Telemetry & End Turn**: Central compact bar. End Turn button styled for easy thumb tapping.
- **Card Hand**: Lower 35% of the screen with slight horizontal negative margins (overlapping cards) and horizontal scroll container.

## Risks / Trade-offs

- **[Risk] Long-press triggering default mobile context menu / text selection** → **Mitigation**: Add `select-none`, `touch-none` / `-webkit-touch-callout: none` CSS properties to card elements.
- **[Risk] Browser address bar resizing during combat** → **Mitigation**: Use `100dvh` and CSS `overscroll-behavior: none` on the root body.
- **[Risk] Accidental plays on fast swiping** → **Mitigation**: Double-tap requirement prevents accidental card injections while scrolling the hand ribbon.
