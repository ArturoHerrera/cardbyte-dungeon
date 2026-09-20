# Specification: CardByte Dungeon (Web Roguelike MVP)

## 1. Overview & Core Philosophy
CardByte Dungeon is a lightweight, web-first procedural turn-based card battler inspired by *Slay the Spire* and deeply steeped in the gritty 1984 cyberpunk lore of William Gibson's *Neuromancer*.

The player takes the role of a **Console Jockey** jacked into an Ono-Sendai Cyberspace 7 deck, navigating a consensual hallucination of corporate data matrices. The goal is to breach 8 security layers through Black ICE and military defense constructs before suffering terminal neural feedback (**FLATLINE**).

The application runs completely client-side in the browser, featuring a single-screen responsive interface, a Directed Acyclic Graph (DAG) matrix progression system, and deterministic turn-based card combat.

### Primary Design Principles
- **Zero Heavy Assets (Chiba Cyberpunk Aesthetic):** High-impact retro-futuristic visuals rendered purely via Tailwind CSS, SVG scanlines/orthogonal grids, and Lucide icons (no heavy sprites or audio assets required for MVP).
- **Deterministic State Machine:** Strict separation of procedural matrix generation, combat simulation engine, and UI presentation layer.
- **Fast Session Loops:** Run duration between 3 to 6 minutes, targeting 8 floor depths (ICE Layers) per run.

---

## 2. Technical Stack & Visual Design System

### 2.1. Technical Stack
- **Language:** TypeScript (strict mode enabled).
- **Frontend Framework:** React 19 / Vite.
- **State Management & Persistence:** Zustand (centralized state machine for UI, run data, and combat loop) with `persist` middleware on `RunSlice` targeting `localStorage` to allow seamless run resumption ("Resume Matrix Run") upon page reload.
- **Deterministic RNG:** Seeded PRNG (`mulberry32` or `splitmix32`) to guarantee reproducible floor and encounter generation.

### 2.2. Neuromancer (1984) Visual Identity & Styling
- **Color Palette ("The Sky Tuned to a Dead Channel"):**
  - **Background Matrix:** Deep void black/cyan-slate (`bg-[#070b0e]`) overlaid with a subtle 3D orthogonal vector grid and faint CRT scanline overlay.
  - **Terminal Phosphor Green:** `#00ff66` / `#39ff14` (active subroutines, status OK, successful execution).
  - **Deck Amber:** `#ffb000` / `#ff9900` (RAM / Energy counters, warnings, ICE-Breaker cards).
  - **Cold Cyan ("Dead Channel"):** `#00e5ff` (ICE-Buffer defense, shields, neutral network nodes).
  - **Black ICE Crimson:** `#ff003c` / `#ef4444` (neural feedback damage, hostile intent, FLATLINE alerts).
  - **Surfaces & Borders:** Dark beveled panels (`bg-[#0c1218]/90 border border-[#1e2c38]`) with 45-degree chamfered cyber-accents.
- **Typography:**
  - Headers & Readouts: Monospace hacker typography (`VT323`, `Share Tech Mono`, or `Space Mono`).
  - Card Text & Body: High-legibility monospaced / clean modern font (`JetBrains Mono`).
- **Nomenclature & Cyber-Architecture Lore:**
  - **Player HP:** *Neural Integrity* (0 HP = FLATLINE).
  - **Block:** *ICE-Buffer* (absorbs electric/logic feedback).
  - **Energy:** *Deck RAM / Cycles* (3/3 default).
  - **Master Deck:** *Ono-Sendai ROM Storage* (persistent subroutine library).
  - **Hand:** *L1 Instruction Cache* (active subroutines in pipeline, max 10).
  - **Discard Pile:** *I/O Flush Buffer* (cooling cycle memory).
  - **Draw/Shuffle:** *Bus Cycle Refresh* (re-reading memory into cache).
  - **Turn End:** *CYCLE RAM / JACK DOWN*.
  - **Rest Site:** *Troop Cache / Derm Patch* (Purge memory vs. Refactor code).
  - **Treasure Site:** *Data Vault / Black Market Stash*.

---

## 3. Data Models & TypeScript Interfaces

### 3.1. Entity & Card Definitions
```typescript
export type CardType = 'ATTACK' | 'DEFEND' | 'SKILL';

export type CardActionType = 
  | 'DAMAGE' 
  | 'BLOCK' 
  | 'APPLY_STATUS' 
  | 'DRAW' 
  | 'GAIN_ENERGY' 
  | 'SELF_DAMAGE';

export interface CardAction {
  type: CardActionType;
  value: number;
  target?: 'ENEMY' | 'SELF';
  status?: 'VULNERABLE' | 'WEAK' | 'POISON';
}

export interface Card {
  id: string;
  name: string;
  cost: number; // In Deck RAM
  type: CardType;
  description: string;
  actions: CardAction[]; // Composable effects array for infinite scalability
  upgraded?: boolean;
}

export interface CharacterStats {
  hp: number;
  maxHp: number;
  block: number;
  energy: number;
  maxEnergy: number;
  statusEffects: Record<string, number>; // e.g. { vulnerable: 2, weak: 1, poison: 3 }
}

export interface EnemyIntent {
  type: 'ATTACK' | 'DEFEND' | 'BUFF';
  value: number;
}

export interface Enemy extends CharacterStats {
  id: string;
  name: string;
  intent: EnemyIntent;
  affixes: string[]; // Procedural modifiers: ['Volatile', 'Armored']
}
```

### 3.2. Map & Node Graph Models
```typescript
export type NodeType = 'COMBAT' | 'ELITE' | 'REST' | 'TREASURE' | 'BOSS';

export interface MapNode {
  id: string;
  depth: number; // Layer from 0 to 7
  index: number; // Position within current layer
  type: NodeType;
  nextIds: string[]; // Valid paths to nodes in depth + 1
  completed: boolean;
  revealed: boolean; // True if node type and identity are decrypted to the player
}

export interface CardByteMap {
  seed: number;
  nodes: Record<string, MapNode>;
  currentNodeId: string | null;
  maxDepth: number;
}

### 3.3. Persistence & Storage Models
```typescript
export interface RunHistoryEntry {
  date: string;
  seed: number;
  result: 'VICTORY' | 'FLATLINE';
  floorReached: number;
}

export interface PlayerProfile {
  totalRuns: number;
  victories: number;
  flatlines: number;
  highestFloorBreached: number; // 0 to 7
  totalDamageDealt: number;
  history: RunHistoryEntry[];
}

export interface StorageAdapter {
  saveActiveRun(runData: unknown): Promise<void>;
  loadActiveRun(): Promise<unknown | null>;
  clearActiveRun(): Promise<void>;
  saveProfile(profile: PlayerProfile): Promise<void>;
  loadProfile(): Promise<PlayerProfile>;
  exportDump(): Promise<string>; // Compressed Base64 Cyber-String
  importDump(dumpStr: string): Promise<boolean>;
}
```

---

## 4. Systems & Procedural Generation

### 4.1. Graph Generation (DAG Map & Matrix Topology)
1. **Dimensions & Boss Convergence:**
   - Exactly 8 layers (Depth 0: Entry Gateway to Depth 7: Central AI Core / Boss).
   - Depths 0 through 6 feature 2 to 3 nodes per layer.
   - Depth 7 converges into a **single, unified BOSS node** connected from all valid outgoing edges of Depth 6.
2. **Connectivity & Layout Rules:**
   - **No Orphaned Nodes:** Every node in `depth` connects to $\ge 1$ node in `depth + 1`, and every node in `depth + 1` receives $\ge 1$ inbound edge from `depth`.
   - **Planar Clean Crossings:** Connections are constrained to adjacent indices ($|index_A - index_B| \le 1$) with no crossing edges.
   - **Horizontal Single-Screen Layout:** The map renders horizontally (Left-to-Right progression) across the viewport within fixed bounds (`100vh` / `100dvh`, zero scrolling). Vector edges are rendered using SVG lines with animated signal pulses.
3. **Weighted Node Distribution:**
   - Depth 0: 100% `COMBAT` (Entry gateway).
   - Depths 1-5: 60% `COMBAT`, 20% `ELITE` (Black ICE), 10% `REST` (Derm Patch), 10% `TREASURE` (Data Vault).
   - Depth 6: 100% `REST` (Pre-boss system purge / memory refactor).
   - Depth 7: 100% `BOSS` (Central AI construct).
4. **Crypto-Fog of War (Decryption Mechanics):**
   - **Visibility Horizon:** Depths 0 and 1 start with `revealed: true`. The Boss node (Depth 7) is permanently visible (`revealed: true`) as the primary target.
   - **Encrypted Layers:** Depths 2 through 6 start with `revealed: false`. Encrypted nodes display fluctuating hexadecimal data noise (`0x??`), dimmed borders, and scrambled connection lines.
   - **Progressive Decryption:** Completing a node at Depth $K$ decrypts all connected nodes at Depth $K + 1$ (and their immediate successors at Depth $K + 2$), transitioning from raw hex to clear iconography with a 300ms cipher-resolve animation.

### 4.2. Non-Combat Node Events
- **REST (Decompression Node // Offline Cache):**
  The player chooses one of three maintenance operations:
  1. *Core Cooldown (Repair):* Recover 30% of max HP (`Math.floor(maxHp * 0.3)` = +15 HP, capped at `maxHp`).
  2. *Code Refactor (Upgrade):* Select one card from current deck to upgrade (`upgraded: true`, values increased, name suffixed with `+`).
  3. *Purge Subroutine (Sanitize Memory):* Permanently delete a selected card from `masterDeck` to optimize draw consistency. Strictly disabled if `masterDeck.length <= 4` to safeguard against combat draw starvation soft-locks.
- **TREASURE (Data Cache):**
  Offers a reward draft presenting 3 advanced/rare cards (high-value damage/block, or cards with *Poison* / *Vulnerable*). Player selects 1 card to add to their deck, or clicks *Skip*.

### 4.3. Card Reward Pool & Draft Catalog
When winning a combat or accessing a Data Vault (`TREASURE`), players choose 1 card from 3 options (or *Skip*).
- **Standard Combat:** 90% Common, 10% Rare.
- **Elite Combat:** 50% Common, 50% Rare.
- **Treasure (Data Vault):** Guaranteed at least 2 Rares.

| Subroutine Name | Cost (RAM) | Type | Rarity | Base Effect | Upgraded (+) Effect |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Logic Worm** | 1 | SKILL | Common | Apply 4 POISON (bypasses Buffer) | Apply 6 POISON |
| **Packet Jam** | 1 | SKILL | Common | Apply 2 WEAK; Gain 4 Block | Apply 3 WEAK; Gain 6 Block |
| **Overclock** | 0 | SKILL | Common | Gain 1 RAM, Draw 1 card, lose 2 HP on turn end | Gain 2 RAM, Draw 1 card |
| **System Purge** | 1 | DEFEND | Common | Gain 9 Block | Gain 12 Block |
| **Bruteforce** | 2 | ATTACK | Common | Deal 14 Damage | Deal 18 Damage |
| **Execute** | 1 | ATTACK | Rare | Deal 8 Damage (Deals 16 if target Decrypted/Vuln) | Deal 11 Damage (22 if Decrypted) |
| **Neuro-Toxin** | 2 | SKILL | Rare | Apply 8 POISON and 2 VULNERABLE | Apply 11 POISON and 3 VULNERABLE |
| **Firewall Aura**| 2 | DEFEND | Rare | Gain 15 Block; apply 1 WEAK to attackers | Gain 20 Block; apply 2 WEAK |

### 4.4. Procedural Enemy & AI Intent Sequences
Enemies calculate intents deterministically each round:
- **Bit-Bug (Trace-Bot):** 18 HP. Cycle: `ATTACK` (6) $\rightarrow$ `ATTACK` (8) $\rightarrow$ `DEFEND` (+8 Block).
- **Memory-Brute (Black ICE Guard):** 40 HP. Cycle: `DEFEND` (+12) $\rightarrow$ `BUFF` (+50% next atk) $\rightarrow$ `ATTACK` (16 lethal).
- **Daemon-Cultist (Tessier-Ashpool Fragment):** 28 HP. Cycle: `BUFF` (+2 Vulnerable to player) $\rightarrow$ `ATTACK` (7) $\rightarrow$ `ATTACK` (9).
- **Boss (Depth 7): `AI Core // WINTERMUTE`:**
  - **HP:** 80, starts with 15 passive ICE-Buffer.
  - **4-Turn Intent Cycle:**
    - Turn 1 [Neural Probe]: `ATTACK` (8) + applies 2 Vulnerable to player.
    - Turn 2 [Logic Cascade]: `ATTACK` (14) (deals 21 if player remains Vulnerable!).
    - Turn 3 [Firewall Rebuild]: `DEFEND` (+18 Block) + applies 1 Weak to player.
    - Turn 4 [Overload Matrix]: `BUFF` (+2 Permanent Damage increase to all future cycles) $\rightarrow$ Loops to Turn 1.
- **Affix Modifiers (Procedural Elites/Encounters):**
  - `Volatile`: Deals $1.25\times$ damage, but loses $10\%$ current HP on turn end.
  - `Armored`: Starts with 10 passive Block.
  - `Cursed`: Applies 1 turn of *Weak* on round 1.

### 4.5. "Neural Deck Cartridge // ROM DUMP" System (Export & Import)
To preserve the 100% client-side philosophy without servers while enabling run/profile portability across devices:
1. **Export Formats:**
   - **Cyber-String (Neural Clipboard):** Serializes `PlayerProfile` + active run state into a compressed Base64 payload prefixed with `CB7://` and appended with a CRC32 integrity checksum. Players can copy/paste this string with a single click or append it to URL parameters (`?save=...`).
   - **Virtual Cartridge File (`.deck`):** Triggers a browser download of a compact binary/JSON payload named `jockey_dump_<seed>.deck`.
2. **Import & Flash Mechanics:**
   - **Manual Input:** Terminal modal accepts pasted Cyber-Strings and decodes them with checksum validation.
   - **Drag & Drop Cartridge Mounting:** Dragging any `.deck` file directly into the browser viewport triggers a CRT scanline audio-visual cue (*"CARTRIDGE MOUNTED: RUN RESTORED"*), hydrating both `RunSlice` and `PlayerProfile`.
3. **Integrity Validation:** If payload tampering or string truncation occurs, the terminal gracefully aborts and outputs: `[ERR: CORRUPTED DATA PACKET - CHECKSUM MISMATCH]`.

---

## 5. Core Game Loop & State Machine

```
                      +-------------------+
                      |    TITLE_SCREEN   |
                      +---------+---------+
                                | [Start Run / Jack In]
                                v
                      +-------------------+
               +----->|     MAP_VIEW      |
               |      +---------+---------+
               |                | [Select Accessible Node]
               |                v
               |      +-------------------+
               |      |    NODE_EVENT     |
               |      +----+----+----+----+
               |           |         |
               |  [Combat] |         | [Rest / Treasure]
               |           v         v
               |  +-------------+  +-------------------+
               |  | COMBAT_VIEW |  | REST_VIEW /       |
               |  +------+------+  | TREASURE_MODAL    |
               |         |         +---------+---------+
               |         v (Victory)         | [Done]
               |  +-------------+            |
               |  | CARD_REWARD |            |
               |  +------+------+            |
               |         |                   |
               +---------+-------------------+
                         |
           +-------------+-------------+
           | (Player HP <= 0)          | (Wintermute Defeated at Depth 7)
           v                           v
  +-------------------+       +-------------------------------+
  |     GAME_OVER     |       |        VICTORY_SCREEN         |
  |    [ FLATLINE ]   |       |  [ MATRIX PURGED // BREACH ]  |
  +-------------------+       +-------------------------------+
```

### 5.1. Zustand Scalable Store Architecture
The client-side state is organized into 3 decoupled slices within `store/cardByteStore.ts`:
1. **`RunSlice`:** Manages run persistence (`seed`, `playerMaxHp`, `playerFleshHp`, `masterDeck: Card[]`, `map: CardByteMap`). Actions: `initRun`, `advanceNode`, `healPlayer`, `upgradeCard`, `addCardToDeck`.
2. **`CombatSlice`:** Ephemeral combat lifecycle (`inCombat`, `enemy`, `energy`, `playerBlock`, `enemyBlock`, `hand`, `drawPile`, `discardPile`, `turnPhase: 'PLAYER' | 'ENEMY' | 'RESOLVING'`). Actions: `startCombat`, `playCard`, `endTurn`, `executeEnemyTurn`, `resolveStatusEffects`.
3. **`UISlice`:** Screen routing and terminal feedback (`currentScreen`, `activeModal`, `combatLog: string[]`).

### 5.2. Status Effect Mechanics
- **VULNERABLE:** Target receives $+50\%$ damage ($1.5\times$, calculated with `Math.floor`). Decrements by 1 at the end of the affected entity's turn.
- **WEAK:** Target deals $25\%$ less damage ($0.75\times$, calculated with `Math.floor`). Decrements by 1 at the end of the affected entity's turn.
- **POISON:** Target suffers direct HP loss equal to current Poison stacks at the start of their turn (bypasses Block). Stacks decrement by 1 immediately after damage triggers. (Asymmetric design for MVP: used primarily by the player against enemies).

### 5.3. Turn Order Mechanics
1. **Round Start:**
   - Trigger start-of-turn effects (e.g. Poison damage).
   - Reset Player Block to 0.
   - Refill Player Energy to `maxEnergy` (default: 3).
   - Draw 4 subroutines from `DrawPile` into Hand. (Strict invariant: Hand capacity is capped at **10 cards**; any drawn card exceeding 10 is immediately sent to `DiscardPile` to preserve the single-screen viewport). If `DrawPile` is empty, perform *Bus Cycle Refresh* (shuffle `DiscardPile` into `DrawPile`).
2. **Player Phase:**
   - Play subroutines within current Deck RAM limits.
   - Targeting: Direct click/drag on cards executes the subroutine's `actions: CardAction[]` pipeline instantly.
   - "CYCLE RAM / JACK DOWN" (End Turn) button triggers Enemy Phase.
   - Flush remaining unplayed subroutines in Hand to `DiscardPile`.
   - Decrement player status effects.
3. **Enemy Phase:**
   - Enemy executes calculated `intent`.
   - Compute next turn `intent` based on deterministic sequence.
   - Reset Enemy Block to 0 (unless modified by affixes).
   - Decrement enemy status effects.
   - Loop back to Round Start.

---

## 6. Functional Requirements & Acceptance Criteria

### Requirement 1: Seeded Run Initialization & Starter Deck
- **GIVEN** a player clicks "New Run" in CardByte Dungeon,
- **WHEN** the engine instantiates,
- **THEN** it generates a valid DAG matrix, sets Player Neural Integrity (HP) to 50/50, and seeds a starting deck of 8 subroutines:
  - 4x **Logic Spike** (Strike: Cost 1 RAM, ATTACK, 6 Damage)
  - 3x **ICE-Buffer** (Defend: Cost 1 RAM, DEFEND, 5 Block)
  - 1x **ICE-Breaker** (Bash: Cost 2 RAM, ATTACK, 8 Damage, applies 2 Decrypted/Vulnerable)
- **AND** if an existing run is present in `localStorage`, the Title Screen provides a "Resume Matrix Run" action.

### Requirement 2: Strict DAG Movement & Decryption Visibility
- **GIVEN** the player completes a node,
- **WHEN** the Map View renders,
- **THEN** only nodes defined in `current.nextIds` are clickable and highlightable. Past and unreachable nodes are disabled.
- **AND** nodes beyond the decryption horizon (`revealed: false`) display encrypted hex values until unlocked by progressive layer traversal.

### Requirement 3: Card Resolution & Math Invariants
- Block absorbs damage on a 1:1 basis before HP is reduced.
- Damage cannot reduce HP below 0.
- Status multipliers apply to base damage before Block absorption: `Math.floor(damage * 1.5)` for Vulnerable, `Math.floor(damage * 0.75)` for Weak.
- Playing a card with cost $C > \text{currentEnergy}$ must be strictly rejected.
- Maximum active hand size is strictly capped at 10 subroutines; overflow cards are flushed directly to discard.

### Requirement 4: Responsive Single-Screen Layout & Holographic Card Design
- The viewport must not scroll vertically or horizontally (bounded to `100vh` / `100dvh`).
- Hand layer displays cards as an interactive lower ribbon with hover elevation contained strictly within hand bounds to prevent telemetry occlusion.
- Subroutines render within cyberdeck ROM cartridge bezels with dedicated neural telemetry illustrations (`.webp` with graceful vector icon fallback) and dynamic holographic foil sheen on upgraded (`+`) or rare subroutines.

### Requirement 5: Local Persistence & ROM Dump Portability
- Active runs must survive browser refresh by hydrating from `localStorage`.
- Players can export/import their state via a `CB7://` Cyber-String or `.deck` cartridge file with CRC32 integrity verification. Corrupted inputs must be rejected gracefully without state mutation.

---

## 7. Project File Structure Setup
```text
src/
├── components/
│   ├── Combat/
│   │   ├── CardView.tsx
│   │   ├── EnemyCard.tsx
│   │   └── PlayerStats.tsx
│   ├── Map/
│   │   ├── CardByteGraph.tsx
│   │   └── NodeItem.tsx
│   └── UI/
│       ├── Button.tsx
│       └── Modal.tsx
├── engine/
│   ├── cardCatalog.ts
│   ├── combatEngine.ts
│   ├── enemyAi.ts
│   ├── mapGenerator.ts
│   ├── random.ts
│   ├── starterDeck.ts
│   └── storageAdapter.ts
├── store/
│   └── cardByteStore.ts
├── types/
│   └── cardbyte.d.ts
├── App.tsx
└── main.tsx
```