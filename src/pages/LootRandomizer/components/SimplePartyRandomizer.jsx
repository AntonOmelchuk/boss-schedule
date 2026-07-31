import useTranslation from "../../../hooks/useTranslation";
import { useLootStore } from "../../../store/useLootStore";

const SimplePartyRandomizer = () => {
  const { t } = useTranslation();
  const { shuffledParties, shuffleParties, isRolling } = useLootStore();

  return (
    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider">
          🔀 {t.loot.simpleRandomizerBtn}
        </h3>
        <button
          onClick={shuffleParties}
          disabled={isRolling}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs
            transition-all cursor-pointer shadow-md shadow-amber-500/20 disabled:opacity-50"
        >
          {isRolling ? "⏳..." : t.loot.simpleRandomizerBtn}
        </button>
      </div>

      {shuffledParties.length > 0 && (
        <div className="space-y-2">
          <span className="text-sm text-slate-400 font-semibold">
            {t.loot?.randomQueueTitle || "Random party order:"}
          </span>

          <div className="columns-2 md:columns-3 xl:columns-6 gap-2 space-y-2">
            {shuffledParties.map((party, index) => (
              <div
                key={party.id}
                className="break-inside-avoid flex items-center justify-start p-2 rounded-xl bg-slate-950 border
                  border-slate-800"
              >
                <span className="font-bold text-amber-400 text-sm mr-2">
                  #{index + 1}
                </span>
                <span className="font-bold text-slate-200 text-xs text-left truncate">
                  {party.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimplePartyRandomizer;
