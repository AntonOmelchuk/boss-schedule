import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const RadarChartCustom = ({ data }) => {
  return (
    <div className="h-125 p-4 rounded-xl border border-slate-700">
      <h3 className="text-xl mb-2">Top 10 Comparison</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data.slice(0, 10)}>
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
  );
};

export default RadarChartCustom;
