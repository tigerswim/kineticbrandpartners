// src/components/PersonalSite.tsx

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

const PersonalSite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Create stable refs using useRef for each section
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Set up intersection observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-20px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.getAttribute('data-section');
        if (sectionId && entry.isIntersecting) {
          setActiveSection(sectionId);
        }
      });
    }, observerOptions);

    // Observe all sections
    const refs = [homeRef, aboutRef, servicesRef, contactRef];
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(!mobileMenuOpen);
  }, [mobileMenuOpen]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  }, []);

  const Header = () => (
    <header className="site-header">
      <div className="container">
        <nav className="nav-bar">
          <a href="#home" className="logo" onClick={() => scrollToSection('home')}>
            Kinetic Brand Partners
          </a>
          
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
          
          <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            {navigationItems.map(item => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`}
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );

  const HeroSection = () => (
    <section
      id="home"
      ref={homeRef}
      data-section="home"
      className="hero"
    >
      <div className="container">
        <h1>{"Your Brand Is Invisible in a World Full of Noise."}</h1>
        <p className="subhead">{
          "I turn forgettable consumer brands into household names that people remember, choose, love, and recommend. Whether you're selling to businesses or direct to consumers, I create the kind of differentiation that makes customers willing to pay more and competitors scramble to catch up."}
        </p>

        <div className="cta-group">
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
          >
            {"Get a Free Brand Diagnostic"}
          </a>
          <a
            href="#services"
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('services');
            }}
          >
            {"View Services"}
          </a>
        </div>
      </div>
    </section>
  );

  const ServicesSection = () => (
    <section
      id="services"
      ref={servicesRef}
      data-section="services"
      style={{ padding: '4rem 0', background: '#f7f9fc' }}
    >
      <div className="container">
        <div className="spotlight">
          <h2>What I Do</h2>
          <p>{"Transform brands from invisible to inevitable through deep consumer and customer insights, strategic positioning, and purposeful execution that drives actual business results"}</p>
        </div>

        {/* Consumer Brand Transformation - PRIMARY */}
        <div style={{ marginBottom: '4rem' }}>
          <article>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>
              {"Make People Notice Your Brand"}
            </h3>
            <p style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {"Consumers see 5,000+ ads per day. Your product sits next to 47 competitors on the shelf. Your digital ads get skipped in 3 seconds."}
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              {"I solve the fundamental problem that kills most consumer brands: You're talking about features when people buy feelings. Through deep consumer research and brand positioning that taps into real human motivations, I create brands that people notice and buy."}
            </p>

            <h4 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>What transforms:</h4>
            <div className="values">
              <article>
                <h3>{"Insight Development"}</h3>
                <p>{"Discover the unspoken desires your target audience can't even articulate, so you own the emotional territory competitors don't even know exists"}</p>
              </article>
              <article>
                <h3>{"Brand Storytelling Frameworks"}</h3>
                <p>{"Craft narratives that turn mundane purchases into identity statements, so customers choose you even when cheaper alternatives are right there"}</p>
              </article>
              <article>
                <h3>{"Packaging & Visual Identity"}</h3>
                <p>{"Design strategy that stops the scroll, builds memory, and communicates your brand promise in 0.3 seconds—the average time consumers spend looking at products"}</p>
              </article>
              <article>
                <h3>{"Omnichannel Experience Design"}</h3>
                <p>{"Create consistent brand moments from social media to retail environments that compound into lasting brand preference"}</p>
              </article>
            </div>
          </article>
        </div>

        {/* Consumer Marketing Strategy & Launch */}
        <div style={{ marginBottom: '4rem' }}>
          <article>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>
              {"Launch Products That Actually Sell"}
            </h3>
            <p style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {"About 75% of new consumer products fail within two years. Most brands spend 80% of their launch budget on tactics that don't drive trial or repeat purchase."}
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              {"I build consumer marketing engines designed for the realities of modern retail, a place where shelf space is difficult to earn, Amazon owns discovery, and TikTok can make or break a brand overnight. Turn your launches into sustained growth platforms, not expensive experiments."}
            </p>

            <h4 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>What you get:</h4>
            <div className="values">
              <article>
                <h3>{"Consumer Segmentation Strategies"}</h3>
                <p>{"Identify your high-volume customers and the segments that respond to the same messaging that drives their purchasing decisions"}</p>
              </article>
              <article>
                <h3>{"Retail Partnership Development"}</h3>
                <p>{"Navigate buyer meetings, secure prime shelf placement, and structure trade promotion calendars that build momentum instead of just moving inventory"}</p>
              </article>
              <article>
                <h3>{"Digital-First Campaign Architecture"}</h3>
                <p>{"Social media strategies that create authentic buzz, influencer partnerships that drive actual sales, and content frameworks that perform across TikTok, Instagram, and Amazon"}</p>
              </article>
              <article>
                <h3>{"Launch Sequencing Playbooks"}</h3>
                <p>{"90-day roadmaps that build from sampling to trial to repeat purchase, so early wins fund expansion (not the other way around)"}</p>
              </article>
            </div>
          </article>
        </div>

        {/* Brand Innovation & NPD */}
        <div style={{ marginBottom: '4rem' }}>
          <article>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>
              {"Create Products People Actually Want"}
            </h3>
            <p style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {"Most new products are line extensions of existing brands, while innovation dies in focus groups because companies ask consumers what they want instead of observing what they do."}
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              {"I approach product development like an anthropologist, not a marketer. Through ethnographic research and behavioral analysis, I identify unmet needs that consumers can't articulate and then create products that feel inevitable once they hit the market."}
            </p>

            <h4 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>Innovation process:</h4>
            <div className="values">
              <article>
                <h3>{"Consumer Behavior Mapping"}</h3>
                <p>{"Observe real usage patterns, purchase triggers, and frustration points that traditional market research misses"}</p>
              </article>
              <article>
                <h3>{"White Space Identification"}</h3>
                <p>{"Find the intersection of consumer need and competitive vulnerability where new products can win"}</p>
              </article>
              <article>
                <h3>{"Concept Development & Testing"}</h3>
                <p>{"Rapid prototyping and real-world testing that validates demand before major investment"}</p>
              </article>
              <article>
                <h3>{"Go-to-Market Acceleration"}</h3>
                <p>{"Launch strategies that build from early adopters to mainstream adoption without losing brand premium"}</p>
              </article>
            </div>
          </article>
        </div>

        {/* B2B Brand Transformation */}
        <div style={{ marginBottom: '4rem' }}>
          <article>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>
              {"Stop Competing on Price Alone (B2B Edition)"}
            </h3>
            <p style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {"Your B2B brand looks like everyone else's. Your messaging is overly technical, and worse, forgettable. Your sales team defaults to discounts because they have no other weapon."}
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              {"Business buyers are still humans — they make emotional decisions and justify them after the fact with logic. I fix the fundamental problem: You haven't defined what you own in the market, so customers treat you like a commodity. Through forensic brand audits and strategic repositioning, I create differentiation that sticks in buyers' minds and justifies premium pricing."}
            </p>

            <h4 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>What changes:</h4>
            <div className="values">
              <article>
                <h3>{"Brand Architecture Development"}</h3>
                <p>{"You'll know exactly which services to double down on, which to phase out, and which are cannibalizing each other so your portfolio makes sense instead of competing with itself"}</p>
              </article>
              <article>
                <h3>{"B2B Positioning Strategy"}</h3>
                <p>{"Own a specific business problem that competitors can't credibly claim; even if they copy your words, they won't have your proof points or expertise"}</p>
              </article>
              <article>
                <h3>{"Sales Enablement Messaging"}</h3>
                <p>{"Equip your team with stories that connect rationally and emotionally, shortening sales cycles and turning customers into references who sell for you"}</p>
              </article>
            </div>
          </article>
        </div>

        {/* Fractional CMO / Strategic Leadership */}
        <div style={{ marginBottom: '4rem' }}>
          <article>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>
              {"Fractional CMO / Interim Leadership"}
            </h3>
            <p style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {"You need CMO-level thinking but don't need a full-time hire yet."}
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              {"Whether you're launching a consumer brand, scaling B2B services, or navigating retail expansion, I embed as your strategic marketing leader. Not a PowerPoint consultant. Not someone who delegates to juniors or hides behind account managers, no lost-in-translation moments. You get me, personally, making decisions and driving execution."}
            </p>

            <h4 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>What this looks like:</h4>
            <ul style={{ fontSize: '1.05rem', lineHeight: '1.8', marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li>Own marketing strategy and growth targets (consumer volume, B2B pipeline, retail distribution)</li>
              <li>Lead your team through critical launches, rebrands, or market expansion</li>
              <li>Build measurement systems that connect spending to actual business outcomes</li>
              <li>Mentor internal talent so they're ready to step up when you scale</li>
            </ul>
          </article>
        </div>

        {/* How We Work */}
        <div>
          <article>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>
              {"How This Actually Happens"}
            </h3>
            <p style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '2rem', lineHeight: '1.6' }}>
              {"No RFPs. No beauty pageants. No 40-page proposals that took three people to write."}
            </p>

            {/* Timeline-style process visualization */}
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              {/* Step 1 */}
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', position: 'relative' }}>
                <div style={{
                  minWidth: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 2
                }}>
                  1
                </div>
                <div style={{ paddingTop: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--primary-dark)', fontWeight: '700' }}>
                    {"Brand Diagnostic"}
                  </h4>
                  <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#555' }}>
                    {"60-minute conversation where I start to map your current position, identify the highest-leverage opportunities, and determine if we're the right fit. Consumer brand? I'll audit your retail presence and digital performance. B2B brand? I'll analyze your competitive positioning and sales process."}
                  </p>
                </div>
                {/* Connecting line */}
                <div style={{
                  position: 'absolute',
                  left: '39px',
                  top: '85px',
                  width: '3px',
                  height: 'calc(100% + 1.5rem)',
                  background: 'linear-gradient(180deg, #3b82f6 0%, #f97316 100%)',
                  opacity: 0.25,
                  zIndex: 1
                }} />
              </div>

              {/* Step 2 */}
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', position: 'relative' }}>
                <div style={{
                  minWidth: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  boxShadow: '0 6px 16px rgba(249, 115, 22, 0.4)',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 2
                }}>
                  2
                </div>
                <div style={{ paddingTop: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--primary-dark)', fontWeight: '700' }}>
                    {"Strategy & Roadmap"}
                  </h4>
                  <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#555' }}>
                    {"Clear deliverables, timeline, and investment. Fixed-price for projects. Monthly retainer for ongoing leadership. No surprises, no scope creep, no invoices for 'additional research.'"}
                  </p>
                </div>
                {/* Connecting line */}
                <div style={{
                  position: 'absolute',
                  left: '39px',
                  top: '85px',
                  width: '3px',
                  height: 'calc(100% + 1.5rem)',
                  background: 'linear-gradient(180deg, #f97316 0%, #ef4444 100%)',
                  opacity: 0.25,
                  zIndex: 1
                }} />
              </div>

              {/* Step 3 */}
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div style={{
                  minWidth: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  boxShadow: '0 6px 16px rgba(239, 68, 68, 0.4)',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 2
                }}>
                  3
                </div>
                <div style={{ paddingTop: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--primary-dark)', fontWeight: '700' }}>
                    {"Execution"}
                  </h4>
                  <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#555' }}>
                    {"Weekly working sessions with you and your team. For consumer brands: campaigns, packaging, retail strategies built in real-time. For B2B: positioning, sales tools, demand generation systems. You see progress every week, not at 'the big reveal.'"}
                  </p>
                </div>
              </div>
            </div>
            <p style={{ fontSize: '1.05rem', fontWeight: '600', marginTop: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.03)', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
              {"You own everything. All strategies, creative frameworks, and tools transfer to you. No licensing fees. No dependencies. No being held hostage."}
            </p>
          </article>
        </div>
      </div>
    </section>
  );

  const AboutSection = () => (
    <section
      id="about"
      ref={aboutRef}
      data-section="about"
      style={{ padding: '4rem 0' }}
    >
      <div className="container">
        <div className="spotlight">
          <h2>Why This Works</h2>
        </div>

        <div className="about-content">
          <div className="about-image">
            <img
              src="/images/about-workspace.jpg"
              alt="Strategic marketing workspace"
              style={{
                width: '100%',
                maxWidth: '500px',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
              }}
            />
          </div>
          <div className="about-intro">
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>
              Built brands both large and small.
            </h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              20+ years managing P&Ls and marketing teams across categories including baby care, personal care, lawn & garden, and more. Launched consumer products into Target, Walmart, The Home Depot, Amazon, independent retailers, and everywhere in between. Drove billions of impressions that bolstered brand health metrics and grew share. Led companies through positioning and go-to-market transformations that grew revenue.
            </p>
          </div>
        </div>

        <div className="values">
          <article>
            <h3>{"Focused expertise."}</h3>
            <p>{
              "Big consulting firms charge $50K+ for strategy decks built by associates who've never launched a product. You're paying for my direct expertise and the ability to diagnose fast, decide faster, and execute without the expensive overhead of large agencies or the inexperience of junior consultants."}
            </p>
          </article>

          <article>
            <h3>{"You get me. Not a team of people you've never met."}</h3>
            <p>{
              "Every insight, every framework, every recommendation comes from someone who's actually done the job. No bait-and-switch. No 'I'll introduce you to the team who'll be handling your account.' Just direct access to two decades of brand-building expertise."}
            </p>
          </article>
        </div>

        {/* Who This Is For - Full Width Section */}
        <div style={{ marginTop: '4rem', padding: '3rem', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', textAlign: 'center', color: 'var(--primary-dark)' }}>
            {"Who This Is For"}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', maxWidth: '1100px', margin: '0 auto' }}>
            <div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--primary)' }}>
                {"Consumer brands"}
              </h4>
              <ul style={{ marginLeft: '1.2rem', lineHeight: '1.8', fontSize: '0.98rem' }}>
                <li>Need to break out of regional distribution into national retail</li>
                <li>Are losing shelf space to private label or new competitors</li>
                <li>Want to build direct-to-consumer channels that actually profit</li>
                <li>Have great products but generic positioning that doesn't drive preference</li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--primary)' }}>
                {"B2B companies"}
              </h4>
              <ul style={{ marginLeft: '1.2rem', lineHeight: '1.8', fontSize: '0.98rem' }}>
                <li>Are trapped in price-driven RFP processes because differentiation is weak</li>
                <li>Need to move upmarket but lack the positioning and tools to command premium pricing</li>
                <li>Want to build predictable demand generation that doesn't depend on referrals</li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--primary)' }}>
                {"Ambitious brands at any stage"}
              </h4>
              <ul style={{ marginLeft: '1.2rem', lineHeight: '1.8', fontSize: '0.98rem' }}>
                <li>Value direct access to senior expertise over large agency infrastructure</li>
                <li>Want someone who's actually built the brands they're trying to build</li>
                <li>Are ready to stop playing it safe and start owning their category</li>
                <li>Need marketing that drives measurable business results, not just "awareness"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );


  const ContactSection = () => (
    <section
      id="contact"
      ref={contactRef}
      data-section="contact"
      style={{ padding: '4rem 0' }}
    >
      <div className="container">
        <div className="spotlight">
          <h2>{"Let's Talk About What's Actually Possible"}</h2>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.7' }}>
            {"Book a 60-minute brand diagnostic. I'll map your situation, identify your highest-ROI growth opportunities, and determine if working together makes sense. No pitch. No hard sell. Just a conversation between people who've both built brands that matter."}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
          <a href="mailto:assessment@kineticbrandpartners.com" className="btn btn-primary">
            {"Schedule Your Free Brand Diagnostic"}
          </a>
        </div>
        <article style={{ textAlign: 'center', maxWidth: '700px', margin: '2.5rem auto 0' }}>
          <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <p style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>
              {"Or email directly: "}
              <a href="mailto:letstalk@kineticbrandpartners.com" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>
                {"letstalk@kineticbrandpartners.com"}
              </a>
            </p>
            <p style={{ fontSize: '0.95rem', color: '#666', marginTop: '1rem' }}>
              {"Atlanta-based. Working with ambitious brands nationwide."}
            </p>
          </div>
        </article>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="site-footer">
      <div className="container">
        <p>&copy; {"2025 Kinetic Brand Partners, LLC. All rights reserved."}</p>
        <p style={{ fontSize: '0.85rem', marginTop: '1rem' }}>
          {"Consumer Brand Strategy | CPG Launch Expertise | B2B Positioning | Fractional CMO Services"}
        </p>
      </div>
    </footer>
  );

  return (
    <div className="site-wrapper">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default PersonalSite;