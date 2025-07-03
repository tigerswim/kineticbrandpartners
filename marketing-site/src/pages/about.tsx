import Image from "next/image";
import Link from "next/link";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
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
      <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-2" style={{ width: 240, height: 240 }}>
              <div className="absolute left-0 right-0 mx-auto z-10" style={{ width: 240, height: 240, top: '0', overflow: 'visible' }}>
                <div style={{ position: 'relative', width: 240, height: 240, overflow: 'visible' }}>
                  <Image
                    src="/Professional headshot.jpg"
                    alt="Professional Headshot"
                    width={240}
                    height={240}
                    className="rounded-full border-4 border-white shadow-xl object-cover"
                    priority
                    style={{
                      objectFit: 'cover',
                      aspectRatio: '1/1',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: '-24px',
                      zIndex: 2,
                    }}
                  />
                </div>
              </div>
            </div>
            <Link href="https://www.linkedin.com/in/danhoeller/" target="_blank" rel="noopener noreferrer">
              <span className="inline-flex items-center gap-2 text-blue-700 hover:underline text-lg mt-[-12px]">
                <Image src="/LI-Logo.png" alt="LinkedIn Logo" width={90} height={28} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </span>
            </Link>
          </div>
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Bio</h2>
            <p className="text-lg text-gray-700 mb-2">
              {/* Replace this with your actual LinkedIn bio content */}
              Dan Hoeller is a seasoned marketing professional with a passion for helping businesses grow through strategic branding, digital marketing, and data-driven solutions. With a proven track record in both B2B and B2C environments, Dan brings a unique blend of creativity and analytical thinking to every project. Connect with Dan on LinkedIn to learn more about his professional journey and expertise.
            </p>
          </div>
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Personal Interests</h2>
            <ul className="list-disc list-inside text-lg text-gray-700">
              <li>Cycling (road and mountain biking)</li>
              <li>Triathlons</li>
              <li>Craft beer</li>
              <li>DIY projects for home and auto</li>
            </ul>
          </div>
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Photo Gallery</h2>
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              interval={4000}
              showStatus={false}
              className="rounded-lg overflow-hidden"
            >
              <div>
                <Image src="/cycling1.jpg" alt="Cycling" width={800} height={400} className="object-cover w-full h-64" />
                <p className="legend">Cycling (Road)</p>
              </div>
              <div>
                <Image src="/mtb1.jpg" alt="Mountain Biking" width={800} height={400} className="object-cover w-full h-64" />
                <p className="legend">Mountain Biking</p>
              </div>
              <div>
                <Image src="/triathlon1.jpg" alt="Triathlon" width={800} height={400} className="object-cover w-full h-64" />
                <p className="legend">Triathlon</p>
              </div>
              <div>
                <Image src="/craftbeer1.jpg" alt="Craft Beer" width={800} height={400} className="object-cover w-full h-64" />
                <p className="legend">Craft Beer</p>
              </div>
              <div>
                <Image src="/diy1.jpg" alt="DIY Project" width={800} height={400} className="object-cover w-full h-64" />
                <p className="legend">DIY Project</p>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
} 