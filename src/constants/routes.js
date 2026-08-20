import {
  Activity,
  History,
  LayoutDashboard,
  Swords,
  Target,
  Users,
} from "lucide-react";

// Main Navigation
export const NAV_ITEMS = {
  RESPAWN: "respawn",
  SCHEDULE: "schedule",
  MEDIA: "media",
  ALLIANCE: "alliance",
  ALLIANCE_LOOT: "alliance_loot",
  ALLIANCE_CLANS: "alliance_clans",
  ALLIANCE_PROOF: "alliance_proof",
  ALLIANCE_TOURNAMENT: "alliance_tournament",
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
      {
        id: "tournament",
        path: "/alliance/tournament",
        titleKey: "navTournament",
        icon: "🏆",
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

// Iron Gates Dashboard
export const DASHBOARD_TABS = {
  SUMMARY: "summary",
  MEMBERS: "members",
  ACTIVITY: "activity",
  EPIC_PRIORITY: "epic_priority",
  EPIC_HISTORY: "epic_history",
  GVG_SETUP: "gvg_setup",
};

export const DASHBOARD_NAV_CONFIG = [
  {
    id: DASHBOARD_TABS.SUMMARY,
    titleKey: "dashboardSummary",
    icon: LayoutDashboard,
    // Золотий стиль (як Epic/Bosses)
    activeClass:
      "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.3)]",
    iconColor: "text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]",
  },
  {
    id: DASHBOARD_TABS.MEMBERS,
    titleKey: "dashboardMembers",
    icon: Users,
    // Фіолетовий стиль (як підтримка/магія)
    activeClass:
      "bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]",
    iconColor: "text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]",
  },
  {
    id: DASHBOARD_TABS.ACTIVITY,
    titleKey: "dashboardActivity",
    icon: Activity,
    // Небесно-блакитний стиль
    activeClass:
      "bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-[0_0_20px_rgba(14,165,233,0.3)]",
    iconColor: "text-sky-400 drop-shadow-[0_0_8px_rgba(14,165,233,0.6)]",
  },
  {
    id: DASHBOARD_TABS.EPIC_PRIORITY,
    titleKey: "dashboardEpicPriority",
    icon: Target,
    // Вогняно-рожевий/червоний (епічний)
    activeClass:
      "bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.3)]",
    iconColor: "text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]",
  },
  {
    id: DASHBOARD_TABS.EPIC_HISTORY,
    titleKey: "dashboardEpicHistory",
    icon: History,
    // Смарагдово-зелений стиль
    activeClass:
      "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]",
    iconColor: "text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]",
  },
  {
    id: DASHBOARD_TABS.GVG_SETUP,
    titleKey: "dashboardGvgSetup",
    icon: Swords,
    // Індіго / королівський синій стиль
    activeClass:
      "bg-indigo-500/20 text-indigo-300 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.3)]",
    iconColor: "text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]",
  },
];
