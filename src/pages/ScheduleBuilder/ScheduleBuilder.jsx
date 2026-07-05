import { useMemo, useState } from "react";

import useFilterEvents from "../../hooks/useFilterEvents";
import useTranslation from "../../hooks/useTranslation";
import { CATEGORIES, CATEGORIES_STYLE } from "../../utils/constants";
import {
  formatDateForZone,
  formatTimeForZone,
  getEventIsoTime,
} from "../../utils/general";
import FilterBlock from "./components/FilterBlock";
import Header from "./components/Header";
import TimezoneBlock from "./components/TimezoneBlock";

export default function ScheduleBuilder() {
  const { t, language } = useTranslation();

  const { filteredEvents } = useFilterEvents();

  const [activeTimezones, setActiveTimezones] = useState([]);
  const [timezoneToAdd, setTimezoneToAdd] = useState("");
  const [showLocalTime, setShowLocalTime] = useState(true);
  const [deletedEventIds, setDeletedEventIds] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Set all categories active by default for instant visibility upon loading
  const [selectedCategories, setSelectedCategories] = useState([
    CATEGORIES.Epic,
    CATEGORIES.Siege,
    CATEGORIES.CH,
    CATEGORIES.PVP,
  ]);

  const localTimezone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    [],
  );

  const addTimezone = () => {
    setErrorMessage("");
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
        .filter((event) => selectedCategories.includes(event.category))
        // Strictly sort by numeric timestamp for ultimate chronologic accuracy
        .sort((a, b) => {
          const timeA = a.ts || new Date(a.serverTime).getTime();
          const timeB = b.ts || new Date(b.serverTime).getTime();
          return timeA - timeB;
        })
    );
  }, [filteredEvents, deletedEventIds, selectedCategories]);

  return (
    <div className="text-slate-100 p-4 md:p-8 flex flex-col justify-start select-none">
      <div className="max-w-6xl mx-auto w-full">
        <Header
          showLocalTime={showLocalTime}
          activeTimezones={activeTimezones}
          language={language}
          localTimezone={localTimezone}
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
          <FilterBlock
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            setShowLocalTime={setShowLocalTime}
            showLocalTime={showLocalTime}
            deletedEventIds={deletedEventIds}
            setDeletedEventIds={setDeletedEventIds}
          />
          {/* Configuration and Category Filters panel */}
        </div>
        {/* Main Schedule Table grid */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800">
                  <th className="p-4 text-xs font-black tracking-widest text-slate-500 uppercase">
                    {t.sbTableEvent}
                  </th>
                  <th className="p-4 text-xs font-black tracking-widest text-slate-500 uppercase">
                    {t.sbTableCategory}
                  </th>
                  <th className="p-4 text-xs font-black tracking-widest text-slate-500 uppercase">
                    {t.sbTableServerTime}
                  </th>
                  {showLocalTime && (
                    <th className="p-4 text-xs font-black tracking-widest text-indigo-400 uppercase">
                      {t.sbTableLocalTime}
                    </th>
                  )}
                  {activeTimezones.map((tz) => (
                    <th
                      key={tz}
                      className="p-4 text-xs font-black tracking-widest text-cyan-400 uppercase"
                    >
                      <div className="flex items-center justify-between">
                        <span>{tz.split("/").pop().replace("_", " ")}</span>
                        <button
                          onClick={() => removeTimezone(tz)}
                          className="hover:text-red-400 text-slate-500 text-[11px] font-bold px-1"
                        >
                          ✕
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {processedEvents?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4 + activeTimezones.length}
                      className="p-12 text-center text-slate-500 font-bold uppercase text-xs"
                    >
                      {t.sbNoEvents}
                    </td>
                  </tr>
                ) : (
                  processedEvents?.map((evt) => {
                    const isoTime = getEventIsoTime(evt);
                    return (
                      <tr
                        key={evt.id}
                        className="hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="p-4 font-bold text-slate-200">
                          <div className="flex items-center justify-between group">
                            <div className="flex items-center">
                              <span className="text-xl mr-2.5">{evt.icon}</span>
                              <span>{evt.name}</span>
                            </div>
                            <button
                              onClick={() =>
                                setDeletedEventIds((p) => [...p, evt.id])
                              }
                              className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100
                                transition-all p-1 text-xs font-bold cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase
                              tracking-wider border ${CATEGORIES_STYLE[evt.category] || "border-slate-700"}`}
                          >
                            {evt.category}
                          </span>
                        </td>
                        <td className="p-4 font-mono">
                          <div className="text-slate-400 text-xs font-bold">
                            {formatDateForZone(isoTime, "UTC", language)}
                          </div>
                          <div className="text-base md:text-xl font-black text-slate-200 mt-1">
                            {formatTimeForZone(isoTime, "UTC")}
                          </div>
                        </td>
                        {showLocalTime && (
                          <td className="p-4 font-mono bg-indigo-950/5">
                            <div className="text-indigo-400/60 text-xs font-bold">
                              {formatDateForZone(
                                isoTime,
                                localTimezone,
                                language,
                              )}
                            </div>
                            <div className="text-base md:text-xl font-black text-indigo-400 mt-1">
                              {formatTimeForZone(isoTime, localTimezone)}
                            </div>
                          </td>
                        )}
                        {activeTimezones.map((tz) => (
                          <td key={tz} className="p-4 font-mono bg-cyan-950/5">
                            <div className="text-cyan-500/60 text-xs font-bold">
                              {formatDateForZone(isoTime, tz, language)}
                            </div>
                            <div className="text-base md:text-xl font-black text-cyan-400 mt-1">
                              {formatTimeForZone(isoTime, tz)}
                            </div>
                          </td>
                        ))}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
