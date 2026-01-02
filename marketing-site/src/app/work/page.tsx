// Work page - Marketing campaign portfolio

import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Work - Kinetic Brand Partners",
  description: "Award-winning marketing campaigns and creative work by Dan Hoeller",
};

export default function WorkPage() {
  return (
    <div className="opt1">
      <header className="site-header">
        <div className="container">
          <nav className="nav-bar">
            <Link href="/" className="logo">
              <Image
                src="/logos/kinetic-brand-partners.png"
                alt="Kinetic Brand Partners"
                width={550}
                height={140}
                className="header-logo"
                priority
              />
            </Link>
            <ul className="nav-links">
              <li>
                <Link href="/work">Work</Link>
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
                <Link href="/resume">Resume</Link>
              </li>
              <li>
                <Link href="/#contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="container">
            <div className="hero__content">
              <p className="hero__eyebrow">Selected Work</p>
              <h1 className="hero__title">Impactful Marketing Campaigns</h1>
              <p className="hero__subtitle">
                From Clio-winning creative to data-driven digital campaigns,
                here's a selection of marketing work that delivered measurable
                impact and cultural resonance.
              </p>
            </div>
          </div>
        </section>

        {/* Campaign 1: #FlipTheTurf */}
        <section className="section section--alt">
          <div className="container">
            <div className="campaign">
              <div className="campaign__header">
                <h2 className="campaign__title">#FlipTheTurf</h2>
                <p className="campaign__meta">
                  Central Garden &amp; Pet · Pennington Grass Seed
                </p>
              </div>

              <p className="campaign__description">
                <strong>The Challenge:</strong> Grass seed is the ultimate low-involvement purchase; “watching grass grow” defines boredom itself after all. Yet artificial turf was causing a surge in player injuries, and Pennington had no natural platform to enter the national sports conversation. The brand needed to make millions of people suddenly care about something they’d never thought twice about.
              </p>
              <p className="campaign__description">
                <strong>The Approach:</strong> Partner with NFL star Von Miller on a deliberately provocative anti-turf campaign designed to get banned by the league. This turned the NFL&apos;s censorship into free media coverage, sparking a grassroots movement among players and fans.
              </p>

              {/* Videos */}
              <div className="campaign__media-grid">
                <div className="media-item">
                  <h3 className="media-item__title">The Banned Ad</h3>
                  <div className="media-item__wrapper">
                    <video
                      controls
                      className="media-item__video"
                      poster="/Videos/FTT-banned-ad-poster.jpg"
                    >
                      <source src="/Videos/FTT-banned-ad.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>

                <div className="media-item">
                  <h3 className="media-item__title">Campaign Summary</h3>
                  <div className="media-item__wrapper">
                    <video
                      controls
                      className="media-item__video"
                      poster="/Videos/FTT-summary-video-poster.jpg"
                    >
                      <source src="/Videos/FTT-summary-video.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="campaign__results">
                <h3 className="results__title">The Impact</h3>
                <div className="results__grid">
                  <div className="result-stat">
                    <div className="result-stat__value">3.95B</div>
                    <div className="result-stat__label">Impressions</div>
                  </div>
                  <div className="result-stat">
                    <div className="result-stat__value">31K+</div>
                    <div className="result-stat__label">Petition Signatures</div>
                  </div>
                  <div className="result-stat">
                    <div className="result-stat__value">2x</div>
                    <div className="result-stat__label">Clio Award Winner</div>
                  </div>
                </div>
              </div>

              {/* Summary Slide */}
              <div className="campaign__image-wrapper">
                <Image
                  src="/Videos/FTT-summary-slide.jpg"
                  alt="FlipTheTurf Campaign Results"
                  width={1200}
                  height={675}
                  className="campaign__image"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Campaign 2: Grow From a New Angle */}
        <section className="section">
          <div className="container">
            <div className="campaign">
              <div className="campaign__header">
                <h2 className="campaign__title">Grow From a New Angle</h2>
                <p className="campaign__meta">
                  Central Garden &amp; Pet · Pennington Brand Platform
                </p>
              </div>

              <p className="campaign__description">
                <strong>The Challenge:</strong> While Pennington focused on grass seed and wild bird seed, these legacy categories couldn’t fuel future growth. The brand needed to expand into higher-growth lawn and garden segments and attract millennial homeowners who valued sustainable practices and creative self-expression over conventional lawn uniformity.
              </p>
              <p className="campaign__description">
                <strong>The Approach:</strong> Transform Pennington from grass seed legacy brand to innovation partner for outdoor living. By challenging traditional lawn care conventions and championing sustainable, creative approaches, the integrated campaign spanning CTV, social, influencers, search, and OOH positioned Pennington to launch products into higher-growth segments.
              </p>

              {/* Videos */}
              <div className="campaign__media-grid">
                <div className="media-item">
                  <h3 className="media-item__title">Hero 30</h3>
                  <div className="media-item__wrapper">
                    <video
                      controls
                      className="media-item__video"
                    >
                      <source src="/Videos/GFANA_Hero30_MP4.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>

                <div className="media-item">
                  <h3 className="media-item__title">Garden 15</h3>
                  <div className="media-item__wrapper">
                    <video
                      controls
                      className="media-item__video"
                      poster="/Videos/GFANA_GARDEN15-poster.jpg"
                    >
                      <source src="/Videos/GFANA_GARDEN15.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="campaign__results">
                <h3 className="results__title">The Impact</h3>
                <div className="results__grid">
                  <div className="result-stat">
                    <div className="result-stat__value">8.2%</div>
                    <div className="result-stat__label">Sales Growth</div>
                  </div>
                  <div className="result-stat">
                    <div className="result-stat__value">4x</div>
                    <div className="result-stat__label">Category Growth Rate</div>
                  </div>
                  <div className="result-stat">
                    <div className="result-stat__value">526MM</div>
                    <div className="result-stat__label">Media Impressions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Campaign 3: Johnson's Baby */}
        <section className="section section--alt">
          <div className="container">
            <div className="campaign">
              <div className="campaign__header">
                <h2 className="campaign__title">Johnson&apos;s Baby</h2>
                <p className="campaign__meta">
                  Johnson &amp; Johnson · Baby Care
                </p>
              </div>

              <p className="campaign__description">
                <strong>The Challenge:</strong> In a commoditized baby care aisle, Johnson&apos;s Baby needed to reinforce its emotional equity and differentiate beyond product attributes.
              </p>
              <p className="campaign__description">
                <strong>The Approach:</strong> Tap into the universal mother-child bond through &quot;Thanks Mom,&quot; an Olympic campaign where athletes thanked their mothers on the world stage. The campaign was so compelling that Debbie Phelps, Michael Phelps&apos; mom, asked to participate. Complementary print campaigns for Gold Shampoo and Pink Lotion extended this emotional positioning at retail.
              </p>

              {/* Media Grid */}
              <div className="campaign__media-grid campaign__media-grid--three">
                {/* Thanks Mom Videos Stacked */}
                <div className="media-item">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
                    <div>
                      <h3 className="media-item__title">Thanks Mom - Cullen</h3>
                      <div className="media-item__wrapper">
                        <video
                          controls
                          className="media-item__video"
                          poster="/Videos/Thanks-Mom-Cullen-poster.jpg"
                        >
                          <source src="/Videos/Thanks-Mom-Cullen.2.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>

                    <div>
                      <h3 className="media-item__title">Thanks Mom - Debbie</h3>
                      <div className="media-item__wrapper">
                        <video
                          controls
                          className="media-item__video"
                          poster="/Videos/Thanks-Mom-Debbie-poster.jpg"
                        >
                          <source src="/Videos/Thanks-Mom-Debbie.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="media-item">
                  <h3 className="media-item__title">Gold Shampoo</h3>
                  <div className="media-item__wrapper">
                    <Image
                      src="/images/Gold-shampoo.jpg"
                      alt="Johnson's Baby Gold Shampoo Campaign"
                      width={800}
                      height={1000}
                      className="media-item__image"
                    />
                  </div>
                </div>

                <div className="media-item">
                  <h3 className="media-item__title">Pink Lotion</h3>
                  <div className="media-item__wrapper">
                    <Image
                      src="/images/Pink-lotion.jpg"
                      alt="Johnson's Baby Pink Lotion Campaign"
                      width={800}
                      height={1000}
                      className="media-item__image"
                    />
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="campaign__results">
                <h3 className="results__title">The Impact</h3>
                <div className="results__grid">
                  <div className="result-stat">
                    <div className="result-stat__value">400MM</div>
                    <div className="result-stat__label">Portfolio P&amp;L</div>
                  </div>
                  <div className="result-stat">
                    <div className="result-stat__value">9.8%</div>
                    <div className="result-stat__label">Sales Growth</div>
                  </div>
                  <div className="result-stat">
                    <div className="result-stat__value">290MM</div>
                    <div className="result-stat__label">Impressions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section">
          <div className="container" style={{ textAlign: "center" }}>
            <h2 className="section__title" style={{ textAlign: "center" }}>
              Let&apos;s Create Something Great
            </h2>
            <p
              className="hero__subtitle"
              style={{ maxWidth: "600px", margin: "0 auto var(--space-xl)" }}
            >
              Interested in bringing this kind of strategic thinking and
              creative excellence to your brand?
            </p>
            <Link href="/#contact" className="btn btn--primary">
              Get In Touch
            </Link>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Kinetic Brand Partners</p>
        </div>
      </footer>
    </div>
  );
}
