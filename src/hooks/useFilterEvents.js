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
  // Extract real-time server events, UI filter states, and the toggle action from Zustand store
  const { events, filters, toggleFilter } = useAppStore((state) => state);
  const { pvpEvents } = filters;

  // Retrieve the ticking current timestamp to continuously evaluate remaining time
  const now = useCurrentTime();

  // Memoize calculation to avoid performance drops and prevent potential React re-render loops
  const filteredEvents = useMemo(() => {
    // Clone the raw server events list to keep original state immutable
    const combined = [...events];

    // 1. Merge static local PvP events with their calculated next active timestamps
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

    // 2. Filter out unwanted categories and stale events, then sort chronologically
    return (
      combined
        // Hide PvP events dynamically if their specific display filter is turned off
        .filter((e) => pvpEvents || e.category !== CATEGORIES.PVP)
        // Exclude events that have already started (timestamp is in the past)
        .filter((e) => e.ts > now)
        // Sort upcoming events starting from the nearest to the furthest
        .sort((a, b) => a.ts - b.ts)
    );
  }, [events, filters, now]);

  return {
    filteredEvents,
    toggleFilter,
    filters,
  };
};

export default useFilterEvents;
