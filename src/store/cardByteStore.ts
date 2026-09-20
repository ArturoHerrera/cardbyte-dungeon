import { create } from 'zustand';
import { 
  Card, 
  CardByteMap, 
  Enemy, 
  PlayerProfile, 
  MapNode 
} from '../types/cardbyte';
import { createStarterDeck, upgradeCard } from '../engine/cardCatalog';
import { generateMatrixMap, decryptMapProgress } from '../engine/mapGenerator';
import { spawnEnemy } from '../engine/enemyAi';
import { executePlayerCard, executeEnemyTurn, CombatStateSnapshot } from '../engine/combatEngine';
import { localStorageAdapter, defaultProfile } from '../engine/storageAdapter';
import { createPRNG, shuffleArray } from '../engine/random';
import { TRAINING_DRONE, TUTORIAL_STARTER_DECK } from '../data/tutorialScenario';


export type ScreenState = 
  | 'TITLE' 
  | 'MAP' 
  | 'COMBAT' 
  | 'REST' 
  | 'TREASURE' 
  | 'CARD_REWARD' 
  | 'VICTORY' 
  | 'GAME_OVER';

interface CardByteStore {
  // === UISlice ===
  locale: 'en' | 'es';
  setLocale: (locale: 'en' | 'es') => void;
  currentScreen: ScreenState;
  activeModal: 'NONE' | 'DECK_VIEW' | 'ROM_DUMP' | 'PROFILE' | 'CODEX' | 'TUTORIAL_VICTORY' | 'CARD_INSPECT';
  inspectedCard: Card | null;
  sysAssistEnabled: boolean;
  mobileViewMode: boolean;
  combatLog: string[];
  setScreen: (screen: ScreenState) => void;
  openModal: (modal: 'NONE' | 'DECK_VIEW' | 'ROM_DUMP' | 'PROFILE' | 'CODEX' | 'TUTORIAL_VICTORY' | 'CARD_INSPECT') => void;
  openCardInspect: (card: Card) => void;
  closeModal: () => void;
  toggleMobileViewMode: () => void;
  toggleSysAssist: () => void;
  addLog: (msg: string) => void;


  // === Profile & Meta ===
  profile: PlayerProfile;
  loadProfileFromStorage: () => Promise<void>;
  updateProfileStats: (result: 'VICTORY' | 'FLATLINE', floor: number) => Promise<void>;

  // === RunSlice ===
  seed: number;
  playerFleshHp: number;
  playerMaxHp: number;
  masterDeck: Card[];
  map: CardByteMap | null;
  currentNode: MapNode | null;
  hasActiveRun: boolean;

  initNewRun: (customSeed?: number) => void;
  resumeRun: () => Promise<boolean>;
  checkExistingRun: () => Promise<boolean>;
  selectNode: (nodeId: string) => void;
  healPlayer: (amount: number) => void;
  upgradeMasterCard: (cardId: string) => void;
  addCardToMasterDeck: (card: Card) => void;
  removeCardFromMasterDeck: (cardId: string) => void;
  completeNonCombatNode: () => void;
  saveRunToStorage: () => void;

  // === CombatSlice ===
  inCombat: boolean;
  isTutorial: boolean;
  tutorialStepIndex: number;
  enemy: Enemy | null;
  playerEnergy: number;
  playerMaxEnergy: number;
  playerBlock: number;
  playerStatusEffects: Record<string, number>;
  hand: Card[];
  drawPile: Card[];
  discardPile: Card[];
  turnPhase: 'PLAYER' | 'ENEMY';

  startCombat: (node: MapNode) => void;
  startTutorialCombat: () => void;
  setTutorialStepIndex: (step: number) => void;
  playCard: (cardId: string) => void;
  endTurn: () => void;
}


export const useCardByteStore = create<CardByteStore>((set, get) => ({
  // === UISlice ===
  locale: (typeof window !== 'undefined' && (localStorage.getItem('cardbyte_locale') as 'en' | 'es')) || 'en',
  setLocale: (locale) => {
    try {
      localStorage.setItem('cardbyte_locale', locale);
    } catch {
      // Ignore storage errors in restricted contexts
    }
    set({ locale });
  },
  currentScreen: 'TITLE',
  activeModal: 'NONE',
  inspectedCard: null,
  sysAssistEnabled: (typeof window !== 'undefined' && localStorage.getItem('cardbyte_sys_assist') !== 'false'),
  mobileViewMode: (typeof window !== 'undefined' && (window.innerWidth < 768 || localStorage.getItem('cardbyte_mobile_view') === 'true')),
  combatLog: [],
  setScreen: (screen) => set({ currentScreen: screen }),
  openModal: (modal) => set({ activeModal: modal }),
  openCardInspect: (card) => set({ inspectedCard: card, activeModal: 'CARD_INSPECT' }),
  closeModal: () => set({ activeModal: 'NONE', inspectedCard: null }),
  toggleMobileViewMode: () => {
    // If on a physical mobile screen (<768px), keep it strictly locked to mobile view
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      set({ mobileViewMode: true });
      return;
    }
    set((s) => {
      const next = !s.mobileViewMode;
      try {
        localStorage.setItem('cardbyte_mobile_view', String(next));
      } catch {
        // ignore
      }
      return { mobileViewMode: next };
    });
  },
  toggleSysAssist: () => {
    set((s) => {
      const next = !s.sysAssistEnabled;
      try {
        localStorage.setItem('cardbyte_sys_assist', String(next));
      } catch {
        // ignore
      }
      return { sysAssistEnabled: next };
    });
  },
  addLog: (msg) => set((s) => ({ combatLog: [...s.combatLog, msg] })),


  // === Profile ===
  profile: { ...defaultProfile },
  loadProfileFromStorage: async () => {
    const profile = await localStorageAdapter.loadProfile();
    set({ profile });
  },
  updateProfileStats: async (result, floor) => {
    const prev = get().profile;
    const updated: PlayerProfile = {
      ...prev,
      totalRuns: prev.totalRuns + 1,
      victories: result === 'VICTORY' ? prev.victories + 1 : prev.victories,
      flatlines: result === 'FLATLINE' ? prev.flatlines + 1 : prev.flatlines,
      highestFloorBreached: Math.max(prev.highestFloorBreached, floor),
      history: [
        {
          date: new Date().toISOString().slice(0, 10),
          seed: get().seed,
          result,
          floorReached: floor,
        },
        ...prev.history.slice(0, 9), // Keep last 10
      ],
    };
    await localStorageAdapter.saveProfile(updated);
    set({ profile: updated });
  },

  // === RunSlice ===
  seed: 0,
  playerFleshHp: 50,
  playerMaxHp: 50,
  masterDeck: [],
  map: null,
  currentNode: null,
  hasActiveRun: false,

  checkExistingRun: async () => {
    const run = await localStorageAdapter.loadActiveRun();
    const hasRun = !!run;
    set({ hasActiveRun: hasRun });
    return hasRun;
  },

  initNewRun: (customSeed) => {
    const seed = customSeed ?? Math.floor(Math.random() * 999999);
    const map = generateMatrixMap(seed);
    const starterDeck = createStarterDeck();

    set({
      seed,
      playerFleshHp: 50,
      playerMaxHp: 50,
      masterDeck: starterDeck,
      map,
      currentNode: null,
      currentScreen: 'MAP',
      hasActiveRun: true,
      combatLog: [`> Jacked into Matrix layer with Hex Seed: #0x${seed.toString(16).toUpperCase()}`],
    });

    get().saveRunToStorage();
  },

  resumeRun: async () => {
    const saved = await localStorageAdapter.loadActiveRun();
    if (!saved) return false;

    let map = saved.map;
    let currentNode = map.currentNodeId ? map.nodes[map.currentNodeId] : null;

    // Self-healing reconciliation: if currentNode exists and its next layer nodes are not revealed,
    // decrypt map progress so the player can immediately navigate forward.
    if (currentNode) {
      const hasUnrevealedNext = currentNode.nextIds.some((id) => !map.nodes[id]?.revealed);
      if (hasUnrevealedNext || !currentNode.completed) {
        map = decryptMapProgress(map, currentNode.id);
        currentNode = map.nodes[currentNode.id];
      }
    }

    set({
      seed: saved.seed,
      playerFleshHp: saved.playerFleshHp,
      playerMaxHp: saved.playerMaxHp,
      masterDeck: saved.masterDeck,
      map,
      currentNode,
      currentScreen: 'MAP',
      hasActiveRun: true,
      combatLog: ['> Resumed Matrix Connection from storage buffer.'],
    });
    get().saveRunToStorage();
    return true;
  },

  selectNode: (nodeId: string) => {
    const { map } = get();
    if (!map) return;

    const node = map.nodes[nodeId];
    if (!node) return;

    // Must be either Depth 0 or a valid child of currentNode
    if (map.currentNodeId) {
      const parent = map.nodes[map.currentNodeId];
      if (!parent.nextIds.includes(nodeId)) return;
    } else if (node.depth !== 0) {
      return;
    }

    set({ currentNode: node });

    if (node.type === 'COMBAT' || node.type === 'ELITE' || node.type === 'BOSS') {
      get().startCombat(node);
    } else if (node.type === 'REST') {
      set({ currentScreen: 'REST' });
    } else if (node.type === 'TREASURE') {
      set({ currentScreen: 'TREASURE' });
    }
  },

  completeNonCombatNode: () => {
    const { map, currentNode } = get();
    if (!map || !currentNode) {
      set({ currentScreen: 'MAP' });
      return;
    }

    const updatedMap = decryptMapProgress(map, currentNode.id);
    const updatedCurrentNode = updatedMap.nodes[currentNode.id];

    set({
      map: updatedMap,
      currentNode: updatedCurrentNode,
      currentScreen: 'MAP',
    });
    get().saveRunToStorage();
  },

  healPlayer: (amount: number) => {
    set((s) => {
      const nextHp = Math.min(s.playerMaxHp, s.playerFleshHp + amount);
      return { playerFleshHp: nextHp };
    });
    get().saveRunToStorage();
  },

  upgradeMasterCard: (cardId: string) => {
    set((s) => {
      const updated = s.masterDeck.map((c) => (c.id === cardId ? upgradeCard(c) : c));
      return { masterDeck: updated };
    });
    get().saveRunToStorage();
  },

  addCardToMasterDeck: (card: Card) => {
    set((s) => ({ masterDeck: [...s.masterDeck, card] }));
    get().saveRunToStorage();
  },

  removeCardFromMasterDeck: (cardId: string) => {
    set((s) => {
      // Find the index of the first occurrence of this cardId and remove only that one
      const index = s.masterDeck.findIndex((c) => c.id === cardId);
      if (index === -1) return { masterDeck: s.masterDeck };
      const updated = [...s.masterDeck];
      updated.splice(index, 1);
      return { masterDeck: updated };
    });
    get().saveRunToStorage();
  },

  saveRunToStorage: () => {
    const s = get();
    if (!s.map) return;

    localStorageAdapter.saveActiveRun({
      seed: s.seed,
      playerFleshHp: s.playerFleshHp,
      playerMaxHp: s.playerMaxHp,
      masterDeck: s.masterDeck,
      map: s.map,
    });
  },

  // === CombatSlice ===
  inCombat: false,
  isTutorial: false,
  tutorialStepIndex: 1,
  enemy: null,
  playerEnergy: 3,
  playerMaxEnergy: 3,
  playerBlock: 0,
  playerStatusEffects: {},
  hand: [],
  drawPile: [],
  discardPile: [],
  turnPhase: 'PLAYER',

  startTutorialCombat: () => {
    // Structured tutorial starting hand: 2 attacks, 1 defend, 1 glitch
    const tutDeck = [...TUTORIAL_STARTER_DECK];
    const hand = tutDeck.slice(0, 4);
    const drawPile = tutDeck.slice(4);

    set({
      inCombat: true,
      isTutorial: true,
      tutorialStepIndex: 1,
      currentScreen: 'COMBAT',
      enemy: { ...TRAINING_DRONE, hp: TRAINING_DRONE.maxHp, block: 0, statusEffects: {} },
      playerFleshHp: 30,
      playerMaxHp: 30,
      playerEnergy: 3,
      playerMaxEnergy: 3,
      playerBlock: 0,
      playerStatusEffects: {},
      hand,
      drawPile,
      discardPile: [],
      turnPhase: 'PLAYER',
      combatLog: [
        '> PROTOCOL INITIATED: SIMULATION SANDBOX v1.0',
        '> HOSTILE SIMULATION TARGET: TRAINING_DRONE // PROTO_0',
        '> SYS_AID: Observe tutorial directives above the arena.',
      ],
    });
  },

  setTutorialStepIndex: (step: number) => {
    set({ tutorialStepIndex: step });
  },

  startCombat: (node: MapNode) => {
    const { seed, masterDeck } = get();

    const prng = createPRNG(seed + node.depth * 31 + node.index * 7);

    const isElite = node.type === 'ELITE';
    const isBoss = node.type === 'BOSS';
    const enemy = spawnEnemy(prng, node.depth, isElite, isBoss);

    // Prepare deck
    const shuffled = shuffleArray(prng, masterDeck);
    const hand = shuffled.slice(0, 4);
    const drawPile = shuffled.slice(4);

    set({
      inCombat: true,
      currentScreen: 'COMBAT',
      enemy,
      playerEnergy: 3,
      playerMaxEnergy: 3,
      playerBlock: 0,
      playerStatusEffects: {},
      hand,
      drawPile,
      discardPile: [],
      turnPhase: 'PLAYER',
      combatLog: [
        `> ALERT: Hostile Construct Engaged: ${enemy.name}`,
        `> Target Intent: ${enemy.intent.description}`,
      ],
    });
  },

  playCard: (cardId: string) => {
    const s = get();
    if (!s.inCombat || !s.enemy || s.turnPhase !== 'PLAYER') return;

    const snapshot: CombatStateSnapshot = {
      playerHp: s.playerFleshHp,
      playerMaxHp: s.playerMaxHp,
      playerBlock: s.playerBlock,
      playerEnergy: s.playerEnergy,
      playerMaxEnergy: s.playerMaxEnergy,
      playerStatusEffects: s.playerStatusEffects,
      enemy: s.enemy,
      hand: s.hand,
      drawPile: s.drawPile,
      discardPile: s.discardPile,
      combatLog: s.combatLog,
    };

    const { nextState, success } = executePlayerCard(snapshot, cardId);
    if (!success) return;

    // Check enemy defeat
    if (nextState.enemy.hp <= 0) {
      if (s.isTutorial) {
        set({
          activeModal: 'TUTORIAL_VICTORY',
          combatLog: [...nextState.combatLog, '> TRAINING DRONE NEUTRALIZED // SIMULATION PROTOCOL VERIFIED.'],
        });
        return;
      }


      const isBoss = nextState.enemy.archetype === 'WINTERMUTE';
      const updatedMap = decryptMapProgress(s.map!, s.currentNode!.id);


      if (isBoss) {
        // VICTORY
        get().updateProfileStats('VICTORY', 8);
        localStorageAdapter.clearActiveRun();
        set({
          inCombat: false,
          currentScreen: 'VICTORY',
          hasActiveRun: false,
          combatLog: [...nextState.combatLog, '> WINTERMUTE PROTOCOL SHATTERED. MATRIX BREACH COMPLETE!'],
        });
      } else {
        // COMBAT REWARD
        set({
          inCombat: false,
          playerFleshHp: nextState.playerHp,
          map: updatedMap,
          currentScreen: 'CARD_REWARD',
          combatLog: [...nextState.combatLog, `> Hostile construct eliminated. Data cache decrypted!`],
        });
        get().saveRunToStorage();
      }
      return;
    }

    set({
      playerFleshHp: nextState.playerHp,
      playerBlock: nextState.playerBlock,
      playerEnergy: nextState.playerEnergy,
      playerStatusEffects: nextState.playerStatusEffects,
      enemy: nextState.enemy,
      hand: nextState.hand,
      drawPile: nextState.drawPile,
      discardPile: nextState.discardPile,
      combatLog: nextState.combatLog,
    });
  },

  endTurn: () => {
    const s = get();
    if (!s.inCombat || !s.enemy || s.turnPhase !== 'PLAYER') return;

    set({ turnPhase: 'ENEMY' });

    const snapshot: CombatStateSnapshot = {
      playerHp: s.playerFleshHp,
      playerMaxHp: s.playerMaxHp,
      playerBlock: s.playerBlock,
      playerEnergy: s.playerEnergy,
      playerMaxEnergy: s.playerMaxEnergy,
      playerStatusEffects: s.playerStatusEffects,
      enemy: s.enemy,
      hand: s.hand,
      drawPile: s.drawPile,
      discardPile: s.discardPile,
      combatLog: s.combatLog,
    };

    const nextState = executeEnemyTurn(snapshot);

    // Check player flatline
    if (nextState.playerHp <= 0) {
      get().updateProfileStats('FLATLINE', s.currentNode?.depth || 0);
      localStorageAdapter.clearActiveRun();
      set({
        inCombat: false,
        playerFleshHp: 0,
        currentScreen: 'GAME_OVER',
        hasActiveRun: false,
        combatLog: [...nextState.combatLog, '> FLATLINE: Neural feedback exceeded biological threshold.'],
      });
      return;
    }

    set({
      turnPhase: 'PLAYER',
      playerFleshHp: nextState.playerHp,
      playerBlock: nextState.playerBlock,
      playerEnergy: nextState.playerEnergy,
      playerStatusEffects: nextState.playerStatusEffects,
      enemy: nextState.enemy,
      hand: nextState.hand,
      drawPile: nextState.drawPile,
      discardPile: nextState.discardPile,
      combatLog: nextState.combatLog,
    });
  },
}));
