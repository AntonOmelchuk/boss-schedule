import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CATEGORIES, LANGUAGES, TIME_FILTERS } from "../utils/constants";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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
      // Summary Cards
      summaryData: null,
      // Epics Stats
      epicData: null,
      loadingEpics: false,

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
      fetchAllStatData: async () => {
        set({ isLoading: true, error: null });
        try {
          const [statsRes, timelineRes, summaryRes] = await Promise.all([
            fetch(`${BASE_URL}/api/cp-stats`),
            fetch(`${BASE_URL}/api/timeline`),
            fetch(`${BASE_URL}/api/summary`),
          ]);

          if (!statsRes.ok || !timelineRes.ok || !summaryRes.ok) {
            throw new Error("Failed to fetch analytics data from backend");
          }

          const statsJson = await statsRes.json();
          const timelineJson = await timelineRes.json();
          const summaryJson = await summaryRes.json();

          set({
            statsData: statsJson.data ? { ...statsJson.data } : null,
            timelineData: Array.isArray(timelineJson.data)
              ? [...timelineJson.data]
              : timelineJson.data,
            summaryData: summaryJson.data ? { ...summaryJson.data } : null,
            isLoading: false,
          });
        } catch (err) {
          console.error("Error fetching analytics data:", err);
          set({ error: err.message, isLoading: false });
        }
      },

      fetchEpicData: async () => {
        set({ loadingEpics: true, error: null });
        try {
          const res = await fetch(`${BASE_URL}/api/epics`);

          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }

          const json = await res.json();

          if (json.status === "success") {
            set({
              epicData: { ...json.data },
              loadingEpics: false,
            });
          } else {
            throw new Error(json.message || "Failed to load epic data");
          }
        } catch (err) {
          console.error("Error fetching epic data:", err);
          set({ error: err.message, loadingEpics: false });
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
