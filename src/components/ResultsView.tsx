import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import WeeklyGrid from "./WeeklyGrid";
import TeamsView from "./TeamsView";
import Heatmap from "./Heatmap";
import ResultsSummary from "./ResultsSummary";

interface Matchup {
  t1: string;
  t2: string;
}

interface MatchupCount {
  t1: string;
  t2: string;
  count: number;
}

interface ScheduleData {
  seed?: string;
  teams?: number;
  weeks?: number;
  rival_week?: number | "disabled";
  rivals?: Record<string, string> | null;
  matchup_counts?: MatchupCount[];
  schedule?: {
    teams?: Record<string, Record<string, string>>;
    weeks?: Record<string, Matchup[]>;
  };
}

interface ResultsViewProps {
  data: ScheduleData | null;
  onReuseSeed?: (seed: string) => void;
}

export default function ResultsView({ data, onReuseSeed }: ResultsViewProps) {
  if (!data) return null;

  return (
    <div className="brutal-panel p-6 space-y-5 fade-up" data-testid="results-view">
      <ResultsSummary data={data} onReuseSeed={onReuseSeed} />

      <Tabs defaultValue="weeks" className="w-full">
        <TabsList className="rounded-none bg-obsidian border border-[#333] p-0 h-auto">
          <TabsTrigger
            value="weeks"
            className="rounded-none data-[state=active]:bg-giants data-[state=active]:text-white uppercase tracking-[0.15em] text-[11px] font-bold px-5 py-3 mono"
            data-testid="tab-weeks"
          >
            Weekly Grid
          </TabsTrigger>
          <TabsTrigger
            value="teams"
            className="rounded-none data-[state=active]:bg-giants data-[state=active]:text-white uppercase tracking-[0.15em] text-[11px] font-bold px-5 py-3 mono"
            data-testid="tab-teams"
          >
            By Team
          </TabsTrigger>
          <TabsTrigger
            value="heatmap"
            className="rounded-none data-[state=active]:bg-giants data-[state=active]:text-white uppercase tracking-[0.15em] text-[11px] font-bold px-5 py-3 mono"
            data-testid="tab-heatmap"
          >
            Frequency Matrix
          </TabsTrigger>
        </TabsList>

        <TabsContent value="weeks" className="mt-5">
          <WeeklyGrid data={data} />
        </TabsContent>
        <TabsContent value="teams" className="mt-5">
          <TeamsView data={data} />
        </TabsContent>
        <TabsContent value="heatmap" className="mt-5">
          <Heatmap data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export type { ScheduleData };
