import { useState } from "react";

import useFilterEvents from "../../hooks/useFilterEvents";
import useTranslation from "../../hooks/useTranslation";
import { CATEGORIES, LANGUAGES, TIME_FILTERS } from "../../utils/constants";
import AllEventsItem from "./AllEventsItem";
import Dropdown from "./Dropdown";

const AllEvents = () => {
  const { t, language } = useTranslation();

  const { filteredEvents, filters, toggleFilter, timeFilter } =
    useFilterEvents();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <div className="mb-4 flex justify-between items-end border-b border-slate-700 pb-2 relative z-20">
        {/* Interactive Period Custom Dropdown Header */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-xl font-bold text-slate-200 hover:text-amber-500 flex items-center gap-2 select-none
              focus:outline-none transition-colors duration-200 uppercase"
          >
            {timeFilter === TIME_FILTERS.AllTime
              ? t.allEvents
              : t.todaysEventsOption}
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <Dropdown Dropdown setIsDropdownOpen={setIsDropdownOpen} />
          )}
        </div>

        {/* Toggle PvP filter */}
        <div
          className="flex items-center gap-2 cursor-pointer text-lg"
          onClick={() => toggleFilter(CATEGORIES.PVP)}
        >
          <span
            className={filters.pvpEvents ? "text-amber-500" : "text-slate-500"}
          >
            {t.pvpEvents}
          </span>
          <div
            className={`w-8 h-4 rounded-full transition-colors ${filters.pvpEvents ? "bg-amber-600" : "bg-slate-700"}`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transition-transform
                ${filters.pvpEvents ? "translate-x-4" : "translate-x-0"}`}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full text-center text-slate-500 py-8">
            {t.noBosses}
          </div>
        ) : (
          filteredEvents.map((event) => {
            const spawnDate = new Date(event.ts).toLocaleString(
              language === LANGUAGES.UA ? "uk-UA" : "en-US",
              {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              },
            );

            const { id, icon, name, enemy, owner, relation, isSwat } = event;

            return (
              <AllEventsItem
                t={t}
                key={id}
                icon={icon}
                name={name}
                enemy={enemy}
                owner={owner}
                isSwat={isSwat}
                relation={relation}
                spawnDate={spawnDate}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default AllEvents;
