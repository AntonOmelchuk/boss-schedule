export const categorize = (name) => {
  const n = name.toLowerCase();
  if (n.startsWith("ch -") || n.startsWith("ch-") || n.includes("clan hall"))
    return "clanhall";
  if (n.startsWith("siege")) return "siege";
  return "boss";
};

export const getEmojiIcon = (name, category, type) => {
  const n = name.toLowerCase();
  // Перевірка PvP івентів за їх типом (або назвою)
  if (type === "mtb" || n.includes("multi team")) return "⚔️";
  if (type === "ctp" || n.includes("capture")) return "🚩";
  if (type === "ebc" || n.includes("epic boss")) return "🏆";
  if (type === "dm" || n.includes("death match")) return "💀";

  // Старі перевірки босів
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
  return "⚔️";
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

// 1. Конвертує дату і час (UTC-0) боса в Timestamp (мілісекунди)
export function parseBossTimeToUTC(dateStr, timeStr) {
  const [day, month, year] = dateStr.split(".");
  const [hours, minutes] = timeStr.split(":");
  // Date.UTC приймає місяці від 0 до 11 (тому month - 1)
  return Date.UTC(year, month - 1, day, hours, minutes, 0);
}

// 2. Визначає найближчий майбутній час для щоденних PvP івентів (UTC-0)
export function getNextPvPTimestamp(timeArray) {
  const now = new Date();
  // Поточний час у хвилинах від початку доби за UTC
  const currentTotalMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();

  // Перетворюємо масив часу ["02:00", ...] у хвилини
  const eventMinutes = timeArray
    .map((t) => {
      const [h, m] = t.split(":");
      return parseInt(h) * 60 + parseInt(m);
    })
    .sort((a, b) => a - b);

  // Шукаємо найближчий івент сьогодні
  let nextMin = eventMinutes.find((m) => m > currentTotalMinutes);
  let isTomorrow = false;

  // Якщо всі івенти на сьогодні закінчилися, беремо перший на завтра
  if (nextMin === undefined) {
    nextMin = eventMinutes[0];
    isTomorrow = true;
  }

  const nextDate = new Date();
  if (isTomorrow) nextDate.setUTCDate(nextDate.getUTCDate() + 1);
  nextDate.setUTCHours(Math.floor(nextMin / 60), nextMin % 60, 0, 0);

  return nextDate.getTime();
}
