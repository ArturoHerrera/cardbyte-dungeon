## Context

Cardbyte Dungeon is currently built as a single-page React 19 application bundled with Vite 8 and Tailwind CSS 4 (`@tailwindcss/vite`). All game dependencies (Zustand store, WebAudio sound effects, Canvas-based map, and modals) initialize on root load in `index.html`. 

To support a public landing page without degrading performance or complicating hosting, this design implements a Vite Multi-Page Architecture (MPA) serving two static entry points from the same build output.

## Goals / Non-Goals

**Goals:**
- Provide zero-impact initial page loads for visitors by isolating the game engine into `game.html` and serving the showcase on `index.html`.
- Create a dedicated component architecture under `src/landing/` reusing global Tailwind styles and typography tokens (`JetBrains Mono`, `Share Tech Mono`, `VT323`).
- Implement an ambient WebAudio synthesizer engine for subtle diegetic atmosphere with non-intrusive muted-by-default behavior.
- Render cybernetic ROM cartridges with dynamic environment variable fallback for direct GitHub Release PDF downloads.
- Expose Arturo Herrera's professional credentials with security-compliant outbound links to LinkedIn and GitHub.

**Non-Goals:**
- Altering the internal gameplay logic, combat engine, or save state in `src/App.tsx`.
- Introducing heavy third-party routing libraries (e.g. `react-router-dom`); navigation between the landing and the game relies on native browser URL navigation (`/game.html`).
- Embedding 47MB binary PDFs directly into git or client-side assets; downloads link to external release hosting.

## Decisions

### 1. Multi-Page Vite Configuration over React Router
- **Choice**: Configure `vite.config.ts` using `build.rollupOptions.input` pointing to `index.html` (Landing) and `game.html` (Game).
- **Rationale**: Keeps the landing page lightweight (<100KB initial bundle vs >1MB when preloading the entire game and audio systems). Guarantees 100% compatibility with static hosting (Vercel, Netlify, GitHub Pages) without custom SPA rewrite rules.
- **Alternatives Considered**: Single-page app with `react-router-dom` or hash routing (`/#/game`). Rejected because it forces every casual reader to download the full game bundle and audio dependencies upfront.

### 2. Component Structure in `src/landing/`
- **Choice**: Encapsulate all landing components in `src/landing/`:
  - `src/landing/main.tsx`: Entry point mounting `LandingApp`.
  - `src/landing/LandingApp.tsx`: Layout container orchestrating sections.
  - `src/landing/components/HeroCRT.tsx`: Scanlines, real-time telemetry, typewriter effect.
  - `src/landing/components/RomCartridges.tsx`: Interactive grimoire manual download cards.
  - `src/landing/components/GenesisStory.tsx`: The 48h AI experiment narrative.
  - `src/landing/components/TechRadiography.tsx`: Architectural cards highlighting React 19, Tailwind 4, Zustand, and Android-inspired responsive viewport.
  - `src/landing/components/OperatorBadge.tsx`: Digital security ID card for Arturo Herrera with direct LinkedIn link.
  - `src/landing/audio/landingAudio.ts`: Standalone lightweight WebAudio drone and mechanical click synthesizer.
  - `src/landing/i18n/locales.ts`: Diegetic bilingual dictionary (EN default, ES).
- **Rationale**: Maximum modularity; changes to the landing page never risk breaking game code.

### 3. Native WebAudio Synthesizer for Ambient Sound
- **Choice**: Implement a self-contained WebAudio node graph using 2 low-frequency sine/saw oscillators with lowpass filter sweep and pink noise floor, activated only after user interaction.
- **Rationale**: Zero external audio asset dependencies (no `.mp3`/`.ogg` network requests), instant startup, zero bandwidth, authentic 80s analog synth feel.

### 4. Release Download URLs via Environment Configuration
- **Choice**: Read URLs from `import.meta.env.VITE_PDF_ES_URL` and `VITE_PDF_EN_URL`, falling back gracefully to the canonical repository releases URL (`https://github.com/ArturoHerrera/cardbyte-dungeon/releases`).
- **Rationale**: Allows instant publication without requiring hardcoded commits when new PDF versions are cut.

## Risks / Trade-offs

- **[Risk] Hosting subpath issues on GitHub Pages** → Mitigation: Use relative or base-aware paths (`./game.html` and standard Vite `base` configuration).
- **[Risk] Autoplay policy blocking WebAudio** → Mitigation: Audio is strictly muted by default; WebAudio `AudioContext` only resumes upon explicit user click on the audio toggle.
- **[Risk] Link rot if releases are deleted** → Mitigation: Provide secondary fallback anchor to the repository's `/books` directory or repository root.
