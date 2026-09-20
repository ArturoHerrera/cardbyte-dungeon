## MODIFIED Requirements

### Requirement: Crypto-Fog of War and Decryption Horizon
The system SHALL hide upcoming node types beyond the immediate visibility horizon until unlocked by traversal progress, and completing any node (combat or non-combat) SHALL decrypt downstream path nodes and advance the current node pointer.

#### Scenario: Progressive decryption upon node completion
- **WHEN** the player enters the matrix at Depth 0
- **THEN** Depths 0, 1, and 7 start with revealed status `true` while Depths 2 through 6 start with revealed status `false` displaying encrypted hexadecimal placeholders
- **AND** completing any node at Depth $K$ (including combat, treasure vault, or rest site) decrypts all connected nodes at Depth $K+1$ and $K+2$
- **AND** the completed node becomes the new current node in the navigation state, enabling interaction with its outgoing connected nodes in layer $K+1$.
