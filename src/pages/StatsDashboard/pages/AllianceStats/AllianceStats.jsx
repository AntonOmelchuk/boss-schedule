import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import Error from "../../../../components/Error/Error";
import Loader from "../../../../components/Loader/Loader";
import useAppStore from "../../../../store/useAppStore";
import AllianceActivityComboChart from "./components/AllianceActivityComboChart/AllianceActivityComboChart";
import BarChartCustom from "./components/BarChart";
import CPConsistencyMatrix from "./components/CPConsistencyMatrix/CPConsistencyMatrix";
import CPProgressLineChart from "./components/CPProgressLineChart/CPProgressLineChart";
import EventDeepDive from "./components/EventDeepDive/EventDeepDive";
import Leaderboard from "./components/Leaderboard";
import ParetoLineChart from "./components/ParetoLineChart";
import PieChartCustom from "./components/PieChart";
import RadarChartCustom from "./components/RadarChart";
import SummaryCards from "./components/SummaryCards/SummaryCards";

const AllianceStats = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { statsData, isLoading, error, fetchAlStatlData } = useAppStore(
    useShallow((state) => ({
      statsData: state.statsData,
      isLoading: state.isLoading,
      error: state.error,
      fetchAlStatlData: state.fetchAlStatlData,
    })),
  );

  useEffect(() => fetchAlStatlData, []);

  if (isLoading && !statsData.pareto.length) {
    return <Loader title="Loading Alliance Analytics.." />;
  }

  if (error) {
    return <Error title={error} onClickHandler={fetchAlStatlData} />;
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

      <div className="flex flex-wrap xl:flex-nowrap gap-8 items-start justify-center">
        <Leaderboard />
        <PieChartCustom />
        <RadarChartCustom />
      </div>
      <BarChartCustom />
      <ParetoLineChart />
      <CPProgressLineChart />
      <AllianceActivityComboChart
        onEventClick={(eventLabel) => setSelectedEvent(eventLabel)}
      />
      <EventDeepDive
        selectedEventLabel={selectedEvent}
        onSelectEvent={(eventLabel) => setSelectedEvent(eventLabel)}
      />
      <CPConsistencyMatrix />
    </div>
  );
};

export default AllianceStats;
