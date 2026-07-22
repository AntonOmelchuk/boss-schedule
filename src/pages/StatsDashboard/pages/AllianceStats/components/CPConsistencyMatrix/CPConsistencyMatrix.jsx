import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useAppStore from "../../../../../../store/useAppStore";
import CustomTooltip from "./CustomTooltip";

const CPConsistencyMatrix = () => {
  const rawTimeline = useAppStore(
    (state) => state.timelineData?.timeline || [],
  );

  const matrixData = useMemo(() => {
    if (!rawTimeline.length) return [];

    const totalEventsCount = rawTimeline.length;
    const systemKeys = ["date", "action", "event_label", "total_players"];

    // 1. Збираємо унікальні назви КП
    const cpNames = Object.keys(rawTimeline[0]).filter(
      (key) => !systemKeys.includes(key),
    );

    // 2. Рахуємо статистику по кожній КП
    const stats = cpNames.map((cp) => {
      let attendedEvents = 0;
      let totalPlayersSum = 0;

      rawTimeline.forEach((entry) => {
        const count = Number(entry[cp]) || 0;
        if (count > 0) {
          attendedEvents += 1;
          totalPlayersSum += count;
        }
      });

      const attendanceRate = Math.round(
        (attendedEvents / totalEventsCount) * 100,
      );
      const avgOnline =
        attendedEvents > 0
          ? Math.round((totalPlayersSum / attendedEvents) * 10) / 10
          : 0;

      return {
        cpName: cp,
        attendanceRate, // % відвідуваності
        attendedEvents,
        totalEvents: totalEventsCount,
        avgOnline,
      };
    });

    // 3. Сортуємо від найактивніших до найменш активних
    return stats.sort((a, b) => b.attendanceRate - a.attendanceRate);
  }, [rawTimeline]);

  if (!rawTimeline.length) return null;

  const chartHeight = Math.max(400, matrixData.length * 32);

  return (
    <div
      className="w-full mt-16 bg-slate-900/30 backdrop-blur-md border border-slate-800
      rounded-2xl p-6 shadow-xl flex flex-col gap-4"
    >
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-slate-100 tracking-wide">
            CP Attendance Consistency Rate (%)
          </h2>
          <span
            className="text-sm uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10
           text-emerald-400 border border-emerald-500/20"
          >
            Reliability Matrix 📊
          </span>
        </div>
        <p className="text-3 text-slate-400 mt-1">
          Percentage of all alliance events attended by each CP (Sorted by
          activity)
        </p>
      </div>

      <div className="w-full" style={{ height: `${chartHeight}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={matrixData}
            margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              opacity={0.4}
              horizontal={false}
            />

            <XAxis
              type="number"
              domain={[0, 100]}
              unit="%"
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              type="category"
              dataKey="cpName"
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              width={100}
              interval={0}
            />

            <Tooltip
              wrapperStyle={{ outline: "none" }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="attendanceRate"
              name="Attendance Rate"
              radius={[0, 4, 4, 0]}
              barSize={20}
            >
              {matrixData.map((entry, index) => {
                // Динамічний колір залежно від рівня відвідуваності:
                // > 80% — зелений, 50-80% — синій, < 50% — червоний/рожевий
                let color = "#f87171"; // Red
                if (entry.attendanceRate >= 80)
                  color = "#34d399"; // Green
                else if (entry.attendanceRate >= 50) color = "#38bdf8"; // Blue

                return (
                  <Cell key={`cell-${index}`} fill={color} opacity={0.8} />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CPConsistencyMatrix;
