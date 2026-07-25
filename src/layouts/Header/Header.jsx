import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Switch from "../../components/UI/Switch";
import Tab from "../../components/UI/Tab";
import useTranslation from "../../hooks/useTranslation";
import { LANGUAGES, NAV_ITEMS } from "../../utils/constants";
import BrandLogo from "./BrandLogo";

const NAV_CONFIG = [
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

const Header = () => {
  const { language, setLanguage } = useTranslation();
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  const [isStatsHovered, setIsStatsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const isStatisticsPage = pathname === "/statistics";

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsStatsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsStatsHovered(false);
    }, 150);
  };

  return (
    <header className="w-full border-b border-slate-800/80 bg-slate-950/10 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* 1. BRAND / LOGO */}
        <BrandLogo onClick={() => navigate("/")} />

        {/* 2. NAVIGATION LINKS */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1 border border-slate-800 rounded-2xl">
          {NAV_CONFIG.map((item) => {
            const isActive = item.hasDropdown
              ? isStatisticsPage
              : pathname === item.path;

            if (item.hasDropdown) {
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Tab
                    onClickHandler={() => navigate(item.path)}
                    isActive={isActive}
                    title={item.title}
                    icon={item.icon}
                    className="px-5 py-3 text-base font-bold rounded-xl cursor-pointer"
                    activeClassName={item.activeClass}
                    inactiveClassName="text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                  />

                  {/* POPUP DROPDOWN WITH SUB-TABS */}
                  {isStatsHovered && (
                    <div className="absolute top-full left-0 pt-2 w-52 z-50">
                      <div
                        className="bg-slate-900/95 border border-slate-800 rounded-2xl p-1.5 shadow-2xl
                        backdrop-blur-xl flex flex-col gap-1"
                      >
                        {item.subTabs?.map((subTab) => {
                          const isSubActive =
                            isStatisticsPage &&
                            (hash === subTab.hash ||
                              (!hash && subTab.hash === "#points"));

                          return (
                            <Tab
                              key={subTab.id}
                              onClickHandler={() => {
                                navigate(subTab.path);
                                setIsStatsHovered(false);
                              }}
                              isActive={isSubActive}
                              title={subTab.title}
                              icon={subTab.icon}
                              className="px-4 py-2.5 text-sm font-bold rounded-xl cursor-pointer justify-start"
                              activeClassName={item.activeClass}
                              inactiveClassName="text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Tab
                key={item.id}
                onClickHandler={() => navigate(item.path)}
                isActive={isActive}
                title={item.title}
                icon={item.icon}
                className="px-5 py-3 text-base font-bold rounded-xl"
                activeClassName={item.activeClass}
                inactiveClassName="text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              />
            );
          })}
        </nav>

        {/* 3. LANGUAGE SWITCHER */}
        <div className="flex items-center gap-2">
          <Switch
            onClick={() =>
              setLanguage(
                language === LANGUAGES.UA ? LANGUAGES.EN : LANGUAGES.UA,
              )
            }
            firstItem="UA"
            secondItem="EN"
            isActive={language === LANGUAGES.UA}
          />
        </div>
      </div>

      {/* 4. MOBILE NAVIGATION BAR */}
      {!isStatisticsPage && (
        <div className="xl:hidden flex items-center justify-around border-t border-slate-800 p-2">
          {NAV_CONFIG.filter((item) => !item.hideOnMobile).map((item) => (
            <Tab
              key={item.id}
              onClickHandler={() => navigate(item.path)}
              isActive={
                item.hasDropdown ? isStatisticsPage : pathname === item.path
              }
              title={item.title}
              icon={<span className="text-base">{item.icon}</span>}
              className="flex-col gap-1 text-[11px] font-bold px-3 py-1"
              activeClassName={item.mobileActiveClass}
              inactiveClassName="text-slate-500"
            />
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
