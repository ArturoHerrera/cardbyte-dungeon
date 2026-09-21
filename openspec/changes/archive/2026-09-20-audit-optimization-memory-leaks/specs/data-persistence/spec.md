## MODIFIED Requirements

### Requirement: Neural Deck Cartridge and Cyber-String Dump
The system SHALL support exporting and importing game state via a compressed Cyber-String or `.deck` cartridge file with checksum verification.

#### Scenario: Successful state export
- **WHEN** the player initiates a ROM Dump export
- **THEN** a `CB7://` prefixed Base64 string with CRC32 checksum is generated for clipboard copying and a `.deck` file download is triggered.

#### Scenario: Corrupted dump rejection
- **WHEN** an imported Cyber-String or `.deck` file has an invalid payload or checksum mismatch
- **THEN** the system rejects the import with an error message and leaves existing local data unmutated.

#### Scenario: Malformed payload schema rejection
- **WHEN** an imported payload passes checksum and decompression but contains incomplete, missing, or malformed profile or run structures
- **THEN** the storage adapter rejects the import with a schema validation error and prevents saving invalid state.
