import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const PersonalSite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  // Use useRef for intersection observer instead of useInView hook
  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    services: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  // Set up intersection observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-20px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.getAttribute('data-section');
        if (sectionId) {
          setVisibleSections(prev => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(sectionId);
            } else {
              newSet.delete(sectionId);
            }
            return newSet;
          });
        }
      });
    }, observerOptions);

    // Observe all sections
    Object.entries(sectionRefs).forEach(([key, ref]) => {
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
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

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
      ref={sectionRefs.home}
      data-section="home"
      className="hero"
    >
      <div className="container">
        <h1>Strategic Marketing Consulting That Drives Measurable Growth</h1>
        <p className="subhead">
          We help ambitious B2B companies accelerate revenue growth through data-driven 
          marketing strategies, proven methodologies, and hands-on implementation support.
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
            Schedule Strategy Session
          </a>
          <a 
            href="#services" 
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('services');
            }}
          >
            View Services
          </a>
        </div>
        
        <div className="metrics">
          <div className="metric">
            <strong>150%</strong>
            Average ROI Increase
          </div>
          <div className="metric">
            <strong>50+</strong>
            Companies Scaled
          </div>
          <div className="metric">
            <strong>$10M+</strong>
            Revenue Generated
          </div>
          <div className="metric">
            <strong>15</strong>
            Years Experience
          </div>
        </div>
      </div>
    </section>
  );

  const ServicesSection = () => (
    <section 
      id="services" 
      ref={sectionRefs.services}
      data-section="services"
      style={{ padding: '4rem 0', background: '#f7f9fc' }}
    >
      <div className="container">
        <div className="spotlight">
          <h2>Core Services</h2>
          <p>Comprehensive marketing solutions designed to accelerate your growth</p>
        </div>
        
        <div className="values">
          <article>
            <h3>Growth Strategy &amp; Planning</h3>
            <p>
              Comprehensive market analysis, competitive positioning, and strategic roadmap 
              development to unlock sustainable growth opportunities.
            </p>
            <ul className="pillars">
              <li>Market opportunity assessment</li>
              <li>Competitive analysis</li>
              <li>Growth strategy development</li>
              <li>Performance frameworks</li>
            </ul>
          </article>
          
          <article style={{ borderLeftColor: 'var(--growth-green)' }}>
            <h3>Digital Marketing &amp; Lead Generation</h3>
            <p>
              Data-driven digital marketing campaigns that generate qualified leads 
              and nurture prospects through your sales funnel.
            </p>
            <ul className="pillars">
              <li>Content marketing strategy</li>
              <li>SEO &amp; paid advertising</li>
              <li>Marketing automation</li>
              <li>Lead nurturing systems</li>
            </ul>
          </article>
          
          <article>
            <h3>Brand Positioning &amp; Messaging</h3>
            <p>
              Strategic brand development that differentiates your company and 
              resonates with your target market.
            </p>
            <ul className="pillars">
              <li>Brand strategy development</li>
              <li>Message architecture</li>
              <li>Content strategy</li>
              <li>Brand guidelines</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );

  const AboutSection = () => (
    <section 
      id="about" 
      ref={sectionRefs.about}
      data-section="about"
      style={{ padding: '4rem 0' }}
    >
      <div className="container">
        <div className="spotlight">
          <h2>About Kinetic Brand Partners</h2>
        </div>
        
        <div className="values">
          <article>
            <h3>Our Mission</h3>
            <p>
              We partner with ambitious B2B companies to unlock their growth potential through 
              strategic marketing initiatives that drive measurable results. Our approach combines 
              deep industry expertise with proven methodologies.
            </p>
          </article>
          
          <article>
            <h3>Leadership Philosophy</h3>
            <p>
              &quot;Great marketing isn&apos;t about clever campaigns—it&apos;s about understanding your 
              customers so deeply that your message feels like it was written just for them.&quot;
            </p>
            <p>
              With 15+ years of experience scaling B2B marketing organizations, our founder has 
              helped companies from startups to Fortune 500 enterprises achieve breakthrough growth.
            </p>
          </article>
          
          <article>
            <h3>Our Approach</h3>
            <p>
              Every engagement begins with understanding your unique challenges and goals. 
              We then develop customized strategies that align with your business objectives 
              and deliver sustainable growth.
            </p>
          </article>
        </div>
      </div>
    </section>
  );

  const ExperienceSection = () => (
    <section 
      id="experience" 
      ref={sectionRefs.experience}
      data-section="experience"
      style={{ padding: '4rem 0', background: '#f7f9fc' }}
    >
      <div className="container">
        <div className="spotlight">
          <h2>Professional Experience</h2>
        </div>
        
        <div className="values">
          <article>
            <h3>Background</h3>
            <ul className="timeline">
              <li>Former VP Marketing at 3 high-growth SaaS companies</li>
              <li>Led marketing teams scaling from $1M to $50M ARR</li>
              <li>MBA from Northwestern Kellogg</li>
              <li>Certified in HubSpot, Salesforce, and Google Analytics</li>
            </ul>
          </article>
          
          <article>
            <h3>Case Study Highlight</h3>
            <h4>300% Lead Generation Increase</h4>
            <p><strong>Challenge:</strong> B2B software company struggling with lead quality.</p>
            <p><strong>Solution:</strong> Implemented account-based marketing strategy.</p>
            <p><strong>Results:</strong> 300% increase in qualified leads, $2.3M additional revenue.</p>
          </article>
          
          <article>
            <h3>Industry Recognition</h3>
            <ul className="resume-list">
              <li>Featured speaker at 15+ marketing conferences</li>
              <li>Recognized as &quot;Marketing Leader of the Year&quot; by TechCrunch</li>
              <li>Published author in Harvard Business Review</li>
              <li>Advisory board member for 3 marketing tech startups</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );

  const ContactSection = () => (
    <section 
      id="contact" 
      ref={sectionRefs.contact}
      data-section="contact"
      style={{ padding: '4rem 0' }}
    >
      <div className="container">
        <div className="spotlight">
          <h2>Ready to Accelerate Your Growth?</h2>
          <p>Let&apos;s discuss how we can help you achieve your marketing goals</p>
        </div>
        
        <div className="values">
          <article style={{ textAlign: 'center' }}>
            <h3>Schedule a Strategy Session</h3>
            <p>
              Book a complimentary 30-minute consultation to discuss your challenges 
              and explore growth opportunities.
            </p>
            <a href="mailto:hello@kineticbrandpartners.com" className="btn btn-primary">
              Get Started
            </a>
          </article>
          
          <article style={{ textAlign: 'center' }}>
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> hello@kineticbrandpartners.com</p>
            <p><strong>Phone:</strong> (555) 123-4567</p>
            <p><strong>LinkedIn:</strong> /company/kinetic-brand-partners</p>
          </article>
        </div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="site-footer">
      <div className="container">
        <p>&copy; 2024 Kinetic Brand Partners. All rights reserved.</p>
        <p style={{ fontSize: '0.85rem', marginTop: '1rem' }}>
          Strategic Marketing Consulting | B2B Growth Acceleration | Revenue Optimization
        </p>
      </div>
    </footer>
  );

  return (
    <>
      <div className="site-wrapper">
        <Header />
        <main>
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <ExperienceSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      
      <style jsx>{`
        .site-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        main {
          flex: 1;
        }
        
        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: var(--text-primary, #333);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }
        
        .mobile-menu-toggle:hover {
          background-color: rgba(0,0,0,0.05);
        }
        
        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: block;
          }
          
          .nav-links {
            position: fixed;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100vh;
            background: var(--executive-navy, #1b365d);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: left 0.3s ease;
            z-index: 1000;
          }
          
          .nav-links.active {
            left: 0;
          }
          
          .nav-links a {
            color: white;
            font-size: 1.25rem;
            padding: 1rem;
          }
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Animation classes for scroll effects */
        section[data-section] {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        /* Additional responsive improvements */
        @media (max-width: 480px) {
          .hero h1 {
            font-size: 1.75rem;
            line-height: 1.2;
          }
          
          .subhead {
            font-size: 1rem;
          }
          
          .cta-group {
            flex-direction: column;
            align-items: center;
          }
          
          .btn {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </>
  );
};

export default PersonalSite;