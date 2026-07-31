import { useState } from "react";

import useTranslation from "../../../hooks/useTranslation";
import { useLootStore } from "../../../store/useLootStore";
import LootItemPicker from "./LootItemPicker";

const LootBuilder = () => {
  const { t } = useTranslation();
  const {
    lots,
    addLot,
    removeLot,
    addItemToLot,
    updateItemCount,
    removeItemFromLot,
    updateLotCustomText,
  } = useLootStore();

  const [targetLotId, setTargetLotId] = useState(lots[0]?.id || null);

  // Active lot for adding items by click
  const activeLotId =
    targetLotId && lots.some((l) => l.id === targetLotId)
      ? targetLotId
      : lots[lots.length - 1]?.id;

  return (
    <div className="space-y-4">
      {/* Items panel */}
      <LootItemPicker
        activeLotId={activeLotId}
        onSelectItem={(item) => addItemToLot(activeLotId, item)}
      />

      {/* Lots list */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <span>🎁</span> {t.loot.lotsTitle} ({lots.length})
          </h3>
          <button
            onClick={addLot}
            className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30
              hover:bg-amber-500/30 font-bold text-xs transition-all cursor-pointer"
          >
            {t.loot.addLotBtn}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {lots.map((lot, index) => {
            const isActiveLot = lot.id === activeLotId;

            return (
              <div
                key={lot.id}
                onClick={() => setTargetLotId(lot.id)}
                className={`p-4 rounded-2xl border transition-all flex flex-col gap-3 relative cursor-pointer ${
                  isActiveLot
                    ? "bg-slate-900/90 border-amber-500/50 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/30"
                    : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                }`}
              >
                {/* Lot title */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-black text-amber-400 uppercase tracking-widest flex
                    items-center gap-1.5"
                  >
                    Лот #{index + 1}
                    {isActiveLot && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-bold">
                        Активний
                      </span>
                    )}
                  </span>
                  {lots.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeLot(lot.id);
                      }}
                      className="text-slate-500 hover:text-red-400 text-xs font-bold p-1 transition-colors"
                      title="Видалити лот"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Lots items */}
                <div
                  className="flex flex-wrap gap-2 min-h-[42px] p-2 bg-slate-950/60 rounded-xl border
                  border-slate-800/80"
                >
                  {lot.items.length === 0 && !lot.customText && (
                    <span className="text-xs text-slate-500 italic m-auto">
                      Порожньо (клікайте на предмети вище)
                    </span>
                  )}

                  {lot.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 px-2 py-1
                        rounded-lg text-xs"
                    >
                      <span>{item.icon}</span>
                      <span className="font-semibold text-slate-200">
                        {item.name}
                      </span>

                      {/* Counter */}
                      <div className="flex items-center gap-1 ml-1 bg-slate-950 rounded px-1 border border-slate-800">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateItemCount(lot.id, item.id, -1);
                          }}
                          className="text-slate-400 hover:text-amber-400 font-bold text-xs px-1"
                        >
                          -
                        </button>
                        <span className="font-extrabold text-amber-400 text-xs">
                          {item.count}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateItemCount(lot.id, item.id, 1);
                          }}
                          className="text-slate-400 hover:text-amber-400 font-bold text-xs px-1"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItemFromLot(lot.id, item.id);
                        }}
                        className="text-slate-500 hover:text-red-400 ml-1 font-bold text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* Field for custom text */}
                <input
                  type="text"
                  value={lot.customText}
                  onChange={(e) => updateLotCustomText(lot.id, e.target.value)}
                  placeholder={t.loot.customItemPlaceholder}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs
                    text-slate-200 focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LootBuilder;
