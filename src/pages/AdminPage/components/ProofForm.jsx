import { useEffect, useState } from "react";

import useTranslation from "../../../hooks/useTranslation";
import { cn } from "../../../utils/general";

const CUSTOM_EVENT_KEY = "Custom Event";

const ProofForm = ({
  eventsList = [],
  activeCheck,
  onStartCheck,
  onStopCheck,
  onClearCheck,
}) => {
  const { t } = useTranslation();

  const [selectedEvent, setSelectedEvent] = useState(eventsList[0]);
  const [customEventTitle, setCustomEventTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(3);
  const [requireCode, setRequireCode] = useState(false);
  const [secretCode, setSecretCode] = useState("");

  // Sync initial selection when eventsList resolves from Firebase
  useEffect(() => {
    if (eventsList.length > 0 && !selectedEvent) {
      setSelectedEvent(eventsList[0]);
    }
  }, [eventsList, selectedEvent]);

  const handleStart = () => {
    const finalName =
      selectedEvent === CUSTOM_EVENT_KEY ? customEventTitle : selectedEvent;

    onStartCheck({
      eventName: finalName,
      durationMinutes,
      requireCode,
      secretCode,
    });
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
      <h2 className="text-lg font-extrabold text-amber-400">
        🚀 {t.afkCheck.launchTitle}
      </h2>

      {/* Select Event */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-slate-400 uppercase">
          {t.afkCheck.eventNameLabel}
        </label>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          disabled={Boolean(activeCheck)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm font-semibold text-white
            focus:outline-none focus:border-amber-500 disabled:opacity-50"
        >
          {eventsList.map((eventItem) => (
            <option key={eventItem} value={eventItem}>
              {eventItem}
            </option>
          ))}
          <option value={CUSTOM_EVENT_KEY}>{CUSTOM_EVENT_KEY}</option>
        </select>

        {selectedEvent === CUSTOM_EVENT_KEY && (
          <input
            type="text"
            placeholder={t.afkCheck.customEventPlaceholder}
            value={customEventTitle}
            onChange={(e) => setCustomEventTitle(e.target.value)}
            disabled={Boolean(activeCheck)}
            className="mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white
              focus:outline-none focus:border-amber-500 disabled:opacity-50"
          />
        )}
      </div>

      {/* Duration Options */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-slate-400 uppercase">
          {t.afkCheck.durationLabel}
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 5].map((min) => (
            <button
              key={min}
              type="button"
              onClick={() => setDurationMinutes(min)}
              disabled={Boolean(activeCheck)}
              className={cn(
                "flex-1 py-2 rounded-xl text-xs font-bold border transition cursor-pointer disabled:opacity-50",
                "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200",
                durationMinutes === min &&
                  "bg-amber-500/20 text-amber-400 border-amber-500/40",
              )}
            >
              {min}
              {t.afkCheck.minutesSuffix}
            </button>
          ))}
        </div>
      </div>

      {/* Secret Code Section */}
      <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/80">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={requireCode}
            onChange={(e) => setRequireCode(e.target.checked)}
            disabled={Boolean(activeCheck)}
            className="rounded accent-amber-500 w-4 h-4 cursor-pointer disabled:opacity-50"
          />
          <span className="text-xs font-bold text-slate-300">
            {t.afkCheck.requireCodeLabel}
          </span>
        </label>

        {requireCode && (
          <input
            type="text"
            maxLength={4}
            placeholder={t.afkCheck.secretCodePlaceholder}
            value={secretCode}
            onChange={(e) => setSecretCode(e.target.value)}
            disabled={Boolean(activeCheck)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-center text-amber-400
              font-mono tracking-widest focus:outline-none focus:border-amber-500 disabled:opacity-50"
          />
        )}
      </div>

      {/* Submitting button */}
      {!activeCheck ? (
        <button
          type="button"
          onClick={handleStart}
          className="mt-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400
            text-slate-950 font-black py-3 rounded-xl shadow-lg shadow-amber-500/10 transition cursor-pointer
            active:scale-98"
        >
          {t.afkCheck.startCheckBtn}
        </button>
      ) : (
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={onStopCheck}
            className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-extrabold
              py-3 rounded-xl transition cursor-pointer"
          >
            {t.afkCheck.stopCheckBtn}
          </button>
          <button
            type="button"
            onClick={onClearCheck}
            className="px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-xl
              transition cursor-pointer"
          >
            {t.afkCheck.clearCheckBtn}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProofForm;
