import { useMemo } from "react";

import useAppStore from "../../../../../../store/useAppStore";

const CPAvgOnlineMatrix = () => {
  const rawTimeline = useAppStore(
    (state) => state.timelineData?.timeline || [],
  );

  // 1.Calculate avarage online for each CP
  const cpOnlineData = useMemo(() => {
    if (!rawTimeline.length) return { list: [], maxOnline: 0 };

    const systemKeys = ["date", "action", "event_label", "total_players"];
    const cpNames = Object.keys(rawTimeline[0]).filter(
      (key) => !systemKeys.includes(key),
    );

    const list = cpNames.map((cp) => {
      let attendedEvents = 0;
      let totalPlayersSum = 0;

      rawTimeline.forEach((entry) => {
        const count = Number(entry[cp]) || 0;
        if (count > 0) {
          attendedEvents += 1;
          totalPlayersSum += count;
        }
      });

      const avgOnline =
        attendedEvents > 0
          ? Math.round((totalPlayersSum / attendedEvents) * 10) / 10
          : 0;

      return {
        cpName: cp,
        avgOnline,
        attendedEvents,
      };
    });

    // Sort from bigger to lower
    list.sort((a, b) => b.avgOnline - a.avgOnline);

    // Find the biggest onlline to calculate % width progress bar
    const maxOnline = Math.max(...list.map((item) => item.avgOnline), 1);

    return { list, maxOnline };
  }, [rawTimeline]);

  if (!cpOnlineData.list.length) return null;

  return (
    <div
      className="bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-2xl
      p-6 shadow-xl flex flex-col gap-4 h-full min-h-0"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span>⚡️</span> CP Average Online Capacity
          </h3>
          <p className="text-xs text-slate-400">
            Average active members per event across all clan activities
          </p>
        </div>
      </div>

      {/* List of Bars */}
      <div className="h-175 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
        {cpOnlineData.list.map(({ cpName, avgOnline, attendedEvents }) => {
          // % of line fill according to the strongest CP
          const fillPercentage = Math.min(
            (avgOnline / cpOnlineData.maxOnline) * 100,
            100,
          );

          return (
            <div key={cpName} className="flex flex-col gap-1 group">
              <div className="flex justify-between items-center text-xs">
                <span
                  className="text-sm min-[1820px]:text-lg font-semibold
                 text-slate-200 group-hover:text-sky-400 transition"
                >
                  {cpName}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm min-[1820px]:text-lg text-slate-500">
                    ({attendedEvents} events)
                  </span>
                  <span className="font-mono font-bold text-sky-400 text-sm min-[1820px]:text-lg">
                    {avgOnline}{" "}
                    <span className="text-sm min-[1820px]:text-lg text-slate-400 font-normal">
                      pts/event
                    </span>
                  </span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div
                className="w-full bg-slate-950/60 rounded-full h-2.5 p-0.5 border
               border-slate-800/80 overflow-hidden"
              >
                <div
                  className="bg-linear-to-r from-sky-600 via-indigo-500 to-amber-500
                    h-full rounded-full transition-all duration-500 ease-out group-hover:brightness-125"
                  style={{ width: `${fillPercentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CPAvgOnlineMatrix;
