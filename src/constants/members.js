export const STORAGE_URL = import.meta.env.VITE_CLOUDFLARE_STORAGE;

// Mapping members with their avatars
export const MEMBERS_MAP = {
  toBe: { name: "toBe", image: `${STORAGE_URL}/avatars/toBe.png` },
  LapestoPasto: {
    name: "LapestoPasto",
    image: `${STORAGE_URL}/avatars/LapestoPasto.png`,
  },
  Fergi: { name: "Fergi", image: `${STORAGE_URL}/avatars/Fergi.png` },
  FERGI: { name: "Fergi", image: `${STORAGE_URL}/avatars/Fergi.png` },
  Ansol: { name: "Ansol", image: `${STORAGE_URL}/avatars/Ansol.png` },
  MWQueen: { name: "MWQueen", image: `${STORAGE_URL}/avatars/MWQueen.png` },
  Manol: { name: "Manol", image: `${STORAGE_URL}/avatars/Manol.png` },
  ManiacFiona: {
    name: "ManiacFiona",
    image: `${STORAGE_URL}/avatars/ManiacFiona.png`,
  },
  ManiacJerry: {
    name: "ManiacConan",
    image: `${STORAGE_URL}/avatars/ManiacConan.png`,
  },
  ManiacConan: {
    name: "ManiacConan",
    image: `${STORAGE_URL}/avatars/ManiacConan.png`,
  },
  ManiacShrek: {
    name: "ManiacShrek",
    image: `${STORAGE_URL}/avatars/ManiacShrek.png`,
  },
  Spektra: { name: "Spektra", image: `${STORAGE_URL}/avatars/Spektra.png` },
  ManiacTom: {
    name: "ManiacTom",
    image: `${STORAGE_URL}/avatars/ManiacTom.png`,
  },
  Vryo: { name: "Vryo", image: `${STORAGE_URL}/avatars/Vryo.png` },
  ZukaDaddy: {
    name: "ZukaDaddy",
    image: `${STORAGE_URL}/avatars/ZukaDaddy.png`,
  },
  "Iron Gates 2": {
    name: "Iron Gates 2",
  },
  WINSON: {
    name: "WINSON",
    image: `${STORAGE_URL}/avatars/WINSON.png`,
  },
};

export const MEMBER_COLORS = {
  toBe: { start: "#881337", end: "#4c0519" },
  FERGI: { start: "#0ea5e9", end: "#1e1b4b" },
  Fergi: { start: "#0ea5e9", end: "#1e1b4b" },
  Ansol: { start: "#334155", end: "#0f172a" },
  MWQueen: { start: "#eab308", end: "#ca8a04" },
  ManiacFiona: { start: "#84cc16", end: "#14532d" },
  ZukaDaddy: { start: "#7c3aed", end: "#1e1b4b" },
  ManiacJerry: { start: "#10b981", end: "#047857" },
  ManiacConan: { start: "#10b981", end: "#eab308" },
  ManiacShrek: { start: "#1e3a8a", end: "#0f172a" },
  LapestoPasto: { start: "#dc2626", end: "#18181b" },
  Spektra: { start: "#065f46", end: "#022c22" },
  Manol: { start: "#c084fc", end: "#1e1b4b" },
  ManiacTom: { start: "#f97316", end: "#b91c1c" },
  Vryo: { start: "#1d4ed8", end: "#b91c1c" },
  WINSON: { start: "#eab308", end: "#064e3b" },
  Winson: { start: "#eab308", end: "#064e3b" },
};

export const GVG_ROLES = [
  "Duelist",
  "Sagittarius",
  "Adventurer",
  "Archmage",
  "Mystic Muse",
  "Soultaker",
  "Cardinal",
  "Dominator",
];
