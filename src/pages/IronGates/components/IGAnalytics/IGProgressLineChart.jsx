import { TrendingUp } from "lucide-react";
import { useEffect, useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Button from "../../../../components/UI/Button";
import { MEMBER_COLORS } from "../../../../constants/members";
import useTranslation from "../../../../hooks/useTranslation";
import { useIgAnalyticsStore } from "../../../../store/useIgAnalyticsStore";
import Header from "./Header";

const IGProgressLineChart = () => {
  const { t } = useTranslation();
  const analyticsData = useIgAnalyticsStore((state) => state.analyticsData);
  const selectedCPs = useIgAnalyticsStore((state) => state.selectedCPs);
  const setSelectedCPs = useIgAnalyticsStore((state) => state.setSelectedCPs);

  const timeline = analyticsData?.timeline || [];
  const members = analyticsData?.members_analytics || [];

  const memberNames = useMemo(() => members.map((m) => m.name), [members]);

  // Init checkbox selection
  useEffect(() => {
    if (memberNames.length > 0 && Object.keys(selectedCPs).length === 0) {
      const initial = {};
      memberNames.forEach((name, idx) => {
        initial[name] = idx < 5;
      });
      setSelectedCPs(initial);
    }
  }, [memberNames]);

  // Cumulative Sum Data Calculation
  const cumulativeData = useMemo(() => {
    if (!timeline.length) return [];

    const runningTotals = {};
    memberNames.forEach((name) => (runningTotals[name] = 0));

    return timeline.map((entry) => {
      const row = {
        event_label: entry.event_label,
        date: entry.date,
      };

      const presentList = entry.present_members || [];

      memberNames.forEach((name) => {
        const isPresent = presentList.includes(name);
        const pointsToAdd = isPresent ? Number(entry.points) || 1 : 0;

        runningTotals[name] += pointsToAdd;
        row[name] = runningTotals[name];
      });

      return row;
    });
  }, [timeline, memberNames]);

  const toggleMember = (name) => {
    setSelectedCPs({
      ...selectedCPs,
      [name]: !selectedCPs[name],
    });
  };

  const selectAll = (status) => {
    const updated = {};
    memberNames.forEach((name) => (updated[name] = status));
    setSelectedCPs(updated);
  };

  if (!timeline.length) return null;

  return (
    <div
      className="w-full mt-8 bg-slate-900/10 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl
        flex flex-col gap-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Header
          Icon={<TrendingUp className="text-amber-500" />}
          title={t.igAnalytics.progressChartTitle}
          subTitle={t.igAnalytics.progressChartNote}
        />

        <div className="flex items-center gap-2">
          <Button onClick={() => selectAll(true)}>
            {t.igAnalytics?.selectAll || "Select All"}
          </Button>
          <Button onClick={() => selectAll(false)}>
            {t.igAnalytics?.deselectAll || "Deselect All"}
          </Button>
        </div>
      </div>

      <div className="w-full h-130">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={cumulativeData}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              opacity={0.5}
            />
            <XAxis
              dataKey="event_label"
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "0.75rem",
                color: "#f8fafc",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "15px" }} />

            {memberNames.map((name) => {
              if (!selectedCPs[name]) return null;
              const color = MEMBER_COLORS[name]?.start || "#38bdf8";

              return (
                <Line
                  key={name}
                  type="monotone"
                  dataKey={name}
                  name={name}
                  stroke={color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Checkboxes / Filter buttons */}
      <div className="pt-4 border-t border-slate-800/80">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
          {t.igAnalytics?.filterMembersLabel || "Filter Roster Members"}
        </span>
        <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-2 custom-scrollbar">
          {memberNames.map((name) => {
            const isSelected = !!selectedCPs[name];
            const color = MEMBER_COLORS[name]?.start || "#38bdf8";

            return (
              <button
                key={name}
                onClick={() => toggleMember(name)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  isSelected
                    ? "bg-slate-800/80 border-slate-600 text-slate-200"
                    : "bg-slate-950/40 border-slate-800/60 text-slate-500 hover:text-slate-400"
                } cursor-pointer`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: isSelected ? color : "#475569" }}
                />
                {name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IGProgressLineChart;
