import { useMemo } from "react";

import { PVP_EVENTS } from "../data";
import useAppStore from "../store/useAppStore";
import { CATEGORIES } from "../utils/constants";
import { getEmojiIcon, getNextPvPTimestamp } from "../utils/general";
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
  const { events, filters, toggleFilter } = useAppStore((state) => state);
  const { pvpEvents } = filters;

  // Single ticker interval representing active system clock state
  const now = useCurrentTime();

  // Stage 1: Merge dynamic database entries with local static PvP schedules.
  // This computationally heavy part ONLY recalculates when the raw db events modify.
  const baseMergedEvents = useMemo(() => {
    const combined = [...events];

    PVP_EVENTS.forEach(({ name, time, type, category }) => {
      combined.push({
        id: name,
        name,
        ts: getNextPvPTimestamp(time),
        category,
        type,
        icon: getEmojiIcon(type),
      });
    });

    return combined;
  }, [events]);

  // Stage 2: Clean and trim expired event entries, applying layout filter checks.
  // This light filter runs on every tick, ensuring zero layout jank or blocking lag.
  const filteredEvents = useMemo(() => {
    return baseMergedEvents
      .filter((e) => pvpEvents || e.category !== CATEGORIES.PVP)
      .filter((e) => e.ts > now)
      .sort((a, b) => a.ts - b.ts);
  }, [baseMergedEvents, pvpEvents, now]);

  return {
    filteredEvents,
    toggleFilter,
    filters,
    now,
  };
};

export default useFilterEvents;
