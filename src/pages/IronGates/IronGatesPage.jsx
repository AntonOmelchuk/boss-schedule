/* eslint-disable indent */
import { useState } from "react";

import { DASHBOARD_TABS } from "../../constants/routes";
import Header from "./components/Dashboard/Header";
import MagicSparks from "./components/MagicSparks";
import DashboardModule from "./modules/DashboardModule";
import MemberModule from "./modules/MembersModule";
import DashboardNav from "./tabs/DashboardTabs";

const IronGatesPage = () => {
  const [activeTab, setActiveTab] = useState(DASHBOARD_TABS.SUMMARY);

  // Функція рендеру відповідного блоку ТЗ
  const renderTabContent = () => {
    switch (activeTab) {
      case DASHBOARD_TABS.SUMMARY:
        return <DashboardModule />;
      case DASHBOARD_TABS.MEMBERS:
        return <MemberModule />;
      case DASHBOARD_TABS.ACTIVITY:
        return (
          <div className="text-slate-300">
            📈 Теплова карта та таблиця активності
          </div>
        );
      case DASHBOARD_TABS.EPIC_PRIORITY:
        return (
          <div className="text-slate-300">
            🐉 Пріоритет на епік (ALL / LOW / MID / HIGH)
          </div>
        );
      case DASHBOARD_TABS.EPIC_HISTORY:
        return (
          <div className="text-slate-300">📜 Історія отриманих епіків</div>
        );
      case DASHBOARD_TABS.GVG_SETUP:
        return <div className="text-slate-300">⚔️ Сетап GVG паті</div>;
      default:
        return null;
    }
  };
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
      <MagicSparks />
      {/* 1. Large Header according to Tech Task */}
      {activeTab === DASHBOARD_TABS.SUMMARY && <Header />}
      <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Динамічний контейнер контенту вибраного розділу */}
      <div className="transition-all duration-300">{renderTabContent()}</div>
    </div>
  );
};

export default IronGatesPage;
