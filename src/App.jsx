import { useState, useEffect, useMemo } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import Header from "./components/Header/Header";
import MainBlock from "./components/MainBlock";
import AllEvents from "./components/AllEvents/AllEvents";
import {
  categorize,
  getEmojiIcon,
  getNextPvPTimestamp,
  parseBossTimeToUTC,
} from "./utils/general";
import translations from "./utils/translations";
import { BOSSES, PVP_EVENTS } from "./data";
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
  const [firebaseEvents, setFirebaseEvents] = useState([]);
  const [now, setNow] = useState(() => Date.now());
  const [showPvP, setShowPvP] = useState(true);

  const t = translations[lang];

  useEffect(() => {
    const regroupsRef = ref(db, "regroups");

    const unsubscribe = onValue(regroupsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const eventsData = data.events || {};

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

      setFirebaseEvents(parsedEvents);
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

  // МЕРДЖ ДАНИХ: Firebase + Локальні (Оновлюється тільки коли приходять нові дані з бази або раз на хвилину для PvP)
  const events = useMemo(() => {
    const combined = [...firebaseEvents];
    // Створюємо Set з імен Firebase-івентів для швидкого пошуку дублікатів
    const fbNames = new Set(firebaseEvents.map((e) => e.name.toLowerCase()));

    // 1. Додаємо локальних босів, якщо їх немає у Firebase
    BOSSES.forEach(({ name, date, time }) => {
      if (!fbNames.has(name.toLowerCase())) {
        const cat = categorize(name);
        combined.push({
          id: name,
          name: name,
          ts: parseBossTimeToUTC(date, time),
          category: cat,
          icon: getEmojiIcon(name, cat),
        });
      }
    });

    // 2. Додаємо PvP івенти (завжди динамічно вираховуємо найближчий)
    PVP_EVENTS.forEach(({ name, time, type }) => {
      if (!fbNames.has(name.toLowerCase())) {
        combined.push({
          id: name,
          name: name,
          ts: getNextPvPTimestamp(time),
          category: "pvp",
          icon: getEmojiIcon(name, "pvp", type),
        });
      }
    });

    return combined
      .filter((e) => showPvP || e.category !== "pvp")
      .filter((e) => e.ts > now)
      .sort((a, b) => a.ts - b.ts);

    // Перераховуємо, коли приходять дані, АБО кожну хвилину (щоб PvP івенти перемикалися на наступний час)
  }, [firebaseEvents, showPvP, now]);

  const futureEvents = events.filter((e) => e.ts > now);
  const nearestEvent = futureEvents.length > 0 ? futureEvents[0] : null;

  return (
    <div
      className="min-h-screen p-4 md:p-8 bg-slate text-slate-200 font-sans"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <Header t={t} setLang={setLang} lang={lang} />
        <MainBlock t={t} nearestEvent={nearestEvent} now={now} />
        <AllEvents
          t={t}
          now={now}
          lang={lang}
          events={events}
          showPvP={showPvP}
          setShowPvP={() => setShowPvP((prev) => !prev)}
        />
      </div>
    </div>
  );
}
