import { onValue, ref, remove, update } from "firebase/database";
import { create } from "zustand";

import { db } from "../services/firebase";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const useCPStore = create((set) => ({
  cpList: [],
  clansMap: {},
  cpMetaMap: {},
  isLoading: true,
  error: null,

  // New state for CP players
  playerList: [],
  isLoadingPlayers: false,

  initCpData: () => {
    fetch(`${BASE_URL}/api/cp-list`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch CP list");
        return res.json();
      })
      .then((data) => {
        const normalized = Array.isArray(data)
          ? data.map((cp) => (typeof cp === "string" ? cp : cp.name || cp.id))
          : [];
        set({ cpList: normalized, isLoading: false });
      })
      .catch((err) => {
        console.error("CP list fetch error:", err);
        set({ error: err.message, isLoading: false });
      });

    const clansRef = ref(db, "clans");
    const cpMetaRef = ref(db, "cp_meta");

    const unsubClans = onValue(clansRef, (snap) => {
      set({ clansMap: snap.val() || {} });
    });

    const unsubCpMeta = onValue(cpMetaRef, (snap) => {
      set({ cpMetaMap: snap.val() || {} });
    });

    return () => {
      unsubClans();
      unsubCpMeta();
    };
  },

  // Action to fetch player list for selected CP
  fetchPlayersForCp: async (cpName) => {
    if (!cpName) {
      set({ playerList: [], isLoadingPlayers: false });
      return;
    }

    set({ isLoadingPlayers: true, playerList: [] });

    try {
      const res = await fetch(
        `${BASE_URL}/api/cp-players?cp=${encodeURIComponent(cpName)}`,
      );

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const players = await res.json();
      set({ playerList: Array.isArray(players) ? players : [] });
    } catch (err) {
      console.error("Failed to load players for CP:", err);
      set({ playerList: [] });
    } finally {
      set({ isLoadingPlayers: false });
    }
  },

  updateCpClan: async (cpName, clanId) => {
    try {
      await update(ref(db, `cp_meta/${cpName}`), {
        clan_id: clanId === "unassigned" ? null : clanId,
        updated_at: Date.now(),
      });
    } catch (err) {
      console.error("Failed to update CP clan:", err);
    }
  },

  updateCpMeta: async (cpName, updatedFields) => {
    try {
      await update(ref(db, `cp_meta/${cpName}`), {
        ...updatedFields,
        updated_at: Date.now(),
      });
    } catch (err) {
      console.error("Failed to update CP meta:", err);
    }
  },

  addClan: async (clanName) => {
    if (!clanName?.trim()) return;
    const cleanName = clanName.trim();
    try {
      await update(ref(db, `clans/${cleanName}`), {
        id: cleanName,
        name: cleanName,
        created_at: Date.now(),
      });
    } catch (err) {
      console.error("Failed to add clan:", err);
    }
  },

  deleteClan: async (clanId) => {
    try {
      await remove(ref(db, `clans/${clanId}`));
    } catch (err) {
      console.error("Failed to delete clan:", err);
    }
  },
}));

export default useCPStore;
