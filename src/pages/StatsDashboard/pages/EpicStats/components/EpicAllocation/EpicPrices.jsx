import InfoIcon from "../../../../../../components/InfoIcon/InfoIcon";
import { EPIC_COLORS } from "../../../../../../constants/general";

const EpicPrices = ({ epicPrices, isPricesHovered, setIsPricesHovered }) => {
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPricesHovered(true)}
      onMouseLeave={() => setIsPricesHovered(false)}
    >
      <div
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold
              bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600
              text-slate-300 hover:text-amber-400 transition-all shadow-sm cursor-help group"
      >
        <span className="text-base group-hover:scale-110 transition-transform">
          💎
        </span>
        <span className="text-xs xl:text-sm">Epic Prices (GB)</span>
        <InfoIcon />
      </div>

      {/* TOOLTIP POPUP */}
      {isPricesHovered && (
        <div
          className="absolute right-0 top-full mt-2 w-64 z-50 pointer-events-none animate-in fade-in zoom-in-95
          duration-100"
        >
          <div
            className="bg-slate-900/95 border border-slate-800 rounded-2xl p-3.5 shadow-2xl backdrop-blur-xl
            flex flex-col gap-2.5"
          >
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-base">🏆</span>
              <h4 className="text-xs font-bold text-slate-200">
                Epic Boss Values
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {Object.entries(epicPrices).map(([epic, price]) => (
                <div
                  key={epic}
                  className="flex items-center justify-between p-1.5 px-2.5 rounded-lg bg-slate-800/40
                    border border-slate-800/60"
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: EPIC_COLORS[epic] || "#94a3b8",
                      }}
                    />
                    <span className="text-xs font-medium text-slate-300">
                      {epic}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-400">
                    {price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EpicPrices;
