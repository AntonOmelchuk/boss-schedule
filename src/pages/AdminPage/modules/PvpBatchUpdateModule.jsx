/* eslint-disable indent */
import { onValue, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import useTranslation from "../../../hooks/useTranslation";
import { db } from "../../../services/firebase";

const PvpBatchUpdateModule = () => {
  const { t } = useTranslation();

  const pvpT = t.admin.pvpBatchAdmin;

  const [members, setMembers] = useState({});
  const [pvpValues, setPvpValues] = useState({});
  const [selectedCp, setSelectedCp] = useState("all");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const membersRef = ref(db, "iron_gates_members");
    const unsubscribe = onValue(membersRef, (snapshot) => {
      const data = snapshot.val() || {};
      setMembers(data);

      const initialPvp = {};
      Object.keys(data).forEach((key) => {
        initialPvp[key] = data[key].pvp ?? 0;
      });
      setPvpValues(initialPvp);
    });
    return () => unsubscribe();
  }, []);

  const cpList = [
    "all",
    ...new Set(
      Object.values(members)
        .map((m) => m.cp_number)
        .filter(Boolean),
    ),
  ];

  const handleInputChange = (key, value) => {
    setPvpValues((prev) => ({
      ...prev,
      [key]: value === "" ? "" : Number(value),
    }));
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      const updates = {};

      Object.keys(pvpValues).forEach((key) => {
        const newVal = Number(pvpValues[key]);
        if (!isNaN(newVal) && members[key] && members[key].pvp !== newVal) {
          updates[`iron_gates_members/${key}/pvp`] = newVal;
        }
      });

      if (Object.keys(updates).length === 0) {
        toast(pvpT.noChanges, { icon: "ℹ️" });
        setIsSaving(false);
        return;
      }

      await update(ref(db), updates);
      toast.success(pvpT.success);
    } catch (err) {
      console.error(err);
      toast.error(pvpT.error);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredEntries = Object.entries(members).filter(([, member]) => {
    if (selectedCp === "all") return true;
    return member.cp_number === selectedCp;
  });

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto flex flex-col gap-6 text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <span>⚡</span> {pvpT.title}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">{pvpT.subtitle}</p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black
            px-6 py-3 rounded-xl text-xs transition cursor-pointer shadow-lg flex items-center justify-center gap-2"
        >
          {isSaving ? pvpT.saving : `💾 ${pvpT.saveBtn}`}
        </button>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        <span className="text-xs text-slate-400 font-mono">
          {pvpT.filterCp}
        </span>
        {cpList.map((cp) => (
          <button
            key={cp}
            onClick={() => setSelectedCp(cp)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              selectedCp === cp
                ? "bg-amber-500 text-slate-950"
                : "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {cp === "all" ? pvpT.allCp : cp}
          </button>
        ))}
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className="border-b border-slate-800 bg-slate-950/60 text-[11px] uppercase
                tracking-wider text-slate-400 font-mono"
              >
                <th className="p-3.5">{pvpT.table.member}</th>
                <th className="p-3.5">{pvpT.table.cpClan}</th>
                <th className="p-3.5">{pvpT.table.mainClass}</th>
                <th className="p-3.5 text-center">{pvpT.table.currentPvp}</th>
                <th className="p-3.5 text-right">{pvpT.table.newPvp}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredEntries.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-6 text-center text-slate-500 italic"
                  >
                    {pvpT.noData}
                  </td>
                </tr>
              ) : (
                filteredEntries.map(([key, member]) => {
                  const hasChanged = pvpValues[key] !== member.pvp;
                  return (
                    <tr
                      key={key}
                      className={`transition-colors ${hasChanged ? "bg-amber-500/5" : "hover:bg-slate-800/30"}`}
                    >
                      <td className="p-3.5 flex items-center gap-3">
                        {member.img ? (
                          <img
                            src={member.img}
                            alt=""
                            className="w-9 h-9 rounded-lg object-cover border border-slate-700"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center font-bold">
                            ?
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-sm text-amber-300">
                            {member.name}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {member.role || "—"}
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold">{member.cp_number}</div>
                        <div className="text-[10px] text-slate-400">
                          {member.in_clan}
                        </div>
                      </td>
                      <td className="p-3.5 text-white font-medium">
                        {member.main_class || "—"}
                      </td>
                      <td className="p-3.5 text-center font-mono font-bold text-slate-400">
                        {member.pvp ?? 0}
                      </td>
                      <td className="p-3.5 text-right">
                        <input
                          type="number"
                          value={pvpValues[key] ?? ""}
                          onChange={(e) =>
                            handleInputChange(key, e.target.value)
                          }
                          className={`bg-slate-950 border rounded-xl px-3 py-2 text-xs w-32 text-center
                            font-mono font-bold focus:outline-none transition ${
                              hasChanged
                                ? "border-amber-500 text-amber-400 bg-amber-500/10"
                                : "border-slate-800 text-white focus:border-amber-500"
                            }`}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end pb-6">
        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black
            px-8 py-3.5 rounded-xl text-xs transition cursor-pointer shadow-xl flex items-center gap-2"
        >
          {isSaving ? pvpT.saving : `💾 ${pvpT.saveBtn}`}
        </button>
      </div>
    </div>
  );
};

export default PvpBatchUpdateModule;
