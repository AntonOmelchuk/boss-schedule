/* eslint-disable indent */
import { EPIC_COLORS } from "../../../../constants/general";
import { MEMBER_COLORS, MEMBERS_MAP } from "../../../../constants/members";
import { getBossIcon } from "../../../../utils/general";

const EpicTreasuryAndQueue = ({ membersData }) => {
  const sortedByContribution = [...membersData].sort(
    (a, b) => b.all_points - a.all_points,
  );
  const nextTarget =
    sortedByContribution.find((m) => m.net_balance >= 20) ||
    sortedByContribution[0];

  return (
    <div className="space-y-6 text-white">
      <div
        className="relative overflow-hidden rounded-2xl border-2 border-amber-500/60 bg-gradient-to-r
        from-amber-950/40 via-black/80 to-amber-950/40 p-6 shadow-[0_0_30px_rgba(245,158,11,0.25)] backdrop-blur-md"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="text-4xl sm:text-5xl bg-amber-500/20 p-3 rounded-2xl border border-amber-500/40
              shadow-inner"
            >
              🎯
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-amber-400 font-bold">
                Next Epic Priority Prediction
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-wide mt-1">
                {nextTarget?.name}{" "}
                <span className="text-amber-400">#1 CANDIDATE</span>
              </h3>
            </div>
          </div>

          <div
            className="flex flex-wrap items-center gap-3 bg-black/60 px-5 py-3 rounded-xl border
            border-amber-500/30"
          >
            <div className="text-right">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                Estimated Pool Readiness
              </span>
              <span className="text-xl font-mono font-black text-emerald-400">
                Net:{" "}
                {nextTarget?.net_balance > 0
                  ? `+${nextTarget?.net_balance}`
                  : nextTarget?.net_balance}
              </span>
            </div>
            <div className="h-8 w-px bg-white/10 mx-2 hidden sm:block" />
            <div className="text-xs text-amber-200/80 max-w-55">
              Пріоритет за масою внеску (`ALL: {nextTarget?.all_points}`) та
              ліквідністю.
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {membersData.map((member) => {
          const key =
            Object.keys(MEMBERS_MAP).find(
              (k) => k.toLowerCase() === member.name.toLowerCase(),
            ) || member.name;

          const avatar = MEMBERS_MAP[key]?.image;
          const colors = MEMBER_COLORS[key] || {
            start: "#334155",
            end: "#0f172a",
          };
          const net = member.net_balance;
          const isNegative = net < 0;
          const isNextTop = member.name === nextTarget?.name;

          return (
            <div
              key={member.name}
              className={`relative overflow-hidden rounded-2xl border transition-all duration-300 p-5
                backdrop-blur-md shadow-xl ${
                  isNextTop
                    ? "border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                    : "border-white/15 hover:border-amber-500/40"
                }`}
              style={{
                background: `linear-gradient(145deg, ${colors.start}35 0%, ${colors.end}90 100%)`,
              }}
            >
              {isNextTop && (
                <div
                  className="absolute top-0 right-0 bg-amber-500 text-black text-[10px] font-black uppercase
                  tracking-widest px-3 py-1 rounded-bl-xl shadow-md"
                >
                  ★ TOP PICK
                </div>
              )}

              <div className="flex items-center gap-4 border-b border-white/15 pb-4">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={member.name}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-amber-500/60
                      shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                  />
                ) : (
                  <div
                    className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center text-2xl
                    border-2 border-white/20"
                  >
                    🛡️
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xl font-extrabold text-amber-200 tracking-wide truncate">
                    {member.name}
                  </h4>
                  <span
                    className={`inline-block mt-1 text-[11px] font-bold uppercase tracking-wider px-2
                      py-0.5 rounded-md ${
                        isNegative
                          ? "bg-red-500/20 text-red-300 border border-red-500/40"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      }`}
                  >
                    {isNegative ? "⚠️ DEBT / GRIND" : "✨ ACTIVE LIQUID"}
                  </span>
                </div>
              </div>

              {/* Серед: Великі показники фонду */}
              <div
                className="grid grid-cols-3 gap-2 my-4 font-mono bg-black/50 p-3.5 rounded-xl
                border border-white/10 text-center"
              >
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
                    ALL
                  </span>
                  <span className="text-white font-extrabold text-base">
                    {member.all_points}
                  </span>
                </div>
                <div className="border-x border-white/10 px-1">
                  <span className="text-orange-400 block text-[10px] uppercase tracking-wider">
                    SPENT
                  </span>
                  <span className="text-orange-300 font-extrabold text-base">
                    -{member.spent_on_epics}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
                    NET
                  </span>
                  <span
                    className={`font-black text-base ${isNegative ? "text-red-400" : "text-emerald-400"}`}
                  >
                    {net > 0 ? `+${net}` : net}
                  </span>
                </div>
              </div>

              {/* Низ: Збільшені бейджі епіків з іконками */}
              <div>
                <span className="text-xs text-slate-300 uppercase tracking-widest font-semibold block mb-2">
                  Acquired Epics ({member.epics_received?.length || 0}):
                </span>
                <div className="flex flex-wrap gap-2">
                  {member.epics_received && member.epics_received.length > 0 ? (
                    member.epics_received.map((epic, idx) => {
                      const bossColor =
                        EPIC_COLORS[epic.epic_name] || "#64748b";
                      const icon = getBossIcon(epic.epic_name);
                      return (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs
                            font-bold text-white shadow-md border border-white/30"
                          style={{ backgroundColor: `${bossColor}E6` }}
                        >
                          <span className="text-sm">{icon}</span>
                          <span className="tracking-wide">
                            {epic.epic_name}
                          </span>
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-xs text-slate-500 italic py-1">
                      No epics acquired yet
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EpicTreasuryAndQueue;
