import { useMemo, useRef, useState } from "react";

import useTranslation from "../../../hooks/useTranslation";
import takeTournamentScreenshot from "../../../utils/tournamentScreenshot";

/**
 * Round Robin Match list split by Tour / Round pagination tabs with W / D / W2 status selectors.
 */
const MatchListWithPagination = ({
  matches = [],
  participants = [],
  onScoreUpdate,
  canManage,
}) => {
  const { t } = useTranslation();
  const captureRef = useRef(null);

  const [selectedRound, setSelectedRound] = useState(1);
  const [filterCp, setFilterCp] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);

  // Extract total available rounds
  const totalRounds = useMemo(() => {
    const rounds = new Set(matches.map((m) => m.round || 1));
    return Array.from(rounds).sort((a, b) => a - b);
  }, [matches]);

  // Filter matches by current round + chosen CP filter
  const roundMatches = useMemo(() => {
    return matches.filter((m) => {
      const isCorrectRound = filterCp ? true : m.round === selectedRound;
      const cpFilter =
        !filterCp || m.team1 === filterCp || m.team2 === filterCp;
      return isCorrectRound && cpFilter;
    });
  }, [matches, selectedRound, filterCp]);

  const handleTakeScreenshot = async () => {
    if (!captureRef.current) return;
    setIsCapturing(true);

    try {
      await takeTournamentScreenshot(
        captureRef.current,
        `Matches_Round_${selectedRound}`,
      );
    } catch {
      alert(t.tournament?.screenshotError || "Failed to generate screenshot.");
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Round Switcher Tabs Bar */}
      <div
        className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col md:flex-row
        md:items-center justify-between gap-3 shadow-xl"
      >
        {/* Round Tabs */}
        {!filterCp && (
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {totalRounds.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRound(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer ${
                  selectedRound === r
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {t.tournament?.roundLabel || "Тур"} {r}
              </button>
            ))}
          </div>
        )}

        {/* CP Filter + Screenshot Export */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <select
            value={filterCp}
            onChange={(e) => setFilterCp(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white
              focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="">
              {t.tournament?.filterAllCps || "Усі КП (За турами)"}
            </option>
            {participants.map((cp) => (
              <option key={cp} value={cp}>
                {cp}
              </option>
            ))}
          </select>

          <button
            onClick={handleTakeScreenshot}
            disabled={isCapturing}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl
              border border-slate-700 transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
          >
            <span>📸</span>
            <span>
              {isCapturing
                ? t.tournament?.savingScreenshot
                : t.tournament?.exportScreenshotBtn}
            </span>
          </button>
        </div>
      </div>

      {/* Match Cards Container */}
      <div
        ref={captureRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-4 bg-slate-950 rounded-2xl
          border border-slate-800/80"
      >
        {roundMatches.map((match) => {
          const isFinished = match.status === "FINISHED";

          return (
            <div
              key={match.id}
              className={`border rounded-xl py-1 px-3 space-y-3 transition shadow-lg ${
                isFinished
                  ? "bg-slate-900/60 border-slate-800/90"
                  : "bg-slate-900 border-amber-500/30"
              }`}
            >
              <div
                className="flex items-center justify-between text-[11px] text-slate-400 border-b
                border-slate-800/80 pb-1.5"
              >
                <span className="font-bold text-amber-400">
                  {t.tournament?.roundLabel || "Тур"} {match.round}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase ${
                    isFinished
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-sky-500/10 text-sky-400"
                  }`}
                >
                  {isFinished
                    ? t.tournament?.statusFinished
                    : t.tournament?.statusPending}
                </span>
              </div>

              {/* Teams and Result Controller */}
              <div className="flex flex-wrap flex-col items-center justify-between gap-2 font-bold text-xs">
                <div className="flex justify-between w-full">
                  <span
                    className={`flex-1 truncate text-left ${
                      match.winner === match.team1
                        ? "text-emerald-400 font-extrabold"
                        : "text-white"
                    }`}
                  >
                    {match.team1}
                  </span>
                  <span className="mx-1 text-amber-300">VS</span>
                  <span
                    className={`flex-1 truncate text-right ${
                      match.winner === match.team2
                        ? "text-emerald-400 font-extrabold"
                        : "text-white"
                    }`}
                  >
                    {match.team2}
                  </span>
                </div>

                {canManage ? (
                  <div className="flex items-center gap-1 shrink-0 bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => onScoreUpdate(match.id, 1, 0)}
                      title="Team 1 Win"
                      className={`px-2 py-0.5 rounded text-[10px] font-black transition cursor-pointer ${
                        match.winner === match.team1
                          ? "bg-emerald-500 text-slate-950 shadow-md"
                          : "bg-slate-900 text-slate-400 hover:text-white"
                      }`}
                    >
                      W1
                    </button>
                    <button
                      onClick={() => onScoreUpdate(match.id, 1, 1)}
                      title="Draw"
                      className={`px-2 py-0.5 rounded text-[10px] font-black transition cursor-pointer ${
                        match.winner === "DRAW" ||
                        (match.score1 === 1 && match.score2 === 1)
                          ? "bg-amber-500 text-slate-950 shadow-md"
                          : "bg-slate-900 text-slate-400 hover:text-white"
                      }`}
                    >
                      D
                    </button>
                    <button
                      onClick={() => onScoreUpdate(match.id, 0, 1)}
                      title="Team 2 Win"
                      className={`px-2 py-0.5 rounded text-[10px] font-black transition cursor-pointer ${
                        match.winner === match.team2
                          ? "bg-emerald-500 text-slate-950 shadow-md"
                          : "bg-slate-900 text-slate-400 hover:text-white"
                      }`}
                    >
                      W2
                    </button>
                  </div>
                ) : (
                  <span
                    className="font-mono text-xs font-black px-2.5 py-1 rounded-lg border border-slate-800
                    bg-slate-950 text-amber-400"
                  >
                    {match.winner === match.team1
                      ? "W1"
                      : match.winner === match.team2
                        ? "W2"
                        : isFinished
                          ? "DRAW"
                          : "VS"}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchListWithPagination;
