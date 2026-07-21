import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import useAppStore from "../../../store/useAppStore";

const DARK_COLORS = [
  "#4f46e5",
  "#0ea5e9",
  "#10b981",
  "#64748b",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#3b82f6",
  "#6366f1",
  "#84cc16",
  "#d946ef",
  "#475569",
];

const PieChartCustom = () => {
  const pareto = useAppStore((state) => state.statsData.pareto);

  // Custom label for name & percent
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }) => {
    // Skip small value to avoid mess
    if (percent < 0.01) return null;

    const RADIAN = Math.PI / 180;
    // Increase distance for label
    const radius = outerRadius + 28;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const currentItem = pareto[index];

    return (
      <text
        x={x}
        y={y}
        fill="#94a3b8"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={10}
      >
        {`${currentItem.cp_name}: ${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="w-full h-125 bg-slate-900/30 p-4 rounded-xl border border-slate-700 flex flex-col">
      <h3 className="text-xl mb-2 text-white">Distribution Share (All CPs)</h3>
      <div className="w-full flex-1 min-h-112.5">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 40, right: 80, bottom: 40, left: 80 }}>
            <Pie
              data={pareto}
              dataKey="points"
              nameKey="cp_name"
              cx="50%"
              cy="50%"
              outerRadius={210} // Chart size
              label={renderCustomizedLabel}
              labelLine={{ stroke: "#475569", strokeWidth: 1 }}
            >
              {pareto?.map((_, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={DARK_COLORS[i % DARK_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "8px",
                color: "#f8fafc",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartCustom;
