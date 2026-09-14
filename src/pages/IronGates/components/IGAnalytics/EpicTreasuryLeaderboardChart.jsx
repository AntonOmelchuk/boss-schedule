/* eslint-disable max-len */
import { BarChart3, List } from "lucide-react";
import { useMemo, useState } from "react";

import BaseBarChart from "../../../../components/IGBaseBarChart/BaseBarChart";
import { EPIC_COLORS } from "../../../../constants/general";
import { MEMBER_COLORS, MEMBERS_MAP } from "../../../../constants/members";
import { getBossIcon } from "../../../../utils/general";

const metricOptions = [
  { key: "net_balance", label: "NET" },
  { key: "all_points", label: "ALL" },
  { key: "spent_on_epics", label: "SPENT" },
];

const viewOptions = [
  { mode: "table", label: "Leaderboard", icon: List },
  { mode: "chart", label: "Chart", icon: BarChart3 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        className="bg-slate-950/95 border border-amber-500/40 p-3 rounded-xl shadow-xl backdrop-blur-md
        text-white text-xs space-y-1"
      >
        <p className="font-bold text-amber-300 text-sm">{data.name}</p>
        <p className="text-slate-300">
          All Points:{" "}
          <span className="font-mono font-bold text-white">
            {data.all_points}
          </span>
        </p>
        <p className="text-orange-400">
          Spent (Epics):{" "}
          <span className="font-mono font-bold">{data.spent_on_epics}</span>
        </p>
        <p className="text-emerald-400">
          Net Balance:{" "}
          <span className="font-mono font-bold">{data.net_balance}</span>
        </p>
      </div>
    );
  }
  return null;
};

const EpicTreasuryLeaderboardChart = ({ membersAnalytics }) => {
  const [viewMode, setViewMode] = useState("table"); // 'table' | 'chart'
  const [activeMetric, setActiveMetric] = useState("net_balance"); // 'all_points' | 'spent_on_epics' | 'net_balance'

  const processedData = useMemo(() => {
    if (!membersAnalytics || membersAnalytics.length === 0) return [];
    const sorted = [...membersAnalytics].sort((a, b) => {
      const valA = a[activeMetric] ?? 0;
      const valB = b[activeMetric] ?? 0;
      return valB - valA;
    });

    return sorted.map((item, index) => ({
      ...item,
      rank: index + 1,
      score: item[activeMetric] ?? 0,
    }));
  }, [membersAnalytics, activeMetric]);

  const sortedByNetForTable = useMemo(() => {
    if (!membersAnalytics) return [];
    return [...membersAnalytics].sort((a, b) => b.net_balance - a.net_balance);
  }, [membersAnalytics]);

  return (
    <div
      className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md mb-8
      text-white space-y-6"
    >
      <div
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b
        border-white/10 pb-4"
      >
        <div>
          <h2 className="text-xl font-black text-amber-400 tracking-[0.15em] uppercase">
            Epic Treasury & Priority Rank
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Рейтинг учасників за поточним балансом
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {viewMode === "chart" && (
            <div className="flex bg-black/40 p-1 rounded-lg border border-white/10 text-xs font-semibold">
              {metricOptions.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveMetric(key)}
                  className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                    activeMetric === key
                      ? "bg-amber-500 text-black font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          <div className="flex bg-black/40 p-1 rounded-lg border border-white/10 text-xl font-bold">
            {viewOptions.map(({ mode, label, icon: IconComponent }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all cursor-pointer ${
                  viewMode === mode
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {viewMode === "table" && (
        <div className="space-y-2.5">
          {sortedByNetForTable.map((member, idx) => {
            const rank = idx + 1;
            const net = member.net_balance;
            const isNegative = net < 0;

            const key =
              Object.keys(MEMBERS_MAP).find(
                (k) => k.toLowerCase() === member.name?.toLowerCase(),
              ) || member.name;
            const avatar = MEMBERS_MAP[key]?.image;

            const colorKey =
              Object.keys(MEMBER_COLORS).find(
                (k) => k.toLowerCase() === member.name?.toLowerCase(),
              ) || member.name;
            const colors = MEMBER_COLORS[colorKey] || {
              start: "#334155",
              end: "#0f172a",
            };

            return (
              <div
                key={member.name}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 rounded-xl
                  bg-slate-950/80 transition-all gap-3"
                style={{
                  borderLeft: `4px solid ${colors.start}`,
                  borderRight: `1px solid ${colors.start}50`,
                  borderTop: `1px solid rgba(255,255,255,0.08)`,
                  borderBottom: `1px solid rgba(255,255,255,0.08)`,
                }}
              >
                <div className="flex items-center gap-3.5 w-full sm:w-1/3">
                  <span
                    className={`font-mono text-xl font-black w-7 text-center ${rank === 1 ? "text-amber-400" : rank === 2 ? "text-slate-300" : rank === 3 ? "text-amber-700" : "text-slate-500"}`}
                  >
                    #{rank}
                  </span>
                  {avatar && (
                    <img
                      src={avatar}
                      alt={member.name}
                      className="w-20 h-20 rounded-lg object-cover shadow-sm"
                      style={{ border: `2px solid ${colors.start}` }}
                    />
                  )}
                  <div className="min-w-0">
                    <div
                      className="font-extrabold text-xl truncate"
                      style={{
                        color:
                          colors.start === "#334155" ? "#f59e0b" : colors.start,
                      }}
                    >
                      {member.name}
                    </div>
                    {isNegative && (
                      <div className="text-base text-red-500 font-bold uppercase tracking-wider">
                        <span>⚠️ Debt</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Епіки бейджі */}
                <div className="flex flex-wrap gap-1.5 w-full sm:w-1/3">
                  {member.epics_received && member.epics_received.length > 0 ? (
                    member.epics_received.map((epic, i) => {
                      const bossColor =
                        EPIC_COLORS[epic.epic_name] || "#64748b";
                      const icon = getBossIcon(epic.epic_name);
                      return (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold
                            text-white shadow-sm bg-black/60"
                          style={{ border: `1px solid ${bossColor}` }}
                        >
                          <img
                            src={icon}
                            className="w-5 h-5 object-contain"
                            alt={epic.epic_name}
                          />
                          <span className="text-base text-slate-200 font-semibold italic">
                            {epic.epic_name}
                          </span>
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-base text-slate-500 italic">
                      No epics
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xl font-mono w-full sm:w-1/3 justify-end">
                  <div className="text-slate-400">
                    All:{" "}
                    <span className="text-white font-bold">
                      {member.all_points}
                    </span>
                  </div>
                  <div className="text-orange-400">
                    Spent:{" "}
                    <span className="text-orange-300 font-bold">
                      {member.spent_on_epics}
                    </span>
                  </div>
                  <div
                    className={`px-3 py-1.5 rounded-lg font-black text-xl border ${
                      isNegative
                        ? "bg-red-950/90 text-red-400 border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.15)]"
                        : "bg-emerald-950/90 text-emerald-400 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                    }`}
                  >
                    Balance: {net > 0 ? `+${net}` : net}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {viewMode === "chart" && (
        <BaseBarChart
          data={processedData}
          customTooltip={<CustomTooltip />}
          yAxisDomain={["auto", "dataMax + 20"]}
          margin={{ top: 100, right: 15, left: -10, bottom: 40 }}
          hideWrapperBackground={true}
        />
      )}
    </div>
  );
};

export default EpicTreasuryLeaderboardChart;
