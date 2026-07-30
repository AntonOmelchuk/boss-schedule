// Main Navigation
export const NAV_ITEMS = {
  RESPAWN: "respawn",
  SCHEDULE: "schedule",
  STATISTICS: "statistics",
  STATISTICS_POINTS: "statistics_points",
  STATISTICS_EPIC: "statistics_epic",
};

export const NAV_CONFIG = [
  {
    id: NAV_ITEMS.RESPAWN,
    path: "/",
    title: "Respawn",
    icon: "⚔️",
    activeClass:
      "bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
    mobileActiveClass: "text-amber-400",
  },
  {
    id: NAV_ITEMS.SCHEDULE,
    path: "/schedule",
    title: "Schedule",
    icon: "📅",
    activeClass:
      "bg-sky-500/20 text-sky-400 border border-sky-500/30 shadow-[0_0_12px_rgba(14,165,233,0.2)]",
    mobileActiveClass: "text-sky-400",
    hideOnMobile: true,
  },
  // Desktop Statistics Dropdown Navigation
  {
    id: NAV_ITEMS.STATISTICS,
    path: "/statistics#points",
    title: "Statistics",
    icon: "📊",
    activeClass:
      "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.2)]",
    mobileActiveClass: "text-indigo-400",
    // hideOnMobile: true,
    hasDropdown: true,
    subTabs: [
      {
        id: "points",
        path: "/statistics#points",
        hash: "#points",
        title: "DKP Points",
        icon: "🎖️",
      },
      {
        id: "epic",
        path: "/statistics#epic",
        hash: "#epic",
        title: "Epic Stats",
        icon: "🐉",
      },
    ],
  },
  // Dedicated Mobile Navigation Items for Statistics Sub-routes
  {
    id: NAV_ITEMS.STATISTICS_POINTS,
    path: "/statistics#points",
    title: "DKP Points",
    icon: "🎖️",
    mobileActiveClass: "text-indigo-400",
    showOnlyInStatsMobile: true,
  },
  {
    id: NAV_ITEMS.STATISTICS_EPIC,
    path: "/statistics#epic",
    title: "Epic Stats",
    icon: "🐉",
    mobileActiveClass: "text-indigo-400",
    showOnlyInStatsMobile: true,
  },
];
