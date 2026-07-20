import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DARK_COLORS = ["#4f46e5", "#0ea5e9", "#10b981", "#94a3b8", "#64748b"];

const AllianceStats = () => {
  const [data, setData] = useState({ pareto: [], summary: {} });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/cp-stats")
      .then((res) => res.json())
      .then((result) => setData(result.data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  return (
    <div className="p-8 bg-slate-950 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-indigo-400">
        Iron Gates Analytics
      </h2>

      {/* Flex container для адаптивності */}
      <div className="flex flex-wrap gap-8 items-start">
        {/* 1. Leaderboard */}
        <div className="flex-[1_1_300px] max-w-100">
          <h3 className="text-2xl mb-6 font-semibold">Leaderboard</h3>
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            {data.pareto.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 border-b
                  border-slate-800 hover:bg-slate-800 transition"
              >
                <span className="font-medium text-slate-300">
                  {index + 1}. {item.cp_name}
                </span>
                <span className="bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded-full font-bold text-sm">
                  {item.points} pts
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Контейнер для графіків */}
        <div className="flex-[2_1_600px] space-y-8">
          <div className="flex flex-wrap gap-8">
            {/* Bar Chart */}
            <div className="flex-1 min-w-300 h-125 bg-slate-900 p-6 rounded-xl border border-slate-800">
              <h3 className="text-xl mb-6">Performance</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.pareto} margin={{ top: 20, bottom: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="cp_name"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tick={{ fill: "#cbd5e1", fontSize: 10 }}
                  />
                  <YAxis tick={{ fill: "#cbd5e1" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "none",
                    }}
                  />
                  <Bar dataKey="points" radius={[4, 4, 0, 0]}>
                    {data.pareto?.map((_, i) => (
                      <Cell
                        key={i}
                        fill={DARK_COLORS[i % DARK_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="flex-1 min-w-[400px] h-[500px] bg-slate-900 p-6 rounded-xl border border-slate-800">
              <h3 className="text-xl mb-6">Distribution</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.pareto}
                    dataKey="points"
                    nameKey="cp_name"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    cornerRadius={4}
                  >
                    {data.pareto?.map((_, i) => (
                      <Cell
                        key={i}
                        fill={DARK_COLORS[i % DARK_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "none",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="h-[400px] bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 className="text-xl mb-6">Top 10 Comparison</h3>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data.pareto.slice(0, 10)}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="cp_name" tick={{ fill: "#cbd5e1" }} />
                <Radar
                  name="Points"
                  dataKey="points"
                  stroke="#4f46e5"
                  fill="#4f46e5"
                  fillOpacity={0.6}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", border: "none" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllianceStats;
