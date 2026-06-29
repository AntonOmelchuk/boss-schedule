export const LANGUAGES = {
  EN: "en",
  UA: "ua",
};

export const EVENT_TYPES = {
  Siege: "siege",
  CH: "ch",
  MTB: "mtb",
  CTB: "ctb",
  EBC: "EBC",
  DM: "DM",
  //bosses
  QA: "qa",
  Core: "core",
  Orfen: "orfen",
  Zaken: "zaken",
  Tezza: "tezza",
  Baium: "baium",
  Antharas: "antharas",
  Valakas: "valakas",
};

export const EMOJI_MAP = {
  // Епік боси
  [EVENT_TYPES.QA]: "🐜",
  [EVENT_TYPES.Core]: "⚙️",
  [EVENT_TYPES.Orfen]: "🕸️",
  [EVENT_TYPES.Zaken]: "🏴‍☠️",
  [EVENT_TYPES.Tezza]: "🎻",
  [EVENT_TYPES.Baium]: "👑",
  [EVENT_TYPES.Antharas]: "🐉",
  [EVENT_TYPES.Valakas]: "🔥",

  // PvP івенти
  [EVENT_TYPES.MTB]: "⚔️",
  [EVENT_TYPES.CTB]: "🚩",
  [EVENT_TYPES.EBC]: "🏆",
  [EVENT_TYPES.DM]: "💀",

  // Облоги та Клан Холи
  [EVENT_TYPES.Siege]: "🏰",
  [EVENT_TYPES.CH]: "🏠",
};

export const RELATION = {
  Enemy: "enemy",
  Alliance: "alliance",
};
