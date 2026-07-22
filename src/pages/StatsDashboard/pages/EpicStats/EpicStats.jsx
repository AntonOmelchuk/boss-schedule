import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import Loader from "../../../../components/Loader/Loader";
import useAppStore from "../../../../store/useAppStore";
import DistributionHistory from "./components/DistributionHistory/DistributionHistory";
import EpicAllocation from "./components/EpicAllocation/EpicAllocation";
import Header from "./components/Header/Header";
import StatCards from "./components/StatCards/StatCards";

const EpicStats = () => {
  const { loadingEpics, error, fetchEpicData } = useAppStore(
    useShallow((state) => ({
      loadingEpics: state.loadingEpics,
      error: state.error,
      fetchEpicData: state.fetchEpicData,
    })),
  );

  useEffect(() => fetchEpicData, []);

  if (loadingEpics) {
    return <Loader title="Loading Epic Bosses Analytics.." />;
  }

  if (error) {
    return <Error title={error} onClickHandler={fetchEpicData} />;
  }

  return (
    <div className="w-full mt-16 flex flex-col gap-8">
      {/* 1. Header & Summary Cards */}
      <div
        className="bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-2xl
        p-6 shadow-xl flex flex-col gap-6"
      >
        <Header />
        <StatCards />
      </div>

      {/* 2. CP Epic Allocation Chart (Stacked Bar Chart) */}
      <EpicAllocation />

      {/* 3. Detailed Distribution Table */}
      <DistributionHistory />
    </div>
  );
};

export default EpicStats;
