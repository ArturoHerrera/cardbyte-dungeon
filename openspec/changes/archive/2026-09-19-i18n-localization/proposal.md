## Why

Currently, *CardByte Dungeon* is entirely in English, limiting accessibility for Spanish-speaking players and lacking a scalable architecture for adding further languages. Introducing a lightweight, type-safe internationalization (i18n) framework allows seamless switching between English and Spanish while preserving the retro-cyberpunk terminal atmosphere and lore.

## What Changes

- Introduce a lightweight, zero-dependency type-safe dictionary localization system in `src/locales/` (`en.ts`, `es.ts`, `types.ts`).
- Support runtime locale switching (`en` <-> `es`) in the user interface and persist the chosen language in `localStorage`.
- Translate all user interface views: Title Screen, TopBar telemetry/controls, Combat interface, Rest/Cache nodes, Treasure/Subroutine nodes, Game Over, Victory, and modal dialogs (ROM Dump, Deck View, Cyberdeck Profile).
- Translate card catalog definitions and enemy descriptions while retaining immersive cyberpunk anglicisms (e.g. ICE, RAM, Cyberdeck, Flatline, Glitch).
- Add an accessible language toggle `[ EN | ES ]` in the TopBar.

## Capabilities

### New Capabilities
- `i18n-system`: Defines language switching, locale persistence, and type-safe translation retrieval for UI and gameplay entities.

### Modified Capabilities
<!-- No requirement-level changes to existing combat-engine, matrix-progression, or data-persistence specs. -->

## Impact

- **UI & State**: Adds `locale: 'en' | 'es'` and `setLocale(locale)` to the Zustand UI slice, persisting to `localStorage`.
- **Card & Enemy Engines**: Enhances card and enemy definitions or accessors to return localized names, descriptions, and intent texts based on the active locale.
- **TopBar**: Incorporates a compact `[ EN | ES ]` toggle switch into the terminal status header.
- **Bundle & Dependencies**: Zero third-party dependencies added; uses native TypeScript record structures for compile-time translation completeness validation.
