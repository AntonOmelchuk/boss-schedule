/**
 * Convert Date object or ISO string to datetime-local formatted string (UTC-0)
 */
export const dateToUtcInputString = (dateObj) => {
  if (!dateObj || isNaN(dateObj.getTime())) return "";
  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getUTCDate()).padStart(2, "0");
  const hours = String(dateObj.getUTCHours()).padStart(2, "0");
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/**
 * Convert datetime-local input value (UTC-0) to Unix Timestamp in SECONDS
 */
export const utcInputStringToSeconds = (utcString) => {
  if (!utcString) return 0;
  const [datePart, timePart] = utcString.split("T");
  if (!datePart || !timePart) return 0;

  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);

  const utcDate = Date.UTC(year, month - 1, day, hours, minutes, 0);
  return Math.floor(utcDate / 1000);
};

/**
 * Format timestamp in SECONDS to UTC readable string
 */
export const formatSecondsToUtcString = (seconds) => {
  if (!seconds) return "—";
  const date = new Date(seconds * 1000);
  return date.toUTCString().replace("GMT", "UTC");
};

/**
 * Helper to get cropped Canvas/Blob from react-easy-crop coordinates
 */
export const getCroppedImg = (imageSrc, pixelCrop) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        resolve(blob);
      }, "image/jpeg");
    };
    image.onerror = (error) => reject(error);
  });
};

/**
 * Parse OCR text line by line to extract a LIST of bosses with dates.
 * Format expected: "Name ... dd.mm.yyyy hh:mm - hh:mm"
 */
export const parseOcrBossList = (text, eventsDb) => {
  if (!text || !eventsDb) return [];

  // If backend already returned array of parsed objects, pass it through
  if (Array.isArray(text)) {
    return text;
  }

  // Ensure input is a string before calling split
  if (typeof text !== "string") {
    return [];
  }

  const lines = text.split("\n");
  const foundResults = [];

  const dateTimeRegex =
    /(\d{1,2})[.s/-](\d{1,2})[.s/-](\d{2,4})\s+(\d{1,2})[:;.s](\d{2})/;

  lines.forEach((line) => {
    const cleanLine = line.trim();
    if (!cleanLine) return;

    Object.keys(eventsDb).forEach((dbKey) => {
      const eventObj = eventsDb[dbKey];
      const eventName = (eventObj.event || dbKey).toLowerCase();

      if (cleanLine.toLowerCase().includes(eventName)) {
        const match = cleanLine.match(dateTimeRegex);

        if (match) {
          const day = Number(match[1]);
          const month = Number(match[2]) - 1;
          let year = Number(match[3]);
          if (year < 100) year += 2000;

          const hours = Number(match[4]);
          const minutes = Number(match[5]);

          const utcTimestamp = Date.UTC(year, month, day, hours, minutes, 0);

          if (!isNaN(utcTimestamp)) {
            const timestampSeconds = Math.floor(utcTimestamp / 1000);

            const resultItem = {
              dbKey,
              eventName: eventObj.event || dbKey,
              timestampSeconds,
              formattedUtc: formatSecondsToUtcString(timestampSeconds),
              utcInputString: dateToUtcInputString(new Date(utcTimestamp)),
            };

            const existingIdx = foundResults.findIndex(
              (r) => r.dbKey === dbKey,
            );
            if (existingIdx !== -1) {
              foundResults[existingIdx] = resultItem;
            } else {
              foundResults.push(resultItem);
            }
          }
        }
      }
    });
  });

  return foundResults;
};
