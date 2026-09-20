import { TranslationDictionary } from './types';

export const en: TranslationDictionary = {
  common: {
    back: 'BACK',
    close: 'CLOSE',
    confirm: 'CONFIRM',
    cancel: 'CANCEL',
    deckBrand: 'ONO-SENDAI 7',
    layer: 'LAYER',
    hex: 'HEX',
  },
  topbar: {
    integrity: 'INTEGRITY:',
    buffer: 'BUFFER:',
    ram: 'RAM:',
    returnToMatrix: 'MATRIX',
    deckLabel: 'DECK',
    subroutines: 'SUBROUTINES',
    systemDump: 'DUMP',
    cyberdeckProfile: 'PROFILE',
  },
  titleScreen: {
    systemTitle: 'CARDBYTE DUNGEON',
    subtitle: 'ONO-SENDAI CYBERSPACE 7 // NEURAL INTERFACE TERMINAL',
    jackIn: 'JACK IN [NEW RUN]',
    resumeRun: 'RESUME INTRUSION [RUN ACTIVE]',
    accessProfile: 'DECK PROFILE [STATISTICS]',
    systemDump: 'SYSTEM DUMP [ROM / DEBUG]',
    activeSessionDetected: 'ACTIVE SESSION DETECTED // MEMORY PERSISTED',
    floorInfo: 'LAYER: {{floor}}/7',
    hpInfo: 'INTEGRITY: {{hp}}/{{maxHp}}',
    terminalStatus: 'BIOS: ONO-SENDAI v4.02 // HOST: CYBERSPACE MATRIX // AUDIO: OFF',
    version: 'REV 1.0.4 - PROTOCOL GIBSON-84',
    statusReady: 'SYSTEM READY // WAITING FOR USER INPUT',
  },
  map: {
    cyberspaceGraph: 'CYBERSPACE MATRIX GRAPH // TACTICAL ROUTE SELECTION',
    sectorStatus: 'SECTOR TOPOLOGY',
    completed: 'SECURED',
    accessible: 'ACTIVE',
    encrypted: 'ENCRYPTED',
    nodeCombat: 'ICE Node',
    nodeElite: 'Apex ICE',
    nodeRest: 'Cache Node',
    nodeTreasure: 'Data Vault',
    nodeBoss: 'Wintermute Core',
  },
  combat: {
    targetHostile: 'HOSTILE ICE TARGET',
    defense: 'DEFENSE',
    subroutinesInRAM: 'SUBROUTINES IN RAM (HAND)',
    discardBuffer: 'DISCARD BUFFER',
    ramWarning: 'INSUFFICIENT RAM CYCLES TO EXECUTE SUBROUTINE',
    endCycle: 'END CYCLE [TURN]',
    enemyTurnBanner: 'HOSTILE ICE COMPUTING ATTACK VECTORS...',
    victoryBanner: 'HOSTILE ICE NEUTRALIZED // ACCESS GRANTED',
    proceedToMatrix: 'JACK FORWARD [CONTINUE]',
    logs: {
      playerTurn: '--- CYCLE {{turn}} // PLAYER PHASE ---',
      enemyTurn: '--- HOSTILE ICE COUNTERMEASURE ---',
      playerAttack: 'Player executed {{card}} dealing {{dmg}} neural damage.',
      playerBlock: 'Player raised {{val}} ICE-Buffer firewall.',
      playerStatus: 'Injected {{status}} status to hostile ICE.',
      enemyAttack: 'Hostile ICE executed {{action}} dealing {{dmg}} damage.',
      enemyBlock: 'Hostile ICE generated {{val}} defense shield.',
      enemyDefeated: 'Hostile ICE node de-compiled. Victory confirmed.',
      playerFlatlined: 'CRITICAL NEURAL FEEDBACK: FLATLINE DETECTED.',
      poisonDamage: 'Hostile corrupted code caused {{dmg}} poison core damage.',
    },
  },
  cards: {
    starter_strike: {
      name: 'Logic Spike',
      desc: 'Inject direct executable spike dealing {{val}} neural damage.',
    },
    starter_defend: {
      name: 'ICE-Buffer',
      desc: 'Erect firewall shielding against {{val}} feedback damage.',
    },
    starter_bash: {
      name: 'ICE-Breaker',
      desc: 'Heavy military hammer dealing {{dmg}} damage and decrypting target ({{vuln}} Vulnerable).',
    },
    logic_worm: {
      name: 'Logic Worm',
      desc: 'Corrupt host memory. Inflicts {{val}} Poison directly to HP each cycle.',
    },
    packet_jam: {
      name: 'Packet Jam',
      desc: 'Throttle connection. Apply {{weak}} Weak (-25% dmg) and gain {{block}} ICE-Buffer.',
    },
    overclock: {
      name: 'Overclock',
      desc: 'Force cycles. Gain {{ram}} RAM and draw {{draw}} subroutine. Suffer {{heat}} core heat damage on turn end.',
    },
    system_purge: {
      name: 'System Purge',
      desc: 'Flush rogue processes and raise heavy shield (+{{val}} ICE-Buffer).',
    },
    bruteforce: {
      name: 'Bruteforce',
      desc: 'Flood memory channels dealing {{val}} massive impact damage.',
    },
    execute: {
      name: 'Execute',
      desc: 'Targeted exploit. Deals {{val}} damage (doubled to 16 if target is Decrypted/Vulnerable).',
    },
    neuro_toxin: {
      name: 'Neuro-Toxin',
      desc: 'Lethal biochip injection. Applies {{poison}} Poison and {{vuln}} Vulnerable.',
    },
    firewall_aura: {
      name: 'Firewall Aura',
      desc: 'High-voltage perimeter. Gain {{block}} ICE-Buffer and throttle hostile nodes with {{weak}} Weak.',
    },
  },
  enemies: {
    bit_bug: {
      name: 'Bit-Bug (Trace Daemon)',
      intents: {
        attack_swarm: 'Packet Swarm ({{val}} dmg)',
        corrupt_bite: 'Corrupt Bite ({{val}} dmg)',
        hard_shell: 'Hard Shell (+{{val}} block)',
      },
    },
    memory_brute: {
      name: 'Memory-Brute (Black ICE)',
      intents: {
        reinforce: 'Reinforce ICE (+{{val}} block)',
        overcharge: 'Overcharge Capacitors (Buff)',
        sledge: 'Logic Sledge ({{val}} dmg)',
      },
    },
    daemon_cultist: {
      name: 'Daemon-Cultist (Subroutine)',
      intents: {
        decrypt: 'Decrypt Ports (Applies {{val}} Vulnerable)',
        hex: 'Dark Hex ({{val}} dmg)',
        flail: 'Logic Flail ({{val}} dmg)',
      },
    },
    wintermute: {
      name: 'WINTERMUTE (Rogue AI Core)',
      intents: {
        core_discharge: 'Core Discharge ({{val}} dmg)',
        subroutine_loop: 'Subroutine Loop (+{{block}} block, +{{vuln}} Vuln)',
        glitch_injection: 'Glitch Injection ({{val}} dmg)',
        tessier_enrage: 'Tessier Enrage Protocol (+{{val}} Core Power)',
      },
    },
  },
  rewards: {
    cardRewardTitle: 'DECRYPTED MEMORY VAULT // SELECT REWARD',
    cardRewardSubtitle: 'Choose 1 subroutine to download into your master cyberdeck ROM:',
    skipReward: 'LEAVE VAULT [SKIP SUBROUTINE]',
    addedToDeck: 'Subroutine {{name}} compiled and loaded to cyberdeck ROM.',
  },
  rest: {
    title: 'OFFLINE CACHE NODE // SECURE SUBNET',
    subtitle: 'Select one maintenance routine to execute before re-entering cyberspace:',
    cooldownTitle: 'CORE COOLDOWN // REPAIR FLESH-LINK',
    cooldownDesc: 'Vent heatsinks and restore +{{hp}} neural integrity (HP).',
    patchTitle: 'CODE REFACTOR // PATCH SUBROUTINE',
    patchDesc: 'Compile a persistent + upgrade to a selected subroutine in your deck.',
    purgeTitle: 'PURGE SUBROUTINE // MEMORY SANITIZE',
    purgeDesc: 'Permanently delete a subroutine from cyberdeck ROM to thin your combat buffer.',
    executeCooldown: 'INITIATE COOLDOWN',
    executePatch: 'SELECT SUBROUTINE TO PATCH',
    executePurge: 'SELECT SUBROUTINE TO PURGE',
    selectCardPrompt: 'SELECT A SUBROUTINE TO COMPILE (+)',
    selectPurgePrompt: 'SELECT A SUBROUTINE TO PERMANENTLY PURGE',
    fullyPatched: 'All compatible subroutines are already upgraded.',
    minBufferWarning: 'MIN BUFFER LOCK: Master deck must retain at least 4 subroutines to avoid terminal freeze.',
  },
  treasure: {
    title: 'UNENCRYPTED MILITARY DATAVAULT',
    subtitle: 'Discovered an abandoned high-priority corporation data drop.',
    extractSubroutine: 'EXTRACT DATA SUBROUTINE',
    purgeAndLeave: 'BYPASS VAULT [PROCEED]',
  },
  victory: {
    title: 'CYBERSPACE INTRUSION SUCCESSFUL',
    subtitle: 'WINTERMUTE MAINFRAME HAS BEEN FULLY DE-COMPILED',
    wintermuteDecrypted: 'Neural link confirmed. The artificial intelligence has been shattered into unlinked logic gates. Your cyberdeck status is recorded into the matrix hall of legends.',
    systemLogs: 'RUN SUMMARY TELEMETRY',
    returnToTerminal: 'JACK OUT [RETURN TO TITLE]',
  },
  gameOver: {
    title: 'CRITICAL FLATLINE // CONNECTION SEVERED',
    subtitle: 'NEURAL FEEDBACK DESTROYED CYBERDECK BUFFER',
    cause: 'Flesh-link integrity dropped to 0. Bio-monitors detected fatal cardiac defibrillation across terminal ports.',
    rebootDeck: 'REBOOT CYBERDECK [MAIN TITLE]',
  },
  modals: {
    deckView: {
      title: 'CYBERDECK MEMORY BUFFER',
      subtitle: 'INSTALLED SUBROUTINES AND KERNEL LOGIC',
      subroutinesTotal: 'TOTAL SUBROUTINES: {{count}}',
    },
    profile: {
      title: 'OPERATOR PROFILE & CYBERDECK STATS',
      alias: 'CONSOLE ALIAS: ONO-SENDAI COWBOY',
      totalRuns: 'TOTAL INVASIONS:',
      victories: 'MAINFRAME BREACHES (VICTORIES):',
      flatlines: 'TERMINAL FLATLINES:',
      highestLayer: 'DEEPEST LAYER ACCESSED:',
      systemSignature: 'SIGNATURE: CASE_NEUROMANCER_0x1984',
    },
    romDump: {
      title: 'RAW SYSTEM ROM DUMP',
      subtitle: 'LOCALSTORAGE DATA PERSISTENCE INSPECTOR',
      copyJson: 'COPY RAW JSON',
      copied: 'COPIED TO CLIPBOARD',
      wipeStorage: 'WIPE LOCAL STORAGE',
      wipeConfirmPrompt: 'Are you sure you want to completely erase all local data? This will reset all runs and profile stats.',
    },
  },
  codex: {
    title: 'OPERATOR CODEX // ONO-SENDAI MANUAL',
    subtitle: 'TACTICAL REFERENCE MANUAL FOR CYBERSPACE COMBAT AND MATRIX NAVIGATION',
    categories: {
      basics: 'FUNDAMENTALS',
      combat: 'COMBAT & ACTIONS',
      status: 'STATUS EFFECTS',
      matrix: 'MATRIX NAVIGATION',
    },
    entries: {
      deck_ram: {
        title: 'Deck RAM (Execution Energy)',
        desc: 'Every combat cycle, your cyberdeck replenishes 3 RAM units. Every subroutine card consumes an exact RAM cost to execute. Unused RAM does not carry over between cycles unless augmented by specialized hardware.',
      },
      neural_integrity: {
        title: 'Neural Integrity (Player HP)',
        desc: 'Represents your physiological and neuro-synaptic health. If integrity reaches 0, terminal neural feedback causes an immediate flatline and terminates the current intrusion run.',
      },
      turn_cycle: {
        title: 'Turn Cycle Structure',
        desc: 'Each combat turn consists of a Player Phase followed by an Enemy Phase. During your phase, play subroutines and conclude by pressing END CYCLE. Hostile ICE then executes its pre-computed intent.',
      },
      ice_buffer: {
        title: 'ICE-Buffer (Defensive Firewall)',
        desc: 'ICE Shields generate temporary protective buffer. All incoming hostile damage is absorbed by the buffer before reaching your Neural Integrity. Note: ICE-Buffer resets to 0 at the start of your turn!',
      },
      card_pipeline: {
        title: 'Subroutine Execution Pipeline',
        desc: 'Cards resolve atomically in sequence: damage strikes, shield deployment, and debuff injection. If a card provides energy or draws additional routines, they resolve instantly in hand.',
      },
      hostile_intents: {
        title: 'Hostile Telemetry (Enemy Intents)',
        desc: 'Enemy ICE constructs broadcast their upcoming action above their chassis. Use this predictive telemetry to balance defensive buffering versus aggressive offensive strikes.',
      },
      vulnerable: {
        title: 'Vulnerable (Target Debuff)',
        desc: 'Entities afflicted with Vulnerable suffer 50% extra attack damage (Math.floor(DMG * 1.5)). Stacks decrease by 1 at the end of each round.',
      },
      weak: {
        title: 'Weak (Attack Impairment)',
        desc: 'Entities afflicted with Weak deal 25% less attack damage (Math.floor(DMG * 0.75)). Stacks decrease by 1 at the end of each round.',
      },
      poison_corruption: {
        title: 'Poison Corruption (System Leak)',
        desc: 'Direct logic corruption that deals HP damage equal to current poison stacks at the start of the entity\'s turn, completely bypassing all ICE-Buffer! Stacks decrement by 1 each turn (Bosses and Armored enemies purge 2 stacks per turn via anti-virus countermeasures).',
      },
      matrix_topology: {
        title: 'Matrix Sector Navigation',
        desc: 'Cyberspace is structured as an 8-layer directed network graph. You can only advance forward to adjacent connected nodes. Plan routes carefully to balance combat risks and cache recovery.',
      },
      data_caches: {
        title: 'Data Caches & Rewards',
        desc: 'Securing an ICE node unlocks data caches containing newly decrypted subroutines to expand and upgrade your master deck.',
      },
      decompression_nodes: {
        title: 'Decompression Nodes (Rest Sites)',
        desc: 'Safe terminal nodes that allow you to cool down (+30% HP), patch a subroutine (+ upgrade), or purge an obsolete card from cyberdeck ROM (minimum 4-card buffer safeguard enforced).',
      },
      holographic_cartridges: {
        title: 'Holographic ROM Cartridges',
        desc: 'Subroutines are mounted in tactical cyberdeck ROM chips with dedicated neural telemetry graphics, high-visibility neon RAM cells, and instant stat telemetry chips ([DMG], [BLOCK], [VULN]). Upgraded subroutines (UPG+) and rare-tier chips exhibit reactive holographic foil sheen.',
      },
      hostile_constructs: {
        title: 'Hostile ICE Telemetry & Viewport',
        desc: 'Enemy ICE entities are monitored through active scanner viewports with cyberdeck telemetry. Standard constructs include Bit-Bugs, Memory-Brutes, and Daemon-Cultists. Apex-ICE Elites exhibit volatile thermal affixes, while the rogue AI WINTERMUTE manifests as an omnipotent Matrix-God.',
      },
    },
  },
  tutorial: {
    startSimulation: 'SIMULATION PROTOCOL [TUTORIAL]',
    simTitle: 'SIMULATION PROTOCOL // BOOT SEQUENCE',
    simBadge: 'TRAINING ENVIRONMENT // SANDBOX',
    droneName: 'TRAINING ICE DRONE // PROTO_0',
    objective: 'OBJECTIVE:',
    steps: {
      step1: {
        instruction: 'Execute your [Logic Spike] subroutine to inflict damage on the Training Drone.',
        tip: 'You have 3 RAM. Playing Logic Spike costs 1 RAM and inflicts 6 DMG.',
      },
      step2: {
        instruction: 'The drone is broadcasting an attack of 6 DMG! Play [ICE-Buffer] to absorb the impact, then click END CYCLE.',
        tip: 'ICE-Buffer generates 5 defense buffer. Any remaining damage impacts your integrity.',
      },
      step3: {
        instruction: 'Inject status effects: Play [ICE-Breaker] to make the drone Vulnerable, then strike hard!',
        tip: 'Vulnerable amplifies all incoming attack damage by 1.5x.',
      },
      step4: {
        instruction: 'Combine your remaining subroutines and neutralize the Training Drone.',
        tip: 'Neutralizing the drone completes the simulation sequence.',
      },
    },
    victoryTitle: 'SIMULATION PROTOCOL COMPLETED',
    victorySubtitle: 'ALL COMBAT SUBSYSTEMS VERIFIED // OPERATOR CERTIFIED',
    startRealRun: 'JACK IN TO LIVE MATRIX [START RUN]',
    returnToMenu: 'RETURN TO TITLE TERMINAL',
  },
  sysAssist: {
    toggleLabel: 'SYS_ASSIST HUD',
    hints: {
      ram: {
        title: 'DECK RAM CYCLES',
        body: 'Energy pool to execute subroutines. Automatically recharges to 3 at the start of each player cycle.',
      },
      ice: {
        title: 'ICE-BUFFER (FIREWALL)',
        body: 'Active defensive shielding. Absorbs incoming enemy damage before HP. Resets to 0 each turn.',
      },
      intent: {
        title: 'HOSTILE INTENT TELEMETRY',
        body: 'Pre-computed action the enemy will execute when your turn cycle ends.',
      },
      hand: {
        title: 'SUBROUTINES IN RAM (HAND)',
        body: 'Executable card subroutines drawn from your master deck. Hover to inspect card parameters.',
      },
      endCycle: {
        title: 'END CYCLE CONTROL',
        body: 'Concludes your turn phase and triggers hostile ICE intent calculations.',
      },
      discard: {
        title: 'DISCARD BUFFER',
        body: 'Spent or discarded subroutines. Recycled back into Draw Pile when empty.',
      },
    },
  },
};

