import { useMemo } from "react";

import { PVP_EVENTS } from "../data";
import useAppStore from "../store/useAppStore";
import { TIME_FILTERS } from "../utils/constants";
import { getEmojiIcon, getSingleEventTimestamp } from "../utils/general";
import useCurrentTime from "./useCurrentTime";

/**
 * Custom hook to merge, filter, and sort both server-side database events and static local PvP events.
 * It integrates seamlessly with the global Zustand state and uses the current ticking time to filter out stale events.
 * * @returns {Object} Filtered events context containing:
 * - @property {Array<Object>} filteredEvents - Memoized list of active, upcoming events sorted progressively.
 * - @property {Function} toggleFilter - State action to toggle event categories in the UI.
 * - @property {Object} filters - Current status of active filter criteria.
 */
const useFilterEvents = () => {
  const { events, filters, toggleFilter, timeFilter, setTimeFilter } =
    useAppStore((state) => state);

  // Single ticker interval representing active system clock state
  const now = useCurrentTime();

  // Stage 1: Merge dynamic database entries with local static PvP schedules.
  // This computationally heavy part ONLY recalculates when the raw db events modify.
  const baseMergedEvents = useMemo(() => {
    const combined = [...events];

    PVP_EVENTS.forEach(({ name, time, type, category }) => {
      // Замість одного івенту, створюємо об'єкт під КОЖЕН час із масиву
      time.forEach((timeString) => {
        combined.push({
          // Робимо ID унікальним для кожної сесії (наприклад, "Multi Team Battle-18:00")
          id: `${name}-${timeString}`,
          name,
          // Рахуємо таймстамп конкретно для ЦІЄЇ сесії на сьогодні або завтра
          ts: getSingleEventTimestamp(timeString),
          category,
          type,
          icon: getEmojiIcon(type),
        });
      });
    });

    return combined;
  }, [events]);

  // Stage 2: Clean and trim expired event entries, applying tactical filters and timeframe checks.
  const filteredEvents = useMemo(() => {
    const todayEnd = new Date();
    todayEnd.setUTCHours(24, 0, 0, 0);
    const todayEndTs = todayEnd.getTime();

    return baseMergedEvents
      .filter(({ category }) => filters[category] !== false)
      .filter((e) => e.ts > now)
      .filter((e) => timeFilter === TIME_FILTERS.AllTime || e.ts <= todayEndTs)
      .sort((a, b) => a.ts - b.ts);
  }, [baseMergedEvents, filters, now, timeFilter]);

  return {
    filteredEvents,
    toggleFilter,
    filters,
    timeFilter,
    setTimeFilter,
    now,
  };
};

export default useFilterEvents;
