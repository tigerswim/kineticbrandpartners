import { Button } from "@/components/button";
import { Section } from "@/components/section";
import { Card } from "@/components/card";

export default function Home() {
  return (
    <main>
      <Section>
        <h1>Future Forward Partners</h1>
        <div className="mt-8 flex gap-4">
          <Button href="/contact">Book a Call</Button>
          <Button href="/case-studies" variant="secondary">Case Studies</Button>
        </div>
      </Section>
      <Section bg="surface-alt">
        <Card>
          <h3>Test Card</h3>
          <p className="mt-2">Card content renders correctly.</p>
          <Button href="/services" variant="text" className="mt-4">Learn more</Button>
        </Card>
      </Section>
    </main>
  );
}
