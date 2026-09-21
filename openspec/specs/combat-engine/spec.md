# combat-engine Specification

## Purpose
Executes the deterministic turn-based card combat simulation, player RAM economy, enemy intent resolution, composable card action pipeline, and status effect multipliers.

## Requirements

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
Enemy constructs SHALL broadcast deterministic intents that execute on the Enemy Phase and correctly consume temporary charge buffs.

#### Scenario: Predictable enemy phase execution
- **WHEN** the player concludes their turn by ending the cycle
- **THEN** the enemy executes its broadcasted intent, updates its stats, decrements its status durations, consumes one-time buffs upon performing empowered attacks, and broadcasts its next round intent according to its archetypal cycle.

#### Scenario: Enemy elimination via poison during enemy phase
- **WHEN** the enemy construct suffers fatal poison damage at the start or conclusion of the enemy turn phase ($HP \le 0$)
- **THEN** the combat engine terminates combat immediately without returning turn phase to the player
- **AND** transitions directly to the appropriate victory or card reward screen.

### Requirement: Non-Obstructive Combat Inspection
The combat interface SHALL guarantee that inspecting or focusing any subroutine card renders dedicated high-fidelity artwork, prominent RAM energy badges, instant stat telemetry chips, and holographic cartridge styling without occluding adjacent telemetry indicators, status counters, or the end-cycle action control.

#### Scenario: Inspecting subroutine on hover
- **WHEN** the player hovers over any card in their hand
- **THEN** the card elevations and scale transitions remain completely contained within the hand view ribbon without crossing the upper boundary into the status separator bar
- **AND** the end-cycle button and telemetry counters remain fully visible and clickable without obstruction.

#### Scenario: Subroutine artwork and holographic styling
- **WHEN** any subroutine card is displayed in combat, reward vaults, or deck inspect views
- **THEN** the card renders a distinct, thematic visual artwork corresponding to its subroutine identity
- **AND** cards render prominent RAM cost indicators and dedicated stat telemetry chips (`[DMG]`, `[BLOCK]`, `[VULN]`, `[RAM]`) highlighting key numerical values
- **AND** cards with upgraded status (`+`) or rare tier render with a subtle holographic foil shine effect
- **AND** if an image asset fails to load, a styled cyberpunk fallback icon gracefully displays without breaking card layout.

#### Scenario: Reduced motion preference
- **WHEN** the user's operating system environment requests reduced motion (`prefers-reduced-motion: reduce`)
- **THEN** continuous bouncing, shaking, and high-frequency pulsating animations in combat constructs are disabled or simplified.

### Requirement: Hostile ICE Construct Visual Presentation
The combat arena SHALL display hostile ICE entities within a dedicated cyberdeck telemetry viewport featuring high-definition thematic artwork, scanline textures, and hierarchical visual tiers for standard constructs, elites, and matrix bosses.

#### Scenario: Rendering enemy construct viewport
- **WHEN** an enemy construct is present in the combat arena
- **THEN** the construct renders in an `EnemyCard` viewport with dedicated high-definition WebP artwork corresponding to its archetype (`BIT_BUG`, `MEMORY_BRUTE`, `DAEMON_CULTIST`, or `WINTERMUTE`)
- **AND** the viewport is framed by cybernetic bezel borders, scanline telemetry indicators, and archetype badges.

#### Scenario: Visual hierarchy for Elite and Boss constructs
- **WHEN** the active enemy is designated as an Elite construct or the Wintermute Matrix-God boss
- **THEN** the construct display renders distinct visual indicators: Elite constructs display an amber affix badge with a localized breach pulse, while the Wintermute boss displays a crimson threat perimeter glow and animated matrix signal shimmer.

#### Scenario: Graceful fallback on asset failure
- **WHEN** an enemy artwork file fails to load or is missing
- **THEN** the construct viewport gracefully displays a themed cybernetic vector icon matching the archetype without corrupting the layout or telemetry metrics.

### Requirement: Bounded Combat Telemetry Buffer
The combat simulation and store SHALL enforce a bounded capacity limit of 60 entries on the combat telemetry log to prevent unbounded memory growth.

#### Scenario: Message addition to full log
- **WHEN** a new combat telemetry message is recorded and the log contains 60 or more entries
- **THEN** the oldest entry is evicted maintaining at most 60 recent messages.



