import { useEffect } from "react";

import AllEventsItemSkeleton from "../../components/skeletons/AllEventsItemSkeleton";
import MainBlockSkeleton from "../../components/skeletons/MainBlockSkeleton";
import useAppStore from "../../store/useAppStore";
import AllEvents from "./components/AllEvents/AllEvents";
import MainBlock from "./components/MainBlock/MainBlock";

const MainPage = () => {
  const eventsData = useAppStore((state) => state.events);
  const cleanExpiredAlerts = useAppStore((state) => state.cleanExpiredAlerts);
  const isRespawnLoading = useAppStore((state) => state.isRespawnLoading);

  useEffect(() => {
    if (eventsData?.length) {
      cleanExpiredAlerts(eventsData);
    }
  }, [eventsData]);
  return (
    <div className="max-w-6xl mx-auto">
      {isRespawnLoading ? (
        <>
          <MainBlockSkeleton />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <AllEventsItemSkeleton key={i} />
            ))}
          </div>
        </>
      ) : (
        <>
          <MainBlock />
          <AllEvents />
        </>
      )}
    </div>
  );
};

export default MainPage;
