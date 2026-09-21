/**
 * ProceduralSynth: Zero-byte, real-time procedural sound effect synthesis
 * utilizing the browser's native Web Audio API.
 */

export type SoundEffectType = 
  | 'UI_CLICK' 
  | 'CARD_INJECT' 
  | 'SHIELD_UP' 
  | 'DAMAGE_CRIT'
  | 'TURN_END';

export class ProceduralSynth {
  private ctx: AudioContext | null = null;
  private sfxGain: GainNode | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.7;

  constructor() {
    // Context is lazily initialized on first user interaction
  }

  public initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.sfxGain.connect(this.ctx.destination);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {
        // Silently catch suspended context resume failures prior to user gesture
      });
    }

    return this.ctx;
  }

  public async suspend(): Promise<void> {
    if (this.ctx && this.ctx.state === 'running') {
      try {
        await this.ctx.suspend();
      } catch {
        // Silently catch suspension errors
      }
    }
  }

  public async resume(): Promise<void> {
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch {
        // Silently catch resume errors
      }
    }
  }

  public setVolume(val: number): void {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.ctx && this.sfxGain) {
      this.sfxGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.ctx && this.sfxGain) {
      this.sfxGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  public playSfx(type: SoundEffectType): void {
    if (this.isMuted || this.volume <= 0) return;
    const ctx = this.initContext();
    if (!ctx || !this.sfxGain || ctx.state !== 'running') return;

    try {
      const now = ctx.currentTime;

      switch (type) {
        case 'UI_CLICK': {
          // Sharp, high-tech terminal micro-click
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(1400, now);
          osc.frequency.exponentialRampToValueAtTime(800, now + 0.025);

          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

          osc.connect(gain);
          gain.connect(this.sfxGain);

          osc.onended = () => {
            try {
              osc.disconnect();
              gain.disconnect();
            } catch {
              // Ignore already disconnected errors
            }
          };

          osc.start(now);
          osc.stop(now + 0.025);
          break;
        }

        case 'CARD_INJECT': {
          // Cyberpunk rising digital tri-tone injection burst
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();

          osc.type = 'sawtooth';
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1200, now);

          // Arpeggiated pitch rise
          osc.frequency.setValueAtTime(330, now);
          osc.frequency.setValueAtTime(495, now + 0.04);
          osc.frequency.setValueAtTime(660, now + 0.08);
          osc.frequency.exponentialRampToValueAtTime(990, now + 0.16);

          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.sfxGain);

          osc.onended = () => {
            try {
              osc.disconnect();
              filter.disconnect();
              gain.disconnect();
            } catch {
              // Ignore
            }
          };

          osc.start(now);
          osc.stop(now + 0.18);
          break;
        }

        case 'SHIELD_UP': {
          // Resonant dual-harmonic firewall crystallization chime
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.type = 'sine';
          osc2.type = 'triangle';

          osc1.frequency.setValueAtTime(320, now);
          osc1.frequency.exponentialRampToValueAtTime(480, now + 0.2);

          osc2.frequency.setValueAtTime(640, now);
          osc2.frequency.exponentialRampToValueAtTime(960, now + 0.2);

          gain.gain.setValueAtTime(0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(this.sfxGain);

          osc1.onended = () => {
            try {
              osc1.disconnect();
              osc2.disconnect();
              gain.disconnect();
            } catch {
              // Ignore
            }
          };

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 0.22);
          osc2.stop(now + 0.22);
          break;
        }

        case 'DAMAGE_CRIT': {
          // Low square glitch crunch with noise modulation for flesh HP hit
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'square';
          osc.frequency.setValueAtTime(110, now);
          osc.frequency.exponentialRampToValueAtTime(40, now + 0.22);

          gain.gain.setValueAtTime(0.4, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

          osc.connect(gain);
          gain.connect(this.sfxGain);

          osc.onended = () => {
            try {
              osc.disconnect();
              gain.disconnect();
            } catch {
              // Ignore
            }
          };

          osc.start(now);
          osc.stop(now + 0.24);
          break;
        }

        case 'TURN_END': {
          // Descending cycle completion tone
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(580, now);
          osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);

          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

          osc.connect(gain);
          gain.connect(this.sfxGain);

          osc.onended = () => {
            try {
              osc.disconnect();
              gain.disconnect();
            } catch {
              // Ignore
            }
          };

          osc.start(now);
          osc.stop(now + 0.14);
          break;
        }
      }
    } catch {
      // Gracefully ignore audio glitches during rapid concurrency
    }
  }
}
