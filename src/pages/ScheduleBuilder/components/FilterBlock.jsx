import useFilterEvents from "../../../hooks/useFilterEvents";
import useTranslation from "../../../hooks/useTranslation";
import { CATEGORIES_STYLE } from "../../../utils/constants";

const FilterBlock = ({
  setSelectedCategories,
  setShowLocalTime,
  showLocalTime,
  deletedEventIds,
  setDeletedEventIds,
}) => {
  const { t } = useTranslation();
  const { toggleFilter, filters } = useFilterEvents();

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between gap-4">
      <div>
        <h3 className="text-sm font-black tracking-widest text-slate-400 uppercase mb-3">
          {t.sbControlPanel}
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.keys(CATEGORIES_STYLE).map((cat) => {
            const isActive = filters[cat];
            return (
              <button
                key={cat}
                onClick={() =>
                  setSelectedCategories(
                    (prev) =>
                      isActive ? prev.filter((c) => c !== cat) : [...prev, cat],
                    toggleFilter(cat),
                  )
                }
                className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wider
                  transition-allcursor-pointer
                    ${isActive ? CATEGORIES_STYLE[cat] : "border-slate-800/60 text-slate-500"}`}
              >
                {t[cat]} {isActive ? "✓" : "✗"}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowLocalTime(!showLocalTime)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-black uppercase cursor-pointer
              ${showLocalTime ? "border-indigo-500/30 bg-indigo-500/10" : "text-slate-500"}`}
          >
            {showLocalTime ? t.sbLocalTimeOn : t.sbLocalTimeOff}
          </button>
          {deletedEventIds.length > 0 && (
            <button
              onClick={() => setDeletedEventIds([])}
              className="px-4 py-2.5 rounded-xl border border-red-500/30 text-red-400 bg-red-500/10 text-xs
                font-black uppercase cursor-pointer"
            >
              {t.sbResetHidden} ({deletedEventIds.length})
            </button>
          )}
        </div>
      </div>
      <p className="text-[10px] font-mono text-slate-500 uppercase">
        {t.sbInstruction}
      </p>
    </div>
  );
};

export default FilterBlock;
