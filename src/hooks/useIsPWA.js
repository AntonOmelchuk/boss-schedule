import { useEffect, useState } from "react";

export function getPWADisplayMode() {
  const isServer = typeof window === "undefined";
  if (isServer) return "browser";

  // 1. Android TWA (Trusted Web Activity)
  if (document.referrer.startsWith("android-app://")) return "twa";

  // 2. iOS Safari Standalone
  if (window.navigator.standalone === true) return "standalone";

  // 3. Default Media Queries for Chromium / Firefox
  if (window.matchMedia("(display-mode: standalone)").matches)
    return "standalone";
  if (window.matchMedia("(display-mode: minimal-ui)").matches)
    return "minimal-ui";
  if (window.matchMedia("(display-mode: fullscreen)").matches)
    return "fullscreen";
  if (window.matchMedia("(display-mode: window-controls-overlay)").matches)
    return "window-controls-overlay";

  return "browser";
}

export function useIsPWA() {
  const [isPWA, setIsPWA] = useState(() => {
    const mode = getPWADisplayMode();
    return mode !== "browser";
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(display-mode: standalone)");

    const handleChange = () => {
      const mode = getPWADisplayMode();
      setIsPWA(mode !== "browser");
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return isPWA;
}
