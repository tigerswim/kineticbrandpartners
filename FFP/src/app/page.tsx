import { Button } from "@/components/button";
import { Section } from "@/components/section";
import { Card } from "@/components/card";
import { CtaSection } from "@/components/cta-section";
import { AnimatedMetric } from "@/components/animated-metric";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <Section bg="gradient" withNoise className="min-h-[80vh] flex items-center">
        <div className="text-center mx-auto max-w-4xl">
          <h1 className="animate-fade-in-up">Launch faster. Build smarter. Scale with confidence.</h1>
          <p className="mt-6 text-lg md:text-xl text-text-secondary animate-fade-in-up stagger-1">
            Senior product strategy, management, and AI talent — embedded in
            your team to deliver outcomes, not decks.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap animate-fade-in-up stagger-2">
            <Button href="/contact">Book a Strategy Call</Button>
            <Button href="/case-studies" variant="secondary">
              View Case Studies
            </Button>
          </div>
          <p className="mt-8 text-sm text-text-muted animate-fade-in-up stagger-3">
            Trusted by product leaders at KMS Technologies, Elemica, and more.
          </p>
        </div>
      </Section>

      {/* Services Preview */}
      <Section withLines>
        <h2 className="mb-12">What we do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="hover-lift">
            <h3>Product Strategy</h3>
            <p className="mt-3 text-text-secondary">
              From go-to-market plans to transformation strategies, we help you
              define and execute product vision.
            </p>
            <Button href="/services" variant="text" className="mt-4">
              Learn more
            </Button>
          </Card>
          <Card variant="hover-lift">
            <h3>Product Delivery</h3>
            <p className="mt-3 text-text-secondary">
              Full software product lifecycle management from concept through
              launch and iteration.
            </p>
            <Button href="/services" variant="text" className="mt-4">
              Learn more
            </Button>
          </Card>
          <Card variant="hover-lift">
            <h3>AI Implementation</h3>
            <p className="mt-3 text-text-secondary">
              Design, build, and implement agentic AI solutions tailored to
              your business challenges.
            </p>
            <Button href="/services" variant="text" className="mt-4">
              Learn more
            </Button>
          </Card>
        </div>
      </Section>

      {/* Social Proof */}
      <Section bg="surface-alt">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="border-t-2 border-accent pt-8">
            <p className="text-2xl md:text-3xl italic text-text-primary">
              &quot;Future Forward&apos;s product and project management experience
              enabled us to quickly build a minimum viable product.&quot;
            </p>
            <footer className="mt-6 text-text-muted">
              Chief Delivery Officer, KMS Technologies
            </footer>
          </blockquote>
        </div>
      </Section>

      {/* Case Study Highlight */}
      <Section bg="gradient-mesh">
        <Card variant="gradient-border" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedMetric
            value="90 days"
            label="MVP to Market"
            sublabel="KMS Technologies"
            gradient
          />
          <div className="flex flex-col justify-center">
            <p className="italic text-text-secondary text-lg">
              &quot;Future Forward&apos;s product and project management experience
              enabled us to quickly build a minimum viable product.&quot;
            </p>
            <Button
              href="/case-studies/kms-technologies"
              variant="text"
              className="mt-6"
            >
              Read the full story
            </Button>
          </div>
        </Card>
      </Section>

      {/* Why FFP / Differentiators */}
      <Section bg="surface-alt" withLines>
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="group">
            <h3 className="text-2xl bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105 inline-block">
              Operators, not advisors
            </h3>
            <p className="mt-3 text-text-secondary">
              We embed with your team, not observe from the side.
            </p>
          </div>
          <div className="group">
            <h3 className="text-2xl bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105 inline-block">
              25+ years of product leadership
            </h3>
            <p className="mt-3 text-text-secondary">
              Fortune 500 to startup exits.
            </p>
          </div>
          <div className="group">
            <h3 className="text-2xl bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105 inline-block">
              Strategy through execution
            </h3>
            <p className="mt-3 text-text-secondary">
              From roadmap to shipped product.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <CtaSection />
    </main>
  );
}
