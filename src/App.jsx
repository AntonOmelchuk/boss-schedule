import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import Header from "./components/Header";
import MainBlock from "./components/MainBlock";
import AllEvents from "./components/AllEvents";
import { categorize, getEmojiIcon } from "./utils/general";
import translations from "./utils/translations";
import bgImg from "./assets/image.png";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function App() {
  const [lang, setLang] = useState("uk");
  const [events, setEvents] = useState([]);
  const [lastSync, setLastSync] = useState(null);
  const [now, setNow] = useState(() => Date.now());

  const t = translations[lang];

  useEffect(() => {
    const regroupsRef = ref(db, "regroups");

    const unsubscribe = onValue(regroupsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const eventsData = data.events || {};

      if (data.updatedAt) {
        setLastSync(data.updatedAt);
      }

      const parsedEvents = Object.values(eventsData)
        .filter((e) => e && e.respawnTimestamp)
        .map((e) => {
          const cat = categorize(e.event);
          return {
            id: e.event, // Використовуємо ім'я як ключ (в ідеалі треба унікальний ID)
            name: e.event,
            ts: e.respawnTimestamp * 1000,
            category: cat,
            icon: getEmojiIcon(e.event, cat),
          };
        })
        .sort((a, b) => a.ts - b.ts);

      setEvents(parsedEvents);
    });

    // Очищення підписки при видаленні компонента
    return () => unsubscribe();
  }, []);

  // Головний ігровий цикл (Tick)
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const futureEvents = events.filter((e) => e.ts > now);
  const nearestEvent = futureEvents.length > 0 ? futureEvents[0] : null;

  return (
    <div
      className="min-h-screen p-4 md:p-8 bg-slate text-slate-200 font-sans"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <Header t={t} setLang={setLang} lang={lang} lastSync={lastSync} />
        <MainBlock t={t} nearestEvent={nearestEvent} now={now} />
        <AllEvents events={events} t={t} lang={lang} now={now} />
      </div>
    </div>
  );
}
