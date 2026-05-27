import PageShell from "./PageShell";

interface AboutPageProps {
  navigate: (to: string) => void;
}

export default function AboutPage({ navigate }: AboutPageProps) {
  return (
    <PageShell navigate={navigate}>
      <h1
        className="font-display text-3xl sm:text-4xl uppercase tracking-wide mb-2"
        data-testid="about-title"
      >
        About Us
      </h1>
      <p className="text-eagles font-mono text-lg font-semibold mb-8">
        🏈 By Fans, For Fans
      </p>

      <p className="text-lg text-foreground mb-8">
        We&rsquo;re fantasy football commissioners who got tired of spending
        hours building schedules in spreadsheets. So we built the tool we wished
        existed.
      </p>

      <h2 className="font-display text-xl uppercase tracking-wide text-giants mt-10 mb-4">
        The Problem We Solved
      </h2>

      <p className="text-muted-foreground mb-5">
        If you&rsquo;ve ever been a fantasy football commissioner, you know the
        drill. Every August, you&rsquo;re staring at a spreadsheet, trying to
        figure out how to make sure everyone plays everyone the right number of
        times, rivalries land on the perfect weeks, and bye weeks don&rsquo;t
        completely wreck competitive balance.
      </p>

      <p className="text-muted-foreground mb-5">
        It&rsquo;s a math problem disguised as fun. And let&rsquo;s be
        honest&mdash;you became a commissioner to talk trash and collect league
        dues, not to solve combinatorial optimization puzzles.
      </p>

      <blockquote className="border-l-[3px] border-eagles pl-6 my-8 italic text-foreground">
        &ldquo;I spent 4 hours building a 12-team schedule last year. This tool
        did it in 4 seconds. Now I have 3 hours and 59 minutes for more
        important things&mdash;like updating my team name.&rdquo;
      </blockquote>

      <h2 className="font-display text-xl uppercase tracking-wide text-giants mt-10 mb-4">
        What We Built
      </h2>

      <p className="text-muted-foreground mb-5">
        Fantasy Football Scheduler is a free, web-based tool that generates
        balanced, customizable schedules for your fantasy league. No downloads.
        No sign-ups. Just configure your league, hit generate, and get a
        schedule that actually makes sense.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
        <FeatureCard
          icon="⚖️"
          title="Fair-Play Algorithms"
          description="Our scheduling logic ensures every team faces opponents an equal number of times—no unfair advantages."
        />
        <FeatureCard
          icon="🔥"
          title="Rivalry Weeks"
          description="Lock in those grudge matches. Set specific weeks for rivalry games that matter most."
        />
        <FeatureCard
          icon="📅"
          title="Bye Week Handling"
          description="Automatically accounts for NFL bye weeks so your schedule stays competitive all season."
        />
        <FeatureCard
          icon="🎯"
          title="Flexible League Sizes"
          description="Works with 8, 10, 12, 14, or 16-team leagues. Standard or custom configurations."
        />
      </div>

      <h2 className="font-display text-xl uppercase tracking-wide text-giants mt-10 mb-4">
        The Expertise Behind It
      </h2>

      <div className="bg-gradient-to-br from-giants/10 to-eagles/10 border border-[#27272a] rounded-lg p-6 my-8">
        <h3 className="font-display text-lg uppercase mb-3">
          Built on Real Scheduling Science
        </h3>
        <p className="text-muted-foreground text-sm mb-0">
          Our algorithms are based on round-robin tournament scheduling
          principles&mdash;the same mathematical foundations used by professional
          sports leagues. We&rsquo;ve adapted these for fantasy football&rsquo;s
          unique requirements: handling odd team counts, incorporating bye weeks,
          and ensuring competitive balance across the full season.
        </p>
      </div>

      <p className="text-muted-foreground mb-5">
        We&rsquo;ve tested our schedules against thousands of league
        configurations. The result? Schedules that are mathematically balanced,
        strategically interesting, and&mdash;most importantly&mdash;fair to
        every team in your league.
      </p>

      <h2 className="font-display text-xl uppercase tracking-wide text-giants mt-10 mb-4">
        Why Free?
      </h2>

      <p className="text-muted-foreground mb-5">
        Because we believe every commissioner deserves access to good tools. We
        keep the lights on through non-intrusive advertising and affiliate
        partnerships with fantasy platforms we actually use and trust.
      </p>

      <p className="text-muted-foreground mb-5">
        No premium tiers. No feature gates. No &ldquo;pay to unlock rivalry
        weeks.&rdquo; Just a tool that works.
      </p>

      <h2 className="font-display text-xl uppercase tracking-wide text-giants mt-10 mb-4">
        Our Promise
      </h2>

      <p className="text-muted-foreground mb-5">
        We&rsquo;re commissioners ourselves. We play in the same leagues you do.
        We deal with the same complaints about &ldquo;unfair schedules&rdquo;
        and the same debates about playoff formats. This tool exists because we
        needed it&mdash;and we figured you might need it too.
      </p>

      <p className="text-muted-foreground mb-8">
        So go ahead. Generate your schedule. Get back to what really
        matters: convincing your league that your 3rd-round pick is definitely
        going to break out this year.
      </p>

      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
        className="inline-block bg-giants text-white px-8 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
        data-testid="about-cta"
      >
        Generate Your Schedule →
      </a>
    </PageShell>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-[#27272a] rounded-lg p-5">
      <div className="text-2xl mb-3">{icon}</div>
      <h4 className="text-sm font-semibold mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground mb-0">{description}</p>
    </div>
  );
}
