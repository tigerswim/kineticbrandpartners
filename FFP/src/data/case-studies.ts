export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  metric: string;
  summary: string;
  quote: string;
  quoteAuthor: string;
  quoteTitle: string;
  challenge: string;
  approach: string;
  results: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "kms-technologies",
    title: "MVP to Market in 90 Days",
    client: "KMS Technologies",
    industry: "Healthcare",
    metric: "90 days",
    summary:
      "Built and launched a minimum viable product in under three months.",
    quote:
      "Future Forward's product and project management experience enabled us to quickly build a minimum viable product.",
    quoteAuthor: "Chief Delivery Officer",
    quoteTitle: "KMS Technologies",
    challenge:
      "KMS Technologies needed to rapidly validate a new product concept in the healthcare space. Internal teams were stretched across existing commitments, and the window to enter the market was closing.",
    approach:
      "Future Forward embedded a senior product manager and project lead with the KMS team. We defined the MVP scope, established sprint cadence, and drove execution from concept to launch.",
    results:
      "The MVP launched in under 90 days, enabling KMS to validate market fit and begin customer acquisition ahead of their projected timeline.",
  },
  {
    slug: "elemica",
    title: "AI Platform Go-to-Market Strategy",
    client: "Elemica",
    industry: "Supply Chain",
    metric: "New market entry",
    summary:
      "Defined and executed a go-to-market strategy for an AI-driven supply chain platform.",
    quote:
      "The team brought clarity to a complex market entry and helped us position our AI capabilities effectively.",
    quoteAuthor: "Chief Innovation Officer",
    quoteTitle: "Elemica",
    challenge:
      "Elemica had built significant AI capabilities for supply chain optimization but lacked a clear go-to-market strategy to position and sell these new offerings.",
    approach:
      "Future Forward conducted competitive analysis, defined target segments, and built a GTM playbook covering positioning, pricing, and sales enablement.",
    results:
      "Elemica entered the AI supply chain market with a differentiated position and a clear path to revenue from their new platform capabilities.",
  },
  {
    slug: "global-transportation",
    title: "Enterprise Platform Modernization",
    client: "Global Transportation Company",
    industry: "Logistics",
    metric: "Platform modernized",
    summary:
      "Led the modernization of a legacy transportation management platform.",
    quote:
      "They understood our technical challenges and delivered a modernization roadmap we could actually execute.",
    quoteAuthor: "VP of Technology",
    quoteTitle: "Global Transportation Company",
    challenge:
      "A major transportation company was running critical operations on aging technology that couldn't scale with demand or integrate with modern partner systems.",
    approach:
      "Future Forward assessed the existing platform, identified modernization priorities, and led the phased migration to a modern architecture while maintaining business continuity.",
    results:
      "The company modernized its core platform without operational disruption, enabling new partner integrations and improved scalability.",
  },
  {
    slug: "project-appe",
    title: "AI-Driven Product Management",
    client: "Project Appe",
    industry: "AI / Blockchain",
    metric: "0 to 1 launch",
    summary: "Took an AI-driven product from concept to initial launch.",
    quote:
      "Future Forward brought the product discipline we needed to turn our AI vision into a shippable product.",
    quoteAuthor: "Founder",
    quoteTitle: "Project Appe",
    challenge:
      "Project Appe had a compelling AI and blockchain vision but needed structured product management to turn research into a launchable product.",
    approach:
      "Future Forward provided fractional product leadership, defined the product roadmap, established development processes, and guided the team through their first product launch.",
    results:
      "Project Appe went from concept to launched product with a clear roadmap for subsequent iterations.",
  },
];
