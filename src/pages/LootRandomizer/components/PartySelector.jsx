import useTranslation from "../../../hooks/useTranslation";
import { useLootStore } from "../../../store/useLootStore";

const PartySelector = () => {
  const { t } = useTranslation();
  const { parties, togglePartyActive, selectAllParties } = useLootStore();

  const activeCount = parties.filter((p) => p.active).length;

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <span>👥</span> {t.loot.partiesTitle} ({activeCount}/{parties.length})
        </h3>
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => selectAllParties(true)}
            className="text-amber-400 hover:underline cursor-pointer font-semibold"
          >
            {t.loot.selectAll}
          </button>
          <span className="text-slate-600">•</span>
          <button
            onClick={() => selectAllParties(false)}
            className="text-slate-400 hover:underline cursor-pointer"
          >
            {t.loot.deselectAll}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {parties.map(({ id, active, name }) => {
          const activeStyles = active
            ? "bg-amber-500/10 border-amber-500/40 text-amber-300"
            : "bg-slate-950/40 border-slate-800/80 text-slate-500 opacity-60 hover:opacity-100";
          return (
            <label
              key={id}
              className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer
              select-none text-xs font-semibold ${activeStyles}`}
            >
              <input
                type="checkbox"
                checked={active}
                onChange={() => togglePartyActive(id)}
                className="w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-500/20
                bg-slate-900 cursor-pointer"
              />
              <span className="truncate">{name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default PartySelector;
