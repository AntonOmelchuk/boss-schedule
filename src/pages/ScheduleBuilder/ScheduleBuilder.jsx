import { useMemo, useRef, useState } from "react";

import useFilterEvents from "../../hooks/useFilterEvents";
import useTranslation from "../../hooks/useTranslation";
import FilterBlock from "./components/FilterBlock";
import Header from "./components/Header";
import MainTable from "./components/MainTable";
import TimezoneBlock from "./components/TimezoneBlock";

export default function ScheduleBuilder() {
  const tableRef = useRef();

  const { t } = useTranslation();

  const { filteredEvents } = useFilterEvents();

  const [activeTimezones, setActiveTimezones] = useState([]);
  const [timezoneToAdd, setTimezoneToAdd] = useState("");
  const [showLocalTime, setShowLocalTime] = useState(true);
  const [deletedEventIds, setDeletedEventIds] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [limit, setLimit] = useState(10);

  const localTimezone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    [],
  );

  const addTimezone = () => {
    setErrorMessage("");
    if (!timezoneToAdd.trim()) {
      return;
    }

    if (activeTimezones.includes(timezoneToAdd)) {
      setErrorMessage(t.sbTzErrorDuplicate);
      return;
    }

    if (activeTimezones.length >= 5) {
      setErrorMessage(t.sbTzErrorLimit);
      return;
    }

    setActiveTimezones((prev) => [...prev, timezoneToAdd]);
  };

  const removeTimezone = (zone) => {
    setErrorMessage("");
    setActiveTimezones((prev) => prev.filter((tz) => tz !== zone));
  };

  const processedEvents = useMemo(() => {
    return (
      filteredEvents
        ?.filter((event) => !deletedEventIds.includes(event.id))
        // Strictly sort by numeric timestamp for ultimate chronologic accuracy
        .sort((a, b) => {
          const timeA = a.ts || new Date(a.serverTime).getTime();
          const timeB = b.ts || new Date(b.serverTime).getTime();
          return timeA - timeB;
        })
        .slice(0, limit)
    );
  }, [limit, filteredEvents, deletedEventIds]);

  return (
    <div className="text-slate-100 p-4 md:p-8 flex flex-col justify-start select-none">
      <div className="max-w-6xl mx-auto w-full">
        <Header
          tableRef={tableRef}
          showLocalTime={showLocalTime}
          localTimezone={localTimezone}
          activeTimezones={activeTimezones}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <TimezoneBlock
            activeTimezones={activeTimezones}
            timezoneToAdd={timezoneToAdd}
            setTimezoneToAdd={setTimezoneToAdd}
            addTimezone={addTimezone}
            errorMessage={errorMessage}
            removeTimezone={removeTimezone}
          />
          {/* Configuration and Category Filters panel */}
          <FilterBlock
            limit={limit}
            setLimit={setLimit}
            showLocalTime={showLocalTime}
            deletedEventIds={deletedEventIds}
            setShowLocalTime={setShowLocalTime}
            setDeletedEventIds={setDeletedEventIds}
          />
        </div>
        {/* Main Schedule Table grid */}
        <MainTable
          tableRef={tableRef}
          showLocalTime={showLocalTime}
          localTimezone={localTimezone}
          processedEvents={processedEvents}
          activeTimezones={activeTimezones}
          removeTimezone={removeTimezone}
          setDeletedEventIds={setDeletedEventIds}
        />
      </div>
    </div>
  );
}
