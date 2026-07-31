import useTranslation from "../../hooks/useTranslation";
import { useLootStore } from "../../store/useLootStore";
import LootBuilder from "./components/LootBuilder";
import LootResults from "./components/LootResults";
import PartySelector from "./components/PartySelector";
import SimplePartyRandomizer from "./components/SimplePartyRandomizer";

const LootRandomizerPage = () => {
  const { t } = useTranslation();
  const { runLootDistribution, isRolling } = useLootStore();
  console.log("t: ", t);
  return (
    <div className="min-h-screen pb-16 space-y-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span
            className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider
            bg-amber-500 text-slate-950 shadow-sm shadow-amber-900/50"
          >
            Loot
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            {t.loot.title}
          </h1>
        </div>
        <p className="text-sm text-slate-400">{t.loot.subtitle}</p>
      </div>

      <PartySelector />

      <div className="hidden sm:block space-y-6">
        <LootBuilder />

        <div className="flex justify-center">
          <button
            onClick={runLootDistribution}
            disabled={isRolling}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400
              hover:to-yellow-300 active:scale-95 text-slate-950 font-black text-base shadow-xl shadow-amber-500/20
              flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <span>🎲</span> {t.loot.runDistributionBtn}
          </button>
        </div>

        <LootResults />
      </div>

      <div className="space-y-4">
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
          {t.loot.mobileModeNotice}
        </div>
        <SimplePartyRandomizer />
      </div>
    </div>
  );
};

export default LootRandomizerPage;
