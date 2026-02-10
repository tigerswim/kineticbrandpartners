import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { CtaSection } from "@/components/cta-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Future Forward Partners",
  description:
    "Product strategy, delivery, and AI implementation services for your business.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <Section>
        <h1>Services</h1>
        <p className="mt-4 text-lg md:text-xl text-text-secondary max-w-3xl">
          From strategy to execution — we deliver across the full product
          lifecycle.
        </p>
      </Section>

      {/* Service 1: Strategic Assessments */}
      <Section bg="surface-alt" id="strategic-assessments">
        <h2>Strategic Assessments</h2>
        <p className="mt-4 text-text-secondary">
          <strong>Who it&apos;s for:</strong> Companies needing clarity on product
          direction, team structure, or technology choices.
        </p>
        <ul className="mt-6 space-y-2 text-text-secondary list-disc list-inside">
          <li>Product evaluation and technology roadmaps</li>
          <li>Team structure recommendations</li>
          <li>Competitive positioning analysis</li>
          <li>Technology stack assessment</li>
        </ul>
        <p className="mt-6 text-accent italic">
          Result: Helped Elemica define a go-to-market strategy for their AI
          platform, entering a new market with a differentiated position.
        </p>
        <Button
          href="/contact?service=strategic-assessments"
          variant="text"
          className="mt-6"
        >
          Discuss this for your team
        </Button>
      </Section>

      {/* Service 2: Product Market Fit & GTM */}
      <Section id="product-market-fit">
        <h2>Product Market Fit & GTM</h2>
        <p className="mt-4 text-text-secondary">
          <strong>Who it&apos;s for:</strong> Companies entering new markets or
          pivoting existing products.
        </p>
        <ul className="mt-6 space-y-2 text-text-secondary list-disc list-inside">
          <li>Go-to-market strategy development</li>
          <li>Competitive analysis and positioning</li>
          <li>Pricing strategy and modeling</li>
          <li>Product-led growth planning</li>
        </ul>
        <p className="mt-6 text-accent italic">
          Result: Elemica entered the AI supply chain market with a clear path
          to revenue from their new platform capabilities.
        </p>
        <Button
          href="/contact?service=product-market-fit"
          variant="text"
          className="mt-6"
        >
          Discuss this for your team
        </Button>
      </Section>

      {/* Service 3: Product Delivery */}
      <Section bg="surface-alt" id="product-delivery">
        <h2>Product Delivery</h2>
        <p className="mt-4 text-text-secondary">
          <strong>Who it&apos;s for:</strong> Companies building new products or
          overhauling existing ones.
        </p>
        <ul className="mt-6 space-y-2 text-text-secondary list-disc list-inside">
          <li>Requirements management and prioritization</li>
          <li>UX design oversight and user research</li>
          <li>Sprint execution and agile coaching</li>
          <li>MVP development and iteration</li>
        </ul>
        <p className="mt-6 text-accent italic">
          Result: KMS Technologies launched their MVP in 90 days, enabling
          market validation ahead of their projected timeline.
        </p>
        <Button
          href="/contact?service=product-delivery"
          variant="text"
          className="mt-6"
        >
          Discuss this for your team
        </Button>
      </Section>

      {/* Service 4: Project Rollouts */}
      <Section id="project-rollouts">
        <h2>Project Rollouts</h2>
        <p className="mt-4 text-text-secondary">
          <strong>Who it&apos;s for:</strong> Companies launching products or
          managing large-scale implementations.
        </p>
        <ul className="mt-6 space-y-2 text-text-secondary list-disc list-inside">
          <li>Program management and coordination</li>
          <li>Change management and stakeholder communication</li>
          <li>Launch planning and execution</li>
          <li>Support infrastructure setup</li>
        </ul>
        <p className="mt-6 text-accent italic">
          Result: Led a Global Transportation Company through platform
          modernization without operational disruption.
        </p>
        <Button
          href="/contact?service=project-rollouts"
          variant="text"
          className="mt-6"
        >
          Discuss this for your team
        </Button>
      </Section>

      {/* Service 5: AI Implementation & Modernization */}
      <Section bg="surface-alt" id="ai-implementation">
        <h2>AI Implementation & Modernization</h2>
        <p className="mt-4 text-text-secondary">
          <strong>Who it&apos;s for:</strong> Companies adopting AI or modernizing
          legacy platforms.
        </p>
        <ul className="mt-6 space-y-2 text-text-secondary list-disc list-inside">
          <li>ML modeling strategy and implementation</li>
          <li>Platform modernization and migration</li>
          <li>Agentic AI solution design and deployment</li>
          <li>Blockchain enablement and integration</li>
        </ul>
        <p className="mt-6 text-accent italic">
          Result: Project Appe went from AI concept to launched product with a
          clear roadmap for subsequent iterations.
        </p>
        <Button
          href="/contact?service=ai-implementation"
          variant="text"
          className="mt-6"
        >
          Discuss this for your team
        </Button>
      </Section>

      {/* Engagement Process */}
      <Section>
        <h2 className="text-center mb-12">How We Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <h3 className="text-accent">Discovery</h3>
            <p className="mt-3 text-sm text-text-secondary">
              Deep dive into your business, product, and challenges
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-accent">Strategy</h3>
            <p className="mt-3 text-sm text-text-secondary">
              Define the approach, roadmap, and success metrics
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-accent">Execution</h3>
            <p className="mt-3 text-sm text-text-secondary">
              Embed with your team and deliver results
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-accent">Handoff</h3>
            <p className="mt-3 text-sm text-text-secondary">
              Documentation and ongoing support options
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <CtaSection />
    </>
  );
}
