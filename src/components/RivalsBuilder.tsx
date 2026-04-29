import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X, Shuffle } from "lucide-react";

interface RivalPair {
  a: string;
  b: string;
}

interface RivalsBuilderProps {
  teams: number;
  pairs: RivalPair[];
  setPairs: (pairs: RivalPair[]) => void;
}

export default function RivalsBuilder({ teams, pairs, setPairs }: RivalsBuilderProps) {
  const maxPairs = Math.floor(teams / 2);

  const update = (idx: number, side: "a" | "b", value: string) => {
    const next = pairs.slice();
    const current = next[idx];
    if (current) {
      next[idx] = { ...current, [side]: value };
      setPairs(next);
    }
  };

  const addPair = () => {
    if (pairs.length >= maxPairs) return;
    setPairs([...pairs, { a: "", b: "" }]);
  };

  const removePair = (idx: number) => {
    const next = pairs.filter((_, i) => i !== idx);
    // Always leave at least one empty row so the UI never collapses to nothing
    setPairs(next.length ? next : [{ a: "", b: "" }]);
  };

  const clearAll = () => {
    setPairs([{ a: "", b: "" }]);
  };

  return (
    <div className="space-y-2" data-testid="rivals-builder">
      <div className="flex items-center justify-between">
        <span className="text-[10px] mono uppercase tracking-[0.2em] text-muted-foreground">
          {pairs.filter((p) => p.a.trim() && p.b.trim()).length} / {maxPairs}{" "}
          Pairs
        </span>
        <button
          type="button"
          onClick={clearAll}
          className="text-[10px] mono uppercase tracking-wider text-muted-foreground hover:text-giants flex items-center gap-1"
          data-testid="rivals-clear-btn"
        >
          <Shuffle className="w-3 h-3" />
          Clear
        </button>
      </div>

      <div className="space-y-1.5" data-testid="rivals-pairs-list">
        {pairs.map((pair, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1.5"
            data-testid={`rival-pair-row-${idx}`}
          >
            <Input
              value={pair.a}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(idx, "a", e.target.value)}
              placeholder="Team A"
              className="rounded-none border-[#333] bg-obsidian mono text-sm h-10 focus-visible:ring-0 focus-visible:border-giants flex-1 min-w-0"
              data-testid={`rival-pair-${idx}-a`}
            />
            <span className="text-muted-foreground mono text-[10px] px-0.5">
              VS
            </span>
            <Input
              value={pair.b}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(idx, "b", e.target.value)}
              placeholder="Team B"
              className="rounded-none border-[#333] bg-obsidian mono text-sm h-10 focus-visible:ring-0 focus-visible:border-giants flex-1 min-w-0"
              data-testid={`rival-pair-${idx}-b`}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => removePair(idx)}
              className="rounded-none border-[#333] hover:border-danger hover:text-danger bg-obsidian h-10 w-10 p-0 shrink-0"
              title="Remove pair"
              data-testid={`rival-pair-${idx}-remove`}
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={addPair}
        disabled={pairs.length >= maxPairs}
        className="w-full rounded-none border-[#333] border-dashed hover:border-giants hover:text-giants bg-obsidian h-9 uppercase tracking-wider text-[10px] mono font-bold disabled:opacity-40"
        data-testid="rivals-add-pair-btn"
      >
        <Plus className="w-3.5 h-3.5 mr-1.5" />
        Add Pair
        {pairs.length >= maxPairs && " (Max Reached)"}
      </Button>

      <p className="text-[11px] mono text-muted-foreground leading-relaxed">
        Enter pairs you want as rivals. Leave blank for auto-assign by the API.
        Partial input is OK — the remainder will be auto-paired.
      </p>
    </div>
  );
}

// Serialize pairs into the API string format: "a:b, c:d"
export function serializePairs(pairs: RivalPair[]): string {
  return pairs
    .map((p) => [p.a.trim(), p.b.trim()])
    .filter(([a, b]) => a && b)
    .map(([a, b]) => `${a}:${b}`)
    .join(", ");
}

export type { RivalPair };
