import { useState } from "react";

import FilterTab from "../../../../../../components/FilterTab/FilterTab";
import useAppStore from "../../../../../../store/useAppStore";
import { SORT } from "../../../../../../utils/constants";
import CPList from "./CPList";
import InfoBlock from "./InfoBlock";

const Leaderboard = () => {
  const [viewMode, setViewMode] = useState(SORT.POINTS); // "points" | "priority"

  const pareto = useAppStore((state) => state.statsData.pareto);

  const sortedData = [...pareto].sort((a, b) => {
    if (viewMode === SORT.PRIORITY) {
      return (a.gb_pts_ratio ?? 0) - (b.gb_pts_ratio ?? 0);
    }

    return b.points - a.points;
  });

  return (
    <div className="h-full bg-slate-900/30 rounded-xl border border-slate-800 p-1 md:p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold text-slate-200">
          {viewMode === SORT.POINTS ? "Alliance Roster" : "Priority Queue"}
        </h3>

        <InfoBlock viewMode={viewMode} />
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 mb-4">
        <FilterTab
          onClickHandler={() => setViewMode(SORT.POINTS)}
          isActive={viewMode === SORT.POINTS}
          title="By Points"
          className="flex-1 text-sm"
        />
        <FilterTab
          onClickHandler={() => setViewMode(SORT.PRIORITY)}
          isActive={viewMode === SORT.PRIORITY}
          title="By GB/PTs Ratio"
          className="flex-1 text-sm"
          activeClassName="bg-amber-600 text-white shadow"
        />
      </div>

      <CPList data={sortedData} viewMode={viewMode} />
    </div>
  );
};

export default Leaderboard;
