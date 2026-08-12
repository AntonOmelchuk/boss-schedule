import { useMemo } from "react";

import useTranslation from "../../../hooks/useTranslation";

/**
 * Tournament Bracket tree view inspired by @g-loot/react-tournament-brackets.
 */
const SingleEliminationBracket = ({
  matches = [],
  byes = [],
  onScoreUpdate,
  canManage,
}) => {
  const { t } = useTranslation();

  const rounds = useMemo(() => {
    const grouped = {};
    matches.forEach((match) => {
      const r = match.round || 1;
      if (!grouped[r]) grouped[r] = [];
      grouped[r].push(match);
    });
    return Object.entries(grouped).sort(([a], [b]) => Number(a) - Number(b));
  }, [matches]);

  const totalRoundsCount = rounds.length;

  const getRoundTitle = (roundNum) => {
    if (roundNum === totalRoundsCount)
      return t.tournament?.finalRound || "Фінал 🏆";
    if (roundNum === totalRoundsCount - 1)
      return t.tournament?.semiFinalRound || "Півфінал";
    if (roundNum === totalRoundsCount - 2)
      return t.tournament?.quarterFinalRound || "Чвертьфінал";
    return `${t.tournament?.roundLabel || "Раунд"} ${roundNum}`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 overflow-x-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span>🌳</span>{" "}
          {t.tournament?.bracketTitle || "Турнірна Сітка (Playoffs)"}
        </h3>

        {byes.length > 0 && (
          <div className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-xl">
            <span>✨ {t.tournament?.byeNotice || "Авто-прохід"}: </span>
            <strong className="font-extrabold">{byes.join(", ")}</strong>
          </div>
        )}
      </div>

      {/* Bracket Tree Row Container */}
      <div className="flex items-stretch gap-12 min-w-212.5 py-6 overflow-x-auto">
        {rounds.map(([roundNumStr, roundMatches], roundIdx) => {
          const roundNum = Number(roundNumStr);
          const isLastRound = roundIdx === totalRoundsCount - 1;

          return (
            <div
              key={roundNum}
              className="flex-1 flex flex-col justify-between min-w-55"
            >
              {/* Round Header Badge */}
              <div className="text-center mb-6">
                <span
                  className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-950 border
                  border-slate-800 text-amber-400"
                >
                  {getRoundTitle(roundNum)}
                </span>
              </div>

              {/* Match Cards Bracket Tree Stack */}
              <div className="flex-1 flex flex-col justify-around gap-6 relative">
                {roundMatches.map((match) => {
                  const isFinished = match.status === "FINISHED";

                  return (
                    <div
                      key={match.id}
                      className="relative flex items-center my-auto"
                    >
                      {/* Match Node Card */}
                      <div
                        className={`w-full rounded-xl border p-2.5 space-y-1.5 transition shadow-xl relative z-10 ${
                          isFinished
                            ? "bg-slate-950 border-slate-800"
                            : "bg-slate-950 border-amber-500/40 shadow-amber-500/5"
                        }`}
                      >
                        {/* Team 1 */}
                        <div
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition ${
                            match.winner === match.team1
                              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 font-extrabold"
                              : "bg-slate-900/80 border-slate-800 text-slate-200"
                          }`}
                        >
                          <span className="text-xs truncate max-w-32.5">
                            {match.team1 || "—"}
                          </span>
                          {canManage ? (
                            <input
                              type="number"
                              value={match.score1}
                              onChange={(e) =>
                                onScoreUpdate(
                                  match.id,
                                  parseInt(e.target.value) || 0,
                                  match.score2,
                                )
                              }
                              className="w-7 text-center bg-slate-950 border border-slate-700 rounded text-xs font-mono
                                font-bold text-amber-400 focus:outline-none"
                            />
                          ) : (
                            <span className="font-mono text-xs font-bold text-amber-400">
                              {match.score1}
                            </span>
                          )}
                        </div>

                        {/* Team 2 */}
                        <div
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition ${
                            match.winner === match.team2
                              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 font-extrabold"
                              : "bg-slate-900/80 border-slate-800 text-slate-200"
                          }`}
                        >
                          <span className="text-xs truncate max-w-32.5">
                            {match.team2 || "—"}
                          </span>
                          {canManage ? (
                            <input
                              type="number"
                              value={match.score2}
                              onChange={(e) =>
                                onScoreUpdate(
                                  match.id,
                                  match.score1,
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              className="w-7 text-center bg-slate-950 border border-slate-700 rounded text-xs font-mono
                                font-bold text-amber-400 focus:outline-none"
                            />
                          ) : (
                            <span className="font-mono text-xs font-bold text-amber-400">
                              {match.score2}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right Branch Bracket Connector Line */}
                      {!isLastRound && (
                        <div className="absolute left-full top-1/2 w-12 h-px bg-slate-700 z-0 pointer-events-none">
                          <div
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full
                          bg-amber-500"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleEliminationBracket;
