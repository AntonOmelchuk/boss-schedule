import { useState } from "react";

import { DASHBOARD_TABS } from "../../utils/constants";
import Tabs from "./components/Tabs";
import AllianceStats from "./pages/AllianceStats/AllianceStats";

const StatsDashboard = () => {
  const [activeTab, setActiveTab] = useState(DASHBOARD_TABS.ATTENDANCE);

  return (
    <div className="min-h-screen text-slate-100 p-6 flex flex-col gap-6">
      {/* Navigation Tabs */}
      <Tabs setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* Dynamic Content */}
      <main className="w-full">
        {activeTab === DASHBOARD_TABS.ATTENDANCE && <AllianceStats />}
        {activeTab === DASHBOARD_TABS.EPICS && <div></div>}
      </main>
    </div>
  );
};

export default StatsDashboard;
