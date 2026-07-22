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

  const { statsData, isLoading, error, fetchAllStatData } = useAppStore(
    useShallow((state) => ({
      statsData: state.statsData,
      isLoading: state.isLoading,
      error: state.error,
      fetchAllStatData: state.fetchAllStatData,
    })),
  );

  useEffect(() => {
    fetchAllStatData();
  }, [fetchAllStatData]);

  if (isLoading && !statsData.pareto.length) {
    return <Loader title="Loading Alliance Analytics..." />;
  }

  if (error) {
    return <Error title={error} onClickHandler={fetchAllStatData} />;
  }

  return (
    <div className="p-8 text-white min-h-screen">
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
