## MODIFIED Requirements

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
