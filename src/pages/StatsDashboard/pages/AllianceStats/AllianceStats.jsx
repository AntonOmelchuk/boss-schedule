import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import Error from "../../../../components/Error/Error";
import TimerProgressBar from "../../../../components/TimerProgressBar/TimerProgressBar";
import { BREAKPOINTS } from "../../../../constants/general";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import useTranslation from "../../../../hooks/useTranslation";
import useAppStore from "../../../../store/useAppStore";
import { getErrorMessage } from "../../../../utils/general";
import AllianceActivityComboChart from "./components/AllianceActivityComboChart/AllianceActivityComboChart";
import CPAvgOnlineMatrix from "./components/CPAvgOnlineMatrix/CPAvgOnlineMatrix";
import CPConsistencyMatrix from "./components/CPConsistencyMatrix/CPConsistencyMatrix";
import CPProgressLineChart from "./components/CPProgressLineChart/CPProgressLineChart";
import EventDeepDive from "./components/EventDeepDive/EventDeepDive";
import FullPartyLeaderboard from "./components/FullPartyLeaderboard/FullPartyLeaderboard";
import Leaderboard from "./components/Leaderboard/Leaderboard";
// import ParetoLineChart from "./components/ParetoLineChart/ParetoLineChart"; Turn Off atm
import PerfomanceChart from "./components/PermomanceChart/PerfomanceChart";
import SummaryCards from "./components/SummaryCards/SummaryCards";

const AllianceStats = () => {
  const { t } = useTranslation();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const isDesktop = useMediaQuery(BREAKPOINTS.IS_DESKTOP);

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
    return <TimerProgressBar label={t.loadingAllianceAnalytics} />;
  }

  if (error && !isLoading) {
    return (
      <Error title={getErrorMessage(error)} onClickHandler={fetchAllStatData} />
    );
  }

  return (
    <div className="md:p-8 text-white min-h-screen">
      <SummaryCards />

      <div className="grid grid-cols-1 min-[1240px]:grid-cols-2 min-[1700px]:grid-cols-3 gap-8 items-stretch w-full">
        <Leaderboard />
        <FullPartyLeaderboard />
        <CPAvgOnlineMatrix />
      </div>
      {isDesktop && (
        <>
          <PerfomanceChart />
          <CPConsistencyMatrix />
          <CPProgressLineChart />
          <AllianceActivityComboChart
            onEventClick={(eventLabel) => setSelectedEvent(eventLabel)}
          />
        </>
      )}
      <EventDeepDive
        selectedEventLabel={selectedEvent}
        onSelectEvent={(eventLabel) => setSelectedEvent(eventLabel)}
      />
    </div>
  );
};

export default AllianceStats;
