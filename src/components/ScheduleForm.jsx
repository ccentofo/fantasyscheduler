import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Dice5, Zap, AlertTriangle } from "lucide-react";
import { TEAM_SIZES } from "@/lib/constants";
import RivalsBuilder, { serializePairs } from "./RivalsBuilder";

function uuid() {
  // RFC4122 v4-ish
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function ScheduleForm({ onGenerate, loading, error }) {
  const [teams, setTeams] = useState(10);
  const [weeks, setWeeks] = useState(14);
  const [rivalWeekEnabled, setRivalWeekEnabled] = useState(true);
  const [rivalWeek, setRivalWeek] = useState(7);
  const [rivalsEnabled, setRivalsEnabled] = useState(true);
  const [rivalsMode, setRivalsMode] = useState("enter");
  const [rivalPairs, setRivalPairs] = useState([{ a: "", b: "" }]);
  const [seed, setSeed] = useState("");

  const maxWeeks = (teams - 1) * 2;

  const warning = useMemo(() => {
    if (weeks > maxWeeks)
      return `Max weeks for ${teams} teams is ${maxWeeks}. It will be capped on submit.`;
    if (rivalWeekEnabled && rivalWeek > weeks)
      return `Rival week (${rivalWeek}) cannot exceed weeks (${weeks}).`;
    return null;
  }, [teams, weeks, maxWeeks, rivalWeek, rivalWeekEnabled]);

  const submit = () => {
    const w = Math.min(weeks, maxWeeks);
    const payload = {
      teams,
      weeks: w,
      rival_week: rivalWeekEnabled ? Math.min(rivalWeek, w) : 0,
    };
    if (!rivalsEnabled) {
      payload.rivals = "none";
    } else if (rivalsMode === "enter") {
      const serialized = serializePairs(rivalPairs);
      if (serialized) payload.rivals = serialized;
    }
    if (seed.trim()) payload.seed = seed.trim();
    onGenerate(payload);
  };

  return (
    <div
      className="brutal-panel p-5 space-y-4 relative scanlines"
      data-testid="schedule-generator-form"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl uppercase tracking-wide leading-none">
            Schedule Builder
          </h2>
          <p className="text-[11px] mono uppercase tracking-[0.2em] text-muted-foreground mt-1">
            League Commissioner Panel
          </p>
        </div>
      </div>

      {/* Teams */}
      <div className="space-y-1.5">
        <Label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mono">
          Teams
        </Label>
        <div className="grid grid-cols-5 gap-2" data-testid="team-count-group">
          {TEAM_SIZES.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setTeams(n)}
              className={`h-11 font-display text-xl tracking-wide transition-none ${
                teams === n
                  ? "bg-giants text-white"
                  : "bg-obsidian border border-[#333] hover:border-giants text-foreground"
              }`}
              data-testid={`team-count-${n}-btn`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Weeks + Rival Week */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label
            htmlFor="weeks-input"
            className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mono"
          >
            Weeks (max {maxWeeks})
          </Label>
          <Input
            id="weeks-input"
            type="number"
            min={1}
            max={maxWeeks}
            value={weeks}
            onChange={(e) => setWeeks(Number(e.target.value) || 1)}
            className="rounded-none border-[#333] bg-obsidian mono h-10 text-base focus-visible:ring-0 focus-visible:border-giants"
            data-testid="weeks-input"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mono">
              Rival Week
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-[10px] mono uppercase text-muted-foreground">
                {rivalWeekEnabled ? "On" : "Off"}
              </span>
              <Switch
                checked={rivalWeekEnabled}
                onCheckedChange={setRivalWeekEnabled}
                className="data-[state=checked]:bg-giants"
                data-testid="rival-week-toggle"
              />
            </div>
          </div>
          <Select
            value={String(rivalWeek)}
            onValueChange={(v) => setRivalWeek(Number(v))}
            disabled={!rivalWeekEnabled}
          >
            <SelectTrigger
              className="rounded-none border-[#333] bg-obsidian mono h-10 text-base focus:ring-0 focus:border-giants disabled:opacity-50"
              data-testid="rival-week-select"
            >
              <SelectValue placeholder="Week" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-[#333] bg-carbon">
              {Array.from({ length: Math.min(weeks, maxWeeks) }, (_, i) => i + 1).map(
                (w) => (
                  <SelectItem key={w} value={String(w)} className="mono">
                    Week {w}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Rivals */}
      <div className="space-y-2 brutal-border p-3 bg-obsidian/40">
        <div className="flex items-center justify-between">
          <Label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mono">
            Rivals
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-[10px] mono uppercase text-muted-foreground">
              {rivalsEnabled ? "On" : "None"}
            </span>
            <Switch
              checked={rivalsEnabled}
              onCheckedChange={setRivalsEnabled}
              className="data-[state=checked]:bg-giants"
              data-testid="rivals-toggle"
            />
          </div>
        </div>

        {rivalsEnabled && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRivalsMode("enter")}
                className={`h-10 text-[11px] uppercase tracking-[0.2em] mono font-bold ${
                  rivalsMode === "enter"
                    ? "bg-giants text-white"
                    : "bg-obsidian border border-[#333] hover:border-giants"
                }`}
                data-testid="rivals-mode-enter-btn"
              >
                Enter Rivals
              </button>
              <button
                type="button"
                onClick={() => setRivalsMode("auto")}
                className={`h-10 text-[11px] uppercase tracking-[0.2em] mono font-bold ${
                  rivalsMode === "auto"
                    ? "bg-giants text-white"
                    : "bg-obsidian border border-[#333] hover:border-giants"
                }`}
                data-testid="rivals-mode-auto-btn"
              >
                Auto-Assign
              </button>
            </div>

            {rivalsMode === "enter" ? (
              <RivalsBuilder
                teams={teams}
                pairs={rivalPairs}
                setPairs={setRivalPairs}
              />
            ) : (
              <p className="text-[11px] mono text-muted-foreground leading-relaxed">
                The API will auto-assign rival pairs.
              </p>
            )}
          </>
        )}
        {!rivalsEnabled && (
          <p className="text-[11px] mono text-muted-foreground">
            Sends <span className="text-eagles">rivals=none</span>. Rival week
            also disabled.
          </p>
        )}
      </div>

      {/* Seed */}
      <div className="space-y-1.5">
        <Label
          htmlFor="seed-input"
          className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mono"
        >
          Seed (Reproducibility)
        </Label>
        <div className="flex gap-2">
          <Input
            id="seed-input"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder="Auto-generated if blank"
            className="rounded-none border-[#333] bg-obsidian mono h-10 text-xs focus-visible:ring-0 focus-visible:border-giants"
            data-testid="seed-input"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => setSeed(uuid())}
            className="rounded-none border-[#333] hover:border-giants hover:text-giants bg-obsidian h-10 px-3"
            title="Generate UUID"
            data-testid="seed-generate-btn"
          >
            <Dice5 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (seed) navigator.clipboard?.writeText(seed);
            }}
            disabled={!seed}
            className="rounded-none border-[#333] hover:border-giants hover:text-giants bg-obsidian h-10 px-3"
            title="Copy seed"
            data-testid="seed-copy-btn"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {warning && (
        <div className="flex items-start gap-2 p-3 border border-eagles/40 bg-eagles/10 text-eagles text-xs mono">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{warning}</span>
        </div>
      )}

      {error && (
        <div
          className="flex items-start gap-2 p-3 border border-danger bg-danger/10 text-danger text-xs mono"
          data-testid="form-error"
        >
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Button
        onClick={submit}
        disabled={loading}
        className="w-full h-12 rounded-none bg-giants text-white hover:bg-giantsDim font-display text-xl tracking-wide uppercase disabled:opacity-60"
        data-testid="generate-btn"
      >
        <Zap className="w-5 h-5 mr-2" />
        {loading ? "Generating…" : "Generate Schedule"}
      </Button>
    </div>
  );
}
