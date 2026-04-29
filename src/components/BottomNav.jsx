import { Sliders, CalendarDays, Users, Grid3x3, Settings } from "lucide-react";

const TABS = [
  { id: "builder", label: "Builder", Icon: Sliders },
  { id: "weeks", label: "Weeks", Icon: CalendarDays },
  { id: "teams", label: "Teams", Icon: Users },
  { id: "heatmap", label: "Heatmap", Icon: Grid3x3 },
];

export default function BottomNav({ active, onChange, onSettings }) {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 bg-obsidian/95 backdrop-blur border-t border-[#222]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      data-testid="mobile-bottom-nav"
    >
      <div className="grid grid-cols-5">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] mono uppercase tracking-wider transition-none ${
                isActive
                  ? "text-giants"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid={`bottom-nav-${id}`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.75} />
              <span>{label}</span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={onSettings}
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-none"
          data-testid="bottom-nav-settings"
        >
          <Settings className="w-5 h-5" strokeWidth={1.75} />
          <span>Settings</span>
        </button>
      </div>
    </nav>
  );
}
