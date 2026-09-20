## 1. Type Extensions & Declarative Card Actions

- [x] 1.1 In `src/types/cardbyte.d.ts`, extend `CardAction` with `condition?: 'TARGET_VULNERABLE' | 'TARGET_WEAK'` and `conditionMultiplier?: number`; verify TypeScript compilation.
- [x] 1.2 In `src/engine/cardCatalog.ts`, configure `Execute` (and `Execute+`) actions with `condition: 'TARGET_VULNERABLE', conditionMultiplier: 2`; verify card definitions.


## 2. Combat Engine Logic & Card Resolution Fixes

- [x] 2.1 In `src/engine/combatEngine.ts`, update discard pile recycling to shuffle cards when replenishing `drawPile`; verify with unit/console check.
- [x] 2.2 In `src/engine/combatEngine.ts`, implement declarative condition evaluation in `executePlayerCard`; verify conditional damage calculation against status effects.
- [x] 2.3 In `src/engine/combatEngine.ts`, consume Memory-Brute's `buff` status when `Logic Sledge` is executed; verify buff is removed.
- [x] 2.4 In `src/engine/combatEngine.ts`, allow `SELF_DAMAGE` to be absorbed by player ICE-Buffer before decreasing Flesh HP; verify Overclock interaction.
- [x] 2.5 In `src/engine/combatEngine.ts`, implement boss/elite anti-virus corruption decay; verify boss does not perish passively in 2 rounds.

## 3. Enemy Depth Scaling

- [x] 3.1 In `src/engine/enemyAi.ts`, add depth-based scaling to enemy HP in `spawnEnemy`; verify spawned enemy stats across depth 0 to 6.
- [x] 3.2 In `src/engine/enemyAi.ts`, add depth-based scaling to enemy attack intents in `calculateNextIntent`; verify damage calculations.

## 4. Deck Thinning / Subroutine Purging in Rest Sites

- [x] 4.1 In `src/store/cardByteStore.ts`, implement `removeCardFromMasterDeck(cardId: string)`; verify card is removed and run state is saved.
- [x] 4.2 In `src/locales/es.ts`, `en.ts`, and `types.ts`, add translation keys for Purge Subroutine action, descriptions, and minimum buffer warning; verify no missing keys.
- [x] 4.3 In `src/components/UI/RestView.tsx`, add the "PURGE SUBROUTINE" option with a minimum deck check (disabled at <= 4 cards) and card selection picker; verify deleting a card removes it from masterDeck and proceeds to map.

## 5. Documentation, Codex & Specification Synchronization

- [x] 5.1 Update `src/locales/en.ts` and `src/locales/es.ts` Operator Codex entries for Decompression Nodes (mentioning Purging) and status corruption rules; verify text clarity.
- [x] 5.2 Synchronize `cardbyte_dungeon_openspec.md` and `README.md` (both English and Spanish) with the Purge mechanic, minimum deck safeguard, Operator Codex, Simulation Protocol, and SysAssist HUD documentation; verify Markdown formatting.

## 6. Verification & Validation

- [x] 6.1 Run full TypeScript check and production build (`npm run build`) to ensure zero errors.
- [x] 6.2 Validate combat discard shuffle, Execute damage, and Rest site purge flow in browser session.
