const COLOR_PALETTE = [
  "#38bdf8",
  "#34d399",
  "#fbbf24",
  "#f43f5e",
  "#a855f7",
  "#e879f9",
  "#f97316",
  "#22d3ee",
  "#a3e635",
  "#f472b6",
  "#818cf8",
  "#10b981",
  "#fb7185",
  "#c084fc",
  "#facc15",
];

const CPList = ({ cpBreakdown, totalPlayers }) => {
  return (
    <div className="flex flex-col gap-1.5 xl:col-span-2 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
      <span
        className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1
          sticky top-0 bg-slate-900/90 py-1 z-10"
      >
        Party Breakdown ({cpBreakdown.length} CPs present):
      </span>
      {cpBreakdown.map((cp, idx) => (
        <div
          key={cp.name}
          className="flex items-center justify-between p-2 rounded-lg bg-slate-800/30 border
         border-slate-800/60 text-xs"
        >
          <div className="flex items-center gap-2 truncate pr-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{
                backgroundColor: COLOR_PALETTE[idx % COLOR_PALETTE.length],
              }}
            />
            <span className="font-medium text-slate-200 truncate">
              {cp.name}
            </span>
          </div>
          <div className="font-bold text-slate-100 shrink-0">
            {cp.value}{" "}
            <span className="text-slate-500 font-normal">
              ({Math.round((cp.value / totalPlayers) * 100)}%)
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CPList;
