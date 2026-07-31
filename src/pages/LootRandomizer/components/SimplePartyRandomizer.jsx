import useTranslation from "../../../hooks/useTranslation";
import { useLootStore } from "../../../store/useLootStore";

const SimplePartyRandomizer = () => {
  const { t } = useTranslation();
  const { shuffledParties, shuffleParties, isRolling } = useLootStore();

  return (
    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
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
          <span className="text-xs text-slate-400 font-semibold">
            Випадкова черга КП:
          </span>
          <div className="grid grid-cols-1 gap-2">
            {shuffledParties.map((party, index) => (
              <div
                key={party.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800"
              >
                <span className="font-bold text-amber-400 text-sm">
                  #{index + 1}
                </span>
                <span className="font-bold text-slate-200">{party.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimplePartyRandomizer;
