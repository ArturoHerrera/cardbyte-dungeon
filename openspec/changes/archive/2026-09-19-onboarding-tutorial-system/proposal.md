## Why

CardByte Dungeon features rich, intersecting cyberpunk deckbuilding mechanics (Deck RAM economy, ICE-Buffer damage absorption, enemy intent prediction, status multiplier pipeline, and matrix graph progression). New netrunners can find these systems overwhelming without guided onboarding. Providing a multi-layered learning experience—an illustrated Operator Codex, a dedicated Level 0 interactive combat simulation ("Simulation Protocol"), and persistent contextual HUD tooltips—empowers new players while keeping the architecture modular and maintainable as new mechanics are introduced.

## What Changes

- **Operator Codex (Manual de Campo)**: Introduce an illustrated, bilingual reference codex accessible from Title, Matrix Map, and Combat views detailing core game pillars (RAM, ICE, Status Effects, Matrix Navigation) via data-driven entries.
- **Level 0 Guided Simulation (Boot Sequence)**: Add a scripted combat tutorial mode with deterministic card draws, step-by-step objectives, and tactical coaching dialogue from an in-universe neural guide (`// SYS_AID`).
- **Contextual Tooltips (SYS_ASSIST)**: Implement an interactive helper tooltip layer that highlights and explains telemetry counters (RAM, ICE-Buffer, Enemy Intents, Discard) with a user-configurable toggle persisted to localStorage.
- **Title Screen Navigation**: Add a distinct "INICIAR SIMULACIÓN / START TUTORIAL" action alongside regular intrusions.

## Capabilities

### New Capabilities
- `tutorial-system`: Covers operator codex reference display, scripted tutorial combat runner, and contextual telemetry assist tooltips.

### Modified Capabilities
- None.

## Impact

- `src/components/Tutorial/`: New components for the Operator Codex modal, SysAssist tooltips, and simulation guide overlays.
- `src/data/`: Declarative registries for codex entries (`codexData.ts`), assist tooltip definitions (`sysAssistData.ts`), and scripted simulation steps (`tutorialScenario.ts`).
- `src/i18n/`: Additional English and Spanish translations for all codex sections, tutorial prompts, and assist tooltips.
- `src/components/Title/TitleScreen.tsx`: New action to launch the simulation protocol.
- `src/components/Combat/` & `src/components/Map/`: Mount points for the Operator Codex trigger and SysAssist targets.
