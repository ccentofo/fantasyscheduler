import { ArrowLeft } from "lucide-react";

interface PageShellProps {
  children: React.ReactNode;
  navigate: (to: string) => void;
}

export default function PageShell({ children, navigate }: PageShellProps) {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-obsidian text-foreground">
      {/* Header */}
      <header className="border-b border-[#1f1f1f] bg-obsidian/70 backdrop-blur z-40 shrink-0">
        <div className="w-full px-6 lg:px-10 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <a
              href="/"
              onClick={(e) => handleNav(e, "/")}
              className="shrink-0"
            >
              <img
                src="/logo.svg"
                alt="Fantasy Schedule Maker"
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg"
              />
            </a>
            <div className="min-w-0 leading-tight">
              <a
                href="/"
                onClick={(e) => handleNav(e, "/")}
                className="hover:opacity-80 transition-opacity"
              >
                <h1 className="font-display text-xl sm:text-2xl lg:text-3xl uppercase tracking-wide leading-none truncate">
                  <span className="sm:hidden">FF Scheduler</span>
                  <span className="hidden sm:inline">
                    Fantasy Football Scheduler
                  </span>
                </h1>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 w-full">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-8">
          <a
            href="/"
            onClick={(e) => handleNav(e, "/")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-giants transition-colors mb-8"
            data-testid="back-to-scheduler"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono uppercase tracking-[0.15em]">
              Back to Scheduler
            </span>
          </a>

          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1f1f1f] bg-obsidian/70 backdrop-blur shrink-0">
        <div className="w-full px-6 lg:px-10 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs mono">
          <a
            href="/"
            onClick={(e) => handleNav(e, "/")}
            className="text-muted-foreground hover:text-giants transition-colors uppercase tracking-[0.15em]"
          >
            Home
          </a>
          <span className="text-[#333] hidden sm:inline" aria-hidden="true">
            |
          </span>
          <a
            href="/about"
            onClick={(e) => handleNav(e, "/about")}
            className="text-muted-foreground hover:text-giants transition-colors uppercase tracking-[0.15em]"
          >
            About Us
          </a>
          <span className="text-[#333] hidden sm:inline" aria-hidden="true">
            |
          </span>
          <a
            href="/faq"
            onClick={(e) => handleNav(e, "/faq")}
            className="text-muted-foreground hover:text-giants transition-colors uppercase tracking-[0.15em]"
          >
            FAQ
          </a>
          <span className="text-[#333] hidden sm:inline" aria-hidden="true">
            |
          </span>
          <a
            href="/privacy-policy"
            onClick={(e) => handleNav(e, "/privacy-policy")}
            className="text-muted-foreground hover:text-giants transition-colors uppercase tracking-[0.15em]"
          >
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
