import { useState } from "react";

import InfoIcon from "../../../../../../components/InfoIcon/InfoIcon";
import { SORT } from "../../../../../../utils/constants";

const InfoBlock = ({ viewMode }) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Tooltip content same for Desktop and Mobile
  const renderContent = () => (
    <>
      {viewMode === SORT.POINTS ? (
        <>
          <p className="text-sm font-bold text-indigo-400 mb-1">
            How Tiers Are Calculated:
          </p>
          <p className="text-xs text-slate-300 leading-relaxed mb-2">
            Tiers are based on relative ranking (percentile):
          </p>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li>
              <strong className="text-amber-400">S-TIER:</strong> Top 15%
              performers
            </li>
            <li>
              <strong className="text-indigo-300">A-TIER:</strong> Next 40% (15%
              – 55%)
            </li>
            <li>
              <strong className="text-slate-400">B-TIER:</strong> Remaining CPs
              (55% – 100%)
            </li>
          </ul>
        </>
      ) : (
        <>
          <p className="text-sm font-bold text-amber-400 mb-1">
            Priority Queue:
          </p>
          <p className="text-xs leading-relaxed text-slate-300">
            Sorted by GB/PTs ratio from lowest to highest. CPs at the top have
            accumulated the most points relative to received epics, making them
            top priority for the next drop.
          </p>
        </>
      )}
    </>
  );

  return (
    <>
      {/* 1. Desktop (Hover-tooltip) */}
      <div className="hidden md:block relative group cursor-pointer">
        <InfoIcon />
        <div
          className="absolute right-0 top-8 w-72 z-20 bg-slate-950 border border-slate-700 p-3.5
            rounded-xl shadow-2xl text-xs text-slate-300 opacity-0 invisible group-hover:opacity-100
            group-hover:visible transition-all duration-200 pointer-events-none"
        >
          {renderContent()}
        </div>
      </div>

      {/* 2. Mobile Button & Bottom Sheet */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpenMobile(true)}
          className="flex items-center justify-center p-1 rounded-lg text-slate-400 hover:text-slate-200
            active:scale-95 transition cursor-pointer"
          aria-label="Show info"
        >
          <InfoIcon />
        </button>

        {isOpenMobile && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            {/* Backdrop */}
            <div
              onClick={() => setIsOpenMobile(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            />

            {/* Mobile Bottom Sheet */}
            <div
              className="relative z-10 w-full max-w-md bg-slate-900 border-t border-slate-800
                rounded-t-3xl p-6 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom duration-200"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Information
                </span>
                <button
                  onClick={() => setIsOpenMobile(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center
                  hover:text-slate-100"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="py-1">{renderContent()}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InfoBlock;
