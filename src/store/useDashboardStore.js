import { create } from "zustand";

// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const BASE_URL = "http://localhost:8000";

export const useDashboardStore = create((set, get) => ({
  data: null,
  members: [],
  isLoading: true,
  error: null,
  lastFetched: null, // Time of last success request

  fetchDashboardData: async (force = false) => {
    const { data, lastFetched } = get();
    const CACHE_TIME = 5 * 60 * 1000; // 5 min
    const isCacheValid =
      data && lastFetched && Date.now() - lastFetched < CACHE_TIME;

    // If data is "fresh" do nothing
    if (isCacheValid && !force) return;

    // Show loader if no data
    set({ isLoading: !data, error: null });

    try {
      const response = await fetch(`${BASE_URL}/api/dashboard`);
      const result = await response.json();

      set({
        data: result.data,
        isLoading: false,
        lastFetched: Date.now(),
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
  setMembers: (data) => set({ members: data }),
}));
