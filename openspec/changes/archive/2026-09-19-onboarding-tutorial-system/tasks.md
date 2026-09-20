## 1. Data Registries and Localization

- [x] 1.1 Create `src/data/codexData.ts` with categories and entries for RAM, ICE-Buffer, Status Effects, and Matrix Navigation; verify file compiles with TypeScript.
- [x] 1.2 Create `src/data/sysAssistData.ts` with telemetry hint definitions and `src/data/tutorialScenario.ts` with Level 0 scripted step objectives; verify types and compilation.
- [x] 1.3 Add bilingual translation keys for codex entries, tutorial instructions, and assist tooltips in `src/i18n/es.ts` and `src/i18n/en.ts`; verify no missing dictionary keys.


## 2. Operator Codex UI Component

- [x] 2.1 Implement `src/components/Tutorial/OperatorCodexModal.tsx` with category navigation, entry detail view, responsive CRT styling, and close handler; verify modal renders entries.
- [x] 2.2 Mount the Codex button in `TitleScreen.tsx`, `CombatView.tsx`, and `CardByteGraph.tsx`; verify clicking opens and closes the modal cleanly in each view.


## 3. SysAssist Contextual Tooltips

- [x] 3.1 Implement `src/components/Tutorial/SysAssistAnchor.tsx` with hover popover display, keyboard accessibility, and state persistence; verify hover displays localized hints.
- [x] 3.2 Add assist toggle button to game header and wrap RAM counter, ICE-Buffer, and Enemy Intent elements in `CombatView.tsx` with assist anchors; verify toggle activates and silences tooltips.


## 4. Level 0 Guided Simulation Protocol

- [x] 4.1 Implement `src/components/Tutorial/TutorialGuideOverlay.tsx` to display step directives, highlight target actions, and manage scenario progression; verify step transitions on actions.
- [x] 4.2 Add "INICIAR SIMULACIÓN / START TUTORIAL" trigger in `TitleScreen.tsx` initializing a controlled combat encounter with the Training ICE Drone; verify tutorial battle launches.
- [x] 4.3 Add simulation victory modal linking to Title Screen or Intrusión Real; verify successful completion flow.


## 5. Verification & End-to-End Validation

- [x] 5.1 Run full TypeScript check and production build (`npm run build`) to ensure zero type errors or bundle regressions.
- [x] 5.2 Validate tutorial scenario completion, assist tooltips, and bilingual codex navigation in browser session.


