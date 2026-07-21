import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useAppStore from "../../../store/useAppStore";

const ParetoLineChart = () => {
  const pareto = useAppStore((state) => state.statsData.pareto);

  return (
    <div className="w-full h-full bg-slate-900/30 p-6 rounded-xl border border-slate-700 flex flex-col relative">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl text-white font-semibold">
            Cumulative Pareto Curve (80/20 Rule)
          </h3>
          <p className="text-xs text-slate-400">
            Shows how fast the alliance accumulates total power
          </p>
        </div>

        <div className="relative group cursor-pointer">
          <div
            className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700
            w-7 h-7 rounded-full flex items-center justify-center text-xs font-serif italic font-bold transition"
          >
            i
          </div>

          <div
            className="absolute right-0 top-9 w-80 z-20 bg-slate-950 border border-slate-700 p-4
            rounded-xl shadow-2xl text-xs text-slate-300 opacity-0 invisible group-hover:opacity-100
            group-hover:visible transition-all duration-200 pointer-events-none"
          >
            <p className="font-bold text-indigo-400 mb-1.5">
              About Pareto Curve on this chart:
            </p>
            <p className="leading-relaxed">
              This curve illustrates the cumulative power growth of the alliance
              from left to right. The Pareto Principle (80/20) shows how the
              workload or points are distributed. If the line rises steeply at
              the beginning, a few top CPs drive most of the alliance's results.
              If the curve is smooth and gradual, contributions are distributed
              more evenly across all members.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex-1 min-h-87.5 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={pareto}
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
