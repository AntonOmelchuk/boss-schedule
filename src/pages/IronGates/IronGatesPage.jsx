/* eslint-disable indent */
import { useEffect, useState } from "react";
import { useRef } from "react";

import { STORAGE_URL } from "../../constants/members";
import { DASHBOARD_TABS } from "../../constants/routes";
import Footer from "../../layouts/Footer/Footer";
import Header from "./components/Dashboard/Header";
import IntroSequence from "./IntroSequence";
import DashboardModule from "./modules/DashboardModule";
import GvGModule from "./modules/GvGModule";
import IGAnalyticsModule from "./modules/IGAnalyticsModule";
import MemberModule from "./modules/MembersModule";
import DashboardNav from "./tabs/DashboardTabs";

const IronGatesPage = () => {
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    const validTabs = Object.values(DASHBOARD_TABS);
    return validTabs.includes(hash) ? hash : DASHBOARD_TABS.SUMMARY;
  });

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  const audioRef = useRef(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  useEffect(() => {
    audioRef.current = new Audio(`${STORAGE_URL}/audio/intro.mp3`);
    audioRef.current.loop = false;
    audioRef.current.volume = 0.72;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const validTabs = Object.values(DASHBOARD_TABS);
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleIntroFinish = () => {
    setShowIntro(false);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

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

  if (showIntro) {
    return <IntroSequence onFinish={() => handleIntroFinish()} />;
  }

  return (
    <>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          !isHeaderVisible
            ? "max-h-0 opacity-0 pointer-events-none"
            : "max-h-96 opacity-100"
        }`}
      >
        <DashboardNav activeTab={activeTab} onTabChange={handleTabChange} />
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
