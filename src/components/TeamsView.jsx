import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { displayTeam, displayWeek, sortTeams } from "@/lib/format";

export default function TeamsView({ data }) {
  const teams = data?.schedule?.teams || {};
  const rivals = useMemo(() => data?.rivals || {}, [data]);
  const rivalWeekKey = useMemo(() => {
    const rw = data?.rival_week;
    if (!rw || rw === "disabled") return null;
    return `wk${String(rw).padStart(2, "0")}`;
  }, [data]);

  const teamNames = sortTeams(Object.keys(teams));
  const [selected, setSelected] = useState(null);

  // Build bidirectional rival lookup
  const rivalMap = useMemo(() => {
    const m = {};
    Object.entries(rivals).forEach(([a, b]) => {
      m[a] = b;
      m[b] = a;
    });
    return m;
  }, [rivals]);

  if (!teamNames.length) {
    return (
      <p className="text-muted-foreground mono text-sm">No teams to display.</p>
    );
  }

  return (
    <div data-testid="per-team-schedule">
      {/* Team selector bar */}
      <div className="flex flex-wrap gap-1.5 mb-5 pb-4 border-b border-[#222]">
        <button
          onClick={() => setSelected(null)}
          className={`px-3 py-1.5 text-[11px] mono uppercase tracking-wider ${
            selected === null
              ? "bg-giants text-white"
              : "bg-obsidian border border-[#333] hover:border-giants"
          }`}
          data-testid="team-filter-all"
        >
          All
        </button>
        {teamNames.map((t) => (
          <button
            key={t}
            onClick={() => setSelected(t)}
            className={`px-3 py-1.5 text-[11px] mono uppercase tracking-wider ${
              selected === t
                ? "bg-giants text-white"
                : "bg-obsidian border border-[#333] hover:border-giants"
            }`}
            data-testid={`team-filter-${t}`}
          >
            {displayTeam(t)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {(selected ? [selected] : teamNames).map((t) => {
          const weeks = teams[t] || {};
          const rival = rivalMap[t];
          const sortedWeeks = Object.keys(weeks).sort();
          return (
            <div
              key={t}
              className="brutal-border bg-carbon p-4 fade-up"
              data-testid={`team-card-${t}`}
            >
              <div className="flex items-start justify-between mb-3 pb-2 border-b border-[#222]">
                <div>
                  <h3 className="font-display text-2xl uppercase tracking-wide leading-none">
                    {displayTeam(t)}
                  </h3>
                  {rival && (
                    <p className="text-[10px] mono uppercase tracking-[0.2em] text-eagles mt-1">
                      ★ Rival: {displayTeam(rival)}
                    </p>
                  )}
                </div>
                <span className="text-[10px] mono text-muted-foreground">
                  {sortedWeeks.length} GP
                </span>
              </div>
              <div className="space-y-0.5">
                {sortedWeeks.map((wk) => {
                  const opp = weeks[wk];
                  const isRivalWk = wk === rivalWeekKey;
                  const isRivalGame = rival && opp === rival;
                  const weekNum = parseInt(wk.replace("wk", ""), 10);
                  return (
                    <div
                      key={wk}
                      className={`flex items-center justify-between text-xs mono px-2 py-1 ${
                        isRivalGame
                          ? "bg-eagles/15 text-eagles"
                          : "hover:bg-obsidian"
                      }`}
                      data-testid={`team-${t}-${wk}`}
                    >
                      <span className="text-muted-foreground tabular-nums flex items-center gap-1 min-w-[72px]">
                        {displayWeek(weekNum)}
                        {isRivalWk && (
                          <Star className="w-2.5 h-2.5 text-eagles fill-eagles" />
                        )}
                      </span>
                      <span className="uppercase tracking-wide truncate text-right">
                        {displayTeam(opp)}
                      </span>
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
}
