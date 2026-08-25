import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const useIGMembers = create((set, get) => ({
  members: null,
  loading: false,
  error: null,
  lastFetched: null, // Time of last success request

  fetchMembers: async (force = false) => {
    const { members, lastFetched } = get();
    const CACHE_TIME = 5 * 60 * 1000; // 5 min
    const isCacheValid =
      members && lastFetched && Date.now() - lastFetched < CACHE_TIME;

    // If data is "fresh" do nothing
    if (isCacheValid && !force) return;

    // Show loader if no data
    set({ isLoading: !members, error: null });
    try {
      const response = await fetch(`${BASE_URL}/api/irongates-members`);
      const data = await response.json();
      console.log("data: ", data);
      if (data.status === "success") {
        set({ members: data.data, loading: false });
      } else {
        set({ error: "Something went wrong", loading: false });
      }
    } catch (err) {
      set({ error: err.message || "Сталася мережева помилка", loading: false });
    }
  },
}));

export default useIGMembers;
