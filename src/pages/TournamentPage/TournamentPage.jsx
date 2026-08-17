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
import TournamentSetupForm from "./components/TournamentSetupForm";
import TournamentTable from "./components/TournamentTable";
import Header from "./components/UI/Header";

const ALLOWED_ROLES = [
  ROLES.ADMIN,
  ROLES.CO_ADMIN,
  ROLES.ALLY_HEAD,
  ROLES.ALLY_GENERAL,
];

const cleanUndefined = (obj) => JSON.parse(JSON.stringify(obj));

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

    const generatedData =
      tournamentType === "SINGLE_ELIMINATION"
        ? generateSingleElimination(selectedCps)
        : generateRoundRobin(selectedCps);

    const payload = {
      id: `tourn_${Date.now()}`,
      title: tournamentTitle.trim() || t.tournament.defaultTitle,
      type: tournamentType,
      status: "IN_PROGRESS",
      created_at: Date.now(),
      created_by: user?.discord_id || "admin",
      participants: selectedCps,
      byes: generatedData.byes || [],
      matches: generatedData.matches || [],
    };

    await set(ref(db, "active_tournament"), cleanUndefined(payload));
  };

  // Score updates handler
  const handleScoreUpdate = async (matchId, score1, score2) => {
    if (!tournament || !canManage) return;

    const updatedMatches = [...tournament.matches];
    const targetMatch = updatedMatches.find((m) => m.id === matchId);

    if (!targetMatch) return;

    let winner = null;
    if (score1 > score2) winner = targetMatch.team1;
    if (score2 > score1) winner = targetMatch.team2;

    targetMatch.score1 = score1;
    targetMatch.score2 = score2;
    targetMatch.winner = winner;
    targetMatch.status = "FINISHED";
    targetMatch.state = "DONE";

    // Auto-advance winner in Single Elimination
    if (
      tournament.type === "SINGLE_ELIMINATION" &&
      targetMatch.nextMatchId &&
      winner
    ) {
      const nextMatch = updatedMatches.find(
        (m) => m.id === targetMatch.nextMatchId,
      );
      if (nextMatch) {
        if (!nextMatch.team1) {
          nextMatch.team1 = winner;
        } else if (!nextMatch.team2 && nextMatch.team1 !== winner) {
          nextMatch.team2 = winner;
        }
      }
    }

    await update(ref(db, "active_tournament"), {
      matches: cleanUndefined(updatedMatches),
    });
  };

  // Reset Tournament
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
          canManage ? (
            <TournamentSetupForm
              tournamentTitle={tournamentTitle}
              setTournamentTitle={setTournamentTitle}
              tournamentType={tournamentType}
              setTournamentType={setTournamentType}
              cpList={cpList}
              selectedCps={selectedCps}
              handleToggleCp={handleToggleCp}
              handleSelectAllCps={handleSelectAllCps}
              handleDeselectAllCps={handleDeselectAllCps}
              handleStartTournament={handleStartTournament}
              isAllSelected={isAllSelected}
            />
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
          <div className="space-y-6">
            <Header
              tournament={tournament}
              canManage={canManage}
              handleResetTournament={handleResetTournament}
            />

            {/* ROUND ROBIN DASHBOARD */}
            {tournament.type === "ROUND_ROBIN" && (
              <>
                <div className="hidden xl:block">
                  <CrossTableGrid
                    participants={tournament.participants}
                    matches={tournament.matches}
                    onScoreUpdate={handleScoreUpdate}
                    canManage={canManage}
                  />
                </div>

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

            {/* SINGLE ELIMINATION DASHBOARD */}
            {tournament.type === "SINGLE_ELIMINATION" && (
              <>
                <SingleEliminationBracket
                  matches={tournament.matches || []}
                  participants={tournament.participants || []}
                  onScoreUpdate={handleScoreUpdate}
                  canManage={canManage}
                />
                <MatchListWithPagination
                  matches={tournament.matches || []}
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
