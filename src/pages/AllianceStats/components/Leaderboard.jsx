const Leaderboard = ({ data = [] }) => {
  // Функція для визначення Tier на основі позиції в рейтингу
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
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-4 w-full relative">
      {/* Header & Icon */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-slate-200">
          Alliance Roster
        </h3>

        {/* Info Icon with Hover Tooltip */}
        <div className="relative group cursor-pointer">
          <div
            className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-6 h-6
            rounded-full flex items-center justify-center text-xs font-serif italic font-bold transition"
          >
            i
          </div>

          {/* Hover Tooltip Box */}
          <div
            className="absolute right-0 top-8 w-72 z-20 bg-slate-950 border border-slate-700 p-3
            rounded-xl shadow-2xl text-xs text-slate-300 opacity-0 invisible group-hover:opacity-100
            group-hover:visible transition-all duration-200 pointer-events-none"
          >
            <p className="font-bold text-indigo-400 mb-1">
              How Tiers Are Calculated:
            </p>
            <p className="leading-relaxed mb-2">
              Tiers are determined dynamically based on the relative ranking
              (percentile) within the current roster:
            </p>
            <ul className="space-y-1 text-[11px] text-slate-400">
              <li>
                <strong className="text-amber-400">S-TIER:</strong> Top 15%
                performers
              </li>
              <li>
                <strong className="text-indigo-300">A-TIER:</strong> Next 40%
                (15% – 55%)
              </li>
              <li>
                <strong className="text-slate-400">B-TIER:</strong> Remaining
                CPs (55% – 100%)
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CP List */}
      <div className="max-h-150 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
        {data.map((item, index) => {
          const tier = getTier(index, data.length);
          return (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border
              border-slate-700/40 hover:bg-slate-800 transition"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-500 text-xs w-5">
                  #{index + 1}
                </span>
                <div className="text-left">
                  <span className="font-medium text-slate-200 text-sm block">
                    {item.cp_name}
                  </span>
                  <span
                    className={`inline-block text-left px-1.5 py-0.5 text-[10px] font-bold
                      rounded border mt-0.5 ${tier.color}`}
                  >
                    {tier.label}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-indigo-300 text-sm block">
                  {item.points} pts
                </span>
                <span className="text-[10px] text-slate-400">
                  {item.contribution_pct}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
