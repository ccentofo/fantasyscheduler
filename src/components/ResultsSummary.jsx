import { Button } from "@/components/ui/button";
import { Download, Copy, RefreshCw } from "lucide-react";
import { displayTeam, sortRivalPairs } from "@/lib/format";

export default function ResultsSummary({ data, onReuseSeed }) {
  if (!data) return null;
  const {
    seed,
    teams,
    weeks,
    rival_week: rivalWeek,
    rivals,
  } = data;

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `schedule-${seed?.slice(0, 8) || "export"}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const copySeed = () => {
    if (seed) navigator.clipboard?.writeText(seed);
  };

  const rivalsEntries = rivals ? sortRivalPairs(Object.entries(rivals)) : [];

  return (
    <div className="space-y-5" data-testid="results-summary">
      {/* Stats + actions */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#222]">
        <div className="flex flex-wrap gap-5 sm:gap-6">
          <Stat label="Teams" value={teams} testId="stat-teams" />
          <Stat label="Weeks" value={weeks} testId="stat-weeks" />
          <Stat
            label="Rival Week"
            value={rivalWeek === "disabled" ? "—" : rivalWeek}
            tint={rivalWeek === "disabled" ? "muted" : "eagles"}
            testId="stat-rival-week"
          />
          <Stat
            label="Rivals"
            value={rivalsEntries.length || (rivals === null ? "None" : 0)}
            testId="stat-rivals"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            onClick={copySeed}
            className="rounded-none border-[#333] hover:border-giants hover:text-giants bg-obsidian uppercase tracking-wider text-[10px] mono font-bold h-10 px-3"
            data-testid="copy-seed-btn"
          >
            <Copy className="w-3.5 h-3.5 mr-1.5" />
            Copy Seed
          </Button>
          <Button
            variant="outline"
            onClick={() => onReuseSeed?.(seed)}
            className="rounded-none border-[#333] hover:border-giants hover:text-giants bg-obsidian uppercase tracking-wider text-[10px] mono font-bold h-10 px-3"
            data-testid="reuse-seed-btn"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Reuse Seed
          </Button>
          <Button
            onClick={downloadJson}
            className="rounded-none bg-giants text-white hover:bg-giantsDim uppercase tracking-wider text-[10px] mono font-bold h-10 px-3"
            data-testid="download-json-btn"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Download JSON
          </Button>
        </div>
      </div>

      {/* Seed display */}
      <div className="flex items-center gap-3 text-[11px] mono">
        <span className="text-muted-foreground uppercase tracking-[0.2em] shrink-0">
          Seed
        </span>
        <code
          className="text-giants truncate bg-obsidian px-2 py-1 border border-[#222] min-w-0"
          data-testid="results-seed"
        >
          {seed}
        </code>
      </div>

      {/* Rivals inline strip */}
      {rivalsEntries.length > 0 && (
        <div className="flex flex-wrap gap-2" data-testid="rivals-strip">
          {rivalsEntries.map(([a, b]) => (
            <div
              key={`${a}-${b}`}
              className="flex items-center gap-2 px-3 py-1.5 border border-eagles/40 bg-eagles/10 text-eagles mono text-[11px] uppercase tracking-wider"
              data-testid={`rival-pair-${a}-${b}`}
            >
              <span>{displayTeam(a)}</span>
              <span className="text-eagles/60">×</span>
              <span>{displayTeam(b)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, tint = "default", testId }) {
  const color =
    tint === "danger"
      ? "#ef4444"
      : tint === "eagles"
        ? "#4ade80"
        : tint === "muted"
          ? "#a1a1aa"
          : "#60a5fa";
  return (
    <div className="flex flex-col" data-testid={testId}>
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mono">
        {label}
      </span>
      <span
        className="font-display text-3xl sm:text-4xl leading-none"
        style={{ color }}
      >
        {value}
      </span>
    </div>
  );
}
