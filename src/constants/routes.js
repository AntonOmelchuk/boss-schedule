// Main Navigation
export const NAV_ITEMS = {
  RESPAWN: "respawn",
  SCHEDULE: "schedule",
  MEDIA: "media",
  ALLIANCE: "alliance",
  ALLIANCE_LOOT: "alliance_loot",
  ALLIANCE_CLANS: "alliance_clans",
  ALLIANCE_PROOF: "alliance_proof",
  STATISTICS: "statistics",
  STATISTICS_POINTS: "statistics_points",
  STATISTICS_EPIC: "statistics_epic",
};

export const NAV_CONFIG = [
  {
    id: NAV_ITEMS.RESPAWN,
    path: "/",
    titleKey: "navRespawn",
    icon: "⚔️",
    activeClass:
      "bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
    mobileActiveClass: "text-amber-400",

    indicatorGradient: "from-amber-500 via-amber-400 to-yellow-300",
    indicatorShadow: "shadow-[0_-2px_10px_rgba(245,158,11,0.7)]",
  },
  {
    id: NAV_ITEMS.SCHEDULE,
    path: "/schedule",
    titleKey: "navSchedule",
    icon: "📅",
    activeClass:
      "bg-sky-500/20 text-sky-400 border border-sky-500/30 shadow-[0_0_12px_rgba(14,165,233,0.2)]",
    mobileActiveClass: "text-sky-400",
    hideOnMobile: true,

    indicatorGradient: "from-sky-500 via-sky-400 to-cyan-300",
    indicatorShadow: "shadow-[0_-2px_10px_rgba(14,165,233,0.7)]",
  },
  {
    id: NAV_ITEMS.MEDIA,
    path: "/media",
    titleKey: "navMedia",
    icon: "🎬",
    activeClass:
      "bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_12px_rgba(239,68,68,0.2)]",
    mobileActiveClass: "text-red-400",

    indicatorGradient: "from-red-600 via-red-500 to-rose-400",
    indicatorShadow: "shadow-[0_-2px_10px_rgba(239,68,68,0.7)]",
  },
  // --- Dropdown: ALLIANCE / TOOLS ---
  {
    id: NAV_ITEMS.ALLIANCE,
    path: "/alliance/loot",
    titleKey: "navAlliance",
    icon: "🛠️",
    activeClass:
      "bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.2)]",
    hasDropdown: true,
    hideOnMobile: true,
    subTabs: [
      {
        id: "loot",
        path: "/alliance/loot",
        titleKey: "navLootRandomizer",
        icon: "🎲",
        hideOnMobile: true,
      },
      {
        id: "proof",
        path: "/alliance/proof",
        titleKey: "navAfkProof",
        icon: "📸",
      },
      {
        id: "clans",
        path: "/alliance/clans",
        titleKey: "navAllianceClans",
        icon: "🛡️",
        hideOnMobile: true,
      },
    ],
  },
  // Mobile tab for Proof Checker
  {
    id: NAV_ITEMS.ALLIANCE_PROOF,
    path: "/alliance/proof",
    titleKey: "navAfkProof",
    icon: "📸",
    activeClass:
      "bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.2)]",
    mobileActiveClass: "text-purple-400",
    onlyMobile: true,

    indicatorGradient: "from-purple-600 via-fuchsia-500 to-pink-400",
    indicatorShadow: "shadow-[0_-2px_10px_rgba(168,85,247,0.7)]",
  },
  // --- Dropdown: STATISTICS ---
  {
    id: NAV_ITEMS.STATISTICS,
    path: "/statistics#points",
    titleKey: "navStatistics",
    icon: "📊",
    activeClass:
      "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.2)]",
    mobileActiveClass: "text-indigo-400",
    hasDropdown: true,
    subTabs: [
      {
        id: "points",
        path: "/statistics#points",
        hash: "#points",
        titleKey: "navDkpPoints",
        icon: "🎖️",
      },
      {
        id: "epic",
        path: "/statistics#epic",
        hash: "#epic",
        titleKey: "navEpicStats",
        icon: "🐉",
      },
    ],
  },
  {
    id: NAV_ITEMS.STATISTICS_POINTS,
    path: "/statistics#points",
    titleKey: "navDkpPoints",
    icon: "🎖️",
    mobileActiveClass: "text-indigo-400",
    showOnlyInStatsMobile: true,

    indicatorGradient: "from-indigo-500 via-indigo-400 to-purple-400",
    indicatorShadow: "shadow-[0_-2px_10px_rgba(99,102,241,0.7)]",
  },
  {
    id: NAV_ITEMS.STATISTICS_EPIC,
    path: "/statistics#epic",
    titleKey: "navEpicStats",
    icon: "🐉",
    mobileActiveClass: "text-emerald-400",
    showOnlyInStatsMobile: true,

    indicatorGradient: "from-emerald-500 via-teal-400 to-green-300",
    indicatorShadow: "shadow-[0_-2px_10px_rgba(16,185,129,0.7)]",
  },
];

export const ADMIN_TAB_KEYS = {
  PROOF: "proof",
  USERS: "users",
  CPS: "cps",
  TIMERS: "timers",
  SYSTEM: "system",
};
