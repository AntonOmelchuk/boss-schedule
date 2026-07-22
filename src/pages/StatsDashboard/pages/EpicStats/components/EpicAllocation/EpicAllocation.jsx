import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useAppStore from "../../../../../../store/useAppStore";
import { EPIC_COLORS } from "../../../../../../utils/constants";
import { shuffleArray } from "../../../../../../utils/general";
import CustomTooltip from "./CustomTooltip";

const EpicAllocation = () => {
  const epicData = useAppStore((state) => state.epicData);
  const loadingEpics = useAppStore((state) => state.loadingEpics);

  if (loadingEpics) {
    return <h1>Loading...</h1>;
  }

  // Format cp_distribution for Stacked Bar Chart
  const { chartData, uniqueEpics } = useMemo(() => {
    if (!epicData?.cp_distribution) return { chartData: [], uniqueEpics: [] };

    const epicsSet = new Set();
    const data = epicData.cp_distribution.map((cp) => {
      const row = { cp_name: cp.cp_name, total: cp.total_epics };
      Object.entries(cp.epics_count_by_type).forEach(([epic, count]) => {
        row[epic] = count;
        epicsSet.add(epic);
      });
      return row;
    });

    const randomData = shuffleArray(data);

    return { chartData: randomData, uniqueEpics: Array.from(epicsSet) };
  }, [epicData]);

  return (
    <div
      className="bg-slate-900/30 backdrop-blur-md border border-slate-800
        rounded-2xl p-6 shadow-xl flex flex-col gap-4"
    >
      <h3 className="text-xl font-bold text-slate-100">
        Epic Items Received per CP
      </h3>

      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              opacity={0.4}
            />

            <XAxis
              dataKey="cp_name"
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              interval={0}
            />

            <YAxis
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              allowDecimals={false}
            />

            <Tooltip
              wrapperStyle={{ outline: "none" }}
              content={<CustomTooltip />}
            />
            <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }} />

            {uniqueEpics.map((epic) => (
              <Bar
                key={epic}
                dataKey={epic}
                name={epic}
                stackId="epics"
                fill={EPIC_COLORS[epic] || "#94a3b8"}
                radius={[2, 2, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EpicAllocation;
