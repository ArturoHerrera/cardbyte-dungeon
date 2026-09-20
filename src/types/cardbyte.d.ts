export type CardType = 'ATTACK' | 'DEFEND' | 'SKILL';

export type CardRarity = 'STARTER' | 'COMMON' | 'RARE';

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
  cost: number; // Deck RAM
  type: CardType;
  rarity?: CardRarity;
  description: string;
  actions: CardAction[];
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

export type IntentType = 'ATTACK' | 'DEFEND' | 'BUFF';

export interface EnemyIntent {
  type: IntentType;
  value: number;
  status?: 'VULNERABLE' | 'WEAK';
  statusDuration?: number;
  description: string;
}

export interface Enemy extends CharacterStats {
  id: string;
  name: string;
  archetype: 'BIT_BUG' | 'MEMORY_BRUTE' | 'DAEMON_CULTIST' | 'WINTERMUTE';
  intent: EnemyIntent;
  affixes: string[]; // e.g. ['Volatile', 'Armored', 'Cursed']
  cycleIndex: number;
}

export type NodeType = 'COMBAT' | 'ELITE' | 'REST' | 'TREASURE' | 'BOSS';

export interface MapNode {
  id: string;
  depth: number; // 0 to 7
  index: number; // Index within layer
  type: NodeType;
  nextIds: string[]; // Edges to depth + 1
  completed: boolean;
  revealed: boolean;
}

export interface CardByteMap {
  seed: number;
  nodes: Record<string, MapNode>;
  currentNodeId: string | null;
  maxDepth: number;
}

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

export interface ActiveRunState {
  seed: number;
  playerFleshHp: number;
  playerMaxHp: number;
  masterDeck: Card[];
  map: CardByteMap;
}

export interface StorageAdapter {
  saveActiveRun(runData: ActiveRunState): Promise<void>;
  loadActiveRun(): Promise<ActiveRunState | null>;
  clearActiveRun(): Promise<void>;
  saveProfile(profile: PlayerProfile): Promise<void>;
  loadProfile(): Promise<PlayerProfile>;
  exportDump(): Promise<string>;
  importDump(dumpStr: string): Promise<boolean>;
}
