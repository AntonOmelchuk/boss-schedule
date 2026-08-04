import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST || []);

const pushChannel = new BroadcastChannel("push-alerts-channel");

// Listening for background push events from the browser Push API
self.addEventListener("push", function (event) {
  console.log("📲 [SW DEBUG] Push event received!", event);

  let title = "⚡ Boss Respawn Alert!";
  let eventId = null;
  let options = {
    body: "An event is starting soon!",
    icon: "/pwa-192x192.png",
    badge: "/pwa-192x192.png",
    vibrate: [200, 100, 200],
    tag: "event-alert",
    renotify: true,
    data: {
      url: "/",
    },
  };

  if (event.data) {
    try {
      const data = event.data.json();
      console.log("📦 [SW DEBUG] Parsed JSON payload:", data);
      title = data.title || title;
      options.body = data.body || options.body;
      options.tag = data.eventId || data.event_id || options.tag;
      options.data.eventId = data.eventId || data.event_id;
      eventId = data.eventId || data.event_id;
    } catch {
      console.warn("⚠️ [SW DEBUG] Payload text fallback:", event.data.text());
      options.body = event.data.text();
    }
  }

  if (eventId) {
    pushChannel.postMessage({
      type: "PUSH_ALERT_RECEIVED",
      eventId: eventId,
    });
  }

  event.waitUntil(self.registration.showNotification(title, options));
});

// Handling clicks on the notification banner
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        for (const client of clientList) {
          if (client.url && "focus" in client) {
            return client.focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow("/");
        }
      }),
  );
});
