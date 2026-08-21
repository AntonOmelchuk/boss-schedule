import { useEffect } from "react";

const usePreventScroll = (ref) => {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const preventDefaultScroll = (e) => {
      e.preventDefault();
    };

    const preventKeys = (e) => {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "Space",
          "PageUp",
          "PageDown",
          "Home",
          "End",
        ].includes(e.code)
      ) {
        e.preventDefault(); // Блокуємо клавіші навігації
      }
    };

    container.addEventListener("wheel", preventDefaultScroll, {
      passive: false,
    });
    container.addEventListener("touchmove", preventDefaultScroll, {
      passive: false,
    });
    window.addEventListener("keydown", preventKeys);

    return () => {
      container.removeEventListener("wheel", preventDefaultScroll);
      container.removeEventListener("touchmove", preventDefaultScroll);
      window.removeEventListener("keydown", preventKeys);
    };
  }, []);
};

export default usePreventScroll;
