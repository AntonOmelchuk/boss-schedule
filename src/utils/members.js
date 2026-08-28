import { MEMBER_COLORS } from "../constants/members";

export const getMemberTheme = (name) => {
  const theme = MEMBER_COLORS[name] || { start: "#f59e0b", end: "#d97706" };
  return {
    borderColor: `border-[${theme.start}]/50`,
    shadowColor: `shadow-[0_0_50px_${theme.start}33]`,
    glowStyle: {
      borderColor: theme.start,
      boxShadow: `0 0 30px ${theme.start}66`,
    },
    gradientStyle: {
      background: `linear-gradient(135deg, ${theme.start}, ${theme.end})`,
    },
    startColor: theme.start,
    endColor: theme.end,
  };
};

export const getCustomRingColors = (memberName, theme) => {
  const key = (memberName || "").toLowerCase();

  if (key === "fergi") {
    return {
      innerColor: theme.startColor,
      outerColor: "#ffffff",
    };
  }
  if (key === "zukadaddy") {
    return {
      innerColor: "#ef4444",
      outerColor: theme.startColor,
    };
  }
  if (key === "lapestopasto") {
    return {
      innerColor: "#f59e0b",
      outerColor: theme.startColor,
    };
  }
  if (key === "maniacshrek" || key === "ansol") {
    return {
      innerColor: "#f59e0b",
      outerColor: theme.startColor,
    };
  }

  return {
    innerColor: `${theme.startColor}88`,
    outerColor: theme.endColor,
  };
};

// Helper for top 3 rank item styles
export const getRankStyles = (idx) => {
  const topStyles = [
    {
      font: "text-lg md:text-xl font-bold",
      color: "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.2)]",
    },
    {
      font: "text-lg md:text-xl font-bold",
      color: "text-slate-300",
    },
    {
      font: "text-base md:text-lg font-bold",
      color: "text-amber-600/90",
    },
  ];

  return (
    topStyles[idx] || {
      font: "text-xs md:text-base font-semibold",
      color: "text-white group-hover:text-amber-400",
    }
  );
};
