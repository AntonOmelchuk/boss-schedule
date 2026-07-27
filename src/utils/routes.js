// Main Navigation
export const NAV_ITEMS = {
  RESPAWN: "respawn",
  SCHEDULE: "schedule",
  STATISTICS: "statistics",
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
  {
    id: NAV_ITEMS.STATISTICS,
    path: "/statistics#points",
    title: "Statistics",
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
];
