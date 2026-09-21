## MODIFIED Requirements

### Requirement: Enemy Intent Cycles and Affixes
Enemy constructs SHALL broadcast deterministic intents that execute on the Enemy Phase and correctly consume temporary charge buffs.

#### Scenario: Predictable enemy phase execution
- **WHEN** the player concludes their turn by ending the cycle
- **THEN** the enemy executes its broadcasted intent, updates its stats, decrements its status durations, consumes one-time buffs upon performing empowered attacks, and broadcasts its next round intent according to its archetypal cycle.

#### Scenario: Enemy elimination via poison during enemy phase
- **WHEN** the enemy construct suffers fatal poison damage at the start or conclusion of the enemy turn phase ($HP \le 0$)
- **THEN** the combat engine terminates combat immediately without returning turn phase to the player
- **AND** transitions directly to the appropriate victory or card reward screen.

## ADDED Requirements

### Requirement: Bounded Combat Telemetry Buffer
The combat simulation and store SHALL enforce a bounded capacity limit of 60 entries on the combat telemetry log to prevent unbounded memory growth.

#### Scenario: Message addition to full log
- **WHEN** a new combat telemetry message is recorded and the log contains 60 or more entries
- **THEN** the oldest entry is evicted maintaining at most 60 recent messages.
