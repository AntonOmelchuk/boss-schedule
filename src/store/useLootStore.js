import { create } from "zustand";
import { persist } from "zustand/middleware";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const useLootStore = create(
  persist(
    (set, get) => ({
      // --- STATE ---
      parties: [],
      isLoadingParties: false,
      partiesError: null,

      // Lots builder state
      lots: [
        {
          id: `lot-${Date.now()}-1`,
          items: [],
          customText: "",
        },
      ],

      // Distribution results state
      results: [],
      isRolling: false,

      // Simple party randomizer state (mobile mode)
      shuffledParties: [],

      /**
       * Fetch party list from backend API
       */
      fetchParties: async () => {
        set({ isLoadingParties: true, partiesError: null });

        try {
          const response = await fetch(`${BASE_URL}/api/cp-list`);

          if (!response.ok) {
            throw new Error(`Failed to fetch parties: ${response.statusText}`);
          }

          const data = await response.json();
          const currentParties = get().parties;

          // Preserve previous active checkbox states if party already exists in local storage
          const updatedParties = data.map((fetchedParty) => {
            const existingParty = currentParties.find(
              (p) => p.name === fetchedParty.name,
            );
            return {
              ...fetchedParty,
              active: existingParty !== undefined ? existingParty.active : true,
            };
          });

          set({ parties: updatedParties, isLoadingParties: false });
        } catch (error) {
          console.error("Error loading parties:", error);
          set({
            partiesError: error.message || "Failed to load party list",
            isLoadingParties: false,
          });
        }
      },

      setParties: (partiesList) =>
        set({
          parties: partiesList.map((p) => ({
            ...p,
            active: p.active !== undefined ? p.active : true,
          })),
        }),

      togglePartyActive: (partyId) =>
        set((state) => ({
          parties: state.parties.map((p) =>
            p.id === partyId ? { ...p, active: !p.active } : p,
          ),
        })),

      selectAllParties: (activeState = true) =>
        set((state) => ({
          parties: state.parties.map((p) => ({ ...p, active: activeState })),
        })),

      // --- ACTIONS: Lots Builder ---

      addLot: () =>
        set((state) => ({
          lots: [
            ...state.lots,
            {
              id: `lot-${Date.now()}-${state.lots.length + 1}`,
              items: [],
              customText: "",
            },
          ],
        })),

      removeLot: (lotId) =>
        set((state) => {
          const filtered = state.lots.filter((l) => l.id !== lotId);
          return {
            lots:
              filtered.length > 0
                ? filtered
                : [{ id: `lot-${Date.now()}`, items: [], customText: "" }],
          };
        }),

      addItemToLot: (lotId, presetItem) =>
        set((state) => {
          const updatedLots = state.lots.map((lot) => {
            if (lot.id !== lotId) return lot;

            const existingItemIndex = lot.items.findIndex(
              (i) => i.id === presetItem.id,
            );
            let updatedItems = [...lot.items];

            if (existingItemIndex > -1) {
              updatedItems[existingItemIndex] = {
                ...updatedItems[existingItemIndex],
                count: updatedItems[existingItemIndex].count + 1,
              };
            } else {
              updatedItems.push({
                ...presetItem,
                count: 1,
              });
            }

            return { ...lot, items: updatedItems };
          });

          // Automatically append new empty lot if current target is the last lot
          const isLastLot = state.lots[state.lots.length - 1].id === lotId;
          if (isLastLot) {
            updatedLots.push({
              id: `lot-${Date.now()}`,
              items: [],
              customText: "",
            });
          }

          return { lots: updatedLots };
        }),

      updateItemCount: (lotId, itemId, delta) =>
        set((state) => ({
          lots: state.lots.map((lot) => {
            if (lot.id !== lotId) return lot;

            const updatedItems = lot.items
              .map((item) => {
                if (item.id !== itemId) return item;
                const newCount = item.count + delta;
                return newCount > 0 ? { ...item, count: newCount } : null;
              })
              .filter(Boolean);

            return { ...lot, items: updatedItems };
          }),
        })),

      removeItemFromLot: (lotId, itemId) =>
        set((state) => ({
          lots: state.lots.map((lot) => {
            if (lot.id !== lotId) return lot;
            return { ...lot, items: lot.items.filter((i) => i.id !== itemId) };
          }),
        })),

      updateLotCustomText: (lotId, text) =>
        set((state) => ({
          lots: state.lots.map((lot) =>
            lot.id === lotId ? { ...lot, customText: text } : lot,
          ),
        })),

      // --- ACTIONS: Randomizer Logic ---

      runLootDistribution: () => {
        const { parties, lots } = get();
        const activeParties = parties.filter((p) => p.active);

        if (activeParties.length === 0) return;

        const validLots = lots.filter(
          (l) => l.items.length > 0 || l.customText.trim() !== "",
        );
        if (validLots.length === 0) return;

        set({ isRolling: true });

        // Simulate rolling animation delay
        setTimeout(() => {
          let pool = [...activeParties];
          const calculatedResults = [];

          validLots.forEach((lot, index) => {
            // Reset round pool if all active parties received a lot
            if (pool.length === 0) {
              pool = [...activeParties];
            }

            const rolls = {};
            let highestRoll = -1;
            let winner = null;

            pool.forEach((party) => {
              const rollValue = Math.floor(Math.random() * 100) + 1;
              rolls[party.id] = rollValue;

              if (rollValue > highestRoll) {
                highestRoll = rollValue;
                winner = party;
              }
            });

            // Exclude winner from pool for remaining lots in current round
            pool = pool.filter((p) => p.id !== winner.id);

            calculatedResults.push({
              lotId: lot.id,
              lotNumber: index + 1,
              items: lot.items,
              customText: lot.customText,
              winnerPartyId: winner.id,
              winnerPartyName: winner.name,
              rolls,
            });
          });

          set({ results: calculatedResults, isRolling: false });
        }, 2000);
      },

      shuffleParties: () => {
        const { parties } = get();
        const activeParties = parties.filter((p) => p.active);

        set({ isRolling: true });

        setTimeout(() => {
          // Fisher-Yates shuffle algorithm
          const shuffled = [...activeParties];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }

          set({ shuffledParties: shuffled, isRolling: false });
        }, 1500);
      },

      resetLootSharing: () =>
        set({
          lots: [{ id: `lot-${Date.now()}`, items: [], customText: "" }],
          results: [],
          shuffledParties: [],
          isRolling: false,
        }),
    }),
    {
      name: "alliance-loot-storage",
      partialize: (state) => ({
        lots: state.lots,
        results: state.results,
        parties: state.parties,
      }),
    },
  ),
);
