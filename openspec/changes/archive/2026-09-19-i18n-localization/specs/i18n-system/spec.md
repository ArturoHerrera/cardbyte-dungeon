## Purpose

Provides a lightweight, scalable, and type-safe internationalization (i18n) framework allowing the game interface and gameplay entity descriptions to be displayed in either English or Spanish with immediate runtime reactivity.

## ADDED Requirements

### Requirement: Language Selection and Persistence
The system SHALL provide an accessible interface element to toggle the active language between English (`en`) and Spanish (`es`), and SHALL persist the chosen locale across sessions in client-side storage.

#### Scenario: Switching language at runtime
- **WHEN** the player clicks or triggers the language selector (e.g., toggling between `EN` and `ES`)
- **THEN** all rendered UI text, buttons, modals, and telemetry labels immediately update to the selected language without reloading the page.

#### Scenario: Restoring persisted language preference
- **WHEN** the player opens or refreshes the application
- **THEN** the system reads the stored language preference from local storage (defaulting to English if not present or invalid) and initializes the interface in that locale.

### Requirement: Type-Safe Localization Engine
The system SHALL maintain complete translation dictionaries where all localization keys are statically verified at compile time, guaranteeing zero missing translations across supported locales.

#### Scenario: Translation resolution with variable interpolation
- **WHEN** a localized string requires dynamic numeric parameters (such as damage, block, or turn values)
- **THEN** the translation function interpolates the provided parameters into the formatted output text accurately.

### Requirement: Localized Card and Enemy Telemetry
The game engine SHALL provide localized card names, card descriptions, enemy names, and intent projections according to the currently active language, preserving established cyberpunk anglicisms.

#### Scenario: Viewing card in hand
- **WHEN** the player inspects cards in their hand or deck while the active language is Spanish
- **THEN** the card title and operational effect descriptions are displayed in Spanish with cyberpunk flavor (e.g., "ROMPEHIELOS" / "ICE-BREAKER").

#### Scenario: Enemy intent telemetry
- **WHEN** the player engages in combat with Spanish active
- **THEN** the enemy intent banner and tooltip describe the enemy's planned action in Spanish (e.g., "ATAQUE", "DEFENSA", "GLITCH").
