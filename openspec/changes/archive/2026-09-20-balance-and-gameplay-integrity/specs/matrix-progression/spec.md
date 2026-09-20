## ADDED Requirements

### Requirement: Decompression Node Subroutine Purging
The system SHALL provide an operator decompression action allowing the permanent deletion/purging of a selected subroutine from the player's master deck, while strictly preventing deck reduction below a minimum operational threshold of 4 subroutines.

#### Scenario: Deleting a subroutine at a rest node
- **WHEN** the player accesses a Decompression Node (REST) with at least 5 subroutines in their master deck
- **THEN** the interface offers options to Cool Down (recover integrity), Patch Subroutine (upgrade a card), or Purge Subroutine (permanently delete a chosen card from the deck)
- **AND** executing a purge removes the selected card from `masterDeck` and persists the updated run state.

#### Scenario: Minimum deck safeguard
- **WHEN** the player accesses a Decompression Node with 4 or fewer subroutines
- **THEN** the Purge Subroutine option is disabled or displays a critical buffer safeguard preventing deletion to prevent combat soft-locks.
