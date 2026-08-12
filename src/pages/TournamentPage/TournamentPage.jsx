import { off, onValue, ref, remove, set, update } from "firebase/database";
import { useEffect, useState } from "react";

import PageBadgeTitle from "../../components/UI/PageBadgeTitle";
import { ROLES } from "../../constants/roles";
import useTranslation from "../../hooks/useTranslation";
import { db } from "../../services/firebase";
import useAuthStore from "../../store/useAuthStore";
import useCPStore from "../../store/useCPStore";
import { isDevelopment } from "../../utils/general";
import {
  generateRoundRobin,
  generateSingleElimination,
} from "../../utils/tournamentGenerator";
import CrossTableGrid from "./components/CrossTableGrid";
import MatchListWithPagination from "./components/MatchListWithPagination";
import SingleEliminationBracket from "./components/SingleEliminationBracket";
import TournamentTable from "./components/TournamentTable";

const ALLOWED_ROLES = [
  ROLES.ADMIN,
  ROLES.CO_ADMIN,
  ROLES.ALLY_HEAD,
  ROLES.ALLY_GENERAL,
];

const TournamentPage = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { cpList, initCpData } = useCPStore();

  const [tournament, setTournament] = useState(null);
  const [selectedCps, setSelectedCps] = useState([]);
  const [tournamentType, setTournamentType] = useState("ROUND_ROBIN");
  const [tournamentTitle, setTournamentTitle] = useState("");

  const canManage = ALLOWED_ROLES.includes(user?.role) || isDevelopment;

  useEffect(() => {
    const cleanup = initCpData();
    const tournRef = ref(db, "active_tournament");

    const unsubscribe = onValue(tournRef, (snapshot) => {
      setTournament(snapshot.val());
    });

    return () => {
      cleanup && cleanup();
      off(tournRef, "value", unsubscribe);
    };
  }, [initCpData]);

  const handleToggleCp = (cpName) => {
    setSelectedCps((prev) =>
      prev.includes(cpName)
        ? prev.filter((item) => item !== cpName)
        : [...prev, cpName],
    );
  };

  const handleSelectAllCps = () => setSelectedCps([...cpList]);
  const handleDeselectAllCps = () => setSelectedCps([]);

  // Start new tournament
  const handleStartTournament = async () => {
    if (selectedCps.length < 2) return alert(t.tournament?.minCpAlert);

    const { matches, byes } =
      tournamentType === "SINGLE_ELIMINATION"
        ? generateSingleElimination(selectedCps)
        : generateRoundRobin(selectedCps);

    const payload = {
      id: `tourn_${Date.now()}`,
      title: tournamentTitle.trim() || t.tournament?.defaultTitle,
      type: tournamentType,
      status: "IN_PROGRESS",
      created_at: Date.now(),
      created_by: user?.discord_id || "admin",
      participants: selectedCps,
      byes,
      matches,
    };

    await set(ref(db, "active_tournament"), payload);
  };

  // Score updates
  const handleScoreUpdate = async (matchId, score1, score2) => {
    if (!tournament || !canManage) return;

    let updatedMatches = tournament.matches.map((m) => {
      if (m.id === matchId) {
        let winner = null;
        if (score1 > score2) winner = m.team1;
        if (score2 > score1) winner = m.team2;

        return { ...m, score1, score2, winner, status: "FINISHED" };
      }
      return m;
    });

    await update(ref(db, "active_tournament"), { matches: updatedMatches });
  };

  // Reset
  const handleResetTournament = async () => {
    if (confirm(t.tournament?.resetConfirm)) {
      await remove(ref(db, "active_tournament"));
    }
  };

  const isAllSelected =
    cpList.length > 0 && selectedCps.length === cpList.length;

  return (
    <div className="py-4 space-y-6">
      <PageBadgeTitle
        badgeText={t.tournament?.badge}
        title={t.tournament?.pageTitle}
        subTitle={t.tournament?.pageDescription}
        bgColor="bg-purple-600"
      />

      <div className="mx-auto px-4 space-y-6">
        {!tournament ? (
          /* SETUP FORM */
          canManage ? (
            <div
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl max-w-7xl
              mx-auto"
            >
              <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <span>🚀</span> {t.tournament?.setupTitle}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {t.tournament?.tournamentTitleLabel}
                  </label>
                  <input
                    type="text"
                    value={tournamentTitle}
                    onChange={(e) => setTournamentTitle(e.target.value)}
                    placeholder={t.tournament?.tournamentTitlePlaceholder}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs
                      text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {t.tournament?.typeLabel}
                  </label>
                  <select
                    value={tournamentType}
                    onChange={(e) => setTournamentType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs
                      text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="ROUND_ROBIN">
                      {t.tournament?.typeRoundRobin}
                    </option>
                    <option value="SINGLE_ELIMINATION">
                      {t.tournament?.typeSingleElimination}
                    </option>
                  </select>
                </div>
              </div>

              {/* Bulk Select CPs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <label className="block text-xs font-bold text-slate-300">
                    {t.tournament?.selectCpsLabel} ({selectedCps.length} /{" "}
                    {cpList.length})
                  </label>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSelectAllCps}
                      disabled={isAllSelected}
                      className="text-[11px] font-bold text-amber-400 hover:text-amber-300 disabled:text-slate-600
                        transition cursor-pointer"
                    >
                      ✓ {t.tournament?.selectAllBtn || "Обрати всі"}
                    </button>
                    <span className="text-slate-700 text-xs">•</span>
                    <button
                      type="button"
                      onClick={handleDeselectAllCps}
                      disabled={selectedCps.length === 0}
                      className="text-[11px] font-bold text-rose-400 hover:text-rose-300 disabled:text-slate-600
                        transition cursor-pointer"
                    >
                      ✕ {t.tournament?.deselectAllBtn || "Скинути всі"}
                    </button>
                  </div>
                </div>

                <div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-60 overflow-y-auto p-2
                  bg-slate-950 border border-slate-800 rounded-xl"
                >
                  {cpList.map((cp) => (
                    <label
                      key={cp}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800/80
                        cursor-pointer hover:border-amber-500/50 transition"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCps.includes(cp)}
                        onChange={() => handleToggleCp(cp)}
                        className="accent-amber-500 cursor-pointer"
                      />
                      <span className="text-xs font-bold text-slate-200 truncate">
                        {cp}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleStartTournament}
                disabled={selectedCps.length < 2}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 text-slate-950
                  font-bold text-xs rounded-xl shadow-lg transition cursor-pointer uppercase tracking-wider"
              >
                {t.tournament?.startBtn}
              </button>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-2">
              <span className="text-3xl">⚔️</span>
              <h3 className="text-sm font-bold text-white">
                {t.tournament?.noActiveTournamentTitle}
              </h3>
              <p className="text-xs text-slate-400">
                {t.tournament?.noActiveTournamentSubtitle}
              </p>
            </div>
          )
        ) : (
          /* LIVE TOURNAMENT DASHBOARD */
          <div className="space-y-6">
            {/* Header Status Bar */}
            <div
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center
              justify-between gap-3 shadow-xl"
            >
              <div>
                <span
                  className="text-[10px] font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 border
                border-amber-500/20 px-2.5 py-0.5 rounded-full"
                >
                  {tournament.type === "ROUND_ROBIN"
                    ? t.tournament?.typeRoundRobin
                    : t.tournament?.typeSingleElimination}
                </span>
                <h2 className="text-xl font-black text-white mt-1">
                  {tournament.title}
                </h2>
              </div>

              {canManage && (
                <button
                  onClick={handleResetTournament}
                  className="px-3.5 py-2 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-400
                    font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  {t.tournament?.resetBtn}
                </button>
              )}
            </div>

            {/* ROUND ROBIN DASHBOARD */}
            {tournament.type === "ROUND_ROBIN" && (
              <>
                {/* 1. Cross-Table Grid: hidden on screen < 1280px */}
                <div className="hidden xl:block">
                  <CrossTableGrid
                    participants={tournament.participants}
                    matches={tournament.matches}
                    onScoreUpdate={handleScoreUpdate}
                    canManage={canManage}
                  />
                </div>

                {/* 2. Adaptive grid: Left block - 4/12 (~33%), Right block - 8/12 (~67%) */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                  <div className="xl:col-span-4">
                    <TournamentTable
                      participants={tournament.participants}
                      matches={tournament.matches}
                    />
                  </div>

                  <div className="xl:col-span-8">
                    <MatchListWithPagination
                      matches={tournament.matches}
                      participants={tournament.participants}
                      onScoreUpdate={handleScoreUpdate}
                      canManage={canManage}
                    />
                  </div>
                </div>
              </>
            )}

            {/* SINGLE ELIMINATION PLAYOFFS DASHBOARD */}
            {tournament.type === "SINGLE_ELIMINATION" && (
              <>
                <SingleEliminationBracket
                  matches={tournament.matches}
                  byes={tournament.byes}
                  onScoreUpdate={handleScoreUpdate}
                  canManage={canManage}
                />
                <MatchListWithPagination
                  matches={tournament.matches}
                  participants={tournament.participants}
                  onScoreUpdate={handleScoreUpdate}
                  canManage={canManage}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentPage;
