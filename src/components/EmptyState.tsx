// import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onGoBuilder?: () => void;
}

export default function EmptyState({ onGoBuilder }: EmptyStateProps) {
  return (
    <div
      className="brutal-panel relative overflow-hidden h-full flex flex-col items-center justify-center text-center fade-up px-8 lg:px-12 py-8 lg:py-12"
      data-testid="empty-state"
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="relative z-10 w-full text-center space-y-8">
        <div className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter uppercase text-center">
          <span className="block text-muted-foreground/70">Your League.</span>
          <span className="block text-giants">Your Schedule.</span>
          <span className="block">Let's Go.</span>
        </div>

        {onGoBuilder ? (
          <>
            <p className="text-muted-foreground mono text-base lg:text-lg leading-relaxed max-w-lg mx-auto">
              Build fair schedules for 8–16 team leagues with customizable
              regular season weeks, optional Rival Week, and manual rival
              assignments. Teams never play each other more than twice—and never
              back-to-back. Head to the{" "}
              <span className="text-giants">Builder</span> tab to get started!
            </p>
            <Button
              onClick={onGoBuilder}
              className="rounded-none bg-giants text-white hover:bg-giantsDim uppercase tracking-wider text-sm mono font-bold h-14 px-8"
              data-testid="goto-builder-btn"
            >
              Open Builder
            </Button>
          </>
        ) : (
          <>
            <p className="text-muted-foreground mono text-base lg:text-lg leading-relaxed max-w-xl mx-auto">
              Build fair schedules for 8–16 team leagues with customizable
              regular season weeks, optional Rival Week, and manual rival
              assignments. Teams never play each other more than twice—and never
              back-to-back. Configure your league on the left and hit{" "}
              <span className="text-giantsBright">Generate Schedule</span> to
              create your matchups!
            </p>
            {/* <div className="inline-flex items-center gap-3 px-5 py-3 border border-[#333] bg-obsidian/60 mono text-sm text-muted-foreground">
              <Terminal className="w-5 h-5 text-giantsBright" />
              <code>POST /schedule</code>
              <span className="text-[#333]">|</span>
              <code>GET /apidocs</code>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
}
