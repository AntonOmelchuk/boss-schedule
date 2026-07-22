import { useMemo, useState } from "react";

import useAppStore from "../../../../../../store/useAppStore";
import {
  EPIC_COLORS,
  FARMED_EPIC_FILTERS,
  SORT,
} from "../../../../../../utils/constants";
import HeaderWithControl from "./HeaderWithControl";
import TimelineItem from "./TimelineItem/TimelineItem";

const EpicFarmedTimeline = () => {
  const epicData = useAppStore((state) => state.epicData);
  const [filterStatus, setFilterStatus] = useState(FARMED_EPIC_FILTERS.ALL);
  const [sortOrder, setSortOrder] = useState(SORT.DESC);
  const [searchQuery, setSearchQuery] = useState("");

  // Prepare list and filter
  const filteredEvents = useMemo(() => {
    if (!epicData?.all_farmed_epics) return [];

    const result = epicData.all_farmed_epics
      .map((item) => {
        const isShared = Boolean(item.share_date && item.assigned_cp);
        return {
          ...item,
          status: isShared
            ? FARMED_EPIC_FILTERS.SHARED
            : FARMED_EPIC_FILTERS.TREASURY,
        };
      })
      .filter((item) => {
        // Filter by status
        if (
          filterStatus === FARMED_EPIC_FILTERS.TREASURY &&
          item.status !== FARMED_EPIC_FILTERS.TREASURY
        )
          return false;
        if (
          filterStatus === FARMED_EPIC_FILTERS.SHARED &&
          item.status !== FARMED_EPIC_FILTERS.SHARED
        )
          return false;

        // Search by epic / date / cp
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          const matchesName = item.epic_name.toLowerCase().includes(q);
          const matchesDate = item.farm_date.toLowerCase().includes(q);
          const matchesCP = (item.assigned_cp || "").toLowerCase().includes(q);
          return matchesName || matchesDate || matchesCP;
        }

        return true;
      });

    // Sort by desc/asc
    return [...result].sort((a, b) => {
      const dateA = new Date(a.farm_date);
      const dateB = new Date(b.farm_date);
      return sortOrder === SORT.DESC ? dateB - dateA : dateA - dateB;
    });
  }, [epicData, filterStatus, searchQuery, sortOrder]);

  if (!epicData) return null;

  return (
    <div
      className="bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl flex
    flex-col gap-6 w-full"
    >
      {/* Header & Controls */}
      <HeaderWithControl
        filteredEvents={filteredEvents}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setFilterStatus={setFilterStatus}
        filterStatus={filterStatus}
        sortOrder={sortOrder}
        setSortOrder={() =>
          setSortOrder((prev) => (prev === SORT.DESC ? SORT.ASC : SORT.DESC))
        }
      />

      {/* Timeline List */}
      <div className="max-h-200 overflow-y-auto pr-2 custom-scrollbar">
        <div
          className="relative pl-6 sm:pl-8 flex flex-col gap-6 before:absolute before:left-2.5 sm:before:left-3.5
        before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800"
        >
          {filteredEvents.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No epic kill events found matching your criteria.
            </div>
          ) : (
            filteredEvents.map(
              ({
                id,
                epic_name,
                farm_date,
                status,
                share_date,
                assigned_cp,
              }) => {
                const bossColor = EPIC_COLORS[epic_name] || "#64748b";
                const isShared = status === FARMED_EPIC_FILTERS.SHARED;

                return (
                  <TimelineItem
                    key={id}
                    name={epic_name}
                    farmDate={farm_date}
                    bossColor={bossColor}
                    isShared={isShared}
                    shareDate={share_date}
                    cp={assigned_cp}
                  />
                );
              },
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default EpicFarmedTimeline;
