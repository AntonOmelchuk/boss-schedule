import { useMemo, useState } from "react";
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

import useMediaQuery from "../../../../../../hooks/useMediaQuery";
import useAppStore from "../../../../../../store/useAppStore";
import {
  BREAKPOINTS,
  EPIC_COLORS,
  SORT,
} from "../../../../../../utils/constants";
import { shuffleArray } from "../../../../../../utils/general";
import CustomTooltip from "./CustomTooltip";
import SortTabs from "./SortTabs";

const EpicAllocation = () => {
  const epicData = useAppStore((state) => state.epicData);
  const [sortBy, setSortBy] = useState(SORT.EPICS_COUNT);

  const isLargeDesktop = useMediaQuery(BREAKPOINTS.IS_LARGE_DESKTOP);

  // Format cp_distribution for Stacked Bar Chart
  const { chartData, uniqueEpics } = useMemo(() => {
    if (!epicData?.cp_distribution) return { chartData: [], uniqueEpics: [] };

    const epicsSet = new Set();
    const data = epicData.cp_distribution.map((cp) => {
      const row = {
        cp_name: cp.cp_name,
        total: cp.total_epics,
        totalGB: cp.total_gb,
      };
      Object.entries(cp.epics_count_by_type).forEach(([epic, count]) => {
        row[epic] = count;
        epicsSet.add(epic);
      });
      return row;
    });

    // Sort logic
    let sortedData = [...data];
    if (sortBy === SORT.EPICS_COUNT) {
      sortedData.sort((a, b) => a.total - b.total);
    } else if (sortBy === SORT.VALUE_GB) {
      sortedData.sort((a, b) => a.totalGB - b.totalGB);
    } else if (sortBy === SORT.RANDOM) {
      sortedData = shuffleArray(sortedData);
    }

    return { chartData: sortedData, uniqueEpics: Array.from(epicsSet) };
  }, [epicData, sortBy]);

  return (
    <div
      className="bg-slate-900/30 backdrop-blur-md border border-slate-800
        rounded-2xl p-6 shadow-xl flex flex-col gap-4"
    >
      <SortTabs setSortBy={setSortBy} sortBy={sortBy} />

      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            barCategoryGap="25%"
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              opacity={0.9}
              vertical={true}
              horizontal={true}
            />
            <XAxis
              dataKey="cp_name"
              stroke="#94a3b8"
              tick={{ fontSize: isLargeDesktop ? 14 : 10 }}
              interval={0}
              angle={12}
              style={{
                marginTop: "10px",
              }}
            />
            <YAxis
              yAxisId="left"
              stroke="#F0F0F0"
              tick={{ fontSize: 14 }}
              allowDecimals={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#6A6E73"
              tick={{ fontSize: 14 }}
              unit=" GB"
            />

            <Tooltip
              wrapperStyle={{ outline: "none" }}
              content={<CustomTooltip />}
            />
            <Legend wrapperStyle={{ fontSize: "14px" }} />

            {uniqueEpics.map((epic) => (
              <Bar
                key={epic}
                name={epic}
                yAxisId="left"
                dataKey={epic}
                maxBarSize={30}
                stackId="epics"
                fill={EPIC_COLORS[epic] || "#94a3b8"}
                radius={[2, 2, 0, 0]}
              />
            ))}
            <Bar
              yAxisId="right"
              dataKey="totalGB"
              name="Total Value (GB)"
              stackId="value"
              fill="#6A6E73"
              maxBarSize={30}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EpicAllocation;
