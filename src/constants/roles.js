export const ROLES = {
  ADMIN: "ADMIN",
  OFFICER: "OFFICER",
  SCOUT: "SCOUT",
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
  [ROLES.OFFICER]: {
    label: "OFFICER",
    icon: "⚔️",
    className:
      "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-emerald-500/10",
  },
  [ROLES.SCOUT]: {
    label: "SCOUT",
    icon: "👁️",
    className: "bg-sky-500/20 text-sky-400 border-sky-500/40 shadow-sky-500/10",
  },
  [ROLES.MEMBER]: {
    label: "MEMBER",
    icon: "🛡️",
    className: "bg-slate-800 text-slate-400 border-slate-700",
  },
};
