import { useState } from "react";

import InfoIcon from "../../../../../../components/InfoIcon/InfoIcon";
import { SORT } from "../../../../../../constants/general";
import useTranslation from "../../../../../../hooks/useTranslation";
import TierItem from "./TierItem";

const InfoBlock = ({ viewMode }) => {
  const { t } = useTranslation();
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const {
    sTierDesc,
    aTierDesc,
    bTierDesc,
    priorityTitle,
    priorityDesc,
    ariaLabel,
    headerTitle,
  } = t.infoBlock;

  // Render tooltip content based on view mode
  const renderContent = () => (
    <>
      {viewMode === SORT.POINTS ? (
        <>
          <p className="text-base font-bold text-indigo-400 mb-1">
            {t.infoBlock?.tierCalcTitle}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed mb-2">
            {t.infoBlock?.tierCalcSubtitle}
          </p>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <TierItem tier="S" className="text-amber-400" text={sTierDesc} />
            <TierItem tier="A" className="text-indigo-300" text={aTierDesc} />
            <TierItem tier="B" className="text-slate-400" text={bTierDesc} />
          </ul>
        </>
      ) : (
        <>
          <p className="text-base font-bold text-amber-400 mb-1">
            {priorityTitle}
          </p>
          <p className="text-sm leading-relaxed text-slate-300">
            {priorityDesc}
          </p>
        </>
      )}
    </>
  );

  return (
    <>
      {/* 1. Desktop (Hover-tooltip) */}
      <div className="hidden md:block relative group cursor-help">
        <InfoIcon />
        <div
          className="absolute right-0 top-8 w-72 z-30 bg-slate-950 border border-slate-700 p-3.5
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
          aria-label={ariaLabel}
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

            {/* Mobile Bottom Sheet Container with extra bottom padding for mobile tabs */}
            <div
              className="relative z-10 w-full max-w-md bg-slate-900 border-t border-slate-800
                rounded-t-3xl p-6 pb-20 shadow-2xl flex flex-col gap-4 max-h-[85vh]
                animate-in slide-in-from-bottom duration-200"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {headerTitle}
                </span>
                <button
                  onClick={() => setIsOpenMobile(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center
                  hover:text-slate-100 transition cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="py-1 overflow-y-auto custom-scrollbar">
                {renderContent()}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InfoBlock;
