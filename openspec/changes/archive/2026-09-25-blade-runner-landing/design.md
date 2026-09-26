## Context

The current landing portal (`src/landing/`) is structured into multiple boxy widgets (`HeroCRT.tsx`, `RomCartridges.tsx`, `GenesisStory.tsx`, `TechRadiography.tsx`, `OperatorBadge.tsx`, `TopNav.tsx`). While structurally complete, the visual design suffers from card fatigue and noisy decorative borders. The goal is to overhaul this into an elegant, cinematic Blade Runner aesthetic without saturating the screen.

## Goals / Non-Goals

**Goals:**
- Implement a Blade Runner atmospheric visual identity using volumetric mist, warm amber (`#ff9f1c`/`#ffb703`) and rain cyan (`#00e5ff`) accents over deep void (`#020408`).
- Eliminate visual clutter, heavy borders, and faux-hardware noise in favor of generous dark space and refined typography.
- Incorporate Arturo Herrera's actual photograph into an interactive Tyrell-style biometric dossier (`Voight-Kampff` laser scan on hover) with his Android + AI credentials and LinkedIn link.
- Display the canonical cover art (`/assets/book/cover.jpg`) for the Grimoires with 1-click download buttons.
- Ensure 100% responsiveness and silky performance on both mobile and desktop without heavy canvas overhead.
- Provide warm Vangelis CS-80 inspired analog synthesizer audio and tactile sound feedback.

**Non-Goals:**
- Modifying the game engine itself (`/game.html`, `src/engine/`, `src/store/`). The landing portal remains strictly decoupled.
- Adding third-party tracking, analytics, or external font/asset dependencies that require remote CDNs.

## Decisions

### 1. Volumetric Mist vs Canvas Particle Simulation
- **Decision**: Use hardware-accelerated CSS radial gradients with slow, organic opacity and scale keyframe pulses rather than an intensive 2D/WebGL canvas loop.
- **Rationale**: CSS keyframe ambient mist maintains constant 60fps, works flawlessly across low-end mobile devices, doesn't drain battery, and avoids canvas resizing quirks.
- **Alternatives considered**: Three.js smoke shaders (too heavy, bundle size bloat), HTML5 Canvas 2D particle simulation (CPU intensive on mobile).

### 2. Dossier Biometric Laser Scan Interaction
- **Decision**: Implement a CSS-driven vertical laser sweep across the photograph triggered on `:hover` or container tap, paired with a WebAudio synthesized chime.
- **Rationale**: Creates an immediate "wow" factor that feels authentically diegetic (like a Blade Runner Voight-Kampff eye/identity verification) without needing external media or libraries.
- **Alternatives considered**: Static image card (boring, misses cyberpunk feel), complex 3D tilt library (unnecessary dependency).

### 3. Visual Grimoires Showcase
- **Decision**: Render `/assets/book/cover.jpg` with a physical 3D book spine/drop shadow perspective and direct 1-click download links (via environment variables `VITE_PDF_ES_URL` and `VITE_PDF_EN_URL`, falling back to local/releases).
- **Rationale**: Showcases the actual publication-quality book art Arturo generated, making the 80+ page manuals feel like tangible collector items.
- **Alternatives considered**: Faux floppy disk or cartridge plastic graphics (looked too toy-like and saturated the page).

### 4. Audio Architecture (Vangelis Analog Pad)
- **Decision**: Re-tune the procedural synthesizer in `landingAudio.ts` to use warm saw/triangle oscillators routed through a resonant lowpass biquad filter with a slow 0.12 Hz LFO breathing sweep.
- **Rationale**: Evokes Vangelis' iconic *Tears in Rain* Yamaha CS-80 soundtrack rather than harsh 8-bit chirps.

## Risks / Trade-offs

- **[Risk] High-resolution book cover and photo load times** → Mitigation: Use optimized web formats (JPEG/WebP) and lazy-loading / explicit dimensions to prevent layout shifts.
- **[Risk] Mobile tap vs hover for biometric scan** → Mitigation: Bind both mouse enter and touch events to activate the scanline animation cleanly on smartphones.
