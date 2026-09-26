/**
 * Cardbyte Dungeon // Landing Portal WebAudio Engine
 * Procedural Blade Runner / Vangelis CS-80 inspired synthesizer drone,
 * biometric optical scan effects, and tactile terminal audio.
 * 100% mathematical synthesis - zero external audio assets or network requests.
 */

class LandingAudioManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneOscSub: OscillatorNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;
  private isDroneRunning: boolean = false;
  private listeners: Set<(muted: boolean) => void> = new Set();

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
      this.playMechanicalBeep(1100, 0.04, 0.05);
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

  /**
   * Biometric Optical Scanner Chime (Voight-Kampff Laser Scan effect)
   */
  public playBiometricScan() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.35);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.Q.setValueAtTime(4, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.46);
  }

  /**
   * Dramatic analog synth swell for Jack-In execution
   */
  public playJackInSwell() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55, now);
    osc1.frequency.exponentialRampToValueAtTime(110, now + 0.4);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(82.41, now);
    osc2.frequency.exponentialRampToValueAtTime(164.81, now + 0.4);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(1800, now + 0.35);
    filter.Q.setValueAtTime(3, now);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.56);
    osc2.stop(now + 0.56);
  }

  public playRomInject() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

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
    this.masterGain.gain.linearRampToValueAtTime(0.07, now + 2.0);

    // Warm resonant lowpass filter simulating vintage analog Yamaha CS-80
    this.droneFilter = this.ctx.createBiquadFilter();
    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.setValueAtTime(260, now);
    this.droneFilter.Q.setValueAtTime(3.2, now);

    // Very slow breathing LFO (0.08 Hz)
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.08, now);
    lfoGain.gain.setValueAtTime(110, now);
    lfo.connect(lfoGain);
    lfoGain.connect(this.droneFilter.frequency);
    lfo.start(now);
    this.lfo = lfo;

    // Sub-bass root: A1 (55 Hz)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'triangle';
    this.droneOsc1.frequency.setValueAtTime(55, now);

    // Warm fifth harmonic: E2 (82.41 Hz with organic 5 cent detune)
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'sawtooth';
    this.droneOsc2.frequency.setValueAtTime(82.41, now);
    this.droneOsc2.detune.setValueAtTime(5, now);

    // Deep sub-octave: A0 (27.5 Hz)
    this.droneOscSub = this.ctx.createOscillator();
    this.droneOscSub.type = 'sine';
    this.droneOscSub.frequency.setValueAtTime(27.5, now);

    const droneMix = this.ctx.createGain();
    droneMix.gain.setValueAtTime(0.35, now);

    this.droneOsc1.connect(this.droneFilter);
    this.droneOsc2.connect(this.droneFilter);
    this.droneOscSub.connect(this.droneFilter);
    this.droneFilter.connect(droneMix);
    droneMix.connect(this.masterGain);

    this.droneOsc1.start(now);
    this.droneOsc2.start(now);
    this.droneOscSub.start(now);
    this.isDroneRunning = true;
  }

  private stopAmbientDrone() {
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.0);

    setTimeout(() => {
      if (this.isMuted) {
        try {
          this.droneOsc1?.stop();
          this.droneOsc2?.stop();
          this.droneOscSub?.stop();
          this.lfo?.stop();
          this.droneOsc1?.disconnect();
          this.droneOsc2?.disconnect();
          this.droneOscSub?.disconnect();
          this.lfo?.disconnect();
          this.droneFilter?.disconnect();
        } catch {
          // Ignore clean-up timing bounds
        }
        this.droneOsc1 = null;
        this.droneOsc2 = null;
        this.droneOscSub = null;
        this.lfo = null;
        this.droneFilter = null;
        this.isDroneRunning = false;
      }
    }, 1100);
  }
}

export const landingAudio = new LandingAudioManager();
