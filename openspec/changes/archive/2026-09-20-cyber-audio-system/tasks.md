## 1. Procedural Web Audio Synth Engine

- [x] 1.1 Create `src/audio/proceduralSynth.ts` implementing `ProceduralSynth` with native Web Audio API oscillators for `UI_CLICK`, `CARD_INJECT`, `SHIELD_UP`, and `DAMAGE_CRIT`
- [x] 1.2 Implement safe AudioContext initialization and gesture-based resumption to comply with browser autoplay policies

## 2. Background Music Engine & Audio Assets

- [x] 2.1 Set up `public/assets/audio/` with optimized royalty-free cyberpunk background music loops: `ambient_title.ogg`, `matrix_map.ogg`, and `combat_loop.ogg`
- [x] 2.2 Implement dual HTML5 Audio cross-fading and looping in `src/audio/audioManager.ts`

## 3. AudioManager Facade & State Persistence

- [x] 3.1 Implement singleton `AudioManager` in `src/audio/audioManager.ts` with semantic methods (`playBgm`, `playSfx`, `toggleMute`, `setVolume`) and `localStorage` persistence
- [x] 3.2 Add page visibility lifecycle listener (`visibilitychange`) to pause audio when mobile browsers switch apps or minimize

## 4. UI Audio Controls & HUD Integration

- [x] 4.1 In `src/components/UI/TopBar.tsx`, add an interactive audio toggle button (`Volume2` / `VolumeX`) with reactive mute state and title tooltip
- [x] 4.2 In `src/locales/` (`en.ts` and `es.ts`), update terminal telemetry status to dynamically display `AUDIO: ACTIVE` or `AUDIO: MUTED`

## 5. Game State Audio Triggers Integration

- [x] 5.1 Trigger `UI_CLICK` audio cues on button clicks in `TitleScreen.tsx`, `TopBar.tsx`, and map node clicks in `CardByteGraph.tsx`
- [x] 5.2 Trigger `CARD_INJECT` and `SHIELD_UP` procedural SFX in `CombatView.tsx` when subroutines execute
- [x] 5.3 Trigger `DAMAGE_CRIT` procedural SFX when the player suffers unblocked HP damage
- [x] 5.4 Automate BGM scene transitions between Title Screen (`ambient_title`), Matrix Map (`matrix_map`), and Combat (`combat_loop`) based on game state

## 6. Verification & Validation

- [x] 6.1 Verify production build (`npm run build`) with zero TypeScript/CSS errors
- [x] 6.2 Validate audio playback, SFX generation, cross-fades, and mute toggle in browser
