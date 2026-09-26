## Why

The current landing page copy in "Meet the Architect" and "Genesis" suffers from conversational fluff, corporate clichés ("crafting high-performance ecosystems", "obsession for craft"), and overly fictional sci-fi labels ("Tyrell Corp", "Replicant Check: Pass") that blur the line between a fictional game world and the creator's genuine professional credentials.

To establish maximum professional credibility and scannability for recruiters, technical leads, and open-source contributors, the copy needs a surgical UX writing overhaul: clearly and directly positioning the author as a Senior Android Engineer with 7+ years of production experience and an active AI Engineering student, while trimming redundant narrative by ~35% and improving Spanish copy fluency.

## What Changes

- **Meet the Architect Dossier Polish**:
  - Reframe role clearly as `Senior Android Engineer // AI Engineering Student`.
  - Replace inflated badges and paragraphs with concise, punchy statements: `7+ Years of Android Experience` and `B.S. Artificial Intelligence Engineering Student (Hybridge)`.
  - Remove fictive third-party branding (`TYRELL CORP`) in favor of clean diegetic terminal phrasing (`OPERATOR IDENTITY // CREDENTIAL ARCHIVE`).
  - Prune corporate buzzwords ("artesanía", "ecosistemas de alto rendimiento") from bio paragraphs in both Spanish and English.
  - Curate skill chips to emphasize core Android mastery (`Kotlin`, `Android SDK`, `Jetpack Compose`, `System Architecture`) alongside modern AI practices (`AI Agent Orchestration`, `OpenSpec`).
  - Professionalize CTA microcopy (`CONECTAR EN LINKEDIN ↗`, `VER PROYECTO EN GITHUB ↗`).
- **Genesis Section Pruning (~35% reduction)**:
  - Tighten the 48-hour experiment story into 3 high-impact, scannable pillars: the 48-hour challenge, spec-driven agentic execution, and engineering rigor over hype.
- **Hero Spanish Copy Polish**:
  - Refine Spanish subtext from *"antes de que la retroalimentación fría tu ciberdeck"* to *"antes de que tu sistema se sobrecaliente"*.

## Capabilities

### New Capabilities
*(None)*

### Modified Capabilities
- `landing-portal`: Updates `Operator identity badge with direct professional links`, `Genesis story and technical architecture showcase`, and `Atmospheric CRT hero with typewriter telemetry` with refined, fluff-free copy.

## Impact

- `src/landing/i18n/locales.ts`: Updates English and Spanish translation trees for `architect`, `genesis`, and `hero`.
- `src/landing/components/ArchitectDossier.tsx`: Updates layout adjustments for badges, microcopy, and external link arrows.
- `openspec/specs/landing-portal/spec.md`: Synced delta specifications.
