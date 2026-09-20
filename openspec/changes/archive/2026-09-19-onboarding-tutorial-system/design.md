## Context

CardByte Dungeon utilizes Zustand for state management (`combatStore.ts`, `gameStore.ts`), Tailwind/Vanilla CSS for CRT aesthetics, and a custom typed i18n system (`src/i18n/`). The combat system processes actions through an atomic resolution pipeline. To maintain high scalability and low maintenance cost, tutorial content and rules must be data-driven rather than hardcoded in UI components.

## Goals / Non-Goals

**Goals:**
- Provide a clean, declarative registry of codex topics and categories that can be extended simply by adding data entries.
- Implement a step-driven tutorial runner (`tutorialScenario.ts`) that observes combat state and advances objectives without polluting the core combat simulation with branchy conditionals.
- Deliver an unobtrusive, accessible HUD tooltip system (`SYS_ASSIST`) with local storage persistence.
- Full bilingual fidelity (English / Spanish) with cyberpunk Ono-Sendai styling.

**Non-Goals:**
- Multiplayer or server-synchronized tutorial progress.
- Video playback or heavy pre-rendered animation assets.
- Modifying standard run RNG or balance outside the tutorial sandbox.

## Decisions

### Decision 1: Data-Driven Operator Codex (`codexData.ts`)
- **Choice**: Separate codex definitions into an array of entries with category tags, icon glyphs, and localized translation keys.
- **Rationale**: Adding new game features (e.g., relics, new debuffs) only requires inserting an entry in `codexData.ts` and i18n dictionaries. The modal UI dynamically groups and renders them.
- **Alternatives Considered**: Dedicated hardcoded JSX pages for each topic (rejected: high maintenance overhead, prone to drift).

### Decision 2: Step-Driven Scenario Runner for Level 0 Simulation
- **Choice**: Structure the Level 0 tutorial as an array of `TutorialStep` definitions with entry conditions, directive message keys, allowed actions, and advance predicates.
- **Rationale**: Isolates tutorial logic from `combatStore.ts`. The combat engine runs standard deterministic rules with a seeded hand, while a wrapper overlay (`TutorialGuideOverlay`) listens to store state to render hints and control progression.
- **Alternatives Considered**: Inlining `isTutorial` conditionals inside combat action handlers (rejected: introduces spaghetti code and regression risks in the core combat pipeline).

### Decision 3: Centralized Assist Hint Registry (`sysAssistData.ts`)
- **Choice**: Define target IDs (e.g. `ram_counter`, `ice_buffer`, `intent_hostile`) in a dictionary mapping to title/body i18n keys, consumed via a reusable `<SysAssistAnchor id="...">` component.
- **Rationale**: Keeps combat and map components clean; styling, hover delay, and global toggle state reside in one place.
- **Alternatives Considered**: Individual tooltip implementations per component (rejected: inconsistent styling, scattered state).

## Risks / Trade-offs

- **[Risk]** Inexperienced players might accidentally end their turn early in Level 0 before playing the required card.
  - **Mitigation**: The tutorial runner can disable or prompt confirmation on the "END CYCLE" button during steps where unspent actions remain.
- **[Risk]** Modal obscuring combat state if opened during critical decisions.
  - **Mitigation**: The Operator Codex modal is designed as a non-destructive overlay with backdrop blur, pause state, and immediate escape/close handling.
