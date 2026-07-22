import { useMemo } from "react";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useAppStore from "../../../../../../store/useAppStore";
import CustomTooltip from "./CustomTooltip";

const MOVING_AVERAGE_WINDOW = 5;

const AllianceActivityComboChart = ({ onEventClick }) => {
  const rawTimeline = useAppStore(
    (state) => state.timelineData?.timeline || [],
  );

  // 1. Отримуємо всі назви КП
  const allCPNames = useMemo(() => {
    if (!rawTimeline.length) return [];
    const systemKeys = ["date", "action", "event_label", "total_players"];
    return Object.keys(rawTimeline[0]).filter(
      (key) => !systemKeys.includes(key),
    );
  }, [rawTimeline]);

  // 2. Підготовка даних
  const chartData = useMemo(() => {
    if (!rawTimeline.length) return [];

    return rawTimeline.map((entry, index, array) => {
      const totalPlayers = Number(entry.total_players) || 0;

      // Розрахунок Moving Average за останні N подій
      const startIdx = Math.max(0, index - MOVING_AVERAGE_WINDOW + 1);
      const windowEntries = array.slice(startIdx, index + 1);
      const sumPlayers = windowEntries.reduce(
        (acc, curr) => acc + (Number(curr.total_players) || 0),
        0,
      );
      const avgPlayers = Math.round(sumPlayers / windowEntries.length);

      const row = {
        event_label: entry.event_label,
        date: entry.date,
        action: entry.action,
        total_players: totalPlayers,
        avg_players: avgPlayers,
      };

      // Прокидаємо кількість людей кожної КП в об'єкт для CustomTooltip
      allCPNames.forEach((cp) => {
        row[cp] = Number(entry[cp]) || 0;
      });

      return row;
    });
  }, [rawTimeline, allCPNames]);

  if (!rawTimeline.length) return null;

  return (
    <div
      className="w-full mt-16 bg-slate-900/30 backdrop-blur-md border border-slate-800
    rounded-2xl p-6 shadow-xl flex flex-col gap-4"
    >
      <div>
        <h2 className="text-xl font-bold text-slate-100 tracking-wide">
          Alliance Attendance & Moving Average Trend
        </h2>
        <span
          className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-sky-500/10
         text-sky-400 border border-sky-500/20"
        >
          Click bar to Deep Dive 💡
        </span>
        <p className="text-xs text-slate-400 mt-1">
          Total event attendance with 5-event moving average line.{" "}
          <strong className="text-slate-300 font-medium">
            Click on any event bar to inspect CP breakdown below.
          </strong>
        </p>
      </div>

      <div className="w-full h-120">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            onClick={(state) => {
              if (state && state.activeLabel) {
                if (onEventClick) onEventClick(state.activeLabel);
              }
            }}
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

            <YAxis
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              label={{
                value: "Total Attendance",
                angle: -90,
                position: "insideLeft",
                fill: "#94a3b8",
                fontSize: 12,
              }}
            />

            <Tooltip
              wrapperStyle={{ outline: "none" }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="total_players"
              name="Total Attendance"
              radius={[4, 4, 0, 0]}
              barSize={20}
              style={{ cursor: "pointer" }}
            >
              {chartData.map((entry, index) => {
                const isAboveAverage = entry.total_players >= entry.avg_players;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={isAboveAverage ? "#34d399" : "#f87171"}
                    opacity={0.75}
                    className="transition-all duration-150 hover:opacity-100 hover:brightness-110 cursor-pointer"
                  />
                );
              })}
            </Bar>

            <Line
              type="monotone"
              dataKey="avg_players"
              name="5-Event Avg Trend"
              stroke="#fbbf24"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#fbbf24" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AllianceActivityComboChart;
