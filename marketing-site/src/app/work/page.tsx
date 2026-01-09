// Work page - Marketing campaign portfolio

import Link from "next/link";
import Image from "next/image";
import "../../styles/kinetic-design-system.css";
import "../../styles/work.css";

export const metadata = {
  title: "Work - Kinetic Brand Partners",
  description:
    "Award-winning marketing campaigns and creative work by Dan Hoeller",
};

export default function WorkPage() {
  return (
    <div className="kinetic-page">
      {/* Gradient Mesh Background */}
      <div className="kinetic-gradient-mesh">
        <div className="kinetic-gradient-blob kinetic-gradient-blob--1"></div>
        <div className="kinetic-gradient-blob kinetic-gradient-blob--2"></div>
        <div className="kinetic-gradient-blob kinetic-gradient-blob--3"></div>
      </div>

      {/* Header */}
      <header className="kinetic-header">
        <div className="kinetic-container">
          <Link href="/">
            <Image
              src="/logos/kinetic-brand-partners.png"
              alt="Kinetic Brand Partners"
              width={180}
              height={45}
              className="kinetic-logo"
              priority
            />
          </Link>
          <ul className="kinetic-nav">
            <li>
              <Link href="/work">Work</Link>
            </li>
            <li>
              <Link href="/resume">Resume</Link>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/danhoeller"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a href="/#contact" className="kinetic-nav-cta">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </header>

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
                      poster="/Videos/FTT-banned-ad-poster.jpg"
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
                      poster="/Videos/FTT-summary-video-poster.jpg"
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
              <Image
                src="/Videos/FTT-summary-slide.jpg"
                alt="FlipTheTurf Campaign Results Summary"
                width={1200}
                height={675}
                className="campaign-image-full"
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

        {/* Campaign 2: Grow From a New Angle */}
        <section className="kinetic-section">
          <div className="kinetic-container">
            <div className="campaign-card">
              <div className="campaign-header">
                <h2 className="campaign-title">Grow From a New Angle</h2>
                <p className="campaign-meta">
                  Central Garden & Pet · Pennington Brand Platform
                </p>
              </div>

              <p className="campaign-description">
                <strong>The Challenge:</strong> While Pennington focused on
                grass seed and wild bird seed, these legacy categories couldn't
                fuel future growth. The brand needed to expand into
                higher-growth lawn and garden segments and attract millennial
                homeowners who valued sustainable practices and creative
                self-expression over conventional lawn uniformity.
              </p>
              <p className="campaign-description">
                <strong>The Approach:</strong> Transform Pennington from grass
                seed legacy brand to innovation partner for outdoor living. By
                challenging traditional lawn care conventions and championing
                sustainable, creative approaches, the integrated campaign
                spanning CTV, social, influencers, search, and OOH positioned
                Pennington to launch products into higher-growth segments.
              </p>

              {/* Videos */}
              <div className="campaign-media-grid campaign-media-grid--2col">
                <div className="media-item">
                  <h3 className="media-item-title">Hero Campaign</h3>
                  <div className="media-wrapper">
                    <video controls className="media-video">
                      <source
                        src="/Videos/GFANA_Hero30_MP4.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>

                <div className="media-item">
                  <h3 className="media-item-title">Garden Campaign</h3>
                  <div className="media-wrapper">
                    <video
                      controls
                      className="media-video"
                      poster="/Videos/GFANA_GARDEN15-poster.jpg"
                    >
                      <source
                        src="/Videos/GFANA_GARDEN15.mp4"
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
                    <div className="result-stat-label">Sales Growth</div>
                  </div>
                  <div className="result-stat">
                    <div className="result-stat-value">4x</div>
                    <div className="result-stat-label">
                      Category Growth Rate
                    </div>
                  </div>
                  <div className="result-stat">
                    <div className="result-stat-value">526MM</div>
                    <div className="result-stat-label">Media Impressions</div>
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
                aisle, Johnson's Baby needed to reinforce its emotional equity
                and differentiate beyond product attributes.
              </p>
              <p className="campaign-description">
                <strong>The Approach:</strong> Tap into the universal
                mother-child bond through "Thanks Mom," an Olympic campaign
                where athletes thanked their mothers on the world stage. The
                campaign was so compelling that Debbie Phelps, Michael Phelps'
                mom, asked to participate. Complementary print campaigns for
                Gold Shampoo and Pink Lotion extended this emotional positioning
                at retail.
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
                    <Image
                      src="/images/Gold-shampoo.jpg"
                      alt="Johnson's Baby Gold Shampoo Campaign"
                      width={800}
                      height={1000}
                      className="media-image"
                    />
                  </div>
                </div>

                <div className="media-item">
                  <h3 className="media-item-title">Pink Lotion</h3>
                  <div className="media-wrapper">
                    <Image
                      src="/images/Pink-lotion.jpg"
                      alt="Johnson's Baby Pink Lotion Campaign"
                      width={800}
                      height={1000}
                      className="media-image"
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

      <footer className="kinetic-footer">
        <div className="kinetic-container">
          <p>&copy; {new Date().getFullYear()} Kinetic Brand Partners</p>
        </div>
      </footer>
    </div>
  );
}
