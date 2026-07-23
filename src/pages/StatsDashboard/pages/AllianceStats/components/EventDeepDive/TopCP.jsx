const TopCP = ({ name, value, totalPlayers }) => {
  return (
    <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4">
      <span className="text-xs text-slate-400 uppercase font-semibold">
        Top Contributor (MVP CP)
      </span>
      <div className="text-lg font-bold text-emerald-400 mt-1 flex items-center justify-between gap-2">
        <span className="truncate">{name}</span>
        <span
          className="text-xs bg-emerald-500/10 text-emerald-400 border
                  border-emerald-500/20 px-2 py-1 rounded-lg shrink-0"
        >
          {value} pl. ({Math.round((value / totalPlayers) * 100)}%)
        </span>
      </div>
    </div>
  );
};

export default TopCP;
