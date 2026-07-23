import { useState } from "react";

import TitleWithWatermark from "../../components/TitleWithWatermark/TitleWithWatermark";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { BREAKPOINTS, DASHBOARD_TABS } from "../../utils/constants";
import Tabs from "./components/Tabs";
import AllianceStats from "./pages/AllianceStats/AllianceStats";
import EpicStats from "./pages/EpicStats/EpicStats";

const StatsDashboard = () => {
  const [activeTab, setActiveTab] = useState(DASHBOARD_TABS.ATTENDANCE);
  const isMobile = useMediaQuery(BREAKPOINTS.IS_MOBILE);

  return (
    <div className="min-h-screen text-slate-100 md:p-6 flex flex-col gap-6">
      {/* Navigation Tabs */}
      <Tabs setActiveTab={setActiveTab} activeTab={activeTab} />
      <TitleWithWatermark
        title="The 3rd Side Analytics"
        size={isMobile ? "sm" : "xl"}
        className=""
      />
      {/* Dynamic Content */}
      <main className="w-full">
        {activeTab === DASHBOARD_TABS.ATTENDANCE && <AllianceStats />}
        {activeTab === DASHBOARD_TABS.EPICS && <EpicStats />}
      </main>
    </div>
  );
};

export default StatsDashboard;
