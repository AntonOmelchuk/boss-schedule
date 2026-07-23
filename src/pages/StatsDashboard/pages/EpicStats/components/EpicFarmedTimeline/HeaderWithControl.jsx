import Tab from "../../../../../../components/UI/Tab";
import { FARMED_EPIC_FILTERS, SORT } from "../../../../../../utils/constants";

const FILTER_OPTIONS = [
  FARMED_EPIC_FILTERS.ALL,
  FARMED_EPIC_FILTERS.TREASURY,
  FARMED_EPIC_FILTERS.SHARED,
];

const HeaderWithControl = ({
  filteredEvents,
  searchQuery,
  setSearchQuery,
  setFilterStatus,
  filterStatus,
  setSortOrder,
  sortOrder,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
      <div>
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <span>📜 Epic Bosses Kill History</span>
          <span
            className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-sky-400 border
              border-slate-700"
          >
            {filteredEvents.length} events
          </span>
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Chronological log of farmed alliance epics & loot assignment
        </p>
      </div>

      {/* Sort */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={setSortOrder}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800
          text-xs font-semibold text-slate-300 hover:text-slate-100 hover:border-slate-700 cursor-pointer transition"
          title="Toggle Date Order"
        >
          <span>📅 Date:</span>
          <span className="text-sky-400 font-bold">
            {sortOrder === SORT.DESC ? "Newest First ↓" : "Oldest First ↑"}
          </span>
        </button>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search boss, CP, date..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs
          text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500/50 w-full
            sm:w-44 transition"
        />

        {/* Filter Status Buttons */}
        <div className="flex bg-slate-950/80 border border-slate-800 p-1 rounded-xl gap-1">
          {FILTER_OPTIONS.map((filter) => (
            <Tab
              key={filter}
              onClickHandler={() => setFilterStatus(filter)}
              isActive={filterStatus === filter}
              title={filter}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderWithControl;
