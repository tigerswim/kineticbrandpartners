import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { caseStudies } from "@/data/case-studies";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${study.title} — Future Forward Partners`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const currentIndex = caseStudies.findIndex((s) => s.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const study = caseStudies[currentIndex];
  const prevStudy =
    currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const nextStudy =
    currentIndex < caseStudies.length - 1
      ? caseStudies[currentIndex + 1]
      : null;

  return (
    <>
      {/* Header */}
      <Section>
        <div className="max-w-3xl">
          <span className="text-xs text-accent font-medium uppercase tracking-wide">
            {study.industry}
          </span>
          <h1 className="mt-3">{study.title}</h1>
          <p className="mt-2 text-lg text-text-muted">{study.client}</p>
        </div>
      </Section>

      {/* The Challenge */}
      <Section bg="surface-alt">
        <div className="max-w-3xl">
          <h2>The Challenge</h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            {study.challenge}
          </p>
        </div>
      </Section>

      {/* Our Approach */}
      <Section>
        <div className="max-w-3xl">
          <h2>Our Approach</h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            {study.approach}
          </p>
        </div>
      </Section>

      {/* The Results */}
      <Section bg="surface-alt">
        <div className="max-w-3xl">
          <h2>The Results</h2>
          <div className="mt-6 p-6 bg-bg-primary border-l-4 border-accent rounded">
            <p className="text-3xl font-bold text-accent">{study.metric}</p>
          </div>
          <p className="mt-6 text-text-secondary leading-relaxed">
            {study.results}
          </p>
        </div>
      </Section>

      {/* Client Quote */}
      <Section>
        <div className="max-w-3xl">
          <blockquote className="border-l-4 border-accent pl-6 py-2">
            <p className="text-xl md:text-2xl italic text-text-primary">
              "{study.quote}"
            </p>
            <footer className="mt-4 text-text-muted">
              — {study.quoteAuthor}, {study.quoteTitle}
            </footer>
          </blockquote>
        </div>
      </Section>

      {/* CTA */}
      <Section bg="surface-alt">
        <div className="text-center max-w-2xl mx-auto">
          <h2>Facing a similar challenge?</h2>
          <p className="mt-4 text-lg text-text-secondary">
            Let's talk about how we can help your team deliver results.
          </p>
          <div className="mt-8">
            <Button href="/contact">Book a Call</Button>
          </div>
        </div>
      </Section>

      {/* Prev/Next Navigation */}
      <Section>
        <div className="flex justify-between items-center max-w-3xl border-t border-border pt-8">
          <div>
            {prevStudy && (
              <a
                href={`/case-studies/${prevStudy.slug}`}
                className="text-text-secondary hover:text-text-primary transition-colors group"
              >
                <span className="text-xs text-text-muted block mb-1">
                  ← Previous
                </span>
                <span className="group-hover:text-accent transition-colors">
                  {prevStudy.title}
                </span>
              </a>
            )}
          </div>
          <div className="text-right">
            {nextStudy && (
              <a
                href={`/case-studies/${nextStudy.slug}`}
                className="text-text-secondary hover:text-text-primary transition-colors group"
              >
                <span className="text-xs text-text-muted block mb-1">
                  Next →
                </span>
                <span className="group-hover:text-accent transition-colors">
                  {nextStudy.title}
                </span>
              </a>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
