import { useMemo, useState } from "react";
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

import Tab from "../../../../../../components/UI/Tab";
import useAppStore from "../../../../../../store/useAppStore";
import { SORT } from "../../../../../../utils/constants";
import { shuffleArray } from "../../../../../../utils/general";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088FE",
  "#00C49F",
];

const PerfomanceChart = () => {
  const pareto = useAppStore((state) => state.statsData.pareto);

  const [viewMode, setViewMode] = useState(SORT.SORTED);

  const data = useMemo(() => {
    if (!pareto || pareto.length === 0) return [];

    if (viewMode === SORT.RANDOM) {
      return shuffleArray([...pareto]);
    }

    return [...pareto].sort((a, b) => (a.points || 0) - (b.points || 0));
  }, [pareto, viewMode]);

  return (
    <div className="h-150 mt-8 bg-slate-900/30 p-6 rounded-xl border border-slate-700">
      <h3 className="text-xl mb-6">Performance</h3>
      <div className="flex justify-end items-center p-1 rounded-xl">
        <Tab
          title="📊 Sorted"
          isActive={viewMode === SORT.SORTED}
          onClickHandler={() => setViewMode(SORT.SORTED)}
        />
        <Tab
          title="🎲 Random"
          isActive={viewMode === SORT.RANDOM}
          onClickHandler={() => setViewMode(SORT.RANDOM)}
        />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, bottom: 80 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="cp_name"
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fill: "#cbd5e1", fontSize: 12 }}
          />
          <YAxis tick={{ fill: "#cbd5e1" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
            }}
            labelStyle={{ color: "#ffffff", fontWeight: "bold" }}
            itemStyle={{ color: "#ffffff" }}
          />
          <Bar dataKey="points" radius={[4, 4, 0, 0]}>
            {data?.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerfomanceChart;
