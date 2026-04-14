// Earnix Content Page - Unlisted page for Be'eri Mart follow-up
// Brand colors: Orange #F44D2E, Dark Teal #03505C
// Professional, data-driven, outcome-focused messaging

"use client";

import Image from "next/image";
import Footer from "@/components/Footer";
import GradientMesh from "@/components/GradientMesh";
import EarnixNav from "@/components/EarnixNav";
import "../../styles/kinetic-design-system.css";
import "../../styles/earnix.css";

export default function EarnixPage() {
  return (
    <div className="kinetic-page earnix-page">
      <GradientMesh />
      <EarnixNav />

      <main>
        {/* Hero Section */}
        <section className="earnix-hero">
          <div className="kinetic-container">
            <div className="earnix-hero-content">
              <div className="earnix-logo-container animate-slide-up">
                <Image
                  src="/logos/Earnix_id_full.svg"
                  alt="Earnix"
                  width={200}
                  height={40}
                  className="earnix-logo"
                  priority
                />
              </div>
              <div className="kinetic-badge earnix-badge animate-slide-up delay-1">
                <span>Head of Global Product &amp; Customer Marketing</span>
              </div>
              <h1 className="earnix-hero-title animate-slide-up delay-2">
                Strategic Marketing Leadership for{" "}
                <span className="earnix-title-gradient">Earnix</span>
              </h1>
              <div className="earnix-hero-meta animate-slide-up delay-3">
              </div>
            </div>
          </div>
        </section>

        {/* Proof at a Glance */}
        <section className="kinetic-section earnix-proof-section">
          <div className="kinetic-container">
            <div className="kinetic-section-header">
              <span className="kinetic-section-badge earnix-accent-badge">
                Recent Stats
              </span>
            </div>
            {/* Row 1: Bio + Stats */}
            <div className="earnix-proof-grid">
              <div className="earnix-proof-bio">
                <p>
                  15+ years leading brand and product marketing across
                  multiple industries. SVP Marketing at Central Garden
                  &amp; Pet ($3B+ company), leading the function across a portfolio of brands. Earlier:
                  7 years at Johnson &amp; Johnson across Consumer and Medical Devices,
                  5 years at Manhattan Associates in enterprise software implementations.
                  MBA, UVA Darden.
                </p>
              </div>

              <div className="earnix-proof-stats">
                <div className="earnix-proof-stat">
                  <div className="earnix-result-value">8.2%</div>
                  <div className="earnix-result-label">Brand transformation · 4x category rate</div>
                </div>
                <div className="earnix-proof-stat">
                  <div className="earnix-result-value">3.95B</div>
                  <div className="earnix-result-label">#FlipTheTurf impressions · 2x Clio Awards</div>
                </div>
                <div className="earnix-proof-stat">
                  <div className="earnix-result-value">25</div>
                  <div className="earnix-result-label">Person team · 6 functions · cross-functional</div>
                </div>
                <div className="earnix-proof-stat">
                  <div className="earnix-result-value">$20MM+</div>
                  <div className="earnix-result-label">Annual product innovation pipeline</div>
                </div>
                <div className="earnix-proof-stat">
                  <div className="earnix-result-value">25%</div>
                  <div className="earnix-result-label">Marketing efficiency improvement (MMM)</div>
                </div>
                <div className="earnix-proof-stat">
                  <div className="earnix-result-value">$7MM</div>
                  <div className="earnix-result-label">Incremental revenue · Home Depot partnership</div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Building SaaS Tools with AI */}
        <section className="kinetic-section kinetic-section--gray earnix-saas-section">
          <div className="kinetic-container">
            <div className="kinetic-section-header">
              <span className="kinetic-section-badge earnix-accent-badge">
                Building SaaS Tools with AI
              </span>
            </div>
            <div className="earnix-proof-grid">
              <div className="earnix-proof-bio">
                <p>
                  Intentionally pivoting to B2B SaaS, including hands-on work building with AI.
                  Built a SaaS metrics calculator to better understand how KPIs interconnect.
                </p>
                <p>
                  This proof of concept tool
                  summarizes performance, highlights metrics needing attention, and suggests
                  optimizations. The Map view visualizes dependencies between KPIs, showing how
                  changes in one area cascade through the business. Change values with the Configure
                  button to see how KPIs and recommendations are impacted.
                </p>
              </div>

              <a
                href="https://earnix-metrics-calculator.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="earnix-calc-preview"
                aria-label="View Earnix SaaS Metrics Calculator"
              >
                <div className="earnix-calc-preview-inner">
                  <Image
                    src="/images/Earnix SaaS Metrics Calculator Screenshot.png"
                    alt="Earnix SaaS Metrics Calculator"
                    width={600}
                    height={400}
                    className="earnix-calc-image"
                  />
                  <div className="earnix-calc-fade" />
                  <div className="earnix-calc-overlay">
                    <span>View Full Calculator →</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Role-by-Role Match */}
        <section className="kinetic-section earnix-role-match">
          <div className="kinetic-container">
            <div className="kinetic-section-header">
              <span className="kinetic-section-badge earnix-accent-badge">
                Role Alignment
              </span>
              <h2 className="kinetic-section-title">
                Experience That Maps to This Role
              </h2>
            </div>

            <div className="earnix-proof-cards">
              <div className="earnix-proof-card animate-slide-up delay-1">
                <h3 className="earnix-proof-card-title">Multi-Product Positioning</h3>
                <p className="earnix-proof-card-text">
                  Built differentiated product messaging across multiple categories for the $250MM
                  Pennington brand — each with distinct competitive dynamics — while maintaining
                  a coherent portfolio narrative. Led comprehensive brand transformation with
                  repositioned messaging and refreshed visual identity.
                </p>
              </div>

              <div className="earnix-proof-card animate-slide-up delay-2">
                <h3 className="earnix-proof-card-title">GTM Execution &amp; Sales Enablement</h3>
                <p className="earnix-proof-card-text">
                  Built product innovation pipeline from insight to launch,
                  partnered with Sales and Finance on business cases securing expanded distribution and
                  price increases, and created an integrated planning framework synchronizing
                  Product, Sales, and Marketing. At J&amp;J Ortho Clinical Diagnostics,
                  deployed iPad sales enablement tools for 150+ field reps.
                </p>
              </div>

              <div className="earnix-proof-card animate-slide-up delay-3">
                <h3 className="earnix-proof-card-title">Customer Marketing &amp; Advocacy</h3>
                <p className="earnix-proof-card-text">
                  Led Customer Marketing function at Central Garden &amp; Pet. Negotiated the
                  Home Depot partnership at the executive level, integrating consumer insights
                  with ROI-based business case development.{" "}
                  J&amp;J &ldquo;Thanks, Mom&rdquo;
                  campaign demonstrates consumer-first storytelling at scale: 290MM
                  impressions, Global Burke Award.
                </p>
              </div>

              <div className="earnix-proof-card animate-slide-up delay-4">
                <h3 className="earnix-proof-card-title">Team Leadership</h3>
                <p className="earnix-proof-card-text">
                  Led a 25-person organization spanning Insights, Innovation, Digital, Creative,
                  Customer Marketing, and Customer Care at Central Garden &amp; Pet. Member of
                  the Central Leadership Council. Player-coach style that develops talent and
                  builds collaborative, high-performing teams.
                </p>
              </div>

              <div className="earnix-proof-card animate-slide-up delay-5">
                <h3 className="earnix-proof-card-title">Analytics &amp; Measurement</h3>
                <p className="earnix-proof-card-text">
                  Built real-time marketing dashboards and used Marketing Mix Modeling to optimize
                  media mix and campaign timing.{" "}
                  Also led digital transformation initiatives earning retailer &ldquo;Best in Class&rdquo;
                  recognition.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
