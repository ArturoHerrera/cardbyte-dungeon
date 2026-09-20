# mobile-ui-experience Specification

## Purpose
Governs responsive vertical viewport adaptation, desktop mobile-view emulation toggling, touch-first card interaction protocols, and thumb-zone ergonomics for mobile web browsers.

## Requirements

### Requirement: Responsive Mobile Viewport Enforcement
The system SHALL lock layout presentation to a vertical orientation on mobile screens and viewport widths below 768px using dynamic viewport height (`100dvh`) and safe-area environment insets.

#### Scenario: Mobile browser loading
- **WHEN** the application loads in a browser viewport with width < 768px or on a detected mobile user agent
- **THEN** the root viewport fills `100dvh` without unwanted horizontal scrollbars or URL-bar layout jumps
- **AND** interactive elements respect `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`.

### Requirement: Desktop Mobile Viewport Emulation Toggle
The system SHALL provide a manual toggle strictly in desktop landscape viewports allowing operators to switch into a centered vertical mobile viewport simulation, while completely hiding this control on mobile viewports.

#### Scenario: Switching to mobile view on desktop
- **WHEN** an operator clicks the Mobile View toggle icon in the TopBar on a desktop display (width >= 768px)
- **THEN** the main game container constrains its width proportionally to the current window height (portrait aspect ratio ~9:19.5, max-w-[440px])
- **AND** the UI components immediately switch to their vertical mobile layout variants.

#### Scenario: Reverting to desktop landscape view
- **WHEN** the operator clicks the Mobile View toggle again while in simulated vertical mode
- **THEN** the main viewport expands back to full widescreen landscape layout.

#### Scenario: Mobile browser loading hides toggle
- **WHEN** the application loads on a viewport with width < 768px
- **THEN** the Mobile View toggle button is not displayed in the TopBar
- **AND** the application strictly enforces vertical portrait orientation without an exit toggle.

### Requirement: Touch-First Card Interaction Protocol
The system SHALL support focused single-tap card elevation and direct execution in mobile viewports to ensure accurate card plays without misclicks.

#### Scenario: Long-press card inspection
- **WHEN** a player presses and holds a subroutine card in their hand for >= 350ms
- **THEN** a zoomed inspection modal displays the card with high-resolution artwork, detailed subroutine telemetry, and status effect breakdowns
- **AND** the system triggers a subtle tactile vibration pulse (`navigator.vibrate(40)`) if supported by the client device.

#### Scenario: Double-tap card execution
- **WHEN** a player interacts with a card in desktop emulation mode
- **THEN** double-click or direct click is supported as fallback interaction.

#### Scenario: Single-tap card selection
- **WHEN** a player taps an unselected subroutine card in vertical layout
- **THEN** the card becomes the active focused card, elevates above adjacent cards (`z-30`), and displays a neon targeting perimeter.

#### Scenario: Focused card execution
- **WHEN** a player taps a card that is already focused and playable, or taps the dedicated inline "INJECT" button
- **THEN** the subroutine executes against the target ICE construct, consuming required RAM cycles and dismissing the focus state.

### Requirement: Thumb-Zone Combat Layout
The system SHALL position high-frequency combat interaction controls within ergonomic reach of the player's thumb in vertical viewports while preserving complete visibility of the enemy construct and intent telemetry.

#### Scenario: Vertical combat layout distribution
- **WHEN** a combat encounter renders in vertical layout
- **THEN** the enemy construct occupies the upper display section with compact vertical scaling ensuring the threat intent telemetry badge is never clipped by top browser chrome
- **AND** RAM counter, draw/discard telemetry, and the End Cycle button sit on a compact middle status bar
- **AND** the player's hand ribbon occupies the lower thumb-accessible zone with horizontal scroll and focused card elevation.

### Requirement: Responsive Subroutine Reward and Vault Layout
The system SHALL display subroutine draft choices in a horizontal swipe ribbon within the mobile viewport to prevent vertical title and action button clipping.

#### Scenario: Draft choices in vertical mobile layout
- **WHEN** the player views subroutine rewards or data vault choices in a mobile viewport (width < 768px or mobile simulation mode)
- **THEN** the choices render in a horizontal scrollable row (`overflow-x-auto`, `snap-x`) with compact card sizing
- **AND** the view header text and the skip action button remain fully visible without clipping.

#### Scenario: Selecting a reward card on mobile
- **WHEN** the player taps one of the subroutine choices in the horizontal reward ribbon
- **THEN** the selected subroutine is committed to the master deck
- **AND** navigation proceeds to the matrix map graph.

