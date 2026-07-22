import { useState } from "react";

import { DASHBOARD_TABS } from "../../utils/constants";
import Tabs from "./components/Tabs";
import AllianceStats from "./pages/AllianceStats/AllianceStats";
import EpicStats from "./pages/EpicStats/EpicStats";

const StatsDashboard = () => {
  const [activeTab, setActiveTab] = useState(DASHBOARD_TABS.ATTENDANCE);

  return (
    <div className="min-h-screen text-slate-100 p-6 flex flex-col gap-6">
      {/* Navigation Tabs */}
      <Tabs setActiveTab={setActiveTab} activeTab={activeTab} />
      <h1
        className="text-2xl md:text-3xl lg:text-4xl
          font-bold text-transparent [-webkit-text-stroke:1px_#94a3b8]
          tracking-widest px-4 text-center drop-shadow-md"
      >
        The 3rd Side Analytics
      </h1>

      {/* Dynamic Content */}
      <main className="w-full">
        {activeTab === DASHBOARD_TABS.ATTENDANCE && <AllianceStats />}
        {activeTab === DASHBOARD_TABS.EPICS && <EpicStats />}
      </main>
    </div>
  );
};

export default StatsDashboard;
