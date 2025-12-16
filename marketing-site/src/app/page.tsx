// Main page - Option 1: Minimal Editorial with logo integration

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
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
                <a
                  href="https://linkedin.com/in/danhoeller"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="/Dan-Hoeller-Resume.pdf" target="_blank" rel="noopener noreferrer">
                  Resume
                </a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="container">
            <div className="hero__inner">
              <div className="hero__content">
                <p className="hero__eyebrow">Dan Hoeller · Atlanta, GA</p>
                <h1 className="hero__title">
                  Marketing leader with 15+ years building brands and driving growth
                </h1>
                <p className="hero__subtitle">
                  From enterprise software to healthcare to consumer products—I&apos;ve led teams,
                  owned P&amp;Ls, and delivered results across B2B and B2C. Now offering strategic
                  marketing leadership to companies that need experience without the full-time overhead.
                </p>
                <div className="hero__cta">
                  <a href="#contact" className="btn btn--primary">
                    Let&apos;s Talk
                  </a>
                  <a
                    href="https://linkedin.com/in/danhoeller"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--secondary"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </div>
              <div className="hero__image">
                <Image
                  src="/images/DJH-CGPT.png"
                  alt="Dan Hoeller"
                  width={300}
                  height={400}
                  className="hero__headshot"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* What I Bring */}
        <section className="section section--alt">
          <div className="container">
            <h2 className="section__title">What I Bring</h2>
            <div className="grid grid--2col">
              <div className="card">
                <h3 className="card__title">Leadership &amp; Scale</h3>
                <p className="card__text">
                  Built and led 25-person marketing organization spanning Consumer Insights,
                  Digital, Creative, Innovation, and Customer Marketing.
                </p>
              </div>
              <div className="card">
                <h3 className="card__title">P&amp;L Ownership</h3>
                <p className="card__text">
                  Managed portfolios from $40MM to $250MM. Grew a $250MM brand at 4x the
                  category rate through integrated strategy and execution.
                </p>
              </div>
              <div className="card">
                <h3 className="card__title">Data-Driven Marketing</h3>
                <p className="card__text">
                  Marketing Mix Modeling, attribution frameworks, KPI dashboards. Delivered
                  25% efficiency gains through optimization.
                </p>
              </div>
              <div className="card">
                <h3 className="card__title">Digital Transformation</h3>
                <p className="card__text">
                  MarTech implementation (Salsify, Vizit), sales enablement tools, e-commerce/DTC
                  builds. Earned retailer &quot;Best in Class&quot; recognition.
                </p>
              </div>
              <div className="card">
                <h3 className="card__title">Creative Excellence</h3>
                <p className="card__text">
                  Clio Award-winning campaigns. 3.95 billion impressions. 10-point brand
                  awareness lifts. Creative grounded in strategy.
                </p>
              </div>
              <div className="card">
                <h3 className="card__title">Cross-Functional Leadership</h3>
                <p className="card__text">
                  Player-coach management style. Agency selection and management. Change
                  management across matrixed organizations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Background */}
        <section className="section">
          <div className="container">
            <h2 className="section__title">Background</h2>

            <div className="exp-with-logo">
              <div className="logo-item logo-item--central">
                <Image
                  src="/logos/central-garden-pet.svg"
                  alt="Central Garden & Pet"
                  width={200}
                  height={160}
                />
              </div>
              <div className="exp-with-logo__content">
                <h3 className="exp__company">Central Garden &amp; Pet</h3>
                <p className="exp__role">SVP Marketing · 11 years</p>
                <p className="exp__desc">
                  Led marketing for $1.5B Garden segment. Built and managed 25-person team.
                  Full P&amp;L ownership across multi-brand portfolio.
                </p>
              </div>
            </div>

            <div className="exp-with-logo">
              <div className="logo-item">
                <Image
                  src="/logos/johnson-johnson.svg"
                  alt="Johnson & Johnson"
                  width={200}
                  height={160}
                />
              </div>
              <div className="exp-with-logo__content">
                <h3 className="exp__company">Johnson &amp; Johnson</h3>
                <p className="exp__role">Brand Management · 7 years</p>
                <p className="exp__desc">
                  Consumer and Medical Device divisions. Multiple brands, $80MM+ portfolio
                  responsibility. Award-winning campaigns.
                </p>
              </div>
            </div>

            <div className="exp-with-logo">
              <div className="logo-item">
                <Image
                  src="/logos/manhattan-associates.jpg"
                  alt="Manhattan Associates"
                  width={200}
                  height={160}
                />
              </div>
              <div className="exp-with-logo__content">
                <h3 className="exp__company">Manhattan Associates</h3>
                <p className="exp__role">Professional Services · 5 years</p>
                <p className="exp__desc">
                  Enterprise software implementations for Fortune 500 clients including
                  Michelin, Bic, and The Diamond Trading Company.
                </p>
              </div>
            </div>

            <h2 className="section__title" style={{ marginTop: 'var(--space-4xl)' }}>Education</h2>

            <div className="edu-row">
              <div className="logo-item logo-item--darden">
                <Image
                  src="/logos/uva-darden.png"
                  alt="UVA Darden"
                  width={200}
                  height={160}
                />
              </div>
              <p className="edu-row__text">
                MBA — University of Virginia, Darden School of Business
              </p>
            </div>
            <div className="edu-row">
              <div className="logo-item">
                <Image
                  src="/logos/clemson.png"
                  alt="Clemson University"
                  width={200}
                  height={160}
                />
              </div>
              <p className="edu-row__text">
                BS, Management — Clemson University
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="contact section--alt">
          <div className="container">
            <h2 className="contact__title">Let&apos;s Talk</h2>
            <p className="contact__text">
              Ready to discuss how I can help—or just have a conversation about what you&apos;re building.
            </p>
            <a
              href="mailto:letstalk@kineticbrandpartners.com"
              className="contact__email"
            >
              letstalk@kineticbrandpartners.com
            </a>
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
