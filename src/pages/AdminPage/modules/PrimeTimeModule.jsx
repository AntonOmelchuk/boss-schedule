import { ref, update } from "firebase/database";
import { useEffect, useState } from "react";

import useTranslation from "../../../hooks/useTranslation";
import { db } from "../../../services/firebase";
import useAppStore from "../../../store/useAppStore";
import TimeInput from "../components/TimeInput";

const PrimeTimeModule = () => {
  const { t } = useTranslation();
  const primeTime = useAppStore((state) => state.primeTime);
  const [fromTime, setFromTime] = useState(primeTime?.from || "07:00");
  const [toTime, setToTime] = useState(primeTime?.to || "23:00");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // "success" | "error" | null

  const {
    admin: { primeTime: primeTimeTranslation },
  } = t;

  useEffect(() => {
    if (primeTime) {
      setFromTime(primeTime.from || "07:00");
      setToTime(primeTime.to || "23:00");
    }
  }, [primeTime]);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus(null);

    try {
      const regroupsRef = ref(db, "regroups");
      await update(regroupsRef, {
        prime_time: {
          from: fromTime,
          to: toTime,
        },
      });

      setSaveStatus("success");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error("Failed to update prime time:", err);
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
            ⏰ {primeTimeTranslation.title}
          </h2>
          <p className="text-sm text-slate-400">
            {primeTimeTranslation.description}
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Start Prime Time */}
          <TimeInput
            label={primeTimeTranslation.fromLabel}
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
          />

          {/* End Prime Time */}
          <TimeInput
            label={primeTimeTranslation.toLabel}
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-slate-950 transition-colors
              hover:bg-amber-400 disabled:opacity-50 cursor-pointer"
          >
            {isSaving
              ? primeTimeTranslation.saving
              : primeTimeTranslation.saveButton}
          </button>

          {saveStatus === "success" && (
            <span className="text-xs font-medium text-emerald-400">
              ✓ {primeTimeTranslation.saveSuccess}
            </span>
          )}
          {saveStatus === "error" && (
            <span className="text-xs font-medium text-red-400">
              ❌ {primeTimeTranslation.saveError}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default PrimeTimeModule;
