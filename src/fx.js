// Процедурные 60fps Canvas-шейдеры атмосферы Москвы (0 КБ сетевого веса)
// Поддерживаемые режимы:
// 1. "rain_exterior"     — косые нити осеннего дождя, дымка и блики мокрого асфальта (Intro_1, Intro_3)
// 2. "trolleybus_glass"  — конденсат, бегущие капли по стеклу и огни встречного потока (Intro_2)
// 3. "moscow_city_night" — мерцание башен Москва-Сити, красные маячки на шпилях и капли на панораме (Intro_4, Intro_5)
// 4. "shower_steam"      — восходящие клубы тёплого пара и капли на запотевшем стекле душа (Intro_6)
// 5. "morning_sun"       — косые солнечные лучи и золотистые пылинки в воздухе (Intro_6)

export class FxEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext("2d", { alpha: true }) : null;
    this.mode = "none";
    this.width = 360;
    this.height = 640;
    this.dpr = 1;
    this.rafId = 0;
    this.lastTs = 0;
    this.elapsed = 0;
    this.joltTimer = 0;
    this.reducedMotion = false;
    this.paused = false;
    this.particles = {};

    this._onFrame = this._onFrame.bind(this);
    this._onVisibility = this._onVisibility.bind(this);
    this._onMotionPref = this._onMotionPref.bind(this);

    this._initObservers();
  }

  _initObservers() {
    if (!this.canvas || !this.ctx) return;

    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq) {
      this.reducedMotion = mq.matches;
      mq.addEventListener?.("change", this._onMotionPref);
    }

    if (typeof ResizeObserver !== "undefined") {
      this.ro = new ResizeObserver(() => this.resize());
      this.ro.observe(this.canvas);
    } else {
      window.addEventListener("resize", () => this.resize(), { passive: true });
    }

    document.addEventListener("visibilitychange", this._onVisibility);
    this.resize();
  }

  _onMotionPref(e) {
    this.reducedMotion = !!e.matches;
    if (this.reducedMotion || this.paused) {
      this._stopLoop();
      this._renderStaticHint();
    } else if (this.mode !== "none" && !document.hidden) {
      this._startLoop();
    }
  }

  _onVisibility() {
    if (document.hidden) {
      this._stopLoop();
    } else if (this.mode !== "none" && !this.reducedMotion && !this.paused) {
      this.lastTs = performance.now();
      this._startLoop();
    }
  }

  setPaused(flag) {
    this.paused = Boolean(flag);
    if (!this.ctx || this.mode === "none") return;
    if (this.paused || this.reducedMotion) {
      this._stopLoop();
      this._renderStaticHint();
    } else if (!document.hidden) {
      this.lastTs = performance.now();
      this._startLoop();
    }
  }

  resize() {
    if (!this.canvas || !this.ctx) return;
    const rect = this.canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width || 360));
    const h = Math.max(1, Math.round(rect.height || 640));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (w === this.width && h === this.height && dpr === this.dpr) return;
    this.width = w;
    this.height = h;
    this.dpr = dpr;
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (this.mode !== "none") {
      this._seedMode(this.mode);
      if (this.reducedMotion) this._renderStaticHint();
    }
  }

  setMode(nextMode = "none") {
    const normalized = nextMode || "none";
    if (this.mode === normalized) return;
    this.mode = normalized;
    this.joltTimer = 0;

    if (!this.ctx) return;

    if (this.mode === "none") {
      this._stopLoop();
      this.ctx.clearRect(0, 0, this.width, this.height);
      return;
    }

    this._seedMode(this.mode);

    if (this.reducedMotion || this.paused) {
      this._stopLoop();
      this._renderStaticHint();
      return;
    }

    if (!document.hidden) {
      this.lastTs = performance.now();
      this._startLoop();
    }
  }

  // Реакция капель на резкое торможение троллейбуса (Intro_2)
  triggerJolt() {
    this.joltTimer = 0.42;
  }

  _startLoop() {
    if (this.rafId) return;
    this.rafId = requestAnimationFrame(this._onFrame);
  }

  _stopLoop() {
    if (!this.rafId) return;
    cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  }

  _renderStaticHint() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    if (this.mode === "morning_sun") {
      this._drawSunShafts(0);
    } else if (this.mode === "shower_steam") {
      const g = this.ctx.createLinearGradient(0, 0, 0, this.height);
      g.addColorStop(0, "rgba(255, 245, 235, 0.10)");
      g.addColorStop(1, "rgba(255, 245, 235, 0.22)");
      this.ctx.fillStyle = g;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
  }

  _seedMode(mode) {
    const w = this.width;
    const h = this.height;

    if (mode === "rain_exterior") {
      const drops = [];
      for (let i = 0; i < 88; i++) {
        const layer = i < 28 ? 0 : i < 64 ? 1 : 2;
        drops.push({
          x: Math.random() * (w * 1.25) - w * 0.15,
          y: Math.random() * h,
          len: 14 + layer * 10 + Math.random() * 12,
          speed: 360 + layer * 170 + Math.random() * 90,
          drift: -55 - layer * 22,
          alpha: 0.08 + layer * 0.055 + Math.random() * 0.04,
          width: layer === 2 ? 1.25 : 0.85
        });
      }
      const mist = [];
      for (let i = 0; i < 5; i++) {
        mist.push({
          x: Math.random() * w,
          y: h * (0.62 + Math.random() * 0.34),
          r: w * (0.38 + Math.random() * 0.25),
          vx: (i % 2 === 0 ? 1 : -1) * (6 + Math.random() * 6),
          alpha: 0.035 + Math.random() * 0.025
        });
      }
      this.particles = { drops, mist };
    } else if (mode === "trolleybus_glass") {
      const staticBeads = [];
      for (let i = 0; i < 150; i++) {
        staticBeads.push({
          x: w * (0.18 + Math.random() * 0.82),
          y: Math.random() * h,
          r: 0.9 + Math.random() * 1.8,
          alpha: 0.14 + Math.random() * 0.24
        });
      }
      const runners = [];
      for (let i = 0; i < 15; i++) {
        runners.push(this._makeRunner(w, h, true));
      }
      const bokeh = [];
      const tones = [
        "255, 172, 74",
        "255, 68, 96",
        "120, 190, 255",
        "255, 214, 140"
      ];
      for (let i = 0; i < 9; i++) {
        bokeh.push({
          x: Math.random() * w,
          y: h * (0.22 + Math.random() * 0.48),
          rx: 26 + Math.random() * 44,
          ry: 18 + Math.random() * 28,
          vx: -(24 + Math.random() * 46),
          rgb: tones[i % tones.length],
          alpha: 0.06 + Math.random() * 0.08
        });
      }
      this.particles = { staticBeads, runners, bokeh };
    } else if (mode === "moscow_city_night" || mode === "moscow_city_calm") {
      const windows = [];
      const winColors = [
        "110, 198, 255",
        "255, 182, 78",
        "235, 244, 255",
        "152, 212, 255"
      ];
      for (let i = 0; i < 54; i++) {
        windows.push({
          x: w * (0.08 + Math.random() * 0.84),
          y: h * (0.09 + Math.random() * 0.50),
          w: 1.6 + Math.random() * 2.6,
          h: 1.2 + Math.random() * 1.8,
          freq: 0.4 + Math.random() * 1.6,
          phase: Math.random() * Math.PI * 2,
          rgb: winColors[i % winColors.length],
          baseAlpha: 0.16 + Math.random() * 0.28
        });
      }
      const beacons = [
        { x: w * 0.22, y: h * 0.13 },
        { x: w * 0.41, y: h * 0.09 },
        { x: w * 0.46, y: h * 0.11 },
        { x: w * 0.68, y: h * 0.15 },
        { x: w * 0.83, y: h * 0.18 }
      ];
      // Внутри помещений пентхауса дождь на холсте отключён (только огни и шпили башен за окном)
      const glassRain = [];
      this.particles = { windows, beacons, glassRain };
    } else if (mode === "shower_steam") {
      const plumes = [];
      for (let i = 0; i < 14; i++) {
        plumes.push({
          x: w * (0.1 + Math.random() * 0.8),
          y: Math.random() * h,
          r: w * (0.24 + Math.random() * 0.26),
          vy: -(11 + Math.random() * 11),
          swayAmp: 12 + Math.random() * 18,
          swayFreq: 0.35 + Math.random() * 0.45,
          phase: Math.random() * Math.PI * 2,
          alpha: 0.065 + Math.random() * 0.065
        });
      }
      const trickles = [];
      for (let i = 0; i < 9; i++) {
        trickles.push({
          x: w * (0.12 + Math.random() * 0.76),
          y: Math.random() * h,
          vy: 16 + Math.random() * 22,
          r: 1.8 + Math.random() * 1.5,
          trail: 24 + Math.random() * 28,
          alpha: 0.24 + Math.random() * 0.2
        });
      }
      this.particles = { plumes, trickles };
    } else if (mode === "morning_sun") {
      const motes = [];
      for (let i = 0; i < 44; i++) {
        motes.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.88,
          r: 0.9 + Math.random() * 1.9,
          vx: 4 + Math.random() * 8,
          vy: -(3 + Math.random() * 7),
          phase: Math.random() * Math.PI * 2,
          alpha: 0.18 + Math.random() * 0.34
        });
      }
      this.particles = { motes };
    }
  }

  _makeRunner(w, h, randomY = false) {
    return {
      x: w * (0.24 + Math.random() * 0.76),
      y: randomY ? Math.random() * h : -12 - Math.random() * 60,
      vy: 42 + Math.random() * 58,
      r: 2.1 + Math.random() * 1.8,
      trail: [],
      wobble: Math.random() * Math.PI * 2
    };
  }

  _onFrame(ts) {
    if (!this.rafId) return;
    const dt = Math.min(0.05, Math.max(0.001, (ts - (this.lastTs || ts)) / 1000));
    this.lastTs = ts;
    this.elapsed += dt;
    if (this.joltTimer > 0) this.joltTimer = Math.max(0, this.joltTimer - dt);

    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    ctx.clearRect(0, 0, w, h);

    switch (this.mode) {
      case "rain_exterior":
        this._updateRainExterior(ctx, w, h, dt);
        break;
      case "trolleybus_glass":
        this._updateTrolleybusGlass(ctx, w, h, dt);
        break;
      case "moscow_city_night":
      case "moscow_city_calm":
        this._updateMoscowCity(ctx, w, h, dt);
        break;
      case "shower_steam":
        this._updateShowerSteam(ctx, w, h, dt);
        break;
      case "morning_sun":
        this._updateMorningSun(ctx, w, h, dt);
        break;
      default:
        break;
    }

    if (this.rafId) {
      this.rafId = requestAnimationFrame(this._onFrame);
    }
  }

  _updateRainExterior(ctx, w, h, dt) {
    const { drops = [], mist = [] } = this.particles;

    // Мягкая приземная дымка и тёплый отсвет витрин/фонарей внизу
    for (const m of mist) {
      m.x += m.vx * dt;
      if (m.x - m.r > w) m.x = -m.r;
      if (m.x + m.r < 0) m.x = w + m.r;
      const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r);
      g.addColorStop(0, `rgba(182, 202, 226, ${m.alpha})`);
      g.addColorStop(1, "rgba(182, 202, 226, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(m.x - m.r, m.y - m.r, m.r * 2, m.r * 2);
    }

    ctx.lineCap = "round";
    for (const d of drops) {
      d.x += d.drift * dt;
      d.y += d.speed * dt;
      if (d.y > h + 24 || d.x < -40) {
        d.x = Math.random() * (w * 1.25);
        d.y = -24 - Math.random() * 80;
      }
      const dx = (d.drift / d.speed) * d.len;
      ctx.strokeStyle = `rgba(205, 224, 245, ${d.alpha})`;
      ctx.lineWidth = d.width;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x + dx, d.y + d.len);
      ctx.stroke();
    }
  }

  _updateTrolleybusGlass(ctx, w, h, dt) {
    const { staticBeads = [], runners = [], bokeh = [] } = this.particles;

    // 1. Уличные огни за мокрым стеклом
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    for (const b of bokeh) {
      const speedMul = this.joltTimer > 0 ? 0.25 : 1;
      b.x += b.vx * speedMul * dt;
      if (b.x + b.rx < 0) {
        b.x = w + b.rx + Math.random() * 60;
        b.y = h * (0.2 + Math.random() * 0.48);
      }
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.rx);
      g.addColorStop(0, `rgba(${b.rgb}, ${b.alpha})`);
      g.addColorStop(1, `rgba(${b.rgb}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(b.x, b.y, b.rx, b.ry, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 2. Мелкий статичный конденсат
    for (const sb of staticBeads) {
      ctx.fillStyle = `rgba(230, 238, 250, ${sb.alpha})`;
      ctx.beginPath();
      ctx.arc(sb.x, sb.y, sb.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Стекающие ручейки по стеклу (при торможении сносятся вперёд)
    const joltImpulse = this.joltTimer > 0 ? 1.55 : -0.34;
    for (let i = 0; i < runners.length; i++) {
      const r = runners[i];
      r.wobble += dt * 3.4;
      const vx = r.vy * joltImpulse + Math.sin(r.wobble) * 9;
      r.x += vx * dt;
      r.y += r.vy * dt;

      r.trail.push({ x: r.x, y: r.y });
      if (r.trail.length > 14) r.trail.shift();

      if (r.trail.length > 1) {
        ctx.strokeStyle = "rgba(215, 232, 255, 0.16)";
        ctx.lineWidth = r.r * 0.9;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(r.trail[0].x, r.trail[0].y);
        for (let k = 1; k < r.trail.length; k++) {
          ctx.lineTo(r.trail[k].x, r.trail[k].y);
        }
        ctx.stroke();
      }

      ctx.fillStyle = "rgba(235, 244, 255, 0.42)";
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(255, 230, 185, 0.55)";
      ctx.beginPath();
      ctx.arc(r.x - r.r * 0.3, r.y - r.r * 0.3, r.r * 0.38, 0, Math.PI * 2);
      ctx.fill();

      if (r.y > h + 20 || r.x < -20 || r.x > w + 20) {
        runners[i] = this._makeRunner(w, h, false);
      }
    }
  }

  _updateMoscowCity(ctx, w, h, dt) {
    const { windows = [], beacons = [], glassRain = [] } = this.particles;
    const t = this.elapsed;

    ctx.save();
    ctx.globalCompositeOperation = "screen";

    // Мерцание этажей небоскрёбов Сити
    for (const win of windows) {
      const wave = 0.5 + 0.5 * Math.sin(t * win.freq + win.phase);
      const a = win.baseAlpha * (0.35 + 0.65 * wave);
      ctx.fillStyle = `rgba(${win.rgb}, ${a.toFixed(3)})`;
      ctx.fillRect(win.x, win.y, win.w, win.h);
    }

    // Синхронные красные авиационные маячки на шпилях башен (раз в 2.4с)
    const beaconCycle = (t % 2.4) / 2.4;
    const beaconPulse = beaconCycle < 0.28 ? Math.sin((beaconCycle / 0.28) * Math.PI) : 0.12;
    for (const b of beacons) {
      const r = 6.5;
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
      g.addColorStop(0, `rgba(255, 48, 82, ${(0.58 * beaconPulse).toFixed(3)})`);
      g.addColorStop(1, "rgba(255, 48, 82, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Тонкие капли по панорамному стеклу 32-го этажа
    if (glassRain.length > 0) {
      ctx.lineWidth = 0.8;
      for (const gr of glassRain) {
        gr.x -= 28 * dt;
        gr.y += gr.speed * dt;
        if (gr.y > h * 0.82 || gr.x < 0) {
          gr.x = Math.random() * w;
          gr.y = -20 - Math.random() * 40;
        }
        ctx.strokeStyle = `rgba(195, 222, 255, ${gr.alpha})`;
        ctx.beginPath();
        ctx.moveTo(gr.x, gr.y);
        ctx.lineTo(gr.x - 2.2, gr.y + gr.len);
        ctx.stroke();
      }
    }
  }

  _updateShowerSteam(ctx, w, h, dt) {
    const { plumes = [], trickles = [] } = this.particles;
    const t = this.elapsed;

    // Клубы тёплого восходящего пара
    for (const p of plumes) {
      p.y += p.vy * dt;
      const drawX = p.x + Math.sin(t * p.swayFreq + p.phase) * p.swayAmp;
      if (p.y + p.r < -20) {
        p.y = h + p.r * 0.6;
        p.x = w * (0.1 + Math.random() * 0.8);
      }
      const g = ctx.createRadialGradient(drawX, p.y, 0, drawX, p.y, p.r);
      g.addColorStop(0, `rgba(255, 246, 236, ${p.alpha})`);
      g.addColorStop(0.55, `rgba(248, 238, 230, ${(p.alpha * 0.45).toFixed(3)})`);
      g.addColorStop(1, "rgba(255, 246, 236, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(drawX, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Вертикальные капли конденсата на стекле душевой
    for (const tr of trickles) {
      tr.y += tr.vy * dt;
      if (tr.y - tr.trail > h) {
        tr.y = -16 - Math.random() * 50;
        tr.x = w * (0.12 + Math.random() * 0.76);
      }
      const grad = ctx.createLinearGradient(tr.x, tr.y - tr.trail, tr.x, tr.y);
      grad.addColorStop(0, "rgba(255, 255, 255, 0)");
      grad.addColorStop(1, `rgba(255, 252, 246, ${(tr.alpha * 0.55).toFixed(3)})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = tr.r * 0.85;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(tr.x, tr.y - tr.trail);
      ctx.lineTo(tr.x, tr.y);
      ctx.stroke();

      ctx.fillStyle = `rgba(255, 255, 255, ${tr.alpha})`;
      ctx.beginPath();
      ctx.arc(tr.x, tr.y, tr.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  _drawSunShafts(t) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    const pulse = 0.88 + 0.12 * Math.sin(t * 0.5);

    const beam = ctx.createLinearGradient(w * 0.95, 0, w * 0.1, h * 0.85);
    beam.addColorStop(0, `rgba(255, 222, 168, ${(0.18 * pulse).toFixed(3)})`);
    beam.addColorStop(0.55, `rgba(255, 205, 148, ${(0.08 * pulse).toFixed(3)})`);
    beam.addColorStop(1, "rgba(255, 195, 140, 0)");

    ctx.fillStyle = beam;
    ctx.beginPath();
    ctx.moveTo(w * 0.35, 0);
    ctx.lineTo(w, 0);
    ctx.lineTo(w, h * 0.65);
    ctx.lineTo(0, h * 0.92);
    ctx.lineTo(0, h * 0.32);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  _updateMorningSun(ctx, w, h, dt) {
    const { motes = [] } = this.particles;
    const t = this.elapsed;

    this._drawSunShafts(t);

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    for (const m of motes) {
      m.x += (m.vx + Math.sin(t * 0.8 + m.phase) * 4) * dt;
      m.y += m.vy * dt;
      if (m.x > w + 10) m.x = -10;
      if (m.y < -10) {
        m.y = h * 0.85;
        m.x = Math.random() * w;
      }
      const twinkle = 0.55 + 0.45 * Math.sin(t * 1.9 + m.phase);
      ctx.fillStyle = `rgba(255, 232, 178, ${(m.alpha * twinkle).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}
