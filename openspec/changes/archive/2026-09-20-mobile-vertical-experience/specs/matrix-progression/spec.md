## ADDED Requirements

### Requirement: Responsive Vertical Matrix Topology
The system SHALL support an ascending vertical topology layout for the 8-layer security matrix when viewed in portrait or vertical mobile mode.

#### Scenario: Vertical matrix rendering
- **WHEN** the cyberspace map renders in a vertical viewport (mobile or desktop vertical simulation)
- **THEN** Depth 0 (Intrusion Layer) renders at the bottom of the map view
- **AND** Depth 7 (Wintermute Core Boss) renders at the top of the map view
- **AND** node connections link upwards from layer $K$ to layer $K+1$.

#### Scenario: Active depth auto-scroll centering
- **WHEN** the vertical map view mounts or the player advances to a new node
- **THEN** the viewport smoothly scrolls to center the player's active layer in the visible frame.
