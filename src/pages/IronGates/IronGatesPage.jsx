/* eslint-disable indent */
import { useState } from "react";

import { DASHBOARD_TABS } from "../../constants/routes";
import Footer from "../../layouts/Footer/Footer";
import Header from "./components/Dashboard/Header";
// import IntroSequence from "./IntroSequence";
import DashboardModule from "./modules/DashboardModule";
import GvGModule from "./modules/GvGModule";
import IGAnalyticsModule from "./modules/IGAnalyticsModule";
import MemberModule from "./modules/MembersModule";
import DashboardNav from "./tabs/DashboardTabs";

const IronGatesPage = () => {
  const [activeTab, setActiveTab] = useState(DASHBOARD_TABS.SUMMARY);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  // const [showIntro, setShowIntro] = useState(true);

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
      case DASHBOARD_TABS.ACTIVITY:
        return <IGAnalyticsModule />;
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

  // if (showIntro) {
  //   return <IntroSequence onFinish={() => setShowIntro(false)} />;
  // }

  return (
    <>
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
      <Footer />
    </>
  );
};

export default IronGatesPage;
