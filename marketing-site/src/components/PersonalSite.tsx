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
        <h1>{"Transform Your Marketing From Tactical to Strategic Advantage"}</h1>
        <p className="subhead">{
          "I help mid-market and enterprise companies break through growth plateaus by transforming their marketing organizations from reactive tactics to strategic growth engines. With extensive brand management and P&L ownership experience, I bring both the art and science needed to scale your business."}
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
            {"Get Your Marketing Assessment"}
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
          <h2>Strategic Marketing Services</h2>
          <p>{"Comprehensive solutions to transform your marketing organization and accelerate growth"}</p>
        </div>

        <div className="values">
          <article className="service-style-1">
            <div className="service-image-top">
              <img src="/images/service-strategy.jpg" alt="Strategic Planning" />
            </div>
            <div className="service-text">
              <h3>Strategic Planning &amp; GTM Strategy</h3>
              <p>{
                "Develop comprehensive marketing strategies and go-to-market plans across B2B2C, omnichannel, and DTC channels."}
              </p>
              <ul className="pillars">
                <li>Marketing strategy development</li>
                <li>Go-to-market planning</li>
                <li>Innovation roadmaps</li>
                <li>Portfolio strategy</li>
              </ul>
            </div>
          </article>

          <article className="service-style-1">
            <div className="service-image-top">
              <img src="/images/service-brand.jpg" alt="Brand Development" style={{ objectPosition: 'center 35%' }} />
            </div>
            <div className="service-text">
              <h3>{"Brand Development"}</h3>
              <p>{
                "Build strong brand foundations through strategic positioning, architecture, and visual identity systems."}
              </p>
              <ul className="pillars">
                <li>{"Brand architecture & positioning"}</li>
                <li>{"Visual identity systems"}</li>
                <li>{"Messaging frameworks"}</li>
                <li>{"Brand guidelines"}</li>
              </ul>
            </div>
          </article>

          <article className="service-style-1">
            <div className="service-image-top">
              <img src="/images/service-growth.jpg" alt="Growth & Performance" />
            </div>
            <div className="service-text">
              <h3>{"Growth & Performance"}</h3>
              <p>{
                "Drive revenue growth through P&L management, pricing strategy, and marketing effectiveness optimization."}
              </p>
              <ul className="pillars">
                <li>{"P&L management"}</li>
                <li>{"Pricing & revenue optimization"}</li>
                <li>{"Marketing ROI & attribution"}</li>
                <li>{"Performance analytics"}</li>
              </ul>
            </div>
          </article>

          <article className="service-style-1">
            <div className="service-image-top">
              <img src="/images/service-digital.jpg" alt="Digital Transformation & MarTech" />
            </div>
            <div className="service-text">
              <h3>{"Digital Transformation & MarTech"}</h3>
              <p>{
                "Modernize marketing capabilities through digital transformation, technology optimization, and performance marketing."}
              </p>
              <ul className="pillars">
                <li>{"Digital strategy"}</li>
                <li>{"MarTech stack optimization"}</li>
                <li>{"Performance marketing"}</li>
                <li>{"Marketing automation"}</li>
              </ul>
            </div>
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
          <h2>The Marketing Leader Your Business Needs</h2>
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
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>
              Strategic Marketing Leadership with Complete Business Perspective
            </h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              With extensive P&L ownership and cross-functional leadership experience, I bring a complete business perspective to every marketing challenge. I've scaled teams from startup environments to enterprise organizations, managing budgets across diverse business contexts.
            </p>
          </div>
        </div>
        
        <div className="values">
          <article>
            <h3>{"Complete Business Perspective"}</h3>
            <p>{
              "Unlike traditional marketing consultants, I bring a complete business perspective to every challenge. With extensive P&L ownership and cross-functional leadership experience, I understand how marketing drives business results, not just marketing metrics."}
            </p>
          </article>

          <article>
            <h3>Strategic Vision, Tactical Excellence</h3>
            <p>{
              "I'm equally at home setting strategic direction and rolling up my sleeves for tactical execution. Whether you need marketing as the hub of growth or as a strategic support function, I adapt my approach to what your business needs most."}
            </p>
            <p>
              <em>{"Great marketing isn't about choosing between creativity and analytics — it's about knowing when to lean into each and how to make them work together seamlessly."}</em>
            </p>
          </article>

          <article>
            <h3>{"Enterprise Experience, Entrepreneurial Agility"}</h3>
            <p>{
              "I've scaled marketing teams from startup environments to enterprise organizations across diverse industries and business models. This unique combination allows me to bring enterprise-level strategic thinking with the agility and resourcefulness your growing business demands."}
            </p>
          </article>
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
          <h2>{"Ready to Transform Your Marketing Strategy?"}</h2>
          <p>{"Let's start with a comprehensive assessment of your marketing organization and growth opportunities"}</p>
        </div>

        <div className="contact-single-box">
          <article style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <h3>{"Comprehensive Marketing Assessment"}</h3>
            <p>{
              "Get clarity on your marketing maturity, brand positioning, and growth opportunities. In our initial consultation, we'll evaluate your current marketing effectiveness and identify the highest-impact transformation opportunities."}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <a href="mailto:assessment@kineticbrandpartners.com" className="btn btn-primary">
                {"Schedule Assessment"}
              </a>
            </div>
            <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>{"Questions? Want To Chat?"}</h3>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <a href="mailto:letstalk@kineticbrandpartners.com" className="btn btn-primary">
                  {"Email Me"}
                </a>
              </div>
              <p style={{ fontSize: '0.95rem', color: '#666', marginTop: '1.5rem' }}>
                <strong>{"Based in Atlanta, GA"}</strong> {"| Working with clients nationwide"}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="site-footer">
      <div className="container">
        <p>&copy; {"2025 Kinetic Brand Partners, LLC. All rights reserved."}</p>
        <p style={{ fontSize: '0.85rem', marginTop: '1rem' }}>
          {"Strategic Marketing Leadership | Brand Transformation | Revenue Growth Acceleration"}
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