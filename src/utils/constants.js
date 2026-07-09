/**
 * @file constants.js
 * @description Global application constants including timing configurations, supported languages,
 * UI filtering categories, in-game event types, emoji indicators, and alliance relationships.
 */

/**
 * Standard frequency (in milliseconds) used for ticking UI timers and calculating countdowns.
 * @type {number}
 */
export const UPDATE_INTERVAL_MS = 1000;

/**
 * Supported localization codes utilized by the translation engine.
 * @type {Object}
 * @property {string} EN - English language identifier.
 * @property {string} UA - Ukrainian language identifier.
 */
export const LANGUAGES = {
  EN: "en",
  UA: "ua",
};

export const TIME_FILTERS = {
  AllTime: "allTime",
  Today: "today",
};

/**
 * High-level grouping categories used for structuring and filtering active events on the dashboard.
 * @type {Object}
 * @property {string} Epic - Category token for epic boss occurrences.
 * @property {string} PVP - Category token for global player-versus-player clashes.
 * @property {string} CH - Category token for competitive clan hall capture zones.
 * @property {string} Siege - Category token for massive castle sieges.
 */
export const CATEGORIES = {
  Epic: "epic",
  PVP: "pvpEvents",
  CH: "ch",
  Siege: "siege",
};

/**
 * System-wide identifiers classifying distinct types of milestones or events.
 * @type {Object}
 */
export const EVENT_TYPES = {
  Siege: "siege",
  CH: "ch",
  MTB: "mtb",
  CTB: "ctb",
  EBC: "EBC",
  DM: "DM",
  // Epic Bosses
  QA: "qa",
  Core: "core",
  Orfen: "orfen",
  Zaken: "zaken",
  Tezza: "tezza",
  Baium: "baium",
  Antharas: "antharas",
  Valakas: "valakas",
};

/**
 * Graphic emoji map associating specific event types with illustrative icons on list items.
 * @type {Object.<string, string>}
 */
export const EMOJI_MAP = {
  // Epic Bosses
  [EVENT_TYPES.QA]: "🐜",
  [EVENT_TYPES.Core]: "⚙️",
  [EVENT_TYPES.Orfen]: "🕸️",
  [EVENT_TYPES.Zaken]: "🏴‍☠️",
  [EVENT_TYPES.Tezza]: "🎻",
  [EVENT_TYPES.Baium]: "👑",
  [EVENT_TYPES.Antharas]: "🐉",
  [EVENT_TYPES.Valakas]: "🔥",

  // PvP Events
  [EVENT_TYPES.MTB]: "⚔️",
  [EVENT_TYPES.CTB]: "🚩",
  [EVENT_TYPES.EBC]: "🏆",
  [EVENT_TYPES.DM]: "💀",

  // Castles & Clan Halls
  [EVENT_TYPES.Siege]: "🏰",
  [EVENT_TYPES.CH]: "🏠",
};

/**
 * Diplomatic alignment levels used to determine custom borders, neon glow highlights,
 * and colored badges depending on clan ownership or political status.
 * @type {Object}
 * @property {string} Enemy - Standard state for declaring direct clan war opponents.
 * @property {string} Alliance - Standard state for marking defensive alliance companions.
 */
export const RELATION = {
  Enemy: "enemy",
  Alliance: "alliance",
};

export const TIMEZONE_OPTIONS = [
  { name: "Час Сервера (UTC)", value: "UTC" },
  { name: "Київ / Східна Європа (EEST)", value: "Europe/Kyiv" },
  { name: "Лондон / Західна Європа (BST)", value: "Europe/London" },
  { name: "Берлін / Центральна Європа (CEST)", value: "Europe/Berlin" },
  { name: "Варшава / Польща (CEST)", value: "Europe/Warsaw" },
  { name: "Рейк'явік / Ісландія (GMT)", value: "Atlantic/Reykjavik" },
  { name: "Нью-Йорк / Східне узбережжя США (EDT)", value: "America/New_York" },
  { name: "Чикаго / Центральні штати США (CDT)", value: "America/Chicago" },
  { name: "Денвер / Гірський час США (MDT)", value: "America/Denver" },
  {
    name: "Лос-Анджелес / Тихоокеанське узбережжя (PDT)",
    value: "America/Los_Angeles",
  },
  { name: "Сан-Паулу / Бразилія (BRT)", value: "America/Sao_Paulo" },
];

export const CATEGORIES_STYLE = {
  [CATEGORIES.Epic]: "border-amber-500/30 text-amber-400 bg-amber-500/10",
  [CATEGORIES.Siege]: "border-blue-500/30 text-blue-400 bg-blue-500/10",
  [CATEGORIES.CH]: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  [CATEGORIES.PVP]: "border-red-500/30 text-red-400 bg-red-500/10",
};

export const MAKE_SCREENSHOT_STATUS = {
  None: "none",
  Progress: "progress",
  Success: "success",
  Error: "error",
};
