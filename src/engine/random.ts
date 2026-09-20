/**
 * Deterministic PRNG using the Mulberry32 algorithm.
 * Generates floating-point numbers between 0 (inclusive) and 1 (exclusive).
 */
export function createPRNG(seed: number) {
  let s = seed | 0;
  return function next(): number {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Returns a random integer between min and max (inclusive) using the provided PRNG.
 */
export function randomInt(prng: () => number, min: number, max: number): number {
  return Math.floor(prng() * (max - min + 1)) + min;
}

/**
 * Picks a random item from an array using the provided PRNG.
 */
export function pickRandom<T>(prng: () => number, array: T[]): T {
  const index = Math.floor(prng() * array.length);
  return array[index];
}

/**
 * Deterministically shuffles an array in place (Fisher-Yates).
 */
export function shuffleArray<T>(prng: () => number, array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
