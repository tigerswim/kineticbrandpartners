// Earnix-branded Work page
// Showcases relevant marketing campaigns and results

"use client";

import Image from "next/image";
import {
  TrendingUp,
  Award,
  Target,
  Users,
  BarChart2,
} from "react-feather";
import GradientMesh from "@/components/GradientMesh";
import EarnixNav from "@/components/EarnixNav";
import "../../../styles/kinetic-design-system.css";
import "../../../styles/earnix.css";

export default function EarnixWorkPage() {
  return (
    <div className="kinetic-page earnix-page">
      <GradientMesh />
      <EarnixNav />

      <main>
        {/* Hero Section */}
        <section className="earnix-hero earnix-hero--work">
          <div className="kinetic-container">
            <div className="earnix-hero-content">
              <div className="earnix-logo-container animate-slide-up">
                <Image
                  src="/logos/Earnix_id_full.svg"
                  alt="Earnix"
                  width={200}
                  height={40}
                  className="earnix-logo"
                  priority
                />
              </div>
              <h1 className="earnix-hero-title animate-slide-up delay-1">
                Marketing{" "}
                <span className="earnix-title-gradient">Impact</span>
              </h1>
              <p className="earnix-hero-text animate-slide-up delay-2">
                Award-winning campaigns and successful product launches from 15+ years of
                P&amp;L-accountable marketing leadership.
              </p>
            </div>
          </div>
        </section>

        {/* Campaign 1: #FlipTheTurf */}
        <section className="kinetic-section earnix-campaign-section">
          <div className="kinetic-container">
            <div className="earnix-campaign-card">
              <div className="earnix-campaign-header">
                <div className="earnix-campaign-badge earnix-orange">
                  <Award size={20} />
                  <span>2x Clio Award Winner</span>
                </div>
                <h2 className="earnix-campaign-title">#FlipTheTurf</h2>
                <p className="earnix-campaign-meta">
                  Central Garden & Pet · Messaging
                </p>
              </div>

              <div className="earnix-campaign-challenge">
                <h3>The Challenge</h3>
                <p>
                  How do you make millions of homeowners care about grass seed, the 
                  ultimate low-involvement purchase? By connecting it to something they 
                  <i> do</i> care about. Social listening uncovered a national sports 
                  conversation around artificial turf injuries in the NFL.
                </p>
              </div>

              <div className="earnix-campaign-approach">
                <h3>The Approach</h3>
                <p>
                  Partnered with NFL star Von Miller on a deliberately provocative
                  anti-turf campaign designed to get banned by the league, turning
                  censorship into free media coverage and sparking a grassroots
                  movement.
                </p>
              </div>

              {/* Campaign Videos */}
              <div className="earnix-campaign-media-grid">
                <div className="earnix-media-item">
                  <h4 className="earnix-media-title">Banned Ad</h4>
                  <div className="earnix-media-wrapper">
                    <video
                      controls
                      className="earnix-media-video"
                      poster="/Videos/FTT-banned-ad-poster.jpg"
                      preload="none"
                    >
                      <source
                        src="/Videos/FTT-banned-ad.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>

                <div className="earnix-media-item">
                  <h4 className="earnix-media-title">Campaign Summary</h4>
                  <div className="earnix-media-wrapper">
                    <video
                      controls
                      className="earnix-media-video"
                      poster="/Videos/FTT-summary-video-poster.jpg"
                      preload="none"
                    >
                      <source
                        src="/Videos/FTT-summary-video.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="earnix-campaign-results">
                <h3 className="earnix-results-title">The Impact</h3>
                <div className="earnix-results-grid">
                  <div className="earnix-result-stat">
                    <div className="earnix-result-icon earnix-orange">
                      <TrendingUp size={24} />
                    </div>
                    <div className="earnix-result-value">3.95B</div>
                    <div className="earnix-result-label">Impressions</div>
                  </div>
                  <div className="earnix-result-stat">
                    <div className="earnix-result-icon earnix-teal">
                      <Users size={24} />
                    </div>
                    <div className="earnix-result-value">31K+</div>
                    <div className="earnix-result-label">Petition Signatures</div>
                  </div>
                  <div className="earnix-result-stat">
                    <div className="earnix-result-icon earnix-orange">
                      <Award size={24} />
                    </div>
                    <div className="earnix-result-value">2x</div>
                    <div className="earnix-result-label">Clio Awards</div>
                  </div>
                </div>
              </div>

              {/* Marketing Lessons */}
              <div className="earnix-campaign-lessons">
                <h3>Marketing Lessons Applicable to Earnix</h3>
                <ul className="earnix-lessons-list">
                  <li>
                    <strong>Provocative positioning</strong> - Painted artificial turf as the enemy 
                    to break through with consumers
                  </li>
                  <li>
                    <strong>Earned media strategy</strong> - Turned censorship into
                    3.95B impressions without a massive paid media budget
                  </li>
                  <li>
                    <strong>Grassroots momentum</strong> - Mobilized influencers (NFL players)
                    to amplify the message authentically
                  </li>
                  <li>
                    <strong>Data-driven storytelling</strong> - Used injury statistics to
                    build a credible, outcome-focused narrative
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Campaign 2: Full Season Fertilizer */}
        <section className="kinetic-section kinetic-section--gray earnix-campaign-section">
          <div className="kinetic-container">
            <div className="earnix-campaign-card">
              <div className="earnix-campaign-header">
                <div className="earnix-campaign-badge earnix-orange">
                  <TrendingUp size={20} />
                  <span>Insight-Driven Product Launch</span>
                </div>
                <h2 className="earnix-campaign-title">
                  Pennington Full Season Fertilizer
                </h2>
                <p className="earnix-campaign-meta">
                  Central Garden &amp; Pet · Product Innovation
                </p>
              </div>

              <div className="earnix-campaign-challenge">
                <h3>The Insight</h3>
                <p>
                  Research revealed a clear tension in the lawn care category: Millennial
                  homeowners didn&apos;t understand, and didn&apos;t want to commit to, the
                  traditional 4-step fertilizer program promoted by the category leader.
                  The complexity of seasonal applications was a barrier to purchase and
                  adoption, leaving a significant segment of homeowners underserved.
                </p>
              </div>

              <div className="earnix-campaign-approach">
                <h3>The Approach</h3>
                <p>
                  Used that insight to define and develop a genuinely differentiated product:
                  Full Season, a one-application-per-season fertilizer that eliminated the
                  complexity of multi-step programs entirely. Led the cross-functional
                  development and go-to-market strategy, positioning the product directly
                  against the unmet need. Brought the business case to Walmart and won
                  distribution of the product. After launch, Walmart&apos;s own sales data showed Full Season
                  indexed higher with Millennial shoppers than the competition. The initial
                  success created a platform for additional Full Season product extensions.
                </p>
              </div>

              {/* Campaign Videos */}
              <div className="earnix-campaign-media-grid">
                <div className="earnix-media-item">
                  <h4 className="earnix-media-title">Brand Campaign :30</h4>
                  <div className="earnix-media-wrapper">
                    <video
                      controls
                      className="earnix-media-video"
                      poster="/Videos/GFANA_Hero30_MP4-poster.jpg"
                      preload="none"
                      playsInline
                    >
                      <source src="/Videos/GFANA_Hero30_MP4.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>

                <div className="earnix-media-item">
                  <h4 className="earnix-media-title">Full Season Fertilizer :15</h4>
                  <div className="earnix-media-wrapper">
                    <video
                      controls
                      className="earnix-media-video"
                      poster="/Videos/GFANA_FERT15-poster.jpg"
                      preload="none"
                      playsInline
                    >
                      <source src="/Videos/GFANA_FERT15.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="earnix-campaign-results">
                <h3 className="earnix-results-title">The Impact</h3>
                <div className="earnix-results-grid">
                  <div className="earnix-result-stat">
                    <div className="earnix-result-icon earnix-orange">
                      <BarChart2 size={24} />
                    </div>
                    <div className="earnix-result-value">8.2%</div>
                    <div className="earnix-result-label">Brand Growth (4x Category Rate)</div>
                  </div>
                  <div className="earnix-result-stat">
                    <div className="earnix-result-icon earnix-teal">
                      <Users size={24} />
                    </div>
                    <div className="earnix-result-value">#1</div>
                    <div className="earnix-result-label">Millennial Appeal vs. Competition (Walmart Data)</div>
                  </div>
                  <div className="earnix-result-stat">
                    <div className="earnix-result-icon earnix-orange">
                      <TrendingUp size={24} />
                    </div>
                    <div className="earnix-result-value">Multi-SKU</div>
                    <div className="earnix-result-label">Platform Expansion Enabled</div>
                  </div>
                </div>
              </div>

              {/* Marketing Lessons */}
              <div className="earnix-campaign-lessons">
                <h3>Marketing Lessons Applicable to Earnix</h3>
                <ul className="earnix-lessons-list">
                  <li>
                    <strong>Insight-led product development</strong> — Identified an
                    underserved segment through research and built a product to meet it
                  </li>
                  <li>
                    <strong>Simplicity as differentiation</strong> — Solved a complexity
                    problem with a simpler product, directly countering the category
                    leader&apos;s approach
                  </li>
                  <li>
                    <strong>Retail partnership &amp; validation</strong> — Used customer
                    (Walmart) data to validate the positioning and build the business case
                    for expanded distribution
                  </li>
                  <li>
                    <strong>Platform thinking</strong> — Initial sales success created
                    a proven foundation for launching additional products
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key Capabilities Summary */}
      </main>
    </div>
  );
}
