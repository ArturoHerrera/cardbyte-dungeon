## Context

The initial Blade Runner landing layout successfully established the dark, atmospheric palette. However, branding inconsistencies ("2049"), missing favicons, standard sans-serif font fallbacks, and a static single-quote display detract from the intended high-polish retro-cyberpunk experience.

## Goals / Non-Goals

**Goals:**
- Replace all instances of "CARDBYTE // 2049" with "CARDBYTE // DUNGEON".
- Design and embed an authentic vector SVG favicon (`/favicon.svg`) with cyberdeck chip geometry and dual amber/cyan neon styling.
- Configure `Rajdhani` and `Share Tech Mono` across `index.html`, `game.html`, and `src/index.css` to eliminate generic sans-serif fonts.
- Build an automated, continuous typewriter state machine cycling through 6 classic cyberpunk quotes from *Neuromancer*, *Blade Runner*, and *The Matrix* in both English and Spanish.

**Non-Goals:**
- Altering the core combat engine or gameplay rules in `/game.html`.
- Adding heavy third-party animation libraries (Framer Motion, etc.) when React hooks and CSS achieve the desired effect with zero bundle bloat.

## Decisions

### 1. Vector SVG Favicon vs Raster PNGs
- **Decision**: Deliver a pure SVG favicon (`public/favicon.svg`) with inline `<style>` and dark-mode adaptation.
- **Rationale**: SVGs scale crisply to any resolution (Retina displays, browser tabs, mobile bookmarks), require zero additional image generation tooling, and stay under 1KB.

### 2. Typography Pairing: Rajdhani + Share Tech Mono + JetBrains Mono
- **Decision**: Use `Rajdhani` (geometric, angular, military sci-fi) for body copy and display headings, and `Share Tech Mono` / `JetBrains Mono` for code, telemetry, and terminal elements.
- **Rationale**: `Rajdhani` is the quintessential font for cyberpunk HUDs (widely recognized in *Cyberpunk 2077* and *Blade Runner* UI). It replaces the standard browser `font-sans` (Arial/Roboto) without degrading legibility.

### 3. Continuous Looping Typewriter State Machine
- **Decision**: Implement a multi-phase state machine (`'TYPING'` → `'PAUSED'` → `'DELETING'`) inside `HeroBladeRunner.tsx` with customizable timing (30ms type, 4000ms pause, 18ms backspace).
- **Rationale**: Provides living, diegetic terminal feedback that keeps the user engaged with iconic lore from Gibson, Dick, and the Wachowskis.
- **Alternatives considered**: CSS fade transition between quotes (loses the tactile keyboard feeling of an Ono-Sendai terminal).

## Risks / Trade-offs

- **[Risk] Typewriter state desync during locale toggle** → Mitigation: Reset typewriter state cleanly when `locale` changes so the new language starts from the current quote index immediately.
