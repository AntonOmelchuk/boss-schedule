/* eslint-disable indent */
import {
  DASHBOARD_NAV_CONFIG,
  DASHBOARD_TABS,
} from "../../../constants/routes";
import useTranslation from "../../../hooks/useTranslation";
import { cn } from "../../../utils/general";

const TAB_THEMES = {
  [DASHBOARD_TABS.SUMMARY]: {
    active:
      "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.3)]",
    hover:
      "hover:bg-amber-500/10 hover:text-amber-200 hover:border-amber-500/30",
    icon: "text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]",
  },
  [DASHBOARD_TABS.MEMBERS]: {
    active:
      "bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]",
    hover:
      "hover:bg-purple-500/10 hover:text-purple-200 hover:border-purple-500/30",
    icon: "text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]",
  },
  [DASHBOARD_TABS.ACTIVITY]: {
    active:
      "bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-[0_0_20px_rgba(14,165,233,0.3)]",
    hover: "hover:bg-sky-500/10 hover:text-sky-200 hover:border-sky-500/30",
    icon: "text-sky-400 drop-shadow-[0_0_8px_rgba(14,165,233,0.6)]",
  },
  [DASHBOARD_TABS.EPIC_PRIORITY]: {
    active:
      "bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.3)]",
    hover: "hover:bg-rose-500/10 hover:text-rose-200 hover:border-rose-500/30",
    icon: "text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]",
  },
  [DASHBOARD_TABS.EPIC_HISTORY]: {
    active:
      "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]",
    hover:
      "hover:bg-emerald-500/10 hover:text-emerald-200 hover:border-emerald-500/30",
    icon: "text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]",
  },
  [DASHBOARD_TABS.GVG_SETUP]: {
    active:
      "bg-indigo-500/20 text-indigo-300 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.3)]",
    hover:
      "hover:bg-indigo-500/10 hover:text-indigo-200 hover:border-indigo-500/30",
    icon: "text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]",
  },
};

const DashboardNav = ({ activeTab, onTabChange }) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center z-50 relative px-4">
      <nav
        className="flex items-center gap-1.5 p-2 rounded-2xl bg-slate-900/80 backdrop-blur-md border
        border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-slate-700"
      >
        {DASHBOARD_NAV_CONFIG.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;

          const theme = TAB_THEMES[tab.id] || {
            active: "bg-amber-500/20 text-amber-300 border-amber-500/50",
            hover: "hover:bg-amber-500/10 hover:text-amber-200",
            icon: "text-amber-400",
          };

          const activeStyles = isActive
            ? cn(theme.active, "scale-105 shadow-md")
            : cn(
                "bg-transparent text-slate-400 border-transparent",
                theme.hover,
                "hover:scale-102",
              );

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "group relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium",
                "border cursor-pointer transition-all duration-300 ease-out",
                activeStyles,
              )}
              title={t[tab.titleKey]}
            >
              <IconComponent
                className={cn(
                  "w-4 h-4 transition-transform duration-300 shrink-0",
                  isActive
                    ? cn("scale-110", theme.icon)
                    : "opacity-70 group-hover:opacity-100 group-hover:scale-110",
                )}
              />
              <span
                className={cn(
                  "transition-all duration-300 overflow-hidden whitespace-nowrap",
                  isActive
                    ? "max-w-37.5 opacity-100"
                    : "max-w-0 opacity-0 group-hover:max-w-37.5 group-hover:opacity-100",
                )}
              >
                {t[tab.titleKey]}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default DashboardNav;
