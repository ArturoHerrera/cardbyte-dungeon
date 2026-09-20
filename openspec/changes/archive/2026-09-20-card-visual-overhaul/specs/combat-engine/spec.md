## MODIFIED Requirements

### Requirement: Non-Obstructive Combat Inspection
The combat interface SHALL guarantee that inspecting or focusing any subroutine card renders dedicated high-fidelity artwork and holographic cartridge styling without occluding adjacent telemetry indicators, status counters, or the end-cycle action control.

#### Scenario: Inspecting subroutine on hover
- **WHEN** the player hovers over any card in their hand
- **THEN** the card elevations and scale transitions remain completely contained within the hand view ribbon without crossing the upper boundary into the status separator bar
- **AND** the end-cycle button and telemetry counters remain fully visible and clickable without obstruction.

#### Scenario: Subroutine artwork and holographic styling
- **WHEN** any subroutine card is displayed in combat, reward vaults, or deck inspect views
- **THEN** the card renders a distinct, thematic visual artwork corresponding to its subroutine identity
- **AND** cards with upgraded status (`+`) or rare tier render with a subtle holographic foil shine effect
- **AND** if an image asset fails to load, a styled cyberpunk fallback icon gracefully displays without breaking card layout.

#### Scenario: Reduced motion preference
- **WHEN** the user's operating system environment requests reduced motion (`prefers-reduced-motion: reduce`)
- **THEN** continuous bouncing, shaking, and high-frequency pulsating animations in combat constructs are disabled or simplified.
