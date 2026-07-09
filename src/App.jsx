import { onValue, ref } from "firebase/database";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import bgImg from "./assets/bg3.png";
import MainPage from "./pages/MainPage/MainPage";
import NotFound from "./pages/NotFound/NotFound";
import ScheduleBuilder from "./pages/ScheduleBuilder/ScheduleBuilder";
import { db } from "./services/firebase";
import useAppStore from "./store/useAppStore";
import { EVENT_TYPES } from "./utils/constants";
import { checkIsSwat, getEmojiIcon, getNextWeeklyEvent } from "./utils/general";

function App() {
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
              category,
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
    <BrowserRouter>
      <div
        className="min-h-screen text-slate-200 font-sans"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          width: "100%",
          paddingTop: "32px",
        }}
      >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/schedule" element={<ScheduleBuilder />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
