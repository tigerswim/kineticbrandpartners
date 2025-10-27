// src/app/b2b/page.tsx

"use client"

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProcessTimeline from '../../components/ProcessTimeline';
import ContactCTA from '../../components/ContactCTA';
import GridCard from '../../components/GridCard';

export default function B2BBrands() {
  return (
    <div className="site-wrapper">
      <Header currentPage="b2b" />
      <main>
        {/* Hero Section */}
        <section className="hero" style={{ padding: '6rem 0 4rem' }}>
          <div className="container">
            <h1>{"Stop Competing on Price Alone"}</h1>
            <p className="subhead" style={{ maxWidth: '900px', margin: '0 auto 2rem' }}>
              {"Your B2B brand looks like everyone else's. Your messaging is overly technical, and worse, forgettable. Your sales team defaults to discounts because they have no other weapon."}
            </p>
            <p className="subhead" style={{ maxWidth: '900px', margin: '0 auto 2.5rem', fontSize: '1.05rem' }}>
              {"Business buyers are still humans—they make emotional decisions and justify them with logic. I fix the fundamental problem: You haven't defined what you own in the market, so customers treat you like a commodity. Through forensic brand audits and strategic repositioning, I create differentiation that sticks in buyers' minds and justifies premium pricing."}
            </p>
            <div className="cta-group">
              <a href="#contact" className="btn btn-primary">
                {"Get Your Free B2B Brand Assessment"}
              </a>
            </div>
          </div>
        </section>

        {/* B2B Brand Transformation */}
        <section style={{ padding: '4rem 0', background: '#f7f9fc' }}>
          <div className="container">
            <div className="spotlight">
              <h2>{"B2B Brand Transformation & Positioning"}</h2>
            </div>

            <div className="values">
              <article>
                <h3>{"Brand Architecture Development"}</h3>
                <p>{"You'll know exactly which services to double down on, which to phase out, and which are cannibalizing each other—so your portfolio makes sense instead of competing with itself"}</p>
              </article>
              <article>
                <h3>{"B2B Positioning Strategy"}</h3>
                <p>{"Own a specific business problem that competitors can't credibly claim; even if they copy your words, they won't have your proof points"}</p>
              </article>
              <article>
                <h3>{"Sales Enablement Messaging"}</h3>
                <p>{"Equip your team with stories that connect rationally and emotionally, shortening sales cycles and turning customers into references who sell for you"}</p>
              </article>
            </div>
          </div>
        </section>

        {/* Strategic Planning & GTM */}
        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <div className="spotlight">
              <h2>{"Strategic Planning & GTM Strategy"}</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
              <GridCard
                title="Marketing Strategy Development"
                description="Develop comprehensive marketing strategies that align with business objectives and drive measurable growth across your target markets"
              />
              <GridCard
                title="Go-to-Market Planning"
                description="Build go-to-market strategies that identify optimal market entry points, pricing structures, and channel strategies for maximum impact"
              />
              <GridCard
                title="Innovation Roadmaps"
                description="Create innovation frameworks that balance market opportunity with organizational capability, turning new ideas into revenue streams"
              />
              <GridCard
                title="Portfolio Strategy"
                description="Optimize your service or product portfolio to maximize revenue, eliminate cannibalization, and create clear market positioning for each offering"
              />
            </div>
          </div>
        </section>

        {/* Growth & Performance */}
        <section style={{ padding: '4rem 0', background: '#f7f9fc' }}>
          <div className="container">
            <div className="spotlight">
              <h2>{"Growth & Performance"}</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
              <GridCard
                title="P&L Management"
                description="Own and optimize marketing P&L with full accountability for revenue growth, cost management, and profitability targets"
              />
              <GridCard
                title="Pricing & Revenue Optimization"
                description="Develop value-based pricing strategies that reflect true market positioning and maximize revenue without sacrificing market share"
              />
              <GridCard
                title="Marketing ROI & Attribution"
                description="Build measurement frameworks that connect marketing investment to business outcomes, proving value and informing resource allocation"
              />
              <GridCard
                title="Performance Analytics"
                description="Implement analytics systems that track what matters, from lead quality to customer lifetime value, enabling data-driven decisions"
              />
            </div>
          </div>
        </section>

        {/* Digital Transformation & MarTech */}
        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <div className="spotlight">
              <h2>{"Digital Transformation & MarTech"}</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
              <GridCard
                title="Digital Strategy"
                description="Modernize your marketing approach with digital-first strategies that meet buyers where they are and create seamless customer journeys"
              />
              <GridCard
                title="MarTech Stack Optimization"
                description="Audit, select, and integrate marketing technology that actually drives results—eliminating redundant tools and maximizing ROI"
              />
              <GridCard
                title="Performance Marketing"
                description="Build and scale digital demand generation programs that deliver qualified pipeline at predictable cost per acquisition"
              />
              <GridCard
                title="Marketing Automation"
                description="Implement automation systems that nurture leads, personalize engagement, and free your team to focus on strategy over tactical execution"
              />
            </div>
          </div>
        </section>

        {/* Fractional CMO */}
        <section style={{ padding: '4rem 0', background: '#f7f9fc' }}>
          <div className="container">
            <div className="spotlight">
              <h2>{"Fractional CMO / Interim Leadership"}</h2>
              <p style={{ fontSize: '1.15rem', lineHeight: '1.7' }}>
                {"You need CMO-level thinking but don't need a full-time hire yet."}
              </p>
            </div>

            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem', maxWidth: '900px', margin: '0 auto 2rem' }}>
              {"Whether you're scaling B2B services, moving upmarket, or building predictable demand generation, I embed as your strategic marketing leader. Not a PowerPoint consultant. Not someone who delegates to juniors. You get me, personally, making decisions and driving execution."}
            </p>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>What this looks like:</h4>
              <ul style={{ fontSize: '1.05rem', lineHeight: '1.8', marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li>Own marketing strategy and B2B pipeline targets</li>
                <li>Lead positioning transformation and sales enablement initiatives</li>
                <li>Build measurement systems that connect spending to actual business outcomes</li>
                <li>Mentor internal talent so they're ready to step up when you scale</li>
              </ul>
              <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.03)', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <p style={{ fontSize: '1.05rem', fontWeight: '600', margin: 0 }}>
                  {"The difference: When you hire me, you get 20 years of brand-building experience directly applied to your business. No account managers, no hand-offs, no lost-in-translation moments."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How This Actually Happens */}
        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <ProcessTimeline variant="b2b" />
          </div>
        </section>

        {/* Who This Is For */}
        <section style={{ padding: '4rem 0', background: '#f7f9fc' }}>
          <div className="container">
            <div style={{ padding: '3rem', background: 'rgba(59, 130, 246, 0.03)', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', textAlign: 'center', color: 'var(--primary-dark)' }}>
                {"Who This Is For"}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', maxWidth: '1100px', margin: '0 auto' }}>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#3b82f6' }}>
                    {"B2B Brands"}
                  </h4>
                  <ul style={{ marginLeft: '1.2rem', lineHeight: '1.8', fontSize: '0.98rem' }}>
                    <li>Are trapped in price-driven RFP processes because differentiation is weak</li>
                    <li>Need to move upmarket but lack the positioning and tools to command premium pricing</li>
                    <li>Want to build predictable demand generation that doesn't depend on referrals</li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#3b82f6' }}>
                    {"Ambitious Brands at Any Stage"}
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

        {/* Contact CTA */}
        <ContactCTA
          title="Let's Talk About Your B2B Challenges"
          description="Book a 60-minute brand diagnostic. I'll map your situation, identify your highest-ROI growth opportunities, and determine if working together makes sense. No pitch. No hard sell. Just a conversation between people who've both built brands that matter."
          ctaText="Schedule Your Free Brand Diagnostic"
          emailAddress="assessment@kineticbrandpartners.com"
          directEmailAddress="letstalk@kineticbrandpartners.com"
        />
      </main>
      <Footer />
    </div>
  );
}
