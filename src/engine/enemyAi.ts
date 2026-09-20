import { Enemy, EnemyIntent } from '../types/cardbyte';
import { randomInt, pickRandom } from './random';

/**
 * Calculates the next intent for an enemy based on archetype, turn cycle, and affixes.
 */
export function calculateNextIntent(enemy: Enemy): EnemyIntent {
  const cycle = enemy.cycleIndex;

  switch (enemy.archetype) {
    case 'BIT_BUG': {
      // 3-Turn Cycle: Attack 6 -> Attack 8 -> Defend 8
      if (cycle % 3 === 0) {
        return { type: 'ATTACK', value: 6, description: 'Packet Swarm (6 dmg)' };
      } else if (cycle % 3 === 1) {
        return { type: 'ATTACK', value: 8, description: 'Corrupt Bite (8 dmg)' };
      } else {
        return { type: 'DEFEND', value: 8, description: 'Hard Shell (+8 block)' };
      }
    }

    case 'MEMORY_BRUTE': {
      // 3-Turn Cycle: Defend 12 -> Charge Up (Buff) -> Lethal Attack 16
      if (cycle % 3 === 0) {
        return { type: 'DEFEND', value: 12, description: 'Reinforce ICE (+12 block)' };
      } else if (cycle % 3 === 1) {
        return { type: 'BUFF', value: 2, description: 'Overcharge Capacitors' };
      } else {
        const isCharged = (enemy.statusEffects['buff'] || 0) > 0;
        const dmg = isCharged ? 20 : 16;
        return { type: 'ATTACK', value: dmg, description: `Logic Sledge (${dmg} dmg)` };
      }
    }

    case 'DAEMON_CULTIST': {
      // 3-Turn Cycle: Buff (+2 Vulnerable to player) -> Attack 7 -> Attack 9
      if (cycle % 3 === 0) {
        return { 
          type: 'BUFF', 
          value: 2, 
          status: 'VULNERABLE', 
          statusDuration: 2,
          description: 'Decrypt Ports (Applies 2 Vulnerable)' 
        };
      } else if (cycle % 3 === 1) {
        return { type: 'ATTACK', value: 7, description: 'Dark Hex (7 dmg)' };
      } else {
        return { type: 'ATTACK', value: 9, description: 'Logic Flail (9 dmg)' };
      }
    }

    case 'WINTERMUTE': {
      // 4-Turn Cycle Boss with soft-enrage
      const bonusDmg = (enemy.statusEffects['wintermute_power'] || 0) * 2;
      const step = cycle % 4;

      if (step === 0) {
        return { 
          type: 'ATTACK', 
          value: 8 + bonusDmg, 
          status: 'VULNERABLE', 
          statusDuration: 2,
          description: `Neural Probe (${8 + bonusDmg} dmg + 2 Vulnerable)` 
        };
      } else if (step === 1) {
        return { 
          type: 'ATTACK', 
          value: 14 + bonusDmg, 
          description: `Logic Cascade (${14 + bonusDmg} lethal dmg)` 
        };
      } else if (step === 2) {
        return { 
          type: 'DEFEND', 
          value: 18, 
          status: 'WEAK', 
          statusDuration: 1,
          description: 'Firewall Rebuild (+18 block + 1 Weak)' 
        };
      } else {
        return { 
          type: 'BUFF', 
          value: 1, 
          description: 'Matrix Overload (+2 permanent damage scaling)' 
        };
      }
    }
  }
}

/**
 * Creates an enemy instance based on floor depth and encounter type.
 */
export function spawnEnemy(
  prng: () => number,
  depth: number,
  isElite: boolean,
  isBoss: boolean
): Enemy {
  if (isBoss || depth === 7) {
    const boss: Enemy = {
      id: `wintermute_boss_${Date.now()}`,
      name: 'AI Core // WINTERMUTE',
      archetype: 'WINTERMUTE',
      hp: 80,
      maxHp: 80,
      block: 15, // Starts with passive buffer
      energy: 3,
      maxEnergy: 3,
      statusEffects: {},
      affixes: ['Matrix-God', 'Autonomous'],
      cycleIndex: 0,
      intent: { type: 'ATTACK', value: 8, status: 'VULNERABLE', statusDuration: 2, description: 'Neural Probe' },
    };
    boss.intent = calculateNextIntent(boss);
    return boss;
  }

  // Pick regular archetype
  const archetypes: ('BIT_BUG' | 'MEMORY_BRUTE' | 'DAEMON_CULTIST')[] = 
    isElite || depth >= 3
      ? ['MEMORY_BRUTE', 'DAEMON_CULTIST', 'BIT_BUG']
      : ['BIT_BUG', 'BIT_BUG', 'DAEMON_CULTIST'];

  const archetype = pickRandom(prng, archetypes);

  let name = '';
  let hp = 20;
  let block = 0;
  const affixes: string[] = [];

  if (isElite) {
    affixes.push(pickRandom(prng, ['Volatile', 'Armored', 'Cursed']));
  }

  if (archetype === 'BIT_BUG') {
    name = isElite ? 'Apex Trace-Bug' : 'Bit-Bug (Trace Daemon)';
    hp = isElite ? randomInt(prng, 24, 28) : randomInt(prng, 16, 20);
  } else if (archetype === 'MEMORY_BRUTE') {
    name = isElite ? 'Reinforced Black ICE' : 'Memory-Brute (Black ICE)';
    hp = isElite ? randomInt(prng, 46, 52) : randomInt(prng, 36, 42);
  } else {
    name = isElite ? 'High Tessier Fragment' : 'Daemon-Cultist (Subroutine)';
    hp = isElite ? randomInt(prng, 34, 38) : randomInt(prng, 26, 32);
  }

  // Handle passive starting block from Armored affix
  if (affixes.includes('Armored')) {
    block = 10;
  }

  const enemy: Enemy = {
    id: `enemy_${depth}_${Date.now()}`,
    name,
    archetype,
    hp,
    maxHp: hp,
    block,
    energy: 3,
    maxEnergy: 3,
    statusEffects: {},
    affixes,
    cycleIndex: 0,
    intent: { type: 'ATTACK', value: 6, description: '' },
  };

  enemy.intent = calculateNextIntent(enemy);
  return enemy;
}
