import * as htmlToImage from "html-to-image";

import { MAKE_SCREENSHOT_STATUS } from "../constants/general";

/**
 * Captures a visual snapshot of the loot distribution results DOM node and triggers a file download.
 * @param {React.RefObject<HTMLElement>} tableRef - React reference pointing to the DOM node to capture.
 * @param {Function} setScreenshotStatus - State dispatch function updating the current capture status.
 */
const takeLootScreenshot = async (tableRef, setScreenshotStatus) => {
  if (!tableRef.current) return;

  if (setScreenshotStatus) {
    setScreenshotStatus(MAKE_SCREENSHOT_STATUS.Progress);
  }

  try {
    const element = tableRef.current;

    // 1. Temporarily hide elements marked with data-html2canvas-ignore
    const ignoredElements = element.querySelectorAll(
      '[data-html2canvas-ignore="true"]',
    );
    ignoredElements.forEach((el) =>
      el.style.setProperty("display", "none", "important"),
    );

    // 2. Render image using html-to-image
    const dataUrl = await htmlToImage.toPng(element, {
      backgroundColor: "#020617", // slate-950
      pixelRatio: 2, // Double image quality
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

    // 3. Restore hidden elements
    ignoredElements.forEach((el) => el.style.removeProperty("display"));

    // 4. Download generated image
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `Loot_Distribution_${new Date().toISOString().slice(0, 10)}.png`;
    link.click();

    if (setScreenshotStatus) {
      setScreenshotStatus(MAKE_SCREENSHOT_STATUS.Success);
      setTimeout(() => setScreenshotStatus(MAKE_SCREENSHOT_STATUS.None), 3000);
    }
  } catch (err) {
    console.error("Error capturing loot results:", err);

    if (tableRef.current) {
      tableRef.current
        .querySelectorAll('[data-html2canvas-ignore="true"]')
        .forEach((el) => el.style.removeProperty("display"));
    }

    if (setScreenshotStatus) {
      setScreenshotStatus(MAKE_SCREENSHOT_STATUS.Error);
      setTimeout(() => setScreenshotStatus(MAKE_SCREENSHOT_STATUS.None), 5000);
    }
  }
};

export default takeLootScreenshot;
