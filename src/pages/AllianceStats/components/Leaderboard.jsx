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
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 w-full">
      <h3 className="text-xl font-semibold mb-4 text-slate-200">
        Alliance Roster
      </h3>
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
                {/* Додали w-full та text-left, щоб текст і бейджі чітко вирівнювалися по лівому краю */}
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
