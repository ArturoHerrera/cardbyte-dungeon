# Design: Canonical Operator Manual Bilingual Synchronization

## Context

The companion lore book for *Cardbyte Dungeon* is located under `docs/`. The canonical source of truth for the narrative and existentialist framing is [`docs/LORE_COMPENDIUM.md`](file:///home/josear/dev/cardbyte-dungeon/docs/LORE_COMPENDIUM.md), which informed the 15 chapters in `docs/vol_1_chap_1.md` through `docs/vol_5_chap_15.md` and was compiled into `docs/CARDBYTE_MANUAL_DEL_OPERADOR.es.md`.

Currently, `docs/CARDBYTE_OPERATOR_MANUAL.en.md` deviates from this foundation, presenting an alternative storyline with combat logs, divergent chapter topics, and an incompatible suicide ending. Additionally, the Spanish edition has slight internal desynchronizations between its Table of Contents and markdown headers, as well as illustration captions borrowed from the divergent English outline.

## Goals / Non-Goals

**Goals:**
- Harmonize the Spanish manual (`docs/CARDBYTE_MANUAL_DEL_OPERADOR.es.md` and its alias `docs/CARDBYTE_MANUAL_DEL_OPERADOR.md`) so all TOC links match exact markdown header anchors and all illustration captions match chapter themes.
- Fully rewrite `docs/CARDBYTE_OPERATOR_MANUAL.en.md` as an exact, high-literary English mirror of the 15 canonical chapters, prologue, and appendices.
- Preserve the core philosophical identity: visceral 1984 cyberpunk (Gibson), existential horror of the closed harvest loop (Baudrillard, Camus), and the roguelike ludonarrative justification (the Sisyphus of Silicon).

**Non-Goals:**
- Modifying engine or gameplay code under `src/`.
- Generating new image files in `public/assets/book/` (existing artwork will be mapped and accurately captioned).

## Decisions

### Decision 1: Spanish Manual as Master Canonical Source
- **Choice:** Treat `docs/CARDBYTE_MANUAL_DEL_OPERADOR.es.md` as the definitive master text.
- **Rationale:** It adheres 100% to `docs/LORE_COMPENDIUM.md` and reflects the full literary depth (~137 KB), containing all necessary mathematical, philosophical, and mechanical metaphors.
- **Alternative Considered:** Keeping a hybrid where the English version maintains its action scenes. Rejected because it breaks thematic symmetry and invalidates the core narrative bible.

### Decision 2: Climax and Narrative Canon
- **Choice:** Both English and Spanish versions will feature the canonical Camusian/Sisyphean ending:
  - Subject has completed 1,842 runs (1,835 flatlines, 7 spurious victories).
  - Subject subjective time is 1.7 years; actual vat time is 3.49 seconds.
  - The operator embraces the absurd with clear-eyed defiance and jacks in for Run #1843.
- **Rationale:** Explains why the player continues playing the roguelike after "beating" a run; honors Albert Camus' *Myth of Sisyphus*.

### Decision 3: Chapter and Volume Symmetry
Both manuals will share identical five-volume structures:
1. **Volume I: The Illusion of Meat and Silicon** (Ch 01: Coffin Fallacy, Ch 02: Spurious Directive, Ch 03: Three-Pin Interface)
2. **Volume II: The Topology of the Dream** (Ch 04: The Grid, Ch 05: Strata 01-03 Descent, Ch 06: White Noise Oasis)
3. **Volume III: The Black ICE Codex** (Ch 07: Bit-Bugs, Ch 08: Daemon-Cultists, Ch 09: Memory-Brutes, Ch 10: Wintermute / The Bureaucrat)
4. **Volume IV: The Sub-Second Paradox** (Ch 11: Sub-Neural Scale, Ch 12: Amnesia Buffer, Ch 13: Hexadecimal Seed)
5. **Volume V: The Sisyphus of Silicon** (Ch 14: Transcendence Trap, Ch 15: Scars in Silicon / Profile Paradox)
Followed by Appendix A (16 Slang Terms) and Appendix B (8 CRT Mil-Spec Terms).

## Risks / Trade-offs

- **[Risk: Size and translation effort for English edition]** → Mitigation: Systematically translate each chapter preserving the rich literary register, Gibsonian imagery, and technical precision of the Spanish master text.
- **[Risk: Breaking existing external links to English sections]** → Mitigation: Ensure standard GitHub markdown anchor compatibility for all volume and chapter headings.
