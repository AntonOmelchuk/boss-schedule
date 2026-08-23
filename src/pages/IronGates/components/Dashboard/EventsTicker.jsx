import { memo } from "react";

const EventsTicker = memo(({ events = [] }) => {
  if (!events.length) return null;

  const duplicatedEvents = [...events, ...events];

  return (
    <div
      className="w-full bg-slate-900/40 border-y border-slate-800/80 py-2 overflow-hidden
      relative mb-8 backdrop-blur-md"
    >
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <div className="w-full border-t border-slate-800/60" />
      </div>

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {duplicatedEvents.map((event, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-6 text-xs text-slate-300 whitespace-nowrap
              bg-slate-950/40 border border-slate-800/60 rounded-full mx-2 py-1 shadow-sm"
          >
            <span className="font-bold text-white">{event.name}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{event.date}</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-400 font-semibold">
              +{event.points} AP
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default EventsTicker;
