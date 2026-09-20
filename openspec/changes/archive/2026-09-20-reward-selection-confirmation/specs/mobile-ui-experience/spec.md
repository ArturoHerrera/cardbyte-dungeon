## MODIFIED Requirements

### Requirement: Responsive Subroutine Reward and Vault Layout
The system SHALL display subroutine draft choices in a horizontal swipe ribbon within the mobile viewport and support deliberate two-step card selection with focus highlight and explicit installation confirmation to prevent accidental card picks.

#### Scenario: Draft choices in vertical mobile layout
- **WHEN** the player views subroutine rewards or data vault choices in a mobile viewport (width < 768px or mobile simulation mode)
- **THEN** the choices render in a horizontal scrollable row (`overflow-x-auto`, `snap-x`) with compact card sizing
- **AND** the view header text and the skip action button remain fully visible without clipping.

#### Scenario: Selecting a reward card on mobile
- **WHEN** the player taps an unselected subroutine choice in the reward ribbon
- **THEN** that card becomes focused with elevated z-index and glowing border
- **AND** an explicit "INSTALL SUBROUTINE" confirmation button is rendered in the action bar.

#### Scenario: Confirming selection of a reward card
- **WHEN** the player taps the confirmation action button or taps the already-focused card a second time
- **THEN** the selected subroutine is committed to the master deck with confirmation audio feedback
- **AND** navigation proceeds to the matrix map graph.
