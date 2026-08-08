import BadgeOwner from "../../../../components/BadgeOwner/BadgeOwner";
import OutPrime from "../../../../components/OutPrime/OutPrime";
import { useIsPWA } from "../../../../hooks/useIsPWA";
import useTranslation from "../../../../hooks/useTranslation";
import useAppStore from "../../../../store/useAppStore";
import { getDiplomacyConfig } from "../../../../utils/general";
import { subscribeUserToPush } from "../../../../utils/pushNotifications";
import AlertButton from "./AlertButton";

const AllEventsItem = ({
  id,
  ts,
  icon,
  name,
  owner,
  spawnDate,
  relation,
  isOutPrime,
}) => {
  const config = getDiplomacyConfig(relation);
  const {
    glowClass,
    gradientStyle,
    iconBorder,
    titleClass,
    badgeClass,
    badgeIcon,
  } = config || {};

  const { t, language } = useTranslation();
  const isPWA = useIsPWA();

  const pushAlerts = useAppStore((state) => state.pushAlerts);
  const togglePushAlert = useAppStore((state) => state.togglePushAlert);
  const defaultLeadTime = useAppStore((state) => state.defaultLeadTime);

  const alertData = pushAlerts[id];
  const isAlertActive = !!alertData;

  // Hide alert icon If respawn in 15min or less || respawn < leadTime
  const now = Date.now();
  const timeToSpawnMs = ts - now;
  const minutesToSpawn = Math.floor(timeToSpawnMs / (1000 * 60));

  const effectiveLeadTime = alertData?.leadTimeMinutes ?? defaultLeadTime;
  const shouldHideBell =
    minutesToSpawn < 15 || minutesToSpawn <= effectiveLeadTime;

  const handleBellClick = async (e) => {
    e.stopPropagation();

    // 1. New allert
    const newAlerts = { ...pushAlerts };
    const isCurrentlyActive = !!newAlerts[id];

    if (isCurrentlyActive) {
      delete newAlerts[id];
    } else {
      if (Object.keys(newAlerts).length >= 5) {
        alert(t.maxAlerts);
        return;
      }
      newAlerts[id] = { leadTimeMinutes: defaultLeadTime };
    }

    try {
      togglePushAlert(id);
      await subscribeUserToPush(newAlerts, language);
    } catch (err) {
      console.error("Failed to sync push subscription:", err);
      // Is user denied permissions for push-notification
      togglePushAlert(id);
      alert(`${t.error} ${err.message}`);
    }
  };

  return (
    <div
      className={`group relative rounded-xl p-px overflow-hidden transition-all duration-500 border
        border-slate-800/50 ${glowClass}`}
    >
      {/* Dynamic gradient */}
      <div
        className="absolute inset-[-180%] animate-spin pointer-events-none opacity-30 group-hover:opacity-100
          group-hover:scale-110 duration-700 transition-all"
        style={{
          backgroundImage: gradientStyle,
          animationDuration: "8s",
        }}
      />

      <div
        className="bg-slate-900/95 backdrop-blur-xl rounded-xl p-4 relative z-10 flex
        items-center gap-4 w-full h-full text-left"
      >
        {/* Icon Container */}
        <div
          className={`w-12 h-12 rounded-lg border flex items-center justify-center text-3xl shrink-0
            shadow-inner group-hover:scale-105 duration-300 transition-transform ${iconBorder}`}
        >
          {icon.length <= 3 ? (
            icon
          ) : (
            <img src={icon} width={45} className="rounded-xl" alt={name} />
          )}
        </div>

        {/* Info Container */}
        <div className="flex-1 overflow-hidden min-w-0 pr-6">
          <div className="flex items-center gap-2 flex-wrap">
            <h4
              className={`font-black text-base md:text-lg tracking-wide capitalize truncate w-full ${titleClass}`}
            >
              {name}
            </h4>

            {/* Owner badge */}
            {owner && (
              <BadgeOwner
                badgeClass={badgeClass}
                badgeIcon={badgeIcon}
                owner={owner}
              />
            )}
            {isOutPrime && <OutPrime />}
          </div>

          {/* Respawn time */}
          <div className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1.5">
            {spawnDate}
          </div>
        </div>

        {/* PUSH ALERT BELL BUTTON (Top Right) */}
        {!shouldHideBell && isPWA && (
          <AlertButton
            isAlertActive={isAlertActive}
            handleBellClick={handleBellClick}
            leadTimeMinutes={alertData?.leadTimeMinutes}
          />
        )}
      </div>
    </div>
  );
};

export default AllEventsItem;
