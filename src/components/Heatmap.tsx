import { useMemo } from "react";
import { displayTeam, sortTeams } from "@/lib/format";

interface MatchupCount {
  t1: string;
  t2: string;
  count: number;
}

interface ScheduleData {
  matchup_counts?: MatchupCount[];
  rivals?: Record<string, string> | null;
  schedule?: {
    teams?: Record<string, unknown>;
  };
}

interface HeatmapProps {
  data: ScheduleData | null;
}

interface CellStyle {
  bg: string;
  text: string;
  label: string | number;
}

export default function Heatmap({ data }: HeatmapProps) {
  const counts = useMemo(() => data?.matchup_counts || [], [data]);
  const rivals = useMemo(() => data?.rivals || {}, [data]);
  const teamNames = useMemo(
    () => sortTeams(Object.keys(data?.schedule?.teams || {})),
    [data]
  );

  const rivalPairs = useMemo(() => {
    const s = new Set<string>();
    Object.entries(rivals || {}).forEach(([a, b]) => {
      s.add([a, b].sort().join("|"));
    });
    return s;
  }, [rivals]);

  const lookup = useMemo(() => {
    const m: Record<string, number> = {};
    counts.forEach(({ t1, t2, count }) => {
      m[[t1, t2].sort().join("|")] = count;
    });
    return m;
  }, [counts]);

  // Discrete color buckets — avoids the "sphere" gradient optical illusion
  function cellStyle(count: number, isRival: boolean): CellStyle {
    if (isRival) {
      return { bg: "#4ADE80", text: "#0a0a0a", label: count || "" };
    }
    if (!count) return { bg: "#0a0a0a", text: "#333", label: "·" };
    if (count === 1) return { bg: "rgba(96, 165, 250, 0.35)", text: "#ffffff", label: 1 };
    if (count === 2) return { bg: "rgba(96, 165, 250, 0.70)", text: "#ffffff", label: 2 };
    return { bg: "rgba(96, 165, 250, 0.98)", text: "#0a0a0a", label: count };
  }

  if (!teamNames.length) {
    return (
      <p className="text-muted-foreground mono text-sm">
        No matchup data to display.
      </p>
    );
  }

  const CELL = 52;
  const GAP = 8; // visual gap between cells so they don't bleed together

  return (
    <div
      className="overflow-auto brutal-border bg-obsidian p-5"
      data-testid="matchup-heatmap"
    >
      <table
        className="border-separate mono text-[11px]"
        style={{ borderSpacing: `${GAP}px`, background: "#0a0a0a" }}
      >
        <thead>
          <tr>
            <th
              className="text-muted-foreground uppercase tracking-wider text-left sticky left-0 bg-obsidian z-10"
              style={{ minWidth: 88, padding: "0 8px" }}
            />
            {teamNames.map((t: string) => (
              <th
                key={t}
                className="text-muted-foreground uppercase tracking-wider align-bottom"
                style={{ minWidth: CELL, height: 72, padding: 0 }}
              >
                <div
                  className="origin-bottom-left whitespace-nowrap mono text-[10px]"
                  style={{
                    transform: "rotate(-45deg) translate(4px, -6px)",
                    width: CELL,
                  }}
                >
                  {displayTeam(t)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {teamNames.map((rowTeam: string) => (
            <tr key={rowTeam}>
              <th
                className="text-left text-muted-foreground uppercase tracking-wider sticky left-0 bg-obsidian z-10 font-normal"
                style={{ padding: "0 8px", whiteSpace: "nowrap" }}
              >
                {displayTeam(rowTeam)}
              </th>
              {teamNames.map((colTeam: string) => {
                if (rowTeam === colTeam) {
                  return (
                    <td
                      key={colTeam}
                      className="text-center"
                      style={{
                        background: "#0a0a0a",
                        width: CELL,
                        height: CELL,
                      }}
                    >
                      <span className="text-[#222]">—</span>
                    </td>
                  );
                }
                const key = [rowTeam, colTeam].sort().join("|");
                const count = lookup[key] || 0;
                const isRival = rivalPairs.has(key);
                const { bg, text, label } = cellStyle(count, isRival);
                const title = `${displayTeam(rowTeam)} vs ${displayTeam(
                  colTeam
                )}: ${count} game${count === 1 ? "" : "s"}${
                  isRival ? " (Rival)" : ""
                }`;
                return (
                  <td
                    key={colTeam}
                    title={title}
                    className="text-center font-bold tabular-nums"
                    style={{
                      background: bg,
                      color: text,
                      width: CELL,
                      height: CELL,
                    }}
                    data-testid={`heatmap-cell-${rowTeam}-${colTeam}`}
                  >
                    {label}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-wrap items-center gap-5 pt-5 mt-4 border-t border-[#222] text-[10px] mono uppercase tracking-wider text-muted-foreground">
        <Legend color="#101010" label="0 games" />
        <Legend color="rgba(59, 130, 246, 0.28)" label="1 game" />
        <Legend color="rgba(59, 130, 246, 0.62)" label="2 games" />
        <Legend color="rgba(59, 130, 246, 0.92)" label="3+ games" />
        <Legend color="#4ADE80" label="Rivals" />
      </div>
    </div>
  );
}

interface LegendProps {
  color: string;
  label: string;
  bordered?: boolean;
}

function Legend({ color, label, bordered }: LegendProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-block w-4 h-4"
        style={{
          background: color,
          border: bordered ? "1px solid #2a2a2a" : "1px solid #0a0a0a",
        }}
      />
      {label}
    </div>
  );
}
