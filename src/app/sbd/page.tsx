// Stanley Black & Decker Candidate Page
// Live at: kineticbrandpartners.com/sbd

import GradientMesh from "@/components/GradientMesh";
import CalendlyButton from "@/components/CalendlyButton";
import SBDSlash from "@/components/SBDSlash";
import SBDMobileMenu from "@/components/SBDMobileMenu";
import "./page.css";

export const metadata = {
  title: "Stanley Black & Decker | Dan Hoeller",
  description:
    "VP Marketing Activation candidate page for Stanley Black & Decker. Dan Hoeller brings 15 years of brand and business leadership across Fortune 50 and Fortune 1000 companies.",
  icons: {
    icon: "/sbd/sbd-logo-yellow-stacked.png",
  },
};

export default function SBDPage() {
  return (
    <div className="kinetic-page company-page sbd-page">
      <GradientMesh />

      {/* Sticky Nav */}
      <header className="kinetic-header sbd-nav">
        <div className="kinetic-container sbd-nav-inner">
          <a href="#" aria-label="Stanley Black & Decker — back to top">
            <img
              src="/sbd/SBD_Yellow_Primary.png"
              alt="Stanley Black & Decker"
              height={36}
              className="sbd-nav-logo sbd-nav-logo--desktop"
            />
            <img
              src="/sbd/sbd-logo-yellow-stacked.webp"
              alt="Stanley Black & Decker"
              height={40}
              className="sbd-nav-logo sbd-nav-logo--mobile"
            />
          </a>
          <div className="sbd-nav-links">
            <a href="#why-sbd" className="sbd-nav-link">Why SBD</a>
            <a href="#what-i-bring" className="sbd-nav-link">What I Bring</a>
            <a href="#work" className="sbd-nav-link">Work</a>
            <a href="#background" className="sbd-nav-link">Background</a>
            <a href="#contact" className="sbd-nav-link sbd-nav-link--cta">Let's Talk</a>
          </div>
          <SBDMobileMenu />
        </div>
      </header>

      <main style={{ paddingTop: "72px" }}>

        {/* ===== SECTION 1: HERO ===== */}
        <section className="mb-hero">
          <div className="kinetic-container">
            <div className="mb-hero-grid">
              <div className="mb-hero-content">

                <div className="kinetic-badge animate-slide-up delay-1" style={{ marginBottom: "1.25rem" }}>
                  <span className="kinetic-badge-dot"></span>
                  VP Marketing Activation Candidate · Atlanta, GA
                </div>
                <div className="sbd-hero-slash-wrapper">
                  <SBDSlash />
                  <div className="sbd-title-block animate-slide-up delay-2">
                    <h1 className="mb-title">
                      Marketing that{" "}
                      <span className="kinetic-title-gradient">
                        moves the business
                      </span>
                    </h1>
                  </div>
                  <p className="mb-subtitle animate-slide-up delay-3">
                    15 years running marketing at Fortune 50 and Fortune 1000 companies. Deep in retail channel strategy, comfortable with big media budgets, and allergic to activation that can't explain what it's actually doing for the business.
                  </p>
                  <div className="mb-cta-group animate-slide-up delay-4">
                    <CalendlyButton className="kinetic-btn kinetic-btn--primary">
                      Schedule a Meeting
                    </CalendlyButton>
                    <a href="mailto:danhoeller@gmail.com" className="kinetic-btn kinetic-btn--secondary">
                      Send an Email
                    </a>
                    <a href="https://linkedin.com/in/danhoeller" target="_blank" rel="noopener noreferrer" className="kinetic-btn kinetic-btn--secondary">
                      View LinkedIn →
                    </a>
                  </div>
                </div>
              </div>
              <div className="mb-hero-visual animate-scale-in delay-3">
                <div className="mb-image-container">
                  <div className="mb-image-glow"></div>
                  <img
                    src="/images/DJH-CGPT-Sketch.webp"
                    srcSet="/images/DJH-CGPT-Sketch-mobile.webp 320w, /images/DJH-CGPT-Sketch-medium.webp 280w, /images/DJH-CGPT-Sketch.webp 533w"
                    sizes="(max-width: 640px) 85vw, (max-width: 968px) 280px, 400px"
                    alt="Dan Hoeller"
                    width={400}
                    height={530}
                    className="mb-headshot"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ===== SECTION 2: WHY SBD / PAIN POINTS ===== */}
        <section id="why-sbd" className="kinetic-section kinetic-section--gray">
          <div className="kinetic-container">
            <div className="kinetic-section-header">
              <span className="kinetic-section-badge">The Conversation</span>
              <h2 className="kinetic-section-title">Why Stanley Black & Decker</h2>
            </div>
            <p className="mb-subtitle" style={{ marginBottom: "2rem" }}>
              The new CEO built his career in Tools and Outdoor. The board just added Diageo and Advance Auto Parts experience at the top. DEWALT has grown eight quarters running. That context matters: the activation leader stepping into this role isn't defending a status quo. They're building for momentum that's already moving.
            </p>

            <div className="qa-accordion">

              <details className="qa-item">
                <summary className="qa-question">
                  Demand Stimulation Under Pricing Pressure
                </summary>
                <div className="qa-answer">
                  <p>
                    With roughly $800M in tariff headwinds hitting in 2026 and prices rising to offset them, the business needs marketing that creates pull demand — not just shelf presence. When the price goes up, the brand equity has to go up with it.
                  </p>
                  <p>
                    The first instinct isn't to spend more; it's to spend smarter. That means tying every activation investment back to a demand signal — store traffic, brand preference scores, retailer sell-through. At Central Garden &amp; Pet, when commodity cost pressure hit lawn and garden categories, I used Marketing Mix Modeling to identify which spend was actually generating volume versus what was maintaining visibility. We reallocated accordingly and captured 25% efficiency gains without cutting coverage.
                  </p>
                  <p>
                    Same instinct here: before the plan gets built, we should agree on what it's supposed to move. Volume, brand preference, trial, retailer sell-through. Pick the thing. Then build back from it.
                  </p>
                </div>
              </details>

              <details className="qa-item">
                <summary className="qa-question">
                  Connecting a Fragmented Path to Purchase
                </summary>
                <div className="qa-answer">
                  <p>
                    The role spans retail, independent distribution, e-commerce, and trade professional channels — each with different buyers, different messaging needs, and different success metrics. The challenge isn't running four separate programs; it's building one integrated activation architecture that works coherently across all of them while staying tuned to what each channel needs.
                  </p>
                  <p>
                    Integration doesn't mean uniformity. The pro end-user and the weekend DIYer have different purchase triggers and different paths. The framework I'd use starts with brand strategy at the center — what does this brand mean, and why does it matter — then translates that into channel-specific activation that feels native to each context.
                  </p>
                  <p>
                    At Central Garden &amp; Pet, I ran this across brick-and-mortar, e-commerce, and trade channels simultaneously for a multi-brand portfolio. The $7MM in incremental revenue from a Home Depot retail pitch came from treating the retailer as both a media and distribution partner, not just a shelf.
                  </p>
                </div>
              </details>

              <details className="qa-item">
                <summary className="qa-question">
                  Making Media Investment Accountable
                </summary>
                <div className="qa-answer">
                  <p>
                    The role manages a complex budget ecosystem: marketing-directed working media, retail media, and performance budgets inside commercial accounts. That's a lot of places for spend to look productive without being productive. The hiring manager needs confidence that whoever runs this will treat the media budget like a business investment, not a line item.
                  </p>
                  <p>
                    Media accountability starts before the plan is approved. I build KPI frameworks that tie spend to measurable business outcomes — not just reach and frequency. Retail media specifically lives at the intersection of brand and shopper, and attribution models in that space are messier than anyone admits. My approach: clear hypotheses about what the spend is supposed to do, measurement infrastructure built before launch, and honest post-analysis that actually changes the next plan.
                  </p>
                  <p>
                    Real-time performance dashboards I built at Central Garden &amp; Pet let us course-correct mid-campaign instead of waiting for post-mortems. That's the expectation I'd set here.
                  </p>
                </div>
              </details>

            </div>
          </div>
        </section>


        {/* ===== SECTION 3: WHAT I BRING ===== */}
        <section id="what-i-bring" className="kinetic-section">
          <div className="kinetic-container">
            <div className="kinetic-section-header">
              <span className="kinetic-section-badge">Capabilities</span>
              <h2 className="kinetic-section-title">What I Bring</h2>
            </div>
            <p className="mb-subtitle" style={{ marginBottom: "2rem" }}>
              If marketing can't explain what it did for the business, it won't get the budget it needs next year. These are the capabilities I'd put to work at SBD.
            </p>
            <dl className="mb-capability-list">
              <div className="mb-capability-row">
                <dt>Leadership &amp; Scale</dt>
                <dd>Led a 25-person marketing organization spanning Consumer Insights, Digital, Creative, Innovation, and Customer Marketing. Player-coach style: sets enterprise strategy and gives meaningful creative feedback without micromanaging.</dd>
              </div>
              <div className="mb-capability-row">
                <dt>Retail Channel Expertise</dt>
                <dd>Big-box home center and independent retail: shopper marketing, in-store activation, joint business planning, and retail media. Won Walmart distribution; drove $7MM in incremental revenue with Home Depot by treating the retailer as a media and distribution partner simultaneously.</dd>
              </div>
              <div className="mb-capability-row">
                <dt>Media Accountability</dt>
                <dd>Marketing Mix Modeling, attribution frameworks, KPI dashboards that connect spend to EBIT. 25% efficiency gains through rigorous optimization. Real-time reporting built before launch so course correction happens mid-campaign, not in the post-mortem.</dd>
              </div>
              <div className="mb-capability-row">
                <dt>Digital &amp; Social</dt>
                <dd>Social strategy, influencer selection, performance marketing, e-commerce go-to-market. "Best in Class" digital recognition from retail partners. Comfortable with the attribution gap between retail media and brand spend — and honest about what can and can't be measured.</dd>
              </div>
              <div className="mb-capability-row">
                <dt>Integrated Activation</dt>
                <dd>Clio Award-winning campaigns built on real business problems, not creative ambition. 3.95B impressions, 10-point brand awareness lifts, 8.2% revenue growth. Creative that earns its budget because the brief was right before the brief went to the agency.</dd>
              </div>
              <div className="mb-capability-row">
                <dt>Cross-Functional Partnership</dt>
                <dd>Deep experience working across Sales, Product, Category, and Finance to connect marketing plans to commercial objectives. Built operating rhythms in matrixed organizations. Agency selection and accountability included.</dd>
              </div>
            </dl>
          </div>
        </section>


        {/* ===== SECTION 4: SELECTED WORK ===== */}
        <section id="work" className="kinetic-section kinetic-section--gray">
          <div className="kinetic-container">
            <div className="kinetic-section-header">
              <span className="kinetic-section-badge">Selected Work</span>
              <h2 className="kinetic-section-title">Making An Impact On The Business</h2>
            </div>
            <p className="mb-subtitle" style={{ marginBottom: "2.5rem" }}>
              These aren't creative showcases. They're examples of activation built on a real business problem — with the revenue or share numbers to show it worked.
            </p>

            {/* Campaign 1: #FlipTheTurf */}
            <div className="campaign-card" style={{ marginBottom: "3rem" }}>
              <div className="campaign-header">
                <h2 className="campaign-title">#FlipTheTurf</h2>
                <p className="campaign-meta">Central Garden &amp; Pet · Pennington Grass Seed</p>
              </div>
              <p className="campaign-description">
                <strong>The Business Problem:</strong> Pennington Grass Seed was stuck in a low-involvement category with no path to earned attention or category growth. The brief: find a platform that could move brand metrics and revenue, not just run ads.
              </p>
              <p className="campaign-description">
                <strong>The Outcome:</strong> 8.2% revenue growth on the brand, 4x the category rate. 3.95 billion impressions, 10-point brand awareness lift, $7MM in incremental Home Depot revenue tied directly to campaign momentum. The creative vehicle was a Von Miller anti-turf campaign designed to get banned by the NFL — which it was, turning league censorship into free media. But the brief was always business growth, not awards.
              </p>
              <div className="campaign-media-grid campaign-media-grid--2col">
                <div className="media-item">
                  <h3 className="media-item-title">Banned Ad</h3>
                  <div className="media-wrapper">
                    <video controls className="media-video" poster="/Videos/FTT-banned-ad-poster.webp" preload="none">
                      <source src="/Videos/FTT-banned-ad.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
                <div className="media-item">
                  <h3 className="media-item-title">Campaign Summary</h3>
                  <div className="media-wrapper">
                    <video controls className="media-video" poster="/Videos/FTT-summary-video-poster.webp" preload="none">
                      <source src="/Videos/FTT-summary-video.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
              <img
                src="/Videos/FTT-summary-slide.webp"
                alt="FlipTheTurf Campaign Results Summary"
                width={640}
                height={454}
                className="campaign-image-full"
                loading="lazy"
                decoding="async"
              />
              <div className="campaign-results">
                <h3 className="results-title">The Impact</h3>
                <div className="results-grid">
                  <div className="result-stat">
                    <div className="result-stat-value">3.95B</div>
                    <div className="result-stat-label">Impressions</div>
                  </div>
                  <div className="result-stat">
                    <div className="result-stat-value">31K+</div>
                    <div className="result-stat-label">Petition Signatures</div>
                  </div>
                  <div className="result-stat">
                    <div className="result-stat-value">2x</div>
                    <div className="result-stat-label">Clio Award Winner</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign 2: Full Season Fertilizer */}
            <div className="campaign-card" style={{ marginBottom: "3rem" }}>
              <div className="campaign-header">
                <h2 className="campaign-title">Pennington Full Season Fertilizer</h2>
                <p className="campaign-meta">Central Garden &amp; Pet · Product Innovation</p>
              </div>
              <p className="campaign-description">
                <strong>The Business Problem:</strong> Category leader Scotts owned the 4-step program. Pennington needed a way into a segment Scotts had left underserved: Millennial homeowners who didn't want the complexity.
              </p>
              <p className="campaign-description">
                <strong>The Outcome:</strong> Built the consumer insight into a product brief, led cross-functional development, built the Walmart business case, and won distribution. Post-launch Walmart data showed Full Season indexed #1 with Millennial shoppers vs. competition — 8.2% brand growth, 4x category rate, and a platform that enabled multi-SKU expansion.
              </p>
              <div className="campaign-media-grid campaign-media-grid--2col">
                <div className="media-item">
                  <h3 className="media-item-title">Brand Campaign :30</h3>
                  <div className="media-wrapper">
                    <video controls className="media-video" poster="/Videos/GFANA_Hero30_MP4-poster.webp" preload="none" playsInline>
                      <source src="/Videos/GFANA_Hero30_MP4.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
                <div className="media-item">
                  <h3 className="media-item-title">Full Season Fertilizer :15</h3>
                  <div className="media-wrapper">
                    <video controls className="media-video" poster="/Videos/GFANA_FERT15-poster.jpg" preload="none" playsInline>
                      <source src="/Videos/GFANA_FERT15.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
              <div className="campaign-results">
                <h3 className="results-title">The Impact</h3>
                <div className="results-grid">
                  <div className="result-stat">
                    <div className="result-stat-value">8.2%</div>
                    <div className="result-stat-label">Brand Growth (4x Category Rate)</div>
                  </div>
                  <div className="result-stat">
                    <div className="result-stat-value">#1</div>
                    <div className="result-stat-label">Millennial Appeal vs. Competition (Walmart Data)</div>
                  </div>
                  <div className="result-stat">
                    <div className="result-stat-value">Multi-SKU</div>
                    <div className="result-stat-label">Platform Expansion Enabled</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign 3: Thanks Mom */}
            <div className="campaign-card">
              <div className="campaign-header">
                <h2 className="campaign-title">Johnson's Baby — Thanks, Mom</h2>
                <p className="campaign-meta">Johnson &amp; Johnson · Baby Care</p>
              </div>
              <p className="campaign-description">
                <strong>The Business Problem:</strong> Private label was encroaching on a commoditized baby care aisle. Johnson's Baby needed emotional differentiation that translated to shelf conversion — not just awareness.
              </p>
              <p className="campaign-description">
                <strong>The Outcome:</strong> 9.8% sales growth on a $400MM P&L. 290MM impressions. The activation strategy tied an Olympic platform ("Thanks, Mom") to sustained digital and print campaigns reinforcing the mother-baby bond. The campaign worked well enough that Debbie Phelps asked to be included — unprompted. The P&L result is what mattered; the creative recognition (J&J Global Burke Award) confirmed the work was built on the right insight.
              </p>
              <div className="campaign-media-grid campaign-media-grid--3col">
                <div className="media-item">
                  <h3 className="media-item-title">Thanks Mom — Cullen</h3>
                  <div className="media-wrapper">
                    <video controls className="media-video" poster="/Videos/Thanks-Mom-Cullen-poster.jpg" preload="none">
                      <source src="/Videos/Thanks-Mom-Cullen.2.mp4#t=4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div style={{ marginTop: "2rem" }}>
                    <h3 className="media-item-title">Thanks Mom — Debbie</h3>
                    <div className="media-wrapper">
                      <video controls className="media-video" poster="/Videos/Thanks-Mom-Debbie-poster.jpg" preload="none">
                        <source src="/Videos/Thanks-Mom-Debbie.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
                <div className="media-item">
                  <h3 className="media-item-title">Gold Shampoo</h3>
                  <div className="media-wrapper">
                    <img src="/images/Gold-shampoo.webp" alt="Johnson's Baby Gold Shampoo Campaign" width={400} height={533} className="media-image" loading="lazy" decoding="async" />
                  </div>
                </div>
                <div className="media-item">
                  <h3 className="media-item-title">Pink Lotion</h3>
                  <div className="media-wrapper">
                    <img src="/images/Pink-lotion.webp" alt="Johnson's Baby Pink Lotion Campaign" width={510} height={661} className="media-image" loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>
              <div className="campaign-results">
                <h3 className="results-title">The Impact</h3>
                <div className="results-grid">
                  <div className="result-stat">
                    <div className="result-stat-value">$400MM</div>
                    <div className="result-stat-label">Portfolio P&amp;L</div>
                  </div>
                  <div className="result-stat">
                    <div className="result-stat-value">9.8%</div>
                    <div className="result-stat-label">Sales Growth</div>
                  </div>
                  <div className="result-stat">
                    <div className="result-stat-value">290MM</div>
                    <div className="result-stat-label">Impressions</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ===== SECTION 5: BACKGROUND ===== */}
        <section id="background" className="kinetic-section">
          <div className="kinetic-container">
            <div className="kinetic-section-header">
              <span className="kinetic-section-badge">Experience</span>
              <h2 className="kinetic-section-title">Background</h2>
            </div>

            <div className="mb-experience-grid">

              {/* Central Garden & Pet */}
              <div className="mb-exp-card">
                <div className="mb-exp-logo-wrap">
                  <img src="/logos/central-garden-pet.svg" alt="Central Garden & Pet" width={160} height={58} loading="lazy" decoding="async" />
                </div>
                <div className="mb-exp-content">
                  <h3>Central Garden &amp; Pet</h3>
                  <p className="mb-exp-role">SVP Marketing · 11 years</p>
                  <p className="mb-exp-desc">Led marketing for the $1.5B Garden segment. Led a 25-person team spanning Consumer Insights, Digital, Creative, Innovation, Customer Marketing, and Customer Care. Full responsibility for brand development and marketing plans across a multi-brand portfolio.</p>
                </div>
              </div>

              {/* Johnson & Johnson */}
              <div className="mb-exp-card">
                <div className="mb-exp-logo-wrap">
                  <img src="/logos/jnj.svg" alt="Johnson & Johnson" width={160} height={29} loading="lazy" decoding="async" />
                </div>
                <div className="mb-exp-content">
                  <h3>Johnson &amp; Johnson</h3>
                  <p className="mb-exp-role">Brand Management · 7 years</p>
                  <p className="mb-exp-desc">Consumer and Medical Device divisions. Multiple brands, $80MM+ portfolio responsibility. Award-winning campaigns including the "Thanks, Mom" Olympic campaign — the J&amp;J Global Burke Award winner.</p>
                </div>
              </div>

              {/* Manhattan Associates */}
              <div className="mb-exp-card">
                <div className="mb-exp-logo-wrap">
                  <img
                    src="/logos/manhattan-associates-sm.webp"
                    alt="Manhattan Associates"
                    width={140}
                    height={35}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="mb-exp-content">
                  <h3>Manhattan Associates</h3>
                  <p className="mb-exp-role">Enterprise Tech · 5 years</p>
                  <p className="mb-exp-desc">Supply chain software implementations for Fortune 500 clients. Built the business and operational foundation that makes financial fluency feel natural rather than aspirational.</p>
                </div>
              </div>

            </div>

            {/* Education */}
            <div className="mb-education-row" style={{ marginTop: "2.5rem" }}>
              <div className="mb-edu-card">
                <div className="mb-edu-logo">
                  <img src="/logos/uva-darden.png" alt="UVA Darden" width={64} height={64} />
                </div>
                <div className="mb-edu-text">
                  <strong>MBA</strong>
                  University of Virginia, Darden School of Business
                </div>
              </div>
              <div className="mb-edu-card">
                <div className="mb-edu-logo">
                  <img src="/logos/clemson.png" alt="Clemson University" width={64} height={64} />
                </div>
                <div className="mb-edu-text">
                  <strong>BS, Management</strong>
                  Clemson University · Walk-on swimmer, 4-year letterman, co-captain
                </div>
              </div>
            </div>

            {/* Awards */}
            <div className="mb-education-row" style={{ marginTop: "1.5rem" }}>
              <div className="mb-edu-card">
                <div className="mb-edu-logo" style={{ fontSize: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  🏆
                </div>
                <div className="mb-edu-text">
                  <strong>Two Clio Sports Awards</strong>
                  #FlipTheTurf Campaign · Central Garden &amp; Pet / Pennington Grass Seed
                </div>
              </div>
              <div className="mb-edu-card">
                <div className="mb-edu-logo" style={{ fontSize: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  🏆
                </div>
                <div className="mb-edu-text">
                  <strong>J&amp;J Global Burke Award</strong>
                  Thanks, Mom Campaign · Johnson &amp; Johnson Baby Care
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ===== SECTION 6: SIDE PROJECTS ===== */}
        <section className="kinetic-section kinetic-section--gray">
          <div className="kinetic-container">
            <div className="kinetic-section-header">
              <span className="kinetic-section-badge">Side Projects</span>
              <h2 className="kinetic-section-title">Building on the Side</h2>
            </div>
            <p className="mb-subtitle" style={{ marginBottom: "1rem" }}>
              I don't take AI courses. I build things with it. These run on actual servers — not demos, not tutorials.
            </p>
            <div className="about-projects-grid">

              <div className="kinetic-card">
                <div className="about-project-favicon">
                  <img src="/raceprep-favicon.png" alt="RacePrep" width={48} height={48} />
                </div>
                <h3 className="about-project-title">RacePrep</h3>
                <p className="about-project-desc">
                  A triathlon training app built to surface swim, bike, and run data beyond what Strava shows. Taught me relational data design and the discipline of building something people actually use.
                </p>
                <div className="about-project-tech">
                  <span>Next.js</span>
                  <span>Supabase</span>
                  <span>TypeScript</span>
                  <span>APIs</span>
                </div>
                <a href="https://raceprep.kineticbrandpartners.com/" className="kinetic-btn kinetic-btn--secondary" target="_blank" rel="noopener noreferrer">
                  View Live &rarr;
                </a>
              </div>

              <div className="kinetic-card">
                <div className="about-project-favicon">
                  <img src="/job-tracker-favicon.webp" alt="Job Tracker" width={48} height={48} />
                </div>
                <h3 className="about-project-title">Job Tracker</h3>
                <p className="about-project-desc">
                  A CRM-style job search tool I built to track every contact and connection in one place. Job hunting is a sales process; I wanted a tool that treated it like one.
                </p>
                <div className="about-project-tech">
                  <span>Next.js</span>
                  <span>Supabase</span>
                  <span>OAuth</span>
                  <span>n8n</span>
                </div>
                <a href="https://job-tracker.kineticbrandpartners.com/" className="kinetic-btn kinetic-btn--secondary" target="_blank" rel="noopener noreferrer">
                  View Live &rarr;
                </a>
              </div>

              <div className="kinetic-card">
                <div className="about-project-favicon">
                  <img src="/saas-favicon.svg" alt="SaaS Metrics Calculator" width={48} height={48} />
                </div>
                <h3 className="about-project-title">SaaS Metrics Calculator</h3>
                <p className="about-project-desc">
                  A dashboard for modeling SaaS KPIs and seeing how they respond to different assumptions. Built to understand the financial mechanics of subscription businesses from the inside.
                </p>
                <div className="about-project-tech">
                  <span>Next.js</span>
                  <span>TypeScript</span>
                  <span>Netlify</span>
                </div>
                <a href="https://saas-metrics-calculator.netlify.app/" className="kinetic-btn kinetic-btn--secondary" target="_blank" rel="noopener noreferrer">
                  View Live &rarr;
                </a>
              </div>

            </div>
          </div>
        </section>


        {/* ===== SECTION 8: CONTACT ===== */}
        <section id="contact" className="kinetic-section">
          <div className="kinetic-container" style={{ textAlign: "center" }}>
            <div className="kinetic-section-header" style={{ justifyContent: "center" }}>
              <span className="kinetic-section-badge">Let's Talk</span>
              <h2 className="kinetic-section-title">Ready When You Are</h2>
            </div>
            <p className="mb-subtitle" style={{ maxWidth: "540px", margin: "0 auto 2rem" }}>
              Pick a time below, or just send a note. Either way, you'll hear back the same day.
            </p>
            <div className="mb-cta-group" style={{ justifyContent: "center" }}>
              <CalendlyButton className="kinetic-btn kinetic-btn--primary">
                Schedule 30 Min
              </CalendlyButton>
              <a href="mailto:danhoeller@gmail.com" className="kinetic-btn kinetic-btn--secondary">
                Send an Email
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
