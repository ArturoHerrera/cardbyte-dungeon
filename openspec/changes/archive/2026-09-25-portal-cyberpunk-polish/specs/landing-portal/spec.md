## MODIFIED Requirements

### Requirement: Multi-page navigation and game isolation
The system SHALL provide a dedicated root entry page (`/`) for public showcase and an isolated game entry point (`/game.html`) that executes the full gameplay application without preloading game assets on the landing page, displaying the canonical title `CARDBYTE // DUNGEON` and serving a dedicated cyberpunk vector favicon (`/favicon.svg`).

#### Scenario: User visits the root landing page
- **WHEN** the user navigates to the root URL `/`
- **THEN** the system renders the landing page showcase with the canonical `CARDBYTE // DUNGEON` brand title and favicon without mounting the game's combat engine, audio manager, or game state store

#### Scenario: User launches the game from the landing portal
- **WHEN** the user clicks the "JACK IN / PLAY NOW" call-to-action button
- **THEN** the browser navigates to `/game.html` and launches the full Cardbyte Dungeon application

#### Scenario: Browser requests the site favicon
- **WHEN** the browser requests `/favicon.svg` on either the landing page or `/game.html`
- **THEN** the server returns a cyberpunk cyberdeck vector icon with neon amber/cyan accents

### Requirement: Atmospheric CRT hero with typewriter telemetry
The system SHALL render a Blade Runner cinematic hero section with subtle volumetric mist lighting, deep void aesthetics, high-contrast cyberpunk typography (`Rajdhani` / `Share Tech Mono`), and an automated typewriter presentation that continuously loops through a curated anthology of cyberpunk quotes from *Neuromancer*, *Blade Runner*, and *The Matrix*.

#### Scenario: Initial hero load
- **WHEN** the landing page finishes loading
- **THEN** the system displays the volumetric mist atmosphere with warm amber and cyan light beams, streams the first cyberpunk quote character-by-character with a blinking cursor, and presents clear call-to-actions to play the game or inspect grimoires

#### Scenario: Viewport resize and mobile responsiveness
- **WHEN** the user views the landing page on a mobile screen or resizes the viewport
- **THEN** the hero layout maintains generous breathing room, legible typography, and centered call-to-action touch targets without horizontal scroll or truncated copy

#### Scenario: Continuous quote progression
- **WHEN** a quote completes typing on the terminal
- **THEN** the system pauses for a reading interval, smoothly clears the text, and streams the next quote in sequence with corresponding attribution across the active locale (ES/EN)
