## ADDED Requirements

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
