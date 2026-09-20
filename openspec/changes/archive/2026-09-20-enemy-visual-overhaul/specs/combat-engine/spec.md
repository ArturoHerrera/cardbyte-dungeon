## ADDED Requirements

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
