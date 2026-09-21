import LZString from 'lz-string';
import { ActiveRunState, PlayerProfile, StorageAdapter } from '../types/cardbyte';

const RUN_KEY = 'cardbyte_active_run_v1';
const PROFILE_KEY = 'cardbyte_player_profile_v1';

/**
 * Calculates a fast 32-bit CRC checksum.
 */
export function crc32(str: string): string {
  let crc = 0 ^ -1;
  for (let i = 0; i < str.length; i++) {
    crc = (crc >>> 8) ^ ((crc ^ str.charCodeAt(i)) & 0xff);
  }
  return ((crc ^ -1) >>> 0).toString(16).padStart(8, '0');
}

export const defaultProfile: PlayerProfile = {
  totalRuns: 0,
  victories: 0,
  flatlines: 0,
  highestFloorBreached: 0,
  totalDamageDealt: 0,
  history: [],
};

export const localStorageAdapter: StorageAdapter = {
  async saveActiveRun(runData: ActiveRunState): Promise<void> {
    try {
      localStorage.setItem(RUN_KEY, JSON.stringify(runData));
    } catch (e) {
      console.error('Failed to save active run to localStorage', e);
    }
  },

  async loadActiveRun(): Promise<ActiveRunState | null> {
    try {
      const raw = localStorage.getItem(RUN_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as ActiveRunState;
    } catch (e) {
      console.error('Failed to load active run from localStorage', e);
      return null;
    }
  },

  async clearActiveRun(): Promise<void> {
    try {
      localStorage.removeItem(RUN_KEY);
    } catch (e) {
      console.error('Failed to clear active run', e);
    }
  },

  async saveProfile(profile: PlayerProfile): Promise<void> {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  },

  async loadProfile(): Promise<PlayerProfile> {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (!raw) return { ...defaultProfile };
      return { ...defaultProfile, ...JSON.parse(raw) };
    } catch (e) {
      console.error('Failed to load profile', e);
      return { ...defaultProfile };
    }
  },

  async exportDump(): Promise<string> {
    const activeRun = await this.loadActiveRun();
    const profile = await this.loadProfile();

    const payload = JSON.stringify({
      activeRun,
      profile,
      timestamp: Date.now(),
      version: '1.0',
    });

    const compressed = LZString.compressToBase64(payload);
    const checksum = crc32(compressed);

    return `CB7://${compressed}$CRC32_${checksum}`;
  },

  async importDump(dumpStr: string): Promise<boolean> {
    try {
      const trimmed = dumpStr.trim();
      if (!trimmed.startsWith('CB7://')) return false;

      const withoutPrefix = trimmed.slice(6);
      const parts = withoutPrefix.split('$CRC32_');
      if (parts.length !== 2) return false;

      const [compressed, expectedCrc] = parts;
      const actualCrc = crc32(compressed);

      if (actualCrc.toLowerCase() !== expectedCrc.toLowerCase()) {
        console.error('Checksum verification failed for ROM dump!');
        return false;
      }

      const decompressed = LZString.decompressFromBase64(compressed);
      if (!decompressed) return false;

      const data = JSON.parse(decompressed);

      // Validate Profile structure if present
      if (data.profile) {
        const p = data.profile;
        if (
          typeof p.totalRuns !== 'number' ||
          typeof p.victories !== 'number' ||
          typeof p.flatlines !== 'number' ||
          !Array.isArray(p.history)
        ) {
          console.error('Invalid profile schema in ROM dump');
          return false;
        }
        await this.saveProfile(p);
      }

      // Validate ActiveRun structure if present
      if (data.activeRun) {
        const r = data.activeRun;
        if (
          typeof r.seed !== 'number' ||
          typeof r.playerFleshHp !== 'number' ||
          typeof r.playerMaxHp !== 'number' ||
          !Array.isArray(r.masterDeck) ||
          !r.map ||
          typeof r.map !== 'object' ||
          !r.map.nodes ||
          typeof r.map.nodes !== 'object'
        ) {
          console.error('Invalid activeRun schema in ROM dump');
          return false;
        }
        await this.saveActiveRun(r);
      } else {
        await this.clearActiveRun();
      }

      return true;
    } catch (e) {
      console.error('Failed to import ROM dump', e);
      return false;
    }
  },
};
