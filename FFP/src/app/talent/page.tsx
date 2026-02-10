import { Section } from "@/components/section";
import { Card } from "@/components/card";
import { CtaSection } from "@/components/cta-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talent — Future Forward Partners",
  description:
    "Senior product and technology professionals ready to embed with your team.",
};

const roles = [
  {
    title: "Business Analyst",
    pitch: "Bridge the gap between business needs and technical implementation.",
    capabilities: [
      "Requirements gathering and documentation",
      "Stakeholder interviews and alignment",
      "Process mapping and optimization",
    ],
    profile:
      "Typical background: 8+ years in enterprise software, Fortune 500 and startup experience, cross-functional collaboration expertise",
  },
  {
    title: "Product Owner",
    pitch: "Manage the backlog and act as the voice of the customer within your team.",
    capabilities: [
      "Backlog prioritization and grooming",
      "Sprint planning and stakeholder communication",
      "User story writing and acceptance criteria",
    ],
    profile:
      "Typical background: 6+ years in agile product development, Scrum certification, proven track record of delivery",
  },
  {
    title: "Product Manager",
    pitch: "Own the full product lifecycle from vision to launch and beyond.",
    capabilities: [
      "Product strategy and roadmap development",
      "Cross-functional team leadership",
      "Market research and competitive analysis",
    ],
    profile:
      "Typical background: 8+ years product management, 3+ successful product launches, B2B and B2C experience",
  },
  {
    title: "Fractional Chief Product Officer",
    pitch: "Strategic product vision across your portfolio without a C-suite hire.",
    capabilities: [
      "Portfolio-level product strategy",
      "Product team hiring and coaching",
      "Board and executive stakeholder management",
    ],
    profile:
      "Typical background: 15+ years, previous CPO/VP roles, scaled teams from 5 to 50+, multiple exits",
  },
  {
    title: "UI/UX Designer",
    pitch: "Create intuitive, beautiful interfaces grounded in user research.",
    capabilities: [
      "User research and persona development",
      "Wireframing, prototyping, and visual design",
      "Design system creation and maintenance",
    ],
    profile:
      "Typical background: 6+ years design experience, Figma/Adobe expertise, portfolio of shipped products",
  },
  {
    title: "Project Manager",
    pitch: "Keep projects on time, on budget, and aligned with business goals.",
    capabilities: [
      "Timeline and budget management",
      "Risk identification and mitigation",
      "Cross-team coordination and reporting",
    ],
    profile:
      "Typical background: 8+ years managing complex projects, PMP or equivalent, enterprise and startup environments",
  },
  {
    title: "Product Marketing Manager",
    pitch: "Position your product in market and drive adoption through strategic campaigns.",
    capabilities: [
      "Go-to-market strategy and execution",
      "Messaging, positioning, and competitive analysis",
      "Launch campaigns and demand generation",
    ],
    profile:
      "Typical background: 6+ years product marketing, B2B SaaS experience, successful product launches",
  },
  {
    title: "Solutions Architect",
    pitch: "Design scalable technical architectures that align with business strategy.",
    capabilities: [
      "System design and architecture planning",
      "Technology stack selection and evaluation",
      "Technical roadmap and migration strategies",
    ],
    profile:
      "Typical background: 12+ years software development, cloud architecture expertise, multiple complex implementations",
  },
];

export default function TalentPage() {
  return (
    <>
      {/* Hero */}
      <Section>
        <h1>Talent</h1>
        <p className="mt-4 text-lg md:text-xl text-text-secondary max-w-3xl">
          Senior product and technology professionals, ready to embed with your
          team.
        </p>
      </Section>

      {/* Engagement Models */}
      <Section bg="surface-alt">
        <h2 className="text-center mb-12">Engagement Models</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-accent">Fractional</h3>
            <p className="mt-3 text-text-secondary">
              Part-time senior leadership (CPO, VP Product). Ongoing retainer.
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Strategic oversight without the full-time cost.
            </p>
          </div>
          <div>
            <h3 className="text-accent">Project-Based</h3>
            <p className="mt-3 text-text-secondary">
              Dedicated team for defined engagement. Fixed scope and timeline.
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Ship a product, then hand off.
            </p>
          </div>
          <div>
            <h3 className="text-accent">Staff Augmentation</h3>
            <p className="mt-3 text-text-secondary">
              Fill a specific role gap. Flexible duration.
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Extend your team with proven talent.
            </p>
          </div>
        </div>
      </Section>

      {/* Roles Grid */}
      <Section>
        <h2 className="mb-12">Roles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <Card key={role.title}>
              <h3>{role.title}</h3>
              <p className="mt-3 text-text-secondary">{role.pitch}</p>
              <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                {role.capabilities.map((cap, i) => (
                  <li key={i}>• {cap}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-text-muted italic">
                {role.profile}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Comparison */}
      <Section bg="surface-alt">
        <h2 className="text-center mb-12">FFP Talent vs. Full-Time Hire</h2>
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 pr-4 text-text-primary">Factor</th>
                <th className="py-3 px-4 text-text-primary">Full-Time Hire</th>
                <th className="py-3 pl-4 text-accent">FFP Talent</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-border">
                <td className="py-3 pr-4">Ramp-up time</td>
                <td className="py-3 px-4">3-6 months</td>
                <td className="py-3 pl-4 text-text-primary font-medium">
                  Days
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 pr-4">Cost</td>
                <td className="py-3 px-4">Salary + benefits + equity</td>
                <td className="py-3 pl-4 text-text-primary font-medium">
                  Engagement fee only
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 pr-4">Flexibility</td>
                <td className="py-3 px-4">Fixed commitment</td>
                <td className="py-3 pl-4 text-text-primary font-medium">
                  Scale up or down
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Experience breadth</td>
                <td className="py-3 px-4">One company's perspective</td>
                <td className="py-3 pl-4 text-text-primary font-medium">
                  Cross-industry, multi-company
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center">
          <h2>Tell us what role you need</h2>
          <p className="mt-4 text-lg text-text-secondary">
            We'll match you with the right expertise for your team.
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
