import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ParetoLineChart = ({ data = [] }) => {
  return (
    <div className="w-full h-full p-6 rounded-xl border border-slate-800 flex flex-col">
      <h3 className="text-xl mb-2 text-white">
        Cumulative Pareto Curve (80/20 Rule)
      </h3>
      <p className="text-xs text-slate-400 mb-6">
        Shows how fast the alliance accumulates total power
      </p>

      <div className="w-full flex-1 min-h-87.5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="cp_name"
              angle={-45}
              textAnchor="end"
              interval={0}
              height={50}
              tick={{ fill: "#cbd5e1", fontSize: 10 }}
            />
            <YAxis tick={{ fill: "#cbd5e1" }} domain={[0, 100]} unit="%" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "8px",
                color: "#f8fafc",
              }}
              formatter={(value) => [`${value}%`, "Cumulative Share"]}
            />
            <Line
              type="monotone"
              dataKey="cumulative_pct"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ fill: "#4f46e5", r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ParetoLineChart;
