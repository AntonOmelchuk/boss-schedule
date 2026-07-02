import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CATEGORIES, LANGUAGES } from "../utils/constants";

const useAppStore = create(
  persist(
    (set) => ({
      // Initial state
      language: LANGUAGES.EN,
      filters: {
        [CATEGORIES.Epic]: true,
        [CATEGORIES.PVP]: true,
        [CATEGORIES.CH]: true,
        [CATEGORIES.Siege]: true,
      },
      events: [], // data from Firebase

      // Actions
      setLanguage: (lang) => set({ language: lang }),

      setEvents: (events) => set({ events }),

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
    }),
    {
      name: "tracker-storage", // Ключ для збереження стану в localStorage

      // Important not: partialize save to localStorage only language and filters.
      // Events ignore because we always get data in real time
      partialize: (state) => ({
        language: state.language,
        filters: state.filters,
      }),
    },
  ),
);

export default useAppStore;
