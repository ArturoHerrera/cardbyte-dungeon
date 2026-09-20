## 1. Type-Safe Localization Engine

- [x] 1.1 Define locale types (`SupportedLocale`, `TranslationDictionary`) in `src/locales/types.ts` and verify TypeScript compilation passes.
- [x] 1.2 Implement full English dictionary in `src/locales/en.ts` matching existing UI, card, and enemy terminology.
- [x] 1.3 Implement Spanish dictionary in `src/locales/es.ts` with atmospheric cyberpunk tone and anglicisms intact, strictly conforming to `TranslationDictionary`.
- [x] 1.4 Create export barrel and interpolation helper `t(locale, key, params)` in `src/locales/index.ts`.

## 2. Store & Persistence Integration

- [x] 2.1 Add `locale` state and `setLocale` action to `UISlice` in `src/store/cardByteStore.ts`, persisting selection to `localStorage['cardbyte_locale']`.
- [x] 2.2 Verify initial store state hydrates saved locale preference correctly from `localStorage`.

## 3. TopBar & Language Switcher UI

- [x] 3.1 Update `src/components/TopBar.tsx` to add `[ EN | ES ]` switch and localize all terminal status indicators.
- [x] 3.2 Verify clicking language toggle switches UI text instantly without layout shifts or overflow.

## 4. Views & Modals Localization

- [x] 4.1 Localize `TitleScreen.tsx`, `VictoryScreen.tsx`, and `GameOverScreen.tsx` using the translation helper.
- [x] 4.2 Localize `RestView.tsx`, `TreasureView.tsx`, and `CardByteGraph.tsx` labels and buttons.
- [x] 4.3 Localize modal dialogs (`RomDumpModal.tsx`, `DeckViewModal.tsx`, `ProfileModal.tsx`).

## 5. Combat & Entity Telemetry Localization

- [x] 5.1 Localize `CardView.tsx` to retrieve dynamic card names and descriptions based on current locale.
- [x] 5.2 Localize `EnemyCard.tsx` and combat banner telemetry in `CombatView.tsx` (intents, log entries, end turn buttons).
- [x] 5.3 Verify localized layout in browser under 100vh constraint across both English and Spanish combat sessions.
