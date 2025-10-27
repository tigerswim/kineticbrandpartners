// src/app/page.tsx

"use client"

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import ContactCTA from '../components/ContactCTA';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="site-wrapper">
      <Header currentPage="home" />
      <main>
        {/* Hero Section */}
        <section className="hero" style={{ padding: '6rem 0 4rem' }}>
          <div className="container">
            <h1>{"Your Brand Is Invisible in a World Full of Noise."}</h1>
            <p className="subhead" style={{ maxWidth: '900px', margin: '0 auto 2.5rem' }}>
              {"I turn forgettable brands into household names that people choose, love, and recommend—not just the cheapest option on the shelf."}
            </p>
            <div className="cta-group">
              <Link href="/consumer" className="btn btn-primary">
                {"Consumer Brands →"}
              </Link>
              <Link href="/b2b" className="btn btn-secondary">
                {"B2B Brands →"}
              </Link>
            </div>
          </div>
        </section>

        {/* Value Proposition Cards */}
        <section style={{ padding: '4rem 0', background: '#f7f9fc' }}>
          <div className="container">
            <div className="values">
              <article>
                <h3>{"Built Brands Both Large and Small"}</h3>
                <p>
                  {"20+ years managing P&Ls and marketing teams across baby care, personal care, lawn & garden, and more. Launched consumer products into Target, Walmart, The Home Depot, Amazon, and everywhere in between."}
                </p>
              </article>

              <article>
                <h3>{"Focused Expertise"}</h3>
                <p>
                  {"Big consulting firms charge $50K+ for strategy decks built by associates who've never launched a product. You're paying for my direct expertise and the ability to diagnose fast, decide faster, and execute."}
                </p>
              </article>

              <article>
                <h3>{"You Get Me. Not a Team."}</h3>
                <p>
                  {"Every insight, every framework, every recommendation comes from someone who's actually done the job. No bait-and-switch. No 'I'll introduce you to the team.' Just direct access to two decades of brand-building expertise."}
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Service Split Section */}
        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <div className="spotlight">
              <h2>{"What I Do"}</h2>
              <p>{"Choose your path based on who you serve"}</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
              gap: '2.5rem',
              marginTop: '3rem'
            }}>
              <ServiceCard
                title="Consumer Brands"
                description="Turn forgettable consumer brands into household names. From shelf to cart, online to retail. Build brands that people choose, love, and recommend."
                outcomes="$50M+ launches • 40% price premiums • 10M+ impressions"
                ctaText="Explore Consumer Brands →"
                ctaLink="/consumer"
                colorScheme="consumer"
              />

              <ServiceCard
                title="B2B Brands"
                description="Stop competing on price alone. Build differentiation that sticks in buyers' minds and justifies premium pricing. Transform sales teams with positioning that converts."
                outcomes="Premium positioning • Sales enablement • Predictable growth"
                ctaText="Explore B2B Brands →"
                ctaLink="/b2b"
                colorScheme="b2b"
              />
            </div>
          </div>
        </section>

        {/* Quick About */}
        <section style={{ padding: '4rem 0', background: '#f7f9fc' }}>
          <div className="container">
            <div className="spotlight">
              <h2>{"Why This Works"}</h2>
            </div>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <p style={{ fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                {"I've spent 20+ years building brands from startup environments to enterprise organizations. Drove billions of impressions that bolstered brand health and grew share. Led companies through positioning transformations that grew revenue."}
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', fontWeight: '600', color: 'var(--primary)' }}>
                {"Target • Walmart • The Home Depot • Amazon • Independent Retailers"}
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <ContactCTA
          title="Let's Talk About What's Actually Possible"
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
