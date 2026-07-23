import { SORT } from "../../../../../../utils/constants";
import CPNameItem from "../CPNameItem/CPNameItem";

const CPList = ({ data, viewMode }) => {
  const getTier = (index, total) => {
    if (total === 0)
      return { label: "B", color: "text-slate-400 bg-slate-800" };
    const ratio = index / total;
    if (ratio <= 0.15)
      return {
        label: "S-TIER",
        color: "text-amber-400 bg-amber-950/40 border-amber-800/50",
      };
    if (ratio <= 0.55)
      return {
        label: "A-TIER",
        color: "text-indigo-300 bg-indigo-950/40 border-indigo-800/50",
      };
    return {
      label: "B-TIER",
      color: "text-slate-400 bg-slate-900 border-slate-800",
    };
  };

  return (
    <div className="h-175 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
      {data.map(
        ({ cp_name, points, contribution_pct, gb_pts_ratio }, index) => {
          const tier = getTier(index, data.length);
          return (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border
              border-slate-700/40 hover:bg-slate-800 transition"
            >
              <div className="flex  flexitems-center gap-3">
                <CPNameItem cpName={cp_name} index={index} />
                {viewMode === SORT.POINTS && (
                  <div
                    className={`flex self-wrap text-left px-1.5 py-0.5 text-[10px] font-bold
                  rounded border mt-0.5 ${tier.color}`}
                  >
                    {tier.label}
                  </div>
                )}
              </div>

              <div className="text-right">
                {viewMode === SORT.POINTS ? (
                  <>
                    <span className="font-bold text-indigo-300 text-lg block">
                      {points} pts
                    </span>
                    <span className="text-sm text-slate-400">
                      {contribution_pct}%
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-bold text-amber-300 text-sm block">
                      {gb_pts_ratio ?? 0} ratio
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {points} pts total
                    </span>
                  </>
                )}
              </div>
            </div>
          );
        },
      )}
    </div>
  );
};

export default CPList;
