import { LANGUAGES } from "./constants";

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
export async function subscribeUserToPush(alertsMap, language = LANGUAGES.EN) {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    console.error(
      "❌ [PUSH DEBUG] Push messaging is not supported in this browser.",
    );
    throw new Error(
      "Push notifications are not supported by this device or browser.",
    );
  }

  // 1. Request notification permission from browser
  const permission = await Notification.requestPermission();
  console.log("🔑 [PUSH DEBUG] Notification permission status:", permission);
  if (permission !== "granted") {
    throw new Error("Notification permission was denied by user.");
  }

  // 2. Obtain active Service Worker registration
  const registration = await navigator.serviceWorker.ready;
  console.log("👷 [PUSH DEBUG] Service Worker ready:", registration);
  let subscription = await registration.pushManager.getSubscription();
  console.log("🔍 [PUSH DEBUG] Existing subscription found:", subscription);

  // 3. Generate new PushSubscription if absent
  if (!subscription) {
    console.log("➕ [PUSH DEBUG] Creating new push subscription...");
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
    console.log("✅ [PUSH DEBUG] New subscription created successfully!");
  }

  const subJson = subscription.toJSON();
  console.log("📄 [PUSH DEBUG] Subscription payload JSON:", subJson);
  console.log(
    "🌐 [PUSH DEBUG] Sending subscription to backend URL:",
    `${BASE_URL}/api/push/subscribe`,
  );
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
  console.log("📡 [PUSH DEBUG] Backend HTTP response status:", response.status);
  if (!response.ok) {
    const errData = await response.json();
    console.error(
      "❌ [PUSH DEBUG] Backend subscription failed:",
      errData.detail,
    );
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
