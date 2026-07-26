import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST || []);

// Listening for background push events from the browser Push API
self.addEventListener("push", function (event) {
  if (!event.data) return;

  try {
    const data = event.data.json();
    const title = data.title || "⚡ Boss Respawn Alert!";

    const options = {
      body: data.body || "An event is starting soon!",
      icon: "/pwa-192x192.png",
      badge: "/pwa-192x192.png",
      vibrate: [200, 100, 200],
      tag: data.eventId || "event-alert",
      renotify: true,
      data: {
        eventId: data.eventId,
        url: "/",
      },
    };

    event.waitUntil(self.registration.showNotification(title, options));
  } catch (err) {
    console.error("Error processing push event in SW:", err);
  }
});

// Handling clicks on the notification banner
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  // Focus the PWA window if it's already open, or open a new one
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
