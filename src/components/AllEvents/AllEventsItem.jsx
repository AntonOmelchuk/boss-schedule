import { getDiplomacyConfig } from "../../utils/general";

const AllEventsItem = ({
  t,
  icon,
  name,
  owner,
  spawnDate,
  relation,
  isSwat,
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
      {/* Динамічний неоновий градієнт, який прискорюється та стає яскравішим при наведенні */}
      <div
        className="absolute inset-[-180%] animate-spin pointer-events-none opacity-30 group-hover:opacity-100
          group-hover:scale-110 duration-700 transition-all"
        style={{
          backgroundImage: gradientStyle,
          animationDuration: "8s",
        }}
      />

      {/* Внутрішня підкладка картки */}
      <div
        className="bg-slate-900/95 backdrop-blur-xl rounded-xl p-4 relative z-10 flex
        items-center gap-4 w-full h-full text-left"
      >
        {/* Іконка івенту з дипломатичною рамкою кольору статусу */}
        <div
          className={`w-12 h-12 rounded-lg border flex items-center justify-center text-3xl shrink-0
          shadow-inner group-hover:scale-105 duration-300 transition-transform ${iconBorder}`}
        >
          {icon}
        </div>

        {/* Текстовий блок події */}
        <div className="flex-1 overflow-hidden min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4
              className={`font-black text-lg tracking-wide capitalize truncate w-full ${titleClass}`}
            >
              {name}
            </h4>

            {/* Динамічний бейдж клану-власника */}
            {owner && (
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5
                rounded-md text-[10px] font-black uppercase tracking-wider
                border shadow-sm animate-pulse ${badgeClass}`}
              >
                {badgeIcon} {owner}
              </span>
            )}
            <div className="flex">
              {isSwat && (
                <span
                  className="shrink-0 text-[9px] font-black tracking-widest text-red-400 px-1.5 py-0.5
                    rounded bg-red-500/10 border border-red-500/20 uppercase"
                >
                  🚫 {t.swatSkip}
                </span>
              )}
            </div>
          </div>

          {/* Дата респауну події */}
          <div className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1.5">
            {spawnDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEventsItem;
