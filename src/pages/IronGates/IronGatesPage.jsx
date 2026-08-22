/* eslint-disable indent */
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import { DASHBOARD_TABS } from "../../constants/routes";
import Header from "./components/Dashboard/Header";
import MagicSparks from "./components/MagicSparks";
import SkyStars from "./components/SkyStars";
import DashboardModule from "./modules/DashboardModule";
import GvGModule from "./modules/GvGModule";
import MemberModule from "./modules/MembersModule";
import DashboardNav from "./tabs/DashboardTabs";

const IronGatesPage = () => {
  const [activeTab, setActiveTab] = useState(DASHBOARD_TABS.SUMMARY);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true); // Загальний стан для хедера та навбару

  const renderTabContent = () => {
    switch (activeTab) {
      case DASHBOARD_TABS.SUMMARY:
        return (
          <DashboardModule
            isHeaderVisible={isHeaderVisible}
            setIsHeaderVisible={setIsHeaderVisible}
          />
        );
      case DASHBOARD_TABS.MEMBERS:
        return <MemberModule />;
      // ... інші таби
      case DASHBOARD_TABS.GVG_SETUP:
        return (
          <GvGModule
            isGvGFullscreen={isHeaderVisible}
            setIsGvGFullscreen={setIsHeaderVisible}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden flex flex-col">
      <Toaster />
      <MagicSparks />
      <SkyStars />

      <div
        className={`transition-all duration-300 overflow-hidden ${
          !isHeaderVisible
            ? "max-h-0 opacity-0 pointer-events-none"
            : "max-h-96 opacity-100"
        }`}
      >
        <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === DASHBOARD_TABS.SUMMARY && <Header />}
      </div>

      <div className="grow transition-all duration-300 flex flex-col">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default IronGatesPage;
