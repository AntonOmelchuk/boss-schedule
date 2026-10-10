import { CATEGORIES, EVENT_TYPES } from "./general";

export const PVP_EVENTS = [
  {
    name: EVENT_TYPES.MTB_FULL,
    time: ["02:00", "10:00", "18:00"],
    type: EVENT_TYPES.MTB,
    category: CATEGORIES.PVP,
  },
  {
    name: EVENT_TYPES.CTB_FULL,
    time: ["04:00", "12:00", "20:00"],
    type: EVENT_TYPES.CTB,
    category: CATEGORIES.PVP,
  },
  {
    name: EVENT_TYPES.EBC_FULL,
    time: ["08:00", "16:00", "00:00"],
    type: EVENT_TYPES.EBC,
    category: CATEGORIES.PVP,
  },
  {
    name: EVENT_TYPES.DM_FULL,
    time: ["06:00", "14:00", "22:00"],
    type: EVENT_TYPES.DM,
    category: CATEGORIES.PVP,
  },
];
