import * as htmlToImage from "html-to-image";

import { MAKE_SCREENSHOT_STATUS } from "./constants";

/**
 * Captures a visual snapshot of a DOM element specified by tableRef and triggers a file download.
 * Handles temporary hiding of flagged elements during generation and updates state indicators.
 * @param {React.RefObject<HTMLElement>} tableRef - React reference pointing to the DOM node to capture.
 * @param {Function} setScreenshotSuccess - State dispatch function updating the current capture status.
 * @returns {Promise<void>} A promise that resolves when the capture and download sequence completes.
 */
export const takeScreenshot = async (tableRef, setScreenshotSuccess) => {
  if (!tableRef.current) return;
  setScreenshotSuccess(MAKE_SCREENSHOT_STATUS.Progress);

  try {
    const element = tableRef.current;

    // 1. Hide element which shouldn't be on screenshot (remove buttons)
    const ignoredElements = element.querySelectorAll(
      '[data-html2canvas-ignore="true"]',
    );
    ignoredElements.forEach((el) =>
      el.style.setProperty("display", "none", "important"),
    );

    const dataUrl = await htmlToImage.toPng(element, {
      backgroundColor: "#020617", // (slate-950)
      pixelRatio: 2, // Double quality
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

    // 3. Make remove buttons visible again
    ignoredElements.forEach((el) => el.style.removeProperty("display"));

    // 4. start download the image
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `alliance-schedule-${new Date().toISOString().slice(0, 10)}.png`;
    link.click();

    setScreenshotSuccess(MAKE_SCREENSHOT_STATUS.Success);
    setTimeout(() => setScreenshotSuccess(MAKE_SCREENSHOT_STATUS.None), 3000);
  } catch (err) {
    console.error("Error during capture:", err);

    if (tableRef.current) {
      tableRef.current
        .querySelectorAll('[data-html2canvas-ignore="true"]')
        .forEach((el) => el.style.removeProperty("display"));
    }

    setScreenshotSuccess(MAKE_SCREENSHOT_STATUS.Error);
    setTimeout(() => setScreenshotSuccess(MAKE_SCREENSHOT_STATUS.None), 5000);
  }
};
