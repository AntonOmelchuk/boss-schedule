import useFilterEvents from "../../hooks/useFilterEvents";
import useTranslation from "../../hooks/useTranslation";
import { formatRemaining, getDiplomacyConfig } from "../../utils/general";
import BadgeOwner from "../BadgeOwner/BadgeOwner";
import OutPrime from "../OutPrime/OutPrime";

const MainBlock = () => {
  const { t } = useTranslation();

  const { filteredEvents, now } = useFilterEvents();

  const nearestEvent = filteredEvents.length > 0 ? filteredEvents[4] : null;

  const { relation, name, owner, icon, isOutPrime } = nearestEvent || {};
  const config = getDiplomacyConfig(relation);
  const { gradientStyle, timerClass, titleClass, badgeClass, badgeIcon } =
    config;

  return (
    <div className="relative mb-8 rounded-3xl p-0.5 overflow-hidden shadow-2xl">
      <div
        className="absolute inset-[-150%] animate-spin"
        style={{
          backgroundImage: gradientStyle,
          animationDuration: "6s",
        }}
      />

      <div
        className="bg-slate-900/95 backdrop-blur-xl rounded-3xl p-6 relative z-10 flex flex-col md:flex-row
        justify-between items-start md:items-center gap-6 text-left"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-16 h-16 text-3xl rounded-2xl border flex items-center justify-center
              shrink-0 shadow-inner ${badgeClass}`}
          >
            {icon ? (
              icon.length <= 3 ? (
                icon
              ) : (
                <img src={icon} width={63} className="rounded-xl" />
              )
            ) : (
              "⏳"
            )}
          </div>
          <div>
            <span
              className="text-[12px] uppercase font-black tracking-widest text-amber-500 px-2 py-1 rounded
              bg-amber-500/10 border border-amber-500/20"
            >
              {t.nearestEvent}
            </span>
            <h2
              className={`text-2xl md:text-3xl font-black tracking-wide text-slate-100 mt-2.5 capitalize ${titleClass}`}
            >
              {name || "Loading..."}
            </h2>
            {isOutPrime && <OutPrime withoutBorder />}
            {owner && (
              <BadgeOwner owner={owner} badgeIcon={badgeIcon} withoutBorder />
            )}
          </div>
        </div>
        <div
          className="w-full md:w-auto text-left md:text-right border-t border-slate-800/85
          md:border-t-0 pt-4 md:pt-0"
        >
          <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">
            {t.timeToStart}
          </p>
          <p
            className={`text-3xl md:text-4xl font-black tracking-widest font-mono animate-pulse ${timerClass}`}
          >
            {nearestEvent
              ? formatRemaining(nearestEvent.ts - now, false, t)
              : "00:00:00"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainBlock;
