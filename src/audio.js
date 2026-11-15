// Лёгкий процедурный WebAudio-движок для атмосферы и Foley-эффектов (0 КБ внешних файлов)

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.ambienceNodes = [];
    this.currentAmbience = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      this.stopAmbience();
    } else if (this.currentAmbience) {
      const target = this.currentAmbience;
      this.currentAmbience = null;
      this.setAmbience(target);
    }
    return this.muted;
  }

  stopAmbience() {
    for (const node of this.ambienceNodes) {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch {}
    }
    this.ambienceNodes = [];
  }

  setAmbience(type) {
    if (this.currentAmbience === type) return;
    this.stopAmbience();
    this.currentAmbience = type;
    if (this.muted || !type) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    if (type === "trolleybus") {
      // Дождь + мягкий гул вечернего троллейбуса
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(340, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.035, now);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
      this.ambienceNodes.push(noise, filter, gain);
    } else if (type === "cafe" || type === "penthouse") {
      // Тёплый нуарный синт-пад (аккорд Am9 / Fm7)
      const freqs = type === "cafe" ? [220, 261.63, 329.63] : [174.61, 220, 261.63, 329.63];
      for (const f of freqs) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);
        gain.gain.setValueAtTime(0.012, now);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        this.ambienceNodes.push(osc, gain);
      }
    }
  }

  fx(name) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    if (name === "tap") {
      this._tone(520, 0.035, "sine", 0.035);
    } else if (name === "notify") {
      this._tone(660, 0.09, "triangle", 0.08, 0);
      this._tone(880, 0.14, "triangle", 0.08, 0.08);
    } else if (name === "achiev") {
      this._tone(523.25, 0.1, "triangle", 0.09, 0);
      this._tone(659.25, 0.1, "triangle", 0.09, 0.09);
      this._tone(783.99, 0.22, "triangle", 0.1, 0.18);
    } else if (name === "phone_buzz") {
      this._tone(145, 0.14, "sawtooth", 0.045, 0);
      this._tone(145, 0.14, "sawtooth", 0.045, 0.2);
    } else if (name === "brakes") {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(420, t);
      osc.frequency.exponentialRampToValueAtTime(110, t + 0.45);
      g.gain.setValueAtTime(0.04, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
      osc.connect(g);
      g.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.46);
    } else if (name === "door") {
      this._tone(120, 0.08, "square", 0.06, 0);
      this._tone(75, 0.12, "sine", 0.08, 0.06);
    } else if (name === "cloth") {
      this._noiseBurst(0.16, 1200, 0.045);
    } else if (name === "key_beep") {
      this._tone(940, 0.05, "sine", 0.05, 0);
    } else if (name === "error") {
      this._tone(210, 0.12, "sawtooth", 0.06, 0);
      this._tone(165, 0.16, "sawtooth", 0.06, 0.12);
    } else if (name === "heartbeat") {
      this._tone(68, 0.11, "sine", 0.14, 0);
      this._tone(62, 0.14, "sine", 0.11, 0.16);
    }
  }

  _tone(freq, dur, type = "sine", vol = 0.05, delay = 0) {
    const t = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  _noiseBurst(dur, cutoff, vol) {
    const len = Math.floor(this.ctx.sampleRate * dur);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < len; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const flt = this.ctx.createBiquadFilter();
    flt.type = "bandpass";
    flt.frequency.value = cutoff;
    const g = this.ctx.createGain();
    g.gain.value = vol;
    src.connect(flt);
    flt.connect(g);
    g.connect(this.ctx.destination);
    src.start();
  }
}

export const sound = new SoundEngine();
