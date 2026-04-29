import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import WeeklyGrid from "./WeeklyGrid";
import TeamsView from "./TeamsView";
import Heatmap from "./Heatmap";
import ResultsSummary from "./ResultsSummary";

export default function ResultsView({ data, onReuseSeed }) {
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
