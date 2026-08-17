import { ref, update } from "firebase/database";
import { useEffect, useState } from "react";

import Button from "../../../components/Button";
import useTranslation from "../../../hooks/useTranslation";
import { db } from "../../../services/firebase";
import useAppStore from "../../../store/useAppStore";

const RELATIONS = {
  ALLIANCE: "alliance",
  ENEMY: "enemy",
  NEUTRAL: "neutral",
};

const HoldingsModule = () => {
  const { t } = useTranslation();
  const events = useAppStore((state) => state.events);

  const [holdings, setHoldings] = useState([]);
  const [savingKey, setSavingKey] = useState(null);
  const [saveStatus, setSaveStatus] = useState({});

  useEffect(() => {
    if (!events) return;
    const filtered = events.filter(
      (e) => e.category === "siege" || e.category === "ch",
    );
    setHoldings(filtered);
  }, [events]);

  const handleFieldChange = (id, field, value) => {
    setHoldings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const handleSave = async (holding) => {
    setSavingKey(holding.id);
    setSaveStatus((prev) => ({ ...prev, [holding.id]: null }));

    try {
      const eventRef = ref(db, `regroups/events/${holding.id}`);
      await update(eventRef, {
        owner: holding.owner || "NPC",
        relation: holding.relation || RELATIONS.NEUTRAL,
      });

      setSaveStatus((prev) => ({ ...prev, [holding.id]: "success" }));
      setTimeout(() => {
        setSaveStatus((prev) => ({ ...prev, [holding.id]: null }));
      }, 3000);
    } catch (err) {
      console.error("Failed to update holding owner:", err);
      setSaveStatus((prev) => ({ ...prev, [holding.id]: "error" }));
    } finally {
      setSavingKey(null);
    }
  };

  const {
    admin: { holdings: tHoldings },
  } = t;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
        <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2 mb-1">
          🏰 {tHoldings.title}
        </h2>
        <p className="text-sm text-slate-400 mb-6">{tHoldings.description}</p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {holdings.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-3 rounded-xl border border-slate-800
              bg-slate-950/60 p-4 transition-all hover:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 text-sm flex items-center gap-2">
                  <span>
                    {item.icon || (item.category === "siege" ? "🏰" : "🏠")}
                  </span>
                  {item.name}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase border ${
                    item.category === "siege"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                  }`}
                >
                  {item.category}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    {tHoldings.ownerLabel}
                  </label>
                  <input
                    type="text"
                    value={item.owner || ""}
                    onChange={(e) =>
                      handleFieldChange(item.id, "owner", e.target.value)
                    }
                    placeholder={tHoldings.ownerPlaceholder}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs
                    text-slate-100 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    {tHoldings.relationLabel}
                  </label>
                  <select
                    value={item.relation || RELATIONS.NEUTRAL}
                    onChange={(e) =>
                      handleFieldChange(item.id, "relation", e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs
                    text-slate-100 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500
                      cursor-pointer"
                  >
                    <option value={RELATIONS.ALLIANCE}>
                      🛡️ {tHoldings.relationAlliance}
                    </option>
                    <option value={RELATIONS.ENEMY}>
                      💀 {tHoldings.relationEnemy}
                    </option>
                    <option value={RELATIONS.NEUTRAL}>
                      👑 {tHoldings.relationNeutral}
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 mt-1">
                <Button
                  onClick={() => handleSave(item)}
                  disabled={savingKey === item.id}
                  className="bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20
                    hover:text-amber-300 hover:border-amber-500/50 text-xs py-1 px-3"
                >
                  {savingKey === item.id
                    ? tHoldings.saving
                    : tHoldings.saveButton}
                </Button>

                {saveStatus[item.id] === "success" && (
                  <span className="text-xs font-medium text-emerald-400">
                    ✓ {tHoldings.saveSuccess}
                  </span>
                )}
                {saveStatus[item.id] === "error" && (
                  <span className="text-xs font-medium text-red-400">
                    ❌ {tHoldings.saveError}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HoldingsModule;
