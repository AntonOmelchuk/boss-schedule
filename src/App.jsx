import { onValue, ref } from "firebase/database";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout.jsx/MainLayout";
import MainPage from "./pages/MainPage/MainPage";
import NotFound from "./pages/NotFound/NotFound";
import ScheduleBuilder from "./pages/ScheduleBuilder/ScheduleBuilder";
import StatsDashboard from "./pages/StatsDashboard/StatsDashboard";
import { db } from "./services/firebase";
import useAppStore from "./store/useAppStore";
import { EVENT_TYPES } from "./utils/constants";
import {
  checkIsOutPrime,
  getEmojiIcon,
  getNextWeeklyEvent,
} from "./utils/general";

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
              isOutPrime: category && checkIsOutPrime(category, ts),
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
      <MainLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/schedule" element={<ScheduleBuilder />} />
          <Route path="/statistics" element={<StatsDashboard />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
