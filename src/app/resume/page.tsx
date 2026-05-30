import "@/app/kinetic.css";
import Link from "next/link";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import KineticNav from "@/components/kinetic/KineticNav";
import CountUp from "@/components/kinetic/CountUp";

export const metadata: Metadata = {
  title: "Resume | Dan Hoeller | Kinetic Brand Partners",
  description:
    "Professional resume - P&L-focused marketing executive with 15+ years driving growth, brand transformation, and digital innovation.",
};

function Metric({
  value,
  prefix,
  suffix,
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="metric">
      <div className="v">
        <CountUp value={value} prefix={prefix} suffix={suffix} />
      </div>
      <div className="l">{label}</div>
    </div>
  );
}

export default function Resume() {
  return (
    <div className="kinetic-light">
      <ScrollReveal />
      <KineticNav active="/resume" />

      <main>
        <header
          className="r-hero"
          style={{ padding: "5rem 0 2.5rem", borderBottom: "1px solid var(--hair)" }}
        >
          <div className="container">
            <div className="eyebrow">Resume</div>
            <h1 className="r-name">Dan Hoeller</h1>
            <p style={{ color: "var(--muted)" }}>
              Atlanta, GA ·{" "}
              <a
                href="https://linkedin.com/in/danhoeller"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)" }}
              >
                linkedin.com/in/danhoeller
              </a>
            </p>
            <div
              className="no-print"
              style={{ display: "flex", gap: ".8rem", marginTop: "1.8rem", flexWrap: "wrap" }}
            >
              <a className="btn" href="/resume/Dan-Hoeller-Resume.pdf" download>
                Download Resume PDF
              </a>
              <Link className="btn ghost" href="/#contact">
                Get in Touch
              </Link>
            </div>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="alt">
          <div className="container">
            <h2 className="sec-title" data-reveal>Executive Summary</h2>
            <p className="summary" data-reveal>
              Marketing executive with 15+ years connecting marketing investments
              to revenue outcomes across B2B2C, CPG, and B2B markets. Grew a
              $250MM brand at 4&times; the category rate, unlocked $7MM in
              incremental retail revenue, and improved marketing efficiency 25%
              &mdash; with P&amp;L management at J&amp;J, commercial leadership at
              Central Garden &amp; Pet, and a technical foundation built at
              Manhattan Associates.
            </p>
            <div className="metrics" data-reveal>
              <Metric value={250} prefix="$" suffix="MM" label="Brand grown 4× category rate" />
              <Metric value={7} prefix="$" suffix="MM" label="Incremental retail revenue" />
              <Metric value={25} prefix="+" suffix="%" label="Marketing efficiency" />
              <div className="metric">
                <div className="v"><span className="em">2×</span></div>
                <div className="l">Clio Sports Award winner</div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Competencies */}
        <section>
          <div className="container">
            <h2 className="sec-title" data-reveal>Core Competencies</h2>
            <div className="grid">
              <div className="card" data-reveal>
                <h3>Strategic Perspective</h3>
                <p>Strategic Planning · Marketing Strategy · GTM (B2B2C, Omnichannel, DTC) · Innovation</p>
              </div>
              <div className="card" data-reveal>
                <h3>Financial Management &amp; Performance</h3>
                <p>P&amp;L Management · Revenue &amp; Margin Growth · Pricing · Scenario Planning</p>
              </div>
              <div className="card" data-reveal>
                <h3>Brand &amp; Marketing Execution</h3>
                <p>Brand Architecture &amp; Visual Identity · Performance Marketing · Marketing Insights · Creative Development · Digital Transformation · MarTech · Agency Management</p>
              </div>
              <div className="card" data-reveal>
                <h3>Leadership &amp; Team Development</h3>
                <p>Cross-functional Leadership · Change Management · Servant Leadership</p>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="alt">
          <div className="container">
            <h2 className="sec-title" data-reveal>Professional Experience</h2>
            <div className="exp">
              <div className="exp-company" data-reveal>
                <div className="exp-head">
                  <span className="exp-co">Central Garden &amp; Pet</span>
                  <span className="exp-yrs">2013–2024 · Atlanta, GA</span>
                </div>
                <p className="exp-desc">
                  $3B+ manufacturer + distributor of lawn, garden, and pet
                  supplies. Member of Central Leadership Council; managed 25 people
                  across Insights, Innovation, Digital, Creative, Customer
                  Marketing, and Customer Care.
                </p>
                <div className="role">
                  <div className="role-title">SVP of Marketing: Garden Segment</div>
                  <div className="role-yrs">Nov 2019 – Oct 2024</div>
                  <ul>
                    <li><strong>Brand Transformation:</strong> Grew the $250MM Pennington brand 8.2% in 2024 — 4× the category growth rate — via positioning, visual identity, and product development.</li>
                    <li><strong>Award-Winning Creative:</strong> Created and led #FlipTheTurf — 3.95B media impressions, two Clio Sports Awards, +10pt brand awareness.</li>
                    <li><strong>New Product Launches:</strong> Multi-year innovation pipeline launching $20MM+ in category-leading solutions annually.</li>
                    <li><strong>Digital Transformation:</strong> Built top-tier PDPs (Salsify, Vizit) earning retailer “Best in Class” recognition.</li>
                  </ul>
                </div>
                <div className="role">
                  <div className="role-title">VP of Marketing: Garden Segment</div>
                  <div className="role-yrs">Nov 2017 – Nov 2019</div>
                  <ul>
                    <li><strong>Revenue Growth:</strong> Secured $7MM incremental revenue with The Home Depot via executive-level negotiation.</li>
                    <li><strong>Marketing Effectiveness:</strong> MMM + real-time KPI dashboards delivered a 25% efficiency increase.</li>
                    <li><strong>Partnership Expansion:</strong> Expanded MLB partnership to 9 teams, driving in-store traffic.</li>
                  </ul>
                </div>
                <div className="role">
                  <div className="role-title">Senior Director / Director of Marketing: Grass Seed BU</div>
                  <div className="role-yrs">Apr 2013 – Nov 2017</div>
                  <ul>
                    <li><strong>Financial Performance:</strong> 98.8% EBIT growth in 2016, +12% in 2017 via margin-accretive launches and price optimization.</li>
                    <li><strong>Product Innovation:</strong> Best-in-category grass repair product drove sales +36.7% at +840bp higher margins.</li>
                  </ul>
                </div>
              </div>

              <div className="exp-company" data-reveal>
                <div className="exp-head">
                  <span className="exp-co">Johnson &amp; Johnson</span>
                  <span className="exp-yrs">2006–2013 · Raritan / Skillman, NJ</span>
                </div>
                <p className="exp-desc">
                  Consumer and Medical Device divisions; managed P&amp;Ls, brand
                  strategy, new product development, campaigns, forecasting, and
                  reporting.
                </p>
                <div className="role">
                  <div className="role-title">Brand Manager / Asst. Product Director: Baby Care</div>
                  <div className="role-yrs">Jul 2006 – Jul 2010</div>
                  <ul>
                    <li><strong>P&amp;L Management:</strong> Owned ~$80MM portfolio incl. the $40MM Baby Shampoo business; grew Baby Oil 9.8%, Baby Powder 5.2%.</li>
                    <li><strong>Award-Winning Marketing:</strong> Led “Thanks, Mom” — 290MM impressions, J&amp;J Global Burke Award.</li>
                  </ul>
                </div>
                <div className="role">
                  <div className="role-title">Brand Manager: Consumer Healthcare</div>
                  <div className="role-yrs">Jul 2010 – May 2012</div>
                  <ul>
                    <li><strong>P&amp;L Management:</strong> Managed $60MM Tucks &amp; ept P&amp;Ls; reversed a multi-year decline, growing Tucks 26.8%.</li>
                  </ul>
                </div>
              </div>

              <div className="exp-company" data-reveal>
                <div className="exp-head">
                  <span className="exp-co">Manhattan Associates</span>
                  <span className="exp-yrs">1999–2004 · Atlanta, GA</span>
                </div>
                <p className="exp-desc">
                  Enterprise supply chain software; led design, testing,
                  implementation, and support projects.
                </p>
                <div className="role">
                  <div className="role-title">Manager / Senior Consultant: Implementation Services</div>
                  <div className="role-yrs">Mar 1999 – Jun 2004</div>
                  <ul>
                    <li><strong>Enterprise Implementations:</strong> WMS projects for Fortune 500 clients incl. Michelin and Bic; international work at The Diamond Trading Company (DeBeers), London.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <div className="container">
            <h2 className="sec-title" data-reveal>Education</h2>
            <div className="edu">
              <div className="edu-item" data-reveal>
                <strong>University of Virginia · Darden School of Business</strong>
                <span className="deg">Master of Business Administration (MBA)</span>
              </div>
              <div className="edu-item" data-reveal>
                <strong>Clemson University</strong>
                <span className="deg">Bachelor of Science, Management</span>
                <span className="note">Co-captain and four-year Letterman on the varsity swim team; earned a scholarship as a walk-on athlete.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Other Activities */}
        <section className="alt">
          <div className="container">
            <h2 className="sec-title" data-reveal>Other Activities</h2>
            <div className="grid">
              <div className="card" data-reveal>
                <h3>Memberships</h3>
                <p>CMO Collaborative · Southern Off-Road Bicycle Association (SORBA)</p>
              </div>
              <div className="card" data-reveal>
                <h3>Athletics &amp; Interests</h3>
                <p>Triathlete and Ironman finisher. Avid road and MTB cyclist. Active AI builder — personal CRM, marketing automations (Zapier, n8n), and multiple AI-assisted websites built with Claude Code.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="no-print" style={{ textAlign: "center", borderBottom: "none" }}>
          <div className="container">
            <a className="btn" href="/resume/Dan-Hoeller-Resume.pdf" download>
              Download Resume PDF
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
