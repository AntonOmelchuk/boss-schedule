import { onValue, ref, update } from "firebase/database";
import { useEffect, useState } from "react";

import useTranslation from "../../../hooks/useTranslation";
import { db } from "../../../services/firebase";
import { cn } from "../../../utils/general";
import {
  dateToUtcInputString,
  formatSecondsToUtcString,
  parseOcrBossList,
  utcInputStringToSeconds,
} from "../../../utils/respawnHelper";
import OCRImageUploader from "../components/OCRImageUploader";

const RespawnModule = () => {
  const { t } = useTranslation();

  const [eventsDb, setEventsDb] = useState({});
  const [selectedKey, setSelectedKey] = useState("");
  const [utcDateTimeInput, setUtcDateTimeInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [parsedResults, setParsedResults] = useState([]);

  // 1. Subscribe to Firebase regroups/events
  useEffect(() => {
    const eventsRef = ref(db, "regroups/events");

    const unsubscribe = onValue(eventsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setEventsDb(data);

      const keys = Object.keys(data);
      if (keys.length > 0 && !selectedKey) {
        setSelectedKey(keys[0]);
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. Sync datetime picker when selected event changes
  useEffect(() => {
    if (selectedKey && eventsDb[selectedKey]) {
      const currentSeconds = eventsDb[selectedKey].respawnTimestamp || 0;
      if (currentSeconds > 0) {
        const currentDate = new Date(currentSeconds * 1000);
        setUtcDateTimeInput(dateToUtcInputString(currentDate));
      } else {
        setUtcDateTimeInput(dateToUtcInputString(new Date()));
      }
    }
  }, [selectedKey, eventsDb]);

  // Handle OCR text and parse boss list
  const handleOcrParsedText = (data) => {
    // Check if backend returned structured array or legacy raw string
    const results = Array.isArray(data)
      ? data
      : parseOcrBossList(data, eventsDb);

    setParsedResults(results);

    if (results.length > 0) {
      setSelectedKey(results[0].dbKey);
      setUtcDateTimeInput(results[0].utcInputString);
    }
  };

  // Save single selected event
  const handleSaveSingle = async () => {
    if (!selectedKey) return;

    const newTimestampSeconds = utcInputStringToSeconds(utcDateTimeInput);
    if (!newTimestampSeconds) return;

    setIsSaving(true);
    try {
      await update(ref(db, `regroups/events/${selectedKey}`), {
        respawnTimestamp: newTimestampSeconds,
      });
      alert(t.respawnAdmin.successAlert);
    } catch (err) {
      console.error("Error updating respawn timestamp:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Save ALL parsed results from OCR batch
  const handleSaveBatch = async () => {
    if (!parsedResults.length) return;

    setIsSaving(true);
    try {
      const updates = {};
      parsedResults.forEach((item) => {
        updates[`regroups/events/${item.dbKey}/respawnTimestamp`] =
          item.timestampSeconds;
      });

      await update(ref(db), updates);
      alert(t.respawnAdmin.successAlert);
      setParsedResults([]);
    } catch (err) {
      console.error("Batch update error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const currentEventObj = eventsDb[selectedKey] || {};
  const calculatedSeconds = utcInputStringToSeconds(utcDateTimeInput);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <span>⏳</span> {t.respawnAdmin.title}
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          {t.respawnAdmin.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* OCR Uploader & Crop */}
        <div className="flex flex-col gap-4">
          <OCRImageUploader
            onParsedResults={handleOcrParsedText}
            isProcessing={isOcrProcessing}
            setIsProcessing={setIsOcrProcessing}
          />

          {/* Parsed List Results from Image */}
          {parsedResults.length > 0 && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3">
              <h3 className="text-sm font-bold text-sky-400">
                {t.respawnAdmin.parsedResultsTitle}
              </h3>
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
                {parsedResults.map((item) => (
                  <div
                    key={item.dbKey}
                    onClick={() => {
                      setSelectedKey(item.dbKey);
                      setUtcDateTimeInput(item.utcInputString);
                    }}
                    className={cn(
                      "flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800/80",
                      "cursor-pointer text-xs",
                      selectedKey === item.dbKey &&
                        "border-sky-500/60 bg-sky-950/20",
                    )}
                  >
                    <span className="font-bold text-slate-200">
                      {item.eventName}
                    </span>
                    <span className="font-mono text-amber-400">
                      {item.formattedUtc}
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleSaveBatch}
                disabled={isSaving}
                className="mt-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-2.5 rounded-xl
                  text-xs transition cursor-pointer"
              >
                {t.respawnAdmin.applyAllBtn} ({parsedResults.length})
              </button>
            </div>
          )}
        </div>

        {/* Manual Edit Form */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
          <h2 className="text-lg font-extrabold text-amber-400">
            {t.respawnAdmin.manualCardTitle}
          </h2>

          {/* Select Event */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase">
              {t.respawnAdmin.selectEventLabel}
            </label>
            <select
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm font-semibold text-white
                focus:outline-none focus:border-amber-500"
            >
              {Object.keys(eventsDb).map((dbKey) => (
                <option key={dbKey} value={dbKey}>
                  {eventsDb[dbKey].event || dbKey} ({eventsDb[dbKey].category})
                </option>
              ))}
            </select>
          </div>

          {/* Current DB Status */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex flex-col gap-1 text-xs">
            <span className="text-slate-500 font-semibold">
              {t.respawnAdmin.currentRespawnLabel}
            </span>
            <span className="text-amber-400 font-mono font-bold">
              {formatSecondsToUtcString(currentEventObj.respawnTimestamp)}
            </span>
          </div>

          {/* Date Time Input UTC-0 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase">
              {t.respawnAdmin.dateTimeLabel}
            </label>
            <input
              type="datetime-local"
              value={utcDateTimeInput}
              onChange={(e) => setUtcDateTimeInput(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm font-semibold text-white
                focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Calculated Seconds Output */}
          <div className="flex justify-between items-center text-xs px-1">
            <span className="text-slate-400">
              {t.respawnAdmin.timestampSecondsLabel}
            </span>
            <span className="font-mono font-bold text-emerald-400">
              {calculatedSeconds}s
            </span>
          </div>

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSaveSingle}
            disabled={isSaving || !selectedKey}
            className={cn(
              "mt-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400",
              "text-slate-950 font-black py-3 rounded-xl shadow-lg transition cursor-pointer active:scale-98",
              "disabled:opacity-50",
            )}
          >
            {isSaving ? t.respawnAdmin.savingBtn : t.respawnAdmin.saveBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RespawnModule;
