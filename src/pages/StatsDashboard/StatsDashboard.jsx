import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import TitleWithWatermark from "../../components/TitleWithWatermark/TitleWithWatermark";
import Watermark from "../../components/Watermark/Watermark";
import useMediaQuery from "../../hooks/useMediaQuery";
import { BREAKPOINTS, DASHBOARD_TABS } from "../../utils/constants";
import Tabs from "./components/Tabs";
import AllianceStats from "./pages/AllianceStats/AllianceStats";
import EpicStats from "./pages/EpicStats/EpicStats";

const StatsDashboard = () => {
  const { hash } = useLocation();
  const [activeTab, setActiveTab] = useState(DASHBOARD_TABS.ATTENDANCE);
  const isMobile = useMediaQuery(BREAKPOINTS.IS_MOBILE);

  // Tab sync with hash in URL (#points or #epic)
  useEffect(() => {
    if (hash === "#epic") {
      setActiveTab(DASHBOARD_TABS.EPICS);
    } else if (hash === "#points" || !hash) {
      setActiveTab(DASHBOARD_TABS.ATTENDANCE);
    }
  }, [hash]);

  return (
    <div className="min-h-screen text-slate-100 md:p-6 flex flex-col gap-6">
      <Tabs setActiveTab={setActiveTab} activeTab={activeTab} />
      {isMobile ? (
        <Watermark className="mx-auto" />
      ) : (
        <TitleWithWatermark
          title="The 3rd Side Analytics"
          size={isMobile ? "sm" : "xl"}
          className=""
        />
      )}
      {/* Dynamic Content */}
      <main className="w-full">
        {activeTab === DASHBOARD_TABS.ATTENDANCE && <AllianceStats />}
        {activeTab === DASHBOARD_TABS.EPICS && <EpicStats />}
      </main>
    </div>
  );
};

export default StatsDashboard;
