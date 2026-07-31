import { useRef, useState } from "react";

import { MAKE_SCREENSHOT_STATUS } from "../../../constants/general";
import useTranslation from "../../../hooks/useTranslation";
import { useLootStore } from "../../../store/useLootStore";
import takeLootScreenshot from "../../../utils/takeLootScreenshot";

const LootResults = () => {
  const { t } = useTranslation();
  const { results, resetLootSharing, isRolling } = useLootStore();
  const tableRef = useRef(null);

  const [screenshotStatus, setScreenshotStatus] = useState(
    MAKE_SCREENSHOT_STATUS.None,
  );

  if (isRolling) {
    return (
      <div
        className="p-12 text-center rounded-2xl border border-amber-500/30 bg-slate-900/80 backdrop-blur-xl
        flex flex-col items-center gap-4 animate-pulse"
      >
        <span className="text-5xl animate-bounce">🎲</span>
        <h3 className="text-xl font-black text-amber-400">
          {t.loot.rollingAnimation}
        </h3>
      </div>
    );
  }

  if (results.length === 0) return null;

  const handleTakeScreenshot = () => {
    takeLootScreenshot(tableRef, setScreenshotStatus);
  };

  const handleComplete = () => {
    if (window.confirm(t.loot.completeConfirm)) {
      resetLootSharing();
    }
  };

  // Determine button text and styling based on current screenshot status
  const getScreenshotBtnContent = () => {
    if (screenshotStatus === MAKE_SCREENSHOT_STATUS.Progress) {
      return t.sbScreenshotProgress || "⏳ Capturing...";
    }
    if (screenshotStatus === MAKE_SCREENSHOT_STATUS.Success) {
      return t.sbScreenshotSuccess || "✅ Saved!";
    }
    if (screenshotStatus === MAKE_SCREENSHOT_STATUS.Error) {
      return "❌ Error";
    }
    return t.loot.screenshotBtn || "📸 Screenshot";
  };

  const screenshotStyles =
    screenshotStatus === MAKE_SCREENSHOT_STATUS.Success
      ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
      : "bg-slate-800 hover:bg-slate-700 text-slate-200";

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-lg font-black text-amber-400 tracking-tight flex items-center gap-2">
          🏆 {t.loot.resultsTitle}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleTakeScreenshot}
            disabled={screenshotStatus === MAKE_SCREENSHOT_STATUS.Progress}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center
              gap-1.5 ${screenshotStyles} disabled:opacity-50`}
          >
            {getScreenshotBtnContent()}
          </button>

          <button
            onClick={handleComplete}
            className="px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30
              font-bold text-xs transition-all cursor-pointer"
          >
            {t.loot.completeBtn}
          </button>
        </div>
      </div>

      {/* Target DOM element for screenshot generation */}
      <div
        ref={tableRef}
        className="p-5 rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl space-y-4"
      >
        <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
          <span className="text-xs font-black text-amber-500 uppercase tracking-widest">
            ⚔️ Alliance Loot Distribution Result
          </span>
          <span className="text-[10px] text-slate-500 font-semibold">
            {new Date().toLocaleDateString()}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-extrabold uppercase tracking-wider">
                <th className="py-2.5 px-3">{t.loot.lotHeader}</th>
                <th className="py-2.5 px-3">{t.loot.itemsHeader}</th>
                <th className="py-2.5 px-3">{t.loot.winner}</th>
                <th className="py-2.5 px-3 text-right">{t.loot.rollHeader}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {results.map((res) => (
                <tr key={res.lotId} className="hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-black text-amber-400">
                    Лот #{res.lotNumber}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex flex-wrap gap-1.5">
                      {res.items.map((i) => (
                        <span
                          key={i.id}
                          className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-200"
                        >
                          {i.icon} {i.name}{" "}
                          {i.count > 1 && (
                            <strong className="text-amber-400">
                              x{i.count}
                            </strong>
                          )}
                        </span>
                      ))}
                      {res.customText && (
                        <span className="italic text-slate-400">
                          {res.customText}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30
                      text-emerald-400 font-bold"
                    >
                      {res.winnerPartyName}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-black text-amber-400">
                    🎲 {res.rolls[res.winnerPartyId]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LootResults;
