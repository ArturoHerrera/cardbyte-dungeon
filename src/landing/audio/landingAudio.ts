/**
 * Cardbyte Dungeon // Landing Portal WebAudio Engine
 * Procedural ambient synthesizer drone and tactile terminal click sound effects.
 * 100% mathematical synthesis - zero external audio assets or network requests.
 */

class LandingAudioManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;
  private isDroneRunning: boolean = false;
  private listeners: Set<(muted: boolean) => void> = new Set();

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public subscribe(listener: (muted: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isMuted);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isMuted));
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.initContext();
    if (!this.ctx) return this.isMuted;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startAmbientDrone();
      this.playMechanicalBeep(1200, 0.03, 0.05);
    } else {
      this.stopAmbientDrone();
    }

    this.notify();
    return this.isMuted;
  }

  public playClick(pitch = 950) {
    if (this.isMuted) return;
    this.playMechanicalBeep(pitch, 0.02, 0.03);
  }

  public playRomInject() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    // Dual-tone digital relay chirp
    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(440, now);
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now);
    osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.08);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.13);
    osc2.stop(now + 0.13);
  }

  private playMechanicalBeep(freq: number, duration: number, volume: number) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.8, now + duration);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.01);
  }

  private startAmbientDrone() {
    if (this.isDroneRunning || !this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;

    // Smooth master gain fade in
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.06, now + 1.5);

    // Filter for warm, dark analog tone
    this.droneFilter = this.ctx.createBiquadFilter();
    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.setValueAtTime(220, now);
    this.droneFilter.Q.setValueAtTime(3.5, now);

    // LFO for slow breathing filter sweep
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.15, now); // 0.15 Hz slow breathing
    lfoGain.gain.setValueAtTime(80, now);
    lfo.connect(lfoGain);
    lfoGain.connect(this.droneFilter.frequency);
    lfo.start(now);
    this.lfo = lfo;

    // Sub-bass root: A1 (55 Hz)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'triangle';
    this.droneOsc1.frequency.setValueAtTime(55, now);

    // Mysterious fifth harmonic: E2 (82.4 Hz with slight detuning)
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'sawtooth';
    this.droneOsc2.frequency.setValueAtTime(82.41, now);
    this.droneOsc2.detune.setValueAtTime(4, now);

    const droneMix = this.ctx.createGain();
    droneMix.gain.setValueAtTime(0.4, now);

    this.droneOsc1.connect(this.droneFilter);
    this.droneOsc2.connect(this.droneFilter);
    this.droneFilter.connect(droneMix);
    droneMix.connect(this.masterGain);

    this.droneOsc1.start(now);
    this.droneOsc2.start(now);
    this.isDroneRunning = true;
  }

  private stopAmbientDrone() {
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);

    setTimeout(() => {
      if (this.isMuted) {
        try {
          this.droneOsc1?.stop();
          this.droneOsc2?.stop();
          this.lfo?.stop();
          this.droneOsc1?.disconnect();
          this.droneOsc2?.disconnect();
          this.lfo?.disconnect();
          this.droneFilter?.disconnect();
        } catch {
          // Ignore clean-up timing bounds
        }
        this.droneOsc1 = null;
        this.droneOsc2 = null;
        this.lfo = null;
        this.droneFilter = null;
        this.isDroneRunning = false;
      }
    }, 850);
  }
}

export const landingAudio = new LandingAudioManager();
