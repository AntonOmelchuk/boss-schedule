import { CATEGORIES, EMOJI_MAP, RELATION } from "./constants";

/**
 * Retrieves the corresponding emoji icon for a given event type from the mapped dictionary.
 * Falls back to a default combat sword emoji if the type is unknown or missing.
 * @param {string} type - The unique type descriptor of the event.
 * @returns {string} The emoji character representing the event type.
 */
export const getEmojiIcon = (type) => EMOJI_MAP[type] || "⚔️";

/**
 * Formats the remaining time in milliseconds into a localized human-readable countdown string.
 * @param {number} msDiff - The time difference in milliseconds.
 * @param {boolean} detailed - Toggle for a highly descriptive format (with days and seconds) vs compact.
 * @param {Object} t - Localization/translation object containing unit suffixes (days, hours, minutes, seconds).
 * @returns {string|null} Formatted countdown timer string or null if the target time is already in the past.
 */
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
 * Calculates the next active UTC timestamp for recurring daily PvP events.
 * Automatically schedules the target timestamp for the following day if all daily windows have already passed.
 * @param {string[]} timeArray - Array of scheduled daily execution times (e.g., ["02:00", "10:00", "18:00"]).
 * @returns {number} Millisecond timestamp of the next upcoming PvP event.
 */
export function getNextPvPTimestamp(timeArray) {
  const now = new Date();
  // Calculate current elapsed time of the day in minutes under UTC timezone
  const currentTotalMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();

  // Parse time strings (HH:MM) to total minutes from midnight and sort them chronologically
  const eventMinutes = timeArray
    .map((t) => {
      const [h, m] = t.split(":");
      return parseInt(h) * 60 + parseInt(m);
    })
    .sort((a, b) => a - b);

  // Search for the closest remaining execution window scheduled for today
  let nextMin = eventMinutes.find((m) => m > currentTotalMinutes);
  let isTomorrow = false;

  // If no remaining schedules are left today, wrap around to the first slot of tomorrow
  if (nextMin === undefined) {
    nextMin = eventMinutes[0];
    isTomorrow = true;
  }

  const nextDate = new Date();
  if (isTomorrow) nextDate.setUTCDate(nextDate.getUTCDate() + 1);
  nextDate.setUTCHours(Math.floor(nextMin / 60), nextMin % 60, 0, 0);

  return nextDate.getTime();
}

/**
 * Resolves active diplomatic branding, gradients, text sizing, icons, and glowing border designs
 * for a specific card relative to the target's political relationship with the alliance.
 * @param {string} rel - The alignment category (Enemy, Alliance, or Neutral/default).
 * @returns {Object} Complete visual styling token dictionary containing CSS gradient templates and glow configurations.
 */
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
        "shadow-[0_0_15px_rgba(16,185,129,0.08)] hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] " +
        "hover:border-emerald-500/20",
    };
  }

  // Default / Neutral diplomatic status settings (Golden-Amber themed)
  return {
    gradientStyle:
      "conic-gradient(from 90deg at 50% 50%, #0f172a 0%, #f59e0b 50%, #78350f 75%, #0f172a 100%)",
    titleClass: "text-slate-100 drop-shadow-[0_2px_8px_rgba(245,158,11,0.35)]",
    badgeIcon: "👑",
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    iconBorder: "border-amber-500/30 text-amber-400 bg-amber-950/20",
    glowClass:
      "shadow-[0_0_15px_rgba(245,158,11,0.08)] hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] hover:border-amber-500/20",
  };
};

/**
 * Calculates the exact upcoming UTC timestamp of a weekly event based on day and time.
 * Automatically increments by 1 week (7 days) if the target day's event for the current week has already expired.
 * @param {number} dayOfWeek - Standard UTC day index (0 for Sunday, 1 for Monday, up to 6 for Saturday).
 * @param {string} timeStr - Event starting time formatted as a string (HH:MM).
 * @returns {number} Millisecond timestamp representing the exact next weekly occurrence of the event.
 */
export const getNextWeeklyEvent = (dayOfWeek, timeStr) => {
  const [h, m] = timeStr.split(":").map(Number);
  const now = new Date();
  const target = new Date();

  target.setUTCHours(h, m, 0, 0);

  let diff = dayOfWeek - now.getUTCDay();

  // If the target day has already passed or is today but the time has expired, move to next week
  if (diff < 0 || (diff === 0 && now.getTime() >= target.getTime())) {
    diff += 7;
  }

  target.setUTCDate(target.getUTCDate() + diff);
  return target.getTime();
};

/**
 * Evaluates whether an event qualifies for the "SWAT" category (late-night active window restrictions).
 * Identifies if the event category is Epic and if its scheduled time falls between 1:00 AM and 6:00 AM UTC.
 * @param {string} category - The type of event category.
 * @param {number} ts - Event target execution timestamp in milliseconds.
 * @returns {boolean} True if the event triggers SWAT warnings, otherwise false.
 */
export const checkIsSwat = (category, ts) =>
  category === CATEGORIES.Epic &&
  (() => {
    const hours = new Date(ts).getUTCHours();
    return hours >= 1 && hours < 6;
  })();
