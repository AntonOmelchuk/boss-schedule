import { EVENT_TYPES } from "./utils/constants";

export const PVP_EVENTS = [
  {
    name: "Multi Team Battle",
    time: ["02:00", "10:00", "18:00"],
    type: EVENT_TYPES.MTB,
  },
  {
    name: "Capture The Base",
    time: ["04:00", "12:00", "20:00"],
    type: EVENT_TYPES.CTB,
  },
  {
    name: "Epic Boss Challenge",
    time: ["08:00", "16:00", "00:00"],
    type: EVENT_TYPES.EBC,
  },
  {
    name: "Death Match",
    time: ["06:00", "14:00", "22:00"],
    type: EVENT_TYPES.DM,
  },
];
