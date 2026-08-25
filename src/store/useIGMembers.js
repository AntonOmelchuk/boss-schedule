import { create } from "zustand";

// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const BASE_URL = "http://localhost:8000";

const useIGMembers = create((set) => ({
  members: [],
  loading: false,
  error: null,

  fetchMembers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${BASE_URL}/api/irongates-members`);
      const data = await response.json();

      if (data.status === "success") {
        const formattedData = data.data.map((member) => ({
          ...member,
          allPoints: member.all_points,
          cpNumber: member.cp_number,
          gvgClasses: member.gvg_classes,
          inClan: member.in_clan,
          mainClass: member.main_class,
          playClass: member.play_class,
          subClasses: member.sub_classes,
        }));

        set({ members: formattedData, loading: false });
      } else {
        set({ error: "Помилка при завантаженні даних", loading: false });
      }
    } catch (err) {
      set({ error: err.message || "Сталася мережева помилка", loading: false });
    }
  },
}));

export default useIGMembers;
