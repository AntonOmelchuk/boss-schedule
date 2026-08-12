// src/utils/screenshot.js
import * as htmlToImage from "html-to-image";

/**
 * Captures a visual snapshot of a DOM element using html-to-image and triggers download.
 * @param {HTMLElement} element - DOM element to render.
 * @param {string} fileNamePrefix - Prefix for saved PNG file name.
 */
const takeTournamentScreenshot = async (
  element,
  fileNamePrefix = "Tournament_Results",
) => {
  if (!element) return;

  try {
    // 1. Temporarily hide elements marked with data-html2canvas-ignore
    const ignoredElements = element.querySelectorAll(
      '[data-html2canvas-ignore="true"]',
    );
    ignoredElements.forEach((el) =>
      el.style.setProperty("display", "none", "important"),
    );

    // 2. Render PNG image with double pixel ratio for high quality
    const dataUrl = await htmlToImage.toPng(element, {
      backgroundColor: "#020617", // slate-950
      pixelRatio: 2,
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

    // 4. Trigger download
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${fileNamePrefix}_${new Date()
      .toISOString()
      .slice(0, 10)}.png`;
    link.click();

    return true;
  } catch (err) {
    console.error("Error capturing tournament screenshot:", err);

    if (element) {
      element
        .querySelectorAll('[data-html2canvas-ignore="true"]')
        .forEach((el) => el.style.removeProperty("display"));
    }

    throw err;
  }
};

export default takeTournamentScreenshot;
