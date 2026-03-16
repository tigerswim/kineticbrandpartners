// Work page - Marketing campaign portfolio

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GradientMesh from "@/components/GradientMesh";

export const metadata = {
  title: "Work - Kinetic Brand Partners",
  description:
    "Award-winning marketing campaigns and creative work by Dan Hoeller",
};

export default function WorkPage() {
  return (
    <div className="kinetic-page">
      <GradientMesh />
      <Header />

      <main>
        {/* Hero */}
        <section className="work-hero">
          <div className="kinetic-container">
            <p className="work-hero-eyebrow">Selected Work</p>
            <h1 className="work-hero-title">Impactful Marketing Campaigns</h1>
            <p className="work-hero-subtitle">
              From Clio-winning creative to data-driven digital campaigns,
              here's a selection of marketing work that delivered measurable
              impact and cultural resonance.
            </p>
          </div>
        </section>

        {/* Campaign 1: #FlipTheTurf */}
        <section className="kinetic-section kinetic-section--gray">
          <div className="kinetic-container">
            <div className="campaign-card">
              <div className="campaign-header">
                <h2 className="campaign-title">#FlipTheTurf</h2>
                <p className="campaign-meta">
                  Central Garden & Pet · Pennington Grass Seed
                </p>
              </div>

              <p className="campaign-description">
                <strong>The Challenge:</strong> Grass seed is the ultimate
                low-involvement purchase; "watching grass grow" defines boredom
                itself after all. Yet artificial turf was causing a surge in
                player injuries, and Pennington had no natural platform to enter
                the national sports conversation. The brand needed to make
                millions of people suddenly care about something they'd never
                thought twice about.
              </p>
              <p className="campaign-description">
                <strong>The Approach:</strong> Partner with NFL star Von Miller
                on a deliberately provocative anti-turf campaign designed to get
                banned by the league. This turned the NFL's censorship into free
                media coverage, sparking a grassroots movement among players and
                fans.
              </p>

              {/* Campaign Videos */}
              <div className="campaign-media-grid campaign-media-grid--2col">
                <div className="media-item">
                  <h3 className="media-item-title">Banned Ad</h3>
                  <div className="media-wrapper">
                    <video
                      controls
                      className="media-video"
                      poster="/Videos/FTT-banned-ad-poster.webp"
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

                <div className="media-item">
                  <h3 className="media-item-title">Campaign Summary</h3>
                  <div className="media-wrapper">
                    <video
                      controls
                      className="media-video"
                      poster="/Videos/FTT-summary-video-poster.webp"
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

              {/* Results Summary Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Videos/FTT-summary-slide.webp"
                alt="FlipTheTurf Campaign Results Summary"
                width={640}
                height={454}
                className="campaign-image-full"
                loading="lazy"
                decoding="async"
              />

              {/* Results */}
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
          </div>
        </section>

        {/* Campaign 2: Pennington Full Season Fertilizer */}
        <section className="kinetic-section">
          <div className="kinetic-container">
            <div className="campaign-card">
              <div className="campaign-header">
                <h2 className="campaign-title">Pennington Full Season Fertilizer</h2>
                <p className="campaign-meta">
                  Central Garden & Pet · Product Innovation
                </p>
              </div>

              <p className="campaign-description">
                <strong>The Insight:</strong> Research revealed a clear tension
                in the lawn care category: Millennial homeowners didn&apos;t
                understand, and didn&apos;t want to commit to, the traditional
                4-step fertilizer program promoted by the category leader. The
                complexity of seasonal applications was a barrier to purchase
                and adoption, leaving a significant segment of homeowners
                underserved.
              </p>
              <p className="campaign-description">
                <strong>The Approach:</strong> Used that insight to define and
                develop a genuinely differentiated product: Full Season, a
                one-application-per-season fertilizer that eliminated the
                complexity of multi-step programs entirely. Led the
                cross-functional development and go-to-market strategy,
                positioning the product directly against the unmet need. Brought
                the business case to Walmart and won distribution. After launch,
                Walmart&apos;s own sales data showed Full Season indexed higher
                with Millennial shoppers than the competition — creating a
                platform for additional product extensions.
              </p>

              {/* Videos */}
              <div className="campaign-media-grid campaign-media-grid--2col">
                <div className="media-item">
                  <h3 className="media-item-title">Brand Campaign :30</h3>
                  <div className="media-wrapper">
                    <video
                      controls
                      className="media-video"
                      poster="/Videos/GFANA_Hero30_MP4-poster.webp"
                      preload="none"
                      playsInline
                    >
                      <source
                        src="/Videos/GFANA_Hero30_MP4.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>

                <div className="media-item">
                  <h3 className="media-item-title">Full Season Fertilizer :15</h3>
                  <div className="media-wrapper">
                    <video
                      controls
                      className="media-video"
                      poster="/Videos/GFANA_FERT15-poster.jpg"
                      preload="none"
                      playsInline
                    >
                      <source
                        src="/Videos/GFANA_FERT15.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>

              {/* Results */}
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
          </div>
        </section>

        {/* Campaign 3: Johnson's Baby */}
        <section className="kinetic-section kinetic-section--gray">
          <div className="kinetic-container">
            <div className="campaign-card">
              <div className="campaign-header">
                <h2 className="campaign-title">Johnson's Baby</h2>
                <p className="campaign-meta">Johnson & Johnson · Baby Care</p>
              </div>

              <p className="campaign-description">
                <strong>The Challenge:</strong> In a commoditized baby care
                aisle, Johnson's Baby needed to reinforce its emotional equity.
              </p>
              <p className="campaign-description">
                <strong>The Approach:</strong> Take two paths. One, drive reach
                and relevance with "Thanks Mom," an Olympic campaign where
                athletes thanked their mothers on the world stage. The campaign
                was so compelling that Debbie Phelps, Michael Phelps' mom,{" "}
                <i>asked</i> to participate. Two, reinforce the brand's deep
                equity by highlighting the mother-baby bond outside the Olympics
                via emotional print campaigns and digital activations.
              </p>

              {/* Media Grid */}
              <div className="campaign-media-grid campaign-media-grid--3col">
                {/* Thanks Mom Videos */}
                <div className="media-item">
                  <h3 className="media-item-title">Thanks Mom - Cullen</h3>
                  <div className="media-wrapper">
                    <video
                      controls
                      className="media-video"
                      poster="/Videos/Thanks-Mom-Cullen-poster.jpg"
                      preload="none"
                    >
                      <source
                        src="/Videos/Thanks-Mom-Cullen.2.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div style={{ marginTop: "2rem" }}>
                    <h3 className="media-item-title">Thanks Mom - Debbie</h3>
                    <div className="media-wrapper">
                      <video
                        controls
                        className="media-video"
                        poster="/Videos/Thanks-Mom-Debbie-poster.jpg"
                        preload="none"
                      >
                        <source
                          src="/Videos/Thanks-Mom-Debbie.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>

                <div className="media-item">
                  <h3 className="media-item-title">Gold Shampoo</h3>
                  <div className="media-wrapper">
{/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/Gold-shampoo.webp"
                      alt="Johnson's Baby Gold Shampoo Campaign"
                      width={400}
                      height={533}
                      className="media-image"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                <div className="media-item">
                  <h3 className="media-item-title">Pink Lotion</h3>
                  <div className="media-wrapper">
{/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/Pink-lotion.jpg"
                      alt="Johnson's Baby Pink Lotion Campaign"
                      width={510}
                      height={661}
                      className="media-image"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="campaign-results">
                <h3 className="results-title">The Impact</h3>
                <div className="results-grid">
                  <div className="result-stat">
                    <div className="result-stat-value">$400MM</div>
                    <div className="result-stat-label">Portfolio P&L</div>
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

        {/* CTA Section */}
        <section className="work-cta">
          <div className="kinetic-container">
            <h2 className="work-cta-title">Let's Create Something Amazing</h2>
            <p className="work-cta-text">
              Interested in bringing this kind of strategic thinking and
              creative excellence to your brand?
            </p>
            <a href="/#contact" className="kinetic-btn kinetic-btn--primary">
              Get In Touch
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
