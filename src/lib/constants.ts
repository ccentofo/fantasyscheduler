// NFL-inspired team name pool used as the default auto-fill choices in the
// rivals configurator. The API accepts ANY strings the user types; these are
// just friendly suggestions.
export const NFL_TEAMS: readonly string[] = [
  "eagles", "commanders", "giants", "cowboys",
  "ravens", "chiefs", "bears", "packers",
  "lions", "falcons", "bills", "dolphins",
  "patriots", "jets", "steelers", "browns",
  "bengals", "texans", "colts", "jaguars",
  "titans", "broncos", "chargers", "raiders",
  "vikings", "saints", "panthers", "buccaneers",
  "rams", "49ers", "seahawks", "cardinals",
] as const;

export const TEAM_SIZES: readonly number[] = [8, 10, 12, 14, 16] as const;
