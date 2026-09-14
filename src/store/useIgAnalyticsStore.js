import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const useIgAnalyticsStore = create((set, get) => ({
  analyticsData: null,
  isLoading: false,
  error: null,
  selectedDays: null,
  selectedCPs: {}, // For line chart filtering

  fetchAnalytics: async (days = null, force = false) => {
    const { analyticsData, selectedDays } = get();
    if (analyticsData && selectedDays === days && !force) return;

    set({ isLoading: true, error: null, selectedDays: days });

    try {
      const queryParam = days ? `?days=${days}` : "";
      const response = await fetch(
        `${BASE_URL}/api/ig-analytics/cp-stats${queryParam}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch analytics: ${response.statusText}`);
      }

      const result = await response.json();
      const data = result.data;

      // Initialize selected CPs (default first 5 or all true) if empty
      const currentSelected = get().selectedCPs;
      if (
        data?.members_analytics &&
        Object.keys(currentSelected).length === 0
      ) {
        const initialSelection = {};
        data.members_analytics.forEach((member, index) => {
          initialSelection[member.name] = index < 5;
        });
        set({ selectedCPs: initialSelection });
      }

      set({
        analyticsData: data,
        isLoading: false,
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  setSelectedCPs: (selectedCPs) => set({ selectedCPs }),
}));
