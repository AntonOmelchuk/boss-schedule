import useFilterEvents from "../../hooks/useFilterEvents";
import useTranslation from "../../hooks/useTranslation";
import { TIME_FILTERS } from "../../utils/constants";
import DropdownButton from "./DropdownButton";

const Dropdown = ({ setIsDropdownOpen }) => {
  const { t } = useTranslation();

  const { timeFilter, setTimeFilter } = useFilterEvents();

  return (
    <>
      {/* Invisible dismiss overlay for clicks outside the tactical dropdown menu */}
      <div
        className="fixed inset-0 z-40 cursor-default"
        onClick={() => setIsDropdownOpen(false)}
      />
      <div
        className="absolute left-0 mt-2 w-56 rounded-xl border border-slate-800 bg-slate-950/95
        backdrop-blur-xl shadow-2xl py-1.5 z-50 text-left"
      >
        <DropdownButton
          label={t.allEvents}
          value={TIME_FILTERS.AllTime}
          activeValue={timeFilter}
          onClick={() => {
            setTimeFilter(TIME_FILTERS.AllTime);
            setIsDropdownOpen(false);
          }}
        />
        <DropdownButton
          label={t.todaysEventsOption}
          value={TIME_FILTERS.Today}
          activeValue={timeFilter}
          onClick={() => {
            setTimeFilter(TIME_FILTERS.Today);
            setIsDropdownOpen(false);
          }}
        />
      </div>
    </>
  );
};

export default Dropdown;
