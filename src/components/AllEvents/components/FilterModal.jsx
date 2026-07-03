import useAppStore from "../../../store/useAppStore";
import { CATEGORIES } from "../../../utils/constants";

const FilterModal = ({ isOpen, onClose, t }) => {
  const { filters, toggleFilter, toggleAllFilters } = useAppStore();

  if (!isOpen) return null;

  // Local map for categories to matching translation keys & design colors
  const categoryConfigs = [
    {
      key: CATEGORIES.Epic,
      label: t.epic,
      color: "border-amber-500/30 text-amber-400 checked:bg-amber-500",
    },
    {
      key: CATEGORIES.PVP,
      label: t.pvpEvents,
      color: "border-red-500/30 text-red-400 checked:bg-red-500",
    },
    {
      key: CATEGORIES.CH,
      label: t.ch,
      color: "border-emerald-500/30 text-emerald-400 checked:bg-emerald-500",
    },
    {
      key: CATEGORIES.Siege,
      label: t.siege,
      color: "border-blue-500/30 text-blue-400 checked:bg-blue-500",
    },
  ];

  const isAllChecked = Object.values(filters).every(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div
        className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl
        z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-3">
          <h3 className="text-lg font-black tracking-wider text-slate-200 uppercase">
            🛡️ {t.filtersTitle}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 focus:outline-none text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Checkboxes List */}
        <div className="space-y-4 mb-6">
          {categoryConfigs.map(({ key, label, color }) => (
            <label
              key={key}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800/60
                hover:border-slate-700/80 cursor-pointer select-none transition-all duration-200"
            >
              <span className="text-sm font-bold text-slate-300 tracking-wide uppercase">
                {label}
              </span>
              <input
                type="checkbox"
                checked={!!filters[key]}
                onChange={() => toggleFilter(key)}
                className={`w-5 h-5 rounded border bg-slate-900 focus:ring-0 focus:ring-offset-0 cursor-pointer
                  transition-all ${color}`}
              />
            </label>
          ))}
        </div>

        {/* Bulk Actions Footer */}
        <div className="flex gap-3 pt-2 border-t border-slate-800/60">
          <button
            onClick={() => toggleAllFilters(!isAllChecked)}
            className="flex-1 py-2 px-3 text-xs font-black tracking-widest rounded-xl border border-slate-700
             hover:border-slate-600 text-slate-300 uppercase transition-all duration-200"
          >
            {isAllChecked ? t.deselectAll : t.selectAll}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 px-3 text-xs font-black tracking-widest rounded-xl bg-amber-600 hover:bg-amber-500
             text-slate-950 uppercase transition-all duration-200"
          >
            {t.applyBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
