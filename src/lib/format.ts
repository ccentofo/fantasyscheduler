// Display helpers: API sometimes returns numeric team names like "01".."10"
// and week keys like "wk01".."wk14". We want friendly labels when the user
// doesn't supply custom names.

const DIGITS_ONLY = /^\d+$/;

export function displayTeam(name: string | number | null | undefined): string {
  if (name == null) return "";
  const s = String(name).trim();
  if (DIGITS_ONLY.test(s)) return `Team ${parseInt(s, 10)}`;
  return s;
}

export function displayWeek(wkKeyOrNum: string | number | null | undefined): string {
  if (typeof wkKeyOrNum === "number") return `Week ${wkKeyOrNum}`;
  const s = String(wkKeyOrNum || "").trim();
  const m = s.match(/^(?:wk)?0*(\d+)$/i);
  if (m?.[1]) return `Week ${parseInt(m[1], 10)}`;
  return s;
}

// Sort team names so user-supplied names come first (alphabetically) and
// default/numeric names (e.g., "01".."10") come last (numerically).
export function sortTeams(names: string[]): string[] {
  return names.slice().sort((a, b) => {
    const aNum = DIGITS_ONLY.test(a);
    const bNum = DIGITS_ONLY.test(b);
    if (aNum !== bNum) return aNum ? 1 : -1;
    if (aNum) return parseInt(a, 10) - parseInt(b, 10);
    return a.localeCompare(b);
  });
}

// Sort rival pairs: pairs where BOTH names are user-supplied go first,
// pairs containing any default/numeric team name go last.
export function sortRivalPairs(entries: [string, string][]): [string, string][] {
  return entries.slice().sort(([a1, a2], [b1, b2]) => {
    const aHasDefault = DIGITS_ONLY.test(a1) || DIGITS_ONLY.test(a2);
    const bHasDefault = DIGITS_ONLY.test(b1) || DIGITS_ONLY.test(b2);
    if (aHasDefault !== bHasDefault) return aHasDefault ? 1 : -1;
    if (aHasDefault && bHasDefault) {
      const aMin = Math.min(parseInt(a1, 10) || 0, parseInt(a2, 10) || 0);
      const bMin = Math.min(parseInt(b1, 10) || 0, parseInt(b2, 10) || 0);
      return aMin - bMin;
    }
    return a1.localeCompare(b1);
  });
}
