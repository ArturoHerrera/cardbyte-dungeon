# cyber-audio-system Specification

## Purpose

Manages the game's hybrid auditory landscape, combining streaming background ambient and combat music loops with real-time procedural Web Audio sound effect synthesis, volume buses, and persistent operator audio preferences.

## Requirements

### Requirement: Background Music Looping and Scene Transitions
The system SHALL provide looping background music tailored to game state scenes with smooth cross-fading to prevent abrupt auditory cuts.

#### Scenario: Title screen music playback
- **WHEN** the application loads the Title Screen and audio is initialized
- **THEN** the system loops the ambient cyberdeck title soundtrack (`ambient_title.ogg`) at the configured music volume.

#### Scenario: Transition to cyberspace matrix map
- **WHEN** the player begins or resumes a run entering the cyberspace map graph
- **THEN** the title soundtrack fades out smoothly over 1.0s and the matrix exploration theme (`matrix_map.ogg`) fades in.

#### Scenario: Transition to combat encounter
- **WHEN** the player enters an active combat node encounter
- **THEN** the background audio cross-fades smoothly into the high-tension combat loop (`combat_loop.ogg`).

#### Scenario: Concluding combat
- **WHEN** the combat encounter resolves (enemy defeated or player retreats)
- **THEN** the combat soundtrack stops and the matrix map exploration soundtrack resumes.

### Requirement: Procedural Tactical Sound Effects Synthesis
The system SHALL synthesize retro-cyberpunk tactical audio cues using Web Audio API oscillators and noise generators without requiring external audio file downloads.

#### Scenario: Tactical card injection
- **WHEN** the player plays a subroutine card from hand
- **THEN** the system generates an immediate rising electronic frequency burst (`CARD_INJECT`) reinforcing execution.

#### Scenario: Firewall barrier raise
- **WHEN** a defense subroutine generates ICE-Buffer (shield)
- **THEN** the system generates a resonant harmonic chime (`SHIELD_UP`) confirming firewall establishment.

#### Scenario: Neural damage and distortion
- **WHEN** the player takes flesh HP damage from hostile ICE attacks
- **THEN** the system generates a low-frequency square-wave crunch and noise distortion (`DAMAGE_CRIT`).

#### Scenario: Terminal interface interaction
- **WHEN** the operator clicks interactive buttons or inspects subroutines
- **THEN** the system generates a crisp, subtle micro-click (`UI_CLICK`).

### Requirement: User Audio Controls and Volume Persistence
The system SHALL provide accessible audio toggle and volume controls in the TopBar interface, persisting preferences across browser sessions.

#### Scenario: Muting audio from TopBar
- **WHEN** the operator clicks the audio icon in the TopBar or triggers the mute shortcut
- **THEN** all background music and procedural SFX are immediately silenced
- **AND** the icon updates to indicate muted state (`VolumeX`)
- **AND** the muted state is saved to `localStorage`.

#### Scenario: Adjusting audio volumes
- **WHEN** the operator adjusts music or SFX volume sliders
- **THEN** gain nodes immediately adjust output volume without playback stutter
- **AND** settings persist in `localStorage`.

### Requirement: Browser Autoplay Policy Compliance
The system SHALL comply with browser autoplay constraints by deferring audio playback until the operator provides an initial interactive gesture.

#### Scenario: First user gesture unlock
- **WHEN** the operator performs their first touch or click on the interface (e.g. clicking "JACK IN" or the audio button)
- **THEN** the system resumes the Web Audio context and starts the appropriate scene soundtrack without throwing browser autoplay exceptions.
