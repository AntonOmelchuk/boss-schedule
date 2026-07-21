import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import useAppStore from "../../../store/useAppStore";

const RadarChartCustom = () => {
  const TOP_AMOUNT = 10;
  const pareto = useAppStore((state) => state.statsData.pareto);

  return (
    <div className="h-125 bg-slate-900/30 p-4 rounded-xl border border-slate-700">
      <h3 className="text-xl mb-2">{`Top ${TOP_AMOUNT} Comparison`}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={pareto.slice(0, TOP_AMOUNT)}>
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
