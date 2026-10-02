/* eslint-disable indent */
import BadgeOwner from "../../../../components/BadgeOwner/BadgeOwner";
import EventIcon from "../../../../components/EventIcon/EventIcon";
import OutPrime from "../../../../components/OutPrime/OutPrime";
import { EPIC_COLORS } from "../../../../constants/general";
import { useIsPWA } from "../../../../hooks/useIsPWA";
import useTranslation from "../../../../hooks/useTranslation";
import useAppStore from "../../../../store/useAppStore";
import useAuthStore from "../../../../store/useAuthStore";
import { getDiplomacyConfig } from "../../../../utils/general";
import { subscribeUserToPush } from "../../../../utils/pushNotifications";
import AlertButton from "./AlertButton";

const getBossColor = (bossName, relation) => {
  if (relation === "alliance") return "#10b981";
  if (relation === "enemy") return "#ef4444";

  if (!bossName) return "#38bdf8";
  if (EPIC_COLORS[bossName]) return EPIC_COLORS[bossName];
  const key = Object.keys(EPIC_COLORS).find(
    (k) => k.toLowerCase() === bossName.toLowerCase(),
  );
  return key ? EPIC_COLORS[key] : "#38bdf8";
};

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
  const { titleClass, badgeClass, badgeIcon } = config || {};

  const { t, language } = useTranslation();
  const isPWA = useIsPWA();

  const pushAlerts = useAppStore((state) => state.pushAlerts);
  const togglePushAlert = useAppStore((state) => state.togglePushAlert);
  const defaultLeadTime = useAppStore((state) => state.defaultLeadTime);

  const { user } = useAuthStore();

  const alertData = pushAlerts[id];
  const isAlertActive = !!alertData;

  const now = Date.now();
  const timeToSpawnMs = ts - now;
  const isPast = timeToSpawnMs < 0;
  const minutesToSpawn = Math.floor(timeToSpawnMs / (1000 * 60));

  const effectiveLeadTime = alertData?.leadTimeMinutes ?? defaultLeadTime;
  const shouldHideBell =
    minutesToSpawn < 15 || minutesToSpawn <= effectiveLeadTime;

  const handleBellClick = async (e) => {
    e.stopPropagation();

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
      await subscribeUserToPush(newAlerts, language, user?.discord_id || null);
    } catch (err) {
      console.error("Failed to sync push subscription:", err);
      togglePushAlert(id);
      alert(`${t.error} ${err.message}`);
    }
  };

  const bossColor = getBossColor(name, relation);

  return (
    <div
      className={`relative rounded-xl p-3 bg-slate-950/80 transition-all duration-300
        shadow-md flex items-center justify-between gap-3.5 group min-w-65 w-full ${
          isPast
            ? "opacity-40 grayscale-[0.3] hover:opacity-80 hover:grayscale-0"
            : "hover:bg-slate-900/90"
        }`}
      style={{
        borderLeft: `4px solid ${bossColor}`,
        borderRight: `1px solid ${bossColor}40`,
        borderTop: `1px solid rgba(255, 255, 255, 0.08)`,
        borderBottom: `1px solid rgba(255, 255, 255, 0.08)`,
      }}
    >
      <EventIcon
        size={72}
        icon={icon}
        name={name}
        relation={relation}
        bossColor={bossColor}
      />

      <div className="flex-1 overflow-hidden min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4
            className={`font-black text-base md:text-lg tracking-wide capitalize truncate ${
              titleClass || "text-slate-100"
            }`}
          >
            {name}
          </h4>

          {owner && (
            <BadgeOwner
              badgeClass={badgeClass}
              badgeIcon={badgeIcon}
              owner={owner}
            />
          )}
          {isOutPrime && <OutPrime />}
        </div>

        <div className="text-xs font-mono font-bold text-slate-400 mt-1 flex items-center gap-1.5">
          <span
            className="inline-block w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: bossColor }}
          />
          <span className="truncate">{spawnDate}</span>
        </div>
      </div>

      {!shouldHideBell && isPWA && (
        <div className="shrink-0">
          <AlertButton
            isAlertActive={isAlertActive}
            handleBellClick={handleBellClick}
            leadTimeMinutes={alertData?.leadTimeMinutes}
          />
        </div>
      )}
    </div>
  );
};

export default AllEventsItem;
