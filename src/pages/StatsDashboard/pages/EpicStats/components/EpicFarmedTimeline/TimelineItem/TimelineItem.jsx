import { getBossIcon } from "../../../../../../../utils/general";

const TimelineItem = ({
  bossColor,
  name,
  farmDate,
  isShared,
  cp,
  shareDate,
}) => {
  const bossIcon = getBossIcon(name);

  return (
    <div className="relative group">
      {/* Timeline Dot */}
      <span
        className="absolute -left-4.75 sm:-left-5.75 top-1.5 w-3.5 h-3.5 rounded-full border-2
          border-slate-950 transition group-hover:scale-125"
        style={{ backgroundColor: bossColor }}
      />

      {/* Event Card */}
      <div
        className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4 flex flex-col
          sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700/80 transition"
      >
        {/* Left Info: Boss & Farm Date */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm
              text-slate-100 shadow-inner shrink-0"
            style={{
              backgroundColor: `${bossColor}22`,
              border: `1px solid ${bossColor}44`,
            }}
          >
            <img
              src={bossIcon}
              alt={name}
              className="w-7 h-7 object-contain drop-shadow"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span
                className="font-bold text-lg text-slate-100"
                style={{ color: bossColor }}
              >
                {name}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                📅 {farmDate}
              </span>
            </div>
          </div>
        </div>

        {/* Right Info: Assignment Status */}
        <div className="flex items-center gap-3 border-t sm:border-t-0 border-slate-800/60 pt-2 sm:pt-0">
          {isShared ? (
            <div className="text-right">
              <div className="text-lg font-bold text-emerald-400 flex items-center gap-1 justify-end">
                <span>Given to {cp}</span>
                <span className="text-emerald-500">✓</span>
              </div>
              <div className="text-xs text-slate-500">
                Shared on {shareDate}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400
                        border border-amber-500/20 animate-pulse"
              >
                ⚠️ In Treasury (Awaiting Tuesday Share)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
