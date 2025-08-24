"use client";
import React, { useEffect, useState, useRef } from 'react';
import './PersonalSite.css';

// useHasScrolled hook to detect if the user has scrolled
function useHasScrolled() {
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setHasScrolled(true);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return hasScrolled;
}

// useInView hook to detect when an element is visible
function useInView(ref: React.RefObject<HTMLElement | null>, rootMargin = '0px') {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return isIntersecting;
}

// CountUp component for ticker animation
const CountUp: React.FC<{ end: number; duration?: number; suffix?: string; prefix?: string; trigger?: boolean }> = ({ end, duration = 2, suffix = '', prefix = '', trigger = false }) => {
  const [count, setCount] = useState(end);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || hasAnimated || !trigger) return;
    let start = 0;
    const increment = end / (duration * 60);
    const animate = () => {
      start += increment;
      if (start < end) {
        setCount(Number(start.toFixed(2)));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
        setHasAnimated(true);
      }
    };
    animate();
    // eslint-disable-next-line
  }, [end, duration, isClient, hasAnimated, trigger]);

  // On the server, just render the final value (no animation)
  return <span>{prefix}{count.toLocaleString(undefined, { maximumFractionDigits: 2 })}{suffix}</span>;
};

const PersonalSite: React.FC = () => {
  const hasScrolled = useHasScrolled();
  const countUpRefs = [useRef(null), useRef(null), useRef(null)];
  const inViews = countUpRefs.map(ref => useInView(ref));

  return (
    <div className="personal-site-container">
      <header className="personal-site-header">
        <div className="profile-section">
          <div className="profile-avatar">
            <img src="/Professional%20headshot.png" alt="Dan Hoeller headshot" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          </div>
          <div className="profile-info">
            <h1>Dan Hoeller</h1>
            <div className="intro-buttons profile-buttons">
              <a href="https://www.linkedin.com/in/danhoeller" target="_blank" rel="noopener noreferrer" className="intro-btn linkedin-btn">
                <img src="/LI-Logo.png" alt="LinkedIn" style={{ height: '1.0935em', verticalAlign: 'middle', display: 'inline-block' }} />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="personal-site-content">
        <section className="intro-section">
          <p className="intro-text">
            I believe the best marketing happens when strategy meets empathy, when data tells a story that actually matters, and when taking smart risks leads to moments that stick with people long after they've scrolled past.
          </p>
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '1.5rem 0' }} />
        </section>

        <section className="content-grid">
          <div className="content-item no-section-break">
            <div className="content-details">
              <span className="content-category">ACHIEVEMENTS</span>
            </div>
          </div>

          <div className="content-item achievements-content-item">
            <div className="shared-grid-container">
              <div className="achievements-blocks achievements-blocks-grouped">
                {/* Reach Block */}
                <div className="achievements-group-block achievements-column-block">
                  <div className="achievements-title">Reach</div>
                  <div className="achievements-metric-area">
                    <div className="achievements-block" ref={countUpRefs[0]} style={{ paddingBottom: '1.2em' }}>
                      <div className="achievements-stack">
                        <span className="achievements-emph"><CountUp end={3.95} suffix="B" trigger={hasScrolled && inViews[0]} /></span>
                        <div className="achievements-desc">Media Impressions</div>
                      </div>
                      <div className="achievements-note" style={{visibility: 'hidden'}}>(4x the category)</div>
                    </div>
                  </div>
                  <div className="achievements-block how-block-1" style={{ textIndent: '1.5em' }}>
                    Partnered with Super Bowl MVP Von Miller to join our fight to #FlipTheTurf in a social media campaign that drove more than 30,000 petition signatures by sports fans.
                  </div>
                </div>
                {/* Recognition Block */}
                <div className="achievements-group-block achievements-column-block">
                  <div className="achievements-title">Recognition</div>
                  <div className="achievements-metric-area">
                    <div className="achievements-block" ref={countUpRefs[1]} style={{ paddingBottom: '1.2em' }}>
                      <div className="achievements-stack">
                        <span className="achievements-emph"><CountUp end={10} suffix=" pts" prefix="+" trigger={hasScrolled && inViews[1]} /></span>
                        <div className="achievements-desc">Brand Awareness</div>
                      </div>
                      <div className="achievements-note" style={{visibility: 'hidden'}}>(4x the category)</div>
                    </div>
                  </div>
                  <div className="achievements-block how-block-1" style={{ textIndent: '1.5em' }}>
                    Optimized the media plan with learnings from Marketing Mix Modeling and A/B testing, pivoted to digital-first messaging, and balanced Brand and Performance tactics.
                  </div>
                </div>
                {/* Revenue Block */}
                <div className="achievements-group-block achievements-column-block">
                  <div className="achievements-title">Revenue</div>
                  <div className="achievements-metric-area">
                    <div className="achievements-block" ref={countUpRefs[2]} style={{ paddingBottom: '1.2em' }}>
                      <div className="achievements-stack">
                        <span className="achievements-emph"><CountUp end={8.2} suffix="%" prefix="+" trigger={hasScrolled && inViews[2]} /></span>
                        <div className="achievements-desc">2024 Revenue Growth</div>
                      </div>
                      <div className="achievements-note">(4x the category)</div>
                    </div>
                  </div>
                  <div className="achievements-block how-block-1" style={{ textIndent: '1.5em' }}>
                    Significantly outpaced category growth through a blend of compelling storytelling to a high-value consumer target and new product launches into white space categories.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* After Achievements section */}
          <div className="content-item no-section-break">
            <div className="content-details">
              <span className="content-category">CAREER SUMMARY</span>
              <div className="shared-grid-container">
                <div className="journey-grid-container">
                  <div className="journey-grid">
                    {/* Box 1 */}
                    <div className="journey-box">
                      <div>
                        <div style={{ fontSize: '1.15em', marginBottom: '0.05em', color: '#444', fontWeight: 600 }}>Technology Consulting</div>
                        <div style={{ color: '#888', fontSize: '0.98em', marginBottom: '0.5em' }}>1999-2004</div>
                        <img src="/MANH logo.png" alt="Manhattan Associates logo" style={{ width: '188px', height: 'auto', display: 'block', margin: '0 auto', paddingTop: '0.75em' }} />
                      </div>
                    </div>
                    {/* Box 2 (split into 2a/2b/2c internally) */}
                    <div className="journey-box" style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'flex-start' }}>
                      <div style={{ flex: 2, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', borderBottom: '1px solid #e0e0e0', padding: '0.5em 0', width: '100%' }}>
                        <div style={{ marginTop: '0.7em', fontSize: '0.98em', color: '#444' }}>
                          Built a strong base in customer service, supply chain logistics, and software design by leading large-scale software implementations for global clients and honing analytical problem-solving skills.
                        </div>
                      </div>
                      <div style={{ flex: 1, display: 'flex', height: '100%', width: '100%' }}>
                        <div style={{ flex: 1, borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', padding: '0.5em' }}>
                          <div style={{ fontWeight: 600, fontSize: '0.85em', color: '#444', marginBottom: '0.2em', textAlign: 'center', width: '100%' }}>Key Results</div>
                          <ul style={{ fontSize: '0.85em', color: '#444', textAlign: 'left', margin: 0, paddingLeft: '1.2em' }}>
                            <li>[Add Key Results]</li>
                          </ul>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', padding: '0.5em' }}>
                          <div style={{ fontWeight: 600, fontSize: '0.85em', color: '#444', marginBottom: '0.2em', textAlign: 'center', width: '100%' }}>Transferable Skills</div>
                          <ul style={{ fontSize: '0.85em', color: '#444', textAlign: 'left', margin: 0, paddingLeft: '1.2em' }}>
                            <li>[Add Transferable Skills]</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* Box 3 */}
                    <div className="journey-box">
                      <div>
                        <div style={{ fontSize: '1.15em', marginBottom: '0.05em', color: '#444', fontWeight: 600 }}>Marketing Foundation</div>
                        <div style={{ color: '#888', fontSize: '0.98em', marginBottom: '0.5em' }}>2006-2013</div>
                        <img src="/Johnson and Johnson logo2.png" alt="Johnson & Johnson logo" style={{ width: '188px', height: 'auto', display: 'block', margin: '0 auto', paddingTop: '0.75em' }} />
                      </div>
                    </div>
                    {/* Box 4 */}
                    <div className="journey-box" style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'flex-start' }}>
                      <div style={{ flex: 2, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', borderBottom: '1px solid #e0e0e0', padding: '0.5em 0', width: '100%' }}>
                        <div style={{ marginTop: '0.7em', fontSize: '0.98em', color: '#444' }}>
                          Transitioned into classic CPG brand management, taking P&amp;L ownership, driving growth for iconic brands, and leading early digital transformation initiatives.
                        </div>
                      </div>
                      <div style={{ flex: 1, display: 'flex', height: '100%', width: '100%' }}>
                        <div style={{ flex: 1, borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', padding: '0.5em' }}>
                          <div style={{ fontWeight: 600, fontSize: '0.85em', color: '#444', marginBottom: '0.2em', textAlign: 'center', width: '100%' }}>Key Results</div>
                          <ul style={{ fontSize: '0.85em', color: '#444', textAlign: 'left', margin: 0, paddingLeft: '1.2em' }}>
                            <li>[Add Key Results]</li>
                          </ul>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', padding: '0.5em' }}>
                          <div style={{ fontWeight: 600, fontSize: '0.85em', color: '#444', marginBottom: '0.2em', textAlign: 'center', width: '100%' }}>Transferable Skills</div>
                          <ul style={{ fontSize: '0.85em', color: '#444', textAlign: 'left', margin: 0, paddingLeft: '1.2em' }}>
                            <li>P&amp;L Ownership / Management</li>
                            <li>Brand Fundamentals and Frameworks</li>
                            <li>Translating Insights into Action</li>
                            <li>Large and Small Brand Management</li>
                            <li>New Product Development &amp; Commercialization</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* Box 5 */}
                    <div className="journey-box">
                      <div>
                        <div style={{ fontSize: '1.15em', marginBottom: '0.05em', color: '#444', fontWeight: 600 }}>Marketing Leadership</div>
                        <div style={{ color: '#888', fontSize: '0.98em', marginBottom: '0.5em' }}>2013-2024</div>
                        <img src="/CENT logo.png" alt="Central Garden & Pet logo" style={{ width: '188px', height: 'auto', display: 'block', margin: '0 auto', paddingTop: '0.75em' }} />
                      </div>
                    </div>
                    {/* Box 6 */}
                    <div className="journey-box" style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'flex-start' }}>
                      <div style={{ flex: 2, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', borderBottom: '1px solid #e0e0e0', padding: '0.5em 0', width: '100%' }}>
                        <div style={{ marginTop: '0.7em', fontSize: '0.98em', color: '#444' }}>
                          Executive leadership roles, serving as the de facto CMO for a $1.5B segment, leading a 25-person team, and driving significant digital transformation and brand growth.
                        </div>
                      </div>
                      <div style={{ flex: 1, display: 'flex', height: '100%', width: '100%' }}>
                        <div style={{ flex: 1, borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '0.5em' }}>
                          <div style={{ fontWeight: 600, fontSize: '0.85em', color: '#444', marginBottom: '0.2em' }}>Key Results</div>
                          <ul style={{ fontSize: '0.85em', color: '#444', textAlign: 'left', margin: 0, paddingLeft: '1.2em' }}>
                            <li>2 Clio Sports Awards</li>
                            <li>Revenue, EBIT, and Share Growth</li>
                            <li>Drove 46% POS growth via MLB team partnerships</li>
                            <li>Delivered nearly 4B impressions via #FlipTheTurf social media campaign</li>
                          </ul>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '0.5em' }}>
                          <div style={{ fontWeight: 600, fontSize: '0.85em', color: '#444', marginBottom: '0.2em' }}>Transferable Skills</div>
                          <ul style={{ fontSize: '0.85em', color: '#444', textAlign: 'left', margin: 0, paddingLeft: '1.2em' }}>
                            <li>Servant-Leadership, B2B2C, Regulated Products</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: 0 }} />

          <div className="content-item career-highlights-section">
            <div className="content-details">
              <span className="content-category">CAREER HIGHLIGHTS</span>
              <ul style={{ marginTop: '1em', marginBottom: '1em', paddingLeft: '1.5em', fontSize: '1.05em', color: '#444' }}>
                <li>Led a 25-person marketing team to deliver 46% POS growth and two Clio Sports Awards.</li>
                <li>Drove digital transformation and brand repositioning for a $1.5B business segment.</li>
                <li>Launched multiple new products and expanded into white space categories.</li>
                <li>Built foundational skills in technology consulting and supply chain optimization.</li>
                <li>Managed P&amp;L and drove growth for iconic consumer brands at Johnson &amp; Johnson.</li>
              </ul>
            </div>
          </div>

          <div className="content-item">
            <div className="content-details">
              <span className="content-category">PERSONAL</span>
              <p className="content-description">
                Memberships and Activities
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PersonalSite;
