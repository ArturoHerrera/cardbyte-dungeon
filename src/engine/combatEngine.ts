import { Card, Enemy } from '../types/cardbyte';
import { calculateNextIntent } from './enemyAi';

export interface CombatStateSnapshot {
  playerHp: number;
  playerMaxHp: number;
  playerBlock: number;
  playerEnergy: number;
  playerMaxEnergy: number;
  playerStatusEffects: Record<string, number>;
  enemy: Enemy;
  hand: Card[];
  drawPile: Card[];
  discardPile: Card[];
  combatLog: string[];
}

/**
 * Resolves damage calculation applying Vulnerable (+50%) and Weak (-25%) multipliers.
 * Mathematical invariant: Math.floor(damage * multiplier).
 */
export function calculateDamage(
  baseDamage: number,
  attackerStatus: Record<string, number>,
  defenderStatus: Record<string, number>
): number {
  let damage = baseDamage;

  // Weak: deals 25% less damage
  if ((attackerStatus['weak'] || 0) > 0) {
    damage = Math.floor(damage * 0.75);
  }

  // Vulnerable: receives 50% more damage
  if ((defenderStatus['vulnerable'] || 0) > 0) {
    damage = Math.floor(damage * 1.5);
  }

  return Math.max(0, damage);
}

/**
 * Applies damage to an entity, absorbing with block first, then subtracting from HP.
 */
export function applyDamageToEntity(
  damage: number,
  currentHp: number,
  currentBlock: number
): { finalHp: number; finalBlock: number; absorbed: number; hpLoss: number } {
  let remainingDamage = damage;
  let block = currentBlock;
  let hp = currentHp;

  if (block > 0) {
    if (block >= remainingDamage) {
      block -= remainingDamage;
      return { finalHp: hp, finalBlock: block, absorbed: remainingDamage, hpLoss: 0 };
    } else {
      remainingDamage -= block;
      const absorbed = block;
      block = 0;
      hp = Math.max(0, hp - remainingDamage);
      return { finalHp: hp, finalBlock: 0, absorbed, hpLoss: remainingDamage };
    }
  }

  hp = Math.max(0, hp - remainingDamage);
  return { finalHp: hp, finalBlock: 0, absorbed: 0, hpLoss: remainingDamage };
}

/**
 * Resolves player playing a card from hand.
 */
export function executePlayerCard(
  state: CombatStateSnapshot,
  cardId: string
): { nextState: CombatStateSnapshot; success: boolean } {
  const cardIndex = state.hand.findIndex((c) => c.id === cardId);
  if (cardIndex === -1) return { nextState: state, success: false };

  const card = state.hand[cardIndex];
  if (card.cost > state.playerEnergy) {
    return { nextState: state, success: false };
  }

  let playerEnergy = state.playerEnergy - card.cost;
  let playerHp = state.playerHp;
  let playerBlock = state.playerBlock;
  let playerStatus = { ...state.playerStatusEffects };
  let enemy = { ...state.enemy, statusEffects: { ...state.enemy.statusEffects } };
  let hand = state.hand.filter((_, i) => i !== cardIndex);
  let discardPile = [...state.discardPile, card];
  let drawPile = [...state.drawPile];
  const log: string[] = [...state.combatLog];

  log.push(`> Console Jockey executed subroutine: ${card.name} (${card.cost} RAM)`);

  // Process card actions
  for (const action of card.actions) {
    if (action.type === 'DAMAGE') {
      let dmg = action.value;
      // Execute card bonus if target decrypted
      if (card.name.startsWith('Execute') && (enemy.statusEffects['vulnerable'] || 0) > 0) {
        dmg *= 2;
      }
      const calculated = calculateDamage(dmg, playerStatus, enemy.statusEffects);
      const res = applyDamageToEntity(calculated, enemy.hp, enemy.block);
      enemy.hp = res.finalHp;
      enemy.block = res.finalBlock;
      log.push(`  ↳ Dealt ${calculated} damage to ${enemy.name} (absorbed: ${res.absorbed}, hp loss: ${res.hpLoss})`);
    } else if (action.type === 'BLOCK') {
      playerBlock += action.value;
      log.push(`  ↳ Generated ${action.value} ICE-Buffer (Total: ${playerBlock})`);
    } else if (action.type === 'APPLY_STATUS' && action.status) {
      const key = action.status.toLowerCase();
      const current = enemy.statusEffects[key] || 0;
      enemy.statusEffects[key] = current + action.value;
      log.push(`  ↳ Injected ${action.value} stacks of ${action.status} into ${enemy.name}`);
    } else if (action.type === 'GAIN_ENERGY') {
      playerEnergy += action.value;
      log.push(`  ↳ Overclocked +${action.value} Deck RAM`);
    } else if (action.type === 'DRAW') {
      // Draw subroutines adhering to 10-card hand limit
      if (drawPile.length === 0 && discardPile.length > 0) {
        drawPile = [...discardPile];
        discardPile = [];
      }
      if (drawPile.length > 0) {
        const drawnCard = drawPile.shift()!;
        if (hand.length < 10) {
          hand.push(drawnCard);
          log.push(`  ↳ Fetched subroutine into L1 Cache: ${drawnCard.name}`);
        } else {
          discardPile.push(drawnCard);
          log.push(`  ↳ Hand full (10 max)! Subroutine flushed to I/O Buffer: ${drawnCard.name}`);
        }
      }
    } else if (action.type === 'SELF_DAMAGE') {
      playerHp = Math.max(1, playerHp - action.value);
      log.push(`  ↳ Thermal feedback caused -${action.value} core damage!`);
    }
  }

  return {
    nextState: {
      ...state,
      playerEnergy,
      playerHp,
      playerBlock,
      playerStatusEffects: playerStatus,
      enemy,
      hand,
      drawPile,
      discardPile,
      combatLog: log,
    },
    success: true,
  };
}

/**
 * Resolves the enemy's turn execution and transitions to next round.
 */
export function executeEnemyTurn(state: CombatStateSnapshot): CombatStateSnapshot {
  let playerHp = state.playerHp;
  let playerBlock = state.playerBlock;
  const playerStatus = { ...state.playerStatusEffects };
  const enemy = { ...state.enemy, statusEffects: { ...state.enemy.statusEffects } };
  const log: string[] = [...state.combatLog];

  // 1. Enemy executes intent
  const intent = enemy.intent;
  log.push(`> Hostile node ${enemy.name} executing intent: ${intent.description}`);

  if (intent.type === 'ATTACK') {
    const rawDmg = intent.value;
    const calculated = calculateDamage(rawDmg, enemy.statusEffects, playerStatus);
    const res = applyDamageToEntity(calculated, playerHp, playerBlock);
    playerHp = res.finalHp;
    playerBlock = res.finalBlock;
    log.push(`  ↳ Hostile node dealt ${calculated} feedback damage (absorbed: ${res.absorbed}, flesh hp loss: ${res.hpLoss})`);

    // Handle Volatile affix recoil
    if (enemy.affixes.includes('Volatile')) {
      const recoil = Math.max(1, Math.floor(enemy.hp * 0.1));
      enemy.hp = Math.max(1, enemy.hp - recoil);
      log.push(`  ↳ Volatile construct overheated, suffering -${recoil} HP recoil!`);
    }
  } else if (intent.type === 'DEFEND') {
    enemy.block += intent.value;
    log.push(`  ↳ Hostile node raised ${intent.value} ICE-Buffer (Total: ${enemy.block})`);
  } else if (intent.type === 'BUFF') {
    if (enemy.archetype === 'WINTERMUTE') {
      enemy.statusEffects['wintermute_power'] = (enemy.statusEffects['wintermute_power'] || 0) + 1;
      log.push(`  ↳ WINTERMUTE power escalated (+2 permanent scaling)!`);
    } else if (enemy.archetype === 'MEMORY_BRUTE') {
      enemy.statusEffects['buff'] = 1;
      log.push(`  ↳ Memory-Brute charged its capacitors for an overwhelming strike!`);
    }
  }

  // If intent applies a status to the player
  if (intent.status) {
    const key = intent.status.toLowerCase();
    const duration = intent.statusDuration || 1;
    playerStatus[key] = (playerStatus[key] || 0) + duration;
    log.push(`  ↳ Hostile node infected Console Jockey with ${duration} turn(s) of ${intent.status}!`);
  }

  // 2. Decrement enemy status effects
  for (const statusKey of ['vulnerable', 'weak']) {
    if ((enemy.statusEffects[statusKey] || 0) > 0) {
      enemy.statusEffects[statusKey] -= 1;
      if (enemy.statusEffects[statusKey] <= 0) {
        delete enemy.statusEffects[statusKey];
      }
    }
  }

  // 3. Prepare next round for player
  // Reset player block
  playerBlock = 0;
  const playerEnergy = state.playerMaxEnergy;

  // Decrement player status effects
  for (const statusKey of ['vulnerable', 'weak']) {
    if ((playerStatus[statusKey] || 0) > 0) {
      playerStatus[statusKey] -= 1;
      if (playerStatus[statusKey] <= 0) {
        delete playerStatus[statusKey];
      }
    }
  }

  // Cycle enemy intent
  enemy.cycleIndex += 1;
  enemy.intent = calculateNextIntent(enemy);

  // 4. Draw cards for player
  let drawPile = [...state.drawPile];
  let discardPile = [...state.discardPile, ...state.hand]; // Discard remaining hand
  let hand: Card[] = [];

  for (let i = 0; i < 4; i++) {
    if (drawPile.length === 0 && discardPile.length > 0) {
      drawPile = [...discardPile];
      discardPile = [];
    }
    if (drawPile.length > 0) {
      const drawn = drawPile.shift()!;
      if (hand.length < 10) {
        hand.push(drawn);
      } else {
        discardPile.push(drawn);
      }
    }
  }

  // 5. Trigger start-of-round effects (Enemy Poison ticks on player turn start or enemy turn start)
  if ((enemy.statusEffects['poison'] || 0) > 0) {
    const poisonDmg = enemy.statusEffects['poison'];
    enemy.hp = Math.max(0, enemy.hp - poisonDmg);
    enemy.statusEffects['poison'] -= 1;
    if (enemy.statusEffects['poison'] <= 0) {
      delete enemy.statusEffects['poison'];
    }
    log.push(`  ↳ Corrupted Memory (Poison) ate away -${poisonDmg} HP from ${enemy.name} (Direct HP Loss)`);
  }

  log.push(`--- CYCLE REFRESHED: L1 CACHE REFILLED (4 CARDS, ${playerEnergy} RAM) ---`);

  return {
    ...state,
    playerHp,
    playerBlock,
    playerEnergy,
    playerStatusEffects: playerStatus,
    enemy,
    hand,
    drawPile,
    discardPile,
    combatLog: log,
  };
}
