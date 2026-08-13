import { useRef, useState } from "react";

import useTranslation from "../../../hooks/useTranslation";
import takeTournamentScreenshot from "../../../utils/tournamentScreenshot";

const TournamentTable = ({ participants = [], matches = [] }) => {
  const { t } = useTranslation();
  const captureRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);

  // Calculate stats for each team
  const stats = participants.map((team) => {
    let played = 0,
      won = 0,
      drawn = 0,
      lost = 0,
      points = 0,
      scoreFor = 0,
      scoreAgainst = 0;

    matches.forEach((m) => {
      if (m.status !== "FINISHED") return;

      if (m.team1 === team || m.team2 === team) {
        played++;
        const isTeam1 = m.team1 === team;
        const myScore = isTeam1 ? m.score1 : m.score2;
        const oppScore = isTeam1 ? m.score2 : m.score1;

        scoreFor += myScore;
        scoreAgainst += oppScore;

        if (myScore > oppScore) {
          won++;
          points += 3;
        } else if (myScore === oppScore) {
          drawn++;
          points += 1;
        } else {
          lost++;
        }
      }
    });

    return {
      team,
      played,
      won,
      drawn,
      lost,
      scoreFor,
      scoreAgainst,
      diff: scoreFor - scoreAgainst,
      points,
    };
  });

  // Sort by Points DESC, then Goal Difference DESC
  stats.sort((a, b) => b.points - a.points || b.diff - a.diff);

  // Export Screenshot Feature using html-to-image
  const handleTakeScreenshot = async () => {
    if (!captureRef.current) return;
    setIsCapturing(true);

    try {
      await takeTournamentScreenshot(
        captureRef.current,
        "Tournament_Standings",
      );
    } catch {
      alert(t.tournament?.screenshotError || "Failed to generate screenshot.");
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div
      ref={captureRef}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl overflow-x-auto space-y-4"
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span>🏆</span> {t.tournament.standingsTitle}
        </h3>

        {/* Screenshot export button (ignored during capture via attribute) */}
        <button
          onClick={handleTakeScreenshot}
          disabled={isCapturing}
          data-html2canvas-ignore="true"
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl
            border border-slate-700 transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
        >
          <span>📸</span>
          <span>
            {isCapturing
              ? t.tournament.savingScreenshot
              : t.tournament.exportScreenshotBtn}
          </span>
        </button>
      </div>

      <table className="w-full text-left text-xs">
        <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
          <tr>
            <th className="py-2.5 px-3">#</th>
            <th className="py-2.5 px-3">{t.tournament.teamHeader}</th>
            <th className="py-2.5 px-2 text-center">{t.tournament.pHeader}</th>
            <th className="py-2.5 px-2 text-center">{t.tournament.wHeader}</th>
            <th className="py-2.5 px-2 text-center">{t.tournament.dHeader}</th>
            <th className="py-2.5 px-2 text-center">{t.tournament.lHeader}</th>
            <th className="py-2.5 px-2 text-center">
              {t.tournament.diffHeader}
            </th>
            <th className="py-2.5 px-3 text-center text-amber-400">
              {t.tournament.ptsHeader}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 font-medium">
          {stats.map((row, idx) => (
            <tr key={row.team} className="hover:bg-slate-800/40 transition">
              <td className="py-2.5 px-3 font-bold text-slate-500">
                {idx + 1}
              </td>
              <td className="py-2.5 px-3 font-bold text-white">{row.team}</td>
              <td className="py-2.5 px-2 text-center text-slate-300">
                {row.played}
              </td>
              <td className="py-2.5 px-2 text-center text-emerald-400 font-bold">
                {row.won}
              </td>
              <td className="py-2.5 px-2 text-center text-slate-400">
                {row.drawn}
              </td>
              <td className="py-2.5 px-2 text-center text-rose-400">
                {row.lost}
              </td>
              <td className="py-2.5 px-2 text-center text-slate-400 font-mono">
                {row.diff > 0 ? `+${row.diff}` : row.diff}
              </td>
              <td className="py-2.5 px-3 text-center font-black text-amber-400 text-sm">
                {row.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TournamentTable;
