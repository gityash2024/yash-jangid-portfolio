'use client';

/**
 * Pure Procedural Web Audio API Sound Synthesizer
 * Yash Jangid Portfolio — Cyber-Executive Interactive Experience
 * 
 * Features:
 * - Zero external audio assets (.mp3/.wav).
 * - Lazy initialization on first user interaction.
 * - Handles browser autoplay policies (resumes suspended context).
 * - Master gain control with persistent mute toggle saved in localStorage.
 * - Dispatches 'yj-audio-state-changed' window events for cross-component sync.
 */

export interface AudioEngine {
  playClick: () => void;
  playHover: () => void;
  playTerminalKey: () => void;
  playSuccessChime: () => void;
  playErrorBuzz: () => void;
  playPaletteOpen: () => void;
  toggleMute: () => boolean;
  isMuted: () => boolean;
  setMuted: (muted: boolean) => void;
  init: () => boolean;
}

const STORAGE_KEY_MUTED = 'yj_portfolio_muted';
const STORAGE_KEY_ENABLED = 'yash_audio_enabled';
const EVENT_NAME = 'yj-audio-state-changed';

class ProceduralAudioEngine implements AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private _isMuted: boolean = true;
  private initialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const savedMuted = localStorage.getItem(STORAGE_KEY_MUTED);
        const savedEnabled = localStorage.getItem(STORAGE_KEY_ENABLED);
        if (savedMuted !== null) {
          this._isMuted = savedMuted === 'true';
        } else if (savedEnabled !== null) {
          this._isMuted = savedEnabled !== 'true';
        } else {
          this._isMuted = true;
        }
      } catch {
        this._isMuted = true;
      }
    }
  }

  public init(): boolean {
    if (typeof window === 'undefined') return false;

    if (!this.ctx) {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

        if (!AudioCtx) return false;

        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);
        this.applyGain();
        this.initialized = true;
      } catch (err) {
        console.warn('Web Audio API not supported or initialization failed:', err);
        return false;
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {
        // Resume may fail if no user gesture has occurred yet
      });
    }

    return true;
  }

  private applyGain(): void {
    if (!this.ctx || !this.masterGain) return;
    const targetGain = this._isMuted ? 0.0 : 0.45;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(targetGain, now + 0.02);
  }

  private dispatchChange(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_MUTED, String(this._isMuted));
        localStorage.setItem(STORAGE_KEY_ENABLED, String(!this._isMuted));
        window.dispatchEvent(
          new CustomEvent(EVENT_NAME, { detail: { isMuted: this._isMuted } })
        );
      } catch {
        // Storage might be restricted
      }
    }
  }

  public isMuted(): boolean {
    return this._isMuted;
  }

  public setMuted(muted: boolean): void {
    this._isMuted = muted;
    this.init();
    this.applyGain();
    this.dispatchChange();
  }

  public toggleMute(): boolean {
    this._isMuted = !this._isMuted;
    this.init();
    this.applyGain();
    this.dispatchChange();
    if (!this._isMuted) {
      this.playSuccessChime();
    }
    return this._isMuted;
  }

  /**
   * 1. Tactile UI Click
   * Frequency drop 1200Hz -> 400Hz over 40ms with exponential decay
   */
  public playClick(): void {
    if (this._isMuted || !this.init() || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Audio playback safety catch
    }
  }

  /**
   * 2. Micro Hover Chime
   * Soft chime at 880Hz over 50ms with subtle envelope
   */
  public playHover(): void {
    if (this._isMuted || !this.init() || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.055);
    } catch {
      // Audio playback safety catch
    }
  }

  /**
   * 3. Terminal Mechanical Keystroke
   * Random subtle pitch shift between 600Hz and 800Hz with bandpass filter (~20ms)
   */
  public playTerminalKey(): void {
    if (this._isMuted || !this.init() || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      const pitch = 600 + Math.random() * 200; // 600Hz - 800Hz
      osc.type = 'square';
      osc.frequency.setValueAtTime(pitch, now);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200 + Math.random() * 300, now);
      filter.Q.setValueAtTime(4, now);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch {
      // Audio playback safety catch
    }
  }

  /**
   * 4. Triad Success Arpeggio
   * C5 (523Hz) -> E5 (659Hz) -> G5 (784Hz)
   */
  public playSuccessChime(): void {
    if (this._isMuted || !this.init() || !this.ctx || !this.masterGain) return;

    try {
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 triad
      const stepDuration = 0.055;

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const now = this.ctx.currentTime + idx * stepDuration;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.17);
      });
    } catch {
      // Audio playback safety catch
    }
  }

  /**
   * 5. Terminal Error Buzz
   * Low sawtooth tone 160Hz -> 130Hz
   */
  public playErrorBuzz(): void {
    if (this._isMuted || !this.init() || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.setValueAtTime(130, now + 0.06);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.14);
    } catch {
      // Audio playback safety catch
    }
  }

  /**
   * 6. Command Palette Open Sweep
   * Ascending gentle sweep 250Hz -> 500Hz
   */
  public playPaletteOpen(): void {
    if (this._isMuted || !this.init() || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(250, now);
      osc.frequency.exponentialRampToValueAtTime(500, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Audio playback safety catch
    }
  }
}

// Export singleton instance
export const audioEngine: AudioEngine = new ProceduralAudioEngine();
