import { useEffect, useMemo, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { displayTeam, displayWeek, sortTeams } from "@/lib/format";

interface ScheduleData {
  schedule?: {
    teams?: Record<string, Record<string, string>>;
  };
  rivals?: Record<string, string> | null;
  rival_week?: number | "disabled";
}

interface TeamsViewProps {
  data: ScheduleData | null;
}

const FORCE_MOBILE_LS = "ff_force_mobile";

function useIsMobileLayout(): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    const forceMobile = window.localStorage.getItem(FORCE_MOBILE_LS) === "1";
    const narrow = window.matchMedia("(max-width: 1023px)").matches;
    return forceMobile || narrow;
  });

  useEffect(() => {
    const checkMobile = () => {
      const forceMobile = window.localStorage.getItem(FORCE_MOBILE_LS) === "1";
      const narrow = window.matchMedia("(max-width: 1023px)").matches;
      setIsMobile(forceMobile || narrow);
    };

    const mq = window.matchMedia("(max-width: 1023px)");
    const handleChange = () => checkMobile();
    mq.addEventListener("change", handleChange);

    // Also listen for storage changes
    window.addEventListener("storage", checkMobile);

    return () => {
      mq.removeEventListener("change", handleChange);
      window.removeEventListener("storage", checkMobile);
    };
  }, []);

  return isMobile;
}

export default function TeamsView({ data }: TeamsViewProps) {
  const teams = data?.schedule?.teams || {};
  const rivals = useMemo(() => data?.rivals || {}, [data]);
  const rivalWeekKey = useMemo(() => {
    const rw = data?.rival_week;
    if (!rw || rw === "disabled") return null;
    return `wk${String(rw).padStart(2, "0")}`;
  }, [data]);

  const teamNames = sortTeams(Object.keys(teams));
  const [selected, setSelected] = useState<string | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const isMobileLayout = useIsMobileLayout();

  // Build bidirectional rival lookup
  const rivalMap = useMemo(() => {
    const m: Record<string, string> = {};
    Object.entries(rivals || {}).forEach(([a, b]) => {
      m[a] = b;
      m[b] = a;
    });
    return m;
  }, [rivals]);

  if (!teamNames.length) {
    return (
      <p className="text-muted-foreground mono text-sm">Nothing here yet—generate a schedule first.</p>
    );
  }

  const handlePrevTeam = () => {
    setMobileIndex((prev) => (prev > 0 ? prev - 1 : teamNames.length - 1));
  };

  const handleNextTeam = () => {
    setMobileIndex((prev) => (prev < teamNames.length - 1 ? prev + 1 : 0));
  };

  // Render a single team card
  const renderTeamCard = (t: string) => {
    const weeks = teams[t] || {};
    const rival = rivalMap[t];
    const sortedWeeks = Object.keys(weeks).sort();
    return (
      <div
        key={t}
        className="brutal-border bg-carbon p-4 fade-up overflow-hidden"
        data-testid={`team-card-${t}`}
      >
        <div className="flex items-start justify-between mb-3 pb-2 border-b border-[#222]">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-2xl uppercase tracking-wide leading-none">
              {displayTeam(t)}
            </h3>
            {rival && (
              <p className="text-[10px] mono uppercase tracking-[0.2em] text-eagles mt-1">
                ★ Rival: {displayTeam(rival)}
              </p>
            )}
          </div>
          <span className="text-[10px] mono text-muted-foreground shrink-0 ml-2">
            {sortedWeeks.length} Games
          </span>
        </div>
        <div className="space-y-0.5">
          {sortedWeeks.map((wk: string) => {
            const opp = weeks[wk];
            const isRivalWk = wk === rivalWeekKey;
            const isRivalGame = rival && opp === rival;
            const weekNum = parseInt(wk.replace("wk", ""), 10);
            return (
              <div
                key={wk}
                className={`flex items-center justify-between text-sm mono px-2 py-1.5 ${
                  isRivalGame
                    ? "bg-eagles/15 text-eagles"
                    : "hover:bg-obsidian"
                }`}
                data-testid={`team-${t}-${wk}`}
              >
                <span className="text-muted-foreground tabular-nums flex items-center gap-2 shrink-0">
                  {displayWeek(weekNum)}
                  {isRivalWk && (
                    <Star className="w-3 h-3 text-eagles fill-eagles" />
                  )}
                </span>
                <span className="uppercase tracking-wide text-right">
                  {opp ? displayTeam(opp) : "—"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Mobile layout: single card with navigation
  if (isMobileLayout) {
    return (
      <div data-testid="per-team-schedule">
        {/* Mobile team navigation */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#222]">
          <button
            onClick={handlePrevTeam}
            className="p-2 bg-obsidian border border-[#333] hover:border-giants"
            data-testid="mobile-prev-team"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <span className="text-[10px] mono uppercase tracking-[0.2em] text-muted-foreground">
              Team {mobileIndex + 1} of {teamNames.length}
            </span>
          </div>
          <button
            onClick={handleNextTeam}
            className="p-2 bg-obsidian border border-[#333] hover:border-giants"
            data-testid="mobile-next-team"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Single team card on mobile - full width */}
        {teamNames[mobileIndex] && renderTeamCard(teamNames[mobileIndex])}
        
        {/* Mobile team quick selector */}
        <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-[#222]">
          {teamNames.map((t: string, idx: number) => (
            <button
              key={t}
              onClick={() => setMobileIndex(idx)}
              className={`px-2 py-1 text-[10px] mono uppercase tracking-wider ${
                mobileIndex === idx
                  ? "bg-giants text-white"
                  : "bg-obsidian border border-[#333] hover:border-giants"
              }`}
              data-testid={`mobile-team-select-${t}`}
            >
              {displayTeam(t)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Desktop layout: grid with filter
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
        {teamNames.map((t: string) => (
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

      {/* Desktop grid */}
      <div className="grid grid-cols-3 xl:grid-cols-4 gap-4">
        {(selected ? [selected] : teamNames).map((t: string) => renderTeamCard(t))}
      </div>
    </div>
  );
}
