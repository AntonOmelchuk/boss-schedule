import { useState } from "react";

import useFilterEvents from "../../hooks/useFilterEvents";
import useTranslation from "../../hooks/useTranslation";
import ArrowDownIcon from "../../svg/ArrowDownIcon";
import FilterIcon from "../../svg/FilterIcon";
import { LANGUAGES, TIME_FILTERS } from "../../utils/constants";
import Button from "../UI/Button";
import AllEventsItem from "./components/AllEventsItem";
import Dropdown from "./components/Dropdown";
import FilterModal from "./components/FilterModal"; // Path to your new FilterModal file

const AllEvents = () => {
  const { t, language } = useTranslation();

  const { filteredEvents, timeFilter } = useFilterEvents();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // Modal control state

  return (
    <>
      <div className="mb-4 flex justify-between items-end border-b border-slate-700 pb-2 relative z-20">
        {/* Interactive Period Custom Dropdown Header */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-base md:text-xl font-bold text-slate-200 hover:text-amber-500 flex items-center gap-2
              select-none focus:outline-none transition-colors duration-200 uppercase pb-0.5 md:pb-0"
          >
            {timeFilter === TIME_FILTERS.AllTime
              ? t.allEvents
              : t.todaysEventsOption}
            <ArrowDownIcon />
          </button>

          {isDropdownOpen && <Dropdown setIsDropdownOpen={setIsDropdownOpen} />}
        </div>

        {/* Tactical Filter Modal Trigger Button */}
        <Button onClick={() => setIsFilterModalOpen(true)}>
          <FilterIcon />
          {t.filtersTitle}
        </Button>
      </div>

      {/* Render Filter overlay dialog component dynamically */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        t={t}
      />

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
