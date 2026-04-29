import { useEffect, useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import ScheduleForm from "./ScheduleForm";
import ResultsView from "./ResultsView";
import ResultsSummary from "./ResultsSummary";
import WeeklyGrid from "./WeeklyGrid";
import TeamsView from "./TeamsView";
import Heatmap from "./Heatmap";
import ConnectionStatus from "./ConnectionStatus";
import SettingsDialog from "./SettingsDialog";
import EmptyState from "./EmptyState";
import BottomNav from "./BottomNav";
import { Button } from "@/components/ui/button";
import { generateSchedule, parseApiError } from "@/lib/api";

const MOBILE_TAB_LABELS = {
  weeks: "Weekly Grid",
  teams: "By Team",
  heatmap: "Frequency Matrix",
};

const FORCE_MOBILE_LS = "ff_force_mobile";

function useIsNarrowScreen() {
  const [narrow, setNarrow] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 1023px)").matches;
  });
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = (e) => setNarrow(e.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return narrow;
}

export default function Scheduler() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [statusBump, setStatusBump] = useState(0);
  const [formKey, setFormKey] = useState(0);
  const [initialSeed, setInitialSeed] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState("builder");
  const [forceMobile, setForceMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(FORCE_MOBILE_LS) === "1";
  });

  const narrow = useIsNarrowScreen();
  const isMobileLayout = forceMobile || narrow;

  const updateForceMobile = (val) => {
    setForceMobile(val);
    if (val) window.localStorage.setItem(FORCE_MOBILE_LS, "1");
    else window.localStorage.removeItem(FORCE_MOBILE_LS);
  };

  const onGenerate = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateSchedule(payload);
      setResult(data);
      setMobileTab("weeks");
    } catch (err) {
      setError(parseApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const onReuseSeed = (seed) => {
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
    <div className="min-h-screen w-full">
      {/* Header — compact */}
      <header className="border-b border-[#1f1f1f] bg-obsidian/70 backdrop-blur sticky top-0 z-40">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 bg-giants flex items-center justify-center shrink-0">
              <span className="font-display text-2xl leading-none text-white">
                FF
              </span>
            </div>
            <div className="min-w-0 leading-tight">
              <h1
                className="font-display text-lg sm:text-xl uppercase tracking-wide leading-none truncate"
                data-testid="app-title"
              >
                <span className="sm:hidden">FF Scheduler</span>
                <span className="hidden sm:inline">
                  Fantasy Football Scheduler
                </span>
              </h1>
              <p className="hidden md:block text-[9px] mono uppercase tracking-[0.25em] text-muted-foreground mt-0.5">
                Commissioner Control Room
              </p>
            </div>
            {forceMobile && !narrow && (
              <span
                className="ml-2 px-2 py-1 text-[9px] mono uppercase tracking-[0.2em] border border-giants text-giants"
                data-testid="mobile-sim-badge"
              >
                Mobile Sim
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <ConnectionStatus bump={statusBump} />
            <span
              className="text-eagles font-display text-2xl leading-none select-none px-1 hidden sm:inline"
              aria-hidden="true"
              data-testid="header-star"
            >
              ★
            </span>
            {isMobileLayout ? (
              <Button
                variant="outline"
                onClick={() => setSettingsOpen(true)}
                className="rounded-none border-[#333] hover:border-giants hover:text-giants bg-carbon h-10 w-10 p-0"
                aria-label="Settings"
                data-testid="open-settings-btn-mobile"
              >
                <SettingsIcon className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setSettingsOpen(true)}
                className="rounded-none border-[#333] hover:border-giants hover:text-giants bg-carbon uppercase tracking-wider text-xs font-bold h-10 px-3"
                data-testid="open-settings-btn"
              >
                <SettingsIcon className="w-4 h-4 mr-1.5" />
                Settings
              </Button>
            )}
          </div>
        </div>
      </header>

      <main
        className={`max-w-[1700px] mx-auto px-4 sm:px-6 py-5 ${
          isMobileLayout ? "pb-24" : "pb-8"
        }`}
      >
        {isMobileLayout ? (
          /* MOBILE layout — single view + bottom nav */
          <div
            className={`space-y-5 ${forceMobile && !narrow ? "max-w-[480px] mx-auto" : ""}`}
          >
            {mobileTab === "builder" && formNode}

            {mobileTab !== "builder" && !result && (
              <EmptyState onGoBuilder={() => setMobileTab("builder")} />
            )}

            {mobileTab !== "builder" && result && (
              <div
                className="brutal-panel p-4 space-y-5 fade-up"
                data-testid={`mobile-view-${mobileTab}`}
              >
                <MobileTabHeader title={MOBILE_TAB_LABELS[mobileTab]} />
                <ResultsSummary data={result} onReuseSeed={onReuseSeed} />
                {mobileTab === "weeks" && <WeeklyGrid data={result} />}
                {mobileTab === "teams" && <TeamsView data={result} />}
                {mobileTab === "heatmap" && <Heatmap data={result} />}
              </div>
            )}
          </div>
        ) : (
          /* DESKTOP layout — side-by-side */
          <>
            <div className="grid grid-cols-[400px_minmax(0,1fr)] gap-6">
              <aside className="sticky top-[64px] self-start">{formNode}</aside>
              <section className="h-full">
                {result ? (
                  <ResultsView data={result} onReuseSeed={onReuseSeed} />
                ) : (
                  <EmptyState />
                )}
              </section>
            </div>
            <footer className="mt-10 pt-5 border-t border-[#1f1f1f] text-[11px] mono text-muted-foreground flex flex-wrap gap-4 items-center justify-between">
              <span className="uppercase tracking-[0.2em]">
                UI talks directly to your Docker container
              </span>
              <span>
                Default base{" "}
                <span className="text-giants">http://localhost:8000</span>
              </span>
            </footer>
          </>
        )}
      </main>

      {isMobileLayout && (
        <BottomNav
          active={mobileTab}
          onChange={setMobileTab}
          onSettings={() => setSettingsOpen(true)}
        />
      )}

      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        onSaved={() => setStatusBump((x) => x + 1)}
        forceMobile={forceMobile}
        onForceMobileChange={updateForceMobile}
      />
    </div>
  );
}

function MobileTabHeader({ title }) {
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

function SeedInjectingForm({ initialSeed, ...rest }) {
  useEffect(() => {
    if (!initialSeed) return;
    const el = document.querySelector('[data-testid="seed-input"]');
    if (el) {
      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      ).set;
      nativeSetter.call(el, initialSeed);
      el.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }, [initialSeed]);
  return <ScheduleForm {...rest} />;
}
