import { DASHBOARD_TABS } from "../../../utils/constants";
import Tab from "./Tab";

const Tabs = ({ setActiveTab, activeTab }) => {
  return (
    <div className="hidden md:flex items-center gap-2 border-b border-slate-800 pb-3">
      <Tab
        onClickHandler={() => setActiveTab(DASHBOARD_TABS.ATTENDANCE)}
        isActive={activeTab === DASHBOARD_TABS.ATTENDANCE}
        title="📊 Attendance Analytics"
      />
      <Tab
        onClickHandler={() => setActiveTab(DASHBOARD_TABS.EPICS)}
        isActive={activeTab === DASHBOARD_TABS.EPICS}
        title="💎 Epic Treasury & Loot"
      />
    </div>
  );
};

export default Tabs;
