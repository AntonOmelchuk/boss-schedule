import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import TimerProgressBar from "../../../../components/TimerProgressBar/TimerProgressBar";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import useAppStore from "../../../../store/useAppStore";
import { BREAKPOINTS } from "../../../../utils/constants";
import DistributionHistory from "./components/DistributionHistory/DistributionHistory";
import EpicAllocation from "./components/EpicAllocation/EpicAllocation";
import EpicFarmedTimeline from "./components/EpicFarmedTimeline/EpicFarmedTimeline";
import EpicTypesBreakdownChart from "./components/EpicTypesBreakdownChart/EpicTypesBreakdownChart";
import StatCards from "./components/StatCards/StatCards";

const EpicStats = () => {
  const { loadingEpics, error, fetchEpicData } = useAppStore(
    useShallow((state) => ({
      loadingEpics: state.loadingEpics,
      error: state.error,
      fetchEpicData: state.fetchEpicData,
    })),
  );

  const isDesktop = useMediaQuery(BREAKPOINTS.IS_DESKTOP);

  useEffect(() => {
    fetchEpicData();
  }, [fetchEpicData]);

  if (loadingEpics) {
    return <TimerProgressBar label="Loading Epics Analytics..." />;
  }

  if (error) {
    return <Error title={error} onClickHandler={fetchEpicData} />;
  }

  return (
    <div className="w-full xl:mt-16 flex flex-col gap-8">
      <StatCards />

      <EpicTypesBreakdownChart />

      {/* 2. CP Epic Allocation Chart (Stacked Bar Chart) */}
      {isDesktop && <EpicAllocation />}

      {/* 3. Detailed Distribution Table */}
      <div className="grid grid-cols-1 min-[1950px]:grid-cols-2 gap-6 items-stretch w-full">
        <EpicFarmedTimeline />
        <DistributionHistory />
      </div>
    </div>
  );
};

export default EpicStats;
