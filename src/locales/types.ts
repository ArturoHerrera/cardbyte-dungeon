export type SupportedLocale = 'en' | 'es';

export interface TranslationDictionary {
  common: {
    back: string;
    close: string;
    confirm: string;
    cancel: string;
    deckBrand: string;
    layer: string;
    hex: string;
  };
  topbar: {
    integrity: string;
    buffer: string;
    ram: string;
    returnToMatrix: string;
    deckLabel: string;
    subroutines: string;
    systemDump: string;
    cyberdeckProfile: string;
  };
  titleScreen: {
    systemTitle: string;
    subtitle: string;
    jackIn: string;
    resumeRun: string;
    accessProfile: string;
    systemDump: string;
    activeSessionDetected: string;
    floorInfo: string;
    hpInfo: string;
    terminalStatus: string;
    version: string;
    statusReady: string;
  };
  map: {
    cyberspaceGraph: string;
    sectorStatus: string;
    completed: string;
    accessible: string;
    encrypted: string;
    nodeCombat: string;
    nodeElite: string;
    nodeRest: string;
    nodeTreasure: string;
    nodeBoss: string;
  };
  combat: {
    targetHostile: string;
    defense: string;
    subroutinesInRAM: string;
    discardBuffer: string;
    ramWarning: string;
    endCycle: string;
    enemyTurnBanner: string;
    victoryBanner: string;
    proceedToMatrix: string;
    logs: {
      playerTurn: string;
      enemyTurn: string;
      playerAttack: string;
      playerBlock: string;
      playerStatus: string;
      enemyAttack: string;
      enemyBlock: string;
      enemyDefeated: string;
      playerFlatlined: string;
      poisonDamage: string;
    };
  };
  cards: Record<string, {
    name: string;
    desc: string;
  }>;
  enemies: Record<string, {
    name: string;
    intents: Record<string, string>;
  }>;
  rewards: {
    cardRewardTitle: string;
    cardRewardSubtitle: string;
    skipReward: string;
    addedToDeck: string;
  };
  rest: {
    title: string;
    subtitle: string;
    cooldownTitle: string;
    cooldownDesc: string;
    patchTitle: string;
    patchDesc: string;
    executeCooldown: string;
    executePatch: string;
    selectCardPrompt: string;
    fullyPatched: string;
  };
  treasure: {
    title: string;
    subtitle: string;
    extractSubroutine: string;
    purgeAndLeave: string;
  };
  victory: {
    title: string;
    subtitle: string;
    systemLogs: string;
    returnToTerminal: string;
    wintermuteDecrypted: string;
  };
  gameOver: {
    title: string;
    subtitle: string;
    cause: string;
    rebootDeck: string;
  };
  modals: {
    deckView: {
      title: string;
      subtitle: string;
      subroutinesTotal: string;
    };
    profile: {
      title: string;
      alias: string;
      totalRuns: string;
      victories: string;
      flatlines: string;
      highestLayer: string;
      systemSignature: string;
    };
    romDump: {
      title: string;
      subtitle: string;
      copyJson: string;
      copied: string;
      wipeStorage: string;
      wipeConfirmPrompt: string;
    };
  };
}
