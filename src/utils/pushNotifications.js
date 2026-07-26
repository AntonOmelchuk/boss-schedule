const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Converts URL-safe Base64 VAPID Key into Uint8Array required by PushManager
 */
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * Requests push permission, registers device token and syncs alert preferences with FastAPI backend.
 * @param {Object} alertsMap - Map of event IDs to alert settings, e.g. { "zaken": { "leadTimeMinutes": 30 } }
 * @param {string} language - Current app language, e.g. "uk" or "en"
 */
export async function subscribeUserToPush(alertsMap, language = "en") {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    throw new Error(
      "Push notifications are not supported by this device or browser.",
    );
  }

  // 1. Request notification permission from browser
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Notification permission was denied by user.");
  }

  // 2. Obtain active Service Worker registration
  const registration = await navigator.serviceWorker.ready;
  let subscription = await registration.pushManager.getSubscription();

  // 3. Generate new PushSubscription if absent
  if (!subscription) {
    if (!VAPID_PUBLIC_KEY) {
      throw new Error(
        "VITE_VAPID_PUBLIC_KEY is not defined in environment variables.",
      );
    }
    const convertedKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedKey,
    });
  }

  const subJson = subscription.toJSON();

  // 4. Send subscription keys, language & user selected alerts to FastAPI backend
  const response = await fetch(`${BASE_URL}/api/push/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      endpoint: subJson.endpoint,
      keys: subJson.keys,
      lang: language,
      alerts: alertsMap,
    }),
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(
      errData.detail || "Failed to register subscription on backend server.",
    );
  }

  return true;
}

/**
 * Returns active subscription or null
 */
export async function getCurrentPushSubscription() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return null;
  }
  const registration = await navigator.serviceWorker.ready;
  return await registration.pushManager.getSubscription();
}
