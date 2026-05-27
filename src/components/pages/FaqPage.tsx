import PageShell from "./PageShell";

interface FaqPageProps {
  navigate: (to: string) => void;
}

const FAQ_ITEMS: { question: string; answer: React.ReactNode }[] = [
  {
    question: "Is Fantasy Football Scheduler free to use?",
    answer: (
      <>
        <p className="text-muted-foreground mb-3">
          <strong className="text-foreground">Yes, completely free.</strong>{" "}
          There are no premium tiers, no feature locks, and no hidden costs.
          Every feature&mdash;including rivalry weeks, custom team names, and
          unlimited schedule generations&mdash;is available to everyone.
        </p>
        <p className="text-muted-foreground">
          We keep the tool free by displaying non-intrusive advertisements. We
          believe every fantasy commissioner deserves access to quality
          scheduling tools, regardless of budget.
        </p>
      </>
    ),
  },
  {
    question: "What league sizes does the scheduler support?",
    answer: (
      <>
        <p className="text-muted-foreground mb-3">
          We support the most common fantasy football league configurations:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2 mb-3">
          <li>
            <strong className="text-foreground">8-team leagues</strong> &ndash;
            Great for smaller, competitive groups
          </li>
          <li>
            <strong className="text-foreground">10-team leagues</strong> &ndash;
            The classic standard format
          </li>
          <li>
            <strong className="text-foreground">12-team leagues</strong> &ndash;
            The most popular size for serious leagues
          </li>
          <li>
            <strong className="text-foreground">14-team leagues</strong> &ndash;
            For deeper roster challenges
          </li>
          <li>
            <strong className="text-foreground">16-team leagues</strong> &ndash;
            Maximum competition, maximum strategy
          </li>
        </ul>
        <p className="text-muted-foreground">
          Our algorithms automatically adjust matchup distribution based on your
          league size to ensure every team faces opponents fairly throughout the
          season.
        </p>
      </>
    ),
  },
  {
    question: "How are rivalry weeks handled?",
    answer: (
      <>
        <p className="text-muted-foreground mb-3">
          Rivalry weeks let you lock in specific matchups for specific
          weeks&mdash;perfect for those grudge matches that need to happen at
          just the right time.
        </p>
        <p className="text-muted-foreground mb-3">
          <strong className="text-foreground">Here&rsquo;s how it works:</strong>
        </p>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2 mb-3">
          <li>
            Designate team pairings as &ldquo;rivals&rdquo; (e.g., Team A vs.
            Team B)
          </li>
          <li>
            Assign each rivalry to a specific week (e.g., Week 1, Thanksgiving
            week, etc.)
          </li>
          <li>
            The scheduler locks these matchups first, then builds the rest of
            the schedule around them
          </li>
        </ul>
        <div className="bg-giants/10 border-l-[3px] border-giants p-4 rounded-r-md text-sm text-muted-foreground">
          <strong className="text-foreground">Pro Tip:</strong> Many
          commissioners use rivalry weeks for Thanksgiving matchups, season
          openers, or the final week of the regular season for maximum drama.
        </div>
      </>
    ),
  },
  {
    question: "Is the schedule randomized or deterministic?",
    answer: (
      <>
        <p className="text-muted-foreground mb-3">
          <strong className="text-foreground">
            It&rsquo;s randomized within fair constraints.
          </strong>{" "}
          Each time you generate a schedule, you&rsquo;ll get a different
          result&mdash;but every result follows the same fairness rules:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2 mb-3">
          <li>Every team plays the same number of games</li>
          <li>
            Matchup distribution is balanced (teams face each other an equal
            number of times where possible)
          </li>
          <li>Rivalry constraints are always respected</li>
        </ul>
        <p className="text-muted-foreground">
          Don&rsquo;t like the schedule you got? Just hit &ldquo;Generate&rdquo;
          again. You can regenerate as many times as you want until you find a
          schedule that feels right for your league.
        </p>
      </>
    ),
  },
  {
    question: "How does the scheduler handle bye weeks?",
    answer: (
      <>
        <p className="text-muted-foreground mb-3">
          Our scheduler is designed with NFL bye weeks in mind. When configuring
          your schedule, you can specify:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2 mb-3">
          <li>
            <strong className="text-foreground">Season length</strong> &ndash;
            Typically 14&ndash;17 weeks for regular season
          </li>
          <li>
            <strong className="text-foreground">Playoff weeks</strong> &ndash;
            Excluded from regular season matchups
          </li>
        </ul>
        <p className="text-muted-foreground">
          The algorithm distributes matchups evenly across your specified weeks,
          ensuring no team has an unfair concentration of tough matchups during
          heavy bye weeks.
        </p>
      </>
    ),
  },
  {
    question: "Can I customize team names?",
    answer: (
      <>
        <p className="text-muted-foreground mb-3">
          <strong className="text-foreground">Absolutely.</strong> You can enter
          custom team names for every team in your league. This makes the
          generated schedule immediately usable&mdash;just copy it into your
          league platform or share it with your league mates.
        </p>
        <p className="text-muted-foreground">
          If you don&rsquo;t want to enter names, we&rsquo;ll use default labels
          (Team 1, Team 2, etc.) that you can replace later.
        </p>
      </>
    ),
  },
  {
    question: 'What makes a "good" fantasy football schedule?',
    answer: (
      <>
        <p className="text-muted-foreground mb-3">
          A well-designed fantasy schedule has several key characteristics:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2 mb-3">
          <li>
            <strong className="text-foreground">Balance:</strong> Every team
            faces opponents an equal number of times (or as close as
            mathematically possible)
          </li>
          <li>
            <strong className="text-foreground">Variety:</strong> No team plays
            the same opponent in back-to-back weeks
          </li>
          <li>
            <strong className="text-foreground">Fairness:</strong> Tough
            matchups are distributed evenly, not clustered
          </li>
          <li>
            <strong className="text-foreground">Drama:</strong> Rivalry games
            and key matchups land on meaningful weeks
          </li>
        </ul>
        <p className="text-muted-foreground">
          Our algorithms optimize for all of these factors, using round-robin
          scheduling principles adapted for fantasy football&rsquo;s unique
          requirements.
        </p>
      </>
    ),
  },
  {
    question: "Do I need to create an account?",
    answer: (
      <>
        <p className="text-muted-foreground mb-3">
          <strong className="text-foreground">No account required.</strong>{" "}
          Fantasy Football Scheduler works entirely in your browser. Enter your
          league configuration, generate your schedule, and you&rsquo;re done.
        </p>
        <p className="text-muted-foreground">
          Your settings are saved locally in your browser, so if you come back
          later, your configuration will still be there. But we never require
          sign-ups, emails, or personal information to use the tool.
        </p>
      </>
    ),
  },
  {
    question: "Can I export or share my schedule?",
    answer: (
      <>
        <p className="text-muted-foreground mb-3">
          Yes! Once your schedule is generated, you can:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2 mb-3">
          <li>
            <strong className="text-foreground">Copy to clipboard</strong>{" "}
            &ndash; Paste directly into your league chat or platform
          </li>
          <li>
            <strong className="text-foreground">View week-by-week</strong>{" "}
            &ndash; See matchups organized by week for easy reference
          </li>
          <li>
            <strong className="text-foreground">Screenshot or print</strong>{" "}
            &ndash; The schedule view is designed to be clean and readable
          </li>
        </ul>
        <p className="text-muted-foreground">
          We&rsquo;re also working on direct export to CSV and integration with
          popular fantasy platforms&mdash;stay tuned!
        </p>
      </>
    ),
  },
  {
    question: "What if I have a question that's not answered here?",
    answer: (
      <>
        <p className="text-muted-foreground mb-3">
          We&rsquo;d love to hear from you! Reach out to us at{" "}
          <a
            href="mailto:support@fantasyfootballscheduler.com"
            className="text-giants hover:underline"
          >
            support@fantasyfootballscheduler.com
          </a>{" "}
          with your question, feedback, or feature request.
        </p>
        <p className="text-muted-foreground">
          We&rsquo;re fantasy commissioners ourselves, so we understand the
          challenges you face. If there&rsquo;s something we can add to make
          your life easier, let us know.
        </p>
      </>
    ),
  },
];

export default function FaqPage({ navigate }: FaqPageProps) {
  return (
    <PageShell navigate={navigate}>
      <h1
        className="font-display text-3xl sm:text-4xl uppercase tracking-wide mb-2"
        data-testid="faq-title"
      >
        Frequently Asked Questions
      </h1>
      <p className="text-muted-foreground text-lg mb-10">
        Everything you need to know about creating the perfect fantasy football
        schedule.
      </p>

      <div className="divide-y divide-[#27272a]">
        {FAQ_ITEMS.map(({ question, answer }, i) => (
          <div key={i} className="py-6 first:pt-0 last:pb-0">
            <h2 className="text-lg font-semibold text-foreground mb-3 flex items-start gap-3">
              <span className="inline-flex items-center justify-center min-w-[1.75rem] h-7 bg-giants text-white text-sm font-bold rounded font-mono shrink-0">
                Q
              </span>
              <span>{question}</span>
            </h2>
            <div className="pl-10">{answer}</div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-giants/15 to-eagles/15 border border-[#27272a] rounded-lg p-8 mt-10 text-center">
        <h2 className="font-display text-xl uppercase mb-3">
          Ready to Build Your Schedule?
        </h2>
        <p className="text-muted-foreground mb-5">
          Stop wrestling with spreadsheets. Generate a balanced, fair schedule in
          seconds.
        </p>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          className="inline-block bg-giants text-white px-8 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
          data-testid="faq-cta"
        >
          Generate Your Schedule →
        </a>
      </div>
    </PageShell>
  );
}
