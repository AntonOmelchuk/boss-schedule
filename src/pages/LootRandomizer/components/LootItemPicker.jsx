import { useMemo, useState } from "react";

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
      label: `S ${t.loot?.catWeapon}`,
    },
    {
      id: LOOT_CATEGORIES.WEAPON_A_TOP,
      label: `A ${t.loot?.catWeapon}`,
    },
    {
      id: LOOT_CATEGORIES.ARMOR_S,
      label: `S ${t.loot?.catArmor}`,
    },
    {
      id: LOOT_CATEGORIES.ARMOR_A,
      label: `A ${t.loot?.catArmor}`,
    },
    {
      id: LOOT_CATEGORIES.JEWELRY,
      label: `${t.loot?.catJew}`,
    },
    { id: LOOT_CATEGORIES.MISC, label: `💎 ${t.loot?.catMisc}` },
  ];

  // Safely group filtered items by their `set` field
  const groupedItems = useMemo(() => {
    const rawItems = LOOT_PRESETS.filter(
      (i) => i.category === selectedCategory,
    );
    const groupsMap = new Map();

    rawItems.forEach((item) => {
      const setName = item.set || null;
      if (!groupsMap.has(setName)) {
        groupsMap.set(setName, []);
      }
      groupsMap.get(setName).push(item);
    });

    return Array.from(groupsMap.entries()).map(([setName, items]) => ({
      setName,
      items,
    }));
  }, [selectedCategory]);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 select-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <span>📦</span> {t.loot.lootPickerTitle}
        </h3>
        <span
          className="text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border
          border-amber-500/20"
        >
          Drag & Drop
        </span>
      </div>

      {/* Category selector */}
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

      {/* Scrollable list of items with set headers */}
      <div className="max-h-[calc(100vh-320px)] min-h-[250px] overflow-y-auto pr-1 space-y-3 custom-scrollbar">
        {groupedItems.map((group, gIdx) => (
          <div key={group.setName || `group-${gIdx}`} className="space-y-1.5">
            {/* Set Header divider */}
            {group.setName && (
              <div className="flex items-center gap-2 pt-1 pb-0.5">
                <span
                  className="text-[10px] font-black uppercase tracking-widest text-amber-400/90 bg-amber-500/10
                  px-2 py-0.5 rounded border border-amber-500/20"
                >
                  🛡️ {group.setName}
                </span>
                <div className="h-1px bg-slate-800 flex-1" />
              </div>
            )}

            {/* Items Grid */}
            <div className="grid grid-cols-2 gap-1.5">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onClick={() => onSelectItem(item)}
                  className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80
                    hover:border-amber-500/50 hover:bg-slate-800/50 transition-all text-left cursor-grab
                    active:cursor-grabbing group"
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-8 h-8 rounded-sm object-contain shrink-0 group-hover:scale-110 transition-transform"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-amber-300 truncate">
                      {item.name}
                    </span>
                    <span className="text-[9px] text-slate-500 font-semibold">
                      Grade {item.grade}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LootItemPicker;
