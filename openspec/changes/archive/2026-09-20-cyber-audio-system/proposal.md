## Why

Currently, *CardByte Dungeon* is completely silent (`AUDIO: OFF` in terminal status). Audio is a foundational pillar for cyberpunk tension, dramatic immersion, and tactile feedback during subroutine injection and Black ICE confrontations. 

Adding audio without compromising performance or causing future refactoring debt requires a lightweight, scalable hybrid design: royalty-free, compressed background ambient loops (OGG/WebM) paired with zero-byte procedural Web Audio API sound effects, accessed through a unified, decoupled `AudioManager` facade.

## What Changes

- **Unified `AudioManager` Service**: Clean singleton facade abstracting music tracks, Web Audio procedural synth effects, volume bus controls, and browser autoplay unlocks.
- **Royalty-Free Ambient & Combat Music**: Highly optimized, lightweight background audio loops for Title (`ambient_title.ogg`), Matrix Map (`matrix_map.ogg`), and Combat encounter (`combat_loop.ogg`).
- **Zero-Byte Procedural Sound Effects (Web Audio API)**: Real-time oscillator synthesizers generating crisp retro-cyberpunk tactile audio cues:
  - `UI_CLICK`: Short cybernetic terminal click.
  - `CARD_INJECT`: Rising digital arpeggio upon playing a subroutine.
  - `SHIELD_UP`: Resonant electronic firewall frequency.
  - `DAMAGE_CRIT`: Low-frequency static burst and glitch distortion on neural damage.
- **Audio Control HUD (TopBar)**: Interactive speaker toggle (`Volume2` / `VolumeX`) with quick-mute support, volume controls, and persistent settings in `localStorage`.
- **Browser Autoplay Compliance**: Seamless AudioContext resume on user's first interactive gesture (clicking "JACK IN", navigating, or unmuting).

## Capabilities

### New Capabilities
- `cyber-audio-system`: Comprehensive audio playback, background music management, procedural sound synthesis, and user audio preference controls.

### Modified Capabilities
<!-- No requirement changes to existing combat-engine or matrix-progression specs -->

## Impact

- **New Files**: `src/audio/audioManager.ts`, `src/audio/proceduralSynth.ts`, `public/assets/audio/*.ogg`.
- **Modified Components**: `src/components/UI/TopBar.tsx`, `src/store/cardByteStore.ts`, `src/components/Combat/CardView.tsx`, `src/components/Combat/CombatView.tsx`, `src/components/Map/CardByteGraph.tsx`, `src/components/UI/TitleScreen.tsx`.
- **Dependencies**: Native browser Web Audio API and HTML5 Audio element. Zero new external npm packages.
