import { useMemo } from "react";
import { useShallow } from "zustand/shallow";

import useAppStore from "../../../../../../store/useAppStore";
import Card from "./Card";
import GroupedCard from "./GroupedCard";
import Header from "./Header";

const StatCards = () => {
  const { summary, unassigned_loot } = useAppStore(
    useShallow((state) => ({
      summary: state.epicData?.summary,
      unassigned_loot: state.epicData?.unassigned_loot,
      isLoading: state.isLoading,
    })),
  );

  // Count same epic
  const groupedLoot = useMemo(() => {
    if (!unassigned_loot || unassigned_loot.length === 0) return [];

    const map = new Map();

    unassigned_loot.forEach((item) => {
      const name = item.epic_name;
      if (!map.has(name)) {
        map.set(name, { name, count: 0 });
      }
      map.get(name).count += 1;
    });

    return Array.from(map.values());
  }, [unassigned_loot]);

  if (!summary || !unassigned_loot) return null;

  const { total_farmed, total_shared, unassigned_count } = summary || {};

  return (
    <div
      className="bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-2xl
        p-2 md:p-4 xl:p-6 shadow-xl flex flex-col gap-6"
    >
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4">
        <Card title="Total Epics Farmed" value={total_farmed} />
        <Card title="Shared to CPs" value={total_shared} />

        {/* Treasury Card */}
        <div
          className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 relative overflow-hidden
          flex flex-col justify-between"
        >
          <div>
            <span className="text-base text-amber-300 uppercase font-semibold">
              In Treasury (Awaiting Share)
            </span>
            <div className="text-3xl font-extrabold text-amber-400 mt-1">
              {unassigned_count}
            </div>
          </div>

          {groupedLoot.length > 0 && <GroupedCard groupedLoot={groupedLoot} />}
        </div>
      </div>
    </div>
  );
};

export default StatCards;
