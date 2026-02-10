import { Section } from "@/components/section";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { CtaSection } from "@/components/cta-section";
import { caseStudies } from "@/data/case-studies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies — Future Forward Partners",
  description: "Real outcomes for real companies.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Section>
        <h1>Case Studies</h1>
        <p className="mt-4 text-lg">Real outcomes for real companies.</p>
      </Section>
      <Section bg="surface-alt">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((study) => (
            <Card key={study.slug}>
              <span className="text-xs text-accent font-medium uppercase tracking-wide">
                {study.industry}
              </span>
              <h3 className="mt-3">{study.title}</h3>
              <p className="mt-2 text-sm">{study.summary}</p>
              <p className="mt-4 text-2xl font-bold text-accent">
                {study.metric}
              </p>
              <p className="mt-2 text-xs text-text-muted">
                {study.quoteAuthor}, {study.quoteTitle}
              </p>
              <Button
                href={`/case-studies/${study.slug}`}
                variant="text"
                className="mt-4"
              >
                Read more
              </Button>
            </Card>
          ))}
        </div>
      </Section>
      <CtaSection />
    </>
  );
}
