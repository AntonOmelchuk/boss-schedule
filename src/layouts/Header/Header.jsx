import Switch from "../../components/UI/Switch";
import Tab from "../../components/UI/Tab";
import useTranslation from "../../hooks/useTranslation";
import { LANGUAGES, NAV_ITEMS } from "../../utils/constants";
import BrandLogo from "./BrandLogo";

const NAV_CONFIG = [
  {
    id: NAV_ITEMS.RESPAWN,
    title: "Respawn",
    icon: "⚔️",
    activeClass:
      "bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
    mobileActiveClass: "text-amber-400",
  },
  {
    id: NAV_ITEMS.SCHEDULE,
    title: "Schedule",
    icon: "📅",
    activeClass:
      "bg-sky-500/20 text-sky-400 border border-sky-500/30 shadow-[0_0_12px_rgba(14,165,233,0.2)]",
    mobileActiveClass: "text-sky-400",
    hideOnMobile: true,
  },
  {
    id: NAV_ITEMS.STATISTICS,
    title: "Statistics",
    mobileTitle: "Stats",
    icon: "📊",
    activeClass:
      "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.2)]",
    mobileActiveClass: "text-indigo-400",
  },
];

const Header = ({ activeNav, setActiveNav }) => {
  const { language, setLanguage } = useTranslation();

  return (
    <header className="w-full border-b border-slate-800/80 bg-slate-950/10 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* 1. BRAND / LOGO */}
        <BrandLogo />
        {/* 2. NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 border border-slate-800 rounded-2xl">
          {NAV_CONFIG.map((item) => (
            <Tab
              key={item.id}
              onClickHandler={() => setActiveNav(item.id)}
              isActive={activeNav === item.id}
              title={item.title}
              icon={item.icon}
              className="px-4 py-2 text-xs font-bold rounded-xl"
              activeClassName={item.activeClass}
              inactiveClassName="text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            />
          ))}
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

      {/* 4. MOBILE NAVIGATION BAR (Знизу для мобілок) */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800 bg-slate-950/10">
        {NAV_CONFIG.filter((item) => !item.hideOnMobile).map((item) => (
          <Tab
            key={item.id}
            onClickHandler={() => setActiveNav(item.id)}
            isActive={activeNav === item.id}
            title={item.mobileTitle || item.title}
            icon={<span className="text-base">{item.icon}</span>}
            className="flex-col gap-1 text-[11px] font-bold px-3 py-1"
            activeClassName={item.mobileActiveClass}
            inactiveClassName="text-slate-500"
          />
        ))}
      </div>
    </header>
  );
};

export default Header;
