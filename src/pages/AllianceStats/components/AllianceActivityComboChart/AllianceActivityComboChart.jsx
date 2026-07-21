import { useMemo } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useAppStore from "../../../../store/useAppStore";

const AllianceActivityComboChart = () => {
  const rawTimeline = useAppStore(
    (state) => state.timelineData?.timeline || [],
  );

  // Formating data for chart
  const chartData = useMemo(() => {
    if (!rawTimeline.length) return [];

    const systemKeys = ["date", "action", "event_label", "total_players"];

    return rawTimeline.map((entry) => {
      // Take all CPs from current row
      const cpKeys = Object.keys(entry).filter(
        (key) => !systemKeys.includes(key),
      );

      // Sum all Points for current event
      const totalAlliancePoints = cpKeys.reduce((sum, cp) => {
        return sum + (Number(entry[cp]) || 0);
      }, 0);

      return {
        event_label: entry.event_label,
        date: entry.date,
        action: entry.action,
        total_players: Number(entry.total_players) || 0,
        total_points: totalAlliancePoints,
      };
    });
  }, [rawTimeline]);

  if (!rawTimeline.length) return null;

  return (
    <div
      className="w-full mt-8 bg-slate-900/10 backdrop-blur-md border border-slate-800 rounded-2xl
      p-6 shadow-xl flex flex-col gap-4"
    >
      <div>
        <h2 className="text-xl font-bold text-slate-100 tracking-wide">
          Alliance Attendance & Total Points Activity
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Comparison between Total Players present and total CP points earned
          per event
        </p>
      </div>

      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
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

            {/* Left Y — players amount */}
            <YAxis
              yAxisId="left"
              stroke="#38bdf8"
              tick={{ fontSize: 12 }}
              label={{
                value: "Players",
                angle: -90,
                position: "insideLeft",
                fill: "#38bdf8",
                fontSize: 12,
              }}
            />

            {/* Right Y — Alliance Points */}
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#fbbf24"
              tick={{ fontSize: 12 }}
              label={{
                value: "Total Points",
                angle: 90,
                position: "insideRight",
                fill: "#fbbf24",
                fontSize: 12,
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "0.75rem",
                color: "#f8fafc",
              }}
              labelStyle={{ color: "#ffffff", fontWeight: "bold" }}
              itemStyle={{ color: "#ffffff" }}
            />
            <Legend wrapperStyle={{ paddingTop: "10px" }} />

            {/* Cells players online */}
            <Bar
              yAxisId="left"
              dataKey="total_players"
              name="Total Players"
              fill="#38bdf8"
              opacity={0.6}
              radius={[4, 4, 0, 0]}
              barSize={24}
            />

            {/* Line with total alliance points */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="total_points"
              name="Alliance Points"
              stroke="#fbbf24"
              strokeWidth={3}
              dot={{ fill: "#fbbf24", r: 4 }}
              activeDot={{ r: 7 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AllianceActivityComboChart;
