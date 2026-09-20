## Context

See [proposal.md](proposal.md) for motivation.
Currently, `CardView.tsx` displays subroutine cards with a simple RAM square on the top-left, an image container, and a text block description. Players have to parse the full description to identify damage and block values. In the tutorial scenario (`tutorialScenario.ts`), legacy non-canonical names (`Buffer Strike`, `ICE Shield`, `Glitch Inject`) cause broken artwork references that trigger vector icon fallbacks.

## Goals / Non-Goals

**Goals:**
- Redesign `CardView.tsx` with:
  - Cyberdeck RAM indicator: high-contrast neon battery badge with type-accented glow (crimson for ATTACK, cyan for DEFEND, amber for SKILL).
  - Instant Stat Telemetry Chips: an organized row of chips (`[⚔️ 6 DMG]`, `[🛡️ 5 BLOCK]`, `[🎯 2 VULN]`, `[⚡ +1 RAM]`, `[☣️ 4 POISON]`) positioned right below the artwork window.
  - Formatted Description Box: styled with monospace typography, high legibility, and proper padding.
  - Cartridge ROM styling: clean cybernetic borders with subtle hardware accents.
- Align `tutorialScenario.ts`:
  - Update card IDs and names to canonical subroutines (`starter_strike`, `starter_defend`, `starter_bash`, `overclock`).
  - Update tutorial step instructions in `en.ts` and `es.ts` to reference `[Logic Spike]`, `[ICE-Buffer]`, and `[ICE-Breaker]`.
- Documentation & Screenshots:
  - Update `holographic_cartridges` entry in Operator Codex (`en.ts`, `es.ts`).
  - Update `README.md` (EN & ES) Subroutine Catalog section.
  - Re-capture `docs/assets/combat-screen.png` using browser subagent with the modern UI.

**Non-Goals:**
- Modifying card combat math, formulas, or status multipliers in `combatEngine.ts`.

## Decisions

1. **Dedicated Stat Telemetry Row in `CardView.tsx`**
   - *Choice*: Extract numeric values from `card.actions` (`DAMAGE`, `BLOCK`, `VULNERABLE`, `WEAK`, `POISON`, `GAIN_ENERGY`) and render a flexible row of compact badges right below the artwork window.
   - *Rationale*: Allows instant card scanning during fast gameplay without relying solely on reading text sentences.

2. **Tutorial Deck Canonicalization**
   - *Choice*: Change tutorial cards to exact starter catalog equivalents rather than inventing separate art assets for `Buffer Strike` / `ICE Shield`.
   - *Rationale*: Eliminates redundancy, guarantees existing artwork renders immediately, and teaches new players the exact cards they will use in real runs.

3. **High-Resolution Combat Screenshot Recapture**
   - *Choice*: Use browser automation to open the combat arena and capture `docs/assets/combat-screen.png` at 1920x958.
   - *Rationale*: Keeps repository documentation 100% faithful to the live interface.

## Risks / Trade-offs

- [Height constraints in card hand ribbon] → Keep stat chip height small (`h-5` with `text-[9px]`) so total card height doesn't overflow or trigger vertical scrolling.
