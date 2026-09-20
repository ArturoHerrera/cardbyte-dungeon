# combat-engine Specification

## Purpose
Executes the deterministic turn-based card combat simulation, player RAM economy, enemy intent resolution, composable card action pipeline, and status effect multipliers.

## Requirements

### Requirement: Starting Deck and RAM Resource Management
The engine SHALL initialize each run with 50 Neural Integrity (HP), a 3-point Deck RAM budget per turn, and a starting deck of 8 subroutines.

#### Scenario: Turn resource reset and card draw
- **WHEN** a new player turn begins
- **THEN** player ICE-Buffer resets to 0, Deck RAM refills to 3, and 4 subroutines are drawn into Hand
- **AND** if hand size exceeds 10, excess drawn cards are discarded immediately

### Requirement: Composable Card Action Resolution
The combat engine SHALL execute subroutines via an atomic `CardAction` pipeline (`DAMAGE`, `BLOCK`, `APPLY_STATUS`, `DRAW`, `GAIN_ENERGY`, `SELF_DAMAGE`).

#### Scenario: Card execution and energy deduction
- **WHEN** a player plays a card with cost $C \le \text{current RAM}$
- **THEN** the card's actions are resolved in order against their targets and $C$ RAM is deducted
- **AND** attempts to play a card with cost exceeding current RAM are strictly rejected

### Requirement: Status Effect Calculations
The system SHALL apply multiplicative damage adjustments and damage-over-time effects based on active status stacks.

#### Scenario: Damage mitigation and vulnerability calculations
- **WHEN** an attack targets an entity with VULNERABLE
- **THEN** damage is multiplied by 1.5 rounded down with `Math.floor` before ICE-Buffer absorption
- **WHEN** an attack originates from an entity with WEAK
- **THEN** damage is multiplied by 0.75 rounded down with `Math.floor` before ICE-Buffer absorption
- **WHEN** an entity begins its turn with POISON stacks
- **THEN** direct HP damage equal to current Poison stacks is inflicted bypassing all ICE-Buffer, and Poison stacks decrement by 1

### Requirement: Enemy Intent Cycles and Affixes
Enemy constructs SHALL broadcast deterministic intents that execute on the Enemy Phase.

#### Scenario: Predictable enemy phase execution
- **WHEN** the player concludes their turn by ending the cycle
- **THEN** the enemy executes its broadcasted intent, updates its stats, decrements its status durations, and broadcasts its next round intent according to its archetypal cycle

### Requirement: Non-Obstructive Combat Inspection
The combat interface SHALL guarantee that hovering, inspecting, or focusing any subroutine in the player's hand does not visually occlude or overlap adjacent telemetry indicators, status counters, or the end-cycle action control.

#### Scenario: Inspecting subroutine on hover
- **WHEN** the player hovers over any card in their hand
- **THEN** the card elevations and scale transitions remain completely contained within the hand view ribbon without crossing the upper boundary into the status separator bar
- **AND** the end-cycle button and telemetry counters remain fully visible and clickable without obstruction.

#### Scenario: Reduced motion preference
- **WHEN** the user's operating system environment requests reduced motion (`prefers-reduced-motion: reduce`)
- **THEN** continuous bouncing, shaking, and high-frequency pulsating animations in combat constructs are disabled or simplified.

