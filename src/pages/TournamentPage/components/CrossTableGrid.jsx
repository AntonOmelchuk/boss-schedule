import useTranslation from "../../../hooks/useTranslation";

/**
 * Matrix Cross-Table for Round Robin showing only Win (W), Loss (L), Draw (D) status.
 */
const CrossTableGrid = ({
  participants = [],
  matches = [],
  onScoreUpdate,
  canManage,
}) => {
  const { t } = useTranslation();

  const matchMap = {};
  matches.forEach((m) => {
    matchMap[`${m.team1}__${m.team2}`] = m;
    matchMap[`${m.team2}__${m.team1}`] = m;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span>🗓️</span>{" "}
          {t.tournament?.crossTableTitle || "Сітка результатів (Крос-таблиця)"}
        </h3>
        <span className="text-[11px] text-slate-400">
          W - Перемога / L - Поразка / D - Нічия
        </span>
      </div>

      <div className="overflow-x-auto scrollbar-none pb-2">
        <table className="w-full text-center border-collapse text-xs">
          <thead>
            <tr className="bg-slate-950 text-slate-300 font-bold">
              <th className="p-2 border border-slate-800 text-left min-w-30 bg-slate-950 sticky left-0 z-10">
                {t.tournament?.teamHeader || "КП / Команда"}
              </th>
              {participants.map((cp) => (
                <th
                  key={cp}
                  className="p-2 border border-slate-800 min-w-16.25 max-w-21.25 truncate text-[11px]"
                  title={cp}
                >
                  {cp}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {participants.map((rowCp) => (
              <tr key={rowCp} className="hover:bg-slate-800/30 transition">
                <td
                  className="p-2 border border-slate-800 text-left font-bold text-white bg-slate-950
                  sticky left-0 z-10 truncate max-w-35"
                >
                  {rowCp}
                </td>

                {participants.map((colCp) => {
                  if (rowCp === colCp) {
                    return (
                      <td
                        key={colCp}
                        className="p-2 border border-slate-800 bg-slate-950/80 text-slate-700 select-none"
                      >
                        ✕
                      </td>
                    );
                  }

                  const match = matchMap[`${rowCp}__${colCp}`];
                  if (!match)
                    return (
                      <td
                        key={colCp}
                        className="p-2 border border-slate-800 text-slate-600"
                      >
                        —
                      </td>
                    );

                  const isRowTeam1 = match.team1 === rowCp;
                  const isFinished = match.status === "FINISHED";

                  let outcome = "PENDING"; // WIN, LOSS, DRAW, PENDING
                  if (isFinished) {
                    if (match.winner === rowCp) outcome = "WIN";
                    else if (
                      match.winner === "DRAW" ||
                      match.score1 === match.score2
                    )
                      outcome = "DRAW";
                    else outcome = "LOSS";
                  }

                  return (
                    <td
                      key={colCp}
                      className={`p-1.5 border border-slate-800 text-center font-black transition ${
                        outcome === "WIN"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : outcome === "LOSS"
                            ? "bg-rose-500/20 text-rose-400"
                            : outcome === "DRAW"
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-slate-900/50 text-slate-600"
                      }`}
                    >
                      {canManage ? (
                        <select
                          value={outcome}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === "WIN") {
                              onScoreUpdate(
                                match.id,
                                isRowTeam1 ? 1 : 0,
                                isRowTeam1 ? 0 : 1,
                              );
                            } else if (val === "LOSS") {
                              onScoreUpdate(
                                match.id,
                                isRowTeam1 ? 0 : 1,
                                isRowTeam1 ? 1 : 0,
                              );
                            } else if (val === "DRAW") {
                              onScoreUpdate(match.id, 1, 1);
                            }
                          }}
                          className="bg-slate-950 border border-slate-700 rounded text-[11px] font-bold
                            text-white focus:outline-none p-0.5 cursor-pointer"
                        >
                          <option value="PENDING">—</option>
                          <option value="WIN">W</option>
                          <option value="LOSS">L</option>
                          <option value="DRAW">D</option>
                        </select>
                      ) : (
                        <span>
                          {outcome === "WIN"
                            ? "W"
                            : outcome === "LOSS"
                              ? "L"
                              : outcome === "DRAW"
                                ? "D"
                                : "—"}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CrossTableGrid;
