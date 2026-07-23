import { DASHBOARD_TABS } from "../../../utils/constants";
import TabItem from "./TabItem";

const TAB_OPTIONS = [
  { id: DASHBOARD_TABS.ATTENDANCE, label: "📊 Attendance Analytics" },
  { id: DASHBOARD_TABS.EPICS, label: "💎 Epic Treasury & Loot" },
];

const MobileTabDrawer = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container (Bottom Sheets) */}
      <div
        className="relative z-10 w-full bg-slate-900 border-t border-slate-800 rounded-t-3xl
        p-6 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Select Section
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center
              justify-center hover:text-slate-100"
          >
            ✕
          </button>
        </div>

        {/* Tabs List */}
        <div className="flex flex-col gap-2">
          {TAB_OPTIONS.map(({ id, label }) => {
            const isActive = activeTab === id;
            return (
              <TabItem
                key={id}
                label={label}
                onClose={onClose}
                isActive={isActive}
                setActiveTab={() => setActiveTab(id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileTabDrawer;
