## Why

Subroutine cards currently lack prominent statistical telemetry, forcing players to read raw text descriptions to identify basic numbers like attack damage or shield values. Additionally, in the tutorial scenario, legacy card identifiers (`Buffer Strike`, `ICE Shield`, `Glitch Inject`) cause broken artwork references that fall back to plain vector icons, creating confusion. Redesigning subroutine cards with dedicated stat badges, neon RAM energy badges, structured descriptions, and synchronizing tutorial cards, codex descriptions, and README documentation screenshots brings polish and consistency to the combat experience.

## What Changes

- **Subroutine Card Redesign (`CardView.tsx`)**:
  - Prominent cyberdeck RAM cycle indicator badge with type-colored neon glow.
  - Dedicated stat telemetry badges (`[⚔️ X DMG]`, `[🛡️ X BLOCK]`, `[🎯 X VULN]`, `[⚡ +X RAM]`) positioned between artwork and description.
  - Enhanced description block with legible contrast and keyword-accented telemetry.
  - Cybernetic ROM cartridge chassis refinements across normal and compact view scales.
- **Tutorial Deck Alignment (`tutorialScenario.ts` & Locales)**:
  - Replace legacy tutorial card IDs and names with standard subroutines (`Logic Spike`, `ICE-Buffer`, `ICE-Breaker`, `Overclock`), guaranteeing proper artwork resolution.
  - Synchronize tutorial directives in `en.ts` and `es.ts` to reference the canonical subroutine names.
- **Operator Codex & README Synchronization**:
  - Update `holographic_cartridges` in the Operator Codex to describe the stat chips and RAM telemetry badges.
  - Update `README.md` subroutine catalog section in English and Spanish.
  - Recapture and update `docs/assets/combat-screen.png` to show the modern combat arena with new enemy viewports and redesigned cards.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `combat-engine`: Enhance subroutine card presentation requirements to include distinct stat telemetry badges and high-visibility RAM indicators.
- `tutorial-system`: Update tutorial deck and step requirements to use canonical subroutine cards and matching visual assets.

## Impact

- `src/components/Combat/CardView.tsx`: Layout and visual styling redesign.
- `src/data/tutorialScenario.ts`: Card IDs, names, and action mappings.
- `src/locales/en.ts` & `src/locales/es.ts`: Tutorial step instructions and codex entry.
- `README.md`: Text documentation and `docs/assets/combat-screen.png` screenshot.
