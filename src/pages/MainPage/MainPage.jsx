import { Calendar, LayoutGrid } from "lucide-react";
import { useEffect, useState } from "react";

import AllEventsItemSkeleton from "../../components/skeletons/AllEventsItemSkeleton";
import MainBlockSkeleton from "../../components/skeletons/MainBlockSkeleton";
import Switch from "../../components/UI/Switch";
import { BREAKPOINTS, RESPAWN_DATA_VIEW } from "../../constants/general";
import useMediaQuery from "../../hooks/useMediaQuery";
import useTranslation from "../../hooks/useTranslation";
import useAppStore from "../../store/useAppStore";
import AllEvents from "./components/AllEvents/AllEvents";
import CalendarView from "./components/CalendarView/CalendarView";
import MainBlock from "./components/MainBlock/MainBlock";

const MainPage = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery(BREAKPOINTS.IS_MOBILE);

  const eventsData = useAppStore((state) => state.events);
  const cleanExpiredAlerts = useAppStore((state) => state.cleanExpiredAlerts);
  const isRespawnLoading = useAppStore((state) => state.isRespawnLoading);

  const [viewMode, setViewMode] = useState(RESPAWN_DATA_VIEW.GRID);

  useEffect(() => {
    if (eventsData?.length) {
      cleanExpiredAlerts(eventsData);
    }
  }, [eventsData, cleanExpiredAlerts]);

  const toggleViewMode = () => {
    setViewMode((prev) =>
      prev === RESPAWN_DATA_VIEW.GRID
        ? RESPAWN_DATA_VIEW.CALENDAR
        : RESPAWN_DATA_VIEW.GRID,
    );
  };

  return (
    <div className="mx-auto px-2 sm:px-4 md:space-y-6">
      {isRespawnLoading ? <MainBlockSkeleton /> : <MainBlock />}

      <div className="flex flex-wrap items-center justify-between gap-3 md:pt-2">
        {!isMobile && (
          <Switch
            isActive={viewMode === RESPAWN_DATA_VIEW.GRID}
            onClick={toggleViewMode}
            firstItem={
              <>
                <LayoutGrid className="w-4 h-4" />
                <span className="uppercase">{t.grid}</span>
              </>
            }
            secondItem={
              <>
                <Calendar className="w-4 h-4" />
                <span className="uppercase">{t.calendar}</span>
              </>
            }
          />
        )}
      </div>

      {isRespawnLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <AllEventsItemSkeleton key={i} />
          ))}
        </div>
      ) : viewMode === RESPAWN_DATA_VIEW.GRID ? (
        <AllEvents />
      ) : (
        <CalendarView />
      )}
    </div>
  );
};

export default MainPage;
