import { sound } from "./audio.js";
import { buildIntroScript, buildNightReturnSequence } from "./story.js";
import { INITIAL_BAG, SANDBOX_ROOMS, getHotspotSequence } from "./sandbox.js";

// ==================== TELEGRAM WEBAPP & HELPERS ====================
const tg = window.Telegram?.WebApp;
const tgUserId = tg?.initDataUnsafe?.user?.id || "local";
const SAVE_KEY = `masha-vn-mvp-v1:${tgUserId}`;

function initTelegramSDK() {
  if (!tg) return;
  try {
    tg.ready();
    tg.expand();
    tg.disableVerticalSwipes?.();
    tg.setHeaderColor?.("#090910");
    tg.setBackgroundColor?.("#090910");
  } catch {}
}

function haptic(kind = "light") {
  try {
    if (!tg?.HapticFeedback) return;
    if (kind === "success" || kind === "warning" || kind === "error") {
      tg.HapticFeedback.notificationOccurred(kind);
    } else {
      tg.HapticFeedback.impactOccurred(kind);
    }
  } catch {}
}

function withViewTransition(mutator, focusEl = null) {
  if (!document.startViewTransition) {
    mutator();
    focusEl?.focus({ preventScroll: true });
    return;
  }
  const vt = document.startViewTransition(() => mutator());
  vt.finished.finally(() => {
    focusEl?.focus({ preventScroll: true });
  });
}

// Safari / WebKit fallback для <dialog closedby="any">
function setupDialogLightDismissFallbacks() {
  if ("closedBy" in HTMLDialogElement.prototype) return;
  const isOutside = (ev, dlg) => {
    const r = dlg.getBoundingClientRect();
    return ev.clientX < r.left || ev.clientX > r.right || ev.clientY < r.top || ev.clientY > r.bottom;
  };
  for (const dlg of document.querySelectorAll('dialog[closedby="any"]')) {
    let downOutside = false;
    dlg.addEventListener("pointerdown", (ev) => {
      downOutside = isOutside(ev, dlg);
    });
    dlg.addEventListener("pointerup", (ev) => {
      if (downOutside && isOutside(ev, dlg)) dlg.close();
      downOutside = false;
    });
  }
}

// ==================== ИГРОВОЕ СОСТОЯНИЕ ====================
function createFreshState(playerName = "Артём") {
  return {
    playerName,
    mode: "vn", // "vn" | "sandbox" | "ended"
    blockId: "start",
    stepIndex: 0,
    currentRoom: "living",
    stars: 0,
    stats: {
      affection: 1,
      trust: 0,
      boldness: 0
    },
    clues: [],
    bag: structuredClone(INITIAL_BAG),
    visitedSpots: [],
    flags: {
      cafeAsked: {},
      pinTries: 0,
      phoneUnlocked: false,
      sawPhotoDate: false,
      stolePanties: false,
      pantiesResolved: false,
      foundMaskCard: false
    },
    log: []
  };
}

let state = createFreshState();
const scriptBlocks = buildIntroScript();

// Очередь временных шагов (для хотспотов песочницы и финальной сцены)
let activeSequence = null;
let activeSeqIndex = 0;
let onSequenceDone = null;

// Эффект печатной машинки
let typingTimer = null;
let fullCurrentText = "";
let isTyping = false;

// ==================== DOM ЭЛЕМЕНТЫ ====================
const el = {
  app: document.getElementById("app"),
  titleScreen: document.getElementById("titleScreen"),
  gameScreen: document.getElementById("gameScreen"),
  endingScreen: document.getElementById("endingScreen"),

  btnNewGame: document.getElementById("btnNewGame"),
  btnContinue: document.getElementById("btnContinue"),
  btnTitleDossier: document.getElementById("btnTitleDossier"),
  btnResetSave: document.getElementById("btnResetSave"),
  titleSoundBtn: document.getElementById("titleSoundBtn"),

  btnHome: document.getElementById("btnHome"),
  btnDossier: document.getElementById("btnDossier"),
  btnBag: document.getElementById("btnBag"),
  btnLog: document.getElementById("btnLog"),
  btnSound: document.getElementById("btnSound"),

  hudStars: document.getElementById("hudStars"),
  hudClues: document.getElementById("hudClues"),
  hudBagCount: document.getElementById("hudBagCount"),
  toastStack: document.getElementById("toastStack"),

  stageViewport: document.getElementById("stageViewport"),
  stageBg: document.getElementById("stageBg"),
  stagePlaceholder: document.getElementById("stagePlaceholder"),
  placeholderName: document.getElementById("placeholderName"),
  placeholderDesc: document.getElementById("placeholderDesc"),
  spriteLayer: document.getElementById("spriteLayer"),
  stageSprite: document.getElementById("stageSprite"),
  propCardOverlay: document.getElementById("propCardOverlay"),
  propCardImg: document.getElementById("propCardImg"),
  hotspotLayer: document.getElementById("hotspotLayer"),
  sandboxBanner: document.getElementById("sandboxBanner"),
  sandboxRoomTitle: document.getElementById("sandboxRoomTitle"),

  vnBottomPanel: document.getElementById("vnBottomPanel"),
  choicePanel: document.getElementById("choicePanel"),
  dialogueBox: document.getElementById("dialogueBox"),
  mcAvatarWrap: document.getElementById("mcAvatarWrap"),
  mcAvatarSprite: document.getElementById("mcAvatarSprite"),
  speakerName: document.getElementById("speakerName"),
  speakerTag: document.getElementById("speakerTag"),
  dialogueText: document.getElementById("dialogueText"),
  tapHint: document.getElementById("tapHint"),
  roomNav: document.getElementById("roomNav"),

  nameDialog: document.getElementById("nameDialog"),
  playerNameInput: document.getElementById("playerNameInput"),
  dossierDialog: document.getElementById("dossierDialog"),
  dossierContent: document.getElementById("dossierContent"),
  bagDialog: document.getElementById("bagDialog"),
  bagList: document.getElementById("bagList"),
  logDialog: document.getElementById("logDialog"),
  logList: document.getElementById("logList"),
  phoneDialog: document.getElementById("phoneDialog"),
  phoneBody: document.getElementById("phoneBody"),
  confirmSleepDialog: document.getElementById("confirmSleepDialog"),
  sleepDesc: document.getElementById("sleepDesc"),

  endingFlavor: document.getElementById("endingFlavor"),
  endingStatsGrid: document.getElementById("endingStatsGrid"),
  btnReplaySandbox: document.getElementById("btnReplaySandbox"),
  btnRestartFull: document.getElementById("btnRestartFull")
};

// ==================== СОХРАНЕНИЯ ====================
function saveState() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    refreshContinueButton();
  } catch {}
}

function loadSavedState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function refreshContinueButton() {
  const saved = loadSavedState();
  el.btnContinue.hidden = !saved;
}

// ==================== API ДЛЯ ЭФФЕКТОВ СЦЕНАРИЯ ====================
const scriptApi = {
  toast(msg, tone = "default") {
    showToast(msg, tone);
  },
  fx(name) {
    sound.fx(name);
  },
  addClue(id, label) {
    if (!state.clues.some((c) => c.id === id)) {
      state.clues.push({ id, label });
      sound.fx("achiev");
      haptic("success");
      showToast(`🔍 Улика (${state.clues.length}/4): ${label}`, "clue");
      updateHUD();
    }
  },
  addItem(item) {
    if (!state.bag.some((b) => b.id === item.id)) {
      state.bag.push(item);
      updateHUD();
    }
  }
};

function showToast(message, tone = "default") {
  const div = document.createElement("div");
  div.className = "toast-item";
  div.dataset.tone = tone;
  div.textContent = message;
  el.toastStack.appendChild(div);
  if (tone !== "clue") sound.fx("notify");
  setTimeout(() => {
    div.remove();
  }, 3200);
}

function updateHUD() {
  const filled = "★".repeat(state.stars);
  const empty = "☆".repeat(Math.max(0, 5 - state.stars));
  el.hudStars.textContent = `${filled}${empty}`;
  el.hudClues.textContent = `🔍 ${state.clues.length}/4`;
  el.hudBagCount.textContent = String(state.bag.length);
}

// ==================== РЕНДЕР КАДРА И ДИАЛОГА ====================
function formatText(str) {
  return (str || "").replaceAll("{mc}", state.playerName);
}

function setStageImage(src, fallbackLabel = "") {
  if (!src) return;
  el.stagePlaceholder.hidden = true;
  if (el.stageBg.getAttribute("src") !== src) {
    el.stageBg.src = src;
  }
  el.stageBg.onerror = () => {
    el.stagePlaceholder.hidden = false;
    el.placeholderName.textContent = fallbackLabel || src;
    el.placeholderDesc.textContent = "Ассет подгружается или временно заменён заглушкой.";
  };
}

function startTypewriter(text) {
  clearInterval(typingTimer);
  fullCurrentText = text;
  el.dialogueText.textContent = "";
  isTyping = true;
  let idx = 0;

  typingTimer = setInterval(() => {
    idx += 2;
    if (idx >= fullCurrentText.length) {
      el.dialogueText.textContent = fullCurrentText;
      isTyping = false;
      clearInterval(typingTimer);
      return;
    }
    el.dialogueText.textContent = fullCurrentText.slice(0, idx);
  }, 16);
}

function finishTypewriterImmediately() {
  if (!isTyping) return false;
  clearInterval(typingTimer);
  el.dialogueText.textContent = fullCurrentText;
  isTyping = false;
  return true;
}

function getCurrentStepList() {
  if (activeSequence) return activeSequence;
  return scriptBlocks[state.blockId] || [];
}

function getCurrentIndex() {
  return activeSequence ? activeSeqIndex : state.stepIndex;
}

function renderStep() {
  const list = getCurrentStepList();
  const idx = getCurrentIndex();
  const step = list[idx];

  if (!step) {
    if (activeSequence) {
      const done = onSequenceDone;
      activeSequence = null;
      activeSeqIndex = 0;
      onSequenceDone = null;
      if (done) done();
      return;
    }
    return;
  }

  // Мгновенные управляющие шаги
  if (step.goto) {
    jumpToBlock(step.goto);
    return;
  }
  if (step.enterSandbox) {
    enterApartmentSandbox();
    return;
  }
  if (step.finishPrologue) {
    showEndingScreen();
    return;
  }

  // Побочный эффект шага
  if (typeof step.effect === "function") {
    step.effect(state, scriptApi);
  }

  // Звук и атмосфера
  if (step.ambience) sound.setAmbience(step.ambience);
  if (step.fx) sound.fx(step.fx);

  if (step.shake) {
    el.stageViewport.classList.remove("fx-shake");
    void el.stageViewport.offsetWidth;
    el.stageViewport.classList.add("fx-shake");
    haptic("medium");
  }

  // Фон и камера
  if (step.bg) setStageImage(step.bg, state.blockId);
  if (step.cam) {
    el.stageBg.dataset.cam = step.cam;
  } else if (step.bg) {
    delete el.stageBg.dataset.cam;
  }

  // Спрайт Маши
  if (step.sprite) {
    el.spriteLayer.hidden = false;
    if (el.stageSprite.getAttribute("src") !== step.sprite) {
      el.stageSprite.src = step.sprite;
    }
  } else if (step.bg && !activeSequence) {
    el.spriteLayer.hidden = true;
  }

  // Оверлей крупной улики
  if (step.prop) {
    el.propCardOverlay.hidden = false;
    el.propCardImg.src = step.prop;
  } else {
    el.propCardOverlay.hidden = true;
  }

  // Выборы (обычные или динамические)
  const choices = typeof step.dynamicChoices === "function" ? step.dynamicChoices(state) : step.choices;
  if (choices && choices.length > 0) {
    renderChoices(choices);
    return;
  }

  // Обычная реплика / мысль
  el.vnBottomPanel.hidden = false;
  el.choicePanel.hidden = true;
  el.dialogueBox.hidden = false;

  const speaker = formatText(step.speaker || "");
  const text = formatText(step.text || "");
  const isThought = !!step.thought;
  const isMasha = step.style === "masha";

  el.dialogueBox.dataset.style = isThought ? "thought" : isMasha ? "masha" : "mc";
  el.speakerName.textContent = speaker;
  el.speakerTag.hidden = !isThought;

  // Всплывающий портрет эмоций ГГ (как в Amnesia / HornyEmpire)
  if (!isMasha && speaker === state.playerName) {
    el.mcAvatarWrap.hidden = false;
    el.mcAvatarSprite.dataset.mood = step.mood || "neutral";
  } else {
    el.mcAvatarWrap.hidden = true;
  }

  // Лог истории
  const lastLog = state.log[state.log.length - 1];
  if (!lastLog || lastLog.text !== text) {
    state.log.push({ speaker, text, thought: isThought });
    if (state.log.length > 60) state.log.shift();
  }

  startTypewriter(text);
  preloadUpcomingAssets(list, idx);
  saveState();
}

function renderChoices(choices) {
  el.vnBottomPanel.hidden = false;
  el.choicePanel.innerHTML = "";
  el.choicePanel.hidden = false;
  el.tapHint.hidden = true;

  for (const ch of choices) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-btn";

    const spanText = document.createElement("span");
    spanText.textContent = formatText(ch.text);
    btn.appendChild(spanText);

    if (ch.badge) {
      const badge = document.createElement("span");
      badge.className = "choice-badge";
      badge.textContent = ch.badge;
      btn.appendChild(badge);
    }

    btn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      sound.fx("tap");
      haptic("light");
      el.tapHint.hidden = false;
      el.choicePanel.hidden = true;

      if (typeof ch.onPick === "function") {
        ch.onPick(state, scriptApi);
      }
      if (ch.next && Array.isArray(ch.next)) {
        activeSequence = ch.next;
        activeSeqIndex = 0;
        renderStep();
        return;
      }
      if (ch.goto) {
        jumpToBlock(ch.goto);
        return;
      }
      advanceStep();
    });

    el.choicePanel.appendChild(btn);
  }
}

function jumpToBlock(blockId) {
  state.blockId = blockId;
  state.stepIndex = 0;
  renderStep();
}

function advanceStep() {
  if (finishTypewriterImmediately()) return;
  if (!el.choicePanel.hidden) return;

  sound.fx("tap");
  if (activeSequence) {
    activeSeqIndex += 1;
    renderStep();
  } else {
    state.stepIndex += 1;
    renderStep();
  }
}

function preloadUpcomingAssets(list, startIdx) {
  for (let i = startIdx + 1; i <= Math.min(list.length - 1, startIdx + 3); i++) {
    const s = list[i];
    if (s?.bg) {
      const img = new Image();
      img.src = s.bg;
    }
    if (s?.sprite) {
      const sp = new Image();
      sp.src = s.sprite;
    }
  }
}

// ==================== РЕЖИМ ПЕСОЧНИЦЫ (КВАРТИРА МАШИ) ====================
function enterApartmentSandbox(roomId = state.currentRoom || "living") {
  state.mode = "sandbox";
  activeSequence = null;
  onSequenceDone = null;

  el.app.dataset.mode = "sandbox";
  el.spriteLayer.hidden = true;
  el.propCardOverlay.hidden = true;
  el.vnBottomPanel.hidden = true;
  el.sandboxBanner.hidden = false;
  el.roomNav.hidden = false;

  sound.setAmbience("penthouse");
  renderSandboxRoom(roomId);
  saveState();
}

function renderSandboxRoom(roomId) {
  const room = SANDBOX_ROOMS[roomId] || SANDBOX_ROOMS.living;
  state.currentRoom = room.id;
  el.sandboxRoomTitle.textContent = room.title;
  delete el.stageBg.dataset.cam;
  setStageImage(room.bg, room.id);

  for (const tab of el.roomNav.querySelectorAll(".room-tab")) {
    tab.classList.toggle("is-active", tab.dataset.room === room.id);
  }

  el.hotspotLayer.innerHTML = "";
  for (const spot of room.hotspots) {
    const pin = document.createElement("button");
    pin.type = "button";
    pin.className = "hotspot-pin";
    if (state.visitedSpots.includes(spot.id)) pin.classList.add("is-visited");
    pin.dataset.kind = spot.kind || "normal";
    pin.style.left = `${spot.x}%`;
    pin.style.top = `${spot.y}%`;
    pin.textContent = spot.label;

    pin.addEventListener("click", (ev) => {
      ev.stopPropagation();
      sound.fx("tap");
      haptic("light");
      triggerHotspot(spot.id);
    });

    el.hotspotLayer.appendChild(pin);
  }
  saveState();
}

function triggerHotspot(spotId) {
  if (!state.visitedSpots.includes(spotId) && spotId !== "guest_sofa") {
    state.visitedSpots.push(spotId);
  }

  const seq = getHotspotSequence(spotId, state);
  if (seq === "OPEN_PHONE_MODAL") {
    openMashaPhoneModal();
    renderSandboxRoom(state.currentRoom);
    return;
  }
  if (seq === "CONFIRM_SLEEP") {
    openSleepConfirmation();
    return;
  }
  if (Array.isArray(seq) && seq.length > 0) {
    el.hotspotLayer.innerHTML = "";
    el.sandboxBanner.hidden = true;
    activeSequence = seq;
    activeSeqIndex = 0;
    onSequenceDone = () => {
      el.propCardOverlay.hidden = true;
      el.vnBottomPanel.hidden = true;
      el.sandboxBanner.hidden = false;
      renderSandboxRoom(state.currentRoom);
    };
    renderStep();
  }
}

function openSleepConfirmation() {
  const unexplored = 4 - state.clues.length;
  el.sleepDesc.textContent =
    unexplored > 0
      ? `Ты нашёл ${state.clues.length} из 4 главных улик в квартире Маши. Хочешь ещё пошариться по комнатам или выключить свет и ждать её возвращения?`
      : "Ты изучил все секреты пентхауса! Пора выключать свет на диване и узнать, какой вернётся Маша после полуночи.";
  el.confirmSleepDialog.returnValue = "";
  el.confirmSleepDialog.showModal();
}

// ==================== МОДАЛКА РАБОЧЕГО IPHONE МАШИ ====================
let currentPinInput = "";
let activePhoneTab = "vip";

function openMashaPhoneModal() {
  currentPinInput = "";
  renderPhoneBody();
  el.phoneDialog.showModal();
}

function renderPhoneBody() {
  if (!state.flags.phoneUnlocked) {
    const dotsHtml = [0, 1, 2, 3]
      .map((i) => `<span class="pin-dot ${i < currentPinInput.length ? "filled" : ""}"></span>`)
      .join("");

    const hintText = state.flags.sawPhotoDate
      ? "💡 Подсказка с детской рамки у кровати: дата на озере <strong>14.08</strong>"
      : state.flags.pinTries >= 2
      ? "💡 Подсказка: осмотри детскую фотографию в рамке на тумбочке в спальне!"
      : "Обои экрана блокировки: вы с Машей в детстве летом на озере.";

    el.phoneBody.innerHTML = `
      <div style="text-align:center; padding: 6px 4px 12px;">
        <div style="font-size: 2rem; margin-bottom: 4px;">🔒</div>
        <div style="font-weight:700; margin-bottom: 4px;">Введите код-пароль (4 цифры)</div>
        <div style="font-size:0.78rem; color: var(--text-muted); line-height:1.35;">${hintText}</div>
        <div class="pin-dots">${dotsHtml}</div>
        <div id="pinErrorMsg" style="min-height:18px; font-size:0.76rem; color: var(--rose); margin-bottom:8px;"></div>
        <div class="pin-grid">
          ${[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "⌫"]
            .map((k) => `<button type="button" class="pin-key" data-key="${k}">${k}</button>`)
            .join("")}
        </div>
      </div>
    `;

    for (const btn of el.phoneBody.querySelectorAll(".pin-key")) {
      btn.addEventListener("click", () => handlePinKey(btn.dataset.key));
    }
    return;
  }

  // Разблокированный рабочий смартфон Маши!
  let tabHtml = "";
  if (activePhoneTab === "vip") {
    tabHtml = `
      <div class="dossier-card" style="border-color: rgba(255,77,126,0.4);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <strong style="color:#ff85a6;">🔞 Приватка «Мария Боратовна»</strong>
          <span style="font-size:0.74rem; color:var(--gold);">18 420 подп.</span>
        </div>
        <p style="margin:0 0 8px; font-size:0.82rem; color:#dedce8;">
          Баланс бота: <strong>482 500 ₽</strong> <em>(холд вывода: 21 день)</em>
        </p>
        <div class="chat-bubble chat-in">
          📸 <strong>Пост #211:</strong> «Ребят, тот самый выпуск из исповедальни уже в закрытой ленте... Плоть слаба 🔥» — <em>4 920 ❤️</em>
        </div>
        <div class="chat-bubble chat-in">
          📸 <strong>Черновик:</strong> «Примерка белого кружева перед закрытым вечером...»
        </div>
        <p style="margin:6px 0 0; font-size:0.78rem; color:var(--cyan); font-style:italic;">
          Мысль ${state.playerName}: «Ни хрена себе "риэлтор по коммерческой недвижимости"... Да полгорода мужиков пускает слюни на мою сводную сестру!»
        </p>
      </div>
    `;
  } else if (activePhoneTab === "lenka") {
    tabHtml = `
      <div class="chat-header-row">
        <img src="./assets/ava_lenka_phone.webp" alt="Ленка" class="chat-ava" width="42" height="42" fetchpriority="low">
        <div>
          <strong style="display:block; font-size:0.9rem;">Ленка 💋 (Лучшая подруга)</strong>
          <span style="font-size:0.74rem; color:#6ee7b7;">в сети</span>
        </div>
      </div>
      <div class="chat-bubble chat-out">
        Ленка, у меня ЧП!! Ко мне реально переехал мой мелкий сводный братик из интерната! Такой скромный котик, краснеет от каждого слова, а у меня игрушка на кровати и вино со вчерашнего папика 😭
      </div>
      <div class="chat-bubble chat-in">
        АХАХАХА стоп, настоящий восемнадцатилетний девственник прямо у тебя в пентхаусе?! Машка, ты в раю! 😈
      </div>
      <div class="chat-bubble chat-out">
        Да ты больная!! Я ему сказала, что я РИЭЛТОР! Даже не вздумай его трогать!
      </div>
      <div class="chat-bubble chat-in">
        Поздно, подруга 💅 Завтра с утра заскочу к вам «на кофе» в самом коротком платье — лично проверю, насколько твой братик стойкий!
      </div>
    `;
  } else {
    tabHtml = `
      <div class="dossier-card" style="border-color: var(--gold-soft);">
        <strong style="color:var(--gold); display:block; margin-bottom:8px;">🎭 Шеф • Закрытый Клуб</strong>
        <div class="chat-bubble chat-in">
          Мария, машина будет у подъезда в 22:00. Сегодня закрытый вечер для старейшин Ордена. Чёрную карту с золотой маской не забудь.
        </div>
        <div class="chat-bubble chat-out">
          Поняла, Шеф, уже выбегаю! В 01:30 отпустите домой? У меня сегодня гость ночует.
        </div>
        <div class="chat-bubble chat-in">
          Отработаешь подачу без капризов — отпустим. И никаких кружочков на кухне.
        </div>
      </div>
    `;
  }

  el.phoneBody.innerHTML = `
    <div class="phone-tabs">
      <button type="button" class="phone-tab-btn ${activePhoneTab === "vip" ? "is-active" : ""}" data-ptab="vip">🔞 Канал</button>
      <button type="button" class="phone-tab-btn ${activePhoneTab === "lenka" ? "is-active" : ""}" data-ptab="lenka">💋 Ленка</button>
      <button type="button" class="phone-tab-btn ${activePhoneTab === "chef" ? "is-active" : ""}" data-ptab="chef">🎭 Шеф</button>
    </div>
    ${tabHtml}
  `;

  for (const b of el.phoneBody.querySelectorAll(".phone-tab-btn")) {
    b.addEventListener("click", () => {
      sound.fx("tap");
      activePhoneTab = b.dataset.ptab;
      renderPhoneBody();
    });
  }
}

function handlePinKey(key) {
  if (key === "C") {
    currentPinInput = "";
    sound.fx("tap");
    renderPhoneBody();
    return;
  }
  if (key === "⌫") {
    currentPinInput = currentPinInput.slice(0, -1);
    sound.fx("tap");
    renderPhoneBody();
    return;
  }
  if (currentPinInput.length >= 4) return;

  sound.fx("key_beep");
  currentPinInput += key;
  renderPhoneBody();

  if (currentPinInput.length === 4) {
    if (currentPinInput === "1408") {
      state.flags.phoneUnlocked = true;
      state.stats.boldness += 1;
      scriptApi.addClue("secret_channel", "Закрытый 18+ канал «Мария Боратовна» и чат с Шефом");
      showToast("🔓 Телефон Маши взломан!", "spicy");
      saveState();
      renderPhoneBody();
    } else {
      state.flags.pinTries = (state.flags.pinTries || 0) + 1;
      sound.fx("error");
      haptic("error");
      currentPinInput = "";
      renderPhoneBody();
      const errEl = document.getElementById("pinErrorMsg");
      if (errEl) errEl.textContent = "Неверный PIN! (Попробуй дату с детского фото: 1408)";
    }
  }
}

// ==================== ДОСЬЕ / РЮКЗАК / ЛОГ / ФИНАЛ ====================
function openDossierModal() {
  const cluesHtml =
    state.clues.length > 0
      ? state.clues.map((c) => `<li>${c.label}</li>`).join("")
      : "<li>Пока не найдено ни одной улики (осмотри квартиру Маши).</li>";

  el.dossierContent.innerHTML = `
    <div class="dossier-card">
      <strong style="color:#ff85a6;">Маша (Мария Боратовна), 22 года</strong>
      <p style="margin:4px 0 8px; font-size:0.82rem; color:var(--text-muted);">
        Твоя сводная сестра (0% кровного родства). Ослепительная блондинка, уверяющая, что работает «риэлтором».
      </p>
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:6px; font-size:0.8rem;">
        <div class="stat-tile"><span>♥ Близость</span><strong>${state.stats.affection}</strong></div>
        <div class="stat-tile"><span>🔥 Разврат</span><strong>${state.stats.boldness}</strong></div>
        <div class="stat-tile"><span>🛡 Доверие</span><strong>${state.stats.trust}</strong></div>
      </div>
    </div>

    <div class="dossier-card">
      <strong style="color:var(--gold);">Система развития по Звёздам (как в Amnesia)</strong>
      <div class="star-roadmap">
        <div class="star-step is-current">★0 • Пролог: Переезд в пентхаус, улики и тайны</div>
        <div class="star-step">★1 • Глава 1: Визит хищницы Ленки и подглядывание в душе</div>
        <div class="star-step">★2 • Глава 2: Партия в Дурака на желание и первые касания</div>
        <div class="star-step">★3 • Глава 3: Ревность Маши и проникновение в Закрытый Клуб</div>
        <div class="star-step">★4–5 • Финал: Выбор ветки (Любовь / Доминация / Гарем с Ленкой)</div>
      </div>
    </div>

    <div class="dossier-card">
      <strong style="color:var(--cyan);">🔍 Собранные улики (${state.clues.length}/4)</strong>
      <ul style="margin:6px 0 0; padding-left:18px; font-size:0.82rem; line-height:1.45;">
        ${cluesHtml}
      </ul>
    </div>
  `;
  el.dossierDialog.showModal();
}

function openBagModal() {
  el.bagList.innerHTML = state.bag
    .map(
      (item) => `
      <div class="bag-item">
        <strong style="display:block; margin-bottom:4px; color:var(--gold);">${item.icon} ${item.title}</strong>
        <span style="font-size:0.82rem; color:#d8d6e8; line-height:1.4;">${item.desc}</span>
      </div>
    `
    )
    .join("");
  el.bagDialog.showModal();
}

function openLogModal() {
  if (state.log.length === 0) {
    el.logList.innerHTML = `<div class="log-item">История реплик пока пуста.</div>`;
  } else {
    el.logList.innerHTML = state.log
      .slice(-25)
      .map(
        (entry) => `
        <div class="log-item">
          <strong style="color:${entry.thought ? "var(--cyan)" : "var(--gold)"}; font-size:0.8rem;">
            ${entry.speaker}${entry.thought ? " (мысли)" : ""}
          </strong>
          <p style="margin:4px 0 0; font-size:0.85rem; line-height:1.4;">${entry.text}</p>
        </div>
      `
      )
      .join("");
  }
  el.logDialog.showModal();
}

function showEndingScreen() {
  state.mode = "ended";
  saveState();
  sound.fx("achiev");
  haptic("success");

  const summaryParts = [];
  if (state.flags.stolePanties) {
    summaryParts.push("Кружевные трусики Маши спрятаны у тебя в кармане — и она уже заметила пропажу!");
  } else {
    summaryParts.push("Ты не спалился на краже белья, сохранив доверие Маши перед завтрашним утром.");
  }
  if (state.flags.phoneUnlocked) {
    summaryParts.push("Ты взломал её рабочий iPhone, узнал про приватку «Мария Боратовна» и утренний визит Ленки.");
  }
  if (state.flags.foundMaskCard) {
    summaryParts.push("Ты связал чёрную карту с золотой маской с исчезновением своего отца 12 лет назад.");
  }

  el.endingFlavor.textContent = summaryParts.join(" ");
  el.endingStatsGrid.innerHTML = `
    <div class="stat-tile"><span>♥ Близость с Машей</span><strong>${state.stats.affection}</strong></div>
    <div class="stat-tile"><span>🔥 Наглость / Разврат</span><strong>${state.stats.boldness}</strong></div>
    <div class="stat-tile"><span>🛡 Доверие / Выдержка</span><strong>${state.stats.trust}</strong></div>
    <div class="stat-tile"><span>🔍 Найдено улик</span><strong>${state.clues.length} / 4</strong></div>
  `;

  withViewTransition(() => {
    el.titleScreen.hidden = true;
    el.gameScreen.hidden = true;
    el.endingScreen.hidden = false;
  }, el.endingScreen);
}

// ==================== НАВИГАЦИЯ ЭКРАНОВ И СОБЫТИЯ ====================
function switchToGameScreen() {
  updateHUD();
  withViewTransition(() => {
    el.titleScreen.hidden = true;
    el.endingScreen.hidden = true;
    el.gameScreen.hidden = false;
  }, el.gameScreen);
}

function syncSoundButtons() {
  const icon = sound.muted ? "🔇" : "🔊";
  el.btnSound.textContent = icon;
  el.titleSoundBtn.textContent = icon;
}

function bindEvents() {
  setupDialogLightDismissFallbacks();

  el.btnNewGame.addEventListener("click", () => {
    sound.fx("tap");
    el.nameDialog.returnValue = "";
    el.nameDialog.showModal();
  });

  el.nameDialog.addEventListener("close", () => {
    const val = el.nameDialog.returnValue;
    el.nameDialog.returnValue = "";
    if (val !== "start") return;

    const cleanName = (el.playerNameInput.value || "").trim() || "Артём";
    state = createFreshState(cleanName);
    activeSequence = null;
    el.app.dataset.mode = "vn";
    el.roomNav.hidden = true;
    el.sandboxBanner.hidden = true;
    el.hotspotLayer.innerHTML = "";
    switchToGameScreen();
    renderStep();
  });

  el.btnContinue.addEventListener("click", () => {
    const saved = loadSavedState();
    if (!saved) return;
    sound.fx("tap");
    state = saved;
    switchToGameScreen();
    if (state.mode === "sandbox") {
      enterApartmentSandbox(state.currentRoom || "living");
    } else if (state.mode === "ended") {
      showEndingScreen();
    } else {
      el.app.dataset.mode = "vn";
      el.roomNav.hidden = true;
      el.sandboxBanner.hidden = true;
      renderStep();
    }
  });

  el.btnResetSave.addEventListener("click", () => {
    localStorage.removeItem(SAVE_KEY);
    refreshContinueButton();
    showToast("Сохранение сброшено");
  });

  el.btnTitleDossier.addEventListener("click", openDossierModal);
  el.btnDossier.addEventListener("click", openDossierModal);
  el.btnBag.addEventListener("click", openBagModal);
  el.btnLog.addEventListener("click", openLogModal);

  el.btnHome.addEventListener("click", () => {
    sound.stopAmbience();
    refreshContinueButton();
    withViewTransition(() => {
      el.gameScreen.hidden = true;
      el.endingScreen.hidden = true;
      el.titleScreen.hidden = false;
    }, el.titleScreen);
  });

  const onToggleSound = () => {
    sound.toggleMute();
    syncSoundButtons();
  };
  el.btnSound.addEventListener("click", onToggleSound);
  el.titleSoundBtn.addEventListener("click", onToggleSound);

  el.dialogueBox.addEventListener("click", advanceStep);
  el.stageViewport.addEventListener("click", () => {
    if (state.mode === "vn" || activeSequence) {
      advanceStep();
    }
  });

  for (const tab of el.roomNav.querySelectorAll(".room-tab")) {
    tab.addEventListener("click", () => {
      if (activeSequence) return;
      sound.fx("tap");
      haptic("light");
      renderSandboxRoom(tab.dataset.room);
    });
  }

  el.confirmSleepDialog.addEventListener("close", () => {
    const choice = el.confirmSleepDialog.returnValue;
    el.confirmSleepDialog.returnValue = "";
    if (choice !== "sleep") return;

    state.mode = "vn";
    el.app.dataset.mode = "vn";
    el.roomNav.hidden = true;
    el.sandboxBanner.hidden = true;
    el.hotspotLayer.innerHTML = "";
    activeSequence = buildNightReturnSequence(state);
    activeSeqIndex = 0;
    onSequenceDone = null;
    renderStep();
  });

  el.btnReplaySandbox.addEventListener("click", () => {
    switchToGameScreen();
    enterApartmentSandbox("living");
  });

  el.btnRestartFull.addEventListener("click", () => {
    localStorage.removeItem(SAVE_KEY);
    state = createFreshState(state.playerName || "Артём");
    activeSequence = null;
    el.app.dataset.mode = "vn";
    el.roomNav.hidden = true;
    el.sandboxBanner.hidden = true;
    el.hotspotLayer.innerHTML = "";
    switchToGameScreen();
    renderStep();
  });
}

initTelegramSDK();
refreshContinueButton();
bindEvents();
