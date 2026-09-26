## MODIFIED Requirements

### Requirement: Atmospheric CRT hero with typewriter telemetry
The system SHALL render a Blade Runner cinematic hero section with subtle volumetric mist lighting, deep void aesthetics, high-contrast cyberpunk typography (`Rajdhani` / `Share Tech Mono`), polished bilingual subtext descriptions, and an automated typewriter presentation that continuously loops through a curated anthology of cyberpunk quotes from *Neuromancer*, *Blade Runner*, and *The Matrix*.

#### Scenario: Initial hero load
- **WHEN** the landing page finishes loading
- **THEN** the system displays the volumetric mist atmosphere with warm amber and cyan light beams, streams the first cyberpunk quote character-by-character with a blinking cursor, and presents clear call-to-actions to play the game or inspect grimoires

#### Scenario: Viewport resize and mobile responsiveness
- **WHEN** the user views the landing page on a mobile screen or resizes the viewport
- **THEN** the hero layout maintains generous breathing room, legible typography, and centered call-to-action touch targets without horizontal scroll or truncated copy

#### Scenario: Continuous quote progression
- **WHEN** a quote completes typing on the terminal
- **THEN** the system pauses for a reading interval, smoothly clears the text, and streams the next quote in sequence with corresponding attribution across the active locale (ES/EN)

### Requirement: Genesis story and technical architecture showcase
The system SHALL detail the game's origin as a 48-hour generative AI acceleration and OpenSpec experiment born from passion for 1984 Gibsonian cyberpunk, structured into scannable, fluff-free pillars alongside the technical architecture specification (React 19, TypeScript, Zustand 5, Tailwind CSS v4, WebAudio API, OpenSpec spec-driven framework).

#### Scenario: Viewing the genesis and tech stack sections
- **WHEN** the user navigates to the Genesis section
- **THEN** the system presents the 48-hour AI acceleration narrative with concise scannable paragraphs and technical architecture cards detailing the underlying engine stack with zero visual clutter

### Requirement: Operator identity badge with direct professional links
The system SHALL present an architect dossier credential featuring Arturo Herrera's nocturnal portrait with an interactive biometric laser scan effect (`Voight-Kampff` optical scan) on hover, clearly establishing credentials as a Senior Android Engineer with 7+ years of experience and active Artificial Intelligence Engineering studies with scannable, fluff-free copy and verified direct links to LinkedIn and GitHub.

#### Scenario: Interacting with the operator badge
- **WHEN** the user clicks the LinkedIn link on the operator identity badge
- **THEN** the browser opens `https://www.linkedin.com/in/arturo-herrera0792/` in a new tab with secure `noopener,noreferrer` attributes

#### Scenario: Interacting with the architect portrait
- **WHEN** the user hovers over or taps the architect portrait
- **THEN** an animated biometric laser scanline sweeps vertically across the photograph and displays verified clearance telemetry
