import { Card } from '../types/cardbyte';

/**
 * Base Starter Deck: 8 Subroutines
 * - 4x Logic Spike (Strike)
 * - 3x ICE-Buffer (Defend)
 * - 1x ICE-Breaker (Bash)
 */
export function createStarterDeck(): Card[] {
  return [
    {
      id: 'starter_strike_1',
      name: 'Logic Spike',
      cost: 1,
      type: 'ATTACK',
      rarity: 'STARTER',
      description: 'Inject direct executable spike dealing 6 neural damage.',
      actions: [{ type: 'DAMAGE', value: 6, target: 'ENEMY' }],
    },
    {
      id: 'starter_strike_2',
      name: 'Logic Spike',
      cost: 1,
      type: 'ATTACK',
      rarity: 'STARTER',
      description: 'Inject direct executable spike dealing 6 neural damage.',
      actions: [{ type: 'DAMAGE', value: 6, target: 'ENEMY' }],
    },
    {
      id: 'starter_strike_3',
      name: 'Logic Spike',
      cost: 1,
      type: 'ATTACK',
      rarity: 'STARTER',
      description: 'Inject direct executable spike dealing 6 neural damage.',
      actions: [{ type: 'DAMAGE', value: 6, target: 'ENEMY' }],
    },
    {
      id: 'starter_strike_4',
      name: 'Logic Spike',
      cost: 1,
      type: 'ATTACK',
      rarity: 'STARTER',
      description: 'Inject direct executable spike dealing 6 neural damage.',
      actions: [{ type: 'DAMAGE', value: 6, target: 'ENEMY' }],
    },
    {
      id: 'starter_defend_1',
      name: 'ICE-Buffer',
      cost: 1,
      type: 'DEFEND',
      rarity: 'STARTER',
      description: 'Erect firewall shielding against 5 feedback damage.',
      actions: [{ type: 'BLOCK', value: 5, target: 'SELF' }],
    },
    {
      id: 'starter_defend_2',
      name: 'ICE-Buffer',
      cost: 1,
      type: 'DEFEND',
      rarity: 'STARTER',
      description: 'Erect firewall shielding against 5 feedback damage.',
      actions: [{ type: 'BLOCK', value: 5, target: 'SELF' }],
    },
    {
      id: 'starter_defend_3',
      name: 'ICE-Buffer',
      cost: 1,
      type: 'DEFEND',
      rarity: 'STARTER',
      description: 'Erect firewall shielding against 5 feedback damage.',
      actions: [{ type: 'BLOCK', value: 5, target: 'SELF' }],
    },
    {
      id: 'starter_bash_1',
      name: 'ICE-Breaker',
      cost: 2,
      type: 'ATTACK',
      rarity: 'STARTER',
      description: 'Heavy military hammer dealing 8 damage and decrypting target (2 Vulnerable).',
      actions: [
        { type: 'DAMAGE', value: 8, target: 'ENEMY' },
        { type: 'APPLY_STATUS', value: 2, status: 'VULNERABLE', target: 'ENEMY' },
      ],
    },
  ];
}

/**
 * 8-Card Draft Catalog for Rewards & Data Vaults
 */
export const CARD_CATALOG: Omit<Card, 'id'>[] = [
  // 1. Logic Worm (Common Skill)
  {
    name: 'Logic Worm',
    cost: 1,
    type: 'SKILL',
    rarity: 'COMMON',
    description: 'Corrupt host memory. Inflicts 4 Poison directly to HP each cycle.',
    actions: [{ type: 'APPLY_STATUS', value: 4, status: 'POISON', target: 'ENEMY' }],
  },
  // 2. Packet Jam (Common Skill)
  {
    name: 'Packet Jam',
    cost: 1,
    type: 'SKILL',
    rarity: 'COMMON',
    description: 'Throttle connection. Apply 2 Weak (-25% dmg) and gain 4 ICE-Buffer.',
    actions: [
      { type: 'APPLY_STATUS', value: 2, status: 'WEAK', target: 'ENEMY' },
      { type: 'BLOCK', value: 4, target: 'SELF' },
    ],
  },
  // 3. Overclock (Common Skill)
  {
    name: 'Overclock',
    cost: 0,
    type: 'SKILL',
    rarity: 'COMMON',
    description: 'Force cycles. Gain 1 RAM and draw 1 subroutine. Suffer 2 core heat damage on turn end.',
    actions: [
      { type: 'GAIN_ENERGY', value: 1, target: 'SELF' },
      { type: 'DRAW', value: 1, target: 'SELF' },
      { type: 'SELF_DAMAGE', value: 2, target: 'SELF' },
    ],
  },
  // 4. System Purge (Common Defend)
  {
    name: 'System Purge',
    cost: 1,
    type: 'DEFEND',
    rarity: 'COMMON',
    description: 'Flush rogue processes and raise heavy shield (+9 ICE-Buffer).',
    actions: [{ type: 'BLOCK', value: 9, target: 'SELF' }],
  },
  // 5. Bruteforce (Common Attack)
  {
    name: 'Bruteforce',
    cost: 2,
    type: 'ATTACK',
    rarity: 'COMMON',
    description: 'Flood memory channels dealing 14 massive impact damage.',
    actions: [{ type: 'DAMAGE', value: 14, target: 'ENEMY' }],
  },
  // 6. Execute (Rare Attack)
  {
    name: 'Execute',
    cost: 1,
    type: 'ATTACK',
    rarity: 'RARE',
    description: 'Targeted exploit. Deals 8 damage (doubled to 16 if target is Decrypted/Vulnerable).',
    actions: [{ type: 'DAMAGE', value: 8, target: 'ENEMY' }],
  },
  // 7. Neuro-Toxin (Rare Skill)
  {
    name: 'Neuro-Toxin',
    cost: 2,
    type: 'SKILL',
    rarity: 'RARE',
    description: 'Lethal biochip injection. Applies 8 Poison and 2 Vulnerable.',
    actions: [
      { type: 'APPLY_STATUS', value: 8, status: 'POISON', target: 'ENEMY' },
      { type: 'APPLY_STATUS', value: 2, status: 'VULNERABLE', target: 'ENEMY' },
    ],
  },
  // 8. Firewall Aura (Rare Defend)
  {
    name: 'Firewall Aura',
    cost: 2,
    type: 'DEFEND',
    rarity: 'RARE',
    description: 'High-voltage perimeter. Gain 15 ICE-Buffer and throttle hostile nodes with 1 Weak.',
    actions: [
      { type: 'BLOCK', value: 15, target: 'SELF' },
      { type: 'APPLY_STATUS', value: 1, status: 'WEAK', target: 'ENEMY' },
    ],
  },
];

/**
 * Creates an upgraded (+) version of a given card
 */
export function upgradeCard(card: Card): Card {
  if (card.upgraded) return card;

  const upgradedActions = card.actions.map((act) => {
    switch (act.type) {
      case 'DAMAGE':
        return { ...act, value: Math.round(act.value * 1.35) };
      case 'BLOCK':
        return { ...act, value: Math.round(act.value * 1.4) };
      case 'APPLY_STATUS':
        return { ...act, value: act.value + 1 };
      case 'GAIN_ENERGY':
        return { ...act, value: act.value + 1 };
      case 'SELF_DAMAGE':
        return { ...act, value: 0 }; // Overclock upgrade removes self-damage
      default:
        return act;
    }
  });

  return {
    ...card,
    name: `${card.name}+`,
    upgraded: true,
    actions: upgradedActions,
    description: `[UPGRADED] ${card.description}`,
  };
}

/**
 * Rolls 3 card choices for reward draft based on combat tier (standard, elite, treasure)
 */
export function generateDraftChoices(
  prng: () => number,
  tier: 'STANDARD' | 'ELITE' | 'TREASURE'
): Card[] {
  const choices: Card[] = [];
  const selectedIndices = new Set<number>();

  while (choices.length < 3) {
    const isRare = tier === 'TREASURE' 
      ? prng() < 0.75 
      : tier === 'ELITE' 
      ? prng() < 0.5 
      : prng() < 0.15;

    const pool = CARD_CATALOG
      .map((card, index) => ({ card, index }))
      .filter(({ card }) => isRare ? card.rarity === 'RARE' : card.rarity === 'COMMON');

    const candidate = pool[Math.floor(prng() * pool.length)];
    if (!selectedIndices.has(candidate.index)) {
      selectedIndices.add(candidate.index);
      choices.push({
        ...candidate.card,
        id: `draft_${Date.now()}_${choices.length}_${Math.floor(prng() * 10000)}`,
      });
    }
  }

  return choices;
}
