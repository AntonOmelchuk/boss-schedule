import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import SettingsModal from "../../components/SettingsModal/SettingsModal";
import SettingsIcon from "../../components/SVG/SettingsIcon";
import BackButton from "../../components/UI/BackButton";
import Tab from "../../components/UI/Tab";
import useTranslation from "../../hooks/useTranslation";
import { NAV_CONFIG } from "../../utils/routes";
import BrandLogo from "./BrandLogo";

const Header = () => {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  const { t } = useTranslation();

  const [isStatsHovered, setIsStatsHovered] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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
    <>
      <header
        className="pt-[env(safe-area-inset-top)] w-full border-b border-slate-800/80 bg-slate-950/10
          backdrop-blur-md sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-1 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* 1. BRAND / LOGO OR BACK BUTTON ON MOBILE */}
          <div className="flex items-center gap-3">
            {isStatisticsPage && <BackButton />}
            <BrandLogo onClick={() => navigate("/")} />
          </div>

          {/* 2. NAVIGATION LINKS */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1 border border-slate-800 rounded-2xl">
            {/* Filter out mobile-only items for desktop header */}
            {NAV_CONFIG.filter((item) => !item.showOnlyInStatsMobile).map(
              (item) => {
                const isActive = item.hasDropdown
                  ? isStatisticsPage
                  : pathname === item.path;

                const itemTitle = t[item.titleKey] || item.title;

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
                        title={itemTitle}
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

                              const subTabTitle =
                                t[subTab.titleKey] || subTab.title;

                              return (
                                <Tab
                                  key={subTab.id}
                                  onClickHandler={() => {
                                    navigate(subTab.path);
                                    setIsStatsHovered(false);
                                  }}
                                  isActive={isSubActive}
                                  title={subTabTitle}
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
                    title={itemTitle}
                    icon={item.icon}
                    className="px-5 py-3 text-base font-bold rounded-xl"
                    activeClassName={item.activeClass}
                    inactiveClassName="text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                  />
                );
              },
            )}
          </nav>

          {/* 3. SETTINGS BUTTON */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300
                hover:text-amber-400 hover:border-slate-700 hover:bg-slate-800/80 transition-all duration-200
                flex items-center justify-center cursor-pointer shadow-inner active:scale-95"
              title="Settings"
            >
              <SettingsIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Render Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};

export default Header;
