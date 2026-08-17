import { onValue, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "../../../components/Button";
import useTranslation from "../../../hooks/useTranslation";
import { db } from "../../../services/firebase";

const RELATIONS = {
  ALLIANCE: "alliance",
  ENEMY: "enemy",
  NEUTRAL: "neutral",
};

const HoldingsModule = () => {
  const { t } = useTranslation();
  const { holdings: tHoldings = {} } = t.admin || {};

  const [eventsDb, setEventsDb] = useState({});
  const [selectedKey, setSelectedKey] = useState("");
  const [ownerInput, setOwnerInput] = useState("");
  const [relationInput, setRelationInput] = useState(RELATIONS.NEUTRAL);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const eventsRef = ref(db, "regroups/events");

    const unsubscribe = onValue(eventsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setEventsDb(data);

      const keys = Object.keys(data).filter((k) => {
        const cat = data[k]?.category;
        return cat === "ch" || cat === "siege";
      });

      if (keys.length > 0 && !selectedKey) {
        setSelectedKey(keys[0]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedKey && eventsDb[selectedKey]) {
      const currentObj = eventsDb[selectedKey];
      setOwnerInput(currentObj.owner || "NPC");
      setRelationInput(currentObj.relation || RELATIONS.NEUTRAL);
    }
  }, [selectedKey, eventsDb]);

  const holdingKeys = Object.keys(eventsDb).filter((key) => {
    const cat = eventsDb[key]?.category;
    return cat === "ch" || cat === "siege";
  });

  const handleSave = async () => {
    if (!selectedKey) return;

    setIsSaving(true);
    try {
      await update(ref(db, `regroups/events/${selectedKey}`), {
        owner: ownerInput.trim() || "NPC",
        relation: relationInput,
      });

      toast.success(tHoldings.saveSuccess);
    } catch (err) {
      console.error("Error updating holding owner:", err);
      toast.error(tHoldings.saveError);
    } finally {
      setIsSaving(false);
    }
  };

  const currentObj = eventsDb[selectedKey] || {};

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto flex flex-col gap-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <span>🏰</span> {tHoldings.title}
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">{tHoldings.description}</p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase">
            {tHoldings.selectLabel}
          </label>
          <select
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm font-semibold
              text-white focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            {holdingKeys.map((dbKey) => (
              <option key={dbKey} value={dbKey}>
                {eventsDb[dbKey].event || dbKey} (
                {eventsDb[dbKey].category?.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        {/* Поточний стан у базі */}
        <div
          className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex justify-between
          items-center text-xs"
        >
          <span className="text-slate-500 font-semibold">
            {tHoldings.currentOwnerLabel}
          </span>
          <span className="text-amber-400 font-mono font-bold">
            {currentObj.owner || "NPC"} ({currentObj.relation || "neutral"})
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase">
            {tHoldings.ownerLabel}
          </label>
          <input
            type="text"
            value={ownerInput}
            onChange={(e) => setOwnerInput(e.target.value)}
            placeholder={tHoldings.ownerPlaceholder}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm font-semibold
              text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase">
            {tHoldings.relationLabel}
          </label>
          <select
            value={relationInput}
            onChange={(e) => setRelationInput(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm font-semibold
              text-white focus:outline-none focus:border-amber-500 cursor-pointer"
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

        <Button
          onClick={handleSave}
          disabled={isSaving || !selectedKey}
          className="mt-2 bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20
            hover:text-amber-300 hover:border-amber-500/50 justify-center py-3"
        >
          {isSaving ? tHoldings.saving : tHoldings.saveButton}
        </Button>
      </div>
    </div>
  );
};

export default HoldingsModule;
