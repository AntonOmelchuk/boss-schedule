import { useEffect } from "react";

import useAppStore from "../../store/useAppStore";
import AllEvents from "./components/AllEvents/AllEvents";
import MainBlock from "./components/MainBlock/MainBlock";

const MainPage = () => {
  const eventsData = useAppStore((state) => state.events);
  const cleanExpiredAlerts = useAppStore((state) => state.cleanExpiredAlerts);

  useEffect(() => {
    if (eventsData?.length) {
      cleanExpiredAlerts(eventsData);
    }
  }, [eventsData]);
  return (
    <div className="max-w-4xl mx-auto">
      <MainBlock />
      <AllEvents />
    </div>
  );
};

export default MainPage;
