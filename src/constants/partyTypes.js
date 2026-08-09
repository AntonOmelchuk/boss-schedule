import archersIcon from "../assets/ptTypes/archers.png";
import dominatorsIcon from "../assets/ptTypes/dominators.png";
import magesIcon from "../assets/ptTypes/mages.png";
import stoppersIcon from "../assets/ptTypes/stoppers.png";

export const PARTY_TYPES = {
  MAGES: {
    id: "MAGES",
    label: "Mages",
    icon: magesIcon,
    cardBg: "bg-indigo-950/60 border-indigo-500/40 hover:border-indigo-500",
    badgeBg: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  },
  ARCHERS: {
    id: "ARCHERS",
    label: "Archers",
    icon: archersIcon,
    cardBg: "bg-emerald-950/60 border-emerald-500/40 hover:border-emerald-500",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  STOPPERS: {
    id: "STOPPERS",
    label: "Stoppers",
    icon: stoppersIcon,
    cardBg: "bg-rose-950/60 border-rose-500/40 hover:border-rose-500",
    badgeBg: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  },
  DOMINATORS: {
    id: "DOMINATORS",
    label: "Dominators",
    icon: dominatorsIcon,
    cardBg: "bg-amber-950/60 border-amber-500/40 hover:border-amber-500",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
};

export const PARTY_TYPES_LIST = Object.values(PARTY_TYPES);
