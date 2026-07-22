import antharasIcon from "../assets/epic/antharas.png";
import baiumIcon from "../assets/epic/baium.png";
import coreIcon from "../assets/epic/core.png";
import frintezzaIcon from "../assets/epic/frintezza.png";
import orfenIcon from "../assets/epic/orfen.png";
import qaIcon from "../assets/epic/qa.png";
import valakasIcon from "../assets/epic/valakas.png";
import zakenIcon from "../assets/epic/zaken.png";

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
  [EVENT_TYPES.QA]: qaIcon,
  [EVENT_TYPES.Core]: coreIcon,
  [EVENT_TYPES.Orfen]: orfenIcon,
  [EVENT_TYPES.Zaken]: zakenIcon,
  [EVENT_TYPES.Tezza]: frintezzaIcon,
  [EVENT_TYPES.Baium]: baiumIcon,
  [EVENT_TYPES.Antharas]: antharasIcon,
  [EVENT_TYPES.Valakas]: valakasIcon,

  // PvP Events
  [EVENT_TYPES.MTB]: "⚔️",
  [EVENT_TYPES.CTB]: "🚩",
  [EVENT_TYPES.EBC]: "🏆",
  [EVENT_TYPES.DM]: "💀",

  // Castles & Clan Halls
  [EVENT_TYPES.Siege]: "🏰",
  [EVENT_TYPES.CH]: "🏛️",
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

export const DASHBOARD_TABS = {
  ATTENDANCE: "attendance",
  EPICS: "epics",
};

export const EPIC_COLORS = {
  QueenAnt: "#f59e0b", // Amber / Warm Gold (Замість рожевого)
  Orfen: "#38bdf8", // Sky Blue (Світло-блакитний)
  Core: "#22d3ee", // Cyan / Ice (Крижаний ціан)
  Zaken: "#10b981", // Emerald (Темно-зелений/смарагдовий)
  Baium: "#f97316", // Flame Orange (Вогняно-помаранчевий)
  Frintezza: "#64748b", // Slate / Crimson Silver (Стриманий темно-сталевий замість фіолетового)
  Valakas: "#ef4444", // Deep Red (Вогняно-червоний top-tier)
  Antharas: "#84cc16", // Toxic Lime (Токсично-зелений)
};

// 'all' | 'treasury' | 'shared'
export const FARMED_EPIC_FILTERS = {
  ALL: "all",
  TREASURY: "treasury",
  SHARED: "shared",
};

export const SORT = {
  DESC: "desc",
  ASC: "asc",
};

// Map for epic from backend
export const EPIC_NAME_TO_EVENT_TYPE = {
  QueenAnt: EVENT_TYPES.QA,
  QA: EVENT_TYPES.QA,
  Core: EVENT_TYPES.Core,
  Orfen: EVENT_TYPES.Orfen,
  Zaken: EVENT_TYPES.Zaken,
  Frintezza: EVENT_TYPES.Tezza,
  Tezza: EVENT_TYPES.Tezza,
  Baium: EVENT_TYPES.Baium,
  Antharas: EVENT_TYPES.Antharas,
  Valakas: EVENT_TYPES.Valakas,
};
