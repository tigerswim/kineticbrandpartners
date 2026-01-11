// About Me Page: Personal side beyond the professional
// Showcases family, interests (AI/coding), and athletics

"use client";

import Image from "next/image";
import {
  Activity,
  Briefcase,
  TrendingUp,
  Award,
  Code,
  Database,
  Cloud,
  Key,
  Globe,
  ExternalLink,
  GitHub,
  Zap,
} from "react-feather";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GradientMesh from "@/components/GradientMesh";
import "../../styles/kinetic-design-system.css";
import "../../styles/mockup-b.css";
import "../../styles/about.css";

export default function AboutPage() {
  return (
    <div className="kinetic-page">
      <GradientMesh />
      <Header />

      <main>
        {/* Hero Section - Compact intro */}
        <section className="about-hero">
          <div className="kinetic-container">
            <div className="about-hero-content">
              <div className="kinetic-badge animate-slide-up">
                <span>The Whole Person</span>
              </div>
              <h1 className="about-hero-title animate-slide-up delay-1">
                Beyond the{" "}
                <span className="kinetic-title-gradient">resume</span>
              </h1>
              <p className="about-hero-text animate-slide-up delay-2">
                There&apos;s more to life than work of course, and I&apos;m
                lucky to have an incredible family. I love learning by doing,
                endurance sports, and cheering on my favorite teams.
              </p>
            </div>
          </div>
        </section>

        {/* Family Section */}
        <section className="kinetic-section about-family">
          <div className="kinetic-container">
            <div className="about-family-grid">
              <div className="about-image-card animate-slide-in">
                <Image
                  src="/images/family-sketch.png"
                  alt="Family sketch"
                  width={500}
                  height={400}
                  className="about-sketch-image"
                />
              </div>
              <div className="about-content-block animate-slide-up">
                <span className="kinetic-section-badge">Family</span>
                <h2 className="kinetic-section-title">What matters most</h2>
                <div className="about-text-content">
                  <p>
                    Along with my amazing wife, we wrangle these three
                    knuckleheads every day. It&apos;s been a joy to see them
                    grow, develop, and learn over the years, and we still
                    can&apos;t believe the oldest will be in college soon! Not
                    pictured: our two dogs, a mini goldendoodle and a
                    sheepadoodle. With only dudes and doodles in the house; my
                    wife is a saint.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interests Section - AI/Coding Projects */}
        <section className="kinetic-section kinetic-section--gray about-interests">
          <div className="kinetic-container">
            <div className="kinetic-section-header">
              <span className="kinetic-section-badge">Interests</span>
              <h2 className="kinetic-section-title">
                Learning AI through Building
              </h2>
            </div>

            <div className="about-interests-intro animate-slide-up">
              <p>
                Instead of taking courses and earning certifications, I chose to
                learn AI by building. Without writing code I&apos;ve developed
                this website and those below by simply asking questions, making
                changes, and fixing mistakes...but always learning. Along the
                way I&apos;ve built a sense for where the AI hype is justified,
                and where it isn&apos;t.
              </p>
            </div>

            <div className="about-tech-stack animate-slide-up delay-1">
              <h3>Tech Stack</h3>
              <div className="about-tech-badges">
                <span className="about-tech-badge">
                  <Code size={16} /> Claude Code
                </span>
                <span className="about-tech-badge">
                  <GitHub size={16} /> GitHub
                </span>
                <span className="about-tech-badge">
                  <Globe size={16} /> Netlify
                </span>
                <span className="about-tech-badge">
                  <Database size={16} /> Supabase
                </span>
                <span className="about-tech-badge">
                  <Cloud size={16} /> Cloudflare
                </span>
                <span className="about-tech-badge">
                  <Key size={16} /> Google OAuth
                </span>
                <span className="about-tech-badge">
                  <Zap size={16} /> n8n
                </span>
                <span className="about-tech-badge">
                  <Zap size={16} /> Zapier
                </span>
                <span className="about-tech-badge">
                  <Code size={16} /> APIs
                </span>
              </div>
            </div>

            <div className="about-projects-grid">
              {/* RacePrep Card */}
              <div className="kinetic-card animate-slide-up delay-2">
                <div className="about-project-favicon">
                  <Image
                    src="/raceprep-favicon.png"
                    alt="RacePrep"
                    width={48}
                    height={48}
                  />
                </div>
                <h3 className="about-project-title">RacePrep</h3>
                <p className="about-project-desc">
                  A triathlon training app built to scratch my own itch for
                  better visibility into swim, bike, and run training beyond
                  Strava. Building this taught me how to work with complex
                  relational data and design interfaces that surface just the
                  right information.
                </p>
                <div className="about-project-tech">
                  <span>Next.js</span>
                  <span>Supabase</span>
                  <span>TypeScript</span>
                  <span>APIs</span>
                </div>
                <a
                  href="https://raceprep.kineticbrandpartners.com/"
                  className="kinetic-btn kinetic-btn--secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Live <ExternalLink size={16} />
                </a>
              </div>

              {/* Job Tracker Card */}
              <div className="kinetic-card animate-slide-up delay-3">
                <div className="about-project-favicon">
                  <Image
                    src="/job-tracker-favicon.png"
                    alt="Job Tracker"
                    width={48}
                    height={48}
                  />
                </div>
                <h3 className="about-project-title">Job Tracker</h3>
                <p className="about-project-desc">
                  Job hunting isn&apos;t about applying more, it&apos;s about
                  networking smarter and keeping track of your actions. This app
                  tracks every contact and connection in one place. Think of it
                  as the job seeker's CRM.
                </p>
                <div className="about-project-tech">
                  <span>Next.js</span>
                  <span>Supabase</span>
                  <span>OAuth</span>
                  <span>n8n</span>
                </div>
                <a
                  href="https://job-tracker.kineticbrandpartners.com/"
                  className="kinetic-btn kinetic-btn--secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Live <ExternalLink size={16} />
                </a>
              </div>

              {/* SaaS Metrics Calculator Card */}
              <div className="kinetic-card animate-slide-up delay-4">
                <div className="about-project-favicon">
                  <Image
                    src="/saas-favicon.svg"
                    alt="SaaS Metrics Calculator"
                    width={48}
                    height={48}
                  />
                </div>
                <h3 className="about-project-title">SaaS Metrics Calculator</h3>
                <p className="about-project-desc">
                  A dashboard for measuring key SaaS KPIs and seeing how they
                  respond to different assumptions. The app tailors views based
                  on the user&apos;s role and recommends where to focus
                  energy—showing leaders what actually matters.
                </p>
                <div className="about-project-tech">
                  <span>Next.js</span>
                  <span>TypeScript</span>
                  <span>Netlify</span>
                </div>
                <a
                  href="https://saas-metrics-calculator.netlify.app/"
                  className="kinetic-btn kinetic-btn--secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Live <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Athletics Section */}
        <section className="kinetic-section about-athletics">
          <div className="kinetic-container">
            <div className="kinetic-section-header">
              <span className="kinetic-section-badge">Athletics</span>
              <h2 className="kinetic-section-title">Athletic Journey</h2>
            </div>

            <div className="about-interests-intro animate-slide-up">
              <p>
                I&apos;ve been an athlete all my life. It taught me commitment,
                grit, teamwork, time management, and more. From competitive
                swimming in college where I walked on to the team and became a 4
                year letterman and co-captain my senior year, to road and MTB
                cycling, and to Ironman races in more recent years, I&apos;ve
                always been drawn towards an active lifestyle.
              </p>
            </div>

            <div className="about-athletics-grid">
              {/* Triathlon Card */}
              <div className="about-athletics-card animate-scale-in delay-1">
                <div className="about-athletics-image">
                  <Image
                    src="/images/Ironman-sketch.png"
                    alt="Ironman triathlon"
                    width={500}
                    height={400}
                    className="about-sketch-image"
                  />
                </div>
                <div className="about-athletics-content">
                  <h3 className="about-athletics-title">
                    <Activity size={24} /> Triathlon
                  </h3>
                  <p>
                    I got into triathlons because my brother, college buddies,
                    and other friends were competing and having a great time.
                    FOMO is a hell of a motivator, so I got into triathlons too!
                    There&apos;s nothing like a Half or Full Ironman on your
                    calendar to focus your training.
                  </p>
                </div>
              </div>

              {/* Swimming Card */}
              <div className="about-athletics-card animate-scale-in delay-2">
                <div className="about-athletics-image">
                  <Image
                    src="/images/Clemson-swimming-sketch.png"
                    alt="Clemson swimming"
                    width={500}
                    height={400}
                    className="about-sketch-image"
                  />
                </div>
                <div className="about-athletics-content">
                  <h3 className="about-athletics-title">
                    <Award size={24} /> Collegiate Swimming
                  </h3>
                  <p>
                    I started on a local summer swim team around the age of 6,
                    and swam competitive through college. I learned first hand
                    that the kids with determination often beat those with
                    natural talent, and that&apos;s the only way I made it as
                    far as I did! This sport gave me lifelong friends, a strong
                    work ethic, and a love for the water.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-contact">
          <div className="kinetic-container">
            <div className="mb-contact-card">
              <div className="mb-contact-inner">
                <h2 className="mb-contact-title">Let&apos;s Connect</h2>
                <p className="mb-contact-text">
                  Want to chat about projects, ideas, or just say hello?
                </p>
                <a
                  href="mailto:letstalk@kineticbrandpartners.com"
                  className="mb-contact-email"
                >
                  ✉️ letstalk@kineticbrandpartners.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
