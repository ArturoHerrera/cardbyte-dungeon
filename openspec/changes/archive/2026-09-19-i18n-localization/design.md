## Context

See [proposal.md](file:///home/josear/dev/cardbyte-dungeon/openspec/changes/i18n-localization/proposal.md).
Currently, the codebase hardcodes English strings directly into components (`TopBar.tsx`, `CombatView.tsx`, `CardView.tsx`, `EnemyCard.tsx`, modal dialogs, victory/game over screens) and engine catalogs (`cardCatalog.ts`, `enemyAi.ts`). We need a scalable, compile-time type-safe localization mechanism that introduces zero bundle bloat and keeps the William Gibson retro-cyberpunk aesthetic intact.

## Goals / Non-Goals

**Goals:**
- Implement a type-safe dictionary approach (`src/locales/` with `TranslationDictionary` interface) in native TypeScript.
- Store the user's chosen language (`'en' | 'es'`) in the Zustand `UISlice` and persist it via `localStorage` (`cardbyte_locale`).
- Provide an ergonomic translation hook/helper `useTranslation()` / `t(key, params?)` for React components and engine formatters.
- Localize all user-facing strings across all screens, modals, cards, and enemies, preserving evocative cyberpunk anglicisms (e.g., ICE-Breaker, Cyberdeck, Flatline, Glitch).
- Ensure strict responsive 1-screen (`100vh`) UI compatibility without overflow when rendering longer Spanish strings.

**Non-Goals:**
- Pulling in large third-party runtime dependencies like `i18next` or `react-intl`.
- Dynamic network-based async fetching of locale chunks (unnecessary given our compact retro text footprint).
- Full multi-voice audio or text-to-speech localization.

## Decisions

### 1. Zero-dependency TypeScript Dictionary over External Libraries
- **Decision**: Define a TypeScript type `TranslationDictionary` in `src/locales/types.ts` and structured objects `en.ts` and `es.ts`.
- **Rationale**: Keeps bundle size minimal, loads instantly synchronously, and guarantees at compile-time that any key added in English must also be provided in Spanish.
- **Alternative considered**: `i18next` / `react-i18next`. Rejected due to unnecessary bundle overhead and loose string typing by default.

### 2. Localization Structure & Dynamic Interpolation
- **Decision**: Structure keys hierarchically (e.g. `topbar.ram`, `combat.endTurn`, `cards.<cardId>.name`, `cards.<cardId>.desc`). For strings with numeric variables, use template replacement functions or string tokens like `{{val}}`.
- **Rationale**: Clean organization and easy to add future locales (e.g., `ja`, `de`).

### 3. State & Persistence in Zustand UISlice
- **Decision**: Add `locale: SupportedLocale` and `setLocale(locale: SupportedLocale)` to `UISlice`. Initialize by reading `localStorage.getItem('cardbyte_locale') || 'en'`.
- **Rationale**: Immediate reactivity across all subscribed React components when the player clicks the toggle.

### 4. Hybrid Cyberpunk Tone for Spanish
- **Decision**: Maintain terminal anglicisms established in the genre (e.g. *JACK IN*, *CYBERDECK*, *ICE-BREAKER*, *RAM*, *BUFFER*, *FLATLINE*), while translating functional verbs, status descriptions, and narrative explanations into atmospheric Spanish.
- **Rationale**: Follows the user's explicit preference to preserve setting immersion.

## Risks / Trade-offs

- **[Text expansion in Spanish]** → Spanish phrasing is often 15-25% longer than English.
  *Mitigation*: Keep button and badge text punchy and concise (e.g., "FIN DE TURNO" instead of "TERMINAR EL TURNO ACTUAL"); use compact typography and verify that flex layouts maintain the single-screen `100vh` non-scrollable layout.
- **[Catalog references]** → Cards and enemies have unique identifiers (`strike`, `defend`, `ping_flood`, `corpo_daemon`).
  *Mitigation*: Keep the internal game engine IDs untranslated (`card.id`), and map display strings dynamically via `t(\`cards.\${card.id}.name\`)`.
