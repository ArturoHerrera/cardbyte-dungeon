import { Card, Enemy } from '../types/cardbyte';

export interface TutorialStep {
  stepIndex: number;
  instructionKey: string;
  tipKey?: string;
  allowedCardTypes?: string[];
  allowEndTurn?: boolean;
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    stepIndex: 1,
    instructionKey: 'tutorial.steps.step1.instruction',
    tipKey: 'tutorial.steps.step1.tip',
    allowedCardTypes: ['ATTACK'],
    allowEndTurn: false,
  },
  {
    stepIndex: 2,
    instructionKey: 'tutorial.steps.step2.instruction',
    tipKey: 'tutorial.steps.step2.tip',
    allowedCardTypes: ['DEFEND', 'ATTACK'],
    allowEndTurn: true,
  },
  {
    stepIndex: 3,
    instructionKey: 'tutorial.steps.step3.instruction',
    tipKey: 'tutorial.steps.step3.tip',
    allowedCardTypes: ['SKILL', 'ATTACK', 'DEFEND'],
    allowEndTurn: true,
  },
  {
    stepIndex: 4,
    instructionKey: 'tutorial.steps.step4.instruction',
    tipKey: 'tutorial.steps.step4.tip',
    allowedCardTypes: ['ATTACK', 'DEFEND', 'SKILL'],
    allowEndTurn: true,
  },
];

export const TRAINING_DRONE: Enemy = {
  id: 'training-drone-01',
  name: 'TRAINING_DRONE // PROTO_0',
  archetype: 'BIT_BUG',
  hp: 24,
  maxHp: 24,
  block: 0,
  energy: 3,
  maxEnergy: 3,
  statusEffects: {},
  affixes: ['SIMULATED'],
  cycleIndex: 0,
  intent: {
    type: 'ATTACK',
    value: 6,
    description: 'Preparing low-voltage ping (6 DMG)',
  },
};

export const TUTORIAL_STARTER_DECK: Card[] = [
  {
    id: 'starter_strike_tut_1',
    name: 'Logic Spike',
    cost: 1,
    type: 'ATTACK',
    description: 'Deal 6 damage.',
    actions: [{ type: 'DAMAGE', value: 6, target: 'ENEMY' }],
  },
  {
    id: 'starter_strike_tut_2',
    name: 'Logic Spike',
    cost: 1,
    type: 'ATTACK',
    description: 'Deal 6 damage.',
    actions: [{ type: 'DAMAGE', value: 6, target: 'ENEMY' }],
  },
  {
    id: 'starter_defend_tut_1',
    name: 'ICE-Buffer',
    cost: 1,
    type: 'DEFEND',
    description: 'Gain 5 block.',
    actions: [{ type: 'BLOCK', value: 5, target: 'SELF' }],
  },
  {
    id: 'starter_defend_tut_2',
    name: 'ICE-Buffer',
    cost: 1,
    type: 'DEFEND',
    description: 'Gain 5 block.',
    actions: [{ type: 'BLOCK', value: 5, target: 'SELF' }],
  },
  {
    id: 'starter_overclock_tut',
    name: 'Overclock',
    cost: 0,
    type: 'SKILL',
    description: 'Gain 1 energy. Draw 1 card. Take 2 heat damage on turn end.',
    actions: [
      { type: 'GAIN_ENERGY', value: 1, target: 'SELF' },
      { type: 'DRAW', value: 1, target: 'SELF' },
      { type: 'SELF_DAMAGE', value: 2, target: 'SELF' },
    ],
  },
  {
    id: 'starter_bash_tut',
    name: 'ICE-Breaker',
    cost: 2,
    type: 'ATTACK',
    description: 'Deal 8 damage. Apply 2 Vulnerable.',
    actions: [
      { type: 'DAMAGE', value: 8, target: 'ENEMY' },
      { type: 'APPLY_STATUS', value: 2, status: 'VULNERABLE', target: 'ENEMY' },
    ],
  },
];
