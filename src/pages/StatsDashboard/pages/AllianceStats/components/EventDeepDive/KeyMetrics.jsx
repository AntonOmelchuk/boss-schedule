import TopCP from "./TopCP";

const KeyMetrics = ({ topCP, totalPlayers, currentEvent }) => {
  const { name, value } = topCP;

  return (
    <div className="flex flex-col gap-3 xl:col-span-3">
      <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4">
        <span className="text-xs text-slate-400 uppercase font-semibold">
          Total Event Attendance
        </span>
        <div className="text-3xl font-extrabold text-sky-400 mt-1">
          {totalPlayers}{" "}
          <span className="text-sm font-normal text-slate-400">players</span>
        </div>
      </div>

      {topCP && <TopCP name={name} value={value} totalPlayers={totalPlayers} />}

      <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4">
        <span className="text-xs text-slate-400 uppercase font-semibold">
          Event Category / Target
        </span>
        <div className="text-base font-semibold text-amber-400 mt-1 capitalize">
          {currentEvent.action || "N/A"}
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;
