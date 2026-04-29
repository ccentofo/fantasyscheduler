import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyState({ onGoBuilder }) {
  return (
    <div
      className="brutal-panel relative overflow-hidden h-full min-h-[380px] flex flex-col items-center justify-center text-center fade-up px-6 py-10"
      data-testid="empty-state"
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="relative z-10 w-full text-center space-y-5">
        <div className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.85] tracking-tighter uppercase text-center">
          <span className="block text-muted-foreground/70">Commissioner.</span>
          <span className="block text-giants">Set the</span>
          <span className="block">Schedule.</span>
        </div>

        {onGoBuilder ? (
          <>
            <p className="text-muted-foreground mono text-sm leading-relaxed max-w-sm mx-auto">
              Configure teams, weeks, and rivalries in the{" "}
              <span className="text-giants">Builder</span> tab. Hit{" "}
              <span className="text-giants">Generate Schedule</span> to pull a
              matchup grid from your local Docker API.
            </p>
            <Button
              onClick={onGoBuilder}
              className="rounded-none bg-giants text-white hover:bg-giantsDim uppercase tracking-wider text-xs mono font-bold h-11 px-6"
              data-testid="goto-builder-btn"
            >
              Open Builder
            </Button>
          </>
        ) : (
          <>
            <p className="text-muted-foreground mono text-sm leading-relaxed max-w-md mx-auto">
              Configure teams, weeks, and rivalries on the left. Hit{" "}
              <span className="text-giantsBright">Generate Schedule</span> to
              pull a matchup grid from your local Docker API.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-2 border border-[#333] bg-obsidian/60 mono text-[11px] text-muted-foreground">
              <Terminal className="w-3.5 h-3.5 text-giantsBright" />
              <code>POST /schedule</code>
              <span className="text-[#333]">|</span>
              <code>GET /apidocs</code>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
