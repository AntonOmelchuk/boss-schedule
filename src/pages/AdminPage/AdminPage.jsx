import { useMemo, useState } from "react";

import { ROLES } from "../../constants/roles";
import { ADMIN_TAB_KEYS } from "../../constants/routes";
import useTranslation from "../../hooks/useTranslation";
import useAuthStore from "../../store/useAuthStore";
import TabButton from "./components/TabButton";
import CpManagementModule from "./modules/CpManagementModule";
import HoldingsModule from "./modules/HoldingsModule";
import PrimeTimeModule from "./modules/PrimeTimeModule";
import ProofCheckerModule from "./modules/ProofCheckerModule";
import RespawnModule from "./modules/RespawnModule";
import SystemStatusModule from "./modules/SystemStatusModule";
import UsersModule from "./modules/UsersModule";

const ADMIN_TABS = [
  {
    key: ADMIN_TAB_KEYS.PROOF,
    labelKey: "tabProof",
    icon: "📸",
    component: ProofCheckerModule,
    allowedRoles: [
      ROLES.ADMIN,
      ROLES.CO_ADMIN,
      ROLES.ALLY_HEAD,
      ROLES.RAID_CALLER,
      ROLES.ALLY_GENERAL,
    ],
  },
  {
    key: ADMIN_TAB_KEYS.TIMERS,
    labelKey: "tabTimers",
    icon: "⏳",
    component: RespawnModule,
    allowedRoles: [ROLES.ADMIN, ROLES.CO_ADMIN],
  },
  {
    key: "HOLDINGS",
    labelKey: "tabHoldings",
    icon: "🏰",
    component: HoldingsModule,
    allowedRoles: [ROLES.ADMIN, ROLES.CO_ADMIN],
  },
  {
    key: "PRIME_TIME",
    labelKey: "tabPrimeTime",
    icon: "⏰",
    component: PrimeTimeModule,
    allowedRoles: [ROLES.ADMIN, ROLES.CO_ADMIN],
  },
  {
    key: ADMIN_TAB_KEYS.USERS,
    labelKey: "tabUsers",
    icon: "👥",
    component: UsersModule,
    allowedRoles: [
      ROLES.ADMIN,
      ROLES.CO_ADMIN,
      ROLES.ALLY_HEAD,
      ROLES.ALLY_GENERAL,
    ],
  },
  {
    key: ADMIN_TAB_KEYS.CPS,
    labelKey: "tabCps",
    icon: "🏰",
    component: CpManagementModule,
    allowedRoles: [
      ROLES.ADMIN,
      ROLES.CO_ADMIN,
      ROLES.ALLY_HEAD,
      ROLES.ALLY_GENERAL,
    ],
  },
  {
    key: ADMIN_TAB_KEYS.SYSTEM,
    labelKey: "tabSystem",
    icon: "🚨",
    component: SystemStatusModule,
    allowedRoles: [ROLES.ADMIN],
  },
];

const AdminPage = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  // 1. Filter only allowed tabs for role
  const availableTabs = useMemo(() => {
    if (!user?.role) return [];
    return ADMIN_TABS.filter((tab) => tab.allowedRoles.includes(user.role));
  }, [user?.role]);

  // 2. Default tab — 1st from available
  const [activeTabKey, setActiveTabKey] = useState(
    () => availableTabs[0]?.key || "",
  );

  // 3. Find current active tab
  const currentTab =
    availableTabs.find((tab) => tab.key === activeTabKey) || availableTabs[0];
  const ActiveComponent = currentTab?.component;

  if (availableTabs.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-slate-400">
        🔒 {t.admin.noAccess}
      </div>
    );
  }

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
        {availableTabs.map((tab) => (
          <TabButton
            key={tab.key}
            active={activeTabKey === tab.key}
            onClick={() => setActiveTabKey(tab.key)}
            icon={tab.icon}
            label={t.admin[tab.labelKey] || "Holdings"}
          />
        ))}
      </div>

      {/* Active Tab Module Content */}
      <div className="animate-fadeIn">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default AdminPage;
