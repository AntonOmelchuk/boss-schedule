import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect } from "react";

import bgImg from "./assets/image.png";
import AllEvents from "./components/AllEvents/AllEvents";
import Header from "./components/Header/Header";
import MainBlock from "./components/MainBlock";
import useAppStore from "./store/useAppStore";
import { EVENT_TYPES } from "./utils/constants";
import { checkIsSwat, getEmojiIcon, getNextWeeklyEvent } from "./utils/general";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function App() {
  const setEvents = useAppStore((state) => state.setEvents);

  useEffect(() => {
    const regroupsRef = ref(db, "regroups");

    const unsubscribe = onValue(regroupsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const eventsData = data.events || {};

      const parsedEvents = Object.values(eventsData)
        .filter(
          (e) =>
            e &&
            (e.respawnTimestamp ||
              (e.type === EVENT_TYPES.CH && e.day !== undefined && e.time)),
        )
        .map(
          ({
            event,
            respawnTimestamp,
            type,
            owner,
            relation,
            day,
            time,
            category,
          }) => {
            const ts =
              type === EVENT_TYPES.CH && day !== undefined && time
                ? getNextWeeklyEvent(day, time)
                : respawnTimestamp * 1000;

            return {
              id: event,
              name: event,
              relation: relation,
              ts,
              type,
              owner: owner || null,
              icon: getEmojiIcon(type),
              isSwat: category && checkIsSwat(category, ts),
            };
          },
        )
        .sort((a, b) => a.ts - b.ts);

      setEvents(parsedEvents);
    });

    return () => unsubscribe();
  }, [setEvents]);

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
        <Header />
        <MainBlock />
        <AllEvents />
      </div>
    </div>
  );
}
