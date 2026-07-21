import { useEffect, useState } from "react";

import BarChartCustom from "./components/BarChart";
import Leaderboard from "./components/Leaderboard";
import ParetoLineChart from "./components/ParetoLineChart";
import PieChartCustom from "./components/PieChart";
import RadarChartCustom from "./components/RadarChart";
import SummaryCards from "./components/SummaryCards";

const AllianceStats = () => {
  const [data, setData] = useState({ pareto: [], summary: {} });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/cp-stats")
      .then((res) => res.json())
      .then((result) => setData(result.data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  return (
    <div className="p-8 text-white min-h-screen">
      <h1
        className="text-2xl md:text-3xl lg:text-4xl
          font-bold text-transparent [-webkit-text-stroke:1px_#94a3b8]
          tracking-widest px-4 text-center drop-shadow-md mb-8"
      >
        The 3rd Side Analytics
      </h1>
      <SummaryCards summary={data.summary} />

      <div className="flex flex-wrap lg:flex-nowrap gap-8 items-start justify-center">
        <div className="w-full lg:w-87.5 shrink-0">
          <Leaderboard data={data.pareto} />
        </div>

        <div className="flex-1 w-full flex flex-col gap-8 min-w-0">
          <div className="grid grid-cols-1 min-[1400px]:grid-cols-2 gap-8">
            <PieChartCustom data={data.pareto} />
            <RadarChartCustom data={data.pareto} />
          </div>

          <div className="w-full">
            <BarChartCustom data={data.pareto} />
          </div>
        </div>
      </div>
      <div className="w-full h-112.5 mt-8">
        <ParetoLineChart data={data.pareto} />
      </div>
    </div>
  );
};

export default AllianceStats;
