import { create } from "zustand";

// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const BASE_URL = "http://localhost:8000";

export const useDashboardStore = create((set) => ({
  data: null,
  members: [],
  isLoading: true,
  error: null,
  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${BASE_URL}/api/dashboard`);
      const json = await response.json();

      if (json.status === "success") {
        set({ data: json.data });
      } else {
        set({ error: "Failed to fetch dashboard data" });
      }
    } catch (err) {
      set({ error: err.message || "Error fetching data" });
    } finally {
      set({ isLoading: false });
    }
  },
  setMembers: (data) => set({ members: data }),
}));
