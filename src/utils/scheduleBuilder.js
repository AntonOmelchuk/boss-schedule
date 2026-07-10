import * as htmlToImage from "html-to-image";

import { MAKE_SCREENSHOT_STATUS } from "./constants";

export const takeScreenshot = async (tableRef, setScreenshotSuccess) => {
  if (!tableRef.current) return;
  setScreenshotSuccess(MAKE_SCREENSHOT_STATUS.Progress);

  try {
    const element = tableRef.current;

    // 1. Тимчасово ховаємо елементи, які не мають бути на скріншоті (кнопки видалення)
    const ignoredElements = element.querySelectorAll(
      '[data-html2canvas-ignore="true"]',
    );
    ignoredElements.forEach((el) =>
      el.style.setProperty("display", "none", "important"),
    );

    // 2. Викликаємо встановлений npm-пакет НАПРЯМУ без жодних CDN скриптів
    const dataUrl = await htmlToImage.toPng(element, {
      backgroundColor: "#020617", // Колір фону таблиці (slate-950)
      pixelRatio: 2, // Подвійна чіткість для гарного читання в Discord
      style: {
        backgroundColor: "#020617",
        color: "#f1f5f9",
      },
      filter: (node) => {
        if (
          node.getAttribute &&
          node.getAttribute("data-html2canvas-ignore") === "true"
        ) {
          return false;
        }
        return true;
      },
    });

    // 3. Повертаємо видимість кнопкам на самому сайті
    ignoredElements.forEach((el) => el.style.removeProperty("display"));

    // 4. Запускаємо скачування файлу
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `alliance-schedule-${new Date().toISOString().slice(0, 10)}.png`;
    link.click();

    setScreenshotSuccess(MAKE_SCREENSHOT_STATUS.Success);
    setTimeout(() => setScreenshotSuccess(MAKE_SCREENSHOT_STATUS.None), 3000);
  } catch (err) {
    console.error("Error during capture:", err);

    // Про всяк випадок повертаємо кнопки на місце при помилці
    if (tableRef.current) {
      tableRef.current
        .querySelectorAll('[data-html2canvas-ignore="true"]')
        .forEach((el) => el.style.removeProperty("display"));
    }

    setScreenshotSuccess(MAKE_SCREENSHOT_STATUS.Error);
    setTimeout(() => setScreenshotSuccess(MAKE_SCREENSHOT_STATUS.None), 5000);
  }
};

export const generateDiscordFormat = (
  events,
  t,
  getEventIsoTime,
  formatTimeForZone,
  formatDateForZone,
  language,
  showLocalTime,
  localTimezone,
  activeTimezones,
  setCopiedStatus,
) => {
  let output = `${t.sbDiscordHeader}\n========================================\n\n`;

  events.forEach(({ ts, name, icon, category }) => {
    const isoTime = getEventIsoTime(ts);
    const serverTimeFormatted = formatTimeForZone(isoTime, "UTC");
    const eventDate = formatDateForZone(isoTime, "UTC", language);

    output += `${icon} **${name}** (${category})\n`;
    output += `   • ${t.sbDiscordDate}: ${eventDate}\n`;
    output += `   • ${t.sbDiscordServer}: 🕐 ${serverTimeFormatted} UTC\n`;

    if (showLocalTime) {
      const localTimeFormatted = formatTimeForZone(isoTime, localTimezone);
      output += `   • ${t.sbDiscordLocal}: 🏠 ${localTimeFormatted}\n`;
    }

    activeTimezones.forEach((tz) => {
      const shortTzName = tz.split("/").pop().replace("_", " ");
      output += `   • ${shortTzName}: 🕒 ${formatTimeForZone(isoTime, tz)}\n`;
    });
    output += "\n";
  });

  output += t.sbDiscordFooter;

  navigator.clipboard.writeText(output).then(() => {
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 3000);
  });
};
