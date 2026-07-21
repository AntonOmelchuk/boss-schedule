import { useEffect } from "react";

import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import useAppStore from "../../store/useAppStore";
import BarChartCustom from "./components/BarChart";
import CPProgressLineChart from "./components/CPProgressLineChart/CPProgressLineChart";
import Leaderboard from "./components/Leaderboard";
import ParetoLineChart from "./components/ParetoLineChart";
import PieChartCustom from "./components/PieChart";
import RadarChartCustom from "./components/RadarChart";
import SummaryCards from "./components/SummaryCards";

const AllianceStats = () => {
  const { statsData, isLoading, error, fetchAllData } = useAppStore();

  useEffect(() => fetchAllData, []);

  if (isLoading && !statsData.pareto.length) {
    return <Loader title="Loading Alliance Analytics.." />;
  }

  if (error) {
    return <Error title={error} onClickHandler={fetchAllData} />;
  }

  return (
    <div className="p-8 text-white min-h-screen">
      <h1
        className="text-2xl md:text-3xl lg:text-4xl
          font-bold text-transparent [-webkit-text-stroke:1px_#94a3b8]
          tracking-widest px-4 text-center drop-shadow-md mb-8"
      >
        The 3rd Side Analytics
      </h1>
      <SummaryCards />

      <div className="flex flex-wrap lg:flex-nowrap gap-8 items-start justify-center">
        <Leaderboard />

        <div className="flex-1 w-full flex flex-col gap-8 min-w-0">
          <div className="grid grid-cols-1 min-[1400px]:grid-cols-2 gap-8">
            <PieChartCustom />
            <RadarChartCustom />
          </div>

          <div className="w-full">
            <BarChartCustom />
          </div>
        </div>
      </div>
      <div className="w-full h-112.5 mt-8">
        <ParetoLineChart />
      </div>
      <div className="w-full mt-8">
        <CPProgressLineChart />
      </div>
    </div>
  );
};

export default AllianceStats;
