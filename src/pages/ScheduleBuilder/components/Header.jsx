import { useState } from "react";

import useTranslation from "../../../hooks/useTranslation";
import { MAKE_SCREENSHOT_STATUS } from "../../../utils/constants";
import { takeScreenshot } from "../../../utils/scheduleBuilder";

const Header = ({ tableRef }) => {
  const { t } = useTranslation();

  const [screenshotStatus, setScreenshotStatus] = useState(
    MAKE_SCREENSHOT_STATUS.None,
  );

  const screenshotLabel = () => {
    if (screenshotStatus == MAKE_SCREENSHOT_STATUS.Progress)
      return t.sbScreenshotProgress;
    if (screenshotStatus === MAKE_SCREENSHOT_STATUS.Success)
      return t.sbScreenshotSuccess;
    if (screenshotStatus === MAKE_SCREENSHOT_STATUS.Error)
      return t.sbScreenshotError;
    return t.sbScreenshotBtn;
  };

  return (
    <div
      className="mb-8 border-b border-slate-800 pb-6 flex flex-col
      md:flex-row justify-between items-start md:items-center gap-4 animate-in fade-in duration-300"
    >
      <div>
        <h1
          className="text-2xl md:text-3xl font-black tracking-widest
          text-transparent [-webkit-text-stroke:1px_#94a3b8] uppercase"
        >
          {t.sbTitle}
        </h1>
      </div>
      <button
        onClick={() => takeScreenshot(tableRef, setScreenshotStatus)}
        disabled={
          screenshotStatus === MAKE_SCREENSHOT_STATUS.Error ||
          screenshotStatus === MAKE_SCREENSHOT_STATUS.Progress
        }
        className="flex items-center gap-2 py-2.5 px-5 text-xs font-black uppercase tracking-wider bg-teal-600
        hover:bg-teal-500 disabled:bg-teal-800 text-white rounded-xl border border-teal-500/40
          transition-all duration-300 shadow-lg cursor-pointer"
      >
        {screenshotLabel()}
      </button>
    </div>
  );
};

export default Header;
