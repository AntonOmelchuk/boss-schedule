import { useLocation, useNavigate } from "react-router-dom";

import Tab from "../../components/UI/Tab";
import { NAV_CONFIG } from "../../utils/routes";

const MobileTabs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div
      className="sticky bottom-0 z-90 pb-6 flex items-center bg-slate-900 justify-around border-t
      border-slate-800 p-2"
    >
      {NAV_CONFIG.filter((item) => !item.hideOnMobile).map(
        ({ id, path, title, icon, mobileActiveClass }) => (
          <Tab
            key={id}
            onClickHandler={() => navigate(path)}
            isActive={pathname === path}
            title={title}
            icon={<span className="text-base">{icon}</span>}
            className="flex-col gap-1 text-[11px] font-bold px-3"
            activeClassName={mobileActiveClass}
            inactiveClassName="text-slate-500"
          />
        ),
      )}
    </div>
  );
};

export default MobileTabs;
