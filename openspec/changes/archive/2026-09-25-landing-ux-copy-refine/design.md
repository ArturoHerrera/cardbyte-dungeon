## Context

See `proposal.md` for motivation. The landing portal copy is centralized in `src/landing/i18n/locales.ts` and rendered through modular components (`ArchitectDossier.tsx`, `GenesisSection.tsx`, `HeroBladeRunner.tsx`).

## Goals / Non-Goals

**Goals:**
- Eliminate fluff, corporate buzzwords, and fictional brand confusion (`TYRELL CORP`) from the creator dossier.
- Clearly present Arturo Herrera's dual credentials: **Senior Android Engineer (7+ years)** and **active AI Engineering student**.
- Prune the Genesis 48-hour experiment copy by ~35% into three scannable, punchy paragraphs.
- Refine the Spanish hero subtext to sound natural and idiomatic.

**Non-Goals:**
- Redesigning visual themes, palette, or animations.
- Modifying game state, rules, or audio engines.

## Decisions

### 1. Dual Credential Framing (Android Senior + AI Student)
- **Decision**: Set the architect role directly to `Senior Android Engineer // AI Engineering Student`, paired with badges `7+ Años de Experiencia en Android` and `Estudiante de Ingeniería en IA (Hybridge)`.
- **Rationale**: Avoids generic "Mobile Engineer" and highlights 7+ years of deep Android production experience while clearly showcasing the active pursuit of an AI Engineering degree.

### 2. Elimination of Fictional Brand Confusion
- **Decision**: Replace `TYRELL CORP BIOMETRIC CLEARANCE DOSSIER` and `REPLICANT_CHECK: PASS` with diegetic project terminology: `OPERATOR IDENTITY // CREDENTIAL ARCHIVE` and `STATUS: VERIFIED`.
- **Rationale**: Keeps the retro-cyberpunk terminal flavor without confusing recruiters or technical reviewers about whether the creator profile is genuine.

### 3. Curated Skill Hierarchy
- **Decision**: Reorganize skill chips from an unstructured list into a focused progression: `Android SDK`, `Kotlin`, `Jetpack Compose`, `System Architecture`, `AI Agent Orchestration`, `OpenSpec`.
- **Rationale**: Reflects actual technical strengths and modern engineering workflows.

### 4. Genesis Copy Compression
- **Decision**: Condense Genesis paragraphs 1, 2, and 3 by ~35%, focusing on the 48-hour challenge, spec-driven development (OpenSpec), and human architecture directing AI execution.
- **Rationale**: Enhances readability; visitors scan text within 10-15 seconds.

## Risks / Trade-offs

- **[Risk] Responsive line wrapping with revised badge strings** → Mitigation: Badges in `ArchitectDossier.tsx` use `flex-wrap` and auto-padding, so shorter, more concise text improves responsiveness on mobile viewports.
