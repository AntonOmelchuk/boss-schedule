import { useState } from "react";

import { LOOT_CATEGORIES, LOOT_PRESETS } from "../../../constants/lootItems";
import useTranslation from "../../../hooks/useTranslation";

const LootItemPicker = ({ onSelectItem }) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(
    LOOT_CATEGORIES.WEAPON_S,
  );

  const categories = [
    {
      id: LOOT_CATEGORIES.WEAPON_S,
      label: `⚔️ S ${t.loot?.catWeapon}`,
    },
    {
      id: LOOT_CATEGORIES.WEAPON_A_TOP,
      label: `⚔️ Top-A ${t.loot?.catWeapon}`,
    },
    {
      id: LOOT_CATEGORIES.ARMOR_S,
      label: `🛡️ S ${t.loot?.catArmor}`,
    },
    {
      id: LOOT_CATEGORIES.ARMOR_A,
      label: `🛡️ A ${t.loot?.catArmor}`,
    },
    {
      id: LOOT_CATEGORIES.JEWELRY,
      label: `💍 ${t.loot?.catJew}`,
    },
    { id: LOOT_CATEGORIES.MISC, label: `💎 ${t.loot?.catMisc}` },
  ];

  const filteredItems = LOOT_PRESETS.filter(
    (i) => i.category === selectedCategory,
  );

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 select-none">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <span>📦</span> {t.loot.lootPickerTitle}
        </h3>
        <span className="text-[11px] text-slate-400">
          {t.loot?.itemPickerHint || "Клікніть або перетягніть предмет у лот"}
        </span>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-800/60 text-slate-400 hover:text-slate-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Preset items grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 max-h-56 overflow-y-auto
        pr-1 custom-scrollbar"
      >
        {filteredItems.map((item) => (
          <button
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            onClick={() => onSelectItem(item)}
            className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80
              hover:border-amber-500/50 hover:bg-slate-800/50 transition-all text-left cursor-grab
              active:cursor-grabbing group"
          >
            <span className="text-lg leading-none group-hover:scale-110 transition-transform">
              <img
                src={item.icon}
                alt={item.name}
                className="w-10 h-10 rounded-sm object-contain"
              />
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-200 group-hover:text-amber-300 truncate">
                {item.name}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">
                Grade {item.grade}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LootItemPicker;
