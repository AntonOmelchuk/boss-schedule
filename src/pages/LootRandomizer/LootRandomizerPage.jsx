import PageBadgeTitle from "../../components/UI/PageBadgeTitle";
import useTranslation from "../../hooks/useTranslation";
import { useLootStore } from "../../store/useLootStore";
import LootBuilder from "./components/LootBuilder";
import LootResults from "./components/LootResults";
import PartySelector from "./components/PartySelector";
import SimplePartyRandomizer from "./components/SimplePartyRandomizer";

const LootRandomizerPage = () => {
  const { t } = useTranslation();
  const { runLootDistribution, isRolling } = useLootStore();
  return (
    <div className="min-h-screen pb-16 space-y-6 py-4">
      <PageBadgeTitle
        badgeText={t.navLoot}
        title={t.loot.title}
        subTitle={t.loot.subtitle}
        bgColor="bg-amber-500"
      />

      <PartySelector />

      <div className="hidden xl:block space-y-6">
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

      <div className="xl:hidden space-y-4">
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
          {t.loot.mobileModeNotice}
        </div>
        <SimplePartyRandomizer />
      </div>
    </div>
  );
};

export default LootRandomizerPage;
