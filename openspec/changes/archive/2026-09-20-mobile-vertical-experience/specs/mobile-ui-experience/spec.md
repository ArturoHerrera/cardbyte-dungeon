## Purpose

Governs responsive vertical viewport adaptation, desktop mobile-view emulation toggling, touch-first card interaction protocols, and thumb-zone ergonomics for mobile web browsers.

## ADDED Requirements

### Requirement: Responsive Mobile Viewport Enforcement
The system SHALL lock layout presentation to a vertical orientation on mobile screens and viewport widths below 768px using dynamic viewport height (`100dvh`) and safe-area environment insets.

#### Scenario: Mobile browser loading
- **WHEN** the application loads in a browser viewport with width < 768px or on a detected mobile user agent
- **THEN** the root viewport fills `100dvh` without unwanted horizontal scrollbars or URL-bar layout jumps
- **AND** interactive elements respect `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`.

### Requirement: Desktop Mobile Viewport Emulation Toggle
The system SHALL provide a manual toggle in desktop landscape viewports allowing operators to switch into a centered vertical mobile viewport simulation.

#### Scenario: Switching to mobile view on desktop
- **WHEN** an operator clicks the Mobile View toggle icon in the TopBar on a desktop display (width >= 768px)
- **THEN** the main game container constrains its width proportionally to the current window height (portrait aspect ratio ~9:19.5, max-w-[440px])
- **AND** the UI components immediately switch to their vertical mobile layout variants.

#### Scenario: Reverting to desktop landscape view
- **WHEN** the operator clicks the Mobile View toggle again while in simulated vertical mode
- **THEN** the main viewport expands back to full widescreen landscape layout.

### Requirement: Touch-First Card Interaction Protocol
The system SHALL support explicit touch gestures for subroutine cards in mobile viewports to prevent accidental plays while enabling inspection.

#### Scenario: Long-press card inspection
- **WHEN** a player presses and holds a subroutine card in their hand for >= 350ms
- **THEN** a zoomed inspection modal displays the card with high-resolution artwork, detailed subroutine telemetry, and status effect breakdowns
- **AND** the system triggers a subtle tactile vibration pulse (`navigator.vibrate(40)`) if supported by the client device.

#### Scenario: Double-tap card execution
- **WHEN** a player double-taps a playable subroutine card within a 300ms window
- **THEN** the card is executed against the target ICE construct, consuming required RAM and playing the injection visual animation.

#### Scenario: Single-tap card selection
- **WHEN** a player taps a subroutine card once
- **THEN** the card elevates slightly and highlights in the hand ribbon without executing, establishing active focus.

### Requirement: Thumb-Zone Combat Layout
The system SHALL position high-frequency combat interaction controls within ergonomic reach of the player's thumb in vertical viewports.

#### Scenario: Vertical combat layout distribution
- **WHEN** a combat encounter renders in vertical layout
- **THEN** the enemy construct occupies the upper display section
- **AND** RAM counter, draw/discard telemetry, and the End Cycle button sit on a compact middle status bar
- **AND** the player's hand ribbon occupies the lower thumb-accessible zone with horizontal scroll and card overlap.
