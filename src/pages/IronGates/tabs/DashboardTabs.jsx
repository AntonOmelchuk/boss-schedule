/* eslint-disable max-len */
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
      "hover:bg-amber-500/10 hover:text-amber-200 hover:border-amber-500/30 hover:shadow-[0_4px_20px_rgba(245,158,11,0.15)]",
    icon: "text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]",
    hoverIcon:
      "group-hover:text-amber-400 group-hover:drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]",
    line: "from-transparent via-amber-500/40 to-transparent",
  },
  [DASHBOARD_TABS.MEMBERS]: {
    active:
      "bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]",
    hover:
      "hover:bg-purple-500/10 hover:text-purple-200 hover:border-purple-500/30 hover:shadow-[0_4px_20px_rgba(168,85,247,0.15)]",
    icon: "text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]",
    hoverIcon:
      "group-hover:text-purple-400 group-hover:drop-shadow-[0_0_6px_rgba(168,85,247,0.4)]",
    line: "from-transparent via-purple-500/40 to-transparent",
  },
  [DASHBOARD_TABS.ACTIVITY]: {
    active:
      "bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-[0_0_20px_rgba(14,165,233,0.3)]",
    hover:
      "hover:bg-sky-500/10 hover:text-sky-200 hover:border-sky-500/30 hover:shadow-[0_4px_20px_rgba(14,165,233,0.15)]",
    icon: "text-sky-400 drop-shadow-[0_0_8px_rgba(14,165,233,0.6)]",
    hoverIcon:
      "group-hover:text-sky-400 group-hover:drop-shadow-[0_0_6px_rgba(14,165,233,0.4)]",
    line: "from-transparent via-sky-500/40 to-transparent",
  },
  [DASHBOARD_TABS.EPIC_PRIORITY]: {
    active:
      "bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.3)]",
    hover:
      "hover:bg-rose-500/10 hover:text-rose-200 hover:border-rose-500/30 hover:shadow-[0_4px_20px_rgba(244,63,94,0.15)]",
    icon: "text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]",
    hoverIcon:
      "group-hover:text-rose-400 group-hover:drop-shadow-[0_0_6px_rgba(244,63,94,0.4)]",
    line: "from-transparent via-rose-500/40 to-transparent",
  },
  [DASHBOARD_TABS.EPIC_HISTORY]: {
    active:
      "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]",
    hover:
      "hover:bg-emerald-500/10 hover:text-emerald-200 hover:border-emerald-500/30 hover:shadow-[0_4px_20px_rgba(16,185,129,0.15)]",
    icon: "text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]",
    hoverIcon:
      "group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_6px_rgba(16,185,129,0.4)]",
    line: "from-transparent via-emerald-500/40 to-transparent",
  },
  [DASHBOARD_TABS.GVG_SETUP]: {
    active:
      "bg-indigo-500/20 text-indigo-300 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.3)]",
    hover:
      "hover:bg-indigo-500/10 hover:text-indigo-200 hover:border-indigo-500/30 hover:shadow-[0_4px_20px_rgba(99,102,241,0.15)]",
    icon: "text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]",
    hoverIcon:
      "group-hover:text-indigo-400 group-hover:drop-shadow-[0_0_6px_rgba(99,102,241,0.4)]",
    line: "from-transparent via-indigo-500/40 to-transparent",
  },
};

const DashboardNav = ({ activeTab, onTabChange }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2.5 p-8 scrollbar-none border-b z-50 bg-slate-950 border-slate-800/80">
      {DASHBOARD_NAV_CONFIG.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;

        const theme = TAB_THEMES[tab.id] || {
          active: "bg-amber-500/20 text-amber-300 border-amber-500/50",
          hover: "hover:bg-amber-500/10 hover:text-amber-200",
          icon: "text-amber-400",
          hoverIcon: "group-hover:text-amber-400",
          line: "from-transparent via-amber-500/40 to-transparent",
        };

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium",
              "whitespace-nowrap border cursor-pointer transition-all duration-300 ease-out",

              isActive
                ? cn(theme.active, "scale-[1.02]")
                : cn(
                    "bg-slate-900/60 text-slate-400 border-slate-800/80",
                    theme.hover,
                    "hover:-translate-y-0.5",
                  ),
            )}
          >
            <IconComponent
              className={cn(
                "w-4 h-4 transition-transform duration-300",
                isActive
                  ? cn("scale-110", theme.icon)
                  : cn(
                      "opacity-70 group-hover:scale-110 group-hover:opacity-100",
                      theme.hoverIcon,
                    ),
              )}
            />

            <span>{t[tab.titleKey]}</span>

            {!isActive && (
              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl",
                  theme.line,
                )}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default DashboardNav;
