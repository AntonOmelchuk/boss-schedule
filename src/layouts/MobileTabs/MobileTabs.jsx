import { useLocation, useNavigate } from "react-router-dom";

import Tab from "../../components/UI/Tab";
import { NAV_CONFIG } from "../../utils/routes";

const MobileTabs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isStatisticsPage = pathname === "/statistics";

  if (isStatisticsPage) {
    return null;
  }

  return (
    <div className="sticky bottom-0 z-90 flex items-center bg-slate-900 justify-around border-t border-slate-800 p-2">
      {NAV_CONFIG.filter((item) => !item.hideOnMobile).map((item) => (
        <Tab
          key={item.id}
          onClickHandler={() => navigate(item.path)}
          isActive={
            item.hasDropdown ? isStatisticsPage : pathname === item.path
          }
          title={item.title}
          icon={<span className="text-base">{item.icon}</span>}
          className="flex-col gap-1 text-[11px] font-bold px-3"
          activeClassName={item.mobileActiveClass}
          inactiveClassName="text-slate-500"
        />
      ))}
    </div>
  );
};

export default MobileTabs;
