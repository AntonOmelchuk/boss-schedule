export const categorize = (name) => {
  const n = name.toLowerCase();
  if (n.startsWith("ch -") || n.startsWith("ch-") || n.includes("clan hall"))
    return "clanhall";
  if (n.startsWith("siege")) return "siege";
  return "boss";
};

export const getEmojiIcon = (name, category) => {
  const n = name.toLowerCase();
  if (n.includes("valakas")) return "🔥";
  if (n.includes("antharas")) return "🐉";
  if (n.includes("baium")) return "👑";
  if (n.includes("ant queen") || n.includes("queen ant")) return "🐜";
  if (n.includes("orfen")) return "🕸️";
  if (n.includes("zaken")) return "🏴‍☠️";
  if (n.includes("core")) return "⚙️";
  if (n.includes("frintezza")) return "🎻";
  if (category === "siege") return "🏰";
  if (category === "clanhall") return "🏠";
  return "💀";
};

// Форматування часу адаптовано під активну мову
export const formatRemaining = (msDiff, detailed, t) => {
  if (msDiff <= 0) return null;

  let s = Math.floor(msDiff / 1000);
  const d = Math.floor(s / 86400);
  s %= 86400;
  const h = Math.floor(s / 3600);
  s %= 3600;
  const m = Math.floor(s / 60);
  s %= 60;

  const pad = (num) => String(num).padStart(2, "0");

  if (detailed) {
    if (d > 0) return `${pad(d)}${t.d} ${pad(h)}${t.h} ${pad(m)}${t.m}`;
    if (h > 0) return `${pad(h)}${t.h} ${pad(m)}${t.m} ${pad(s)}${t.s}`;
    return `${pad(m)}${t.m} ${pad(s)}${t.s}`;
  } else {
    if (d > 0) return `${d}${t.daysStr} ${pad(h)}:${pad(m)}:${pad(s)}`;
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }
};
