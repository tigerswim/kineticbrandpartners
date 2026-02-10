import { Section } from "./section";
import { Button } from "./button";

export function CtaSection() {
  return (
    <Section bg="surface-alt">
      <div className="text-center">
        <h2>Ready to move forward?</h2>
        <p className="mt-4 text-lg">
          Book a free 30-minute strategy session.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Button href="/contact">Book a Call</Button>
          <Button href="/contact#form" variant="secondary">Send a Message</Button>
        </div>
      </div>
    </Section>
  );
}
