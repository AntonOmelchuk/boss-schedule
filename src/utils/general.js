import { CATEGORIES, EMOJI_MAP, RELATION } from "./constants";

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

// Функція конфігурації дипломатичних стилів для кожної окремої картки в сітці
export const getDiplomacyConfig = (rel) => {
  if (rel === RELATION.Enemy) {
    return {
      gradientStyle:
        "conic-gradient(from 90deg at 50% 50%, #0f172a 0%, #ef4444 50%, #7f1d1d 75%, #0f172a 100%)",
      titleClass: "text-slate-100 drop-shadow-[0_2px_8px_rgba(239,68,68,0.35)]",
      badgeIcon: "💀",
      badgeClass: "bg-red-500/10 text-red-400 border-red-500/20",
      iconBorder: "border-red-500/30 text-red-400 bg-red-950/20",
      glowClass:
        "shadow-[0_0_15px_rgba(239,68,68,0.08)] hover:shadow-[0_0_25px_rgba(239,68,68,0.2)] hover:border-red-500/20",
    };
  }

  if (rel === RELATION.Alliance) {
    return {
      gradientStyle:
        "conic-gradient(from 90deg at 50% 50%, #0f172a 0%, #10b981 50%, #064e3b 75%, #0f172a 100%)",
      titleClass:
        "text-slate-100 drop-shadow-[0_2px_8px_rgba(16,185,129,0.35)]",
      badgeIcon: "🛡️",
      badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      iconBorder: "border-emerald-500/30 text-emerald-400 bg-emerald-950/20",
      glowClass:
        "shadow-[0_0_15px_rgba(16,185,129,0.08)] hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]" +
        "hover:border-emerald-500/20",
    };
  }

  // Дефолтний / Нейтральний статус (Золотий)
  return {
    gradientStyle:
      "conic-gradient(from 90deg at 50% 50%, #0f172a 0%, #f59e0b 50%, #78350f 75%, #0f172a 100%)",
    titleClass: "text-slate-100 drop-shadow-[0_2px_8px_rgba(245,158,11,0.35)]",
    badgeIcon: "👑",
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    iconBorder: "border-amber-500/30 text-amber-400 bg-amber-950/20",
    glowClass:
      "shadow-[0_0_15px_rgba(245,158,11,0.08)] hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]" +
      "hover:border-amber-500/20",
  };
};

export const getNextWeeklyEvent = (dayOfWeek, timeStr) => {
  const [h, m] = timeStr.split(":").map(Number);
  const now = new Date();
  const target = new Date();

  target.setUTCHours(h, m, 0, 0);

  let diff = dayOfWeek - now.getUTCDay();

  if (diff < 0 || (diff === 0 && now.getTime() >= target.getTime())) {
    diff += 7;
  }

  target.setUTCDate(target.getUTCDate() + diff);
  return target.getTime();
};

export const checkIsSwat = (category, ts) =>
  category === CATEGORIES.Epic &&
  (() => {
    const hours = new Date(ts).getUTCHours();
    return hours >= 1 && hours < 6;
  })();
