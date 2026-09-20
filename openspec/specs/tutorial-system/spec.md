# tutorial-system Specification

## Purpose

Provides a multi-layered, data-driven onboarding system comprising an illustrated Operator Codex, a scripted Level 0 combat simulation protocol, and contextual assist tooltips.

## Requirements

### Requirement: Operator Codex Modal
The application SHALL provide an accessible, illustrated Operator Codex overlay reachable from the Title Screen, Matrix Map, and Combat Screen detailing fundamental rules and mechanics.

#### Scenario: Opening and navigating codex
- **WHEN** the user activates the Operator Codex button (`[?] MANUAL` / `CODEX`)
- **THEN** a modal overlay opens displaying categorized entries (Basics, Combat, ICE & Status, Matrix)
- **AND** the content is presented in the currently active language (English or Spanish)
- **AND** closing the modal restores the previous view state without interrupting combat or map progression.

### Requirement: Level 0 Guided Simulation Protocol
The application SHALL provide a deterministic, step-guided tutorial combat encounter ("Simulation Protocol") accessible from the Title Screen featuring canonical subroutine cards matching the master game catalog.

#### Scenario: Launching the simulation
- **WHEN** the user selects "INICIAR SIMULACIÓN" / "START TUTORIAL" from the Title Screen
- **THEN** a controlled combat encounter begins with scripted player hand draws composed of canonical subroutines (`Logic Spike`, `ICE-Buffer`, `ICE-Breaker`, `Overclock`) resolving their dedicated artwork assets
- **AND** the simulation presents sequential instructional directives (`// SYS_AID`) for RAM spending, damage absorption with ICE-Buffer, and status effect exploitation
- **AND** invalid actions that deviate from the current tutorial objective are prevented or highlighted.

#### Scenario: Completing the simulation
- **WHEN** the player successfully neutralizes the Training ICE construct
- **THEN** a simulation completion screen appears offering an option to return to the Title Screen or initiate a real intrusion run.

### Requirement: Contextual Telemetry Assist Tooltips
The application SHALL provide optional contextual telemetry explanations (`SYS_ASSIST`) for key combat counters and HUD elements.

#### Scenario: Viewing telemetry hints
- **WHEN** SYS_ASSIST is enabled and the user hovers or focuses on telemetry counters (such as RAM budget, ICE-Buffer, Enemy Intent, or Discard Pile)
- **THEN** a contextual tooltip appears explaining the purpose and operational behavior of that component.

#### Scenario: Toggling assist mode
- **WHEN** the user toggles the SYS_ASSIST setting
- **THEN** the preference is persisted in local storage
- **AND** assist tooltips remain active by default in Level 0 Simulation regardless of global toggle.
