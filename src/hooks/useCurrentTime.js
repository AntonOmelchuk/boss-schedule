import { useEffect, useState } from "react";

import { UPDATE_INTERVAL_MS } from "../utils/constants";

/**
 * Custom hook to get the current timestamp updated at a specified interval.
 * @param {number} interval - The update interval in milliseconds (defaults to 1000ms).
 * @returns {number} The current timestamp in milliseconds (Date.now()).
 */
const useCurrentTime = (interval = UPDATE_INTERVAL_MS) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = globalThis.setInterval(() => {
      setNow(Date.now());
    }, interval);

    // Clean up the interval on component unmount
    return () => globalThis.clearInterval(timer);
  }, [interval]);

  return now;
};

export default useCurrentTime;
