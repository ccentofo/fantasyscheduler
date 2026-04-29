import { useMemo } from "react";
import { Star } from "lucide-react";
import { displayTeam, displayWeek } from "@/lib/format";

interface Matchup {
  t1: string;
  t2: string;
}

interface ScheduleData {
  schedule?: {
    weeks?: Record<string, Matchup[]>;
  };
  rival_week?: number | "disabled";
}

interface WeeklyGridProps {
  data: ScheduleData | null;
}

export default function WeeklyGrid({ data }: WeeklyGridProps) {
  const weeks = data?.schedule?.weeks || {};
  const rivalWeekKey = useMemo(() => {
    const rw = data?.rival_week;
    if (!rw || rw === "disabled") return null;
    return `wk${String(rw).padStart(2, "0")}`;
  }, [data]);

  const sorted = Object.keys(weeks).sort();

  if (!sorted.length) {
    return (
      <p className="text-muted-foreground mono text-sm">No weeks to display.</p>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      data-testid="weekly-matchup-grid"
    >
      {sorted.map((wk: string) => {
        const isRival = wk === rivalWeekKey;
        const games = weeks[wk] || [];
        const weekNum = parseInt(wk.replace("wk", ""), 10);
        return (
          <div
            key={wk}
            className={`relative p-4 fade-up ${
              isRival
                ? "border-2 border-eagles bg-eagles/5"
                : "brutal-border bg-carbon"
            }`}
            data-testid={isRival ? "rival-week-highlight" : `week-${weekNum}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] mono uppercase tracking-[0.2em] text-muted-foreground">
                  {displayWeek(weekNum).split(" ")[0]}
                </span>
                <span className="font-display text-3xl leading-none">
                  {weekNum}
                </span>
              </div>
              {isRival && (
                <span className="flex items-center gap-1 text-eagles text-[10px] mono uppercase tracking-[0.2em] font-bold">
                  <Star className="w-3.5 h-3.5 fill-eagles" />
                  Rivalry Week
                </span>
              )}
            </div>
            <div className="space-y-1.5">
              {games.map((g: Matchup, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-3 py-2 bg-obsidian border border-[#222] hover:border-giants/40 transition-none"
                  data-testid={`week-${weekNum}-matchup-${idx}`}
                >
                  <span className="mono text-sm uppercase tracking-wide truncate">
                    {displayTeam(g.t1)}
                  </span>
                  <span className="text-[10px] mono text-muted-foreground px-2">
                    VS
                  </span>
                  <span className="mono text-sm uppercase tracking-wide truncate text-right">
                    {displayTeam(g.t2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
