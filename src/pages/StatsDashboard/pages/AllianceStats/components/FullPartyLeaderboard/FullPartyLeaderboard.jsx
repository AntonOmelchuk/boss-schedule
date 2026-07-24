import { useMemo } from "react";

import useAppStore from "../../../../../../store/useAppStore";
import CPNameItem from "../CPNameItem/CPNameItem";
import HeaderList from "../HeaderList/HeaderList";

const FullPartyLeaderboard = () => {
  const rawTimeline = useAppStore(
    (state) => state.timelineData?.timeline || [],
  );

  const { cpFullPartyList, topCP, maxFullParties } = useMemo(() => {
    if (!rawTimeline.length) {
      return { cpFullPartyList: [], topCP: null, maxFullParties: 0 };
    }

    const systemKeys = ["date", "action", "event_label", "total_players"];
    const cpNames = Object.keys(rawTimeline[0]).filter(
      (key) => !systemKeys.includes(key),
    );

    const stats = cpNames.map((cp) => {
      let totalAttended = 0;
      let fullPartyCount = 0;

      rawTimeline.forEach((entry) => {
        const count = Number(entry[cp]) || 0;
        if (count > 0) {
          totalAttended += 1;
        }
        if (count >= 9) {
          fullPartyCount += 1;
        }
      });

      // Event percent when CP was full (9/9)
      const fullPartyRate =
        totalAttended > 0
          ? Math.round((fullPartyCount / totalAttended) * 100)
          : 0;

      return {
        cpName: cp,
        fullPartyCount,
        totalAttended,
        fullPartyRate,
      };
    });

    // Sort: Full pt amout || Full Party Rate (%) = (events amount with Full PT / events amount) x 100
    stats.sort(
      (a, b) =>
        b.fullPartyCount - a.fullPartyCount ||
        b.fullPartyRate - a.fullPartyRate,
    );

    const maxFP = Math.max(...stats.map((s) => s.fullPartyCount), 1);
    const leader = stats[0] && stats[0].fullPartyCount > 0 ? stats[0] : null;

    return {
      cpFullPartyList: stats,
      topCP: leader,
      maxFullParties: maxFP,
    };
  }, [rawTimeline]);

  if (!cpFullPartyList.length) return null;

  return (
    <div
      className="bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-2xl
      p-1 md:p-6 shadow-xl flex flex-col gap-5 h-full"
    >
      {/* Header */}
      <HeaderList
        icon="👑"
        title="Full Party (9/9) Leaderboard"
        text="Ranking CPs by total number of fully assembled 9-man squads"
      />

      {/* Top Champion Hero Card */}
      {topCP && (
        <div
          className="relative overflow-hidden bg-linear-to-r from-amber-500/10 via-amber-500/5
          to-transparent border border-amber-500/30 rounded-xl p-2 md:p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs md:text-3xl">🏆</span>
            <div>
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider block">
                Most Disciplined Squad
              </span>
              <h4 className="text-sm md:text-base font-extrabold text-slate-100">
                {topCP.cpName}
              </h4>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm md:text-xl font-black text-amber-400 font-mono block">
              {topCP.fullPartyCount}x{" "}
              <span className="text-sm md:text-lg font-normal">Full</span>
            </span>
            <span className="text-sm min-[1820px]:text-lg text-slate-400">
              {topCP.fullPartyRate}% of their events
            </span>
          </div>
        </div>
      )}

      {/* Roster List */}
      <div className="h-150 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
        {cpFullPartyList.map(
          ({ cpName, fullPartyCount, totalAttended, fullPartyRate }, index) => {
            const fillWidth = Math.min(
              (fullPartyCount / maxFullParties) * 100,
              100,
            );

            return (
              <div key={cpName} className="flex flex-col gap-1.5 group">
                <div className="flex justify-between items-center text-xs">
                  {/* Left: Rank & Name */}
                  <CPNameItem cpName={cpName} index={index} />

                  {/* Right: Stats */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs md:text-sm min-[1820px]:text-lg text-slate-500">
                      {fullPartyRate}% efficiency
                    </span>
                    <span
                      className="font-mono font-bold text-amber-400 text-xs md:text-sm min-[1820px]:text-lg
                     min-w-13.75 text-right"
                    >
                      {fullPartyCount}{" "}
                      <span className="text-xs md:text-sm min-[1820px]:text-lg text-slate-400 font-normal">
                        / {totalAttended}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Progress Bar Track */}
                <div
                  className="w-full bg-slate-950/60 rounded-full h-2 p-0.5 border border-slate-800/80
                  overflow-hidden"
                >
                  <div
                    className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full transition-all
                      duration-500 ease-out group-hover:brightness-125"
                    style={{ width: `${fillWidth}%` }}
                  />
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

export default FullPartyLeaderboard;
