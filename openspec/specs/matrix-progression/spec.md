# matrix-progression Specification

## Purpose
Generates and manages the procedural 8-layer Directed Acyclic Graph (DAG) security matrix, node connectivity, boss convergence, and progressive cryptographic decryption visibility.

## Requirements

### Requirement: Procedural Matrix Generation
The system SHALL generate a deterministic 8-layer DAG map (Depth 0 to Depth 7) using a seeded PRNG.

#### Scenario: Seeded matrix layout initialization
- **WHEN** a run is initialized with a specific numeric seed
- **THEN** exactly 8 layers are created with 2 to 3 nodes per layer (Depths 0 to 6) and Depth 7 converging into exactly one unified BOSS node
- **AND** identical seeds produce identical node distributions and connections

### Requirement: Strict Planar Connectivity
Every node in layer $K$ SHALL connect to at least one node in $K+1$, every node in $K+1$ SHALL receive at least one connection from $K$, and connections SHALL only link adjacent indices without crossing edges.

#### Scenario: Navigable non-orphaned graph
- **WHEN** the matrix topology resolves
- **THEN** no nodes exist without inbound connections (except Depth 0) or outbound connections (except Depth 7)
- **AND** connections satisfy $|index_A - index_B| \le 1$

### Requirement: Weighted Node Type Allocation
The system SHALL allocate node types according to defined layer distribution rules.

#### Scenario: Layer distribution constraints
- **WHEN** node types are populated across layers
- **THEN** Depth 0 contains 100% COMBAT nodes
- **AND** Depths 1 through 5 distribute 60% COMBAT, 20% ELITE, 10% REST, and 10% TREASURE
- **AND** Depth 6 contains 100% REST nodes
- **AND** Depth 7 contains 100% BOSS nodes

### Requirement: Crypto-Fog of War and Decryption Horizon
The system SHALL hide upcoming node types beyond the immediate visibility horizon until unlocked by traversal progress, and completing any node (combat or non-combat) SHALL decrypt downstream path nodes and advance the current node pointer.

#### Scenario: Progressive decryption upon node completion
- **WHEN** the player enters the matrix at Depth 0
- **THEN** Depths 0, 1, and 7 start with revealed status `true` while Depths 2 through 6 start with revealed status `false` displaying encrypted hexadecimal placeholders
- **AND** completing any node at Depth $K$ (including combat, treasure vault, or rest site) decrypts all connected nodes at Depth $K+1$ and $K+2$
- **AND** the completed node becomes the new current node in the navigation state, enabling interaction with its outgoing connected nodes in layer $K+1$.

### Requirement: Decompression Node Subroutine Purging
The system SHALL provide an operator decompression action allowing the permanent deletion/purging of a selected subroutine from the player's master deck, while strictly preventing deck reduction below a minimum operational threshold of 4 subroutines.

#### Scenario: Deleting a subroutine at a rest node
- **WHEN** the player accesses a Decompression Node (REST) with at least 5 subroutines in their master deck
- **THEN** the interface offers options to Cool Down (recover integrity), Patch Subroutine (upgrade a card), or Purge Subroutine (permanently delete a chosen card from the deck)
- **AND** executing a purge removes the selected card from `masterDeck` and persists the updated run state.

#### Scenario: Minimum deck safeguard
- **WHEN** the player accesses a Decompression Node with 4 or fewer subroutines
- **THEN** the Purge Subroutine option is disabled or displays a critical buffer safeguard preventing deletion to prevent combat soft-locks.

### Requirement: Responsive Vertical Matrix Topology
The system SHALL support an ascending vertical topology layout for the 8-layer security matrix when viewed in portrait or vertical mobile mode, maximizing usable vertical height and automatically focusing the operative's active layer.

#### Scenario: Vertical matrix rendering
- **WHEN** the cyberspace map renders in a vertical viewport (mobile or desktop vertical simulation)
- **THEN** Depth 0 (Intrusion Layer) renders at the bottom of the map view
- **AND** Depth 7 (Wintermute Core Boss) renders at the top of the map view
- **AND** node connections link upwards from layer $K$ to layer $K+1$
- **AND** the scrolling matrix viewport occupies the full vertical extent without dead bottom spacing.

#### Scenario: Active depth auto-scroll centering
- **WHEN** the vertical map view mounts or the player advances to a new node
- **THEN** the viewport immediately scrolls to center the player's active layer in the visible frame so the user never lands on unrevealed top layers on a new run.


