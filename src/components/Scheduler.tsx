import { useEffect, useState } from "react";
import ScheduleForm from "./ScheduleForm";
import { type SchedulePayload } from "@/lib/api";
import ResultsView, { type ScheduleData } from "./ResultsView";
import ResultsSummary from "./ResultsSummary";
import WeeklyGrid from "./WeeklyGrid";
import TeamsView from "./TeamsView";
import Heatmap from "./Heatmap";
import ConnectionStatus from "./ConnectionStatus";
import EmptyState from "./EmptyState";
import BottomNav, { type TabId } from "./BottomNav";
import { generateSchedule, parseApiError } from "@/lib/api";

const MOBILE_TAB_LABELS: Record<string, string> = {
  weeks: "Weekly Grid",
  teams: "By Team",
  heatmap: "Frequency Matrix",
};

function useIsNarrowScreen(): boolean {
  const [narrow, setNarrow] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 1023px)").matches;
  });
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = (e: MediaQueryListEvent) => setNarrow(e.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return narrow;
}

export default function Scheduler() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScheduleData | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [initialSeed, setInitialSeed] = useState("");
  const [mobileTab, setMobileTab] = useState<TabId | "builder">("builder");

  const narrow = useIsNarrowScreen();
  const isMobileLayout = narrow;

  const onGenerate = async (payload: SchedulePayload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateSchedule(payload);
      setResult(data as ScheduleData);
      setMobileTab("weeks");
    } catch (err) {
      setError(parseApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const onReuseSeed = (seed: string) => {
    if (!seed) return;
    setInitialSeed(seed);
    setFormKey((k) => k + 1);
    setMobileTab("builder");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formNode = (
    <SeedInjectingForm
      key={formKey}
      initialSeed={initialSeed}
      onGenerate={onGenerate}
      loading={loading}
      error={error}
    />
  );

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      {/* Header */}
      <header className="border-b border-[#1f1f1f] bg-obsidian/70 backdrop-blur z-40 shrink-0">
        <div className="w-full px-6 lg:px-10 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <img
              src="/logo.svg"
              alt="Fantasy Schedule Maker"
              className="w-12 h-12 lg:w-14 lg:h-14 shrink-0 rounded-lg"
            />
            <div className="min-w-0 leading-tight">
              <h1
                className="font-display text-xl sm:text-2xl lg:text-3xl uppercase tracking-wide leading-none truncate"
                data-testid="app-title"
              >
                <span className="sm:hidden">FF Scheduler</span>
                <span className="hidden sm:inline">
                  Fantasy Football Scheduler
                </span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <ConnectionStatus />
            <span
              className="text-eagles font-display text-2xl leading-none select-none px-1 hidden sm:inline"
              aria-hidden="true"
              data-testid="header-star"
            >
              ★
            </span>
          </div>
        </div>
      </header>

      <main
        className={`flex-1 w-full px-6 lg:px-10 py-4 overflow-hidden ${
          isMobileLayout ? "pb-20" : "pb-4"
        }`}
      >
        {isMobileLayout ? (
          /* MOBILE layout — single view + bottom nav */
          <div className="h-full overflow-y-auto space-y-5">
            {mobileTab === "builder" && formNode}

            {mobileTab !== "builder" && !result && (
              <EmptyState onGoBuilder={() => setMobileTab("builder")} />
            )}

            {mobileTab !== "builder" && result && (
              <div
                className="brutal-panel p-4 space-y-5 fade-up"
                data-testid={`mobile-view-${mobileTab}`}
              >
                <MobileTabHeader title={MOBILE_TAB_LABELS[mobileTab] || ""} />
                <ResultsSummary data={result} onReuseSeed={onReuseSeed} />
                {mobileTab === "weeks" && <WeeklyGrid data={result} />}
                {mobileTab === "teams" && <TeamsView data={result} />}
                {mobileTab === "heatmap" && <Heatmap data={result} />}
              </div>
            )}
          </div>
        ) : (
          /* DESKTOP layout — side-by-side */
          <div className="grid grid-cols-[minmax(420px,28%)_minmax(0,1fr)] gap-8 h-full">
            <aside className="h-full overflow-y-auto">{formNode}</aside>
            <section className="h-full overflow-y-auto">
              {result ? (
                <ResultsView data={result} onReuseSeed={onReuseSeed} />
              ) : (
                <EmptyState />
              )}
            </section>
          </div>
        )}
      </main>

      {/* Footer with navigation links */}
      <footer className="border-t border-[#1f1f1f] bg-obsidian/70 backdrop-blur shrink-0">
        <div className="w-full px-6 lg:px-10 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs mono">
          <a
            href="/about.html"
            className="text-muted-foreground hover:text-giants transition-colors uppercase tracking-[0.15em]"
            data-testid="footer-about"
          >
            About Us
          </a>
          <span className="text-[#333] hidden sm:inline" aria-hidden="true">|</span>
          <a
            href="/faq.html"
            className="text-muted-foreground hover:text-giants transition-colors uppercase tracking-[0.15em]"
            data-testid="footer-faq"
          >
            FAQ
          </a>
          <span className="text-[#333] hidden sm:inline" aria-hidden="true">|</span>
          <a
            href="/privacy-policy.html"
            className="text-muted-foreground hover:text-giants transition-colors uppercase tracking-[0.15em]"
            data-testid="footer-privacy"
          >
            Privacy Policy
          </a>
        </div>
      </footer>

      {isMobileLayout && (
        <BottomNav
          active={mobileTab === "builder" ? "builder" : mobileTab}
          onChange={(id) => setMobileTab(id)}
        />
      )}
    </div>
  );
}

interface MobileTabHeaderProps {
  title: string;
}

function MobileTabHeader({ title }: MobileTabHeaderProps) {
  return (
    <div className="flex items-baseline justify-between pb-2 border-b border-[#222]">
      <h2 className="font-display text-2xl uppercase tracking-wide leading-none">
        {title}
      </h2>
      <span className="text-[10px] mono uppercase tracking-[0.2em] text-muted-foreground">
        Results
      </span>
    </div>
  );
}

interface SeedInjectingFormProps {
  initialSeed: string;
  onGenerate: (payload: SchedulePayload) => void;
  loading: boolean;
  error: string | null;
}

function SeedInjectingForm({ initialSeed, ...rest }: SeedInjectingFormProps) {
  useEffect(() => {
    if (!initialSeed) return;
    const el = document.querySelector('[data-testid="seed-input"]') as HTMLInputElement | null;
    if (el) {
      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      if (nativeSetter) {
        nativeSetter.call(el, initialSeed);
        el.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
  }, [initialSeed]);
  return <ScheduleForm {...rest} />;
}
