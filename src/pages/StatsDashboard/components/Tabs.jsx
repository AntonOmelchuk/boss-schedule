import { useState } from "react";

import { DASHBOARD_TABS } from "../../../utils/constants";
import MobileTabDrawer from "../mobile/MobileTabDrawer";
import Tab from "./Tab";

const TAB_LABELS = {
  [DASHBOARD_TABS.ATTENDANCE]: "📊 Attendance Analytics",
  [DASHBOARD_TABS.EPICS]: "💎 Epic Treasury & Loot",
};

const Tabs = ({ setActiveTab, activeTab }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* 💻 DESKTOP TABS */}
      <div className="hidden md:flex items-center gap-2 border-b border-slate-800 pb-3">
        <Tab
          onClickHandler={() => setActiveTab(DASHBOARD_TABS.ATTENDANCE)}
          isActive={activeTab === DASHBOARD_TABS.ATTENDANCE}
          title={TAB_LABELS[DASHBOARD_TABS.ATTENDANCE]}
        />
        <Tab
          onClickHandler={() => setActiveTab(DASHBOARD_TABS.EPICS)}
          isActive={activeTab === DASHBOARD_TABS.EPICS}
          title={TAB_LABELS[DASHBOARD_TABS.EPICS]}
        />
      </div>

      {/* 📱 MOBILE / TABLET BUTTON TRIGGER (< md) */}
      <div
        className="md:hidden flex items-center justify-between bg-slate-900/60 border
       border-slate-800 p-3 rounded-2xl"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-sky-400">
            {TAB_LABELS[activeTab]}
          </span>
        </div>

        <button
          onClick={() => setIsDrawerOpen(true)}
          className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs
            font-bold text-slate-200 hover:bg-slate-700 transition flex items-center gap-1.5 cursor-pointer"
        >
          <span>📂 Switch Tab</span>
        </button>
      </div>

      {/* 📱 MOBILE DRAWER */}
      <MobileTabDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </>
  );
};

export default Tabs;
