## ADDED Requirements

### Requirement: Web Audio Node Lifecycle Cleanup and Battery Conservation
The audio engine SHALL immediately dispose transient Web Audio API nodes upon playback conclusion and SHALL suspend the audio context when the application document becomes hidden to conserve system resources and mobile battery.

#### Scenario: Oscillator and filter disconnection on completion
- **WHEN** any procedural sound effect finishes playing
- **THEN** all associated oscillator, gain, and biquad filter nodes are explicitly disconnected from the audio graph via `disconnect()`.

#### Scenario: AudioContext suspension in background tab
- **WHEN** the browser tab or mobile window visibility state changes to `hidden`
- **THEN** the audio engine suspends the active `AudioContext` and pauses background music playback
- **AND** when visibility returns to `visible`, the audio engine resumes the context and active soundtrack.
