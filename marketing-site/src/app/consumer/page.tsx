// src/app/consumer/page.tsx

"use client"

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProcessTimeline from '../../components/ProcessTimeline';
import ContactCTA from '../../components/ContactCTA';
import GridCard from '../../components/GridCard';

export default function ConsumerBrands() {
  return (
    <div className="site-wrapper">
      <Header currentPage="consumer" />
      <main>
        {/* Hero Section */}
        <section className="hero" style={{ padding: '6rem 0 4rem' }}>
          <div className="container">
            <h1>{"Make People Actually Care About Your Brand"}</h1>
            <p className="subhead" style={{ maxWidth: '900px', margin: '0 auto 2rem' }}>
              {"Consumers see 5,000+ ads per day. Your product sits next to 47 competitors on the shelf. Your digital ads get skipped in 3 seconds."}
            </p>
            <p className="subhead" style={{ maxWidth: '900px', margin: '0 auto 2.5rem', fontSize: '1.05rem' }}>
              {"I solve the fundamental problem that kills most consumer brands: You're talking about features when people buy feelings. Through deep consumer psychology research and brand positioning that taps into real human motivations, I create brands that people remember and buy."}
            </p>
            <div className="cta-group">
              <a href="#contact" className="btn btn-primary">
                {"Get Your Free Consumer Brand Assessment"}
              </a>
            </div>
          </div>
        </section>

        {/* Consumer Brand Transformation */}
        <section style={{ padding: '4rem 0', background: '#f7f9fc' }}>
          <div className="container">
            <div className="spotlight">
              <h2>{"Consumer Brand Transformation"}</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
              <GridCard
                title="Consumer Insight Development"
                description="Discover the unspoken desires your target customer can't even articulate—so you own the emotional territory competitors don't even know exists"
              />
              <GridCard
                title="Brand Storytelling Frameworks"
                description="Craft narratives that turn mundane purchases into identity statements, so customers choose you even when cheaper alternatives are right there"
              />
              <GridCard
                title="Packaging & Visual Identity"
                description="Design strategy that stops the scroll, commands shelf presence, and communicates your brand promise in 0.3 seconds—the average time consumers spend looking at products"
              />
              <GridCard
                title="Omnichannel Experience Design"
                description="Create consistent brand moments from social media to retail environments that compound into lasting brand preference"
              />
            </div>

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.03)', borderRadius: '8px', borderLeft: '4px solid #f97316' }}>
              <p style={{ fontSize: '1.05rem', fontWeight: '600', margin: 0 }}>
                {"Real Results: Launched products that went from zero to $50M+ retail velocity. Built CPG brands that command 40% price premiums. Created campaigns that generated 10M+ organic social impressions."}
              </p>
            </div>
          </div>
        </section>

        {/* Launch Products That Actually Sell */}
        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <div className="spotlight">
              <h2>{"Launch Products That Actually Sell"}</h2>
              <p style={{ fontSize: '1.15rem', lineHeight: '1.7' }}>
                {"67% of new consumer products fail within two years. Most brands spend 80% of their launch budget on tactics that don't drive trial or repeat purchase."}
              </p>
            </div>

            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2.5rem', maxWidth: '900px', margin: '0 auto 2.5rem' }}>
              {"I build consumer marketing engines designed for the realities of modern retail—where shelf space is difficult to earn, Amazon owns discovery, and TikTok can make or break a brand overnight. Turn your launches into sustained growth platforms, not expensive experiments."}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
              <GridCard
                title="Consumer Segmentation Strategies"
                description="Identify the 20% of customers who drive 80% of volume, so you stop marketing to everyone and start dominating the segments that actually buy"
              />
              <GridCard
                title="Retail Partnership Development"
                description="Navigate buyer meetings, secure prime shelf placement, and structure trade promotion calendars that build momentum instead of just moving inventory"
              />
              <GridCard
                title="Digital-First Campaign Architecture"
                description="Social media strategies that create authentic buzz, influencer partnerships that drive actual sales, and content frameworks that perform across TikTok, Instagram, and Amazon"
              />
              <GridCard
                title="Launch Sequencing Playbooks"
                description="90-day roadmaps that build from sampling to trial to repeat purchase, so early wins fund expansion—not the other way around"
              />
            </div>
          </div>
        </section>

        {/* Create Products People Actually Want */}
        <section style={{ padding: '4rem 0', background: '#f7f9fc' }}>
          <div className="container">
            <div className="spotlight">
              <h2>{"Create Products People Actually Want"}</h2>
              <p style={{ fontSize: '1.15rem', lineHeight: '1.7' }}>
                {"Most new products are line extensions of existing brands, while innovation dies in focus groups because companies ask consumers what they want instead of observing what they do."}
              </p>
            </div>

            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2.5rem', maxWidth: '900px', margin: '0 auto 2.5rem' }}>
              {"I approach product development like an anthropologist, not a marketer. Through ethnographic research and behavioral analysis, I identify unmet needs that consumers can't articulate—and then create products that feel inevitable once they hit the market."}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
              <GridCard
                title="Consumer Behavior Mapping"
                description="Observe real usage patterns, purchase triggers, and frustration points that traditional market research misses"
              />
              <GridCard
                title="White Space Identification"
                description="Find the intersection of consumer need and competitive vulnerability where new products can win"
              />
              <GridCard
                title="Concept Development & Testing"
                description="Rapid prototyping and real-world testing that validates demand before major investment"
              />
              <GridCard
                title="Go-to-Market Acceleration"
                description="Launch strategies that build from early adopters to mainstream adoption without losing brand premium"
              />
            </div>
          </div>
        </section>

        {/* Fractional CMO */}
        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <div className="spotlight">
              <h2>{"Fractional CMO / Interim Leadership"}</h2>
              <p style={{ fontSize: '1.15rem', lineHeight: '1.7' }}>
                {"You need CMO-level thinking but don't need a full-time hire yet."}
              </p>
            </div>

            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem', maxWidth: '900px', margin: '0 auto 2rem' }}>
              {"Whether you're launching a consumer brand, navigating retail expansion, or scaling DTC channels, I embed as your strategic marketing leader. Not a PowerPoint consultant. Not someone who delegates to juniors. You get me, personally, making decisions and driving execution."}
            </p>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>What this looks like:</h4>
              <ul style={{ fontSize: '1.05rem', lineHeight: '1.8', marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li>Own marketing strategy and consumer volume targets</li>
                <li>Lead your team through critical launches, rebrands, or retail expansion</li>
                <li>Build measurement systems that connect spending to actual business outcomes</li>
                <li>Mentor internal talent so they're ready to step up when you scale</li>
              </ul>
              <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.03)', borderRadius: '8px', borderLeft: '4px solid #f97316' }}>
                <p style={{ fontSize: '1.05rem', fontWeight: '600', margin: 0 }}>
                  {"The difference: When you hire me, you get 20 years of brand-building experience directly applied to your business. No account managers, no hand-offs, no lost-in-translation moments."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How This Actually Happens */}
        <section style={{ padding: '4rem 0', background: '#f7f9fc' }}>
          <div className="container">
            <ProcessTimeline variant="consumer" />
          </div>
        </section>

        {/* Who This Is For */}
        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <div style={{ padding: '3rem', background: 'white', borderRadius: '12px', border: '2px solid #f97316', boxShadow: '0 4px 16px rgba(249, 115, 22, 0.15)' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', textAlign: 'center', color: 'var(--primary-dark)' }}>
                {"Who This Is For"}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', maxWidth: '1100px', margin: '0 auto' }}>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#f97316' }}>
                    {"Consumer Brands"}
                  </h4>
                  <ul style={{ marginLeft: '1.2rem', lineHeight: '1.8', fontSize: '0.98rem' }}>
                    <li>Need to break out of regional distribution into national retail</li>
                    <li>Are losing shelf space to private label or new competitors</li>
                    <li>Want to build direct-to-consumer channels that actually profit</li>
                    <li>Have great products but generic positioning that doesn't drive preference</li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#f97316' }}>
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
          title="Let's Talk About Your Consumer Brand"
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
