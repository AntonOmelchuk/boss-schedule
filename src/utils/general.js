import { EMOJI_MAP } from "./constants";

export const getEmojiIcon = (type) => EMOJI_MAP[type] || "⚔️";

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

/**
 * Розраховує найближчий Timestamp для щоденних PvP подій
 * @param {string[]} times - Масив годин (наприклад, ["02:00", "10:00"])
 */
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
