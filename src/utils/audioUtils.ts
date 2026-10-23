// Web Audio API chimes and Speech Synthesis helper

class AudioFeedbackManager {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
  }

  playSuccess() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.22); // G5

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch {
      // Ignore audio error silently if browser blocks autoplay
    }
  }

  playNotice() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(392.00, now); // G4
      osc.frequency.exponentialRampToValueAtTime(329.63, now + 0.15); // E4

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Audio error ignored
    }
  }
}

export const soundManager = new AudioFeedbackManager();

export class SpeechNarrator {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;
  private static isSpeakingCallback: ((isSpeaking: boolean, text: string) => void) | null = null;

  static registerListener(callback: (isSpeaking: boolean, text: string) => void) {
    this.isSpeakingCallback = callback;
  }

  static speak(text: string, rate: number = 0.95) {
    if (!this.synth) return;
    this.stop();

    // Clean diacritics / markers if needed or keep them for authentic Arabic reading
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Pick best Arabic voice if available
    const voices = this.synth.getVoices();
    const arabicVoice = voices.find(v => v.lang.startsWith('ar')) || null;
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    utterance.onstart = () => {
      if (this.isSpeakingCallback) this.isSpeakingCallback(true, text);
    };

    utterance.onend = () => {
      if (this.isSpeakingCallback) this.isSpeakingCallback(false, '');
      this.currentUtterance = null;
    };

    utterance.onerror = () => {
      if (this.isSpeakingCallback) this.isSpeakingCallback(false, '');
      this.currentUtterance = null;
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  static stop() {
    if (!this.synth) return;
    if (this.synth.speaking || this.synth.pending) {
      this.synth.cancel();
    }
    if (this.isSpeakingCallback) this.isSpeakingCallback(false, '');
    this.currentUtterance = null;
  }

  static isSpeaking(): boolean {
    return !!(this.synth && this.synth.speaking);
  }
}
