/**
 * Generates match brackets or round-robin schedules for tournaments.
 */

/**
 * Generates Single Elimination rounds logic with BYEs for odd participants.
 */
export const generateSingleElimination = (teams) => {
  const shuffled = [...teams].sort(() => Math.random() - 0.5);
  const matches = [];
  const byes = [];

  // Handle odd number of teams: 1 random team automatically moves to round 2
  if (shuffled.length % 2 !== 0) {
    const luckyTeam = shuffled.pop();
    byes.push(luckyTeam);
  }

  let matchIndex = 1;
  for (let i = 0; i < shuffled.length; i += 2) {
    matches.push({
      id: `match_1_${matchIndex}`,
      round: 1,
      team1: shuffled[i],
      team2: shuffled[i + 1],
      score1: 0,
      score2: 0,
      winner: null,
      status: "PENDING", // PENDING, IN_PROGRESS, FINISHED
    });
    matchIndex++;
  }

  return { matches, byes };
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
