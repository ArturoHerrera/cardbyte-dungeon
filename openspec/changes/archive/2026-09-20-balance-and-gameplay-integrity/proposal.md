## Why

An audit of the combat mechanics, enemy AI, card interactions, and run progression identified key gameplay and mathematical imbalances:
1. Discard pile recycling did not shuffle cards, making deck draws deterministic and exploitable.
2. The `Execute` card did not implement its stated description bonus (doubling base damage against Vulnerable targets) due to lack of declarative condition support in `CardAction`.
3. Memory-Brute's charge buff persisted indefinitely instead of being consumed on the next attack.
4. Poison damage bypassed 100% of ICE-Buffer with minimal decay, completely trivializing high-HP boss encounters.
5. `Overclock` dealt direct unmitigated health damage to the player, making it overly punitive in long runs.
6. Enemy stats and intents lacked depth scaling, resulting in a reverse difficulty curve.
7. Players lacked a card purge/removal mechanic, leading to deck bloat in later matrix layers, which needs a minimum deck size safeguard (minimum 4 cards) to prevent combat soft-locks.
8. Master specification docs (`cardbyte_dungeon_openspec.md`), external docs (`README.md`), the in-game Operator Codex, and tooltip hints must be synchronized to accurately reflect card purging, discard shuffling, and onboarding features.

## What Changes

- **Card Action Extensibility & Declarative Conditions**:
  - Extend `CardAction` with `condition?: 'TARGET_VULNERABLE' | 'TARGET_WEAK'` and `conditionMultiplier?: number` so any card can declare conditional triggers cleanly without hardcoded string matching.
- **Combat Engine Mechanics**:
  - Shuffle discard pile upon recycling into draw pile.
  - Implement declarative conditional damage resolution in `executePlayerCard` (enabling `Execute` to double base damage on Vulnerable targets).
  - Consume Memory-Brute's capacitor charge buff upon performing `Logic Sledge`.
  - Introduce anti-virus poison decay on Bosses/Elites so high-tier constructs aren't instantly cheesed.
  - Make `Overclock` self-damage absorbable by active ICE-Buffer first before depleting Flesh HP.
- **Enemy Scaling by Layer**:
  - Scale enemy max HP and attack values progressively with matrix depth.
- **Card Purging at Rest Sites with Minimum Deck Guard**:
  - Add a "PURGE SUBROUTINE" action in Decompression Nodes (`RestView.tsx`), allowing operators to delete an obsolete subroutine from their master deck, guarded by a minimum deck size requirement of 4 cards to prevent soft-locks.
- **Documentation, Codex & Master Spec Synchronization**:
  - Update `cardbyte_dungeon_openspec.md` and `README.md` (both English and Spanish) with new rest node mechanics, combat adjustments, and onboarding systems.
  - Update Operator Codex descriptions for decompression nodes, status effects, and card pipelines in `en.ts` and `es.ts`.

## Capabilities

### Modified Capabilities
- `combat-engine`: Update requirements for discard pile shuffling, conditional card action resolution, buff consumption, and status mitigation.
- `matrix-progression`: Update rest site capabilities to include subroutine purging with minimum deck integrity enforcement.

## Impact

- `src/types/cardbyte.d.ts`: Extend `CardAction` interface with optional `condition` and `conditionMultiplier`.
- `src/engine/combatEngine.ts`: Discard recycle shuffle, declarative condition evaluation, Memory-Brute buff consumption, Overclock self-damage absorption, and boss poison decay.
- `src/engine/enemyAi.ts`: Depth-based HP and damage scaling formulas in `spawnEnemy` and `calculateNextIntent`.
- `src/engine/cardCatalog.ts`: Update `Execute` card definition with `condition: 'TARGET_VULNERABLE', conditionMultiplier: 2`.
- `src/components/UI/RestView.tsx`: New third action for card deletion/purge with min-deck guard (min 4 cards) and card picker modal.
- `src/store/cardByteStore.ts`: Action `removeCardFromMasterDeck` to support deck thinning.
- `src/locales/`: Localized text in English and Spanish for rest site purge actions, minimum deck warnings, new combat log messages, and updated codex text.
- `cardbyte_dungeon_openspec.md` and `README.md`: Synchronized documentation.
