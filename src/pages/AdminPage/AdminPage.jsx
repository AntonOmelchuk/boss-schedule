import { useState } from "react";

import { ROLES } from "../../constants/roles";
import useTranslation from "../../hooks/useTranslation";
import useAuthStore from "../../store/useAuthStore";
import TabButton from "./components/TabButton";
import CpManagementModule from "./modules/CpManagementModule";
import ProofCheckerModule from "./modules/ProofCheckerModule";
import SystemStatusModule from "./modules/SystemStatusModule";
import UsersModule from "./modules/UsersModule";

const TAB_KEYS = {
  PROOF: "proof",
  USERS: "users",
  CPS: "cps",
  TIMERS: "timers",
  SYSTEM: "system",
};

const AdminPage = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState(TAB_KEYS.PROOF);

  const isAdmin = user?.role === ROLES.ADMIN;
  const isOfficer = user?.role === ROLES.OFFICER || isAdmin;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Bar */}
      <div
        className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center
        justify-between gap-4 shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-2xl">
            🛡️
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              {t.admin.title}
              <span
                className="px-2 py-0.5 text-[10px] bg-amber-500/20 border border-amber-500/30 text-amber-400
                rounded-md font-mono uppercase"
              >
                {user?.role}
              </span>
            </h1>
            <p className="text-xs text-slate-400">{t.admin.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-2 scrollbar-none">
        {isOfficer && (
          <TabButton
            active={activeTab === TAB_KEYS.PROOF}
            onClick={() => setActiveTab(TAB_KEYS.PROOF)}
            icon="📸"
            label={t.admin.tabProof}
          />
        )}

        {isOfficer && (
          <TabButton
            active={activeTab === TAB_KEYS.USERS}
            onClick={() => setActiveTab(TAB_KEYS.USERS)}
            icon="👥"
            label={t.admin.tabUsers}
          />
        )}

        {isOfficer && (
          <TabButton
            active={activeTab === TAB_KEYS.CPS}
            onClick={() => setActiveTab(TAB_KEYS.CPS)}
            icon="🏰"
            label={t.admin.tabCps}
          />
        )}

        {isAdmin && (
          <TabButton
            active={activeTab === TAB_KEYS.SYSTEM}
            onClick={() => setActiveTab(TAB_KEYS.SYSTEM)}
            icon="🚨"
            label={t.admin.tabSystem}
          />
        )}
      </div>

      {/* Active Tab Module Content */}
      <div className="animate-fadeIn">
        {activeTab === TAB_KEYS.PROOF && <ProofCheckerModule />}
        {activeTab === TAB_KEYS.USERS && <UsersModule />}
        {activeTab === TAB_KEYS.CPS && <CpManagementModule />}
        {activeTab === TAB_KEYS.SYSTEM && <SystemStatusModule />}
      </div>
    </div>
  );
};

export default AdminPage;
