import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CATEGORIES, LANGUAGES, TIME_FILTERS } from "../utils/constants";

const useAppStore = create(
  persist(
    (set) => ({
      // Initial state
      language: LANGUAGES.EN,
      timeFilter: TIME_FILTERS.AllTime,
      filters: {
        [CATEGORIES.Epic]: true,
        [CATEGORIES.PVP]: true,
        [CATEGORIES.CH]: true,
        [CATEGORIES.Siege]: true,
      },
      events: [], // data from Firebase

      // Alliance Stats
      statsData: { pareto: [], summary: {} },
      timelineData: { current_snapshot: [], timeline: [] },
      isLoading: false,
      error: null,

      // Actions
      setLanguage: (lang) => set({ language: lang }),
      setEvents: (events) => set({ events }),
      setTimeFilter: (timeFilter) => set({ timeFilter }),

      // Event filter
      toggleFilter: (key) =>
        set((state) => ({
          filters: { ...state.filters, [key]: !state.filters[key] },
        })),

      // Filter to on/off all checkboxes
      toggleAllFilters: (value) =>
        set((state) => ({
          filters: Object.keys(state.filters).reduce((acc, key) => {
            acc[key] = value;
            return acc;
          }, {}),
        })),
      fetchAllData: async () => {
        set({ isLoading: true, error: null });
        try {
          // Робимо два запити паралельно для швидкості
          const [statsRes, timelineRes] = await Promise.all([
            fetch("http://127.0.0.1:8000/api/cp-stats"),
            fetch("http://127.0.0.1:8000/api/timeline"),
          ]);

          if (!statsRes.ok || !timelineRes.ok) {
            throw new Error("Failed to fetch analytics data from backend");
          }

          const statsJson = await statsRes.json();
          const timelineJson = await timelineRes.json();

          set({
            statsData: statsJson.data,
            timelineData: timelineJson.data,
            isLoading: false,
          });
        } catch (err) {
          console.error("Error fetching data:", err);
          set({ error: err.message, isLoading: false });
        }
      },
    }),
    {
      name: "tracker-storage", // Ключ для збереження стану в localStorage

      // Important not: partialize save to localStorage only language and filters.
      // Events ignore because we always get data in real time
      partialize: (state) => ({
        language: state.language,
        filters: state.filters,
        timeFilter: state.timeFilter,
      }),
    },
  ),
);

export default useAppStore;
