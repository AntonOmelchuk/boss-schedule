import BadgeOwner from "../../../../components/BadgeOwner/BadgeOwner";
import OutPrime from "../../../../components/OutPrime/OutPrime";
import { EPIC_COLORS } from "../../../../constants/general";
import useFilterEvents from "../../../../hooks/useFilterEvents";
import useTranslation from "../../../../hooks/useTranslation";
import { formatRemaining, getDiplomacyConfig } from "../../../../utils/general";

const getBossColor = (bossName) => {
  if (!bossName) return "#38bdf8";
  if (EPIC_COLORS[bossName]) return EPIC_COLORS[bossName];
  const key = Object.keys(EPIC_COLORS).find(
    (k) => k.toLowerCase() === bossName.toLowerCase(),
  );
  return key ? EPIC_COLORS[key] : "#38bdf8";
};

const MainBlock = () => {
  const { t } = useTranslation();
  const { filteredEvents, now } = useFilterEvents();

  const nearestEvent = filteredEvents.length > 0 ? filteredEvents[0] : null;

  const { relation, name, owner, icon, isOutPrime } = nearestEvent || {};
  const config = getDiplomacyConfig(relation);
  const { timerClass, titleClass, badgeIcon } = config || {};

  const bossColor = getBossColor(name);

  return (
    <div
      className="relative my-4 md:mb-8 rounded-2xl overflow-hidden shadow-2xl bg-slate-950/80
        backdrop-blur-xl transition-all duration-300"
      style={{
        borderLeft: `5px solid ${bossColor}`,
        borderRight: `1px solid ${bossColor}40`,
        borderTop: `1px solid rgba(255, 255, 255, 0.08)`,
        borderBottom: `1px solid rgba(255, 255, 255, 0.08)`,
      }}
    >
      <div className="p-5 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left">
        <div className="flex items-center gap-4 md:gap-5">
          <div
            className="w-14 h-14 md:w-20 md:h-20 text-3xl rounded-2xl border flex items-center
              justify-center shrink-0 shadow-inner bg-black/50"
            style={{ border: `2px solid ${bossColor}` }}
          >
            {icon ? (
              icon.length <= 3 ? (
                icon
              ) : (
                <img
                  src={icon}
                  className="rounded-xl h-full object-cover"
                  alt={name || "event"}
                />
              )
            ) : (
              "⏳"
            )}
          </div>

          <div>
            <span
              className="text-[11px] uppercase font-black tracking-widest text-amber-400 px-2.5
                py-1 rounded-md bg-amber-500/10 border border-amber-500/20"
            >
              {t.nearestEvent}
            </span>
            <h2
              className={`text-xl md:text-3xl font-black tracking-wide text-slate-100 mt-2 capitalize ${
                titleClass || ""
              }`}
            >
              {name || `${t.noInfo}`}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              {isOutPrime && <OutPrime withoutBorder />}
              {owner && (
                <BadgeOwner owner={owner} badgeIcon={badgeIcon} withoutBorder />
              )}
            </div>
          </div>
        </div>

        <div
          className="w-full md:w-auto text-left md:text-right border-t border-slate-800/80
            md:border-t-0 pt-4 md:pt-0"
        >
          <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">
            {t.timeToStart}
          </p>
          <p
            className={`text-2xl md:text-4xl font-black tracking-widest font-mono ${
              timerClass || "text-amber-400"
            }`}
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
