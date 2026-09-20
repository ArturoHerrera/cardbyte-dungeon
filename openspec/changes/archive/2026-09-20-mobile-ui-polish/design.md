## Context

Following on-device testing on Android with Brave browser, specific visual and ergonomic friction points were discovered on the title screen, map view, and combat card interactions.

See `proposal.md` for motivation and background.

## Goals / Non-Goals

**Goals:**
- Completely hide the mobile/desktop view toggle in `TopBar.tsx` when screen width is `< 768px`, strictly enforcing vertical mode on mobile devices.
- Optimize `TitleScreen.tsx`: compact vertical paddings and margins to guarantee the run statistics footer is 100% visible above mobile browser bottom toolbars.
- Symmetrically align button icons and labels on `TitleScreen.tsx` without left-weight imbalance.
- Optimize `CardByteGraph.tsx` in vertical mode: eliminate bottom empty space and ensure initial mount auto-scroll immediately targets `currentDepth` (layer 0 on fresh run) instead of resting at depth 7.
- Optimize `EnemyCard.tsx` / `CombatView.tsx`: compact the upper arena so the enemy's attack intent badge does not touch or clip the top edge.
- Redesign mobile card interaction: single tap focuses and elevates the card (`z-30`); a second tap on the elevated card or an inline "INJECT" button executes the card, eliminating double-tap misclicks across overlapping cards.
- Refresh `README.md` with mobile vertical layout documentation and new screenshots.

**Non-Goals:**
- Alter core combat math or card effects.
- Add landscape mode to mobile phone viewports.

## Decisions

### 1. Hide Toggle on Physical Mobile (`hidden md:flex`)
- Use Tailwind responsive classes (`hidden md:flex`) on the toggle button in `TopBar.tsx`. Mobile browsers will only see the deck brand and hamburger menu without any option to leave vertical mode.
- In `store/cardByteStore.ts`, initialize `mobileViewMode` as `true` if `typeof window !== 'undefined' && window.innerWidth < 768`.

### 2. Symmetrical Button Alignment & Title Screen Tightening
- In `TitleScreen.tsx`, adjust button contents to use a balanced grid or flex arrangement:
  `<div className="w-6 shrink-0 flex items-center justify-center"><Icon className="..." /></div><span className="flex-1 text-center font-bold">{label}</span><div className="w-6 shrink-0" />`. This guarantees mathematical centering of text regardless of icon presence.
- Reduce vertical margins (`mb-8` -> `mb-2 sm:mb-6`, `p-8` -> `p-4 sm:p-8`) to prevent overflow.

### 3. Immediate Auto-Scroll in `CardByteGraph`
- Use `requestAnimationFrame` and `setTimeout(..., 50)` to ensure the DOM layout is fully painted before executing `activeLayerRef.current.scrollIntoView({ behavior: 'auto', block: 'center' })`.
- Remove outer footer height and bottom padding that created the black dead space.

### 4. Focused Card Elevation in `CombatView`
- Maintain `focusedCardId: string | null` in `CombatView`.
- When a card is tapped in mobile mode:
  - If it is not focused -> set `focusedCardId(card.id)`. The card translates up (`-translate-y-8`), scales (`scale-110`), and elevates to `z-40`.
  - If it is already focused and playable -> execute `playCard(card.id)` and clear focus.
  - An optional inline `[ INYECTAR / EXECUTE ]` badge appears on top of the focused card for 100% thumb certainty.
  - Long press continues to open `CardInspectModal`.

## Risks / Trade-offs

- **[Risk] Single tap delay** → **Mitigation**: Removing double-tap detection removes click delay timers completely; taps respond instantaneously.
