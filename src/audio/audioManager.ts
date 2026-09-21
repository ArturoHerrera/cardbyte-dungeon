import { ProceduralSynth, SoundEffectType } from './proceduralSynth';

export type BgmTrack = 'TITLE' | 'MAP' | 'COMBAT' | 'NONE';

const BGM_SOURCES: Record<Exclude<BgmTrack, 'NONE'>, string> = {
  TITLE: '/assets/audio/ambient_title.ogg',
  MAP: '/assets/audio/matrix_map.ogg',
  COMBAT: '/assets/audio/combat_loop.ogg',
};

class AudioManager {
  private static instance: AudioManager;
  private synth: ProceduralSynth;

  // Dual HTML5 Audio elements for smooth cross-fading
  private playerA: HTMLAudioElement | null = null;
  private playerB: HTMLAudioElement | null = null;
  private activePlayer: 'A' | 'B' = 'A';
  private currentTrack: BgmTrack = 'NONE';

  private muted: boolean = false;
  private bgmVolume: number = 0.5;
  private sfxVolume: number = 0.7;

  private isInitialized: boolean = false;
  private fadeInterval: ReturnType<typeof setInterval> | null = null;
  private subscribers: Set<() => void> = new Set();

  private constructor() {
    this.synth = new ProceduralSynth();
    this.loadSettings();

    if (typeof window !== 'undefined') {
      this.setupLifecycle();
    }
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  private loadSettings(): void {
    if (typeof window === 'undefined') return;

    try {
      const storedMuted = localStorage.getItem('cardbyte_audio_muted');
      const storedBgm = localStorage.getItem('cardbyte_bgm_volume');
      const storedSfx = localStorage.getItem('cardbyte_sfx_volume');

      if (storedMuted !== null) {
        this.muted = storedMuted === 'true';
      }
      if (storedBgm !== null) {
        this.bgmVolume = parseFloat(storedBgm);
      }
      if (storedSfx !== null) {
        this.sfxVolume = parseFloat(storedSfx);
      }

      this.synth.setVolume(this.sfxVolume);
      this.synth.setMuted(this.muted);
    } catch {
      // Ignore localStorage access restrictions
    }
  }

  private saveSettings(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('cardbyte_audio_muted', String(this.muted));
      localStorage.setItem('cardbyte_bgm_volume', String(this.bgmVolume));
      localStorage.setItem('cardbyte_sfx_volume', String(this.sfxVolume));
    } catch {
      // Ignore localStorage access restrictions
    }
  }

  private setupLifecycle(): void {
    // Lazy unlock on first interactive gesture
    const unlockAudio = () => {
      this.initAudioContext();
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('pointerdown', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });

    // Mobile background tab optimization
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.pauseBgm();
        this.synth.suspend();
      } else {
        this.resumeBgm();
        this.synth.resume();
      }
    });
  }

  private initAudioPlayers(): void {
    if (this.playerA && this.playerB) return;

    this.playerA = new Audio();
    this.playerA.loop = true;
    this.playerA.volume = this.muted ? 0 : this.bgmVolume;

    this.playerB = new Audio();
    this.playerB.loop = true;
    this.playerB.volume = 0;
  }

  public initAudioContext(): void {
    if (this.isInitialized) return;
    this.isInitialized = true;
    this.initAudioPlayers();
    this.synth.initContext();

    // If a track was queued, start playing it
    if (this.currentTrack !== 'NONE') {
      this.playBgm(this.currentTrack, true);
    }
  }

  public subscribe(listener: () => void): () => void {
    this.subscribers.add(listener);
    return () => this.subscribers.delete(listener);
  }

  private notify(): void {
    this.subscribers.forEach((listener) => listener());
  }

  public isAudioMuted(): boolean {
    return this.muted;
  }

  public getBgmVolume(): number {
    return this.bgmVolume;
  }

  public getSfxVolume(): number {
    return this.sfxVolume;
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    this.synth.setMuted(this.muted);

    const activeEl = this.activePlayer === 'A' ? this.playerA : this.playerB;
    if (activeEl) {
      activeEl.volume = this.muted ? 0 : this.bgmVolume;
    }

    this.saveSettings();
    this.notify();
    return this.muted;
  }

  public setBgmVolume(val: number): void {
    this.bgmVolume = Math.max(0, Math.min(1, val));
    const activeEl = this.activePlayer === 'A' ? this.playerA : this.playerB;
    if (activeEl && !this.muted) {
      activeEl.volume = this.bgmVolume;
    }
    this.saveSettings();
    this.notify();
  }

  public setSfxVolume(val: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, val));
    this.synth.setVolume(this.sfxVolume);
    this.saveSettings();
    this.notify();
  }

  public playSfx(type: SoundEffectType): void {
    this.initAudioContext();
    this.synth.playSfx(type);
  }

  public playBgm(track: BgmTrack, force: boolean = false): void {
    if (this.currentTrack === track && !force) return;
    this.currentTrack = track;

    if (!this.isInitialized) {
      return; // Will play automatically when user gesture arrives
    }

    this.initAudioPlayers();
    if (!this.playerA || !this.playerB) return;

    if (track === 'NONE') {
      this.fadeOutCurrent();
      return;
    }

    const src = BGM_SOURCES[track];
    const incomingPlayer = this.activePlayer === 'A' ? this.playerB : this.playerA;
    const outgoingPlayer = this.activePlayer === 'A' ? this.playerA : this.playerB;

    incomingPlayer.src = src;
    incomingPlayer.currentTime = 0;
    incomingPlayer.volume = 0;

    const playPromise = incomingPlayer.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.crossFade(incomingPlayer, outgoingPlayer);
          this.activePlayer = this.activePlayer === 'A' ? 'B' : 'A';
        })
        .catch(() => {
          // Autoplay was prevented
        });
    }
  }

  private crossFade(incoming: HTMLAudioElement, outgoing: HTMLAudioElement): void {
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    const steps = 15;
    const stepDuration = 60; // total fade time ~900ms
    let currentStep = 0;
    const targetVolume = this.muted ? 0 : this.bgmVolume;

    this.fadeInterval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      incoming.volume = Math.max(0, Math.min(1, targetVolume * progress));
      outgoing.volume = Math.max(0, Math.min(1, targetVolume * (1 - progress)));

      if (currentStep >= steps) {
        if (this.fadeInterval) {
          clearInterval(this.fadeInterval);
          this.fadeInterval = null;
        }
        outgoing.pause();
        outgoing.currentTime = 0;
        incoming.volume = targetVolume;
      }
    }, stepDuration);
  }

  private fadeOutCurrent(): void {
    const activeEl = this.activePlayer === 'A' ? this.playerA : this.playerB;
    if (!activeEl) return;

    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    let currentStep = 0;
    const steps = 10;
    const startVolume = activeEl.volume;

    this.fadeInterval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      activeEl.volume = Math.max(0, startVolume * (1 - progress));

      if (currentStep >= steps) {
        if (this.fadeInterval) {
          clearInterval(this.fadeInterval);
          this.fadeInterval = null;
        }
        activeEl.pause();
        activeEl.currentTime = 0;
      }
    }, 50);
  }

  private pauseBgm(): void {
    const activeEl = this.activePlayer === 'A' ? this.playerA : this.playerB;
    if (activeEl && !activeEl.paused) {
      activeEl.pause();
    }
  }

  private resumeBgm(): void {
    if (this.currentTrack === 'NONE') return;
    const activeEl = this.activePlayer === 'A' ? this.playerA : this.playerB;
    if (activeEl && activeEl.paused) {
      activeEl.play().catch(() => {});
    }
  }
}

export const audioManager = AudioManager.getInstance();
