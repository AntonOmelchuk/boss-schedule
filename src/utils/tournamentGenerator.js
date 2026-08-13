/**
 * Generates a clean Single Elimination Bracket.
 * Handles non-power-of-2 team counts (e.g. 27 teams -> 32 size bracket with 5 BYEs).
 */
export const generateSingleElimination = (teams = []) => {
  const count = teams.length;
  if (count < 2) return { matches: [], byes: [] };

  const targetSize = Math.pow(2, Math.ceil(Math.log2(count)));
  const numByes = targetSize - count;
  const shuffled = [...teams].sort(() => Math.random() - 0.5);

  // Split into pairs for R1. Max 1 BYE per match.
  const r1Pairs = [];
  let teamIdx = 0;

  for (let i = 0; i < targetSize / 2; i++) {
    const t1 = shuffled[teamIdx++] || null;
    const isByeSlot = i < numByes;
    const t2 = isByeSlot ? null : shuffled[teamIdx++] || null;
    r1Pairs.push([t1, t2]);
  }

  const matches = [];
  const totalRounds = Math.log2(targetSize);
  let idCounter = 1000;
  const matchesByRound = {};

  // Build tree round by round
  for (let r = 1; r <= totalRounds; r++) {
    const matchesInRound = targetSize / Math.pow(2, r);
    matchesByRound[r] = [];

    for (let i = 0; i < matchesInRound; i++) {
      const matchId = idCounter++;
      let team1 = null;
      let team2 = null;

      if (r === 1) {
        team1 = r1Pairs[i][0];
        team2 = r1Pairs[i][1];
      }

      let name = `Round ${r}`;
      if (r === totalRounds) name = "Final";
      else if (r === totalRounds - 1) name = "Semi-Final";
      else if (r === totalRounds - 2) name = "Quarter-Final";

      const match = {
        id: matchId,
        name,
        round: r,
        tournamentRoundText: `Round ${r}`,
        nextMatchId: null,
        startTime: null,
        state: "SCHEDULED",
        team1,
        team2,
        score1: 0,
        score2: 0,
        winner: null,
        status: "PENDING",
      };

      // Auto-advance teams facing BYE in Round 1
      if (r === 1 && team1 && !team2) {
        match.winner = team1;
        match.status = "FINISHED";
        match.state = "DONE";
      }

      matchesByRound[r].push(match);
      matches.push(match);
    }
  }

  // Link winners to next round (nextMatchId)
  for (let r = 1; r < totalRounds; r++) {
    matchesByRound[r].forEach((m, idx) => {
      const targetMatch = matchesByRound[r + 1][Math.floor(idx / 2)];
      m.nextMatchId = targetMatch.id;

      // Pass automatic winners from R1 directly into R2
      if (r === 1 && m.winner) {
        if (idx % 2 === 0) targetMatch.team1 = m.winner;
        else targetMatch.team2 = m.winner;
      }
    });
  }

  return { matches, byes: [] };
};

/**
 * Generates Round Robin (Football League table) schedule where every team plays each other.
 */
export const generateRoundRobin = (teams) => {
  const shuffled = [...teams].sort(() => Math.random() - 0.5);
  const matches = [];
  const n = shuffled.length;

  let matchCounter = 1;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      matches.push({
        id: `rr_match_${matchCounter}`,
        round: i + 1,
        team1: shuffled[i],
        team2: shuffled[j],
        score1: 0,
        score2: 0,
        winner: null,
        status: "PENDING",
      });
      matchCounter++;
    }
  }

  return { matches, byes: [] };
};

/**
 * Transforms Firebase match models into @g-loot/react-tournament-brackets compatible format.
 */
// src/utils/tournamentGenerator.js

export const formatMatchesForGLoot = (matches) => {
  if (!matches || !Array.isArray(matches)) return [];

  return matches.map((m, index) => {
    const isFinished = m.status === "FINISHED";

    return {
      id: m.id || index + 1,
      name: m.name || `Match ${index + 1}`,
      nextMatchId: m.nextMatchId || null,
      tournamentRoundText: `${m.round || 1}`,
      startTime: "",
      state: isFinished ? "DONE" : "SCHEDULED",

      participants: [
        {
          id: m.team1 ? `t1_${m.team1}` : `p1_${index}`,
          resultText: m.winner === m.team1 ? "WON" : isFinished ? "LOST" : "",
          isWinner: m.winner === m.team1,
          status: isFinished ? "PLAYED" : null,
          name: m.team1 || "TBD",
        },
        {
          id: m.team2 ? `t2_${m.team2}` : `p2_${index}`,
          resultText: m.winner === m.team2 ? "WON" : isFinished ? "LOST" : "",
          isWinner: m.winner === m.team2,
          status: isFinished ? "PLAYED" : null,
          name: m.team2 || "TBD",
        },
      ],
    };
  });
};

export const formatSingleMatchesForGLoot = (matchesList = []) => {
  if (!Array.isArray(matchesList)) return [];

  const totalRounds = Math.max(...matchesList.map((m) => m.round || 1));

  return matchesList.map((m) => {
    const isFinished = m.status === "FINISHED" || m.state === "DONE";
    const participants = [];

    // Team 1
    if (m.team1) {
      const isWinner = m.winner === m.team1;
      participants.push({
        id: `t1_${m.id}_${m.team1}`,
        resultText: isWinner ? "WON" : isFinished ? "LOST" : "",
        isWinner: isWinner,
        status: isFinished ? "PLAYED" : null,
        name: m.team1,
      });
    } else {
      participants.push({
        id: `empty_1_${m.id}`,
        resultText: m.round === 1 ? "WO" : null,
        isWinner: false,
        status: m.round === 1 ? "WALK_OVER" : "NO_PARTY",
        name: m.round === 1 ? "BYE" : "TBD",
      });
    }

    // Team 2
    if (m.team2) {
      const isWinner = m.winner === m.team2;
      participants.push({
        id: `t2_${m.id}_${m.team2}`,
        resultText: isWinner ? "WON" : isFinished ? "LOST" : "",
        isWinner: isWinner,
        status: isFinished ? "PLAYED" : null,
        name: m.team2,
      });
    } else {
      participants.push({
        id: `empty_2_${m.id}`,
        resultText: m.round === 1 ? "WO" : null,
        isWinner: false,
        status: m.round === 1 ? "WALK_OVER" : "NO_PARTY",
        name: m.round === 1 ? "BYE" : "TBD",
      });
    }

    return {
      id: m.id,
      name: m.name || `Match ${m.id}`,
      nextMatchId: m.nextMatchId || null,
      tournamentRoundText: m.round === totalRounds ? "Final" : `${m.round}`,
      startTime: m.startTime || null,
      state: isFinished ? "DONE" : "SCHEDULED",
      participants,
    };
  });
};
