import { useMemo } from "react";

import { LANGUAGES } from "../../../../constants/general";
import useFilterEvents from "../../../../hooks/useFilterEvents";
import useTranslation from "../../../../hooks/useTranslation";
import AllEventsItem from "../AllEvents/AllEventsItem";

const CalendarView = () => {
  const { t, language } = useTranslation();
  const { filteredEvents } = useFilterEvents();

  const daysOfWeek = useMemo(
    () => [
      { id: 1, name: t.monday },
      { id: 2, name: t.tuesday },
      { id: 3, name: t.wednesday },
      { id: 4, name: t.thursday },
      { id: 5, name: t.friday },
      { id: 6, name: t.saturday },
      { id: 0, name: t.sunday },
    ],
    [t],
  );

  const eventsByDay = useMemo(() => {
    const grouped = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 0: [] };

    (filteredEvents || []).forEach((event) => {
      const date = new Date(event.ts);
      const dayOfWeek = date.getDay();
      if (grouped[dayOfWeek]) {
        grouped[dayOfWeek].push(event);
      }
    });

    Object.keys(grouped).forEach((day) => {
      grouped[day].sort((a, b) => a.ts - b.ts);
    });

    return grouped;
  }, [filteredEvents]);

  const currentWeekDays = useMemo(() => {
    const now = new Date();
    const currentDay = now.getDay();
    const distanceToMon = currentDay === 0 ? -6 : 1 - currentDay;

    const monday = new Date(now);
    monday.setDate(now.getDate() + distanceToMon);

    return daysOfWeek.map((dayObj, index) => {
      const dayDate = new Date(monday);
      dayDate.setDate(monday.getDate() + index);
      return {
        ...dayObj,
        dateNumber: dayDate.getDate(),
        isToday: dayDate.toDateString() === now.toDateString(),
      };
    });
  }, [daysOfWeek]);

  return (
    <div className="w-full overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-slate-800">
      <div className="min-w-[1800px] grid grid-cols-7 gap-4">
        {currentWeekDays.map(({ id, name, dateNumber, isToday }) => {
          const dayEvents = eventsByDay[id] || [];

          return (
            <div key={id} className="flex flex-col gap-3 min-w-65">
              <div
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border ${
                  isToday
                    ? "bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-sm"
                    : "bg-slate-900/80 border-slate-800 text-slate-300"
                }`}
              >
                <span className="font-black text-xs tracking-wider uppercase truncate">
                  {name}
                </span>
                <span className="font-mono font-black text-sm opacity-90">
                  {dateNumber}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {dayEvents.length > 0 ? (
                  dayEvents.map((event) => {
                    const spawnDate = new Date(event.ts).toLocaleString(
                      language === LANGUAGES.UA ? "uk-UA" : "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      },
                    );
                    const {
                      id,
                      ts,
                      icon,
                      name,
                      enemy,
                      owner,
                      relation,
                      isOutPrime,
                    } = event;
                    return (
                      <AllEventsItem
                        ts={ts}
                        key={id}
                        icon={icon}
                        name={name}
                        enemy={enemy}
                        owner={owner}
                        isOutPrime={isOutPrime}
                        relation={relation}
                        spawnDate={spawnDate}
                      />
                    );
                  })
                ) : (
                  <div
                    className="h-20 rounded-xl border border-dashed border-slate-800/60 flex items-center
                      justify-center text-slate-600 text-xs italic"
                  >
                    {t.noEvents}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
