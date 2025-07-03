import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function About() {
  const [year, setYear] = useState(0);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <>
      {/* Marketing Executive Hero Section */}
      <header className="site-header">
        <nav className="container nav-bar">
          <Link href="/about" className="logo">Dan Hoeller</Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/leadership">Leadership</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>
      <section className="hero container">
        <h1>Marketing Executive Who Turns Brands Into Cultural & Commercial Powerhouses</h1>
        <p className="subhead">
          15+ years fueling double-digit growth for consumer, healthcare, and tech brands through
          data-driven strategy, sustainable innovation, and award-winning storytelling.
        </p>
        <div className="cta-group">
          <Link href="/about" className="btn btn-primary">Explore My Leadership Approach</Link>
          <a href="/assets/resumes/dan-hoeller-resume-cpg.pdf" className="btn btn-secondary">Download Executive Resume</a>
        </div>
      </section>
      <section className="about-main container">
        <h1>Mission Statement</h1>
        <p>Marketing sits at the intersection of data, empathy, and the courage to take smart risks.</p>

        <h2>Leadership Pillars</h2>
        <ul className="pillars">
          <li>Human-Centered Marketing</li>
          <li>Strategic Risk-Taking</li>
          <li>Team Empowerment</li>
          <li>Tech-Enabled Growth</li>
        </ul>

        <h2>Career Timeline</h2>
        <ul className="timeline">
          <li><strong>2024 – Present</strong>: Strategic Consulting & CMO Search</li>
          <li><strong>2019 – 2024</strong>: SVP Marketing, Garden – Central Garden & Pet</li>
          <li><strong>2017 – 2019</strong>: VP Marketing, Garden – Central Garden & Pet</li>
          <li><strong>2013 – 2017</strong>: Sr Director / Director Marketing – Pennington Grass Seed</li>
          <li><strong>2012 – 2013</strong>: Marketing Manager – Ortho Clinical Diagnostics</li>
          <li><strong>2006 – 2013</strong>: Brand Manager – Johnson&apos;s Baby / Tucks / K-Y / ept</li>
          <li><strong>1999 – 2004</strong>: Manager, Professional Services – Manhattan Associates</li>
        </ul>

        <h2>Interests</h2>
        <p>Ironman triathlete, DIY maker, and AI experimenter.</p>
      </section>
      <section className="metrics container">
        <div className="metric"><strong>3.95 B</strong><span>Media Impressions</span></div>
        <div className="metric"><strong>8.2 %</strong><span>YoY Sales Growth</span></div>
        <div className="metric"><strong>25</strong><span>Direct Reports</span></div>
        <div className="metric"><strong>290 M</strong><span>Olympic Impressions</span></div>
      </section>
      <section className="values container">
        <article>
          <h3>Strategic Vision &amp; P&amp;L Ownership</h3>
          <p>Brand architecture, pricing, market expansion, and growth acceleration.</p>
        </article>
        <article>
          <h3>Execution &amp; Digital Transformation</h3>
          <p>Omnichannel campaigns, martech leadership, and data-driven optimization.</p>
        </article>
        <article>
          <h3>Servant Leadership &amp; Culture Building</h3>
          <p>Player-coach style that develops high-performing, mission-driven teams.</p>
        </article>
      </section>
      <section className="spotlight container">
        <h2>#FlipTheTurf Campaign</h2>
        <p>Generated 3.95 B media impressions and captured two Clio Sports awards.</p>
        <Link href="/portfolio#fliptheturf" className="btn btn-accent">View Case Study</Link>
      </section>
      <section className="trust container">
        <Image src="/images/logo_central.svg" alt="Central Garden & Pet" width={120} height={60} />
        <Image src="/images/logo_jnj.svg" alt="Johnson & Johnson" width={120} height={60} />
        <Image src="/images/logo_ortho.svg" alt="Ortho Clinical Diagnostics" width={120} height={60} />
        <Image src="/images/logo_manhattan.svg" alt="Manhattan Associates" width={120} height={60} />
        <Image src="/images/award_clio.svg" alt="Clio Sports Award" width={120} height={60} />
        <Image src="/images/award_burke.svg" alt="J&J Burke Award" width={120} height={60} />
      </section>
      <footer className="site-footer">
        <p>© <span>{year}</span> Dan Hoeller | All Rights Reserved</p>
      </footer>
    </>
  );
} 