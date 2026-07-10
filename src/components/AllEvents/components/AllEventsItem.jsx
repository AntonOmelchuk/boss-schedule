import { getDiplomacyConfig } from "../../../utils/general";
import BadgeOwner from "../../BadgeOwner/BadgeOwner";
import OutPrime from "../../OutPrime/OutPrime";

const AllEventsItem = ({
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
        <div
          className={`w-12 h-12 rounded-lg border flex items-center justify-center text-3xl shrink-0
          shadow-inner group-hover:scale-105 duration-300 transition-transform ${iconBorder}`}
        >
          {icon}
        </div>

        <div className="flex-1 overflow-hidden min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4
              className={`font-black text-lg tracking-wide capitalize truncate w-full ${titleClass}`}
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
      </div>
    </div>
  );
};

export default AllEventsItem;
