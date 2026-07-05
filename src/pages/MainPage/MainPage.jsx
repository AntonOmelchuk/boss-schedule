import { onValue, ref } from "firebase/database";
import { useEffect } from "react";

import AllEvents from "../../components/AllEvents/AllEvents";
import Header from "../../components/Header/Header";
import MainBlock from "../../components/MainBlock/MainBlock";
import { db } from "../../services/firebase";
import useAppStore from "../../store/useAppStore";
import { EVENT_TYPES } from "../../utils/constants";
import {
  checkIsSwat,
  getEmojiIcon,
  getNextWeeklyEvent,
} from "../../utils/general";

const MainPage = () => {
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
    <div className="max-w-4xl mx-auto">
      <Header />
      <MainBlock />
      <AllEvents />
    </div>
  );
};

export default MainPage;
