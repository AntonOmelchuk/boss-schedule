import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useTranslation from "../../hooks/useTranslation";
import { NAV_CONFIG } from "../../utils/routes";

const MobileTabs = () => {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  const { t } = useTranslation();

  const isStatsRoute = pathname === "/statistics";
  const currentFullLocation = `${pathname}${hash}`;

  const containerRef = useRef(null);
  const tabRefs = useRef([]);

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // Filter items based on whether user is currently viewing Statistics page
  const visibleNavItems = NAV_CONFIG.filter((item) => {
    if (isStatsRoute) {
      return item.showOnlyInStatsMobile;
    }
    return !item.hideOnMobile && !item.showOnlyInStatsMobile;
  });

  // Calculate active tab index
  const activeIndex = visibleNavItems.findIndex((item) =>
    isStatsRoute
      ? currentFullLocation === item.path ||
        (item.path.endsWith("#points") && !hash)
      : pathname === item.path,
  );

  // Get active item config for dynamic styling
  const activeItem = visibleNavItems[activeIndex];

  // Recalculate indicator position cleanly
  useEffect(() => {
    const activeTab = tabRefs.current[activeIndex];

    if (activeTab) {
      const width = activeTab.offsetWidth * 0.75;
      const left = activeTab.offsetLeft + (activeTab.offsetWidth - width) / 2;

      setIndicatorStyle({ left, width });
    }
  }, [activeIndex, visibleNavItems.length]);

  const activeTabBorderStyles = `${
    activeItem.indicatorGradient || "from-amber-400 via-sky-400 to-indigo-400"
  } ${
    activeItem.indicatorShadow || "shadow-[0_-2px_8px_rgba(56,189,248,0.6)]"
  }`;

  return (
    <div
      ref={containerRef}
      className="sticky bottom-0 z-50 w-full bg-slate-950 backdrop-blur-xl border-t border-slate-800
        px-2 pt-1 pb-4 flex items-center justify-around shadow-2xl"
    >
      {/* Dynamic Sliding Bottom Border Indicator */}
      {activeIndex !== -1 && activeItem && (
        <span
          className={`absolute bottom-0 h-0.75 bg-gradient-to-r rounded-t-full transition-all
            duration-300 ease-out pointer-events-none ${activeTabBorderStyles}`}
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
          }}
        />
      )}

      {visibleNavItems.map(
        ({ id, path, titleKey, icon, title, mobileActiveClass }, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={id}
              ref={(el) => (tabRefs.current[index] = el)}
              onClick={() => navigate(path)}
              className="flex-1 h-full min-h-13 flex flex-col items-center justify-center gap-1
                py-1 px-2 cursor-pointer transition-transform duration-200 active:scale-95"
            >
              {/* Icon */}
              <span
                className={`text-lg leading-none transition-all duration-200 ${
                  isActive ? "scale-110" : "text-slate-500 opacity-70"
                }`}
              >
                {icon}
              </span>

              {/* Title Label */}
              <span
                className={`text-[11px] font-bold tracking-tight whitespace-nowrap transition-colors duration-200 ${
                  isActive
                    ? mobileActiveClass || "text-slate-100"
                    : "text-slate-500"
                }`}
              >
                {t[titleKey] || title}
              </span>
            </button>
          );
        },
      )}
    </div>
  );
};

export default MobileTabs;
