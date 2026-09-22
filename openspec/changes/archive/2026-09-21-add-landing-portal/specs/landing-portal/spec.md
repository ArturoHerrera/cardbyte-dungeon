## Purpose

Provides a public landing page and interactive showcase for Cardbyte Dungeon, introducing the game's premise, offering collection grimoires for download, sharing project genesis with generative AI, highlighting technical architecture, and presenting the creator's professional profile.

## ADDED Requirements

### Requirement: Multi-page navigation and game isolation
The system SHALL provide a dedicated root entry page (`/`) for public showcase and an isolated game entry point (`/game.html`) that executes the full gameplay application without preloading game assets on the landing page.

#### Scenario: User visits the root landing page
- **WHEN** the user navigates to the root URL `/`
- **THEN** the system renders the landing page showcase without mounting the game's combat engine, audio manager, or game state store

#### Scenario: User launches the game from the landing portal
- **WHEN** the user clicks the "JACK IN / PLAY NOW" call-to-action button
- **THEN** the browser navigates to `/game.html` and launches the full Cardbyte Dungeon application

### Requirement: Atmospheric CRT hero with typewriter telemetry
The system SHALL render a CRT monitor hero section with authentic scanline overlay, glowing phosphor aesthetics, and an automated typewriter effect presenting a cyberpunk opening quote and real-time mock telemetry status indicators.

#### Scenario: Initial hero load
- **WHEN** the landing page finishes loading
- **THEN** the system displays real-time telemetry badges (`LATENCY`, `ICE_LEVEL`, `SYSTEM_ONLINE`) and streams the introductory text character-by-character with a blinking cursor

### Requirement: Diegetic ROM language cartridge switcher
The system SHALL offer a bilingual switch (English as default, Spanish available) presented as a swappable system ROM cartridge with an accompanying visual patch notification.

#### Scenario: Switching to Spanish locale
- **WHEN** the user selects the Spanish language ROM toggle
- **THEN** the system updates all landing page copy to Spanish and flashes a temporary diegetic notification (`[PATCHING_ROM: ES-MX...]`)

#### Scenario: Switching to English locale
- **WHEN** the user selects the English language ROM toggle
- **THEN** the system updates all landing page copy to English and flashes a temporary diegetic notification (`[INJECTING_LOCALE: EN-US]`)

### Requirement: Physical ROM cartridge manual downloads
The system SHALL display digital representations of physical ROM cartridges for the Spanish (85 pages) and English (82 pages) Operator Manuals, linking directly to GitHub Release artifact downloads via environment variables with fallback links.

#### Scenario: User clicks download on Spanish grimoire
- **WHEN** the user clicks the download button on the Spanish ROM cartridge
- **THEN** the browser initiates the download of the Spanish canonical PDF from the configured release endpoint

#### Scenario: User clicks download on English grimoire
- **WHEN** the user clicks the download button on the English ROM cartridge
- **THEN** the browser initiates the download of the English canonical PDF from the configured release endpoint

### Requirement: Genesis story and technical architecture showcase
The system SHALL detail the background of the game as a 48-hour generative AI acceleration experiment and provide technical breakdowns of React 19, TypeScript, Zustand, Tailwind CSS v4, WebAudio synthesis, and mobile-first responsive architecture.

#### Scenario: Viewing the genesis and tech stack sections
- **WHEN** the user scrolls to the "Behind the ICE" and "Technical Radiography" sections
- **THEN** the system presents the AI workflow breakdown and interactive technology specification cards with links to the GitHub repository

### Requirement: Operator identity badge with direct professional links
The system SHALL present an interactive cyber security identity credential badge highlighting Arturo Herrera's 7+ years of Senior Mobile (Android) experience and AI Engineering studies, containing verified links to LinkedIn and GitHub.

#### Scenario: Interacting with the operator badge
- **WHEN** the user clicks the LinkedIn link on the operator identity badge
- **THEN** the browser opens `https://www.linkedin.com/in/arturo-herrera0792/` in a new tab with secure `noopener,noreferrer` attributes

### Requirement: Procedural ambient audio with diegetic mechanical controls
The system SHALL provide an optional ambient procedural synthesizer soundtrack using WebAudio along with subtle mechanical click sounds, defaulting to muted with an explicit audio toggle.

#### Scenario: User unmutes audio
- **WHEN** the user clicks the audio toggle to enable sound
- **THEN** the system initializes an ambient WebAudio synthesized drone loop and updates the audio indicator to `[AUDIO: ACTIVE]`

#### Scenario: User interacts with UI controls while audio is enabled
- **WHEN** the user clicks a ROM cartridge, language switch, or navigation link while audio is enabled
- **THEN** the system generates a subtle synthesized mechanical terminal beep
