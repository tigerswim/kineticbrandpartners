import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Future Forward Partners",
  description: "Book a strategy session or send us a message.",
};

export default function ContactPage() {
  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left — Book a Call */}
        <div>
          <h1 className="text-4xl md:text-5xl">Book a Strategy Session</h1>
          <p className="mt-4 text-lg">
            30 minutes. No pitch. Just a conversation about your product
            challenges.
          </p>
          <div className="mt-8 bg-bg-surface border border-border rounded p-8 min-h-[400px] flex items-center justify-center">
            {/* Replace with Calendly embed: */}
            {/* <iframe src="https://calendly.com/YOURLINK" ... /> */}
            <p className="text-text-muted text-sm">
              Calendly scheduling widget will be embedded here.
            </p>
          </div>
        </div>

        {/* Right — Contact Form */}
        <div id="form">
          <h2 className="text-3xl md:text-4xl">Prefer email?</h2>
          <div className="mt-8">
            <ContactForm />
          </div>
          <div className="mt-8 text-sm text-text-muted space-y-1">
            <p>
              <a
                href="mailto:jeff@futureforwardpartners.com"
                className="hover:text-text-secondary transition-colors"
              >
                jeff@futureforwardpartners.com
              </a>
            </p>
            <p>Atlanta, Georgia</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
