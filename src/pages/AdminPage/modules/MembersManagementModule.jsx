/* eslint-disable indent */
import { onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import useTranslation from "../../../hooks/useTranslation";
import { db } from "../../../services/firebase";

const MembersManagementModule = () => {
  const { t } = useTranslation();

  const m = t.membersAdmin;

  const [members, setMembers] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    cp_number: "Iron Gates",
    main_class: "",
    play_class: "",
    in_clan: "Nieogary",
    role: "",
    pvp: 0,
    img: "",
    sub_classes: "",
    gvg_classes: "",
    epic_got: "",
    epic_all: "",
  });

  useEffect(() => {
    const membersRef = ref(db, "iron_gates_members");
    const unsubscribe = onValue(membersRef, (snapshot) => {
      const data = snapshot.val() || {};
      setMembers(data);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenCreate = () => {
    setEditingKey(null);
    setFormData({
      name: "",
      cp_number: "Iron Gates",
      main_class: "",
      play_class: "",
      in_clan: "Nieogary",
      role: "",
      pvp: 0,
      img: "",
      sub_classes: "",
      gvg_classes: "",
      epic_got: "",
      epic_all: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (key, member) => {
    setEditingKey(key);
    setFormData({
      name: member.name || "",
      cp_number: member.cp_number || "Iron Gates",
      main_class: member.main_class || "",
      play_class: member.play_class || "",
      in_clan: member.in_clan || "",
      role: member.role || "",
      pvp: member.pvp || 0,
      img: member.img || "",
      sub_classes: Array.isArray(member.sub_classes)
        ? member.sub_classes.join(", ")
        : "",
      gvg_classes: Array.isArray(member.gvg_classes)
        ? member.gvg_classes.join(", ")
        : "",
      epic_got: member.epic?.got ? member.epic.got.join(", ") : "",
      epic_all: member.epic?.all ? member.epic.all.join(", ") : "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const parseList = (str) =>
      str
        ? str
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

    const payload = {
      name: formData.name.trim(),
      cp_number: formData.cp_number.trim(),
      main_class: formData.main_class.trim(),
      play_class: formData.play_class.trim(),
      in_clan: formData.in_clan.trim(),
      role: formData.role.trim(),
      pvp: Number(formData.pvp) || 0,
      img: formData.img.trim(),
      sub_classes: parseList(formData.sub_classes),
      gvg_classes: parseList(formData.gvg_classes),
      epic: {
        got: parseList(formData.epic_got),
        all: parseList(formData.epic_all),
      },
    };

    try {
      if (editingKey) {
        await set(ref(db, `iron_gates_members/${editingKey}`), payload);
        toast.success(m.successSave);
      } else {
        const newRef = push(ref(db, "iron_gates_members"));
        await set(newRef, payload);
        toast.success(m.successCreate);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Error saving data");
    }
  };

  const handleDelete = async (key, name) => {
    if (!window.confirm(`${m.confirmDelete} ${name}?`)) return;

    try {
      await remove(ref(db, `iron_gates_members/${key}`));
      toast.success(m.successDelete);
    } catch (err) {
      console.error(err);
      toast.error("Error deleting");
    }
  };

  const filteredEntries = Object.entries(members).filter(
    ([, member]) =>
      member.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.main_class?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.cp_number?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto flex flex-col gap-6 text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <span>👥</span> {m.title}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">{m.subtitle}</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl
            text-xs transition cursor-pointer shadow-lg"
        >
          + {m.addBtn}
        </button>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder={m.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm w-full md:w-80
            focus:outline-none focus:border-amber-500"
        />
        <div className="text-xs text-slate-400 font-mono">
          {m.total}:{" "}
          <span className="text-amber-400 font-bold">
            {filteredEntries.length}
          </span>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className="border-b border-slate-800 bg-slate-950/60 text-[11px] uppercase
                tracking-wider text-slate-400 font-mono"
              >
                <th className="p-3.5">{m.table.member}</th>
                <th className="p-3.5">{m.table.cpClan}</th>
                <th className="p-3.5">{m.table.classes}</th>
                <th className="p-3.5">{m.table.pvp}</th>
                <th className="p-3.5 text-right">{m.table.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredEntries.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-6 text-center text-slate-500 italic"
                  >
                    {m.noData}
                  </td>
                </tr>
              ) : (
                filteredEntries.map(([key, member]) => (
                  <tr
                    key={key}
                    className="hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="p-3.5 flex items-center gap-3">
                      {member.img ? (
                        <img
                          src={member.img}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover border border-slate-700"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center font-bold">
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
                    <td className="p-3.5">
                      <div className="text-white font-medium">
                        {member.main_class}
                      </div>
                      <div className="text-[10px] text-sky-400 font-mono">
                        Play: {member.play_class}
                      </div>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-emerald-400">
                      {member.pvp}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(key, member)}
                        className="px-3 py-1.5 bg-sky-500/20 text-sky-300 border border-sky-500/30
                          rounded-lg hover:bg-sky-500/30 transition cursor-pointer"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(key, member.name)}
                        className="px-3 py-1.5 bg-red-500/20 text-red-300 border border-red-500/30
                          rounded-lg hover:bg-red-500/30 transition cursor-pointer"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl
            p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <h2 className="text-lg font-black text-amber-400 border-b border-slate-800 pb-3">
              {editingKey ? m.modal.editTitle : m.modal.createTitle}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">
                  {m.fields.name}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs
                    focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">
                  {m.fields.cp}
                </label>
                <input
                  type="text"
                  value={formData.cp_number}
                  onChange={(e) =>
                    setFormData({ ...formData, cp_number: e.target.value })
                  }
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs
                    focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">
                  {m.fields.mainClass}
                </label>
                <input
                  type="text"
                  value={formData.main_class}
                  onChange={(e) =>
                    setFormData({ ...formData, main_class: e.target.value })
                  }
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs
                    focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">
                  {m.fields.playClass}
                </label>
                <input
                  type="text"
                  value={formData.play_class}
                  onChange={(e) =>
                    setFormData({ ...formData, play_class: e.target.value })
                  }
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs
                    focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">
                  {m.fields.clan}
                </label>
                <input
                  type="text"
                  value={formData.in_clan}
                  onChange={(e) =>
                    setFormData({ ...formData, in_clan: e.target.value })
                  }
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs
                    focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">
                  {m.fields.role}
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs
                    focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">
                  {m.fields.pvp}
                </label>
                <input
                  type="number"
                  value={formData.pvp}
                  onChange={(e) =>
                    setFormData({ ...formData, pvp: e.target.value })
                  }
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs
                    focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">
                  {m.fields.img}
                </label>
                <input
                  type="text"
                  value={formData.img}
                  onChange={(e) =>
                    setFormData({ ...formData, img: e.target.value })
                  }
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs
                    focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase">
                  {m.fields.subClasses}
                </label>
                <input
                  type="text"
                  value={formData.sub_classes}
                  onChange={(e) =>
                    setFormData({ ...formData, sub_classes: e.target.value })
                  }
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs
                    focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase">
                  {m.fields.gvgClasses}
                </label>
                <input
                  type="text"
                  value={formData.gvg_classes}
                  onChange={(e) =>
                    setFormData({ ...formData, gvg_classes: e.target.value })
                  }
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs
                    focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">
                  {m.fields.epicGot}
                </label>
                <input
                  type="text"
                  value={formData.epic_got}
                  onChange={(e) =>
                    setFormData({ ...formData, epic_got: e.target.value })
                  }
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs
                    focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">
                  {m.fields.epicAll}
                </label>
                <input
                  type="text"
                  value={formData.epic_all}
                  onChange={(e) =>
                    setFormData({ ...formData, epic_all: e.target.value })
                  }
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs
                    focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 mt-4 border-t border-slate-800 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl
                    text-xs font-bold transition cursor-pointer"
                >
                  {m.modal.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950
                    rounded-xl text-xs font-black transition cursor-pointer shadow-lg"
                >
                  {m.modal.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersManagementModule;
