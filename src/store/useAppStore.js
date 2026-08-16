import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CATEGORIES, LANGUAGES, TIME_FILTERS } from "../constants/general";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const useAppStore = create(
  persist(
    (set, get) => ({
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

      selectedCPs: {},

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

      defaultLeadTime: 30, // Default lead time in minutes (for settings slider)
      pushAlerts: {}, // Structure: { "zaken": { leadTimeMinutes: 30 } }
      primeTime: { from: "07:00", to: "23:00" },
      // Actions
      setPrimeTime: (primeTime) => set({ primeTime }),
      setLanguage: (lang) => set({ language: lang }),
      setEvents: (events) => set({ events }),
      setTimeFilter: (timeFilter) => set({ timeFilter }),
      setSelectedCPs: (selectedCPs) => set({ selectedCPs }),

      // PUSH ALERTS ACTIONS
      setDefaultLeadTime: (minutes) =>
        set({ defaultLeadTime: Number(minutes) }),

      /**
       * Toggles push alert for a specific event with limit check (max 5)
       * @returns {boolean} true if alert was toggled, false if limit was reached
       */
      togglePushAlert: (eventId, customLeadTime) => {
        const { pushAlerts, defaultLeadTime } = get();
        const leadTimeMinutes = customLeadTime || defaultLeadTime;

        // If alert already active -> remove it
        if (pushAlerts[eventId]) {
          const updatedAlerts = { ...pushAlerts };
          delete updatedAlerts[eventId];
          set({ pushAlerts: updatedAlerts });
          return true;
        }

        // Check limit (max 5 active alerts)
        if (Object.keys(pushAlerts).length >= 5) {
          return false; // Limit reached
        }

        // Add new alert
        set({
          pushAlerts: {
            ...pushAlerts,
            [eventId]: { leadTimeMinutes },
          },
        });
        return true;
      },

      removePushAlert: (eventId) =>
        set((state) => {
          const updatedAlerts = { ...state.pushAlerts };
          delete updatedAlerts[eventId];
          return { pushAlerts: updatedAlerts };
        }),

      cleanExpiredAlerts: (activeEventsList) => {
        const { pushAlerts } = get();
        const now = Date.now();
        let hasChanges = false;
        const updatedAlerts = { ...pushAlerts };

        // Map with actual future events { [eventId]: timestamp }
        const activeEventsMap = new Map(
          activeEventsList.map((e) => [e.id, e.ts]),
        );

        Object.keys(updatedAlerts).forEach((eventId) => {
          const eventTs = activeEventsMap.get(eventId);

          // If there is not event among active || respawn time left
          if (!eventTs || eventTs <= now) {
            delete updatedAlerts[eventId];
            hasChanges = true;
          }
        });

        if (hasChanges) {
          set({ pushAlerts: updatedAlerts });
        }
      },

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
            let errorMessage = `HTTP error! Status: ${res.status}`;
            try {
              const errorJson = await res.json();
              if (errorJson.message) errorMessage = errorJson.message;
            } catch {
              throw new Error(errorMessage);
            }
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

          const extractedMessage =
            typeof err === "string"
              ? err
              : err?.message ||
                "Failed to fetch epic data. Please check your connection or CORS settings.";

          set({ error: extractedMessage, loadingEpics: false });
        }
      },
    }),
    {
      name: "tracker-storage",

      // Important not: partialize save to localStorage only language and filters.
      // Events ignore because we always get data in real time
      partialize: (state) => ({
        language: state.language,
        filters: state.filters,
        timeFilter: state.timeFilter,
        selectedCPs: state.selectedCPs,
        defaultLeadTime: state.defaultLeadTime,
        pushAlerts: state.pushAlerts,
      }),
    },
  ),
);

export default useAppStore;
