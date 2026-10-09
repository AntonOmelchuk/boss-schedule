import { useState } from "react";

const STORAGE_KEY = "ig_intro_seen_v1";

export const useIntroShown = () => {
  const [hasSeenIntro, setHasSeenIntro] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "true";
    } catch (e) {
      console.error("Failed to read intro state from localStorage", e);
      return false;
    }
  });

  const resetIntro = () => {
    try {
      localStorage.removeItem("ig_intro_seen_v1");
      setHasSeenIntro(false);
      window.location.reload();
    } catch (e) {
      console.error("Failed to reset intro state", e);
    }
  };

  const markIntroAsSeen = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
      setHasSeenIntro(true);
    } catch (e) {
      console.error("Failed to save intro state to localStorage", e);
    }
  };

  return { hasSeenIntro, markIntroAsSeen, resetIntro };
};
