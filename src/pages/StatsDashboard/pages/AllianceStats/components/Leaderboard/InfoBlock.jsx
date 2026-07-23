import InfoIcon from "../../../../../../components/InfoIcon/InfoIcon";
import { SORT } from "../../../../../../utils/constants";

const InfoBlock = ({ viewMode }) => {
  return (
    <div className="relative group cursor-pointer">
      <InfoIcon />
      <div
        className="absolute right-0 top-8 w-72 z-20 bg-slate-950 border border-slate-700 p-3
          rounded-xl shadow-2xl text-xs text-slate-300 opacity-0 invisible group-hover:opacity-100
          group-hover:visible transition-all duration-200 pointer-events-none"
      >
        {viewMode === SORT.POINTS ? (
          <>
            <p className="text-sm font-bold text-indigo-400 mb-1">
              How Tiers Are Calculated:
            </p>
            <p className="text-sm leading-relaxed mb-2">
              Tiers based on relative ranking (percentile):
            </p>
            <ul className="space-y-1 text-[11px] text-slate-400">
              <li className="text-sm">
                <strong className="text-amber-400">S-TIER:</strong> Top 15%
                performers
              </li>
              <li className="text-sm">
                <strong className="text-sm text-indigo-300">A-TIER:</strong>{" "}
                Next 40% (15% – 55%)
              </li>
              <li className="text-sm">
                <strong className="text-sm text-slate-400">B-TIER:</strong>{" "}
                Remaining CPs (55% – 100%)
              </li>
            </ul>
          </>
        ) : (
          <>
            <p className="text-sm font-bold text-amber-400 mb-1">
              Priority Queue:
            </p>
            <p className="text-sm leading-relaxed text-slate-400">
              Sorted by GB/PTs ratio from lowest to highest. CPs at the top have
              accumulated the most points relative to received epics, making
              them top priority for the next drop.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default InfoBlock;
