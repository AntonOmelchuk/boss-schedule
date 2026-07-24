import { useMemo } from "react";

import useMediaQuery from "../../../../../../hooks/useMediaQuery";
import useAppStore from "../../../../../../store/useAppStore";
import { BREAKPOINTS, EPIC_COLORS } from "../../../../../../utils/constants";
import CustomBarChart from "./CustomBarChart";
import CustomPieChart from "./CustomPieChart";

const EpicTypesBreakdownChart = () => {
  const epicData = useAppStore((state) => state.epicData);

  const totalFarmed = epicData?.summary?.total_farmed || 1;

  const isDesktop = useMediaQuery(BREAKPOINTS.IS_DESKTOP);

  const chartData = useMemo(() => {
    if (!epicData?.epics_breakdown) return [];

    return Object.entries(epicData.epics_breakdown)
      .map(([epicName, stats]) => ({
        name: epicName,
        value: stats.total,
        shared: stats.shared,
        unassigned: stats.unassigned,
        percent: ((stats.total / totalFarmed) * 100).toFixed(1),
        fill: EPIC_COLORS[epicName] || "#64748b",
      }))
      .sort((a, b) => b.value - a.value);
  }, [epicData]);

  if (!epicData || chartData.length === 0) return null;

  return (
    <div
      className="h-100 xl:h-125 bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-2xl p-6
      shadow-xl flex flex-col lg:flex-row gap-8 items-center w-full"
    >
      <CustomPieChart chartData={chartData} totalFarmed={totalFarmed} />
      {isDesktop && <CustomBarChart chartData={chartData} />}
    </div>
  );
};

export default EpicTypesBreakdownChart;
