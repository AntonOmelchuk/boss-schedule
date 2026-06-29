import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useMemo, useState } from "react";

import bgImg from "./assets/image.png";
import AllEvents from "./components/AllEvents/AllEvents";
import Header from "./components/Header/Header";
import MainBlock from "./components/MainBlock";
import { PVP_EVENTS } from "./data";
import { LANGUAGES } from "./utils/constants";
import { getEmojiIcon, getNextPvPTimestamp } from "./utils/general";
import translations from "./utils/translations";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function App() {
  const [lang, setLang] = useState(
    () => localStorage.getItem("lang") || LANGUAGES.EN,
  );
  const [firebaseEvents, setFirebaseEvents] = useState([]);
  const [now, setNow] = useState(() => Date.now());
  const [showPvP, setShowPvP] = useState(() => {
    const saved = localStorage.getItem("showPvP");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const t = translations[lang];

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("showPvP", JSON.stringify(showPvP));
  }, [showPvP]);

  useEffect(() => {
    const regroupsRef = ref(db, "regroups");

    const unsubscribe = onValue(regroupsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const eventsData = data.events || {};

      const parsedEvents = Object.values(eventsData)
        .filter((e) => e && e.respawnTimestamp)
        .map((e) => {
          return {
            id: e.event,
            name: e.event,
            ts: e.respawnTimestamp * 1000,
            type: e.type,
            owner: e.owner || null,
            icon: getEmojiIcon(e.type),
          };
        })
        .sort((a, b) => a.ts - b.ts);

      setFirebaseEvents(parsedEvents);
    });

    // Очищення підписки при розмонтуванні компонента
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const events = useMemo(() => {
    const combined = [...firebaseEvents];
    const fbNames = new Set(firebaseEvents.map((e) => e.name.toLowerCase()));

    // Додаємо локальні PvP івенти, якщо їх немає в базі під тими ж іменами
    PVP_EVENTS.forEach(({ name, time, type }) => {
      if (!fbNames.has(name.toLowerCase())) {
        combined.push({
          id: name,
          name,
          ts: getNextPvPTimestamp(time),
          category: "pvp",
          type: type,
          icon: getEmojiIcon(type),
        });
      }
    });

    // Фільтруємо за налаштуваннями PvP, прибираємо минулі події та сортуємо
    return combined
      .filter((e) => showPvP || e.category !== "pvp")
      .filter((e) => e.ts > now)
      .sort((a, b) => a.ts - b.ts);
  }, [firebaseEvents, showPvP, now]);

  const nearestEvent = events.length > 0 ? events[0] : null;

  return (
    <div
      className="min-h-screen p-4 md:p-8 text-slate-200 font-sans"
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
          lang={lang}
          events={events}
          showPvP={showPvP}
          setShowPvP={() => setShowPvP((prev) => !prev)}
        />
      </div>
    </div>
  );
}
