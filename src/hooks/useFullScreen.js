import { useCallback, useEffect, useState } from "react";

const useFullScreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Observe browser full screen mode
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Enter Fullscreen
  const enterFullscreen = useCallback((element = document.documentElement) => {
    if (element.requestFullscreen) {
      element.requestFullscreen().catch((err) => {
        console.log("Error attempting to enable fullscreen:", err);
      });
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }, []);

  // Leave Fullscreen
  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }, []);

  return { isFullscreen, enterFullscreen, exitFullscreen };
};

export default useFullScreen;
