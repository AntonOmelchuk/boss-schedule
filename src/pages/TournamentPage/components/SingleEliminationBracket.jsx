import {
  createTheme,
  SingleEliminationBracket as GLootSingleBracket,
  SVGViewer,
} from "@g-loot/react-tournament-brackets";
import { useMemo } from "react";

import useTranslation from "../../../hooks/useTranslation";
import useWindowSize from "../../../hooks/useWindowSize";
import { cn } from "../../../utils/general";
import { formatSingleMatchesForGLoot } from "../../../utils/tournamentGenerator";

const customTheme = createTheme({
  textColor: { main: "#f8fafc", highlighted: "#10b981", dark: "#94a3b8" },
  matchBackground: { wonColor: "#064e3b", lostColor: "#0f172a" },
  score: {
    background: { wonColor: "#059669", lostColor: "#1e293b" },
    text: { highlightedWonColor: "#7BF59D", highlightedLostColor: "#FB7E94" },
  },
  border: {
    color: "#334155",
    highlightedColor: "#10b981",
  },
  connectorColor: "rgba(51, 65, 85, 0.4)",
  connectorColorHighlight: "#10b981",
  svgBackground: "#020617",
});

const SingleEliminationBracket = ({
  matches = [],
  onScoreUpdate,
  canManage,
}) => {
  const { t } = useTranslation();
  const [width, height] = useWindowSize();

  const finalWidth = Math.max(width - 80, 900);
  const finalHeight = Math.max(height - 250, 650);

  const formattedMatches = useMemo(() => {
    return formatSingleMatchesForGLoot(matches);
  }, [matches]);

  if (!formattedMatches || formattedMatches.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 relative">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="text-xl">🏆</span>{" "}
          {t.tournament.singleBracketTitle || "Сітка (Single Elimination)"}
        </h3>
      </div>

      <div className="w-full bg-slate-950/90 rounded-xl p-4 relative">
        <GLootSingleBracket
          matches={formattedMatches}
          options={{
            style: {
              roundHeader: {
                backgroundColor: "transparent",
                fontColor: "#94a3b8",
              },
              connectorColor: "#fff",
              connectorColorHighlight: "#10b981",
            },
          }}
          matchComponent={({ match }) => {
            const isDone = match.state === "DONE";

            return (
              <div className="relative group my-1">
                <div
                  className="bg-slate-900/90 border border-slate-700/80 rounded-xl shadow-xl transition-all
                  duration-300 hover:border-emerald-500/60"
                >
                  <div
                    className="bg-slate-950/80 px-3 py-1 border-b border-slate-800 text-[10px] font-bold
                    text-slate-400 flex justify-between items-center"
                  >
                    <span>{match.name}</span>
                    {isDone && (
                      <span className="text-emerald-400 text-[9px]">
                        ● FINISHED
                      </span>
                    )}
                  </div>

                  <div className="divide-y divide-slate-800/60">
                    {match.participants.map((p, idx) => {
                      const isWinner = p.isWinner;
                      const isBye = p.name === "BYE";
                      const isTbd = p.name === "TBD";

                      const isClickable =
                        canManage && !isDone && !isBye && !isTbd;

                      const handleParticipantClick = () => {
                        if (!isClickable) return;

                        const score1 = idx === 0 ? 1 : 0;
                        const score2 = idx === 0 ? 0 : 1;
                        onScoreUpdate(match.id, score1, score2);
                      };

                      return (
                        <div
                          key={p.id || idx}
                          onClick={handleParticipantClick}
                          className={cn(
                            "flex items-center justify-between px-3 p-1.5 text-xs transition-all duration-300",
                            isWinner &&
                              "bg-gradient-to-r from-emerald-950/80 to-slate-900 text-emerald-300 " +
                                "font-extrabold border-l-4 border-emerald-500 " +
                                "shadow-[inset_0_0_12px_rgba(16,185,129,0.15)]",
                            (isBye || isTbd) && "text-slate-600 italic",
                            !isWinner &&
                              !isBye &&
                              !isTbd &&
                              "text-slate-300 font-medium",
                            isClickable &&
                              "cursor-pointer hover:bg-emerald-500/10 hover:text-emerald-400",
                          )}
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            {isWinner && (
                              <span className="text-emerald-400 text-xs">
                                🏆
                              </span>
                            )}
                            <span className="truncate">
                              {isBye ? t.tournament.byeNotice : p.name}
                            </span>
                          </div>

                          {p.resultText && (
                            <span
                              className={cn(
                                "text-[10px] font-black px-1.5 py-0.5 rounded",
                                isWinner
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                  : "bg-slate-800 text-slate-500",
                              )}
                            >
                              {p.resultText}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          }}
          svgWrapper={({ children, ...props }) => (
            <SVGViewer
              width={finalWidth}
              height={finalHeight}
              background={customTheme.svgBackground}
              SVGBackground={customTheme.svgBackground}
              {...props}
            >
              {children}
            </SVGViewer>
          )}
        />
      </div>
    </div>
  );
};

export default SingleEliminationBracket;
