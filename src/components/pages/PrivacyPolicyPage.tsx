import PageShell from "./PageShell";

interface PrivacyPolicyPageProps {
  navigate: (to: string) => void;
}

export default function PrivacyPolicyPage({ navigate }: PrivacyPolicyPageProps) {
  return (
    <PageShell navigate={navigate}>
      <h1
        className="font-display text-3xl sm:text-4xl uppercase tracking-wide mb-2"
        data-testid="privacy-title"
      >
        Privacy Policy
      </h1>
      <p className="text-muted-foreground text-sm font-mono mb-8">
        Last Updated: May 6, 2026
      </p>

      <p className="text-muted-foreground mb-4">
        Fantasy Football Scheduler (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
        &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy
        Policy explains how we collect, use, disclose, and safeguard your
        information when you use our web-based fantasy football scheduling tool
        (the &ldquo;Service&rdquo;). This policy is designed to comply with the
        General Data Protection Regulation (GDPR), the California Consumer
        Privacy Act as amended by the California Privacy Rights Act (CCPA/CPRA),
        and applicable 2026 data privacy regulations.
      </p>

      <p className="text-muted-foreground mb-8">
        By using our Service, you agree to the collection and use of information
        in accordance with this policy.
      </p>

      <Section title="1. Information We Collect">
        <h3 className="text-base font-semibold mt-6 mb-3">
          1.1 Information You Provide
        </h3>
        <p className="text-muted-foreground mb-3">
          When you use our scheduling tool, you may provide:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2 mb-4">
          <li>
            <strong className="text-foreground">
              League Configuration Data:
            </strong>{" "}
            Team names, league size, rivalry matchups, and scheduling preferences
          </li>
          <li>
            <strong className="text-foreground">Contact Information:</strong>{" "}
            Email address (if you choose to contact us or subscribe to updates)
          </li>
        </ul>

        <h3 className="text-base font-semibold mt-6 mb-3">
          1.2 Automatically Collected Information
        </h3>
        <p className="text-muted-foreground mb-3">
          When you access our Service, we automatically collect:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2 mb-4">
          <li>
            <strong className="text-foreground">Device Information:</strong>{" "}
            Browser type, operating system, device type
          </li>
          <li>
            <strong className="text-foreground">Usage Data:</strong> Pages
            visited, time spent on pages, click patterns
          </li>
          <li>
            <strong className="text-foreground">Log Data:</strong> IP address,
            access times, referring URLs
          </li>
          <li>
            <strong className="text-foreground">
              Cookies and Similar Technologies:
            </strong>{" "}
            See Section 4 for details
          </li>
        </ul>

        <h3 className="text-base font-semibold mt-6 mb-3">
          1.3 Information from Third Parties
        </h3>
        <p className="text-muted-foreground">
          We may receive information from third-party advertising partners,
          including Google AdSense, to deliver relevant advertisements and
          measure ad performance.
        </p>
      </Section>

      <Section title="2. How We Use Your Information">
        <p className="text-muted-foreground mb-3">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2">
          <li>Provide, operate, and maintain our scheduling Service</li>
          <li>
            Generate fantasy football schedules based on your inputs
          </li>
          <li>Improve, personalize, and expand our Service</li>
          <li>Understand and analyze how you use our Service</li>
          <li>
            Communicate with you for customer service and updates
          </li>
          <li>
            Display relevant advertisements through our advertising partners
          </li>
          <li>
            Detect, prevent, and address technical issues or fraud
          </li>
          <li>Comply with legal obligations</li>
        </ul>
      </Section>

      <Section title="3. Legal Basis for Processing (GDPR)">
        <p className="text-muted-foreground mb-3">
          If you are located in the European Economic Area (EEA), United Kingdom,
          or Switzerland, we process your personal data based on:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2">
          <li>
            <strong className="text-foreground">Consent:</strong> Where you have
            given explicit consent for specific processing activities (e.g.,
            marketing communications, personalized advertising)
          </li>
          <li>
            <strong className="text-foreground">Contract Performance:</strong>{" "}
            Where processing is necessary to provide the Service you requested
          </li>
          <li>
            <strong className="text-foreground">Legitimate Interests:</strong>{" "}
            Where processing is necessary for our legitimate business interests,
            such as improving our Service and fraud prevention
          </li>
          <li>
            <strong className="text-foreground">Legal Obligation:</strong> Where
            processing is required to comply with applicable laws
          </li>
        </ul>
      </Section>

      <Section title="4. Cookies and Tracking Technologies">
        <h3 className="text-base font-semibold mt-6 mb-3">
          4.1 What Are Cookies?
        </h3>
        <p className="text-muted-foreground mb-4">
          Cookies are small data files stored on your device when you visit a
          website. We use cookies and similar technologies (pixels, web beacons,
          local storage) to enhance your experience and deliver advertising.
        </p>

        <h3 className="text-base font-semibold mt-6 mb-3">
          4.2 Types of Cookies We Use
        </h3>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2 mb-4">
          <li>
            <strong className="text-foreground">Essential Cookies:</strong>{" "}
            Required for the Service to function (e.g., remembering your API
            settings)
          </li>
          <li>
            <strong className="text-foreground">Analytics Cookies:</strong> Help
            us understand how visitors interact with our Service
          </li>
          <li>
            <strong className="text-foreground">Advertising Cookies:</strong>{" "}
            Used by our advertising partners to deliver relevant ads
          </li>
        </ul>

        <h3 className="text-base font-semibold mt-6 mb-3">
          4.3 Managing Cookies
        </h3>
        <p className="text-muted-foreground mb-3">
          You can control cookies through your browser settings. Note that
          disabling certain cookies may affect the functionality of our Service.
          You can also opt out of personalized advertising through:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2">
          <li>
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-giants hover:underline"
            >
              Google Ads Settings
            </a>
          </li>
          <li>
            <a
              href="https://optout.aboutads.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-giants hover:underline"
            >
              Digital Advertising Alliance Opt-Out
            </a>
          </li>
          <li>
            <a
              href="https://optout.networkadvertising.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-giants hover:underline"
            >
              Network Advertising Initiative Opt-Out
            </a>
          </li>
        </ul>
      </Section>

      <Section title="5. Third-Party Advertising">
        <div className="bg-giants/10 border-l-[3px] border-giants p-4 rounded-r-md mb-4">
          <p className="text-muted-foreground text-sm">
            <strong className="text-foreground">
              Important Notice About Advertising:
            </strong>{" "}
            We use Google AdSense to display advertisements on our Service.
            Google and other third-party vendors use cookies, including the DART
            cookie, to serve ads based on your prior visits to our website and
            other websites on the Internet.
          </p>
        </div>

        <h3 className="text-base font-semibold mt-6 mb-3">
          5.1 Google AdSense and DART Cookies
        </h3>
        <p className="text-muted-foreground mb-3">
          Google&rsquo;s use of the DART cookie enables it and its partners to
          serve ads to you based on your visit to our Service and/or other sites
          on the Internet. The DART cookie is used by Google in the ads served on
          publisher websites displaying AdSense for content ads.
        </p>
        <p className="text-muted-foreground mb-4">
          You may opt out of the use of the DART cookie for interest-based
          advertising by visiting the{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-giants hover:underline"
          >
            Google Ads Settings
          </a>{" "}
          page.
        </p>

        <h3 className="text-base font-semibold mt-6 mb-3">
          5.2 Third-Party Ad Networks
        </h3>
        <p className="text-muted-foreground mb-4">
          Third-party ad servers or ad networks may use cookies, JavaScript, or
          web beacons to measure the effectiveness of their advertisements
          and/or to personalize the advertising content you see. We have no
          access to or control over these cookies used by third-party
          advertisers.
        </p>

        <h3 className="text-base font-semibold mt-6 mb-3">
          5.3 Affiliate Links
        </h3>
        <p className="text-muted-foreground">
          Our Service may contain affiliate links to fantasy sports platforms and
          related services. When you click on these links and make a purchase, we
          may receive a commission. These affiliate partners may use cookies to
          track referrals.
        </p>
      </Section>

      <Section title="6. Data Retention">
        <h3 className="text-base font-semibold mt-6 mb-3">
          6.1 Retention Periods
        </h3>
        <p className="text-muted-foreground mb-3">
          We retain your personal data only for as long as necessary to fulfill
          the purposes outlined in this Privacy Policy:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2 mb-4">
          <li>
            <strong className="text-foreground">
              League Configuration Data:
            </strong>{" "}
            Stored locally in your browser; not retained on our servers
          </li>
          <li>
            <strong className="text-foreground">Contact Information:</strong>{" "}
            Retained until you request deletion or unsubscribe
          </li>
          <li>
            <strong className="text-foreground">
              Usage and Analytics Data:
            </strong>{" "}
            Retained for up to 26 months
          </li>
          <li>
            <strong className="text-foreground">Advertising Data:</strong>{" "}
            Managed by our advertising partners per their retention policies
          </li>
        </ul>

        <h3 className="text-base font-semibold mt-6 mb-3">
          6.2 Data Deletion
        </h3>
        <p className="text-muted-foreground">
          You may request deletion of your personal data at any time by
          contacting us. We will respond to your request within 30 days (or
          sooner as required by applicable law).
        </p>
      </Section>

      <Section title="7. Your Privacy Rights">
        <h3 className="text-base font-semibold mt-6 mb-3">
          7.1 Rights Under GDPR (EEA, UK, Switzerland)
        </h3>
        <p className="text-muted-foreground mb-3">
          If you are located in the EEA, UK, or Switzerland, you have the right
          to:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2 mb-4">
          <li>
            <strong className="text-foreground">Access:</strong> Request a copy
            of the personal data we hold about you
          </li>
          <li>
            <strong className="text-foreground">Rectification:</strong> Request
            correction of inaccurate personal data
          </li>
          <li>
            <strong className="text-foreground">Erasure:</strong> Request
            deletion of your personal data (&ldquo;right to be
            forgotten&rdquo;)
          </li>
          <li>
            <strong className="text-foreground">Restriction:</strong> Request
            restriction of processing of your personal data
          </li>
          <li>
            <strong className="text-foreground">Portability:</strong> Request
            transfer of your data to another service
          </li>
          <li>
            <strong className="text-foreground">Objection:</strong> Object to
            processing based on legitimate interests or for direct marketing
          </li>
          <li>
            <strong className="text-foreground">Withdraw Consent:</strong>{" "}
            Withdraw consent at any time where processing is based on consent
          </li>
          <li>
            <strong className="text-foreground">Lodge a Complaint:</strong> File
            a complaint with your local data protection authority
          </li>
        </ul>

        <h3 className="text-base font-semibold mt-6 mb-3">
          7.2 Rights Under CCPA/CPRA (California Residents)
        </h3>
        <p className="text-muted-foreground mb-3">
          If you are a California resident, you have the right to:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2 mb-4">
          <li>
            <strong className="text-foreground">Know:</strong> Request
            disclosure of the categories and specific pieces of personal
            information we collect
          </li>
          <li>
            <strong className="text-foreground">Delete:</strong> Request
            deletion of your personal information
          </li>
          <li>
            <strong className="text-foreground">Correct:</strong> Request
            correction of inaccurate personal information
          </li>
          <li>
            <strong className="text-foreground">
              Opt-Out of Sale/Sharing:
            </strong>{" "}
            Opt out of the sale or sharing of your personal information for
            cross-context behavioral advertising
          </li>
          <li>
            <strong className="text-foreground">
              Limit Use of Sensitive Information:
            </strong>{" "}
            Limit the use and disclosure of sensitive personal information
          </li>
          <li>
            <strong className="text-foreground">Non-Discrimination:</strong> Not
            be discriminated against for exercising your privacy rights
          </li>
        </ul>

        <p className="text-muted-foreground mb-4">
          <strong className="text-foreground">
            Do Not Sell or Share My Personal Information:
          </strong>{" "}
          We do not sell your personal information in the traditional sense.
          However, our use of advertising cookies may constitute
          &ldquo;sharing&rdquo; under CPRA. You can opt out by adjusting your
          cookie preferences or using the opt-out links provided in Section 4.3.
        </p>

        <h3 className="text-base font-semibold mt-6 mb-3">
          7.3 Rights Under Other Jurisdictions
        </h3>
        <p className="text-muted-foreground">
          Residents of other jurisdictions (including Virginia, Colorado,
          Connecticut, Utah, and other states with comprehensive privacy laws)
          may have similar rights. Please contact us to exercise your rights
          under applicable law.
        </p>
      </Section>

      <Section title="8. Data Security">
        <p className="text-muted-foreground">
          We implement appropriate technical and organizational measures to
          protect your personal data against unauthorized access, alteration,
          disclosure, or destruction. However, no method of transmission over the
          Internet or electronic storage is 100% secure, and we cannot guarantee
          absolute security.
        </p>
      </Section>

      <Section title="9. International Data Transfers">
        <p className="text-muted-foreground">
          Your information may be transferred to and processed in countries other
          than your country of residence. These countries may have different data
          protection laws. When we transfer data internationally, we implement
          appropriate safeguards, such as Standard Contractual Clauses approved
          by the European Commission.
        </p>
      </Section>

      <Section title="10. Children's Privacy">
        <p className="text-muted-foreground">
          Our Service is not directed to individuals under the age of 16. We do
          not knowingly collect personal information from children under 16. If
          we become aware that we have collected personal data from a child under
          16, we will take steps to delete that information promptly.
        </p>
      </Section>

      <Section title="11. Changes to This Privacy Policy">
        <p className="text-muted-foreground">
          We may update this Privacy Policy from time to time. We will notify you
          of any material changes by posting the new Privacy Policy on this page
          and updating the &ldquo;Last Updated&rdquo; date. We encourage you to
          review this Privacy Policy periodically.
        </p>
      </Section>

      <Section title="12. Contact Us">
        <p className="text-muted-foreground mb-3">
          If you have any questions about this Privacy Policy, wish to exercise
          your privacy rights, or have concerns about our data practices, please
          contact us:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2 mb-4">
          <li>
            <strong className="text-foreground">Email:</strong>{" "}
            <a
              href="mailto:privacy@fantasyfootballscheduler.com"
              className="text-giants hover:underline"
            >
              privacy@fantasyfootballscheduler.com
            </a>
          </li>
          <li>
            <strong className="text-foreground">Subject Line:</strong> Privacy
            Inquiry
          </li>
        </ul>
        <p className="text-muted-foreground">
          We will respond to your inquiry within 30 days or as required by
          applicable law.
        </p>
      </Section>
    </PageShell>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="mt-10 first:mt-0">
      <h2 className="text-lg font-semibold text-giants border-b border-[#27272a] pb-2 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}
