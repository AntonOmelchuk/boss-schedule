import { useEffect, useState } from "react";

import useCpIgnoreList from "../../../hooks/useCPIgnoreList";
import useTranslation from "../../../hooks/useTranslation";
import { useLootStore } from "../../../store/useLootStore";

const PartySelector = () => {
  const { t } = useTranslation();
  const { ignoreList, loading } = useCpIgnoreList();
  const [isOpen, setIsOpen] = useState(false);

  const {
    parties,
    isLoadingParties,
    partiesError,
    fetchParties,
    togglePartyActive,
    selectAllParties,
  } = useLootStore();

  useEffect(() => {
    fetchParties();
  }, [fetchParties]);

  if (isLoadingParties || loading) {
    return (
      <div className="flex justify-center">
        <div
          className="w-100 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center text-base text-amber-400
          font-bold animate-pulse"
        >
          ⏳ {t.loadingPartyList}...
        </div>
      </div>
    );
  }

  if (partiesError) {
    return (
      <div className="flex justify-center">
        <div
          className="w-100 bg-red-950/30 border border-red-500/30 rounded-2xl p-4 flex justify-between items-center
          text-base text-red-400"
        >
          <span>⚠️ {partiesError}</span>
          <button
            onClick={fetchParties}
            className="px-3 py-1 bg-red-600/20 hover:bg-red-600/40 rounded-lg font-bold border border-red-500/30
              cursor-pointer"
          >
            {t.retry}
          </button>
        </div>
      </div>
    );
  }

  // Filter CPs based on ignore list
  const ignoreNames = ignoreList.map((item) =>
    typeof item === "string" ? item : item.name,
  );
  const filteredParties = parties.filter(
    ({ name }) => !ignoreNames.includes(name),
  );
  const activeCount = filteredParties.filter((p) => p.active).length;

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 transition-all">
      {/* HEADER WITH TOGGLE DROPDOWN */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 text-sm font-bold text-slate-200 uppercase tracking-wider
            hover:text-amber-400 transition-colors cursor-pointer select-none"
        >
          <span>👥</span>
          <span>
            {t.loot.partiesTitle} ({activeCount}/{filteredParties.length})
          </span>
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* SELECT ALL / DESELECT ALL BUTTONS */}
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

      {/* DROPDOWN CONTENT */}
      {isOpen && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1 border-t border-slate-800/60">
          {filteredParties.map(({ id, active, name }) => {
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
      )}
    </div>
  );
};

export default PartySelector;
