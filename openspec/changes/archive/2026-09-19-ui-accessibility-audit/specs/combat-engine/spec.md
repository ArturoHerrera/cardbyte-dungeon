## ADDED Requirements

### Requirement: Non-Obstructive Combat Inspection
The combat interface SHALL guarantee that hovering, inspecting, or focusing any subroutine in the player's hand does not visually occlude or overlap adjacent telemetry indicators, status counters, or the end-cycle action control.

#### Scenario: Inspecting subroutine on hover
- **WHEN** the player hovers over any card in their hand
- **THEN** the card elevations and scale transitions remain completely contained within the hand view ribbon without crossing the upper boundary into the status separator bar
- **AND** the end-cycle button and telemetry counters remain fully visible and clickable without obstruction.

#### Scenario: Reduced motion preference
- **WHEN** the user's operating system environment requests reduced motion (`prefers-reduced-motion: reduce`)
- **THEN** continuous bouncing, shaking, and high-frequency pulsating animations in combat constructs are disabled or simplified.
