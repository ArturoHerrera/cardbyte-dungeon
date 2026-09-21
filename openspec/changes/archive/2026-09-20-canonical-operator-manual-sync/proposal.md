# Proposal: Canonical Operator Manual Bilingual Synchronization

## Why

The companion Operator's Manual exists in two language editions: `docs/CARDBYTE_MANUAL_DEL_OPERADOR.es.md` and `docs/CARDBYTE_OPERATOR_MANUAL.en.md`. 

A comparative analysis revealed severe structural, mechanical, and philosophical divergence between them:
1. The Spanish version faithfully reflects the master narrative bible (`docs/LORE_COMPENDIUM.md`) and the Sisyphean roguelike premise (Albert Camus, Jean Baudrillard, 15 chapters, Wintermute as an administrative bureaucrat harvesting non-linear human intuition, and an eternal loop where the operator consciously plugs back in for run #1843).
2. The English version diverged into a condensed action-thriller (~67 KB vs 137 KB) with different intermediate chapters (06-08, 13), inconsistent contract variables (250k New Yen vs. 50k Credits), and an incompatible "Hollywood rebellion" climax where the operator exploits the discard pile to crash Wintermute and commit real biological suicide in cryogenic vat B-14, which breaks the game's core infinite-run justification.
3. In the Spanish edition, figure captions and Table of Contents (TOC) titles suffered desynchronization when artwork was originally integrated from the English outline.

Synchronizing both editions to the canonical Spanish text establishes a unified, high-literary bilingual companion lore experience.

## What Changes

- **Spanish Edition Alignment (`docs/CARDBYTE_MANUAL_DEL_OPERADOR.es.md` & `CARDBYTE_MANUAL_DEL_OPERADOR.md`)**:
  - Synchronize TOC entry names with actual chapter markdown headings (`#`).
  - Correct figure captions and placements (Fig 6.1 White Noise Oasis rather than Cryptographic Fracture; Fig 14.1 Transcendence Trap; Fig 15.1 Sisyphus / Profile Paradox rather than biological flatline).
- **English Edition Canonical Translation (`docs/CARDBYTE_OPERATOR_MANUAL.en.md`)**:
  - Complete 1:1 translation and expansion of the canonical 15 chapters and volume structure defined in `LORE_COMPENDIUM.md`.
  - Restore Chapter 06 (*White Noise Oasis / Caches & Vaults*), Chapter 07 (*Bit-Bugs*), Chapter 08 (*Daemon-Cultists*), Chapter 09 (*Memory-Brutes*), Chapter 10 (*Wintermute as the bureaucrat / $P \neq NP$ heuristic trap*), Chapter 13 (*The Hexadecimal Seed / Determinism*), Chapter 14 (*The Transcendence Trap*), and Chapter 15 (*Scars in Silicon / The Profile Paradox / The Sisyphean Reboot*).
  - Harmonize all diegetic variables: 50,000 Credits (Zurich Bank), 3 Deck RAM thermal throttling, Flesh HP psychosomatic biology, and ROM cartridge mechanics (`TANGENT-01`).
  - Symmetrically align all headings, TOC links, and Mil-Spec CRT Appendixes.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
None. (This is a documentation-only alignment; `skip_specs: true` is configured in `.openspec.yaml`).

## Impact

- `docs/CARDBYTE_MANUAL_DEL_OPERADOR.es.md`: TOC and figure caption corrections.
- `docs/CARDBYTE_MANUAL_DEL_OPERADOR.md`: Synchronized mirror of the Spanish manual.
- `docs/CARDBYTE_OPERATOR_MANUAL.en.md`: Complete re-architecture into a canonical English edition matching the Spanish master text.
- No gameplay code, schemas, or engine dependencies are affected.
