import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import translations from "./utils/translations";
import Header from "./components/Header";
import MainBlock from "./components/MainBlock";
import { categorize, getEmojiIcon } from "./utils/general";
import AllBosses from "./components/AllBosses";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ==========================================
// 4. ГОЛОВНИЙ КОМПОНЕНТ РЕАКТ
// ==========================================
export default function App() {
  const [lang, setLang] = useState("uk");
  const [events, setEvents] = useState([]);
  const [lastSync, setLastSync] = useState(null);
  const [now, setNow] = useState(() => Date.now());

  const t = translations[lang];

  // Підключення до бази даних
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

  // Фільтруємо тільки босів
  const bosses = events.filter((e) => e.category === "boss");
  const futureBosses = bosses.filter((e) => e.ts > now);
  const nearestBoss = futureBosses.length > 0 ? futureBosses[0] : null;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-900 text-slate-200 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Хедер та перемикач мов */}
        <Header t={t} setLang={setLang} lang={lang} lastSync={lastSync} />

        {/* Головна панель (Найближчий епік) */}
        <MainBlock t={t} nearestBoss={nearestBoss} now={now} />

        {/* Сітка всіх босів */}
        <AllBosses bosses={bosses} t={t} lang={lang} now={now} />
      </div>
    </div>
  );
}
