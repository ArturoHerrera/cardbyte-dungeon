## MODIFIED Requirements

### Requirement: Starting Deck and RAM Resource Management
The engine SHALL initialize each run with 50 Neural Integrity (HP), a 3-point Deck RAM budget per turn, and a starting deck of 8 subroutines, and SHALL shuffle the discard pile when replenishing an empty draw pile.

#### Scenario: Turn resource reset and card draw
- **WHEN** a new player turn begins
- **THEN** player ICE-Buffer resets to 0, Deck RAM refills to 3, and 4 subroutines are drawn into Hand
- **AND** if hand size exceeds 10, excess drawn cards are discarded immediately
- **AND** when the draw pile empties, the discard pile is randomized with a shuffle before replenishing the draw pile.

### Requirement: Composable Card Action Resolution
The combat engine SHALL execute subroutines via an atomic `CardAction` pipeline (`DAMAGE`, `BLOCK`, `APPLY_STATUS`, `DRAW`, `GAIN_ENERGY`, `SELF_DAMAGE`), correctly evaluating conditional damage multipliers like `Execute` and absorbing self-damage via ICE-Buffer.

#### Scenario: Card execution and energy deduction
- **WHEN** a player plays a card with cost $C \le \text{current RAM}$
- **THEN** the card's actions are resolved in order against their targets and $C$ RAM is deducted
- **AND** attempts to play a card with cost exceeding current RAM are strictly rejected
- **AND** if an attack has conditional triggers against status effects (such as Execute doubling base damage on Vulnerable targets), the enhanced damage is computed before status multipliers
- **AND** self-damage actions are absorbed by active ICE-Buffer before reducing Flesh HP.

### Requirement: Enemy Intent Cycles and Affixes
Enemy constructs SHALL broadcast deterministic intents that execute on the Enemy Phase and correctly consume temporary charge buffs.

#### Scenario: Predictable enemy phase execution
- **WHEN** the player concludes their turn by ending the cycle
- **THEN** the enemy executes its broadcasted intent, updates its stats, decrements its status durations, consumes one-time buffs upon performing empowered attacks, and broadcasts its next round intent according to its archetypal cycle.
