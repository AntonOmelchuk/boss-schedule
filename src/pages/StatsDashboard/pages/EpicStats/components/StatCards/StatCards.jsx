import { useShallow } from "zustand/shallow";

import useAppStore from "../../../../../../store/useAppStore";
import Card from "./Card";
import Header from "./Header";

const StatCards = () => {
  const { isLoading, summary, unassigned_loot } = useAppStore(
    useShallow((state) => ({
      summary: state.epicData?.summary,
      unassigned_loot: state.epicData?.unassigned_loot,
      isLoading: state.isLoading,
    })),
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!summary || !unassigned_loot) return null;

  const { total_farmed, total_shared, unassigned_count } = summary || {};

  return (
    <div
      className="bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-2xl
        p-6 shadow-xl flex flex-col gap-6"
    >
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Total Epics Farmed" value={total_farmed} />
        <Card title="Shared to CPs" value={total_shared} />

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 relative overflow-hidden">
          <span className="text-xs text-amber-300 uppercase font-semibold">
            In Treasury (Awaiting Share)
          </span>
          <div className="text-3xl font-extrabold text-amber-400 mt-1">
            {unassigned_count}
          </div>
          {unassigned_loot.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {unassigned_loot.map((item, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20
                 text-amber-300 border border-amber-500/30"
                >
                  {item.epic_name} ({item.farm_date})
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCards;
