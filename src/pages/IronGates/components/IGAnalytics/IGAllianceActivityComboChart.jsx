import { BarChart2 } from "lucide-react";
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

import useTranslation from "../../../../hooks/useTranslation";
import { useIgAnalyticsStore } from "../../../../store/useIgAnalyticsStore";
import Header from "./Header";

const MOVING_AVERAGE_WINDOW = 5;

const IGAllianceActivityComboChart = ({ onEventClick }) => {
  const { t } = useTranslation();
  const analyticsData = useIgAnalyticsStore((state) => state.analyticsData);

  // Format historical timeline entries if available from backend, or derive mock/array
  const timeline = analyticsData?.timeline || [];

  const chartData = useMemo(() => {
    if (!timeline.length) return [];

    return timeline.map((entry, index, array) => {
      const totalScore = Number(entry.points) || 0;

      const startIdx = Math.max(0, index - MOVING_AVERAGE_WINDOW + 1);
      const windowEntries = array.slice(startIdx, index + 1);
      const sumScore = windowEntries.reduce(
        (acc, curr) => acc + (Number(curr.points) || 0), // Також тут
        0,
      );
      const avgScore = Math.round(sumScore / windowEntries.length);

      return {
        event_label: entry.event_label || `Event ${index + 1}`,
        date: entry.date,
        total_score: totalScore,
        avg_score: avgScore,
      };
    });
  }, [timeline]);

  if (!chartData.length) return null;

  return (
    <div
      className="w-full mt-8 bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl
        flex flex-col gap-4"
    >
      <Header
        Icon={<BarChart2 className="text-indigo-600" />}
        title={t.igAnalytics.comboChartTitle}
        subTitle={t.igAnalytics.comboChartSubtitle}
      />

      <div className="w-full h-120">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            onClick={(state) => {
              if (state && state.activeLabel && onEventClick) {
                onEventClick(state.activeLabel);
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
            <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "0.75rem",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="total_score"
              name={t.igAnalytics?.barName || "Total Score"}
              radius={[4, 4, 0, 0]}
              barSize={20}
            >
              {chartData.map((entry, index) => {
                const isAboveAverage = entry.total_score >= entry.avg_score;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={isAboveAverage ? "#34d399" : "#f87171"}
                    opacity={0.75}
                  />
                );
              })}
            </Bar>

            <Line
              type="monotone"
              dataKey="avg_score"
              name={t.igAnalytics?.lineName || "Moving Average"}
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

export default IGAllianceActivityComboChart;
