import { useEffect, useState } from "react";

export function useIsPWA() {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    // 1. Check default media-query (Android / Chrome / Modern iOS)
    const matchMediaPWA = window.matchMedia(
      "(display-mode: standalone)",
    ).matches;

    // 2. Check value for iOS Safari
    const isIOSPWA = window.navigator.standalone === true;
    // 3. Check for TWA (Trusted Web Activity на Android)
    const isTWA = document.referrer.includes("android-app://");

    setIsPWA(matchMediaPWA || isIOSPWA || isTWA);
  }, []);

  return isPWA;
}
