import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { EVENT_TYPES } from "./constants/general";
import DesktopOnlyGuard from "./guards/DesktopOnlyGuard";
import MaintenanceGuard from "./guards/MaintenanceGuard";
import MainLayout from "./layouts/MainLayout.jsx/MainLayout";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import LootRandomizerPage from "./pages/LootRandomizer/LootRandomizerPage";
import MainPage from "./pages/MainPage/MainPage";
import MediaPage from "./pages/Media/MediaPage";
import NotFound from "./pages/NotFound/NotFound";
import OnboardingPage from "./pages/OnboardingPage/OnboardingPage";
import ScheduleBuilder from "./pages/ScheduleBuilder/ScheduleBuilder";
import StatsDashboard from "./pages/StatsDashboard/StatsDashboard";
import { db } from "./services/firebase";
import useAppStore from "./store/useAppStore";
import {
  checkIsOutPrime,
  getEmojiIcon,
  getNextWeeklyEvent,
} from "./utils/general";

function App() {
  const setEvents = useAppStore((state) => state.setEvents);

  // State for handling system maintenance mode
  const [maintenanceStatus, setMaintenanceStatus] = useState(false);

  // 1. Listen for maintenance status from Firebase Realtime DB
  useEffect(() => {
    const statusRef = ref(db, "system_status");

    const unsubscribe = onValue(
      statusRef,
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (data && data.is_maintenance) {
            setMaintenanceStatus(true);
          } else {
            setMaintenanceStatus(false);
          }
        } catch (err) {
          console.error("Failed to parse maintenance status:", err);
        }
      },
      (error) => {
        console.error("Firebase maintenance listener error:", error);
      },
    );

    return () => unsubscribe();
  }, []);

  // 2. Listen for regroups / event timers
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
      {/* Global Maintenance Guard Overlay (handles full or route-specific locking) */}
      <MaintenanceGuard maintenanceStatus={maintenanceStatus}>
        <MainLayout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            {/* 🔒 Protected route: redirected to "/" if opened on mobile */}
            <Route
              path="/schedule"
              element={
                <DesktopOnlyGuard redirectTo="/">
                  <ScheduleBuilder />
                </DesktopOnlyGuard>
              }
            />
            <Route path="/statistics" element={<StatsDashboard />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/loot" element={<LootRandomizerPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </MainLayout>
      </MaintenanceGuard>
    </BrowserRouter>
  );
}

export default App;
