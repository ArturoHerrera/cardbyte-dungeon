# data-persistence Specification

## Purpose
Provides dual-tier local browser persistence for active runs and meta-player profiles, plus the Neural Deck Cartridge / ROM Dump import and export interchange system.

## Requirements

### Requirement: Local Run and Profile Persistence
The application SHALL persist active runs and permanent meta-profiles in browser `localStorage`.

#### Scenario: Run state hydration on refresh
- **WHEN** the browser window is reloaded during an active matrix run
- **THEN** the application detects the stored run and offers a "Resume Matrix Run" action that restores player HP, deck, and map state exactly as left

#### Scenario: Run cleanup on completion
- **WHEN** a run concludes in VICTORY or FLATLINE
- **THEN** the active run storage is cleared and player profile statistics (runs, wins, flatlines, depth) are permanently updated

### Requirement: Neural Deck Cartridge and Cyber-String Dump
The system SHALL support exporting and importing game state via a compressed Cyber-String or `.deck` cartridge file with checksum verification.

#### Scenario: Successful state export
- **WHEN** the player initiates a ROM Dump export
- **THEN** a `CB7://` prefixed Base64 string with CRC32 checksum is generated for clipboard copying and a `.deck` file download is triggered

#### Scenario: Corrupted dump rejection
- **WHEN** an imported Cyber-String or `.deck` file has an invalid payload or checksum mismatch
- **THEN** the system rejects the import with an error message and leaves existing local data unmutated.

#### Scenario: Malformed payload schema rejection
- **WHEN** an imported payload passes checksum and decompression but contains incomplete, missing, or malformed profile or run structures
- **THEN** the storage adapter rejects the import with a schema validation error and prevents saving invalid state.
