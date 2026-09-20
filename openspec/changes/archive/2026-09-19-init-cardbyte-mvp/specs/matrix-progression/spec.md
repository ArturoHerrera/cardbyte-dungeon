## Purpose

Generates and manages the procedural 8-layer Directed Acyclic Graph (DAG) security matrix, node connectivity, boss convergence, and progressive cryptographic decryption visibility.

## ADDED Requirements

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
The system SHALL hide upcoming node types beyond the immediate visibility horizon until unlocked by traversal progress.

#### Scenario: Progressive decryption upon node completion
- **WHEN** the player enters the matrix at Depth 0
- **THEN** Depths 0, 1, and 7 start with revealed status `true` while Depths 2 through 6 start with revealed status `false` displaying encrypted hexadecimal placeholders
- **AND** completing a node at Depth $K$ decrypts all connected nodes at Depth $K+1$ and $K+2$
