import { sound } from "./audio.js?v=3.0";
import { FxEngine } from "./fx.js?v=3.0";
import {
  ITEMS_CATALOG,
  CLUES_CATALOG,
  QUEENS_SPREAD_CARDS,
  MASHA_WORK_PHONE_CHATS,
  SANDBOX_ROOMS,
  countExploredSandboxGoals,
  getHotspotSequence,
  buildPostPhoneUnlockSequence
} from "./sandbox.js?v=3.0";
import { ASSET_FALLBACKS, buildPrologueScript } from "./story.js?v=3.0";

// Условная подгрузка полифилла Popover API строго по современному стандарту
let popoverReadyPromise = Promise.resolve();
if (typeof HTMLElement !== "undefined" && !Object.hasOwn(HTMLElement.prototype, "popover")) {
  popoverReadyPromise = import("https://esm.sh/@oddbird/popover-polyfill@0.6.1").catch(() => {});
}

const SAVE_KEY = "masha_vn_v2_save";
const PREFS_KEY = "masha_vn_v2_prefs";
const MASHA_PIN_CODE = "1408";

const SCRIPT = buildPrologueScript();

// Кэш резолвинга иллюстраций (поддержка параллельного рендера ./assets/v2/* -> fallback ./assets/*)
const assetCache = new Map();
let hasV2AvatarSheet = true;
let v2AvatarSheetUrl = "./assets/v2/ava_characters_v2.webp";

// Состояние сессии и UI
let prefs = loadPrefs();
let state = createInitialState("Артём");
let fxEngine = null;

let ephemeralQueue = [];
let activeChoices = null;
let lastSpokenContext = "";

let typingTimer = null;
let isTyping = false;
let fullTargetText = "";

let mcPhoneActiveTab = "scales";
let mcActiveChatId = null;
let mashaActiveChatId = null;
let pinBuffer = "";
let pendingPostPhoneSequence = false;
let resetConfirmArmed = false;

let toastSeq = 0;
const deferredToasts = [];

// ==================== TELEGRAM MINI APP SAFE-AREA & CLOUD SYNC ====================
const tg = window.Telegram?.WebApp || null;

function initTelegramMiniApp() {
  if (!tg) return;
  try {
    tg.ready();
    tg.expand();
    tg.disableVerticalSwipes?.();
    tg.setHeaderColor?.("#08090e");
    tg.setBackgroundColor?.("#08090e");
    syncTelegramSafeAreas();
    tg.onEvent?.("safeAreaChanged", syncTelegramSafeAreas);
    tg.onEvent?.("contentSafeAreaChanged", syncTelegramSafeAreas);
    tg.onEvent?.("viewportChanged", syncTelegramSafeAreas);
  } catch {}
}

function syncTelegramSafeAreas() {
  if (!tg) return;
  const root = document.documentElement;
  const sa = tg.safeAreaInset || {};
  const csa = tg.contentSafeAreaInset || {};
  if (typeof sa.top === "number") root.style.setProperty("--tg-safe-area-inset-top", `${sa.top}px`);
  if (typeof sa.bottom === "number") root.style.setProperty("--tg-safe-area-inset-bottom", `${sa.bottom}px`);
  if (typeof csa.top === "number") root.style.setProperty("--tg-content-safe-area-inset-top", `${csa.top}px`);
  if (typeof csa.bottom === "number") {
    root.style.setProperty("--tg-content-safe-area-inset-bottom", `${csa.bottom}px`);
  }
}

function haptic(type = "light") {
  try {
    if (!tg?.HapticFeedback) return;
    if (type === "success" || type === "warning" || type === "error") {
      tg.HapticFeedback.notificationOccurred(type);
    } else {
      tg.HapticFeedback.impactOccurred(type);
    }
  } catch {}
}

// ==================== НАЧАЛЬНЫЙ GAMESTATE V2 И СОХРАНЕНИЯ ====================
function loadPrefs() {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        // При первом запуске строго muted: true
        muted: typeof parsed.muted === "boolean" ? parsed.muted : true,
        textSpeed: parsed.textSpeed === "instant" ? "instant" : "smooth",
        motionPaused: Boolean(parsed.motionPaused)
      };
    }
  } catch {}
  return { muted: true, textSpeed: "smooth", motionPaused: false };
}

function savePrefs() {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {}
}

function createInitialState(playerName = "Артём") {
  const cleanName = (playerName || "Артём").trim().slice(0, 20) || "Артём";
  return {
    version: 2,
    started: false,
    prologueCompleted: false,
    mode: "story", // "story" | "sandbox" | "epilogue"
    blockId: "Intro_1",
    stepIndex: 0,
    location: "ПРОХОДНАЯ ИНТЕРНАТА • 08:45",
    lastBg: "./assets/v2/bg_orphanage_gates.webp",
    lastCam: "zoom-slow",
    lastFxShader: "rain_exterior",
    lastAmbience: "rain",
    lastSprite: null,
    lastVideo: null,
    lastVideoMode: "loop",
    cardGameActive: false,
    player: {
      name: cleanName,
      alpha: 0,
      vanilla: 0,
      vector: 0
    },
    masha: {
      stars: 0,
      loyalty: 0
    },
    risk: 0,
    relations: {
      katya: 0
    },
    tutorialsSeen: {
      scales: false
    },
    phoneUnread: false,
    items: ["orphanage_referral", "father_watch"],
    clues: [],
    roomProps: {
      living_table_clue: { taken: false },
      kitchen_calla_clue: { taken: false },
      bathroom_lace_dilemma: { taken: false },
      bedroom_swing_photo: { taken: false },
      bedroom_masha_phone: { taken: false }
    },
    sandbox: {
      currentRoom: "living",
      worldTime: "rain_evening"
    },
    flags: {
      katya_warm_start: false,
      intro2_fantasy: null,
      kinship_proven: false,
      cafeTopics: {},
      touched_lace: false,
      saw_lake_photo_date: false,
      masha_phone_unlocked: false,
      masha_chats_read: {},
      intro5_branch: null,
      morning_high_loyalty: false,
      lenka_met: false
    },
    mcChats: {
      katya: {
        id: "katya",
        title: "Катя (Интернат)",
        subtitle: "Учебный корпус • личный контакт",
        messages: [
          {
            dir: "in",
            time: "вчера, 23:14",
            text: "Соколов, только попробуй завтра уехать в город по-английски! У меня для твоих часов кое-что готово."
          }
        ]
      },
      masha: {
        id: "masha",
        title: "Маша (Старый номер)",
        subtitle: "Записан со слов соседки тёти Вали",
        messages: []
      }
    },
    backlog: [],
    toastHistory: []
  };
}

function saveGame() {
  if (!state.started) return;
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(SAVE_KEY, serialized);
    tg?.CloudStorage?.setItem?.(SAVE_KEY, serialized, () => {});
  } catch {}
  refreshTitleButtons();
}

function loadSavedGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.version === 2 && parsed.started) {
      return hydrateState(parsed);
    }
  } catch {}
  return null;
}

function hydrateState(saved) {
  const base = createInitialState(saved?.player?.name || "Артём");
  return {
    ...base,
    ...saved,
    player: { ...base.player, ...(saved.player || {}) },
    masha: { ...base.masha, ...(saved.masha || {}) },
    relations: { ...base.relations, ...(saved.relations || {}) },
    tutorialsSeen: { ...base.tutorialsSeen, ...(saved.tutorialsSeen || {}) },
    roomProps: { ...base.roomProps, ...(saved.roomProps || {}) },
    sandbox: { ...base.sandbox, ...(saved.sandbox || {}) },
    flags: { ...base.flags, ...(saved.flags || {}) },
    mcChats: saved.mcChats || base.mcChats,
    backlog: Array.isArray(saved.backlog) ? saved.backlog.slice(-45) : [],
    toastHistory: Array.isArray(saved.toastHistory) ? saved.toastHistory.slice(-35) : []
  };
}

function clearSavedGame() {
  try {
    localStorage.removeItem(SAVE_KEY);
    tg?.CloudStorage?.removeItem?.(SAVE_KEY, () => {});
  } catch {}
}

// ==================== СКЛОНЕНИЯ ИМЕНИ ГЕРОЯ ====================
function formatText(str) {
  if (!str) return "";
  const name = state.player?.name || "Артём";
  const isCanonical = name.toLowerCase() === "артём" || name.toLowerCase() === "артем";

  const forms = isCanonical
    ? {
        mc: "Артём",
        mc_gen: "Артёма",
        mc_dat: "Артёму",
        mc_acc: "Артёма",
        mc_ins: "Артёмом",
        mc_dim: "Тёма",
        mc_dim_k: "Тёмка",
        mc_acc_short: "Тёму"
      }
    : {
        mc: name,
        mc_gen: name,
        mc_dat: name,
        mc_acc: name,
        mc_ins: name,
        mc_dim: name,
        mc_dim_k: name,
        mc_acc_short: name
      };

  return str.replace(/\{(mc(?:_[a-z_]+)?)\}/g, (_, key) => forms[key] || name);
}

// ==================== УМНАЯ ПОДГРУЗКА V2 АССЕТОВ С FALLBACK ====================
function probeImage(url) {
  return new Promise((resolve) => {
    if (!url) {
      resolve(false);
      return;
    }
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

async function resolveAssetUrl(requestedPath) {
  if (!requestedPath) return null;
  if (assetCache.has(requestedPath)) return assetCache.get(requestedPath);

  const candidates = [];
  let cursor = requestedPath;
  const seen = new Set();
  while (cursor && !seen.has(cursor)) {
    seen.add(cursor);
    candidates.push(cursor);
    if ((cursor.startsWith("./assets/v2/") || cursor.startsWith("./assets/v3/")) && cursor.endsWith(".webp")) {
      candidates.push(cursor.replace(/\.webp$/, ".png"));
    }
    cursor = ASSET_FALLBACKS[cursor] || null;
  }

  for (const candidate of candidates) {
    // eslint-disable-next-line no-await-in-loop
    const ok = await probeImage(candidate);
    if (ok) {
      assetCache.set(requestedPath, candidate);
      return candidate;
    }
  }

  assetCache.set(requestedPath, null);
  return null;
}

async function initOptionalV2Assets() {
  const coverEl = document.getElementById("titleCoverImg");
  if (coverEl) {
    coverEl.addEventListener(
      "error",
      () => {
        coverEl.src = "./assets/title_cover.webp";
      },
      { once: true }
    );
  }

  let foundSheet = false;
  for (const sheetCandidate of [
    "./assets/v2/ava_characters_v2.webp",
    "./assets/v2/ava_characters_v2.png"
  ]) {
    // eslint-disable-next-line no-await-in-loop
    if (await probeImage(sheetCandidate)) {
      hasV2AvatarSheet = true;
      v2AvatarSheetUrl = sheetCandidate;
      foundSheet = true;
      break;
    }
  }
  if (!foundSheet) {
    hasV2AvatarSheet = false;
  }
}

// ==================== DOM ССЫЛКИ ====================
const dom = {
  appRoot: document.getElementById("appRoot"),
  titleScreen: document.getElementById("titleScreen"),
  gameScreen: document.getElementById("gameScreen"),

  titleSoundBtn: document.getElementById("titleSoundBtn"),
  btnContinue: document.getElementById("btnContinue"),
  continueMeta: document.getElementById("continueMeta"),
  btnNewGame: document.getElementById("btnNewGame"),
  btnResetTitle: document.getElementById("btnResetTitle"),

  hudLocationBadge: document.getElementById("hudLocationBadge"),
  btnMcPhone: document.getElementById("btnMcPhone"),
  phoneUnreadDot: document.getElementById("phoneUnreadDot"),
  btnSound: document.getElementById("btnSound"),
  btnMotion: document.getElementById("btnMotion"),
  btnCleanFrame: document.getElementById("btnCleanFrame"),
  btnMenu: document.getElementById("btnMenu"),

  stageViewport: document.getElementById("stageViewport"),
  stageBgBack: document.getElementById("stageBgBack"),
  stageBg: document.getElementById("stageBg"),
  stageVideo: document.getElementById("stageVideo"),
  stagePlaceholder: document.getElementById("stagePlaceholder"),
  stagePlaceholderLabel: document.getElementById("stagePlaceholderLabel"),
  roomPropsLayer: document.getElementById("roomPropsLayer"),
  stageSprite: document.getElementById("stageSprite"),
  fxCanvas: document.getElementById("fxCanvas"),

  propCardOverlay: document.getElementById("propCardOverlay"),
  propCardImg: document.getElementById("propCardImg"),

  incomingMsgOverlay: document.getElementById("incomingMsgOverlay"),
  incomingMsgMeta: document.getElementById("incomingMsgMeta"),
  incomingMsgSender: document.getElementById("incomingMsgSender"),
  incomingMsgBody: document.getElementById("incomingMsgBody"),

  sandboxBanner: document.getElementById("sandboxBanner"),
  sandboxRoomTitle: document.getElementById("sandboxRoomTitle"),
  sandboxTimeSwitch: document.getElementById("sandboxTimeSwitch"),
  sandboxGoalCounter: document.getElementById("sandboxGoalCounter"),
  hotspotLayer: document.getElementById("hotspotLayer"),
  queensSpreadOverlay: document.getElementById("queensSpreadOverlay"),
  queensSpreadKicker: document.getElementById("queensSpreadKicker"),
  queensSpreadTitle: document.getElementById("queensSpreadTitle"),
  queensSpreadHint: document.getElementById("queensSpreadHint"),
  queensCardsBoard: document.getElementById("queensCardsBoard"),
  btnQueensAction: document.getElementById("btnQueensAction"),
  cleanFrameHint: document.getElementById("cleanFrameHint"),

  epilogueBar: document.getElementById("epilogueBar"),
  btnReopenEnding: document.getElementById("btnReopenEnding"),
  btnEpilogueSandbox: document.getElementById("btnEpilogueSandbox"),
  btnEpilogueRestart: document.getElementById("btnEpilogueRestart"),

  vnBottomPanel: document.getElementById("vnBottomPanel"),
  choiceWrap: document.getElementById("choiceWrap"),
  choiceContextQuote: document.getElementById("choiceContextQuote"),
  choicePanel: document.getElementById("choicePanel"),

  dialogueBox: document.getElementById("dialogueBox"),
  speakerRow: document.getElementById("speakerRow"),
  speakerAvatarWrap: document.getElementById("speakerAvatarWrap"),
  speakerAvatarSprite: document.getElementById("speakerAvatarSprite"),
  speakerAvatarFallback: document.getElementById("speakerAvatarFallback"),
  speakerName: document.getElementById("speakerName"),
  speakerRoleTag: document.getElementById("speakerRoleTag"),
  dialogueText: document.getElementById("dialogueText"),

  roomNav: document.getElementById("roomNav"),
  roomTabs: document.getElementById("roomTabs"),
  btnQuickSleep: document.getElementById("btnQuickSleep"),

  // Модальные окна
  nameDialog: document.getElementById("nameDialog"),
  nameForm: document.getElementById("nameForm"),
  playerNameInput: document.getElementById("playerNameInput"),

  scalesTutorialDialog: document.getElementById("scalesTutorialDialog"),

  mcPhoneDialog: document.getElementById("mcPhoneDialog"),
  mcPhoneClock: document.getElementById("mcPhoneClock"),
  mcPhoneBody: document.getElementById("mcPhoneBody"),

  mashaPhoneDialog: document.getElementById("mashaPhoneDialog"),
  mashaLockScreen: document.getElementById("mashaLockScreen"),
  mashaPinDots: document.getElementById("mashaPinDots"),
  mashaPinHint: document.getElementById("mashaPinHint"),
  mashaPinPad: document.getElementById("mashaPinPad"),
  mashaUnlockedScreen: document.getElementById("mashaUnlockedScreen"),
  btnMashaChatBack: document.getElementById("btnMashaChatBack"),
  mashaHeaderTitle: document.getElementById("mashaHeaderTitle"),
  mashaMessengerBody: document.getElementById("mashaMessengerBody"),

  clueDetailDialog: document.getElementById("clueDetailDialog"),
  clueDetailTag: document.getElementById("clueDetailTag"),
  clueDetailTitle: document.getElementById("clueDetailTitle"),
  clueDetailImageWrap: document.getElementById("clueDetailImageWrap"),
  clueDetailImg: document.getElementById("clueDetailImg"),
  clueDetailSummary: document.getElementById("clueDetailSummary"),
  clueDetailNote: document.getElementById("clueDetailNote"),

  confirmSleepDialog: document.getElementById("confirmSleepDialog"),
  confirmSleepSummary: document.getElementById("confirmSleepSummary"),
  btnConfirmSleepNow: document.getElementById("btnConfirmSleepNow"),

  systemMenuDialog: document.getElementById("systemMenuDialog"),
  menuHistoryPane: document.getElementById("menuHistoryPane"),
  menuSettingsPane: document.getElementById("menuSettingsPane"),
  backlogList: document.getElementById("backlogList"),
  btnMenuSoundToggle: document.getElementById("btnMenuSoundToggle"),
  btnTextSpeedToggle: document.getElementById("btnTextSpeedToggle"),
  btnMenuMotionToggle: document.getElementById("btnMenuMotionToggle"),
  btnReturnTitle: document.getElementById("btnReturnTitle"),
  btnResetProgressMenu: document.getElementById("btnResetProgressMenu"),

  endingDialog: document.getElementById("endingDialog"),
  endingSummaryBody: document.getElementById("endingSummaryBody"),
  btnEndingOpenPhone: document.getElementById("btnEndingOpenPhone"),
  btnEndingReplaySandbox: document.getElementById("btnEndingReplaySandbox"),
  btnEndingRestart: document.getElementById("btnEndingRestart"),

  toastRegion: document.getElementById("toastRegion"),
  srAnnouncer: document.getElementById("srAnnouncer")
};

// ==================== TOP-LAYER EXIT FALLBACK + MODAL DIALOG HELPERS ====================
let supportsDisplayTransition;
function canTransitionDisplay() {
  if (supportsDisplayTransition !== undefined) return supportsDisplayTransition;
  if (!window.CSS?.supports?.("transition-behavior", "allow-discrete") || !document.body) {
    return false;
  }
  const probe = document.createElement("div");
  probe.style.cssText = "transition: display 1s allow-discrete !important; display: block;";
  document.body.appendChild(probe);
  getComputedStyle(probe).display;
  probe.style.display = "none";
  supportsDisplayTransition = getComputedStyle(probe).display === "block";
  probe.remove();
  return supportsDisplayTransition;
}

function supportsTopLayerExit() {
  return Boolean(window.CSS?.supports?.("overlay", "auto") && canTransitionDisplay());
}

async function closeTopLayer(element, closeFn) {
  if (!element) return;
  if (!supportsTopLayerExit()) {
    if (element.hasAttribute("data-closing")) return;
    element.setAttribute("data-closing", "");
    const animations = element.getAnimations?.({ subtree: true }) || [];
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map((a) => a.finished)),
        new Promise((r) => setTimeout(r, 2000))
      ]);
    }
    if (!element.hasAttribute("data-closing")) return;
    element.removeAttribute("data-closing");
  }
  closeFn();
}

function isAnyModalDialogOpen() {
  return Boolean(document.querySelector("dialog[open]"));
}

function openModalDialog(dialogEl) {
  if (!dialogEl || dialogEl.open) return;
  dialogEl.removeAttribute("data-closing");
  dialogEl.showModal();
}

function closeModalDialog(dialogEl) {
  if (!dialogEl || !dialogEl.open) return;
  closeTopLayer(dialogEl, () => {
    if (dialogEl.open) dialogEl.close();
  });
}

function setupDialogs() {
  const supportsClosedBy = "closedBy" in HTMLDialogElement.prototype;
  const allDialogs = document.querySelectorAll("dialog.vn-dialog");

  allDialogs.forEach((dialog) => {
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeModalDialog(dialog);
    });

    // Fallback light-dismiss для браузеров без нативной поддержки closedby="any"
    if (!supportsClosedBy && dialog.getAttribute("closedby") === "any") {
      dialog.addEventListener("click", (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (isDialogContent) return;
        closeModalDialog(dialog);
      });
    }

    dialog.addEventListener("close", () => {
      resetConfirmArmed = false;
      if (dom.btnResetProgressMenu) {
        dom.btnResetProgressMenu.textContent = "Сбросить сохранение и начать с нуля";
      }

      if (dialog === dom.mashaPhoneDialog && pendingPostPhoneSequence) {
        pendingPostPhoneSequence = false;
        renderSandboxRoom(state.sandbox.currentRoom);
        startEphemeralSequence(buildPostPhoneUnlockSequence());
      }

      if (!isAnyModalDialogOpen()) {
        setTimeout(flushDeferredToasts, 140);
      }
    });
  });

  document.querySelectorAll("[data-close-dialog]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-close-dialog");
      const targetDialog = document.getElementById(targetId);
      sound.play("tap");
      closeModalDialog(targetDialog);
    });
  });
}

// ==================== POPOVER="MANUAL" TOAST SYSTEM ====================
function announceForScreenReader(text) {
  if (!text) return;
  if (typeof document.ariaNotify === "function") {
    try {
      document.ariaNotify(text, { interrupt: "none" });
      return;
    } catch {}
  }
  if (dom.srAnnouncer) {
    dom.srAnnouncer.textContent = "";
    requestAnimationFrame(() => {
      dom.srAnnouncer.textContent = text;
    });
  }
}

function logToastHistory(message) {
  const timeMatch = (state.location || "").match(/\d{2}:\d{2}/);
  const stamp = timeMatch ? timeMatch[0] : "Сцена";
  state.toastHistory.unshift({ text: message, time: stamp });
  if (state.toastHistory.length > 35) {
    state.toastHistory.length = 35;
  }
}

function enqueueToast(message, tone = "gold") {
  if (!message) return;
  logToastHistory(message);

  // Подавляем показ тостов в фоне, пока открыт модальный <dialog>
  if (isAnyModalDialogOpen()) {
    deferredToasts.push({ message, tone });
    return;
  }

  renderPopoverToast(message, tone);
}

function flushDeferredToasts() {
  if (isAnyModalDialogOpen() || deferredToasts.length === 0) return;
  const batch = deferredToasts.splice(0, deferredToasts.length);
  batch.forEach((item, idx) => {
    setTimeout(() => {
      if (isAnyModalDialogOpen()) {
        deferredToasts.push(item);
      } else {
        renderPopoverToast(item.message, item.tone);
      }
    }, idx * 240);
  });
}

async function renderPopoverToast(message) {
  await popoverReadyPromise;
  if (!dom.toastRegion) return;

  // Ограничиваем одновременно до 3 компактных тостов
  const active = dom.toastRegion.querySelectorAll(".vn-toast");
  if (active.length >= 3) {
    dismissToastElement(active[0]);
  }

  toastSeq += 1;
  const toastId = `vnToastItem_${toastSeq}`;

  const toastEl = document.createElement("div");
  toastEl.id = toastId;
  toastEl.className = "vn-toast";
  // Строго через контент-атрибут, а не IDL .popover
  toastEl.setAttribute("popover", "manual");

  const labelSpan = document.createElement("span");
  labelSpan.className = "vn-toast-label";

  const dotSpan = document.createElement("span");
  dotSpan.className = "vn-toast-dot";
  dotSpan.setAttribute("aria-hidden", "true");

  const textSpan = document.createElement("span");
  textSpan.textContent = message;

  labelSpan.append(dotSpan, textSpan);

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "vn-toast-close";
  closeBtn.setAttribute("aria-label", "Скрыть уведомление");
  closeBtn.setAttribute("popovertarget", toastId);
  closeBtn.setAttribute("popovertargetaction", "hide");
  closeBtn.innerHTML = `
    <svg class="icon-svg-sm" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  `;

  toastEl.append(labelSpan, closeBtn);
  dom.toastRegion.appendChild(toastEl);

  try {
    toastEl.showPopover?.();
  } catch {}

  announceForScreenReader(message);

  let timerId = null;
  const startTimer = () => {
    clearTimeout(timerId);
    timerId = setTimeout(() => dismissToastElement(toastEl), 3800);
  };
  const pauseTimer = () => clearTimeout(timerId);

  toastEl.addEventListener("pointerenter", pauseTimer);
  toastEl.addEventListener("pointerleave", startTimer);
  toastEl.addEventListener("focusin", pauseTimer);
  toastEl.addEventListener("focusout", startTimer);

  toastEl.addEventListener("toggle", (e) => {
    if (e.newState === "closed") {
      clearTimeout(timerId);
      restoreFocusFromToast(toastEl);
      setTimeout(() => toastEl.remove(), 260);
    }
  });

  closeBtn.addEventListener("click", (e) => {
    if (!supportsTopLayerExit()) {
      e.preventDefault();
      dismissToastElement(toastEl);
    }
  });

  startTimer();
}

function restoreFocusFromToast(toastEl) {
  if (!toastEl?.contains(document.activeElement)) return;
  const remainingCloseBtns = Array.from(
    dom.toastRegion?.querySelectorAll(".vn-toast:not([data-closing]) .vn-toast-close") || []
  ).filter((btn) => !toastEl.contains(btn));
  if (remainingCloseBtns.length > 0) {
    remainingCloseBtns[remainingCloseBtns.length - 1].focus({ preventScroll: true });
    return;
  }
  if (!dom.dialogueBox.hidden) {
    dom.dialogueBox.focus({ preventScroll: true });
  } else {
    dom.btnMcPhone.focus({ preventScroll: true });
  }
}

function dismissToastElement(toastEl) {
  if (!toastEl || !toastEl.isConnected || toastEl.hasAttribute("data-closing")) return;
  restoreFocusFromToast(toastEl);
  closeTopLayer(toastEl, () => {
    try {
      if (typeof toastEl.hidePopover === "function") {
        toastEl.hidePopover();
        setTimeout(() => toastEl.remove(), 260);
        return;
      }
    } catch {}
    toastEl.remove();
  });
}

// ==================== SCRIPT API (ДЛЯ STORY.JS И SANDBOX.JS) ====================
function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

function setPhoneUnread(flag) {
  state.phoneUnread = Boolean(flag);
  dom.phoneUnreadDot.hidden = !state.phoneUnread;
}

const scriptApi = {
  addItem(itemId) {
    if (!itemId || !ITEMS_CATALOG[itemId]) return;
    if (!state.items.includes(itemId)) {
      state.items.push(itemId);
      setPhoneUnread(true);
    }
  },

  addClue(clueId, opts = {}) {
    if (!clueId || !CLUES_CATALOG[clueId]) return;
    if (!state.clues.includes(clueId)) {
      state.clues.push(clueId);
      setPhoneUnread(true);
      if (!opts.silent) {
        sound.play("notify");
        enqueueToast(`Зацепка: ${CLUES_CATALOG[clueId].title}`);
      }
    }
  },

  markPropTaken(propKey) {
    if (!propKey) return;
    state.roomProps[propKey] = { taken: true };
    const marker = dom.roomPropsLayer.querySelector(`[data-prop-key="${propKey}"]`);
    if (marker) {
      marker.classList.add("is-taken");
    }
  },

  changeStats(deltas = {}, toastMessages = [], opts = {}) {
    if (typeof deltas.alpha === "number") {
      state.player.alpha = Math.max(0, state.player.alpha + deltas.alpha);
    }
    if (typeof deltas.vanilla === "number") {
      state.player.vanilla = Math.max(0, state.player.vanilla + deltas.vanilla);
    }
    state.player.vector = clamp(state.player.alpha - state.player.vanilla, -10, 10);

    if (typeof deltas.loyalty === "number") {
      state.masha.loyalty = clamp(state.masha.loyalty + deltas.loyalty, -5, 12);
    }
    if (typeof deltas.risk === "number") {
      state.risk = clamp(state.risk + deltas.risk, 0, 15);
    }
    if (typeof deltas.katya === "number") {
      state.relations.katya = clamp(state.relations.katya + deltas.katya, 0, 10);
    }

    setPhoneUnread(true);

    // 15-секундный онбординг при первом изменении статов в Intro_1
    if (!state.tutorialsSeen.scales || (opts.triggerOnboarding && !state.tutorialsSeen.scales)) {
      state.tutorialsSeen.scales = true;
      openModalDialog(dom.scalesTutorialDialog);
    }

    toastMessages.forEach((msg) => enqueueToast(msg));
  },

  toast(message, tone = "gold") {
    enqueueToast(message, tone);
  },

  fx(sfxName) {
    if (sfxName) sound.play(sfxName);
  },

  pushMcMessage(contactId, messageObj) {
    if (!state.mcChats[contactId]) return;
    state.mcChats[contactId].messages.push(messageObj);
    setPhoneUnread(true);
  }
};

// ==================== ЗВУК И КНОПКИ АУДИО (DEFAULT MUTED: TRUE) ====================
function syncSoundUi() {
  const isUnmuted = !sound.muted;
  const pressedVal = isUnmuted ? "true" : "false";
  const label = isUnmuted ? "Выключить звук" : "Включить звук";

  [dom.titleSoundBtn, dom.btnSound].forEach((btn) => {
    if (!btn) return;
    btn.setAttribute("aria-pressed", pressedVal);
    btn.setAttribute("aria-label", label);
  });

  if (dom.btnMenuSoundToggle) {
    dom.btnMenuSoundToggle.textContent = isUnmuted ? "Включён" : "Выключен";
  }
}

function toggleGlobalSound() {
  const nowMuted = sound.toggleMute();
  prefs.muted = nowMuted;
  savePrefs();
  syncSoundUi();

  if (!nowMuted) {
    sound.play("tap");
    if (dom.gameScreen.classList.contains("active") && state.lastAmbience) {
      sound.setAmbience(state.lastAmbience);
    }
  }
  haptic("light");
}

// ==================== УПРАВЛЕНИЕ АНИМАЦИЕЙ СЦЕН И РЕЖИМОМ «ЧИСТЫЙ КАДР» ====================
function isMotionDisabled() {
  return Boolean(
    prefs.motionPaused || window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
  );
}

function syncMotionUi() {
  const paused = Boolean(prefs.motionPaused);
  dom.appRoot.classList.toggle("motion-paused", paused);

  if (dom.btnMotion) {
    // По спецификации доступности: меняем aria-label между Pause/Play без aria-pressed
    dom.btnMotion.dataset.motionPaused = paused ? "true" : "false";
    dom.btnMotion.setAttribute(
      "aria-label",
      paused ? "Возобновить анимацию кадра" : "Приостановить анимацию кадра"
    );
  }

  if (dom.btnMenuMotionToggle) {
    dom.btnMenuMotionToggle.textContent = paused ? "На паузе" : "Активна";
  }

  fxEngine?.setPaused(paused);
  syncStageVideoPlayback();
}

function toggleMotionPaused() {
  prefs.motionPaused = !prefs.motionPaused;
  savePrefs();
  sound.play("tap");
  haptic("light");
  syncMotionUi();
}

function setCleanFrame(active) {
  dom.appRoot.classList.toggle("clean-frame", active);
  dom.btnCleanFrame.setAttribute("aria-pressed", active ? "true" : "false");
  dom.cleanFrameHint.hidden = !active;
}

// ==================== ВИЗУАЛЬНАЯ СЦЕНА (ФОН, ВИДЕО KLING 2.5, КАМЕРА, СПРАЙТ) ====================
let currentDisplayedBgUrl = "";
let currentDisplayedVideoUrl = "";

function stopStageVideoDom() {
  if (!dom.stageVideo) return;
  try {
    dom.stageVideo.pause();
  } catch {}
  dom.stageVideo.classList.remove("is-ready");
  dom.stageVideo.hidden = true;
  dom.stageVideo.removeAttribute("src");
  currentDisplayedVideoUrl = "";
}

function syncStageVideoPlayback() {
  if (!dom.stageVideo) return;
  const activeVideo = state.lastVideo;
  if (!activeVideo || !dom.gameScreen.classList.contains("active") || state.mode !== "story") {
    stopStageVideoDom();
    return;
  }

  if (isMotionDisabled()) {
    try {
      dom.stageVideo.pause();
    } catch {}
    dom.stageVideo.classList.remove("is-ready");
    dom.stageVideo.hidden = true;
    return;
  }

  const posterUrl = currentDisplayedBgUrl || state.lastBg;
  if (posterUrl) {
    dom.stageVideo.poster = posterUrl;
  }

  const isNewVideo = currentDisplayedVideoUrl !== activeVideo;
  if (isNewVideo) {
    dom.stageVideo.classList.remove("is-ready");
    dom.stageVideo.src = activeVideo;
    currentDisplayedVideoUrl = activeVideo;
  }

  const isOnce = state.lastVideoMode === "once";
  dom.stageVideo.loop = !isOnce;
  dom.stageVideo.muted = true;
  dom.stageVideo.defaultMuted = true;
  dom.stageVideo.hidden = false;
  const markReady = () => {
    if (!isMotionDisabled() && currentDisplayedVideoUrl === activeVideo) {
      dom.stageVideo.classList.add("is-ready");
    }
  };
  if (dom.stageVideo.readyState >= 2) {
    markReady();
  } else {
    dom.stageVideo.addEventListener("loadeddata", markReady, { once: true });
  }
  // Для one-shot сцен (объятия, переворот телефона и т.д.) не перезапускаем с нуля, если ролик уже застыл на финальном кадре
  if (!isOnce || isNewVideo || !dom.stageVideo.ended) {
    dom.stageVideo.play?.().catch(() => {});
  }
}

function applyStageVideo(videoPath, videoMode = "loop") {
  state.lastVideo = videoPath || null;
  state.lastVideoMode = videoMode || "loop";
  syncStageVideoPlayback();
}

async function applyStageBackground(bgPath, camMode = "none") {
  if (!bgPath) return;
  state.lastBg = bgPath;
  state.lastCam = camMode || "none";

  const resolved = await resolveAssetUrl(bgPath);
  if (!resolved) {
    dom.stagePlaceholder.hidden = false;
    dom.stagePlaceholderLabel.textContent = state.location || "Москва";
    return;
  }

  dom.stagePlaceholder.hidden = true;

  const camClasses = ["cam-zoom-slow", "cam-pan-up-reveal", "cam-sepia", "cam-dim"];
  const nextCamClass =
    camMode === "zoom-slow"
      ? "cam-zoom-slow"
      : camMode === "pan-up-reveal"
        ? "cam-pan-up-reveal"
        : camMode === "sepia"
          ? "cam-sepia"
          : camMode === "dim"
            ? "cam-dim"
            : "";

  if (currentDisplayedBgUrl && currentDisplayedBgUrl !== resolved) {
    dom.stageBgBack.src = currentDisplayedBgUrl;
    dom.stageBg.classList.add("is-fading-in");
    dom.stageBg.src = resolved;

    requestAnimationFrame(() => {
      dom.stageBg.classList.remove(...camClasses);
      if (nextCamClass) dom.stageBg.classList.add(nextCamClass);
      requestAnimationFrame(() => {
        dom.stageBg.classList.remove("is-fading-in");
      });
    });
  } else {
    dom.stageBg.src = resolved;
    dom.stageBgBack.src = resolved;
    dom.stageBg.classList.remove(...camClasses);
    if (nextCamClass) dom.stageBg.classList.add(nextCamClass);
  }

  currentDisplayedBgUrl = resolved;
}

async function applyStageSprite(spritePath) {
  state.lastSprite = spritePath;
  if (!spritePath) {
    dom.stageSprite.hidden = true;
    dom.stageSprite.removeAttribute("src");
    return;
  }
  const resolved = await resolveAssetUrl(spritePath);
  if (!resolved) {
    dom.stageSprite.hidden = true;
    return;
  }
  dom.stageSprite.src = resolved;
  dom.stageSprite.hidden = false;
}

async function applyPropOverlay(propPath) {
  if (!propPath) {
    dom.propCardOverlay.hidden = true;
    return;
  }
  const resolved = await resolveAssetUrl(propPath);
  if (!resolved) {
    dom.propCardOverlay.hidden = true;
    return;
  }
  dom.propCardImg.src = resolved;
  dom.propCardOverlay.hidden = false;
}

function applyIncomingCard(cardData) {
  if (!cardData) {
    dom.incomingMsgOverlay.hidden = true;
    return;
  }
  dom.incomingMsgSender.textContent = formatText(cardData.sender || "");
  dom.incomingMsgMeta.textContent = formatText(cardData.meta || "");
  dom.incomingMsgBody.textContent = formatText(cardData.text || "");
  dom.incomingMsgOverlay.hidden = false;
}

function applyPortraitAvatar(role, mood) {
  // По GDD портрет Маши и рассказчика не дублируется в диалоговом окне
  if (!mood || role === "narrator" || role === "masha" || role === "komendant") {
    dom.speakerAvatarWrap.hidden = true;
    return;
  }

  dom.speakerAvatarWrap.hidden = false;
  const spriteEl = dom.speakerAvatarSprite;
  const monoEl = dom.speakerAvatarFallback;

  if (hasV2AvatarSheet) {
    monoEl.hidden = true;
    spriteEl.hidden = false;
    spriteEl.style.backgroundImage = `url("${v2AvatarSheetUrl}")`;
    spriteEl.style.backgroundSize = "200% 200%";
    const posMap = {
      calm: "0% 0%",
      shy: "100% 0%",
      katya: "0% 100%",
      lenka: "100% 100%"
    };
    spriteEl.style.backgroundPosition = posMap[mood] || "0% 0%";
    return;
  }

  // Fallback до завершения рендера ava_characters_v2
  if (mood === "calm" || mood === "shy") {
    monoEl.hidden = true;
    spriteEl.hidden = false;
    spriteEl.style.backgroundImage = 'url("./assets/ava_mc_sheet.webp")';
    spriteEl.style.backgroundSize = "200% 200%";
    spriteEl.style.backgroundPosition = mood === "shy" ? "0% 100%" : "0% 0%";
  } else if (mood === "lenka") {
    monoEl.hidden = true;
    spriteEl.hidden = false;
    spriteEl.style.backgroundImage = 'url("./assets/ava_lenka_phone.webp")';
    spriteEl.style.backgroundSize = "cover";
    spriteEl.style.backgroundPosition = "center 18%";
  } else {
    // Для Кати без v2-листа выводим изящную монограмму, чтобы не показывать лицо ГГ
    spriteEl.hidden = true;
    monoEl.hidden = false;
    monoEl.textContent = "К";
  }
}

// ==================== ПЕЧАТЬ ТЕКСТА И БЭКЛОГ ====================
function stopTyping(completeImmediately = false) {
  if (typingTimer) {
    clearInterval(typingTimer);
    typingTimer = null;
  }
  if (completeImmediately && isTyping) {
    dom.dialogueText.textContent = fullTargetText;
  }
  isTyping = false;
}

function renderDialogueLine(step) {
  const role = step.role || "narrator";
  const speakerText = step.speaker ? formatText(step.speaker) : "";
  const bodyText = formatText(step.text || "");

  lastSpokenContext = speakerText ? `${speakerText}: «${bodyText}»` : bodyText;

  dom.dialogueBox.dataset.role = role;
  dom.speakerName.textContent = speakerText;
  dom.speakerRoleTag.hidden = role !== "mct";
  dom.speakerRow.hidden = !speakerText && role === "narrator";

  applyPortraitAvatar(role, step.portraitMood);

  // Сохраняем реплику в историю (без дублирования подряд при перезагрузке)
  const lastEntry = state.backlog[state.backlog.length - 1];
  if (bodyText && (!lastEntry || lastEntry.text !== bodyText)) {
    state.backlog.push({
      speaker: speakerText || (role === "mct" ? `${formatText("{mc}")} (мысли)` : "Повествование"),
      text: bodyText
    });
    if (state.backlog.length > 45) state.backlog.shift();
  }

  dom.choiceWrap.hidden = true;
  dom.dialogueBox.hidden = false;
  dom.vnBottomPanel.hidden = false;

  stopTyping(false);
  fullTargetText = bodyText;

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefs.textSpeed === "instant" || reduceMotion || bodyText.length === 0) {
    dom.dialogueText.textContent = bodyText;
    isTyping = false;
    return;
  }

  isTyping = true;
  dom.dialogueText.textContent = "";
  let cursor = 0;
  const stepChars = bodyText.length > 180 ? 3 : 2;

  typingTimer = setInterval(() => {
    cursor += stepChars;
    if (cursor >= bodyText.length) {
      dom.dialogueText.textContent = bodyText;
      stopTyping(false);
    } else {
      dom.dialogueText.textContent = bodyText.slice(0, cursor);
    }
  }, 16);
}

// ==================== ВЫВОД КНОПОК ВЫБОРА (СТРОГО БЕЗ СПОЙЛЕРОВ СТАТОВ) ====================
function renderChoicePanel(choices) {
  activeChoices = choices;
  stopTyping(true);

  dom.choicePanel.innerHTML = "";
  if (lastSpokenContext) {
    dom.choiceContextQuote.textContent = lastSpokenContext;
    dom.choiceContextQuote.hidden = false;
  } else {
    dom.choiceContextQuote.hidden = true;
  }

  choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-btn";
    btn.textContent = formatText(choice.text);
    btn.addEventListener("click", () => handleChoicePick(choice));
    dom.choicePanel.appendChild(btn);
  });

  dom.dialogueBox.hidden = true;
  dom.choiceWrap.hidden = false;
  dom.vnBottomPanel.hidden = false;
}

function handleChoicePick(choice) {
  if (!choice) return;
  activeChoices = null;
  dom.choiceWrap.hidden = true;

  sound.play("choice");
  haptic("light");

  if (typeof choice.onPick === "function") {
    choice.onPick(state, scriptApi);
  }

  if (Array.isArray(choice.next) && choice.next.length > 0) {
    ephemeralQueue.unshift(...choice.next);
    advanceEphemeralStep();
    saveGame();
    return;
  }

  if (choice.goto) {
    jumpToStoryBlock(choice.goto);
    return;
  }

  if (ephemeralQueue.length > 0) {
    advanceEphemeralStep();
  } else {
    state.stepIndex += 1;
    runCurrentStoryStep();
  }
}

// ==================== ИСПОЛНЕНИЕ ШАГОВ СЦЕНАРИЯ ====================
function applyStepPresentation(step) {
  if (step.location) {
    state.location = step.location;
    dom.hudLocationBadge.textContent = step.location;
  }

  if (step.bg) {
    applyStageBackground(step.bg, step.cam || "none");
  }

  if (Object.prototype.hasOwnProperty.call(step, "video")) {
    applyStageVideo(step.video, step.videoMode || "loop");
  } else if (step.bg) {
    applyStageVideo(null, "loop");
  }

  if (Object.prototype.hasOwnProperty.call(step, "sprite")) {
    applyStageSprite(step.sprite);
  }

  if (Object.prototype.hasOwnProperty.call(step, "prop")) {
    applyPropOverlay(step.prop);
  } else {
    applyPropOverlay(null);
  }

  if (Object.prototype.hasOwnProperty.call(step, "incomingCard")) {
    applyIncomingCard(step.incomingCard);
  }

  if (step.fxShader) {
    state.lastFxShader = step.fxShader;
    fxEngine?.setMode(step.fxShader);
  }

  if (step.ambience) {
    state.lastAmbience = step.ambience;
    sound.setAmbience(step.ambience);
  }

  if (step.fx) {
    sound.play(step.fx);
  }

  if (step.joltGlass) {
    fxEngine?.triggerJolt();
  }

  if (step.shake) {
    dom.stageViewport.classList.remove("fx-shake");
    void dom.stageViewport.offsetWidth;
    dom.stageViewport.classList.add("fx-shake");
    haptic("medium");
  }

  if (typeof step.effect === "function") {
    step.effect(state, scriptApi);
  }
}

function jumpToStoryBlock(blockId) {
  if (!SCRIPT[blockId]) return;
  state.mode = "story";
  state.blockId = blockId;
  state.stepIndex = 0;
  runCurrentStoryStep();
}

function runCurrentStoryStep() {
  const block = SCRIPT[state.blockId];
  if (!block || state.stepIndex >= block.length) {
    return;
  }

  const step = block[state.stepIndex];

  if (step.goto) {
    jumpToStoryBlock(step.goto);
    return;
  }

  if (typeof step.branchByState === "function") {
    const targetBlock = step.branchByState(state);
    jumpToStoryBlock(targetBlock);
    return;
  }

  if (step.enterSandbox) {
    enterPenthouseSandbox("living");
    return;
  }

  if (step.startQueensCardGame) {
    launchQueensCardGame();
    return;
  }

  if (step.finishPrologue) {
    completePrologueFinale();
    return;
  }

  state.cardGameActive = false;
  if (dom.queensSpreadOverlay) dom.queensSpreadOverlay.hidden = true;
  dom.roomNav.hidden = true;
  dom.hotspotLayer.hidden = true;
  dom.sandboxBanner.hidden = true;
  dom.roomPropsLayer.hidden = true;
  dom.epilogueBar.hidden = true;
  dom.gameScreen.classList.remove("is-inspecting-spot");

  applyStepPresentation(step);

  if (step.choices || typeof step.dynamicChoices === "function") {
    const resolvedChoices =
      typeof step.dynamicChoices === "function" ? step.dynamicChoices(state) : step.choices;
    renderChoicePanel(resolvedChoices || []);
    saveGame();
    return;
  }

  renderDialogueLine(step);
  saveGame();
}

function startEphemeralSequence(steps) {
  if (!Array.isArray(steps) || steps.length === 0) return;
  ephemeralQueue = [...steps];
  dom.gameScreen.classList.add("is-inspecting-spot");
  advanceEphemeralStep();
}

function advanceEphemeralStep() {
  if (ephemeralQueue.length === 0) {
    applyPropOverlay(null);
    dom.gameScreen.classList.remove("is-inspecting-spot");
    if (state.mode === "sandbox") {
      dom.vnBottomPanel.hidden = true;
      renderSandboxRoom(state.sandbox.currentRoom);
    }
    saveGame();
    return;
  }

  const step = ephemeralQueue.shift();
  applyStepPresentation(step);

  if (step.choices) {
    renderChoicePanel(step.choices);
    return;
  }

  renderDialogueLine(step);
}

function handleAdvanceAction() {
  if (dom.appRoot.classList.contains("clean-frame")) {
    setCleanFrame(false);
    return;
  }

  if (activeChoices || state.cardGameActive) return;

  if (isTyping) {
    stopTyping(true);
    return;
  }

  if (state.mode === "epilogue") return;

  if (ephemeralQueue.length > 0 || dom.gameScreen.classList.contains("is-inspecting-spot")) {
    sound.play("tap");
    advanceEphemeralStep();
    return;
  }

  if (state.mode === "story") {
    sound.play("tap");
    state.stepIndex += 1;
    runCurrentStoryStep();
  }
}

// ==================== ПЕСОЧНИЦА INTRO_4 (4 КОМНАТЫ + ИСЧЕЗАЮЩИЕ ПРЕДМЕТЫ) ====================
function enterPenthouseSandbox(roomId = "living") {
  state.mode = "sandbox";
  state.sandbox.currentRoom = SANDBOX_ROOMS[roomId] ? roomId : "living";
  ephemeralQueue = [];
  activeChoices = null;

  applyStageVideo(null);
  applyStageSprite(null);
  applyPropOverlay(null);
  applyIncomingCard(null);

  dom.epilogueBar.hidden = true;
  dom.vnBottomPanel.hidden = true;
  dom.roomNav.hidden = false;
  dom.hotspotLayer.hidden = false;
  dom.sandboxBanner.hidden = false;
  dom.roomPropsLayer.hidden = false;
  dom.gameScreen.classList.remove("is-inspecting-spot");

  sound.setAmbience("penthouse");
  state.lastAmbience = "penthouse";

  renderSandboxRoom(state.sandbox.currentRoom);
  saveGame();
}

function isRoomFullyExplored(roomId) {
  const rp = state.roomProps || {};
  if (roomId === "living") return Boolean(rp.living_table_clue?.taken);
  if (roomId === "kitchen") return Boolean(rp.kitchen_calla_clue?.taken);
  if (roomId === "bathroom") return Boolean(rp.bathroom_lace_dilemma?.taken);
  if (roomId === "bedroom") {
    return Boolean(rp.bedroom_swing_photo?.taken && state.flags.masha_phone_unlocked);
  }
  return false;
}

function getHotspotSvg(iconName) {
  switch (iconName) {
    case "moon":
      return '<path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />';
    case "sparkle":
      return '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />';
    case "eye":
      return '<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" /><circle cx="12" cy="12" r="2.6" />';
    case "phone":
      return '<rect x="6" y="2.5" width="12" height="19" rx="2.5" /><path d="M10 5.5h4" />';
    default:
      return '<circle cx="11" cy="11" r="6.8" /><path d="M20 20l-4.2-4.2" />';
  }
}

// ==================== ИНТЕРАКТИВНОЕ ГАДАНИЕ «РАСКЛАД НА 4 КОРОЛЕВ» ====================
function runScopedBoardTransition(updateFn) {
  const boardEl = dom.queensCardsBoard;
  if (
    boardEl &&
    !isMotionDisabled() &&
    typeof Element !== "undefined" &&
    "startViewTransition" in Element.prototype
  ) {
    const vt = boardEl.startViewTransition(() => {
      updateFn();
    });
    vt.ready?.catch?.(() => {});
    return;
  }
  updateFn();
}

function renderCardFaceContent(btn, card, faceUp) {
  btn.classList.toggle("is-faceup", faceUp);
  btn.classList.toggle("is-facedown", !faceUp);
  btn.classList.toggle("suit-red", faceUp && card.suitColor === "red");
  btn.classList.toggle("suit-dark", faceUp && card.suitColor !== "red");
  if (!faceUp) {
    btn.setAttribute("aria-label", `Закрытая карта расклада`);
    btn.innerHTML = `<span class="card-back-crest" aria-hidden="true">♛</span>`;
  } else {
    btn.setAttribute("aria-label", `${card.title} — ${card.archetype}`);
    btn.innerHTML = `
      <span class="card-corner" aria-hidden="true">${card.rank}<br>${card.suit}</span>
      <span class="card-queen-emblem" aria-hidden="true">
        <span class="card-queen-crown">${card.suit}</span>
        <span class="card-queen-label">${card.title.replace("Дама ", "")}</span>
      </span>
      <span class="card-corner bottom" aria-hidden="true">${card.rank}<br>${card.suit}</span>
    `;
  }
}

function launchQueensCardGame() {
  state.cardGameActive = true;
  dom.vnBottomPanel.hidden = false;
  dom.choiceWrap.hidden = true;
  dom.queensSpreadOverlay.hidden = false;
  dom.btnQueensAction.hidden = true;

  const cardButtons = new Map();
  const revealedIds = new Set();
  let phase = "cut"; // "cut" | "spread" | "wager"
  let wagerResolved = false;

  dom.queensSpreadKicker.textContent = "НОЧНОЕ ГАДАНИЕ • 01:46";
  dom.queensSpreadTitle.textContent = "Расклад на Четырёх Королев";
  dom.queensSpreadHint.textContent = "Сдвиньте колоду левой рукой к сердцу";
  dom.queensCardsBoard.className = "queens-cards-board mode-cut";
  dom.queensCardsBoard.innerHTML = "";

  const deckBtn = document.createElement("button");
  deckBtn.type = "button";
  deckBtn.className = "playing-card-btn is-facedown";
  deckBtn.setAttribute("aria-label", "Сдвинуть колоду левой рукой к себе");
  deckBtn.innerHTML = `<span class="card-back-crest" aria-hidden="true">♛</span>`;

  renderDialogueLine({
    role: "masha",
    speaker: "Маша",
    text: "Колода перетасована. Коснись верхней пачки — сними левой рукой к сердцу, и разложим четырёх Королев."
  });

  deckBtn.addEventListener("click", () => {
    if (phase !== "cut") return;
    phase = "spread";
    sound.play("cloth");
    haptic("light");

    runScopedBoardTransition(() => {
      deckBtn.remove();
      dom.queensCardsBoard.className = "queens-cards-board";
      dom.queensSpreadHint.textContent = "Откройте все 4 карты по очереди — Маша растолкует каждую Даму";

      QUEENS_SPREAD_CARDS.forEach((card) => {
        const cBtn = document.createElement("button");
        cBtn.type = "button";
        cBtn.className = "playing-card-btn";
        cBtn.dataset.cardId = card.id;
        renderCardFaceContent(cBtn, card, false);

        cBtn.addEventListener("click", () => {
          if (phase === "spread") {
            if (revealedIds.has(card.id)) return;
            revealedIds.add(card.id);
            sound.play("choice");
            haptic("light");
            runScopedBoardTransition(() => {
              renderCardFaceContent(cBtn, card, true);
            });
            renderDialogueLine({
              role: "masha",
              speaker: "Маша",
              text: card.mashaLine
            });
            if (revealedIds.size === QUEENS_SPREAD_CARDS.length) {
              dom.queensSpreadHint.textContent = "Все 4 Королевы открыты! Готовы сыграть с Машей на откровенность?";
              dom.btnQueensAction.hidden = false;
              dom.btnQueensAction.focus();
            }
          } else if (phase === "wager" && !wagerResolved) {
            wagerResolved = true;
            const won = card.id === "queen_diamonds";
            sound.play(won ? "achiev" : "choice");
            haptic(won ? "success" : "medium");

            runScopedBoardTransition(() => {
              cardButtons.forEach((b, cid) => {
                const cObj = QUEENS_SPREAD_CARDS.find((x) => x.id === cid);
                if (cObj && b.isConnected) {
                  b.classList.remove("has-tell");
                  renderCardFaceContent(b, cObj, true);
                }
              });
            });

            dom.queensSpreadHint.textContent = won
              ? "В яблочко! Бубновая Королева у вас в руках!"
              : "Промах! Бубновая Дама лежала рядом…";

            setTimeout(() => {
              state.cardGameActive = false;
              dom.queensSpreadOverlay.hidden = true;
              jumpToStoryBlock(won ? "Intro_5_cards_win" : "Intro_5_cards_miss");
            }, 950);
          }
        });

        cardButtons.set(card.id, cBtn);
        dom.queensCardsBoard.appendChild(cBtn);
      });
    });
  });

  dom.queensCardsBoard.appendChild(deckBtn);

  dom.btnQueensAction.onclick = () => {
    if (phase !== "spread") return;
    phase = "wager";
    dom.btnQueensAction.hidden = true;
    sound.play("cloth");
    haptic("medium");

    const wagerPool = ["queen_hearts", "queen_diamonds", "queen_spades"];
    // Честная перемешка Фишера-Йейтса
    for (let i = wagerPool.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [wagerPool[i], wagerPool[j]] = [wagerPool[j], wagerPool[i]];
    }

    // Сохраняем и переставляем существующие DOM-узлы для корректного match-element перехода
    runScopedBoardTransition(() => {
      const clubsBtn = cardButtons.get("queen_clubs");
      if (clubsBtn && clubsBtn.isConnected) clubsBtn.remove();
      dom.queensCardsBoard.className = "queens-cards-board mode-wager";

      wagerPool.forEach((cid) => {
        const b = cardButtons.get(cid);
        const cObj = QUEENS_SPREAD_CARDS.find((x) => x.id === cid);
        if (b && cObj) {
          renderCardFaceContent(b, cObj, false);
          // Тонкая визуальная подсказка: взгляд Маши чуть выдал карту Бубновой Дамы
          b.classList.toggle("has-tell", cid === "queen_diamonds");
          dom.queensCardsBoard.appendChild(b);
        }
      });
    });

    dom.queensSpreadTitle.textContent = "Спор на честный ответ";
    dom.queensSpreadHint.textContent = "Найдите Бубновую Даму ♦ с одной попытки (присмотритесь, куда скользнул взгляд Маши)";
    renderDialogueLine({
      role: "masha",
      speaker: "Маша",
      text: "А теперь спор, Соколов! Я перемешала трёх дам рубашкой вверх. Вытянешь мою Бубновую Королеву с одной попытки — честно отвечу на один вопрос про этот вечер!"
    });
  };
}

function renderSandboxRoom(roomId) {
  const room = SANDBOX_ROOMS[roomId] || SANDBOX_ROOMS.living;
  state.sandbox.currentRoom = room.id;
  if (!state.sandbox.worldTime) {
    state.sandbox.worldTime = "rain_evening";
  }
  const tKey = state.sandbox.worldTime;
  const timeStampMap = {
    rain_evening: "22:25",
    night_clear: "01:42",
    dawn_mist: "05:20",
    morning_sun: "07:35"
  };
  const baseLocName = room.locationBadge.split("•")[0].trim();
  const syncedBadge = `${baseLocName} • ${timeStampMap[tKey] || "22:25"}`;
  state.location = syncedBadge;
  dom.hudLocationBadge.textContent = syncedBadge;

  const bgPath = room.bgByTime?.[tKey] || room.bg;
  const fxMode = room.fxByTime?.[tKey] || room.fxShader || "none";
  applyStageBackground(bgPath, "zoom-slow");
  state.lastFxShader = fxMode;
  fxEngine?.setMode(state.lastFxShader);

  if (dom.sandboxTimeSwitch) {
    dom.sandboxTimeSwitch.querySelectorAll("[data-world-time]").forEach((b) => {
      b.classList.toggle("active", b.dataset.worldTime === tKey);
    });
  }

  const goalsDone = countExploredSandboxGoals(state);
  dom.sandboxRoomTitle.textContent = `${room.emoji || ""} ${room.title}`.trim();
  dom.sandboxGoalCounter.textContent = `${goalsDone} / 4`;

  dom.roomPropsLayer.innerHTML = "";

  // Вписанные в интерьер подсвеченные интерактивные предметы (без громоздких плашек)
  dom.hotspotLayer.innerHTML = "";
  (room.hotspots || []).forEach((spot) => {
    const inspected =
      spot.propKey === "bedroom_masha_phone"
        ? Boolean(state.flags?.masha_phone_unlocked)
        : spot.propKey
          ? Boolean(state.roomProps?.[spot.propKey]?.taken)
          : false;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `hotspot-object-btn${inspected ? " is-inspected" : ""}${spot.isExit ? " is-exit" : ""}`;
    btn.style.left = `${spot.x}%`;
    btn.style.top = `${spot.y}%`;
    btn.setAttribute("aria-label", spot.label);

    const visualInner = spot.imgSrc
      ? `<img class="hotspot-object-cutout" src="${spot.imgSrc}" alt="" width="88" height="88" loading="lazy" decoding="async" />`
      : `<span class="hotspot-object-beacon" aria-hidden="true"><svg class="icon-svg-sm" viewBox="0 0 24 24">${getHotspotSvg(spot.icon)}</svg></span>`;

    btn.innerHTML = `
      <span class="hotspot-object-visual">${visualInner}</span>
      <span class="hotspot-object-tag">${spot.shortTag || spot.label}</span>
    `;
    btn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      handleHotspotClick(spot.id);
    });
    dom.hotspotLayer.appendChild(btn);
  });

  // Смайл + текст вкладки 4 комнат снизу
  dom.roomTabs.innerHTML = "";
  Object.values(SANDBOX_ROOMS).forEach((r) => {
    const tab = document.createElement("button");
    tab.type = "button";
    const isCurrent = r.id === room.id;
    tab.className = `room-tab-btn${isCurrent ? " active" : ""}`;
    tab.setAttribute("aria-pressed", isCurrent ? "true" : "false");
    const hasUnseen = !isRoomFullyExplored(r.id);
    tab.innerHTML = `${r.shortLabel}${hasUnseen ? '<span class="room-tab-dot" aria-hidden="true"></span>' : ""}`;
    tab.addEventListener("click", () => {
      if (r.id === state.sandbox.currentRoom) return;
      sound.play("tap");
      haptic("light");
      renderSandboxRoom(r.id);
      saveGame();
    });
    dom.roomTabs.appendChild(tab);
  });
}

function handleHotspotClick(spotId) {
  sound.play("tap");
  haptic("light");

  const result = getHotspotSequence(spotId, state);
  if (result === "OPEN_MASHA_PHONE") {
    openMashaWorkPhone();
    return;
  }
  if (result === "CONFIRM_SLEEP") {
    openSleepConfirmation();
    return;
  }
  if (Array.isArray(result) && result.length > 0) {
    startEphemeralSequence(result);
  }
}

function openSleepConfirmation() {
  const done = countExploredSandboxGoals(state);
  if (done < 4) {
    dom.confirmSleepSummary.textContent = `Вы изучили ${done} из 4 ключевых зон пентхауса. Если лечь на диван сейчас, ночь продолжится и Маша скоро вернётся со встречи.`;
  } else {
    dom.confirmSleepSummary.textContent =
      "Вы осмотрели все комнаты апартаментов и проверили рабочий смартфон Маши. Самое время погасить бра и дождаться её возвращения.";
  }
  openModalDialog(dom.confirmSleepDialog);
}

// ==================== СМАРТФОН АРТЁМА (ШКАЛЫ, ЧАТЫ, УЛИКИ, ОТКЛИКИ) ====================
function getArchetypeSummary() {
  const v = state.player.vector;
  if (v >= 2) {
    return {
      title: "Уверенный Альфа",
      desc: "Вы держите взгляд прямо и не боитесь брать мужскую инициативу в напряжённые секунды."
    };
  }
  if (v <= -2) {
    return {
      title: "Тёплый Романтик",
      desc: "Чуткость, бережная забота и внимание к деталям заставляют девушек открываться вам без защиты."
    };
  }
  if (v > 0) {
    return {
      title: "Склонность к Альфе",
      desc: "Спокойная внутренняя твёрдость в сочетании со сдержанным тактом."
    };
  }
  if (v < 0) {
    return {
      title: "Склонность к Ванили",
      desc: "Мягкая эмпатия и деликатность в общении с близкими."
    };
  }
  return {
    title: "Точка баланса",
    desc: "Характер только формируется между бережной чуткостью и решительным напором."
  };
}

function openMcSmartphone(initialTab = mcPhoneActiveTab) {
  mcPhoneActiveTab = initialTab;
  mcActiveChatId = null;
  setPhoneUnread(false);

  const clockMatch = (state.location || "").match(/\d{2}:\d{2}/);
  dom.mcPhoneClock.textContent = clockMatch ? clockMatch[0] : "22:15";

  updateMcPhoneTabButtons();
  renderMcPhoneContent();
  openModalDialog(dom.mcPhoneDialog);
}

function updateMcPhoneTabButtons() {
  dom.mcPhoneDialog.querySelectorAll("[data-mc-tab]").forEach((btn) => {
    const active = btn.getAttribute("data-mc-tab") === mcPhoneActiveTab;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });
}

function renderMcPhoneContent() {
  const container = dom.mcPhoneBody;
  container.innerHTML = "";

  if (mcPhoneActiveTab === "scales") {
    const arch = getArchetypeSummary();
    const pendulumPct = clamp(50 + state.player.vector * 10, 8, 92);
    const loyaltyPct = clamp(((state.masha.loyalty + 1) / 5) * 100, 6, 100);
    const riskPct = clamp((state.risk / 4) * 100, 4, 100);

    let starsSvgHtml = "";
    for (let i = 1; i <= 5; i++) {
      const filled = i <= state.masha.stars;
      starsSvgHtml += `
        <svg class="icon-svg star-glyph${filled ? " filled" : ""}" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3z" />
        </svg>
      `;
    }

    container.innerHTML = `
      <div class="scale-card">
        <div class="scale-card-head">
          <span class="scale-card-title">Близость с Машей</span>
          <span class="scale-card-badge">Уровень ${state.masha.stars} из 5</span>
        </div>
        <div class="stars-row" aria-label="Звёзд близости: ${state.masha.stars} из 5">${starsSvgHtml}</div>
        <p class="scale-card-desc">
          ${
            state.masha.stars >= 1
              ? "Первая искра доверия и домашней непринуждённости между вами уже зажглась."
              : "Двенадцать лет разлуки только позади — Маша привыкает видеть в вас взрослого человека."
          }
        </p>
      </div>

      <div class="scale-card">
        <div class="scale-card-head">
          <span class="scale-card-title">Вектор характера</span>
          <span class="scale-card-badge">${arch.title}</span>
        </div>
        <div class="pendulum-labels">
          <span>Ваниль (${state.player.vanilla})</span>
          <span>Баланс</span>
          <span>Альфа (${state.player.alpha})</span>
        </div>
        <div class="pendulum-track">
          <span class="pendulum-center-tick"></span>
          <span class="pendulum-thumb" style="left: ${pendulumPct}%"></span>
        </div>
        <p class="scale-card-desc">${arch.desc}</p>
      </div>

      <div class="scale-card">
        <div class="scale-card-head">
          <span class="scale-card-title">Доверие Маши</span>
          <span class="scale-card-badge">${state.masha.loyalty} ед.</span>
        </div>
        <div class="meter-track">
          <div class="meter-fill loyalty" style="width: ${loyaltyPct}%"></div>
        </div>
        <p class="scale-card-desc">Определяет, насколько открыто и тепло Маша реагирует в личные моменты.</p>
      </div>

      <div class="scale-card">
        <div class="scale-card-head">
          <span class="scale-card-title">Риск и искушение</span>
          <span class="scale-card-badge">${state.risk} ед.</span>
        </div>
        <div class="meter-track">
          <div class="meter-fill risk" style="width: ${riskPct}%"></div>
        </div>
        <p class="scale-card-desc">Смелые тайные поступки открывают закрытые ракурсы, но повышают шанс прокола.</p>
      </div>

      <div class="scale-card">
        <div class="scale-card-head">
          <span class="scale-card-title">Связь с Катей</span>
          <span class="scale-card-badge">${state.relations.katya > 0 ? "Тёплая связь" : "Дружеская"}</span>
        </div>
        <p class="scale-card-desc">Ваша союзница в интернате проверяет архив канцелярии по делу отца.</p>
      </div>
    `;
    return;
  }

  if (mcPhoneActiveTab === "chats") {
    if (mcActiveChatId && state.mcChats[mcActiveChatId]) {
      const thread = state.mcChats[mcActiveChatId];
      const backBtn = document.createElement("button");
      backBtn.type = "button";
      backBtn.className = "chat-back-inline";
      backBtn.innerHTML = `
        <svg class="icon-svg-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
        <span>Все чаты</span>
      `;
      backBtn.addEventListener("click", () => {
        mcActiveChatId = null;
        sound.play("tap");
        renderMcPhoneContent();
      });
      container.appendChild(backBtn);

      const list = document.createElement("div");
      list.className = "chat-messages";

      if (thread.messages.length === 0) {
        const empty = document.createElement("p");
        empty.className = "empty-note";
        empty.textContent = "Сообщений пока нет — только выписанный от руки номер.";
        list.appendChild(empty);
      } else {
        thread.messages.forEach((msg) => {
          const bubble = document.createElement("div");
          bubble.className = `msg-bubble ${msg.dir === "out" ? "out" : "in"}`;
          const attachmentsHtml = Array.isArray(msg.attachments)
            ? `<div class="incoming-msg-attachments">${msg.attachments
                .map((att) => `<span class="attachment-chip">${formatText(att)}</span>`)
                .join("")}</div>`
            : "";
          bubble.innerHTML = `
            <div class="msg-meta">
              <strong>${formatText(thread.title)}</strong>
              <span>${msg.time || ""}</span>
            </div>
            <p>${formatText(msg.text)}</p>
            ${attachmentsHtml}
          `;
          list.appendChild(bubble);
        });
      }

      container.appendChild(list);
      return;
    }

    Object.values(state.mcChats).forEach((thread) => {
      const lastMsg = thread.messages[thread.messages.length - 1];
      const card = document.createElement("button");
      card.type = "button";
      card.className = "chat-thread-btn";
      card.innerHTML = `
        <div class="thread-top">
          <span class="thread-name">${formatText(thread.title)}</span>
          <span class="thread-sub">${lastMsg ? lastMsg.time : "пусто"}</span>
        </div>
        <p class="thread-preview">${
          lastMsg ? formatText(lastMsg.text) : "Текстовых сообщений пока не поступало."
        }</p>
      `;
      card.addEventListener("click", () => {
        mcActiveChatId = thread.id;
        sound.play("tap");
        renderMcPhoneContent();
      });
      container.appendChild(card);
    });
    return;
  }

  if (mcPhoneActiveTab === "clues") {
    const clueHead = document.createElement("p");
    clueHead.className = "section-subhead";
    clueHead.textContent = `Зацепки и наблюдения (${state.clues.length} / ${Object.keys(CLUES_CATALOG).length})`;
    container.appendChild(clueHead);

    if (state.clues.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-note";
      empty.textContent = "Пока не собрано ни одной зацепки. Внимательно слушайте собеседников и осматривайте детали.";
      container.appendChild(empty);
    } else {
      state.clues.forEach((clueId) => {
        const clue = CLUES_CATALOG[clueId];
        if (!clue) return;
        const card = document.createElement("button");
        card.type = "button";
        card.className = "clue-item-card";
        card.innerHTML = `
          <div class="thread-top">
            <span class="thread-name">${clue.title}</span>
            <span class="thread-sub">${clue.tag}</span>
          </div>
          <p class="thread-preview">${clue.summary}</p>
        `;
        card.addEventListener("click", () => openClueDetailModal(clue));
        container.appendChild(card);
      });
    }

    const itemsHead = document.createElement("p");
    itemsHead.className = "section-subhead";
    itemsHead.textContent = `Личные вещи (${state.items.length})`;
    container.appendChild(itemsHead);

    state.items.forEach((itemId) => {
      const item = ITEMS_CATALOG[itemId];
      if (!item) return;
      const card = document.createElement("div");
      card.className = "scale-card";
      card.innerHTML = `
        <div class="scale-card-head">
          <span class="scale-card-title">${item.title}</span>
          <span class="scale-card-badge">${item.subtitle}</span>
        </div>
        <p class="scale-card-desc">${item.desc}</p>
      `;
      container.appendChild(card);
    });
    return;
  }

  if (mcPhoneActiveTab === "log") {
    if (state.toastHistory.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-note";
      empty.textContent = "Здесь сохраняются все пост-отклики ваших решений.";
      container.appendChild(empty);
      return;
    }

    state.toastHistory.forEach((item) => {
      const row = document.createElement("div");
      row.className = "scale-card";
      row.innerHTML = `
        <div class="scale-card-head">
          <span class="scale-card-title">${item.text}</span>
          <span class="scale-card-badge">${item.time}</span>
        </div>
      `;
      container.appendChild(row);
    });
  }
}

async function openClueDetailModal(clue) {
  sound.play("tap");
  dom.clueDetailTag.textContent = clue.tag || "ЗАЦЕПКА";
  dom.clueDetailTitle.textContent = clue.title;
  dom.clueDetailSummary.textContent = clue.summary;
  dom.clueDetailNote.textContent = clue.detail || "";

  if (clue.image) {
    const resolved = await resolveAssetUrl(clue.image);
    if (resolved) {
      dom.clueDetailImg.src = resolved;
      dom.clueDetailImg.alt = clue.title;
      dom.clueDetailImageWrap.hidden = false;
    } else {
      dom.clueDetailImageWrap.hidden = true;
    }
  } else {
    dom.clueDetailImageWrap.hidden = true;
  }

  openModalDialog(dom.clueDetailDialog);
}

// ==================== ВТОРОЙ РАБОЧИЙ IPHONE МАШИ (PIN: 1408 + 3 ЧАТА) ====================
function openMashaWorkPhone() {
  pinBuffer = "";
  mashaActiveChatId = null;

  if (state.flags.masha_phone_unlocked) {
    dom.mashaLockScreen.hidden = true;
    dom.mashaUnlockedScreen.hidden = false;
    renderMashaMessenger();
  } else {
    dom.mashaLockScreen.hidden = false;
    dom.mashaUnlockedScreen.hidden = true;
    dom.mashaPinHint.textContent = state.flags.saw_lake_photo_date
      ? "Подсказка со снимка у кровати: летняя дата «14.08»"
      : "Требуется 4-значный PIN. Присмотритесь к вещам на тумбочке у кровати.";
    updatePinDotsUi();
  }

  openModalDialog(dom.mashaPhoneDialog);
}

function updatePinDotsUi(isError = false) {
  dom.mashaPinDots.classList.toggle("is-error", isError);
  dom.mashaPinDots.setAttribute("aria-label", `Введено цифр: ${pinBuffer.length} из 4`);
  const dots = dom.mashaPinDots.querySelectorAll(".pin-dot");
  dots.forEach((dot, idx) => {
    dot.classList.toggle("filled", idx < pinBuffer.length);
  });
}

function handleMashaPinInput(digitOrAction) {
  if (state.flags.masha_phone_unlocked) return;

  if (digitOrAction === "clear") {
    pinBuffer = "";
    sound.play("tap");
    updatePinDotsUi();
    return;
  }

  if (digitOrAction === "back") {
    pinBuffer = pinBuffer.slice(0, -1);
    sound.play("tap");
    updatePinDotsUi();
    return;
  }

  if (pinBuffer.length >= 4) return;
  pinBuffer += String(digitOrAction);
  sound.play("key_beep");
  haptic("light");
  updatePinDotsUi();

  if (pinBuffer.length === 4) {
    if (pinBuffer === MASHA_PIN_CODE) {
      sound.play("achiev");
      haptic("success");
      state.flags.masha_phone_unlocked = true;
      scriptApi.markPropTaken("bedroom_masha_phone");
      scriptApi.addClue("clue_masha_phone");
      pendingPostPhoneSequence = true;
      saveGame();

      setTimeout(() => {
        dom.mashaLockScreen.hidden = true;
        dom.mashaUnlockedScreen.hidden = false;
        renderMashaMessenger();
      }, 220);
    } else {
      sound.play("error");
      haptic("error");
      dom.mashaPinHint.textContent = state.flags.saw_lake_photo_date
        ? "Неверный код. На рамке у качелей выведена дата: 14.08"
        : "Неверный код-пароль. Изучите фотографию у ночника.";
      updatePinDotsUi(true);
      setTimeout(() => {
        pinBuffer = "";
        updatePinDotsUi(false);
      }, 420);
    }
  }
}

function renderMashaMessenger() {
  const container = dom.mashaMessengerBody;
  container.innerHTML = "";

  if (mashaActiveChatId && MASHA_WORK_PHONE_CHATS[mashaActiveChatId]) {
    const chat = MASHA_WORK_PHONE_CHATS[mashaActiveChatId];
    state.flags.masha_chats_read[chat.id] = true;

    dom.btnMashaChatBack.hidden = false;
    dom.mashaHeaderTitle.textContent = chat.title;

    const list = document.createElement("div");
    list.className = "chat-messages";

    chat.messages.forEach((msg) => {
      const bubble = document.createElement("div");
      bubble.className = `msg-bubble ${msg.dir === "out" ? "out" : "in"}`;
      bubble.innerHTML = `
        <div class="msg-meta">
          <strong>${formatText(msg.sender)}</strong>
          <span>${msg.time}</span>
        </div>
        <p>${formatText(msg.text)}</p>
      `;
      list.appendChild(bubble);
    });

    container.appendChild(list);
    saveGame();
    return;
  }

  dom.btnMashaChatBack.hidden = true;
  dom.mashaHeaderTitle.textContent = "Чаты Маши (Рабочий iPhone)";

  Object.values(MASHA_WORK_PHONE_CHATS).forEach((chat) => {
    const lastMsg = chat.messages[chat.messages.length - 1];
    const isRead = Boolean(state.flags.masha_chats_read?.[chat.id]);
    const card = document.createElement("button");
    card.type = "button";
    card.className = "chat-thread-btn";
    card.innerHTML = `
      <div class="thread-top">
        <span class="thread-name">${chat.title}</span>
        <span class="thread-sub">${isRead ? lastMsg.time : `Новое • ${lastMsg.time}`}</span>
      </div>
      <p class="thread-preview">${formatText(lastMsg.text)}</p>
    `;
    card.addEventListener("click", () => {
      mashaActiveChatId = chat.id;
      sound.play("tap");
      renderMashaMessenger();
    });
    container.appendChild(card);
  });
}

// ==================== СИСТЕМНОЕ МЕНЮ И ФИНАЛ ПРОЛОГА ====================
function openSystemMenu() {
  renderBacklogList();
  syncSoundUi();
  syncMotionUi();
  dom.btnTextSpeedToggle.textContent = prefs.textSpeed === "instant" ? "Мгновенная" : "Плавная";
  openModalDialog(dom.systemMenuDialog);
}

function renderBacklogList() {
  dom.backlogList.innerHTML = "";
  if (!state.backlog || state.backlog.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = "История реплик пока пуста.";
    dom.backlogList.appendChild(empty);
    return;
  }

  [...state.backlog].reverse().forEach((entry) => {
    const item = document.createElement("div");
    item.className = "backlog-entry";
    item.innerHTML = `
      <span class="backlog-speaker">${entry.speaker}</span>
      <p class="backlog-text">${entry.text}</p>
    `;
    dom.backlogList.appendChild(item);
  });
}

function completePrologueFinale() {
  state.prologueCompleted = true;
  state.mode = "epilogue";
  dom.vnBottomPanel.hidden = true;
  dom.epilogueBar.hidden = false;
  saveGame();

  renderEndingSummary();
  openModalDialog(dom.endingDialog);
}

function renderEndingSummary() {
  const arch = getArchetypeSummary();
  const totalClues = Object.keys(CLUES_CATALOG).length;

  const branchNotes = [
    state.flags.morning_high_loyalty
      ? "Утро после душа: Маша встретила вас с тёплой улыбкой и доверила выбор образа (получена ★1 Близости)."
      : "Утро после душа: не хватило очков Доверия — Маша обозначила личные границы под одной крышей.",
    state.flags.masha_phone_unlocked
      ? "Рабочий iPhone Маши взломан: раскрыты ужин с Градовым у Артура и тайные поиски Машей следов вашего отца."
      : "Рабочий iPhone Маши в спальне остался неразблокированным — часть её двойной жизни скрыта.",
    "Сообщение Кати из архива: часы Виктора чинили в ателье на Старом Арбате, а весной кто-то живой узнавал дату вашего выпуска.",
    "На пороге квартиры появилась Ленка — лучшая подруга Маши без тормозов и с рентгеновским взглядом."
  ];

  dom.endingSummaryBody.innerHTML = `
    <p class="dialog-lead">
      Пролог завершён. Все ваши решения, вектор характера и найденные улики сохранены для <strong>Главы 1</strong>.
    </p>
    <div class="ending-stat-grid">
      <div class="ending-stat-box">
        <span>Архетип ${formatText("{mc_gen}")}</span>
        <strong>${arch.title}</strong>
      </div>
      <div class="ending-stat-box">
        <span>Близость с Машей</span>
        <strong>★${state.masha.stars} / 5</strong>
      </div>
      <div class="ending-stat-box">
        <span>Доверие / Риск</span>
        <strong>${state.masha.loyalty} / ${state.risk}</strong>
      </div>
      <div class="ending-stat-box">
        <span>Собрано зацепок</span>
        <strong>${state.clues.length} из ${totalClues}</strong>
      </div>
    </div>
    <ul class="ending-recap-list">
      ${branchNotes.map((line) => `<li>${line}</li>`).join("")}
    </ul>
  `;
}

// ==================== ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ (TITLE <-> GAME) ====================
function refreshTitleButtons() {
  const saved = loadSavedGame();
  if (saved) {
    dom.btnContinue.hidden = false;
    dom.btnResetTitle.hidden = false;
    dom.continueMeta.textContent = `${saved.player?.name || "Артём"} • ${saved.location || "Москва"}`;
  } else {
    dom.btnContinue.hidden = true;
    dom.btnResetTitle.hidden = true;
  }
}

function showScreen(screenName) {
  const isGame = screenName === "game";
  dom.titleScreen.classList.toggle("active", !isGame);
  dom.gameScreen.classList.toggle("active", isGame);
  setCleanFrame(false);

  if (!isGame) {
    sound.stopAmbience();
    stopStageVideoDom();
    fxEngine?.setMode("none");
    refreshTitleButtons();
  } else {
    fxEngine?.resize();
    syncStageVideoPlayback();
  }
}

function startFreshGameWithName(playerName) {
  clearSavedGame();
  state = createInitialState(playerName);
  state.started = true;
  ephemeralQueue = [];
  activeChoices = null;
  lastSpokenContext = "";
  currentDisplayedBgUrl = "";
  stopStageVideoDom();

  setPhoneUnread(false);
  showScreen("game");
  jumpToStoryBlock("Intro_1");
}

function resumeSavedGame() {
  const saved = loadSavedGame();
  if (!saved) {
    openModalDialog(dom.nameDialog);
    return;
  }

  state = saved;
  ephemeralQueue = [];
  activeChoices = null;
  currentDisplayedBgUrl = "";
  stopStageVideoDom();

  setPhoneUnread(state.phoneUnread);
  dom.hudLocationBadge.textContent = state.location || "МОСКВА";
  showScreen("game");

  if (state.lastAmbience) {
    sound.setAmbience(state.lastAmbience);
  }

  if (state.mode === "sandbox") {
    enterPenthouseSandbox(state.sandbox?.currentRoom || "living");
    return;
  }

  if (state.mode === "epilogue" || state.prologueCompleted) {
    applyStageBackground(state.lastBg, state.lastCam);
    fxEngine?.setMode(state.lastFxShader || "none");
    completePrologueFinale();
    return;
  }

  applyStageBackground(state.lastBg, state.lastCam);
  applyStageVideo(state.lastVideo);
  applyStageSprite(state.lastSprite);
  fxEngine?.setMode(state.lastFxShader || "none");
  runCurrentStoryStep();
}

// ==================== СОБЫТИЯ ИНТЕРФЕЙСА И КЛАВИАТУРЫ ====================
function bindEvents() {
  dom.titleSoundBtn.addEventListener("click", toggleGlobalSound);
  dom.btnSound.addEventListener("click", toggleGlobalSound);
  dom.btnMenuSoundToggle.addEventListener("click", toggleGlobalSound);
  dom.btnMotion?.addEventListener("click", toggleMotionPaused);
  dom.btnMenuMotionToggle?.addEventListener("click", toggleMotionPaused);
  window
    .matchMedia?.("(prefers-reduced-motion: reduce)")
    ?.addEventListener?.("change", syncMotionUi);

  dom.btnNewGame.addEventListener("click", () => {
    sound.play("tap");
    dom.playerNameInput.value = state.player?.name || "Артём";
    openModalDialog(dom.nameDialog);
  });

  dom.nameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sound.play("choice");
    const chosenName = dom.playerNameInput.value.trim() || "Артём";
    closeModalDialog(dom.nameDialog);
    startFreshGameWithName(chosenName);
  });

  dom.btnContinue.addEventListener("click", () => {
    sound.play("choice");
    resumeSavedGame();
  });

  dom.btnResetTitle.addEventListener("click", () => {
    sound.play("tap");
    clearSavedGame();
    refreshTitleButtons();
    enqueueToast("Сохранение очищено");
  });

  // Верхний HUD
  dom.btnMcPhone.addEventListener("click", () => {
    sound.play("tap");
    haptic("light");
    openMcSmartphone();
  });

  dom.btnCleanFrame.addEventListener("click", (e) => {
    e.stopPropagation();
    sound.play("tap");
    setCleanFrame(!dom.appRoot.classList.contains("clean-frame"));
  });

  dom.btnMenu.addEventListener("click", () => {
    sound.play("tap");
    openSystemMenu();
  });

  // Клик в любое место экрана сцены листает реплику (или выходит из режима «Чистый кадр»)
  dom.stageViewport.addEventListener("click", (e) => {
    if (dom.appRoot.classList.contains("clean-frame")) {
      setCleanFrame(false);
      return;
    }
    if (
      e.target.closest(
        "button, a, .queens-spread-overlay, .sandbox-banner-right, .epilogue-bar"
      )
    ) {
      return;
    }
    if (state.mode === "story" || dom.gameScreen.classList.contains("is-inspecting-spot")) {
      handleAdvanceAction();
    }
  });

  // Переключатель 4 времён суток в песочнице (синхронизирует освещение всех 4 комнат)
  dom.sandboxTimeSwitch?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-world-time]");
    if (!btn) return;
    e.stopPropagation();
    state.sandbox.worldTime = btn.dataset.worldTime;
    sound.play("tap");
    haptic("light");
    renderSandboxRoom(state.sandbox.currentRoom);
    saveGame();
  });

  // Продвижение реплик кликом или клавишами Space / Enter
  dom.dialogueBox.addEventListener("click", handleAdvanceAction);
  dom.dialogueBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleAdvanceAction();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (dom.mashaPhoneDialog.open && !state.flags.masha_phone_unlocked) {
      if (/^[0-9]$/.test(e.key)) {
        handleMashaPinInput(e.key);
        return;
      }
      if (e.key === "Backspace") {
        handleMashaPinInput("back");
        return;
      }
    }

    if (isAnyModalDialogOpen() || !dom.gameScreen.classList.contains("active")) return;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleAdvanceAction();
    }
  });

  // Вкладки смартфона Артёма
  dom.mcPhoneDialog.querySelectorAll("[data-mc-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      mcPhoneActiveTab = btn.getAttribute("data-mc-tab");
      mcActiveChatId = null;
      sound.play("tap");
      updateMcPhoneTabButtons();
      renderMcPhoneContent();
    });
  });

  // PIN-клавиатура и кнопка «Назад» в рабочем iPhone Маши
  dom.mashaPinPad.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    if (btn.hasAttribute("data-pin-digit")) {
      handleMashaPinInput(btn.getAttribute("data-pin-digit"));
    } else if (btn.hasAttribute("data-pin-action")) {
      handleMashaPinInput(btn.getAttribute("data-pin-action"));
    }
  });

  dom.btnMashaChatBack.addEventListener("click", () => {
    mashaActiveChatId = null;
    sound.play("tap");
    renderMashaMessenger();
  });

  // Песочница Intro_4: быстрая кнопка «Лечь» и подтверждение
  dom.btnQuickSleep.addEventListener("click", () => {
    sound.play("tap");
    openSleepConfirmation();
  });

  dom.btnConfirmSleepNow.addEventListener("click", () => {
    sound.play("choice");
    closeModalDialog(dom.confirmSleepDialog);
    jumpToStoryBlock("Intro_5");
  });

  // Вкладки системного меню
  dom.systemMenuDialog.querySelectorAll("[data-menu-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.getAttribute("data-menu-tab");
      sound.play("tap");
      dom.systemMenuDialog.querySelectorAll("[data-menu-tab]").forEach((b) => {
        const active = b === btn;
        b.classList.toggle("active", active);
        b.setAttribute("aria-selected", active ? "true" : "false");
      });
      dom.menuHistoryPane.hidden = tab !== "history";
      dom.menuSettingsPane.hidden = tab !== "settings";
    });
  });

  dom.btnTextSpeedToggle.addEventListener("click", () => {
    prefs.textSpeed = prefs.textSpeed === "instant" ? "smooth" : "instant";
    savePrefs();
    sound.play("tap");
    dom.btnTextSpeedToggle.textContent = prefs.textSpeed === "instant" ? "Мгновенная" : "Плавная";
  });

  dom.btnReturnTitle.addEventListener("click", () => {
    sound.play("tap");
    closeModalDialog(dom.systemMenuDialog);
    showScreen("title");
  });

  dom.btnResetProgressMenu.addEventListener("click", () => {
    sound.play("tap");
    if (!resetConfirmArmed) {
      resetConfirmArmed = true;
      dom.btnResetProgressMenu.textContent = "Нажмите ещё раз для полного сброса";
      return;
    }
    resetConfirmArmed = false;
    clearSavedGame();
    closeModalDialog(dom.systemMenuDialog);
    showScreen("title");
    enqueueToast("Прогресс сброшен");
  });

  // Кнопки экрана итогов Пролога + плашки эпилога
  dom.btnEndingOpenPhone.addEventListener("click", () => {
    sound.play("tap");
    closeModalDialog(dom.endingDialog);
    openMcSmartphone("scales");
  });

  const replaySandboxHandler = () => {
    sound.play("choice");
    closeModalDialog(dom.endingDialog);
    state.prologueCompleted = false;
    enterPenthouseSandbox("living");
  };

  const restartPrologueHandler = () => {
    sound.play("choice");
    closeModalDialog(dom.endingDialog);
    openModalDialog(dom.nameDialog);
  };

  dom.btnEndingReplaySandbox.addEventListener("click", replaySandboxHandler);
  dom.btnEpilogueSandbox.addEventListener("click", replaySandboxHandler);
  dom.btnEndingRestart.addEventListener("click", restartPrologueHandler);
  dom.btnEpilogueRestart.addEventListener("click", restartPrologueHandler);

  dom.btnReopenEnding.addEventListener("click", () => {
    sound.play("tap");
    renderEndingSummary();
    openModalDialog(dom.endingDialog);
  });
}

// ==================== ИНИЦИАЛИЗАЦИЯ ====================
function bootstrap() {
  initTelegramMiniApp();
  sound.setMuted(prefs.muted);
  syncSoundUi();

  fxEngine = new FxEngine(dom.fxCanvas);
  syncMotionUi();
  setupDialogs();
  bindEvents();
  refreshTitleButtons();
  initOptionalV2Assets();

  // Восстановление сохранения из Telegram CloudStorage, если локальное хранилище пусто
  if (!loadSavedGame() && tg?.CloudStorage?.getItem) {
    try {
      tg.CloudStorage.getItem(SAVE_KEY, (err, val) => {
        if (!err && val && !loadSavedGame()) {
          localStorage.setItem(SAVE_KEY, val);
          refreshTitleButtons();
        }
      });
    } catch {}
  }
}

bootstrap();
