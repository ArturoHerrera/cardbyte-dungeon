## Why

While the Blade Runner landing portal overhaul established an atmospheric foundation, several details require fine-tuning to reach peak cyberpunk immersion: the brand title inappropriately featured "2049" instead of the game's canonical title "CARDBYTE // DUNGEON", the site lacks a dedicated cyberpunk vector favicon, generic browser sans-serif typography weakens the sci-fi aesthetic, and the hero section types only a single static quote instead of an active, looping terminal feed.

## What Changes

- **Restore Canonical Brand Title**: Replace "CARDBYTE // 2049" with "CARDBYTE // DUNGEON" across navigation, footer, and metadata.
- **Dedicated Cyberpunk Vector Favicon**: Create and inject a crisp neon cyberdeck chip / terminal vector icon (`/favicon.svg`) linked in both `index.html` and `game.html`.
- **Authentic Cyberpunk Typography**: Import and configure `Rajdhani` and `Share Tech Mono` Google Fonts, replacing generic system sans-serif with geometric, high-tech lettering.
- **Infinite Looping Quote Terminal**: Upgrade the typewriter engine to cycle dynamically through a curated, bilingual anthology of iconic cyberpunk quotes from *Neuromancer* (1984), *Blade Runner* (1982), and *The Matrix* (1999).

## Capabilities

### Modified Capabilities
- `landing-portal`: Enhance hero typewriter requirement with continuous multi-quote cycling (Neuromancer, Blade Runner, The Matrix) and branding/favicon specification.

## Impact

- **Frontend**:
  - `src/landing/components/TopNav.tsx` (brand label update)
  - `src/landing/components/HeroBladeRunner.tsx` (looping typewriter engine)
  - `src/landing/i18n/locales.ts` (expanded quote collection with authors and translations)
  - `index.html` & `game.html` (favicon link and font imports)
  - `src/index.css` (font-family configuration)
  - `public/favicon.svg` (new vector asset)
