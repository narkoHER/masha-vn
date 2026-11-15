// Деликатный процедурный WebAudio-движок атмосферы Москвы и тактильных Foley-эффектов
// По умолчанию при первом запуске строго ВЫКЛЮЧЕН (muted: true) в соответствии с UX TMA.

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = true; // Строгий дефолт: звук выключен до клика пользователя
    this.ambienceNodes = [];
    this.ambienceTimers = [];
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

  setMuted(nextMuted) {
    this.muted = !!nextMuted;
    if (this.muted) {
      this._teardownAmbience();
    } else {
      this.init();
      if (this.currentAmbience) {
        const target = this.currentAmbience;
        this.currentAmbience = null;
        this.setAmbience(target);
      }
    }
    return this.muted;
  }

  toggleMute() {
    return this.setMuted(!this.muted);
  }

  _teardownAmbience() {
    for (const timer of this.ambienceTimers) {
      clearInterval(timer);
    }
    this.ambienceTimers = [];

    for (const node of this.ambienceNodes) {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch {}
    }
    this.ambienceNodes = [];
  }

  stopAmbience() {
    this.currentAmbience = null;
    this._teardownAmbience();
  }

  setAmbience(type) {
    if (this.currentAmbience === type && (this.muted || this.ambienceNodes.length > 0)) {
      return;
    }
    this._teardownAmbience();
    this.currentAmbience = type;
    if (this.muted || !type) return;

    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    if (type === "rain" || type === "trolleybus" || type === "shower") {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Мягкий розовый/коричневый шум дождя и воды без резкого шипения
        data[i] = (lastOut + 0.06 * white) / 1.06;
        lastOut = data[i];
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = type === "shower" ? "bandpass" : "lowpass";
      filter.frequency.setValueAtTime(type === "shower" ? 950 : type === "rain" ? 640 : 420, now);
      if (type === "shower") filter.Q.setValueAtTime(0.7, now);

      const gain = this.ctx.createGain();
      const targetVol = type === "shower" ? 0.055 : type === "rain" ? 0.05 : 0.042;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(targetVol, now + 0.8);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
      this.ambienceNodes.push(noise, filter, gain);

      if (type === "trolleybus") {
        // Низкий гул электропривода троллейбуса
        const hum = this.ctx.createOscillator();
        const humGain = this.ctx.createGain();
        hum.type = "sine";
        hum.frequency.setValueAtTime(78, now);
        humGain.gain.setValueAtTime(0.012, now);
        hum.connect(humGain);
        humGain.connect(this.ctx.destination);
        hum.start();
        this.ambienceNodes.push(hum, humGain);
      }
    } else if (type === "cafe" || type === "penthouse" || type === "morning") {
      // Кинематографичный тёплый аккорд с мягким LFO-фильтром
      const chords = {
        cafe: [196.0, 246.94, 293.66, 369.99],     // Gmaj7 (уютный вечер Малой Бронной)
        penthouse: [146.83, 174.61, 220.0, 261.63], // Dm7 (ночной панорамный Сити)
        morning: [220.0, 277.18, 329.63, 415.3]     // Amaj7 (солнечное утро 32 этажа)
      };
      const freqs = chords[type] || chords.penthouse;
      for (const f of freqs) {
        const osc = this.ctx.createOscillator();
        const flt = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, now);
        flt.type = "lowpass";
        flt.frequency.setValueAtTime(480, now);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.0085, now + 1.1);
        osc.connect(flt);
        flt.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        this.ambienceNodes.push(osc, flt, gain);
      }
    }
  }

  play(name) {
    this.fx(name);
  }

  fx(name) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    switch (name) {
      case "tap":
        this._tone(440, 0.028, "sine", 0.024);
        break;
      case "choice":
        this._tone(520, 0.045, "sine", 0.032, 0);
        this._tone(680, 0.06, "sine", 0.026, 0.035);
        break;
      case "notify":
        this._tone(587.33, 0.08, "sine", 0.045, 0);
        this._tone(880, 0.14, "sine", 0.04, 0.075);
        break;
      case "achiev":
        this._tone(523.25, 0.09, "triangle", 0.05, 0);
        this._tone(659.25, 0.09, "triangle", 0.05, 0.08);
        this._tone(783.99, 0.22, "triangle", 0.055, 0.16);
        break;
      case "phone_buzz":
        this._tone(132, 0.13, "sine", 0.055, 0);
        this._tone(132, 0.13, "sine", 0.055, 0.19);
        break;
      case "phone_ring":
        this._tone(440, 0.28, "sine", 0.035, 0);
        this._tone(480, 0.28, "sine", 0.028, 0);
        break;
      case "intercom":
        this._tone(784, 0.16, "sine", 0.055, 0);
        this._tone(659.25, 0.28, "sine", 0.05, 0.16);
        break;
      case "glass_clink":
        this._tone(1760, 0.16, "sine", 0.04, 0);
        this._tone(2480, 0.11, "sine", 0.025, 0.015);
        break;
      case "lock_beep":
        this._tone(1046.5, 0.06, "sine", 0.035, 0);
        this._tone(1318.5, 0.08, "sine", 0.03, 0.07);
        break;
      case "brakes": {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(360, t);
        osc.frequency.exponentialRampToValueAtTime(95, t + 0.42);
        g.gain.setValueAtTime(0.045, t);
        g.gain.exponentialRampToValueAtTime(0.0008, t + 0.42);
        osc.connect(g);
        g.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.44);
        break;
      }
      case "door":
        this._tone(115, 0.075, "sine", 0.06, 0);
        this._tone(72, 0.12, "sine", 0.07, 0.055);
        break;
      case "cloth":
        this._noiseBurst(0.15, 1100, 0.035);
        break;
      case "key_beep":
        this._tone(880, 0.04, "sine", 0.032, 0);
        break;
      case "error":
        this._tone(220, 0.1, "triangle", 0.05, 0);
        this._tone(175, 0.14, "triangle", 0.05, 0.11);
        break;
      case "heartbeat":
        this._tone(64, 0.11, "sine", 0.11, 0);
        this._tone(58, 0.14, "sine", 0.085, 0.16);
        break;
      default:
        break;
    }
  }

  _tone(freq, dur, type = "sine", vol = 0.04, delay = 0) {
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
    for (let i = 0; i < len; i++) {
      ch[i] = (Math.random() * 2 - 1) * (1 - i / len);
    }
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
