export const ROLES = {
  ADMIN: "ADMIN",
  CO_ADMIN: "CO_ADMIN",
  ALLY_GENERAL: "ALLY_GENERAL",
  RAID_CALLER: "RAID_CALLER",
  CP_LEADER: "CP_LEADER",
  MEMBER: "MEMBER",
};

export const ROLES_LIST = Object.values(ROLES);

export const ROLE_BADGE_CONFIG = {
  [ROLES.ADMIN]: {
    label: "ADMIN",
    icon: "👑",
    className:
      "bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-amber-500/10",
  },
  [ROLES.CO_ADMIN]: {
    label: "CO-ADMIN",
    icon: "🤝",
    className:
      "bg-purple-500/20 text-purple-400 border-purple-500/40 shadow-purple-500/10",
  },
  [ROLES.ALLY_GENERAL]: {
    label: "ALLY GENERAL",
    icon: "⭐️",
    className:
      "bg-indigo-500/20 text-indigo-400 border-indigo-500/40 shadow-indigo-500/10",
  },
  [ROLES.RAID_CALLER]: {
    label: "RAID CALLER",
    icon: "📢",
    className:
      "bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-rose-500/10",
  },
  [ROLES.CP_LEADER]: {
    label: "CP LEADER",
    icon: "⚔️",
    className:
      "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-emerald-500/10",
  },
  [ROLES.MEMBER]: {
    label: "MEMBER",
    icon: "🛡️",
    className: "bg-slate-800 text-slate-400 border-slate-700",
  },
};
