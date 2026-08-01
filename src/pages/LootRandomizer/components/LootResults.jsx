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
    <div className="space-y-4 w-full">
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
        className="p-5 rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl space-y-4 w-full"
      >
        <div className="border-b border-slate-800 pb-3 flex items-center">
          <span className="text-base font-black text-amber-500 uppercase tracking-widest">
            ⚔️ {t.loot.allianceLootDistributionResult}
          </span>
          <span className="text-xs text-slate-300 font-semibold pl-4">
            ({new Date().toLocaleDateString()})
          </span>
        </div>

        {/* Force 4 columns starting from medium screens (md:grid-cols-4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full">
          {results.map((res) => (
            <div
              key={res.lotId}
              className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between
                gap-2.5 min-w-0"
            >
              {/* Header: Lot number and Roll value */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="font-black text-amber-400 text-xs uppercase tracking-wider truncate">
                  {t.loot.lotHeader} #{res.lotNumber}
                </span>
                <span
                  className="px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400
                  font-bold text-xs truncate"
                >
                  {res.winnerPartyName}
                </span>
              </div>

              {/* Items List */}
              <div className="flex flex-wrap gap-1.5 my-1">
                {res.items.map((i) => (
                  <div className="flex bg-slate-950 px-1 py-0.5 rounded-md border border-slate-800/80">
                    <img src={i.icon} className="w-4 h-4 rounded-sm" />
                    <span
                      key={i.id}
                      className="text-slate-200 text-xs font-semibold pl-1"
                    >
                      {i.name}{" "}
                      {i.count > 1 && (
                        <strong className="text-amber-400">x{i.count}</strong>
                      )}
                    </span>
                  </div>
                ))}
                {res.customText && (
                  <span className="italic text-slate-400 text-xs">
                    {res.customText}
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

export default LootResults;
