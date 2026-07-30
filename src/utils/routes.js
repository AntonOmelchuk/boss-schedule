// Main Navigation
export const NAV_ITEMS = {
  RESPAWN: "respawn",
  SCHEDULE: "schedule",
  MEDIA: "media",
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
  },
  {
    id: NAV_ITEMS.MEDIA,
    path: "/media",
    titleKey: "navMedia",
    icon: "🎬",
    activeClass:
      "bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_12px_rgba(239,68,68,0.2)]",
    mobileActiveClass: "text-red-400",
  },
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
  },
  {
    id: NAV_ITEMS.STATISTICS_EPIC,
    path: "/statistics#epic",
    titleKey: "navEpicStats",
    icon: "🐉",
    mobileActiveClass: "text-indigo-400",
    showOnlyInStatsMobile: true,
  },
];
