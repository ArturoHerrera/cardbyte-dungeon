## Context

During a systematic audit of gameplay rules, mathematical formulas, and progression balance, several critical discrepancies were detected:
1. When drawing cards after the draw pile emptied, discard pile was copied without shuffling (`drawPile = [...discardPile]`), breaking randomness invariants.
2. `Execute` specified doubling base damage against Vulnerable targets in description, but was treated as standard damage.
3. Memory-Brute's attack charge buff was never deleted after executing `Logic Sledge`, persisting indefinitely.
4. Poison damage bypassed 100% of block without sufficient decay on Bosses/Elites, completely breaking boss encounters.
5. `Overclock` dealt direct self-damage bypassing player block.
6. Regular enemies did not scale with matrix layer depth, skewing difficulty toward early levels.
7. Players could not purge cards in rest sites.

## Goals / Non-Goals

**Goals:**
- Fix all logic bugs in combat resolution and enemy turn cycles.
- Introduce gentle, predictable depth scaling to enemy HP and damage so late-game matrix sectors stay engaging.
- Provide a deck thinning / card purging feature in Decompression Nodes.
- Rebalance boss vulnerability against poison and ensure risk/reward cards like `Overclock` work intuitively.

**Non-Goals:**
- Complete overhaul of the card library.
- Removing poison damage direct-HP mechanics from standard enemy encounters.

## Decisions

### Decision 1: Discard Pile Shuffling via Deterministic Helper
- Use `shuffleArray` with a PRNG call or entropy seed to ensure card ordering is randomized whenever discard replenishes the draw pile.

### Decision 2: Execute Exploit Damage Calculation
- If a card has the `Execute` ID or name and the target has `enemy.statusEffects['vulnerable'] > 0`, double the base action damage value prior to passing into `calculateDamage`.

### Decision 3: Buff State Consumption on Heavy Attacks
- After Memory-Brute performs `Logic Sledge`, remove `enemy.statusEffects['buff']`.

### Decision 4: Boss Anti-Virus Corruption Mitigation
- On Wintermute or Armored Elites, poison decays by 2 or is reduced during defend phases, preventing 2 cards from ending the boss fight passively.

### Decision 5: Overclock Self-Damage Absorption
- In `executePlayerCard`, route `SELF_DAMAGE` through `applyDamageToEntity(action.value, playerHp, playerBlock)`, allowing active ICE-Buffer to absorb it before damaging Flesh HP.

### Decision 6: Depth Scaling Formula
- Add `depth * 2.5` to enemy base HP and `Math.floor(depth * 0.6)` to attack intents.

### Decision 7: Rest View Purge Modal
- Add `purgeCardFromMasterDeck` method in `cardByteStore.ts` and add a third button in `RestView.tsx` with a selection modal.

## Risks / Trade-offs

- **[Risk]** Scaling might make the game too punishing on high depths for un-optimized decks.
  - **Mitigation**: Scaling values are kept modest (+2-3 HP per depth, +1-2 DMG), counterbalanced by the ability to purge weak basic cards at Rest Nodes.
