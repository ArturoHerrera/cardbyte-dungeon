## 1. Project Setup & Scaffolding

- [x] 1.1 Initialize Vite + React 19 + TypeScript project with Tailwind CSS and Lucide React; verify build completes with `npm run build`
- [x] 1.2 Define core TypeScript models in `src/types/cardbyte.d.ts` (`Card`, `CardAction`, `Enemy`, `MapNode`, `PlayerProfile`, `StorageAdapter`); verify type checks pass with `npx tsc --noEmit`
- [x] 1.3 Setup CRT scanlines, matrix grid styles, and retro cyberpunk font tokens in `src/index.css`; verify styled test container renders in browser

## 2. Deterministic RNG & Procedural Generation

- [x] 2.1 Implement deterministic PRNG (`mulberry32`) in `src/engine/random.ts`; verify repeatable sequences given identical seeds
- [x] 2.2 Implement 8-layer DAG map generator with non-orphaned planar connections and boss convergence in `src/engine/mapGenerator.ts`; verify 100 generated seeds pass connectivity invariants
- [x] 2.3 Implement crypto-fog of war progressive decryption logic in `src/engine/mapGenerator.ts`; verify Depths 2-6 decrypt sequentially upon completing preceding layers

## 3. Subroutine Catalog & Combat Engine

- [x] 3.1 Create starter deck definition and 8-card draft pool with composable `actions` in `src/engine/cardCatalog.ts`; verify cards instantiate with valid `CardAction` pipelines
- [x] 3.2 Implement enemy construct archetypes, procedural affixes, and Wintermute Boss intent cycles in `src/engine/enemyAi.ts`; verify intent transitions over 4-turn cycles
- [x] 3.3 Implement deterministic combat resolution in `src/engine/combatEngine.ts` (RAM consumption, damage, block absorption, Vulnerable/Weak multipliers, Poison damage bypass, 10-card hand cap); verify unit calculations match acceptance criteria

## 4. State Management & Persistence

- [x] 4.1 Implement Zustand store with `RunSlice`, `CombatSlice`, and `UISlice` in `src/store/cardByteStore.ts`; verify actions correctly update state without slice crosstalk
- [x] 4.2 Implement local storage persistence adapter and "Resume Matrix Run" hydration in `src/engine/storageAdapter.ts`; verify state survives page refresh
- [x] 4.3 Implement "Neural Deck Cartridge // ROM DUMP" export/import with Base64 Cyber-String and `.deck` file drag-and-drop plus CRC32 verification; verify valid dumps restore state and corrupted dumps are rejected

## 5. UI Components & Game Presentation

- [x] 5.1 Implement terminal header and run telemetry bar (`TopBar.tsx`); verify HP, RAM, floor counter, and hex seed render accurately
- [x] 5.2 Implement horizontal single-screen DAG matrix view (`CardByteGraph.tsx`, `NodeItem.tsx`) with animated SVG connection vectors; verify layout fits `100vh` without scrollbars
- [x] 5.3 Implement combat stage, enemy construct display, and interactive card ribbon with hover elevations (`CombatView.tsx`, `CardView.tsx`, `EnemyCard.tsx`); verify clicking playable cards executes actions
- [x] 5.4 Implement non-combat event modals for `REST` (Purge vs Refactor) and `TREASURE` (Data Vault 3-card draft); verify selections correctly mutate player deck and HP
- [x] 5.5 Implement Title Screen, Victory Screen (Wintermute Breach), and Game Over (FLATLINE) screens; verify full run lifecycle from start to end

## 6. End-to-End Verification & Polish

- [x] 6.1 Conduct full run playtest from Depth 0 to Depth 7 Boss, validating combat math, card drafting, and win/loss transitions
- [x] 6.2 Test ROM Dump export and import across different browser storage states, verifying zero data corruption
