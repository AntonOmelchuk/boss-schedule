import { formatRemaining, getDiplomacyConfig } from "../utils/general";

const MainBlock = ({ t, nearestEvent, now }) => {
  const { relation, name, owner, icon, isSwat } = nearestEvent || {};

  const config = getDiplomacyConfig(relation);

  const { gradientStyle, timerClass, titleClass, badgeClass } = config;

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
            {icon}
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
              {name}
            </h2>
            {isSwat && (
              <span
                className="shrink-0 text-xl md:text-2xl font-black tracking-widest text-red-400 py-0.5
               rounded uppercase"
              >
                {`🚫 ${t.swatSkip}`}
              </span>
            )}
            {owner && (
              <p className="text-sm text-slate-400 mt-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                {t.owner}:{" "}
                <span className="font-bold text-slate-200">{owner}</span>
              </p>
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
