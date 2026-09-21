## 1. Remove Duplicate Codex Buttons

- [x] 1.1 In `src/components/Map/CardByteGraph.tsx`, remove the local `CODEX` button and unused `BookOpen` import if applicable
- [x] 1.2 In `src/components/Combat/CombatView.tsx`, remove the local `CODEX` button and unused `BookOpen` import if applicable

## 2. Verification

- [x] 2.1 Run `npm run build` to verify zero TypeScript/CSS build errors
- [x] 2.2 Verify in browser that the top-level TopBar CODEX button opens the Operator Codex modal, and no duplicate buttons appear in map or combat views
