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
import RivalsBuilder, { serializePairs, type RivalPair } from "./RivalsBuilder";
import { type SchedulePayload } from "@/lib/api";

function uuid(): string {
  // RFC4122 v4-ish
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

interface ScheduleFormProps {
  onGenerate: (payload: SchedulePayload) => void;
  loading: boolean;
  error: string | null;
}

export default function ScheduleForm({ onGenerate, loading, error }: ScheduleFormProps) {
  const [teams, setTeams] = useState(10);
  const [weeks, setWeeks] = useState(14);
  const [rivalWeekEnabled, setRivalWeekEnabled] = useState(true);
  const [rivalWeek, setRivalWeek] = useState(7);
  const [rivalsEnabled, setRivalsEnabled] = useState(true);
  const [rivalsMode, setRivalsMode] = useState<"enter" | "auto">("enter");
  const [rivalPairs, setRivalPairs] = useState<RivalPair[]>([{ a: "", b: "" }]);
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
    const payload: SchedulePayload = {
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
      className="brutal-panel p-6 lg:p-8 space-y-5 relative scanlines"
      data-testid="schedule-generator-form"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl lg:text-4xl uppercase tracking-wide leading-none">
            Schedule Builder
          </h2>
          <p className="text-xs lg:text-sm mono uppercase tracking-[0.2em] text-muted-foreground mt-1.5">
            League Commissioner Panel
          </p>
        </div>
      </div>

      {/* Teams */}
      <div className="space-y-2">
        <Label className="text-xs lg:text-sm uppercase tracking-[0.2em] text-muted-foreground mono">
          Teams
        </Label>
        <div className="grid grid-cols-5 gap-3" data-testid="team-count-group">
          {TEAM_SIZES.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setTeams(n)}
              className={`h-12 lg:h-14 font-display text-xl lg:text-2xl tracking-wide transition-none ${
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
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="weeks-input"
            className="text-xs lg:text-sm uppercase tracking-[0.2em] text-muted-foreground mono"
          >
            Weeks (max {maxWeeks})
          </Label>
          <Input
            id="weeks-input"
            type="number"
            min={1}
            max={maxWeeks}
            value={weeks}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWeeks(Number(e.target.value) || 1)}
            className="rounded-none border-[#333] bg-obsidian mono h-12 text-base lg:text-lg focus-visible:ring-0 focus-visible:border-giants"
            data-testid="weeks-input"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs lg:text-sm uppercase tracking-[0.2em] text-muted-foreground mono">
              Rival Week
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-xs mono uppercase text-muted-foreground">
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
              className="rounded-none border-[#333] bg-obsidian mono h-12 text-base lg:text-lg focus:ring-0 focus:border-giants disabled:opacity-50"
              data-testid="rival-week-select"
            >
              <SelectValue placeholder="Week" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-[#333] bg-carbon">
              {Array.from({ length: Math.min(weeks, maxWeeks) }, (_, i) => i + 1).map(
                (w) => (
                  <SelectItem key={w} value={String(w)} className="mono text-base">
                    Week {w}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Rivals */}
      <div className="space-y-3 brutal-border p-4 bg-obsidian/40">
        <div className="flex items-center justify-between">
          <Label className="text-xs lg:text-sm uppercase tracking-[0.2em] text-muted-foreground mono">
            Rivals
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-xs mono uppercase text-muted-foreground">
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
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRivalsMode("enter")}
                className={`h-11 lg:h-12 text-xs lg:text-sm uppercase tracking-[0.2em] mono font-bold ${
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
                className={`h-11 lg:h-12 text-xs lg:text-sm uppercase tracking-[0.2em] mono font-bold ${
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
              <p className="text-sm mono text-muted-foreground leading-relaxed">
                The API will auto-assign rival pairs.
              </p>
            )}
          </>
        )}
        {!rivalsEnabled && (
          <p className="text-sm mono text-muted-foreground">
            Sends <span className="text-eagles">rivals=none</span>. Rival week
            also disabled.
          </p>
        )}
      </div>

      {/* Seed */}
      <div className="space-y-2">
        <Label
          htmlFor="seed-input"
          className="text-xs lg:text-sm uppercase tracking-[0.2em] text-muted-foreground mono"
        >
          Seed (Reproducibility)
        </Label>
        <div className="flex gap-3">
          <Input
            id="seed-input"
            value={seed}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeed(e.target.value)}
            placeholder="Auto-generated if blank"
            className="rounded-none border-[#333] bg-obsidian mono h-12 text-sm focus-visible:ring-0 focus-visible:border-giants"
            data-testid="seed-input"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => setSeed(uuid())}
            className="rounded-none border-[#333] hover:border-giants hover:text-giants bg-obsidian h-12 px-4"
            title="Generate UUID"
            data-testid="seed-generate-btn"
          >
            <Dice5 className="w-5 h-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (seed) navigator.clipboard?.writeText(seed);
            }}
            disabled={!seed}
            className="rounded-none border-[#333] hover:border-giants hover:text-giants bg-obsidian h-12 px-4"
            title="Copy seed"
            data-testid="seed-copy-btn"
          >
            <Copy className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {warning && (
        <div className="flex items-start gap-2 p-4 border border-eagles/40 bg-eagles/10 text-eagles text-sm mono">
          <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
          <span>{warning}</span>
        </div>
      )}

      {error && (
        <div
          className="flex items-start gap-2 p-4 border border-danger bg-danger/10 text-danger text-sm mono"
          data-testid="form-error"
        >
          <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Button
        onClick={submit}
        disabled={loading}
        className="w-full h-14 lg:h-16 rounded-none bg-giants text-white hover:bg-giantsDim font-display text-2xl lg:text-3xl tracking-wide uppercase disabled:opacity-60"
        data-testid="generate-btn"
      >
        <Zap className="w-6 h-6 mr-2" />
        {loading ? "Generating…" : "Generate Schedule"}
      </Button>
    </div>
  );
}

