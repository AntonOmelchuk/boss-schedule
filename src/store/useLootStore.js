import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLootStore = create(
  persist(
    (set, get) => ({
      // --- STATE ---
      // Список КП (можна ініціалізувати або завантажувати з вашого бекенду)
      parties: [
        { id: "p1", name: "Party Alpha", active: true },
        { id: "p2", name: "Party Bravo", active: true },
        { id: "p3", name: "Party Charlie", active: true },
        { id: "p4", name: "Party Delta", active: true },
      ],

      // Конструктор лотів
      lots: [
        {
          id: `lot-${Date.now()}-1`,
          items: [],
          customText: "",
        },
      ],

      // Результати розиграшу
      results: [], // Array of { lotId, lotNumber, items, customText, winnerPartyId, winnerPartyName, rolls }
      isRolling: false,

      // Простий рандомайзер КП (для мобілок)
      shuffledParties: [],

      // --- ACTIONS: Parties ---
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
      // Додати новий порожній лот
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

      // Видалити лот за ID
      removeLot: (lotId) =>
        set((state) => {
          const filtered = state.lots.filter((l) => l.id !== lotId);
          // Завжди тримаємо хоча б один порожній лот
          return {
            lots:
              filtered.length > 0
                ? filtered
                : [{ id: `lot-${Date.now()}`, items: [], customText: "" }],
          };
        }),

      // Додати предмет у лот (якщо вже є — збільшує counter)
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

          // Перевіряємо, чи це був останній лот. Якщо так — автостворюємо наступний порожній
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

      // Змінити кількість предмета (+1 / -1)
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

      // Видалити предмет із лоту
      removeItemFromLot: (lotId, itemId) =>
        set((state) => ({
          lots: state.lots.map((lot) => {
            if (lot.id !== lotId) return lot;
            return { ...lot, items: lot.items.filter((i) => i.id !== itemId) };
          }),
        })),

      // Оновити кастомний текст лоту
      updateLotCustomText: (lotId, text) =>
        set((state) => ({
          lots: state.lots.map((lot) =>
            lot.id === lotId ? { ...lot, customText: text } : lot,
          ),
        })),

      // --- ACTIONS: Randomizer Logic ---

      // 1. Повний розподіл Лотів (Кубики + Раунди + Обмеження перемог)
      runLootDistribution: () => {
        const { parties, lots } = get();
        const activeParties = parties.filter((p) => p.active);

        if (activeParties.length === 0) return;

        // Фільтруємо лише непорожні лоти
        const validLots = lots.filter(
          (l) => l.items.length > 0 || l.customText.trim() !== "",
        );
        if (validLots.length === 0) return;

        set({ isRolling: true });

        // Генерація розиграшу з паузою для анімації (2 секунди)
        setTimeout(() => {
          let pool = [...activeParties]; // Пул доступних КП у поточному раунді
          const calculatedResults = [];

          validLots.forEach((lot, index) => {
            // Якщо пул спорожнився (всі КП вже отримали по 1 лоту), оновлюємо пул для наступного раунду
            if (pool.length === 0) {
              pool = [...activeParties];
            }

            // Робимо кидок кубика (1-100) для кожного КП з актуального пулу
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

            // Виключаємо переможця з пулу кандидатів до наступного раунду
            pool = pool.filter((p) => p.id !== winner.id);

            calculatedResults.push({
              lotId: lot.id,
              lotNumber: index + 1,
              items: lot.items,
              customText: lot.customText,
              winnerPartyId: winner.id,
              winnerPartyName: winner.name,
              rolls, // Об'єкт { partyId: rollValue }
            });
          });

          set({ results: calculatedResults, isRolling: false });
        }, 2000);
      },

      // 2. Простий рандомайзер списка КП (для мобілок)
      shuffleParties: () => {
        const { parties } = get();
        const activeParties = parties.filter((p) => p.active);

        set({ isRolling: true });

        setTimeout(() => {
          // Алгоритм Фішера-Йейтса для чесного перемішування
          const shuffled = [...activeParties];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }

          set({ shuffledParties: shuffled, isRolling: false });
        }, 1500);
      },

      // 3. Завершити процес і очистити все (Done / Clear)
      resetLootSharing: () =>
        set({
          lots: [{ id: `lot-${Date.now()}`, items: [], customText: "" }],
          results: [],
          shuffledParties: [],
          isRolling: false,
        }),
    }),
    {
      name: "alliance-loot-storage", // ключ у localStorage
      partialize: (state) => ({
        lots: state.lots,
        results: state.results,
        parties: state.parties,
      }),
    },
  ),
);
