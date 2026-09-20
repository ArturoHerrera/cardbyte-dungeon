## Context

See `proposal.md` for motivation and background.

Currently, the terminal status displays `AUDIO: OFF` and no audio infrastructure exists in the project. The application is a client-side React 19 SPA running on Vite 8, deployed in browsers across mobile phones and desktop computers.

## Goals / Non-Goals

**Goals:**
- Provide a decoupled `AudioManager` singleton facade protecting against future refactors.
- Stream and loop royalty-free background ambient and combat tracks with gentle cross-fading.
- Synthesize tactical retro-cyberpunk sound effects (0 KB download footprint) using the browser's native Web Audio API.
- Support individual volume buses (Master/BGM/SFX) and instant mute toggle in `TopBar.tsx`.
- Automatically resume suspended audio contexts on user interaction complying with strict browser autoplay policies.
- Automatically pause audio on mobile background tab switch (`document.visibilityState`).

**Non-Goals:**
- Heavy external audio engines (e.g. Howler, Tone.js, FMOD).
- Multi-channel 3D spatialized audio.

## Decisions

### 1. AudioManager Singleton Facade
- **Decision**: Create `src/audio/audioManager.ts` exporting a unified `audioManager` instance. React components and Zustand slices only call semantic methods (`audioManager.playBgm('COMBAT')`, `audioManager.playSfx('CARD_INJECT')`).
- **Rationale**: Completely insulates UI and combat logic from the underlying audio technology (HTML5 Audio element vs Web Audio buffer vs procedural synth). If audio backends change in the future, 0 React components require modification.
- **Alternatives considered**:
  - Direct React hook calls (`useAudio`): Causes re-renders and couples UI lifecycles to audio buffer loading.
  - Third-party NPM library (`howler`): Unnecessary package bloat; native HTML5 Audio + Web Audio API is lightweight and zero-dependency.

### 2. Hybrid BGM (Streaming HTML5 Audio) + SFX (Procedural Web Audio API)
- **Decision**:
  - BGM uses dual `HTMLAudioElement` instances to enable seamless cross-fades (fading out track A while fading in track B over 1.0s).
  - SFX uses a shared native `AudioContext` with parameterized oscillator frequencies (sine, square, triangle, and noise buffers) for instantaneous, zero-latency feedback without downloading sound files.
- **Rationale**: Background music requires rich, textured darksynth production best served by compressed audio files (~500KB-1MB), while tactile card clics and shield chimes require zero latency and zero asset overhead.

### 3. Audio Asset Sourcing & Optimization
- **Decision**: Use public domain / CC0 / royalty-free cyberpunk and darksynth audio loops placed in `public/assets/audio/`:
  - `ambient_title.ogg`: Atmospheric drone for Title Screen.
  - `matrix_map.ogg`: Tense infiltration pulse for Matrix Spire navigation.
  - `combat_loop.ogg`: Energetic midtempo darksynth for ICE battles.
- **Rationale**: Keeps total bundle impact under ~2.5 MB while providing studio-grade tension and production quality.

### 4. Browser Autoplay & Page Visibility Lifecycle
- **Decision**: Bind a one-time gesture listener (`pointerdown`, `keydown`) to invoke `audioManager.initContext()`. Hook into `document.addEventListener('visibilitychange')` to mute/pause audio when mobile players switch apps or lock screens.
- **Rationale**: Chrome, Brave, and Safari throw console warnings or block playback if audio starts without user interaction. Managing visibility preserves battery life.

## Risks / Trade-offs

- **[Risk] Autoplay policy blocks music on cold start** → **Mitigation**: Music remains queued; the moment the player taps "JACK IN", the volume toggle, or any menu button, the context unlocks and plays smoothly.
- **[Risk] Audio cracking on low-end mobile devices** → **Mitigation**: Procedural synth nodes disconnect and dispose immediately after note decay; BGM uses hardware-accelerated HTMLAudio elements.
