# landing-portal Specification

## Purpose
Provides a public landing page and interactive showcase for Cardbyte Dungeon, introducing the game's premise, offering collection grimoires for download, sharing project genesis with generative AI, highlighting technical architecture, and presenting the creator's professional profile.

## Requirements

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

### Requirement: Diegetic ROM language cartridge switcher
The system SHALL offer a bilingual switch (English as default, Spanish available) presented as a swappable system ROM cartridge with an accompanying visual patch notification.

#### Scenario: Switching to Spanish locale
- **WHEN** the user selects the Spanish language ROM toggle
- **THEN** the system updates all landing page copy to Spanish and flashes a temporary diegetic notification (`[PATCHING_ROM: ES-MX...]`)

#### Scenario: Switching to English locale
- **WHEN** the user selects the English language ROM toggle
- **THEN** the system updates all landing page copy to English and flashes a temporary diegetic notification (`[INJECTING_LOCALE: EN-US]`)

### Requirement: Physical ROM cartridge manual downloads
The system SHALL showcase the canonical Operator Grimoires displaying the official book cover artwork, key document specifications (page count, US letter canonical format), and direct 1-click download actions for both Spanish (85 pages) and English (82 pages) editions.

#### Scenario: User views manual showcase
- **WHEN** the user scrolls to the grimoires section
- **THEN** the system renders the high-resolution vector cover artwork (`/assets/book/cover.jpg`) with a physical book finish and displays metadata for both language editions

#### Scenario: User clicks download on Spanish grimoire
- **WHEN** the user clicks the direct download button on the Spanish grimoire
- **THEN** the browser initiates the direct download of the Spanish canonical PDF from the configured release endpoint

#### Scenario: User clicks download on English grimoire
- **WHEN** the user clicks the direct download button on the English grimoire
- **THEN** the browser initiates the direct download of the English canonical PDF from the configured release endpoint

### Requirement: Genesis story and technical architecture showcase
The system SHALL detail the game's origin as a 48-hour generative AI acceleration and OpenSpec experiment born from passion for 1984 Gibsonian cyberpunk, seamlessly integrated with the technical architecture specification (React 19, TypeScript, Zustand 5, Tailwind CSS v4, WebAudio API, OpenSpec spec-driven framework).

#### Scenario: Viewing the genesis and tech stack sections
- **WHEN** the user navigates to the Genesis section
- **THEN** the system presents the 48-hour AI acceleration narrative alongside technical architecture cards detailing the underlying engine stack with zero visual clutter

### Requirement: Operator identity badge with direct professional links
The system SHALL present an architect dossier credential featuring Arturo Herrera's nocturnal portrait with an interactive biometric laser scan effect (`Voight-Kampff` optical scan) on hover, detailing 7+ years of Senior Android Engineering experience, ongoing Artificial Intelligence Engineering studies, and verified direct links to LinkedIn and GitHub.

#### Scenario: Interacting with the operator badge
- **WHEN** the user clicks the LinkedIn link on the operator identity badge
- **THEN** the browser opens `https://www.linkedin.com/in/arturo-herrera0792/` in a new tab with secure `noopener,noreferrer` attributes

#### Scenario: Interacting with the architect portrait
- **WHEN** the user hovers over or taps the architect portrait
- **THEN** an animated biometric laser scanline sweeps vertically across the photograph and displays verified clearance telemetry

### Requirement: Procedural ambient audio with diegetic mechanical controls
The system SHALL provide an optional ambient procedural synthesizer soundtrack inspired by Vangelis analog CS-80 synthesizer pads (deep warm root and harmonic fifth with subtle breathing LFO) along with tactile mechanical click and biometric scan sounds, defaulting to muted with an explicit audio toggle.

#### Scenario: User unmutes audio
- **WHEN** the user clicks the audio toggle to enable sound
- **THEN** the system initializes an ambient WebAudio synthesized drone loop and updates the audio indicator to `[AUDIO: ACTIVE]`

#### Scenario: User interacts with UI controls while audio is enabled
- **WHEN** the user clicks a button, language switch, or triggers the biometric scan while audio is enabled
- **THEN** the system generates a subtle synthesized mechanical terminal beep or harmonic chime
