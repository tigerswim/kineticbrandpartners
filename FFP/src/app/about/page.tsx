import { Section } from "@/components/section";
import { CtaSection } from "@/components/cta-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Future Forward Partners",
  description: "25+ years of product leadership. Operators, not advisors.",
};

export default function AboutPage() {
  return (
    <>
      {/* Opening Statement */}
      <Section>
        <div className="max-w-3xl">
          <p className="text-2xl md:text-3xl text-text-primary leading-relaxed">
            Future Forward Partners was founded on a simple belief: companies
            don't need more consultants. They need experienced operators who can
            step in and deliver.
          </p>
        </div>
      </Section>

      {/* Jeff Gantt Section */}
      <Section bg="surface-alt">
        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Photo placeholder */}
          <div className="flex justify-center md:justify-start">
            <div className="w-48 h-48 bg-bg-surface border border-border rounded-full flex items-center justify-center">
              <span className="text-5xl text-text-muted font-bold">JG</span>
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <h2>Jeff Gantt</h2>
            <p className="mt-1 text-text-muted">President</p>

            <p className="mt-6 text-text-secondary leading-relaxed">
              Jeff has spent 25+ years building and scaling software products
              across supply chain, healthcare, mobile, and AI — at companies
              like Manhattan Associates, AirWatch, and Elemica.
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <h3 className="text-lg text-accent">Career Highlights</h3>
                <ul className="mt-2 space-y-2 text-text-secondary text-sm">
                  <li>
                    • Led product strategy for enterprise supply chain platforms
                    serving Fortune 500 companies
                  </li>
                  <li>
                    • Scaled product teams from 5 to 50+ at high-growth
                    startups
                  </li>
                  <li>
                    • Contributed to multiple successful exits in SaaS and
                    mobile
                  </li>
                  <li>
                    • Launched AI-driven products in logistics and
                    transportation
                  </li>
                </ul>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/in/jeffgantt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80 transition-colors text-sm"
                >
                  Connect on LinkedIn →
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* How We Work */}
      <Section>
        <h2 className="text-center mb-12">How We Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="text-accent">Understand</h3>
            <p className="mt-3 text-text-secondary text-sm">
              Deep dive into your business, product, and challenges
            </p>
          </div>
          <div>
            <h3 className="text-accent">Strategize</h3>
            <p className="mt-3 text-text-secondary text-sm">
              Define the approach, roadmap, and success metrics
            </p>
          </div>
          <div>
            <h3 className="text-accent">Execute</h3>
            <p className="mt-3 text-text-secondary text-sm">
              Embed with your team and deliver
            </p>
          </div>
          <div>
            <h3 className="text-accent">Transition</h3>
            <p className="mt-3 text-text-secondary text-sm">
              Hand off with documentation and ongoing support options
            </p>
          </div>
        </div>
      </Section>

      {/* Network Statement */}
      <Section bg="surface-alt">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-text-secondary leading-relaxed">
            Beyond Jeff's direct engagement, FFP draws on a curated network of
            senior product managers, designers, architects, and engineers — each
            vetted for Fortune 500 and startup experience. When your challenge
            requires specialized expertise, we bring in the right people.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center">
          <h2>Let's talk about your next product challenge</h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
            Whether you need strategic guidance, hands-on execution, or
            specialized talent — we're ready to help.
          </p>
          <div className="mt-8">
            <a
              href="/contact"
              className="bg-accent text-white px-8 py-4 rounded font-medium hover:bg-accent/90 transition-colors inline-block"
            >
              Get Started
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
